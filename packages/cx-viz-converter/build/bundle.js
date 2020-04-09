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
    return alphaDecimal * 255;
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
    var bypassMappings = {
        'node': {},
        'edge': {}
    };
    var discreteMappings = {};
    var continuousMappings = {};

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

            //mappingCSSNodeStyle = getCSSMappingEntries(nodeMapping, 'node', nodeAttributeTypeMap);

            var edgeMapping = value.edgeMapping;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1MmJmMjVhOGZkMDM4ZjFkOTgwNiIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsIlBPIiwiZ2V0Q3hWZXJzaW9uIiwidmVyc2lvblN0cmluZyIsInZlcnNpb25BcnJheSIsInNwbGl0IiwibWFwIiwibnVtYmVyU3RyaW5nIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXNOYU4iLCJlbGVtZW50IiwiZ2V0Q3hNYWpvclZlcnNpb24iLCJwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVBdHRyaWJ1dGVUeXBlTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwiZWRnZUF0dHJpYnV0ZVR5cGVNYXAiLCJlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjeEF0dHJpYnV0ZURlY2xhcmF0aW9uIiwidXBkYXRlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVzIiwidXBkYXRlQXR0cmlidXRlVHlwZU1hcCIsInVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VzIiwiYXR0cmlidXRlVHlwZU1hcCIsImF0dHJpYnV0ZURlY2xhcmF0aW9ucyIsImtleXMiLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlRGVjbGFyYXRpb24iLCJzZXQiLCJkIiwiYXR0cmlidXRlTmFtZU1hcCIsImEiLCJhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJ2IiwidXBkYXRlSW5mZXJyZWRUeXBlcyIsImtleSIsImhhcyIsInZhbHVlIiwiaW5mZXJyZWRUeXBlIiwibmV3S2V5IiwiZ2V0IiwiZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzIiwiZGF0YSIsImNvbnZlcnRlciIsInJlcXVpcmUiLCJjb252ZXJ0IiwiY3giLCJ0YXJnZXRGb3JtYXQiLCJjeENvbnN0YW50cyIsImxhcmdlTmV0d29yayIsImN5dG9zY2FwZUpTIiwiY3hVdGlsIiwidmVyaWZ5VmVyc2lvbiIsImZpcnN0RWxlbWVudCIsIm1ham9yVmVyc2lvbiIsImxhcmdlTmV0d29ya0NvbnN0YW50cyIsInNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJ0YXJnZXRTdHlsZUZpZWxkIiwicG9ydGFibGVQcm9wZXJ0VmFsdWUiLCJ0YXJnZXRTdHlsZUVudHJ5IiwiaGV4VG9SR0IiLCJoZXgiLCJyIiwiZyIsImIiLCJhbHBoYVRvSW50IiwiYWxwaGFEZWNpbWFsIiwiZGVmYXVsdFByb3BlcnR5Q29udmVydCIsInBvcnRhYmxlUHJvcGVydHlWYWx1ZSIsImNvbG9yIiwibGFiZWwiLCJ3aWR0aCIsImdldERlZmF1bHRWYWx1ZXMiLCJkZWZhdWx0VmlzdWFsUHJvcGVydGllcyIsIm91dHB1dCIsIm5vZGUiLCJlZGdlIiwibm9kZURlZmF1bHQiLCJsbnZFbnRyaWVzIiwiZ2V0TE5WVmFsdWVzIiwiYXNzaWduIiwiZWRnZURlZmF1bHQiLCJlbnRpdHlUeXBlIiwiZW50cmllcyIsInBvcnRhYmxlUHJvcGVydHlLZXkiLCJsbnZFbnRyeSIsImxudktleSIsInByb2Nlc3NDb2xvciIsImNvbG9yQXJyYXkiLCJhbHBoYSIsInVuZGVmaW5lZCIsInByb2Nlc3NTaXplIiwiaGVpZ2h0IiwiTWF0aCIsIm1heCIsInByb2Nlc3NOb2RlVmlldyIsIm5vZGVWaWV3IiwiaWQiLCJwb3NpdGlvbiIsInNpemUiLCJwcm9jZXNzRWRnZVZpZXciLCJlZGdlVmlldyIsInMiLCJ0IiwibG52Q29udmVydCIsImN4VmlzdWFsUHJvcGVydGllcyIsIk1hcCIsImRlZmF1bHRWYWx1ZXMiLCJieXBhc3NNYXBwaW5ncyIsImRpc2NyZXRlTWFwcGluZ3MiLCJjb250aW51b3VzTWFwcGluZ3MiLCJjeEFzcGVjdCIsImN4Tm9kZXMiLCJjeE5vZGUiLCJjeEVkZ2VzIiwiY3hFZGdlIiwibm9kZVZpZXdzIiwiZWRnZVZpZXdzIiwidnBBdCIsInZwRWxlbWVudCIsImF0IiwiZGVmYXVsdFN0eWxlcyIsImRlZmF1bHQiLCJub2RlTWFwcGluZyIsImVkZ2VNYXBwaW5nIiwidG9TdHJpbmciLCJ2YWx1ZXMiLCJjeElkIiwiZGVmYXVsdE5vZGVWaXN1YWxQcm9wZXJ0aWVzIiwiZXhwYW5kZWRBdHRyaWJ1dGVzIiwicHJvY2Vzc2VkTm9kZVZpZXciLCJwdXNoIiwiZGVmYXVsdEVkZ2VWaXN1YWxQcm9wZXJ0aWVzIiwicHJvY2Vzc2VkRWRnZVZpZXciLCJqc0NvbnN0YW50cyIsInNoYXBlIiwiYmFja2dyb3VuZF9jb2xvciIsImJhY2tncm91bmRfb3BhY2l0eSIsImxhYmVsX2NvbG9yIiwib3BhY2l0eSIsImxpbmVfY29sb3IiLCJzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0IiwicGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCIsInNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQiLCJtaW5WYWx1ZSIsIm1heFZhbHVlIiwibWluVlAiLCJtYXhWUCIsIm1hcERhdGFQcm9wZXJ0eUNvbnZlcnQiLCJnZXRDU1NTdHlsZUVudHJpZXMiLCJjeFN0eWxlRW50cmllcyIsImNzc0VudHJpZXMiLCJnZXRJZFNlbGVjdG9yIiwiZWxlbWVudFR5cGUiLCJnZXRTdHlsZUVsZW1lbnQiLCJzZWxlY3RvciIsImNzcyIsImdldENvbnRpbnVvdXNTZWxlY3RvciIsImluY2x1ZGVNaW4iLCJpbmNsdWRlTWF4IiwibWluQ29uZGl0aW9uIiwibWF4Q29uZGl0aW9uIiwiZ2V0Q29udGludW91c1N0eWxlIiwiZ2V0Q29udGludW91c01hcHBpbmdDU1NFbnRyaWVzIiwiY3hNYXBwaW5nRGVmaW5pdGlvbiIsInJhbmdlTWFwcyIsInJhbmdlIiwibWluIiwic3R5bGUiLCJtaW5WUFZhbHVlIiwibWF4VlBWYWx1ZSIsImdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5IiwiYXR0cmlidXRlIiwiZ2V0RGlzY3JldGVTZWxlY3RvciIsImF0dHJpYnV0ZURhdGFUeXBlIiwiYXR0cmlidXRlVmFsdWUiLCJnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzIiwiYXR0dHJpYnV0ZVRvVmFsdWVNYXAiLCJkaXNjcmV0ZU1hcCIsInZwIiwic3R5bGVNYXAiLCJnZXRCeXBhc3NDU1NFbnRyeSIsImN4RWxlbWVudCIsInBvIiwiZ2V0Q1NTTWFwcGluZ0VudHJpZXMiLCJjeE1hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cnkiLCJ0eXBlIiwiY29udGlub3VzTWFwcGluZ3MiLCJkZWZpbml0aW9uIiwiY29udGlub3VzTWFwcGluZyIsImNzc0VudHJ5IiwiZGlzY3JldGVNYXBwaW5nIiwiTk9ERV9TRUxFQ1RPUiIsIkVER0VfU0VMRUNUT1IiLCJnZXRWaXN1YWxQcm9wZXJ0aWVzIiwiZGVmYXVsdENTU05vZGVTdHlsZSIsImRlZmF1bHRDU1NFZGdlU3R5bGUiLCJjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yIiwibWFwcGluZ0NTU05vZGVTdHlsZSIsIm1hcHBpbmdDU1NFZGdlU3R5bGUiLCJieXBhc3NDU1NFbnRyaWVzIiwibmV0d29yayIsImFwcGx5IiwiZWxlbWVudHMiLCJsYXlvdXQiLCJ4IiwieSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7O1FBRUE7UUFDQTs7Ozs7Ozs7OztBQzVEQUEsT0FBT0MsT0FBUCxHQUFpQkMsT0FBT0MsTUFBUCxDQUFjO0FBQzNCQyxnQkFBWSxXQURlO0FBRTNCQyxVQUFNLE1BRnFCO0FBRzNCQyxVQUFNLE1BSHFCO0FBSTNCQyxhQUFTLFNBSmtCOztBQU0zQkMsV0FBTyxPQU5vQjtBQU8zQkMsV0FBTyxPQVBvQjs7QUFTM0JDLFFBQUksSUFUdUI7QUFVM0JDLE9BQUcsR0FWd0I7QUFXM0JDLE9BQUcsR0FYd0I7QUFZM0JDLE9BQUcsR0Fad0I7QUFhM0JDLE9BQUcsR0Fid0I7O0FBZTNCQyxRQUFJLElBZnVCO0FBZ0IzQkMsT0FBRyxHQWhCd0I7QUFpQjNCQyxPQUFHLEdBakJ3Qjs7QUFtQjNCQyx1QkFBbUIsa0JBbkJRO0FBb0Iz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QixvQkFBb0IxRixrQkFBcEIsRUFBd0NqRyxvQkFBeEMsRUFBOERHLG9CQUE5RCxDQUFkOztBQUVBK0QsZUFBTzhGLEtBQVAsR0FBZUEsTUFBTUEsS0FBckI7QUFDQTlGLGVBQU8sa0JBQVAsSUFBNkI4RixNQUFNLGtCQUFOLENBQTdCOztBQUVBLGVBQU85RixNQUFQO0FBQ0g7QUEvRmEsQ0FBbEI7O0FBa0dBdkcsT0FBT0MsT0FBUCxHQUFpQjtBQUNidUUsZUFBV0E7QUFERSxDQUFqQixDOzs7Ozs7Ozs7QUN2WUF4RSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPQyxNQUFQLENBQWM7QUFDM0IsYUFBUyxPQURrQjtBQUUzQixhQUFTLE9BRmtCO0FBRzNCLGNBQVUsUUFIaUI7QUFJM0Isd0JBQW9CLGtCQUpPO0FBSzNCLDBCQUFzQixvQkFMSztBQU0zQixhQUFTLE9BTmtCO0FBTzNCLG1CQUFlLE9BUFk7QUFRM0IsZUFBVyxTQVJnQjtBQVMzQixrQkFBYztBQVRhLENBQWQsQ0FBakIsQyIsImZpbGUiOiIuL2J1aWxkL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1MmJmMjVhOGZkMDM4ZjFkOTgwNiIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBDWF9WRVJTSU9OOiAnQ1hWZXJzaW9uJyxcbiAgICBOT0RFOiAnbm9kZScsXG4gICAgRURHRTogJ2VkZ2UnLFxuICAgIE5FVFdPUks6ICduZXR3b3JrJyxcblxuICAgIE5PREVTOiAnbm9kZXMnLFxuICAgIEVER0VTOiAnZWRnZXMnLFxuXG4gICAgSUQ6ICdpZCcsXG4gICAgWDogJ3gnLFxuICAgIFk6ICd5JyxcbiAgICBaOiAneicsXG4gICAgVjogJ3YnLFxuXG4gICAgQVQ6ICdhdCcsXG4gICAgTjogJ24nLFxuICAgIEU6ICdlJyxcblxuICAgIFZJU1VBTF9QUk9QRVJUSUVTOiAndmlzdWFsUHJvcGVydGllcycsXG4gICAgREVGQVVMVDogJ2RlZmF1bHQnLFxuXG4gICAgU1RZTEU6ICdzdHlsZScsXG5cbiAgICBQTzogJ3BvJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N4Q29uc3RhbnRzLmpzIiwiZnVuY3Rpb24gZ2V0Q3hWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcbiAgICBjb25zdCB2ZXJzaW9uQXJyYXkgPSB2ZXJzaW9uU3RyaW5nLnNwbGl0KCcuJykubWFwKChudW1iZXJTdHJpbmcpID0+IHsgcmV0dXJuIHBhcnNlSW50KG51bWJlclN0cmluZywgMTApOyB9KTtcbiAgICBpZiAodmVyc2lvbkFycmF5Lmxlbmd0aCAhPT0gMiAmJiB2ZXJzaW9uQXJyYXkubGVuZ3RoICE9IDMpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSB2ZXJzaW9uIGZvcm1hdDogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxuICAgIHZlcnNpb25BcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAoaXNOYU4oZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93ICdOb24taW50ZWdlciB2YWx1ZSBpbiB2ZXJzaW9uIHN0cmluZzogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdmVyc2lvbkFycmF5O1xufVxuXG5mdW5jdGlvbiBnZXRDeE1ham9yVmVyc2lvbih2ZXJzaW9uU3RyaW5nKSB7XG4gICAgcmV0dXJuIHZlcnNpb25TdHJpbmcgPyBnZXRDeFZlcnNpb24odmVyc2lvblN0cmluZylbMF0gOiAxO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zKGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBcbiAgICBub2RlQXR0cmlidXRlTmFtZU1hcCwgXG4gICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIFxuICAgIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIFxuICAgIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCwgXG4gICAgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIGNvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMuZm9yRWFjaCgoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbikgPT4ge1xuICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnbm9kZXMnXSkge1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnZWRnZXMnXSkge1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWydkJ10pIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLmQpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAoYXR0cmlidXRlTmFtZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2EnXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlRGVjbGFyYXRpb24uYSArICcgc2hvdWxkIGJlIHJlbmFtZWQgdG8gJyArIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgYXR0cmlidXRlTmFtZU1hcC5zZXQoYXR0cmlidXRlRGVjbGFyYXRpb24uYSwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ3YnXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlTmFtZSArICcgaGFzIGRlZmF1bHQgdmFsdWUgJyArIGF0dHJpYnV0ZURlY2xhcmF0aW9uLnYpO1xuICAgICAgICAgICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLnNldChhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbi52KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVJbmZlcnJlZFR5cGVzKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZU5hbWVNYXAsIHYpIHtcbiAgICBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgaWYgKCFhdHRyaWJ1dGVUeXBlTWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IGluZmVycmVkVHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQobmV3S2V5LCBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKHYsIGF0dHJpYnV0ZU5hbWVNYXAsIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIGxldCBkYXRhID0ge307XG4gICAgT2JqZWN0LmtleXModikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICBkYXRhW25ld0tleV0gPSB2W2tleV07XG4gICAgfSk7XG4gICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKCFkYXRhW2tleV0pIHtcbiAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEN4VmVyc2lvbjogZ2V0Q3hWZXJzaW9uLFxuICAgIGdldEN4TWFqb3JWZXJzaW9uOiBnZXRDeE1ham9yVmVyc2lvbixcbiAgICBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zOiBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zLFxuICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXA6IHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcDogdXBkYXRlQXR0cmlidXRlTmFtZU1hcCxcbiAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXA6IHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICB1cGRhdGVJbmZlcnJlZFR5cGVzOiB1cGRhdGVJbmZlcnJlZFR5cGVzLFxuICAgIGdldEV4cGFuZGVkQXR0cmlidXRlcyA6IGdldEV4cGFuZGVkQXR0cmlidXRlc1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hVdGlsLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb252ZXJ0ZXIgPSByZXF1aXJlICgnLi9jb252ZXJ0ZXIuanMnKTtcblxubW9kdWxlLmV4cG9ydHMuY29udmVydCA9IChjeCwgdGFyZ2V0Rm9ybWF0KSA9PiB7IHJldHVybiBjb252ZXJ0ZXIuY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0KTsgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmsgPSByZXF1aXJlICgnLi9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrLmpzJyk7IFxuY29uc3QgY3l0b3NjYXBlSlMgPSByZXF1aXJlICgnLi9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKUy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gdmVyaWZ5VmVyc2lvbihjeCkge1xuICAgIGNvbnN0IGZpcnN0RWxlbWVudCA9IGN4WzBdO1xuICAgIGNvbnN0IHZlcnNpb25TdHJpbmcgPSBmaXJzdEVsZW1lbnRbY3hDb25zdGFudHMuQ1hfVkVSU0lPTl07XG5cbiAgICBjb25zdCBtYWpvclZlcnNpb24gPSBjeFV0aWwuZ2V0Q3hNYWpvclZlcnNpb24odmVyc2lvblN0cmluZyk7XG5cbiAgICBpZiAobWFqb3JWZXJzaW9uICE9PSAyKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgQ1ggdmVyc2lvbjogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQpIHtcbiAgICB2ZXJpZnlWZXJzaW9uKGN4KTtcbiAgICBzd2l0Y2godGFyZ2V0Rm9ybWF0KSB7XG4gICAgICAgIGNhc2UgbGFyZ2VOZXR3b3JrLmNvbnZlcnRlci50YXJnZXRGb3JtYXQ6IHtcbiAgICAgICAgICAgIHJldHVybiBsYXJnZU5ldHdvcmsuY29udmVydGVyLmNvbnZlcnQoY3gpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgY3l0b3NjYXBlSlMuY29udmVydGVyLnRhcmdldEZvcm1hdDoge1xuICAgICAgICAgICAgcmV0dXJuIGN5dG9zY2FwZUpTLmNvbnZlcnRlci5jb252ZXJ0KGN4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydDogY29udmVydFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udmVydGVyLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmtDb25zdGFudHMgPSByZXF1aXJlKCcuL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpIHtcbiAgICBjb25zdCB0YXJnZXRTdHlsZUVudHJ5ID0ge307XG4gICAgdGFyZ2V0U3R5bGVFbnRyeVt0YXJnZXRTdHlsZUZpZWxkXSA9IHBvcnRhYmxlUHJvcGVydFZhbHVlO1xuICAgIHJldHVybiB0YXJnZXRTdHlsZUVudHJ5O1xufVxuXG5mdW5jdGlvbiBoZXhUb1JHQihoZXgpIHtcbiAgICBsZXQgciA9IDAsIGcgPSAwLCBiID0gMDtcblxuICAgIC8vIDMgZGlnaXRzXG4gICAgaWYgKGhleC5sZW5ndGggPT0gNCkge1xuICAgICAgICByID0gXCIweFwiICsgaGV4WzFdICsgaGV4WzFdO1xuICAgICAgICBnID0gXCIweFwiICsgaGV4WzJdICsgaGV4WzJdO1xuICAgICAgICBiID0gXCIweFwiICsgaGV4WzNdICsgaGV4WzNdO1xuXG4gICAgICAgIC8vIDYgZGlnaXRzXG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDcpIHtcbiAgICAgICAgciA9IFwiMHhcIiArIGhleFsxXSArIGhleFsyXTtcbiAgICAgICAgZyA9IFwiMHhcIiArIGhleFszXSArIGhleFs0XTtcbiAgICAgICAgYiA9IFwiMHhcIiArIGhleFs1XSArIGhleFs2XTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3BhcnNlSW50KHIpLCBwYXJzZUludChnKSwgcGFyc2VJbnQoYildO1xufVxuXG5mdW5jdGlvbiBhbHBoYVRvSW50KGFscGhhRGVjaW1hbCkge1xuICAgIHJldHVybiBhbHBoYURlY2ltYWwgKiAyNTU7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCgnd2lkdGgnLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCdoZWlnaHQnLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMuY29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCdhbHBoYScsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy53aWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoJ2FscGhhJywgYWxwaGFUb0ludChwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmNvbG9yLCBoZXhUb1JHQihwb3J0YWJsZVByb3BlcnR5VmFsdWUpKVxuICAgIH0sXG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZXMoZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMpIHtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBub2RlOiB7fSxcbiAgICAgICAgZWRnZToge31cbiAgICB9O1xuICAgIGlmIChkZWZhdWx0VmlzdWFsUHJvcGVydGllc1snbm9kZSddKSB7XG4gICAgICAgIGNvbnN0IG5vZGVEZWZhdWx0ID0gZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMubm9kZTtcbiAgICAgICAgY29uc3QgbG52RW50cmllcyA9IGdldExOVlZhbHVlcygnbm9kZScsIG5vZGVEZWZhdWx0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQubm9kZSwgbG52RW50cmllcyk7XG4gICAgfVxuICAgIGlmIChkZWZhdWx0VmlzdWFsUHJvcGVydGllc1snZWRnZSddKSB7XG4gICAgICAgIGNvbnN0IGVkZ2VEZWZhdWx0ID0gZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMuZWRnZTtcbiAgICAgICAgY29uc3QgbG52RW50cmllcyA9IGdldExOVlZhbHVlcygnZWRnZScsIGVkZ2VEZWZhdWx0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQuZWRnZSwgbG52RW50cmllcyk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldExOVlZhbHVlcyhlbnRpdHlUeXBlLCBlbnRyaWVzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGVudHJpZXMpLmZvckVhY2gocG9ydGFibGVQcm9wZXJ0eUtleSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGVudHJpZXNbcG9ydGFibGVQcm9wZXJ0eUtleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBsbnZFbnRyeSA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxudkVudHJ5KS5mb3JFYWNoKGxudktleSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2xudktleV0gPSBsbnZFbnRyeVtsbnZLZXldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NDb2xvcihjb2xvckFycmF5LCBhbHBoYSkge1xuICAgIHJldHVybiBjb2xvckFycmF5ICE9IHVuZGVmaW5lZFxuICAgICAgICA/IGFscGhhICE9IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBbY29sb3JBcnJheVswXSwgY29sb3JBcnJheVsxXSwgY29sb3JBcnJheVsyXSwgYWxwaGFdXG4gICAgICAgICAgICA6IFtjb2xvckFycmF5WzBdLCBjb2xvckFycmF5WzFdLCBjb2xvckFycmF5WzJdXVxuICAgICAgICA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1NpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHJldHVybiBNYXRoLm1heCh3aWR0aCwgaGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc05vZGVWaWV3KG5vZGVWaWV3KSB7XG4gICAgbGV0IHdpZHRoID0gdW5kZWZpbmVkO1xuICAgIGxldCBoZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGNvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGFscGhhID0gdW5kZWZpbmVkO1xuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIGlkOiBub2RlVmlldy5pZCxcbiAgICAgICAgcG9zaXRpb246IG5vZGVWaWV3LnBvc2l0aW9uXG4gICAgfTtcblxuXG4gICAgT2JqZWN0LmtleXMobm9kZVZpZXcpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ3dpZHRoJykge1xuICAgICAgICAgICAgd2lkdGggPSBub2RlVmlldy53aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdoZWlnaHQnKSB7XG4gICAgICAgICAgICBoZWlnaHQgPSBub2RlVmlldy5oZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnY29sb3InKSB7XG4gICAgICAgICAgICBjb2xvckFycmF5ID0gbm9kZVZpZXcuY29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnYWxwaGEnKSB7XG4gICAgICAgICAgICBhbHBoYSA9IG5vZGVWaWV3LmFscGhhO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2xvciA9IHByb2Nlc3NDb2xvcihjb2xvckFycmF5LCBhbHBoYSk7XG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuY29sb3JdID0gY29sb3I7XG4gICAgfVxuXG4gICAgY29uc3Qgc2l6ZSA9IHByb2Nlc3NTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIGlmIChzaXplKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuc2l6ZV0gPSBwcm9jZXNzU2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0VkZ2VWaWV3KGVkZ2VWaWV3KSB7XG4gICAgbGV0IGNvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGFscGhhID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgaWQ6IGVkZ2VWaWV3LmlkLFxuICAgICAgICBzOiBlZGdlVmlldy5zLFxuICAgICAgICB0OiBlZGdlVmlldy50XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoZWRnZVZpZXcpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ2NvbG9yJykge1xuICAgICAgICAgICAgY29sb3JBcnJheSA9IGVkZ2VWaWV3LmNvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2FscGhhJykge1xuICAgICAgICAgICAgYWxwaGEgPSBlZGdlVmlldy5hbHBoYTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29sb3IgPSBwcm9jZXNzQ29sb3IoY29sb3JBcnJheSwgYWxwaGEpO1xuICAgIGlmIChjb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmNvbG9yXSA9IGNvbG9yO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBsbnZDb252ZXJ0KGN4KSB7XG5cbiAgICAvL0ZpcnN0IHBhc3MuIFxuICAgIC8vIFdlIG1heSBuZWVkIHRvIGNvbGxlY3Qgb2JqZWN0IGF0dHJpYnV0ZXMgdG8gY2FsY3VsYXRlXG4gICAgLy8gbWFwcGluZ3MgaW4gdGhlIHNlY29uZCBwYXNzLiBcblxuICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXM7XG5cbiAgICBsZXQgbm9kZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IG5vZGVBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IGRlZmF1bHRWYWx1ZXMgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGJ5cGFzc01hcHBpbmdzID0ge1xuICAgICAgICAnbm9kZSc6IHt9LFxuICAgICAgICAnZWRnZSc6IHt9XG4gICAgfTtcbiAgICBsZXQgZGlzY3JldGVNYXBwaW5ncyA9IHt9O1xuICAgIGxldCBjb250aW51b3VzTWFwcGluZ3MgPSB7fTtcblxuXG4gICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMgPSBjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ107XG4gICAgICAgICAgICBjeFV0aWwucHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyhjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeE5vZGVbJ3YnXSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hFZGdlWyd2J10pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICBjeFZpc3VhbFByb3BlcnRpZXMgPSBjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgb3V0cHV0ID0ge307XG5cbiAgICBsZXQgbm9kZVZpZXdzID0gW107XG4gICAgbGV0IGVkZ2VWaWV3cyA9IFtdO1xuXG4gICAgY3hWaXN1YWxQcm9wZXJ0aWVzLmZvckVhY2godnBFbGVtZW50ID0+IHtcbiAgICAgICAgY29uc3QgdnBBdCA9IHZwRWxlbWVudC5hdDtcbiAgICAgICAgaWYgKHZwQXQgPT09IGN4Q29uc3RhbnRzLlNUWUxFKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZwRWxlbWVudC52O1xuICAgICAgICAgICAgY29uc3QgZGVmYXVsdFN0eWxlcyA9IHZhbHVlLmRlZmF1bHQ7XG5cbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZXMgPSBnZXREZWZhdWx0VmFsdWVzKGRlZmF1bHRTdHlsZXMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xhcmdlIG5ldHdvcmsgZGVmYXVsdCBzdHlsZSA9ICcgKyBKU09OLnN0cmluZ2lmeShkZWZhdWx0VmFsdWVzLCBudWxsLCAyKSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGVNYXBwaW5nID0gdmFsdWUubm9kZU1hcHBpbmc7XG5cbiAgICAgICAgICAgIC8vbWFwcGluZ0NTU05vZGVTdHlsZSA9IGdldENTU01hcHBpbmdFbnRyaWVzKG5vZGVNYXBwaW5nLCAnbm9kZScsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICAgICAgY29uc3QgZWRnZU1hcHBpbmcgPSB2YWx1ZS5lZGdlTWFwcGluZztcbiAgICAgICAgICAgIC8vbWFwcGluZ0NTU0VkZ2VTdHlsZSA9IGdldENTU01hcHBpbmdFbnRyaWVzKGVkZ2VNYXBwaW5nLCAnZWRnZScsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHZwQXQgPT09IGN4Q29uc3RhbnRzLk4pIHtcblxuICAgICAgICAgICAgY29uc3Qga2V5ID0gdnBFbGVtZW50W2N4Q29uc3RhbnRzLlBPXS50b1N0cmluZygpO1xuICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gZ2V0TE5WVmFsdWVzKCdub2RlJywgdnBFbGVtZW50LnYpXG5cbiAgICAgICAgICAgIGlmICghYnlwYXNzTWFwcGluZ3Mubm9kZVtrZXldKSB7XG4gICAgICAgICAgICAgICAgYnlwYXNzTWFwcGluZ3Mubm9kZVtrZXldID0ge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdieXBhc3MgY2FsY3VsYXRlZDogJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlcywgbnVsbCwgMikpO1xuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGJ5cGFzc01hcHBpbmdzLm5vZGVba2V5XSwgdmFsdWVzKTtcbiAgICAgICAgICAgIC8vYnlwYXNzQ1NTRW50cmllcy5wdXNoKGdldEJ5cGFzc0NTU0VudHJ5KCdub2RlJywgdnBFbGVtZW50KSk7XG4gICAgICAgIH0gZWxzZSBpZiAodnBBdCA9PT0gY3hDb25zdGFudHMuRSkge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gdnBFbGVtZW50W2N4Q29uc3RhbnRzLlBPXS50b1N0cmluZygpO1xuICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gZ2V0TE5WVmFsdWVzKCdlZGdlJywgdnBFbGVtZW50LnYpXG5cbiAgICAgICAgICAgIGlmICghYnlwYXNzTWFwcGluZ3MuZWRnZVtrZXldKSB7XG4gICAgICAgICAgICAgICAgYnlwYXNzTWFwcGluZ3MuZWRnZVtrZXldID0ge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdieXBhc3MgY2FsY3VsYXRlZDogJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlcywgbnVsbCwgMikpO1xuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGJ5cGFzc01hcHBpbmdzLmVkZ2Vba2V5XSwgdmFsdWVzKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cblxuICAgIC8vU2Vjb25kIHBhc3MuIFxuICAgIC8vIEhlcmUgaXMgd2hlcmUgdGhlIGFjdHVhbCBvdXRwdXQgaXMgZ2VuZXJhdGVkLlxuXG5cblxuICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuXG5cbiAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hJZCA9IGN4Tm9kZVtjeENvbnN0YW50cy5JRF0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlVmlldyA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGN4SWQsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBjeE5vZGVbJ3onXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBbY3hOb2RlWyd4J10sIGN4Tm9kZVsneSddLCBjeE5vZGVbJ3onXV1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogW2N4Tm9kZVsneCddLCBjeE5vZGVbJ3knXV1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL1RPRE8gY2FsY3VsYXRlIGxudiB2cHMgYmFzZWQgb24gZGVmYXVsdHMgYW5kIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0Tm9kZVZpc3VhbFByb3BlcnRpZXMgPSBkZWZhdWx0VmFsdWVzWydub2RlJ107XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obm9kZVZpZXcsIGRlZmF1bHROb2RlVmlzdWFsUHJvcGVydGllcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vQXNzaWduIG1hcHBpbmdzXG4gICAgICAgICAgICAgICAgY29uc3QgZXhwYW5kZWRBdHRyaWJ1dGVzID0gY3hVdGlsLmdldEV4cGFuZGVkQXR0cmlidXRlcyhjeE5vZGVbJ3YnXSwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuXG4gICAgICAgICAgICAgICAgLy9Bc3NpZ24gYnlwYXNzXG4gICAgICAgICAgICAgICAgaWYgKGJ5cGFzc01hcHBpbmdzLm5vZGVbY3hJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlVmlldywgYnlwYXNzTWFwcGluZ3Mubm9kZVtjeElkXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkTm9kZVZpZXcgPSBwcm9jZXNzTm9kZVZpZXcobm9kZVZpZXcpO1xuXG4gICAgICAgICAgICAgICAgbm9kZVZpZXdzLnB1c2gocHJvY2Vzc2VkTm9kZVZpZXcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuXG4gICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeEVkZ2VbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRnZVZpZXcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBjeElkLFxuICAgICAgICAgICAgICAgICAgICBzOiBjeEVkZ2Uucy50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICB0OiBjeEVkZ2UudC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9UT0RPIGNhbGN1bGF0ZSBsbnYgdnBzIGJhc2VkIG9uIGRlZmF1bHRzIGFuZCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdEVkZ2VWaXN1YWxQcm9wZXJ0aWVzID0gZGVmYXVsdFZhbHVlc1snZWRnZSddO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBkZWZhdWx0RWRnZVZpc3VhbFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkQXR0cmlidXRlcyA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hFZGdlWyd2J10sIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcblxuICAgICAgICAgICAgICAgIC8vQXNzaWduIGJ5cGFzc1xuICAgICAgICAgICAgICAgIGlmIChieXBhc3NNYXBwaW5ncy5lZGdlW2N4SWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWRnZVZpZXcsIGJ5cGFzc01hcHBpbmdzLmVkZ2VbY3hJZF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEVkZ2VWaWV3ID0gcHJvY2Vzc0VkZ2VWaWV3KGVkZ2VWaWV3KTtcblxuICAgICAgICAgICAgICAgIGVkZ2VWaWV3cy5wdXNoKHByb2Nlc3NlZEVkZ2VWaWV3KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLm5vZGVWaWV3c10gPSBub2RlVmlld3M7XG4gICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5lZGdlVmlld3NdID0gZWRnZVZpZXdzO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdsbnYnLFxuICAgIGNvbnZlcnQ6IChjeCkgPT4ge1xuICAgICAgICByZXR1cm4gbG52Q29udmVydChjeCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0ZXI6IGNvbnZlcnRlclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICAnbm9kZVZpZXdzJzogJ25vZGVWaWV3cycsXG4gICAgJ2VkZ2VWaWV3cyc6ICdlZGdlVmlld3MnLCBcbiAgICAnaWQnOiAnaWQnLFxuICAgICdwb3NpdGlvbic6ICdwb3NpdGlvbicsXG4gICAgJ3MnOiAncycsXG4gICAgJ3QnOiAndCcsXG4gICAgJ2xhYmVsJzogJ2xhYmVsJywgXG4gICAgJ2NvbG9yJzogJ2NvbG9yJyxcbiAgICAnbGluZV9jb2xvcic6ICdsaW5lLWNvbG9yJyxcbiAgICAnc2l6ZScgOiAnc2l6ZScsXG4gICAgJ3dpZHRoJyA6ICd3aWR0aCdcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBqc0NvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3l0b3NjYXBlSlNDb25zdGFudHMuanMnKTtcbmNvbnN0IGN4VXRpbCA9IHJlcXVpcmUoJy4uL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKSB7XG4gICAgY29uc3QgdGFyZ2V0U3R5bGVFbnRyeSA9IG5ldyBNYXAoKTtcbiAgICB0YXJnZXRTdHlsZUVudHJ5LnNldCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSk7XG4gICAgcmV0dXJuIHRhcmdldFN0eWxlRW50cnk7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbn1cblxuZnVuY3Rpb24gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgY29uc3Qgb3V0cHV0ID0ge307XG4gICAgb3V0cHV0W3RhcmdldFN0eWxlRmllbGRdID0gJ2RhdGEoJyArIGF0dHJpYnV0ZU5hbWUgKyAnKSc7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgcGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfU0hBUEUnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG59XG5mdW5jdGlvbiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9ICdtYXBEYXRhKCcgKyBhdHRyaWJ1dGVOYW1lXG4gICAgICAgICsgJywgJyArIG1pblZhbHVlXG4gICAgICAgICsgJywgJyArIG1heFZhbHVlXG4gICAgICAgICsgJywgJyArIG1pblZQXG4gICAgICAgICsgJywgJyArIG1heFZQXG4gICAgICAgICsgJyknO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IG1hcERhdGFQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKVxuICAgIH0sXG59XG5cblxuZnVuY3Rpb24gZ2V0Q1NTU3R5bGVFbnRyaWVzKGN4U3R5bGVFbnRyaWVzLCBlbnRpdHlUeXBlKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4U3R5bGVFbnRyaWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gY3hTdHlsZUVudHJpZXNba2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgY3NzRW50cmllcyA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgY3NzRW50cmllcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0SWRTZWxlY3RvcihpZCwgZWxlbWVudFR5cGUpIHtcbiAgICAvL25vZGUjaWQgb3IgZWRnZSNpZFxuICAgIHJldHVybiBlbGVtZW50VHlwZSArICcjJyArIGlkO1xufVxuXG5cblxuZnVuY3Rpb24gZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpIHtcbiAgICByZXR1cm4geyAnc2VsZWN0b3InOiBzZWxlY3RvciwgJ3N0eWxlJzogY3NzIH07XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIGluY2x1ZGVNaW4sIGluY2x1ZGVNYXgpIHtcbiAgICBjb25zdCBtaW5Db25kaXRpb24gPSBpbmNsdWRlTWluID8gJz49JyA6ICc+JztcbiAgICBjb25zdCBtYXhDb25kaXRpb24gPSBpbmNsdWRlTWF4ID8gJzw9JyA6ICc8JztcblxuICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICcgJyArIG1pbkNvbmRpdGlvbiArICcgJyArIG1pblZhbHVlICsgJ11bJyArIGF0dHJpYnV0ZU5hbWUgKyAnICcgKyBtYXhDb25kaXRpb24gKyAnICcgKyBtYXhWYWx1ZSArICddJ1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzU3R5bGUoZW50aXR5VHlwZSwgcG9ydGFibGVQcm9wZXJ0eUtleSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgaWYgKG1hcERhdGFQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgcmV0dXJuIG1hcERhdGFQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnYXR0cmlidXRlJ107XG4gICAgY29uc3QgcmFuZ2VNYXBzID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgY29uc29sZS5sb2coJ2NvbnRpbnVvdXMgbWFwcGluZyBmb3IgJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgSlNPTi5zdHJpbmdpZnkocmFuZ2VNYXBzLCBudWxsLCAyKSk7XG5cbiAgICByYW5nZU1hcHMuZm9yRWFjaCgocmFuZ2UpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRDb250aW51b3VzU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIHJhbmdlLmluY2x1ZGVNaW4sIHJhbmdlLmluY2x1ZGVNYXgpO1xuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbnRpbnVvdXNTdHlsZShlbnRpdHlUeXBlLCBwb3J0YWJsZVByb3BlcnR5S2V5LCBhdHRyaWJ1dGVOYW1lLCByYW5nZS5taW4sIHJhbmdlLm1heCwgcmFuZ2UubWluVlBWYWx1ZSwgcmFuZ2UubWF4VlBWYWx1ZSk7XG5cbiAgICAgICAgb3V0cHV0LnB1c2goZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBzdHlsZSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUpIHtcbiAgICBpZiAocGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICBjb25zdCBjc3MgPSBwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGN4TWFwcGluZ0RlZmluaXRpb24uYXR0cmlidXRlKTtcbiAgICAgICAgcmV0dXJuIGdldFN0eWxlRWxlbWVudChlbnRpdHlUeXBlLCBjc3MpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEYXRhVHlwZSwgYXR0cmlidXRlVmFsdWUpIHtcbiAgICBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyA9IFxcJycgKyBhdHRyaWJ1dGVWYWx1ZSArICdcXCddJztcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZURhdGFUeXBlID09ICdib29sZWFuJykge1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVWYWx1ZSA9PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1s/JyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnXVshJyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gJyArIGF0dHJpYnV0ZVZhbHVlICsgJ10nO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyhwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIGNvbnN0IGF0dHRyaWJ1dGVUb1ZhbHVlTWFwID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ2F0dHJpYnV0ZSddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZURhdGFUeXBlID0gYXR0cmlidXRlVHlwZU1hcC5nZXQoYXR0cmlidXRlTmFtZSk7XG4gICAgYXR0dHJpYnV0ZVRvVmFsdWVNYXAuZm9yRWFjaCgoZGlzY3JldGVNYXApID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJyBkaXNjcmV0ZSBtYXAgZm9yICcgKyBwb3J0YWJsZVByb3BlcnR5S2V5ICsgJzogJyArIGRpc2NyZXRlTWFwLnYgKyAnICgnICsgYXR0cmlidXRlTmFtZSArICc8JyArIGF0dHJpYnV0ZURhdGFUeXBlICsgJz4pIC0+ICcgKyBkaXNjcmV0ZU1hcC52cCk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXREaXNjcmV0ZVNlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURhdGFUeXBlLCBkaXNjcmV0ZU1hcC52KTtcblxuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGRpc2NyZXRlTWFwLnZwKTtcbiAgICAgICAgICAgIGNvbnN0IGNzcyA9IHt9O1xuICAgICAgICAgICAgc3R5bGVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGNzc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcgICBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGNzcykpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIHJldHVybiBvdXRwdXQ7IC8vZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpO1xufVxuXG5mdW5jdGlvbiBnZXRCeXBhc3NDU1NFbnRyeShlbnRpdHlUeXBlLCBjeEVsZW1lbnQpIHtcblxuICAgIGNvbnN0IGlkID0gY3hFbGVtZW50LnBvO1xuICAgIGNvbnN0IGNzcyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4RWxlbWVudC52KS5mb3JFYWNoKChwb3J0YWJsZVByb3BlcnR5S2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGN4RWxlbWVudC52W3BvcnRhYmxlUHJvcGVydHlLZXldO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICBzdHlsZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY3NzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWxlY3RvciA9IGdldElkU2VsZWN0b3IoaWQpO1xuICAgIHJldHVybiBnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcyk7XG59XG5cbi8qKiBcbiAqIFxuKi9cbmZ1bmN0aW9uIGdldENTU01hcHBpbmdFbnRyaWVzKFxuICAgIGN4TWFwcGluZ0VudHJpZXMsXG4gICAgZW50aXR5VHlwZSxcbiAgICBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGN4TWFwcGluZ0VudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBjeE1hcHBpbmdFbnRyeSA9IGN4TWFwcGluZ0VudHJpZXNba2V5XTtcbiAgICAgICAgY29uc29sZS5sb2coXCIgbWFwcGluZyB0eXBlOiBcIiArIGN4TWFwcGluZ0VudHJ5LnR5cGUpO1xuICAgICAgICBzd2l0Y2ggKGN4TWFwcGluZ0VudHJ5LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0NPTlRJTlVPVVMnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGlub3VzTWFwcGluZ3MgPSBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKTtcbiAgICAgICAgICAgICAgICBjb250aW5vdXNNYXBwaW5ncy5mb3JFYWNoKChjb250aW5vdXNNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGNvbnRpbm91c01hcHBpbmcpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdQQVNTVEhST1VHSCc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjc3NFbnRyeSA9IGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNzc0VudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGNzc0VudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdESVNDUkVURSc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNjcmV0ZU1hcHBpbmdzID0gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyhrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApO1xuICAgICAgICAgICAgICAgIGRpc2NyZXRlTWFwcGluZ3MuZm9yRWFjaCgoZGlzY3JldGVNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGRpc2NyZXRlTWFwcGluZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IE5PREVfU0VMRUNUT1IgPSAnbm9kZSc7XG5jb25zdCBFREdFX1NFTEVDVE9SID0gJ2VkZ2UnO1xuXG5mdW5jdGlvbiBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgc3R5bGU6IFtdLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGxldCBkZWZhdWx0Q1NTTm9kZVN0eWxlID0gdW5kZWZpbmVkO1xuICAgIGxldCBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgbWFwcGluZ0NTU05vZGVTdHlsZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbWFwcGluZ0NTU0VkZ2VTdHlsZSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBieXBhc3NDU1NFbnRyaWVzID0gW107XG5cbiAgICBjeFZpc3VhbFByb3BlcnRpZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHZwQXQgPSB2cEVsZW1lbnQuYXQ7XG4gICAgICAgIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5TVFlMRSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2cEVsZW1lbnQudjtcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZXMgPSB2YWx1ZS5kZWZhdWx0O1xuXG4gICAgICAgICAgICBkZWZhdWx0Q1NTTm9kZVN0eWxlID0gZ2V0Q1NTU3R5bGVFbnRyaWVzKGRlZmF1bHRTdHlsZXMubm9kZSwgJ25vZGUnKTtcbiAgICAgICAgICAgIGRlZmF1bHRDU1NFZGdlU3R5bGUgPSBnZXRDU1NTdHlsZUVudHJpZXMoZGVmYXVsdFN0eWxlcy5lZGdlLCAnZWRnZScpO1xuXG4gICAgICAgICAgICBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gZGVmYXVsdFN0eWxlcy5uZXR3b3JrWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGVNYXBwaW5nID0gdmFsdWUubm9kZU1hcHBpbmc7XG4gICAgICAgICAgICBtYXBwaW5nQ1NTTm9kZVN0eWxlID0gZ2V0Q1NTTWFwcGluZ0VudHJpZXMobm9kZU1hcHBpbmcsICdub2RlJywgbm9kZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgICAgICBjb25zdCBlZGdlTWFwcGluZyA9IHZhbHVlLmVkZ2VNYXBwaW5nO1xuICAgICAgICAgICAgbWFwcGluZ0NTU0VkZ2VTdHlsZSA9IGdldENTU01hcHBpbmdFbnRyaWVzKGVkZ2VNYXBwaW5nLCAnZWRnZScsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHZwQXQgPT09IGN4Q29uc3RhbnRzLk4pIHtcbiAgICAgICAgICAgIGJ5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnbm9kZScsIHZwRWxlbWVudCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHZwQXQgPT09IGN4Q29uc3RhbnRzLkUpIHtcbiAgICAgICAgICAgIGJ5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnZWRnZScsIHZwRWxlbWVudCkpO1xuXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy9BZGQgZGVmYXVsdCBzdHlsZVxuICAgIG91dHB1dC5zdHlsZS5wdXNoKGdldFN0eWxlRWxlbWVudChOT0RFX1NFTEVDVE9SLCBkZWZhdWx0Q1NTTm9kZVN0eWxlKSk7XG4gICAgb3V0cHV0LnN0eWxlLnB1c2goZ2V0U3R5bGVFbGVtZW50KEVER0VfU0VMRUNUT1IsIGRlZmF1bHRDU1NFZGdlU3R5bGUpKTtcblxuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgbWFwcGluZ0NTU05vZGVTdHlsZSk7XG4gICAgb3V0cHV0LnN0eWxlLnB1c2guYXBwbHkob3V0cHV0LnN0eWxlLCBtYXBwaW5nQ1NTRWRnZVN0eWxlKTtcblxuICAgIG91dHB1dFsnYmFja2dyb3VuZC1jb2xvciddID0gY3NzTmV0d29ya0JhY2tncm91bmRDb2xvcjtcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdjeXRvc2NhcGVKUycsXG4gICAgY29udmVydDogKGN4KSA9PiB7XG4gICAgICAgIGNvbnN0IG91dHB1dCA9IHtcbiAgICAgICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiB7fSxcbiAgICAgICAgICAgIGxheW91dDoge30sXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMgPSBjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ107XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IFwiICsgSlNPTi5zdHJpbmdpZnkoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIG51bGwsIDIpKTtcbiAgICAgICAgICAgICAgICBjeFV0aWwucHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyhjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgICAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhub2RlQXR0cmlidXRlVHlwZU1hcCwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4Tm9kZVsndiddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEVkZ2VbJ3YnXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ10pIHtcbiAgICAgICAgICAgICAgICBjeFZpc3VhbFByb3BlcnRpZXMgPSBjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcC5mb3JFYWNoKChpbmZlcnJlZFR5cGUsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3Igbm9kZTogJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWRnZUF0dHJpYnV0ZVR5cGVNYXAuZm9yRWFjaCgoaW5mZXJyZWRUeXBlLCBhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW5mZXJyZWQgYXR0cmlidXRlIHR5cGUgZm9yIGVkZ2U6ICcgKyBhdHRyaWJ1dGVOYW1lICsgJzogJyArIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vQWRkIG5vZGVzXG4gICAgICAgIG91dHB1dC5lbGVtZW50c1snbm9kZXMnXSA9IFtdO1xuXG4gICAgICAgIC8vQWRkIGVkZ2VzXG4gICAgICAgIG91dHB1dC5lbGVtZW50c1snZWRnZXMnXSA9IFtdO1xuXG5cbiAgICAgICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hOb2RlWyd2J10sIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydpZCddID0gY3hOb2RlLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ3Bvc2l0aW9uJ10gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBjeE5vZGVbJ3gnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGN4Tm9kZVsneSddXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmVsZW1lbnRzLm5vZGVzLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ10gPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4RWRnZVsndiddLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnaWQnXSA9IGN4RWRnZS5pZC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ3NvdXJjZSddID0gY3hFZGdlWydzJ107XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsndGFyZ2V0J10gPSBjeEVkZ2VbJ3QnXTtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmVsZW1lbnRzLmVkZ2VzLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICBvdXRwdXQuc3R5bGUgPSBzdHlsZS5zdHlsZTtcbiAgICAgICAgb3V0cHV0WydiYWNrZ3JvdW5kLWNvbG9yJ10gPSBzdHlsZVsnYmFja2dyb3VuZC1jb2xvciddO1xuXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0ZXI6IGNvbnZlcnRlclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgJ3NoYXBlJzogJ3NoYXBlJyxcbiAgICAnd2lkdGgnOiAnd2lkdGgnLCBcbiAgICAnaGVpZ2h0JzogJ2hlaWdodCcsXG4gICAgJ2JhY2tncm91bmRfY29sb3InOiAnYmFja2dyb3VuZC1jb2xvcicsXG4gICAgJ2JhY2tncm91bmRfb3BhY2l0eSc6ICdiYWNrZ3JvdW5kLW9wYWNpdHknLFxuICAgICdsYWJlbCc6ICdsYWJlbCcsXG4gICAgJ2xhYmVsX2NvbG9yJzogJ2NvbG9yJywgXG4gICAgJ29wYWNpdHknOiAnb3BhY2l0eScsXG4gICAgJ2xpbmVfY29sb3InOiAnbGluZS1jb2xvcidcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKU0NvbnN0YW50cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=