module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/?!(react-icons)'],
  setupFilesAfterEnv: ['<rootDir>/src/components/Item/Item.test.tsx'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
};
