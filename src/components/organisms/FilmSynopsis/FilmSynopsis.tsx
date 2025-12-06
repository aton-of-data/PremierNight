import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '@components/atoms';
import { spacing } from '@core/design/tokens';

export interface FilmSynopsisProps {
  synopsis: string;
}

/**
 * Film synopsis component.
 *
 * @param synopsis - The synopsis of the film.
 * @returns The film synopsis component.
 *
 * @example
 * <FilmSynopsis synopsis="The film synopsis" />
 */
const FilmSynopsisComponent: React.FC<FilmSynopsisProps> = ({ synopsis }) => {
  if (!synopsis) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text variant="headline.medium" style={styles.label}>
        Synopsis
      </Text>
      <Text variant="body.large" color="secondary" style={styles.text}>
        {synopsis}
      </Text>
    </View>
  );
};

export const FilmSynopsis = React.memo(FilmSynopsisComponent);

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  } as ViewStyle,
  label: {
    marginBottom: spacing.sm,
  } as ViewStyle,
  text: {
    lineHeight: 24,
  } as ViewStyle,
});
