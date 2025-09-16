import { HTTPService } from './HTTPService';
import { 
  NetworkSummaryV2, 
  NetworkPermission, 
  PaginationParams,
  AccessParams,
  CX1MetaDataResponse,
  AccessKeyResponse,
  AccessKeyAction
} from '../types';
import { Visibility, Permission } from '../constants';

/**
 * NetworkServiceV2 - NDEx API v2 network operations
 * Handles legacy v2 endpoints with modern TypeScript interface
 */
export class NetworkServiceV2 {
  constructor(private http: HTTPService) {}

  /**
   * Get raw network in CX1 format
   * 
   * Returns raw CX1 data as an array of aspects. This data may contain fragmented aspects
   * that need to be assembled into a complete CX1 network model for proper usage.
   * For a fully assembled network object, consider using getNetworkAsCX2Object() instead.
   * 
   * @param networkUUID - The UUID of the network to retrieve
   * @param options - Access options including optional access key
   * @returns Promise resolving to raw CX1 data as an array of aspects
   */
  async getRawCX1Network(
    networkUUID: string, 
    options: AccessParams = {}
  ): Promise<any[]> {
    const params = new URLSearchParams();
    if (options.accesskey) {
      params.append('accesskey', options.accesskey);
    }

    const endpoint = `network/${networkUUID}${params.toString() ? `?${params.toString()}` : ''}`;
    return this.http.get<any[]>(endpoint, { 
      version: 'v2',
      headers: { 'Accept': 'application/json' }
    });
  }

  /**
   * Get network summary by UUID
   */
  async getNetworkSummary(
    networkUUID: string, 
    options: AccessParams = {}
  ): Promise<NetworkSummaryV2> {
    const params = new URLSearchParams();
    if (options.accesskey) {
      params.append('accesskey', options.accesskey);
    }

    const endpoint = `network/${networkUUID}/summary${params.toString() ? `?${params.toString()}` : ''}`;
    return this.http.get<NetworkSummaryV2>(endpoint, { version: 'v2' });
  }

   /**
   * Copy network
   * 
   * Creates a copy of an existing network using the server's copy endpoint.
   * The copied network will have the same content but will be assigned a new UUID
   * and will be owned by the authenticated user.
   * 
   * @param networkUUID - The UUID of the network to copy
   * @returns Promise resolving to the URL of the cloned CX1 network
   */
  async copyNetwork(networkUUID: string): Promise<string> {
    const endpoint = `network/${networkUUID}/copy`;
    return this.http.post<string>(endpoint, {}, { 
      version: 'v2'
    });
  }


  /**
   * Search networks (migrated from original NDEx.js)
   * 
   * Searches networks using POST request with search parameters in the request body.
   * This implementation matches the original NDEx.js searchNetworks function.
   * 
   * @param searchTerms - Search string to find networks
   * @param start - Starting offset for pagination (optional)
   * @param size - Maximum number of results to return (optional)
   * @param optionalParameters - Additional search filters
   * @param optionalParameters.permission - Filter by permission level
   * @param optionalParameters.includeGroups - Whether to include group networks
   * @param optionalParameters.accountName - Filter by account name
   * @returns Promise resolving to search results
   */
  async searchNetworks(
    searchTerms: string,
    start?: number,
    size?: number,
    optionalParameters?: {
      permission?: string;
      includeGroups?: boolean;
      accountName?: string;
    }
  ): Promise<any> {
    const params: Record<string, string> = {};

    if (start !== undefined) {
      params['start'] = start.toString();
    }
    if (size !== undefined) {
      params['limit'] = size.toString();
    }

    const data: Record<string, any> = { searchString: searchTerms };

    if (optionalParameters !== undefined) {
      if (optionalParameters.permission !== undefined) {
        data['permission'] = optionalParameters['permission'];
      }
      if (optionalParameters['includeGroups'] !== undefined) {
        data['includeGroups'] = optionalParameters['includeGroups'];
      }
      if (optionalParameters['accountName'] !== undefined) {
        data['accountName'] = optionalParameters['accountName'];
      }
    }

    const endpoint = 'search/network';
    return this.http.post<any>(endpoint, data, { 
      version: 'v2',
      params 
    });
  }

 

