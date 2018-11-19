const { expect, assert } = require('chai');
const { CxToCyCanvas } = require('../src');
const sinon = require("sinon");

describe('CX to Cytoscape JS Canvas', function () {

    var cx2canvas;

    var cytoscape;

    var topCtxSpy;

    var topCanvasSpy;
    var topLayerSpy;

    var bottomCtxSpy;
    var bottomCanvasSpy;
    var bottomLayerSpy;
    var resizeFunction;
    var cytoscapeInstance;

    beforeEach(function () {
        cx2canvas = new CxToCyCanvas();

        cytoscape = sinon.spy();

        topCtxSpy = {
            save: sinon.spy(),
            restore: sinon.spy()
        };

        topCanvasSpy = {
            getContext: function () { }
        };

        sinon.stub(topCanvasSpy, "getContext").returns(topCtxSpy);

        topLayerSpy = {
            getCanvas: function () { },
            resetTransform: sinon.spy(),
            setTransform: sinon.spy(),
            clear: sinon.spy()
        };

        sinon.stub(topLayerSpy, "getCanvas").returns(topCanvasSpy);

        bottomCtxSpy = {
            save: sinon.spy(),
            restore: sinon.spy()
        };

        bottomCanvasSpy = {
            getContext: function () { }
        };

        sinon.stub(bottomCanvasSpy, "getContext").returns(bottomCtxSpy);

        bottomLayerSpy = {
            getCanvas: function () { },
            resetTransform: sinon.spy(),
            setTransform: sinon.spy(),
            clear: sinon.spy()
        };

        sinon.stub(bottomLayerSpy, "getCanvas").returns(bottomCanvasSpy);

        resizeFunction = {};

        cytoscapeInstance = {
            cyCanvas: function (params) {
                if (params.zIndex == 1) {
                    return topLayerSpy;
                }
                else if (params.zIndex == -1) {
                    return bottomLayerSpy;
                }
            },
            on: function (eventName, f) { resizeFunction = f; }
        };
    });

    it('empty CX', function () {

        let niceCX = {

        };

        cx2canvas.drawAnnotationsFromNiceCX(cytoscape, cytoscapeInstance, niceCX);

        resizeFunction();

        expect(cytoscape.callCount).to.eql(1);
        expect(topLayerSpy.resetTransform.callCount).to.eql(1);
        expect(topLayerSpy.clear.callCount).to.eql(1);
        expect(topLayerSpy.setTransform.callCount).to.eql(1);

        expect(topCtxSpy.save.callCount).to.eql(1);
        expect(topCtxSpy.restore.callCount).to.eql(1);

        expect(bottomLayerSpy.resetTransform.callCount).to.eql(1);
        expect(bottomLayerSpy.clear.callCount).to.eql(1);
        expect(bottomLayerSpy.setTransform.callCount).to.eql(1);

        expect(bottomCtxSpy.save.callCount).to.eql(1);
        expect(bottomCtxSpy.restore.callCount).to.eql(1);
    });

});
