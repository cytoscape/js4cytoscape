var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
const cxVizConverter = require('../src/converter.js');
const fs = require('fs-extra');

describe('converter tests', function () {

  it('example_1 lnv', function () {
    var content = fs.readFileSync('test/resources/example_1.cx');
    var rawCX = JSON.parse(content);

    var output = cxVizConverter.convert(rawCX, 'lnv');

    //console.log(JSON.stringify(newData));
  });

  it('fails on incompatible version', function () {
    const rawCX = [{ 'CXVersion': '3.0.0' }];
    expect(() => cxVizConverter.convert(rawCX, 'lnv')).to.throw();
  });

  it('returns empty cyjs', function () {
    const rawCX = [];
    var output = cxVizConverter.convert(rawCX, 'cytoscapeJS');
    const expected = {
      "background-color": null,
      "elements": {},
      "layout": {},
      "style": []
    };
    expect(output).to.eql(expected);
  });

  it('returns empty lnv', function () {
    const rawCX = [];
    var output = cxVizConverter.convert(rawCX, 'lnv');
    const expected = {"nodeViews":[],"edgeViews":[]};
    expect(output).to.eql(expected);
  });

  /*
  it('example_1 cytoscapeJS', function(){
    var content = fs.readFileSync('test/resources/example_1.cx');
    var rawCX = JSON.parse(content);

    var newData = cxVizConverter.convert(rawCX, 'cytoscapeJS');

    console.log(JSON.stringify(newData));
  });
*/

});
