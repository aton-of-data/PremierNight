import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { FilmPoster } from '@components/molecules';
import { GenreTag } from '@components/molecules';
import { Text } from '@components/atoms';
import { spacing } from '@core/design/tokens';
import { Film } from '@domain/film';

export interface FilmHeaderProps {
  film: Film;
}

/**
 * Formats date string to readable format.
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Film header component.
 *
 * @param film - The film to display in the header.
 * @returns The film header component.
 *
 * @example
 * <FilmHeader film={film} />
 */
const FilmHeaderComponent: React.FC<FilmHeaderProps> = ({ film }) => {
  const formattedDate = React.useMemo(
    () => (film.release_date ? formatDate(film.release_date) : null),
    [film.release_date],
  );

  return (
    <View style={styles.container}>
      <View style={styles.posterContainer}>
        <FilmPoster film={film} width={200} />
      </View>

      <View style={styles.header}>
        <Text variant="display.medium" style={styles.title}>
          {film.title}
        </Text>
        {formattedDate && (
          <Text variant="body.medium" color="secondary" style={styles.date}>
            {formattedDate}
          </Text>
        )}
      </View>

      {film.genres && film.genres.length > 0 && (
        <View style={styles.genresContainer}>
          {film.genres.map(genre => (
            <GenreTag key={genre.id} genre={genre} />
          ))}
        </View>
      )}
    </View>
  );
};

export const FilmHeader = React.memo(FilmHeaderComponent);

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  } as ViewStyle,
  posterContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  } as ViewStyle,
  header: {
    marginBottom: spacing.md,
  } as ViewStyle,
  title: {
    marginBottom: spacing.sm,
  } as ViewStyle,
  date: {
    marginTop: spacing.xs,
  } as ViewStyle,
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  } as ViewStyle,
});
