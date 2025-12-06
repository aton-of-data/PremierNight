import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, ViewStyle } from 'react-native';
import { FilmCard } from '@components/molecules';
import { Text } from '@components/atoms';
import { spacing } from '@core/design/tokens';
import { Film } from '@domain/film';
import type { FilmPressHandler } from '@domain/components';

export interface FilmCarouselProps extends FilmPressHandler {
  title: string;
  films: Film[];
}

const FilmCarouselComponent: React.FC<FilmCarouselProps> = ({
  title,
  films,
  onPress,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: Film }) => <FilmCard film={item} onPress={onPress} />,
    [onPress],
  );

  const keyExtractor = useCallback((item: Film) => item.id.toString(), []);

  if (films.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text variant="headline.large" style={styles.title}>
        {title}
      </Text>
      <FlatList
        data={films}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        decelerationRate="fast"
        snapToInterval={156}
        snapToAlignment="start"
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </View>
  );
};

/**
 * Film carousel component.
 *
 * @param title - The title of the carousel.
 * @param films - The films to display in the carousel.
 * @param onPress - The function to call when a film is pressed.
 * @returns The film carousel component.
 *
 * @example
 * <FilmCarousel title="Popular Films" films={films} onPress={onPress} />
 */
export const FilmCarousel = React.memo(FilmCarouselComponent);

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  } as ViewStyle,
  title: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.screenPadding,
  } as ViewStyle,
  listContent: {
    paddingHorizontal: spacing.screenPadding,
  } as ViewStyle,
});
