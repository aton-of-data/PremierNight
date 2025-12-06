import { Platform } from 'react-native';

const fontFamily = {
  regular: Platform.select({
    ios: 'SF Pro Display',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'SF Pro Display',
    android: 'Roboto',
    default: 'System',
  }),
  semibold: Platform.select({
    ios: 'SF Pro Display',
    android: 'Roboto',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'SF Pro Display',
    android: 'Roboto',
    default: 'System',
  }),
} as const;

export const typography = {
  display: {
    large: {
      fontFamily: fontFamily.bold,
      fontSize: 34,
      lineHeight: 41,
      letterSpacing: 0.37,
      fontWeight: '700' as const,
    },
    medium: {
      fontFamily: fontFamily.bold,
      fontSize: 28,
      lineHeight: 34,
      letterSpacing: 0.36,
      fontWeight: '700' as const,
    },
    small: {
      fontFamily: fontFamily.semibold,
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: 0.35,
      fontWeight: '600' as const,
    },
  },

  headline: {
    large: {
      fontFamily: fontFamily.semibold,
      fontSize: 20,
      lineHeight: 25,
      letterSpacing: 0.38,
      fontWeight: '600' as const,
    },
    medium: {
      fontFamily: fontFamily.semibold,
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: -0.41,
      fontWeight: '600' as const,
    },
    small: {
      fontFamily: fontFamily.medium,
      fontSize: 15,
      lineHeight: 20,
      letterSpacing: -0.24,
      fontWeight: '500' as const,
    },
  },

  body: {
    large: {
      fontFamily: fontFamily.regular,
      fontSize: 17,
      lineHeight: 24,
      letterSpacing: -0.41,
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: fontFamily.regular,
      fontSize: 15,
      lineHeight: 20,
      letterSpacing: -0.24,
      fontWeight: '400' as const,
    },
    small: {
      fontFamily: fontFamily.regular,
      fontSize: 13,
      lineHeight: 18,
      letterSpacing: -0.08,
      fontWeight: '400' as const,
    },
  },

  caption: {
    large: {
      fontFamily: fontFamily.regular,
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
      fontWeight: '400' as const,
    },
    small: {
      fontFamily: fontFamily.regular,
      fontSize: 11,
      lineHeight: 13,
      letterSpacing: 0.07,
      fontWeight: '400' as const,
    },
  },

  label: {
    large: {
      fontFamily: fontFamily.medium,
      fontSize: 15,
      lineHeight: 20,
      letterSpacing: -0.24,
      fontWeight: '500' as const,
    },
    medium: {
      fontFamily: fontFamily.medium,
      fontSize: 13,
      lineHeight: 18,
      letterSpacing: -0.08,
      fontWeight: '500' as const,
    },
    small: {
      fontFamily: fontFamily.medium,
      fontSize: 11,
      lineHeight: 13,
      letterSpacing: 0.07,
      fontWeight: '500' as const,
    },
  },
} as const;

export type TypographyToken = typeof typography;
