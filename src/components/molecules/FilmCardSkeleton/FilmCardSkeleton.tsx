/**
 * Film Card Skeleton Molecule
 *
 * Skeleton loader that mimics the FilmCard structure.
 * Displays skeleton poster and title placeholder.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SkeletonBox } from '../../atoms';
import { spacing } from '../../../core/design/tokens';

interface FilmCardSkeletonProps {
  width?: number;
}

export const FilmCardSkeleton: React.FC<FilmCardSkeletonProps> = ({
  width = 140,
}) => {
  const posterHeight = (width * 3) / 2;

  return (
    <View style={[styles.container, { width }]}>
      <SkeletonBox
        width={width}
        height={posterHeight}
        borderRadius={8}
        style={styles.poster}
      />
      <SkeletonBox
        width={width}
        height={16}
        borderRadius={4}
        style={styles.titleLine1}
      />
      <SkeletonBox
        width={width * 0.7}
        height={16}
        borderRadius={4}
        style={styles.titleLine2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: spacing.md,
  } as ViewStyle,
  poster: {
    marginBottom: spacing.sm,
  } as ViewStyle,
  titleLine1: {
    marginBottom: spacing.xs,
  } as ViewStyle,
  titleLine2: {
    marginTop: 0,
  } as ViewStyle,
});
