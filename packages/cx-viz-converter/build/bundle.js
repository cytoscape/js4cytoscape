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

            var nodeMapping = value.nodeMapping;
            mappings.node = getMappings(nodeMapping);
            //mappingCSSNodeStyle = getCSSMappingEntries(nodeMapping, 'node', nodeAttributeTypeMap);

            var edgeMapping = value.edgeMapping;
            mappings.edge = getMappings(edgeMapping);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4YzA5MTBhMTMyY2I3MmI3NWM1YiIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsIlBPIiwiZ2V0Q3hWZXJzaW9uIiwidmVyc2lvblN0cmluZyIsInZlcnNpb25BcnJheSIsInNwbGl0IiwibWFwIiwibnVtYmVyU3RyaW5nIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXNOYU4iLCJlbGVtZW50IiwiZ2V0Q3hNYWpvclZlcnNpb24iLCJwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVBdHRyaWJ1dGVUeXBlTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwiZWRnZUF0dHJpYnV0ZVR5cGVNYXAiLCJlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjeEF0dHJpYnV0ZURlY2xhcmF0aW9uIiwidXBkYXRlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVzIiwidXBkYXRlQXR0cmlidXRlVHlwZU1hcCIsInVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VzIiwiYXR0cmlidXRlVHlwZU1hcCIsImF0dHJpYnV0ZURlY2xhcmF0aW9ucyIsImtleXMiLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlRGVjbGFyYXRpb24iLCJzZXQiLCJkIiwiYXR0cmlidXRlTmFtZU1hcCIsImEiLCJhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJ2IiwidXBkYXRlSW5mZXJyZWRUeXBlcyIsImtleSIsImhhcyIsInZhbHVlIiwiaW5mZXJyZWRUeXBlIiwibmV3S2V5IiwiZ2V0IiwiZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzIiwiZGF0YSIsImNvbnZlcnRlciIsInJlcXVpcmUiLCJjb252ZXJ0IiwiY3giLCJ0YXJnZXRGb3JtYXQiLCJjeENvbnN0YW50cyIsImxhcmdlTmV0d29yayIsImN5dG9zY2FwZUpTIiwiY3hVdGlsIiwidmVyaWZ5VmVyc2lvbiIsImZpcnN0RWxlbWVudCIsIm1ham9yVmVyc2lvbiIsImxhcmdlTmV0d29ya0NvbnN0YW50cyIsInNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJ0YXJnZXRTdHlsZUZpZWxkIiwicG9ydGFibGVQcm9wZXJ0VmFsdWUiLCJ0YXJnZXRTdHlsZUVudHJ5IiwiaGV4VG9SR0IiLCJoZXgiLCJyIiwiZyIsImIiLCJhbHBoYVRvSW50IiwiYWxwaGFEZWNpbWFsIiwiY2xhbXAiLCJNYXRoIiwicm91bmQiLCJkZWZhdWx0UHJvcGVydHlDb252ZXJ0IiwicG9ydGFibGVQcm9wZXJ0eVZhbHVlIiwiY29sb3IiLCJsYWJlbCIsIndpZHRoIiwiZ2V0RGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzIiwib3V0cHV0Iiwibm9kZSIsImVkZ2UiLCJub2RlRGVmYXVsdCIsImxudkVudHJpZXMiLCJnZXRMTlZWYWx1ZXMiLCJhc3NpZ24iLCJlZGdlRGVmYXVsdCIsImVudGl0eVR5cGUiLCJlbnRyaWVzIiwicG9ydGFibGVQcm9wZXJ0eUtleSIsImxudkVudHJ5IiwibG52S2V5IiwicHJvY2Vzc0NvbG9yIiwiY29sb3JBcnJheSIsImFscGhhIiwidW5kZWZpbmVkIiwicHJvY2Vzc1NpemUiLCJoZWlnaHQiLCJtYXgiLCJwcm9jZXNzTm9kZVZpZXciLCJub2RlVmlldyIsImlkIiwicG9zaXRpb24iLCJzaXplIiwicHJvY2Vzc0VkZ2VWaWV3IiwiZWRnZVZpZXciLCJzIiwidCIsImdldE1hcHBpbmdzIiwibWFwcGluZ3MiLCJtYXBwaW5nIiwicHJvcGVydHlLZXkiLCJkZWZpbml0aW9uIiwiYXR0cmlidXRlIiwidHlwZSIsInZwIiwiZ2V0QXR0cmlidXRlUmF0aW8iLCJhdHRyaWJ1dGVWYWx1ZSIsImF0dHJpYnV0ZU1pbiIsImF0dHJpYnV0ZU1heCIsImdldFZwUmFuZ2UiLCJ2cE1pbiIsInZwTWF4IiwiZ2V0TWFwIiwidnBSYW5nZSIsImF0dHJpYnV0ZVJhdGlvIiwibWluIiwiY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydCIsImNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydCIsIm1pblJHQiIsIm1heFJHQiIsInJSYW5nZSIsImdSYW5nZSIsImJSYW5nZSIsImNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydCIsImFscGhhdG9JbnQiLCJjb250aW51b3VzUHJvcGVydHlDb252ZXJ0IiwiaXNJblJhbmdlIiwiaW5jbHVkZU1pbiIsImluY2x1ZGVNYXgiLCJtaW5TYXRpc2ZpZWQiLCJtYXhTYXRpc2ZpZWQiLCJnZXRNYXBwcGVkVmFsdWVzIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZUtleSIsImRpc2NyZXRlTWFwIiwia2V5VmFsdWUiLCJjb252ZXJ0ZWQiLCJjb250aW51b3VzTWFwcGluZ3MiLCJtYXBwaW5nUmFuZ2UiLCJtaW5WUFZhbHVlIiwibWF4VlBWYWx1ZSIsImxudkNvbnZlcnQiLCJjeFZpc3VhbFByb3BlcnRpZXMiLCJNYXAiLCJkZWZhdWx0VmFsdWVzIiwiYnlwYXNzTWFwcGluZ3MiLCJjeEFzcGVjdCIsImN4Tm9kZXMiLCJjeE5vZGUiLCJjeEVkZ2VzIiwiY3hFZGdlIiwibm9kZVZpZXdzIiwiZWRnZVZpZXdzIiwidnBBdCIsInZwRWxlbWVudCIsImF0IiwiZGVmYXVsdFN0eWxlcyIsImRlZmF1bHQiLCJub2RlTWFwcGluZyIsImVkZ2VNYXBwaW5nIiwidG9TdHJpbmciLCJ2YWx1ZXMiLCJjeElkIiwiZGVmYXVsdE5vZGVWaXN1YWxQcm9wZXJ0aWVzIiwiZXhwYW5kZWRBdHRyaWJ1dGVzIiwibWFwcGluZ1ZhbHVlcyIsInByb2Nlc3NlZE5vZGVWaWV3IiwicHVzaCIsImRlZmF1bHRFZGdlVmlzdWFsUHJvcGVydGllcyIsInByb2Nlc3NlZEVkZ2VWaWV3IiwianNDb25zdGFudHMiLCJzaGFwZSIsImJhY2tncm91bmRfY29sb3IiLCJiYWNrZ3JvdW5kX29wYWNpdHkiLCJsYWJlbF9jb2xvciIsIm9wYWNpdHkiLCJsaW5lX2NvbG9yIiwic2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCIsInBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0IiwibWluVmFsdWUiLCJtYXhWYWx1ZSIsIm1pblZQIiwibWF4VlAiLCJtYXBEYXRhUHJvcGVydHlDb252ZXJ0IiwiZ2V0Q1NTU3R5bGVFbnRyaWVzIiwiY3hTdHlsZUVudHJpZXMiLCJjc3NFbnRyaWVzIiwiZ2V0SWRTZWxlY3RvciIsImVsZW1lbnRUeXBlIiwiZ2V0U3R5bGVFbGVtZW50Iiwic2VsZWN0b3IiLCJjc3MiLCJnZXRDb250aW51b3VzU2VsZWN0b3IiLCJtaW5Db25kaXRpb24iLCJtYXhDb25kaXRpb24iLCJnZXRDb250aW51b3VzU3R5bGUiLCJnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMiLCJjeE1hcHBpbmdEZWZpbml0aW9uIiwicmFuZ2VNYXBzIiwicmFuZ2UiLCJzdHlsZSIsImdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5IiwiZ2V0RGlzY3JldGVTZWxlY3RvciIsImF0dHJpYnV0ZURhdGFUeXBlIiwiZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyIsImF0dHRyaWJ1dGVUb1ZhbHVlTWFwIiwic3R5bGVNYXAiLCJnZXRCeXBhc3NDU1NFbnRyeSIsImN4RWxlbWVudCIsInBvIiwiZ2V0Q1NTTWFwcGluZ0VudHJpZXMiLCJjeE1hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cnkiLCJjb250aW5vdXNNYXBwaW5ncyIsImNvbnRpbm91c01hcHBpbmciLCJjc3NFbnRyeSIsImRpc2NyZXRlTWFwcGluZ3MiLCJkaXNjcmV0ZU1hcHBpbmciLCJOT0RFX1NFTEVDVE9SIiwiRURHRV9TRUxFQ1RPUiIsImdldFZpc3VhbFByb3BlcnRpZXMiLCJkZWZhdWx0Q1NTTm9kZVN0eWxlIiwiZGVmYXVsdENTU0VkZ2VTdHlsZSIsImNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IiLCJtYXBwaW5nQ1NTTm9kZVN0eWxlIiwibWFwcGluZ0NTU0VkZ2VTdHlsZSIsImJ5cGFzc0NTU0VudHJpZXMiLCJuZXR3b3JrIiwiYXBwbHkiLCJlbGVtZW50cyIsImxheW91dCIsIngiLCJ5Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7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Ozs7Ozs7O0FDNVlBeEUsT0FBT0MsT0FBUCxHQUFpQkMsT0FBT0MsTUFBUCxDQUFjO0FBQzNCLGFBQVMsT0FEa0I7QUFFM0IsYUFBUyxPQUZrQjtBQUczQixjQUFVLFFBSGlCO0FBSTNCLHdCQUFvQixrQkFKTztBQUszQiwwQkFBc0Isb0JBTEs7QUFNM0IsYUFBUyxPQU5rQjtBQU8zQixtQkFBZSxPQVBZO0FBUTNCLGVBQVcsU0FSZ0I7QUFTM0Isa0JBQWM7QUFUYSxDQUFkLENBQWpCLEMiLCJmaWxlIjoiLi9idWlsZC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJjeFZpekNvbnZlcnRlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjeFZpekNvbnZlcnRlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOGMwOTEwYTEzMmNiNzJiNzVjNWIiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgQ1hfVkVSU0lPTjogJ0NYVmVyc2lvbicsXG4gICAgTk9ERTogJ25vZGUnLFxuICAgIEVER0U6ICdlZGdlJyxcbiAgICBORVRXT1JLOiAnbmV0d29yaycsXG5cbiAgICBOT0RFUzogJ25vZGVzJyxcbiAgICBFREdFUzogJ2VkZ2VzJyxcblxuICAgIElEOiAnaWQnLFxuICAgIFg6ICd4JyxcbiAgICBZOiAneScsXG4gICAgWjogJ3onLFxuICAgIFY6ICd2JyxcblxuICAgIEFUOiAnYXQnLFxuICAgIE46ICduJyxcbiAgICBFOiAnZScsXG5cbiAgICBWSVNVQUxfUFJPUEVSVElFUzogJ3Zpc3VhbFByb3BlcnRpZXMnLFxuICAgIERFRkFVTFQ6ICdkZWZhdWx0JyxcblxuICAgIFNUWUxFOiAnc3R5bGUnLFxuXG4gICAgUE86ICdwbydcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeENvbnN0YW50cy5qcyIsImZ1bmN0aW9uIGdldEN4VmVyc2lvbih2ZXJzaW9uU3RyaW5nKSB7XG4gICAgY29uc3QgdmVyc2lvbkFycmF5ID0gdmVyc2lvblN0cmluZy5zcGxpdCgnLicpLm1hcCgobnVtYmVyU3RyaW5nKSA9PiB7IHJldHVybiBwYXJzZUludChudW1iZXJTdHJpbmcsIDEwKTsgfSk7XG4gICAgaWYgKHZlcnNpb25BcnJheS5sZW5ndGggIT09IDIgJiYgdmVyc2lvbkFycmF5Lmxlbmd0aCAhPSAzKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgdmVyc2lvbiBmb3JtYXQ6ICcgKyB2ZXJzaW9uU3RyaW5nO1xuICAgIH1cbiAgICB2ZXJzaW9uQXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgaWYgKGlzTmFOKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyAnTm9uLWludGVnZXIgdmFsdWUgaW4gdmVyc2lvbiBzdHJpbmc6ICcgKyB2ZXJzaW9uU3RyaW5nO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZlcnNpb25BcnJheTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3hNYWpvclZlcnNpb24odmVyc2lvblN0cmluZykge1xuICAgIHJldHVybiB2ZXJzaW9uU3RyaW5nID8gZ2V0Q3hWZXJzaW9uKHZlcnNpb25TdHJpbmcpWzBdIDogMTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyhjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucywgXG4gICAgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIFxuICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBcbiAgICBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBcbiAgICBlZGdlQXR0cmlidXRlTmFtZU1hcCwgZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIFxuICAgIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApIHtcbiAgICBjb25zb2xlLmxvZyhcIiBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uczogXCIgKyBKU09OLnN0cmluZ2lmeShjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucywgbnVsbCwgMikpO1xuICAgIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLmZvckVhY2goKGN4QXR0cmlidXRlRGVjbGFyYXRpb24pID0+IHtcbiAgICAgICAgaWYgKGN4QXR0cmlidXRlRGVjbGFyYXRpb25bJ25vZGVzJ10pIHtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAobm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlVHlwZU1hcChub2RlQXR0cmlidXRlVHlwZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAobm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN4QXR0cmlidXRlRGVjbGFyYXRpb25bJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAoZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlVHlwZU1hcChlZGdlQXR0cmlidXRlVHlwZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAoZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlVHlwZU1hcChhdHRyaWJ1dGVUeXBlTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsnZCddKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVUeXBlTWFwLnNldChhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbi5kKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKGF0dHJpYnV0ZU5hbWVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWydhJ10pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhdHRyaWJ1dGUgJyArIGF0dHJpYnV0ZURlY2xhcmF0aW9uLmEgKyAnIHNob3VsZCBiZSByZW5hbWVkIHRvICcgKyBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWVNYXAuc2V0KGF0dHJpYnV0ZURlY2xhcmF0aW9uLmEsIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWyd2J10pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhdHRyaWJ1dGUgJyArIGF0dHJpYnV0ZU5hbWUgKyAnIGhhcyBkZWZhdWx0IHZhbHVlICcgKyBhdHRyaWJ1dGVEZWNsYXJhdGlvbi52KTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcC5zZXQoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGVjbGFyYXRpb24udik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlSW5mZXJyZWRUeXBlcyhhdHRyaWJ1dGVUeXBlTWFwLCBhdHRyaWJ1dGVOYW1lTWFwLCB2KSB7XG4gICAgT2JqZWN0LmtleXModikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGlmICghYXR0cmlidXRlVHlwZU1hcC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2W2tleV07XG4gICAgICAgICAgICBjb25zdCBpbmZlcnJlZFR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBuZXdLZXkgPSBhdHRyaWJ1dGVOYW1lTWFwLmhhcyhrZXkpID8gYXR0cmlidXRlTmFtZU1hcC5nZXQoa2V5KSA6IGtleTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGVNYXAuc2V0KG5ld0tleSwgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGdldEV4cGFuZGVkQXR0cmlidXRlcyh2LCBhdHRyaWJ1dGVOYW1lTWFwLCBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApIHtcbiAgICBsZXQgZGF0YSA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHYpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdLZXkgPSBhdHRyaWJ1dGVOYW1lTWFwLmhhcyhrZXkpID8gYXR0cmlidXRlTmFtZU1hcC5nZXQoa2V5KSA6IGtleTtcbiAgICAgICAgZGF0YVtuZXdLZXldID0gdltrZXldO1xuICAgIH0pO1xuICAgIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGlmICghZGF0YVtrZXldKSB7XG4gICAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRDeFZlcnNpb246IGdldEN4VmVyc2lvbixcbiAgICBnZXRDeE1ham9yVmVyc2lvbjogZ2V0Q3hNYWpvclZlcnNpb24sXG4gICAgcHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9uczogcHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyxcbiAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwOiB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwLFxuICAgIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXA6IHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwOiB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsXG4gICAgdXBkYXRlSW5mZXJyZWRUeXBlczogdXBkYXRlSW5mZXJyZWRUeXBlcyxcbiAgICBnZXRFeHBhbmRlZEF0dHJpYnV0ZXMgOiBnZXRFeHBhbmRlZEF0dHJpYnV0ZXNcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N4VXRpbC5qcyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29udmVydGVyID0gcmVxdWlyZSAoJy4vY29udmVydGVyLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzLmNvbnZlcnQgPSAoY3gsIHRhcmdldEZvcm1hdCkgPT4geyByZXR1cm4gY29udmVydGVyLmNvbnZlcnQoY3gsIHRhcmdldEZvcm1hdCk7IH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi9jeENvbnN0YW50cy5qcycpO1xuY29uc3QgbGFyZ2VOZXR3b3JrID0gcmVxdWlyZSAoJy4vbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcycpOyBcbmNvbnN0IGN5dG9zY2FwZUpTID0gcmVxdWlyZSAoJy4vY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMnKTtcbmNvbnN0IGN4VXRpbCA9IHJlcXVpcmUoJy4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHZlcmlmeVZlcnNpb24oY3gpIHtcbiAgICBjb25zdCBmaXJzdEVsZW1lbnQgPSBjeFswXTtcbiAgICBjb25zdCB2ZXJzaW9uU3RyaW5nID0gZmlyc3RFbGVtZW50W2N4Q29uc3RhbnRzLkNYX1ZFUlNJT05dO1xuXG4gICAgY29uc3QgbWFqb3JWZXJzaW9uID0gY3hVdGlsLmdldEN4TWFqb3JWZXJzaW9uKHZlcnNpb25TdHJpbmcpO1xuXG4gICAgaWYgKG1ham9yVmVyc2lvbiAhPT0gMikge1xuICAgICAgICB0aHJvdyAnSW5jb21wYXRpYmxlIENYIHZlcnNpb246ICcgKyB2ZXJzaW9uU3RyaW5nO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0KSB7XG4gICAgdmVyaWZ5VmVyc2lvbihjeCk7XG4gICAgc3dpdGNoKHRhcmdldEZvcm1hdCkge1xuICAgICAgICBjYXNlIGxhcmdlTmV0d29yay5jb252ZXJ0ZXIudGFyZ2V0Rm9ybWF0OiB7XG4gICAgICAgICAgICByZXR1cm4gbGFyZ2VOZXR3b3JrLmNvbnZlcnRlci5jb252ZXJ0KGN4KTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGN5dG9zY2FwZUpTLmNvbnZlcnRlci50YXJnZXRGb3JtYXQ6IHtcbiAgICAgICAgICAgIHJldHVybiBjeXRvc2NhcGVKUy5jb252ZXJ0ZXIuY29udmVydChjeCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnZlcnQ6IGNvbnZlcnRcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnZlcnRlci5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuLi9jeENvbnN0YW50cy5qcycpO1xuY29uc3QgbGFyZ2VOZXR3b3JrQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9sYXJnZU5ldHdvcmtDb25zdGFudHMuanMnKTtcbmNvbnN0IGN4VXRpbCA9IHJlcXVpcmUoJy4uL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKSB7XG4gICAgY29uc3QgdGFyZ2V0U3R5bGVFbnRyeSA9IHt9O1xuICAgIHRhcmdldFN0eWxlRW50cnlbdGFyZ2V0U3R5bGVGaWVsZF0gPSBwb3J0YWJsZVByb3BlcnRWYWx1ZTtcbiAgICByZXR1cm4gdGFyZ2V0U3R5bGVFbnRyeTtcbn1cblxuZnVuY3Rpb24gaGV4VG9SR0IoaGV4KSB7XG4gICAgbGV0IHIgPSAwLCBnID0gMCwgYiA9IDA7XG5cbiAgICAvLyAzIGRpZ2l0c1xuICAgIGlmIChoZXgubGVuZ3RoID09IDQpIHtcbiAgICAgICAgciA9IFwiMHhcIiArIGhleFsxXSArIGhleFsxXTtcbiAgICAgICAgZyA9IFwiMHhcIiArIGhleFsyXSArIGhleFsyXTtcbiAgICAgICAgYiA9IFwiMHhcIiArIGhleFszXSArIGhleFszXTtcblxuICAgICAgICAvLyA2IGRpZ2l0c1xuICAgIH0gZWxzZSBpZiAoaGV4Lmxlbmd0aCA9PSA3KSB7XG4gICAgICAgIHIgPSBcIjB4XCIgKyBoZXhbMV0gKyBoZXhbMl07XG4gICAgICAgIGcgPSBcIjB4XCIgKyBoZXhbM10gKyBoZXhbNF07XG4gICAgICAgIGIgPSBcIjB4XCIgKyBoZXhbNV0gKyBoZXhbNl07XG4gICAgfVxuXG4gICAgcmV0dXJuIFtwYXJzZUludChyKSwgcGFyc2VJbnQoZyksIHBhcnNlSW50KGIpXTtcbn1cblxuZnVuY3Rpb24gYWxwaGFUb0ludChhbHBoYURlY2ltYWwpIHtcbiAgICByZXR1cm4gY2xhbXAoTWF0aC5yb3VuZChhbHBoYURlY2ltYWwgKiAyNTUpLDAsMjU1KTtcbn1cblxuY29uc3QgZGVmYXVsdFByb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCd3aWR0aCcsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoJ2hlaWdodCcsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5jb2xvciwgaGV4VG9SR0IocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoJ2FscGhhJywgYWxwaGFUb0ludChwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCgnYWxwaGEnLCBhbHBoYVRvSW50KHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMuY29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpXG4gICAgfVxufVxuXG5cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlcyhkZWZhdWx0VmlzdWFsUHJvcGVydGllcykge1xuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIG5vZGU6IHt9LFxuICAgICAgICBlZGdlOiB7fVxuICAgIH07XG4gICAgaWYgKGRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzWydub2RlJ10pIHtcbiAgICAgICAgY29uc3Qgbm9kZURlZmF1bHQgPSBkZWZhdWx0VmlzdWFsUHJvcGVydGllcy5ub2RlO1xuICAgICAgICBjb25zdCBsbnZFbnRyaWVzID0gZ2V0TE5WVmFsdWVzKCdub2RlJywgbm9kZURlZmF1bHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dC5ub2RlLCBsbnZFbnRyaWVzKTtcbiAgICB9XG4gICAgaWYgKGRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzWydlZGdlJ10pIHtcbiAgICAgICAgY29uc3QgZWRnZURlZmF1bHQgPSBkZWZhdWx0VmlzdWFsUHJvcGVydGllcy5lZGdlO1xuICAgICAgICBjb25zdCBsbnZFbnRyaWVzID0gZ2V0TE5WVmFsdWVzKCdlZGdlJywgZWRnZURlZmF1bHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dC5lZGdlLCBsbnZFbnRyaWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0TE5WVmFsdWVzKGVudGl0eVR5cGUsIGVudHJpZXMpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgT2JqZWN0LmtleXMoZW50cmllcykuZm9yRWFjaChwb3J0YWJsZVByb3BlcnR5S2V5ID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gZW50cmllc1twb3J0YWJsZVByb3BlcnR5S2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGxudkVudHJ5ID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobG52RW50cnkpLmZvckVhY2gobG52S2V5ID0+IHtcbiAgICAgICAgICAgICAgICBvdXRwdXRbbG52S2V5XSA9IGxudkVudHJ5W2xudktleV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0NvbG9yKGNvbG9yQXJyYXksIGFscGhhKSB7XG4gICAgcmV0dXJuIGNvbG9yQXJyYXkgIT0gdW5kZWZpbmVkXG4gICAgICAgID8gYWxwaGEgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IFtjb2xvckFycmF5WzBdLCBjb2xvckFycmF5WzFdLCBjb2xvckFycmF5WzJdLCBhbHBoYV1cbiAgICAgICAgICAgIDogW2NvbG9yQXJyYXlbMF0sIGNvbG9yQXJyYXlbMV0sIGNvbG9yQXJyYXlbMl1dXG4gICAgICAgIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzU2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KHdpZHRoLCBoZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzTm9kZVZpZXcobm9kZVZpZXcpIHtcbiAgICBsZXQgd2lkdGggPSB1bmRlZmluZWQ7XG4gICAgbGV0IGhlaWdodCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgY29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgYWxwaGEgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgaWQ6IG5vZGVWaWV3LmlkLFxuICAgICAgICBwb3NpdGlvbjogbm9kZVZpZXcucG9zaXRpb25cbiAgICB9O1xuXG5cbiAgICBPYmplY3Qua2V5cyhub2RlVmlldykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoa2V5ID09PSAnd2lkdGgnKSB7XG4gICAgICAgICAgICB3aWR0aCA9IG5vZGVWaWV3LndpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2hlaWdodCcpIHtcbiAgICAgICAgICAgIGhlaWdodCA9IG5vZGVWaWV3LmhlaWdodDtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdjb2xvcicpIHtcbiAgICAgICAgICAgIGNvbG9yQXJyYXkgPSBub2RlVmlldy5jb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdhbHBoYScpIHtcbiAgICAgICAgICAgIGFscGhhID0gbm9kZVZpZXcuYWxwaGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRwdXRba2V5XSA9IG5vZGVWaWV3W2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbG9yID0gcHJvY2Vzc0NvbG9yKGNvbG9yQXJyYXksIGFscGhhKTtcbiAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5jb2xvcl0gPSBjb2xvcjtcbiAgICB9XG5cbiAgICBjb25zdCBzaXplID0gcHJvY2Vzc1NpemUod2lkdGgsIGhlaWdodCk7XG4gICAgaWYgKHNpemUpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5zaXplXSA9IHByb2Nlc3NTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzRWRnZVZpZXcoZWRnZVZpZXcpIHtcbiAgICBsZXQgY29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgYWxwaGEgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBpZDogZWRnZVZpZXcuaWQsXG4gICAgICAgIHM6IGVkZ2VWaWV3LnMsXG4gICAgICAgIHQ6IGVkZ2VWaWV3LnRcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhlZGdlVmlldykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoa2V5ID09PSAnY29sb3InKSB7XG4gICAgICAgICAgICBjb2xvckFycmF5ID0gZWRnZVZpZXcuY29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnYWxwaGEnKSB7XG4gICAgICAgICAgICBhbHBoYSA9IGVkZ2VWaWV3LmFscGhhO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2xvciA9IHByb2Nlc3NDb2xvcihjb2xvckFycmF5LCBhbHBoYSk7XG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuY29sb3JdID0gY29sb3I7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldE1hcHBpbmdzKG1hcHBpbmdzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9XG4gICAgT2JqZWN0LmtleXMobWFwcGluZ3MpLmZvckVhY2gocHJvcGVydHlLZXkgPT4ge1xuICAgICAgICBjb25zdCBtYXBwaW5nID0gbWFwcGluZ3NbcHJvcGVydHlLZXldO1xuICAgICAgICBvdXRwdXRbbWFwcGluZy5kZWZpbml0aW9uLmF0dHJpYnV0ZV0gPSB7XG4gICAgICAgICAgICB0eXBlOiBtYXBwaW5nLnR5cGUsXG4gICAgICAgICAgICB2cDogcHJvcGVydHlLZXksXG4gICAgICAgICAgICBkZWZpbml0aW9uOiBtYXBwaW5nLmRlZmluaXRpb25cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cblxuZnVuY3Rpb24gZ2V0QXR0cmlidXRlUmF0aW8oYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4KSB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZVZhbHVlIC8gKGF0dHJpYnV0ZU1heCAtIGF0dHJpYnV0ZU1pbik7XG59XG5cbmZ1bmN0aW9uIGdldFZwUmFuZ2UodnBNaW4sIHZwTWF4KSB7XG4gICAgcmV0dXJuIHZwTWF4IC0gdnBNaW47XG59XG5cbmZ1bmN0aW9uIGdldE1hcCh2cE1pbiwgdnBSYW5nZSwgYXR0cmlidXRlUmF0aW8pIHtcbiAgICByZXR1cm4gdnBNaW4gKyB2cFJhbmdlICogYXR0cmlidXRlUmF0aW87XG59XG5cbmZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgbWluKSwgbWF4KTtcbiAgfVxuXG5mdW5jdGlvbiBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSB7XG4gICAgY29uc3QgYXR0cmlidXRlUmF0aW8gPSBnZXRBdHRyaWJ1dGVSYXRpbyhhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgpO1xuICAgIGNvbnN0IHZwUmFuZ2UgPWdldFZwUmFuZ2UodnBNaW4sIHZwTWF4KTtcblxuICAgIGNvbnN0IG91dHB1dCA9IGdldE1hcCh2cE1pbiwgdnBSYW5nZSwgYXR0cmlidXRlUmF0aW8pO1xuICAgXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSB7XG4gICAgY29uc3QgbWluUkdCID0gaGV4VG9SR0IodnBNaW4pO1xuICAgIGNvbnN0IG1heFJHQiA9IGhleFRvUkdCKHZwTWF4KTtcblxuICAgIGNvbnN0IGF0dHJpYnV0ZVJhdGlvID0gZ2V0QXR0cmlidXRlUmF0aW8oYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4KTtcbiAgICBcbiAgICBjb25zdCByUmFuZ2UgPSBnZXRWcFJhbmdlKG1pblJHQlswXSwgbWF4UkdCWzFdKTtcbiAgICBjb25zdCBnUmFuZ2UgPSBnZXRWcFJhbmdlKG1pblJHQlsxXSwgbWF4UkdCWzFdKTtcbiAgICBjb25zdCBiUmFuZ2UgPSBnZXRWcFJhbmdlKG1pblJHQlsyXSwgbWF4UkdCWzJdKTtcblxuICAgIGNvbnN0IG91dHB1dCA9IFtcbiAgICAgICAgY2xhbXAoTWF0aC5yb3VuZChnZXRNYXAobWluUkdCWzBdLCByUmFuZ2UsIGF0dHJpYnV0ZVJhdGlvKSksIDAsIDI1NSksXG4gICAgICAgIGNsYW1wKE1hdGgucm91bmQoZ2V0TWFwKG1pblJHQlsxXSwgZ1JhbmdlLCBhdHRyaWJ1dGVSYXRpbykpLCAwLCAyNTUpLFxuICAgICAgICBjbGFtcChNYXRoLnJvdW5kKGdldE1hcChtaW5SR0JbMl0sIGJSYW5nZSwgYXR0cmlidXRlUmF0aW8pKSwgMCwgMjU1KVxuICAgIF1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVSYXRpbyA9IGdldEF0dHJpYnV0ZVJhdGlvKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCk7XG4gICAgY29uc3QgdnBSYW5nZSA9Z2V0VnBSYW5nZSh2cE1pbiwgdnBNYXgpO1xuXG4gICAgY29uc3QgYWxwaGFEZWNpbWFsID0gZ2V0TWFwKHZwTWluLCB2cFJhbmdlLCBhdHRyaWJ1dGVSYXRpbyk7XG5cbiAgICByZXR1cm4gYWxwaGF0b0ludChhbHBoYURlY2ltYWwpO1xufVxuXG5jb25zdCBjb250aW51b3VzUHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9XSURUSCc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCgnd2lkdGgnLCBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCgnaGVpZ2h0JywgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5jb2xvciwgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCgnYWxwaGEnLCBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMud2lkdGgsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCgnYWxwaGEnLCBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMuY29sb3IsIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0luUmFuZ2UoYXR0cmlidXRlVmFsdWUsIG1pbiwgbWF4LCBpbmNsdWRlTWluLCBpbmNsdWRlTWF4KSB7IFxuICAgIGNvbnN0IG1pblNhdGlzZmllZCA9IGluY2x1ZGVNaW4gPyBtaW4gPD0gYXR0cmlidXRlVmFsdWUgOiBtaW4gPCBhdHRyaWJ1dGVWYWx1ZTtcbiAgICBjb25zdCBtYXhTYXRpc2ZpZWQgPSBpbmNsdWRlTWF4ID8gbWF4ID49IGF0dHJpYnV0ZVZhbHVlIDogbWluIDwgYXR0cmlidXRlVmFsdWU7XG4gICAgY29uc29sZS5sb2coJ2lzSW5SYW5nZTogJyArIGF0dHJpYnV0ZVZhbHVlICsgJyAnICsgbWluICsgJyAnICsgbWF4ICsgJyAnICsgaW5jbHVkZU1pbiArICcgJyArIGluY2x1ZGVNYXggKyAnICcgKyBtaW5TYXRpc2ZpZWQgKyAnICcgKyBtYXhTYXRpc2ZpZWQpO1xuICAgIHJldHVybiBtaW5TYXRpc2ZpZWQgJiYgbWF4U2F0aXNmaWVkOyAgIFxufVxuXG5mdW5jdGlvbiBnZXRNYXBwcGVkVmFsdWVzKG1hcHBpbmdzLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goYXR0cmlidXRlS2V5ID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZUtleV07XG4gICAgICAgIGlmIChtYXBwaW5nc1tlbnRpdHlUeXBlXVthdHRyaWJ1dGVLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBtYXBwaW5nID0gbWFwcGluZ3NbZW50aXR5VHlwZV1bYXR0cmlidXRlS2V5XTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKG1hcHBpbmcudHlwZSA9PT0gJ0RJU0NSRVRFJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNjcmV0ZU1hcCA9IG1hcHBpbmcuZGVmaW5pdGlvbi5tYXA7XG4gICAgICAgICAgICAgICAgICAgIGRpc2NyZXRlTWFwLmZvckVhY2goa2V5VmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleVZhbHVlLnYgPT0gYXR0cmlidXRlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0oa2V5VmFsdWUudnApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgY29udmVydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWFwcGluZy50eXBlID09PSAnUEFTU1RIUk9VR0gnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0oYXR0cmlidXRlVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIGNvbnZlcnRlZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hcHBpbmcudHlwZSA9PT0gJ0NPTlRJTlVPVVMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRpbnVvdXNNYXBwaW5ncyA9IG1hcHBpbmcuZGVmaW5pdGlvbi5tYXA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVvdXNNYXBwaW5ncy5mb3JFYWNoKG1hcHBpbmdSYW5nZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJ21pbicgaW4gbWFwcGluZ1JhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgJ21heCcgaW4gbWFwcGluZ1JhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgJ2luY2x1ZGVNaW4nIGluIG1hcHBpbmdSYW5nZSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAnaW5jbHVkZU1heCcgaW4gbWFwcGluZ1JhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW5SYW5nZShhdHRyaWJ1dGVWYWx1ZSwgbWFwcGluZ1JhbmdlLm1pbiwgbWFwcGluZ1JhbmdlLm1heCwgbWFwcGluZ1JhbmdlLmluY2x1ZGVNaW4sIG1hcHBpbmdSYW5nZS5pbmNsdWRlTWF4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgY29udGludW91c1Byb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udmVydGVkID0gY29udGludW91c1Byb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXShhdHRyaWJ1dGVWYWx1ZSwgbWFwcGluZ1JhbmdlLm1pbiwgbWFwcGluZ1JhbmdlLm1heCwgbWFwcGluZ1JhbmdlLm1pblZQVmFsdWUsIG1hcHBpbmdSYW5nZS5tYXhWUFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0LCBjb252ZXJ0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGxudkNvbnZlcnQoY3gpIHtcblxuICAgIC8vRmlyc3QgcGFzcy4gXG4gICAgLy8gV2UgbWF5IG5lZWQgdG8gY29sbGVjdCBvYmplY3QgYXR0cmlidXRlcyB0byBjYWxjdWxhdGVcbiAgICAvLyBtYXBwaW5ncyBpbiB0aGUgc2Vjb25kIHBhc3MuIFxuXG4gICAgbGV0IGN4VmlzdWFsUHJvcGVydGllcztcblxuICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICBsZXQgZWRnZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICBsZXQgbm9kZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICBsZXQgZGVmYXVsdFZhbHVlcyA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbWFwcGluZ3MgPSB7XG4gICAgICAgIG5vZGU6IHt9LFxuICAgICAgICBlZGdlOiB7fVxuICAgIH1cbiAgICBsZXQgYnlwYXNzTWFwcGluZ3MgPSB7XG4gICAgICAgICdub2RlJzoge30sXG4gICAgICAgICdlZGdlJzoge31cbiAgICB9O1xuXG4gICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMgPSBjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ107XG4gICAgICAgICAgICBjeFV0aWwucHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyhjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeE5vZGVbJ3YnXSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hFZGdlWyd2J10pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICBjeFZpc3VhbFByb3BlcnRpZXMgPSBjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgb3V0cHV0ID0ge307XG5cbiAgICBsZXQgbm9kZVZpZXdzID0gW107XG4gICAgbGV0IGVkZ2VWaWV3cyA9IFtdO1xuXG4gICAgY3hWaXN1YWxQcm9wZXJ0aWVzLmZvckVhY2godnBFbGVtZW50ID0+IHtcbiAgICAgICAgY29uc3QgdnBBdCA9IHZwRWxlbWVudC5hdDtcbiAgICAgICAgaWYgKHZwQXQgPT09IGN4Q29uc3RhbnRzLlNUWUxFKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZwRWxlbWVudC52O1xuICAgICAgICAgICAgY29uc3QgZGVmYXVsdFN0eWxlcyA9IHZhbHVlLmRlZmF1bHQ7XG5cbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZXMgPSBnZXREZWZhdWx0VmFsdWVzKGRlZmF1bHRTdHlsZXMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xhcmdlIG5ldHdvcmsgZGVmYXVsdCBzdHlsZSA9ICcgKyBKU09OLnN0cmluZ2lmeShkZWZhdWx0VmFsdWVzLCBudWxsLCAyKSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGVNYXBwaW5nID0gdmFsdWUubm9kZU1hcHBpbmc7XG4gICAgICAgICAgICBtYXBwaW5ncy5ub2RlID0gZ2V0TWFwcGluZ3Mobm9kZU1hcHBpbmcpO1xuICAgICAgICAgICAgLy9tYXBwaW5nQ1NTTm9kZVN0eWxlID0gZ2V0Q1NTTWFwcGluZ0VudHJpZXMobm9kZU1hcHBpbmcsICdub2RlJywgbm9kZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgICAgICBjb25zdCBlZGdlTWFwcGluZyA9IHZhbHVlLmVkZ2VNYXBwaW5nO1xuICAgICAgICAgICAgbWFwcGluZ3MuZWRnZSA9IGdldE1hcHBpbmdzKGVkZ2VNYXBwaW5nKTtcblxuICAgICAgICAgICAgLy9tYXBwaW5nQ1NTRWRnZVN0eWxlID0gZ2V0Q1NTTWFwcGluZ0VudHJpZXMoZWRnZU1hcHBpbmcsICdlZGdlJywgZWRnZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodnBBdCA9PT0gY3hDb25zdGFudHMuTikge1xuXG4gICAgICAgICAgICBjb25zdCBrZXkgPSB2cEVsZW1lbnRbY3hDb25zdGFudHMuUE9dLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBnZXRMTlZWYWx1ZXMoJ25vZGUnLCB2cEVsZW1lbnQudilcblxuICAgICAgICAgICAgaWYgKCFieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0pIHtcbiAgICAgICAgICAgICAgICBieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0gPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J5cGFzcyBjYWxjdWxhdGVkOiAnICsgSlNPTi5zdHJpbmdpZnkodmFsdWVzLCBudWxsLCAyKSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYnlwYXNzTWFwcGluZ3Mubm9kZVtrZXldLCB2YWx1ZXMpO1xuICAgICAgICAgICAgLy9ieXBhc3NDU1NFbnRyaWVzLnB1c2goZ2V0QnlwYXNzQ1NTRW50cnkoJ25vZGUnLCB2cEVsZW1lbnQpKTtcbiAgICAgICAgfSBlbHNlIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5FKSB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSB2cEVsZW1lbnRbY3hDb25zdGFudHMuUE9dLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBnZXRMTlZWYWx1ZXMoJ2VkZ2UnLCB2cEVsZW1lbnQudilcblxuICAgICAgICAgICAgaWYgKCFieXBhc3NNYXBwaW5ncy5lZGdlW2tleV0pIHtcbiAgICAgICAgICAgICAgICBieXBhc3NNYXBwaW5ncy5lZGdlW2tleV0gPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J5cGFzcyBjYWxjdWxhdGVkOiAnICsgSlNPTi5zdHJpbmdpZnkodmFsdWVzLCBudWxsLCAyKSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYnlwYXNzTWFwcGluZ3MuZWRnZVtrZXldLCB2YWx1ZXMpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZygnbWFwcGluZ3M6ICcgKyBKU09OLnN0cmluZ2lmeShtYXBwaW5ncywgbnVsbCwgMikpO1xuXG4gICAgLy9TZWNvbmQgcGFzcy4gXG4gICAgLy8gSGVyZSBpcyB3aGVyZSB0aGUgYWN0dWFsIG91dHB1dCBpcyBnZW5lcmF0ZWQuXG5cbiAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcblxuXG4gICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeE5vZGVbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGVWaWV3ID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogY3hJZCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGN4Tm9kZVsneiddID9cbiAgICAgICAgICAgICAgICAgICAgICAgIFtjeE5vZGVbJ3gnXSwgY3hOb2RlWyd5J10sIGN4Tm9kZVsneiddXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBbY3hOb2RlWyd4J10sIGN4Tm9kZVsneSddXVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vVE9ETyBjYWxjdWxhdGUgbG52IHZwcyBiYXNlZCBvbiBkZWZhdWx0cyBhbmQgYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHROb2RlVmlzdWFsUHJvcGVydGllcyA9IGRlZmF1bHRWYWx1ZXNbJ25vZGUnXTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlVmlldywgZGVmYXVsdE5vZGVWaXN1YWxQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9Bc3NpZ24gbWFwcGluZ3NcbiAgICAgICAgICAgICAgICBjb25zdCBleHBhbmRlZEF0dHJpYnV0ZXMgPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4Tm9kZVsndiddLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFwcGluZ1ZhbHVlcyA9IGdldE1hcHBwZWRWYWx1ZXMobWFwcGluZ3MsICdub2RlJywgZXhwYW5kZWRBdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG5vZGVWaWV3LCBtYXBwaW5nVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgIC8vQXNzaWduIGJ5cGFzc1xuICAgICAgICAgICAgICAgIGlmIChieXBhc3NNYXBwaW5ncy5ub2RlW2N4SWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obm9kZVZpZXcsIGJ5cGFzc01hcHBpbmdzLm5vZGVbY3hJZF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZE5vZGVWaWV3ID0gcHJvY2Vzc05vZGVWaWV3KG5vZGVWaWV3KTtcblxuICAgICAgICAgICAgICAgIG5vZGVWaWV3cy5wdXNoKHByb2Nlc3NlZE5vZGVWaWV3KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcblxuICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hFZGdlW2N4Q29uc3RhbnRzLklEXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVkZ2VWaWV3ID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogY3hJZCxcbiAgICAgICAgICAgICAgICAgICAgczogY3hFZGdlLnMudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgdDogY3hFZGdlLnQudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vVE9ETyBjYWxjdWxhdGUgbG52IHZwcyBiYXNlZCBvbiBkZWZhdWx0cyBhbmQgYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRFZGdlVmlzdWFsUHJvcGVydGllcyA9IGRlZmF1bHRWYWx1ZXNbJ2VkZ2UnXTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlZGdlVmlldywgZGVmYXVsdEVkZ2VWaXN1YWxQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBleHBhbmRlZEF0dHJpYnV0ZXMgPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4RWRnZVsndiddLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFwcGluZ1ZhbHVlcyA9IGdldE1hcHBwZWRWYWx1ZXMobWFwcGluZ3MsICdub2RlJywgZXhwYW5kZWRBdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBtYXBwaW5nVmFsdWVzKTtcbiAgICAgICAgICAgICAgICAvL0Fzc2lnbiBieXBhc3NcbiAgICAgICAgICAgICAgICBpZiAoYnlwYXNzTWFwcGluZ3MuZWRnZVtjeElkXSkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBieXBhc3NNYXBwaW5ncy5lZGdlW2N4SWRdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRFZGdlVmlldyA9IHByb2Nlc3NFZGdlVmlldyhlZGdlVmlldyk7XG5cbiAgICAgICAgICAgICAgICBlZGdlVmlld3MucHVzaChwcm9jZXNzZWRFZGdlVmlldyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5ub2RlVmlld3NdID0gbm9kZVZpZXdzO1xuICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuZWRnZVZpZXdzXSA9IGVkZ2VWaWV3cztcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cblxuXG5jb25zdCBjb252ZXJ0ZXIgPSB7XG4gICAgdGFyZ2V0Rm9ybWF0OiAnbG52JyxcbiAgICBjb252ZXJ0OiAoY3gpID0+IHtcbiAgICAgICAgcmV0dXJuIGxudkNvbnZlcnQoY3gpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydGVyOiBjb252ZXJ0ZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmsuanMiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgJ25vZGVWaWV3cyc6ICdub2RlVmlld3MnLFxuICAgICdlZGdlVmlld3MnOiAnZWRnZVZpZXdzJywgXG4gICAgJ2lkJzogJ2lkJyxcbiAgICAncG9zaXRpb24nOiAncG9zaXRpb24nLFxuICAgICdzJzogJ3MnLFxuICAgICd0JzogJ3QnLFxuICAgICdsYWJlbCc6ICdsYWJlbCcsIFxuICAgICdjb2xvcic6ICdjb2xvcicsXG4gICAgJ2xpbmVfY29sb3InOiAnbGluZS1jb2xvcicsXG4gICAgJ3NpemUnIDogJ3NpemUnLFxuICAgICd3aWR0aCcgOiAnd2lkdGgnXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuLi9jeENvbnN0YW50cy5qcycpO1xuY29uc3QganNDb25zdGFudHMgPSByZXF1aXJlKCcuL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSkge1xuICAgIGNvbnN0IHRhcmdldFN0eWxlRW50cnkgPSBuZXcgTWFwKCk7XG4gICAgdGFyZ2V0U3R5bGVFbnRyeS5zZXQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpO1xuICAgIHJldHVybiB0YXJnZXRTdHlsZUVudHJ5O1xufVxuXG5jb25zdCBkZWZhdWx0UHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9TSEFQRSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuc2hhcGUsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGluZV9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG59XG5cbmZ1bmN0aW9uIHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgYXR0cmlidXRlTmFtZSkge1xuICAgIGNvbnN0IG91dHB1dCA9IHt9O1xuICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9ICdkYXRhKCcgKyBhdHRyaWJ1dGVOYW1lICsgJyknO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuc2hhcGUsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9XSURUSCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfY29sb3IsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgYXR0cmlidXRlTmFtZSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLm9wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGluZV9jb2xvciwgYXR0cmlidXRlTmFtZSlcbiAgICB9LFxufVxuZnVuY3Rpb24gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBvdXRwdXRbdGFyZ2V0U3R5bGVGaWVsZF0gPSAnbWFwRGF0YSgnICsgYXR0cmlidXRlTmFtZVxuICAgICAgICArICcsICcgKyBtaW5WYWx1ZVxuICAgICAgICArICcsICcgKyBtYXhWYWx1ZVxuICAgICAgICArICcsICcgKyBtaW5WUFxuICAgICAgICArICcsICcgKyBtYXhWUFxuICAgICAgICArICcpJztcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBtYXBEYXRhUHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9TSEFQRSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9XSURUSCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUClcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLm9wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUClcbiAgICB9LFxufVxuXG5cbmZ1bmN0aW9uIGdldENTU1N0eWxlRW50cmllcyhjeFN0eWxlRW50cmllcywgZW50aXR5VHlwZSkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhjeFN0eWxlRW50cmllcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGN4U3R5bGVFbnRyaWVzW2tleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW2tleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGNzc0VudHJpZXMgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW2tleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIGNzc0VudHJpZXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIG91dHB1dFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldElkU2VsZWN0b3IoaWQsIGVsZW1lbnRUeXBlKSB7XG4gICAgLy9ub2RlI2lkIG9yIGVkZ2UjaWRcbiAgICByZXR1cm4gZWxlbWVudFR5cGUgKyAnIycgKyBpZDtcbn1cblxuXG5cbmZ1bmN0aW9uIGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKSB7XG4gICAgcmV0dXJuIHsgJ3NlbGVjdG9yJzogc2VsZWN0b3IsICdzdHlsZSc6IGNzcyB9O1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBpbmNsdWRlTWluLCBpbmNsdWRlTWF4KSB7XG4gICAgY29uc3QgbWluQ29uZGl0aW9uID0gaW5jbHVkZU1pbiA/ICc+PScgOiAnPic7XG4gICAgY29uc3QgbWF4Q29uZGl0aW9uID0gaW5jbHVkZU1heCA/ICc8PScgOiAnPCc7XG5cbiAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnICcgKyBtaW5Db25kaXRpb24gKyAnICcgKyBtaW5WYWx1ZSArICddWycgKyBhdHRyaWJ1dGVOYW1lICsgJyAnICsgbWF4Q29uZGl0aW9uICsgJyAnICsgbWF4VmFsdWUgKyAnXSdcbn1cblxuZnVuY3Rpb24gZ2V0Q29udGludW91c1N0eWxlKGVudGl0eVR5cGUsIHBvcnRhYmxlUHJvcGVydHlLZXksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIGlmIChtYXBEYXRhUHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgIHJldHVybiBtYXBEYXRhUHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0Q29udGludW91c01hcHBpbmdDU1NFbnRyaWVzKHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ2F0dHJpYnV0ZSddO1xuICAgIGNvbnN0IHJhbmdlTWFwcyA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ21hcCddO1xuICAgIGNvbnNvbGUubG9nKCdjb250aW51b3VzIG1hcHBpbmcgZm9yICcgKyBhdHRyaWJ1dGVOYW1lICsgJzogJyArIEpTT04uc3RyaW5naWZ5KHJhbmdlTWFwcywgbnVsbCwgMikpO1xuXG4gICAgcmFuZ2VNYXBzLmZvckVhY2goKHJhbmdlKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0Q29udGludW91c1NlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIHJhbmdlLm1pbiwgcmFuZ2UubWF4LCByYW5nZS5pbmNsdWRlTWluLCByYW5nZS5pbmNsdWRlTWF4KTtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb250aW51b3VzU3R5bGUoZW50aXR5VHlwZSwgcG9ydGFibGVQcm9wZXJ0eUtleSwgYXR0cmlidXRlTmFtZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIHJhbmdlLm1pblZQVmFsdWUsIHJhbmdlLm1heFZQVmFsdWUpO1xuXG4gICAgICAgIG91dHB1dC5wdXNoKGdldFN0eWxlRWxlbWVudChzZWxlY3Rvciwgc3R5bGUpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRQYXNzdGhyb3VnaE1hcHBpbmdDU1NFbnRyeShwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlKSB7XG4gICAgaWYgKHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgY29uc3QgY3NzID0gcGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShjeE1hcHBpbmdEZWZpbml0aW9uLmF0dHJpYnV0ZSk7XG4gICAgICAgIHJldHVybiBnZXRTdHlsZUVsZW1lbnQoZW50aXR5VHlwZSwgY3NzKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldERpc2NyZXRlU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGF0YVR5cGUsIGF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgaWYgKGF0dHJpYnV0ZURhdGFUeXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICcgPSBcXCcnICsgYXR0cmlidXRlVmFsdWUgKyAnXFwnXSc7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVEYXRhVHlwZSA9PSAnYm9vbGVhbicpIHtcblxuICAgICAgICBpZiAoYXR0cmlidXRlVmFsdWUgPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbPycgKyBhdHRyaWJ1dGVOYW1lICsgJ10nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJ11bIScgKyBhdHRyaWJ1dGVOYW1lICsgJ10nO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyA9ICcgKyBhdHRyaWJ1dGVWYWx1ZSArICddJztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldERpc2NyZXRlTWFwcGluZ0NTU0VudHJpZXMocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBjb25zdCBhdHR0cmlidXRlVG9WYWx1ZU1hcCA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ21hcCddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydhdHRyaWJ1dGUnXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVEYXRhVHlwZSA9IGF0dHJpYnV0ZVR5cGVNYXAuZ2V0KGF0dHJpYnV0ZU5hbWUpO1xuICAgIGF0dHRyaWJ1dGVUb1ZhbHVlTWFwLmZvckVhY2goKGRpc2NyZXRlTWFwKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcgZGlzY3JldGUgbWFwIGZvciAnICsgcG9ydGFibGVQcm9wZXJ0eUtleSArICc6ICcgKyBkaXNjcmV0ZU1hcC52ICsgJyAoJyArIGF0dHJpYnV0ZU5hbWUgKyAnPCcgKyBhdHRyaWJ1dGVEYXRhVHlwZSArICc+KSAtPiAnICsgZGlzY3JldGVNYXAudnApO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0RGlzY3JldGVTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEYXRhVHlwZSwgZGlzY3JldGVNYXAudik7XG5cbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlTWFwID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShkaXNjcmV0ZU1hcC52cCk7XG4gICAgICAgICAgICBjb25zdCBjc3MgPSB7fTtcbiAgICAgICAgICAgIHN0eWxlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBjc3Nba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvdXRwdXQucHVzaChnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcykpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnICAgc3R5bGU6ICcgKyBKU09OLnN0cmluZ2lmeShjc3MpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICByZXR1cm4gb3V0cHV0OyAvL2dldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKTtcbn1cblxuZnVuY3Rpb24gZ2V0QnlwYXNzQ1NTRW50cnkoZW50aXR5VHlwZSwgY3hFbGVtZW50KSB7XG5cbiAgICBjb25zdCBpZCA9IGN4RWxlbWVudC5wbztcbiAgICBjb25zdCBjc3MgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhjeEVsZW1lbnQudikuZm9yRWFjaCgocG9ydGFibGVQcm9wZXJ0eUtleSkgPT4ge1xuICAgICAgICBjb25zdCBwb3J0YWJsZVByb3BlcnR5VmFsdWUgPSBjeEVsZW1lbnQudltwb3J0YWJsZVByb3BlcnR5S2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlTWFwID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgc3R5bGVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGNzc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRJZFNlbGVjdG9yKGlkKTtcbiAgICByZXR1cm4gZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpO1xufVxuXG4vKiogXG4gKiBcbiovXG5mdW5jdGlvbiBnZXRDU1NNYXBwaW5nRW50cmllcyhcbiAgICBjeE1hcHBpbmdFbnRyaWVzLFxuICAgIGVudGl0eVR5cGUsXG4gICAgYXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhjeE1hcHBpbmdFbnRyaWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgY3hNYXBwaW5nRW50cnkgPSBjeE1hcHBpbmdFbnRyaWVzW2tleV07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiIG1hcHBpbmcgdHlwZTogXCIgKyBjeE1hcHBpbmdFbnRyeS50eXBlKTtcbiAgICAgICAgc3dpdGNoIChjeE1hcHBpbmdFbnRyeS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdDT05USU5VT1VTJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRpbm91c01hcHBpbmdzID0gZ2V0Q29udGludW91c01hcHBpbmdDU1NFbnRyaWVzKGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCk7XG4gICAgICAgICAgICAgICAgY29udGlub3VzTWFwcGluZ3MuZm9yRWFjaCgoY29udGlub3VzTWFwcGluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChjb250aW5vdXNNYXBwaW5nKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnUEFTU1RIUk9VR0gnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3NzRW50cnkgPSBnZXRQYXNzdGhyb3VnaE1hcHBpbmdDU1NFbnRyeShrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUpO1xuICAgICAgICAgICAgICAgIGlmIChjc3NFbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChjc3NFbnRyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnRElTQ1JFVEUnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzY3JldGVNYXBwaW5ncyA9IGdldERpc2NyZXRlTWFwcGluZ0NTU0VudHJpZXMoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKTtcbiAgICAgICAgICAgICAgICBkaXNjcmV0ZU1hcHBpbmdzLmZvckVhY2goKGRpc2NyZXRlTWFwcGluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChkaXNjcmV0ZU1hcHBpbmcpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBOT0RFX1NFTEVDVE9SID0gJ25vZGUnO1xuY29uc3QgRURHRV9TRUxFQ1RPUiA9ICdlZGdlJztcblxuZnVuY3Rpb24gZ2V0VmlzdWFsUHJvcGVydGllcyhjeFZpc3VhbFByb3BlcnRpZXMsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICBsZXQgZGVmYXVsdENTU05vZGVTdHlsZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgZGVmYXVsdENTU0VkZ2VTdHlsZSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IG1hcHBpbmdDU1NOb2RlU3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG1hcHBpbmdDU1NFZGdlU3R5bGUgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgYnlwYXNzQ1NTRW50cmllcyA9IFtdO1xuXG4gICAgY3hWaXN1YWxQcm9wZXJ0aWVzLmZvckVhY2goKHZwRWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCB2cEF0ID0gdnBFbGVtZW50LmF0O1xuICAgICAgICBpZiAodnBBdCA9PT0gY3hDb25zdGFudHMuU1RZTEUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdnBFbGVtZW50LnY7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0U3R5bGVzID0gdmFsdWUuZGVmYXVsdDtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BvcnRhYmxlIG5vZGUgc3R5bGU6ICcgKyBKU09OLnN0cmluZ2lmeShkZWZhdWx0U3R5bGVzLm5vZGUpKTtcbiAgICAgICAgICAgIGRlZmF1bHRDU1NOb2RlU3R5bGUgPSBnZXRDU1NTdHlsZUVudHJpZXMoZGVmYXVsdFN0eWxlcy5ub2RlLCAnbm9kZScpO1xuICAgICAgICAgICAgZGVmYXVsdENTU0VkZ2VTdHlsZSA9IGdldENTU1N0eWxlRW50cmllcyhkZWZhdWx0U3R5bGVzLmVkZ2UsICdlZGdlJyk7XG5cbiAgICAgICAgICAgIGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IgPSBkZWZhdWx0U3R5bGVzLm5ldHdvcmtbJ2JhY2tncm91bmQtY29sb3InXTtcblxuICAgICAgICAgICAgY29uc3Qgbm9kZU1hcHBpbmcgPSB2YWx1ZS5ub2RlTWFwcGluZztcbiAgICAgICAgICAgIG1hcHBpbmdDU1NOb2RlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhub2RlTWFwcGluZywgJ25vZGUnLCBub2RlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGVkZ2VNYXBwaW5nID0gdmFsdWUuZWRnZU1hcHBpbmc7XG4gICAgICAgICAgICBtYXBwaW5nQ1NTRWRnZVN0eWxlID0gZ2V0Q1NTTWFwcGluZ0VudHJpZXMoZWRnZU1hcHBpbmcsICdlZGdlJywgZWRnZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodnBBdCA9PT0gY3hDb25zdGFudHMuTikge1xuICAgICAgICAgICAgYnlwYXNzQ1NTRW50cmllcy5wdXNoKGdldEJ5cGFzc0NTU0VudHJ5KCdub2RlJywgdnBFbGVtZW50KSk7XG4gICAgICAgIH0gZWxzZSBpZiAodnBBdCA9PT0gY3hDb25zdGFudHMuRSkge1xuICAgICAgICAgICAgYnlwYXNzQ1NTRW50cmllcy5wdXNoKGdldEJ5cGFzc0NTU0VudHJ5KCdlZGdlJywgdnBFbGVtZW50KSk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc29sZS5sb2coJ2RlZmF1bHQgbm9kZSBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGRlZmF1bHRDU1NOb2RlU3R5bGUpKTtcblxuICAgIC8vQWRkIGRlZmF1bHQgc3R5bGVcbiAgICBvdXRwdXQuc3R5bGUucHVzaChnZXRTdHlsZUVsZW1lbnQoTk9ERV9TRUxFQ1RPUiwgZGVmYXVsdENTU05vZGVTdHlsZSkpO1xuICAgIG91dHB1dC5zdHlsZS5wdXNoKGdldFN0eWxlRWxlbWVudChFREdFX1NFTEVDVE9SLCBkZWZhdWx0Q1NTRWRnZVN0eWxlKSk7XG5cbiAgICBvdXRwdXQuc3R5bGUucHVzaC5hcHBseShvdXRwdXQuc3R5bGUsIG1hcHBpbmdDU1NOb2RlU3R5bGUpO1xuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgbWFwcGluZ0NTU0VkZ2VTdHlsZSk7XG5cbiAgICBvdXRwdXRbJ2JhY2tncm91bmQtY29sb3InXSA9IGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBjb252ZXJ0ZXIgPSB7XG4gICAgdGFyZ2V0Rm9ybWF0OiAnY3l0b3NjYXBlSlMnLFxuICAgIGNvbnZlcnQ6IChjeCkgPT4ge1xuICAgICAgICBjb25zdCBvdXRwdXQgPSB7XG4gICAgICAgICAgICBzdHlsZTogW10sXG4gICAgICAgICAgICBlbGVtZW50czoge30sXG4gICAgICAgICAgICBsYXlvdXQ6IHt9LFxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3hWaXN1YWxQcm9wZXJ0aWVzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgICAgICAgICAgICAgY3hVdGlsLnByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeE5vZGVbJ3YnXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuICAgICAgICAgICAgICAgIGN4RWRnZXMuZm9yRWFjaCgoY3hFZGdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hFZGdlWyd2J10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAuZm9yRWFjaCgoaW5mZXJyZWRUeXBlLCBhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW5mZXJyZWQgYXR0cmlidXRlIHR5cGUgZm9yIG5vZGU6ICcgKyBhdHRyaWJ1dGVOYW1lICsgJzogJyArIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLmZvckVhY2goKGluZmVycmVkVHlwZSwgYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZmVycmVkIGF0dHJpYnV0ZSB0eXBlIGZvciBlZGdlOiAnICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL0FkZCBub2Rlc1xuICAgICAgICBvdXRwdXQuZWxlbWVudHNbJ25vZGVzJ10gPSBbXTtcblxuICAgICAgICAvL0FkZCBlZGdlc1xuICAgICAgICBvdXRwdXQuZWxlbWVudHNbJ2VkZ2VzJ10gPSBbXTtcblxuXG4gICAgICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ10gPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4Tm9kZVsndiddLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnaWQnXSA9IGN4Tm9kZS5pZC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Wydwb3NpdGlvbiddID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogY3hOb2RlWyd4J10sXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBjeE5vZGVbJ3knXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5lbGVtZW50cy5ub2Rlcy5wdXNoKGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuICAgICAgICAgICAgICAgIGN4RWRnZXMuZm9yRWFjaCgoY3hFZGdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddID0gY3hVdGlsLmdldEV4cGFuZGVkQXR0cmlidXRlcyhjeEVkZ2VbJ3YnXSwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ2lkJ10gPSBjeEVkZ2UuaWQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydzb3VyY2UnXSA9IGN4RWRnZVsncyddO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ3RhcmdldCddID0gY3hFZGdlWyd0J107XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5lbGVtZW50cy5lZGdlcy5wdXNoKGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0VmlzdWFsUHJvcGVydGllcyhjeFZpc3VhbFByb3BlcnRpZXMsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgb3V0cHV0LnN0eWxlID0gc3R5bGUuc3R5bGU7XG4gICAgICAgIGNvbnNvbGUubG9nKCd2aXN1YWxQcm9wZXJ0aWVzOiAnICsgSlNPTi5zdHJpbmdpZnkoY3hWaXN1YWxQcm9wZXJ0aWVzLCBudWxsLCAyKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KG91dHB1dC5zdHlsZSwgbnVsbCwgMikpO1xuXG4gICAgICAgIG91dHB1dFsnYmFja2dyb3VuZC1jb2xvciddID0gc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXTtcblxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydGVyOiBjb252ZXJ0ZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTLmpzIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgICdzaGFwZSc6ICdzaGFwZScsXG4gICAgJ3dpZHRoJzogJ3dpZHRoJywgXG4gICAgJ2hlaWdodCc6ICdoZWlnaHQnLFxuICAgICdiYWNrZ3JvdW5kX2NvbG9yJzogJ2JhY2tncm91bmQtY29sb3InLFxuICAgICdiYWNrZ3JvdW5kX29wYWNpdHknOiAnYmFja2dyb3VuZC1vcGFjaXR5JyxcbiAgICAnbGFiZWwnOiAnbGFiZWwnLFxuICAgICdsYWJlbF9jb2xvcic6ICdjb2xvcicsIFxuICAgICdvcGFjaXR5JzogJ29wYWNpdHknLFxuICAgICdsaW5lX2NvbG9yJzogJ2xpbmUtY29sb3InXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlNDb25zdGFudHMuanMiXSwic291cmNlUm9vdCI6IiJ9