import React from 'react';
import { View, StyleSheet, Platform, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Button } from '@components/atoms';
import { colors, spacing } from '@core/design/tokens';
import type { WatchlistScreenNavigationProp } from '@domain/navigation';

/**
 * Watchlist empty state component.
 *
 * @returns The watchlist empty state component.
 *
 * @example
 * <WatchlistEmptyState />
 */
export const WatchlistEmptyState: React.FC = () => {
  const navigation = useNavigation<WatchlistScreenNavigationProp>();

  const handleNavigateToHome = React.useCallback(() => {
    navigation.navigate('HomeTabs', { screen: 'Home' });
  }, [navigation]);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <Animated.View
      style={[
        styles.emptyContainer,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.emptyIconContainer}>
        <View style={styles.emptyIconCircle}>
          <Text variant="display.medium" style={styles.emptyIcon}>
            🎬
          </Text>
        </View>
      </View>
      <Text variant="display.small" style={styles.emptyTitle}>
        Your Watchlist Awaits
      </Text>
      <Text variant="body.large" color="tertiary" style={styles.emptyMessage}>
        Curate your personal collection of films you want to watch. Start
        exploring and save the ones that catch your eye.
      </Text>
      <View style={styles.emptyButtonContainer}>
        <Button onPress={handleNavigateToHome} variant="primary" size="large">
          Discover Films
        </Button>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.xxxl,
  },
  emptyIconContainer: {
    marginBottom: spacing.xl,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  emptyIcon: {
    fontSize: 56,
    textAlign: 'center',
  },
  emptyTitle: {
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  emptyButtonContainer: {
    width: '100%',
    maxWidth: 240,
  },
});
