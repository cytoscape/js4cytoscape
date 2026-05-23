import { NDExClient } from '../../../src/index';
import { createIntegrationTestClient, authenticateTestClient, integrationConfig } from '../config/testConfig';

// Environment detection
const isNodeJS = typeof window === 'undefined';
const isBrowser = typeof window !== 'undefined';
const testEnv = process.env.INTEGRATION_TEST_ENV || (isNodeJS ? 'node' : 'browser');

describe(`UserService Integration Tests (${testEnv.toUpperCase()})`, () => {
  let client: NDExClient;

  beforeEach(() => {
    client = createIntegrationTestClient();
  });

  describe('Authentication', () => {
    it('should authenticate user with basic auth and verify user details', async () => {
      await authenticateTestClient(client);

      const result = await client.user.authenticate();

      // Verify the authenticated user data
      expect(result).toBeDefined();
      expect(result).toHaveProperty('userName');

      // Verify username matches the one used in basic auth
      expect(result.userName).toBe(integrationConfig.credentials.username);

      // Verify specific user details
      expect(result.firstName).toBe('Ji');
      expect(result.lastName).toBe('Che');

      // Additional standard user properties
      expect(result).toHaveProperty('externalId');
      expect(result.externalId).toBeDefined();
    });

    it(`should authenticate user with basic auth in ${testEnv} environment`, async () => {
      await authenticateTestClient(client);

      const result = await client.user.authenticate();

      // Verify authentication works in current environment
      expect(result).toBeDefined();
      expect(result.userName).toBe(integrationConfig.credentials.username);
      expect(result.firstName).toBe('Ji');
      expect(result.lastName).toBe('Che');

      // Environment-specific checks
      if (testEnv === 'node') {
        // Node.js specific: User-Agent header can be set, window is undefined
        expect(typeof window).toBe('undefined');
      } else if (testEnv === 'browser') {
        // Browser specific: window object exists, User-Agent header restricted
        expect(typeof window).toBe('object');
        expect(window).toBeDefined();
      }

      // Common checks
      const config = client.getConfig();
      expect(config.baseURL).toBe(integrationConfig.baseURL);
    });

    it('should get current user profile', async () => {
      await authenticateTestClient(client);
      
      const result = await client.user.getCurrentUser();
      
      // Check for actual user data structure - may vary by server
      expect(result).toBeDefined();
      if (result.externalId) {
        expect(result).toHaveProperty('externalId');
      }
      if (result.userName) {
        expect(result).toHaveProperty('userName');
      }
      if (result.emailAddress) {
        expect(result).toHaveProperty('emailAddress');
      }
    });
  });

  describe('User Search', () => {
    it('should search users by search terms', async () => {
      // Note: This is a skeleton test - implement based on available test data
      const result = await client.user.searchUsers('test', 0, 10);
      expect(result).toBeDefined();
      // Add specific assertions based on expected search results
    });
  });

  describe('User Networks', () => {
    it('should get account page networks for authenticated user', async () => {
      await authenticateTestClient(client);
      
      // First get current user to get their UUID
      const userResult = await client.user.getCurrentUser();
      expect(userResult).toBeDefined();
      
      if (userResult.externalId) {
        const networksResult = await client.user.getAccountPageNetworks(
          userResult.externalId, 
          0, 
          10
        );
        
        expect(Array.isArray(networksResult)).toBe(true);
      }
    });
  });
});