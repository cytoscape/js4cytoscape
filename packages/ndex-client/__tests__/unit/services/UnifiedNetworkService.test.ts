import { HTTPService } from '../../../src/services/HTTPService';
import { UnifiedNetworkService } from '../../../src/services/UnifiedNetworkService';

// Mock the HTTPService
jest.mock('../../../src/services/HTTPService');

const NETWORK_ID = '12345678-1234-1234-1234-123456789abc';

describe('UnifiedNetworkService', () => {
  let networkService: UnifiedNetworkService;
  let mockHttpService: jest.Mocked<HTTPService>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockHttpService = new HTTPService() as jest.Mocked<HTTPService>;
    networkService = new UnifiedNetworkService(mockHttpService);
  });

  describe('createNetworkDOI', () => {
    it('should post a pre-certified DOI request when isCertified is false', async () => {
      mockHttpService.post.mockResolvedValueOnce(undefined);

      await networkService.createNetworkDOI({
        networkId: NETWORK_ID,
        isCertified: false,
        contactEmail: 'user@example.com'
      });

      expect(mockHttpService.post).toHaveBeenCalledWith(
        'admin/request',
        {
          type: 'DOI',
          networkId: NETWORK_ID,
          properties: { contactEmail: 'user@example.com' },
          isCertified: false
        },
        { version: 'v2' }
      );
    });
  });

  describe('updateNetworkReference', () => {
    it('should put the reference to the v2 network reference endpoint', async () => {
      mockHttpService.put.mockResolvedValueOnce(undefined);

      await networkService.updateNetworkReference(
        NETWORK_ID,
        'Pratt D, et al. <strong>NDEx, the Network Data Exchange.</strong>'
      );

      expect(mockHttpService.put).toHaveBeenCalledWith(
        `network/${NETWORK_ID}/reference`,
        { reference: 'Pratt D, et al. <strong>NDEx, the Network Data Exchange.</strong>' },
        { version: 'v2' }
      );
    });

    // The server responds 400 "Field reference is missing in the object." for a blank
    // reference, so fail locally rather than spending a round trip on a known rejection.
    it.each([
      ['an empty string', ''],
      ['whitespace only', '   '],
      ['undefined', undefined as unknown as string]
    ])('should reject %s without calling the server', async (_label, value) => {
      await expect(
        networkService.updateNetworkReference(NETWORK_ID, value)
      ).rejects.toThrow('reference is required');

      expect(mockHttpService.put).not.toHaveBeenCalled();
    });

    it('should propagate a 403 from an already-certified network', async () => {
      const forbidden = Object.assign(new Error('Request failed with status code 403'), {
        response: {
          status: 403,
          data: {
            message: 'This network has already been certified, updating reference is not allowed.'
          }
        }
      });
      mockHttpService.put.mockRejectedValueOnce(forbidden);

      await expect(
        networkService.updateNetworkReference(NETWORK_ID, 'a reference')
      ).rejects.toBe(forbidden);
    });
  });
});
