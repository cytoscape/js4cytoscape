import { HTTPService } from './HTTPService';
import { Permission, NDExFileType, Visibility } from '../constants';
import { FileListItem, NDExObjectUpdateStatus, Shortcut } from '../types';

/**
 * Permission details for a file including its type and member permissions
 *
 * @description This interface represents the permission information for a single file,
 * including what type of file it is and which users have what permissions on it.
 */
export interface FilePermissionDetails {
  /**
   * The type of the file (NETWORK, FOLDER, or SHORTCUT)
   */
  type: NDExFileType;

  /**
   * Map of user UUIDs to their permission levels on this file
   *
   * @description Each key represents a user's UUID, and the corresponding value
   * indicates what permission level that user has on the file.
   *
   * @example
   * ```typescript
   * {
   *   "user1-uuid-1234-5678-9abc-def012345678": "READ",
   *   "user2-uuid-8765-4321-fedc-ba0987654321": "WRITE",
   *   "user3-uuid-1111-2222-3333-444444444444": "ADMIN"
   * }
   * ```
   */
  members: Record<string, Permission>;
}

/**
 * List of file permission records returned by listMembers
 *
 * @description Each element in the array is a record where the key is a file UUID
 * and the value contains the file's type and member permissions.
 *
 * @example
 * ```typescript
 * [
 *   {
 *     "12345678-1234-1234-1234-123456789abc": {
 *       type: "NETWORK",
 *       members: {
 *         "user1-uuid": "READ",
 *         "user2-uuid": "WRITE"
 *       }
 *     }
 *   },
 *   {
 *     "87654321-4321-4321-4321-876543210fed": {
 *       type: "FOLDER",
 *       members: {
 *         "user3-uuid": "ADMIN"
 *       }
 *     }
 *   }
 * ]
 * ```
 */
export type FilePermissionList = Record<string, FilePermissionDetails>[];

/**
 * Request object for sharing member operations
 *
 * This interface defines the structure for requests that manage file sharing permissions.
 * It combines file identification with member permission management in a single request.
 */
export interface SharingMemberRequest {
  /**
   * Object mapping file UUIDs to their corresponding file types
   *
   * @description Each key represents the UUID of a file to be shared, and the value
   * indicates what type of file it is (NETWORK, FOLDER, or SHORTCUT)
   *
   * @example
   * ```typescript
   * {
   *   "12345678-1234-1234-1234-123456789abc": "NETWORK",
   *   "87654321-4321-4321-4321-876543210fed": "FOLDER"
   * }
   * ```
   */
  files: Record<string, NDExFileType>;

  /**
   * Object mapping member UUIDs to their permission levels
   *
   * @description Each key represents the UUID of a user or member who should receive
   * explicit permissions, and the value is the type of permission they should have.
   * If the permission value is null, the existing file permission for the member will be revoked.
   *
   * @example
   * ```typescript
   * {
   *   "user1-uuid-1234-5678-9abc-def012345678": "READ",
   *   "user2-uuid-8765-4321-fedc-ba0987654321": "WRITE",
   *   "user3-uuid-1111-2222-3333-444444444444": null // This will revoke permissions
   * }
   * ```
   */
  members: Record<string, Permission | null>;
}


interface CreateShortcutOptions {
  name: string;
  target: string;
  targetType: NDExFileType;
  parent?: string;
}

/**
 * FilesService - NDEx file operations and task management
 * Handles file uploads, downloads, exports, and asynchronous task tracking
 */
export class FilesService {
  constructor(private http: HTTPService) {}

  /**
   * Copy a file to a different location
   *
   * Copies a network or shortcut to a target folder. Folder copying is not supported.
   * The copied file will be placed in the specified target folder with the same name
   * and properties as the original.
   *
   * @param options - Copy operation configuration
   * @param options.fileId - UUID of the source file to copy
   * @param options.targetId - UUID of the target folder where the file will be copied
   * @param options.type - Type of file being copied (only NETWORK and SHORTCUT are supported)
   * @param options.accessKey - Optional access key for accessing protected files
   * @returns Promise resolving to the copied file's UUID and modification time
   *
   * @example
   * ```typescript
   * // Copy a network to a specific folder
   * await client.files.copyFile({
   *   fileId: "12345678-1234-1234-1234-123456789abc",
   *   targetId: "87654321-4321-4321-4321-876543210fed",
   *   type: "NETWORK"
   * });
   *
   * // Copy a shortcut with access key
   * await client.files.copyFile({
   *   fileId: "11111111-2222-3333-4444-555555555555",
   *   targetId: "66666666-7777-8888-9999-000000000000",
   *   type: "SHORTCUT",
   *   accessKey: "secret-key-123"
   * });
   * ```
   */
  copyFile(options: {
    fileId: string;
    targetId: string;
    type: NDExFileType;
    accessKey?: string;
  }): Promise<NDExObjectUpdateStatus> {
    // Validate that only supported file types are used
    if (options.type === 'FOLDER') {
      throw new Error('Folder copying is not supported. Only NETWORK and SHORTCUT types are allowed.');
    }

    let parameters: Record<string, any> = {};

    if (options.accessKey !== undefined) {
      parameters['accesskey'] = options.accessKey;
    }

    return this.http.post('files/copy', {
      fileId: options.fileId,
      type: options.type,
      targetId: options.targetId
    }, {
      params: parameters,
      version: 'v3'
    });
  }

