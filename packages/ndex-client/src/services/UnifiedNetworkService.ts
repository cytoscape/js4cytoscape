import { HTTPService } from './HTTPService';
import { NetworkServiceV2 } from './NetworkServiceV2';
import { NetworkServiceV3 } from './NetworkServiceV3';
import {
  NetworkSummaryV3,
  NetworkSummaryV2,
  CX1NetworkProperty,
  AccessParams,
  CX2Network as CX2NetworkType,
  CX2Edge,
  CX1Edge,
  CX2MetaData,
  NDExObjectUpdateStatus
} from '../types';
import { Visibility, NDExFileType } from '../constants';
import { CX2Network } from '../models/CX2Network';

/**
 * UnifiedNetworkService - Provides access to both V2/V3 network services
 * Allows individual function calls to choose between v2 and v3 APIs
 */
export class UnifiedNetworkService {
  private v2Service: NetworkServiceV2;
  private v3Service: NetworkServiceV3;

  constructor(private http: HTTPService) {
    this.v2Service = new NetworkServiceV2(http);
    this.v3Service = new NetworkServiceV3(http);
  }

  /**
   * Get network summary using V3 API
   *
   * Retrieves comprehensive summary information for a network including metadata,
   * statistics, permissions, and other network properties using the V3 API.
   *
   * @param networkUUID - The UUID of the network to get summary for
   * @param options - Access options including optional access key for private networks
   * @returns Promise resolving to NetworkSummaryV3 object containing network summary information
   */
  async getNetworkSummary(
    networkUUID: string,
    options: AccessParams = {}
  ): Promise<NetworkSummaryV3> {
    return this.v3Service.getNetworkSummary(networkUUID, options);
  }

  /**
   * Update network summary using V3 to V2 transformation
   *
   * Updates network summary information by accepting a NetworkSummaryV3 object,
   * transforming it to the V2 format, and calling the V2 API endpoint.
   * This provides a unified interface for updating network summaries while
   * maintaining compatibility with the existing V2 backend infrastructure.
   *
   * @param networkUUID - The UUID of the network to update
   * @param networkSummaryV3 - The updated network summary in V3 format
   * @returns Promise that resolves when the update is complete
   *
   * @example
   * ```typescript
   * // Update network summary using V3 format
   * const summaryV3: NetworkSummaryV3 = {
   *   externalId: '12345678-1234-1234-1234-123456789abc',
   *   name: 'Updated Network Name',
   *   description: 'Updated network description',
   *   nodeCount: 150,
   *   edgeCount: 200,
   *   visibility: 'PUBLIC',
   *   owner: 'username',
   *   ownerUUID: 'user-uuid',
   *   creationTime: 1234567890,
   *   modificationTime: 1234567890,
   *   isReadOnly: false,
   *   isValid: true,
   *   hasLayout: true,
   *   hasSample: false,
   *   updatedBy: 'username',
   *   properties: {
   *     category: { t: 'string', v: 'biological' },
   *     version: { t: 'double', v: 2.1 }
   *   }
   * };
   *
   * await client.networks.updateNetworkSummary('network-uuid', summaryV3);
   * ```
   */
  async updateNetworkSummary(
    networkUUID: string,
    networkSummaryV3: NetworkSummaryV3
  ): Promise<void> {
    // Transform V3 to V2 format
    const networkSummaryV2: NetworkSummaryV2 = this.transformV3ToV2(networkSummaryV3);

    // Delegate to V2 service
    return (this.v2Service as any).updateNetworkSummary(networkUUID, networkSummaryV2);
  }

  /**
   * Transform NetworkSummaryV3 to NetworkSummaryV2 format
   *
   * Converts V3 properties format (CX2-style object map) to V2 properties format (CX1-style array).
   * This transformation is necessary because the V2 API expects properties in the older array format.
   * Special handling for "version" attribute - moved to top-level version field.
   *
   * @param v3Summary - Network summary in V3 format with CX2-style properties
   * @returns Network summary in V2 format with CX1-style properties
   */
  private transformV3ToV2(v3Summary: NetworkSummaryV3): NetworkSummaryV2 {
    const { properties, ...baseProperties } = v3Summary;

    let topLevelVersion: string | undefined;
    const v1Properties: CX1NetworkProperty[] = [];

    if (properties) {
      for (const [key, value] of Object.entries(properties)) {
        if (key === 'version') {
          // Move version to top-level version attribute
          topLevelVersion = this.convertValueToString(value.v);
        } else {
          // Transform other properties to CX1 format
          v1Properties.push({
            predicateString: key,
            value: this.convertValueToString(value.v),
            dataType: value.t
          });
        }
      }
    }

    const result: NetworkSummaryV2 = {
      ...baseProperties,
      properties: v1Properties
    };

    // Only set version if it exists to avoid undefined assignment
    if (topLevelVersion !== undefined) {
      result.version = topLevelVersion;
    }

    return result;
  }

