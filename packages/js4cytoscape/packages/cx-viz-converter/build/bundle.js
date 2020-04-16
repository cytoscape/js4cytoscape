(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cxVizConverter"] = factory();
	else
		root["cxVizConverter"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Object.freeze({
    CX_VERSION: 'CXVersion',
    NODE: 'node',
    EDGE: 'edge',
    NETWORK: 'network',

    NODES: 'nodes',
    EDGES: 'edges',

    ID: 'id',
    X: 'x',
    Y: 'y',
    Z: 'z',
    V: 'v',

    AT: 'at',
    N: 'n',
    E: 'e',

    VISUAL_PROPERTIES: 'visualProperties',
    DEFAULT: 'default',

    STYLE: 'style',

    PO: 'po'
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function getCxVersion(versionString) {
    var versionArray = versionString.split('.').map(function (numberString) {
        return parseInt(numberString, 10);
    });
    if (versionArray.length !== 2 && versionArray.length != 3) {
        throw 'Incompatible version format: ' + versionString;
    }
    versionArray.forEach(function (element) {
        if (isNaN(element)) {
            throw 'Non-integer value in version string: ' + versionString;
        }
    });
    return versionArray;
}

function getCxMajorVersion(versionString) {
    return versionString ? getCxVersion(versionString)[0] : 1;
}

function processAttributeDeclarations(cxAttributeDeclarations, nodeAttributeNameMap, nodeAttributeTypeMap, nodeAttributeDefaultValueMap, edgeAttributeNameMap, edgeAttributeTypeMap, edgeAttributeDefaultValueMap) {
    console.log(" cxAttributeDeclarations: " + JSON.stringify(cxAttributeDeclarations, null, 2));
    cxAttributeDeclarations.forEach(function (cxAttributeDeclaration) {
        if (cxAttributeDeclaration['nodes']) {
            updateAttributeNameMap(nodeAttributeNameMap, cxAttributeDeclaration.nodes);
            updateAttributeTypeMap(nodeAttributeTypeMap, cxAttributeDeclaration.nodes);
            updateAttributeDefaultValueMap(nodeAttributeDefaultValueMap, cxAttributeDeclaration.nodes);
        }
        if (cxAttributeDeclaration['edges']) {
            updateAttributeNameMap(edgeAttributeNameMap, cxAttributeDeclaration.edges);
            updateAttributeTypeMap(edgeAttributeTypeMap, cxAttributeDeclaration.edges);
            updateAttributeDefaultValueMap(edgeAttributeDefaultValueMap, cxAttributeDeclaration.edges);
        }
    });
}

function updateAttributeTypeMap(attributeTypeMap, attributeDeclarations) {
    Object.keys(attributeDeclarations).forEach(function (attributeName) {
        var attributeDeclaration = attributeDeclarations[attributeName];
        if (attributeDeclaration['d']) {
            attributeTypeMap.set(attributeName, attributeDeclaration.d);
        }
    });
}

function updateAttributeNameMap(attributeNameMap, attributeDeclarations) {
    Object.keys(attributeDeclarations).forEach(function (attributeName) {
        var attributeDeclaration = attributeDeclarations[attributeName];
        if (attributeDeclaration['a']) {
            console.log('attribute ' + attributeDeclaration.a + ' should be renamed to ' + attributeName);
            attributeNameMap.set(attributeDeclaration.a, attributeName);
        }
    });
}

function updateAttributeDefaultValueMap(attributeDefaultValueMap, attributeDeclarations) {
    Object.keys(attributeDeclarations).forEach(function (attributeName) {
        var attributeDeclaration = attributeDeclarations[attributeName];
        if (attributeDeclaration['v']) {
            console.log('attribute ' + attributeName + ' has default value ' + attributeDeclaration.v);
            attributeDefaultValueMap.set(attributeName, attributeDeclaration.v);
        }
    });
}

function updateInferredTypes(attributeTypeMap, attributeNameMap, v) {
    Object.keys(v).forEach(function (key) {
        if (!attributeTypeMap.has(key)) {
            var value = v[key];
            var inferredType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
            var newKey = attributeNameMap.has(key) ? attributeNameMap.get(key) : key;
            attributeTypeMap.set(newKey, inferredType);
        }
    });
}

function getExpandedAttributes(v, attributeNameMap, attributeDefaultValueMap) {
    var data = {};
    Object.keys(v).forEach(function (key) {
        var newKey = attributeNameMap.has(key) ? attributeNameMap.get(key) : key;
        data[newKey] = v[key];
    });
    attributeDefaultValueMap.forEach(function (value, key) {
        if (!data[key]) {
            data[key] = value;
        }
    });
    return data;
}

module.exports = {
    getCxVersion: getCxVersion,
    getCxMajorVersion: getCxMajorVersion,
    processAttributeDeclarations: processAttributeDeclarations,
    updateAttributeTypeMap: updateAttributeTypeMap,
    updateAttributeNameMap: updateAttributeNameMap,
    updateAttributeDefaultValueMap: updateAttributeDefaultValueMap,
    updateInferredTypes: updateInferredTypes,
    getExpandedAttributes: getExpandedAttributes
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var converter = __webpack_require__(3);

module.exports.convert = function (cx, targetFormat) {
  return converter.convert(cx, targetFormat);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cxConstants = __webpack_require__(0);
var largeNetwork = __webpack_require__(4);
var cytoscapeJS = __webpack_require__(6);
var cxUtil = __webpack_require__(1);

function verifyVersion(cx) {
    var firstElement = cx[0];
    var versionString = firstElement[cxConstants.CX_VERSION];

    var majorVersion = cxUtil.getCxMajorVersion(versionString);

    if (majorVersion !== 2) {
        throw 'Incompatible CX version: ' + versionString;
    }
}

function convert(cx, targetFormat) {
    verifyVersion(cx);
    switch (targetFormat) {
        case largeNetwork.converter.targetFormat:
            {
                return largeNetwork.converter.convert(cx);
            }
        case cytoscapeJS.converter.targetFormat:
            {
                return cytoscapeJS.converter.convert(cx);
            }
    }
}

module.exports = {
    convert: convert
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cxConstants = __webpack_require__(0);
var largeNetworkConstants = __webpack_require__(5);
var cxUtil = __webpack_require__(1);

function simpleDefaultPropertyConvert(targetStyleField, portablePropertValue) {
    var targetStyleEntry = {};
    targetStyleEntry[targetStyleField] = portablePropertValue;
    return targetStyleEntry;
}

function hexToRGB(hex) {
    var r = 0,
        g = 0,
        b = 0;

    // 3 digits
    if (hex.length == 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];

        // 6 digits
    } else if (hex.length == 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }

    return [parseInt(r), parseInt(g), parseInt(b)];
}

function alphaToInt(alphaDecimal) {
    return clamp(Math.round(alphaDecimal * 255), 0, 255);
}

var defaultPropertyConvert = {
    'node': {
        'NODE_WIDTH': function NODE_WIDTH(portablePropertyValue) {
            return simpleDefaultPropertyConvert('width', portablePropertyValue);
        },
        'NODE_HEIGHT': function NODE_HEIGHT(portablePropertyValue) {
            return simpleDefaultPropertyConvert('height', portablePropertyValue);
        },
        'NODE_BACKGROUND_COLOR': function NODE_BACKGROUND_COLOR(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.color, hexToRGB(portablePropertyValue));
        },
        'NODE_BACKGROUND_OPACITY': function NODE_BACKGROUND_OPACITY(portablePropertyValue) {
            return simpleDefaultPropertyConvert('alpha', alphaToInt(portablePropertyValue));
        },
        'NODE_LABEL': function NODE_LABEL(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.label, portablePropertyValue);
        }
    },
    'edge': {
        'EDGE_WIDTH': function EDGE_WIDTH(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.width, portablePropertyValue);
        },
        'EDGE_OPACITY': function EDGE_OPACITY(portablePropertyValue) {
            return simpleDefaultPropertyConvert('alpha', alphaToInt(portablePropertyValue));
        },
        'EDGE_LINE_COLOR': function EDGE_LINE_COLOR(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.color, hexToRGB(portablePropertyValue));
        }
    }
};

function getDefaultValues(defaultVisualProperties) {
    var output = {
        node: {},
        edge: {}
    };
    if (defaultVisualProperties['node']) {
        var nodeDefault = defaultVisualProperties.node;
        var lnvEntries = getLNVValues('node', nodeDefault);
        Object.assign(output.node, lnvEntries);
    }
    if (defaultVisualProperties['edge']) {
        var edgeDefault = defaultVisualProperties.edge;
        var _lnvEntries = getLNVValues('edge', edgeDefault);
        Object.assign(output.edge, _lnvEntries);
    }
    return output;
}

function getLNVValues(entityType, entries) {
    var output = {};
    Object.keys(entries).forEach(function (portablePropertyKey) {
        var portablePropertyValue = entries[portablePropertyKey];
        if (defaultPropertyConvert[entityType][portablePropertyKey]) {
            var lnvEntry = defaultPropertyConvert[entityType][portablePropertyKey](portablePropertyValue);
            Object.keys(lnvEntry).forEach(function (lnvKey) {
                output[lnvKey] = lnvEntry[lnvKey];
            });
        }
    });
    return output;
}

function processColor(colorArray, alpha) {
    return colorArray != undefined ? alpha != undefined ? [colorArray[0], colorArray[1], colorArray[2], alpha] : [colorArray[0], colorArray[1], colorArray[2]] : undefined;
}

function processSize(width, height) {
    return Math.max(width, height);
}

function processNodeView(nodeView) {
    var width = undefined;
    var height = undefined;
    var colorArray = undefined;
    var alpha = undefined;
    var output = {
        id: nodeView.id,
        position: nodeView.position
    };

    Object.keys(nodeView).forEach(function (key) {
        if (key === 'width') {
            width = nodeView.width;
        } else if (key === 'height') {
            height = nodeView.height;
        } else if (key === 'color') {
            colorArray = nodeView.color;
        } else if (key === 'alpha') {
            alpha = nodeView.alpha;
        } else {
            output[key] = nodeView[key];
        }
    });

    var color = processColor(colorArray, alpha);
    if (color) {
        output[largeNetworkConstants.color] = color;
    }

    var size = processSize(width, height);
    if (size) {
        output[largeNetworkConstants.size] = processSize(width, height);
    }
    return output;
}

function processEdgeView(edgeView) {
    var colorArray = undefined;
    var alpha = undefined;

    var output = {
        id: edgeView.id,
        s: edgeView.s,
        t: edgeView.t
    };

    Object.keys(edgeView).forEach(function (key) {
        if (key === 'color') {
            colorArray = edgeView.color;
        } else if (key === 'alpha') {
            alpha = edgeView.alpha;
        }
    });

    var color = processColor(colorArray, alpha);
    if (color) {
        output[largeNetworkConstants.color] = color;
    }
    return output;
}

function getMappings(mappings) {
    var output = {};
    Object.keys(mappings).forEach(function (propertyKey) {
        var mapping = mappings[propertyKey];
        output[mapping.definition.attribute] = {
            type: mapping.type,
            vp: propertyKey,
            definition: mapping.definition
        };
    });
    return output;
}

function getAttributeRatio(attributeValue, attributeMin, attributeMax) {
    return attributeValue / (attributeMax - attributeMin);
}

function getVpRange(vpMin, vpMax) {
    return vpMax - vpMin;
}

function getMap(vpMin, vpRange, attributeRatio) {
    return vpMin + vpRange * attributeRatio;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function continuousNumberPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
    var attributeRatio = getAttributeRatio(attributeValue, attributeMin, attributeMax);
    var vpRange = getVpRange(vpMin, vpMax);

    var output = getMap(vpMin, vpRange, attributeRatio);

    return output;
}

function continuousColorPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
    var minRGB = hexToRGB(vpMin);
    var maxRGB = hexToRGB(vpMax);

    var attributeRatio = getAttributeRatio(attributeValue, attributeMin, attributeMax);

    var rRange = getVpRange(minRGB[0], maxRGB[1]);
    var gRange = getVpRange(minRGB[1], maxRGB[1]);
    var bRange = getVpRange(minRGB[2], maxRGB[2]);

    var output = [clamp(Math.round(getMap(minRGB[0], rRange, attributeRatio)), 0, 255), clamp(Math.round(getMap(minRGB[1], gRange, attributeRatio)), 0, 255), clamp(Math.round(getMap(minRGB[2], bRange, attributeRatio)), 0, 255)];
    return output;
}

function continuousAlphaPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
    var attributeRatio = getAttributeRatio(attributeValue, attributeMin, attributeMax);
    var vpRange = getVpRange(vpMin, vpMax);

    var alphaDecimal = getMap(vpMin, vpRange, attributeRatio);

    return alphatoInt(alphaDecimal);
}

