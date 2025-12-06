/**
 * Cached item wrapper with metadata
 */
export interface CachedItem<T> {
  data: T;
  timestamp: number;
  version: string;
  ttl?: number; // Time to live in milliseconds (optional)
}

/**
 * Cache options for storing items
 */
export interface CacheOptions {
  version?: string;
  ttl?: number; // Time to live in milliseconds
}

/**
 * Cache key generator function type
 */
export type CacheKeyGenerator<TKey> = (key: TKey) => string;
