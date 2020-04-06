var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
const cxUtil = require ('../src/cxUtil.js');
const fs = require('fs-extra');

describe('cxUtil tests', function(){
  it('test version 2', function(){
    expect(cxUtil.getCxMajorVersion('2.0')).to.equal( 2 );
  });

  it('fail on invalid version string', function(){
    expect(() => cxUtil.getCxVersion('2')).to.throw(); 
  });

  it('fail on version parse', function(){
    expect(() => cxUtil.getCxVersion('x.0')).to.throw(); 
  });
});