var continuousPropertyConvert = {
    'node': {
        'NODE_WIDTH': function NODE_WIDTH(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert('width', continuousNumberPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'NODE_HEIGHT': function NODE_HEIGHT(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert('height', continuousNumberPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'NODE_BACKGROUND_COLOR': function NODE_BACKGROUND_COLOR(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.color, continuousColorPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'NODE_BACKGROUND_OPACITY': function NODE_BACKGROUND_OPACITY(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert('alpha', continuousAlphaPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        }
    },
    'edge': {
        'EDGE_WIDTH': function EDGE_WIDTH(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.width, continuousNumberPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'EDGE_OPACITY': function EDGE_OPACITY(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert('alpha', continuousAlphaPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'EDGE_LINE_COLOR': function EDGE_LINE_COLOR(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.color, continuousColorPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        }
    }
};

function isInRange(attributeValue, min, max, includeMin, includeMax) {
    var minSatisfied = includeMin ? min <= attributeValue : min < attributeValue;
    var maxSatisfied = includeMax ? max >= attributeValue : min < attributeValue;
    console.log('isInRange: ' + attributeValue + ' ' + min + ' ' + max + ' ' + includeMin + ' ' + includeMax + ' ' + minSatisfied + ' ' + maxSatisfied);
    return minSatisfied && maxSatisfied;
}

function getMapppedValues(mappings, entityType, attributes) {
    var output = {};
    Object.keys(attributes).forEach(function (attributeKey) {
        var attributeValue = attributes[attributeKey];
        if (mappings[entityType][attributeKey]) {
            var mapping = mappings[entityType][attributeKey];

            if (mapping.type === 'DISCRETE') {
                var discreteMap = mapping.definition.map;
                discreteMap.forEach(function (keyValue) {
                    if (keyValue.v == attributeValue) {
                        if (defaultPropertyConvert[entityType][mapping.vp]) {
                            var converted = defaultPropertyConvert[entityType][mapping.vp](keyValue.vp);
                            Object.assign(output, converted);
                        }
                    }
                });
            } else if (mapping.type === 'PASSTHROUGH') {
                if (defaultPropertyConvert[entityType][mapping.vp]) {
                    var converted = defaultPropertyConvert[entityType][mapping.vp](attributeValue);
                    Object.assign(output, converted);
                }
            } else if (mapping.type === 'CONTINUOUS') {
                var continuousMappings = mapping.definition.map;
                continuousMappings.forEach(function (mappingRange) {
                    if ('min' in mappingRange && 'max' in mappingRange && 'includeMin' in mappingRange && 'includeMax' in mappingRange) {

                        if (isInRange(attributeValue, mappingRange.min, mappingRange.max, mappingRange.includeMin, mappingRange.includeMax) && continuousPropertyConvert[entityType][mapping.vp]) {
                            var _converted = continuousPropertyConvert[entityType][mapping.vp](attributeValue, mappingRange.min, mappingRange.max, mappingRange.minVPValue, mappingRange.maxVPValue);
                            Object.assign(output, _converted);
                        }
                    }
                });
            }
        }
    });
    return output;
}

function lnvConvert(cx) {

    //First pass. 
    // We may need to collect object attributes to calculate
    // mappings in the second pass. 

    var cxVisualProperties = void 0;

    var nodeAttributeTypeMap = new Map();
    var edgeAttributeTypeMap = new Map();

    var nodeAttributeNameMap = new Map();
    var edgeAttributeNameMap = new Map();

    var nodeAttributeDefaultValueMap = new Map();
    var edgeAttributeDefaultValueMap = new Map();

    var defaultValues = undefined;
    var mappings = {
        node: {},
        edge: {}
    };
    var bypassMappings = {
        'node': {},
        'edge': {}
    };

    cx.forEach(function (cxAspect) {
        if (cxAspect['attributeDeclarations']) {
            var cxAttributeDeclarations = cxAspect['attributeDeclarations'];
            cxUtil.processAttributeDeclarations(cxAttributeDeclarations, nodeAttributeNameMap, nodeAttributeTypeMap, nodeAttributeDefaultValueMap, edgeAttributeNameMap, edgeAttributeTypeMap, edgeAttributeDefaultValueMap);
        } else if (cxAspect['nodes']) {
            var cxNodes = cxAspect['nodes'];
            cxNodes.forEach(function (cxNode) {
                cxUtil.updateInferredTypes(nodeAttributeTypeMap, nodeAttributeNameMap, cxNode['v']);
            });
        } else if (cxAspect['edges']) {
            var cxEdges = cxAspect['edges'];
            cxEdges.forEach(function (cxEdge) {
                cxUtil.updateInferredTypes(edgeAttributeTypeMap, edgeAttributeNameMap, cxEdge['v']);
            });
        } else if (cxAspect['visualProperties']) {
            cxVisualProperties = cxAspect['visualProperties'];
        }
    });

    var output = {};

    var nodeViews = [];
    var edgeViews = [];

    cxVisualProperties.forEach(function (vpElement) {
        var vpAt = vpElement.at;
        if (vpAt === cxConstants.STYLE) {
            var value = vpElement.v;
            var defaultStyles = value.default;

            defaultValues = getDefaultValues(defaultStyles);
            console.log('large network default style = ' + JSON.stringify(defaultValues, null, 2));

            mappings.node = value.nodeMapping ? getMappings(value.nodeMapping) : {};
            //mappingCSSNodeStyle = getCSSMappingEntries(nodeMapping, 'node', nodeAttributeTypeMap);

            mappings.edge = value.edgeMapping ? getMappings(value.edgeMapping) : {};

            //mappingCSSEdgeStyle = getCSSMappingEntries(edgeMapping, 'edge', edgeAttributeTypeMap);
        } else if (vpAt === cxConstants.N) {

            var key = vpElement[cxConstants.PO].toString();
            var values = getLNVValues('node', vpElement.v);

            if (!bypassMappings.node[key]) {
                bypassMappings.node[key] = {};
            }

            console.log('bypass calculated: ' + JSON.stringify(values, null, 2));

            Object.assign(bypassMappings.node[key], values);
            //bypassCSSEntries.push(getBypassCSSEntry('node', vpElement));
        } else if (vpAt === cxConstants.E) {
            var _key = vpElement[cxConstants.PO].toString();
            var _values = getLNVValues('edge', vpElement.v);

            if (!bypassMappings.edge[_key]) {
                bypassMappings.edge[_key] = {};
            }

            console.log('bypass calculated: ' + JSON.stringify(_values, null, 2));

            Object.assign(bypassMappings.edge[_key], _values);
        }
    });

    console.log('mappings: ' + JSON.stringify(mappings, null, 2));

    //Second pass. 
    // Here is where the actual output is generated.

    cx.forEach(function (cxAspect) {
        if (cxAspect['nodes']) {
            var cxNodes = cxAspect['nodes'];

            cxNodes.forEach(function (cxNode) {
                var cxId = cxNode[cxConstants.ID].toString();
                var nodeView = {
                    id: cxId,
                    position: cxNode['z'] ? [cxNode['x'], cxNode['y'], cxNode['z']] : [cxNode['x'], cxNode['y']]

                    //TODO calculate lnv vps based on defaults and attributes
                };if (defaultValues) {
                    var defaultNodeVisualProperties = defaultValues['node'];
                    Object.assign(nodeView, defaultNodeVisualProperties);
                }
                //Assign mappings
                var expandedAttributes = cxUtil.getExpandedAttributes(cxNode['v'], nodeAttributeNameMap, nodeAttributeDefaultValueMap);
                var mappingValues = getMapppedValues(mappings, 'node', expandedAttributes);
                Object.assign(nodeView, mappingValues);

                //Assign bypass
                if (bypassMappings.node[cxId]) {
                    Object.assign(nodeView, bypassMappings.node[cxId]);
                }

                var processedNodeView = processNodeView(nodeView);

                nodeViews.push(processedNodeView);
            });
        } else if (cxAspect['edges']) {
            var cxEdges = cxAspect['edges'];

            cxEdges.forEach(function (cxEdge) {
                var cxId = cxEdge[cxConstants.ID].toString();
                var edgeView = {
                    id: cxId,
                    s: cxEdge.s.toString(),
                    t: cxEdge.t.toString()

                    //TODO calculate lnv vps based on defaults and attributes
                };if (defaultValues) {
                    var defaultEdgeVisualProperties = defaultValues['edge'];
                    Object.assign(edgeView, defaultEdgeVisualProperties);
                }

                var expandedAttributes = cxUtil.getExpandedAttributes(cxEdge['v'], edgeAttributeNameMap, edgeAttributeDefaultValueMap);
                var mappingValues = getMapppedValues(mappings, 'node', expandedAttributes);
                Object.assign(edgeView, mappingValues);
                //Assign bypass
                if (bypassMappings.edge[cxId]) {
                    Object.assign(edgeView, bypassMappings.edge[cxId]);
                }

                var processedEdgeView = processEdgeView(edgeView);

                edgeViews.push(processedEdgeView);
            });
        }
    });

    output[largeNetworkConstants.nodeViews] = nodeViews;
    output[largeNetworkConstants.edgeViews] = edgeViews;

    return output;
}

var converter = {
    targetFormat: 'lnv',
    convert: function convert(cx) {
        return lnvConvert(cx);
    }
};

module.exports = {
    converter: converter
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Object.freeze({
    'nodeViews': 'nodeViews',
    'edgeViews': 'edgeViews',
    'id': 'id',
    'position': 'position',
    's': 's',
    't': 't',
    'label': 'label',
    'color': 'color',
    'line_color': 'line-color',
    'size': 'size',
    'width': 'width'
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cxConstants = __webpack_require__(0);
var jsConstants = __webpack_require__(7);
var cxUtil = __webpack_require__(1);

function simpleDefaultPropertyConvert(targetStyleField, portablePropertValue) {
    var targetStyleEntry = new Map();
    targetStyleEntry.set(targetStyleField, portablePropertValue);
    return targetStyleEntry;
}

var defaultPropertyConvert = {
    'node': {
        'NODE_SHAPE': function NODE_SHAPE(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.shape, portablePropertyValue);
        },
        'NODE_WIDTH': function NODE_WIDTH(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.width, portablePropertyValue);
        },
        'NODE_HEIGHT': function NODE_HEIGHT(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.height, portablePropertyValue);
        },
        'NODE_BACKGROUND_COLOR': function NODE_BACKGROUND_COLOR(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.background_color, portablePropertyValue);
        },
        'NODE_BACKGROUND_OPACITY': function NODE_BACKGROUND_OPACITY(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.background_opacity, portablePropertyValue);
        },
        'NODE_LABEL': function NODE_LABEL(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.label, portablePropertyValue);
        },
        'NODE_LABEL_COLOR': function NODE_LABEL_COLOR(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.label_color, portablePropertyValue);
        }
    },
    'edge': {
        'EDGE_WIDTH': function EDGE_WIDTH(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.width, portablePropertyValue);
        },
        'EDGE_OPACITY': function EDGE_OPACITY(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.opacity, portablePropertyValue);
        },
        'EDGE_LINE_COLOR': function EDGE_LINE_COLOR(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.line_color, portablePropertyValue);
        }
    }
};

function simplePassthroughMappingConvert(targetStyleField, attributeName) {
    var output = {};
    output[targetStyleField] = 'data(' + attributeName + ')';
    return output;
}

var passthroughMappingConvert = {
    'node': {
        'NODE_SHAPE': function NODE_SHAPE(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.shape, attributeName);
        },
        'NODE_WIDTH': function NODE_WIDTH(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.width, attributeName);
        },
        'NODE_HEIGHT': function NODE_HEIGHT(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.height, attributeName);
        },
        'NODE_BACKGROUND_COLOR': function NODE_BACKGROUND_COLOR(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.background_color, attributeName);
        },
        'NODE_BACKGROUND_OPACITY': function NODE_BACKGROUND_OPACITY(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.background_opacity, attributeName);
        },
        'NODE_LABEL': function NODE_LABEL(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.label, attributeName);
        },
        'NODE_LABEL_COLOR': function NODE_LABEL_COLOR(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.label_color, attributeName);
        }
    },
    'edge': {
        'EDGE_WIDTH': function EDGE_WIDTH(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.width, attributeName);
        },
        'EDGE_OPACITY': function EDGE_OPACITY(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.opacity, attributeName);
        },
        'EDGE_LINE_COLOR': function EDGE_LINE_COLOR(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.line_color, attributeName);
        }
    }
};
function simpleMapDataPropertyConvert(targetStyleField, attributeName, minValue, maxValue, minVP, maxVP) {
    var output = {};
    output[targetStyleField] = 'mapData(' + attributeName + ', ' + minValue + ', ' + maxValue + ', ' + minVP + ', ' + maxVP + ')';
    return output;
}

