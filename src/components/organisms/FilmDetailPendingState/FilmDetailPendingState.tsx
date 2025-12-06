/**
 * Film Detail Pending State Organism
 *
 * Displays skeleton loading state.
 * Pure component - no state needed.
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SkeletonBox } from '@components/atoms';
import { colors, spacing } from '@core/design/tokens';

export const FilmDetailPendingState: React.FC = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Backdrop skeleton */}
      <SkeletonBox
        width="100%"
        height={300}
        borderRadius={0}
        style={styles.backdropSkeleton}
      />

      <View style={styles.content}>
        {/* Poster and title skeleton */}
        <View style={styles.headerSkeleton}>
          <SkeletonBox width={120} height={180} borderRadius={12} />
          <View style={styles.headerTextSkeleton}>
            <SkeletonBox
              width="90%"
              height={28}
              borderRadius={4}
              style={styles.titleSkeleton}
            />
            <SkeletonBox
              width="60%"
              height={20}
              borderRadius={4}
              style={styles.subtitleSkeleton}
            />
            <SkeletonBox
              width="40%"
              height={16}
              borderRadius={4}
              style={styles.metaSkeleton}
            />
          </View>
        </View>

        {/* Synopsis skeleton */}
        <View style={styles.synopsisSkeleton}>
          <SkeletonBox
            width={100}
            height={24}
            borderRadius={4}
            style={styles.synopsisTitleSkeleton}
          />
          <SkeletonBox
            width="100%"
            height={16}
            borderRadius={4}
            style={styles.synopsisLineSkeleton}
          />
          <SkeletonBox
            width="95%"
            height={16}
            borderRadius={4}
            style={styles.synopsisLineSkeleton}
          />
          <SkeletonBox
            width="90%"
            height={16}
            borderRadius={4}
            style={styles.synopsisLineSkeleton}
          />
        </View>

        {/* Action button skeleton */}
        <View style={styles.actionSkeleton}>
          <SkeletonBox width={200} height={48} borderRadius={8} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  backdropSkeleton: {
    marginBottom: spacing.xl,
  },
  content: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.xl,
  },
  headerSkeleton: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  headerTextSkeleton: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  titleSkeleton: {
    marginBottom: spacing.sm,
  },
  subtitleSkeleton: {
    marginBottom: spacing.xs,
  },
  metaSkeleton: {
    marginTop: spacing.xs,
  },
  synopsisSkeleton: {
    marginBottom: spacing.xl,
  },
  synopsisTitleSkeleton: {
    marginBottom: spacing.md,
  },
  synopsisLineSkeleton: {
    marginBottom: spacing.xs,
  },
  actionSkeleton: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
});
