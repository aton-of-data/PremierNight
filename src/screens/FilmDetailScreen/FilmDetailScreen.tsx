import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import {
  FilmDetailPendingState,
  FilmDetailErrorState,
  FilmDetailContent,
} from '@components/organisms';
import { colors } from '@core/design/tokens';
import { useGetFilmDetailsQuery } from '@store/api/tmdbApi';
import type { FilmDetailScreenProps } from '@domain/navigation';

/**
 * Film Detail Content
 *
 * Renders based on RTK Query state.
 */
const FilmDetailScreenContent: React.FC = () => {
  const route = useRoute<FilmDetailScreenProps['route']>();
  const filmId = route.params.filmId;
  const { isLoading, isError, isFetching } = useGetFilmDetailsQuery(filmId);

  if (isLoading || isFetching) {
    return <FilmDetailPendingState />;
  }

  if (isError) {
    return <FilmDetailErrorState />;
  }

  return <FilmDetailContent />;
};

/**
 * Film Detail Screen
 */
export const FilmDetailScreen: React.FC<FilmDetailScreenProps> = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FilmDetailScreenContent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});
