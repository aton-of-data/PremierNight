import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { colors, spacing } from '../../../core/design/tokens';

export interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

/**
 * Generates card style based on variant.
 */
const getCardStyle = (variant: CardProps['variant']): ViewStyle => {
  const baseStyle: ViewStyle = {
    borderRadius: 12,
    backgroundColor: colors.background.elevated,
  };

  switch (variant) {
    case 'elevated':
      return {
        ...baseStyle,
        shadowColor: colors.neutral.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      };
    case 'outlined':
      return {
        ...baseStyle,
        borderWidth: 1,
        borderColor: colors.border.light,
      };
    case 'flat':
    default:
      return baseStyle;
  }
};

/**
 * Gets padding value based on padding prop.
 */
const getPadding = (padding: CardProps['padding']): number => {
  switch (padding) {
    case 'none':
      return 0;
    case 'small':
      return spacing.sm;
    case 'medium':
      return spacing.md;
    case 'large':
      return spacing.lg;
    default:
      return spacing.md;
  }
};

/**
 *
 * Card component.
 *
 * @param variant - The variant of the card.
 * @param padding - The padding of the card.
 * @param style - The style of the card.
 * @param children - The children of the card.
 * @param props - The props of the card.
 * @returns The card component.
 *
 * @example
 * <Card variant="elevated" padding="medium">
 *   <Text>Card content</Text>
 * </Card>
 */
export const Card: React.FC<CardProps> = ({
  variant = 'flat',
  padding = 'medium',
  style,
  children,
  ...props
}) => {
  const cardStyle = getCardStyle(variant);
  const paddingValue = getPadding(padding);

  return (
    <View style={[cardStyle, { padding: paddingValue }, style]} {...props}>
      {children}
    </View>
  );
};