  /**
   * Convert CX2 property values to strings
   *
   * For singleton values, converts to string directly.
   * For list type values, converts each element to string.
   *
   * @param value - The CX2 property value (can be any type or array)
   * @returns String representation of the value
   */
  private convertValueToString(value: any): string {
    if (Array.isArray(value)) {
      // For list types, convert each element to string
      return value.map(item => String(item)).join(',');
    }
    // For singleton values, convert to string
    return String(value);
  }


  /**
   * Search networks using specified API version
   * NOTE: This method is temporarily commented out as the V2 searchNetworks 
   * signature has been migrated from NDEx.js and needs separate integration
   */
  // async searchNetworks(
  //   searchParams: SearchParameters & { useV3?: boolean } = {}
  // ): Promise<SearchResult> {
  //   const { useV3, ...params } = searchParams;
  //   
  //   if (useV3) {
  //     return this.v3Service.searchNetworks(params);
  //   }
  //   
  //   return this.v2Service.searchNetworks(params);
  // }


  /**
   * Get network in CX1 format (V2 API)
   */
  async getRawCX1Network(
    networkUUID: string,
    options: AccessParams = {}
  ): Promise<any[]> {
    return this.v2Service.getRawCX1Network(networkUUID, options);
  }

  /**
   * Get network in CX2 format (V3 API)
   */
  async getRawCX2Network(
    networkUUID: string,
    options: AccessParams = {}
  ): Promise<CX2NetworkType> {
    return this.v3Service.getRawCX2Network(networkUUID, options);
  }

  
  
  /**
   * Delete network
   * @param networkUUID - The UUID of the network to delete
   * @param permanent - If true, permanently delete the network. If false (default), soft delete to trash for 30 days
   */
  async deleteNetwork(networkUUID: string, permanent: boolean = false): Promise<void> {
    return this.v3Service.deleteNetwork(networkUUID, permanent);
  }


  /**
   * Create network DOI
   *
   * Requests a DOI (Digital Object Identifier) for a network. A reference is not required to request a DOI.
   * If you want the ability to add or modify a reference later on, set `isCertified` to true.
   * When certified, the network will be permanently locked, made publicly visible, and no further changes
   * will be allowed.
   *
   * @param params - DOI request parameters
   * @param params.networkId - UUID of the network to create a DOI for
   * @param params.isCertified - If true, network will be permanently locked and made public with no further changes allowed
   * @param params.contactEmail - Email address that the DOI creation confirmation should be sent to
   * @returns Promise that resolves when the DOI request is submitted
   *
   * @example
   * ```typescript
   * // Request a DOI for a network without certification
   * await client.networks.createNetworkDOI({
   *   networkId: '12345678-1234-1234-1234-123456789abc',
   *   isCertified: false,
   *   contactEmail: 'user@example.com'
   * });
   *
   * // Request a certified DOI (network will be permanently locked)
   * await client.networks.createNetworkDOI({
   *   networkId: '12345678-1234-1234-1234-123456789abc',
   *   isCertified: true,
   *   contactEmail: 'user@example.com'
   * });
   * ```
   */
  async createNetworkDOI(params: {
    networkId: string;
    isCertified: boolean;
    contactEmail: string;
  }): Promise<void> {
    const endpoint = 'admin/request';
    const payload = {
      type: 'DOI',
      networkId: params.networkId,
      properties: {
        contactEmail: params.contactEmail
      },
      isCertified: params.isCertified
    };

    return this.http.post<void>(endpoint, payload, { version: 'v2' });
  }