  /** Get file count statistics for the current user */
  getCount(): Promise<any> {
    return this.http.get('files/count', {version: 'v3'});
  }

  /** Get files in the trash for the current user */
  getTrash(): Promise<any> {
    return this.http.get('files/trash', {version: 'v3'});
  }

  /** Permanently delete all files in trash */
  emptyTrash(): Promise<any> {
    return this.http.delete('files/trash', {version: 'v3'});
  }

  /**
   * Permanently delete a file from trash
   * @param fileId - File UUID to permanently delete
   */
  permanentlyDeleteFile(fileId: string): Promise<any> {
    return this.http.delete(`files/trash/${fileId}`, { version: 'v3' });
  }

  /**
   * Restore files from trash
   * @param networkIds - Array of network UUIDs to restore
   * @param folderIds - Array of folder UUIDs to restore  
   * @param shortcutIds - Array of shortcut UUIDs to restore
   */
  restoreFile(networkIds: string[], folderIds: string[], shortcutIds: string[]): Promise<any> {
    return this.http.post('files/trash/restore', {networks: networkIds, folders: folderIds, shortcuts: shortcutIds}, {version: 'v3'});
  }

  private _validateShareData(data: any): void {
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

  private _validateMemberData(data: { members: Record<string, Permission | null> }): void {
    // Only need to validate UUID format - TypeScript ensures permission values are correct
    for (const uuid of Object.keys(data.members)) {
      if (typeof uuid !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid)) {
        throw new Error(`Invalid UUID format: ${uuid}`);
      }
    }
  }

  /**
   * Update member permissions for shared files
   *
   * This method allows you to grant, modify, or revoke permissions for specific members
   * across multiple files in a single operation. It's particularly useful for bulk
   * permission management and ensuring consistent access control.
   *
   * @param request - The sharing member request containing files and member permissions
   * @param request.files - Object mapping file UUIDs to their file types
   * @param request.members - Object mapping member UUIDs to their permission levels (or null to revoke)
   *
   * @returns Promise resolving to an object with file UUIDs as keys and permission status messages as values
   *
   * @example
   * ```typescript
   * // Grant permissions to multiple members for different files
   * const result = await client.files.updateMember({
   *   files: {
   *     "network-uuid-123": "NETWORK",
   *     "folder-uuid-456": "FOLDER"
   *   },
   *   members: {
   *     "user1-uuid": "READ",
   *     "user2-uuid": "WRITE",
   *     "user3-uuid": null // Revoke permissions
   *   }
   * });
   *
   * // Result example:
   * // {
   * //   "network-uuid-123": "network permission granted",
   * //   "folder-uuid-456": "folder permission granted"
   * // }
   *
   * // Revoke all permissions for a user
   * await client.files.updateMember({
   *   files: {
   *     "network-uuid-789": "NETWORK"
   *   },
   *   members: {
   *     "user-to-remove-uuid": null
   *   }
   * });
   * ```
   *
   * @throws {Error} When file UUIDs have invalid format
   * @throws {Error} When file types are invalid
   * @throws {Error} When member UUIDs have invalid format
   */
  updateMember(request: SharingMemberRequest): Promise<Record<string, string>> {
    this._validateShareData({ files: request.files });
    this._validateMemberData({ members: request.members });
    return this.http.post('files/sharing/members', { files: request.files, members: request.members }, { version: 'v3' });
  }

