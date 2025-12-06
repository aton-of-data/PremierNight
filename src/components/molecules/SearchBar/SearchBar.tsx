/**
 * SearchBar Molecule
 *
 * Premium search input component with elegant styling.
 * Follows luxury design principles with minimal, refined aesthetics.
 */

import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, typography } from '@core/design/tokens';

export interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  loading?: boolean;
  containerStyle?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  loading = false,
  containerStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.text.tertiary}
        {...props}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.accent.gold} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.elevated,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  } as ViewStyle,
  input: {
    flex: 1,
    ...typography.body.medium,
    color: colors.text.primary,
    paddingVertical: spacing.sm,
  } as ViewStyle,
  loadingContainer: {
    marginLeft: spacing.sm,
  } as ViewStyle,
});
