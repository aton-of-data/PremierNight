/**
 * Film Carousel Skeleton Organism
 *
 * Skeleton loader that mimics the FilmCarousel structure.
 * Displays skeleton title and multiple FilmCardSkeleton components.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import { FilmCardSkeleton } from '@components/molecules';
import { SkeletonBox } from '@components/atoms';
import { spacing } from '@core/design/tokens';

interface FilmCarouselSkeletonProps {
  title?: string;
  itemCount?: number;
}

/**
 * Film carousel skeleton component.
 *
 * @param title - The title of the carousel.
 * @param itemCount - The number of items to display in the carousel.
 * @returns The film carousel skeleton component.
 *
 * @example
 * <FilmCarouselSkeleton title="Popular Films" itemCount={5} />
 */
export const FilmCarouselSkeleton: React.FC<FilmCarouselSkeletonProps> = ({
  title,
  itemCount = 5,
}) => {
  return (
    <View style={styles.container}>
      {title ? (
        <SkeletonBox
          width={200}
          height={28}
          borderRadius={4}
          style={styles.title}
        />
      ) : null}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        decelerationRate="fast"
      >
        {Array.from({ length: itemCount }).map((_, index) => (
          <FilmCardSkeleton key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

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
