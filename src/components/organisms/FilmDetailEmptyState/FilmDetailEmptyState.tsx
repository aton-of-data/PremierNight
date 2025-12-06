import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, Button } from '@components/atoms';
import { spacing } from '@core/design/tokens';
import { useGetFilmDetailsQuery } from '@store/api/tmdbApi';
import type { FilmDetailScreenProps } from '@domain/navigation';

/**
 * Film detail empty state component.
 *
 * @returns The film detail empty state component.
 *
 * @example
 * <FilmDetailEmptyState />
 */
export const FilmDetailEmptyState: React.FC = () => {
  const route = useRoute<FilmDetailScreenProps['route']>();
  const filmId = route.params.filmId;
  const { refetch } = useGetFilmDetailsQuery(filmId);

  const handleRetry = React.useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Text variant="display.medium" style={styles.emptyIcon}>
          🎬
        </Text>
      </View>
      <Text variant="headline.medium" style={styles.emptyTitle}>
        Film Not Found
      </Text>
      <Text variant="body.medium" color="tertiary" style={styles.emptyMessage}>
        The film you're looking for doesn't exist or was removed.
      </Text>
      <View style={styles.emptyButtonContainer}>
        <Button onPress={handleRetry} variant="primary">
          Try Again
        </Button>
      </View>
    </View>
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
  emptyIcon: {
    fontSize: 64,
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
    maxWidth: 200,
  },
});
