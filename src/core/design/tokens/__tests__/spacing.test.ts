import { spacing, SpacingToken } from '../spacing';

describe('spacing', () => {
  it('should have all required spacing values', () => {
    expect(spacing).toHaveProperty('xs');
    expect(spacing).toHaveProperty('sm');
    expect(spacing).toHaveProperty('md');
    expect(spacing).toHaveProperty('lg');
    expect(spacing).toHaveProperty('xl');
    expect(spacing).toHaveProperty('xxl');
    expect(spacing).toHaveProperty('xxxl');
    expect(spacing).toHaveProperty('huge');
    expect(spacing).toHaveProperty('screenPadding');
    expect(spacing).toHaveProperty('cardPadding');
    expect(spacing).toHaveProperty('sectionGap');
    expect(spacing).toHaveProperty('elementGap');
    expect(spacing).toHaveProperty('tightGap');
  });

  it('should have numeric spacing values', () => {
    expect(typeof spacing.xs).toBe('number');
    expect(typeof spacing.sm).toBe('number');
    expect(typeof spacing.md).toBe('number');
    expect(typeof spacing.lg).toBe('number');
    expect(typeof spacing.xl).toBe('number');
    expect(typeof spacing.xxl).toBe('number');
    expect(typeof spacing.xxxl).toBe('number');
    expect(typeof spacing.huge).toBe('number');
  });

  it('should have spacing values in ascending order', () => {
    expect(spacing.xs).toBeLessThan(spacing.sm);
    expect(spacing.sm).toBeLessThan(spacing.md);
    expect(spacing.md).toBeLessThan(spacing.lg);
    expect(spacing.lg).toBeLessThan(spacing.xl);
    expect(spacing.xl).toBeLessThan(spacing.xxl);
    expect(spacing.xxl).toBeLessThan(spacing.xxxl);
    expect(spacing.xxxl).toBeLessThan(spacing.huge);
  });

  it('should have correct spacing scale values', () => {
    expect(spacing.xs).toBe(4);
    expect(spacing.sm).toBe(8);
    expect(spacing.md).toBe(16);
    expect(spacing.lg).toBe(24);
    expect(spacing.xl).toBe(32);
    expect(spacing.xxl).toBe(40);
    expect(spacing.xxxl).toBe(48);
    expect(spacing.huge).toBe(64);
  });

  it('should have semantic spacing values', () => {
    expect(spacing.screenPadding).toBe(20);
    expect(spacing.cardPadding).toBe(16);
    expect(spacing.sectionGap).toBe(32);
    expect(spacing.elementGap).toBe(16);
    expect(spacing.tightGap).toBe(8);
  });

  it('should have positive spacing values', () => {
    Object.values(spacing).forEach(value => {
      expect(value).toBeGreaterThan(0);
    });
  });

  it('should export SpacingToken type', () => {
    const token: SpacingToken = spacing;
    expect(token).toBeDefined();
  });

  it('should have consistent spacing structure', () => {
    expect(typeof spacing).toBe('object');
    expect(Array.isArray(spacing)).toBe(false);
  });
});
