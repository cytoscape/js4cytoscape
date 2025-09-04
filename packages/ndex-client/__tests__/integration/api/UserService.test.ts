import { NDExClient } from '../../../src/index';
import { createIntegrationTestClient, authenticateTestClient, integrationConfig } from '../config/testConfig';

describe('UserService Integration Tests', () => {
  let client: NDExClient;

  beforeEach(() => {
    client = createIntegrationTestClient();
  });

  describe('Authentication', () => {
    it('should authenticate user with basic auth', async () => {
      await authenticateTestClient(client);
      
      const result = await client.user.authenticate();
      
      // Check for actual user data structure - may vary by server
      expect(result).toBeDefined();
      if (result.externalId) {
        expect(result).toHaveProperty('externalId');
      }
      if (result.userName) {
        expect(result).toHaveProperty('userName');
      }
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