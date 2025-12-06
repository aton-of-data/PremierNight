/**
 * SearchBar Container Organism
 *
 * Uses Redux directly - simple and reactive.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SearchBarWithContext } from '@components/molecules';
import { spacing } from '@core/design/tokens';

export const SearchBarContainer: React.FC = () => {
  return (
    <View style={styles.container}>
      <SearchBarWithContext />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  } as ViewStyle,
});
