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
        const mockResponse = { uuid: 'new-uuid', modificationTime: 1234567890 };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const result = await filesService.copyFile({
          fileId: 'from-uuid',
          targetId: 'target-folder-uuid',
          type: 'NETWORK',
          accessKey: 'access-key'
        });

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/copy',
          { fileId: 'from-uuid', type: 'NETWORK', targetId: 'target-folder-uuid' },
          { params: { accesskey: 'access-key' }, version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

      it('should call http.post without accesskey when not provided', async () => {
        const mockResponse = { uuid: 'new-uuid', modificationTime: 1234567890 };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const result = await filesService.copyFile({
          fileId: 'from-uuid',
          targetId: 'target-folder-uuid',
          type: 'NETWORK'
        });

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/copy',
          { fileId: 'from-uuid', type: 'NETWORK', targetId: 'target-folder-uuid' },
          { params: {}, version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

      it('should throw error when trying to copy a folder', async () => {
        expect(() => filesService.copyFile({
          fileId: 'folder-uuid',
          targetId: 'target-folder-uuid',
          type: 'FOLDER'
        })).toThrow('Folder copying is not supported. Only NETWORK and SHORTCUT types are allowed.');
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

      it('should validate member data with null permissions for revocation', () => {
        const validData = {
          members: {
            '12345678-1234-1234-1234-123456789abc': 'READ' as Permission,
            '87654321-4321-4321-4321-cba987654321': null
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
    const validRequest = { files: validFiles, members: validMembers };

    describe('updateMember', () => {
      it('should call http.post with validated data', async () => {
        const mockResponse = { '12345678-1234-1234-1234-123456789abc': 'network permission granted' };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const result = await filesService.updateMember(validRequest);

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/sharing/members',
          { files: validFiles, members: validMembers },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

      it('should throw error for invalid files data', () => {
        const invalidRequest = {
          files: { 'invalid-uuid': 'NETWORK' as const },
          members: validMembers
        };

        expect(() => filesService.updateMember(invalidRequest)).toThrow('Invalid UUID format');
        expect(mockHttpService.post).not.toHaveBeenCalled();
      });

      it('should support permission revocation with null values', async () => {
        const mockResponse = { '12345678-1234-1234-1234-123456789abc': 'network permission revoked' };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const revokeRequest = {
          files: validFiles,
          members: { '87654321-4321-4321-4321-cba987654321': null }
        };

        const result = await filesService.updateMember(revokeRequest);

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/sharing/members',
          { files: validFiles, members: { '87654321-4321-4321-4321-cba987654321': null } },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });
    });

    describe('listMembers', () => {
      it('should call http.post with correct parameters', async () => {
        const mockResponse = [
          {
            '12345678-1234-1234-1234-123456789abc': {
              type: 'NETWORK',
              members: {
                'user1-uuid-1234-5678-9abc-def012345678': 'READ',
                'user2-uuid-8765-4321-fedc-ba0987654321': 'WRITE'
              }
            }
          }
        ];
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const files = { '12345678-1234-1234-1234-123456789abc': 'NETWORK' as const };
        const result = await filesService.listMembers(files);

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/sharing/members/list',
          files,
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

      it('should return properly typed FilePermissionList structure', async () => {
        const mockResponse = [
          {
            '12345678-1234-1234-1234-123456789abc': {
              type: 'NETWORK',
              members: {
                'user1-uuid-1234-5678-9abc-def012345678': 'READ',
                'user2-uuid-8765-4321-fedc-ba0987654321': 'WRITE',
                'user3-uuid-1111-2222-3333-444444444444': 'ADMIN'
              }
            }
          },
          {
            '87654321-4321-4321-4321-876543210fed': {
              type: 'FOLDER',
              members: {
                'user4-uuid-aaaa-bbbb-cccc-dddddddddddd': 'ADMIN',
                'user5-uuid-eeee-ffff-0000-111111111111': 'READ'
              }
            }
          }
        ];
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const files = {
          '12345678-1234-1234-1234-123456789abc': 'NETWORK' as const,
          '87654321-4321-4321-4321-876543210fed': 'FOLDER' as const
        };
        const result = await filesService.listMembers(files);

        // Verify the result structure matches FilePermissionList type
        expect(result).toHaveLength(2);

        // Check first file permissions
        const networkFile = result[0]['12345678-1234-1234-1234-123456789abc'];
        expect(networkFile).toBeDefined();
        expect(networkFile.type).toBe('NETWORK');
        expect(networkFile.members).toEqual({
          'user1-uuid-1234-5678-9abc-def012345678': 'READ',
          'user2-uuid-8765-4321-fedc-ba0987654321': 'WRITE',
          'user3-uuid-1111-2222-3333-444444444444': 'ADMIN'
        });

        // Check second file permissions
        const folderFile = result[1]['87654321-4321-4321-4321-876543210fed'];
        expect(folderFile).toBeDefined();
        expect(folderFile.type).toBe('FOLDER');
        expect(folderFile.members).toEqual({
          'user4-uuid-aaaa-bbbb-cccc-dddddddddddd': 'ADMIN',
          'user5-uuid-eeee-ffff-0000-111111111111': 'READ'
        });
      });

      it('should handle empty members for a file', async () => {
        const mockResponse = [
          {
            '12345678-1234-1234-1234-123456789abc': {
              type: 'NETWORK',
              members: {}
            }
          }
        ];
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const files = { '12345678-1234-1234-1234-123456789abc': 'NETWORK' as const };
        const result = await filesService.listMembers(files);

        expect(result).toHaveLength(1);
        const networkFile = result[0]['12345678-1234-1234-1234-123456789abc'];
        expect(networkFile.type).toBe('NETWORK');
        expect(networkFile.members).toEqual({});
      });

      it('should throw error for invalid files data', () => {
        const invalidFiles = { 'invalid-uuid': 'NETWORK' as const };
        expect(() => filesService.listMembers(invalidFiles)).toThrow('Invalid UUID format');
        expect(mockHttpService.post).not.toHaveBeenCalled();
      });
    });

    describe('transferOwnership', () => {
      it('should call http.post with correct parameters', async () => {
        const mockResponse = { success: true };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const networks = ['12345678-1234-1234-1234-123456789abc', '87654321-4321-4321-4321-876543210fed'];
        const newOwner = 'new-owner-uuid';
        const result = await filesService.transferOwnership({ networks, newOwner });

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/sharing/transfer',
          { networks, newOwner },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });
    });

    describe('listShares', () => {
      it('should call http.post with limit parameter', async () => {
        const mockResponse = { shares: [] };
        mockHttpService.get.mockResolvedValueOnce(mockResponse);

        const result = await filesService.listShares(10);

        expect(mockHttpService.get).toHaveBeenCalledWith(
          'files/sharing/list',
          { params: { limit: 10 }, version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

      it('should call http.post without parameters when limit not provided', async () => {
        const mockResponse = { shares: [] };
        mockHttpService.get.mockResolvedValueOnce(mockResponse);

        const result = await filesService.listShares();

        expect(mockHttpService.get).toHaveBeenCalledWith(
          'files/sharing/list',
          { params: {}, version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });
    });

    describe('share', () => {
      it('should call http.post with validated files and return access keys', async () => {
        const mockResponse = {
          '12345678-1234-1234-1234-123456789abc': 'access-key-abc123',
          '87654321-4321-4321-4321-876543210fed': 'access-key-def456'
        };
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const files = {
          '12345678-1234-1234-1234-123456789abc': 'NETWORK' as const,
          '87654321-4321-4321-4321-876543210fed': 'FOLDER' as const
        };
        const result = await filesService.share(files);

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'files/sharing/share',
          { files },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
        expect(result['12345678-1234-1234-1234-123456789abc']).toBe('access-key-abc123');
        expect(result['87654321-4321-4321-4321-876543210fed']).toBe('access-key-def456');
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
      it('should call http.put with all folder properties including parent', async () => {
        mockHttpService.put.mockResolvedValueOnce(undefined);

        const folderData = {
          name: 'Updated Folder Name',
          description: 'Updated folder description',
          parent: 'parent-folder-uuid'
        };

        const result = await filesService.updateFolder('folder-123', folderData);

        expect(mockHttpService.put).toHaveBeenCalledWith(
          'files/folders/folder-123',
          folderData,
          { version: 'v3' }
        );
        expect(result).toBeUndefined();
      });

      it('should call http.put without parent when parent is omitted', async () => {
        mockHttpService.put.mockResolvedValueOnce(undefined);

        const folderData = {
          name: 'Home Folder',
          description: 'Folder in home directory'
        };

        const result = await filesService.updateFolder('folder-456', folderData);

        expect(mockHttpService.put).toHaveBeenCalledWith(
          'files/folders/folder-456',
          folderData,
          { version: 'v3' }
        );
        expect(result).toBeUndefined();
      });

      it('should handle folder data with explicit parent undefined', async () => {
        mockHttpService.put.mockResolvedValueOnce(undefined);

        const folderData = {
          name: 'Explicit Home Folder',
          description: 'Folder with explicit undefined parent',
          parent: undefined
        };

        const result = await filesService.updateFolder('folder-789', folderData);

        expect(mockHttpService.put).toHaveBeenCalledWith(
          'files/folders/folder-789',
          folderData,
          { version: 'v3' }
        );
        expect(result).toBeUndefined();
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

      it('should return FileListItem array with correct structure', async () => {
        const mockResponse = [
          {
            uuid: '46933b60-721c-11f0-a8e5-005056aeb0b3',
            type: 'FOLDER',
            name: 'test folder',
            modificationTime: 1754412621719,
            attributes: { description: null },
            isShared: false
          },
          {
            uuid: 'd512af15-89e6-11f0-8e16-005056aeb0b3',
            type: 'NETWORK',
            name: 'Copy of U-2 OS Multi-scale Integrated Cell Map',
            modificationTime: 1757028495896,
            attributes: {
              visibility: 'PRIVATE',
              edges: 298,
              description: null
            },
            isReadOnly: false,
            warnings: [],
            isCompleted: true,
            isShared: false
          },
          {
            uuid: 'cab37402-8c61-11f0-8e16-005056aeb0b3',
            type: 'NETWORK',
            modificationTime: 1757301208898,
            attributes: {
              visibility: 'PRIVATE',
              edges: 87,
              description: null
            },
            isReadOnly: false,
            warnings: [],
            isCompleted: true,
            isShared: false
          },
          {
            uuid: '8619e1d6-9446-11f0-8d0a-005056aeb0b3',
            type: 'SHORTCUT',
            name: 'test folder 3 - Shortcut',
            modificationTime: 1758169106695,
            attributes: {
              target_type: 'FOLDER',
              target_status: 'ACTIVE',
              target: '7a01d498-907c-11f0-b46f-005056aeb0b3'
            }
          }
        ];
        mockHttpService.get.mockResolvedValueOnce(mockResponse);

        const result = await filesService.getFolderList('folder-123');

        expect(result).toHaveLength(4);

        // Test folder item
        expect(result[0]).toMatchObject({
          uuid: expect.any(String),
          type: 'FOLDER',
          name: expect.any(String),
          modificationTime: expect.any(Number),
          attributes: expect.any(Object),
          isShared: expect.any(Boolean)
        });

        // Test network item with optional properties
        expect(result[1]).toMatchObject({
          uuid: expect.any(String),
          type: 'NETWORK',
          name: expect.any(String),
          modificationTime: expect.any(Number),
          attributes: expect.any(Object),
          isReadOnly: expect.any(Boolean),
          warnings: expect.any(Array),
          isCompleted: expect.any(Boolean),
          isShared: expect.any(Boolean)
        });

        // Test network item without name (optional property)
        expect(result[2]).toMatchObject({
          uuid: expect.any(String),
          type: 'NETWORK',
          modificationTime: expect.any(Number),
          attributes: expect.any(Object),
          isReadOnly: expect.any(Boolean),
          warnings: expect.any(Array),
          isCompleted: expect.any(Boolean),
          isShared: expect.any(Boolean)
        });
        expect(result[2].name).toBeUndefined();

        // Test shortcut item
        expect(result[3]).toMatchObject({
          uuid: expect.any(String),
          type: 'SHORTCUT',
          name: expect.any(String),
          modificationTime: expect.any(Number),
          attributes: expect.any(Object)
        });
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
      it('should call http.put with shortcut object including parent', async () => {
        const mockResponse = { success: true };
        mockHttpService.put.mockResolvedValueOnce(mockResponse);

        const shortcutObject = {
          name: 'Updated Shortcut Name',
          target: 'target-network-uuid',
          targetType: 'NETWORK' as const,
          parent: 'parent-folder-uuid'
        };

        const result = await filesService.updateShortcut('shortcut-123', shortcutObject);

        expect(mockHttpService.put).toHaveBeenCalledWith(
          'files/shortcuts/shortcut-123',
          {
            name: 'Updated Shortcut Name',
            target: 'target-network-uuid',
            targetType: 'NETWORK',
            parent: 'parent-folder-uuid'
          },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

      it('should call http.put with parent as null when parent is omitted', async () => {
        const mockResponse = { success: true };
        mockHttpService.put.mockResolvedValueOnce(mockResponse);

        const shortcutObject = {
          name: 'Home Directory Shortcut',
          target: 'target-folder-uuid',
          targetType: 'FOLDER' as const
          // parent omitted
        };

        const result = await filesService.updateShortcut('shortcut-456', shortcutObject);

        expect(mockHttpService.put).toHaveBeenCalledWith(
          'files/shortcuts/shortcut-456',
          {
            name: 'Home Directory Shortcut',
            target: 'target-folder-uuid',
            targetType: 'FOLDER',
            parent: null
          },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

      it('should call http.put with parent as null when parent is explicitly undefined', async () => {
        const mockResponse = { success: true };
        mockHttpService.put.mockResolvedValueOnce(mockResponse);

        const shortcutObject = {
          name: 'Explicit Undefined Parent',
          target: 'target-shortcut-uuid',
          targetType: 'SHORTCUT' as const,
          parent: undefined
        };

        const result = await filesService.updateShortcut('shortcut-789', shortcutObject);

        expect(mockHttpService.put).toHaveBeenCalledWith(
          'files/shortcuts/shortcut-789',
          {
            name: 'Explicit Undefined Parent',
            target: 'target-shortcut-uuid',
            targetType: 'SHORTCUT',
            parent: null
          },
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

  describe('Visibility Operations', () => {
    describe('setVisibility', () => {
      it('should call http.post with correct parameters', async () => {
        const mockResponse = undefined;
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const files = {
          '12345678-1234-1234-1234-123456789abc': 'NETWORK' as const,
          '87654321-4321-4321-4321-876543210fed': 'FOLDER' as const
        };
        const visibility = 'PUBLIC';

        const result = await filesService.setVisibility({ files, visibility });

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'batch/files/setvisibility',
          { files, visibility },
          { version: 'v3' }
        );
        expect(result).toBe(mockResponse);
      });

      it('should handle different visibility levels', async () => {
        const mockResponse = undefined;
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const files = { '12345678-1234-1234-1234-123456789abc': 'NETWORK' as const };
        const visibility = 'PRIVATE';

        await filesService.setVisibility({ files, visibility });

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'batch/files/setvisibility',
          { files, visibility: 'PRIVATE' },
          { version: 'v3' }
        );
      });

      it('should handle multiple file types', async () => {
        const mockResponse = undefined;
        mockHttpService.post.mockResolvedValueOnce(mockResponse);

        const files = {
          '12345678-1234-1234-1234-123456789abc': 'NETWORK' as const,
          '87654321-4321-4321-4321-876543210fed': 'FOLDER' as const,
          '11111111-2222-3333-4444-555555555555': 'SHORTCUT' as const
        };
        const visibility = 'PUBLIC';

        await filesService.setVisibility({ files, visibility });

        expect(mockHttpService.post).toHaveBeenCalledWith(
          'batch/files/setvisibility',
          { files, visibility },
          { version: 'v3' }
        );
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