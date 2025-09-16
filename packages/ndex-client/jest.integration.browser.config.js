module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Use jsdom for browser simulation
  testMatch: ['**/__tests__/integration/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/integration/setup/integrationSetup.ts'],
  testTimeout: 30000, // Longer timeout for integration tests
  maxConcurrency: 3,  // Limit concurrent integration tests to avoid API rate limits
  verbose: true,
  displayName: 'Integration Tests (Browser)',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/index.ts'
  ],
  coverageReporters: ['text-summary'],
  coverageDirectory: 'coverage/integration-browser',
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // Ignore unit test files
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/unit/',
    '<rootDir>/node_modules/'
  ],
  // Set environment variables for integration tests
  setupFiles: ['<rootDir>/__tests__/integration/setup/env.js'],
  // Browser-specific globals and setup
  globals: {
    INTEGRATION_TEST_ENV: 'browser'
  },
  // Additional jsdom configuration
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
    userAgent: 'Mozilla/5.0 (Test Browser) Jest/Integration'
  }
};