import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ViewStyle,
  DimensionValue,
} from 'react-native';
import { colors } from '../../../core/design/tokens';

export interface SkeletonBoxProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
}

/**
 * Skeleton box component.
 *
 * @param width - The width of the skeleton box.
 * @param height - The height of the skeleton box.
 * @param borderRadius - The border radius of the skeleton box.
 * @param style - The style of the skeleton box.
 * @returns The skeleton box component.
 *
 * @example
 * <SkeletonBox width="100%" height={20} borderRadius={4} />
 */
export const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    );

    shimmer.start();

    return () => shimmer.stop();
  }, [shimmerAnimation]);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  const opacity = shimmerAnimation.interpolate({
    inputRange: [0, 0.3, 0.5, 0.7, 1],
    outputRange: [0.15, 0.4, 0.6, 0.4, 0.15],
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
            opacity,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.secondary,
    overflow: 'hidden',
  } as ViewStyle,
  shimmer: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '50%',
    height: '100%',
    backgroundColor: colors.neutral.lightGray,
  } as ViewStyle,
});
