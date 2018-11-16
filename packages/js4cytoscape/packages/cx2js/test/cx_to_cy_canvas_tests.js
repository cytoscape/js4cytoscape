const { expect, assert } = require('chai');
const { CxToCyCanvas, CyNetworkUtils } = require('../src');
const fs  = require('fs-extra');
const sinon = require("sinon");


describe('CX to Cytoscape JS Canvas', function(){
  
  it('first', function(){
    var cx2canvas = new CxToCyCanvas();

    let cytoscape  = sinon.spy();

    var canvasSpy = {
        getContext : sinon.spy()
    };
    //sinon.stub(canvasSpy, "cyCanvas").returns(layerSpy);

    var layerSpy = {
        getCanvas: function(){}
    };

    sinon.stub(layerSpy, "getCanvas").returns(canvasSpy);

    let cy = {
        cyCanvas: function(){},
        on: function(){}
    };
    sinon.stub(cy, "cyCanvas").returns(layerSpy);


    let niceCX = {

    };

    cx2canvas.drawAnnotationsFromNiceCX(cytoscape, cy, niceCX);

    expect( true ).to.eql( true );
  });
  
  

});
