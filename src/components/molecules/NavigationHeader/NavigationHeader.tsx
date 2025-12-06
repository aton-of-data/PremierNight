/**
 * Navigation Header
 *
 * Premium luxury navigation header with back button.
 * Minimalist design following Apple's sophistication.
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from '@components/atoms';
import { colors, spacing } from '@core/design/tokens';

export interface NavigationHeaderProps {
  title?: string;
  canGoBack?: boolean;
  onBackPress?: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  canGoBack = true,
  onBackPress,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  if (!canGoBack && !title) {
    return null;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        {canGoBack && (
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backButton}
            activeOpacity={0.7}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <View style={styles.backIcon}>
              <View style={styles.backIconLine1} />
              <View style={styles.backIconLine2} />
            </View>
          </TouchableOpacity>
        )}
        {title && (
          <View style={styles.titleContainer}>
            <Text
              variant="headline.medium"
              style={styles.title}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  } as ViewStyle,
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: spacing.screenPadding,
    backgroundColor: colors.background.primary,
  } as ViewStyle,
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: -spacing.xs,
  } as ViewStyle,
  backIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
  } as ViewStyle,
  backIconLine1: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: colors.text.primary,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }, { translateX: 6 }, { translateY: 1 }],
  } as ViewStyle,
  backIconLine2: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: colors.text.primary,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }, { translateX: 6 }, { translateY: -1 }],
  } as ViewStyle,
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: spacing.sm,
  } as ViewStyle,
  title: {
    color: colors.text.primary,
  } as TextStyle,
});
