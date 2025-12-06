import { getPosterUrl, getBackdropUrl } from '../tmdbImages';
import { TMDbConfig } from '../../config/tmdb';

jest.mock('../../config/tmdb', () => ({
  TMDbConfig: {
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  },
}));

describe('tmdbImages', () => {
  describe('getPosterUrl', () => {
    it('should return null when path is null', () => {
      const result = getPosterUrl(null);

      expect(result).toBeNull();
    });

    it('should return null when path is empty string', () => {
      const result = getPosterUrl('');

      expect(result).toBeNull();
    });

    it('should return poster URL with default size (w500)', () => {
      const path = '/poster.jpg';
      const result = getPosterUrl(path);

      expect(result).toBe(`${TMDbConfig.IMAGE_BASE_URL}/w500${path}`);
    });

    it('should return poster URL with w200 size', () => {
      const path = '/poster.jpg';
      const result = getPosterUrl(path, 'w200');

      expect(result).toBe(`${TMDbConfig.IMAGE_BASE_URL}/w200${path}`);
    });

    it('should return poster URL with w300 size', () => {
      const path = '/poster.jpg';
      const result = getPosterUrl(path, 'w300');

      expect(result).toBe(`${TMDbConfig.IMAGE_BASE_URL}/w300${path}`);
    });

    it('should return poster URL with w500 size', () => {
      const path = '/poster.jpg';
      const result = getPosterUrl(path, 'w500');

      expect(result).toBe(`${TMDbConfig.IMAGE_BASE_URL}/w500${path}`);
    });

    it('should handle paths starting with /', () => {
      const path = '/example/poster.jpg';
      const result = getPosterUrl(path);

      expect(result).toBe(`${TMDbConfig.IMAGE_BASE_URL}/w500${path}`);
    });

    it('should handle paths without leading /', () => {
      const path = 'example/poster.jpg';
      const result = getPosterUrl(path);

      // The function concatenates path directly after size without adding /
      expect(result).toBe(`${TMDbConfig.IMAGE_BASE_URL}/w500${path}`);
    });
  });

  describe('getBackdropUrl', () => {
    it('should return null when path is null', () => {
      const result = getBackdropUrl(null);

      expect(result).toBeNull();
    });

    it('should return null when path is empty string', () => {
      const result = getBackdropUrl('');

      expect(result).toBeNull();
    });

    it('should return backdrop URL with default size (w1280)', () => {
      const path = '/backdrop.jpg';
      const result = getBackdropUrl(path);

      expect(result).toBe(`${TMDbConfig.IMAGE_BASE_URL}/w1280${path}`);
    });

    it('should return backdrop URL with w300 size', () => {
      const path = '/backdrop.jpg';
      const result = getBackdropUrl(path, 'w300');

      expect(result).toBe(`${TMDbConfig.IMAGE_BASE_URL}/w300${path}`);
    });

    it('should return backdrop URL with w780 size', () => {
      const path = '/backdrop.jpg';
      const result = getBackdropUrl(path, 'w780');

      expect(result).toBe(`${TMDbConfig.IMAGE_BASE_URL}/w780${path}`);
    });

    it('should return backdrop URL with w1280 size', () => {
      const path = '/backdrop.jpg';
      const result = getBackdropUrl(path, 'w1280');

      expect(result).toBe(`${TMDbConfig.IMAGE_BASE_URL}/w1280${path}`);
    });

    it('should handle paths starting with /', () => {
      const path = '/example/backdrop.jpg';
      const result = getBackdropUrl(path);

      expect(result).toBe(`${TMDbConfig.IMAGE_BASE_URL}/w1280${path}`);
    });

    it('should handle paths without leading /', () => {
      const path = 'example/backdrop.jpg';
      const result = getBackdropUrl(path);

      // The function concatenates path directly after size without adding /
      expect(result).toBe(`${TMDbConfig.IMAGE_BASE_URL}/w1280${path}`);
    });
  });
});
