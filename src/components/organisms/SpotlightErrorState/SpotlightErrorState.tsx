/**
 * Spotlight Error State Organism
 *
 * Displays error state.
 * Uses RTK Query directly - no ViewModel needed.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ErrorState } from '@components/molecules';
import { spacing } from '@core/design/tokens';
import { useGetNowPlayingQuery, useGetPopularQuery } from '@store/api/tmdbApi';

/**
 * Spotlight error state component.
 *
 * @returns The spotlight error state component.
 *
 * @example
 * <SpotlightErrorState />
 */
export const SpotlightErrorState: React.FC = () => {
  const { refetch: refetchNowPlaying } = useGetNowPlayingQuery();
  const { refetch: refetchPopular } = useGetPopularQuery();

  const handleRetry = React.useCallback(() => {
    refetchNowPlaying();
    refetchPopular();
  }, [refetchNowPlaying, refetchPopular]);

  return (
    <View style={styles.errorContainer}>
      <ErrorState
        title="Unable to load films"
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
