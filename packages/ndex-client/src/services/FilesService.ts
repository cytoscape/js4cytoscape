import { HTTPService } from './HTTPService';

// Type definitions for better type safety
interface ShareData {
  files: Record<string, 'NETWORK' | 'FOLDER' | 'SHORTCUT'>;
}

interface MemberData {
  members: Record<string, 'READ' | 'WRITE'>;
}

interface UpdateMemberRequest {
  files: ShareData['files'];
  members: MemberData['members'];
}

interface TransferOwnershipRequest {
  files: ShareData['files'];
  new_owner: string;
}

/**
 * FilesService - NDEx file operations and task management
 * Handles file uploads, downloads, exports, and asynchronous task tracking
 */
export class FilesService {
  constructor(private http: HTTPService) {}

  /**
   * Copy a file to a different location
   * @param fromUuid - Source file UUID
   * @param toPath - Target path
   * @param type - File type (NETWORK, FOLDER, SHORTCUT)
   * @param accessKey - Optional access key for protected files
   */
  copyFile(fromUuid: string, toPath: string, type: string, accessKey?: string): Promise<any> {
    let parameters: Record<string, any> = {};

    if (accessKey !== undefined) {
      parameters['accesskey'] = accessKey;
    }
    return this.http.post('files/copy', {from_uuid: fromUuid, type: type, to_path: toPath}, {params: parameters, version: 'v3'});
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

  private _validateMemberData(data: any): void {
    if (typeof data !== 'object' || data === null || data.members === undefined) {
      throw new Error('Data must be an object with a "members" property');
    }
    const validValues = ['READ', 'WRITE'];
    for (const [uuid, permission] of Object.entries(data.members)) {
      if (!validValues.includes(permission as string)) {
        throw new Error(`Invalid permission for ${uuid}: ${permission}. Must be one of: ${validValues.join(', ')}`);
      }
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
    return this.http.post('files/sharing/list', parameters, { version: 'v3' });
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

  getFolderList(folderId: string, accessKey?: string, format?: string, type?: string): Promise<any> {
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
    return this.http.get(`files/folders/${folderId}/list`, { params: parameters, version: 'v3' });
  }

  // Shortcut operations
  getShortcuts(limit?: number): Promise<any> {
    let parameters: Record<string, any> = {};

    if (limit !== undefined) {
      parameters['limit'] = limit;
    }
    return this.http.get('files/shortcuts', {params: parameters, version: 'v3'});
  }

  createShortcut(name: string, parentFolderId?: string, targetId?: string, targetType?: string): Promise<any> {
    return this.http.post('files/shortcuts', { name: name, parent: parentFolderId, target: targetId, targetType }, { version: 'v3' });
  }

  getShortcut(shortcutId: string, accessKey?: string): Promise<any> {
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
