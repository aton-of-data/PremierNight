import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FilmCarousel, FilmCarouselSkeleton } from '@components/organisms';
import { ErrorState } from '@components/molecules';
import { spacing } from '@core/design/tokens';
import { useLazySearchMoviesQuery } from '@store/api/tmdbApi';
import { useAppSelector } from '@core/store';
import type { SpotlightHomeScreenNavigationProp } from '@domain/navigation';
import type { Film } from '@domain/film';

/**
 * Search results carousel component.
 *
 * @returns The search results carousel component.
 *
 * @example
 * <SearchResultsCarousel />
 */
export const SearchResultsCarousel: React.FC = () => {
  const navigation = useNavigation<SpotlightHomeScreenNavigationProp>();
  const searchQuery = useAppSelector(state => state.spotlightHome.searchQuery);
  const [triggerSearch, { data, isLoading, isError, error }] =
    useLazySearchMoviesQuery();

  useEffect(() => {
    if (searchQuery.trim()) {
      triggerSearch({ query: searchQuery });
    }
  }, [searchQuery, triggerSearch]);

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
          title="Search failed"
          message={error ? 'Failed to search films' : 'Unknown error'}
          onRetry={() => triggerSearch({ query: searchQuery })}
          retryLabel="Retry"
        />
      </View>
    );
  }

  if (isLoading) {
    return <FilmCarouselSkeleton title="Search Results" />;
  }

  if (data && data.results.length === 0) {
    return (
      <View style={styles.errorSection}>
        <ErrorState
          title="No results found"
          message="Try searching for a different film"
        />
      </View>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <FilmCarousel
      title="Search Results"
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
