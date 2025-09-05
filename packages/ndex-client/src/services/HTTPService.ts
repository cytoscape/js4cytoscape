import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { 
  NDExClientConfig, 
  APIResponse, 
  APIError, 
  BasicAuth, 
  OAuthAuth,
  NDExError,
  NDExNetworkError,
  NDExAuthError,
  NDExNotFoundError,
  NDExValidationError,
  NDExServerError
} from '../types';
import { version } from '../../package.json';

/**
 * HTTPService - Core HTTP client for NDEx API communication
 * Handles v2/v3 endpoint routing, authentication, and error handling
 * 
 * @note User-Agent header is set to 'NDEx-JS-Client/${version}' but only works in Node.js.
 *       Browsers will ignore custom User-Agent headers for security reasons.
 */
export class HTTPService {
  private axiosInstance: AxiosInstance;
  private config: NDExClientConfig;

  constructor(config: NDExClientConfig = {}) {
    this.config = {
      baseURL: 'https://www.ndexbio.org',
      timeout: 30000,
      retries: 3,
      retryDelay: 1000,
      debug: false,
      ...config,
    };

    // Create headers object
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.config.headers,
      ...this.getAuthHeaders(),
    };

    // Only set User-Agent in Node.js environments (not in browsers)
    if (typeof window === 'undefined') {
      headers['User-Agent'] = `NDEx-JS-Client/${version}`;
    }

