import axios, { AxiosInstance } from 'axios';
import {
  CyNDExConfig,
  CyNDExAuthConfig,
  NDExExportParams,
  CytoscapeNetworkSummary,
  CyNDExStatusResponse,
  CX2ImportParams
} from '../types/cytoscape';
import { AuthType } from '../constants';

/**
 * CyNDEx Service - Cytoscape-NDEx Bridge
 * 
 * Provides seamless integration between Cytoscape desktop application and NDEx,
 * enabling import/export of networks with support for CX and CX2 formats.
 * 
 * This service communicates with Cytoscape via its REST API and handles NDEx
 * authentication parameters that are passed to Cytoscape for NDEx operations.
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const cyNDEx = new CyNDExService();
 * 
 * // Configure NDEx server
 * cyNDEx.setNDExBaseURL('https://www.ndexbio.org');
 * 
 * // Set authentication
 * cyNDEx.setBasicAuth('username', 'password');
 * // or
 * cyNDEx.setAuthToken('oauth-id-token');
 * 
 * // Import network from NDEx to Cytoscape
 * await cyNDEx.postNDExNetworkToCytoscape('network-uuid', 'access-key');
 * 
 * // Export network from Cytoscape to NDEx
 * await cyNDEx.postCytoscapeNetworkToNDEx('current');
 * 
 * // Import CX2 data to Cytoscape
 * await cyNDEx.postCX2NetworkToCytoscape(cx2String, 'My Network', 'My Collection');
 * ```
 */
export class CyNDExService {
  private _port: number;
  private cyRestBaseURL: string;
  private ndexBaseURL: string;
  private authConfig?: CyNDExAuthConfig;
  private axiosInstance: AxiosInstance;

  /**
   * Create a new CyNDEx service instance
   * 
   * @param port - Port number for Cytoscape REST API (default: 1234)
   * @param config - Optional configuration object
   */
  constructor(port: number = 1234, config?: CyNDExConfig) {
    this._port = port;
    this.cyRestBaseURL = config?.cyRestBaseURL || 'http://127.0.0.1';
    this.ndexBaseURL = config?.ndexBaseURL || 'https://www.ndexbio.org';

    // Create axios instance for Cytoscape REST API calls
    this.axiosInstance = axios.create({
      baseURL: this.cyRestURL(),
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Get the port number for Cytoscape REST API
   */
  get port(): number {
    return this._port;
  }

  /**
   * Get the base URL for Cytoscape REST API
   */
  static get cyRestBaseURL(): string {
    return 'http://127.0.0.1';
  }

  /**
   * Set NDEx server base URL
   * 
   * @param ndexBaseURL - Complete base URL for NDEx server (e.g., 'https://www.ndexbio.org')
   *                      Must include protocol (https:// or http://)
   * 
   * @example
   * ```typescript
   * cyNDEx.setNDExBaseURL('https://www.ndexbio.org');
   * cyNDEx.setNDExBaseURL('https://test.ndexbio.org');
   * ```
   */
  setNDExBaseURL(ndexBaseURL: string): void {
    if (ndexBaseURL?.trim()) {
      this.ndexBaseURL = ndexBaseURL.trim();
    }
  }

  /**
   * Get the current NDEx server base URL
   * 
   * @returns Complete NDEx server base URL
   */
  getNDExBaseURL(): string {
    return this.ndexBaseURL;
  }


  /**
   * Set basic authentication credentials for NDEx operations
   * 
   * @param username - NDEx username
   * @param password - NDEx password
   */
  setBasicAuth(username: string, password: string): void {
    if (username?.trim() && password) {
      this.authConfig = {
        type: AuthType.BASIC,
        username: username.trim(),
        password: password
      };
    }
  }

  /**
   * Set OAuth ID token for NDEx operations
   * 
   * @param idToken - OAuth ID token from authentication provider
   */
  setAuthToken(idToken: string): void {
    if (idToken?.trim()) {
      this.authConfig = {
        type: AuthType.OAUTH,
        idToken: idToken.trim()
      };
    }
  }

  /**
   * Clear authentication credentials
   */
  clearAuth(): void {
    delete this.authConfig;
  }

  /**
   * Get the complete Cytoscape REST API URL
   * 
   * @returns Complete URL for Cytoscape REST API
   */
  cyRestURL(): string {
    return `${this.cyRestBaseURL}:${this._port}`;
  }

  /**
   * Get authorization fields for NDEx operations
   * These are passed as parameters to Cytoscape for NDEx authentication
   * 
   * @private
   * @returns Authorization parameters object
   */
  private getAuthFields(): Record<string, string> {
    if (!this.authConfig) return {};

    switch (this.authConfig.type) {
      case AuthType.BASIC:
        return {
          username: this.authConfig.username!,
          password: this.authConfig.password!
        };
      case AuthType.OAUTH:
        return {
          idToken: this.authConfig.idToken!
        };
      default:
        return {};
    }
  }

  /**
   * Perform HTTP GET request to Cytoscape REST API
   * 
   * @private
   * @param url - Endpoint URL (relative to base URL)
   * @returns Promise resolving to response data
   */
  private async _httpGet<T = any>(url: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(url);
    return response.data;
  }

  /**
   * Perform HTTP POST request to Cytoscape REST API
   * 
   * @private
   * @param url - Endpoint URL (relative to base URL)
   * @param params - Optional query parameters
   * @param data - Optional request body data
   * @returns Promise resolving to response data
   */
  private async _httpPost<T = any>(url: string, params?: any, data?: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, { params });
    return response.data;
  }

  /**
   * Perform HTTP PUT request to Cytoscape REST API
   * 
   * @private
   * @param url - Endpoint URL (relative to base URL)
   * @param params - Optional query parameters
   * @param data - Optional request body data
   * @returns Promise resolving to response data
   */
  private async _httpPut<T = any>(url: string, params?: any, data?: any): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, { params });
    return response.data;
  }

