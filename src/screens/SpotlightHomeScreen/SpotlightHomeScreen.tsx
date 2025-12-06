import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  SearchBarContainer,
  SpotlightScrollView,
  SpotlightPendingState,
  SpotlightErrorState,
} from '@components/organisms';
import { colors } from '@core/design/tokens';
import { useGetNowPlayingQuery, useGetPopularQuery } from '@store/api/tmdbApi';
import type { SpotlightHomeScreenNavigationProp } from '@domain/navigation';

interface SpotlightHomeScreenProps {
  navigation: SpotlightHomeScreenNavigationProp;
}

const SpotlightHomeContent: React.FC = () => {
  const { isLoading: loadingNowPlaying, isError: errorNowPlaying } =
    useGetNowPlayingQuery();
  const { isLoading: loadingPopular, isError: errorPopular } =
    useGetPopularQuery();

  const isLoading = loadingNowPlaying || loadingPopular;
  const hasError = errorNowPlaying || errorPopular;

  if (isLoading) {
    return <SpotlightPendingState />;
  }

  if (hasError) {
    return <SpotlightErrorState />;
  }

  return <SpotlightScrollView />;
};

export const SpotlightHomeScreen: React.FC<SpotlightHomeScreenProps> = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SearchBarContainer />
      <SpotlightHomeContent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});
