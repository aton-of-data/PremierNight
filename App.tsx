/**
 * Premiere Night App
 *
 * Main application entry point with navigation setup.
 * Premium luxury film discovery experience.
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { RootNavigator } from '@navigation';
import linking from '@navigation/linking';
import { ErrorBoundary } from '@core/ErrorBoundary';
import { colors } from '@core/design/tokens';
import { store } from '@core/store';

export default function App() {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.background.primary, true);
    }
  }, []);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <NavigationContainer linking={linking}>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </ErrorBoundary>
    </Provider>
  );
}
