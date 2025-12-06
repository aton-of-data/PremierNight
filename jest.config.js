module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@store$': '<rootDir>/src/store',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@domain/(.*)$': '<rootDir>/src/types/$1',
    '^@navigation$': '<rootDir>/src/navigation',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@hooks$': '<rootDir>/src/hooks',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@reduxjs|react-redux)/)',
  ],
};
