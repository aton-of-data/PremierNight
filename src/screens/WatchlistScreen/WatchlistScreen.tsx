import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  WatchlistPendingState,
  WatchlistErrorState,
  WatchlistEmptyState,
  WatchlistList,
} from '@components/organisms';
import { colors } from '@core/design/tokens';
import { useGetWatchlistQuery } from '@store/api/watchlistApi';
import { ScreenState } from '@domain/screen';
import type { WatchlistScreenNavigationProp } from '@domain/navigation';

interface WatchlistScreenProps {
  navigation: WatchlistScreenNavigationProp;
}

const WatchlistContent: React.FC = () => {
  const { data: watchlist = [], isLoading, isError } = useGetWatchlistQuery();

  const state: ScreenState = React.useMemo(() => {
    if (isLoading) return ScreenState.PENDING;
    if (isError) return ScreenState.REJECTED;
    if (watchlist.length === 0) return ScreenState.EMPTY;
    return ScreenState.FULFILLED;
  }, [isLoading, isError, watchlist.length]);

  if (state === ScreenState.PENDING) {
    return <WatchlistPendingState />;
  }

  if (state === ScreenState.REJECTED) {
    return <WatchlistErrorState />;
  }

  if (state === ScreenState.EMPTY) {
    return <WatchlistEmptyState />;
  }

  return <WatchlistList />;
};

export const WatchlistScreen: React.FC<WatchlistScreenProps> = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <WatchlistContent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});
