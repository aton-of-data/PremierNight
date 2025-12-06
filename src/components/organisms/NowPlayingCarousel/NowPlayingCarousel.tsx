import React, { useCallback } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FilmCarousel } from '@components/organisms';
import { ErrorState } from '@components/molecules';
import { spacing } from '@core/design/tokens';
import { useGetNowPlayingQuery } from '@store/api/tmdbApi';
import type { SpotlightHomeScreenNavigationProp } from '@domain/navigation';
import type { Film } from '@domain/film';

/**
 * Now playing carousel component.
 *
 * @returns The now playing carousel component.
 *
 * @example
 * <NowPlayingCarousel />
 */
export const NowPlayingCarousel: React.FC = () => {
  const navigation = useNavigation<SpotlightHomeScreenNavigationProp>();
  const { data, isLoading, isError, error, refetch } = useGetNowPlayingQuery();

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
          title="Now Playing"
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
      title="Now Playing"
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
