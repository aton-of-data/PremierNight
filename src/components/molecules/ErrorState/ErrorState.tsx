/**
 * Error State Component
 *
 * Displays an elegant error state with retry option.
 * Premium, minimal design for error handling.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Button } from '@components/atoms';
import { Text } from '@components/atoms';
import { spacing } from '@core/design/tokens';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = "We couldn't load the content. Please try again.",
  onRetry,
  retryLabel = 'Try Again',
}) => {
  return (
    <View style={styles.container}>
      <Text variant="headline.medium" style={styles.title}>
        {title}
      </Text>
      <Text variant="body.medium" color="tertiary" style={styles.message}>
        {message}
      </Text>
      {onRetry && (
        <View style={styles.buttonContainer}>
          <Button onPress={onRetry} variant="primary">
            {retryLabel}
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.xxxl,
  } as ViewStyle,
  title: {
    marginBottom: spacing.sm,
    textAlign: 'center',
  } as ViewStyle,
  message: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    maxWidth: 300,
  } as ViewStyle,
  buttonContainer: {
    marginTop: spacing.md,
    width: '100%',
    maxWidth: 200,
  } as ViewStyle,
});