    this.axiosInstance = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers,
    });

    this.setupInterceptors();
  }

  /**
   * Get authentication headers based on config.auth
   */
  private getAuthHeaders(): Record<string, string> {
    if (!this.config.auth) {
      return {};
    }

    if (this.config.auth.type === 'basic') {
      // Basic authentication: encode username:password in base64
      const credentials = btoa(`${this.config.auth.username}:${this.config.auth.password}`);
      return {
        'Authorization': `Basic ${credentials}`,
      };
    } else if (this.config.auth.type === 'oauth') {
      // OAuth Bearer token
      return {
        'Authorization': `Bearer ${this.config.auth.idToken}`,
      };
    }

    return {};
  }

  /**
   * Build API endpoint URL with version routing
   */
  private buildUrl(endpoint: string, version: 'v2' | 'v3' = 'v2'): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `/${version}/${cleanEndpoint}`;
  }

  /**
   * Generic GET request with intelligent version routing
   */
  async get<T = any>(
    endpoint: string,
    config?: AxiosRequestConfig & { version?: 'v2' | 'v3' }
  ): Promise<T> {
    const { version, ...axiosConfig } = config || {};
    const url = this.buildUrl(endpoint, version);

    try {
      const response = await this.axiosInstance.get<APIResponse<T>>(url, axiosConfig);
      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Generic POST request with intelligent version routing
   */
  async post<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig & { version?: 'v2' | 'v3' }
  ): Promise<T> {
    const { version, ...axiosConfig } = config || {};
    const url = this.buildUrl(endpoint, version);

    try {
      const response = await this.axiosInstance.post<APIResponse<T>>(url, data, axiosConfig);
      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Generic PUT request with intelligent version routing
   */
  async put<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig & { version?: 'v2' | 'v3' }
  ): Promise<T> {
    const { version, ...axiosConfig } = config || {};
    const url = this.buildUrl(endpoint, version);

    try {
      const response = await this.axiosInstance.put<APIResponse<T>>(url, data, axiosConfig);
      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Generic DELETE request with intelligent version routing
   */
  async delete<T = any>(
    endpoint: string,
    config?: AxiosRequestConfig & { version?: 'v2' | 'v3' }
  ): Promise<T> {
    const { version, ...axiosConfig } = config || {};
    const url = this.buildUrl(endpoint, version);

    try {
      const response = await this.axiosInstance.delete<APIResponse<T>>(url, axiosConfig);
      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleError(error);
    }
  }


  /**
   * Upload a file to the NDEx API with progress tracking support
   * 
   * This method handles file uploads using multipart/form-data encoding and supports
   * various input types for maximum flexibility across different environments.
   * 
   * @template T - The expected response type from the API
   * @param endpoint - API endpoint path (e.g., 'networks' for network upload)
   * @param file - File data to upload. Supports multiple input types:
   *   - `File` (browser): HTML5 File object from file input or drag-and-drop
   *   - `Blob` (browser): Binary data as Blob object
   *   - `Buffer` (Node.js): Binary data as Buffer for server-side uploads
   *   - `string`: Text content that will be converted to Blob (useful for CX/CX2 JSON)
   * @param options - Upload configuration options
   * @param options.filename - Custom filename for the upload. Defaults:
   *   - File objects: uses `file.name`
   *   - Other types: 'file.cx2'
   * @param options.contentType - MIME type for string content (default: 'application/json')
   * @param options.onProgress - Progress callback that receives percentage (0-100)
   *   Called periodically during upload with current progress
   * @param options.version - API version to use ('v2' or 'v3', defaults to 'v2')
   * 
   * @returns Promise resolving to upload result
   * 
   * @example
   * ```typescript
   * // Upload a File object from file input (browser)
   * const fileInput = document.getElementById('file') as HTMLInputElement;
   * const file = fileInput.files[0];
   * const result = await httpService.uploadFile('networks', file, {
   *   filename: 'my-network.cx2',
   *   onProgress: (progress) => console.log(`Upload: ${progress}%`),
   *   version: 'v3'
   * });
   * 
   * // Upload CX2 network data as string
   * const cx2Data = JSON.stringify({ CXVersion: '2.0', networks: [...] });
   * const result = await httpService.uploadFile('networks', cx2Data, {
   *   filename: 'network.cx2',
   *   contentType: 'application/json',
   *   version: 'v3'
   * });
   * 
   * // Upload with progress tracking
   * const result = await httpService.uploadFile('networks', file, {
   *   onProgress: (progress) => {
   *     progressBar.style.width = `${progress}%`;
   *     console.log(`Uploading: ${progress}%`);
   *   }
   * });
   * ```
   * 
   * @throws Will throw NDExError on network errors,
   *         server errors, or invalid file data
   * 
   * @note The Content-Type header is automatically set to 'multipart/form-data'
   *       and Axios will handle the boundary parameter automatically
   */
  async uploadFile<T = any>(
    endpoint: string,
    file: File | Blob | Buffer | string,
    options: {
      filename?: string;
      contentType?: string;
      onProgress?: (progress: number) => void;
      version?: 'v2' | 'v3';
    } = {}
  ): Promise<T> {
    const { version, onProgress, filename, contentType, ...config } = options;
    const url = this.buildUrl(endpoint, version);

    const formData = new FormData();
    
    if (file instanceof File) {
      formData.append('file', file, filename || file.name);
    } else if (file instanceof Blob) {
      formData.append('file', file, filename || 'file.cx2');
    } else if (typeof file === 'string') {
      const blob = new Blob([file], { type: contentType || 'application/json' });
      formData.append('file', blob, filename || 'file.cx2');
    } else {
      // Buffer (Node.js environment)
      formData.append('file', file as any, filename || 'file.cx2');
    }

    try {
      const response = await this.axiosInstance.post<APIResponse<T>>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: onProgress ? (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          onProgress(progress);
        } : undefined,
        ...config,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Setup axios interceptors for debugging and retry logic
   */
  private setupInterceptors(): void {
    // Request interceptor for debugging
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.config.debug) {
          console.log('NDEx API Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            headers: config.headers,
          });
        }
        return config;
      },
      (error) => {
        if (this.config.debug) {
          console.error('NDEx API Request Error:', error);
        }
        return Promise.reject(error);
      }
    );

    // Response interceptor for debugging
    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (this.config.debug) {
          console.log('NDEx API Response:', {
            status: response.status,
            url: response.config.url,
            data: response.data,
          });
        }
        return response;
      },
      (error) => {
        if (this.config.debug) {
          console.error('NDEx API Response Error:', error.response?.data || error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Handle successful API responses
   */
  private handleResponse<T>(response: AxiosResponse<any>): T {
    // Handle different response formats from NDEx API
    if (response.data && typeof response.data === 'object') {
      if ('errorCode' in response.data) {
        // NDEx error format - throw appropriate error
        this.throwNDExError(
          response.data.message || 'Unknown error occurred',
          response.status,
          response.data.errorCode || 'UNKNOWN_ERROR',
          response.data.description
        );
      }
    }

    // Handle wrapped vs direct responses
    const data = response.data && typeof response.data === 'object' && 'data' in response.data 
      ? response.data.data 
      : response.data;

    return data as T;
  }

  /**
   * Handle API errors by throwing appropriate NDEx error types
   */
  private handleError(error: any): never {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || error.message;
      const errorCode = error.response.data?.errorCode || `HTTP_${error.response.status}`;
      const description = error.response.data?.description;
      
      this.throwNDExError(message, error.response.status, errorCode, description);
    } else if (error.request) {
      // Request made but no response received
      throw new NDExNetworkError('Network error - no response received', error);
    } else {
      // Something else happened
      throw new NDExError(error.message || 'Unknown error occurred', undefined, 'CLIENT_ERROR', error.toString());
    }
  }

  /**
   * Throw appropriate NDEx error based on status code
   */
  private throwNDExError(message: string, statusCode: number, errorCode: string, description?: string): never {
    switch (statusCode) {
      case 400:
        throw new NDExValidationError(message, statusCode);
      case 401:
      case 403:
        throw new NDExAuthError(message, statusCode);
      case 404:
        throw new NDExNotFoundError(message, statusCode);
      case 500:
      case 502:
      case 503:
      case 504:
        throw new NDExServerError(message, statusCode);
      default:
        throw new NDExError(message, statusCode, errorCode, description);
    }
  }

  /**
   * Update client configuration
   */
  updateConfig(newConfig: Partial<NDExClientConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    if (newConfig.baseURL) {
      this.axiosInstance.defaults.baseURL = newConfig.baseURL;
    }
    
    if (newConfig.timeout) {
      this.axiosInstance.defaults.timeout = newConfig.timeout;
    }

    if (newConfig.headers) {
      Object.assign(this.axiosInstance.defaults.headers, newConfig.headers);
    }

    // Update auth headers if auth config changed
    if ('auth' in newConfig) {
      const authHeaders = this.getAuthHeaders();
      
      // Clear existing authorization header first
      delete this.axiosInstance.defaults.headers.common['Authorization'];
      
      // Set new auth headers
      Object.assign(this.axiosInstance.defaults.headers.common, authHeaders);
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): NDExClientConfig {
    return { ...this.config };
  }

  /**
   * Get current authentication type
   * @returns The type of authentication configured ('basic' | 'oauth'), or undefined if no auth is configured
   */
  getAuthType(): 'basic' | 'oauth' | undefined {
    return this.config.auth?.type;
  }

  /**
   * Get ID token from OAuth authentication
   * @returns The ID token if OAuth auth is configured, undefined otherwise
   */
  getIdToken(): string | undefined {
    return this.config.auth?.type === 'oauth' ? this.config.auth.idToken : undefined;
  }

  /**
   * Set ID token for OAuth authentication
   * Creates OAuth auth configuration if no auth is currently configured
   * @param idToken - The ID token to set
   */
  setIdToken(idToken: string): void {
    this.updateConfig({
      auth: { type: 'oauth', idToken }
    });
  }
}
