/**
 * Film Detail Content Organism
 *
 * Uses RTK Query and Redux directly - simple and reactive.
 */

import React from 'react';
import { View, ScrollView, Image, StyleSheet, ImageStyle } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FilmHeader } from '../FilmHeader';
import { FilmSynopsis } from '../FilmSynopsis';
import { WatchlistButton } from '@components/molecules';
import { spacing } from '@core/design/tokens';
import { useGetFilmDetailsQuery } from '@store/api/tmdbApi';
import {
  useGetWatchlistQuery,
  useToggleFilmInWatchlistMutation,
} from '@store/api/watchlistApi';
import { getBackdropUrl } from '@core/utils/tmdbImages';
import type { FilmDetailScreenProps } from '@domain/navigation';

/**
 * Film detail content component.
 *
 * @returns The film detail content component.
 *
 * @example
 * <FilmDetailContent />
 */
export const FilmDetailContent: React.FC = () => {
  const route = useRoute<FilmDetailScreenProps['route']>();
  const filmId = route.params.filmId;
  const { data: film } = useGetFilmDetailsQuery(filmId);
  const { data: watchlist = [] } = useGetWatchlistQuery();
  const [toggleFilm, { isLoading: watchlistLoading }] =
    useToggleFilmInWatchlistMutation();

  const isInWatchlist = React.useMemo(
    () => watchlist.some(f => f.id === filmId),
    [watchlist, filmId],
  );

  const handleToggleWatchlist = React.useCallback(() => {
    if (film) {
      toggleFilm(film);
    }
  }, [film, toggleFilm]);

  if (!film) {
    return null;
  }

  const backdropUrl = getBackdropUrl(film.backdrop_path);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {backdropUrl && (
        <Image source={{ uri: backdropUrl }} style={styles.backdrop} />
      )}

      <View style={styles.content}>
        <FilmHeader film={film} />

        {film.overview && <FilmSynopsis synopsis={film.overview} />}

        <View style={styles.actionsContainer}>
          <WatchlistButton
            isInWatchlist={isInWatchlist}
            onPress={handleToggleWatchlist}
            loading={watchlistLoading}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  backdrop: {
    width: '100%',
    height: 300,
    position: 'absolute',
    top: 0,
    opacity: 0.3,
  } as ImageStyle,
  content: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.xl,
  },
  actionsContainer: {
    marginTop: spacing.md,
  },
});
