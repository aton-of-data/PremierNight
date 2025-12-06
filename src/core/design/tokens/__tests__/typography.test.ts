import { typography, TypographyToken } from '../typography';

jest.mock('react-native', () => ({
  Platform: {
    select: jest.fn(obj => obj.ios || obj.android || obj.default),
    OS: 'ios',
  },
}));

describe('typography', () => {
  it('should have all required typography variants', () => {
    expect(typography).toHaveProperty('display');
    expect(typography).toHaveProperty('headline');
    expect(typography).toHaveProperty('body');
    expect(typography).toHaveProperty('caption');
    expect(typography).toHaveProperty('label');
  });

  it('should have valid font properties for all variants', () => {
    const checkTypographyVariant = (variant: any) => {
      expect(variant).toHaveProperty('fontFamily');
      expect(variant).toHaveProperty('fontSize');
      expect(variant).toHaveProperty('lineHeight');
      expect(variant).toHaveProperty('letterSpacing');
      expect(variant).toHaveProperty('fontWeight');
      expect(typeof variant.fontSize).toBe('number');
      expect(typeof variant.lineHeight).toBe('number');
      expect(typeof variant.letterSpacing).toBe('number');
      expect(typeof variant.fontWeight).toBe('string');
      expect(variant.fontSize).toBeGreaterThan(0);
      expect(variant.lineHeight).toBeGreaterThan(0);
    };

    Object.values(typography.display).forEach(checkTypographyVariant);
    Object.values(typography.headline).forEach(checkTypographyVariant);
    Object.values(typography.body).forEach(checkTypographyVariant);
    Object.values(typography.caption).forEach(checkTypographyVariant);
    Object.values(typography.label).forEach(checkTypographyVariant);
  });

  describe('display variant', () => {
    it('should have all display sizes', () => {
      expect(typography.display).toHaveProperty('large');
      expect(typography.display).toHaveProperty('medium');
      expect(typography.display).toHaveProperty('small');
    });

    it('should have correct values for display variants', () => {
      expect(typography.display.large.fontSize).toBe(34);
      expect(typography.display.large.lineHeight).toBe(41);
      expect(typography.display.large.fontWeight).toBe('700');

      expect(typography.display.medium.fontSize).toBe(28);
      expect(typography.display.medium.lineHeight).toBe(34);
      expect(typography.display.medium.fontWeight).toBe('700');

      expect(typography.display.small.fontSize).toBe(22);
      expect(typography.display.small.lineHeight).toBe(28);
      expect(typography.display.small.fontWeight).toBe('600');
    });
  });

  describe('headline variant', () => {
    it('should have all headline sizes', () => {
      expect(typography.headline).toHaveProperty('large');
      expect(typography.headline).toHaveProperty('medium');
      expect(typography.headline).toHaveProperty('small');
    });

    it('should have correct values for headline variants', () => {
      expect(typography.headline.large.fontSize).toBe(20);
      expect(typography.headline.large.lineHeight).toBe(25);
      expect(typography.headline.large.fontWeight).toBe('600');

      expect(typography.headline.medium.fontSize).toBe(17);
      expect(typography.headline.medium.lineHeight).toBe(22);
      expect(typography.headline.medium.fontWeight).toBe('600');

      expect(typography.headline.small.fontSize).toBe(15);
      expect(typography.headline.small.lineHeight).toBe(20);
      expect(typography.headline.small.fontWeight).toBe('500');
    });
  });

  describe('body variant', () => {
    it('should have all body sizes', () => {
      expect(typography.body).toHaveProperty('large');
      expect(typography.body).toHaveProperty('medium');
      expect(typography.body).toHaveProperty('small');
    });

    it('should have correct values for body variants', () => {
      expect(typography.body.large.fontSize).toBe(17);
      expect(typography.body.large.lineHeight).toBe(24);
      expect(typography.body.large.fontWeight).toBe('400');

      expect(typography.body.medium.fontSize).toBe(15);
      expect(typography.body.medium.lineHeight).toBe(20);
      expect(typography.body.medium.fontWeight).toBe('400');

      expect(typography.body.small.fontSize).toBe(13);
      expect(typography.body.small.lineHeight).toBe(18);
      expect(typography.body.small.fontWeight).toBe('400');
    });
  });

  describe('caption variant', () => {
    it('should have all caption sizes', () => {
      expect(typography.caption).toHaveProperty('large');
      expect(typography.caption).toHaveProperty('small');
    });

    it('should have correct values for caption variants', () => {
      expect(typography.caption.large.fontSize).toBe(12);
      expect(typography.caption.large.lineHeight).toBe(16);
      expect(typography.caption.large.fontWeight).toBe('400');

      expect(typography.caption.small.fontSize).toBe(11);
      expect(typography.caption.small.lineHeight).toBe(13);
      expect(typography.caption.small.fontWeight).toBe('400');
    });
  });

  describe('label variant', () => {
    it('should have all label sizes', () => {
      expect(typography.label).toHaveProperty('large');
      expect(typography.label).toHaveProperty('medium');
      expect(typography.label).toHaveProperty('small');
    });

    it('should have correct values for label variants', () => {
      expect(typography.label.large.fontSize).toBe(15);
      expect(typography.label.large.lineHeight).toBe(20);
      expect(typography.label.large.fontWeight).toBe('500');

      expect(typography.label.medium.fontSize).toBe(13);
      expect(typography.label.medium.lineHeight).toBe(18);
      expect(typography.label.medium.fontWeight).toBe('500');

      expect(typography.label.small.fontSize).toBe(11);
      expect(typography.label.small.lineHeight).toBe(13);
      expect(typography.label.small.fontWeight).toBe('500');
    });
  });

  it('should export TypographyToken type', () => {
    const token: TypographyToken = typography;
    expect(token).toBeDefined();
  });

  it('should have consistent typography structure', () => {
    expect(typeof typography).toBe('object');
    expect(Array.isArray(typography)).toBe(false);
  });
});
