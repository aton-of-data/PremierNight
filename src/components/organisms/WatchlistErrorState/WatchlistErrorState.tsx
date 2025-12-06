import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ErrorState } from '@components/molecules';
import { spacing } from '@core/design/tokens';
import { useGetWatchlistQuery } from '@store/api/watchlistApi';

/**
 * Watchlist error state component.
 *
 * @returns The watchlist error state component.
 *
 * @example
 * <WatchlistErrorState />
 */
export const WatchlistErrorState: React.FC = () => {
  const { refetch } = useGetWatchlistQuery();

  const handleRetry = React.useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <View style={styles.errorContainer}>
      <ErrorState
        title="Unable to load watchlist"
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
