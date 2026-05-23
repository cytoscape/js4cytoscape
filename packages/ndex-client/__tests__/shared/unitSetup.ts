/**
 * Unit test setup configuration
 * Sets up common mocks and configurations for unit tests
 */

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

// Setup common console mocking to reduce noise in tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

// Global test timeout for unit tests (shorter than integration tests)
jest.setTimeout(10000);