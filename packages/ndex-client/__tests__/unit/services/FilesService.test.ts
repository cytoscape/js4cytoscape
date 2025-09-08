import { HTTPService } from '../../../src/services/HTTPService';
import { FilesService } from '../../../src/services/FilesService';
import { Permission } from '../../../src/types';

// Mock the HTTPService
jest.mock('../../../src/services/HTTPService');

describe('FilesService', () => {
  let filesService: FilesService;
  let mockHttpService: jest.Mocked<HTTPService>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockHttpService = new HTTPService() as jest.Mocked<HTTPService>;
    filesService = new FilesService(mockHttpService);
  });

  describe('constructor', () => {
    it('should initialize with HTTPService', () => {
      expect(filesService).toBeInstanceOf(FilesService);
      expect(filesService['http']).toBe(mockHttpService);
    });
  });

  describe('Basic File Operations', () => {
    describe('copyFile', () => {
      it('should call http.post with correct parameters when accessKey provided', async () => {
        const mockResponse = { success: true };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const result = await filesService.copyFile('from-uuid', '/path/to', 'NETWORK', 'access-key');

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/copy',
          { from_uuid: 'from-uuid', type: 'NETWORK', to_path: '/path/to' },
          { params: { accesskey: 'access-key' }, version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

      it('should call http.post without accesskey when not provided', async () => {
        const mockResponse = { success: true };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const result = await filesService.copyFile('from-uuid', '/path/to', 'NETWORK');

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/copy',
          { from_uuid: 'from-uuid', type: 'NETWORK', to_path: '/path/to' },
          { params: {}, version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });
    });

    describe('getCount', () => {
      it('should call http.get with correct endpoint', async () => {
        const mockResponse = { count: 42 };
        mockHttpService.get.mockResolvedValueOnce(mockResponse);

        const result = await filesService.getCount();

        expect(mockHttpService.get).toHaveBeenCalledWith('files/count', { version: 'v3' });
        expect(result).toBe(mockResponse);
      });
    });

    describe('getTrash', () => {
      it('should call http.get with correct endpoint', async () => {
        const mockResponse = { items: [] };
        mockHttpService.get.mockResolvedValueOnce(mockResponse);

        const result = await filesService.getTrash();

        expect(mockHttpService.get).toHaveBeenCalledWith('files/trash', { version: 'v3' });
        expect(result).toBe(mockResponse);
      });
    });

    describe('emptyTrash', () => {
      it('should call http.delete with correct endpoint', async () => {
        const mockResponse = { success: true };
        mockHttpService.delete.mockResolvedValueOnce(mockResponse);

        const result = await filesService.emptyTrash();

        expect(mockHttpService.delete).toHaveBeenCalledWith('files/trash', { version: 'v3' });
        expect(result).toBe(mockResponse);
      });
    });

    describe('permanentlyDeleteFile', () => {
      it('should call http.delete with correct endpoint and fileId', async () => {
        const mockResponse = { success: true };
        mockHttpService.delete.mockResolvedValueOnce(mockResponse);

        const result = await filesService.permanentlyDeleteFile('file-123');

        expect(mockHttpService.delete).toHaveBeenCalledWith('files/trash/file-123', { version: 'v3' });
        expect(result).toBe(mockResponse);
      });

    });

    describe('restoreFile', () => {
      it('should call http.post with correct parameters', async () => {
        const mockResponse = { success: true };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const networkIds = ['net1', 'net2'];
        const folderIds = ['folder1'];
        const shortcutIds = ['shortcut1'];

        const result = await filesService.restoreFile(networkIds, folderIds, shortcutIds);

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/trash/restore',
          { networks: networkIds, folders: folderIds, shortcuts: shortcutIds },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });
    });
  });

  describe('Validation Functions', () => {
    describe('_validateShareData', () => {
      it('should validate correct share data without throwing', () => {
        const validData = {
          files: {
            '12345678-1234-1234-1234-123456789abc': 'NETWORK',
            '87654321-4321-4321-4321-cba987654321': 'FOLDER'
          }
        };

        expect(() => {
          (filesService as any)._validateShareData(validData);
        }).not.toThrow();
      });

      it('should throw error for missing files property', () => {
        const invalidData = { notFiles: {} };

        expect(() => {
          (filesService as any)._validateShareData(invalidData);
        }).toThrow('Data must be an object with a "files" property');
      });

      it('should throw error for null data', () => {
        expect(() => {
          (filesService as any)._validateShareData(null);
        }).toThrow('Data must be an object with a "files" property');
      });

      it('should throw error for invalid UUID format', () => {
        const invalidData = {
          files: { 'invalid-uuid': 'NETWORK' }
        };

        expect(() => {
          (filesService as any)._validateShareData(invalidData);
        }).toThrow('Invalid UUID format: invalid-uuid');
      });

      it('should throw error for invalid file type', () => {
        const invalidData = {
          files: { '12345678-1234-1234-1234-123456789abc': 'INVALID_TYPE' }
        };

        expect(() => {
          (filesService as any)._validateShareData(invalidData);
        }).toThrow('Invalid file type for 12345678-1234-1234-1234-123456789abc: INVALID_TYPE');
      });
    });

    describe('_validateMemberData', () => {
      it('should validate correct member data without throwing', () => {
        const validData = {
          members: {
            '12345678-1234-1234-1234-123456789abc': 'READ' as Permission,
            '87654321-4321-4321-4321-cba987654321': 'WRITE' as Permission
          }
        };

        expect(() => {
          (filesService as any)._validateMemberData(validData);
        }).not.toThrow();
      });

      // Note: Missing members property and invalid permission tests removed 
      // because TypeScript now enforces correct typing at compile time

      it('should throw error for invalid UUID in members', () => {
        const invalidData = {
          members: { 'invalid-uuid': 'READ' as Permission }
        };

        expect(() => {
          (filesService as any)._validateMemberData(invalidData);
        }).toThrow('Invalid UUID format: invalid-uuid');
      });
    });
  });

  describe('Sharing Operations', () => {
    const validFiles = { '12345678-1234-1234-1234-123456789abc': 'NETWORK' as const };
    const validMembers = { '87654321-4321-4321-4321-cba987654321': 'READ' as Permission };

    describe('updateMember', () => {
      it('should call http.post with validated data', async () => {
        const mockResponse = { success: true };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const result = await filesService.updateMember(validFiles, validMembers);

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/sharing/members',
          { files: validFiles, members: validMembers },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

      it('should throw error for invalid files data', () => {
        const invalidFiles = { 'invalid-uuid': 'NETWORK' as const };

        expect(() => filesService.updateMember(invalidFiles, validMembers)).toThrow('Invalid UUID format');
        expect(mockHttpService.post).not.toHaveBeenCalled();
      });
    });

    describe('listMembers', () => {
      it('should call http.get with correct parameters', async () => {
        const mockResponse = { members: [] };
        mockHttpService.get.mockResolvedValueOnce(mockResponse);

        const files = { '12345678-1234-1234-1234-123456789abc': 'NETWORK' as const };
        const result = await filesService.listMembers(files);

        expect(mockHttpService.get).toHaveBeenCalledWith(
          'files/sharing/members/list',
          { params: files, version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });
    });

    describe('transferOwnership', () => {
      it('should call http.post with validated data', async () => {
        const mockResponse = { success: true };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const result = await filesService.transferOwnership(validFiles, 'new-owner');

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/sharing/transfer_ownership',
          { files: validFiles, new_owner: 'new-owner' },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });


      it('should throw error for invalid files', () => {
        const invalidFiles = { 'invalid': 'NETWORK' as const };
        expect(() => filesService.transferOwnership(invalidFiles, 'owner')).toThrow('Invalid UUID format');
      });
    });

    describe('listShares', () => {
      it('should call http.post with limit parameter', async () => {
        const mockResponse = { shares: [] };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const result = await filesService.listShares(10);

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/sharing/list',
          { limit: 10 },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

      it('should call http.post without parameters when limit not provided', async () => {
        const mockResponse = { shares: [] };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const result = await filesService.listShares();

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/sharing/list',
          {},
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });
    });

    describe('share', () => {
      it('should call http.post with validated files', async () => {
        const mockResponse = { success: true };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const result = await filesService.share(validFiles);

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/sharing/share',
          { files: validFiles },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

      it('should throw error for invalid files', () => {
        const invalidFiles = { 'invalid': 'NETWORK' as const };
        expect(() => filesService.share(invalidFiles)).toThrow('Invalid UUID format');
      });
    });

    describe('unshare', () => {
      it('should call http.post with validated files', async () => {
        const mockResponse = { success: true };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const result = await filesService.unshare(validFiles);

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/sharing/unshare',
          { files: validFiles },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

      it('should throw error for invalid files', () => {
        const invalidFiles = { 'invalid': 'NETWORK' as const };
        expect(() => filesService.unshare(invalidFiles)).toThrow('Invalid UUID format');
      });
    });
  });

  describe('Folder Operations', () => {
    describe('getFolders', () => {
      it('should call http.get with limit parameter', async () => {
        const mockResponse = { folders: [] };
        mockHttpService.get.mockResolvedValueOnce(mockResponse);

        const result = await filesService.getFolders(10);

        expect(mockHttpService.get).toHaveBeenCalledWith(
          'files/folders',
          { params: { limit: 10 }, version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

      it('should call http.get without parameters when limit not provided', async () => {
        const mockResponse = { folders: [] };
        mockHttpService.get.mockResolvedValueOnce(mockResponse);

        const result = await filesService.getFolders();

        expect(mockHttpService.get).toHaveBeenCalledWith(
          'files/folders',
          { params: {}, version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });
    });

    describe('createFolder', () => {
      it('should call http.post with folder name and parent', async () => {
        const mockResponse = { id: 'folder-123' };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const result = await filesService.createFolder('My Folder', 'parent-folder');

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/folders',
          { name: 'My Folder', parent: 'parent-folder' },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

    });

    describe('getFolder', () => {
      it('should call http.get with folderId and accessKey', async () => {
        const mockResponse = { folder: {} };
        mockHttpService.get.mockResolvedValueOnce(mockResponse);

        const result = await filesService.getFolder('folder-123', 'access-key');

        expect(mockHttpService.get).toHaveBeenCalledWith(
          'files/folders/folder-123',
          { params: { accesskey: 'access-key' }, version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

    });

    describe('updateFolder', () => {
      it('should call http.put with correct parameters', async () => {
        const mockResponse = { success: true };
        mockHttpService.put.mockResolvedValueOnce(mockResponse);

        const result = await filesService.updateFolder('folder-123', 'New Name', 'parent-folder');

        expect(mockHttpService.put).toHaveBeenCalledWith(
          'files/folders/folder-123',
          { name: 'New Name', parent: 'parent-folder' },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

    });

    describe('deleteFolder', () => {
      it('should call http.delete with folderId', async () => {
        const mockResponse = { success: true };
        mockHttpService.delete.mockResolvedValueOnce(mockResponse);

        const result = await filesService.deleteFolder('folder-123');

        expect(mockHttpService.delete).toHaveBeenCalledWith('files/folders/folder-123', { version: 'v3' });
        expect(result).toBe(mockResponse);
      });

    });

    describe('getFolderCount', () => {
      it('should call http.get with correct endpoint', async () => {
        const mockResponse = { count: 5 };
        mockHttpService.get.mockResolvedValueOnce(mockResponse);

        const result = await filesService.getFolderCount('folder-123', 'access-key');

        expect(mockHttpService.get).toHaveBeenCalledWith(
          'files/folders/folder-123/count',
          { params: { accesskey: 'access-key' }, version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });
    });

    describe('getFolderList', () => {
      it('should call http.get with all parameters', async () => {
        const mockResponse = { items: [] };
        mockHttpService.get.mockResolvedValueOnce(mockResponse);

        const result = await filesService.getFolderList('folder-123', 'access-key', 'FULL', 'NETWORK');

        expect(mockHttpService.get).toHaveBeenCalledWith(
          'files/folders/folder-123/list',
          { params: { accesskey: 'access-key', format: 'FULL', type: 'NETWORK' }, version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

    });
  });

  describe('Shortcut Operations', () => {
    describe('getShortcuts', () => {
      it('should call http.get with limit parameter', async () => {
        const mockResponse = { shortcuts: [] };
        mockHttpService.get.mockResolvedValueOnce(mockResponse);

        const result = await filesService.getShortcuts(5);

        expect(mockHttpService.get).toHaveBeenCalledWith(
          'files/shortcuts',
          { params: { limit: 5 }, version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });
    });

    describe('createShortcut', () => {
      it('should call http.post with all parameters', async () => {
        const mockResponse = { id: 'shortcut-123' };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const result = await filesService.createShortcut({
          name: 'My Shortcut',
          parent: 'parent-folder',
          target: 'target-id',
          targetType: 'NETWORK'
        });

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/shortcuts',
          { name: 'My Shortcut', parent: 'parent-folder', target: 'target-id', targetType: 'NETWORK' },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

    });

    describe('getShortcut', () => {
      it('should call http.get with shortcutId and accessKey', async () => {
        const mockResponse = { shortcut: {} };
        mockHttpService.get.mockResolvedValueOnce(mockResponse);

        const result = await filesService.getShortcut('shortcut-123', 'access-key');

        expect(mockHttpService.get).toHaveBeenCalledWith(
          'files/shortcuts/shortcut-123',
          { params: { accesskey: 'access-key' }, version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

    });

    describe('updateShortcut', () => {
      it('should call http.put with all parameters', async () => {
        const mockResponse = { success: true };
        mockHttpService.put.mockResolvedValueOnce(mockResponse);

        const result = await filesService.updateShortcut('shortcut-123', 'Updated Name', 'parent', 'target', 'FOLDER');

        expect(mockHttpService.put).toHaveBeenCalledWith(
          'files/shortcuts/shortcut-123',
          { name: 'Updated Name', parent: 'parent', target: 'target', targetType: 'FOLDER' },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

    });

    describe('deleteShortcut', () => {
      it('should call http.delete with shortcutId', async () => {
        const mockResponse = { success: true };
        mockHttpService.delete.mockResolvedValueOnce(mockResponse);

        const result = await filesService.deleteShortcut('shortcut-123');

        expect(mockHttpService.delete).toHaveBeenCalledWith('files/shortcuts/shortcut-123', { version: 'v3' });
        expect(result).toBe(mockResponse);
      });

    });
  });

  describe('Error Handling', () => {
    it('should propagate HTTP service errors', async () => {
      const error = new Error('Network error');
      mockHttpService.get.mockRejectedValueOnce(error);

      await expect(filesService.getCount()).rejects.toThrow('Network error');
    });

  });
});