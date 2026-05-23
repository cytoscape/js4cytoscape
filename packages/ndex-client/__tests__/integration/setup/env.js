/**
 * Environment setup for integration tests
 * Sets up environment variables and configuration
 */

// Load environment variables for integration tests
process.env.NODE_ENV = 'test';

// Set default test environment variables if not provided
if (!process.env.NDEX_TEST_BASE_URL) {
  process.env.NDEX_TEST_BASE_URL = 'https://dev1.ndexbio.org';
}

if (!process.env.NDEX_TEST_TIMEOUT) {
  process.env.NDEX_TEST_TIMEOUT = '30000';
}