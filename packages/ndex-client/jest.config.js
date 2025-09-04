/**
 * Main Jest configuration - defaults to unit tests for fast development workflow
 * Use specific configs for different test types:
 * - npm test (or npm run test:unit) - Fast unit tests with mocks
 * - npm run test:integration - Slower integration tests with real API calls  
 * - npm run test:all - Run both unit and integration tests
 */

const unitConfig = require('./jest.unit.config.js');

module.exports = {
  // Use unit test config by default for fastest development workflow
  ...unitConfig,
  
  // Override test match to run all tests if specifically requested
  testMatch: process.env.JEST_TEST_TYPE === 'all' 
    ? ['**/__tests__/**/*.test.ts'] 
    : unitConfig.testMatch
};
