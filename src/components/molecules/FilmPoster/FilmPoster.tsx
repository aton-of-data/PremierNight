/**
 * Film Poster Molecule
 *
 * Composed of Image atom to display film poster
 * with proper aspect ratio and placeholder handling.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Image } from '../../atoms';
import { colors, spacing } from '../../../core/design/tokens';
import { Film } from '../../../types/film';
import { getPosterUrl } from '../../../core/utils/tmdbImages';

export interface FilmPosterProps {
  film: Film;
  width?: number;
  onPress?: (film: Film) => void;
}

const FilmPosterComponent: React.FC<FilmPosterProps> = ({
  film,
  width = 140,
  onPress,
}) => {
  const posterUrl = React.useMemo(
    () => getPosterUrl(film.poster_path, 'w500'),
    [film.poster_path],
  );

  const handlePress = React.useCallback(() => {
    onPress?.(film);
  }, [onPress, film]);

  const content = (
    <View style={[styles.container, { width }]}>
      <View style={styles.posterContainer}>
        <Image
          source={posterUrl ? { uri: posterUrl } : undefined}
          placeholder="No Image"
          style={styles.image as any}
          resizeMode="cover"
        />
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

export const FilmPoster = React.memo(FilmPosterComponent);

const styles = StyleSheet.create({
  container: {
    marginRight: spacing.md,
  } as ViewStyle,
  posterContainer: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.background.secondary,
  } as ViewStyle,
  image: {
    width: '100%',
    height: '100%',
  },
});
