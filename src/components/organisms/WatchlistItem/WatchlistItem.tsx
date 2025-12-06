/**
 * Watchlist Item Organism
 *
 * Premium watchlist item with elegant card design,
 * smooth animations, and refined remove action.
 * Composed of FilmPoster, Text atoms, and custom layout.
 */

import React, { useCallback, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { FilmPoster } from '@components/molecules';
import { Text } from '@components/atoms';
import { colors, spacing } from '@core/design/tokens';
import { Film } from '@domain/film';
import type { FilmItemProps } from '@domain/components';

export interface WatchlistItemProps extends FilmItemProps {
  onRemove: (film: Film) => void;
}

const WatchlistItemComponent: React.FC<WatchlistItemProps> = ({
  film,
  onPress,
  onRemove,
}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const removeButtonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(removeButtonOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [removeButtonOpacity]);

  const handlePress = useCallback(() => {
    onPress(film);
  }, [film, onPress]);

  const handleRemove = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onRemove(film);
    });
  }, [film, onRemove, fadeAnim, scaleAnim]);

  const releaseYear = React.useMemo(() => {
    if (!film.release_date) return '';
    return new Date(film.release_date).getFullYear().toString();
  }, [film.release_date]);

  const rating = React.useMemo(() => {
    if (!film.vote_average || film.vote_average === 0) return null;
    return film.vote_average.toFixed(1);
  }, [film.vote_average]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={handlePress}
        activeOpacity={0.85}
      >
        <View style={styles.posterContainer}>
          <FilmPoster film={film} width={100} onPress={onPress} />
          {rating && (
            <View style={styles.ratingBadge}>
              <Text
                variant="caption.small"
                color="inverse"
                style={styles.ratingText}
              >
                ⭐ {rating}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text
              variant="headline.medium"
              numberOfLines={2}
              style={styles.title}
            >
              {film.title}
            </Text>
          </View>

          {releaseYear && (
            <Text variant="body.small" color="tertiary" style={styles.year}>
              {releaseYear}
            </Text>
          )}

          {film.overview && (
            <Text
              variant="body.small"
              color="secondary"
              numberOfLines={2}
              style={styles.overview}
            >
              {film.overview}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <Animated.View
        style={[styles.removeButtonContainer, { opacity: removeButtonOpacity }]}
      >
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemove}
          activeOpacity={0.6}
        >
          <View style={styles.removeIcon}>
            <Text variant="label.medium" style={styles.removeIconText}>
              ✕
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

/**
 * Watchlist item component.
 *
 * @param film - The film to display in the item.
 * @param onPress - The function to call when the item is pressed.
 * @param onRemove - The function to call when the remove button is pressed.
 * @returns The watchlist item component.
 *
 * @example
 * <WatchlistItem film={film} onPress={onPress} onRemove={onRemove} />
 */
export const WatchlistItem = React.memo(WatchlistItemComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border.light,
  } as ViewStyle,
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  } as ViewStyle,
  posterContainer: {
    position: 'relative',
    marginRight: spacing.md,
  } as ViewStyle,
  ratingBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 12,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  } as ViewStyle,
  ratingText: {
    fontSize: 10,
  } as ViewStyle,
  contentContainer: {
    flex: 1,
    paddingTop: spacing.xs,
  } as ViewStyle,
  headerRow: {
    marginBottom: spacing.xs,
  } as ViewStyle,
  title: {
    marginBottom: spacing.xs,
  } as ViewStyle,
  year: {
    marginBottom: spacing.sm,
  } as ViewStyle,
  overview: {
    lineHeight: 18,
  } as ViewStyle,
  removeButtonContainer: {
    marginLeft: spacing.sm,
  } as ViewStyle,
  removeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  } as ViewStyle,
  removeIcon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  removeIconText: {
    color: colors.semantic.error,
    fontSize: 18,
    fontWeight: '600',
  } as ViewStyle,
});
