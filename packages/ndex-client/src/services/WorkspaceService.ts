import { HTTPService } from './HTTPService';
import { CyWebWorkspace } from '../types';

/**
 * WorkspaceService - NDEx CyWeb workspace operations
 * 
 * Provides methods for managing CyWeb workspaces including creation, retrieval,
 * updates, and deletion of workspaces and their associated networks.
 * Workspace endpoints use the V3 API. The current-user lookup needed by
 * getUserCyWebWorkspaces() uses the v2 /user endpoint (no v3 equivalent).
 */
export class WorkspaceService {
  constructor(private http: HTTPService) {}

  /**
   * Create a new CyWeb workspace (migrated from original NDEx.js)
   * 
   * Creates a new workspace with the specified workspace data.
   * 
   * @param workspace - The workspace object to create
   * @returns Promise resolving to the response from the server (typically contains workspace location)
   * 
   * @example
   * ```typescript
   * const workspaceData = {
   *   name: "My Workspace",
   *   description: "A sample workspace",
   *   networkIds: []
   * };
   * const response = await client.workspace.createCyWebWorkspace(workspaceData);
   * ```
   */
  async createCyWebWorkspace(workspace: CyWebWorkspace): Promise<string> {
    const endpoint = 'workspaces';
    return this.http.post<string>(endpoint, workspace, { version: 'v3' });
  }

  /**
   * Get a CyWeb workspace by ID (migrated from original NDEx.js)
   * 
   * Retrieves a workspace and its details by workspace ID.
   * 
   * @param workspaceId - The UUID of the workspace to retrieve
   * @returns Promise resolving to the workspace object
   * 
   * @example
   * ```typescript
   * const workspace = await client.workspace.getCyWebWorkspace('workspace-uuid');
   * console.log(workspace.name);
   * ```
   */
  async getCyWebWorkspace(workspaceId: string): Promise<CyWebWorkspace> {
    const endpoint = `workspaces/${workspaceId}`;
    return this.http.get<CyWebWorkspace>(endpoint, { version: 'v3' });
  }

  /**
   * Delete a CyWeb workspace (migrated from original NDEx.js)
   * 
   * Deletes the specified workspace permanently.
   * 
   * @param workspaceId - The UUID of the workspace to delete
   * @returns Promise resolving when the workspace is deleted
   * 
   * @example
   * ```typescript
   * await client.workspace.deleteCyWebWorkspace('workspace-uuid');
   * ```
   */
  async deleteCyWebWorkspace(workspaceId: string): Promise<void> {
    const endpoint = `workspaces/${workspaceId}`;
    return this.http.delete<void>(endpoint, { version: 'v3' });
  }

  /**
   * Update a CyWeb workspace (migrated from original NDEx.js)
   * 
   * Updates a workspace with new data, replacing the entire workspace object.
   * 
   * @param workspaceId - The UUID of the workspace to update
   * @param workspaceObj - The updated workspace object
   * @returns Promise resolving when the workspace is updated
   * 
   * @example
   * ```typescript
   * const updatedWorkspace = {
   *   name: "Updated Workspace Name",
   *   description: "Updated description",
   *   networkIds: ["network-uuid-1", "network-uuid-2"]
   * };
   * await client.workspace.updateCyWebWorkspace('workspace-uuid', updatedWorkspace);
   * ```
   */
  async updateCyWebWorkspace(workspaceId: string, workspaceObj: CyWebWorkspace): Promise<void> {
    const endpoint = `workspaces/${workspaceId}`;
    return this.http.put<void>(endpoint, workspaceObj, { version: 'v3' });
  }

  /**
   * Update CyWeb workspace name (migrated from original NDEx.js)
   * 
   * Updates only the name of a workspace.
   * 
   * @param workspaceId - The UUID of the workspace to update
   * @param newName - The new name for the workspace
   * @returns Promise resolving when the workspace name is updated
   * 
   * @example
   * ```typescript
   * await client.workspace.updateCyWebWorkspaceName('workspace-uuid', 'New Workspace Name');
   * ```
   */
  async updateCyWebWorkspaceName(workspaceId: string, newName: string): Promise<void> {
    const endpoint = `workspaces/${workspaceId}/name`;
    return this.http.put<void>(endpoint, { name: newName }, { version: 'v3' });
  }

  /**
   * Update CyWeb workspace networks (migrated from original NDEx.js)
   * 
   * Updates the list of network IDs associated with a workspace.
   * 
   * @param workspaceId - The UUID of the workspace to update
   * @param networkIds - Array of network UUIDs to associate with the workspace
   * @returns Promise resolving when the workspace networks are updated
   * 
   * @example
   * ```typescript
   * const networkIds = ['network-uuid-1', 'network-uuid-2', 'network-uuid-3'];
   * await client.workspace.updateCyWebWorkspaceNetworks('workspace-uuid', networkIds);
   * ```
   */
  async updateCyWebWorkspaceNetworks(workspaceId: string, networkIds: string[]): Promise<void> {
    const endpoint = `workspaces/${workspaceId}/networkids`;
    return this.http.put<void>(endpoint, networkIds, { version: 'v3' });
  }

  /**
   * Get user's CyWeb workspaces (migrated from original NDEx.js)
   * 
   * Retrieves all workspaces belonging to the currently authenticated user.
   * Requires authentication.
   * 
   * @returns Promise resolving to array of workspace objects
   * 
   * @example
   * ```typescript
   * const workspaces = await client.workspace.getUserCyWebWorkspaces();
   * workspaces.forEach(workspace => {
   *   console.log(`Workspace: ${workspace.name}`);
   * });
   * ```
   */
  async getUserCyWebWorkspaces(): Promise<CyWebWorkspace[]> {
    // First get the current user to get their externalId
    const user = await this.http.get<any>('user', { params: { valid: true } });
    const endpoint = `users/${user.externalId}/workspaces`;
    return this.http.get<CyWebWorkspace[]>(endpoint, { version: 'v3' });
  }
}