  /**
   * List members and their permissions for specified files
   *
   * Retrieves detailed permission information for the specified files, including
   * the file type and a mapping of all users who have explicit permissions on each file.
   * This is useful for auditing file access and understanding who has what level of
   * access to your shared content.
   *
   * @param files - Object mapping file UUIDs to their file types
   * @returns Promise resolving to a list of permission records for each file
   *
   * @example
   * ```typescript
   * // Get permission details for multiple files
   * const permissions = await client.files.listMembers({
   *   "12345678-1234-1234-1234-123456789abc": "NETWORK",
   *   "87654321-4321-4321-4321-876543210fed": "FOLDER",
   *   "11111111-2222-3333-4444-555555555555": "SHORTCUT"
   * });
   *
   * // Result example:
   * // [
   * //   {
   * //     "12345678-1234-1234-1234-123456789abc": {
   * //       type: "NETWORK",
   * //       members: {
   * //         "user1-uuid-1234-5678-9abc-def012345678": "READ",
   * //         "user2-uuid-8765-4321-fedc-ba0987654321": "WRITE",
   * //         "user3-uuid-1111-2222-3333-444444444444": "ADMIN"
   * //       }
   * //     }
   * //   },
   * //   {
   * //     "87654321-4321-4321-4321-876543210fed": {
   * //       type: "FOLDER",
   * //       members: {
   * //         "user4-uuid-aaaa-bbbb-cccc-dddddddddddd": "ADMIN",
   * //         "user5-uuid-eeee-ffff-0000-111111111111": "READ"
   * //       }
   * //     }
   * //   }
   * // ]
   *
   * // Access specific file permissions
   * const networkPermissions = permissions.find(record =>
   *   record["12345678-1234-1234-1234-123456789abc"]
   * )?.["12345678-1234-1234-1234-123456789abc"];
   *
   * if (networkPermissions) {
   *   console.log('File type:', networkPermissions.type); // "NETWORK"
   *   console.log('Members:', networkPermissions.members);
   *
   *   // Check if specific user has permission
   *   const userPermission = networkPermissions.members["user1-uuid-1234-5678-9abc-def012345678"];
   *   console.log('User permission:', userPermission); // "READ"
   * }
   * ```
   *
   * @throws {Error} When file UUIDs have invalid format
   * @throws {Error} When file types are invalid
   */
  listMembers(files: Record<string, NDExFileType>): Promise<FilePermissionList> {
    this._validateShareData({ files });
    return this.http.post('files/sharing/members/list', files, { version: 'v3' });
  }

  /**
   * Transfer ownership of networks to a new owner
   *
   * This method transfers ownership of multiple networks to a specified user.
   * The current owner will lose ownership rights, and the new owner will gain
   * full control over the specified networks.
   *
   * @param request - Transfer ownership request
   * @param request.networks - Array of network UUIDs to transfer ownership for
   * @param request.newOwner - UUID of the user who will become the new owner
   * @returns Promise that resolves when the ownership transfer is complete
   *
   * @example
   * ```typescript
   * // Transfer ownership of multiple networks to a new owner
   * await client.files.transferOwnership({
   *   networks: [
   *     "12345678-1234-1234-1234-123456789abc",
   *     "87654321-4321-4321-4321-876543210fed"
   *   ],
   *   newOwner: "new-owner-uuid-1111-2222-3333-444444444444"
   * });
   * ```
   */
  transferOwnership(request: { networks: string[]; newOwner: string }): Promise<void> {
    return this.http.post('files/sharing/transfer', request, { version: 'v3' });
  }

  listShares(limit?: number): Promise<any> {
    const parameters: Record<string, any> = {};
    if (limit !== undefined) {
      parameters['limit'] = limit;
    }
    return this.http.get('files/sharing/list', { params: parameters, version: 'v3' });
  }
  
  /**
   * Share files with public access
   *
   * Makes specified files publicly accessible by generating access keys for each file.
   * The generated access keys can be used by others to access the shared files without
   * requiring explicit permissions.
   *
   * @param fileTable - Object mapping file UUIDs to their file types
   * @returns Promise resolving to an object mapping file UUIDs to their generated access keys
   *
   * @example
   * ```typescript
   * // Share a network and a folder
   * const result = await client.files.share({
   *   "e6fc6a72-59ea-4f1d-ad81-59eda2cb8dce": "NETWORK",
   *   "40c08b7b-a4dd-4f00-87b3-1b945991948a": "FOLDER"
   * });
   *
   * // Result example:
   * // {
   * //   "e6fc6a72-59ea-4f1d-ad81-59eda2cb8dce": "abc123def456",
   * //   "40c08b7b-a4dd-4f00-87b3-1b945991948a": "xyz789uvw012"
   * // }
   *
   * // Use the access key to access shared content
   * const sharedNetwork = await client.networks.getNetwork(
   *   "e6fc6a72-59ea-4f1d-ad81-59eda2cb8dce",
   *   { accessKey: result["e6fc6a72-59ea-4f1d-ad81-59eda2cb8dce"] }
   * );
   * ```
   */
  share(fileTable: Record<string, NDExFileType>): Promise<Record<string, string>> {
    this._validateShareData({ files: fileTable });
    return this.http.post('files/sharing/share', { files: fileTable }, { version: 'v3' });
  }

