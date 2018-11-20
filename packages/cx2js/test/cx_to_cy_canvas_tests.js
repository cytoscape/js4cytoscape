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
            restore: sinon.spy(),
            fillText: sinon.spy(),
            beginPath: sinon.spy(),
            rect: sinon.spy(),
            fill: sinon.spy(),
            stroke: sinon.spy()
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
            restore: sinon.spy(),
            fillText: sinon.spy()
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

    it('target layer test', function () {

        let niceCX =
        {
            "networkAttributes": {
                elements: [{
                    "s": 80,
                    "n": "__Annotations",
                    "v": ["canvas=foreground|color=-16777216|zoom=0.8726824225841895|type=org.cytoscape.view.presentation.annotations.TextAnnotation|fontStyle=0|uuid=top|fontFamily=Dialog|name=Foreground Text|x=-252.53260026937016|y=-53.39435123657143|z=9|fontSize=10|text=Foreground Text",
                        "canvas=background|color=-16777216|zoom=0.8726824225841895|type=org.cytoscape.view.presentation.annotations.TextAnnotation|fontStyle=0|uuid=bottom|fontFamily=Dialog|name=Background Text|x=-252.53260026937016|y=-53.39435123657143|z=9|fontSize=10|text=Background Text"],
                    "d": "list_of_string"
                }
                ]
            }
        };

        cx2canvas.drawAnnotationsFromNiceCX(cytoscape, cytoscapeInstance, niceCX);

        resizeFunction();

        expect(topCtxSpy.fillText.args).to.eql([['Foreground Text',
            '-252.53260026937016',
            '-53.39435123657143']]);

        expect(bottomCtxSpy.fillText.args).to.eql([['Background Text',
            '-252.53260026937016',
            '-53.39435123657143']]);
        expect(topCtxSpy.fillText.callCount).to.eql(1);
        expect(bottomCtxSpy.fillText.callCount).to.eql(1);
    });

    it('text test', function () {
        let niceCX =
        {
            "networkAttributes": {
                elements: [{
                    "s": 80,
                    "n": "__Annotations",
                    "v": ["canvas=foreground|color=-16777216|zoom=0.8726824225841895|type=org.cytoscape.view.presentation.annotations.TextAnnotation|fontStyle=0|uuid=top|fontFamily=Dialog|name=Foreground Text|x=-252.53260026937016|y=-53.39435123657143|z=9|fontSize=10|text=Foreground Text"],
                    "d": "list_of_string"
                }
                ]
            }
        };

        cx2canvas.drawAnnotationsFromNiceCX(cytoscape, cytoscapeInstance, niceCX);

        resizeFunction();

        expect(topCtxSpy.fillText.args).to.eql([['Foreground Text',
            '-252.53260026937016',
            '-53.39435123657143']]);
        expect(topCtxSpy.textBaseline).to.eql("top");
        expect(topCtxSpy.textAlign).to.eql("left");
        expect(topCtxSpy.font).to.eql("11.458922216386545px Helvetica");
        expect(topCtxSpy.fillStyle).to.eql("rgb(0,0,0,1)");
    });

    it('shape test', function () {
        let niceCX =
        {
            "networkAttributes": {
                elements: [{
                    "s": 80,
                    "n": "__Annotations",
                    "v": ["edgeThickness=1.0|canvas=foreground|fillOpacity=100.0|zoom=0.8763423511944345|type=org.cytoscape.view.presentation.annotations.ShapeAnnotation|uuid=90451f53-fbdb-453c-9877-c33bb0322609|fillColor=-65485|shapeType=RECTANGLE|edgeColor=-16777216|edgeOpacity=100.0|name=Shape 2|x=44.088963266363095|width=39.846177041461154|y=-30.839164241532043|z=10|height=102.24446985557103"],
                    "d": "list_of_string"
                }
                ]
            }
        };

        cx2canvas.drawAnnotationsFromNiceCX(cytoscape, cytoscapeInstance, niceCX);

        resizeFunction();

        expect(topCtxSpy.rect.args).to.eql([["44.088963266363095",
            "-30.839164241532043",
            45.46873375131503,
            116.67183460460876]]);
        expect(topCtxSpy.fill.callCount).to.eql(1);
        expect(topCtxSpy.stroke.callCount).to.eql(1);
        expect(topCtxSpy.fillStyle).to.eql("rgb(255,0,51,1)");
        expect(topCtxSpy.strokeStyle).to.eql("rgb(0,0,0,1)");
    });

    it('bounded text test', function () {
        let niceCX =
        {
            "networkAttributes": {
                elements: [{
                    "s": 80,
                    "n": "__Annotations",
                    "v": ["edgeThickness=1.0|canvas=foreground|fillOpacity=100.0|color=-16777216|zoom=0.8763423511944345|type=org.cytoscape.view.presentation.annotations.BoundedTextAnnotation|fontStyle=0|uuid=1ad96822-3bde-43bd-b222-3356d0d2739f|fillColor=-6750055|shapeType=RECTANGLE|edgeColor=-16777216|fontFamily=Dialog|edgeOpacity=100.0|name=2|x=226.66601181585256|width=106.24731529761114|y=-73.06010671860147|z=1|fontSize=12|text=2|height=87.24731529761114"],
                    "d": "list_of_string"
                }
                ]
            }
        };

        cx2canvas.drawAnnotationsFromNiceCX(cytoscape, cytoscapeInstance, niceCX);

        resizeFunction();

        expect(topCtxSpy.rect.args).to.eql([["226.66601181585256",
            "-73.06010671860147",
            121.23950777090539,
            99.55848325565351
        ]]);
        expect(topCtxSpy.fill.callCount).to.eql(1);
        expect(topCtxSpy.stroke.callCount).to.eql(1);

        expect(topCtxSpy.fillText.args).to.eql([[ "2",
            287.28576570130525,
            -23.280865090774718]]);

        expect(topCtxSpy.textBaseline).to.eql("middle");
        expect(topCtxSpy.textAlign).to.eql("center");

        expect(topCtxSpy.fillStyle).to.eql("rgb(0,0,0,1)");
        expect(topCtxSpy.strokeStyle).to.eql("rgb(0,0,0,1)");
    });
});
