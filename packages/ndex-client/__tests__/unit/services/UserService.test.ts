import { UserService } from '../../../src/services/UserService';
import { HTTPService } from '../../../src/services/HTTPService';
import { NDExUser, ServiceResponse } from '../../../src/types';

// Mock HTTPService
jest.mock('../../../src/services/HTTPService');

describe('UserService', () => {
  let userService: UserService;
  let mockHttpService: jest.Mocked<HTTPService>;

  beforeEach(() => {
    mockHttpService = new HTTPService() as jest.Mocked<HTTPService>;
    userService = new UserService(mockHttpService);
    jest.clearAllMocks();
  });

  describe('authenticate', () => {
    it('should throw error when no auth type is configured', async () => {
      mockHttpService.getAuthType.mockReturnValue(undefined);
      
      await expect(userService.authenticate()).rejects.toThrow('Authentication parameters are missing in NDEx client.');
    });

    it('should use basic auth endpoint for basic auth type', async () => {
      const mockUser: NDExUser = {
        externalId: 'user-123',
        userName: 'testuser',
        emailAddress: 'test@example.com'
      };
      
      mockHttpService.getAuthType.mockReturnValue('basic');
      mockHttpService.get.mockResolvedValue(mockUser);
      
      const result = await userService.authenticate();
      
      expect(mockHttpService.get).toHaveBeenCalledWith('user', { params: { valid: true } });
      expect(result).toEqual(mockUser);
    });

    it('should use oauth signin endpoint for oauth auth type', async () => {
      const mockUser: NDExUser = {
        externalId: 'user-456',
        userName: 'oauthuser',
        emailAddress: 'oauth@example.com'
      };
      
      mockHttpService.getAuthType.mockReturnValue('oauth');
      mockHttpService.getIdToken.mockReturnValue('token123');
      mockHttpService.post.mockResolvedValue(mockUser);
      
      const result = await userService.authenticate();
      
      expect(mockHttpService.post).toHaveBeenCalledWith('users/signin', { idToken: 'token123' }, { version: 'v3' });
      expect(result).toEqual(mockUser);
    });

    it('should throw error when oauth auth is configured but no idToken is available', async () => {
      mockHttpService.getAuthType.mockReturnValue('oauth');
      mockHttpService.getIdToken.mockReturnValue(undefined);
      
      await expect(userService.authenticate()).rejects.toThrow('OAuth ID token is missing.');
    });
  });

  describe('getCurrentUser', () => {
    it('should throw error when no auth is configured', async () => {
      mockHttpService.getAuthType.mockReturnValue(undefined);
      
      await expect(userService.getCurrentUser()).rejects.toThrow('Authentication parameters are missing in NDEx client.');
    });

    it('should make GET request to user endpoint with valid parameter', async () => {
      const mockUser: NDExUser = {
        externalId: 'user-123',
        userName: 'testuser'
      };
      
      mockHttpService.getAuthType.mockReturnValue('basic');
      mockHttpService.get.mockResolvedValue(mockUser);
      
      const result = await userService.getCurrentUser();
      
      expect(mockHttpService.get).toHaveBeenCalledWith('user', { params: { valid: true } });
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateCurrentUser', () => {
    it('should throw error when userUpdate missing externalId', async () => {
      const userUpdate = { firstName: 'John' };
      
      await expect(userService.updateCurrentUser(userUpdate)).rejects.toThrow('User uuid is required in userUpdate object');
    });

    it('should make PUT request with user UUID in endpoint', async () => {
      const userUpdate = {
        externalId: 'user-123',
        firstName: 'John',
        lastName: 'Doe'
      };
      
      mockHttpService.put.mockResolvedValue(undefined);
      
      const result = await userService.updateCurrentUser(userUpdate);
      
      expect(mockHttpService.put).toHaveBeenCalledWith('user/user-123', userUpdate);
      expect(result).toBeUndefined();
    });
  });

  describe('requestPasswordReset', () => {
    it('should make POST request to user forgot-password endpoint with email', async () => {
      const email = 'user@example.com';
      
      mockHttpService.post.mockResolvedValue(undefined);
      
      const result = await userService.requestPasswordReset(email);
      
      expect(mockHttpService.post).toHaveBeenCalledWith(
        'user/forgot-password',
        { email }
      );
      expect(result).toBeUndefined();
    });
  });

  describe('resetPassword', () => {
    it('should make PUT request to user password endpoint with plain text', async () => {
      const userUUID = 'user-123';
      const newPassword = 'newSecurePassword';
      
      mockHttpService.put.mockResolvedValue(undefined);
      
      const result = await userService.resetPassword(userUUID, newPassword);
      
      expect(mockHttpService.put).toHaveBeenCalledWith(
        'user/user-123/password',
        newPassword,
        {
          headers: {
            'Content-Type': 'text/plain'
          }
        }
      );
      expect(result).toBeUndefined();
    });
  });

  describe('getUser', () => {
    it('should make GET request to user endpoint with UUID', async () => {
      const userUUID = 'user-123';
      const mockUser: NDExUser = {
        externalId: userUUID,
        userName: 'testuser'
      };
      
      mockHttpService.get.mockResolvedValue(mockUser);
      
      const result = await userService.getUser(userUUID);
      
      expect(mockHttpService.get).toHaveBeenCalledWith('user/user-123');
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUserByNameOrEmail', () => {
    it('should make GET request with username parameter', async () => {
      const mockUser: NDExUser = {
        externalId: 'user-123',
        userName: 'testuser'
      };
      
      mockHttpService.get.mockResolvedValue(mockUser);
      
      const result = await userService.getUserByNameOrEmail({ username: 'testuser' });
      
      expect(mockHttpService.get).toHaveBeenCalledWith('user?username=testuser');
      expect(result).toEqual(mockUser);
    });

    it('should make GET request with email parameter', async () => {
      const mockUser: NDExUser = {
        externalId: 'user-123',
        userName: 'testuser',
        emailAddress: 'test@example.com'
      };
      
      mockHttpService.get.mockResolvedValue(mockUser);
      
      const result = await userService.getUserByNameOrEmail({ email: 'test@example.com' });
      
      expect(mockHttpService.get).toHaveBeenCalledWith('user?email=test%40example.com');
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUsersByUUIDs', () => {
    it('should make POST request to batch user endpoint', async () => {
      const uuidList = ['user-1', 'user-2', 'user-3'];
      const mockUsers: NDExUser[] = [
        { externalId: 'user-1', userName: 'user1' },
        { externalId: 'user-2', userName: 'user2' },
        { externalId: 'user-3', userName: 'user3' }
      ];
      
      mockHttpService.post.mockResolvedValue({
        success: true,
        data: mockUsers
      });
      
      const result = await userService.getUsersByUUIDs(uuidList);
      
      expect(mockHttpService.post).toHaveBeenCalledWith('batch/user', uuidList);
      expect(result).toEqual({
        success: true,
        data: mockUsers
      });
    });
  });

  describe('searchUsers', () => {
    it('should make POST request to search user endpoint with search data', async () => {
      const searchTerms = 'john';
      const mockUsers: NDExUser[] = [
        { externalId: 'user-1', userName: 'john_doe' },
        { externalId: 'user-2', userName: 'johnny' }
      ];
      
      mockHttpService.post.mockResolvedValue({
        success: true,
        data: mockUsers
      });
      
      const result = await userService.searchUsers(searchTerms);
      
      expect(mockHttpService.post).toHaveBeenCalledWith(
        'search/user',
        { searchString: searchTerms },
        { params: {} }
      );
      expect(result).toEqual({
        success: true,
        data: mockUsers
      });
    });

    it('should include pagination parameters when provided', async () => {
      const searchTerms = 'john';
      const start = 10;
      const size = 25;
      
      mockHttpService.post.mockResolvedValue({
        success: true,
        data: []
      });
      
      await userService.searchUsers(searchTerms, start, size);
      
      expect(mockHttpService.post).toHaveBeenCalledWith(
        'search/user',
        { searchString: searchTerms },
        { params: { start: '10', limit: '25' } }
      );
    });
  });

  describe('getAccountPageNetworks', () => {
    it('should make GET request to user networksummary endpoint', async () => {
      const userUUID = 'user-123';
      const mockNetworks = [
        { externalId: 'network-1', name: 'Network 1' },
        { externalId: 'network-2', name: 'Network 2' }
      ];
      
      mockHttpService.get.mockResolvedValue({
        success: true,
        data: mockNetworks
      });
      
      const result = await userService.getAccountPageNetworks(userUUID);
      
      expect(mockHttpService.get).toHaveBeenCalledWith(
        'user/user-123/networksummary',
        { params: {} }
      );
      expect(result).toEqual({
        success: true,
        data: mockNetworks
      });
    });

    it('should include pagination parameters when provided', async () => {
      const userUUID = 'user-123';
      const offset = 20;
      const limit = 50;
      
      mockHttpService.get.mockResolvedValue({
        success: true,
        data: []
      });
      
      await userService.getAccountPageNetworks(userUUID, offset, limit);
      
      expect(mockHttpService.get).toHaveBeenCalledWith(
        'user/user-123/networksummary',
        { params: { offset: '20', limit: '50' } }
      );
    });
  });

  describe('deleteUserAccount', () => {
    it('should make DELETE request to user endpoint with UUID', async () => {
      const userUUID = 'user-123';
      
      mockHttpService.delete.mockResolvedValue(undefined);
      
      const result = await userService.deleteUserAccount(userUUID);
      
      expect(mockHttpService.delete).toHaveBeenCalledWith('user/user-123');
      expect(result).toBeUndefined();
    });
  });
});