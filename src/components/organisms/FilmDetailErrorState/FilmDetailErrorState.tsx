/**
 * Film Detail Error State Organism
 *
 * Uses RTK Query directly - simple and reactive.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ErrorState } from '@components/molecules';
import { spacing } from '@core/design/tokens';
import { useGetFilmDetailsQuery } from '@store/api/tmdbApi';
import type { FilmDetailScreenProps } from '@domain/navigation';

/**
 * Film detail error state component.
 *
 * @returns The film detail error state component.
 *
 * @example
 * <FilmDetailErrorState />
 */
export const FilmDetailErrorState: React.FC = () => {
  const route = useRoute<FilmDetailScreenProps['route']>();
  const filmId = route.params.filmId;
  const { refetch } = useGetFilmDetailsQuery(filmId);

  const handleRetry = React.useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <View style={styles.errorContainer}>
      <ErrorState
        title="Unable to load film"
        message="Please check your connection and try again."
        onRetry={handleRetry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
});
