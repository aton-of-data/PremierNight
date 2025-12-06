import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@components/atoms';
import { Button } from '@components/atoms';
import { colors, spacing } from '@core/design/tokens';
import { logger } from '@core/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component.
 *
 * @param children - The children components.
 * @param fallback - The fallback component.
 * @returns The error boundary component.
 *
 * @example
 * <ErrorBoundary>
 *   <Component />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error('ErrorBoundary caught an error', error, {
      tags: ['error-boundary', 'runtime', 'crash'],
      context: {
        component_stack: errorInfo.componentStack?.substring(0, 500),
        error_boundary: 'ErrorBoundary',
      },
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
          <View style={styles.content}>
            <Text variant="headline.large" style={styles.title}>
              Oops!
            </Text>
            <Text variant="body.medium" color="tertiary" style={styles.message}>
              Something unexpected happened. The app will recover automatically.
            </Text>
            {this.state.error && __DEV__ && (
              <Text
                variant="body.small"
                color="tertiary"
                style={styles.errorText}
              >
                {this.state.error.message}
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <Button onPress={this.handleReset} variant="primary">
                Try Again
              </Button>
            </View>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  } as ViewStyle,
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
  } as ViewStyle,
  title: {
    marginBottom: spacing.md,
    textAlign: 'center',
  } as ViewStyle,
  message: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    maxWidth: 300,
  } as ViewStyle,
  errorText: {
    marginTop: spacing.md,
    textAlign: 'center',
    fontFamily: 'monospace',
    maxWidth: 350,
  } as ViewStyle,
  buttonContainer: {
    marginTop: spacing.xl,
    width: '100%',
    maxWidth: 200,
  } as ViewStyle,
});