  /**
   * Create new network from raw CX1 data
   * 
   * Creates a new network in NDEx from raw CX1 network data. This method handles
   * the server response parsing to extract the network UUID from the location header.
   * 
   * @param rawCX - Raw CX1 network data as an array of aspects
   * @param options - Optional options for network creation (visibility settings)
   * @returns Promise resolving to the UUID string of the newly created network
   */
  async createNetworkFromRawCX1(
    rawCX: any[],
    options: { visibility?: Visibility } = {}
  ): Promise<string> {
    const endpoint = 'network';
    const response = await this.http.post<string>(endpoint, rawCX, { 
      version: 'v2',
      params: options
    });

    // Extract UUID from response URL (e.g., "/v2/network/12345" -> "12345")
    const uuidr = response.split('/');
    const uuid = uuidr[uuidr.length - 1];

    if (!uuid) {
      throw new Error('Failed to extract UUID from response');
    }

    return uuid;
  }


  /**
   * Update network from raw CX1 data
   * 
   * Updates an existing network in NDEx with new raw CX1 network data.
   * This completely replaces the network content with the provided CX1 data.
   * Uses the legacy v2 endpoint format from the original NDEx.js implementation.
   * 
   * @param networkUUID - The UUID of the network to update
   * @param rawCX - Raw CX1 network data as an array of aspects
   * @returns Promise resolving when the update is complete
   */
  async updateNetworkFromRawCX1(
    networkUUID: string,
    rawCX: any[]
  ): Promise<void> {
    const endpoint = `network/${networkUUID}`;
    return this.http.put<void>(endpoint, rawCX, { version: 'v2' });
  }

  /**
   * Delete network
   */
  async deleteNetwork(networkUUID: string): Promise<void> {
    const endpoint = `network/${networkUUID}`;
    return this.http.delete<void>(endpoint, { version: 'v2' });
  }

  /**
   * Get network summaries by UUIDs (migrated from original NDEx.js)
   * 
   * Retrieves network summaries for multiple networks in a single batch request.
   * Uses the V2 API batch endpoint for efficient bulk operations.
   * 
   * @param uuidList - Array of network UUIDs to retrieve summaries for
   * @param accessKey - Optional access key for private networks
   * @returns Promise resolving to array of network summaries
   */
  async getNetworkSummariesByUUIDs(
    uuidList: string[], 
    accessKey?: string
  ): Promise<NetworkSummaryV2[]> {
    const params = accessKey ? { accesskey: accessKey } : undefined;

    const endpoint = 'batch/network/summary';
    return this.http.post<NetworkSummaryV2[]>(endpoint, uuidList, { 
      version: 'v2',
      params 
    });
  }

// The following functions need to be either reviewed or removed.


 /**
   * Get user's networks
   */
  async getUserNetworks(
    accountName: string, 
    options: PaginationParams = {}
  ): Promise<NetworkSummaryV2[]> {
    const params = new URLSearchParams();
    if (options.start !== undefined) {
      params.append('start', options.start.toString());
    }
    if (options.size !== undefined) {
      params.append('size', options.size.toString());
    }

    const endpoint = `user/${accountName}/networks${params.toString() ? `?${params.toString()}` : ''}`;
    return this.http.get<NetworkSummaryV2[]>(endpoint, { version: 'v2' });
  }


  /**
   * Set network system properties
   */
  async setNetworkSystemProperties(
    networkUUID: string, 
    properties: Record<string, any>
  ): Promise<void> {
    const endpoint = `networks/${networkUUID}/systemproperty`;
    return this.http.put<void>(endpoint, properties, { version: 'v2' });
  }

  /**
   * Get network permissions
   */
  async getNetworkPermissions(networkUUID: string): Promise<NetworkPermission[]> {
    const endpoint = `networks/${networkUUID}/permission`;
    return this.http.get<NetworkPermission[]>(endpoint, { version: 'v2' });
  }

  /**
   * Set network permissions
   */
  async setNetworkPermissions(
    networkUUID: string, 
    permissions: NetworkPermission[]
  ): Promise<void> {
    const endpoint = `networks/${networkUUID}/permission`;
    return this.http.put<void>(endpoint, permissions, { version: 'v2' });
  }

  /**
   * Grant network permission to user
   */
  async grantNetworkPermission(
    networkUUID: string, 
    userUUID: string, 
    permission: Permission
  ): Promise<void> {
    const endpoint = `networks/${networkUUID}/permission`;
    const permissionData = {
      memberUUID: userUUID,
      permission: permission
    };
    return this.http.post<void>(endpoint, permissionData, { version: 'v2' });
  }

  /**
   * Revoke network permission from user
   */
  async revokeNetworkPermission(
    networkUUID: string, 
    userUUID: string
  ): Promise<void> {
    const endpoint = `networks/${networkUUID}/permission`;
    return this.http.delete<void>(endpoint, { 
      version: 'v2',
      data: { memberUUID: userUUID }
    });
  }

