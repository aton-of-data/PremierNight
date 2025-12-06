/**
 * Spotlight ScrollView Organism
 *
 * Encapsulates ScrollView with RefreshControl.
 * Uses RTK Query directly - no ViewModel needed.
 */

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native';
import { colors, spacing } from '@core/design/tokens';
import { useGetNowPlayingQuery, useGetPopularQuery } from '@store/api/tmdbApi';
import { useAppSelector } from '@core/store';
import { SpotlightCarousels } from '../SpotlightCarousels';

/**
 * Spotlight scroll view component.
 *
 * @returns The spotlight scroll view component.
 *
 * @example
 * <SpotlightScrollView />
 */
export const SpotlightScrollView: React.FC = () => {
  const { refetch: refetchNowPlaying, isFetching: fetchingNowPlaying } =
    useGetNowPlayingQuery();
  const { refetch: refetchPopular, isFetching: fetchingPopular } =
    useGetPopularQuery();
  const isSearchActive = useAppSelector(
    state => state.spotlightHome.isSearchActive,
  );

  const isRefreshing = fetchingNowPlaying || fetchingPopular;

  const handleRefresh = React.useCallback(() => {
    refetchNowPlaying();
    refetchPopular();
  }, [refetchNowPlaying, refetchPopular]);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        !isSearchActive ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent.gold}
          />
        ) : undefined
      }
    >
      <SpotlightCarousels />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
});
