/* global describe, it, before */

const { expect } = require('chai');
const nock = require('nock')

const { CyNDEx } = require('../dist/build/bundle.js');

describe('cyndex client tests', () => {

  const CORS_HEADER = {
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  };

  const SERVER = 'http://127.0.0.1:1234';

  const DUMMY_USERNAME = 'dummy-username';
  const DUMMY_PASSWORD = 'dummy-password';
  const DUMMY_UUID = 'dummy-uuid';
  const DUMMY_TOKEN = 'dummy-token';

  const DEFAULT_SERVER = 'http://public.ndexbio.org/v2'

  const getNock = () => {
    return nock(SERVER).defaultReplyHeaders(CORS_HEADER);
  }

  const repeatRequest = (uri, requestBody) => {
    //console.log(JSON.stringify(requestBody));
    return [
      200,
      requestBody
      //{ header: 'value' }, // optional headers
    ]
  }

  beforeEach(() => {

  });
  afterEach(() => {

  });

  it('get status', (done) => {
    const cyndex = new CyNDEx();

    const expectedresponse = {
      dummy: 'dummy'
    };

    getNock().get('/cyndex2/v1').query(
      actualQueryObject => {
        return true
      }
    ).reply(200, expectedresponse);

    cyndex.getCyNDExStatus().then((response) => {
      expect(JSON.stringify(response)).to.equal(JSON.stringify(expectedresponse));
      done();
    });
  });

  it('networkSummaryCurrent', (done) => {
    const cyndex = new CyNDEx();

    const expectedresponse = {
      dummy: 'dummy'
    };

    getNock().get('/cyndex2/v1/networks/current').query(
      actualQueryObject => {
        return true
      }
    ).reply(200, expectedresponse);

    cyndex.getCytoscapeNetworkSummary().then((response) => {
      expect(JSON.stringify(response)).to.equal(JSON.stringify(expectedresponse));
      done();
    });
  });

  it('networkSummarySUID', (done) => {
    const cyndex = new CyNDEx();

    const expectedresponse = {
      dummy: 'dummy'
    };

    getNock().get('/cyndex2/v1/networks/1').query(
      actualQueryObject => {
        return true
      }
    ).reply(200, expectedresponse);

    cyndex.getCytoscapeNetworkSummary(1).then((response) => {
      expect(JSON.stringify(response)).to.equal(JSON.stringify(expectedresponse));
      done();
    });
  });

  it('exportNetworkCurrent', (done) => {
    const cyndex = new CyNDEx();

    cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);

    getNock().post('/cyndex2/v1/networks/current')
      .reply(repeatRequest);

    cyndex.postCytoscapeNetworkToNDEx().then((response) => {
      expect(response.serverUrl).to.equal(DEFAULT_SERVER);
      expect(response.username).to.equal(DUMMY_USERNAME);
      expect(response.password).to.equal(DUMMY_PASSWORD);
      done();
    });
  });

  it('exportNetworkSUID', (done) => {
    const cyndex = new CyNDEx();

    cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);

    getNock().post('/cyndex2/v1/networks/1')
      .reply(repeatRequest);

    cyndex.postCytoscapeNetworkToNDEx(1).then((response) => {
      expect(response.serverUrl).to.equal(DEFAULT_SERVER);
      expect(response.username).to.equal(DUMMY_USERNAME);
      expect(response.password).to.equal(DUMMY_PASSWORD);
      done();
    });
  });

  it('updateNetworkCurrent', (done) => {
    const cyndex = new CyNDEx();

    cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);

    getNock().options('/cyndex2/v1/networks/current')
      .reply(200, {});

    getNock().put('/cyndex2/v1/networks/current')
      .reply(repeatRequest);

    cyndex.putCytoscapeNetworkInNDEx().then((response) => {
      expect(response.serverUrl).to.equal(DEFAULT_SERVER);
      expect(response.username).to.equal(DUMMY_USERNAME);
      expect(response.password).to.equal(DUMMY_PASSWORD);
      done();
    });
  });

  it('updateNetworkSUID', (done) => {
    const cyndex = new CyNDEx();

    cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);

    getNock().options('/cyndex2/v1/networks/1')
      .reply(200, {});

    getNock().put('/cyndex2/v1/networks/1')
      .reply(repeatRequest);

    cyndex.putCytoscapeNetworkInNDEx(1).then((response) => {
      expect(response.serverUrl).to.equal(DEFAULT_SERVER);
      expect(response.username).to.equal(DUMMY_USERNAME);
      expect(response.password).to.equal(DUMMY_PASSWORD);
      done();
    });
  });

  it('importNetworkPassword', (done) => {
    const cyndex = new CyNDEx();

    cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);

    getNock().post('/cyndex2/v1/networks')
      .reply(repeatRequest);

    cyndex.postNDExNetworkToCytoscape(DUMMY_UUID).then((response) => {
      expect(response.uuid).to.equal(DUMMY_UUID);
      expect(response.serverUrl).to.equal(DEFAULT_SERVER);
      expect(response.username).to.equal(DUMMY_USERNAME);
      expect(response.password).to.equal(DUMMY_PASSWORD);
      expect(response.accessKey).to.equal(undefined);
      done();
    });
  });

  it('importNetworkGoogleAuth', (done) => {
    const cyndex = new CyNDEx();

    let authInstance = {
      currentUser: {
        get: () => {
          return {
            getAuthResponse: () => {
              return { id_token: DUMMY_TOKEN }
            }
          }
        }
      }
    };

    let googleUser = {
      getAuthInstance: () => {
        return authInstance
      }
    };

    cyndex.setGoogleAuth(googleUser);

    getNock().post('/cyndex2/v1/networks')
      .reply(repeatRequest);

    cyndex.postNDExNetworkToCytoscape(DUMMY_UUID).then((response) => {
      expect(response.uuid).to.equal(DUMMY_UUID);
      expect(response.serverUrl).to.equal(DEFAULT_SERVER);
      expect(response.idToken).to.equal(DUMMY_TOKEN);
      expect(response.accessKey).to.equal(undefined);
      done();
    });
  });

  it('importNetworkGoogleUserAuth', (done) => {
    const cyndex = new CyNDEx();

    currentUser = {
      getAuthResponse: () => {
        return { id_token: DUMMY_TOKEN }
      }
    };

    cyndex.setGoogleUser(currentUser);

    getNock().post('/cyndex2/v1/networks')
      .reply(repeatRequest);

    cyndex.postNDExNetworkToCytoscape(DUMMY_UUID).then((response) => {
      expect(response.uuid).to.equal(DUMMY_UUID);
      expect(response.serverUrl).to.equal(DEFAULT_SERVER);
      expect(response.idToken).to.equal(DUMMY_TOKEN);
      expect(response.accessKey).to.equal(undefined);
      done();
    });
  });

  it('importNetworkAccessKey', (done) => {
    const cyndex = new CyNDEx();

    const DUMMY_ACCESS_KEY = 'dummy-access-key';

    cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);

    getNock().post('/cyndex2/v1/networks')
      .reply(repeatRequest);

    cyndex.postNDExNetworkToCytoscape(DUMMY_UUID, DUMMY_ACCESS_KEY).then((response) => {
      expect(response.uuid).to.equal(DUMMY_UUID);
      expect(response.accessKey).to.equal(DUMMY_ACCESS_KEY);
      expect(response.serverUrl).to.equal(DEFAULT_SERVER);
      expect(response.username).to.equal(DUMMY_USERNAME);
      expect(response.password).to.equal(DUMMY_PASSWORD);
      done();
    });
  });

  it('postCXNetworkToCytoscape', (done) => {
    const cyndex = new CyNDEx();

    const DUMMY_CX = { 'dummy-field': 'dummy-value' };

    cyndex.setBasicAuth(DUMMY_USERNAME, DUMMY_PASSWORD);

    getNock().post('/cyndex2/v1/networks/cx')
      .reply(repeatRequest);

    cyndex.postCXNetworkToCytoscape(DUMMY_CX).then((response) => {
      expect(response['dummy-field']).to.equal('dummy-value');
      done();
    });
  });
});
