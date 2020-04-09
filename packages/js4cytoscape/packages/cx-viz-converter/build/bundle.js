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

var mappingPropertyConvert = {
    'node': {
        'NODE_WIDTH': ['width'],
        'NODE_HEIGHT': ['height'],
        'NODE_BACKGROUND_COLOR': [largeNetworkConstants.color],
        'NODE_BACKGROUND_OPACITY': ['alpha'],
        'NODE_LABEL': [largeNetworkConstants.label]
    },
    'edge': {
        'EDGE_WIDTH': [largeNetworkConstants.width],
        'EDGE_OPACITY': ['alpha'],
        'EDGE_LINE_COLOR': [largeNetworkConstants.color]
    }
};

function getMappings(mappings) {
    var output = {};
    Object.keys(mappings).forEach(function (propertyKey) {
        var mapping = mappings[propertyKey];
        mapping[mapping.definition.attribute] = {
            type: mapping.type,
            vp: propertyKey,
            definition: mapping.definition
        };
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
            mappings.edge = getMappings(nodeMapping);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4MjlhODc5MDM5NzE5YmNlZmI4YSIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsIlBPIiwiZ2V0Q3hWZXJzaW9uIiwidmVyc2lvblN0cmluZyIsInZlcnNpb25BcnJheSIsInNwbGl0IiwibWFwIiwibnVtYmVyU3RyaW5nIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXNOYU4iLCJlbGVtZW50IiwiZ2V0Q3hNYWpvclZlcnNpb24iLCJwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVBdHRyaWJ1dGVUeXBlTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwiZWRnZUF0dHJpYnV0ZVR5cGVNYXAiLCJlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjeEF0dHJpYnV0ZURlY2xhcmF0aW9uIiwidXBkYXRlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVzIiwidXBkYXRlQXR0cmlidXRlVHlwZU1hcCIsInVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VzIiwiYXR0cmlidXRlVHlwZU1hcCIsImF0dHJpYnV0ZURlY2xhcmF0aW9ucyIsImtleXMiLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlRGVjbGFyYXRpb24iLCJzZXQiLCJkIiwiYXR0cmlidXRlTmFtZU1hcCIsImEiLCJhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJ2IiwidXBkYXRlSW5mZXJyZWRUeXBlcyIsImtleSIsImhhcyIsInZhbHVlIiwiaW5mZXJyZWRUeXBlIiwibmV3S2V5IiwiZ2V0IiwiZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzIiwiZGF0YSIsImNvbnZlcnRlciIsInJlcXVpcmUiLCJjb252ZXJ0IiwiY3giLCJ0YXJnZXRGb3JtYXQiLCJjeENvbnN0YW50cyIsImxhcmdlTmV0d29yayIsImN5dG9zY2FwZUpTIiwiY3hVdGlsIiwidmVyaWZ5VmVyc2lvbiIsImZpcnN0RWxlbWVudCIsIm1ham9yVmVyc2lvbiIsImxhcmdlTmV0d29ya0NvbnN0YW50cyIsInNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJ0YXJnZXRTdHlsZUZpZWxkIiwicG9ydGFibGVQcm9wZXJ0VmFsdWUiLCJ0YXJnZXRTdHlsZUVudHJ5IiwiaGV4VG9SR0IiLCJoZXgiLCJyIiwiZyIsImIiLCJhbHBoYVRvSW50IiwiYWxwaGFEZWNpbWFsIiwiZGVmYXVsdFByb3BlcnR5Q29udmVydCIsInBvcnRhYmxlUHJvcGVydHlWYWx1ZSIsImNvbG9yIiwibGFiZWwiLCJ3aWR0aCIsImdldERlZmF1bHRWYWx1ZXMiLCJkZWZhdWx0VmlzdWFsUHJvcGVydGllcyIsIm91dHB1dCIsIm5vZGUiLCJlZGdlIiwibm9kZURlZmF1bHQiLCJsbnZFbnRyaWVzIiwiZ2V0TE5WVmFsdWVzIiwiYXNzaWduIiwiZWRnZURlZmF1bHQiLCJlbnRpdHlUeXBlIiwiZW50cmllcyIsInBvcnRhYmxlUHJvcGVydHlLZXkiLCJsbnZFbnRyeSIsImxudktleSIsInByb2Nlc3NDb2xvciIsImNvbG9yQXJyYXkiLCJhbHBoYSIsInVuZGVmaW5lZCIsInByb2Nlc3NTaXplIiwiaGVpZ2h0IiwiTWF0aCIsIm1heCIsInByb2Nlc3NOb2RlVmlldyIsIm5vZGVWaWV3IiwiaWQiLCJwb3NpdGlvbiIsInNpemUiLCJwcm9jZXNzRWRnZVZpZXciLCJlZGdlVmlldyIsInMiLCJ0IiwibWFwcGluZ1Byb3BlcnR5Q29udmVydCIsImdldE1hcHBpbmdzIiwibWFwcGluZ3MiLCJtYXBwaW5nIiwicHJvcGVydHlLZXkiLCJkZWZpbml0aW9uIiwiYXR0cmlidXRlIiwidHlwZSIsInZwIiwibG52Q29udmVydCIsImN4VmlzdWFsUHJvcGVydGllcyIsIk1hcCIsImRlZmF1bHRWYWx1ZXMiLCJieXBhc3NNYXBwaW5ncyIsImN4QXNwZWN0IiwiY3hOb2RlcyIsImN4Tm9kZSIsImN4RWRnZXMiLCJjeEVkZ2UiLCJub2RlVmlld3MiLCJlZGdlVmlld3MiLCJ2cEF0IiwidnBFbGVtZW50IiwiYXQiLCJkZWZhdWx0U3R5bGVzIiwiZGVmYXVsdCIsIm5vZGVNYXBwaW5nIiwiZWRnZU1hcHBpbmciLCJ0b1N0cmluZyIsInZhbHVlcyIsImN4SWQiLCJkZWZhdWx0Tm9kZVZpc3VhbFByb3BlcnRpZXMiLCJleHBhbmRlZEF0dHJpYnV0ZXMiLCJwcm9jZXNzZWROb2RlVmlldyIsInB1c2giLCJkZWZhdWx0RWRnZVZpc3VhbFByb3BlcnRpZXMiLCJwcm9jZXNzZWRFZGdlVmlldyIsImpzQ29uc3RhbnRzIiwic2hhcGUiLCJiYWNrZ3JvdW5kX2NvbG9yIiwiYmFja2dyb3VuZF9vcGFjaXR5IiwibGFiZWxfY29sb3IiLCJvcGFjaXR5IiwibGluZV9jb2xvciIsInNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0Iiwic2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydCIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJtaW5WUCIsIm1heFZQIiwibWFwRGF0YVByb3BlcnR5Q29udmVydCIsImdldENTU1N0eWxlRW50cmllcyIsImN4U3R5bGVFbnRyaWVzIiwiY3NzRW50cmllcyIsImdldElkU2VsZWN0b3IiLCJlbGVtZW50VHlwZSIsImdldFN0eWxlRWxlbWVudCIsInNlbGVjdG9yIiwiY3NzIiwiZ2V0Q29udGludW91c1NlbGVjdG9yIiwiaW5jbHVkZU1pbiIsImluY2x1ZGVNYXgiLCJtaW5Db25kaXRpb24iLCJtYXhDb25kaXRpb24iLCJnZXRDb250aW51b3VzU3R5bGUiLCJnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMiLCJjeE1hcHBpbmdEZWZpbml0aW9uIiwicmFuZ2VNYXBzIiwicmFuZ2UiLCJtaW4iLCJzdHlsZSIsIm1pblZQVmFsdWUiLCJtYXhWUFZhbHVlIiwiZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkiLCJnZXREaXNjcmV0ZVNlbGVjdG9yIiwiYXR0cmlidXRlRGF0YVR5cGUiLCJhdHRyaWJ1dGVWYWx1ZSIsImdldERpc2NyZXRlTWFwcGluZ0NTU0VudHJpZXMiLCJhdHR0cmlidXRlVG9WYWx1ZU1hcCIsImRpc2NyZXRlTWFwIiwic3R5bGVNYXAiLCJnZXRCeXBhc3NDU1NFbnRyeSIsImN4RWxlbWVudCIsInBvIiwiZ2V0Q1NTTWFwcGluZ0VudHJpZXMiLCJjeE1hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cnkiLCJjb250aW5vdXNNYXBwaW5ncyIsImNvbnRpbm91c01hcHBpbmciLCJjc3NFbnRyeSIsImRpc2NyZXRlTWFwcGluZ3MiLCJkaXNjcmV0ZU1hcHBpbmciLCJOT0RFX1NFTEVDVE9SIiwiRURHRV9TRUxFQ1RPUiIsImdldFZpc3VhbFByb3BlcnRpZXMiLCJkZWZhdWx0Q1NTTm9kZVN0eWxlIiwiZGVmYXVsdENTU0VkZ2VTdHlsZSIsImNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IiLCJtYXBwaW5nQ1NTTm9kZVN0eWxlIiwibWFwcGluZ0NTU0VkZ2VTdHlsZSIsImJ5cGFzc0NTU0VudHJpZXMiLCJuZXR3b3JrIiwiYXBwbHkiLCJlbGVtZW50cyIsImxheW91dCIsIngiLCJ5Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7Ozs7O0FDNURBQSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPQyxNQUFQLENBQWM7QUFDM0JDLGdCQUFZLFdBRGU7QUFFM0JDLFVBQU0sTUFGcUI7QUFHM0JDLFVBQU0sTUFIcUI7QUFJM0JDLGFBQVMsU0FKa0I7O0FBTTNCQyxXQUFPLE9BTm9CO0FBTzNCQyxXQUFPLE9BUG9COztBQVMzQkMsUUFBSSxJQVR1QjtBQVUzQkMsT0FBRyxHQVZ3QjtBQVczQkMsT0FBRyxHQVh3QjtBQVkzQkMsT0FBRyxHQVp3QjtBQWEzQkMsT0FBRyxHQWJ3Qjs7QUFlM0JDLFFBQUksSUFmdUI7QUFnQjNCQyxPQUFHLEdB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SUFBNkJxRyxNQUFNLGtCQUFOLENBQTdCOztBQUVBLGVBQU9yRyxNQUFQO0FBQ0g7QUEvRmEsQ0FBbEI7O0FBa0dBdkcsT0FBT0MsT0FBUCxHQUFpQjtBQUNidUUsZUFBV0E7QUFERSxDQUFqQixDOzs7Ozs7Ozs7QUN2WUF4RSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPQyxNQUFQLENBQWM7QUFDM0IsYUFBUyxPQURrQjtBQUUzQixhQUFTLE9BRmtCO0FBRzNCLGNBQVUsUUFIaUI7QUFJM0Isd0JBQW9CLGtCQUpPO0FBSzNCLDBCQUFzQixvQkFMSztBQU0zQixhQUFTLE9BTmtCO0FBTzNCLG1CQUFlLE9BUFk7QUFRM0IsZUFBVyxTQVJnQjtBQVMzQixrQkFBYztBQVRhLENBQWQsQ0FBakIsQyIsImZpbGUiOiIuL2J1aWxkL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4MjlhODc5MDM5NzE5YmNlZmI4YSIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBDWF9WRVJTSU9OOiAnQ1hWZXJzaW9uJyxcbiAgICBOT0RFOiAnbm9kZScsXG4gICAgRURHRTogJ2VkZ2UnLFxuICAgIE5FVFdPUks6ICduZXR3b3JrJyxcblxuICAgIE5PREVTOiAnbm9kZXMnLFxuICAgIEVER0VTOiAnZWRnZXMnLFxuXG4gICAgSUQ6ICdpZCcsXG4gICAgWDogJ3gnLFxuICAgIFk6ICd5JyxcbiAgICBaOiAneicsXG4gICAgVjogJ3YnLFxuXG4gICAgQVQ6ICdhdCcsXG4gICAgTjogJ24nLFxuICAgIEU6ICdlJyxcblxuICAgIFZJU1VBTF9QUk9QRVJUSUVTOiAndmlzdWFsUHJvcGVydGllcycsXG4gICAgREVGQVVMVDogJ2RlZmF1bHQnLFxuXG4gICAgU1RZTEU6ICdzdHlsZScsXG5cbiAgICBQTzogJ3BvJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N4Q29uc3RhbnRzLmpzIiwiZnVuY3Rpb24gZ2V0Q3hWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcbiAgICBjb25zdCB2ZXJzaW9uQXJyYXkgPSB2ZXJzaW9uU3RyaW5nLnNwbGl0KCcuJykubWFwKChudW1iZXJTdHJpbmcpID0+IHsgcmV0dXJuIHBhcnNlSW50KG51bWJlclN0cmluZywgMTApOyB9KTtcbiAgICBpZiAodmVyc2lvbkFycmF5Lmxlbmd0aCAhPT0gMiAmJiB2ZXJzaW9uQXJyYXkubGVuZ3RoICE9IDMpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSB2ZXJzaW9uIGZvcm1hdDogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxuICAgIHZlcnNpb25BcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAoaXNOYU4oZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93ICdOb24taW50ZWdlciB2YWx1ZSBpbiB2ZXJzaW9uIHN0cmluZzogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdmVyc2lvbkFycmF5O1xufVxuXG5mdW5jdGlvbiBnZXRDeE1ham9yVmVyc2lvbih2ZXJzaW9uU3RyaW5nKSB7XG4gICAgcmV0dXJuIHZlcnNpb25TdHJpbmcgPyBnZXRDeFZlcnNpb24odmVyc2lvblN0cmluZylbMF0gOiAxO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zKGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBcbiAgICBub2RlQXR0cmlidXRlTmFtZU1hcCwgXG4gICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIFxuICAgIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIFxuICAgIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCwgXG4gICAgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIGNvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMuZm9yRWFjaCgoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbikgPT4ge1xuICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnbm9kZXMnXSkge1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnZWRnZXMnXSkge1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWydkJ10pIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLmQpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAoYXR0cmlidXRlTmFtZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2EnXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlRGVjbGFyYXRpb24uYSArICcgc2hvdWxkIGJlIHJlbmFtZWQgdG8gJyArIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgYXR0cmlidXRlTmFtZU1hcC5zZXQoYXR0cmlidXRlRGVjbGFyYXRpb24uYSwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ3YnXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlTmFtZSArICcgaGFzIGRlZmF1bHQgdmFsdWUgJyArIGF0dHJpYnV0ZURlY2xhcmF0aW9uLnYpO1xuICAgICAgICAgICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLnNldChhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbi52KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVJbmZlcnJlZFR5cGVzKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZU5hbWVNYXAsIHYpIHtcbiAgICBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgaWYgKCFhdHRyaWJ1dGVUeXBlTWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IGluZmVycmVkVHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQobmV3S2V5LCBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKHYsIGF0dHJpYnV0ZU5hbWVNYXAsIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIGxldCBkYXRhID0ge307XG4gICAgT2JqZWN0LmtleXModikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICBkYXRhW25ld0tleV0gPSB2W2tleV07XG4gICAgfSk7XG4gICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKCFkYXRhW2tleV0pIHtcbiAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEN4VmVyc2lvbjogZ2V0Q3hWZXJzaW9uLFxuICAgIGdldEN4TWFqb3JWZXJzaW9uOiBnZXRDeE1ham9yVmVyc2lvbixcbiAgICBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zOiBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zLFxuICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXA6IHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcDogdXBkYXRlQXR0cmlidXRlTmFtZU1hcCxcbiAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXA6IHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICB1cGRhdGVJbmZlcnJlZFR5cGVzOiB1cGRhdGVJbmZlcnJlZFR5cGVzLFxuICAgIGdldEV4cGFuZGVkQXR0cmlidXRlcyA6IGdldEV4cGFuZGVkQXR0cmlidXRlc1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hVdGlsLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb252ZXJ0ZXIgPSByZXF1aXJlICgnLi9jb252ZXJ0ZXIuanMnKTtcblxubW9kdWxlLmV4cG9ydHMuY29udmVydCA9IChjeCwgdGFyZ2V0Rm9ybWF0KSA9PiB7IHJldHVybiBjb252ZXJ0ZXIuY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0KTsgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmsgPSByZXF1aXJlICgnLi9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrLmpzJyk7IFxuY29uc3QgY3l0b3NjYXBlSlMgPSByZXF1aXJlICgnLi9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKUy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gdmVyaWZ5VmVyc2lvbihjeCkge1xuICAgIGNvbnN0IGZpcnN0RWxlbWVudCA9IGN4WzBdO1xuICAgIGNvbnN0IHZlcnNpb25TdHJpbmcgPSBmaXJzdEVsZW1lbnRbY3hDb25zdGFudHMuQ1hfVkVSU0lPTl07XG5cbiAgICBjb25zdCBtYWpvclZlcnNpb24gPSBjeFV0aWwuZ2V0Q3hNYWpvclZlcnNpb24odmVyc2lvblN0cmluZyk7XG5cbiAgICBpZiAobWFqb3JWZXJzaW9uICE9PSAyKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgQ1ggdmVyc2lvbjogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQpIHtcbiAgICB2ZXJpZnlWZXJzaW9uKGN4KTtcbiAgICBzd2l0Y2godGFyZ2V0Rm9ybWF0KSB7XG4gICAgICAgIGNhc2UgbGFyZ2VOZXR3b3JrLmNvbnZlcnRlci50YXJnZXRGb3JtYXQ6IHtcbiAgICAgICAgICAgIHJldHVybiBsYXJnZU5ldHdvcmsuY29udmVydGVyLmNvbnZlcnQoY3gpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgY3l0b3NjYXBlSlMuY29udmVydGVyLnRhcmdldEZvcm1hdDoge1xuICAgICAgICAgICAgcmV0dXJuIGN5dG9zY2FwZUpTLmNvbnZlcnRlci5jb252ZXJ0KGN4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydDogY29udmVydFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udmVydGVyLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmtDb25zdGFudHMgPSByZXF1aXJlKCcuL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpIHtcbiAgICBjb25zdCB0YXJnZXRTdHlsZUVudHJ5ID0ge307XG4gICAgdGFyZ2V0U3R5bGVFbnRyeVt0YXJnZXRTdHlsZUZpZWxkXSA9IHBvcnRhYmxlUHJvcGVydFZhbHVlO1xuICAgIHJldHVybiB0YXJnZXRTdHlsZUVudHJ5O1xufVxuXG5mdW5jdGlvbiBoZXhUb1JHQihoZXgpIHtcbiAgICBsZXQgciA9IDAsIGcgPSAwLCBiID0gMDtcblxuICAgIC8vIDMgZGlnaXRzXG4gICAgaWYgKGhleC5sZW5ndGggPT0gNCkge1xuICAgICAgICByID0gXCIweFwiICsgaGV4WzFdICsgaGV4WzFdO1xuICAgICAgICBnID0gXCIweFwiICsgaGV4WzJdICsgaGV4WzJdO1xuICAgICAgICBiID0gXCIweFwiICsgaGV4WzNdICsgaGV4WzNdO1xuXG4gICAgICAgIC8vIDYgZGlnaXRzXG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDcpIHtcbiAgICAgICAgciA9IFwiMHhcIiArIGhleFsxXSArIGhleFsyXTtcbiAgICAgICAgZyA9IFwiMHhcIiArIGhleFszXSArIGhleFs0XTtcbiAgICAgICAgYiA9IFwiMHhcIiArIGhleFs1XSArIGhleFs2XTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3BhcnNlSW50KHIpLCBwYXJzZUludChnKSwgcGFyc2VJbnQoYildO1xufVxuXG5mdW5jdGlvbiBhbHBoYVRvSW50KGFscGhhRGVjaW1hbCkge1xuICAgIHJldHVybiBhbHBoYURlY2ltYWwgKiAyNTU7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCgnd2lkdGgnLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCdoZWlnaHQnLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMuY29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCdhbHBoYScsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy53aWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoJ2FscGhhJywgYWxwaGFUb0ludChwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmNvbG9yLCBoZXhUb1JHQihwb3J0YWJsZVByb3BlcnR5VmFsdWUpKVxuICAgIH1cbn1cblxuXG5cbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZXMoZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMpIHtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBub2RlOiB7fSxcbiAgICAgICAgZWRnZToge31cbiAgICB9O1xuICAgIGlmIChkZWZhdWx0VmlzdWFsUHJvcGVydGllc1snbm9kZSddKSB7XG4gICAgICAgIGNvbnN0IG5vZGVEZWZhdWx0ID0gZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMubm9kZTtcbiAgICAgICAgY29uc3QgbG52RW50cmllcyA9IGdldExOVlZhbHVlcygnbm9kZScsIG5vZGVEZWZhdWx0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQubm9kZSwgbG52RW50cmllcyk7XG4gICAgfVxuICAgIGlmIChkZWZhdWx0VmlzdWFsUHJvcGVydGllc1snZWRnZSddKSB7XG4gICAgICAgIGNvbnN0IGVkZ2VEZWZhdWx0ID0gZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMuZWRnZTtcbiAgICAgICAgY29uc3QgbG52RW50cmllcyA9IGdldExOVlZhbHVlcygnZWRnZScsIGVkZ2VEZWZhdWx0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQuZWRnZSwgbG52RW50cmllcyk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldExOVlZhbHVlcyhlbnRpdHlUeXBlLCBlbnRyaWVzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGVudHJpZXMpLmZvckVhY2gocG9ydGFibGVQcm9wZXJ0eUtleSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGVudHJpZXNbcG9ydGFibGVQcm9wZXJ0eUtleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBsbnZFbnRyeSA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxudkVudHJ5KS5mb3JFYWNoKGxudktleSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2xudktleV0gPSBsbnZFbnRyeVtsbnZLZXldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NDb2xvcihjb2xvckFycmF5LCBhbHBoYSkge1xuICAgIHJldHVybiBjb2xvckFycmF5ICE9IHVuZGVmaW5lZFxuICAgICAgICA/IGFscGhhICE9IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBbY29sb3JBcnJheVswXSwgY29sb3JBcnJheVsxXSwgY29sb3JBcnJheVsyXSwgYWxwaGFdXG4gICAgICAgICAgICA6IFtjb2xvckFycmF5WzBdLCBjb2xvckFycmF5WzFdLCBjb2xvckFycmF5WzJdXVxuICAgICAgICA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1NpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHJldHVybiBNYXRoLm1heCh3aWR0aCwgaGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc05vZGVWaWV3KG5vZGVWaWV3KSB7XG4gICAgbGV0IHdpZHRoID0gdW5kZWZpbmVkO1xuICAgIGxldCBoZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGNvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGFscGhhID0gdW5kZWZpbmVkO1xuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIGlkOiBub2RlVmlldy5pZCxcbiAgICAgICAgcG9zaXRpb246IG5vZGVWaWV3LnBvc2l0aW9uXG4gICAgfTtcblxuXG4gICAgT2JqZWN0LmtleXMobm9kZVZpZXcpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ3dpZHRoJykge1xuICAgICAgICAgICAgd2lkdGggPSBub2RlVmlldy53aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdoZWlnaHQnKSB7XG4gICAgICAgICAgICBoZWlnaHQgPSBub2RlVmlldy5oZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnY29sb3InKSB7XG4gICAgICAgICAgICBjb2xvckFycmF5ID0gbm9kZVZpZXcuY29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnYWxwaGEnKSB7XG4gICAgICAgICAgICBhbHBoYSA9IG5vZGVWaWV3LmFscGhhO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2xvciA9IHByb2Nlc3NDb2xvcihjb2xvckFycmF5LCBhbHBoYSk7XG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuY29sb3JdID0gY29sb3I7XG4gICAgfVxuXG4gICAgY29uc3Qgc2l6ZSA9IHByb2Nlc3NTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIGlmIChzaXplKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuc2l6ZV0gPSBwcm9jZXNzU2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0VkZ2VWaWV3KGVkZ2VWaWV3KSB7XG4gICAgbGV0IGNvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGFscGhhID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgaWQ6IGVkZ2VWaWV3LmlkLFxuICAgICAgICBzOiBlZGdlVmlldy5zLFxuICAgICAgICB0OiBlZGdlVmlldy50XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoZWRnZVZpZXcpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ2NvbG9yJykge1xuICAgICAgICAgICAgY29sb3JBcnJheSA9IGVkZ2VWaWV3LmNvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2FscGhhJykge1xuICAgICAgICAgICAgYWxwaGEgPSBlZGdlVmlldy5hbHBoYTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29sb3IgPSBwcm9jZXNzQ29sb3IoY29sb3JBcnJheSwgYWxwaGEpO1xuICAgIGlmIChjb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmNvbG9yXSA9IGNvbG9yO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBtYXBwaW5nUHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9XSURUSCc6IFsnd2lkdGgnXSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogWydoZWlnaHQnXSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IFtsYXJnZU5ldHdvcmtDb25zdGFudHMuY29sb3JdLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiBbJ2FscGhhJ10sXG4gICAgICAgICdOT0RFX0xBQkVMJzogW2xhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbF0sXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiBbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLndpZHRoXSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IFsnYWxwaGEnXSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IFtsYXJnZU5ldHdvcmtDb25zdGFudHMuY29sb3JdXG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRNYXBwaW5ncyhtYXBwaW5ncykge1xuICAgIGxldCBvdXRwdXQgPSB7fVxuICAgIE9iamVjdC5rZXlzKG1hcHBpbmdzKS5mb3JFYWNoKCBwcm9wZXJ0eUtleSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcHBpbmcgPSBtYXBwaW5nc1twcm9wZXJ0eUtleV07XG4gICAgICAgIG1hcHBpbmdbbWFwcGluZy5kZWZpbml0aW9uLmF0dHJpYnV0ZV0gPSB7XG4gICAgICAgICAgICB0eXBlOiBtYXBwaW5nLnR5cGUsXG4gICAgICAgICAgICB2cDogcHJvcGVydHlLZXksXG4gICAgICAgICAgICBkZWZpbml0aW9uOiBtYXBwaW5nLmRlZmluaXRpb25cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGxudkNvbnZlcnQoY3gpIHtcblxuICAgIC8vRmlyc3QgcGFzcy4gXG4gICAgLy8gV2UgbWF5IG5lZWQgdG8gY29sbGVjdCBvYmplY3QgYXR0cmlidXRlcyB0byBjYWxjdWxhdGVcbiAgICAvLyBtYXBwaW5ncyBpbiB0aGUgc2Vjb25kIHBhc3MuIFxuXG4gICAgbGV0IGN4VmlzdWFsUHJvcGVydGllcztcblxuICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICBsZXQgZWRnZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICBsZXQgbm9kZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICBsZXQgZGVmYXVsdFZhbHVlcyA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbWFwcGluZ3MgPSB7XG4gICAgICAgIG5vZGUgOiB7fSxcbiAgICAgICAgZWRnZSA6IHt9XG4gICAgfVxuICAgIGxldCBieXBhc3NNYXBwaW5ncyA9IHtcbiAgICAgICAgJ25vZGUnOiB7fSxcbiAgICAgICAgJ2VkZ2UnOiB7fVxuICAgIH07XG4gICBcbiAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICBpZiAoY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyA9IGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXTtcbiAgICAgICAgICAgIGN4VXRpbC5wcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zKGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLFxuICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsXG4gICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhub2RlQXR0cmlidXRlVHlwZU1hcCwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4Tm9kZVsndiddKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcbiAgICAgICAgICAgIGN4RWRnZXMuZm9yRWFjaCgoY3hFZGdlKSA9PiB7XG4gICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEVkZ2VbJ3YnXSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ10pIHtcbiAgICAgICAgICAgIGN4VmlzdWFsUHJvcGVydGllcyA9IGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ107XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBvdXRwdXQgPSB7fTtcblxuICAgIGxldCBub2RlVmlld3MgPSBbXTtcbiAgICBsZXQgZWRnZVZpZXdzID0gW107XG5cbiAgICBjeFZpc3VhbFByb3BlcnRpZXMuZm9yRWFjaCh2cEVsZW1lbnQgPT4ge1xuICAgICAgICBjb25zdCB2cEF0ID0gdnBFbGVtZW50LmF0O1xuICAgICAgICBpZiAodnBBdCA9PT0gY3hDb25zdGFudHMuU1RZTEUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdnBFbGVtZW50LnY7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0U3R5bGVzID0gdmFsdWUuZGVmYXVsdDtcblxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlcyA9IGdldERlZmF1bHRWYWx1ZXMoZGVmYXVsdFN0eWxlcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbGFyZ2UgbmV0d29yayBkZWZhdWx0IHN0eWxlID0gJyArIEpTT04uc3RyaW5naWZ5KGRlZmF1bHRWYWx1ZXMsIG51bGwsIDIpKTtcblxuICAgICAgICAgICAgY29uc3Qgbm9kZU1hcHBpbmcgPSB2YWx1ZS5ub2RlTWFwcGluZztcbiAgICAgICAgICAgIG1hcHBpbmdzLm5vZGUgPSBnZXRNYXBwaW5ncyhub2RlTWFwcGluZyk7XG4gICAgICAgICAgICAvL21hcHBpbmdDU1NOb2RlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhub2RlTWFwcGluZywgJ25vZGUnLCBub2RlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGVkZ2VNYXBwaW5nID0gdmFsdWUuZWRnZU1hcHBpbmc7IFxuICAgICAgICAgICAgbWFwcGluZ3MuZWRnZSA9IGdldE1hcHBpbmdzKG5vZGVNYXBwaW5nKTtcblxuICAgICAgICAgICAgLy9tYXBwaW5nQ1NTRWRnZVN0eWxlID0gZ2V0Q1NTTWFwcGluZ0VudHJpZXMoZWRnZU1hcHBpbmcsICdlZGdlJywgZWRnZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodnBBdCA9PT0gY3hDb25zdGFudHMuTikge1xuXG4gICAgICAgICAgICBjb25zdCBrZXkgPSB2cEVsZW1lbnRbY3hDb25zdGFudHMuUE9dLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBnZXRMTlZWYWx1ZXMoJ25vZGUnLCB2cEVsZW1lbnQudilcblxuICAgICAgICAgICAgaWYgKCFieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0pIHtcbiAgICAgICAgICAgICAgICBieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0gPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J5cGFzcyBjYWxjdWxhdGVkOiAnICsgSlNPTi5zdHJpbmdpZnkodmFsdWVzLCBudWxsLCAyKSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYnlwYXNzTWFwcGluZ3Mubm9kZVtrZXldLCB2YWx1ZXMpO1xuICAgICAgICAgICAgLy9ieXBhc3NDU1NFbnRyaWVzLnB1c2goZ2V0QnlwYXNzQ1NTRW50cnkoJ25vZGUnLCB2cEVsZW1lbnQpKTtcbiAgICAgICAgfSBlbHNlIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5FKSB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSB2cEVsZW1lbnRbY3hDb25zdGFudHMuUE9dLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBnZXRMTlZWYWx1ZXMoJ2VkZ2UnLCB2cEVsZW1lbnQudilcblxuICAgICAgICAgICAgaWYgKCFieXBhc3NNYXBwaW5ncy5lZGdlW2tleV0pIHtcbiAgICAgICAgICAgICAgICBieXBhc3NNYXBwaW5ncy5lZGdlW2tleV0gPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J5cGFzcyBjYWxjdWxhdGVkOiAnICsgSlNPTi5zdHJpbmdpZnkodmFsdWVzLCBudWxsLCAyKSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYnlwYXNzTWFwcGluZ3MuZWRnZVtrZXldLCB2YWx1ZXMpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuXG4gICAgLy9TZWNvbmQgcGFzcy4gXG4gICAgLy8gSGVyZSBpcyB3aGVyZSB0aGUgYWN0dWFsIG91dHB1dCBpcyBnZW5lcmF0ZWQuXG5cblxuXG4gICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG5cblxuICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hOb2RlW2N4Q29uc3RhbnRzLklEXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVWaWV3ID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogY3hJZCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGN4Tm9kZVsneiddID9cbiAgICAgICAgICAgICAgICAgICAgICAgIFtjeE5vZGVbJ3gnXSwgY3hOb2RlWyd5J10sIGN4Tm9kZVsneiddXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBbY3hOb2RlWyd4J10sIGN4Tm9kZVsneSddXVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vVE9ETyBjYWxjdWxhdGUgbG52IHZwcyBiYXNlZCBvbiBkZWZhdWx0cyBhbmQgYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHROb2RlVmlzdWFsUHJvcGVydGllcyA9IGRlZmF1bHRWYWx1ZXNbJ25vZGUnXTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlVmlldywgZGVmYXVsdE5vZGVWaXN1YWxQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9Bc3NpZ24gbWFwcGluZ3NcbiAgICAgICAgICAgICAgICBjb25zdCBleHBhbmRlZEF0dHJpYnV0ZXMgPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4Tm9kZVsndiddLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG5cbiAgICAgICAgICAgICAgICAvL0Fzc2lnbiBieXBhc3NcbiAgICAgICAgICAgICAgICBpZiAoYnlwYXNzTWFwcGluZ3Mubm9kZVtjeElkXSkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG5vZGVWaWV3LCBieXBhc3NNYXBwaW5ncy5ub2RlW2N4SWRdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWROb2RlVmlldyA9IHByb2Nlc3NOb2RlVmlldyhub2RlVmlldyk7XG5cbiAgICAgICAgICAgICAgICBub2RlVmlld3MucHVzaChwcm9jZXNzZWROb2RlVmlldyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG5cbiAgICAgICAgICAgIGN4RWRnZXMuZm9yRWFjaCgoY3hFZGdlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hJZCA9IGN4RWRnZVtjeENvbnN0YW50cy5JRF0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlZGdlVmlldyA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGN4SWQsXG4gICAgICAgICAgICAgICAgICAgIHM6IGN4RWRnZS5zLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHQ6IGN4RWRnZS50LnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL1RPRE8gY2FsY3VsYXRlIGxudiB2cHMgYmFzZWQgb24gZGVmYXVsdHMgYW5kIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0RWRnZVZpc3VhbFByb3BlcnRpZXMgPSBkZWZhdWx0VmFsdWVzWydlZGdlJ107XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWRnZVZpZXcsIGRlZmF1bHRFZGdlVmlzdWFsUHJvcGVydGllcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZXhwYW5kZWRBdHRyaWJ1dGVzID0gY3hVdGlsLmdldEV4cGFuZGVkQXR0cmlidXRlcyhjeEVkZ2VbJ3YnXSwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuXG4gICAgICAgICAgICAgICAgLy9Bc3NpZ24gYnlwYXNzXG4gICAgICAgICAgICAgICAgaWYgKGJ5cGFzc01hcHBpbmdzLmVkZ2VbY3hJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlZGdlVmlldywgYnlwYXNzTWFwcGluZ3MuZWRnZVtjeElkXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkRWRnZVZpZXcgPSBwcm9jZXNzRWRnZVZpZXcoZWRnZVZpZXcpO1xuXG4gICAgICAgICAgICAgICAgZWRnZVZpZXdzLnB1c2gocHJvY2Vzc2VkRWRnZVZpZXcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMubm9kZVZpZXdzXSA9IG5vZGVWaWV3cztcbiAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmVkZ2VWaWV3c10gPSBlZGdlVmlld3M7XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5cblxuY29uc3QgY29udmVydGVyID0ge1xuICAgIHRhcmdldEZvcm1hdDogJ2xudicsXG4gICAgY29udmVydDogKGN4KSA9PiB7XG4gICAgICAgIHJldHVybiBsbnZDb252ZXJ0KGN4KTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnZlcnRlcjogY29udmVydGVyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrLmpzIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgICdub2RlVmlld3MnOiAnbm9kZVZpZXdzJyxcbiAgICAnZWRnZVZpZXdzJzogJ2VkZ2VWaWV3cycsIFxuICAgICdpZCc6ICdpZCcsXG4gICAgJ3Bvc2l0aW9uJzogJ3Bvc2l0aW9uJyxcbiAgICAncyc6ICdzJyxcbiAgICAndCc6ICd0JyxcbiAgICAnbGFiZWwnOiAnbGFiZWwnLCBcbiAgICAnY29sb3InOiAnY29sb3InLFxuICAgICdsaW5lX2NvbG9yJzogJ2xpbmUtY29sb3InLFxuICAgICdzaXplJyA6ICdzaXplJyxcbiAgICAnd2lkdGgnIDogJ3dpZHRoJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmtDb25zdGFudHMuanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGpzQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9jeXRvc2NhcGVKU0NvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpIHtcbiAgICBjb25zdCB0YXJnZXRTdHlsZUVudHJ5ID0gbmV3IE1hcCgpO1xuICAgIHRhcmdldFN0eWxlRW50cnkuc2V0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKTtcbiAgICByZXR1cm4gdGFyZ2V0U3R5bGVFbnRyeTtcbn1cblxuY29uc3QgZGVmYXVsdFByb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfU0hBUEUnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9XSURUSCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLm9wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9LFxufVxuXG5mdW5jdGlvbiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIGF0dHJpYnV0ZU5hbWUpIHtcbiAgICBjb25zdCBvdXRwdXQgPSB7fTtcbiAgICBvdXRwdXRbdGFyZ2V0U3R5bGVGaWVsZF0gPSAnZGF0YSgnICsgYXR0cmlidXRlTmFtZSArICcpJztcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9TSEFQRSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfV0lEVEgnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIGF0dHJpYnV0ZU5hbWUpXG4gICAgfSxcbn1cbmZ1bmN0aW9uIHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgb3V0cHV0W3RhcmdldFN0eWxlRmllbGRdID0gJ21hcERhdGEoJyArIGF0dHJpYnV0ZU5hbWVcbiAgICAgICAgKyAnLCAnICsgbWluVmFsdWVcbiAgICAgICAgKyAnLCAnICsgbWF4VmFsdWVcbiAgICAgICAgKyAnLCAnICsgbWluVlBcbiAgICAgICAgKyAnLCAnICsgbWF4VlBcbiAgICAgICAgKyAnKSc7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgbWFwRGF0YVByb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfU0hBUEUnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuc2hhcGUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfV0lEVEgnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9MQUJFTCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGluZV9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApXG4gICAgfSxcbn1cblxuXG5mdW5jdGlvbiBnZXRDU1NTdHlsZUVudHJpZXMoY3hTdHlsZUVudHJpZXMsIGVudGl0eVR5cGUpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgT2JqZWN0LmtleXMoY3hTdHlsZUVudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBwb3J0YWJsZVByb3BlcnR5VmFsdWUgPSBjeFN0eWxlRW50cmllc1trZXldO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtrZXldKSB7XG4gICAgICAgICAgICBjb25zdCBjc3NFbnRyaWVzID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtrZXldKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICBjc3NFbnRyaWVzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRJZFNlbGVjdG9yKGlkLCBlbGVtZW50VHlwZSkge1xuICAgIC8vbm9kZSNpZCBvciBlZGdlI2lkXG4gICAgcmV0dXJuIGVsZW1lbnRUeXBlICsgJyMnICsgaWQ7XG59XG5cblxuXG5mdW5jdGlvbiBnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcykge1xuICAgIHJldHVybiB7ICdzZWxlY3Rvcic6IHNlbGVjdG9yLCAnc3R5bGUnOiBjc3MgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29udGludW91c1NlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgaW5jbHVkZU1pbiwgaW5jbHVkZU1heCkge1xuICAgIGNvbnN0IG1pbkNvbmRpdGlvbiA9IGluY2x1ZGVNaW4gPyAnPj0nIDogJz4nO1xuICAgIGNvbnN0IG1heENvbmRpdGlvbiA9IGluY2x1ZGVNYXggPyAnPD0nIDogJzwnO1xuXG4gICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyAnICsgbWluQ29uZGl0aW9uICsgJyAnICsgbWluVmFsdWUgKyAnXVsnICsgYXR0cmlidXRlTmFtZSArICcgJyArIG1heENvbmRpdGlvbiArICcgJyArIG1heFZhbHVlICsgJ10nXG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNTdHlsZShlbnRpdHlUeXBlLCBwb3J0YWJsZVByb3BlcnR5S2V5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBpZiAobWFwRGF0YVByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICByZXR1cm4gbWFwRGF0YVByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cmllcyhwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydhdHRyaWJ1dGUnXTtcbiAgICBjb25zdCByYW5nZU1hcHMgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydtYXAnXTtcbiAgICBjb25zb2xlLmxvZygnY29udGludW91cyBtYXBwaW5nIGZvciAnICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBKU09OLnN0cmluZ2lmeShyYW5nZU1hcHMsIG51bGwsIDIpKTtcblxuICAgIHJhbmdlTWFwcy5mb3JFYWNoKChyYW5nZSkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGdldENvbnRpbnVvdXNTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCByYW5nZS5taW4sIHJhbmdlLm1heCwgcmFuZ2UuaW5jbHVkZU1pbiwgcmFuZ2UuaW5jbHVkZU1heCk7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29udGludW91c1N0eWxlKGVudGl0eVR5cGUsIHBvcnRhYmxlUHJvcGVydHlLZXksIGF0dHJpYnV0ZU5hbWUsIHJhbmdlLm1pbiwgcmFuZ2UubWF4LCByYW5nZS5taW5WUFZhbHVlLCByYW5nZS5tYXhWUFZhbHVlKTtcblxuICAgICAgICBvdXRwdXQucHVzaChnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIHN0eWxlKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSkge1xuICAgIGlmIChwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgIGNvbnN0IGNzcyA9IHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oY3hNYXBwaW5nRGVmaW5pdGlvbi5hdHRyaWJ1dGUpO1xuICAgICAgICByZXR1cm4gZ2V0U3R5bGVFbGVtZW50KGVudGl0eVR5cGUsIGNzcyk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXREaXNjcmV0ZVNlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURhdGFUeXBlLCBhdHRyaWJ1dGVWYWx1ZSkge1xuICAgIGlmIChhdHRyaWJ1dGVEYXRhVHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gXFwnJyArIGF0dHJpYnV0ZVZhbHVlICsgJ1xcJ10nO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ2Jvb2xlYW4nKSB7XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZVZhbHVlID09ICd0cnVlJykge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWz8nICsgYXR0cmlidXRlTmFtZSArICddJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICddWyEnICsgYXR0cmlidXRlTmFtZSArICddJztcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICcgPSAnICsgYXR0cmlidXRlVmFsdWUgKyAnXSc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzKHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgY29uc3QgYXR0dHJpYnV0ZVRvVmFsdWVNYXAgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydtYXAnXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnYXR0cmlidXRlJ107XG4gICAgY29uc3QgYXR0cmlidXRlRGF0YVR5cGUgPSBhdHRyaWJ1dGVUeXBlTWFwLmdldChhdHRyaWJ1dGVOYW1lKTtcbiAgICBhdHR0cmlidXRlVG9WYWx1ZU1hcC5mb3JFYWNoKChkaXNjcmV0ZU1hcCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnIGRpc2NyZXRlIG1hcCBmb3IgJyArIHBvcnRhYmxlUHJvcGVydHlLZXkgKyAnOiAnICsgZGlzY3JldGVNYXAudiArICcgKCcgKyBhdHRyaWJ1dGVOYW1lICsgJzwnICsgYXR0cmlidXRlRGF0YVR5cGUgKyAnPikgLT4gJyArIGRpc2NyZXRlTWFwLnZwKTtcblxuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGdldERpc2NyZXRlU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGF0YVR5cGUsIGRpc2NyZXRlTWFwLnYpO1xuXG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZU1hcCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oZGlzY3JldGVNYXAudnApO1xuICAgICAgICAgICAgY29uc3QgY3NzID0ge307XG4gICAgICAgICAgICBzdHlsZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY3NzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyAgIHN0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkoY3NzKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIG91dHB1dDsgLy9nZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcyk7XG59XG5cbmZ1bmN0aW9uIGdldEJ5cGFzc0NTU0VudHJ5KGVudGl0eVR5cGUsIGN4RWxlbWVudCkge1xuXG4gICAgY29uc3QgaWQgPSBjeEVsZW1lbnQucG87XG4gICAgY29uc3QgY3NzID0ge307XG4gICAgT2JqZWN0LmtleXMoY3hFbGVtZW50LnYpLmZvckVhY2goKHBvcnRhYmxlUHJvcGVydHlLZXkpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gY3hFbGVtZW50LnZbcG9ydGFibGVQcm9wZXJ0eUtleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZU1hcCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIHN0eWxlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBjc3Nba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0SWRTZWxlY3RvcihpZCk7XG4gICAgcmV0dXJuIGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKTtcbn1cblxuLyoqIFxuICogXG4qL1xuZnVuY3Rpb24gZ2V0Q1NTTWFwcGluZ0VudHJpZXMoXG4gICAgY3hNYXBwaW5nRW50cmllcyxcbiAgICBlbnRpdHlUeXBlLFxuICAgIGF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgT2JqZWN0LmtleXMoY3hNYXBwaW5nRW50cmllcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IGN4TWFwcGluZ0VudHJ5ID0gY3hNYXBwaW5nRW50cmllc1trZXldO1xuICAgICAgICBjb25zb2xlLmxvZyhcIiBtYXBwaW5nIHR5cGU6IFwiICsgY3hNYXBwaW5nRW50cnkudHlwZSk7XG4gICAgICAgIHN3aXRjaCAoY3hNYXBwaW5nRW50cnkudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnQ09OVElOVU9VUyc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250aW5vdXNNYXBwaW5ncyA9IGdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cmllcyhrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApO1xuICAgICAgICAgICAgICAgIGNvbnRpbm91c01hcHBpbmdzLmZvckVhY2goKGNvbnRpbm91c01hcHBpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goY29udGlub3VzTWFwcGluZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ1BBU1NUSFJPVUdIJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNzc0VudHJ5ID0gZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlKTtcbiAgICAgICAgICAgICAgICBpZiAoY3NzRW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goY3NzRW50cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ0RJU0NSRVRFJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlTWFwcGluZ3MgPSBnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzKGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCk7XG4gICAgICAgICAgICAgICAgZGlzY3JldGVNYXBwaW5ncy5mb3JFYWNoKChkaXNjcmV0ZU1hcHBpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goZGlzY3JldGVNYXBwaW5nKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgTk9ERV9TRUxFQ1RPUiA9ICdub2RlJztcbmNvbnN0IEVER0VfU0VMRUNUT1IgPSAnZWRnZSc7XG5cbmZ1bmN0aW9uIGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBub2RlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBzdHlsZTogW10sXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgbGV0IGRlZmF1bHRDU1NOb2RlU3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGRlZmF1bHRDU1NFZGdlU3R5bGUgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgY3NzTmV0d29ya0JhY2tncm91bmRDb2xvciA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBtYXBwaW5nQ1NTTm9kZVN0eWxlID0gdW5kZWZpbmVkO1xuICAgIGxldCBtYXBwaW5nQ1NTRWRnZVN0eWxlID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGJ5cGFzc0NTU0VudHJpZXMgPSBbXTtcblxuICAgIGN4VmlzdWFsUHJvcGVydGllcy5mb3JFYWNoKCh2cEVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgdnBBdCA9IHZwRWxlbWVudC5hdDtcbiAgICAgICAgaWYgKHZwQXQgPT09IGN4Q29uc3RhbnRzLlNUWUxFKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZwRWxlbWVudC52O1xuICAgICAgICAgICAgY29uc3QgZGVmYXVsdFN0eWxlcyA9IHZhbHVlLmRlZmF1bHQ7XG5cbiAgICAgICAgICAgIGRlZmF1bHRDU1NOb2RlU3R5bGUgPSBnZXRDU1NTdHlsZUVudHJpZXMoZGVmYXVsdFN0eWxlcy5ub2RlLCAnbm9kZScpO1xuICAgICAgICAgICAgZGVmYXVsdENTU0VkZ2VTdHlsZSA9IGdldENTU1N0eWxlRW50cmllcyhkZWZhdWx0U3R5bGVzLmVkZ2UsICdlZGdlJyk7XG5cbiAgICAgICAgICAgIGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IgPSBkZWZhdWx0U3R5bGVzLm5ldHdvcmtbJ2JhY2tncm91bmQtY29sb3InXTtcblxuICAgICAgICAgICAgY29uc3Qgbm9kZU1hcHBpbmcgPSB2YWx1ZS5ub2RlTWFwcGluZztcbiAgICAgICAgICAgIG1hcHBpbmdDU1NOb2RlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhub2RlTWFwcGluZywgJ25vZGUnLCBub2RlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGVkZ2VNYXBwaW5nID0gdmFsdWUuZWRnZU1hcHBpbmc7XG4gICAgICAgICAgICBtYXBwaW5nQ1NTRWRnZVN0eWxlID0gZ2V0Q1NTTWFwcGluZ0VudHJpZXMoZWRnZU1hcHBpbmcsICdlZGdlJywgZWRnZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodnBBdCA9PT0gY3hDb25zdGFudHMuTikge1xuICAgICAgICAgICAgYnlwYXNzQ1NTRW50cmllcy5wdXNoKGdldEJ5cGFzc0NTU0VudHJ5KCdub2RlJywgdnBFbGVtZW50KSk7XG4gICAgICAgIH0gZWxzZSBpZiAodnBBdCA9PT0gY3hDb25zdGFudHMuRSkge1xuICAgICAgICAgICAgYnlwYXNzQ1NTRW50cmllcy5wdXNoKGdldEJ5cGFzc0NTU0VudHJ5KCdlZGdlJywgdnBFbGVtZW50KSk7XG5cbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvL0FkZCBkZWZhdWx0IHN0eWxlXG4gICAgb3V0cHV0LnN0eWxlLnB1c2goZ2V0U3R5bGVFbGVtZW50KE5PREVfU0VMRUNUT1IsIGRlZmF1bHRDU1NOb2RlU3R5bGUpKTtcbiAgICBvdXRwdXQuc3R5bGUucHVzaChnZXRTdHlsZUVsZW1lbnQoRURHRV9TRUxFQ1RPUiwgZGVmYXVsdENTU0VkZ2VTdHlsZSkpO1xuXG4gICAgb3V0cHV0LnN0eWxlLnB1c2guYXBwbHkob3V0cHV0LnN0eWxlLCBtYXBwaW5nQ1NTTm9kZVN0eWxlKTtcbiAgICBvdXRwdXQuc3R5bGUucHVzaC5hcHBseShvdXRwdXQuc3R5bGUsIG1hcHBpbmdDU1NFZGdlU3R5bGUpO1xuXG4gICAgb3V0cHV0WydiYWNrZ3JvdW5kLWNvbG9yJ10gPSBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgY29udmVydGVyID0ge1xuICAgIHRhcmdldEZvcm1hdDogJ2N5dG9zY2FwZUpTJyxcbiAgICBjb252ZXJ0OiAoY3gpID0+IHtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0ge1xuICAgICAgICAgICAgc3R5bGU6IFtdLFxuICAgICAgICAgICAgZWxlbWVudHM6IHt9LFxuICAgICAgICAgICAgbGF5b3V0OiB7fSxcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN4VmlzdWFsUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcblxuICAgICAgICBsZXQgbm9kZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBlZGdlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBsZXQgbm9kZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBlZGdlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBsZXQgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyA9IGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uczogXCIgKyBKU09OLnN0cmluZ2lmeShjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucywgbnVsbCwgMikpO1xuICAgICAgICAgICAgICAgIGN4VXRpbC5wcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zKGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLFxuICAgICAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuICAgICAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hOb2RlWyd2J10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcbiAgICAgICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhlZGdlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGN4RWRnZVsndiddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXSkge1xuICAgICAgICAgICAgICAgIGN4VmlzdWFsUHJvcGVydGllcyA9IGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLmZvckVhY2goKGluZmVycmVkVHlwZSwgYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZmVycmVkIGF0dHJpYnV0ZSB0eXBlIGZvciBub2RlOiAnICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcC5mb3JFYWNoKChpbmZlcnJlZFR5cGUsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3IgZWRnZTogJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9BZGQgbm9kZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydub2RlcyddID0gW107XG5cbiAgICAgICAgLy9BZGQgZWRnZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydlZGdlcyddID0gW107XG5cblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuICAgICAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddID0gY3hVdGlsLmdldEV4cGFuZGVkQXR0cmlidXRlcyhjeE5vZGVbJ3YnXSwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ2lkJ10gPSBjeE5vZGUuaWQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsncG9zaXRpb24nXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGN4Tm9kZVsneCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogY3hOb2RlWyd5J11cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMubm9kZXMucHVzaChlbGVtZW50KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcbiAgICAgICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hFZGdlWyd2J10sIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydpZCddID0gY3hFZGdlLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnc291cmNlJ10gPSBjeEVkZ2VbJ3MnXTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWyd0YXJnZXQnXSA9IGN4RWRnZVsndCddO1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMuZWRnZXMucHVzaChlbGVtZW50KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzdHlsZSA9IGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBub2RlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgIG91dHB1dC5zdHlsZSA9IHN0eWxlLnN0eWxlO1xuICAgICAgICBvdXRwdXRbJ2JhY2tncm91bmQtY29sb3InXSA9IHN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnZlcnRlcjogY29udmVydGVyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKUy5qcyIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICAnc2hhcGUnOiAnc2hhcGUnLFxuICAgICd3aWR0aCc6ICd3aWR0aCcsIFxuICAgICdoZWlnaHQnOiAnaGVpZ2h0JyxcbiAgICAnYmFja2dyb3VuZF9jb2xvcic6ICdiYWNrZ3JvdW5kLWNvbG9yJyxcbiAgICAnYmFja2dyb3VuZF9vcGFjaXR5JzogJ2JhY2tncm91bmQtb3BhY2l0eScsXG4gICAgJ2xhYmVsJzogJ2xhYmVsJyxcbiAgICAnbGFiZWxfY29sb3InOiAnY29sb3InLCBcbiAgICAnb3BhY2l0eSc6ICdvcGFjaXR5JyxcbiAgICAnbGluZV9jb2xvcic6ICdsaW5lLWNvbG9yJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==