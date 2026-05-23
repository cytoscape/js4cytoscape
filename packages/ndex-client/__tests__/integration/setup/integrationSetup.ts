/**
 * Integration test setup configuration
 * Sets up environment for integration tests that make real API calls
 */

import { integrationConfig } from '../config/testConfig';

// Global test timeout for integration tests (longer than unit tests)
jest.setTimeout(integrationConfig.timeout);

// Setup console filtering for integration tests
const originalConsoleWarn = console.warn;
beforeAll(() => {
  // Suppress axios warnings and other noise during integration tests
  console.warn = (message: string, ...args: any[]) => {
    if (message.includes('deprecated') || message.includes('axios')) {
      return;
    }
    originalConsoleWarn(message, ...args);
  };
});

afterAll(() => {
  console.warn = originalConsoleWarn;
});

// Clean up any test artifacts after each test
afterEach(async () => {
  // Add any cleanup logic here if needed
  // For example, deleting test networks created during tests
});