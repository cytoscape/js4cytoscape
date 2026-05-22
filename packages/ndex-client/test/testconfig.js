/**
 * Integration Test Configuration
 * This resource stores server connection details and credentials for all integration tests
 */
const integrationTestConfig = {
  // NDEx Server Configuration
  server: {
    baseURL: process.env.NDEX_TEST_BASE_URL || '',
    apiVersion: process.env.NDEX_TEST_API_VERSION || 'v2'
  },
  
  // Test Account Credentials
  testAccount: {
    username: process.env.NDEX_TEST_USERNAME || '',
    password: process.env.NDEX_TEST_PASSWORD || ''
  },

  // Test Timeouts and Limits
  timeouts: {
    default: 10000,
    longRunning: 30000
  },

  // Test Data Identifiers (for consistent test data across integration tests)
  testData: {
    publicNetworkId: process.env.NDEX_TEST_PUBLIC_NETWORK_ID || '',
    privateNetworkId: process.env.NDEX_TEST_PRIVATE_NETWORK_ID || ''
  }
};

// Legacy export for backward compatibility
const testAccount = integrationTestConfig.testAccount;

module.exports = { 
  integrationTestConfig,
  testAccount  // Keep for backward compatibility
};
