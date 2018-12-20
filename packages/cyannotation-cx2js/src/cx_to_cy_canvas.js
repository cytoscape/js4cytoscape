let _ = require('lodash');

class CxToCyCanvas {

    constructor(cx2js) {
        var self = this;

        self.cx2js = cx2js;
       
        this._findIntersection = function (p1, p2, p3, p4) {

            var denominator = (p4['y'] - p3['y']) * (p2['x'] - p1['x']) -
                (p4['x'] - p3['x']) * (p2['y'] - p1['y']);

            var ua = ((p4['x'] - p3['x']) * (p1['y'] - p3['y']) -
                (p4['y'] - p3['y']) * (p1['x'] - p3['x'])) / denominator;

            var x = this._epsilon(p1['x'] + ua * (p2['x'] - p1['x']));
            var y = this._epsilon(p1['y'] + ua * (p2['y'] - p1['y']));
            return { 'x': x, 'y': y };
        };

        this._epsilon = function (v) {
            if (Math.abs(v) < 1.0E-10) return 0.0;
            return v;
        };

        this._circleX = function (sides, angle, rot) {
            var coeff = angle / sides;
            if (rot && (sides % 2 == 0)) {
                if (sides == 8) {
                    coeff += 0.5 / sides;
                }
                return this._epsilon(Math.cos(2 * coeff * Math.PI));
            } else
                return this._epsilon(Math.cos(2 * coeff * Math.PI - Math.PI / 2));
        };

        this._circleY = function (sides, angle, rot) {
            var coeff = angle / sides;
            if (rot && (sides % 2 == 0)) {
                if (sides == 8) {
                    coeff += 0.5 / sides;
                }
                return this._epsilon(Math.sin(2 * coeff * Math.PI));
            } else
                return this._epsilon(Math.sin(2 * coeff * Math.PI - Math.PI / 2));
        };


        this._regularPolygonShapeFunction = function (shapeMap, sides, ctx) {
            ctx.beginPath();
            var width = parseFloat(shapeMap['width']) / 2;
            var height = parseFloat(shapeMap['height']) / 2;

            var x = parseFloat(shapeMap['x']) + width;
            var y = parseFloat(shapeMap['y']) + height;

            var points = [];
            for (let i = 0; i < sides; i++) {
                let x1 = this._circleX(sides, i, true) * width + x;
                let y1 = this._circleY(sides, i, true) * height + y;
                points.push({ 'x': x1, 'y': y1 });
            }
            // Now, add the points
            ctx.moveTo(points[0]['x'], points[0]['y']);
            for (let i = 1; i < sides; i++) {
                ctx.lineTo(points[i]['x'], points[i]['y']);
            }
            ctx.closePath();
        };

        this._starShapeFunction = function (shapeMap, sides, ctx) {
            ctx.beginPath();
            var width = parseFloat(shapeMap['width']) / 2;
            var height = parseFloat(shapeMap['height']) / 2;

            var x = parseFloat(shapeMap['x']) + width;
            var y = parseFloat(shapeMap['y']) + height;

            let nPoints = sides * 2;
            var points = [];
            for (let i = 0; i < nPoints; i++) {
                points.push({});
            }
            for (let i = 0; i < sides; i++) {
                let x1 = this._circleX(sides, i, false) * width + x;
                let y1 = this._circleY(sides, i, false) * height + y;
                let x2 = this._circleX(sides, (i + 2) % sides, false) * width + x;
                let y2 = this._circleY(sides, (i + 2) % sides, false) * height + y;
                points[i * 2] = { 'x': x1, 'y': y1 };
                points[(i * 2 + 4) % nPoints] = { 'x': x2, 'y': y2 };
            }

            // Fill in the intersection points
            for (let i = 0; i < nPoints; i = i + 2) {
                let p1 = i;
                let p2 = (i + 4) % nPoints;
                let p3 = (i + 2) % nPoints;
                let p4 = (p3 + nPoints - 4) % nPoints;

                points[(i + 1) % nPoints] = this._findIntersection(points[p1], points[p2],
                    points[p3], points[p4]);
            }

            // Now, add the points
            ctx.moveTo(points[0]['x'], points[0]['y']);
            for (let i = 1; i < nPoints; i++) {
                ctx.lineTo(points[i]['x'], points[i]['y']);
            }
            ctx.closePath();
        };

        this._shapeFunctions = {
            'RECTANGLE': function (shapeMap, ctx) {
                ctx.rect(shapeMap['x'], shapeMap['y'], shapeMap['width'], shapeMap['height']);
            },
            'ROUNDEDRECTANGLE': function (shapeMap, ctx) {
                var width = parseFloat(shapeMap['width']);
                var height = parseFloat(shapeMap['height']);
                var tenthWidth = width * 0.1;
                var x = parseFloat(shapeMap['x']);
                var y = parseFloat(shapeMap['y']);
                ctx.beginPath();

                ctx.moveTo(x + tenthWidth, y);
                ctx.lineTo(x + width - tenthWidth, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + tenthWidth);
                ctx.lineTo(x + width, y + height - tenthWidth);
                ctx.quadraticCurveTo(x + width, y + height, x + width - tenthWidth, y + height);
                ctx.lineTo(x + tenthWidth, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - tenthWidth);
                ctx.lineTo(x, y + tenthWidth);
                ctx.quadraticCurveTo(x, y, x + tenthWidth, y);
                ctx.closePath();
            },
            'ELLIPSE': function (shapeMap, ctx) {
                var halfWidth = parseFloat(shapeMap['width']) / 2;
                var halfHeight = parseFloat(shapeMap['height']) / 2;
                var x = parseFloat(shapeMap['x']) + halfWidth;
                var y = parseFloat(shapeMap['y']) + halfHeight;
                ctx.beginPath();
                ctx.ellipse(x, y, halfWidth, halfHeight, 0, 0, 2 * Math.PI);
                ctx.closePath();
            },
            'STAR5': function (shapeMap, ctx) {
                self._starShapeFunction(shapeMap, 5, ctx);
            },
            'STAR6': function (shapeMap, ctx) {
                self._starShapeFunction(shapeMap, 5, ctx);
            },
            'TRIANGLE': function (shapeMap, ctx) {
                self._regularPolygonShapeFunction(shapeMap, 3, ctx);
            },
            'PENTAGON': function (shapeMap, ctx) {
                self._regularPolygonShapeFunction(shapeMap, 5, ctx);
            },
            'HEXAGON': function (shapeMap, ctx) {
                self._regularPolygonShapeFunction(shapeMap, 6, ctx);
            },
            'OCTAGON': function (shapeMap, ctx) {
                self._regularPolygonShapeFunction(shapeMap, 8, ctx);
            },
            'PARALLELOGRAM': function (shapeMap, ctx) {
                var x = parseFloat(shapeMap['x']);
                var y = parseFloat(shapeMap['y']);

                var xMax = x + parseFloat(shapeMap['width']);
                var yMax = y + parseFloat(shapeMap['height']);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(((2.0 * xMax) + x) / 3.0, y);
                ctx.lineTo(xMax, yMax);
                ctx.lineTo(((2.0 * x) + xMax) / 3.0, yMax);
                ctx.closePath();
            },
            'CUSTOM': function (shapeMap, ctx) { }
        };

        this._colorFromInt = function (num, alpha) {
            num >>>= 0;
            var b = num & 0xFF,
                g = (num & 0xFF00) >>> 8,
                r = (num & 0xFF0000) >>> 16,
                a = parseFloat(alpha) / 100;

            return "rgb(" + r + "," + g + "," + b + "," + a + ")";
        };
    }