var mapDataPropertyConvert = {
    'node': {
        'NODE_SHAPE': function NODE_SHAPE(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.shape, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'NODE_WIDTH': function NODE_WIDTH(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.width, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'NODE_HEIGHT': function NODE_HEIGHT(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.height, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'NODE_BACKGROUND_COLOR': function NODE_BACKGROUND_COLOR(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.background_color, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'NODE_BACKGROUND_OPACITY': function NODE_BACKGROUND_OPACITY(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.background_opacity, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'NODE_LABEL': function NODE_LABEL(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.label, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'NODE_LABEL_COLOR': function NODE_LABEL_COLOR(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.label_color, attributeName, minValue, maxValue, minVP, maxVP);
        }
    },
    'edge': {
        'EDGE_WIDTH': function EDGE_WIDTH(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.width, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'EDGE_OPACITY': function EDGE_OPACITY(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.opacity, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'EDGE_LINE_COLOR': function EDGE_LINE_COLOR(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.line_color, attributeName, minValue, maxValue, minVP, maxVP);
        }
    }
};

function getCSSStyleEntries(cxStyleEntries, entityType) {
    var output = {};
    Object.keys(cxStyleEntries).forEach(function (key) {
        var portablePropertyValue = cxStyleEntries[key];
        if (defaultPropertyConvert[entityType][key]) {
            var cssEntries = defaultPropertyConvert[entityType][key](portablePropertyValue);
            cssEntries.forEach(function (value, key) {
                output[key] = value;
            });
        }
    });
    return output;
}

function getIdSelector(id, elementType) {
    //node#id or edge#id
    return elementType + '#' + id;
}

function getStyleElement(selector, css) {
    return { 'selector': selector, 'style': css };
}

function getContinuousSelector(entityType, attributeName, minValue, maxValue, includeMin, includeMax) {
    var minCondition = includeMin ? '>=' : '>';
    var maxCondition = includeMax ? '<=' : '<';

    return entityType + '[' + attributeName + ' ' + minCondition + ' ' + minValue + '][' + attributeName + ' ' + maxCondition + ' ' + maxValue + ']';
}

function getContinuousStyle(entityType, portablePropertyKey, attributeName, minValue, maxValue, minVP, maxVP) {
    var output = {};
    if (mapDataPropertyConvert[entityType][portablePropertyKey]) {
        return mapDataPropertyConvert[entityType][portablePropertyKey](attributeName, minValue, maxValue, minVP, maxVP);
    }
    return output;
}

function getContinuousMappingCSSEntries(portablePropertyKey, cxMappingDefinition, entityType, attributeTypeMap) {
    var output = [];
    var attributeName = cxMappingDefinition['attribute'];
    var rangeMaps = cxMappingDefinition['map'];
    console.log('continuous mapping for ' + attributeName + ': ' + JSON.stringify(rangeMaps, null, 2));

    rangeMaps.forEach(function (range) {
        var selector = getContinuousSelector(entityType, attributeName, range.min, range.max, range.includeMin, range.includeMax);
        var style = getContinuousStyle(entityType, portablePropertyKey, attributeName, range.min, range.max, range.minVPValue, range.maxVPValue);

        output.push(getStyleElement(selector, style));
    });
    return output;
}

function getPassthroughMappingCSSEntry(portablePropertyKey, cxMappingDefinition, entityType) {
    if (passthroughMappingConvert[entityType][portablePropertyKey]) {
        var css = passthroughMappingConvert[entityType][portablePropertyKey](cxMappingDefinition.attribute);
        return getStyleElement(entityType, css);
    }
    return null;
}

function getDiscreteSelector(entityType, attributeName, attributeDataType, attributeValue) {
    if (attributeDataType == 'string') {
        return entityType + '[' + attributeName + ' = \'' + attributeValue + '\']';
    } else if (attributeDataType == 'boolean') {

        if (attributeValue == 'true') {
            return entityType + '[?' + attributeName + ']';
        } else {
            return entityType + '[' + attributeName + '][!' + attributeName + ']';
        }
    } else {
        return entityType + '[' + attributeName + ' = ' + attributeValue + ']';
    }
}

function getDiscreteMappingCSSEntries(portablePropertyKey, cxMappingDefinition, entityType, attributeTypeMap) {
    var output = [];
    var atttributeToValueMap = cxMappingDefinition['map'];
    var attributeName = cxMappingDefinition['attribute'];
    var attributeDataType = attributeTypeMap.get(attributeName);
    atttributeToValueMap.forEach(function (discreteMap) {
        console.log(' discrete map for ' + portablePropertyKey + ': ' + discreteMap.v + ' (' + attributeName + '<' + attributeDataType + '>) -> ' + discreteMap.vp);

        var selector = getDiscreteSelector(entityType, attributeName, attributeDataType, discreteMap.v);

        if (defaultPropertyConvert[entityType][portablePropertyKey]) {
            var styleMap = defaultPropertyConvert[entityType][portablePropertyKey](discreteMap.vp);
            var css = {};
            styleMap.forEach(function (value, key) {
                css[key] = value;
            });
            output.push(getStyleElement(selector, css));
            //console.log('   style: ' + JSON.stringify(css));
        }
    });

    return output; //getStyleElement(selector, css);
}

function getBypassCSSEntry(entityType, cxElement) {

    var id = cxElement.po;
    var css = {};
    Object.keys(cxElement.v).forEach(function (portablePropertyKey) {
        var portablePropertyValue = cxElement.v[portablePropertyKey];
        if (defaultPropertyConvert[entityType][portablePropertyKey]) {
            var styleMap = defaultPropertyConvert[entityType][portablePropertyKey](portablePropertyValue);
            styleMap.forEach(function (value, key) {
                css[key] = value;
            });
        }
    });

    var selector = getIdSelector(id);
    return getStyleElement(selector, css);
}

/** 
 * 
*/
function getCSSMappingEntries(cxMappingEntries, entityType, attributeTypeMap) {
    var output = [];
    Object.keys(cxMappingEntries).forEach(function (key) {
        var cxMappingEntry = cxMappingEntries[key];
        console.log(" mapping type: " + cxMappingEntry.type);
        switch (cxMappingEntry.type) {
            case 'CONTINUOUS':
                {
                    var continousMappings = getContinuousMappingCSSEntries(key, cxMappingEntry.definition, entityType, attributeTypeMap);
                    continousMappings.forEach(function (continousMapping) {
                        output.push(continousMapping);
                    });
                    break;
                }
            case 'PASSTHROUGH':
                {
                    var cssEntry = getPassthroughMappingCSSEntry(key, cxMappingEntry.definition, entityType);
                    if (cssEntry) {
                        output.push(cssEntry);
                    }
                    break;
                }
            case 'DISCRETE':
                {
                    var discreteMappings = getDiscreteMappingCSSEntries(key, cxMappingEntry.definition, entityType, attributeTypeMap);
                    discreteMappings.forEach(function (discreteMapping) {
                        output.push(discreteMapping);
                    });
                    break;
                }
        }
    });
    return output;
}

var NODE_SELECTOR = 'node';
var EDGE_SELECTOR = 'edge';

function getVisualProperties(cxVisualProperties, nodeAttributeTypeMap, edgeAttributeTypeMap) {
    var output = {
        style: [],
        'background-color': undefined
    };

    var defaultCSSNodeStyle = undefined;
    var defaultCSSEdgeStyle = undefined;

    var cssNetworkBackgroundColor = undefined;

    var mappingCSSNodeStyle = undefined;
    var mappingCSSEdgeStyle = undefined;

    var bypassCSSEntries = [];

    cxVisualProperties.forEach(function (vpElement) {
        var vpAt = vpElement.at;
        if (vpAt === cxConstants.STYLE) {
            var value = vpElement.v;
            var defaultStyles = value.default;

            console.log('portable node style: ' + JSON.stringify(defaultStyles.node));
            defaultCSSNodeStyle = getCSSStyleEntries(defaultStyles.node, 'node');
            defaultCSSEdgeStyle = getCSSStyleEntries(defaultStyles.edge, 'edge');

            cssNetworkBackgroundColor = defaultStyles.network['background-color'];

            var nodeMapping = value.nodeMapping;
            mappingCSSNodeStyle = getCSSMappingEntries(nodeMapping, 'node', nodeAttributeTypeMap);

            var edgeMapping = value.edgeMapping;
            mappingCSSEdgeStyle = getCSSMappingEntries(edgeMapping, 'edge', edgeAttributeTypeMap);
        } else if (vpAt === cxConstants.N) {
            bypassCSSEntries.push(getBypassCSSEntry('node', vpElement));
        } else if (vpAt === cxConstants.E) {
            bypassCSSEntries.push(getBypassCSSEntry('edge', vpElement));
        }
    });

    console.log('default node style: ' + JSON.stringify(defaultCSSNodeStyle));

    //Add default style
    output.style.push(getStyleElement(NODE_SELECTOR, defaultCSSNodeStyle));
    output.style.push(getStyleElement(EDGE_SELECTOR, defaultCSSEdgeStyle));

    output.style.push.apply(output.style, mappingCSSNodeStyle);
    output.style.push.apply(output.style, mappingCSSEdgeStyle);

    output['background-color'] = cssNetworkBackgroundColor;

    return output;
}

var converter = {
    targetFormat: 'cytoscapeJS',
    convert: function convert(cx) {
        var output = {
            style: [],
            elements: {},
            layout: {},
            'background-color': null
        };

        var cxVisualProperties = undefined;

        var nodeAttributeTypeMap = new Map();
        var edgeAttributeTypeMap = new Map();

        var nodeAttributeNameMap = new Map();
        var edgeAttributeNameMap = new Map();

        var nodeAttributeDefaultValueMap = new Map();
        var edgeAttributeDefaultValueMap = new Map();

        cx.forEach(function (cxAspect) {
            if (cxAspect['attributeDeclarations']) {
                var cxAttributeDeclarations = cxAspect['attributeDeclarations'];
                console.log(" cxAttributeDeclarations: " + JSON.stringify(cxAttributeDeclarations, null, 2));
                cxUtil.processAttributeDeclarations(cxAttributeDeclarations, nodeAttributeNameMap, nodeAttributeTypeMap, nodeAttributeDefaultValueMap, edgeAttributeNameMap, edgeAttributeTypeMap, edgeAttributeDefaultValueMap);
            } else if (cxAspect['nodes']) {
                var cxNodes = cxAspect['nodes'];
                cxNodes.forEach(function (cxNode) {
                    cxUtil.updateInferredTypes(nodeAttributeTypeMap, nodeAttributeNameMap, cxNode['v']);
                });
            } else if (cxAspect['edges']) {
                var cxEdges = cxAspect['edges'];
                cxEdges.forEach(function (cxEdge) {
                    cxUtil.updateInferredTypes(edgeAttributeTypeMap, edgeAttributeNameMap, cxEdge['v']);
                });
            } else if (cxAspect['visualProperties']) {
                cxVisualProperties = cxAspect['visualProperties'];
            }
        });

        nodeAttributeTypeMap.forEach(function (inferredType, attributeName) {
            console.log('inferred attribute type for node: ' + attributeName + ': ' + inferredType);
        });

        edgeAttributeTypeMap.forEach(function (inferredType, attributeName) {
            console.log('inferred attribute type for edge: ' + attributeName + ': ' + inferredType);
        });

        //Add nodes
        output.elements['nodes'] = [];

        //Add edges
        output.elements['edges'] = [];

        cx.forEach(function (cxAspect) {
            if (cxAspect['nodes']) {
                var cxNodes = cxAspect['nodes'];
                cxNodes.forEach(function (cxNode) {
                    var element = {};
                    element['data'] = cxUtil.getExpandedAttributes(cxNode['v'], nodeAttributeNameMap, nodeAttributeDefaultValueMap);
                    element['data']['id'] = cxNode.id.toString();
                    element['position'] = {
                        x: cxNode['x'],
                        y: cxNode['y']
                    };
                    output.elements.nodes.push(element);
                });
            } else if (cxAspect['edges']) {
                var cxEdges = cxAspect['edges'];
                cxEdges.forEach(function (cxEdge) {
                    var element = {};
                    element['data'] = cxUtil.getExpandedAttributes(cxEdge['v'], edgeAttributeNameMap, edgeAttributeDefaultValueMap);
                    element['data']['id'] = cxEdge.id.toString();
                    element['data']['source'] = cxEdge['s'];
                    element['data']['target'] = cxEdge['t'];
                    output.elements.edges.push(element);
                });
            }
        });

        var style = getVisualProperties(cxVisualProperties, nodeAttributeTypeMap, edgeAttributeTypeMap);

        output.style = style.style;
        console.log('visualProperties: ' + JSON.stringify(cxVisualProperties, null, 2));
        console.log('style: ' + JSON.stringify(output.style, null, 2));

        output['background-color'] = style['background-color'];

        return output;
    }
};

module.exports = {
    converter: converter
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Object.freeze({
    'shape': 'shape',
    'width': 'width',
    'height': 'height',
    'background_color': 'background-color',
    'background_opacity': 'background-opacity',
    'label': 'label',
    'label_color': 'color',
    'opacity': 'opacity',
    'line_color': 'line-color'
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmNTQxZGMwY2UwY2Y0YjQzNjE5OSIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsIlBPIiwiZ2V0Q3hWZXJzaW9uIiwidmVyc2lvblN0cmluZyIsInZlcnNpb25BcnJheSIsInNwbGl0IiwibWFwIiwibnVtYmVyU3RyaW5nIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXNOYU4iLCJlbGVtZW50IiwiZ2V0Q3hNYWpvclZlcnNpb24iLCJwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVBdHRyaWJ1dGVUeXBlTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwiZWRnZUF0dHJpYnV0ZVR5cGVNYXAiLCJlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjeEF0dHJpYnV0ZURlY2xhcmF0aW9uIiwidXBkYXRlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVzIiwidXBkYXRlQXR0cmlidXRlVHlwZU1hcCIsInVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VzIiwiYXR0cmlidXRlVHlwZU1hcCIsImF0dHJpYnV0ZURlY2xhcmF0aW9ucyIsImtleXMiLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlRGVjbGFyYXRpb24iLCJzZXQiLCJkIiwiYXR0cmlidXRlTmFtZU1hcCIsImEiLCJhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJ2IiwidXBkYXRlSW5mZXJyZWRUeXBlcyIsImtleSIsImhhcyIsInZhbHVlIiwiaW5mZXJyZWRUeXBlIiwibmV3S2V5IiwiZ2V0IiwiZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzIiwiZGF0YSIsImNvbnZlcnRlciIsInJlcXVpcmUiLCJjb252ZXJ0IiwiY3giLCJ0YXJnZXRGb3JtYXQiLCJjeENvbnN0YW50cyIsImxhcmdlTmV0d29yayIsImN5dG9zY2FwZUpTIiwiY3hVdGlsIiwidmVyaWZ5VmVyc2lvbiIsImZpcnN0RWxlbWVudCIsIm1ham9yVmVyc2lvbiIsImxhcmdlTmV0d29ya0NvbnN0YW50cyIsInNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJ0YXJnZXRTdHlsZUZpZWxkIiwicG9ydGFibGVQcm9wZXJ0VmFsdWUiLCJ0YXJnZXRTdHlsZUVudHJ5IiwiaGV4VG9SR0IiLCJoZXgiLCJyIiwiZyIsImIiLCJhbHBoYVRvSW50IiwiYWxwaGFEZWNpbWFsIiwiY2xhbXAiLCJNYXRoIiwicm91bmQiLCJkZWZhdWx0UHJvcGVydHlDb252ZXJ0IiwicG9ydGFibGVQcm9wZXJ0eVZhbHVlIiwiY29sb3IiLCJsYWJlbCIsIndpZHRoIiwiZ2V0RGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzIiwib3V0cHV0Iiwibm9kZSIsImVkZ2UiLCJub2RlRGVmYXVsdCIsImxudkVudHJpZXMiLCJnZXRMTlZWYWx1ZXMiLCJhc3NpZ24iLCJlZGdlRGVmYXVsdCIsImVudGl0eVR5cGUiLCJlbnRyaWVzIiwicG9ydGFibGVQcm9wZXJ0eUtleSIsImxudkVudHJ5IiwibG52S2V5IiwicHJvY2Vzc0NvbG9yIiwiY29sb3JBcnJheSIsImFscGhhIiwidW5kZWZpbmVkIiwicHJvY2Vzc1NpemUiLCJoZWlnaHQiLCJtYXgiLCJwcm9jZXNzTm9kZVZpZXciLCJub2RlVmlldyIsImlkIiwicG9zaXRpb24iLCJzaXplIiwicHJvY2Vzc0VkZ2VWaWV3IiwiZWRnZVZpZXciLCJzIiwidCIsImdldE1hcHBpbmdzIiwibWFwcGluZ3MiLCJtYXBwaW5nIiwicHJvcGVydHlLZXkiLCJkZWZpbml0aW9uIiwiYXR0cmlidXRlIiwidHlwZSIsInZwIiwiZ2V0QXR0cmlidXRlUmF0aW8iLCJhdHRyaWJ1dGVWYWx1ZSIsImF0dHJpYnV0ZU1pbiIsImF0dHJpYnV0ZU1heCIsImdldFZwUmFuZ2UiLCJ2cE1pbiIsInZwTWF4IiwiZ2V0TWFwIiwidnBSYW5nZSIsImF0dHJpYnV0ZVJhdGlvIiwibWluIiwiY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydCIsImNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydCIsIm1pblJHQiIsIm1heFJHQiIsInJSYW5nZSIsImdSYW5nZSIsImJSYW5nZSIsImNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydCIsImFscGhhdG9JbnQiLCJjb250aW51b3VzUHJvcGVydHlDb252ZXJ0IiwiaXNJblJhbmdlIiwiaW5jbHVkZU1pbiIsImluY2x1ZGVNYXgiLCJtaW5TYXRpc2ZpZWQiLCJtYXhTYXRpc2ZpZWQiLCJnZXRNYXBwcGVkVmFsdWVzIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZUtleSIsImRpc2NyZXRlTWFwIiwia2V5VmFsdWUiLCJjb252ZXJ0ZWQiLCJjb250aW51b3VzTWFwcGluZ3MiLCJtYXBwaW5nUmFuZ2UiLCJtaW5WUFZhbHVlIiwibWF4VlBWYWx1ZSIsImxudkNvbnZlcnQiLCJjeFZpc3VhbFByb3BlcnRpZXMiLCJNYXAiLCJkZWZhdWx0VmFsdWVzIiwiYnlwYXNzTWFwcGluZ3MiLCJjeEFzcGVjdCIsImN4Tm9kZXMiLCJjeE5vZGUiLCJjeEVkZ2VzIiwiY3hFZGdlIiwibm9kZVZpZXdzIiwiZWRnZVZpZXdzIiwidnBBdCIsInZwRWxlbWVudCIsImF0IiwiZGVmYXVsdFN0eWxlcyIsImRlZmF1bHQiLCJub2RlTWFwcGluZyIsImVkZ2VNYXBwaW5nIiwidG9TdHJpbmciLCJ2YWx1ZXMiLCJjeElkIiwiZGVmYXVsdE5vZGVWaXN1YWxQcm9wZXJ0aWVzIiwiZXhwYW5kZWRBdHRyaWJ1dGVzIiwibWFwcGluZ1ZhbHVlcyIsInByb2Nlc3NlZE5vZGVWaWV3IiwicHVzaCIsImRlZmF1bHRFZGdlVmlzdWFsUHJvcGVydGllcyIsInByb2Nlc3NlZEVkZ2VWaWV3IiwianNDb25zdGFudHMiLCJzaGFwZSIsImJhY2tncm91bmRfY29sb3IiLCJiYWNrZ3JvdW5kX29wYWNpdHkiLCJsYWJlbF9jb2xvciIsIm9wYWNpdHkiLCJsaW5lX2NvbG9yIiwic2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCIsInBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0IiwibWluVmFsdWUiLCJtYXhWYWx1ZSIsIm1pblZQIiwibWF4VlAiLCJtYXBEYXRhUHJvcGVydHlDb252ZXJ0IiwiZ2V0Q1NTU3R5bGVFbnRyaWVzIiwiY3hTdHlsZUVudHJpZXMiLCJjc3NFbnRyaWVzIiwiZ2V0SWRTZWxlY3RvciIsImVsZW1lbnRUeXBlIiwiZ2V0U3R5bGVFbGVtZW50Iiwic2VsZWN0b3IiLCJjc3MiLCJnZXRDb250aW51b3VzU2VsZWN0b3IiLCJtaW5Db25kaXRpb24iLCJtYXhDb25kaXRpb24iLCJnZXRDb250aW51b3VzU3R5bGUiLCJnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMiLCJjeE1hcHBpbmdEZWZpbml0aW9uIiwicmFuZ2VNYXBzIiwicmFuZ2UiLCJzdHlsZSIsImdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5IiwiZ2V0RGlzY3JldGVTZWxlY3RvciIsImF0dHJpYnV0ZURhdGFUeXBlIiwiZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyIsImF0dHRyaWJ1dGVUb1ZhbHVlTWFwIiwic3R5bGVNYXAiLCJnZXRCeXBhc3NDU1NFbnRyeSIsImN4RWxlbWVudCIsInBvIiwiZ2V0Q1NTTWFwcGluZ0VudHJpZXMiLCJjeE1hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cnkiLCJjb250aW5vdXNNYXBwaW5ncyIsImNvbnRpbm91c01hcHBpbmciLCJjc3NFbnRyeSIsImRpc2NyZXRlTWFwcGluZ3MiLCJkaXNjcmV0ZU1hcHBpbmciLCJOT0RFX1NFTEVDVE9SIiwiRURHRV9TRUxFQ1RPUiIsImdldFZpc3VhbFByb3BlcnRpZXMiLCJkZWZhdWx0Q1NTTm9kZVN0eWxlIiwiZGVmYXVsdENTU0VkZ2VTdHlsZSIsImNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IiLCJtYXBwaW5nQ1NTTm9kZVN0eWxlIiwibWFwcGluZ0NTU0VkZ2VTdHlsZSIsImJ5cGFzc0NTU0VudHJpZXMiLCJuZXR3b3JrIiwiYXBwbHkiLCJlbGVtZW50cyIsImxheW91dCIsIngiLCJ5Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7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QUFERSxDQUFqQixDOzs7Ozs7Ozs7QUM1WUF4RSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPQyxNQUFQLENBQWM7QUFDM0IsYUFBUyxPQURrQjtBQUUzQixhQUFTLE9BRmtCO0FBRzNCLGNBQVUsUUFIaUI7QUFJM0Isd0JBQW9CLGtCQUpPO0FBSzNCLDBCQUFzQixvQkFMSztBQU0zQixhQUFTLE9BTmtCO0FBTzNCLG1CQUFlLE9BUFk7QUFRM0IsZUFBVyxTQVJnQjtBQVMzQixrQkFBYztBQVRhLENBQWQsQ0FBakIsQyIsImZpbGUiOiIuL2J1aWxkL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmNTQxZGMwY2UwY2Y0YjQzNjE5OSIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBDWF9WRVJTSU9OOiAnQ1hWZXJzaW9uJyxcbiAgICBOT0RFOiAnbm9kZScsXG4gICAgRURHRTogJ2VkZ2UnLFxuICAgIE5FVFdPUks6ICduZXR3b3JrJyxcblxuICAgIE5PREVTOiAnbm9kZXMnLFxuICAgIEVER0VTOiAnZWRnZXMnLFxuXG4gICAgSUQ6ICdpZCcsXG4gICAgWDogJ3gnLFxuICAgIFk6ICd5JyxcbiAgICBaOiAneicsXG4gICAgVjogJ3YnLFxuXG4gICAgQVQ6ICdhdCcsXG4gICAgTjogJ24nLFxuICAgIEU6ICdlJyxcblxuICAgIFZJU1VBTF9QUk9QRVJUSUVTOiAndmlzdWFsUHJvcGVydGllcycsXG4gICAgREVGQVVMVDogJ2RlZmF1bHQnLFxuXG4gICAgU1RZTEU6ICdzdHlsZScsXG5cbiAgICBQTzogJ3BvJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N4Q29uc3RhbnRzLmpzIiwiZnVuY3Rpb24gZ2V0Q3hWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcbiAgICBjb25zdCB2ZXJzaW9uQXJyYXkgPSB2ZXJzaW9uU3RyaW5nLnNwbGl0KCcuJykubWFwKChudW1iZXJTdHJpbmcpID0+IHsgcmV0dXJuIHBhcnNlSW50KG51bWJlclN0cmluZywgMTApOyB9KTtcbiAgICBpZiAodmVyc2lvbkFycmF5Lmxlbmd0aCAhPT0gMiAmJiB2ZXJzaW9uQXJyYXkubGVuZ3RoICE9IDMpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSB2ZXJzaW9uIGZvcm1hdDogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxuICAgIHZlcnNpb25BcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAoaXNOYU4oZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93ICdOb24taW50ZWdlciB2YWx1ZSBpbiB2ZXJzaW9uIHN0cmluZzogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdmVyc2lvbkFycmF5O1xufVxuXG5mdW5jdGlvbiBnZXRDeE1ham9yVmVyc2lvbih2ZXJzaW9uU3RyaW5nKSB7XG4gICAgcmV0dXJuIHZlcnNpb25TdHJpbmcgPyBnZXRDeFZlcnNpb24odmVyc2lvblN0cmluZylbMF0gOiAxO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zKGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBcbiAgICBub2RlQXR0cmlidXRlTmFtZU1hcCwgXG4gICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIFxuICAgIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIFxuICAgIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCwgXG4gICAgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIGNvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMuZm9yRWFjaCgoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbikgPT4ge1xuICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnbm9kZXMnXSkge1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnZWRnZXMnXSkge1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWydkJ10pIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLmQpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAoYXR0cmlidXRlTmFtZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2EnXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlRGVjbGFyYXRpb24uYSArICcgc2hvdWxkIGJlIHJlbmFtZWQgdG8gJyArIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgYXR0cmlidXRlTmFtZU1hcC5zZXQoYXR0cmlidXRlRGVjbGFyYXRpb24uYSwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ3YnXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlTmFtZSArICcgaGFzIGRlZmF1bHQgdmFsdWUgJyArIGF0dHJpYnV0ZURlY2xhcmF0aW9uLnYpO1xuICAgICAgICAgICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLnNldChhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbi52KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVJbmZlcnJlZFR5cGVzKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZU5hbWVNYXAsIHYpIHtcbiAgICBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgaWYgKCFhdHRyaWJ1dGVUeXBlTWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IGluZmVycmVkVHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQobmV3S2V5LCBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKHYsIGF0dHJpYnV0ZU5hbWVNYXAsIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIGxldCBkYXRhID0ge307XG4gICAgT2JqZWN0LmtleXModikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICBkYXRhW25ld0tleV0gPSB2W2tleV07XG4gICAgfSk7XG4gICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKCFkYXRhW2tleV0pIHtcbiAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEN4VmVyc2lvbjogZ2V0Q3hWZXJzaW9uLFxuICAgIGdldEN4TWFqb3JWZXJzaW9uOiBnZXRDeE1ham9yVmVyc2lvbixcbiAgICBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zOiBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zLFxuICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXA6IHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcDogdXBkYXRlQXR0cmlidXRlTmFtZU1hcCxcbiAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXA6IHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICB1cGRhdGVJbmZlcnJlZFR5cGVzOiB1cGRhdGVJbmZlcnJlZFR5cGVzLFxuICAgIGdldEV4cGFuZGVkQXR0cmlidXRlcyA6IGdldEV4cGFuZGVkQXR0cmlidXRlc1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hVdGlsLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb252ZXJ0ZXIgPSByZXF1aXJlICgnLi9jb252ZXJ0ZXIuanMnKTtcblxubW9kdWxlLmV4cG9ydHMuY29udmVydCA9IChjeCwgdGFyZ2V0Rm9ybWF0KSA9PiB7IHJldHVybiBjb252ZXJ0ZXIuY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0KTsgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmsgPSByZXF1aXJlICgnLi9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrLmpzJyk7IFxuY29uc3QgY3l0b3NjYXBlSlMgPSByZXF1aXJlICgnLi9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKUy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gdmVyaWZ5VmVyc2lvbihjeCkge1xuICAgIGNvbnN0IGZpcnN0RWxlbWVudCA9IGN4WzBdO1xuICAgIGNvbnN0IHZlcnNpb25TdHJpbmcgPSBmaXJzdEVsZW1lbnRbY3hDb25zdGFudHMuQ1hfVkVSU0lPTl07XG5cbiAgICBjb25zdCBtYWpvclZlcnNpb24gPSBjeFV0aWwuZ2V0Q3hNYWpvclZlcnNpb24odmVyc2lvblN0cmluZyk7XG5cbiAgICBpZiAobWFqb3JWZXJzaW9uICE9PSAyKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgQ1ggdmVyc2lvbjogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQpIHtcbiAgICB2ZXJpZnlWZXJzaW9uKGN4KTtcbiAgICBzd2l0Y2godGFyZ2V0Rm9ybWF0KSB7XG4gICAgICAgIGNhc2UgbGFyZ2VOZXR3b3JrLmNvbnZlcnRlci50YXJnZXRGb3JtYXQ6IHtcbiAgICAgICAgICAgIHJldHVybiBsYXJnZU5ldHdvcmsuY29udmVydGVyLmNvbnZlcnQoY3gpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgY3l0b3NjYXBlSlMuY29udmVydGVyLnRhcmdldEZvcm1hdDoge1xuICAgICAgICAgICAgcmV0dXJuIGN5dG9zY2FwZUpTLmNvbnZlcnRlci5jb252ZXJ0KGN4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydDogY29udmVydFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udmVydGVyLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmtDb25zdGFudHMgPSByZXF1aXJlKCcuL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpIHtcbiAgICBjb25zdCB0YXJnZXRTdHlsZUVudHJ5ID0ge307XG4gICAgdGFyZ2V0U3R5bGVFbnRyeVt0YXJnZXRTdHlsZUZpZWxkXSA9IHBvcnRhYmxlUHJvcGVydFZhbHVlO1xuICAgIHJldHVybiB0YXJnZXRTdHlsZUVudHJ5O1xufVxuXG5mdW5jdGlvbiBoZXhUb1JHQihoZXgpIHtcbiAgICBsZXQgciA9IDAsIGcgPSAwLCBiID0gMDtcblxuICAgIC8vIDMgZGlnaXRzXG4gICAgaWYgKGhleC5sZW5ndGggPT0gNCkge1xuICAgICAgICByID0gXCIweFwiICsgaGV4WzFdICsgaGV4WzFdO1xuICAgICAgICBnID0gXCIweFwiICsgaGV4WzJdICsgaGV4WzJdO1xuICAgICAgICBiID0gXCIweFwiICsgaGV4WzNdICsgaGV4WzNdO1xuXG4gICAgICAgIC8vIDYgZGlnaXRzXG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDcpIHtcbiAgICAgICAgciA9IFwiMHhcIiArIGhleFsxXSArIGhleFsyXTtcbiAgICAgICAgZyA9IFwiMHhcIiArIGhleFszXSArIGhleFs0XTtcbiAgICAgICAgYiA9IFwiMHhcIiArIGhleFs1XSArIGhleFs2XTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3BhcnNlSW50KHIpLCBwYXJzZUludChnKSwgcGFyc2VJbnQoYildO1xufVxuXG5mdW5jdGlvbiBhbHBoYVRvSW50KGFscGhhRGVjaW1hbCkge1xuICAgIHJldHVybiBjbGFtcChNYXRoLnJvdW5kKGFscGhhRGVjaW1hbCAqIDI1NSksMCwyNTUpO1xufVxuXG5jb25zdCBkZWZhdWx0UHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9XSURUSCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoJ3dpZHRoJywgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCgnaGVpZ2h0JywgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmNvbG9yLCBoZXhUb1JHQihwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCgnYWxwaGEnLCBhbHBoYVRvSW50KHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9MQUJFTCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMud2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCdhbHBoYScsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5jb2xvciwgaGV4VG9SR0IocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSlcbiAgICB9XG59XG5cblxuXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWVzKGRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzKSB7XG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgbm9kZToge30sXG4gICAgICAgIGVkZ2U6IHt9XG4gICAgfTtcbiAgICBpZiAoZGVmYXVsdFZpc3VhbFByb3BlcnRpZXNbJ25vZGUnXSkge1xuICAgICAgICBjb25zdCBub2RlRGVmYXVsdCA9IGRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzLm5vZGU7XG4gICAgICAgIGNvbnN0IGxudkVudHJpZXMgPSBnZXRMTlZWYWx1ZXMoJ25vZGUnLCBub2RlRGVmYXVsdCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0Lm5vZGUsIGxudkVudHJpZXMpO1xuICAgIH1cbiAgICBpZiAoZGVmYXVsdFZpc3VhbFByb3BlcnRpZXNbJ2VkZ2UnXSkge1xuICAgICAgICBjb25zdCBlZGdlRGVmYXVsdCA9IGRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzLmVkZ2U7XG4gICAgICAgIGNvbnN0IGxudkVudHJpZXMgPSBnZXRMTlZWYWx1ZXMoJ2VkZ2UnLCBlZGdlRGVmYXVsdCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0LmVkZ2UsIGxudkVudHJpZXMpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRMTlZWYWx1ZXMoZW50aXR5VHlwZSwgZW50cmllcykge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhlbnRyaWVzKS5mb3JFYWNoKHBvcnRhYmxlUHJvcGVydHlLZXkgPT4ge1xuICAgICAgICBjb25zdCBwb3J0YWJsZVByb3BlcnR5VmFsdWUgPSBlbnRyaWVzW3BvcnRhYmxlUHJvcGVydHlLZXldO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3QgbG52RW50cnkgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhsbnZFbnRyeSkuZm9yRWFjaChsbnZLZXkgPT4ge1xuICAgICAgICAgICAgICAgIG91dHB1dFtsbnZLZXldID0gbG52RW50cnlbbG52S2V5XTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzQ29sb3IoY29sb3JBcnJheSwgYWxwaGEpIHtcbiAgICByZXR1cm4gY29sb3JBcnJheSAhPSB1bmRlZmluZWRcbiAgICAgICAgPyBhbHBoYSAhPSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gW2NvbG9yQXJyYXlbMF0sIGNvbG9yQXJyYXlbMV0sIGNvbG9yQXJyYXlbMl0sIGFscGhhXVxuICAgICAgICAgICAgOiBbY29sb3JBcnJheVswXSwgY29sb3JBcnJheVsxXSwgY29sb3JBcnJheVsyXV1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NTaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgod2lkdGgsIGhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NOb2RlVmlldyhub2RlVmlldykge1xuICAgIGxldCB3aWR0aCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgaGVpZ2h0ID0gdW5kZWZpbmVkO1xuICAgIGxldCBjb2xvckFycmF5ID0gdW5kZWZpbmVkO1xuICAgIGxldCBhbHBoYSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBpZDogbm9kZVZpZXcuaWQsXG4gICAgICAgIHBvc2l0aW9uOiBub2RlVmlldy5wb3NpdGlvblxuICAgIH07XG5cblxuICAgIE9iamVjdC5rZXlzKG5vZGVWaWV3KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChrZXkgPT09ICd3aWR0aCcpIHtcbiAgICAgICAgICAgIHdpZHRoID0gbm9kZVZpZXcud2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnaGVpZ2h0Jykge1xuICAgICAgICAgICAgaGVpZ2h0ID0gbm9kZVZpZXcuaGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2NvbG9yJykge1xuICAgICAgICAgICAgY29sb3JBcnJheSA9IG5vZGVWaWV3LmNvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2FscGhhJykge1xuICAgICAgICAgICAgYWxwaGEgPSBub2RlVmlldy5hbHBoYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dHB1dFtrZXldID0gbm9kZVZpZXdba2V5XTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29sb3IgPSBwcm9jZXNzQ29sb3IoY29sb3JBcnJheSwgYWxwaGEpO1xuICAgIGlmIChjb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmNvbG9yXSA9IGNvbG9yO1xuICAgIH1cblxuICAgIGNvbnN0IHNpemUgPSBwcm9jZXNzU2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICBpZiAoc2l6ZSkge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnNpemVdID0gcHJvY2Vzc1NpemUod2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NFZGdlVmlldyhlZGdlVmlldykge1xuICAgIGxldCBjb2xvckFycmF5ID0gdW5kZWZpbmVkO1xuICAgIGxldCBhbHBoYSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIGlkOiBlZGdlVmlldy5pZCxcbiAgICAgICAgczogZWRnZVZpZXcucyxcbiAgICAgICAgdDogZWRnZVZpZXcudFxuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKGVkZ2VWaWV3KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChrZXkgPT09ICdjb2xvcicpIHtcbiAgICAgICAgICAgIGNvbG9yQXJyYXkgPSBlZGdlVmlldy5jb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdhbHBoYScpIHtcbiAgICAgICAgICAgIGFscGhhID0gZWRnZVZpZXcuYWxwaGE7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbG9yID0gcHJvY2Vzc0NvbG9yKGNvbG9yQXJyYXksIGFscGhhKTtcbiAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5jb2xvcl0gPSBjb2xvcjtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0TWFwcGluZ3MobWFwcGluZ3MpIHtcbiAgICBsZXQgb3V0cHV0ID0ge31cbiAgICBPYmplY3Qua2V5cyhtYXBwaW5ncykuZm9yRWFjaChwcm9wZXJ0eUtleSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcHBpbmcgPSBtYXBwaW5nc1twcm9wZXJ0eUtleV07XG4gICAgICAgIG91dHB1dFttYXBwaW5nLmRlZmluaXRpb24uYXR0cmlidXRlXSA9IHtcbiAgICAgICAgICAgIHR5cGU6IG1hcHBpbmcudHlwZSxcbiAgICAgICAgICAgIHZwOiBwcm9wZXJ0eUtleSxcbiAgICAgICAgICAgIGRlZmluaXRpb246IG1hcHBpbmcuZGVmaW5pdGlvblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGVSYXRpbyhhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgpIHtcbiAgICByZXR1cm4gYXR0cmlidXRlVmFsdWUgLyAoYXR0cmlidXRlTWF4IC0gYXR0cmlidXRlTWluKTtcbn1cblxuZnVuY3Rpb24gZ2V0VnBSYW5nZSh2cE1pbiwgdnBNYXgpIHtcbiAgICByZXR1cm4gdnBNYXggLSB2cE1pbjtcbn1cblxuZnVuY3Rpb24gZ2V0TWFwKHZwTWluLCB2cFJhbmdlLCBhdHRyaWJ1dGVSYXRpbykge1xuICAgIHJldHVybiB2cE1pbiArIHZwUmFuZ2UgKiBhdHRyaWJ1dGVSYXRpbztcbn1cblxuZnVuY3Rpb24gY2xhbXAodmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbHVlLCBtaW4pLCBtYXgpO1xuICB9XG5cbmZ1bmN0aW9uIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVSYXRpbyA9IGdldEF0dHJpYnV0ZVJhdGlvKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCk7XG4gICAgY29uc3QgdnBSYW5nZSA9Z2V0VnBSYW5nZSh2cE1pbiwgdnBNYXgpO1xuXG4gICAgY29uc3Qgb3V0cHV0ID0gZ2V0TWFwKHZwTWluLCB2cFJhbmdlLCBhdHRyaWJ1dGVSYXRpbyk7XG4gICBcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpIHtcbiAgICBjb25zdCBtaW5SR0IgPSBoZXhUb1JHQih2cE1pbik7XG4gICAgY29uc3QgbWF4UkdCID0gaGV4VG9SR0IodnBNYXgpO1xuXG4gICAgY29uc3QgYXR0cmlidXRlUmF0aW8gPSBnZXRBdHRyaWJ1dGVSYXRpbyhhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgpO1xuICAgIFxuICAgIGNvbnN0IHJSYW5nZSA9IGdldFZwUmFuZ2UobWluUkdCWzBdLCBtYXhSR0JbMV0pO1xuICAgIGNvbnN0IGdSYW5nZSA9IGdldFZwUmFuZ2UobWluUkdCWzFdLCBtYXhSR0JbMV0pO1xuICAgIGNvbnN0IGJSYW5nZSA9IGdldFZwUmFuZ2UobWluUkdCWzJdLCBtYXhSR0JbMl0pO1xuXG4gICAgY29uc3Qgb3V0cHV0ID0gW1xuICAgICAgICBjbGFtcChNYXRoLnJvdW5kKGdldE1hcChtaW5SR0JbMF0sIHJSYW5nZSwgYXR0cmlidXRlUmF0aW8pKSwgMCwgMjU1KSxcbiAgICAgICAgY2xhbXAoTWF0aC5yb3VuZChnZXRNYXAobWluUkdCWzFdLCBnUmFuZ2UsIGF0dHJpYnV0ZVJhdGlvKSksIDAsIDI1NSksXG4gICAgICAgIGNsYW1wKE1hdGgucm91bmQoZ2V0TWFwKG1pblJHQlsyXSwgYlJhbmdlLCBhdHRyaWJ1dGVSYXRpbykpLCAwLCAyNTUpXG4gICAgXVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZVJhdGlvID0gZ2V0QXR0cmlidXRlUmF0aW8oYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4KTtcbiAgICBjb25zdCB2cFJhbmdlID1nZXRWcFJhbmdlKHZwTWluLCB2cE1heCk7XG5cbiAgICBjb25zdCBhbHBoYURlY2ltYWwgPSBnZXRNYXAodnBNaW4sIHZwUmFuZ2UsIGF0dHJpYnV0ZVJhdGlvKTtcblxuICAgIHJldHVybiBhbHBoYXRvSW50KGFscGhhRGVjaW1hbCk7XG59XG5cbmNvbnN0IGNvbnRpbnVvdXNQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1dJRFRIJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCd3aWR0aCcsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCdoZWlnaHQnLCBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmNvbG9yLCBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCdhbHBoYScsIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy53aWR0aCwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCdhbHBoYScsIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5jb2xvciwgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzSW5SYW5nZShhdHRyaWJ1dGVWYWx1ZSwgbWluLCBtYXgsIGluY2x1ZGVNaW4sIGluY2x1ZGVNYXgpIHsgXG4gICAgY29uc3QgbWluU2F0aXNmaWVkID0gaW5jbHVkZU1pbiA/IG1pbiA8PSBhdHRyaWJ1dGVWYWx1ZSA6IG1pbiA8IGF0dHJpYnV0ZVZhbHVlO1xuICAgIGNvbnN0IG1heFNhdGlzZmllZCA9IGluY2x1ZGVNYXggPyBtYXggPj0gYXR0cmlidXRlVmFsdWUgOiBtaW4gPCBhdHRyaWJ1dGVWYWx1ZTtcbiAgICBjb25zb2xlLmxvZygnaXNJblJhbmdlOiAnICsgYXR0cmlidXRlVmFsdWUgKyAnICcgKyBtaW4gKyAnICcgKyBtYXggKyAnICcgKyBpbmNsdWRlTWluICsgJyAnICsgaW5jbHVkZU1heCArICcgJyArIG1pblNhdGlzZmllZCArICcgJyArIG1heFNhdGlzZmllZCk7XG4gICAgcmV0dXJuIG1pblNhdGlzZmllZCAmJiBtYXhTYXRpc2ZpZWQ7ICAgXG59XG5cbmZ1bmN0aW9uIGdldE1hcHBwZWRWYWx1ZXMobWFwcGluZ3MsIGVudGl0eVR5cGUsIGF0dHJpYnV0ZXMpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChhdHRyaWJ1dGVLZXkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlS2V5XTtcbiAgICAgICAgaWYgKG1hcHBpbmdzW2VudGl0eVR5cGVdW2F0dHJpYnV0ZUtleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcHBpbmcgPSBtYXBwaW5nc1tlbnRpdHlUeXBlXVthdHRyaWJ1dGVLZXldO1xuICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAobWFwcGluZy50eXBlID09PSAnRElTQ1JFVEUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlTWFwID0gbWFwcGluZy5kZWZpbml0aW9uLm1hcDtcbiAgICAgICAgICAgICAgICAgICAgZGlzY3JldGVNYXAuZm9yRWFjaChrZXlWYWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5VmFsdWUudiA9PSBhdHRyaWJ1dGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udmVydGVkID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXShrZXlWYWx1ZS52cCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0LCBjb252ZXJ0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXBwaW5nLnR5cGUgPT09ICdQQVNTVEhST1VHSCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udmVydGVkID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXShhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgY29udmVydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWFwcGluZy50eXBlID09PSAnQ09OVElOVU9VUycpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGludW91c01hcHBpbmdzID0gbWFwcGluZy5kZWZpbml0aW9uLm1hcDtcbiAgICAgICAgICAgICAgICAgICAgY29udGludW91c01hcHBpbmdzLmZvckVhY2gobWFwcGluZ1JhbmdlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgnbWluJyBpbiBtYXBwaW5nUmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAnbWF4JyBpbiBtYXBwaW5nUmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAnaW5jbHVkZU1pbicgaW4gbWFwcGluZ1JhbmdlIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmICdpbmNsdWRlTWF4JyBpbiBtYXBwaW5nUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNJblJhbmdlKGF0dHJpYnV0ZVZhbHVlLCBtYXBwaW5nUmFuZ2UubWluLCBtYXBwaW5nUmFuZ2UubWF4LCBtYXBwaW5nUmFuZ2UuaW5jbHVkZU1pbiwgbWFwcGluZ1JhbmdlLmluY2x1ZGVNYXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBjb250aW51b3VzUHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSBjb250aW51b3VzUHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKGF0dHJpYnV0ZVZhbHVlLCBtYXBwaW5nUmFuZ2UubWluLCBtYXBwaW5nUmFuZ2UubWF4LCBtYXBwaW5nUmFuZ2UubWluVlBWYWx1ZSwgbWFwcGluZ1JhbmdlLm1heFZQVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIGNvbnZlcnRlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gbG52Q29udmVydChjeCkge1xuXG4gICAgLy9GaXJzdCBwYXNzLiBcbiAgICAvLyBXZSBtYXkgbmVlZCB0byBjb2xsZWN0IG9iamVjdCBhdHRyaWJ1dGVzIHRvIGNhbGN1bGF0ZVxuICAgIC8vIG1hcHBpbmdzIGluIHRoZSBzZWNvbmQgcGFzcy4gXG5cbiAgICBsZXQgY3hWaXN1YWxQcm9wZXJ0aWVzO1xuXG4gICAgbGV0IG5vZGVBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgIGxldCBub2RlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcbiAgICBsZXQgZWRnZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICBsZXQgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcbiAgICBsZXQgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgIGxldCBkZWZhdWx0VmFsdWVzID0gdW5kZWZpbmVkO1xuICAgIGxldCBtYXBwaW5ncyA9IHtcbiAgICAgICAgbm9kZToge30sXG4gICAgICAgIGVkZ2U6IHt9XG4gICAgfVxuICAgIGxldCBieXBhc3NNYXBwaW5ncyA9IHtcbiAgICAgICAgJ25vZGUnOiB7fSxcbiAgICAgICAgJ2VkZ2UnOiB7fVxuICAgIH07XG5cbiAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICBpZiAoY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyA9IGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXTtcbiAgICAgICAgICAgIGN4VXRpbC5wcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zKGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLFxuICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsXG4gICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhub2RlQXR0cmlidXRlVHlwZU1hcCwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4Tm9kZVsndiddKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcbiAgICAgICAgICAgIGN4RWRnZXMuZm9yRWFjaCgoY3hFZGdlKSA9PiB7XG4gICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEVkZ2VbJ3YnXSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ10pIHtcbiAgICAgICAgICAgIGN4VmlzdWFsUHJvcGVydGllcyA9IGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ107XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBvdXRwdXQgPSB7fTtcblxuICAgIGxldCBub2RlVmlld3MgPSBbXTtcbiAgICBsZXQgZWRnZVZpZXdzID0gW107XG5cbiAgICBjeFZpc3VhbFByb3BlcnRpZXMuZm9yRWFjaCh2cEVsZW1lbnQgPT4ge1xuICAgICAgICBjb25zdCB2cEF0ID0gdnBFbGVtZW50LmF0O1xuICAgICAgICBpZiAodnBBdCA9PT0gY3hDb25zdGFudHMuU1RZTEUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdnBFbGVtZW50LnY7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0U3R5bGVzID0gdmFsdWUuZGVmYXVsdDtcblxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlcyA9IGdldERlZmF1bHRWYWx1ZXMoZGVmYXVsdFN0eWxlcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbGFyZ2UgbmV0d29yayBkZWZhdWx0IHN0eWxlID0gJyArIEpTT04uc3RyaW5naWZ5KGRlZmF1bHRWYWx1ZXMsIG51bGwsIDIpKTtcblxuICAgICAgICAgICAgbWFwcGluZ3Mubm9kZSA9IHZhbHVlLm5vZGVNYXBwaW5nID8gZ2V0TWFwcGluZ3ModmFsdWUubm9kZU1hcHBpbmcpIDoge307XG4gICAgICAgICAgICAvL21hcHBpbmdDU1NOb2RlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhub2RlTWFwcGluZywgJ25vZGUnLCBub2RlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgICAgIG1hcHBpbmdzLmVkZ2UgPSB2YWx1ZS5lZGdlTWFwcGluZyA/IGdldE1hcHBpbmdzKHZhbHVlLmVkZ2VNYXBwaW5nKSA6IHt9O1xuXG4gICAgICAgICAgICAvL21hcHBpbmdDU1NFZGdlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhlZGdlTWFwcGluZywgJ2VkZ2UnLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5OKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHZwRWxlbWVudFtjeENvbnN0YW50cy5QT10udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IGdldExOVlZhbHVlcygnbm9kZScsIHZwRWxlbWVudC52KVxuXG4gICAgICAgICAgICBpZiAoIWJ5cGFzc01hcHBpbmdzLm5vZGVba2V5XSkge1xuICAgICAgICAgICAgICAgIGJ5cGFzc01hcHBpbmdzLm5vZGVba2V5XSA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYnlwYXNzIGNhbGN1bGF0ZWQ6ICcgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZXMsIG51bGwsIDIpKTtcblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0sIHZhbHVlcyk7XG4gICAgICAgICAgICAvL2J5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnbm9kZScsIHZwRWxlbWVudCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHZwQXQgPT09IGN4Q29uc3RhbnRzLkUpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHZwRWxlbWVudFtjeENvbnN0YW50cy5QT10udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IGdldExOVlZhbHVlcygnZWRnZScsIHZwRWxlbWVudC52KVxuXG4gICAgICAgICAgICBpZiAoIWJ5cGFzc01hcHBpbmdzLmVkZ2Vba2V5XSkge1xuICAgICAgICAgICAgICAgIGJ5cGFzc01hcHBpbmdzLmVkZ2Vba2V5XSA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYnlwYXNzIGNhbGN1bGF0ZWQ6ICcgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZXMsIG51bGwsIDIpKTtcblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihieXBhc3NNYXBwaW5ncy5lZGdlW2tleV0sIHZhbHVlcyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKCdtYXBwaW5nczogJyArIEpTT04uc3RyaW5naWZ5KG1hcHBpbmdzLCBudWxsLCAyKSk7XG5cbiAgICAvL1NlY29uZCBwYXNzLiBcbiAgICAvLyBIZXJlIGlzIHdoZXJlIHRoZSBhY3R1YWwgb3V0cHV0IGlzIGdlbmVyYXRlZC5cblxuICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuXG5cbiAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hJZCA9IGN4Tm9kZVtjeENvbnN0YW50cy5JRF0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZVZpZXcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBjeElkLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogY3hOb2RlWyd6J10gP1xuICAgICAgICAgICAgICAgICAgICAgICAgW2N4Tm9kZVsneCddLCBjeE5vZGVbJ3knXSwgY3hOb2RlWyd6J11dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFtjeE5vZGVbJ3gnXSwgY3hOb2RlWyd5J11dXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9UT0RPIGNhbGN1bGF0ZSBsbnYgdnBzIGJhc2VkIG9uIGRlZmF1bHRzIGFuZCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdE5vZGVWaXN1YWxQcm9wZXJ0aWVzID0gZGVmYXVsdFZhbHVlc1snbm9kZSddO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG5vZGVWaWV3LCBkZWZhdWx0Tm9kZVZpc3VhbFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0Fzc2lnbiBtYXBwaW5nc1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkQXR0cmlidXRlcyA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hOb2RlWyd2J10sIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBwaW5nVmFsdWVzID0gZ2V0TWFwcHBlZFZhbHVlcyhtYXBwaW5ncywgJ25vZGUnLCBleHBhbmRlZEF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obm9kZVZpZXcsIG1hcHBpbmdWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgLy9Bc3NpZ24gYnlwYXNzXG4gICAgICAgICAgICAgICAgaWYgKGJ5cGFzc01hcHBpbmdzLm5vZGVbY3hJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlVmlldywgYnlwYXNzTWFwcGluZ3Mubm9kZVtjeElkXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkTm9kZVZpZXcgPSBwcm9jZXNzTm9kZVZpZXcobm9kZVZpZXcpO1xuXG4gICAgICAgICAgICAgICAgbm9kZVZpZXdzLnB1c2gocHJvY2Vzc2VkTm9kZVZpZXcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuXG4gICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeEVkZ2VbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRnZVZpZXcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBjeElkLFxuICAgICAgICAgICAgICAgICAgICBzOiBjeEVkZ2Uucy50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICB0OiBjeEVkZ2UudC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9UT0RPIGNhbGN1bGF0ZSBsbnYgdnBzIGJhc2VkIG9uIGRlZmF1bHRzIGFuZCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdEVkZ2VWaXN1YWxQcm9wZXJ0aWVzID0gZGVmYXVsdFZhbHVlc1snZWRnZSddO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBkZWZhdWx0RWRnZVZpc3VhbFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkQXR0cmlidXRlcyA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hFZGdlWyd2J10sIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBwaW5nVmFsdWVzID0gZ2V0TWFwcHBlZFZhbHVlcyhtYXBwaW5ncywgJ25vZGUnLCBleHBhbmRlZEF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWRnZVZpZXcsIG1hcHBpbmdWYWx1ZXMpO1xuICAgICAgICAgICAgICAgIC8vQXNzaWduIGJ5cGFzc1xuICAgICAgICAgICAgICAgIGlmIChieXBhc3NNYXBwaW5ncy5lZGdlW2N4SWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWRnZVZpZXcsIGJ5cGFzc01hcHBpbmdzLmVkZ2VbY3hJZF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEVkZ2VWaWV3ID0gcHJvY2Vzc0VkZ2VWaWV3KGVkZ2VWaWV3KTtcblxuICAgICAgICAgICAgICAgIGVkZ2VWaWV3cy5wdXNoKHByb2Nlc3NlZEVkZ2VWaWV3KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLm5vZGVWaWV3c10gPSBub2RlVmlld3M7XG4gICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5lZGdlVmlld3NdID0gZWRnZVZpZXdzO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdsbnYnLFxuICAgIGNvbnZlcnQ6IChjeCkgPT4ge1xuICAgICAgICByZXR1cm4gbG52Q29udmVydChjeCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0ZXI6IGNvbnZlcnRlclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICAnbm9kZVZpZXdzJzogJ25vZGVWaWV3cycsXG4gICAgJ2VkZ2VWaWV3cyc6ICdlZGdlVmlld3MnLCBcbiAgICAnaWQnOiAnaWQnLFxuICAgICdwb3NpdGlvbic6ICdwb3NpdGlvbicsXG4gICAgJ3MnOiAncycsXG4gICAgJ3QnOiAndCcsXG4gICAgJ2xhYmVsJzogJ2xhYmVsJywgXG4gICAgJ2NvbG9yJzogJ2NvbG9yJyxcbiAgICAnbGluZV9jb2xvcic6ICdsaW5lLWNvbG9yJyxcbiAgICAnc2l6ZScgOiAnc2l6ZScsXG4gICAgJ3dpZHRoJyA6ICd3aWR0aCdcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBqc0NvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3l0b3NjYXBlSlNDb25zdGFudHMuanMnKTtcbmNvbnN0IGN4VXRpbCA9IHJlcXVpcmUoJy4uL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKSB7XG4gICAgY29uc3QgdGFyZ2V0U3R5bGVFbnRyeSA9IG5ldyBNYXAoKTtcbiAgICB0YXJnZXRTdHlsZUVudHJ5LnNldCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSk7XG4gICAgcmV0dXJuIHRhcmdldFN0eWxlRW50cnk7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbn1cblxuZnVuY3Rpb24gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgY29uc3Qgb3V0cHV0ID0ge307XG4gICAgb3V0cHV0W3RhcmdldFN0eWxlRmllbGRdID0gJ2RhdGEoJyArIGF0dHJpYnV0ZU5hbWUgKyAnKSc7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgcGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfU0hBUEUnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG59XG5mdW5jdGlvbiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9ICdtYXBEYXRhKCcgKyBhdHRyaWJ1dGVOYW1lXG4gICAgICAgICsgJywgJyArIG1pblZhbHVlXG4gICAgICAgICsgJywgJyArIG1heFZhbHVlXG4gICAgICAgICsgJywgJyArIG1pblZQXG4gICAgICAgICsgJywgJyArIG1heFZQXG4gICAgICAgICsgJyknO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IG1hcERhdGFQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKVxuICAgIH0sXG59XG5cblxuZnVuY3Rpb24gZ2V0Q1NTU3R5bGVFbnRyaWVzKGN4U3R5bGVFbnRyaWVzLCBlbnRpdHlUeXBlKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4U3R5bGVFbnRyaWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gY3hTdHlsZUVudHJpZXNba2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgY3NzRW50cmllcyA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgY3NzRW50cmllcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0SWRTZWxlY3RvcihpZCwgZWxlbWVudFR5cGUpIHtcbiAgICAvL25vZGUjaWQgb3IgZWRnZSNpZFxuICAgIHJldHVybiBlbGVtZW50VHlwZSArICcjJyArIGlkO1xufVxuXG5cblxuZnVuY3Rpb24gZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpIHtcbiAgICByZXR1cm4geyAnc2VsZWN0b3InOiBzZWxlY3RvciwgJ3N0eWxlJzogY3NzIH07XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIGluY2x1ZGVNaW4sIGluY2x1ZGVNYXgpIHtcbiAgICBjb25zdCBtaW5Db25kaXRpb24gPSBpbmNsdWRlTWluID8gJz49JyA6ICc+JztcbiAgICBjb25zdCBtYXhDb25kaXRpb24gPSBpbmNsdWRlTWF4ID8gJzw9JyA6ICc8JztcblxuICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICcgJyArIG1pbkNvbmRpdGlvbiArICcgJyArIG1pblZhbHVlICsgJ11bJyArIGF0dHJpYnV0ZU5hbWUgKyAnICcgKyBtYXhDb25kaXRpb24gKyAnICcgKyBtYXhWYWx1ZSArICddJ1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzU3R5bGUoZW50aXR5VHlwZSwgcG9ydGFibGVQcm9wZXJ0eUtleSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgaWYgKG1hcERhdGFQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgcmV0dXJuIG1hcERhdGFQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnYXR0cmlidXRlJ107XG4gICAgY29uc3QgcmFuZ2VNYXBzID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgY29uc29sZS5sb2coJ2NvbnRpbnVvdXMgbWFwcGluZyBmb3IgJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgSlNPTi5zdHJpbmdpZnkocmFuZ2VNYXBzLCBudWxsLCAyKSk7XG5cbiAgICByYW5nZU1hcHMuZm9yRWFjaCgocmFuZ2UpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRDb250aW51b3VzU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIHJhbmdlLmluY2x1ZGVNaW4sIHJhbmdlLmluY2x1ZGVNYXgpO1xuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbnRpbnVvdXNTdHlsZShlbnRpdHlUeXBlLCBwb3J0YWJsZVByb3BlcnR5S2V5LCBhdHRyaWJ1dGVOYW1lLCByYW5nZS5taW4sIHJhbmdlLm1heCwgcmFuZ2UubWluVlBWYWx1ZSwgcmFuZ2UubWF4VlBWYWx1ZSk7XG5cbiAgICAgICAgb3V0cHV0LnB1c2goZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBzdHlsZSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUpIHtcbiAgICBpZiAocGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICBjb25zdCBjc3MgPSBwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGN4TWFwcGluZ0RlZmluaXRpb24uYXR0cmlidXRlKTtcbiAgICAgICAgcmV0dXJuIGdldFN0eWxlRWxlbWVudChlbnRpdHlUeXBlLCBjc3MpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEYXRhVHlwZSwgYXR0cmlidXRlVmFsdWUpIHtcbiAgICBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyA9IFxcJycgKyBhdHRyaWJ1dGVWYWx1ZSArICdcXCddJztcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZURhdGFUeXBlID09ICdib29sZWFuJykge1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVWYWx1ZSA9PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1s/JyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnXVshJyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gJyArIGF0dHJpYnV0ZVZhbHVlICsgJ10nO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyhwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIGNvbnN0IGF0dHRyaWJ1dGVUb1ZhbHVlTWFwID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ2F0dHJpYnV0ZSddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZURhdGFUeXBlID0gYXR0cmlidXRlVHlwZU1hcC5nZXQoYXR0cmlidXRlTmFtZSk7XG4gICAgYXR0dHJpYnV0ZVRvVmFsdWVNYXAuZm9yRWFjaCgoZGlzY3JldGVNYXApID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJyBkaXNjcmV0ZSBtYXAgZm9yICcgKyBwb3J0YWJsZVByb3BlcnR5S2V5ICsgJzogJyArIGRpc2NyZXRlTWFwLnYgKyAnICgnICsgYXR0cmlidXRlTmFtZSArICc8JyArIGF0dHJpYnV0ZURhdGFUeXBlICsgJz4pIC0+ICcgKyBkaXNjcmV0ZU1hcC52cCk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXREaXNjcmV0ZVNlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURhdGFUeXBlLCBkaXNjcmV0ZU1hcC52KTtcblxuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGRpc2NyZXRlTWFwLnZwKTtcbiAgICAgICAgICAgIGNvbnN0IGNzcyA9IHt9O1xuICAgICAgICAgICAgc3R5bGVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGNzc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcgICBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGNzcykpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIHJldHVybiBvdXRwdXQ7IC8vZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpO1xufVxuXG5mdW5jdGlvbiBnZXRCeXBhc3NDU1NFbnRyeShlbnRpdHlUeXBlLCBjeEVsZW1lbnQpIHtcblxuICAgIGNvbnN0IGlkID0gY3hFbGVtZW50LnBvO1xuICAgIGNvbnN0IGNzcyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4RWxlbWVudC52KS5mb3JFYWNoKChwb3J0YWJsZVByb3BlcnR5S2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGN4RWxlbWVudC52W3BvcnRhYmxlUHJvcGVydHlLZXldO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICBzdHlsZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY3NzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWxlY3RvciA9IGdldElkU2VsZWN0b3IoaWQpO1xuICAgIHJldHVybiBnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcyk7XG59XG5cbi8qKiBcbiAqIFxuKi9cbmZ1bmN0aW9uIGdldENTU01hcHBpbmdFbnRyaWVzKFxuICAgIGN4TWFwcGluZ0VudHJpZXMsXG4gICAgZW50aXR5VHlwZSxcbiAgICBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGN4TWFwcGluZ0VudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBjeE1hcHBpbmdFbnRyeSA9IGN4TWFwcGluZ0VudHJpZXNba2V5XTtcbiAgICAgICAgY29uc29sZS5sb2coXCIgbWFwcGluZyB0eXBlOiBcIiArIGN4TWFwcGluZ0VudHJ5LnR5cGUpO1xuICAgICAgICBzd2l0Y2ggKGN4TWFwcGluZ0VudHJ5LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0NPTlRJTlVPVVMnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGlub3VzTWFwcGluZ3MgPSBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKTtcbiAgICAgICAgICAgICAgICBjb250aW5vdXNNYXBwaW5ncy5mb3JFYWNoKChjb250aW5vdXNNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGNvbnRpbm91c01hcHBpbmcpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdQQVNTVEhST1VHSCc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjc3NFbnRyeSA9IGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNzc0VudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGNzc0VudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdESVNDUkVURSc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNjcmV0ZU1hcHBpbmdzID0gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyhrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApO1xuICAgICAgICAgICAgICAgIGRpc2NyZXRlTWFwcGluZ3MuZm9yRWFjaCgoZGlzY3JldGVNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGRpc2NyZXRlTWFwcGluZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IE5PREVfU0VMRUNUT1IgPSAnbm9kZSc7XG5jb25zdCBFREdFX1NFTEVDVE9SID0gJ2VkZ2UnO1xuXG5mdW5jdGlvbiBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgc3R5bGU6IFtdLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGxldCBkZWZhdWx0Q1NTTm9kZVN0eWxlID0gdW5kZWZpbmVkO1xuICAgIGxldCBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgbWFwcGluZ0NTU05vZGVTdHlsZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbWFwcGluZ0NTU0VkZ2VTdHlsZSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBieXBhc3NDU1NFbnRyaWVzID0gW107XG5cbiAgICBjeFZpc3VhbFByb3BlcnRpZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHZwQXQgPSB2cEVsZW1lbnQuYXQ7XG4gICAgICAgIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5TVFlMRSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2cEVsZW1lbnQudjtcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZXMgPSB2YWx1ZS5kZWZhdWx0O1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncG9ydGFibGUgbm9kZSBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGRlZmF1bHRTdHlsZXMubm9kZSkpO1xuICAgICAgICAgICAgZGVmYXVsdENTU05vZGVTdHlsZSA9IGdldENTU1N0eWxlRW50cmllcyhkZWZhdWx0U3R5bGVzLm5vZGUsICdub2RlJyk7XG4gICAgICAgICAgICBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gZ2V0Q1NTU3R5bGVFbnRyaWVzKGRlZmF1bHRTdHlsZXMuZWRnZSwgJ2VkZ2UnKTtcblxuICAgICAgICAgICAgY3NzTmV0d29ya0JhY2tncm91bmRDb2xvciA9IGRlZmF1bHRTdHlsZXMubmV0d29ya1snYmFja2dyb3VuZC1jb2xvciddO1xuXG4gICAgICAgICAgICBjb25zdCBub2RlTWFwcGluZyA9IHZhbHVlLm5vZGVNYXBwaW5nO1xuICAgICAgICAgICAgbWFwcGluZ0NTU05vZGVTdHlsZSA9IGdldENTU01hcHBpbmdFbnRyaWVzKG5vZGVNYXBwaW5nLCAnbm9kZScsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICAgICAgY29uc3QgZWRnZU1hcHBpbmcgPSB2YWx1ZS5lZGdlTWFwcGluZztcbiAgICAgICAgICAgIG1hcHBpbmdDU1NFZGdlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhlZGdlTWFwcGluZywgJ2VkZ2UnLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5OKSB7XG4gICAgICAgICAgICBieXBhc3NDU1NFbnRyaWVzLnB1c2goZ2V0QnlwYXNzQ1NTRW50cnkoJ25vZGUnLCB2cEVsZW1lbnQpKTtcbiAgICAgICAgfSBlbHNlIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5FKSB7XG4gICAgICAgICAgICBieXBhc3NDU1NFbnRyaWVzLnB1c2goZ2V0QnlwYXNzQ1NTRW50cnkoJ2VkZ2UnLCB2cEVsZW1lbnQpKTtcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zb2xlLmxvZygnZGVmYXVsdCBub2RlIHN0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkoZGVmYXVsdENTU05vZGVTdHlsZSkpO1xuXG4gICAgLy9BZGQgZGVmYXVsdCBzdHlsZVxuICAgIG91dHB1dC5zdHlsZS5wdXNoKGdldFN0eWxlRWxlbWVudChOT0RFX1NFTEVDVE9SLCBkZWZhdWx0Q1NTTm9kZVN0eWxlKSk7XG4gICAgb3V0cHV0LnN0eWxlLnB1c2goZ2V0U3R5bGVFbGVtZW50KEVER0VfU0VMRUNUT1IsIGRlZmF1bHRDU1NFZGdlU3R5bGUpKTtcblxuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgbWFwcGluZ0NTU05vZGVTdHlsZSk7XG4gICAgb3V0cHV0LnN0eWxlLnB1c2guYXBwbHkob3V0cHV0LnN0eWxlLCBtYXBwaW5nQ1NTRWRnZVN0eWxlKTtcblxuICAgIG91dHB1dFsnYmFja2dyb3VuZC1jb2xvciddID0gY3NzTmV0d29ya0JhY2tncm91bmRDb2xvcjtcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdjeXRvc2NhcGVKUycsXG4gICAgY29udmVydDogKGN4KSA9PiB7XG4gICAgICAgIGNvbnN0IG91dHB1dCA9IHtcbiAgICAgICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiB7fSxcbiAgICAgICAgICAgIGxheW91dDoge30sXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMgPSBjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ107XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IFwiICsgSlNPTi5zdHJpbmdpZnkoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIG51bGwsIDIpKTtcbiAgICAgICAgICAgICAgICBjeFV0aWwucHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyhjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgICAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhub2RlQXR0cmlidXRlVHlwZU1hcCwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4Tm9kZVsndiddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEVkZ2VbJ3YnXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ10pIHtcbiAgICAgICAgICAgICAgICBjeFZpc3VhbFByb3BlcnRpZXMgPSBjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcC5mb3JFYWNoKChpbmZlcnJlZFR5cGUsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3Igbm9kZTogJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWRnZUF0dHJpYnV0ZVR5cGVNYXAuZm9yRWFjaCgoaW5mZXJyZWRUeXBlLCBhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW5mZXJyZWQgYXR0cmlidXRlIHR5cGUgZm9yIGVkZ2U6ICcgKyBhdHRyaWJ1dGVOYW1lICsgJzogJyArIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vQWRkIG5vZGVzXG4gICAgICAgIG91dHB1dC5lbGVtZW50c1snbm9kZXMnXSA9IFtdO1xuXG4gICAgICAgIC8vQWRkIGVkZ2VzXG4gICAgICAgIG91dHB1dC5lbGVtZW50c1snZWRnZXMnXSA9IFtdO1xuXG5cbiAgICAgICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hOb2RlWyd2J10sIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydpZCddID0gY3hOb2RlLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ3Bvc2l0aW9uJ10gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBjeE5vZGVbJ3gnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGN4Tm9kZVsneSddXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmVsZW1lbnRzLm5vZGVzLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ10gPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4RWRnZVsndiddLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnaWQnXSA9IGN4RWRnZS5pZC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ3NvdXJjZSddID0gY3hFZGdlWydzJ107XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsndGFyZ2V0J10gPSBjeEVkZ2VbJ3QnXTtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmVsZW1lbnRzLmVkZ2VzLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICBvdXRwdXQuc3R5bGUgPSBzdHlsZS5zdHlsZTtcbiAgICAgICAgY29uc29sZS5sb2coJ3Zpc3VhbFByb3BlcnRpZXM6ICcgKyBKU09OLnN0cmluZ2lmeShjeFZpc3VhbFByb3BlcnRpZXMsIG51bGwsIDIpKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3N0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkob3V0cHV0LnN0eWxlLCBudWxsLCAyKSk7XG5cbiAgICAgICAgb3V0cHV0WydiYWNrZ3JvdW5kLWNvbG9yJ10gPSBzdHlsZVsnYmFja2dyb3VuZC1jb2xvciddO1xuXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0ZXI6IGNvbnZlcnRlclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgJ3NoYXBlJzogJ3NoYXBlJyxcbiAgICAnd2lkdGgnOiAnd2lkdGgnLCBcbiAgICAnaGVpZ2h0JzogJ2hlaWdodCcsXG4gICAgJ2JhY2tncm91bmRfY29sb3InOiAnYmFja2dyb3VuZC1jb2xvcicsXG4gICAgJ2JhY2tncm91bmRfb3BhY2l0eSc6ICdiYWNrZ3JvdW5kLW9wYWNpdHknLFxuICAgICdsYWJlbCc6ICdsYWJlbCcsXG4gICAgJ2xhYmVsX2NvbG9yJzogJ2NvbG9yJywgXG4gICAgJ29wYWNpdHknOiAnb3BhY2l0eScsXG4gICAgJ2xpbmVfY29sb3InOiAnbGluZS1jb2xvcidcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKU0NvbnN0YW50cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=