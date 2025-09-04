import { WorkspaceService } from '../../../src/services/WorkspaceService';
import { HTTPService } from '../../../src/services/HTTPService';
import { CyWebWorkspace } from '../../../src/types';

// Mock HTTPService
jest.mock('../../../src/services/HTTPService');

describe('WorkspaceService', () => {
  let workspaceService: WorkspaceService;
  let mockHttpService: jest.Mocked<HTTPService>;

  beforeEach(() => {
    mockHttpService = new HTTPService() as jest.Mocked<HTTPService>;
    workspaceService = new WorkspaceService(mockHttpService);
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with HTTPService', () => {
      expect(workspaceService).toBeInstanceOf(WorkspaceService);
      expect(workspaceService['http']).toBe(mockHttpService);
    });
  });

  describe('createCyWebWorkspace', () => {
    it('should call http.post with correct parameters', async () => {
      const mockResponse = 'workspace-uuid-123';
      const workspaceData: CyWebWorkspace = {
        name: 'Test Workspace',
        description: 'A test workspace',
        networkIds: []
      };

      mockHttpService.post.mockResolvedValueOnce(mockResponse);

      const result = await workspaceService.createCyWebWorkspace(workspaceData);

      expect(mockHttpService.post).toHaveBeenCalledWith(
        'workspaces',
        workspaceData,
        { version: 'v3' }
      );
      expect(result).toBe(mockResponse);
    });

    it('should handle workspace with network IDs', async () => {
      const mockResponse = 'workspace-uuid-456';
      const workspaceData: CyWebWorkspace = {
        name: 'Network Workspace',
        description: 'Workspace with networks',
        networkIds: ['net-1', 'net-2']
      };

      mockHttpService.post.mockResolvedValueOnce(mockResponse);

      const result = await workspaceService.createCyWebWorkspace(workspaceData);

      expect(mockHttpService.post).toHaveBeenCalledWith(
        'workspaces',
        workspaceData,
        { version: 'v3' }
      );
      expect(result).toBe(mockResponse);
    });
  });

  describe('getCyWebWorkspace', () => {
    it('should call http.get with correct parameters', async () => {
      const workspaceId = 'workspace-123';
      const mockWorkspace: CyWebWorkspace = {
        name: 'Retrieved Workspace',
        description: 'A retrieved workspace',
        networkIds: ['net-1']
      };

      mockHttpService.get.mockResolvedValueOnce(mockWorkspace);

      const result = await workspaceService.getCyWebWorkspace(workspaceId);

      expect(mockHttpService.get).toHaveBeenCalledWith(
        'workspaces/workspace-123',
        { version: 'v3' }
      );
      expect(result).toBe(mockWorkspace);
    });

    it('should handle empty workspace', async () => {
      const workspaceId = 'empty-workspace';
      const mockWorkspace: CyWebWorkspace = {
        name: 'Empty Workspace',
        description: '',
        networkIds: []
      };

      mockHttpService.get.mockResolvedValueOnce(mockWorkspace);

      const result = await workspaceService.getCyWebWorkspace(workspaceId);

      expect(mockHttpService.get).toHaveBeenCalledWith(
        'workspaces/empty-workspace',
        { version: 'v3' }
      );
      expect(result).toBe(mockWorkspace);
    });
  });

  describe('deleteCyWebWorkspace', () => {
    it('should call http.delete with correct parameters', async () => {
      const workspaceId = 'workspace-to-delete';

      mockHttpService.delete.mockResolvedValueOnce(undefined);

      const result = await workspaceService.deleteCyWebWorkspace(workspaceId);

      expect(mockHttpService.delete).toHaveBeenCalledWith(
        'workspaces/workspace-to-delete',
        { version: 'v3' }
      );
      expect(result).toBeUndefined();
    });
  });

  describe('updateCyWebWorkspace', () => {
    it('should call http.put with correct parameters', async () => {
      const workspaceId = 'workspace-update';
      const updatedWorkspace: CyWebWorkspace = {
        name: 'Updated Workspace',
        description: 'Updated description',
        networkIds: ['net-1', 'net-2', 'net-3']
      };

      mockHttpService.put.mockResolvedValueOnce(undefined);

      const result = await workspaceService.updateCyWebWorkspace(workspaceId, updatedWorkspace);

      expect(mockHttpService.put).toHaveBeenCalledWith(
        'workspaces/workspace-update',
        updatedWorkspace,
        { version: 'v3' }
      );
      expect(result).toBeUndefined();
    });

    it('should handle partial updates', async () => {
      const workspaceId = 'workspace-partial';
      const partialWorkspace: CyWebWorkspace = {
        name: 'Partially Updated',
        description: 'Only name changed',
        networkIds: []
      };

      mockHttpService.put.mockResolvedValueOnce(undefined);

      const result = await workspaceService.updateCyWebWorkspace(workspaceId, partialWorkspace);

      expect(mockHttpService.put).toHaveBeenCalledWith(
        'workspaces/workspace-partial',
        partialWorkspace,
        { version: 'v3' }
      );
      expect(result).toBeUndefined();
    });
  });

  describe('updateCyWebWorkspaceName', () => {
    it('should call http.put with correct parameters for name update', async () => {
      const workspaceId = 'workspace-name-update';
      const newName = 'New Workspace Name';

      mockHttpService.put.mockResolvedValueOnce(undefined);

      const result = await workspaceService.updateCyWebWorkspaceName(workspaceId, newName);

      expect(mockHttpService.put).toHaveBeenCalledWith(
        'workspaces/workspace-name-update/name',
        { name: newName },
        { version: 'v3' }
      );
      expect(result).toBeUndefined();
    });

    it('should handle empty name', async () => {
      const workspaceId = 'workspace-empty-name';
      const newName = '';

      mockHttpService.put.mockResolvedValueOnce(undefined);

      const result = await workspaceService.updateCyWebWorkspaceName(workspaceId, newName);

      expect(mockHttpService.put).toHaveBeenCalledWith(
        'workspaces/workspace-empty-name/name',
        { name: '' },
        { version: 'v3' }
      );
      expect(result).toBeUndefined();
    });
  });

  describe('updateCyWebWorkspaceNetworks', () => {
    it('should call http.put with correct parameters for network update', async () => {
      const workspaceId = 'workspace-networks';
      const networkIds = ['net-1', 'net-2', 'net-3'];

      mockHttpService.put.mockResolvedValueOnce(undefined);

      const result = await workspaceService.updateCyWebWorkspaceNetworks(workspaceId, networkIds);

      expect(mockHttpService.put).toHaveBeenCalledWith(
        'workspaces/workspace-networks/networkids',
        networkIds,
        { version: 'v3' }
      );
      expect(result).toBeUndefined();
    });

    it('should handle empty network list', async () => {
      const workspaceId = 'workspace-no-networks';
      const networkIds: string[] = [];

      mockHttpService.put.mockResolvedValueOnce(undefined);

      const result = await workspaceService.updateCyWebWorkspaceNetworks(workspaceId, networkIds);

      expect(mockHttpService.put).toHaveBeenCalledWith(
        'workspaces/workspace-no-networks/networkids',
        [],
        { version: 'v3' }
      );
      expect(result).toBeUndefined();
    });

    it('should handle single network', async () => {
      const workspaceId = 'workspace-single-network';
      const networkIds = ['single-net'];

      mockHttpService.put.mockResolvedValueOnce(undefined);

      const result = await workspaceService.updateCyWebWorkspaceNetworks(workspaceId, networkIds);

      expect(mockHttpService.put).toHaveBeenCalledWith(
        'workspaces/workspace-single-network/networkids',
        ['single-net'],
        { version: 'v3' }
      );
      expect(result).toBeUndefined();
    });
  });

  describe('getUserCyWebWorkspaces', () => {
    it('should call http.get with correct endpoint', async () => {
      const mockUser = { externalId: 'user-123' };
      const mockWorkspaces: CyWebWorkspace[] = [
        {
          name: 'Workspace 1',
          description: 'First workspace',
          networkIds: ['net-1']
        },
        {
          name: 'Workspace 2', 
          description: 'Second workspace',
          networkIds: ['net-2', 'net-3']
        }
      ];

      // Mock the getCurrentUser call within the method
      mockHttpService.get
        .mockResolvedValueOnce(mockUser) // First call for getCurrentUser
        .mockResolvedValueOnce(mockWorkspaces); // Second call for workspaces

      const result = await workspaceService.getUserCyWebWorkspaces();

      expect(mockHttpService.get).toHaveBeenCalledTimes(2);
      expect(mockHttpService.get).toHaveBeenNthCalledWith(1, 'user', { params: { valid: true } });
      expect(mockHttpService.get).toHaveBeenNthCalledWith(2, 'users/user-123/workspaces', { version: 'v3' });
      expect(result).toBe(mockWorkspaces);
    });

    it('should handle empty workspace list', async () => {
      const mockUser = { externalId: 'user-no-workspaces' };
      const mockWorkspaces: CyWebWorkspace[] = [];

      mockHttpService.get
        .mockResolvedValueOnce(mockUser)
        .mockResolvedValueOnce(mockWorkspaces);

      const result = await workspaceService.getUserCyWebWorkspaces();

      expect(mockHttpService.get).toHaveBeenCalledTimes(2);
      expect(mockHttpService.get).toHaveBeenNthCalledWith(1, 'user', { params: { valid: true } });
      expect(mockHttpService.get).toHaveBeenNthCalledWith(2, 'users/user-no-workspaces/workspaces', { version: 'v3' });
      expect(result).toEqual([]);
    });

    it('should propagate authentication errors', async () => {
      const authError = new Error('Authentication failed');
      mockHttpService.get.mockRejectedValueOnce(authError);

      await expect(workspaceService.getUserCyWebWorkspaces()).rejects.toThrow('Authentication failed');
      expect(mockHttpService.get).toHaveBeenCalledTimes(1);
      expect(mockHttpService.get).toHaveBeenCalledWith('user', { params: { valid: true } });
    });
  });

  describe('Error Handling', () => {
    it('should propagate HTTP service errors for create operation', async () => {
      const error = new Error('Network error');
      const workspaceData: CyWebWorkspace = {
        name: 'Error Workspace',
        description: 'This will fail',
        networkIds: []
      };

      mockHttpService.post.mockRejectedValueOnce(error);

      await expect(workspaceService.createCyWebWorkspace(workspaceData)).rejects.toThrow('Network error');
    });

    it('should propagate HTTP service errors for get operation', async () => {
      const error = new Error('Workspace not found');
      mockHttpService.get.mockRejectedValueOnce(error);

      await expect(workspaceService.getCyWebWorkspace('non-existent')).rejects.toThrow('Workspace not found');
    });

    it('should propagate HTTP service errors for delete operation', async () => {
      const error = new Error('Delete failed');
      mockHttpService.delete.mockRejectedValueOnce(error);

      await expect(workspaceService.deleteCyWebWorkspace('workspace-id')).rejects.toThrow('Delete failed');
    });

    it('should propagate HTTP service errors for update operations', async () => {
      const error = new Error('Update failed');
      const workspaceData: CyWebWorkspace = {
        name: 'Failed Update',
        description: 'This will fail',
        networkIds: []
      };

      mockHttpService.put.mockRejectedValueOnce(error);

      await expect(workspaceService.updateCyWebWorkspace('workspace-id', workspaceData)).rejects.toThrow('Update failed');
    });
  });

  describe('Integration Scenarios', () => {
    it('should handle complete workspace lifecycle', async () => {
      const workspaceData: CyWebWorkspace = {
        name: 'Lifecycle Workspace',
        description: 'Test lifecycle',
        networkIds: []
      };

      // Create
      mockHttpService.post.mockResolvedValueOnce('new-workspace-id');
      const createResult = await workspaceService.createCyWebWorkspace(workspaceData);
      expect(createResult).toBe('new-workspace-id');

      // Get
      mockHttpService.get.mockResolvedValueOnce(workspaceData);
      const getResult = await workspaceService.getCyWebWorkspace('new-workspace-id');
      expect(getResult).toBe(workspaceData);

      // Update name
      mockHttpService.put.mockResolvedValueOnce(undefined);
      await workspaceService.updateCyWebWorkspaceName('new-workspace-id', 'Updated Name');

      // Update networks
      mockHttpService.put.mockResolvedValueOnce(undefined);
      await workspaceService.updateCyWebWorkspaceNetworks('new-workspace-id', ['net-1']);

      // Delete
      mockHttpService.delete.mockResolvedValueOnce(undefined);
      await workspaceService.deleteCyWebWorkspace('new-workspace-id');

      expect(mockHttpService.post).toHaveBeenCalledTimes(1);
      expect(mockHttpService.get).toHaveBeenCalledTimes(1);
      expect(mockHttpService.put).toHaveBeenCalledTimes(2);
      expect(mockHttpService.delete).toHaveBeenCalledTimes(1);
    });
  });
});