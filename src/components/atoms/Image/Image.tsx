import React from 'react';
import {
  Image as RNImage,
  ImageProps as RNImageProps,
  View,
  StyleSheet,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { colors } from '../../../core/design/tokens';
import { Text } from '../Text';

export interface ImageProps extends RNImageProps {
  placeholder?: string;
  containerStyle?: ViewStyle;
}

/**
 * Image component.
 *
 * @param source - The source of the image.
 * @param placeholder - The placeholder of the image.
 * @param style - The style of the image.
 * @param containerStyle - The style of the container.
 * @param props - The props of the image.
 * @returns The image component.
 *
 * @example
 * <Image source={{ uri: 'https://example.com/image.jpg' }} />
 */

export const Image: React.FC<ImageProps> = ({
  source,
  placeholder = 'No Image',
  style,
  containerStyle,
  ...props
}) => {
  if (
    !source ||
    (typeof source === 'object' && 'uri' in source && !source.uri)
  ) {
    return (
      <View style={[styles.placeholder, containerStyle, style]}>
        <Text variant="caption.small" color="tertiary">
          {placeholder}
        </Text>
      </View>
    );
  }

  return <RNImage source={source} style={[styles.image, style]} {...props} />;
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  } as ImageStyle,
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
});
