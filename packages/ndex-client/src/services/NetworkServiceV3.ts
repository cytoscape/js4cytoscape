import { HTTPService } from './HTTPService';
import { 
  NetworkSummaryV3, 
  SearchResult, 
  SearchParameters, 
  PaginationParams,
  AccessParams,
  CX2Network as CX2NetworkType,
  NDExObjectUpdateStatus
} from '../types';
import { Visibility } from '../constants';
import { CX2Network } from '../models/CX2Network';

/**
 * NetworkServiceV3 - NDEx API v3 network operations
 * Handles modern v3 endpoints with native CX2 support
 */
export class NetworkServiceV3 {
  constructor(private http: HTTPService) {}

  /**
   * Get network summary by UUID
   */
  async getNetworkSummary(
    networkUUID: string, 
    options: AccessParams = {}
  ): Promise<NetworkSummaryV3> {
    const params = new URLSearchParams();
    if (options.accesskey) {
      params.append('accesskey', options.accesskey);
    }

    const endpoint = `networks/${networkUUID}/summary${params.toString() ? `?${params.toString()}` : ''}`;
    return this.http.get<NetworkSummaryV3>(endpoint, { version: 'v3' });
  }


  /**
   * Get raw network in CX2 format (native V3)
   * 
   * Returns raw CX2 data which may contain fragmented aspects that need to be assembled
   * into a complete CX2 network model for proper usage. The returned data follows the
   * CX2 specification but may have aspects split across multiple fragments.
   * For a fully assembled network object with utility methods, use getNetworkAsCX2Object() instead.
   * 
   * @param networkUUID - The UUID of the network to retrieve
   * @param options - Access options including optional access key  
   * @returns Promise resolving to raw CX2 network data that may be fragmented
   */
  async getRawCX2Network(
    networkUUID: string, 
    options: AccessParams = {}
  ): Promise<CX2NetworkType> {
    const params = new URLSearchParams();
    if (options.accesskey) {
      params.append('accesskey', options.accesskey);
    }

    const endpoint = `networks/${networkUUID}${params.toString() ? `?${params.toString()}` : ''}`;
    return this.http.get<CX2NetworkType>(endpoint, { version: 'v3' });
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
    const params = new URLSearchParams();
    params.append('key', key);
    params.append('email', email);

    const endpoint = `networks/${networkUUID}/DOI?${params.toString()}`;
    return this.http.get<string>(endpoint, { version: 'v3' });
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
    const params = new URLSearchParams();
    if (options.accesskey) {
      params.append('accesskey', options.accesskey);
    }

    const data = {
      ids: nodeSelection.ids,
      attributeNames: nodeSelection.attributeNames
    };

    const endpoint = `search/networks/${networkUUID}/nodes${params.toString() ? `?${params.toString()}` : ''}`;
    return this.http.post<Record<string, any>>(endpoint, data, { version: 'v3' });
  }

    /**
   * Get network summaries by UUIDs using V3 API (migrated from original NDEx.js)
   * 
   * Retrieves network summaries for multiple networks in a single batch request using V3 API.
   * Uses the V3 API batch endpoint with format parameter support.
   * 
   * @param uuidList - Array of network UUIDs to retrieve summaries for
   * @param accessKey - Optional access key for private networks
   * @param format - Summary format ("FULL" by default, can be "BASIC" or other supported formats)
   * @returns Promise resolving to array of V3 network summaries
   */
  async getNetworkSummariesV3ByUUIDs(
    uuidList: string[], 
    accessKey?: string,
    format?: string
  ): Promise<NetworkSummaryV3[]> {
    const params: Record<string, string> = { 
      format: format === undefined ? 'FULL' : format 
    };

    if (accessKey != null) {
      params.accesskey = accessKey;
    }

    const endpoint = 'batch/networks/summary';
    return this.http.post<NetworkSummaryV3[]>(endpoint, uuidList, { 
      version: 'v3',
      params 
    });
  }



// following functions need to be reviewed or removed.

