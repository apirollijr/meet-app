// jest.e2e.config.cjs
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/src/__tests__/acceptance/**/*.test.js'],
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-react'] }],
  },
  moduleNameMapper: { '\\.(css|scss)$': 'identity-obj-proxy' },
  testTimeout: 60000,
};
