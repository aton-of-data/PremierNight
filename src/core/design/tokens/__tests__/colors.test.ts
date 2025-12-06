import { colors, ColorToken } from '../colors';

describe('colors', () => {
  it('should have all required color groups', () => {
    expect(colors).toHaveProperty('neutral');
    expect(colors).toHaveProperty('accent');
    expect(colors).toHaveProperty('semantic');
    expect(colors).toHaveProperty('background');
    expect(colors).toHaveProperty('text');
    expect(colors).toHaveProperty('border');
  });

  describe('neutral colors', () => {
    it('should have all neutral color values', () => {
      expect(colors.neutral).toHaveProperty('white');
      expect(colors.neutral).toHaveProperty('black');
      expect(colors.neutral).toHaveProperty('blackRich');
      expect(colors.neutral).toHaveProperty('charcoal');
      expect(colors.neutral).toHaveProperty('slate');
      expect(colors.neutral).toHaveProperty('gray');
      expect(colors.neutral).toHaveProperty('lightGray');
      expect(colors.neutral).toHaveProperty('offWhite');
    });

    it('should have valid hex color values for neutral', () => {
      expect(colors.neutral.white).toMatch(/^#[0-9A-F]{6}$/i);
      expect(colors.neutral.black).toMatch(/^#[0-9A-F]{6}$/i);
      expect(colors.neutral.blackRich).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  describe('accent colors', () => {
    it('should have all accent color values', () => {
      expect(colors.accent).toHaveProperty('gold');
      expect(colors.accent).toHaveProperty('champagne');
      expect(colors.accent).toHaveProperty('goldLight');
      expect(colors.accent).toHaveProperty('goldDark');
    });

    it('should have valid hex color values for accent', () => {
      expect(colors.accent.gold).toMatch(/^#[0-9A-F]{6}$/i);
      expect(colors.accent.champagne).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  describe('semantic colors', () => {
    it('should have all semantic color values', () => {
      expect(colors.semantic).toHaveProperty('success');
      expect(colors.semantic).toHaveProperty('error');
      expect(colors.semantic).toHaveProperty('warning');
      expect(colors.semantic).toHaveProperty('info');
    });

    it('should have valid hex color values for semantic', () => {
      expect(colors.semantic.success).toMatch(/^#[0-9A-F]{6}$/i);
      expect(colors.semantic.error).toMatch(/^#[0-9A-F]{6}$/i);
      expect(colors.semantic.warning).toMatch(/^#[0-9A-F]{6}$/i);
      expect(colors.semantic.info).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  describe('background colors', () => {
    it('should have all background color values', () => {
      expect(colors.background).toHaveProperty('primary');
      expect(colors.background).toHaveProperty('secondary');
      expect(colors.background).toHaveProperty('tertiary');
      expect(colors.background).toHaveProperty('elevated');
      expect(colors.background).toHaveProperty('overlay');
    });

    it('should have valid color values for background', () => {
      expect(colors.background.primary).toMatch(
        /^(#[0-9A-F]{6}|rgba?\(.+\))$/i,
      );
      expect(colors.background.overlay).toMatch(/^rgba?\(.+\)$/i);
    });
  });

  describe('text colors', () => {
    it('should have all text color values', () => {
      expect(colors.text).toHaveProperty('primary');
      expect(colors.text).toHaveProperty('secondary');
      expect(colors.text).toHaveProperty('tertiary');
      expect(colors.text).toHaveProperty('inverse');
      expect(colors.text).toHaveProperty('accent');
    });

    it('should have valid hex color values for text', () => {
      expect(colors.text.primary).toMatch(/^#[0-9A-F]{6}$/i);
      expect(colors.text.inverse).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  describe('border colors', () => {
    it('should have all border color values', () => {
      expect(colors.border).toHaveProperty('light');
      expect(colors.border).toHaveProperty('medium');
      expect(colors.border).toHaveProperty('dark');
    });

    it('should have valid hex color values for border', () => {
      expect(colors.border.light).toMatch(/^#[0-9A-F]{6}$/i);
      expect(colors.border.medium).toMatch(/^#[0-9A-F]{6}$/i);
      expect(colors.border.dark).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  it('should export ColorToken type', () => {
    const token: ColorToken = colors;
    expect(token).toBeDefined();
  });

  it('should have consistent color structure', () => {
    expect(typeof colors.neutral).toBe('object');
    expect(typeof colors.accent).toBe('object');
    expect(typeof colors.semantic).toBe('object');
    expect(typeof colors.background).toBe('object');
    expect(typeof colors.text).toBe('object');
    expect(typeof colors.border).toBe('object');
  });
});
