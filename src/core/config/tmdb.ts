import Config from 'react-native-config';

export const TMDbConfig = {
  API_KEY: Config.TMDB_API_KEY || '',
  API_BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
} as const;
