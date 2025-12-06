module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@core': './src/core',
          '@components': './src/components',
          '@screens': './src/screens',
          '@store': './src/store',
          '@domain': './src/types',
          '@navigation': './src/navigation',
          '@hooks': './src/hooks',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
