import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../index';
import { logger } from '@core/logger';

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

jest.mock('@core/logger');

const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;
const mockLogger = logger as jest.Mocked<typeof logger>;

describe('storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getItem', () => {
    it('should get and parse item from storage', async () => {
      const testData = { id: 1, name: 'Test' };
      const serializedData = JSON.stringify(testData);

      mockAsyncStorage.getItem.mockResolvedValue(serializedData);

      const result = await storage.getItem<typeof testData>('test-key');

      expect(result).toEqual(testData);
      expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('test-key');
      expect(mockLogger.debug).toHaveBeenCalledWith(
        'Storage: Getting item',
        {
          tags: ['storage'],
          context: { key: 'test-key' },
        },
      );
      expect(mockLogger.debug).toHaveBeenCalledWith(
        'Storage: Item retrieved',
        {
          tags: ['storage'],
          context: { key: 'test-key' },
        },
      );
    });

    it('should return null when item does not exist', async () => {
      mockAsyncStorage.getItem.mockResolvedValue(null);

      const result = await storage.getItem('test-key');

      expect(result).toBeNull();
      expect(mockLogger.debug).toHaveBeenCalledWith(
        'Storage: Item not found',
        {
          tags: ['storage'],
          context: { key: 'test-key' },
        },
      );
    });

    it('should return null on JSON parse error (SyntaxError)', async () => {
      mockAsyncStorage.getItem.mockResolvedValue('invalid json{');

      const result = await storage.getItem('test-key');

      expect(result).toBeNull();
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Storage: Failed to get item',
        expect.any(SyntaxError),
        {
          tags: ['storage', 'error'],
          context: { key: 'test-key' },
        },
      );
    });

    it('should throw error on other errors', async () => {
      const testError = new Error('Storage error');
      mockAsyncStorage.getItem.mockRejectedValue(testError);

      await expect(storage.getItem('test-key')).rejects.toThrow(
        'Storage error',
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Storage: Failed to get item',
        testError,
        {
          tags: ['storage', 'error'],
          context: { key: 'test-key' },
        },
      );
    });

    it('should handle complex nested objects', async () => {
      const complexData = {
        id: 1,
        nested: {
          array: [1, 2, 3],
          object: { key: 'value' },
        },
      };
      const serializedData = JSON.stringify(complexData);

      mockAsyncStorage.getItem.mockResolvedValue(serializedData);

      const result = await storage.getItem<typeof complexData>('test-key');

      expect(result).toEqual(complexData);
    });
  });

  describe('setItem', () => {
    it('should serialize and save item to storage', async () => {
      const testData = { id: 1, name: 'Test' };
      mockAsyncStorage.setItem.mockResolvedValue();

      await storage.setItem('test-key', testData);

      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        'test-key',
        JSON.stringify(testData),
      );
      expect(mockLogger.debug).toHaveBeenCalledWith(
        'Storage: Setting item',
        {
          tags: ['storage'],
          context: { key: 'test-key' },
        },
      );
      expect(mockLogger.debug).toHaveBeenCalledWith('Storage: Item saved', {
        tags: ['storage'],
        context: { key: 'test-key' },
      });
    });

    it('should handle primitive values', async () => {
      mockAsyncStorage.setItem.mockResolvedValue();

      await storage.setItem('test-key', 'string-value');
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        'test-key',
        '"string-value"',
      );

      await storage.setItem('test-key', 123);
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        'test-key',
        '123',
      );

      await storage.setItem('test-key', true);
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        'test-key',
        'true',
      );

      await storage.setItem('test-key', null);
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        'test-key',
        'null',
      );
    });

    it('should throw error on storage failure', async () => {
      const testData = { id: 1 };
      const testError = new Error('Storage error');
      mockAsyncStorage.setItem.mockRejectedValue(testError);

      await expect(storage.setItem('test-key', testData)).rejects.toThrow(
        'Storage error',
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Storage: Failed to set item',
        testError,
        {
          tags: ['storage', 'error'],
          context: { key: 'test-key' },
        },
      );
    });

    it('should handle arrays', async () => {
      const arrayData = [1, 2, 3];
      mockAsyncStorage.setItem.mockResolvedValue();

      await storage.setItem('test-key', arrayData);

      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        'test-key',
        JSON.stringify(arrayData),
      );
    });
  });

  describe('removeItem', () => {
    it('should remove item from storage', async () => {
      mockAsyncStorage.removeItem.mockResolvedValue();

      await storage.removeItem('test-key');

      expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith('test-key');
      expect(mockLogger.debug).toHaveBeenCalledWith(
        'Storage: Removing item',
        {
          tags: ['storage'],
          context: { key: 'test-key' },
        },
      );
      expect(mockLogger.debug).toHaveBeenCalledWith('Storage: Item removed', {
        tags: ['storage'],
        context: { key: 'test-key' },
      });
    });

    it('should throw error on removal failure', async () => {
      const testError = new Error('Storage error');
      mockAsyncStorage.removeItem.mockRejectedValue(testError);

      await expect(storage.removeItem('test-key')).rejects.toThrow(
        'Storage error',
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Storage: Failed to remove item',
        testError,
        {
          tags: ['storage', 'error'],
          context: { key: 'test-key' },
        },
      );
    });
  });

  describe('clear', () => {
    it('should clear all items from storage', async () => {
      mockAsyncStorage.clear.mockResolvedValue();

      await storage.clear();

      expect(mockAsyncStorage.clear).toHaveBeenCalled();
      expect(mockLogger.debug).toHaveBeenCalledWith(
        'Storage: Clearing all items',
        { tags: ['storage'] },
      );
      expect(mockLogger.debug).toHaveBeenCalledWith(
        'Storage: All items cleared',
        { tags: ['storage'] },
      );
    });

    it('should throw error on clear failure', async () => {
      const testError = new Error('Storage error');
      mockAsyncStorage.clear.mockRejectedValue(testError);

      await expect(storage.clear()).rejects.toThrow('Storage error');

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Storage: Failed to clear storage',
        testError,
        {
          tags: ['storage', 'error'],
        },
      );
    });
  });
});

