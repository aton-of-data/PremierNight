/**
 * Text Atom
 *
 * Base text component with typography tokens.
 * Foundation for all text in the app.
 */

import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';
import { typography, colors } from '../../../core/design/tokens';

export type TextVariant =
  | 'display.large'
  | 'display.medium'
  | 'display.small'
  | 'headline.large'
  | 'headline.medium'
  | 'headline.small'
  | 'body.large'
  | 'body.medium'
  | 'body.small'
  | 'caption.large'
  | 'caption.small'
  | 'label.large'
  | 'label.medium'
  | 'label.small';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverse'
  | 'accent';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
  children: React.ReactNode;
}

/**
 * Gets typography style based on variant.
 */
const getTypographyStyle = (variant: TextVariant): TextStyle => {
  const [category, size] = variant.split('.') as [
    keyof typeof typography,
    string,
  ];
  const categoryObj = typography[category];
  if (!categoryObj || typeof categoryObj !== 'object') {
    return typography.body.medium;
  }
  return ((categoryObj as any)[size] as TextStyle) || typography.body.medium;
};

/**
 * Gets color value from color token.
 */
const getColor = (color: TextColor): string => {
  return colors.text[color];
};

export const Text: React.FC<TextProps> = ({
  variant = 'body.medium',
  color = 'primary',
  style,
  children,
  ...props
}) => {
  const typographyStyle = getTypographyStyle(variant);
  const colorValue = getColor(color);

  return (
    <RNText style={[typographyStyle, { color: colorValue }, style]} {...props}>
      {children}
    </RNText>
  );
};
