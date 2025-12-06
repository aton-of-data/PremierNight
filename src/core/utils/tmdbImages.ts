import { TMDbConfig } from '@core/config/tmdb';

const { IMAGE_BASE_URL } = TMDbConfig;

/**
 * Get poster image URL
 */
export function getPosterUrl(
  path: string | null,
  size: 'w200' | 'w300' | 'w500' = 'w500',
): string | null {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

/**
 * Get backdrop image URL
 */
export function getBackdropUrl(
  path: string | null,
  size: 'w300' | 'w780' | 'w1280' = 'w1280',
): string | null {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}
