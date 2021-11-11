/* global describe, it, before */

const { expect } = require('chai');
const nock = require('nock');

const { NDEx } = require('../src/');

const { repeatRequest} = require('./nockUtil.js');


describe('ndex mocked tests', () => {

  const CORS_HEADER = {
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  };

  const SERVER = 'http://mockndex';

  const getNock = () => {
    return nock(SERVER).defaultReplyHeaders(CORS_HEADER);
  }

  beforeEach(() => {

  });
  afterEach(() => {

  });

  it('cancel DOI', (done) => {
    let ndex0 = new NDEx('http://mockndex');

    const expectedresponse = {"type":"Cancel_DOI","networkId":"fakeuuid"};

    getNock().post('/admin/request')
    .reply(repeatRequest);

    ndex0.cancelDOIRequest("fakeuuid").then((response) => {
      expect(JSON.stringify(response)).to.equal(JSON.stringify(expectedresponse));
      done();
    });
  });
});
