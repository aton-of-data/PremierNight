import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { ErrorBoundary } from '../ErrorBoundary';
import { logger } from '../logger';
import { Text } from '../../components/atoms/Text';

jest.mock('@core/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

jest.mock('@components/atoms', () => {
  const ReactLib = require('react');
  return {
    Text: ({ children, ...props }: any) =>
      ReactLib.createElement('Text', props, children),
    Button: ({ children, onPress, ...props }: any) =>
      ReactLib.createElement('Button', { ...props, onPress }, children),
  };
});

jest.mock('react-native-safe-area-context', () => {
  const ReactLib = require('react');
  const MockSafeAreaView = ({ children }: any) =>
    ReactLib.createElement('View', { testID: 'SafeAreaView' }, children);
  return {
    SafeAreaView: MockSafeAreaView,
  };
});

const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <Text>No error</Text>;
};

describe('ErrorBoundary', () => {
  let tree: ReactTestRenderer.ReactTestRenderer | null = null;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    if (tree) {
      tree.unmount();
      tree = null;
    }
    jest.restoreAllMocks();
  });

  it('should render children when there is no error', async () => {
    await ReactTestRenderer.act(async () => {
      tree = ReactTestRenderer.create(
        <ErrorBoundary>
          <Text>Test content</Text>
        </ErrorBoundary>,
      );
    });

    if (!tree) {
      throw new Error('Tree not created');
    }

    const instance = tree.root;
    expect(instance.findByType(Text).props.children).toBe('Test content');
  });

  it('should catch error and render default fallback UI', async () => {
    await ReactTestRenderer.act(async () => {
      tree = ReactTestRenderer.create(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>,
      );
    });

    if (!tree) {
      throw new Error('Tree not created');
    }

    const instance = tree.root;
    // Verify error boundary rendered error UI by checking for SafeAreaView
    const safeAreaView = instance.findByProps({ testID: 'SafeAreaView' });
    expect(safeAreaView).toBeDefined();
  });

  it('should render custom fallback when provided', async () => {
    const customFallback = <Text>Custom error message</Text>;

    await ReactTestRenderer.act(async () => {
      tree = ReactTestRenderer.create(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>,
      );
    });

    if (!tree) {
      throw new Error('Tree not created');
    }

    const instance = tree.root;
    expect(instance.findByType(Text).props.children).toBe(
      'Custom error message',
    );
  });

  it('should log error when caught', async () => {
    await ReactTestRenderer.act(async () => {
      tree = ReactTestRenderer.create(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>,
      );
    });

    // Wait for componentDidCatch to be called
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(logger.error).toHaveBeenCalledWith(
      'ErrorBoundary caught an error',
      expect.any(Error),
      expect.objectContaining({
        tags: ['error-boundary', 'runtime', 'crash'],
        context: expect.objectContaining({
          error_boundary: 'ErrorBoundary',
        }),
      }),
    );
  });

  describe('__DEV__ mode behavior', () => {
    const originalDev = __DEV__;

    afterEach(() => {
      // @ts-ignore
      global.__DEV__ = originalDev;
    });

    it('should show error message in __DEV__ mode', async () => {
      // @ts-ignore
      global.__DEV__ = true;

      await ReactTestRenderer.act(async () => {
        tree = ReactTestRenderer.create(
          <ErrorBoundary>
            <ThrowError shouldThrow={true} />
          </ErrorBoundary>,
        );
      });

      if (!tree) {
        throw new Error('Tree not created');
      }

      const instance = tree.root;
      // In __DEV__ mode, error UI should be rendered
      const safeAreaView = instance.findByProps({ testID: 'SafeAreaView' });
      expect(safeAreaView).toBeDefined();
    });

    it('should not show error message in production mode', async () => {
      // @ts-ignore
      global.__DEV__ = false;

      await ReactTestRenderer.act(async () => {
        tree = ReactTestRenderer.create(
          <ErrorBoundary>
            <ThrowError shouldThrow={true} />
          </ErrorBoundary>,
        );
      });

      if (!tree) {
        throw new Error('Tree not created');
      }

      const instance = tree.root;
      const textComponents = instance.findAllByType(Text);
      // Should not have detailed error message in production
      const hasErrorMessage = textComponents.some(
        (text: any) =>
          typeof text.props.children === 'string' &&
          text.props.children.includes('Test error'),
      );
      expect(hasErrorMessage).toBe(false);
    });
  });
});
