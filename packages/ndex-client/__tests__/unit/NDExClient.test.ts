import { NDExClient } from '../../src/index';
import { HTTPService } from '../../src/services/HTTPService';
import { UserService } from '../../src/services/UserService';
import { AdminService } from '../../src/services/AdminService';
import { FilesService } from '../../src/services/FilesService';
import { WorkspaceService } from '../../src/services/WorkspaceService';
import { UnifiedNetworkService } from '../../src/services/UnifiedNetworkService';

// Mock all service dependencies
jest.mock('../../src/services/HTTPService');
jest.mock('../../src/services/UserService');
jest.mock('../../src/services/AdminService');
jest.mock('../../src/services/FilesService');
jest.mock('../../src/services/WorkspaceService');
jest.mock('../../src/services/UnifiedNetworkService');

describe('NDExClient', () => {
  let client: NDExClient;
  let mockHttpService: jest.Mocked<HTTPService>;

  beforeEach(() => {
    jest.clearAllMocks();
    client = new NDExClient();
    mockHttpService = client['httpService'] as jest.Mocked<HTTPService>;
  });

  describe('constructor', () => {
    it('should create client with default configuration', () => {
      const defaultClient = new NDExClient();
      expect(defaultClient).toBeInstanceOf(NDExClient);
      expect(HTTPService).toHaveBeenCalledWith({});
    });

    it('should create client with custom configuration', () => {
      const config = {
        baseURL: 'https://test.ndexbio.org',
        timeout: 5000,
        debug: true
      };
      
      const customClient = new NDExClient(config);
      expect(customClient).toBeInstanceOf(NDExClient);
      expect(HTTPService).toHaveBeenCalledWith(config);
    });

    it('should initialize all service instances', () => {
      const client = new NDExClient();
      
      expect(client.networks).toBeInstanceOf(UnifiedNetworkService);
      expect(client.files).toBeInstanceOf(FilesService);
      expect(client.workspace).toBeInstanceOf(WorkspaceService);
      expect(client.user).toBeInstanceOf(UserService);
      expect(client.admin).toBeInstanceOf(AdminService);
    });
  });

  describe('logout', () => {
    it('should clear authentication by updating config with undefined auth', () => {
      mockHttpService.updateConfig = jest.fn();
      
      client.logout();
      
      expect(mockHttpService.updateConfig).toHaveBeenCalledWith({ auth: undefined });
    });
  });

  describe('getServerStatus', () => {
    it('should call HTTP service with correct endpoint when no format specified', async () => {
      const mockResponse = {
        success: true,
        data: {
          message: 'NDEx server is running',
          networkCount: 100,
          userCount: 50
        }
      };
      
      mockHttpService.get = jest.fn().mockResolvedValue(mockResponse);
      
      const result = await client.getServerStatus();
      
      expect(mockHttpService.get).toHaveBeenCalledWith('admin/status');
      expect(result).toEqual(mockResponse);
    });

    it('should call HTTP service with format parameter when specified', async () => {
      const mockResponse = {
        success: true,
        data: {
          message: 'NDEx server is running',
          properties: {
            ServerVersion: '2.6.0',
            Build: '123',
            ServerResultLimit: '1000',
            ImporterExporters: []
          },
          networkCount: 100,
          userCount: 50
        }
      };
      
      mockHttpService.get = jest.fn().mockResolvedValue(mockResponse);
      
      const result = await client.getServerStatus('full');
      
      expect(mockHttpService.get).toHaveBeenCalledWith('admin/status?format=full');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('hasAuthInfo', () => {
    beforeEach(() => {
      mockHttpService.getConfig = jest.fn();
    });

    it('should return false when no auth is configured', () => {
      mockHttpService.getConfig.mockReturnValue({});
      
      const result = client.hasAuthInfo();
      
      expect(result).toBe(false);
    });

    it('should return false when auth is null', () => {
      mockHttpService.getConfig.mockReturnValue({ auth: null });
      
      const result = client.hasAuthInfo();
      
      expect(result).toBe(false);
    });

    it('should return false when auth is undefined', () => {
      mockHttpService.getConfig.mockReturnValue({ auth: undefined });
      
      const result = client.hasAuthInfo();
      
      expect(result).toBe(false);
    });

    it('should return false for empty auth object', () => {
      mockHttpService.getConfig.mockReturnValue({ auth: {} as any });
      
      const result = client.hasAuthInfo();
      
      expect(result).toBe(false);
    });

    it('should return false for incomplete BasicAuth', () => {
      mockHttpService.getConfig.mockReturnValue({ 
        auth: { type: 'basic', username: 'user' } as any 
      });
      
      const result = client.hasAuthInfo();
      
      expect(result).toBe(false);
    });

    it('should return true for valid BasicAuth', () => {
      mockHttpService.getConfig.mockReturnValue({
        auth: { type: 'basic', username: 'user', password: 'pass' }
      });
      
      const result = client.hasAuthInfo();
      
      expect(result).toBe(true);
    });

    it('should return false for incomplete OAuthAuth', () => {
      mockHttpService.getConfig.mockReturnValue({ 
        auth: { type: 'oauth' } as any 
      });
      
      const result = client.hasAuthInfo();
      
      expect(result).toBe(false);
    });

    it('should return true for valid OAuthAuth', () => {
      mockHttpService.getConfig.mockReturnValue({
        auth: { type: 'oauth', idToken: 'token123' }
      });
      
      const result = client.hasAuthInfo();
      
      expect(result).toBe(true);
    });

    it('should return false for invalid auth type', () => {
      mockHttpService.getConfig.mockReturnValue({
        auth: { type: 'invalid', token: 'test' } as any
      });
      
      const result = client.hasAuthInfo();
      
      expect(result).toBe(false);
    });

    it('should return false when username is empty string', () => {
      mockHttpService.getConfig.mockReturnValue({
        auth: { type: 'basic', username: '', password: 'pass' }
      });
      
      const result = client.hasAuthInfo();
      
      expect(result).toBe(false);
    });

    it('should return false when idToken is empty string', () => {
      mockHttpService.getConfig.mockReturnValue({
        auth: { type: 'oauth', idToken: '' }
      });
      
      const result = client.hasAuthInfo();
      
      expect(result).toBe(false);
    });
  });

  describe('updateConfig', () => {
    it('should delegate to HTTP service updateConfig', () => {
      const config = { timeout: 10000, debug: true };
      mockHttpService.updateConfig = jest.fn();
      
      client.updateConfig(config);
      
      expect(mockHttpService.updateConfig).toHaveBeenCalledWith(config);
    });
  });

  describe('getConfig', () => {
    it('should delegate to HTTP service getConfig', () => {
      const mockConfig = { baseURL: 'https://test.ndexbio.org', timeout: 5000 };
      mockHttpService.getConfig = jest.fn().mockReturnValue(mockConfig);
      
      const result = client.getConfig();
      
      expect(mockHttpService.getConfig).toHaveBeenCalled();
      expect(result).toEqual(mockConfig);
    });
  });


  describe('auth methods', () => {
    it('should provide getAuthType method', () => {
      mockHttpService.getAuthType = jest.fn().mockReturnValue('basic');
      
      const result = client.getAuthType();
      
      expect(mockHttpService.getAuthType).toHaveBeenCalled();
      expect(result).toBe('basic');
    });

    it('should provide setIdToken method', () => {
      mockHttpService.setIdToken = jest.fn();
      
      client.setIdToken('test-token');
      
      expect(mockHttpService.setIdToken).toHaveBeenCalledWith('test-token');
    });
  });

  describe('service accessors', () => {
    it('should provide access to v2 services', () => {
      const result = client.v2;
      expect(result).toHaveProperty('networks');
      expect(result.networks).toBe(client.networks.v2);
    });

    it('should provide access to v3 services', () => {
      const result = client.v3;
      expect(result).toHaveProperty('networks');
      expect(result.networks).toBe(client.networks.v3);
    });
  });
});