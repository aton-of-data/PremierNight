import type { LinkingOptions } from '@react-navigation/native';
import type { RootStackParamList } from '@domain/navigation';

/**
 * Deep Linking Configuration
 *
 * Handles deep links for navigating to specific films.
 * Supports: premiere://film/:filmId
 */
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['premiere://', 'https://premiere-night.app'],
  config: {
    screens: {
      HomeTabs: {
        screens: {
          Home: 'home',
          Watchlist: 'watchlist',
        },
      },
      FilmDetail: 'film/:filmId',
    },
  },
};

export default linking;
