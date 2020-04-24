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
        edgeDefaultValueAttribute: {
          v: "edgeDefaultValue" 
        },
        edgeNumberTypeAttribute: {
          d: "long"
        },
        edgeNameAliasAttribute: {
          a: "edgeAlias"
        }
      },
      nodes: {
        nodeDefaultValueAttribute: {
          v: "nodeDefaultValue" 
        },
        nodeNumberTypeAttribute: {
          d: "integer"
        },
        nodeNameAliasAttribute: {
          a: "nodeAlias"
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

    expect(nodeAttributeNameMap).to.have.all.keys('nodeAlias');
    expect(nodeAttributeNameMap.get('nodeAlias')).to.equal('nodeNameAliasAttribute');

    expect(edgeAttributeNameMap).to.have.all.keys('edgeAlias');
    expect(edgeAttributeNameMap.get('edgeAlias')).to.equal('edgeNameAliasAttribute');

    expect(nodeAttributeTypeMap).to.have.all.keys('nodeNumberTypeAttribute');
    expect(nodeAttributeTypeMap.get('nodeNumberTypeAttribute')).to.equal('integer');

    expect(edgeAttributeTypeMap).to.have.all.keys('edgeNumberTypeAttribute');
    expect(edgeAttributeTypeMap.get('edgeNumberTypeAttribute')).to.equal('long');

    expect(nodeAttributeDefaultValueMap).to.have.all.keys('nodeDefaultValueAttribute');
    expect(nodeAttributeDefaultValueMap.get('nodeDefaultValueAttribute')).to.equal('nodeDefaultValue');

    expect(edgeAttributeDefaultValueMap).to.have.all.keys('edgeDefaultValueAttribute');
    expect(edgeAttributeDefaultValueMap.get('edgeDefaultValueAttribute')).to.equal('edgeDefaultValue');

  });
});
