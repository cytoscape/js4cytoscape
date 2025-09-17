import { HTTPService } from './HTTPService';
import {
  NetworkSummaryV3,
  SearchResult,
  SearchParameters,
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
      params['accesskey'] = accessKey;
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
   * Upload CX2 network via multipart/form-data
   *
   * Server endpoint: POST /v3/networks
   * Consumes: multipart/form-data
   * Form field: 'CXNetworkStream' (the CX2 content)
   * Query params: visibility, folderId
   * Returns: NdexObjectUpdateStatus
   */
  async uploadCX2Network(
    cx2: File | Blob | Buffer | string | NodeJS.ReadableStream,
    options: {
      visibility?: Visibility;
      folderId?: string;
      onProgress?: (progress: number) => void;
    } = {}
  ): Promise<NDExObjectUpdateStatus> {
    const params: Record<string, string> = {};
    if (options.visibility !== undefined) params['visibility'] = String(options.visibility);
    if (options.folderId !== undefined) params['folderId'] = options.folderId;

    const isNode = typeof (globalThis as any).window === 'undefined';

    if (isNode) {
      // Use Node's form-data package for robust multipart encoding
      let FormDataNode: any;
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        FormDataNode = require('form-data');
      } catch (_e) {
        FormDataNode = null;
      }

      if (FormDataNode) {
        const fd = new FormDataNode();
        const isReadableStream = (v: any): v is NodeJS.ReadableStream => v && typeof v === 'object' && typeof v.pipe === 'function';
        if (isReadableStream(cx2)) {
          fd.append('CXNetworkStream', cx2 as NodeJS.ReadableStream, { filename: 'network.cx2', contentType: 'application/json' });
        } else if (typeof (globalThis as any).Buffer !== 'undefined' && (globalThis as any).Buffer.isBuffer(cx2)) {
          fd.append('CXNetworkStream', cx2 as Buffer, { filename: 'network.cx2', contentType: 'application/json' });
        } else if (typeof cx2 === 'string') {
          fd.append('CXNetworkStream', (globalThis as any).Buffer.from(cx2), { filename: 'network.cx2', contentType: 'application/json' });
        } else if (typeof (globalThis as any).Blob !== 'undefined' && cx2 instanceof (globalThis as any).Blob) {
          const ab = await (cx2 as Blob).arrayBuffer();
          fd.append('CXNetworkStream', (globalThis as any).Buffer.from(ab), { filename: 'network.cx2', contentType: (cx2 as any).type || 'application/json' });
        } else {
          fd.append('CXNetworkStream', (globalThis as any).Buffer.from(String(cx2)), { filename: 'network.cx2', contentType: 'application/json' });
        }

        const axiosConfig: any = { version: 'v3', params, headers: fd.getHeaders?.() || {}, maxBodyLength: Infinity };
        // onUploadProgress is generally not supported in Node's default adapter; skip to avoid TS friction
        return this.http.post<NDExObjectUpdateStatus>('networks', fd, axiosConfig);
      }
      // If form-data is not available and a ReadableStream was provided, fail fast with guidance
      const isReadableStream = (v: any): v is NodeJS.ReadableStream => v && typeof v === 'object' && typeof v.pipe === 'function';
      if (isReadableStream(cx2)) {
        throw new Error("Readable stream upload requires 'form-data' package. Please install 'form-data' or pass a string/Buffer/Blob instead.");
      }
      // Otherwise, fall through to web FormData path below (will buffer in memory)
    }

    // Browser / Node 18+ web FormData path
    const formData = new FormData();
    const hasFileCtor = typeof (globalThis as any).File !== 'undefined';
    const hasBlobCtor = typeof (globalThis as any).Blob !== 'undefined';

    if (hasFileCtor && cx2 instanceof (globalThis as any).File) {
      formData.append('CXNetworkStream', cx2 as any, (cx2 as any).name || 'network.cx2');
    } else if (hasBlobCtor && cx2 instanceof (globalThis as any).Blob) {
      formData.append('CXNetworkStream', cx2 as any, 'network.cx2');
    } else if (typeof cx2 === 'string') {
      const blob = new Blob([cx2], { type: 'application/json' });
      formData.append('CXNetworkStream', blob, 'network.cx2');
    } else if (typeof (globalThis as any).Buffer !== 'undefined' && (globalThis as any).Buffer.isBuffer(cx2)) {
      const blob = new Blob([cx2 as Buffer], { type: 'application/json' });
      formData.append('CXNetworkStream', blob, 'network.cx2');
    } else {
      const blob = new Blob([String(cx2)], { type: 'application/json' });
      formData.append('CXNetworkStream', blob, 'network.cx2');
    }

    const axiosConfigWeb: any = { version: 'v3', params };
    if (options.onProgress) {
      axiosConfigWeb.onUploadProgress = (evt: any) => {
        const p = Math.round((evt.loaded * 100) / (evt.total || 1));
        options.onProgress!(p);
      };
    }
    return this.http.post<NDExObjectUpdateStatus>('networks', formData, axiosConfigWeb);
  }

  /**
   * Upload network file (Deprecated convenience wrapper)
   *
   * Delegates to uploadCX2Network(). Kept for backward compatibility.
   */
  async uploadNetworkFile(
    file: File | Blob | Buffer | string | NodeJS.ReadableStream,
    options: {
      visibility?: Visibility;
      onProgress?: (progress: number) => void;
      folderId?: string;
    } = {}
  ): Promise<NDExObjectUpdateStatus> {
    // Ignore filename/name – server reads data from 'CXNetworkStream'
    const payloadOpts: any = {};
    if (options.visibility !== undefined) payloadOpts.visibility = options.visibility;
    if (options.folderId !== undefined) payloadOpts.folderId = options.folderId;
    if (options.onProgress) payloadOpts.onProgress = options.onProgress;
    return this.uploadCX2Network(file, payloadOpts);
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