  /**
   * Get attributes of selected nodes
   * 
   * Retrieves specific attributes for a set of nodes in a network. The server will return
   * a 404 error if the network has no attributes on nodes.
   * 
   * @param networkUUID - The UUID of the network
   * @param nodeSelection - Object containing node IDs and attribute names to retrieve
   * @param nodeSelection.ids - Array of node IDs (long numbers) to get attributes for
   * @param nodeSelection.attributeNames - Array of attribute names to retrieve
   * @param options - Access options including optional access key
   * @returns Promise resolving to a JSON object where keys are stringified node IDs
   *          and values are the selected attributes for that node
   * @throws {404} When the network has no attributes on nodes
   */
  async getAttributesOfSelectedNodes(
    networkUUID: string,
    nodeSelection: { ids: number[]; attributeNames: string[] },
    options: AccessParams = {}
  ): Promise<Record<string, any>> {
    return this.v3Service.getAttributesOfSelectedNodes(networkUUID, nodeSelection, options);
  }

  /**
   * Neighborhood query (migrated from original NDEx.js)
   * 
   * Performs a neighborhood search within a network, returning nodes and edges
   * within the specified search depth from nodes matching the search terms.
   * Can return either raw CX1 or CX2 format based on outputCX2 parameter.
   * 
   * @param networkUUID - The UUID of the network to search
   * @param searchTerms - Search string to find starting nodes
   * @param saveResult - Whether to save the query result as a new network
   * @param parameters - Additional query parameters
   * @param parameters.searchDepth - How many hops to search (default: 1)
   * @param parameters.edgeLimit - Maximum number of edges to return
   * @param parameters.errorWhenLimitIsOver - Throw error if edge limit exceeded
   * @param parameters.directOnly - Only include direct connections
   * @param parameters.nodeIds - Specific node IDs to start search from
   * @param outputCX2 - If true, return CX2 format via V3 API; if false, return CX1 format via V2 API
   * @returns Promise resolving to raw CX1 or CX2 network data
   */
  async neighborhoodQuery(
    networkUUID: string,
    searchTerms: string,
    saveResult?: boolean,
    parameters?: {
      searchDepth?: number;
      edgeLimit?: number;
      errorWhenLimitIsOver?: boolean;
      directOnly?: boolean;
      nodeIds?: number[];
    },
    outputCX2: boolean = false
  ): Promise<any[] | CX2NetworkType> {
    const params: Record<string, string> = {};

    if (saveResult !== undefined && saveResult === true) {
      params['save'] = 'true';
    }

    const data: Record<string, any> = {
      searchString: searchTerms,
      searchDepth: 1
    };

    if (parameters !== undefined) {
      if (parameters.searchDepth !== undefined) {
        data['searchDepth'] = parameters.searchDepth;
      }
      if (parameters.edgeLimit !== undefined) {
        data['edgeLimit'] = parameters.edgeLimit;
      }
      if (parameters.errorWhenLimitIsOver !== undefined) {
        data['errorWhenLimitIsOver'] = parameters.errorWhenLimitIsOver;
      }
      if (parameters.directOnly !== undefined) {
        data['directOnly'] = parameters.directOnly;
      }
      if (parameters.nodeIds != null) {
        data['nodeIds'] = parameters.nodeIds;
      }
    }

    if (outputCX2) {
      const endpoint = `search/network/${networkUUID}/query`;
      return this.http.post<CX2NetworkType>(endpoint, data, { 
        version: 'v3',
        params 
      });
    }

    const endpoint = `search/network/${networkUUID}/query`;
    return this.http.post<any[]>(endpoint, data, { 
      version: 'v2',
      params 
    });
  }

