module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/integration/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/integration/setup/integrationSetup.ts'],
  testTimeout: 30000, // Longer timeout for integration tests
  maxConcurrency: 3,  // Limit concurrent integration tests to avoid API rate limits
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/index.ts'
  ],
  coverageReporters: ['text-summary'],
  coverageDirectory: 'coverage/integration',
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
  setupFiles: ['<rootDir>/__tests__/integration/setup/env.js']
};