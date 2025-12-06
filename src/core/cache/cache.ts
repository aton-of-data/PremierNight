import { storage } from '@core/storage';
import { logger } from '@core/logger';
import type { CachedItem, CacheOptions, CacheKeyGenerator } from './types';

const DEFAULT_VERSION = '1';
const DEFAULT_CACHE_KEY_PREFIX = '@cache:';

/**
 * Create a cache instance for a specific namespace
 *
 * @param namespace - Unique namespace for this cache (e.g., 'film', 'user')
 * @param keyGenerator - Function to generate cache keys from your key type
 * @param defaultVersion - Default version for cached items
 * @returns Cache instance with get, set, remove, and has methods
 *
 * @example
 * ```typescript
 * const filmCache = createCache<number, Film>(
 *   'film',
 *   (filmId) => `film:${filmId}`,
 *   '1'
 * );
 *
 * // Get from cache
 * const film = await filmCache.get(123);
 *
 * // Save to cache
 * await filmCache.set(123, filmData);
 *
 * // Check if exists
 * const exists = await filmCache.has(123);
 *
 * // Remove from cache
 * await filmCache.remove(123);
 * ```
 */
export function createCache<TKey, TData>(
  namespace: string,
  keyGenerator?: CacheKeyGenerator<TKey>,
  defaultVersion: string = DEFAULT_VERSION,
) {
  const cacheKeyPrefix = `${DEFAULT_CACHE_KEY_PREFIX}${namespace}:`;
  const generateKey: CacheKeyGenerator<TKey> =
    keyGenerator || ((key: TKey) => `${cacheKeyPrefix}${String(key)}`);

  /**
   * Get item from cache
   */
  const get = async (
    key: TKey,
    options?: { version?: string },
  ): Promise<TData | null> => {
    try {
      const cacheKey = generateKey(key);
      const cached = await storage.getItem<CachedItem<TData>>(cacheKey);

      if (!cached) {
        logger.debug('Cache: Item not found', {
          tags: ['cache'],
          context: { namespace, key: String(key) },
        });
        return null;
      }

      const expectedVersion = options?.version || defaultVersion;
      if (cached.version !== expectedVersion) {
        logger.debug('Cache: Version mismatch, removing', {
          tags: ['cache'],
          context: {
            namespace,
            key: String(key),
            cachedVersion: cached.version,
            expectedVersion,
          },
        });
        await remove(key);
        return null;
      }

      if (cached.ttl) {
        const age = Date.now() - cached.timestamp;
        if (age > cached.ttl) {
          logger.debug('Cache: Item expired, removing', {
            tags: ['cache'],
            context: { namespace, key: String(key), age, ttl: cached.ttl },
          });
          await remove(key);
          return null;
        }
      }

      logger.debug('Cache: Item retrieved', {
        tags: ['cache'],
        context: { namespace, key: String(key) },
      });

      return cached.data;
    } catch (error) {
      logger.error('Cache: Failed to get item', error, {
        tags: ['cache', 'error'],
        context: { namespace, key: String(key) },
      });
      return null;
    }
  };

  /**
   * Save item to cache
   */
  const set = async (
    key: TKey,
    data: TData,
    options?: CacheOptions,
  ): Promise<void> => {
    try {
      const cacheKey = generateKey(key);
      const cached: CachedItem<TData> = {
        data,
        timestamp: Date.now(),
        version: options?.version || defaultVersion,
        ttl: options?.ttl,
      };

      await storage.setItem<CachedItem<TData>>(cacheKey, cached);

      logger.debug('Cache: Item saved', {
        tags: ['cache'],
        context: { namespace, key: String(key) },
      });
    } catch (error) {
      logger.error('Cache: Failed to save item', error, {
        tags: ['cache', 'error'],
        context: { namespace, key: String(key) },
      });
    }
  };

  /**
   * Remove item from cache
   */
  const remove = async (key: TKey): Promise<void> => {
    try {
      const cacheKey = generateKey(key);
      await storage.removeItem(cacheKey);

      logger.debug('Cache: Item removed', {
        tags: ['cache'],
        context: { namespace, key: String(key) },
      });
    } catch (error) {
      logger.error('Cache: Failed to remove item', error, {
        tags: ['cache', 'error'],
        context: { namespace, key: String(key) },
      });
    }
  };

  /**
   * Check if item exists in cache
   */
  const has = async (
    key: TKey,
    options?: { version?: string },
  ): Promise<boolean> => {
    const item = await get(key, options);
    return item !== null;
  };

  /**
   * Clear all items in this namespace
   */
  /**
   * Clears all items in this namespace.
   * Note: Simplified implementation - consider tracking keys in a separate index for production.
   */
  const clear = async (): Promise<void> => {
    try {
      logger.debug('Cache: Clear not fully implemented', {
        tags: ['cache'],
        context: { namespace },
      });
    } catch (error) {
      logger.error('Cache: Failed to clear', error, {
        tags: ['cache', 'error'],
        context: { namespace },
      });
    }
  };

  return {
    get,
    set,
    remove,
    has,
    clear,
  };
}
