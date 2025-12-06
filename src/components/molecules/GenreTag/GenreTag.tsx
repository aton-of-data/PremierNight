/**
 * Genre Tag Molecule
 *
 * Composed of Card and Text atoms.
 * Displays genre as a tag/badge.
 */

import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Card } from '../../atoms';
import { Text } from '../../atoms';
import { spacing } from '../../../core/design/tokens';
import { Genre } from '../../../types/film';

interface GenreTagProps {
  genre: Genre;
}

export const GenreTag: React.FC<GenreTagProps> = ({ genre }) => {
  return (
    <Card variant="outlined" padding="small" style={styles.container}>
      <Text variant="caption.large" color="secondary">
        {genre.name}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  } as ViewStyle,
});
