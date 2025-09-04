/**
 * Type definitions for CyNDEx (Cytoscape-NDEx Bridge) operations
 */

/**
 * Configuration for CyNDEx service
 */
export interface CyNDExConfig {
  /** Port number for Cytoscape REST API (default: 1234) */
  port?: number;
  /** Base URL for Cytoscape REST API (default: 'http://127.0.0.1') */
  cyRestBaseURL?: string;
  /** NDEx server base URL (default: 'https://www.ndexbio.org') */
  ndexBaseURL?: string;
}

/**
 * Authentication configuration for NDEx operations
 * This is used as parameters passed to Cytoscape for NDEx authentication
 */
export interface CyNDExAuthConfig {
  type: 'basic' | 'oauth';
  username?: string;
  password?: string;
  idToken?: string;
}

/**
 * Parameters for importing NDEx network to Cytoscape
 */
export interface NDExImportParams {
  serverUrl: string;
  uuid: string;
  accessKey?: string;
  createView?: boolean;
  username?: string;
  password?: string;
  idToken?: string;
}

/**
 * Parameters for exporting Cytoscape network to NDEx
 */
export interface NDExExportParams {
  serverUrl: string;
  uuid?: string;
  username?: string;
  password?: string;
  idToken?: string;
}

/**
 * Cytoscape network summary response
 */
export interface CytoscapeNetworkSummary {
  suid?: string;
  title?: string;
  name?: string;
  nodeCount?: number;
  edgeCount?: number;
  selected?: boolean;
  [key: string]: any; // Allow additional properties from Cytoscape
}

/**
 * CyNDEx status response
 */
export interface CyNDExStatusResponse {
  version?: string;
  status?: string;
  [key: string]: any; // Allow additional status properties
}

/**
 * CX2 import parameters for Cytoscape
 */
export interface CX2ImportParams {
  format: 'cx2';
  collection?: string;
  title?: string;
}