  unshare(fileTable: Record<string, NDExFileType>): Promise<void> {
    this._validateShareData({ files: fileTable });
    return this.http.post('files/sharing/unshare', { files: fileTable }, { version: 'v3' });
  }

  // Folder operations
  getFolders(limit?: number): Promise<any> {
    let parameters: Record<string, any> = {};

    if (limit !== undefined) {
      parameters['limit'] = limit;
    }
    return this.http.get('files/folders', {params: parameters, version: 'v3'});
  }
  
  createFolder(name: string, parentFolderId?: string): Promise<any> {
    return this.http.post('files/folders', { name: name, parent: parentFolderId }, { version: 'v3' });
  }

  getFolder(folderId: string, accessKey?: string): Promise<any> {
    const parameters: Record<string, any> = {};
    if (accessKey !== undefined) {
      parameters['accesskey'] = accessKey;
    }
    return this.http.get(`files/folders/${folderId}`, { params: parameters, version: 'v3' });
  }

  /**
   * Update folder properties
   *
   * Updates the properties of an existing folder including name, description, and parent location.
   * When parent is omitted, the folder remains in or is moved to the owner's home directory.
   *
   * @param folderId - The UUID of the folder to update
   * @param folderData - Object containing folder properties to update
   * @param folderData.name - The new name for the folder
   * @param folderData.description - The new description for the folder
   * @param folderData.parent - Optional UUID of the parent folder. If omitted, folder is placed in owner's home directory
   * @returns Promise that resolves when the folder update is complete
   *
   * @example
   * ```typescript
   * // Update folder name and description, keep in current location
   * await client.files.updateFolder('folder-uuid', {
   *   name: 'Updated Folder Name',
   *   description: 'Updated folder description'
   * });
   *
   * // Move folder to a different parent and update properties
   * await client.files.updateFolder('folder-uuid', {
   *   name: 'Moved Folder',
   *   description: 'This folder has been moved',
   *   parent: 'parent-folder-uuid'
   * });
   *
   * // Move folder to home directory by omitting parent
   * await client.files.updateFolder('folder-uuid', {
   *   name: 'Home Folder',
   *   description: 'Moved to home directory'
   * });
   * ```
   */
  updateFolder(
    folderId: string,
    folderData: {
      name: string;
      description: string;
      parent?: string;
    }
  ): Promise<void> {
    return this.http.put(`files/folders/${folderId}`, folderData, { version: 'v3' });
  }

  deleteFolder(folderId: string): Promise<any> {
    return this.http.delete(`files/folders/${folderId}`, { version: 'v3' });
  }

  getFolderCount(folderId: string, accessKey?: string): Promise<any> {
    const parameters: Record<string, any> = {};
    if (accessKey !== undefined) {
      parameters['accesskey'] = accessKey;
    }
    return this.http.get(`files/folders/${folderId}/count`, { params: parameters, version: 'v3' });
  }

  getFolderList(folderId: string, accessKey?: string, format?: string, type?: string): Promise<FileListItem[]> {
    const parameters: Record<string, any> = {};
    if (accessKey !== undefined) {
      parameters['accesskey'] = accessKey;
    }
    if (format !== undefined) {
      parameters['format'] = format;
    }
    if (type !== undefined) {
      parameters['type'] = type;
    }
    return this.http.get<FileListItem[]>(`files/folders/${folderId}/list`, { params: parameters, version: 'v3' });
  }

  // Shortcut operations
  getShortcuts(limit?: number): Promise<any> {
    let parameters: Record<string, any> = {};

    if (limit !== undefined) {
      parameters['limit'] = limit;
    }
    return this.http.get('files/shortcuts', {params: parameters, version: 'v3'});
  }