    drawAnnotationsFromNiceCX(cytoscapeInstance, niceCX) {
        var cx2js = this.cx2js;
        //console.log("setting up annotations");
        const bottomLayer = cytoscapeInstance.cyCanvas({
            zIndex: -1
        });

        const topLayer = cytoscapeInstance.cyCanvas({
            zIndex: 1
        });

        const bottomCanvas = bottomLayer.getCanvas();
        const bottomCtx = bottomCanvas.getContext("2d");

        const topCanvas = topLayer.getCanvas();
        const topCtx = topCanvas.getContext("2d");

        cytoscapeInstance.on("render cyCanvas.resize", evt => {

            var colorFromInt = this._colorFromInt;
            var shapeFunctions = this._shapeFunctions;
            //console.log("render cyCanvas.resize event");
            bottomLayer.resetTransform(bottomCtx);
            bottomLayer.clear(bottomCtx);
            bottomLayer.setTransform(bottomCtx);

            bottomCtx.save();

            topLayer.resetTransform(topCtx);
            topLayer.clear(topCtx);
            topLayer.setTransform(topCtx);

            topCtx.save();

            var indexedAnnotations = {};
            var topAnnotations = [];
            var bottomAnnotations = [];

            if (niceCX['networkAttributes']) {
                _.forEach(niceCX['networkAttributes']['elements'], function (element) {
                    if (element['n'] == '__Annotations') {
                       
                        _.forEach(element['v'], function (annotation) {
                            var annotationKVList = annotation.split("|");
                            var annotationMap = {};
                            _.forEach(annotationKVList, function (annotationKV) {
                                var kvPair = annotationKV.split("=");
                                annotationMap[kvPair[0]] = kvPair[1];
                            });

                            indexedAnnotations[annotationMap['uuid']] = annotationMap;

                            if (annotationMap['canvas'] == 'foreground') {
                                topAnnotations.push(annotationMap['uuid']);
                            } else {
                                bottomAnnotations.push(annotationMap['uuid']);
                            }
                        });
                    }
                });

            }

            var zOrderCompare = function(a, b){
                let annotationA = indexedAnnotations[a];
                let annotationB = indexedAnnotations[b];
                return parseInt(annotationB['z']) - parseInt(annotationA['z']);
            };

            topAnnotations.sort(zOrderCompare);
            bottomAnnotations.sort(zOrderCompare);

            var contextAnnotationMap = [ 
                {context : topCtx, annotations : topAnnotations}, 
                {context: bottomCtx, annotations: bottomAnnotations}];
            _.forEach(contextAnnotationMap, function(contextAnnotationPair) {
                let ctx = contextAnnotationPair.context;
                _.forEach(contextAnnotationPair.annotations, function(annotationUUID) {
                    let annotationMap = indexedAnnotations[annotationUUID];
                    if (annotationMap['type'] == 'org.cytoscape.view.presentation.annotations.ShapeAnnotation' || annotationMap['type'] == 'org.cytoscape.view.presentation.annotations.BoundedTextAnnotation') {
                    ctx.beginPath();
                    ctx.lineWidth = annotationMap['edgeThickness'];

                    annotationMap['width'] = parseFloat(annotationMap['width']) / parseFloat(annotationMap['zoom']);
                    annotationMap['height'] = parseFloat(annotationMap['height']) / parseFloat(annotationMap['zoom']);
                    if (shapeFunctions[annotationMap['shapeType']]) {
                        shapeFunctions[annotationMap['shapeType']](annotationMap, ctx);
                        if (annotationMap['fillColor']) {
                            let fillColor = colorFromInt(annotationMap['fillColor'], annotationMap['fillOpacity']);

                            ctx.fillStyle = fillColor;
                            ctx.fill();
                        }
                        ctx.strokeStyle = colorFromInt(annotationMap['edgeColor'], annotationMap['edgeOpacity']);
                        ctx.stroke();
                    } else {
                        console.warn("Invalid shape type: " + annotationMap['shapeType']);
                    }
                } else if (annotationMap['type'] == 'org.cytoscape.view.presentation.annotations.ArrowAnnotation') {
                   if (annotationMap['targetAnnotation'] && annotationMap['sourceAnnotation']) {
                    let sourceAnnotation = indexedAnnotations[annotationMap['sourceAnnotation']];
                    let targetAnnotation = indexedAnnotations[annotationMap['targetAnnotation']];
                    
                    // The following is a start to implementing arrow annotations. To follow Cytoscape's 
                    // implementation, it would take a great deal of math and special cases, so has been 
                    // left for later work.
                    /*
                    ctx.beginPath();
                    
                    let sourceX = sourceAnnotation['x'];
                    let sourceY = sourceAnnotation['y'];

                    let targetX = targetAnnotation['x'];
                    let targetY = targetAnnotation['y'];

                    ctx.moveTo(sourceX, sourceY);
                    ctx.lineTo(targetX, targetY);

                    ctx.closePath();
                   */
                    ctx.stroke();
                   }
                }

                var text;
                var textX;
                var textY;

                if (annotationMap['type'] == 'org.cytoscape.view.presentation.annotations.TextAnnotation') {
                    text = annotationMap['text'];
                    ctx.textBaseline = "top";
                    ctx.textAlign = "left";
                    textX = annotationMap['x'];
                    textY = annotationMap['y'];
                } else if (annotationMap['type'] == 'org.cytoscape.view.presentation.annotations.BoundedTextAnnotation') {
                    text = annotationMap['text'];

                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";

                    textX = parseFloat(annotationMap['x']) + annotationMap['width'] / 2;
                    textY = parseFloat(annotationMap['y']) + annotationMap['height'] / 2;
                } 
                if (text && textX && textY) {
                    var fontSize = parseFloat(annotationMap['fontSize']) / parseFloat(annotationMap['zoom']);
                    var fontFamily;
                    
                    if (annotationMap['fontFamily'])  {
                        if (cx2js.JavaLogicalFontConstants.FONT_FAMILY_LIST.includes(annotationMap['fontFamily'])) {
                            fontFamily = cx2js.JavaLogicalFontConstants.FONT_STACK_MAP[annotationMap['fontFamily']];
                        } else if (cx2js.CommonOSFontConstants.FONT_STACK_MAP[annotationMap['fontFamily']]) {
                            fontFamily = cx2js.CommonOSFontConstants.FONT_STACK_MAP[annotationMap['fontFamily']];
                        } else {
                            fontFamily = 'sans-serif';
                        }
                    }
                    ctx.font = fontSize + "px " + fontFamily;

                    if (annotationMap['color']) {
                        let fillColor = colorFromInt(annotationMap['color'], '100');
                        ctx.fillStyle = fillColor;
                    }
                    ctx.fillText(text.toString(), textX, textY);
                }
            });
        });

            topCtx.restore();
            bottomCtx.restore();
        });
    }
}

module.exports = { CxToCyCanvas };