  /**
   * Interconnect query (migrated from original NDEx.js)
   * 
   * Finds connections between nodes matching the search terms within a network.
   * Returns the interconnected subnetwork as either raw CX1 or CX2 format.
   * Can return either raw CX1 or CX2 format based on outputCX2 parameter.
   * 
   * @param networkUUID - The UUID of the network to search
   * @param searchTerms - Search string to find nodes to interconnect
   * @param saveResult - Whether to save the query result as a new network
   * @param parameters - Additional query parameters
   * @param parameters.edgeLimit - Maximum number of edges to return
   * @param parameters.errorWhenLimitIsOver - Throw error if edge limit exceeded
   * @param parameters.nodeIds - Specific node IDs to find connections between
   * @param outputCX2 - If true, return CX2 format via V3 API; if false, return CX1 format via V2 API
   * @returns Promise resolving to raw CX1 or CX2 network data
   */
  async interConnectQuery(
    networkUUID: string,
    searchTerms: string,
    saveResult?: boolean,
    parameters?: {
      edgeLimit?: number;
      errorWhenLimitIsOver?: boolean;
      nodeIds?: number[];
    },
    outputCX2: boolean = false
  ): Promise<any[] | CX2NetworkType> {
    const params: Record<string, string> = {};

    if (saveResult !== undefined && saveResult === true) {
      params['save'] = 'true';
    }

    const data: Record<string, any> = { searchString: searchTerms };

    if (parameters !== undefined) {
      if (parameters.edgeLimit !== undefined) {
        data['edgeLimit'] = parameters.edgeLimit;
      }
      if (parameters.errorWhenLimitIsOver !== undefined) {
        data['errorWhenLimitIsOver'] = parameters.errorWhenLimitIsOver;
      }
      if (parameters.nodeIds != null) {
        data['nodeIds'] = parameters.nodeIds;
      }
    }

    if (outputCX2) {
      const endpoint = `search/networks/${networkUUID}/interconnectquery`;
      return this.http.post<CX2NetworkType>(endpoint, data, { 
        version: 'v3',
        params 
      });
    }

    const endpoint = `search/network/${networkUUID}/interconnectquery`;
    return this.http.post<any[]>(endpoint, data, { 
      version: 'v2',
      params 
    });
  }

  /**
   * Get network permissions by UUIDs (migrated from original NDEx.js)
   * 
   * Retrieves network permissions for multiple networks in a single batch request.
   * Uses the V2 API batch endpoint to efficiently get permission information.
   * 
   * @param uuidList - Array of network UUIDs to retrieve permissions for
   * @returns Promise resolving to permission information for the specified networks
   */
  async getNetworkPermissionsByUUIDs(uuidList: string[]): Promise<any[]> {
    const endpoint = 'batch/network/permission';
    return this.http.post<any[]>(endpoint, uuidList, { version: 'v2' });
  }

  /**
   * Export networks (migrated from original NDEx.js)
   * 
   * Creates an export job for networks using the V2 batch export endpoint.
   * This allows exporting multiple networks in various formats.
   * 
   * @param exportJob - Export job configuration specifying networks and format
   * @returns Promise resolving to export job result
   */
  async exportNetworks(exportJob: any): Promise<any> {
    const endpoint = 'batch/network/export';
    return this.http.post<any>(endpoint, exportJob, { version: 'v2' });
  }

  /**
   * Move networks to folder (migrated from original NDEx.js)
   * 
   * Moves multiple networks to a specified folder using the V3 API.
   * This is a V3-specific feature for organizing networks in folders.
   * 
   * @param networkIds - Array of network IDs to move
   * @param folderId - Target folder ID to move networks to
   * @returns Promise resolving when networks are moved
   */
  async moveNetworks(networkIds: string[], folderId: string): Promise<any> {
    if (!Array.isArray(networkIds)) {
      throw new Error('Invalid networkIds - must be an array');
    }

    const endpoint = 'batch/networks/move';
    const data = {
      targetFolder: folderId,
      networks: networkIds
    };

    return this.http.post<any>(endpoint, data, { version: 'v3' });
  }