  /**
   * Create a shortcut to an existing NDEx object
   * 
   * Creates a shortcut (reference) to an existing network, folder, or shortcut.
   * The shortcut can be placed in a specific folder or in the user's home directory.
   * 
   * @param options - Shortcut creation options
   * @param options.name - Display name for the shortcut
   * @param options.target - UUID of the target object to create a shortcut to
   * @param options.targetType - Type of the target object ('NETWORK', 'FOLDER', or 'SHORTCUT')
   * @param options.parent - Optional UUID of the parent folder. If omitted, shortcut is created in user's home directory
   * @returns Promise resolving to the created shortcut information
   * 
   * @example
   * ```typescript
   * // Create shortcut to a network in home directory
   * await client.files.createShortcut({
   *   name: "My Important Network Shortcut",
   *   target: "12345678-1234-1234-1234-123456789abc",
   *   targetType: "NETWORK"
   * });
   * 
   * // Create shortcut to a folder within another folder
   * await client.files.createShortcut({
   *   name: "Research Folder Shortcut",
   *   target: "87654321-4321-4321-4321-876543210fed",
   *   targetType: "FOLDER",
   *   parent: "11111111-2222-3333-4444-555555555555"
   * });
   * ```
   */
  createShortcut(options: CreateShortcutOptions): Promise<NDExObjectUpdateStatus> {
    return this.http.post('files/shortcuts', options, { version: 'v3' });
  }

  getShortcut(shortcutId: string, accessKey?: string): Promise<Shortcut> {
    const parameters: Record<string, any> = {};
    if (accessKey !== undefined) {
      parameters['accesskey'] = accessKey;
    }
    return this.http.get(`files/shortcuts/${shortcutId}`, { params: parameters, version: 'v3' });
  }
  
  /**
   * Update shortcut properties
   *
   * Updates the properties of an existing shortcut including name, parent location, target, and target type.
   * The parent attribute is always included in the request payload - when parent is omitted from the shortcut object,
   * parent is set to null to indicate the shortcut should be moved to the owner's home directory.
   *
   * @param shortcutId - The UUID of the shortcut to update
   * @param shortcutObject - Object containing shortcut properties to update
   * @param shortcutObject.name - The new name for the shortcut
   * @param shortcutObject.target - UUID of the target object the shortcut points to
   * @param shortcutObject.targetType - Type of the target object ('NETWORK', 'FOLDER', or 'SHORTCUT')
   * @param shortcutObject.parent - Optional UUID of the parent folder. If omitted, shortcut is moved to home directory
   * @returns Promise resolving when the shortcut update is complete
   *
   * @example
   * ```typescript
   * // Update shortcut name and target, move to home directory
   * await client.files.updateShortcut('shortcut-uuid', {
   *   name: 'Updated Shortcut Name',
   *   target: 'target-network-uuid',
   *   targetType: 'NETWORK'
   * });
   *
   * // Update shortcut and move to a specific folder
   * await client.files.updateShortcut('shortcut-uuid', {
   *   name: 'Folder Shortcut',
   *   target: 'target-folder-uuid',
   *   targetType: 'FOLDER',
   *   parent: 'parent-folder-uuid'
   * });
   *
   * // Update all shortcut properties
   * await client.files.updateShortcut('shortcut-uuid', {
   *   name: 'Complete Update',
   *   target: 'target-network-uuid',
   *   targetType: 'NETWORK',
   *   parent: 'parent-folder-uuid'
   * });
   * ```
   */
  updateShortcut(shortcutId: string, shortcutObject: CreateShortcutOptions): Promise<any> {
    return this.http.put(`files/shortcuts/${shortcutId}`, {
      ...shortcutObject,
      parent: shortcutObject.parent ?? null
    }, { version: 'v3' });
  }

  deleteShortcut(shortcutId: string): Promise<any> {
    return this.http.delete(`files/shortcuts/${shortcutId}`, { version: 'v3' });
  }

  /**
   * Set visibility for multiple files
   *
   * Updates the visibility settings for the specified files, controlling who can
   * access them based on the visibility level (public, private, etc.).
   *
   * @param options - Visibility update configuration
   * @param options.files - Object mapping file UUIDs to their file types
   * @param options.visibility - The visibility level to apply to all specified files
   * @returns Promise that resolves when the visibility has been updated
   *
   * @example
   * ```typescript
   * // Make multiple files public
   * await client.files.setVisibility({
   *   files: {
   *     "12345678-1234-1234-1234-123456789abc": "NETWORK",
   *     "87654321-4321-4321-4321-876543210fed": "FOLDER"
   *   },
   *   visibility: "PUBLIC"
   * });
   * ```
   */
  setVisibility(options: {files: Record<string, NDExFileType>, visibility: Visibility}): Promise<void> {
    return this.http.post(`batch/files/setvisibility`,
         { files: options.files, visibility: options.visibility}, { version: 'v3' });
  }
}
