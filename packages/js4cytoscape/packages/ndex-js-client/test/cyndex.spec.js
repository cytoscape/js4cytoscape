/* global describe, it, before */

const { expect } = require('chai');
const sinon = require("sinon");
const nock = require('nock')

const { CyNDEx } = require('../dist/build/bundle.js');
const { testAccount } = require('./testconfig.js');



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function errorPrinter(err) {
  console.log(err);
}

describe('testing sinon mock', () => {
  let cyndex = new CyNDEx();

  beforeEach(() => {


  });
  afterEach(() => {

  });

  // test all the open functions in this section.
  it('get status', (done) => {

    nock('http://127.0.0.1:1234').defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
      .get('/cyndex2/v1')
      .reply(200, {
        data: { message: 'dummy' },
        errors: []
      });

    cyndex.getStatus().then((response) => {
      done();
    });

    /*
    expect(
      stub.calledWith("/cyndex2/v1", {
        params: { start: "2018-01-01", end: "2018-01-30" }
      })
    ).to.be.true;
    */
  });



});
