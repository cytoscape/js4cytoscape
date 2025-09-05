import { HTTPService } from './HTTPService';
import { NetworkServiceV2 } from './NetworkServiceV2';
import { NetworkServiceV3 } from './NetworkServiceV3';
import { 
  NetworkSummaryV3,
  PaginationParams,
  AccessParams,
  CX2Network as CX2NetworkType,
  CX2Edge,
  CX1Edge,
  CX2MetaData,
  NetworkPermission,
  NDExObjectUpdateStatus
} from '../types';
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
   * Get network summary using specified API version
   */
  async getNetworkSummary(
    networkUUID: string, 
    options: AccessParams = {}
  ): Promise<NetworkSummaryV3> {
    return this.v3Service.getNetworkSummary(networkUUID, options);
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
   */
  async deleteNetwork(networkUUID: string): Promise<void> {
    return this.v2Service.deleteNetwork(networkUUID);
  }


  /**
   * Create network DOI
   * 
   * @param networkUUID - The UUID of the network to create a DOI for
   * @param key - DOI creation key
   * @param email - Email address for DOI registration
   * @returns Promise resolving to a confirmation message string from the server
   */
  async createNetworkDOI(
    networkUUID: string, 
    key: string, 
    email: string
  ): Promise<string> {
    return this.v3Service.createNetworkDOI(networkUUID, key, email);
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
      params.save = 'true';
    }

    const data: Record<string, any> = {
      searchString: searchTerms,
      searchDepth: 1
    };

    if (parameters !== undefined) {
      if (parameters.searchDepth !== undefined) {
        data.searchDepth = parameters.searchDepth;
      }
      if (parameters.edgeLimit !== undefined) {
        data.edgeLimit = parameters.edgeLimit;
      }
      if (parameters.errorWhenLimitIsOver !== undefined) {
        data.errorWhenLimitIsOver = parameters.errorWhenLimitIsOver;
      }
      if (parameters.directOnly !== undefined) {
        data.directOnly = parameters.directOnly;
      }
      if (parameters.nodeIds != null) {
        data.nodeIds = parameters.nodeIds;
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
      params.save = 'true';
    }

    const data: Record<string, any> = { searchString: searchTerms };

    if (parameters !== undefined) {
      if (parameters.edgeLimit !== undefined) {
        data.edgeLimit = parameters.edgeLimit;
      }
      if (parameters.errorWhenLimitIsOver !== undefined) {
        data.errorWhenLimitIsOver = parameters.errorWhenLimitIsOver;
      }
      if (parameters.nodeIds != null) {
        data.nodeIds = parameters.nodeIds;
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
   * Set networks visibility (migrated from original NDEx.js)
   * 
   * Changes visibility settings for multiple networks using the V3 API.
   * Requires proper file validation to ensure data integrity.
   * 
   * @param files - Object containing files with their types (must have 'files' property)
   * @param visibility - Visibility setting (e.g., 'PUBLIC', 'PRIVATE')
   * @returns Promise resolving when visibility is updated
   */
  async setNetworksVisibility(
    files: { files: Record<string, 'NETWORK' | 'FOLDER' | 'SHORTCUT'> },
    visibility: string
  ): Promise<any> {
    this.validateShareData(files);

    const endpoint = 'batch/networks/visibility';
    const data = {
      items: files,
      visibility: visibility
    };

    return this.http.post<any>(endpoint, data, { version: 'v3' });
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
      params.accesskey = accessKey;
    }

    const endpoint = `networks/${networkUUID}/aspects/edges`;
    return this.http.get<CX2Edge[]>(endpoint, { 
      version: 'v3',
      params 
    });
  }

  /**
   * Validate share data format (helper method for file operations)
   * 
   * Validates the structure and content of file data used in sharing operations.
   * Ensures proper UUID format and valid file types.
   * 
   * @param data - Data object to validate (must contain 'files' property)
   * @throws Error if validation fails
   */
  private validateShareData(data: any): void {
    // Check if data is an object and has files property
    if (typeof data !== 'object' || data === null || data.files === undefined) {
      throw new Error('Data must be an object with a "files" property');
    }
    
    // Check if files is an object
    if (typeof data.files !== 'object' || data.files === null) {
      throw new Error('The "files" property must be an object');
    }
    
    // Check each key-value pair in files
    const validValues = ['NETWORK', 'FOLDER', 'SHORTCUT'];
    
    for (const [uuid, fileType] of Object.entries(data.files)) {
      // Validate UUID format (basic validation)
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid)) {
        throw new Error(`Invalid UUID format: ${uuid}`);
      }
      
      // Validate file type
      if (!validValues.includes(fileType as string)) {
        throw new Error(`Invalid file type for ${uuid}: ${fileType}. Must be one of: ${validValues.join(', ')}`);
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
      params.size = limit.toString();
    }

    if (accessKey !== undefined) {
      params.accesskey = accessKey;
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
      params.size = limit.toString();
    }

    if (order !== undefined) {
      params.order = order;
    }

    if (accessKey !== undefined) {
      params.accesskey = accessKey;
    }

    if (format !== undefined) {
      params.format = format;
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
      params.accesskey = accessKey;
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
   * @param options.visibility - Network visibility: 'PUBLIC' or 'PRIVATE' (default: 'PRIVATE')
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
   *   visibility: 'PUBLIC', 
   *   folderId: '87654321-4321-4321-4321-876543210fed'
   * });
   * console.log(publicResult.uuid);
   * ```
   */
  async createNetworkFromRawCX2(
    cx2Data: CX2NetworkType | CX2Network,
    options: { visibility?: 'PUBLIC' | 'PRIVATE'; folderId?: string } = {}
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
   * Access to underlying service instances for advanced usage
   */
  get v2(): NetworkServiceV2 {
    return this.v2Service;
  }

  get v3(): NetworkServiceV3 {
    return this.v3Service;
  }
}
