import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SpotlightHomeScreen } from '@screens/SpotlightHomeScreen';
import { FilmDetailScreen } from '@screens/FilmDetailScreen';
import { WatchlistScreen } from '@screens/WatchlistScreen';
import { NavigationHeader } from '@components/molecules';
import { colors, typography } from '@core/design/tokens';
import type { RootStackParamList, HomeTabParamList } from '@domain/navigation';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

export { default as linking } from './linking';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeTabParamList>();

/**
 * Custom Header Component
 *
 * Extracted outside render to avoid component recreation on every render.
 */
const CustomHeader = ({
  route,
  options,
  navigation,
}: NativeStackHeaderProps) => {
  const canGoBack = navigation.canGoBack();
  const title = options.title || route.name;

  return <NavigationHeader title={title} canGoBack={canGoBack} />;
};

/**
 * Home Tabs Navigator
 * Bottom tab navigation for main app sections
 */
export const HomeTabsNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent.gold,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: colors.background.elevated,
          borderTopColor: colors.border.light,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          height: Platform.OS === 'ios' ? 88 : 60,
        },
        tabBarLabelStyle: {
          ...typography.caption.small,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={SpotlightHomeScreen}
        options={{
          tabBarLabel: 'Spotlight',
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{
          tabBarLabel: 'Watchlist',
        }}
      />
    </Tab.Navigator>
  );
};

/**
 * Root Stack Navigator
 * Main navigation structure with stack and tab navigators
 */
export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: CustomHeader,
        headerTransparent: false,
        headerStyle: {
          backgroundColor: colors.background.primary,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.background.primary,
        },
      }}
    >
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabsNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FilmDetail"
        component={FilmDetailScreen}
        options={() => ({
          presentation: 'card',
          animation: 'slide_from_right',
          title: 'Film Details',
        })}
      />
    </Stack.Navigator>
  );
};
