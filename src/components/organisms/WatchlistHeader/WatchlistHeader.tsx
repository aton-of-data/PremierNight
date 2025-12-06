import React from 'react';
import { View, StyleSheet, Platform, Animated } from 'react-native';
import { Text } from '@components/atoms';
import { colors, spacing } from '@core/design/tokens';
import { useGetWatchlistQuery } from '@store/api/watchlistApi';

/**
 * Watchlist header component.
 *
 * @returns The watchlist header component.
 *
 * @example
 * <WatchlistHeader />
 */
export const WatchlistHeader: React.FC = () => {
  const { data: watchlist = [] } = useGetWatchlistQuery();
  const count = watchlist.length;

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.header,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.headerContent}>
        <Text variant="display.medium" style={styles.headerTitle}>
          My Watchlist
        </Text>
        <View style={styles.headerStats}>
          <View style={styles.statBadge}>
            <Text
              variant="headline.small"
              color="accent"
              style={styles.statNumber}
            >
              {count}
            </Text>
            <Text
              variant="caption.large"
              color="tertiary"
              style={styles.statLabel}
            >
              {count === 1 ? 'Film' : 'Films'}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    backgroundColor: colors.background.primary,
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerTitle: {
    flex: 1,
  },
  headerStats: {
    marginLeft: spacing.md,
  },
  statBadge: {
    alignItems: 'flex-end',
  },
  statNumber: {
    marginBottom: spacing.xs / 2,
  },
  statLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
