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

    STYLE: 'style'
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

module.exports = {
    getCxVersion: getCxVersion,
    getCxMajorVersion: getCxMajorVersion,
    processAttributeDeclarations: processAttributeDeclarations,
    updateAttributeTypeMap: updateAttributeTypeMap,
    updateAttributeNameMap: updateAttributeNameMap,
    updateAttributeDefaultValueMap: updateAttributeDefaultValueMap,
    updateInferredTypes: updateInferredTypes
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

function lnvConvert(cx) {

    //First pass. 
    // We may need to collect object attributes to calculate
    // mappings in the second pass. 
    var nodeMap = new Map();
    var edgeMap = new Map();

    var cxVisualProperties = void 0;

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
                var cxId = cxNode[cxConstants.ID].toString();
                var node = {
                    id: cxId,
                    position: cxNode['z'] ? [cxNode['x'], cxNode['y'], cxNode['z']] : [cxNode['x'], cxNode['y']]
                };
                nodeMap.set(cxId, node);
            });
        } else if (cxAspect['edges']) {
            var cxEdges = cxAspect['edges'];
            cxEdges.forEach(function (cxEdge) {
                var cxId = cxEdge[cxConstants.ID].toString();
                var edge = {
                    id: cxId,
                    s: cxEdge.s.toString(),
                    t: cxEdge.t.toString()
                };
                edgeMap.set(cxId, edge);
            });
        } else if (cxAspect['visualProperties']) {
            cxVisualProperties = cxAspect['visualProperties'];
        }
    });

    var output = {};

    var nodeViews = [];
    var edgeViews = [];

    //Second pass. 
    // Here is where the actual output is generated.

    nodeMap.forEach(function (value, id) {
        nodeViews.push(value);
    });

    edgeMap.forEach(function (value, id) {
        edgeViews.push(value);
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
    'line_color': 'line-color'
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
        'shape': function shape(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.shape, portablePropertyValue);
        },
        'width': function width(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.width, portablePropertyValue);
        },
        'height': function height(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.height, portablePropertyValue);
        },
        'background-color': function backgroundColor(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.background_color, portablePropertyValue);
        },
        'background-opacity': function backgroundOpacity(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.background_opacity, portablePropertyValue);
        },
        'label': function label(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.label, portablePropertyValue);
        },
        'label-color': function labelColor(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.label_color, portablePropertyValue);
        }
    },
    'edge': {
        'width': function width(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.width, portablePropertyValue);
        },
        'opacity': function opacity(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.opacity, portablePropertyValue);
        },
        'line-color': function lineColor(portablePropertyValue) {
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
        'shape': function shape(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.shape, attributeName);
        },
        'width': function width(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.width, attributeName);
        },
        'height': function height(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.height, attributeName);
        },
        'background-color': function backgroundColor(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.background_color, attributeName);
        },
        'background-opacity': function backgroundOpacity(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.background_opacity, attributeName);
        },
        'label': function label(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.label, attributeName);
        },
        'label-color': function labelColor(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.label_color, attributeName);
        }
    },
    'edge': {
        'width': function width(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.width, attributeName);
        },
        'opacity': function opacity(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.opacity, attributeName);
        },
        'line-color': function lineColor(attributeName) {
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
        'shape': function shape(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.shape, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'width': function width(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.width, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'height': function height(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.height, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'background-color': function backgroundColor(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.background_color, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'background-opacity': function backgroundOpacity(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.background_opacity, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'label': function label(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.label, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'label-color': function labelColor(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.label_color, attributeName, minValue, maxValue, minVP, maxVP);
        }
    },
    'edge': {
        'width': function width(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.width, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'opacity': function opacity(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.opacity, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'line-color': function lineColor(attributeName, minValue, maxValue, minVP, maxVP) {
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
            case 'continuous':
                {
                    var continousMappings = getContinuousMappingCSSEntries(key, cxMappingEntry.definition, entityType, attributeTypeMap);
                    continousMappings.forEach(function (continousMapping) {
                        output.push(continousMapping);
                    });
                    break;
                }
            case 'passthrough':
                {
                    output.push(getPassthroughMappingCSSEntry(key, cxMappingEntry.definition, entityType));
                    break;
                }
            case 'discrete':
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

function getData(v, attributeNameMap, attributeDefaultValueMap) {
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

var converter = {
    targetFormat: 'cytoscapeJS',
    convert: function convert(cx) {
        var output = {
            style: [],
            elements: {},
            layout: {},
            'background-color': null
        };

        var nodeMap = new Map();
        var edgeMap = new Map();

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
                    var cxId = cxNode['id'].toString();
                    nodeMap.set(cxId, {
                        id: cxNode['id'],
                        v: cxNode['v'],
                        layout: {
                            x: cxNode['x'],
                            y: cxNode['y'],
                            z: cxNode['z']
                        }
                    });
                    cxUtil.updateInferredTypes(nodeAttributeTypeMap, nodeAttributeNameMap, cxNode['v']);
                });
            } else if (cxAspect['edges']) {
                var cxEdges = cxAspect['edges'];
                cxEdges.forEach(function (cxEdge) {
                    var cxId = cxEdge['id'].toString();
                    edgeMap.set(cxId, {
                        id: cxEdge['id'],
                        v: cxEdge['v'],
                        s: cxEdge['s'],
                        t: cxEdge['t']
                    });
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
        output.elements['edges'] = [];
        nodeMap.forEach(function (cxNode, key) {
            var element = {};
            element['data'] = getData(cxNode.v, nodeAttributeNameMap, nodeAttributeDefaultValueMap);
            element['data']['id'] = cxNode.id;
            element['position'] = {
                x: cxNode.layout.x,
                y: cxNode.layout.y
            };
            output.elements.nodes.push(element);
        });

        //Add edges
        output.elements['edges'] = [];
        edgeMap.forEach(function (cxEdge, key) {
            var element = {};
            element['data'] = getData(cxEdge.v, edgeAttributeNameMap, edgeAttributeDefaultValueMap);
            element['data']['id'] = cxEdge.id;
            element['data']['source'] = cxEdge.s;
            element['data']['target'] = cxEdge.t;
            output.elements.edges.push(element);
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
    'label_color': 'label-color',
    'opacity': 'opacity',
    'line_color': 'line-color'
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0ZGM5MTM1N2IwMDk1MjI4MGRiNiIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsImdldEN4VmVyc2lvbiIsInZlcnNpb25TdHJpbmciLCJ2ZXJzaW9uQXJyYXkiLCJzcGxpdCIsIm1hcCIsIm51bWJlclN0cmluZyIsInBhcnNlSW50IiwibGVuZ3RoIiwiZm9yRWFjaCIsImlzTmFOIiwiZWxlbWVudCIsImdldEN4TWFqb3JWZXJzaW9uIiwicHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyIsImN4QXR0cmlidXRlRGVjbGFyYXRpb25zIiwibm9kZUF0dHJpYnV0ZU5hbWVNYXAiLCJub2RlQXR0cmlidXRlVHlwZU1hcCIsIm5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJlZGdlQXR0cmlidXRlTmFtZU1hcCIsImVkZ2VBdHRyaWJ1dGVUeXBlTWFwIiwiZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbiIsInVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAiLCJub2RlcyIsInVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAiLCJ1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJlZGdlcyIsImF0dHJpYnV0ZVR5cGVNYXAiLCJhdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJrZXlzIiwiYXR0cmlidXRlTmFtZSIsImF0dHJpYnV0ZURlY2xhcmF0aW9uIiwic2V0IiwiZCIsImF0dHJpYnV0ZU5hbWVNYXAiLCJhIiwiYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwidiIsInVwZGF0ZUluZmVycmVkVHlwZXMiLCJrZXkiLCJoYXMiLCJ2YWx1ZSIsImluZmVycmVkVHlwZSIsIm5ld0tleSIsImdldCIsImNvbnZlcnRlciIsInJlcXVpcmUiLCJjb252ZXJ0IiwiY3giLCJ0YXJnZXRGb3JtYXQiLCJjeENvbnN0YW50cyIsImxhcmdlTmV0d29yayIsImN5dG9zY2FwZUpTIiwiY3hVdGlsIiwidmVyaWZ5VmVyc2lvbiIsImZpcnN0RWxlbWVudCIsIm1ham9yVmVyc2lvbiIsImxhcmdlTmV0d29ya0NvbnN0YW50cyIsImxudkNvbnZlcnQiLCJub2RlTWFwIiwiTWFwIiwiZWRnZU1hcCIsImN4VmlzdWFsUHJvcGVydGllcyIsImN4QXNwZWN0IiwiY3hOb2RlcyIsImN4Tm9kZSIsImN4SWQiLCJ0b1N0cmluZyIsIm5vZGUiLCJpZCIsInBvc2l0aW9uIiwiY3hFZGdlcyIsImN4RWRnZSIsImVkZ2UiLCJzIiwidCIsIm91dHB1dCIsIm5vZGVWaWV3cyIsImVkZ2VWaWV3cyIsInB1c2giLCJqc0NvbnN0YW50cyIsInNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJ0YXJnZXRTdHlsZUZpZWxkIiwicG9ydGFibGVQcm9wZXJ0VmFsdWUiLCJ0YXJnZXRTdHlsZUVudHJ5IiwiZGVmYXVsdFByb3BlcnR5Q29udmVydCIsInBvcnRhYmxlUHJvcGVydHlWYWx1ZSIsInNoYXBlIiwid2lkdGgiLCJoZWlnaHQiLCJiYWNrZ3JvdW5kX2NvbG9yIiwiYmFja2dyb3VuZF9vcGFjaXR5IiwibGFiZWwiLCJsYWJlbF9jb2xvciIsIm9wYWNpdHkiLCJsaW5lX2NvbG9yIiwic2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCIsInBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0IiwibWluVmFsdWUiLCJtYXhWYWx1ZSIsIm1pblZQIiwibWF4VlAiLCJtYXBEYXRhUHJvcGVydHlDb252ZXJ0IiwiZ2V0Q1NTU3R5bGVFbnRyaWVzIiwiY3hTdHlsZUVudHJpZXMiLCJlbnRpdHlUeXBlIiwiY3NzRW50cmllcyIsImdldElkU2VsZWN0b3IiLCJlbGVtZW50VHlwZSIsImdldFN0eWxlRWxlbWVudCIsInNlbGVjdG9yIiwiY3NzIiwiZ2V0Q29udGludW91c1NlbGVjdG9yIiwiaW5jbHVkZU1pbiIsImluY2x1ZGVNYXgiLCJtaW5Db25kaXRpb24iLCJtYXhDb25kaXRpb24iLCJnZXRDb250aW51b3VzU3R5bGUiLCJwb3J0YWJsZVByb3BlcnR5S2V5IiwiZ2V0Q29udGludW91c01hcHBpbmdDU1NFbnRyaWVzIiwiY3hNYXBwaW5nRGVmaW5pdGlvbiIsInJhbmdlTWFwcyIsInJhbmdlIiwibWluIiwibWF4Iiwic3R5bGUiLCJtaW5WUFZhbHVlIiwibWF4VlBWYWx1ZSIsImdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5IiwiYXR0cmlidXRlIiwiZ2V0RGlzY3JldGVTZWxlY3RvciIsImF0dHJpYnV0ZURhdGFUeXBlIiwiYXR0cmlidXRlVmFsdWUiLCJnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzIiwiYXR0dHJpYnV0ZVRvVmFsdWVNYXAiLCJkaXNjcmV0ZU1hcCIsInZwIiwic3R5bGVNYXAiLCJnZXRCeXBhc3NDU1NFbnRyeSIsImN4RWxlbWVudCIsInBvIiwiZ2V0Q1NTTWFwcGluZ0VudHJpZXMiLCJjeE1hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cnkiLCJ0eXBlIiwiY29udGlub3VzTWFwcGluZ3MiLCJkZWZpbml0aW9uIiwiY29udGlub3VzTWFwcGluZyIsImRpc2NyZXRlTWFwcGluZ3MiLCJkaXNjcmV0ZU1hcHBpbmciLCJOT0RFX1NFTEVDVE9SIiwiRURHRV9TRUxFQ1RPUiIsImdldFZpc3VhbFByb3BlcnRpZXMiLCJ1bmRlZmluZWQiLCJkZWZhdWx0Q1NTTm9kZVN0eWxlIiwiZGVmYXVsdENTU0VkZ2VTdHlsZSIsImNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IiLCJtYXBwaW5nQ1NTTm9kZVN0eWxlIiwibWFwcGluZ0NTU0VkZ2VTdHlsZSIsImJ5cGFzc0NTU0VudHJpZXMiLCJ2cEVsZW1lbnQiLCJ2cEF0IiwiYXQiLCJkZWZhdWx0U3R5bGVzIiwiZGVmYXVsdCIsIm5ldHdvcmsiLCJub2RlTWFwcGluZyIsImVkZ2VNYXBwaW5nIiwiYXBwbHkiLCJnZXREYXRhIiwiZGF0YSIsImVsZW1lbnRzIiwibGF5b3V0IiwieCIsInkiLCJ6Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztR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QUNBQSxvQkFBUSxNQUFSLElBQWtCbUssUUFBUWxHLE9BQU9uQyxDQUFmLEVBQWtCdkIsb0JBQWxCLEVBQXdDRSw0QkFBeEMsQ0FBbEI7QUFDQVQsb0JBQVEsTUFBUixFQUFnQixJQUFoQixJQUF3QmlFLE9BQU9ILEVBQS9CO0FBQ0E5RCxvQkFBUSxNQUFSLEVBQWdCLFFBQWhCLElBQTRCaUUsT0FBT0UsQ0FBbkM7QUFDQW5FLG9CQUFRLE1BQVIsRUFBZ0IsUUFBaEIsSUFBNEJpRSxPQUFPRyxDQUFuQztBQUNBQyxtQkFBT2dHLFFBQVAsQ0FBZ0JsSixLQUFoQixDQUFzQnFELElBQXRCLENBQTJCeEUsT0FBM0I7QUFDSCxTQVBEOztBQVNBLFlBQU11SCxRQUFRMkIsb0JBQW9CM0Ysa0JBQXBCLEVBQXdDbEQsb0JBQXhDLEVBQThERyxvQkFBOUQsQ0FBZDs7QUFFQTZELGVBQU9rRCxLQUFQLEdBQWVBLE1BQU1BLEtBQXJCO0FBQ0FsRCxlQUFPLGtCQUFQLElBQTZCa0QsTUFBTSxrQkFBTixDQUE3Qjs7QUFFQSxlQUFPbEQsTUFBUDtBQUNIO0FBNUdhLENBQWxCOztBQStHQXBHLE9BQU9DLE9BQVAsR0FBaUI7QUFDYm9FLGVBQVdBO0FBREUsQ0FBakIsQzs7Ozs7Ozs7O0FDbmFBckUsT0FBT0MsT0FBUCxHQUFpQkMsT0FBT0MsTUFBUCxDQUFjO0FBQzNCLGFBQVMsT0FEa0I7QUFFM0IsYUFBUyxPQUZrQjtBQUczQixjQUFVLFFBSGlCO0FBSTNCLHdCQUFvQixrQkFKTztBQUszQiwwQkFBc0Isb0JBTEs7QUFNM0IsYUFBUyxPQU5rQjtBQU8zQixtQkFBZSxhQVBZO0FBUTNCLGVBQVcsU0FSZ0I7QUFTM0Isa0JBQWM7QUFUYSxDQUFkLENBQWpCLEMiLCJmaWxlIjoiLi9idWlsZC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJjeFZpekNvbnZlcnRlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjeFZpekNvbnZlcnRlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNGRjOTEzNTdiMDA5NTIyODBkYjYiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgQ1hfVkVSU0lPTjogJ0NYVmVyc2lvbicsXG4gICAgTk9ERTogJ25vZGUnLFxuICAgIEVER0U6ICdlZGdlJyxcbiAgICBORVRXT1JLOiAnbmV0d29yaycsXG5cbiAgICBOT0RFUzogJ25vZGVzJyxcbiAgICBFREdFUzogJ2VkZ2VzJyxcblxuICAgIElEOiAnaWQnLFxuICAgIFg6ICd4JyxcbiAgICBZOiAneScsXG4gICAgWjogJ3onLFxuICAgIFY6ICd2JyxcblxuICAgIEFUOiAnYXQnLFxuICAgIE46ICduJyxcbiAgICBFOiAnZScsXG5cbiAgICBWSVNVQUxfUFJPUEVSVElFUzogJ3Zpc3VhbFByb3BlcnRpZXMnLFxuICAgIERFRkFVTFQ6ICdkZWZhdWx0JyxcblxuICAgIFNUWUxFOiAnc3R5bGUnXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hDb25zdGFudHMuanMiLCJmdW5jdGlvbiBnZXRDeFZlcnNpb24odmVyc2lvblN0cmluZykge1xuICAgIGNvbnN0IHZlcnNpb25BcnJheSA9IHZlcnNpb25TdHJpbmcuc3BsaXQoJy4nKS5tYXAoKG51bWJlclN0cmluZykgPT4geyByZXR1cm4gcGFyc2VJbnQobnVtYmVyU3RyaW5nLCAxMCk7IH0pO1xuICAgIGlmICh2ZXJzaW9uQXJyYXkubGVuZ3RoICE9PSAyICYmIHZlcnNpb25BcnJheS5sZW5ndGggIT0gMykge1xuICAgICAgICB0aHJvdyAnSW5jb21wYXRpYmxlIHZlcnNpb24gZm9ybWF0OiAnICsgdmVyc2lvblN0cmluZztcbiAgICB9XG4gICAgdmVyc2lvbkFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGlmIChpc05hTihlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgJ05vbi1pbnRlZ2VyIHZhbHVlIGluIHZlcnNpb24gc3RyaW5nOiAnICsgdmVyc2lvblN0cmluZztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2ZXJzaW9uQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGdldEN4TWFqb3JWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcbiAgICByZXR1cm4gdmVyc2lvblN0cmluZyA/IGdldEN4VmVyc2lvbih2ZXJzaW9uU3RyaW5nKVswXSA6IDE7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIFxuICAgIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBcbiAgICBub2RlQXR0cmlidXRlVHlwZU1hcCwgXG4gICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgXG4gICAgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBcbiAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKSB7XG4gICAgY29uc29sZS5sb2coXCIgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IFwiICsgSlNPTi5zdHJpbmdpZnkoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIG51bGwsIDIpKTtcbiAgICBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucy5mb3JFYWNoKChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uKSA9PiB7XG4gICAgICAgIGlmIChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uWydub2RlcyddKSB7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uWydlZGdlcyddKSB7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAoYXR0cmlidXRlVHlwZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2QnXSkge1xuICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGVjbGFyYXRpb24uZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlTmFtZU1hcChhdHRyaWJ1dGVOYW1lTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsnYSddKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXR0cmlidXRlICcgKyBhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hICsgJyBzaG91bGQgYmUgcmVuYW1lZCB0byAnICsgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVOYW1lTWFwLnNldChhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hLCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAoYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsndiddKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXR0cmlidXRlICcgKyBhdHRyaWJ1dGVOYW1lICsgJyBoYXMgZGVmYXVsdCB2YWx1ZSAnICsgYXR0cmlidXRlRGVjbGFyYXRpb24udik7XG4gICAgICAgICAgICBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLnYpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUluZmVycmVkVHlwZXMoYXR0cmlidXRlVHlwZU1hcCwgYXR0cmlidXRlTmFtZU1hcCwgdikge1xuICAgIE9iamVjdC5rZXlzKHYpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZVR5cGVNYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdltrZXldO1xuICAgICAgICAgICAgY29uc3QgaW5mZXJyZWRUeXBlID0gdHlwZW9mIHZhbHVlO1xuICAgICAgICAgICAgY29uc3QgbmV3S2V5ID0gYXR0cmlidXRlTmFtZU1hcC5oYXMoa2V5KSA/IGF0dHJpYnV0ZU5hbWVNYXAuZ2V0KGtleSkgOiBrZXk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVUeXBlTWFwLnNldChuZXdLZXksIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRDeFZlcnNpb246IGdldEN4VmVyc2lvbixcbiAgICBnZXRDeE1ham9yVmVyc2lvbjogZ2V0Q3hNYWpvclZlcnNpb24sXG4gICAgcHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9uczogcHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyxcbiAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwOiB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwLFxuICAgIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXA6IHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwOiB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsXG4gICAgdXBkYXRlSW5mZXJyZWRUeXBlczogdXBkYXRlSW5mZXJyZWRUeXBlc1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hVdGlsLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb252ZXJ0ZXIgPSByZXF1aXJlICgnLi9jb252ZXJ0ZXIuanMnKTtcblxubW9kdWxlLmV4cG9ydHMuY29udmVydCA9IChjeCwgdGFyZ2V0Rm9ybWF0KSA9PiB7IHJldHVybiBjb252ZXJ0ZXIuY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0KTsgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmsgPSByZXF1aXJlICgnLi9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrLmpzJyk7IFxuY29uc3QgY3l0b3NjYXBlSlMgPSByZXF1aXJlICgnLi9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKUy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gdmVyaWZ5VmVyc2lvbihjeCkge1xuICAgIGNvbnN0IGZpcnN0RWxlbWVudCA9IGN4WzBdO1xuICAgIGNvbnN0IHZlcnNpb25TdHJpbmcgPSBmaXJzdEVsZW1lbnRbY3hDb25zdGFudHMuQ1hfVkVSU0lPTl07XG5cbiAgICBjb25zdCBtYWpvclZlcnNpb24gPSBjeFV0aWwuZ2V0Q3hNYWpvclZlcnNpb24odmVyc2lvblN0cmluZyk7XG5cbiAgICBpZiAobWFqb3JWZXJzaW9uICE9PSAyKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgQ1ggdmVyc2lvbjogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQpIHtcbiAgICB2ZXJpZnlWZXJzaW9uKGN4KTtcbiAgICBzd2l0Y2godGFyZ2V0Rm9ybWF0KSB7XG4gICAgICAgIGNhc2UgbGFyZ2VOZXR3b3JrLmNvbnZlcnRlci50YXJnZXRGb3JtYXQ6IHtcbiAgICAgICAgICAgIHJldHVybiBsYXJnZU5ldHdvcmsuY29udmVydGVyLmNvbnZlcnQoY3gpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgY3l0b3NjYXBlSlMuY29udmVydGVyLnRhcmdldEZvcm1hdDoge1xuICAgICAgICAgICAgcmV0dXJuIGN5dG9zY2FwZUpTLmNvbnZlcnRlci5jb252ZXJ0KGN4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydDogY29udmVydFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udmVydGVyLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmtDb25zdGFudHMgPSByZXF1aXJlKCcuL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIGxudkNvbnZlcnQoY3gpIHtcbiAgICBcbiAgICAvL0ZpcnN0IHBhc3MuIFxuICAgIC8vIFdlIG1heSBuZWVkIHRvIGNvbGxlY3Qgb2JqZWN0IGF0dHJpYnV0ZXMgdG8gY2FsY3VsYXRlXG4gICAgLy8gbWFwcGluZ3MgaW4gdGhlIHNlY29uZCBwYXNzLiBcbiAgICBsZXQgbm9kZU1hcCA9IG5ldyBNYXAoKTtcbiAgICBsZXQgZWRnZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXM7XG5cbiAgICBsZXQgbm9kZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IG5vZGVBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMgPSBjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ107XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uczogXCIgKyBKU09OLnN0cmluZ2lmeShjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucywgbnVsbCwgMikpO1xuICAgICAgICAgICAgY3hVdGlsLnByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hOb2RlW2N4Q29uc3RhbnRzLklEXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkIDogY3hJZCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGN4Tm9kZVsneiddID8gXG4gICAgICAgICAgICAgICAgICAgICAgICBbY3hOb2RlWyd4J10sY3hOb2RlWyd5J10sY3hOb2RlWyd6J11dIFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBbY3hOb2RlWyd4J10sY3hOb2RlWyd5J11dXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5vZGVNYXAuc2V0KGN4SWQsIG5vZGUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hFZGdlW2N4Q29uc3RhbnRzLklEXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVkZ2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkIDogY3hJZCxcbiAgICAgICAgICAgICAgICAgICAgcyA6IGN4RWRnZS5zLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHQgOiBjeEVkZ2UudC50b1N0cmluZygpIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlZGdlTWFwLnNldChjeElkLCBlZGdlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXSkge1xuICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIFxuICAgIGxldCBub2RlVmlld3MgPSBbXTtcbiAgICBsZXQgZWRnZVZpZXdzID0gW107XG5cblxuICAgIC8vU2Vjb25kIHBhc3MuIFxuICAgIC8vIEhlcmUgaXMgd2hlcmUgdGhlIGFjdHVhbCBvdXRwdXQgaXMgZ2VuZXJhdGVkLlxuICAgIFxuICAgIG5vZGVNYXAuZm9yRWFjaCgodmFsdWUsIGlkKSA9PiB7XG4gICAgICAgIG5vZGVWaWV3cy5wdXNoKHZhbHVlKTtcbiAgICB9KTtcblxuICAgIGVkZ2VNYXAuZm9yRWFjaCgodmFsdWUsIGlkKSA9PiB7XG4gICAgICAgIGVkZ2VWaWV3cy5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICBcbiAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLm5vZGVWaWV3c10gPSBub2RlVmlld3M7XG4gICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5lZGdlVmlld3NdID0gZWRnZVZpZXdzO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdsbnYnLFxuICAgIGNvbnZlcnQ6ICAoY3gpID0+IHtcbiAgICAgICAgcmV0dXJuIGxudkNvbnZlcnQoY3gpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydGVyOiBjb252ZXJ0ZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmsuanMiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgJ25vZGVWaWV3cyc6ICdub2RlVmlld3MnLFxuICAgICdlZGdlVmlld3MnOiAnZWRnZVZpZXdzJywgXG4gICAgJ2lkJzogJ2lkJyxcbiAgICAncG9zaXRpb24nOiAncG9zaXRpb24nLFxuICAgICdzJzogJ3MnLFxuICAgICd0JzogJ3QnLFxuICAgICdsYWJlbCc6ICdsYWJlbCcsIFxuICAgICdjb2xvcic6ICdjb2xvcicsXG4gICAgJ2xpbmVfY29sb3InOiAnbGluZS1jb2xvcidcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBqc0NvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3l0b3NjYXBlSlNDb25zdGFudHMuanMnKTtcbmNvbnN0IGN4VXRpbCA9IHJlcXVpcmUoJy4uL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKSB7XG4gICAgY29uc3QgdGFyZ2V0U3R5bGVFbnRyeSA9IG5ldyBNYXAoKTtcbiAgICB0YXJnZXRTdHlsZUVudHJ5LnNldCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSk7XG4gICAgcmV0dXJuIHRhcmdldFN0eWxlRW50cnk7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdzaGFwZSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuc2hhcGUsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICd3aWR0aCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdoZWlnaHQnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdiYWNrZ3JvdW5kLW9wYWNpdHknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ2xhYmVsJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ2xhYmVsLWNvbG9yJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICd3aWR0aCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdvcGFjaXR5JzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnbGluZS1jb2xvcic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGluZV9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG59XG5cbmZ1bmN0aW9uIHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgYXR0cmlidXRlTmFtZSkge1xuICAgIGNvbnN0IG91dHB1dCA9IHt9O1xuICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9ICdkYXRhKCcgKyBhdHRyaWJ1dGVOYW1lICsgJyknO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdzaGFwZSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ3dpZHRoJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnaGVpZ2h0JzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ2JhY2tncm91bmQtb3BhY2l0eSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdsYWJlbCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ2xhYmVsLWNvbG9yJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ3dpZHRoJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnb3BhY2l0eSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLm9wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnbGluZS1jb2xvcic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIGF0dHJpYnV0ZU5hbWUpXG4gICAgfSxcbn1cbmZ1bmN0aW9uIHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgb3V0cHV0W3RhcmdldFN0eWxlRmllbGRdID0gJ21hcERhdGEoJyArIGF0dHJpYnV0ZU5hbWUgXG4gICAgKyAnLCAnICsgbWluVmFsdWUgXG4gICAgKyAnLCAnICsgbWF4VmFsdWUgXG4gICAgKyAnLCAnICsgbWluVlAgXG4gICAgKyAnLCAnICsgbWF4VlBcbiAgICArICcpJztcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBtYXBEYXRhUHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnc2hhcGUnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuc2hhcGUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ3dpZHRoJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdoZWlnaHQnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ2JhY2tncm91bmQtb3BhY2l0eSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ2xhYmVsJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdsYWJlbC1jb2xvcic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ3dpZHRoJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdvcGFjaXR5JzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLm9wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ2xpbmUtY29sb3InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGluZV9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApXG4gICAgfSxcbn1cblxuXG5mdW5jdGlvbiBnZXRDU1NTdHlsZUVudHJpZXMoY3hTdHlsZUVudHJpZXMsIGVudGl0eVR5cGUpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgT2JqZWN0LmtleXMoY3hTdHlsZUVudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBwb3J0YWJsZVByb3BlcnR5VmFsdWUgPSBjeFN0eWxlRW50cmllc1trZXldO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtrZXldKSB7XG4gICAgICAgICAgICBjb25zdCBjc3NFbnRyaWVzID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtrZXldKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICBjc3NFbnRyaWVzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRJZFNlbGVjdG9yKGlkLCBlbGVtZW50VHlwZSkge1xuICAgIC8vbm9kZSNpZCBvciBlZGdlI2lkXG4gICAgcmV0dXJuIGVsZW1lbnRUeXBlICsgJyMnICsgaWQ7XG59XG5cblxuXG5mdW5jdGlvbiBnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcykge1xuICAgIHJldHVybiB7ICdzZWxlY3Rvcic6IHNlbGVjdG9yLCAnc3R5bGUnOiBjc3MgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29udGludW91c1NlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgaW5jbHVkZU1pbiwgaW5jbHVkZU1heCkge1xuICAgIGNvbnN0IG1pbkNvbmRpdGlvbiA9IGluY2x1ZGVNaW4gPyAnPj0nIDogJz4nO1xuICAgIGNvbnN0IG1heENvbmRpdGlvbiA9IGluY2x1ZGVNYXggPyAnPD0nIDogJzwnO1xuXG4gICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycrYXR0cmlidXRlTmFtZSsnICcgICsgbWluQ29uZGl0aW9uICsgJyAnK21pblZhbHVlKyddWycrYXR0cmlidXRlTmFtZSsnICcgKyBtYXhDb25kaXRpb24gKyAnICcrbWF4VmFsdWUrJ10nXG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNTdHlsZShlbnRpdHlUeXBlLCBwb3J0YWJsZVByb3BlcnR5S2V5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBpZiAobWFwRGF0YVByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICByZXR1cm4gbWFwRGF0YVByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cmllcyhwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydhdHRyaWJ1dGUnXTtcbiAgICBjb25zdCByYW5nZU1hcHMgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydtYXAnXTtcbiAgICBjb25zb2xlLmxvZygnY29udGludW91cyBtYXBwaW5nIGZvciAnICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBKU09OLnN0cmluZ2lmeShyYW5nZU1hcHMsIG51bGwsIDIpKTtcbiAgICBcbiAgICByYW5nZU1hcHMuZm9yRWFjaCgocmFuZ2UpPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGdldENvbnRpbnVvdXNTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCByYW5nZS5taW4sIHJhbmdlLm1heCwgcmFuZ2UuaW5jbHVkZU1pbiwgcmFuZ2UuaW5jbHVkZU1heCk7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29udGludW91c1N0eWxlKGVudGl0eVR5cGUsIHBvcnRhYmxlUHJvcGVydHlLZXksIGF0dHJpYnV0ZU5hbWUsIHJhbmdlLm1pbiwgcmFuZ2UubWF4LCByYW5nZS5taW5WUFZhbHVlLCByYW5nZS5tYXhWUFZhbHVlKTtcbiAgICAgICAgXG4gICAgICAgIG91dHB1dC5wdXNoKGdldFN0eWxlRWxlbWVudChzZWxlY3Rvciwgc3R5bGUpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRQYXNzdGhyb3VnaE1hcHBpbmdDU1NFbnRyeShwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlKSB7XG4gICAgaWYgKHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgY29uc3QgY3NzID0gcGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShjeE1hcHBpbmdEZWZpbml0aW9uLmF0dHJpYnV0ZSk7XG4gICAgICAgIHJldHVybiBnZXRTdHlsZUVsZW1lbnQoZW50aXR5VHlwZSwgY3NzKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldERpc2NyZXRlU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGF0YVR5cGUsIGF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgaWYgKGF0dHJpYnV0ZURhdGFUeXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICcgPSBcXCcnICsgYXR0cmlidXRlVmFsdWUgKyAnXFwnXSc7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVEYXRhVHlwZSA9PSAnYm9vbGVhbicpIHtcblxuICAgICAgICBpZiAoYXR0cmlidXRlVmFsdWUgPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbPycgKyBhdHRyaWJ1dGVOYW1lICsgJ10nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJ11bIScgKyBhdHRyaWJ1dGVOYW1lICsgJ10nO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyA9ICcgKyBhdHRyaWJ1dGVWYWx1ZSArICddJztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldERpc2NyZXRlTWFwcGluZ0NTU0VudHJpZXMocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBjb25zdCBhdHR0cmlidXRlVG9WYWx1ZU1hcCA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ21hcCddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydhdHRyaWJ1dGUnXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVEYXRhVHlwZSA9IGF0dHJpYnV0ZVR5cGVNYXAuZ2V0KGF0dHJpYnV0ZU5hbWUpO1xuICAgIGF0dHRyaWJ1dGVUb1ZhbHVlTWFwLmZvckVhY2goKGRpc2NyZXRlTWFwKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcgZGlzY3JldGUgbWFwIGZvciAnICsgcG9ydGFibGVQcm9wZXJ0eUtleSArICc6ICcgKyBkaXNjcmV0ZU1hcC52ICsgJyAoJyArIGF0dHJpYnV0ZU5hbWUgKyAnPCcgK2F0dHJpYnV0ZURhdGFUeXBlICsnPikgLT4gJyArIGRpc2NyZXRlTWFwLnZwKTtcblxuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGdldERpc2NyZXRlU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGF0YVR5cGUsIGRpc2NyZXRlTWFwLnYpO1xuICAgICAgIFxuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGRpc2NyZXRlTWFwLnZwKTtcbiAgICAgICAgICAgIGNvbnN0IGNzcyA9IHt9O1xuICAgICAgICAgICAgc3R5bGVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGNzc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcgICBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGNzcykpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIHJldHVybiBvdXRwdXQ7IC8vZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpO1xufVxuXG5mdW5jdGlvbiBnZXRCeXBhc3NDU1NFbnRyeShlbnRpdHlUeXBlLCBjeEVsZW1lbnQpIHtcbiAgIFxuICAgIGNvbnN0IGlkID0gY3hFbGVtZW50LnBvO1xuICAgIGNvbnN0IGNzcyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4RWxlbWVudC52KS5mb3JFYWNoKChwb3J0YWJsZVByb3BlcnR5S2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGN4RWxlbWVudC52W3BvcnRhYmxlUHJvcGVydHlLZXldO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICBzdHlsZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY3NzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWxlY3RvciA9IGdldElkU2VsZWN0b3IoaWQpO1xuICAgIHJldHVybiBnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcyk7XG59XG5cbi8qKiBcbiAqIFxuKi9cbmZ1bmN0aW9uIGdldENTU01hcHBpbmdFbnRyaWVzKFxuICAgIGN4TWFwcGluZ0VudHJpZXMsXG4gICAgZW50aXR5VHlwZSxcbiAgICBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGN4TWFwcGluZ0VudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBjeE1hcHBpbmdFbnRyeSA9IGN4TWFwcGluZ0VudHJpZXNba2V5XTtcbiAgICAgICAgY29uc29sZS5sb2coXCIgbWFwcGluZyB0eXBlOiBcIiArIGN4TWFwcGluZ0VudHJ5LnR5cGUpO1xuICAgICAgICBzd2l0Y2ggKGN4TWFwcGluZ0VudHJ5LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2NvbnRpbnVvdXMnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGlub3VzTWFwcGluZ3MgPSBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKTtcbiAgICAgICAgICAgICAgICBjb250aW5vdXNNYXBwaW5ncy5mb3JFYWNoKChjb250aW5vdXNNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGNvbnRpbm91c01hcHBpbmcpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdwYXNzdGhyb3VnaCc6IHtcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChnZXRQYXNzdGhyb3VnaE1hcHBpbmdDU1NFbnRyeShrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2Rpc2NyZXRlJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlTWFwcGluZ3MgPSBnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzKGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCk7XG4gICAgICAgICAgICAgICAgZGlzY3JldGVNYXBwaW5ncy5mb3JFYWNoKChkaXNjcmV0ZU1hcHBpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goZGlzY3JldGVNYXBwaW5nKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgTk9ERV9TRUxFQ1RPUiA9ICdub2RlJztcbmNvbnN0IEVER0VfU0VMRUNUT1IgPSAnZWRnZSc7XG5cbmZ1bmN0aW9uIGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBub2RlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBzdHlsZTogW10sXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgbGV0IGRlZmF1bHRDU1NOb2RlU3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGRlZmF1bHRDU1NFZGdlU3R5bGUgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgY3NzTmV0d29ya0JhY2tncm91bmRDb2xvciA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBtYXBwaW5nQ1NTTm9kZVN0eWxlID0gdW5kZWZpbmVkO1xuICAgIGxldCBtYXBwaW5nQ1NTRWRnZVN0eWxlID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGJ5cGFzc0NTU0VudHJpZXMgPSBbXTtcblxuICAgIGN4VmlzdWFsUHJvcGVydGllcy5mb3JFYWNoKCh2cEVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgdnBBdCA9IHZwRWxlbWVudC5hdDtcbiAgICAgICAgaWYgKHZwQXQgPT09IGN4Q29uc3RhbnRzLlNUWUxFKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZwRWxlbWVudC52O1xuICAgICAgICAgICAgY29uc3QgZGVmYXVsdFN0eWxlcyA9IHZhbHVlLmRlZmF1bHQ7XG5cbiAgICAgICAgICAgIGRlZmF1bHRDU1NOb2RlU3R5bGUgPSBnZXRDU1NTdHlsZUVudHJpZXMoZGVmYXVsdFN0eWxlcy5ub2RlLCAnbm9kZScpO1xuICAgICAgICAgICAgZGVmYXVsdENTU0VkZ2VTdHlsZSA9IGdldENTU1N0eWxlRW50cmllcyhkZWZhdWx0U3R5bGVzLmVkZ2UsICdlZGdlJyk7XG5cbiAgICAgICAgICAgIGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IgPSBkZWZhdWx0U3R5bGVzLm5ldHdvcmtbJ2JhY2tncm91bmQtY29sb3InXTtcblxuICAgICAgICAgICAgY29uc3Qgbm9kZU1hcHBpbmcgPSB2YWx1ZS5ub2RlTWFwcGluZztcbiAgICAgICAgICAgIG1hcHBpbmdDU1NOb2RlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhub2RlTWFwcGluZywgJ25vZGUnLCBub2RlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGVkZ2VNYXBwaW5nID0gdmFsdWUuZWRnZU1hcHBpbmc7XG4gICAgICAgICAgICBtYXBwaW5nQ1NTRWRnZVN0eWxlID0gZ2V0Q1NTTWFwcGluZ0VudHJpZXMoZWRnZU1hcHBpbmcsICdlZGdlJywgZWRnZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodnBBdCA9PT0gY3hDb25zdGFudHMuTikge1xuICAgICAgICAgICAgYnlwYXNzQ1NTRW50cmllcy5wdXNoKGdldEJ5cGFzc0NTU0VudHJ5KCdub2RlJywgdnBFbGVtZW50KSk7XG4gICAgICAgIH0gZWxzZSBpZiAodnBBdCA9PT0gY3hDb25zdGFudHMuRSkge1xuICAgICAgICAgICAgYnlwYXNzQ1NTRW50cmllcy5wdXNoKGdldEJ5cGFzc0NTU0VudHJ5KCdlZGdlJywgdnBFbGVtZW50KSk7XG5cbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvL0FkZCBkZWZhdWx0IHN0eWxlXG4gICAgb3V0cHV0LnN0eWxlLnB1c2goZ2V0U3R5bGVFbGVtZW50KE5PREVfU0VMRUNUT1IsIGRlZmF1bHRDU1NOb2RlU3R5bGUpKTtcbiAgICBvdXRwdXQuc3R5bGUucHVzaChnZXRTdHlsZUVsZW1lbnQoRURHRV9TRUxFQ1RPUiwgZGVmYXVsdENTU0VkZ2VTdHlsZSkpO1xuXG4gICAgb3V0cHV0LnN0eWxlLnB1c2guYXBwbHkob3V0cHV0LnN0eWxlLCBtYXBwaW5nQ1NTTm9kZVN0eWxlKTtcbiAgICBvdXRwdXQuc3R5bGUucHVzaC5hcHBseShvdXRwdXQuc3R5bGUsIG1hcHBpbmdDU1NFZGdlU3R5bGUpO1xuXG4gICAgb3V0cHV0WydiYWNrZ3JvdW5kLWNvbG9yJ10gPSBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5cbmZ1bmN0aW9uIGdldERhdGEodiwgYXR0cmlidXRlTmFtZU1hcCwgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKSB7XG4gICAgbGV0IGRhdGEgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgbmV3S2V5ID0gYXR0cmlidXRlTmFtZU1hcC5oYXMoa2V5KSA/IGF0dHJpYnV0ZU5hbWVNYXAuZ2V0KGtleSkgOiBrZXk7XG4gICAgICAgIGRhdGFbbmV3S2V5XSA9IHZba2V5XTtcbiAgICB9KTtcbiAgICBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBpZiAoIWRhdGFba2V5XSkge1xuICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbn1cblxuXG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdjeXRvc2NhcGVKUycsXG4gICAgY29udmVydDogKGN4KSA9PiB7XG4gICAgICAgIGNvbnN0IG91dHB1dCA9IHtcbiAgICAgICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiB7fSxcbiAgICAgICAgICAgIGxheW91dDoge30sXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBub2RlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgIFxuICAgICAgICBsZXQgY3hWaXN1YWxQcm9wZXJ0aWVzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgICAgICAgICAgICAgY3hVdGlsLnByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuICAgICAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeE5vZGVbJ2lkJ10udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcC5zZXQoY3hJZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGN4Tm9kZVsnaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHY6IGN4Tm9kZVsndiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogY3hOb2RlWyd4J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogY3hOb2RlWyd5J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgejogY3hOb2RlWyd6J11cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hOb2RlWyd2J10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcbiAgICAgICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hFZGdlWydpZCddLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGVkZ2VNYXAuc2V0KGN4SWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjeEVkZ2VbJ2lkJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB2OiBjeEVkZ2VbJ3YnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHM6IGN4RWRnZVsncyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgdDogY3hFZGdlWyd0J11cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hFZGdlWyd2J10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAuZm9yRWFjaCgoaW5mZXJyZWRUeXBlLCBhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW5mZXJyZWQgYXR0cmlidXRlIHR5cGUgZm9yIG5vZGU6ICcgKyBhdHRyaWJ1dGVOYW1lICsgJzogJyArIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLmZvckVhY2goKGluZmVycmVkVHlwZSwgYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZmVycmVkIGF0dHJpYnV0ZSB0eXBlIGZvciBlZGdlOiAnICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL0FkZCBub2Rlc1xuICAgICAgICBvdXRwdXQuZWxlbWVudHNbJ25vZGVzJ10gPSBbXTtcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydlZGdlcyddID0gW107XG4gICAgICAgIG5vZGVNYXAuZm9yRWFjaCgoY3hOb2RlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7fTtcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGdldERhdGEoY3hOb2RlLnYsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnaWQnXSA9IGN4Tm9kZS5pZDtcbiAgICAgICAgICAgIGVsZW1lbnRbJ3Bvc2l0aW9uJ10gPSB7XG4gICAgICAgICAgICAgICAgeDogY3hOb2RlLmxheW91dC54LFxuICAgICAgICAgICAgICAgIHk6IGN4Tm9kZS5sYXlvdXQueVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0cHV0LmVsZW1lbnRzLm5vZGVzLnB1c2goZWxlbWVudClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9BZGQgZWRnZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydlZGdlcyddID0gW107XG4gICAgICAgIGVkZ2VNYXAuZm9yRWFjaCgoY3hFZGdlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7fTtcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGdldERhdGEoY3hFZGdlLnYsIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnaWQnXSA9IGN4RWRnZS5pZDtcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnc291cmNlJ10gPSBjeEVkZ2UucztcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsndGFyZ2V0J10gPSBjeEVkZ2UudDtcbiAgICAgICAgICAgIG91dHB1dC5lbGVtZW50cy5lZGdlcy5wdXNoKGVsZW1lbnQpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0VmlzdWFsUHJvcGVydGllcyhjeFZpc3VhbFByb3BlcnRpZXMsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgb3V0cHV0LnN0eWxlID0gc3R5bGUuc3R5bGU7XG4gICAgICAgIG91dHB1dFsnYmFja2dyb3VuZC1jb2xvciddID0gc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXTtcblxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydGVyOiBjb252ZXJ0ZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTLmpzIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgICdzaGFwZSc6ICdzaGFwZScsXG4gICAgJ3dpZHRoJzogJ3dpZHRoJywgXG4gICAgJ2hlaWdodCc6ICdoZWlnaHQnLFxuICAgICdiYWNrZ3JvdW5kX2NvbG9yJzogJ2JhY2tncm91bmQtY29sb3InLFxuICAgICdiYWNrZ3JvdW5kX29wYWNpdHknOiAnYmFja2dyb3VuZC1vcGFjaXR5JyxcbiAgICAnbGFiZWwnOiAnbGFiZWwnLFxuICAgICdsYWJlbF9jb2xvcic6ICdsYWJlbC1jb2xvcicsIFxuICAgICdvcGFjaXR5JzogJ29wYWNpdHknLFxuICAgICdsaW5lX2NvbG9yJzogJ2xpbmUtY29sb3InXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlNDb25zdGFudHMuanMiXSwic291cmNlUm9vdCI6IiJ9