import nock from 'nock';
import { CyNDExService } from '../../../src/services/CyNDExService';

// Mock repeat request function that returns the request body
const repeatRequest = (_uri: string, requestBody: any) => {
  return [200, requestBody];
};

describe('CyNDExService', () => {
  const CORS_HEADER = {
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  };

  const SERVER = 'http://127.0.0.1:1234';
  const DUMMY_USERNAME = 'dummy-username';
  const DUMMY_PASSWORD = 'dummy-password';
  const DUMMY_UUID = 'dummy-uuid';
  const DUMMY_TOKEN = 'dummy-token';
  const DEFAULT_SERVER = 'https://www.ndexbio.org/v2';

  const getNock = () => {
    return nock(SERVER).defaultReplyHeaders(CORS_HEADER);
  };

  beforeEach(() => {
    // Clean up any pending nock interceptors
    nock.cleanAll();
  });

  afterEach(() => {
    // Verify all nock interceptors were used
    if (!nock.isDone()) {
      console.warn('Unused nock interceptors:', nock.pendingMocks());
    }
    nock.cleanAll();
  });

  describe('Constructor and Configuration', () => {
    it('should create instance with default port', () => {
      const cyndex = new CyNDExService();
      expect(cyndex.port).toBe(1234);
    });

    it('should create instance with custom port', () => {
      const cyndex = new CyNDExService(8080);
      expect(cyndex.port).toBe(8080);
    });

    it('should set and get NDEx base URL', () => {
      const cyndex = new CyNDExService();
      cyndex.setNDExBaseURL('https://test.ndexbio.org');
      expect(cyndex.getNDExBaseURL()).toBe('https://test.ndexbio.org');
    });

    it('should default to correct NDEx base URL', () => {
      const cyndex = new CyNDExService();
      expect(cyndex.getNDExBaseURL()).toBe('https://www.ndexbio.org');
    });

    it('should build correct cyRestURL', () => {
      const cyndex = new CyNDExService(8080);
      expect(cyndex.cyRestURL()).toBe('http://127.0.0.1:8080');
    });
  });

  describe('Authentication', () => {
    it('should set basic authentication', () => {
      const cyndex = new CyNDExService();
      cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);
      // Auth is tested indirectly through API calls
    });

    it('should set OAuth token', () => {
      const cyndex = new CyNDExService();
      cyndex.setAuthToken(DUMMY_TOKEN);
      // Auth is tested indirectly through API calls
    });

    it('should clear authentication', () => {
      const cyndex = new CyNDExService();
      cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);
      cyndex.clearAuth();
      // Auth clearing is tested indirectly through API calls
    });
  });

  describe('Status Operations', () => {
    it('should get CyNDEx status', async () => {
      const cyndex = new CyNDExService();
      const expectedResponse = { dummy: 'dummy' };

      getNock()
        .get('/cyndex2/v1')
        .reply(200, expectedResponse);

      const response = await cyndex.getCyNDExStatus();
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('Network Summary Operations', () => {
    it('should get network summary for current network', async () => {
      const cyndex = new CyNDExService();
      const expectedResponse = { dummy: 'dummy' };

      getNock()
        .get('/cyndex2/v1/networks/current')
        .reply(200, expectedResponse);

      const response = await cyndex.getCytoscapeNetworkSummary();
      expect(response).toEqual(expectedResponse);
    });

    it('should get network summary for specific SUID', async () => {
      const cyndex = new CyNDExService();
      const expectedResponse = { dummy: 'dummy' };

      getNock()
        .get('/cyndex2/v1/networks/1')
        .reply(200, expectedResponse);

      const response = await cyndex.getCytoscapeNetworkSummary('1');
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('Export Operations', () => {
    it('should export current network with basic auth', async () => {
      const cyndex = new CyNDExService();
      cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);

      getNock()
        .post('/cyndex2/v1/networks/current')
        .reply(repeatRequest);

      const response = await cyndex.postCytoscapeNetworkToNDEx();
      expect(response.serverUrl).toBe(DEFAULT_SERVER);
      expect(response.username).toBe(DUMMY_USERNAME);
      expect(response.password).toBe(DUMMY_PASSWORD);
    });

    it('should export specific network SUID with basic auth', async () => {
      const cyndex = new CyNDExService();
      cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);

      getNock()
        .post('/cyndex2/v1/networks/1')
        .reply(repeatRequest);

      const response = await cyndex.postCytoscapeNetworkToNDEx('1');
      expect(response.serverUrl).toBe(DEFAULT_SERVER);
      expect(response.username).toBe(DUMMY_USERNAME);
      expect(response.password).toBe(DUMMY_PASSWORD);
    });

    it('should update current network with basic auth', async () => {
      const cyndex = new CyNDExService();
      cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);

      getNock()
        .put('/cyndex2/v1/networks/current')
        .reply(repeatRequest);

      const response = await cyndex.putCytoscapeNetworkInNDEx('current', DUMMY_UUID);
      expect(response.serverUrl).toBe(DEFAULT_SERVER);
      expect(response.uuid).toBe(DUMMY_UUID);
      expect(response.username).toBe(DUMMY_USERNAME);
      expect(response.password).toBe(DUMMY_PASSWORD);
    });

    it('should update specific network SUID with basic auth', async () => {
      const cyndex = new CyNDExService();
      cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);

      getNock()
        .put('/cyndex2/v1/networks/1')
        .reply(repeatRequest);

      const response = await cyndex.putCytoscapeNetworkInNDEx('1', DUMMY_UUID);
      expect(response.serverUrl).toBe(DEFAULT_SERVER);
      expect(response.uuid).toBe(DUMMY_UUID);
      expect(response.username).toBe(DUMMY_USERNAME);
      expect(response.password).toBe(DUMMY_PASSWORD);
    });
  });

  describe('Import Operations', () => {
    it('should import network with basic auth', async () => {
      const cyndex = new CyNDExService();
      cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);

      getNock()
        .post('/cyndex2/v1/networks')
        .reply(repeatRequest);

      const response = await cyndex.postNDExNetworkToCytoscape(DUMMY_UUID);
      expect(response.uuid).toBe(DUMMY_UUID);
      expect(response.serverUrl).toBe(DEFAULT_SERVER);
      expect(response.username).toBe(DUMMY_USERNAME);
      expect(response.password).toBe(DUMMY_PASSWORD);
      expect(response.accessKey).toBeUndefined();
    });

    it('should import network with OAuth token', async () => {
      const cyndex = new CyNDExService();
      cyndex.setAuthToken(DUMMY_TOKEN);

      getNock()
        .post('/cyndex2/v1/networks')
        .reply(repeatRequest);

      const response = await cyndex.postNDExNetworkToCytoscape(DUMMY_UUID);
      expect(response.uuid).toBe(DUMMY_UUID);
      expect(response.serverUrl).toBe(DEFAULT_SERVER);
      expect(response.idToken).toBe(DUMMY_TOKEN);
      expect(response.accessKey).toBeUndefined();
    });

    it('should import network with access key', async () => {
      const cyndex = new CyNDExService();
      const DUMMY_ACCESS_KEY = 'dummy-access-key';
      
      cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);

      getNock()
        .post('/cyndex2/v1/networks')
        .reply(repeatRequest);

      const response = await cyndex.postNDExNetworkToCytoscape(DUMMY_UUID, DUMMY_ACCESS_KEY);
      expect(response.uuid).toBe(DUMMY_UUID);
      expect(response.accessKey).toBe(DUMMY_ACCESS_KEY);
      expect(response.serverUrl).toBe(DEFAULT_SERVER);
      expect(response.username).toBe(DUMMY_USERNAME);
      expect(response.password).toBe(DUMMY_PASSWORD);
    });

    it('should import network with createView option', async () => {
      const cyndex = new CyNDExService();
      cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);

      getNock()
        .post('/cyndex2/v1/networks')
        .reply(repeatRequest);

      const response = await cyndex.postNDExNetworkToCytoscape(DUMMY_UUID, undefined, true);
      expect(response.uuid).toBe(DUMMY_UUID);
      expect(response.createView).toBe(true);
      expect(response.serverUrl).toBe(DEFAULT_SERVER);
      expect(response.username).toBe(DUMMY_USERNAME);
      expect(response.password).toBe(DUMMY_PASSWORD);
    });
  });

  describe('CX/CX2 Import Operations', () => {
    it('should import CX network data', async () => {
      const cyndex = new CyNDExService();
      const DUMMY_CX = { 'dummy-field': 'dummy-value' };

      getNock()
        .post('/cyndex2/v1/networks/cx')
        .reply(repeatRequest);

      const response = await cyndex.postCXNetworkToCytoscape(DUMMY_CX);
      expect(response['dummy-field']).toBe('dummy-value');
    });

    it('should import CX2 network data', async () => {
      const cyndex = new CyNDExService();
      const DUMMY_CX2_STRING = '{"dummy-field": "dummy-value"}';
      const TITLE = 'Test Network';
      const COLLECTION = 'Test Collection';

      getNock()
        .post('/v1/networks')
        .query({ format: 'cx2', collection: COLLECTION, title: TITLE })
        .reply(repeatRequest);

      const response = await cyndex.postCX2NetworkToCytoscape(DUMMY_CX2_STRING, TITLE, COLLECTION);
      // The repeatRequest function parses JSON strings, so we expect the parsed object
      expect(response).toEqual({ 'dummy-field': 'dummy-value' });
    });
  });

  describe('Error Handling', () => {
    it('should handle HTTP errors gracefully', async () => {
      const cyndex = new CyNDExService();

      getNock()
        .get('/cyndex2/v1')
        .reply(500, { error: 'Internal Server Error' });

      await expect(cyndex.getCyNDExStatus()).rejects.toThrow();
    });

    it('should handle network errors gracefully', async () => {
      const cyndex = new CyNDExService();

      getNock()
        .get('/cyndex2/v1')
        .replyWithError('Network error');

      await expect(cyndex.getCyNDExStatus()).rejects.toThrow();
    });
  });

  describe('Static Properties', () => {
    it('should return correct cyRestBaseURL', () => {
      expect(CyNDExService.cyRestBaseURL).toBe('http://127.0.0.1');
    });
  });
});