  /**
   * Get network profile (additional metadata)
   */
  async getNetworkProfile(networkUUID: string): Promise<any> {
    const endpoint = `networks/${networkUUID}/profile`;
    return this.http.get<any>(endpoint, { version: 'v2' });
  }

  /**
   * Set network profile
   */
  async setNetworkProfile(
    networkUUID: string, 
    profile: any
  ): Promise<void> {
    const endpoint = `networks/${networkUUID}/profile`;
    return this.http.put<void>(endpoint, profile, { version: 'v2' });
  }

  /**
   * Make network public
   */
  async makeNetworkPublic(networkUUID: string): Promise<void> {
    const endpoint = `networks/${networkUUID}/systemproperty`;
    const properties = { visibility: 'PUBLIC' as Visibility };
    return this.http.put<void>(endpoint, properties, { version: 'v2' });
  }

  /**
   * Make network private
   */
  async makeNetworkPrivate(networkUUID: string): Promise<void> {
    const endpoint = `networks/${networkUUID}/systemproperty`;
    const properties = { visibility: 'PRIVATE' as Visibility };
    return this.http.put<void>(endpoint, properties, { version: 'v2' });
  }

  /**
   * Get network sample (if available)
   */
  async getNetworkSample(
    networkUUID: string, 
    options: AccessParams = {}
  ): Promise<any[]> {
    const params = new URLSearchParams();
    if (options.accesskey) {
      params.append('accesskey', options.accesskey);
    }

    const endpoint = `networks/${networkUUID}/sample${params.toString() ? `?${params.toString()}` : ''}`;
    return this.http.get<any[]>(endpoint, { version: 'v2' });
  }

  /**
   * Get network metadata (migrated from original NDEx.js)
   * 
   * Retrieves metadata information about network aspects including element counts,
   * versions, and ID counters for each aspect in the network. This provides
   * an overview of the network's structure and content organization.
   * 
   * @param networkUUID - The UUID of the network to get metadata for
   * @param accessKey - Optional access key for private networks
   * @returns Promise resolving to metadata containing aspect information
   * @example
   * ```typescript
   * const metadata = await networkService.getMetaData('network-uuid');
   * // Returns: { metaData: [{ name: 'nodes', elementCount: 330, version: '1.0' }, ...] }
   * ```
   */
  async getMetaData(
    networkUUID: string, 
    accessKey?: string
  ): Promise<CX1MetaDataResponse> {
    const params = new URLSearchParams();
    if (accessKey !== undefined) {
      params.append('accesskey', accessKey);
    }

    const endpoint = `network/${networkUUID}/aspect${params.toString() ? `?${params.toString()}` : ''}`;
    return this.http.get<CX1MetaDataResponse>(endpoint, { version: 'v2' });
  }

  /**
   * Get network access key (migrated from original NDEx.js)
   * 
   * Retrieves the current access key for a network. Access keys allow
   * users to share private networks without requiring individual permissions.
   * 
   * @param networkUUID - The UUID of the network to get access key for
   * @returns Promise resolving to access key response object
   * 
   * @example
   * ```typescript
   * const response = await networkService.getAccessKey('network-uuid');
   * console.log(response.accessKey); // "acialdfeoa03430023" or null
   * ```
   */
  async getAccessKey(networkUUID: string): Promise<AccessKeyResponse> {
    const endpoint = `networks/${networkUUID}/accesskey`;
    return this.http.get<AccessKeyResponse>(endpoint, { version: 'v2' });
  }

  /**
   * Update network access key (migrated from original NDEx.js)
   * 
   * Enables or disables the access key for a network. When enabled, creates
   * a new access key that can be shared. When disabled, invalidates the
   * current access key.
   * 
   * @param networkUUID - The UUID of the network to update access key for
   * @param action - Action to perform: 'enable' creates/updates key, 'disable' removes it
   * @returns Promise resolving to access key response (accessKey will be null when disabled)
   * 
   * @example
   * ```typescript
   * // Enable access key
   * const enabled = await networkService.updateAccessKey('network-uuid', 'enable');
   * console.log(enabled.accessKey); // "new-access-key-string"
   * 
   * // Disable access key  
   * const disabled = await networkService.updateAccessKey('network-uuid', 'disable');
   * console.log(disabled.accessKey); // null
   * ```
   */
  async updateAccessKey(networkUUID: string, action: AccessKeyAction): Promise<AccessKeyResponse> {
    const endpoint = `networks/${networkUUID}/accesskey`;
    return this.http.put<AccessKeyResponse>(endpoint, { action }, { version: 'v2' });
  }

}
