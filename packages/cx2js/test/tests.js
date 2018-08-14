var chai = require('chai');
var cytoscapeCx2js = require('../build/bundle.js');
var expect = chai.expect;
var assert = chai.assert;

const DEFAULT_STYLE = [
    {
      'selector': 'node',
      'style': {
        'background-color': '#f6eecb',
        'background-opacity': 0.8,
        'font-family': 'Roboto, sans-serif',
        'height': '40px',
        'label': 'data(name)',
        'width': '40px',
      }
    },
    {
      'selector': 'edge',
      'style': {
        'curve-style': 'bezier',
        'font-family': "Roboto, sans-serif",
        'line-color': "#75736c",
        'text-opacity': 0.8,
        'width': '2px'
      }
    },
    {
      'selector': 'node:selected',
      'style': {
       'background-color': 'yellow',
        'color': '#fb1605'
      }
    },
    {
      'selector': 'edge:selected',
      'style': {
        'color': '#fb1605',
        'label': 'data(interaction)',
        'line-color': 'yellow',
        'width': 6
      }
    }
  ]


describe('Example', function(){
  it('niceCX empty', function(){
   
    var utils = new cytoscapeCx2js.cyNetworkUtils();
    
    var rawCX = {

    }
    var niceCX = utils.rawCXtoNiceCX(rawCX)

    expect( niceCX ).to.eql( { edges : {}} );
  });

  it('cxToJs defaultStyle', function(){
    var utils = new cytoscapeCx2js.cyNetworkUtils()
    var cxToJs = new cytoscapeCx2js.cxToJs(utils)

    var defaultStyle = cxToJs.getDefaultStyle()

    expect( defaultStyle ).to.eql( DEFAULT_STYLE );
  });

  it('cxToJs getCyAttributeName', function(){
    var utils = new cytoscapeCx2js.cyNetworkUtils()
    var cxToJs = new cytoscapeCx2js.cxToJs(utils)

    var attributeNameMap = {'foo' : 'bar'}

    var attributeName = cxToJs.getCyAttributeName('foo', attributeNameMap)

    expect( attributeName ).to.eql( 'bar' );
  });

  it('cxToJs specialCase getCyAttributeName', function(){
    var utils = new cytoscapeCx2js.cyNetworkUtils()
    var cxToJs = new cytoscapeCx2js.cxToJs(utils)

    var attributeNameMap = {'foo' : 'bar'}

    var attributeName = cxToJs.getCyAttributeName('id', attributeNameMap)

    expect( attributeName ).to.eql( 'cx_id' );
  });

  it('cxToJs direct getCyAttributeName', function(){
    var utils = new cytoscapeCx2js.cyNetworkUtils()
    var cxToJs = new cytoscapeCx2js.cxToJs(utils)

    var attributeNameMap = {'foo' : 'bar'}

    var attributeName = cxToJs.getCyAttributeName('hodor', attributeNameMap)

    expect( attributeName ).to.eql( 'hodor' );
  });

});