  /**
   * Search networks with V3 enhanced features
   */
  async searchNetworks(searchParams: SearchParameters = {}): Promise<SearchResult> {
    const params = new URLSearchParams();
    
    if (searchParams.searchString) {
      params.append('searchString', searchParams.searchString);
    }
    if (searchParams.accountName) {
      params.append('accountName', searchParams.accountName);
    }
    if (searchParams.permission) {
      params.append('permission', searchParams.permission);
    }
    if (searchParams.includeGroups !== undefined) {
      params.append('includeGroups', searchParams.includeGroups.toString());
    }
    if (searchParams.admin) {
      params.append('admin', searchParams.admin);
    }
    if (searchParams.start !== undefined) {
      params.append('start', searchParams.start.toString());
    }
    if (searchParams.size !== undefined) {
      params.append('size', searchParams.size.toString());
    }
    if (searchParams.source) {
      params.append('source', searchParams.source);
    }

    const endpoint = `search/network${params.toString() ? `?${params.toString()}` : ''}`;
    return this.http.get<SearchResult>(endpoint, { version: 'v3' });
  }
  /**
   * Get network as CX2Network object with utilities
   */
  async getNetworkAsCX2Object(
    networkUUID: string, 
    options: AccessParams = {}
  ): Promise<CX2Network> {
    const cx2Data = await this.getRawCX2Network(networkUUID, options);
    return new CX2Network(cx2Data);
  }

  /**
   * Create new network from CX2
   */
  async createNetworkFromCX2(
    cx2Data: CX2NetworkType | CX2Network, 
    options: { visibility?: Visibility; folderId?: string } = {}
  ): Promise<NDExObjectUpdateStatus> {
    const endpoint = 'networks';
    
    // Convert CX2Network object to plain object if needed
    const data = cx2Data instanceof CX2Network ? JSON.parse(cx2Data.toJSON()) : cx2Data;
    
    return this.http.post<NDExObjectUpdateStatus>(endpoint, data, { 
      version: 'v3',
      params: options
    });
  }

  /**
   * Update network with CX2 data
   */
  async updateNetworkCX2(
    networkUUID: string, 
    cx2Data: CX2NetworkType | CX2Network
  ): Promise<NDExObjectUpdateStatus> {
    const endpoint = `networks/${networkUUID}`;
    
    // Convert CX2Network object to plain object if needed
    const data = cx2Data instanceof CX2Network ? JSON.parse(cx2Data.toJSON()) : cx2Data;
    
    return this.http.put<NDExObjectUpdateStatus>(endpoint, data, { version: 'v3' });
  }

  /**
   * Upload network file (CX2, CX, or other formats)
   */
  async uploadNetworkFile(
    file: File | Blob | string,
    options: {
      filename?: string;
      visibility?: Visibility;
      name?: string;
      onProgress?: (progress: number) => void;
    } = {}
  ): Promise<{ uuid: string }> {
    return this.http.uploadFile<{ uuid: string }>('networks/upload', file, {
      version: 'v3',
      ...options,
    });
  }

  /**
   * Get network metadata (V3 enhanced)
   */
  async getNetworkMetadata(networkUUID: string): Promise<any> {
    const endpoint = `networks/${networkUUID}/metadata`;
    return this.http.get<any>(endpoint, { version: 'v3' });
  }

  /**
   * Update network metadata
   */
  async updateNetworkMetadata(
    networkUUID: string, 
    metadata: Record<string, any>
  ): Promise<void> {
    const endpoint = `networks/${networkUUID}/metadata`;
    return this.http.put<void>(endpoint, metadata, { version: 'v3' });
  }

  

  /**
   * Get network aspect (specific CX2 aspect)
   */
  async getNetworkAspect(
    networkUUID: string, 
    aspectName: string,
    options: AccessParams = {}
  ): Promise<any> {
    const params = new URLSearchParams();
    if (options.accesskey) {
      params.append('accesskey', options.accesskey);
    }

    const endpoint = `networks/${networkUUID}/aspects/${aspectName}${params.toString() ? `?${params.toString()}` : ''}`;
    return this.http.get<any>(endpoint, { version: 'v3' });
  }

/**
   * Delete network
   * @param networkUUID - The UUID of the network to delete
   * @param permanent - If true, permanently delete the network. If false (default), soft delete to trash for 30 days
   */
  async deleteNetwork(networkUUID: string, permanent: boolean = false): Promise<void> {
    const params = new URLSearchParams();
    params.append('permanent', permanent.toString());

    const endpoint = `networks/${networkUUID}?${params.toString()}`;
    return this.http.delete<void>(endpoint, { version: 'v3' });
  }

}
