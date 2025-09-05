/**
 * Integration Test Configuration
 * This resource stores server connection details and credentials for all integration tests
 */
const integrationTestConfig = {
  // NDEx Server Configuration
  server: {
    baseURL: 'https://dev1.ndexbio.org',
    apiVersion: 'v2'
  },
  
  // Test Account Credentials
  testAccount: {
    username: 'cj1',
    password: 'ggggggggg'
  },

  // Test Timeouts and Limits
  timeouts: {
    default: 10000,
    longRunning: 30000
  },

  // Test Data Identifiers (for consistent test data across integration tests)
  testData: {
    publicNetworkId: '2015e494-1f11-11e7-8156-06832d634f41',
    privateNetworkId: '2977ee7f-1d34-11e7-8145-06832d634f41'
  }
};

// Legacy export for backward compatibility
const testAccount = integrationTestConfig.testAccount;

module.exports = { 
  integrationTestConfig,
  testAccount  // Keep for backward compatibility
};
