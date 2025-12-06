import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing } from '../../../core/design/tokens';
import { Text } from '../Text';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Generates button style based on variant and size.
 */
const getButtonStyle = (
  variant: ButtonVariant,
  size: ButtonSize,
): ViewStyle => {
  const baseStyle: ViewStyle = {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  };

  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    small: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      minHeight: 36,
    },
    medium: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      minHeight: 48,
    },
    large: {
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xl,
      minHeight: 56,
    },
  };

  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: colors.accent.gold,
    },
    secondary: {
      backgroundColor: colors.background.secondary,
      borderWidth: 1,
      borderColor: colors.border.medium,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
  };

  return {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};

/**
 * Maps button size to text variant.
 */
const getTextVariant = (
  size: ButtonSize,
): 'label.large' | 'label.medium' | 'label.small' => {
  switch (size) {
    case 'small':
      return 'label.small';
    case 'large':
      return 'label.large';
    default:
      return 'label.medium';
  }
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled,
  children,
  style,
  ...props
}) => {
  const buttonStyle = getButtonStyle(variant, size);
  const textVariant = getTextVariant(size);
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[buttonStyle, isDisabled && styles.disabled, style]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary' ? colors.text.primary : colors.text.secondary
          }
          size="small"
        />
      ) : (
        <Text
          variant={textVariant}
          color={variant === 'primary' ? 'primary' : 'primary'}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  } as ViewStyle,
});
