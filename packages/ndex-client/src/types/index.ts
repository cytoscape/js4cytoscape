/**
 * Core type definitions for NDEx Client Library
 * Pragmatic TypeScript types allowing flexibility with any types where needed
 */

// Export Cytoscape-related types
export * from './cytoscape';

// ============================================================================
// Authentication Types
// ============================================================================

export interface BasicAuth {
  type: 'basic';
  username: string;
  password: string;
}

export interface OAuthAuth {
  type: 'oauth';
  idToken: string;  // ID token from OAuth provider
}

export interface NDExAuthResponse {
  token?: string;
  userId?: string;
  userName?: string;
  isAdmin?: boolean;
  permissions?: string[];
  expirationTime?: number;
}

export interface NDExUser {
  externalId: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  website?: string;
  description?: string;
  image?: string;
  isIndividual?: boolean;
  isVerified?: boolean;
  creationTime?: number;
  modificationTime?: number;
}

// ============================================================================
// Network Types
// ============================================================================

export interface CX1MetaDataItem {
  name: string;
  elementCount: number;
  version: string;
  idCounter?: number;
  [key: string]: any; // Allow any additional properties
}

export interface CX1MetaDataResponse {
  metaData: CX1MetaDataItem[];
}

export interface CX1NetworkProperty {
  predicateString: string;
  value: string;
  dataType?: 'string' | 'integer' | 'double' | 'boolean' | 'list_of_string';
}

export interface CX2NetworkProperties {
  [key: string]: {
    t: string;  // type
    v: any;     // value
  };
}

export enum NetworkIndexLevel {
  NONE = 'NONE',
  BASIC = 'BASIC',
  FULL = 'FULL'
}

export interface NetworkSummaryV2 {
  externalId: string;
  name: string;
  description?: string;
  nodeCount: number;
  edgeCount: number;
  visibility: 'PUBLIC' | 'PRIVATE';
  owner: string;
  ownerUUID: string;
  creationTime: number;
  modificationTime: number;
  version?: string;
  properties?: CX1NetworkProperty[];  // V2 uses CX1 array format
  isReadOnly: boolean;
  isValid: boolean;
  warnings?: string[];
  hasLayout: boolean;
  hasSample: boolean;
  
  // Additional attributes for both V2 and V3
  updatedBy: string;           // username who modified this network last
  errorMessage?: string;
  cxFormat?: string;
  cxFileSize?: number;         // File size in bytes
  cx2FileSize?: number;        // File size in bytes
  isShowcase?: boolean;
  isCompleted?: boolean;
  doi?: string;
  isCertified?: boolean;
  indexLevel?: NetworkIndexLevel;
  parentDirUUID?: string;
  showInTrash?: boolean;
  subnetworkIds?: string[];
  reference?: string;
  organism?: string;
  disease?: string;
  tissue?: string;
  networkType?: string[];
  rightsHolder?: string;
  rights?: string;
  sourceFormat?: string;
}

/**
 * NetworkSummaryV3 - Network summary for NDEx API v3
 * 
 * Extends NetworkSummaryV2 but uses CX2-style properties format instead of CX1 format.
 * The main difference is in how network properties are structured:
 * 
 * | Aspect | NetworkSummaryV2 | NetworkSummaryV3 |
 * |--------|------------------|------------------|
 * | **Properties Format** | `CX1NetworkProperty[]` (array) | `CX2NetworkProperties` (object) |
 * | **Structure** | CX1-style array of property objects | CX2-style key-value map |
 * | **Example** | `[{predicateString: "name", value: "My Network"}]` | `{name: {t: "string", v: "My Network"}}` |
 * 
 * @example
 * ```typescript
 * // V2 properties format (array of objects)
 * const v2Summary: NetworkSummaryV2 = {
 *   externalId: "12345",
 *   name: "Sample Network",
 *   properties: [
 *     { predicateString: "description", value: "A sample network", dataType: "string" },
 *     { predicateString: "nodeCount", value: "100", dataType: "integer" }
 *   ]
 * };
 * 
 * // V3 properties format (object map)
 * const v3Summary: NetworkSummaryV3 = {
 *   externalId: "12345", 
 *   name: "Sample Network",
 *   properties: {
 *     description: { t: "string", v: "A sample network" },
 *     nodeCount: { t: "integer", v: 100 }
 *   }
 * };
 * ```
 */
