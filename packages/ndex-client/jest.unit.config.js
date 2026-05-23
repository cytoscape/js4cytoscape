module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/unit/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/shared/unitSetup.ts'],
  testTimeout: 10000, // Shorter timeout for unit tests
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/index.ts' // Exclude barrel exports from coverage
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage/unit',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  verbose: true,
  // Ignore integration test files
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/integration/',
    '<rootDir>/node_modules/'
  ]
};