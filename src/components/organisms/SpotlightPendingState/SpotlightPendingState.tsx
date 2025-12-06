/**
 * Spotlight Pending State Organism
 *
 * Displays skeleton loading state.
 * Pure component - no state needed.
 */

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FilmCarouselSkeleton } from '@components/organisms';
import { spacing } from '@core/design/tokens';

/**
 * Spotlight pending state component.
 *
 * @returns The spotlight pending state component.
 *
 * @example
 * <SpotlightPendingState />
 */
export const SpotlightPendingState: React.FC = () => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <FilmCarouselSkeleton title="Now Playing" />
      <FilmCarouselSkeleton title="Popular" />
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