export interface NetworkSummaryV3 extends Omit<NetworkSummaryV2, 'properties'> {
  properties?: CX2NetworkProperties;  // V3 uses CX2 object/map format
  // V3-specific additional attributes can be added here as needed
}


export interface NetworkPermission {
  uuid: string;
  permission: 'READ' | 'WRITE' | 'ADMIN';
  memberUUID: string;
  memberAccountName?: string;
  resourceUUID: string;
}

// NetworkSet interface removed - deprecated in NDEx v3, replaced by folders with network shortcuts

// ============================================================================
// CX2 Network Types
// ============================================================================

export interface CX2Network {
  CXVersion: string;
  hasFragments: boolean;
  metaData: CX2MetaData[];
  attributeDeclarations?: CX2AttributeDeclarations;
  networkAttributes?: CX2NetworkAttribute[];
  nodes?: CX2Node[];
  edges?: CX2Edge[];
  nodeBypass?: CX2NodeBypass[];
  edgeBypass?: CX2EdgeBypass[];
  visualProperties?: CX2VisualProperty;
  status?: CX2Status[];
}

export interface CX2MetaData {
  name: string;
  elementCount?: number;
}

export interface CX2AttributeDeclarations {
  [aspectName: string]: {
    [attributeName: string]: {
      d: string;  // datatype
      a?: string; // alias
      v?: any;    // default value
    };
  };
}

export interface CX2AttributeSpec {
  d: string; // data type
  v?: any; // default value
  s?: boolean; // is single
}

export interface CX2NetworkAttribute {
  [key: string]: any;
}

export interface CX2Node {
  id: number;
  x?: number; // x coordinate
  y?: number; // y coordinate  
  z?: number; // z coordinate (optional)
  v?: Record<string, any>; // attributes
}

export interface CX2Edge {
  id: number;
  s: number; // source node id
  t: number; // target node id
  v?: Record<string, any>; // attributes
}

export interface CX1Edge {
  // CX1 edge structure varies - can be any array structure
  [key: string]: any;
}

export interface CX2NodeBypass {
  id: number; // node id
  v: VisualPropertyTable; // visual properties
}

export interface CX2EdgeBypass {
  id: number; // edge id
  v: VisualPropertyTable; // visual properties
}

// ============================================================================
// CX2 Visual Property Types - Based on server-side CxVisualProperty class
// ============================================================================

/**
 * Visual Property Mapping Types
 */
export type VPMappingType = 'DISCRETE' | 'CONTINUOUS' | 'PASSTHROUGH';

/**
 * Mapping Definition for visual property mappings
 * Note: Using flexible typing for mapping definitions as they vary by type
 */
export interface MappingDefinition {
  mapppingList?: Array<Record<string, any>>; // Note: server has typo "mapppingList"
  [key: string]: any; // Allow other mapping definition properties
}

/**
 * Visual Property Mapping structure
 */
export interface VisualPropertyMapping {
  type: VPMappingType;
  definition: MappingDefinition;
}

/**
 * Visual Property Table - holds visual property values
 * Equivalent to server-side VisualPropertyTable class
 */
export interface VisualPropertyTable {
  [visualPropertyName: string]: any; // Maps visual property names to their values
}

/**
 * Table Column Visual Style - for individual visual properties
 */
export interface TableColumnVisualStyle {
  default?: any; // Default value for the visual property
  mapping?: VisualPropertyMapping; // Optional mapping definition
}

/**
 * Default Visual Properties structure
 */
export interface DefaultVisualProperties {
  edge?: VisualPropertyTable; // Default edge visual properties
  network?: Record<string, any>; // Default network visual properties  
  node?: VisualPropertyTable; // Default node visual properties
}

/**
 * CX2 Visual Property - Main visual properties aspect
 * Equivalent to server-side CxVisualProperty class
 */
export interface CX2VisualProperty {
  default?: DefaultVisualProperties; // Default visual properties
  edgeMapping?: Record<string, VisualPropertyMapping>; // Edge visual property mappings
  nodeMapping?: Record<string, VisualPropertyMapping>; // Node visual property mappings
}

export interface CX2Status {
  error?: string;
  success?: boolean;
}

// ============================================================================
// Search Types
// ============================================================================

