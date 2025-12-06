/**
 * Popular Carousel Organism
 *
 * Uses RTK Query directly - simple and reactive.
 */

import React, { useCallback } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FilmCarousel } from '@components/organisms';
import { ErrorState } from '@components/molecules';
import { spacing } from '@core/design/tokens';
import { useGetPopularQuery } from '@store/api/tmdbApi';
import type { SpotlightHomeScreenNavigationProp } from '@domain/navigation';
import type { Film } from '@domain/film';

/**
 * Popular carousel component.
 *
 * @returns The popular carousel component.
 *
 * @example
 * <PopularCarousel />
 */
export const PopularCarousel: React.FC = () => {
  const navigation = useNavigation<SpotlightHomeScreenNavigationProp>();
  const { data, isLoading, isError, error, refetch } = useGetPopularQuery();

  const handleFilmPress = useCallback(
    (film: Film) => {
      navigation.navigate('FilmDetail', { filmId: film.id });
    },
    [navigation],
  );

  if (isError) {
    return (
      <View style={styles.errorSection}>
        <ErrorState
          title="Popular"
          message={error ? 'Failed to load films' : 'Unknown error'}
          onRetry={refetch}
          retryLabel="Retry"
        />
      </View>
    );
  }

  if (isLoading || !data) {
    return null;
  }

  return (
    <FilmCarousel
      title="Popular"
      films={data.results}
      onPress={handleFilmPress}
    />
  );
};

const styles = StyleSheet.create({
  errorSection: {
    minHeight: 200,
    marginVertical: spacing.lg,
  } as ViewStyle,
});
