export const colors = {
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    blackRich: '#0A0A0A',
    charcoal: '#1A1A1A',
    slate: '#2C2C2E',
    gray: '#8E8E93',
    lightGray: '#C7C7CC',
    offWhite: '#F5F5F7',
  },

  accent: {
    gold: '#D4AF37',
    champagne: '#F7E7CE',
    goldLight: '#E8D5A3',
    goldDark: '#B8941F',
  },

  semantic: {
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
    info: '#007AFF',
  },

  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F7',
    tertiary: '#FAFAFA',
    elevated: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },

  text: {
    primary: '#000000',
    secondary: '#2C2C2E',
    tertiary: '#8E8E93',
    inverse: '#FFFFFF',
    accent: '#D4AF37',
  },

  border: {
    light: '#E5E5EA',
    medium: '#C7C7CC',
    dark: '#8E8E93',
  },
} as const;

export type ColorToken = typeof colors;
