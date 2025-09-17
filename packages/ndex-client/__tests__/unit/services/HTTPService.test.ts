import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { HTTPService } from '../../../src/services/HTTPService';
import { NDExClientConfig } from '../../../src/types';
import { AuthType } from '../../../src/index';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock package.json
jest.mock('../../../package.json', () => ({ version: '1.0.0' }));

describe('HTTPService', () => {
  let httpService: HTTPService;
  let mockAxiosInstance: jest.Mocked<AxiosInstance>;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup axios create mock
    mockAxiosInstance = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() }
      },
      defaults: {
        headers: { common: {} }
      }
    } as any;
    
    mockedAxios.create.mockReturnValue(mockAxiosInstance);
    
    httpService = new HTTPService();
  });

  describe('constructor', () => {
    it('should create HTTPService with default configuration', () => {
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'https://www.ndexbio.org',
        timeout: 30000,
        headers: expect.objectContaining({
          'User-Agent': 'NDEx-JS-Client/1.0.0'
        })
      });
    });

    it('should create HTTPService with custom configuration', () => {
      const config: NDExClientConfig = {
        baseURL: 'https://test.ndexbio.org',
        timeout: 5000,
        debug: true,
        headers: { 'Custom-Header': 'test' }
      };
      
      new HTTPService(config);
      
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'https://test.ndexbio.org',
        timeout: 5000,
        headers: expect.objectContaining({
          'User-Agent': 'NDEx-JS-Client/1.0.0',
          'Custom-Header': 'test'
        })
      });
    });

    it('should include basic auth headers when auth is provided', () => {
      const config: NDExClientConfig = {
        auth: { type: AuthType.BASIC, username: 'user', password: 'pass' }
      };
      
      new HTTPService(config);
      
      expect(mockedAxios.create).toHaveBeenCalledWith(expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': 'Basic dXNlcjpwYXNz' // base64 of 'user:pass'
        })
      }));
    });

    it('should include OAuth headers when auth is provided', () => {
      const config: NDExClientConfig = {
        auth: { type: AuthType.OAUTH, idToken: 'token123' }
      };
      
      new HTTPService(config);
      
      expect(mockedAxios.create).toHaveBeenCalledWith(expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': 'Bearer token123'
        })
      }));
    });
  });

  describe('HTTP methods', () => {
    beforeEach(() => {
      const mockResponse: AxiosResponse = {
        data: { result: 'success' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      };
      
      mockAxiosInstance.get.mockResolvedValue(mockResponse);
      mockAxiosInstance.post.mockResolvedValue(mockResponse);
      mockAxiosInstance.put.mockResolvedValue(mockResponse);
      mockAxiosInstance.delete.mockResolvedValue(mockResponse);
    });

    describe('get', () => {
      it('should make GET request with default v2 version', async () => {
        await httpService.get('networks/123');
        
        expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v2/networks/123', {});
      });

      it('should make GET request with specified v3 version', async () => {
        await httpService.get('networks/123', { version: 'v3' });
        
        expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v3/networks/123', {});
      });

      it('should handle leading slash in endpoint', async () => {
        await httpService.get('/networks/123');
        
        expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v2/networks/123', {});
      });

      it('should return data directly for valid request', async () => {
        const result = await httpService.get('networks/123');
        
        expect(result).toEqual({ result: 'success' });
      });
    });

    describe('post', () => {
      it('should make POST request with data', async () => {
        const data = { name: 'Test Network' };
        
        await httpService.post('networks', data, { version: 'v3' });
        
        expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v3/networks', data, {});
      });

      it('should make POST request without data', async () => {
        await httpService.post('networks/123/copy');
        
        expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v2/networks/123/copy', undefined, {});
      });
    });

    describe('put', () => {
      it('should make PUT request with data', async () => {
        const data = { name: 'Updated Network' };
        
        await httpService.put('networks/123', data);
        
        expect(mockAxiosInstance.put).toHaveBeenCalledWith('/v2/networks/123', data, {});
      });
    });

    describe('delete', () => {
      it('should make DELETE request', async () => {
        await httpService.delete('networks/123', { version: 'v3' });
        
        expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/v3/networks/123', {});
      });
    });
  });

  describe('uploadFile', () => {
    it('should upload File object with correct headers', async () => {
      const mockFile = new File(['content'], 'test.cx2', { type: 'application/json' });
      
      // Mock FormData append
      const formDataSpy = jest.spyOn(FormData.prototype, 'append');
      
      // Mock successful response
      mockAxiosInstance.post.mockResolvedValue({ data: { success: true }, status: 200 });
      
      await httpService.uploadFile('networks', mockFile, { version: 'v3' });
      
      expect(formDataSpy).toHaveBeenCalledWith('file', mockFile, 'test.cx2');
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/v3/networks',
        expect.any(FormData),
        expect.any(Object)
      );
      
      formDataSpy.mockRestore();
    });

    it('should upload string content as blob', async () => {
      const content = '{"CXVersion": "2.0"}';
      const formDataSpy = jest.spyOn(FormData.prototype, 'append');
      
      // Mock successful response
      mockAxiosInstance.post.mockResolvedValue({ data: { success: true }, status: 200 });
      
      await httpService.uploadFile('networks', content, {
        contentType: 'application/json'
      });
      
      expect(formDataSpy).toHaveBeenCalledWith(
        'file',
        expect.any(Blob),
        'file.cx2'
      );
      
      formDataSpy.mockRestore();
    });

    it('should call progress callback during upload', async () => {
      const mockFile = new File(['content'], 'test.cx2');
      const progressCallback = jest.fn();
      
      // Mock upload progress
      mockAxiosInstance.post.mockImplementation((_url, _data, config) => {
        // Simulate progress callback
        if (config?.onUploadProgress) {
          config.onUploadProgress({ loaded: 50, total: 100 } as any);
        }
        return Promise.resolve({ data: { success: true }, status: 200 } as any);
      });
      
      await httpService.uploadFile('networks', mockFile, {
        onProgress: progressCallback
      });
      
      expect(progressCallback).toHaveBeenCalledWith(50);
    });
  });

  describe('error handling', () => {
    it('should throw NDExNetworkError for network errors', async () => {
      const networkError = new Error('Network Error');
      // Simulate a request error (no response)
      Object.assign(networkError, { request: {} });
      mockAxiosInstance.get.mockRejectedValue(networkError);
      
      await expect(httpService.get('networks/123')).rejects.toThrow('Network error - no response received');
    });

    it('should throw NDExNotFoundError for 404 errors', async () => {
      const apiError = {
        response: {
          status: 404,
          data: {
            errorCode: 'NETWORK_NOT_FOUND',
            message: 'Network not found',
            description: 'The specified network does not exist'
          }
        }
      };
      mockAxiosInstance.get.mockRejectedValue(apiError);
      
      await expect(httpService.get('networks/invalid')).rejects.toThrow('Network not found');
    });

    it('should throw NDExValidationError for error response data', async () => {
      mockAxiosInstance.get.mockResolvedValue({
        data: {
          errorCode: 'INVALID_REQUEST',
          message: 'Invalid request parameters',
          description: 'Required parameter is missing'
        },
        status: 400
      });
      
      await expect(httpService.get('networks')).rejects.toThrow('Invalid request parameters');
    });
  });

  describe('updateConfig', () => {
    it('should update axios instance configuration', () => {
      const newConfig = {
        baseURL: 'https://new.ndexbio.org',
        timeout: 10000,
        headers: { 'New-Header': 'value' }
      };
      
      httpService.updateConfig(newConfig);
      
      expect(mockAxiosInstance.defaults.baseURL).toBe('https://new.ndexbio.org');
      expect(mockAxiosInstance.defaults.timeout).toBe(10000);
    });

    it('should update auth headers when auth config changes', () => {
      const authConfig = {
        auth: { type: 'basic' as const, username: 'newuser', password: 'newpass' }
      };
      
      httpService.updateConfig(authConfig);
      
      expect(mockAxiosInstance.defaults.headers.common['Authorization']).toBe('Basic bmV3dXNlcjpuZXdwYXNz');
    });

    it('should clear auth headers when auth is set to undefined', () => {
      httpService.updateConfig({ auth: undefined });
      
      expect(mockAxiosInstance.defaults.headers.common['Authorization']).toBeUndefined();
    });
  });

  describe('getConfig', () => {
    it('should return copy of current configuration', () => {
      const service = new HTTPService({ baseURL: 'https://test.ndexbio.org', timeout: 5000 });
      
      const config = service.getConfig();
      
      expect(config).toEqual(expect.objectContaining({
        baseURL: 'https://test.ndexbio.org',
        timeout: 5000
      }));
      
      // Verify it's a copy, not the original
      config.baseURL = 'modified';
      expect(service.getConfig().baseURL).toBe('https://test.ndexbio.org');
    });
  });

  describe('auth methods', () => {
    it('should return correct auth type for basic auth', () => {
      const service = new HTTPService({ 
        auth: { type: AuthType.BASIC, username: 'user', password: 'pass' } 
      });
      
      expect(service.getAuthType()).toBe(AuthType.BASIC);
    });

    it('should return correct auth type for oauth', () => {
      const service = new HTTPService({ 
        auth: { type: AuthType.OAUTH, idToken: 'token123' } 
      });
      
      expect(service.getAuthType()).toBe(AuthType.OAUTH);
    });

    it('should return undefined when no auth is configured', () => {
      const service = new HTTPService();
      
      expect(service.getAuthType()).toBeUndefined();
    });

    it('should return idToken for oauth auth', () => {
      const service = new HTTPService({ 
        auth: { type: AuthType.OAUTH, idToken: 'token123' } 
      });
      
      expect(service.getIdToken()).toBe('token123');
    });

    it('should return undefined for basic auth', () => {
      const service = new HTTPService({ 
        auth: { type: AuthType.BASIC, username: 'user', password: 'pass' } 
      });
      
      expect(service.getIdToken()).toBeUndefined();
    });

    it('should set idToken and update to oauth auth', () => {
      const service = new HTTPService();
      service.setIdToken('newtoken123');
      
      expect(service.getAuthType()).toBe(AuthType.OAUTH);
      expect(service.getIdToken()).toBe('newtoken123');
    });
  });
});
