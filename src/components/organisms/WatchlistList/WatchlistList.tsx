import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WatchlistItem } from '@components/organisms';
import { WatchlistHeader } from '@components/organisms';
import { colors, spacing } from '@core/design/tokens';
import {
  useGetWatchlistQuery,
  useRemoveFilmFromWatchlistMutation,
} from '@store/api/watchlistApi';
import type { Film } from '@domain/film';
import type { WatchlistScreenNavigationProp } from '@domain/navigation';

/**
 * Watchlist List Organism
 *
 * @returns The watchlist list component.
 *
 * @example
 * <WatchlistList />
 */
export const WatchlistList: React.FC = () => {
  const navigation = useNavigation<WatchlistScreenNavigationProp>();
  const { data: watchlist = [], isLoading, refetch } = useGetWatchlistQuery();
  const [removeFilm] = useRemoveFilmFromWatchlistMutation();

  const handleFilmPress = useCallback(
    (film: Film) => {
      navigation.navigate('FilmDetail', { filmId: film.id });
    },
    [navigation],
  );

  const handleRemove = useCallback(
    (film: Film) => {
      removeFilm(film.id);
    },
    [removeFilm],
  );

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const renderItem = useCallback(
    ({ item }: { item: Film }) => (
      <WatchlistItem
        film={item}
        onPress={handleFilmPress}
        onRemove={handleRemove}
      />
    ),
    [handleFilmPress, handleRemove],
  );

  const keyExtractor = useCallback((item: Film) => item.id.toString(), []);

  return (
    <>
      <WatchlistHeader />
      <FlatList
        data={watchlist}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={8}
        initialNumToRender={8}
        windowSize={8}
        updateCellsBatchingPeriod={50}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            tintColor={colors.accent.gold}
            colors={[colors.accent.gold]}
          />
        }
        ListFooterComponent={<View style={styles.footer} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.md,
  },
  footer: {
    height: spacing.xxxl,
  },
});
