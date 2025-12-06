import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonBox } from '@components/atoms';
import { colors, spacing } from '@core/design/tokens';

/**
 * Watchlist pending state component.
 *
 * @returns The watchlist pending state component.
 *
 * @example
 * <WatchlistPendingState />
 */
export const WatchlistPendingState: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SkeletonBox width={180} height={32} borderRadius={4} />
        <SkeletonBox
          width={100}
          height={20}
          borderRadius={4}
          style={styles.headerSubtitleSkeleton}
        />
      </View>
      <View style={styles.skeletonContainer}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} style={styles.skeletonItem}>
            <SkeletonBox width={100} height={150} borderRadius={12} />
            <View style={styles.skeletonContent}>
              <SkeletonBox
                width="85%"
                height={20}
                borderRadius={4}
                style={styles.skeletonTitle}
              />
              <SkeletonBox
                width="40%"
                height={16}
                borderRadius={4}
                style={styles.skeletonSubtitle}
              />
              <SkeletonBox
                width="100%"
                height={16}
                borderRadius={4}
                style={styles.skeletonOverview}
              />
              <SkeletonBox
                width="70%"
                height={16}
                borderRadius={4}
                style={styles.skeletonOverview}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerSubtitleSkeleton: {
    marginTop: spacing.sm,
  },
  skeletonContainer: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.md,
  },
  skeletonItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border.light,
  },
  skeletonContent: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  skeletonTitle: {
    marginBottom: spacing.sm,
  },
  skeletonSubtitle: {
    marginBottom: spacing.md,
  },
  skeletonOverview: {
    marginBottom: spacing.xs,
  },
});
