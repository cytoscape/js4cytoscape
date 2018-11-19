const { expect, assert } = require('chai');
const { CxToCyCanvas } = require('../src');
const sinon = require("sinon");

describe('CX to Cytoscape JS Canvas', function(){
  
  it('empty CX', function(){
    var cx2canvas = new CxToCyCanvas();

    let cytoscape  = sinon.spy();

    let ctxSpy = {
        save : sinon.spy(),
        restore : sinon.spy()
    };

    var canvasSpy = {
        getContext : function(){}
    };

    sinon.stub(canvasSpy, "getContext").returns(ctxSpy);

    var layerSpy = {
        getCanvas: function(){},
        resetTransform : sinon.spy(),
        setTransform: sinon.spy(),
        clear: sinon.spy()
    };

    sinon.stub(layerSpy, "getCanvas").returns(canvasSpy);

    var resizeFunction = {};

    let cytoscapeInstance = {
        cyCanvas: function(){},
        on: function(eventName, f) { console.log(eventName); resizeFunction = f;}
    };
    sinon.stub(cytoscapeInstance, "cyCanvas").returns(layerSpy);
   

    let niceCX = {

    };

    cx2canvas.drawAnnotationsFromNiceCX(cytoscape, cytoscapeInstance, niceCX);
    
    resizeFunction();
    
    expect( cytoscape.called ).to.eql( true );

    console.log(layerSpy.resetTransform);

  });
  
  

});
