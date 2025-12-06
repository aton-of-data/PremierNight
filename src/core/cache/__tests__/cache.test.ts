import { createCache } from '../cache';
import { storage } from '../../storage';
import { logger } from '../../logger';
import type { CachedItem } from '../types';

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
  },
}));

jest.mock('@core/storage');
jest.mock('@core/logger');

const mockStorage = storage as jest.Mocked<typeof storage>;
const mockLogger = logger as jest.Mocked<typeof logger>;

describe('createCache', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('get', () => {
    it('should return null when item does not exist', async () => {
      mockStorage.getItem.mockResolvedValue(null);

      const cache = createCache<number, { id: number; name: string }>('test');

      const result = await cache.get(1);

      expect(result).toBeNull();
      expect(mockLogger.debug).toHaveBeenCalledWith('Cache: Item not found', {
        tags: ['cache'],
        context: { namespace: 'test', key: '1' },
      });
    });

    it('should return cached data when item exists and is valid', async () => {
      const testData = { id: 1, name: 'Test' };
      const cachedItem: CachedItem<typeof testData> = {
        data: testData,
        timestamp: Date.now(),
        version: '1',
      };

      mockStorage.getItem.mockResolvedValue(cachedItem);

      const cache = createCache<number, typeof testData>('test');

      const result = await cache.get(1);

      expect(result).toEqual(testData);
      expect(mockLogger.debug).toHaveBeenCalledWith('Cache: Item retrieved', {
        tags: ['cache'],
        context: { namespace: 'test', key: '1' },
      });
    });

    it('should return null and remove item when version mismatch', async () => {
      const testData = { id: 1, name: 'Test' };
      const cachedItem: CachedItem<typeof testData> = {
        data: testData,
        timestamp: Date.now(),
        version: '2', // Different version
      };

      mockStorage.getItem.mockResolvedValue(cachedItem);
      mockStorage.removeItem.mockResolvedValue();

      const cache = createCache<number, typeof testData>(
        'test',
        undefined,
        '1',
      );

      const result = await cache.get(1);

      expect(result).toBeNull();
      expect(mockStorage.removeItem).toHaveBeenCalledWith('@cache:test:1');
      expect(mockLogger.debug).toHaveBeenCalledWith(
        'Cache: Version mismatch, removing',
        {
          tags: ['cache'],
          context: {
            namespace: 'test',
            key: '1',
            cachedVersion: '2',
            expectedVersion: '1',
          },
        },
      );
    });

    it('should return null and remove item when TTL expired', async () => {
      const now = Date.now();
      const testData = { id: 1, name: 'Test' };
      const cachedItem: CachedItem<typeof testData> = {
        data: testData,
        timestamp: now - 2000, // 2 seconds ago
        version: '1',
        ttl: 1000, // 1 second TTL (expired)
      };

      jest.setSystemTime(now);

      mockStorage.getItem.mockResolvedValue(cachedItem);
      mockStorage.removeItem.mockResolvedValue();

      const cache = createCache<number, typeof testData>('test');

      const result = await cache.get(1);

      expect(result).toBeNull();
      expect(mockStorage.removeItem).toHaveBeenCalledWith('@cache:test:1');
      expect(mockLogger.debug).toHaveBeenCalledWith(
        'Cache: Item expired, removing',
        {
          tags: ['cache'],
          context: { namespace: 'test', key: '1', age: 2000, ttl: 1000 },
        },
      );
    });

    it('should return data when TTL not expired', async () => {
      const now = Date.now();
      const testData = { id: 1, name: 'Test' };
      const cachedItem: CachedItem<typeof testData> = {
        data: testData,
        timestamp: now - 500, // 0.5 seconds ago
        version: '1',
        ttl: 1000, // 1 second TTL (still valid)
      };

      jest.setSystemTime(now);

      mockStorage.getItem.mockResolvedValue(cachedItem);

      const cache = createCache<number, typeof testData>('test');

      const result = await cache.get(1);

      expect(result).toEqual(testData);
    });

    it('should handle custom version option', async () => {
      const testData = { id: 1, name: 'Test' };
      const cachedItem: CachedItem<typeof testData> = {
        data: testData,
        timestamp: Date.now(),
        version: '2',
      };

      mockStorage.getItem.mockResolvedValue(cachedItem);

      const cache = createCache<number, typeof testData>(
        'test',
        undefined,
        '1',
      );

      const result = await cache.get(1, { version: '2' });

      expect(result).toEqual(testData);
    });

    it('should return null on error and log it', async () => {
      const testError = new Error('Storage error');
      mockStorage.getItem.mockRejectedValue(testError);

      const cache = createCache<number, { id: number }>('test');

      const result = await cache.get(1);

      expect(result).toBeNull();
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Cache: Failed to get item',
        testError,
        {
          tags: ['cache', 'error'],
          context: { namespace: 'test', key: '1' },
        },
      );
    });
  });

  describe('set', () => {
    it('should save item to cache with default version', async () => {
      const testData = { id: 1, name: 'Test' };
      mockStorage.setItem.mockResolvedValue();

      const cache = createCache<number, typeof testData>('test');

      await cache.set(1, testData);

      expect(mockStorage.setItem).toHaveBeenCalledWith(
        '@cache:test:1',
        expect.objectContaining({
          data: testData,
          version: '1',
          timestamp: expect.any(Number),
        }),
      );
      expect(mockLogger.debug).toHaveBeenCalledWith('Cache: Item saved', {
        tags: ['cache'],
        context: { namespace: 'test', key: '1' },
      });
    });

    it('should save item with custom version and TTL', async () => {
      const testData = { id: 1, name: 'Test' };
      mockStorage.setItem.mockResolvedValue();

      const cache = createCache<number, typeof testData>(
        'test',
        undefined,
        '1',
      );

      await cache.set(1, testData, { version: '2', ttl: 5000 });

      expect(mockStorage.setItem).toHaveBeenCalledWith(
        '@cache:test:1',
        expect.objectContaining({
          data: testData,
          version: '2',
          ttl: 5000,
          timestamp: expect.any(Number),
        }),
      );
    });

    it('should handle error on set and log it', async () => {
      const testData = { id: 1, name: 'Test' };
      const testError = new Error('Storage error');
      mockStorage.setItem.mockRejectedValue(testError);

      const cache = createCache<number, typeof testData>('test');

      await cache.set(1, testData);

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Cache: Failed to save item',
        testError,
        {
          tags: ['cache', 'error'],
          context: { namespace: 'test', key: '1' },
        },
      );
    });
  });

  describe('remove', () => {
    it('should remove item from cache', async () => {
      mockStorage.removeItem.mockResolvedValue();

      const cache = createCache<number, { id: number }>('test');

      await cache.remove(1);

      expect(mockStorage.removeItem).toHaveBeenCalledWith('@cache:test:1');
      expect(mockLogger.debug).toHaveBeenCalledWith('Cache: Item removed', {
        tags: ['cache'],
        context: { namespace: 'test', key: '1' },
      });
    });

    it('should handle error on remove and log it', async () => {
      const testError = new Error('Storage error');
      mockStorage.removeItem.mockRejectedValue(testError);

      const cache = createCache<number, { id: number }>('test');

      await cache.remove(1);

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Cache: Failed to remove item',
        testError,
        {
          tags: ['cache', 'error'],
          context: { namespace: 'test', key: '1' },
        },
      );
    });
  });

  describe('has', () => {
    it('should return true when item exists', async () => {
      const testData = { id: 1, name: 'Test' };
      const cachedItem: CachedItem<typeof testData> = {
        data: testData,
        timestamp: Date.now(),
        version: '1',
      };

      mockStorage.getItem.mockResolvedValue(cachedItem);

      const cache = createCache<number, typeof testData>('test');

      const result = await cache.has(1);

      expect(result).toBe(true);
    });

    it('should return false when item does not exist', async () => {
      mockStorage.getItem.mockResolvedValue(null);

      const cache = createCache<number, { id: number }>('test');

      const result = await cache.has(1);

      expect(result).toBe(false);
    });

    it('should respect version option', async () => {
      const testData = { id: 1, name: 'Test' };
      const cachedItem: CachedItem<typeof testData> = {
        data: testData,
        timestamp: Date.now(),
        version: '2',
      };

      mockStorage.getItem.mockResolvedValue(cachedItem);
      mockStorage.removeItem.mockResolvedValue();

      const cache = createCache<number, typeof testData>(
        'test',
        undefined,
        '1',
      );

      const result = await cache.has(1, { version: '1' });

      expect(result).toBe(false);
    });
  });

  describe('clear', () => {
    it('should log clear attempt', async () => {
      const cache = createCache<number, { id: number }>('test');

      await cache.clear();

      expect(mockLogger.debug).toHaveBeenCalledWith(
        'Cache: Clear not fully implemented',
        {
          tags: ['cache'],
          context: { namespace: 'test' },
        },
      );
    });
  });

  describe('custom key generator', () => {
    it('should use custom key generator when provided', async () => {
      type TestData = { id: number; name: string };
      const customKeyGenerator = (key: number) => `custom:${key}:key`;

      mockStorage.getItem.mockResolvedValue(null);

      const cache = createCache<number, TestData>('test', customKeyGenerator);

      await cache.get(1);

      expect(mockStorage.getItem).toHaveBeenCalledWith('custom:1:key');
    });
  });

  describe('default key generation', () => {
    it('should use default key format when keyGenerator not provided', async () => {
      type TestData = { id: number; name: string };
      mockStorage.getItem.mockResolvedValue(null);

      const cache = createCache<string, TestData>('test');

      await cache.get('my-key');

      expect(mockStorage.getItem).toHaveBeenCalledWith('@cache:test:my-key');
    });
  });
});
