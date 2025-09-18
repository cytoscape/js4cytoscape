import { HTTPService } from './HTTPService';
import { Permission, NDExFileType } from '../constants';
import { FileListItem, NDExObjectUpdateStatus, Shortcut } from '../types';

interface ShareData {
  files: Record<string, NDExFileType>;
}

interface MemberData {
  members: Record<string, Permission>;
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

  private _validateMemberData(data: MemberData): void {
    // Only need to validate UUID format - TypeScript ensures permission values are correct
    for (const uuid of Object.keys(data.members)) {
      if (typeof uuid !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid)) {
        throw new Error(`Invalid UUID format: ${uuid}`);
      }
    }
  }

  updateMember(files: ShareData['files'], members: MemberData['members']): Promise<any> {
    this._validateShareData({ files });
    this._validateMemberData({ members });
    return this.http.post('files/sharing/members', { files, members }, { version: 'v3' });
  }

  listMembers(files: any): Promise<any> {
    return this.http.get('files/sharing/members/list', {params: files, version: 'v3'});
  }

  transferOwnership(files: ShareData['files'], newOwner: string): Promise<any> {
    this._validateShareData({ files });
    return this.http.post('files/sharing/transfer_ownership', { files, new_owner: newOwner }, { version: 'v3' });
  }

  listShares(limit?: number): Promise<any> {
    const parameters: Record<string, any> = {};
    if (limit !== undefined) {
      parameters['limit'] = limit;
    }
    return this.http.get('files/sharing/list', { params: parameters, version: 'v3' });
  }
  
  share(files: ShareData['files']): Promise<any> {
    this._validateShareData({ files });
    return this.http.post('files/sharing/share', { files }, { version: 'v3' });
  }

  unshare(files: ShareData['files']): Promise<any> {
    this._validateShareData({ files });
    return this.http.post('files/sharing/unshare', { files }, { version: 'v3' });
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

  updateFolder(folderId: string, name: string, parentFolderId?: string): Promise<any> {
    return this.http.put(`files/folders/${folderId}`, { name: name, parent: parentFolderId }, { version: 'v3' });
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
  
  updateShortcut(shortcutId: string, name: string, parentFolderId?: string, targetId?: string, targetType?: string): Promise<any> {
    return this.http.put(`files/shortcuts/${shortcutId}`, { name: name, parent: parentFolderId, target: targetId, targetType }, { version: 'v3' });
  }

  deleteShortcut(shortcutId: string): Promise<any> {
    return this.http.delete(`files/shortcuts/${shortcutId}`, { version: 'v3' });
  }
}
