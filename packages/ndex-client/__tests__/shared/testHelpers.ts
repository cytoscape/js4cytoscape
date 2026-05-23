import { NDExClient, AuthType, Visibility } from '../../src/index';
import { NDExClientConfig, NetworkSummaryV2 } from '../../src/types';

/**
 * Shared test utilities and mock data for unit and integration tests
 */

// Mock data generators
export const mockNetworkSummaryV2 = (): NetworkSummaryV2 => ({
  externalId: 'test-network-uuid',
  name: 'Test Network',
  description: 'A test network for unit tests',
  nodeCount: 10,
  edgeCount: 15,
  visibility: Visibility.PUBLIC,
  owner: 'testuser',
  ownerUUID: 'test-owner-uuid',
  creationTime: Date.now(),
  modificationTime: Date.now(),
  version: '1.0',
  properties: [
    {
      predicateString: 'name',
      dataType: 'string',
      value: 'Test Network'
    }
  ],
  isReadOnly: false,
  isValid: true,
  hasLayout: true,
  hasSample: false,
  updatedBy: 'testuser'
});

export const mockUserProfile = () => ({
  externalId: 'test-user-uuid',
  userName: 'testuser',
  firstName: 'Test',
  lastName: 'User',
  emailAddress: 'test@example.com',
  website: 'https://example.com',
  description: 'Test user profile'
});

// Test client factory
export const createTestClient = (config?: Partial<NDExClientConfig>): NDExClient => {
  const defaultConfig: NDExClientConfig = {
    baseURL: 'https://test.ndexbio.org',
    timeout: 10000,
    ...config
  };
  
  return new NDExClient(defaultConfig);
};

// Common test patterns
export const testAuthScenarios = {
  validBasicAuth: {
    type: AuthType.BASIC,
    username: 'testuser',
    password: 'testpass'
  },
  validOAuth: {
    type: AuthType.OAUTH,
    idToken: 'test-token-123'
  },
  invalidBasicAuth: {
    type: AuthType.BASIC,
    username: '',
    password: ''
  },
  invalidOAuth: {
    type: AuthType.OAUTH,
    idToken: ''
  }
};

// Network test data
export const mockCXNetwork = () => [
  {
    nodes: [
      { "@id": 1, "n": "Node1", "r": "Protein" },
      { "@id": 2, "n": "Node2", "r": "Protein" }
    ]
  },
  {
    edges: [
      { "@id": 1, "s": 1, "t": 2, "i": "interacts-with" }
    ]
  },
  {
    networkAttributes: [
      { "n": "name", "v": "Test Network" },
      { "n": "description", "v": "Test network for unit tests" }
    ]
  }
];

// Error response generators
export const mockAPIError = (status: number, errorCode: string, message: string) => ({
  response: {
    status,
    data: {
      errorCode,
      message,
      description: `API error: ${message}`
    }
  }
});

export const mockNetworkError = () => {
  const error = new Error('Network Error');
  error.name = 'NetworkError';
  return error;
};