  // =============================================================================
  // Public API Methods - Maintain exact same signatures as original CyNDEx.js
  // =============================================================================

  /**
   * Get CyNDEx plugin status from Cytoscape
   * 
   * @returns Promise resolving to CyNDEx status information
   */
  async getCyNDExStatus(): Promise<CyNDExStatusResponse> {
    return this._httpGet<CyNDExStatusResponse>('/cyndex2/v1');
  }

  /**
   * Get network summary information from Cytoscape
   * 
   * @param suid - Network SUID or 'current' for current network (default: 'current')
   * @returns Promise resolving to network summary
   */
  async getCytoscapeNetworkSummary(suid: string = 'current'): Promise<CytoscapeNetworkSummary> {
    return this._httpGet<CytoscapeNetworkSummary>(`/cyndex2/v1/networks/${suid}`);
  }

  /**
   * Import network from NDEx to Cytoscape
   * 
   * @param uuid - NDEx network UUID
   * @param accessKey - Optional access key for private networks
   * @param createView - Whether to create a network view (default: undefined)
   * @returns Promise resolving to import result
   */
  async postNDExNetworkToCytoscape(
    uuid: string, 
    accessKey?: string, 
    createView?: boolean
  ): Promise<any> {
    const importParams: any = {
      serverUrl: `${this.ndexBaseURL}/v2`,
      uuid: uuid,
      ...this.getAuthFields()
    };

    if (accessKey !== undefined) {
      importParams.accessKey = accessKey;
    }

    if (createView !== undefined) {
      importParams.createView = createView;
    }

    return this._httpPost('/cyndex2/v1/networks', undefined, importParams);
  }

  /**
   * Import CX network data to Cytoscape
   * 
   * @param cx - CX format network data
   * @returns Promise resolving to import result
   */
  async postCXNetworkToCytoscape(cx: any): Promise<any> {
    return this._httpPost('/cyndex2/v1/networks/cx', undefined, cx);
  }

  /**
   * Import CX2 network data to Cytoscape
   * 
   * @param cx2_string - CX2 format network data as string
   * @param title - Network title
   * @param collection_name - Collection name
   * @returns Promise resolving to import result
   */
  async postCX2NetworkToCytoscape(
    cx2_string: string, 
    title: string, 
    collection_name: string
  ): Promise<any> {
    const params: CX2ImportParams = {
      format: 'cx2',
      collection: collection_name,
      title: title
    };

    return this._httpPost('/v1/networks', params, cx2_string);
  }

  /**
   * Export network from Cytoscape to NDEx (create new network)
   * 
   * @param suid - Network SUID or 'current' for current network (default: 'current')
   * @returns Promise resolving to export result
   */
  async postCytoscapeNetworkToNDEx(suid: string = 'current'): Promise<any> {
    const saveParams: NDExExportParams = {
      serverUrl: `${this.ndexBaseURL}/v2`,
      ...this.getAuthFields()
    };

    return this._httpPost(`/cyndex2/v1/networks/${suid}`, undefined, saveParams);
  }

  /**
   * Update existing network in NDEx with data from Cytoscape
   * 
   * @param suid - Network SUID or 'current' for current network (default: 'current')
   * @param uuid - Target NDEx network UUID to update
   * @returns Promise resolving to update result
   */
  async putCytoscapeNetworkInNDEx(suid: string = 'current', uuid: string): Promise<any> {
    const saveParams: NDExExportParams = {
      serverUrl: `${this.ndexBaseURL}/v2`,
      uuid: uuid,
      ...this.getAuthFields()
    };

    return this._httpPut(`/cyndex2/v1/networks/${suid}`, undefined, saveParams);
  }
}

// Export both as named export and default for backward compatibility
export default CyNDExService;