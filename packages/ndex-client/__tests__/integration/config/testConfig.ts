import { NDExClientConfig } from '../../../src/types';
import { NDExClient } from '../../../src/index';

// Import configuration from legacy testconfig.js
const { integrationTestConfig } = require('../../../test/testconfig.js');

export interface IntegrationTestConfig {
  baseURL: string;
  credentials: {
    username: string;
    password: string;
  };
  timeout: number;
  testData: {
    publicNetworkId: string;
    privateNetworkId: string;
  };
}

// Centralized test configuration based on testconfig.js
export const integrationConfig: IntegrationTestConfig = {
  baseURL: integrationTestConfig.server.baseURL,
  credentials: {
    username: integrationTestConfig.testAccount.username,
    password: integrationTestConfig.testAccount.password
  },
  timeout: integrationTestConfig.timeouts.longRunning,
  testData: {
    publicNetworkId: integrationTestConfig.testData.publicNetworkId,
    privateNetworkId: integrationTestConfig.testData.privateNetworkId
  }
};

// Helper function to create test client with consistent configuration
export const createIntegrationTestClient = (overrides?: Partial<NDExClientConfig>): NDExClient => {
  return new NDExClient({
    baseURL: integrationConfig.baseURL,
    timeout: integrationConfig.timeout,
    ...overrides
  });
};

// Helper function to authenticate test client with basic auth
export const authenticateTestClient = async (client: NDExClient): Promise<void> => {
  client.updateConfig({
    auth: {
      type: 'basic',
      username: integrationConfig.credentials.username,
      password: integrationConfig.credentials.password
    }
  });
};