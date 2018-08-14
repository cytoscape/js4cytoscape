var chai = require('chai');
var cytoscapeCx2js = require('../build/bundle.js');
var expect = chai.expect;
var assert = chai.assert;

describe('Example', function(){
  it('initialization', function(){
    var utils = new cytoscapeCx2js.cyNetworkUtils();
    expect( 1 ).to.equal( 1 );
  });

  it('does something else', function(){
    expect( 2 + 2 ).to.equal( 4 );
  });
});