  /**
   * Set visibility for multiple files (networks, folders, shortcuts)
   * 
   * Changes visibility settings for multiple NDEx objects using the V3 API.
   * This function can update visibility for any combination of networks, folders, and shortcuts.
   * Files are validated to ensure proper UUID format and valid file types.
   * 
   * @param files - Object containing a 'files' property with UUID-to-filetype mappings
   * @param files.files - Record where keys are UUIDs and values are NDExFileType ('NETWORK', 'FOLDER', or 'SHORTCUT')
   * @param visibility - Visibility setting: 'PUBLIC', 'PRIVATE', or 'UNLISTED'
   * @returns Promise resolving when visibility is successfully updated
   * @throws Error if files validation fails or API request fails
   * 
   * @example
   * ```typescript
   * // Set multiple files to public visibility
   * await client.networks.setNetworksVisibility({
   *   files: {
   *     '12345678-1234-1234-1234-123456789abc': 'NETWORK',
   *     '87654321-4321-4321-4321-876543210fed': 'FOLDER',
   *     '11111111-2222-3333-4444-555555555555': 'SHORTCUT'
   *   }
   * }, 'PUBLIC');
   * 
   * // Set networks to private visibility
   * await client.networks.setNetworksVisibility({
   *   files: {
   *     'network-uuid-1': 'NETWORK',
   *     'network-uuid-2': 'NETWORK'
   *   }
   * }, 'PRIVATE');
   * ```
   */
  async setNetworksVisibility(
    files: { files: Record<string, NDExFileType> },
    visibility: Visibility
  ): Promise<any> {
    this.validateShareData(files);

    const endpoint = 'batch/files/setvisibility';
    const data = {
      files: files,
      visibility: visibility
    };

    return this.http.post<any>(endpoint, data, { version: 'v3' });
  }

  /**
   * Get network access key
   *
   * Retrieves the access key for a network if it has been enabled for public access.
   * When a network has an access key enabled, it can be accessed by others without
   * explicit permissions using this key.
   *
   * @param networkUUID - The UUID of the network to get the access key for
   * @returns Promise resolving to an object with accessKey property when enabled,
   *          or null when access key is not enabled on this network
   *
   * @example
   * ```typescript
   * // Check if network has an access key
   * const result = await client.networks.getNetworkAccessKey('12345678-1234-1234-1234-123456789abc');
   *
   * if (result) {
   *   console.log('Access key:', result.accessKey); // "sdfdfdfsdfdsfs"
   *   // Use the access key to access the network
   *   const networkData = await client.networks.getRawCX2Network(networkUUID, { accessKey: result.accessKey });
   * } else {
   *   console.log('No access key enabled for this network');
   * }
   * ```
   */
  async getNetworkAccessKey(networkUUID: string): Promise<{ accessKey: string } | null> {
    const endpoint = `network/${networkUUID}/accesskey`;
    return this.http.get<{ accessKey: string } | null>(endpoint, { version: 'v2' });
  }

  /**
   * Get random edges from network (migrated from original NDEx.js)
   * 
   * Retrieves a random sample of edges from a network using the V3 API.
   * This is useful for previewing large networks or sampling edge data.
   * 
   * @param networkUUID - The UUID of the network to get edges from
   * @param limit - Number of random edges to retrieve (must be greater than 0)
   * @param accessKey - Optional access key for private networks
   * @returns Promise resolving to array of CX2Edge objects
   * @throws Error if limit is less than or equal to 0
   */
  async getRandomEdges(
    networkUUID: string, 
    limit: number, 
    accessKey?: string
  ): Promise<CX2Edge[]> {
    if (limit <= 0) {
      throw new Error("Value of parameter limit has to be greater than 0.");
    }

    const params: Record<string, string> = {
      size: limit.toString(),
      method: "random"
    };

    if (accessKey !== undefined) {
      params['accesskey'] = accessKey;
    }

    const endpoint = `networks/${networkUUID}/aspects/edges`;
    return this.http.get<CX2Edge[]>(endpoint, { 
      version: 'v3',
      params 
    });
  }

