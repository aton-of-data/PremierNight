import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from '@core/logger';

/**
 * Storage Interface
 *
 * Mimics AsyncStorage API with automatic JSON handling.
 * All operations are logged for debugging.
 */
export const storage = {
  /**
   * Get item from storage and parse as JSON
   */
  getItem: async <T>(key: string): Promise<T | null> => {
    try {
      logger.debug('Storage: Getting item', {
        tags: ['storage'],
        context: { key },
      });
      const value = await AsyncStorage.getItem(key);

      if (value === null) {
        logger.debug('Storage: Item not found', {
          tags: ['storage'],
          context: { key },
        });
        return null;
      }

      const parsed = JSON.parse(value) as T;
      logger.debug('Storage: Item retrieved', {
        tags: ['storage'],
        context: { key },
      });
      return parsed;
    } catch (error) {
      logger.error('Storage: Failed to get item', error, {
        tags: ['storage', 'error'],
        context: { key },
      });

      if (error instanceof SyntaxError) {
        return null;
      }
      throw error;
    }
  },

  /**
   * Set item in storage as JSON string
   */
  setItem: async <T>(key: string, value: T): Promise<void> => {
    try {
      logger.debug('Storage: Setting item', {
        tags: ['storage'],
        context: { key },
      });
      const serialized = JSON.stringify(value);
      await AsyncStorage.setItem(key, serialized);
      logger.debug('Storage: Item saved', {
        tags: ['storage'],
        context: { key },
      });
    } catch (error) {
      logger.error('Storage: Failed to set item', error, {
        tags: ['storage', 'error'],
        context: { key },
      });
      throw error;
    }
  },

  /**
   * Remove item from storage
   */
  removeItem: async (key: string): Promise<void> => {
    try {
      logger.debug('Storage: Removing item', {
        tags: ['storage'],
        context: { key },
      });
      await AsyncStorage.removeItem(key);
      logger.debug('Storage: Item removed', {
        tags: ['storage'],
        context: { key },
      });
    } catch (error) {
      logger.error('Storage: Failed to remove item', error, {
        tags: ['storage', 'error'],
        context: { key },
      });
      throw error;
    }
  },

  /**
   * Clear all items from storage
   */
  clear: async (): Promise<void> => {
    try {
      logger.debug('Storage: Clearing all items', { tags: ['storage'] });
      await AsyncStorage.clear();
      logger.debug('Storage: All items cleared', { tags: ['storage'] });
    } catch (error) {
      logger.error('Storage: Failed to clear storage', error, {
        tags: ['storage', 'error'],
      });
      throw error;
    }
  },
};
