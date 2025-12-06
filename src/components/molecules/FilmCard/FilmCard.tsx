/**
 * Film Card Molecule
 *
 * Composed of FilmPoster and Text atoms.
 * Complete film card for carousels and lists.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { FilmPoster } from '../FilmPoster';
import { Text } from '../../atoms';
import { spacing } from '../../../core/design/tokens';
import type { FilmItemProps } from '@domain/components';

interface FilmCardProps extends FilmItemProps {
  width?: number;
}

const FilmCardComponent: React.FC<FilmCardProps> = ({
  film,
  onPress,
  width = 140,
}) => {
  return (
    <View style={[styles.container, { width }]}>
      <FilmPoster film={film} width={width} onPress={onPress} />
      <Text variant="headline.small" numberOfLines={2} style={styles.title}>
        {film.title}
      </Text>
    </View>
  );
};

export const FilmCard = React.memo(FilmCardComponent);

const styles = StyleSheet.create({
  container: {
    marginRight: spacing.md,
    marginBottom: spacing.lg,
  } as ViewStyle,
  title: {
    marginTop: spacing.sm,
  } as ViewStyle,
});
