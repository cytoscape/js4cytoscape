var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
const cxUtil = require('../src/cxUtil.js');
const fs = require('fs-extra');

describe('cxUtil tests', function () {
  it('test version 2', function () {
    expect(cxUtil.getCxMajorVersion('2.0')).to.equal(2);
  });

  it('fail on invalid version string', function () {
    expect(() => cxUtil.getCxVersion('2')).to.throw();
  });

  it('fail on version parse', function () {
    expect(() => cxUtil.getCxVersion('x.0')).to.throw();
  });



  it('test processAttributeDeclarations', function () {

    const input = [{
      edges: {
        interaction: {
          v: "interact with"
        }
      },
      nodes: {
        Size: {
          d: "integer"
        },
        annot_source: {
          a: "a1"
        },
      }
    }];

    let nodeAttributeTypeMap = new Map();
    let edgeAttributeTypeMap = new Map();

    let nodeAttributeNameMap = new Map();
    let edgeAttributeNameMap = new Map();

    let nodeAttributeDefaultValueMap = new Map();
    let edgeAttributeDefaultValueMap = new Map();

    cxUtil.processAttributeDeclarations(input,
      nodeAttributeNameMap,
      nodeAttributeTypeMap,
      nodeAttributeDefaultValueMap,
      edgeAttributeNameMap,
      edgeAttributeTypeMap,
      edgeAttributeDefaultValueMap
    );

    expect(nodeAttributeNameMap).to.have.all.keys('a1');
    expect(nodeAttributeNameMap.get('a1')).to.equal('annot_source');
  });
});