export interface SearchResult {
  numFound: number;
  start: number;
  networks: NetworkSummaryV2[] | NetworkSummaryV3[];
}

export interface SearchParameters {
  searchString?: string;
  accountName?: string;
  permission?: string;
  includeGroups?: boolean;
  admin?: string;
  start?: number;
  size?: number;
  source?: string;
}

// ============================================================================
// File/Export Types
// ============================================================================

export interface ExportFormat {
  format: 'CX' | 'CX2' | 'XGMML' | 'SIF' | 'GRAPHML';
  version?: string;
}

export interface ExportRequest {
  networkUUID: string;
  format: ExportFormat;
  accesskey?: string;
}

// ============================================================================
// Task/Status Types
// ============================================================================

export interface Task {
  externalId: string;
  taskType: string;
  status: 'submitted' | 'processing' | 'completed' | 'failed';
  progress?: number;
  message?: string;
  resource?: string;
  startTime?: number;
  finishTime?: number;
  attributes?: Record<string, any>;
}

// ============================================================================
// API Configuration Types
// ============================================================================

export interface NDExClientConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  debug?: boolean;
  headers?: Record<string, string>;
  auth?: BasicAuth | OAuthAuth;  // Simplified to 2 authentication options
}

export interface APIResponse<T = any> {
  data?: T;
  errorCode?: string;
  message?: string;
  description?: string;
  stackTrace?: string;
  timeStamp?: number;
}

export interface APIError {
  errorCode: string;
  message: string;
  description?: string;
  stackTrace?: string;
  timeStamp?: number;
}

// ============================================================================
// Service Types
// ============================================================================


/**
 * Base error class for all NDEx API errors
 */
export class NDExError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errorCode?: string,
    public description?: string
  ) {
    super(message);
    this.name = 'NDExError';
  }
}

/**
 * Error thrown when network or request fails
 */
export class NDExNetworkError extends NDExError {
  constructor(message: string, public originalError?: Error) {
    super(message, undefined, 'NETWORK_ERROR');
    this.name = 'NDExNetworkError';
  }
}

/**
 * Error thrown when authentication fails
 */
export class NDExAuthError extends NDExError {
  constructor(message: string = 'Authentication failed', statusCode: number = 401) {
    super(message, statusCode, 'AUTH_ERROR');
    this.name = 'NDExAuthError';
  }
}

/**
 * Error thrown when requested resource is not found
 */
export class NDExNotFoundError extends NDExError {
  constructor(message: string = 'Resource not found', statusCode: number = 404) {
    super(message, statusCode, 'NOT_FOUND');
    this.name = 'NDExNotFoundError';
  }
}

/**
 * Error thrown when request validation fails
 */
export class NDExValidationError extends NDExError {
  constructor(message: string, statusCode: number = 400) {
    super(message, statusCode, 'VALIDATION_ERROR');
    this.name = 'NDExValidationError';
  }
}

/**
 * Error thrown when server encounters an internal error
 */
export class NDExServerError extends NDExError {
  constructor(message: string = 'Internal server error', statusCode: number = 500) {
    super(message, statusCode, 'SERVER_ERROR');
    this.name = 'NDExServerError';
  }
}

// ============================================================================
// Utility Types
// ============================================================================

export type UUID = string;
export type Timestamp = number;

// Allow flexible typing for gradual migration
export type NDExAny = any;

// Common parameter types
export interface PaginationParams {
  start?: number;
  size?: number;
}

export interface AccessParams {
  accesskey?: string;
}

// ============================================================================
// Workspace Types
// ============================================================================

/**
 * CyWeb workspace object structure
 */
export interface CyWebWorkspace {
  externalId?: string;
  name: string;
  description?: string;
  networkIds?: string[];
  [key: string]: any; // Allow additional properties
}

/**
 * Network access key response structure
 */
export interface AccessKeyResponse {
  accessKey: string | null;
}

/**
 * Valid actions for updating access keys
 */
export type AccessKeyAction = 'enable' | 'disable';

/**
 * NDEx object update status - returned from network creation and update operations
 * Corresponds to server-side NdexObjectUpdateStatus class
 */
export interface NDExObjectUpdateStatus {
  uuid: string;
  modificationTime: number; // Timestamp in milliseconds
}