  /**
   * Validate UUID format in file data (helper method for file operations)
   * 
   * Validates that all UUID keys in the files object follow proper UUID format.
   * TypeScript ensures object structure and file type validity at compile time.
   * 
   * @param data - Data object containing files property with UUID keys and NDExFileType values
   * @throws Error if UUID validation fails
   */
  private validateShareData(data: { files: Record<string, NDExFileType> }): void {
    // Validate UUID format for each key
    for (const uuid of Object.keys(data.files)) {
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid)) {
        throw new Error(`Invalid UUID format: ${uuid}`);
      }
    }
  }

  /**
   * Get aspect elements (migrated from original NDEx.js)
   * 
   * Retrieves elements from a specific aspect of a network using the V3 API.
   * This function can be used to get nodes, edges, or other aspect data
   * with optional size limiting and access key support for private networks.
   * 
   * @param networkUUID - The UUID of the network to get aspect elements from
   * @param aspectName - Name of the aspect to retrieve (e.g., 'nodes', 'edges', 'networkAttributes')
   * @param limit - Optional maximum number of elements to return
   * @param accessKey - Optional access key for private networks
   * @returns Promise resolving to array of aspect elements
   * @example
   * ```typescript
   * // Get first 100 nodes from a network
   * const nodes = await client.networks.getAspectElements('network-uuid', 'nodes', 100);
   * 
   * // Get all edges from a network
   * const edges = await client.networks.getAspectElements('network-uuid', 'edges');
   * ```
   */
  async getAspectElements(
    networkUUID: string,
    aspectName: string,
    limit?: number,
    accessKey?: string
  ): Promise<any[]> {
    const params: Record<string, string> = {};

    if (limit !== undefined) {
      params['size'] = limit.toString();
    }

    if (accessKey !== undefined) {
      params['accesskey'] = accessKey;
    }

    const endpoint = `networks/${networkUUID}/aspects/${aspectName}`;
    return this.http.get<any[]>(endpoint, { 
      version: 'v3',
      params 
    });
  }

  /**
   * Get filtered edges (migrated from original NDEx.js)
   * 
   * Retrieves edges from a network that match specific filtering criteria on a column value.
   * The function supports both CX1 and CX2 formats based on the format parameter, with CX2 
   * being the default format used by the server.
   * 
   * @param networkUUID - The UUID of the network to get filtered edges from
   * @param columnName - Name of the edge attribute column to filter on
   * @param valueString - Value to filter by (converted to string for comparison)
   * @param operator - Filtering operation: '>' | '<' | '=' | '!='
   * @param limit - Optional maximum number of edges to return (default: -1 = all matching edges)
   * @param order - Optional sort order for edges before applying limit: 'asc' | 'desc' (default: 'desc')
   * @param format - Optional output format: 'cx' | 'cx2' (default: 'cx2')
   * @param accessKey - Optional access key for private networks
   * @returns Promise resolving to array of edges in the specified format
   * 
   * @example
   * ```typescript
   * // Get edges with weight > 0.5 in CX2 format (default)
   * const cx2Edges = await client.networks.getFilteredEdges(
   *   'network-uuid', 'weight', '0.5', '>'
   * );
   * 
   * // Get top 10 edges with highest score in CX1 format
   * const cx1Edges = await client.networks.getFilteredEdges(
   *   'network-uuid', 'score', '0', '>', 10, 'desc', 'cx'
   * );
   * 
   * // Get edges where interaction equals 'pp'
   * const ppEdges = await client.networks.getFilteredEdges(
   *   'network-uuid', 'interaction', 'pp', '=', undefined, undefined, 'cx2'
   * );
   * ```
   */
  async getFilteredEdges(
    networkUUID: string,
    columnName: string,
    valueString: string,
    operator: '>' | '<' | '=' | '!=',
    limit?: number,
    order?: 'asc' | 'desc',
    format?: 'cx' | 'cx2',
    accessKey?: string
  ): Promise<CX2Edge[] | CX1Edge[]> {
    const params: Record<string, string> = {};

    if (limit !== undefined) {
      params['size'] = limit.toString();
    }

    if (order !== undefined) {
      params['order'] = order;
    }

    if (accessKey !== undefined) {
      params['accesskey'] = accessKey;
    }

    if (format !== undefined) {
      params['format'] = format;
    }

    const data = {
      name: columnName,
      value: valueString,
      operator: operator
    };

    const endpoint = `search/networks/${networkUUID}/edges`;
    return this.http.post<CX2Edge[] | CX1Edge[]>(endpoint, data, { 
      version: 'v3',
      params 
    });
  }

  /**
   * Get CX2 metadata (migrated from original NDEx.js)
   * 
   * Retrieves metadata information for all aspects in a CX2 network format.
   * This function provides aspect metadata including element counts for each
   * aspect in the network using the V3 API.
   * 
   * @param networkUUID - The UUID of the network to get CX2 metadata for
   * @param accessKey - Optional access key for private networks
   * @returns Promise resolving to array of CX2MetaData objects
   * 
   * @example
   * ```typescript
   * // Get CX2 metadata for a network
   * const metaData = await client.networks.getCX2MetaData('network-uuid');
   * console.log(metaData); // [{ name: 'nodes', elementCount: 100 }, { name: 'edges', elementCount: 150 }]
   * 
   * // Get CX2 metadata for a private network
   * const privateMetaData = await client.networks.getCX2MetaData('private-network-uuid', 'access-key');
   * ```
   */
  async getCX2MetaData(
    networkUUID: string,
    accessKey?: string
  ): Promise<CX2MetaData[]> {
    const params: Record<string, string> = {};

    if (accessKey !== undefined) {
      params['accesskey'] = accessKey;
    }

    const endpoint = `networks/${networkUUID}/aspects`;
    return this.http.get<CX2MetaData[]>(endpoint, { 
      version: 'v3',
      params 
    });
  }

  /**
   * Create network from raw CX2 data (migrated from original NDEx.js)
   * 
   * Creates a new network on NDEx from raw CX2 data using the V3 API.
   * This function delegates to the NetworkServiceV3 implementation.
   * 
   * @param cx2Data - Raw CX2 network data as an object or CX2Network instance
   * @param options - Creation options including visibility and folderId
   * @param options.visibility - Network visibility: 'PUBLIC', 'PRIVATE', or 'UNLISTED' (default: 'PRIVATE')
   * @param options.folderId - UUID of the folder to create the network in. If omitted, network is created in user's home directory
   * @returns Promise resolving to NDExObjectUpdateStatus with uuid and modificationTime
   * 
   * @example
   * ```typescript
   * // Create private network from raw CX2 data in user's home directory
   * const result = await client.networks.createNetworkFromRawCX2(cx2Data);
   * console.log(result.uuid); // "12345678-1234-1234-1234-123456789abc"
   * 
   * // Create public network from raw CX2 data in a specific folder
   * const publicResult = await client.networks.createNetworkFromRawCX2(cx2Data, { 
   *   visibility: 'PUBLIC' as Visibility, 
   *   folderId: '87654321-4321-4321-4321-876543210fed'
   * });
   * console.log(publicResult.uuid);
   * ```
   */
  async createNetworkFromRawCX2(
    cx2Data: CX2NetworkType | CX2Network,
    options: { visibility?: Visibility; folderId?: string } = {}
  ): Promise<NDExObjectUpdateStatus> {
    return this.v3.createNetworkFromCX2(cx2Data, options);
  }

  /**
   * Update network from raw CX2 data (migrated from original NDEx.js)
   *
   * Updates an existing network with new raw CX2 data using the V3 API.
   * This function replaces the entire network content with the provided CX2 data.
   *
   * @param networkUUID - The UUID of the network to update
   * @param rawCX2 - Raw CX2 network data as an object or CX2Network instance
   * @returns Promise resolving when the network update is complete
   *
   * @example
   * ```typescript
   * // Update existing network with new CX2 data
   * await client.networks.updateNetworkFromRawCX2('network-uuid', updatedCx2Data);
   * ```
   */
  async updateNetworkFromRawCX2(
    networkUUID: string,
    rawCX2: CX2NetworkType | any
  ): Promise<void> {
    const endpoint = `networks/${networkUUID}`;
    return this.http.put<void>(endpoint, rawCX2, { version: 'v3' });
  }

  /**
   * Set read-only flag on a network
   *
   * Sets or unsets the read-only flag for a network using the V2 API.
   * When a network is marked as read-only, it cannot be modified.
   *
   * @param networkId - The UUID of the network to modify
   * @param readOnly - true to set the network as read-only, false to allow modifications
   * @returns Promise resolving when the read-only status is updated
   *
   * @example
   * ```typescript
   * // Set network as read-only
   * await client.networks.setReadOnly('network-uuid', true);
   *
   * // Allow network modifications
   * await client.networks.setReadOnly('network-uuid', false);
   * ```
   */
  async setReadOnly(networkId: string, readOnly: boolean): Promise<void> {
    const endpoint = `network/${networkId}/systemproperty`;
    return this.http.put<void>(endpoint, { readOnly }, { version: 'v2' });
  }

  /**
   * Access to underlying service instances for advanced usage
   */
  get v2(): NetworkServiceV2 {
    return this.v2Service;
  }

  get v3(): NetworkServiceV3 {
    return this.v3Service;
  }
}
