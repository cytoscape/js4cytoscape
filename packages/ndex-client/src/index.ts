/**
 * NDEx Client Library - Modern TypeScript Implementation
 * 
 * A comprehensive, modern TypeScript client for the NDEx (Network Data Exchange) API.
 * Supports both v2 and v3 APIs with intelligent version routing, native CX2 format support,
 * and provides a clean, type-safe interface for network operations.
 */

// Core Types
export * from './types';

// Constants
export * from './constants';

import { AuthType } from './constants';

// Models
export { CX2Network } from './models/CX2Network';

// Core Services
export { NetworkServiceV2 } from './services/NetworkServiceV2';
export { NetworkServiceV3 } from './services/NetworkServiceV3';
export { UnifiedNetworkService } from './services/UnifiedNetworkService';
export { FilesService } from './services/FilesService';
export { WorkspaceService } from './services/WorkspaceService';
export { UserService } from './services/UserService';
export { AdminService } from './services/AdminService';
export { CyNDExService } from './services/CyNDExService';

// Backward compatibility alias
export { CyNDExService as CyNDEx } from './services/CyNDExService';

// Legacy compatibility exports - temporarily commented out for test setup
// TODO: Fix ES module compatibility for NDEx.js and CyNDEx.js
// export { default as NDEx } from './NDEx.js';
// export { default as CyNDEx } from './CyNDEx.js';

// Main Client Class
import { HTTPService } from './services/HTTPService';
import { UnifiedNetworkService } from './services/UnifiedNetworkService';
import { FilesService } from './services/FilesService';
import { WorkspaceService } from './services/WorkspaceService';
import { UserService } from './services/UserService';
import { AdminService } from './services/AdminService';
import { NDExClientConfig, BasicAuth, OAuthAuth } from './types';

/**
 * NDExClient - Main client class for NDEx API operations
 * 
 * Provides a unified interface for all NDEx operations with intelligent
 * version routing between v2 and v3 APIs.
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const client = new NDExClient({
 *   baseURL: 'https://www.ndexbio.org',
 *   debug: true
 * });
 * 
 * // Authenticate
 * await client.user.authenticate({ username: 'user', password: 'pass' });
 * 
 * // Search networks
 * const results = await client.networks.searchNetworks({ searchString: 'pathway' });
 * 
 * // Get network as CX2
 * const network = await client.networks.getNetworkAsCX2Object('network-uuid');
 * 
 * // User operations
 * const profile = await client.user.getCurrentUser();
 * 
 * // Admin operations (requires admin privileges)
 * const stats = await client.admin.getSystemStats();
 * ```
 */
export class NDExClient {
  private httpService: HTTPService;
  
  /** Network operations with intelligent v2/v3 routing */
  public readonly networks: UnifiedNetworkService;
  
  /** File upload/download and task management */
  public readonly files: FilesService;
  
  /** Workspace operations (deprecated - most functionality moved to other services) */
  public readonly workspace: WorkspaceService;
  
  /** User authentication and management */
  public readonly user: UserService;
  
  /** System administration operations */
  public readonly admin: AdminService;

  constructor(config: NDExClientConfig = {}) {
    this.httpService = new HTTPService(config);
    this.networks = new UnifiedNetworkService(this.httpService);
    this.files = new FilesService(this.httpService);
    this.workspace = new WorkspaceService(this.httpService);
    this.user = new UserService(this.httpService);
    this.admin = new AdminService(this.httpService);
  }


  /**
   * Clear authentication
   */
  logout(): void {
    this.httpService.updateConfig({ auth: undefined });
  }

  /**
   * Get server status information
   * Can be called by authenticated or anonymous users.
   * @param format - Optional format parameter. Use 'full' for detailed information including properties and importers/exporters
   * @returns Server status including network/user counts and optional server details
   */
  async getServerStatus(format?: 'full'): Promise<{
    message: string;
    properties?: {
      ServerVersion: string;
      Build: string;
      ServerResultLimit: string;
      ImporterExporters: Array<{
        importer: boolean;
        exporter: boolean;
        fileExtension: string;
        name: string;
        description: string;
      }>;
    };
    networkCount: number;
    userCount: number;
    groupCount?: number;
  }> {
    const params = new URLSearchParams();
    if (format) {
      params.append('format', format);
    }

    const endpoint = `admin/status${params.toString() ? `?${params.toString()}` : ''}`;
    return this.httpService.get(endpoint);
  }

  /**
   * Check if client has valid authentication information configured
   * @returns true if auth is a valid BasicAuth or OAuthAuth object, false otherwise
   */
  hasAuthInfo(): boolean {
    const auth = this.httpService.getConfig().auth;
    if (!auth) return false;
    
    // Check for BasicAuth structure
    if (auth.type === AuthType.BASIC) {
      return !!(auth as BasicAuth).username && !!(auth as BasicAuth).password;
    }
    
    // Check for OAuthAuth structure  
    if (auth.type === AuthType.OAUTH) {
      return !!(auth as OAuthAuth).idToken;
    }
    
    return false;
  }

  /**
   * Update client configuration
   */
  updateConfig(config: Partial<NDExClientConfig>): void {
    this.httpService.updateConfig(config);
  }

  /**
   * Get current client configuration
   */
  getConfig(): NDExClientConfig {
    return this.httpService.getConfig();
  }

  /**
   * Get current authentication type
   * @returns The type of authentication configured (AuthType), or undefined if no auth is configured
   */
  getAuthType(): AuthType | undefined {
    return this.httpService.getAuthType();
  }

  /**
   * Set ID token for OAuth authentication
   * Creates OAuth auth configuration if no auth is currently configured
   * @param idToken - The ID token to set
   */
  setIdToken(idToken: string): void {
    this.httpService.setIdToken(idToken);
  }



  /**
   * Access to version-specific network services for advanced usage
   */
  get v2() {
    return {
      networks: this.networks.v2,
    };
  }

  get v3() {
    return {
      networks: this.networks.v3,
    };
  }

}

// Main export - New modern client (named export for better tree-shaking)
// Users should import as: import { NDExClient } from '@js4cytoscape/ndex-client'

// Version information - imported from package.json to ensure consistency
import { version as packageVersion } from '../package.json';

/**
 * Library version string imported from package.json
 * 
 * Provides programmatic access to the current library version for:
 * - Runtime version checking and validation
 * - Debugging and error reporting
 * - Logging and telemetry
 * - Version-dependent feature detection
 * 
 * @example
 * ```typescript
 * import { NDExClient, version } from '@js4cytoscape/ndex-client';
 * 
 * console.log(`Using NDEx Client v${version}`);
 * 
 * // In error reports
 * const errorReport = {
 *   error: err.message,
 *   libraryVersion: version,
 *   timestamp: new Date().toISOString()
 * };
 * ```
 */
export const version = packageVersion;

