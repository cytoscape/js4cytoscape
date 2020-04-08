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

    //Final step
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmN2EyNGE4M2FmNzg5YjdkZmIwOCIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsImdldEN4VmVyc2lvbiIsInZlcnNpb25TdHJpbmciLCJ2ZXJzaW9uQXJyYXkiLCJzcGxpdCIsIm1hcCIsIm51bWJlclN0cmluZyIsInBhcnNlSW50IiwibGVuZ3RoIiwiZm9yRWFjaCIsImlzTmFOIiwiZWxlbWVudCIsImdldEN4TWFqb3JWZXJzaW9uIiwicHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyIsImN4QXR0cmlidXRlRGVjbGFyYXRpb25zIiwibm9kZUF0dHJpYnV0ZU5hbWVNYXAiLCJub2RlQXR0cmlidXRlVHlwZU1hcCIsIm5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJlZGdlQXR0cmlidXRlTmFtZU1hcCIsImVkZ2VBdHRyaWJ1dGVUeXBlTWFwIiwiZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbiIsInVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAiLCJub2RlcyIsInVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAiLCJ1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJlZGdlcyIsImF0dHJpYnV0ZVR5cGVNYXAiLCJhdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJrZXlzIiwiYXR0cmlidXRlTmFtZSIsImF0dHJpYnV0ZURlY2xhcmF0aW9uIiwic2V0IiwiZCIsImF0dHJpYnV0ZU5hbWVNYXAiLCJhIiwiYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwidiIsInVwZGF0ZUluZmVycmVkVHlwZXMiLCJrZXkiLCJoYXMiLCJ2YWx1ZSIsImluZmVycmVkVHlwZSIsIm5ld0tleSIsImdldCIsImNvbnZlcnRlciIsInJlcXVpcmUiLCJjb252ZXJ0IiwiY3giLCJ0YXJnZXRGb3JtYXQiLCJjeENvbnN0YW50cyIsImxhcmdlTmV0d29yayIsImN5dG9zY2FwZUpTIiwiY3hVdGlsIiwidmVyaWZ5VmVyc2lvbiIsImZpcnN0RWxlbWVudCIsIm1ham9yVmVyc2lvbiIsImxhcmdlTmV0d29ya0NvbnN0YW50cyIsImxudkNvbnZlcnQiLCJub2RlTWFwIiwiTWFwIiwiZWRnZU1hcCIsImN4VmlzdWFsUHJvcGVydGllcyIsImN4QXNwZWN0IiwiY3hOb2RlcyIsImN4Tm9kZSIsImN4SWQiLCJ0b1N0cmluZyIsIm5vZGUiLCJpZCIsInBvc2l0aW9uIiwiY3hFZGdlcyIsImN4RWRnZSIsImVkZ2UiLCJzIiwidCIsIm91dHB1dCIsIm5vZGVWaWV3cyIsImVkZ2VWaWV3cyIsInB1c2giLCJqc0NvbnN0YW50cyIsInNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJ0YXJnZXRTdHlsZUZpZWxkIiwicG9ydGFibGVQcm9wZXJ0VmFsdWUiLCJ0YXJnZXRTdHlsZUVudHJ5IiwiZGVmYXVsdFByb3BlcnR5Q29udmVydCIsInBvcnRhYmxlUHJvcGVydHlWYWx1ZSIsInNoYXBlIiwid2lkdGgiLCJoZWlnaHQiLCJiYWNrZ3JvdW5kX2NvbG9yIiwiYmFja2dyb3VuZF9vcGFjaXR5IiwibGFiZWwiLCJsYWJlbF9jb2xvciIsIm9wYWNpdHkiLCJsaW5lX2NvbG9yIiwic2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCIsInBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0IiwibWluVmFsdWUiLCJtYXhWYWx1ZSIsIm1pblZQIiwibWF4VlAiLCJtYXBEYXRhUHJvcGVydHlDb252ZXJ0IiwiZ2V0Q1NTU3R5bGVFbnRyaWVzIiwiY3hTdHlsZUVudHJpZXMiLCJlbnRpdHlUeXBlIiwiY3NzRW50cmllcyIsImdldElkU2VsZWN0b3IiLCJlbGVtZW50VHlwZSIsImdldFN0eWxlRWxlbWVudCIsInNlbGVjdG9yIiwiY3NzIiwiZ2V0Q29udGludW91c1NlbGVjdG9yIiwiaW5jbHVkZU1pbiIsImluY2x1ZGVNYXgiLCJtaW5Db25kaXRpb24iLCJtYXhDb25kaXRpb24iLCJnZXRDb250aW51b3VzU3R5bGUiLCJwb3J0YWJsZVByb3BlcnR5S2V5IiwiZ2V0Q29udGludW91c01hcHBpbmdDU1NFbnRyaWVzIiwiY3hNYXBwaW5nRGVmaW5pdGlvbiIsInJhbmdlTWFwcyIsInJhbmdlIiwibWluIiwibWF4Iiwic3R5bGUiLCJtaW5WUFZhbHVlIiwibWF4VlBWYWx1ZSIsImdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5IiwiYXR0cmlidXRlIiwiZ2V0RGlzY3JldGVTZWxlY3RvciIsImF0dHJpYnV0ZURhdGFUeXBlIiwiYXR0cmlidXRlVmFsdWUiLCJnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzIiwiYXR0dHJpYnV0ZVRvVmFsdWVNYXAiLCJkaXNjcmV0ZU1hcCIsInZwIiwic3R5bGVNYXAiLCJnZXRCeXBhc3NDU1NFbnRyeSIsImN4RWxlbWVudCIsInBvIiwiZ2V0Q1NTTWFwcGluZ0VudHJpZXMiLCJjeE1hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cnkiLCJ0eXBlIiwiY29udGlub3VzTWFwcGluZ3MiLCJkZWZpbml0aW9uIiwiY29udGlub3VzTWFwcGluZyIsImRpc2NyZXRlTWFwcGluZ3MiLCJkaXNjcmV0ZU1hcHBpbmciLCJOT0RFX1NFTEVDVE9SIiwiRURHRV9TRUxFQ1RPUiIsImdldFZpc3VhbFByb3BlcnRpZXMiLCJ1bmRlZmluZWQiLCJkZWZhdWx0Q1NTTm9kZVN0eWxlIiwiZGVmYXVsdENTU0VkZ2VTdHlsZSIsImNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IiLCJtYXBwaW5nQ1NTTm9kZVN0eWxlIiwibWFwcGluZ0NTU0VkZ2VTdHlsZSIsImJ5cGFzc0NTU0VudHJpZXMiLCJ2cEVsZW1lbnQiLCJ2cEF0IiwiYXQiLCJkZWZhdWx0U3R5bGVzIiwiZGVmYXVsdCIsIm5ldHdvcmsiLCJub2RlTWFwcGluZyIsImVkZ2VNYXBwaW5nIiwiYXBwbHkiLCJnZXREYXRhIiwiZGF0YSIsImVsZW1lbnRzIiwibGF5b3V0IiwieCIsInkiLCJ6Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztR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QWhCO0FBQ0FBLG9CQUFRLE1BQVIsSUFBa0JtSyxRQUFRbEcsT0FBT25DLENBQWYsRUFBa0J2QixvQkFBbEIsRUFBd0NFLDRCQUF4QyxDQUFsQjtBQUNBVCxvQkFBUSxNQUFSLEVBQWdCLElBQWhCLElBQXdCaUUsT0FBT0gsRUFBL0I7QUFDQTlELG9CQUFRLE1BQVIsRUFBZ0IsUUFBaEIsSUFBNEJpRSxPQUFPRSxDQUFuQztBQUNBbkUsb0JBQVEsTUFBUixFQUFnQixRQUFoQixJQUE0QmlFLE9BQU9HLENBQW5DO0FBQ0FDLG1CQUFPZ0csUUFBUCxDQUFnQmxKLEtBQWhCLENBQXNCcUQsSUFBdEIsQ0FBMkJ4RSxPQUEzQjtBQUNILFNBUEQ7O0FBU0EsWUFBTXVILFFBQVEyQixvQkFBb0IzRixrQkFBcEIsRUFBd0NsRCxvQkFBeEMsRUFBOERHLG9CQUE5RCxDQUFkOztBQUVBNkQsZUFBT2tELEtBQVAsR0FBZUEsTUFBTUEsS0FBckI7QUFDQWxELGVBQU8sa0JBQVAsSUFBNkJrRCxNQUFNLGtCQUFOLENBQTdCOztBQUVBLGVBQU9sRCxNQUFQO0FBQ0g7QUE1R2EsQ0FBbEI7O0FBK0dBcEcsT0FBT0MsT0FBUCxHQUFpQjtBQUNib0UsZUFBV0E7QUFERSxDQUFqQixDOzs7Ozs7Ozs7QUNuYUFyRSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPQyxNQUFQLENBQWM7QUFDM0IsYUFBUyxPQURrQjtBQUUzQixhQUFTLE9BRmtCO0FBRzNCLGNBQVUsUUFIaUI7QUFJM0Isd0JBQW9CLGtCQUpPO0FBSzNCLDBCQUFzQixvQkFMSztBQU0zQixhQUFTLE9BTmtCO0FBTzNCLG1CQUFlLGFBUFk7QUFRM0IsZUFBVyxTQVJnQjtBQVMzQixrQkFBYztBQVRhLENBQWQsQ0FBakIsQyIsImZpbGUiOiIuL2J1aWxkL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmN2EyNGE4M2FmNzg5YjdkZmIwOCIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBDWF9WRVJTSU9OOiAnQ1hWZXJzaW9uJyxcbiAgICBOT0RFOiAnbm9kZScsXG4gICAgRURHRTogJ2VkZ2UnLFxuICAgIE5FVFdPUks6ICduZXR3b3JrJyxcblxuICAgIE5PREVTOiAnbm9kZXMnLFxuICAgIEVER0VTOiAnZWRnZXMnLFxuXG4gICAgSUQ6ICdpZCcsXG4gICAgWDogJ3gnLFxuICAgIFk6ICd5JyxcbiAgICBaOiAneicsXG4gICAgVjogJ3YnLFxuXG4gICAgQVQ6ICdhdCcsXG4gICAgTjogJ24nLFxuICAgIEU6ICdlJyxcblxuICAgIFZJU1VBTF9QUk9QRVJUSUVTOiAndmlzdWFsUHJvcGVydGllcycsXG4gICAgREVGQVVMVDogJ2RlZmF1bHQnLFxuXG4gICAgU1RZTEU6ICdzdHlsZSdcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeENvbnN0YW50cy5qcyIsImZ1bmN0aW9uIGdldEN4VmVyc2lvbih2ZXJzaW9uU3RyaW5nKSB7XG4gICAgY29uc3QgdmVyc2lvbkFycmF5ID0gdmVyc2lvblN0cmluZy5zcGxpdCgnLicpLm1hcCgobnVtYmVyU3RyaW5nKSA9PiB7IHJldHVybiBwYXJzZUludChudW1iZXJTdHJpbmcsIDEwKTsgfSk7XG4gICAgaWYgKHZlcnNpb25BcnJheS5sZW5ndGggIT09IDIgJiYgdmVyc2lvbkFycmF5Lmxlbmd0aCAhPSAzKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgdmVyc2lvbiBmb3JtYXQ6ICcgKyB2ZXJzaW9uU3RyaW5nO1xuICAgIH1cbiAgICB2ZXJzaW9uQXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgaWYgKGlzTmFOKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyAnTm9uLWludGVnZXIgdmFsdWUgaW4gdmVyc2lvbiBzdHJpbmc6ICcgKyB2ZXJzaW9uU3RyaW5nO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZlcnNpb25BcnJheTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3hNYWpvclZlcnNpb24odmVyc2lvblN0cmluZykge1xuICAgIHJldHVybiB2ZXJzaW9uU3RyaW5nID8gZ2V0Q3hWZXJzaW9uKHZlcnNpb25TdHJpbmcpWzBdIDogMTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyhjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucywgXG4gICAgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIFxuICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBcbiAgICBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBcbiAgICBlZGdlQXR0cmlidXRlTmFtZU1hcCwgZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIFxuICAgIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApIHtcbiAgICBjb25zb2xlLmxvZyhcIiBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uczogXCIgKyBKU09OLnN0cmluZ2lmeShjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucywgbnVsbCwgMikpO1xuICAgIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLmZvckVhY2goKGN4QXR0cmlidXRlRGVjbGFyYXRpb24pID0+IHtcbiAgICAgICAgaWYgKGN4QXR0cmlidXRlRGVjbGFyYXRpb25bJ25vZGVzJ10pIHtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAobm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlVHlwZU1hcChub2RlQXR0cmlidXRlVHlwZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAobm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN4QXR0cmlidXRlRGVjbGFyYXRpb25bJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAoZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlVHlwZU1hcChlZGdlQXR0cmlidXRlVHlwZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAoZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlVHlwZU1hcChhdHRyaWJ1dGVUeXBlTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsnZCddKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVUeXBlTWFwLnNldChhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbi5kKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKGF0dHJpYnV0ZU5hbWVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWydhJ10pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhdHRyaWJ1dGUgJyArIGF0dHJpYnV0ZURlY2xhcmF0aW9uLmEgKyAnIHNob3VsZCBiZSByZW5hbWVkIHRvICcgKyBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWVNYXAuc2V0KGF0dHJpYnV0ZURlY2xhcmF0aW9uLmEsIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWyd2J10pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhdHRyaWJ1dGUgJyArIGF0dHJpYnV0ZU5hbWUgKyAnIGhhcyBkZWZhdWx0IHZhbHVlICcgKyBhdHRyaWJ1dGVEZWNsYXJhdGlvbi52KTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcC5zZXQoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGVjbGFyYXRpb24udik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlSW5mZXJyZWRUeXBlcyhhdHRyaWJ1dGVUeXBlTWFwLCBhdHRyaWJ1dGVOYW1lTWFwLCB2KSB7XG4gICAgT2JqZWN0LmtleXModikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGlmICghYXR0cmlidXRlVHlwZU1hcC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2W2tleV07XG4gICAgICAgICAgICBjb25zdCBpbmZlcnJlZFR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBuZXdLZXkgPSBhdHRyaWJ1dGVOYW1lTWFwLmhhcyhrZXkpID8gYXR0cmlidXRlTmFtZU1hcC5nZXQoa2V5KSA6IGtleTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGVNYXAuc2V0KG5ld0tleSwgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEN4VmVyc2lvbjogZ2V0Q3hWZXJzaW9uLFxuICAgIGdldEN4TWFqb3JWZXJzaW9uOiBnZXRDeE1ham9yVmVyc2lvbixcbiAgICBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zOiBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zLFxuICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXA6IHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcDogdXBkYXRlQXR0cmlidXRlTmFtZU1hcCxcbiAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXA6IHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICB1cGRhdGVJbmZlcnJlZFR5cGVzOiB1cGRhdGVJbmZlcnJlZFR5cGVzXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeFV0aWwuanMiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNvbnZlcnRlciA9IHJlcXVpcmUgKCcuL2NvbnZlcnRlci5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cy5jb252ZXJ0ID0gKGN4LCB0YXJnZXRGb3JtYXQpID0+IHsgcmV0dXJuIGNvbnZlcnRlci5jb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQpOyB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGxhcmdlTmV0d29yayA9IHJlcXVpcmUgKCcuL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmsuanMnKTsgXG5jb25zdCBjeXRvc2NhcGVKUyA9IHJlcXVpcmUgKCcuL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiB2ZXJpZnlWZXJzaW9uKGN4KSB7XG4gICAgY29uc3QgZmlyc3RFbGVtZW50ID0gY3hbMF07XG4gICAgY29uc3QgdmVyc2lvblN0cmluZyA9IGZpcnN0RWxlbWVudFtjeENvbnN0YW50cy5DWF9WRVJTSU9OXTtcblxuICAgIGNvbnN0IG1ham9yVmVyc2lvbiA9IGN4VXRpbC5nZXRDeE1ham9yVmVyc2lvbih2ZXJzaW9uU3RyaW5nKTtcblxuICAgIGlmIChtYWpvclZlcnNpb24gIT09IDIpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSBDWCB2ZXJzaW9uOiAnICsgdmVyc2lvblN0cmluZztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnQoY3gsIHRhcmdldEZvcm1hdCkge1xuICAgIHZlcmlmeVZlcnNpb24oY3gpO1xuICAgIHN3aXRjaCh0YXJnZXRGb3JtYXQpIHtcbiAgICAgICAgY2FzZSBsYXJnZU5ldHdvcmsuY29udmVydGVyLnRhcmdldEZvcm1hdDoge1xuICAgICAgICAgICAgcmV0dXJuIGxhcmdlTmV0d29yay5jb252ZXJ0ZXIuY29udmVydChjeCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBjeXRvc2NhcGVKUy5jb252ZXJ0ZXIudGFyZ2V0Rm9ybWF0OiB7XG4gICAgICAgICAgICByZXR1cm4gY3l0b3NjYXBlSlMuY29udmVydGVyLmNvbnZlcnQoY3gpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0OiBjb252ZXJ0XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb252ZXJ0ZXIuanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGxhcmdlTmV0d29ya0NvbnN0YW50cyA9IHJlcXVpcmUoJy4vbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gbG52Q29udmVydChjeCkge1xuICAgIFxuICAgIC8vRmlyc3QgcGFzcy4gXG4gICAgLy8gV2UgbWF5IG5lZWQgdG8gY29sbGVjdCBvYmplY3QgYXR0cmlidXRlcyB0byBjYWxjdWxhdGVcbiAgICAvLyBtYXBwaW5ncyBpbiB0aGUgc2Vjb25kIHBhc3MuIFxuICAgIGxldCBub2RlTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IGN4VmlzdWFsUHJvcGVydGllcztcblxuICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICBsZXQgZWRnZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICBsZXQgbm9kZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICBpZiAoY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyA9IGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgICAgICAgICBjeFV0aWwucHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyhjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeE5vZGVbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQgOiBjeElkLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogY3hOb2RlWyd6J10gPyBcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjeE5vZGVbJ3gnXSxjeE5vZGVbJ3knXSxjeE5vZGVbJ3onXV0gXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFtjeE5vZGVbJ3gnXSxjeE5vZGVbJ3knXV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZU1hcC5zZXQoY3hJZCwgbm9kZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeEVkZ2VbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRnZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQgOiBjeElkLFxuICAgICAgICAgICAgICAgICAgICBzIDogY3hFZGdlLnMudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgdCA6IGN4RWRnZS50LnRvU3RyaW5nKCkgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVkZ2VNYXAuc2V0KGN4SWQsIGVkZ2UpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICBjeFZpc3VhbFByb3BlcnRpZXMgPSBjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgXG4gICAgbGV0IG5vZGVWaWV3cyA9IFtdO1xuICAgIGxldCBlZGdlVmlld3MgPSBbXTtcblxuXG4gICAgLy9TZWNvbmQgcGFzcy4gXG4gICAgLy8gSGVyZSBpcyB3aGVyZSB0aGUgYWN0dWFsIG91dHB1dCBpcyBnZW5lcmF0ZWQuXG5cbiAgICAvL0ZpbmFsIHN0ZXBcbiAgICBub2RlTWFwLmZvckVhY2goKHZhbHVlLCBpZCkgPT4ge1xuICAgICAgICBub2RlVmlld3MucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICBlZGdlTWFwLmZvckVhY2goKHZhbHVlLCBpZCkgPT4ge1xuICAgICAgICBlZGdlVmlld3MucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgXG4gICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5ub2RlVmlld3NdID0gbm9kZVZpZXdzO1xuICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuZWRnZVZpZXdzXSA9IGVkZ2VWaWV3cztcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cblxuXG5jb25zdCBjb252ZXJ0ZXIgPSB7XG4gICAgdGFyZ2V0Rm9ybWF0OiAnbG52JyxcbiAgICBjb252ZXJ0OiAgKGN4KSA9PiB7XG4gICAgICAgIHJldHVybiBsbnZDb252ZXJ0KGN4KTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnZlcnRlcjogY29udmVydGVyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrLmpzIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgICdub2RlVmlld3MnOiAnbm9kZVZpZXdzJyxcbiAgICAnZWRnZVZpZXdzJzogJ2VkZ2VWaWV3cycsIFxuICAgICdpZCc6ICdpZCcsXG4gICAgJ3Bvc2l0aW9uJzogJ3Bvc2l0aW9uJyxcbiAgICAncyc6ICdzJyxcbiAgICAndCc6ICd0JyxcbiAgICAnbGFiZWwnOiAnbGFiZWwnLCBcbiAgICAnY29sb3InOiAnY29sb3InLFxuICAgICdsaW5lX2NvbG9yJzogJ2xpbmUtY29sb3InXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuLi9jeENvbnN0YW50cy5qcycpO1xuY29uc3QganNDb25zdGFudHMgPSByZXF1aXJlKCcuL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSkge1xuICAgIGNvbnN0IHRhcmdldFN0eWxlRW50cnkgPSBuZXcgTWFwKCk7XG4gICAgdGFyZ2V0U3R5bGVFbnRyeS5zZXQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpO1xuICAgIHJldHVybiB0YXJnZXRTdHlsZUVudHJ5O1xufVxuXG5jb25zdCBkZWZhdWx0UHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnc2hhcGUnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnd2lkdGgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnaGVpZ2h0JzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnYmFja2dyb3VuZC1vcGFjaXR5JzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdsYWJlbCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdsYWJlbC1jb2xvcic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnd2lkdGgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnb3BhY2l0eSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ2xpbmUtY29sb3InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9LFxufVxuXG5mdW5jdGlvbiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIGF0dHJpYnV0ZU5hbWUpIHtcbiAgICBjb25zdCBvdXRwdXQgPSB7fTtcbiAgICBvdXRwdXRbdGFyZ2V0U3R5bGVGaWVsZF0gPSAnZGF0YSgnICsgYXR0cmlidXRlTmFtZSArICcpJztcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnc2hhcGUnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICd3aWR0aCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ2hlaWdodCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdiYWNrZ3JvdW5kLW9wYWNpdHknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnbGFiZWwnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdsYWJlbC1jb2xvcic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICd3aWR0aCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ29wYWNpdHknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ2xpbmUtY29sb3InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG59XG5mdW5jdGlvbiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9ICdtYXBEYXRhKCcgKyBhdHRyaWJ1dGVOYW1lIFxuICAgICsgJywgJyArIG1pblZhbHVlIFxuICAgICsgJywgJyArIG1heFZhbHVlIFxuICAgICsgJywgJyArIG1pblZQIFxuICAgICsgJywgJyArIG1heFZQXG4gICAgKyAnKSc7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgbWFwRGF0YVByb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ3NoYXBlJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICd3aWR0aCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnaGVpZ2h0JzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdiYWNrZ3JvdW5kLW9wYWNpdHknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdsYWJlbCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnbGFiZWwtY29sb3InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICd3aWR0aCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnb3BhY2l0eSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdsaW5lLWNvbG9yJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKVxuICAgIH0sXG59XG5cblxuZnVuY3Rpb24gZ2V0Q1NTU3R5bGVFbnRyaWVzKGN4U3R5bGVFbnRyaWVzLCBlbnRpdHlUeXBlKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4U3R5bGVFbnRyaWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gY3hTdHlsZUVudHJpZXNba2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgY3NzRW50cmllcyA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgY3NzRW50cmllcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0SWRTZWxlY3RvcihpZCwgZWxlbWVudFR5cGUpIHtcbiAgICAvL25vZGUjaWQgb3IgZWRnZSNpZFxuICAgIHJldHVybiBlbGVtZW50VHlwZSArICcjJyArIGlkO1xufVxuXG5cblxuZnVuY3Rpb24gZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpIHtcbiAgICByZXR1cm4geyAnc2VsZWN0b3InOiBzZWxlY3RvciwgJ3N0eWxlJzogY3NzIH07XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIGluY2x1ZGVNaW4sIGluY2x1ZGVNYXgpIHtcbiAgICBjb25zdCBtaW5Db25kaXRpb24gPSBpbmNsdWRlTWluID8gJz49JyA6ICc+JztcbiAgICBjb25zdCBtYXhDb25kaXRpb24gPSBpbmNsdWRlTWF4ID8gJzw9JyA6ICc8JztcblxuICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snK2F0dHJpYnV0ZU5hbWUrJyAnICArIG1pbkNvbmRpdGlvbiArICcgJyttaW5WYWx1ZSsnXVsnK2F0dHJpYnV0ZU5hbWUrJyAnICsgbWF4Q29uZGl0aW9uICsgJyAnK21heFZhbHVlKyddJ1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzU3R5bGUoZW50aXR5VHlwZSwgcG9ydGFibGVQcm9wZXJ0eUtleSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgaWYgKG1hcERhdGFQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgcmV0dXJuIG1hcERhdGFQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnYXR0cmlidXRlJ107XG4gICAgY29uc3QgcmFuZ2VNYXBzID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgY29uc29sZS5sb2coJ2NvbnRpbnVvdXMgbWFwcGluZyBmb3IgJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgSlNPTi5zdHJpbmdpZnkocmFuZ2VNYXBzLCBudWxsLCAyKSk7XG4gICAgXG4gICAgcmFuZ2VNYXBzLmZvckVhY2goKHJhbmdlKT0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRDb250aW51b3VzU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIHJhbmdlLmluY2x1ZGVNaW4sIHJhbmdlLmluY2x1ZGVNYXgpO1xuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbnRpbnVvdXNTdHlsZShlbnRpdHlUeXBlLCBwb3J0YWJsZVByb3BlcnR5S2V5LCBhdHRyaWJ1dGVOYW1lLCByYW5nZS5taW4sIHJhbmdlLm1heCwgcmFuZ2UubWluVlBWYWx1ZSwgcmFuZ2UubWF4VlBWYWx1ZSk7XG4gICAgICAgIFxuICAgICAgICBvdXRwdXQucHVzaChnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIHN0eWxlKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSkge1xuICAgIGlmIChwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgIGNvbnN0IGNzcyA9IHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oY3hNYXBwaW5nRGVmaW5pdGlvbi5hdHRyaWJ1dGUpO1xuICAgICAgICByZXR1cm4gZ2V0U3R5bGVFbGVtZW50KGVudGl0eVR5cGUsIGNzcyk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXREaXNjcmV0ZVNlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURhdGFUeXBlLCBhdHRyaWJ1dGVWYWx1ZSkge1xuICAgIGlmIChhdHRyaWJ1dGVEYXRhVHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gXFwnJyArIGF0dHJpYnV0ZVZhbHVlICsgJ1xcJ10nO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ2Jvb2xlYW4nKSB7XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZVZhbHVlID09ICd0cnVlJykge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWz8nICsgYXR0cmlidXRlTmFtZSArICddJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICddWyEnICsgYXR0cmlidXRlTmFtZSArICddJztcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICcgPSAnICsgYXR0cmlidXRlVmFsdWUgKyAnXSc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzKHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgY29uc3QgYXR0dHJpYnV0ZVRvVmFsdWVNYXAgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydtYXAnXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnYXR0cmlidXRlJ107XG4gICAgY29uc3QgYXR0cmlidXRlRGF0YVR5cGUgPSBhdHRyaWJ1dGVUeXBlTWFwLmdldChhdHRyaWJ1dGVOYW1lKTtcbiAgICBhdHR0cmlidXRlVG9WYWx1ZU1hcC5mb3JFYWNoKChkaXNjcmV0ZU1hcCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnIGRpc2NyZXRlIG1hcCBmb3IgJyArIHBvcnRhYmxlUHJvcGVydHlLZXkgKyAnOiAnICsgZGlzY3JldGVNYXAudiArICcgKCcgKyBhdHRyaWJ1dGVOYW1lICsgJzwnICthdHRyaWJ1dGVEYXRhVHlwZSArJz4pIC0+ICcgKyBkaXNjcmV0ZU1hcC52cCk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXREaXNjcmV0ZVNlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURhdGFUeXBlLCBkaXNjcmV0ZU1hcC52KTtcbiAgICAgICBcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlTWFwID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShkaXNjcmV0ZU1hcC52cCk7XG4gICAgICAgICAgICBjb25zdCBjc3MgPSB7fTtcbiAgICAgICAgICAgIHN0eWxlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBjc3Nba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvdXRwdXQucHVzaChnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcykpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnICAgc3R5bGU6ICcgKyBKU09OLnN0cmluZ2lmeShjc3MpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICByZXR1cm4gb3V0cHV0OyAvL2dldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKTtcbn1cblxuZnVuY3Rpb24gZ2V0QnlwYXNzQ1NTRW50cnkoZW50aXR5VHlwZSwgY3hFbGVtZW50KSB7XG4gICBcbiAgICBjb25zdCBpZCA9IGN4RWxlbWVudC5wbztcbiAgICBjb25zdCBjc3MgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhjeEVsZW1lbnQudikuZm9yRWFjaCgocG9ydGFibGVQcm9wZXJ0eUtleSkgPT4ge1xuICAgICAgICBjb25zdCBwb3J0YWJsZVByb3BlcnR5VmFsdWUgPSBjeEVsZW1lbnQudltwb3J0YWJsZVByb3BlcnR5S2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlTWFwID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgc3R5bGVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGNzc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRJZFNlbGVjdG9yKGlkKTtcbiAgICByZXR1cm4gZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpO1xufVxuXG4vKiogXG4gKiBcbiovXG5mdW5jdGlvbiBnZXRDU1NNYXBwaW5nRW50cmllcyhcbiAgICBjeE1hcHBpbmdFbnRyaWVzLFxuICAgIGVudGl0eVR5cGUsXG4gICAgYXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhjeE1hcHBpbmdFbnRyaWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgY3hNYXBwaW5nRW50cnkgPSBjeE1hcHBpbmdFbnRyaWVzW2tleV07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiIG1hcHBpbmcgdHlwZTogXCIgKyBjeE1hcHBpbmdFbnRyeS50eXBlKTtcbiAgICAgICAgc3dpdGNoIChjeE1hcHBpbmdFbnRyeS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdjb250aW51b3VzJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRpbm91c01hcHBpbmdzID0gZ2V0Q29udGludW91c01hcHBpbmdDU1NFbnRyaWVzKGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCk7XG4gICAgICAgICAgICAgICAgY29udGlub3VzTWFwcGluZ3MuZm9yRWFjaCgoY29udGlub3VzTWFwcGluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChjb250aW5vdXNNYXBwaW5nKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAncGFzc3Rocm91Z2gnOiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdkaXNjcmV0ZSc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNjcmV0ZU1hcHBpbmdzID0gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyhrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApO1xuICAgICAgICAgICAgICAgIGRpc2NyZXRlTWFwcGluZ3MuZm9yRWFjaCgoZGlzY3JldGVNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGRpc2NyZXRlTWFwcGluZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IE5PREVfU0VMRUNUT1IgPSAnbm9kZSc7XG5jb25zdCBFREdFX1NFTEVDVE9SID0gJ2VkZ2UnO1xuXG5mdW5jdGlvbiBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgc3R5bGU6IFtdLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGxldCBkZWZhdWx0Q1NTTm9kZVN0eWxlID0gdW5kZWZpbmVkO1xuICAgIGxldCBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgbWFwcGluZ0NTU05vZGVTdHlsZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbWFwcGluZ0NTU0VkZ2VTdHlsZSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBieXBhc3NDU1NFbnRyaWVzID0gW107XG5cbiAgICBjeFZpc3VhbFByb3BlcnRpZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHZwQXQgPSB2cEVsZW1lbnQuYXQ7XG4gICAgICAgIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5TVFlMRSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2cEVsZW1lbnQudjtcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZXMgPSB2YWx1ZS5kZWZhdWx0O1xuXG4gICAgICAgICAgICBkZWZhdWx0Q1NTTm9kZVN0eWxlID0gZ2V0Q1NTU3R5bGVFbnRyaWVzKGRlZmF1bHRTdHlsZXMubm9kZSwgJ25vZGUnKTtcbiAgICAgICAgICAgIGRlZmF1bHRDU1NFZGdlU3R5bGUgPSBnZXRDU1NTdHlsZUVudHJpZXMoZGVmYXVsdFN0eWxlcy5lZGdlLCAnZWRnZScpO1xuXG4gICAgICAgICAgICBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gZGVmYXVsdFN0eWxlcy5uZXR3b3JrWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGVNYXBwaW5nID0gdmFsdWUubm9kZU1hcHBpbmc7XG4gICAgICAgICAgICBtYXBwaW5nQ1NTTm9kZVN0eWxlID0gZ2V0Q1NTTWFwcGluZ0VudHJpZXMobm9kZU1hcHBpbmcsICdub2RlJywgbm9kZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgICAgICBjb25zdCBlZGdlTWFwcGluZyA9IHZhbHVlLmVkZ2VNYXBwaW5nO1xuICAgICAgICAgICAgbWFwcGluZ0NTU0VkZ2VTdHlsZSA9IGdldENTU01hcHBpbmdFbnRyaWVzKGVkZ2VNYXBwaW5nLCAnZWRnZScsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHZwQXQgPT09IGN4Q29uc3RhbnRzLk4pIHtcbiAgICAgICAgICAgIGJ5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnbm9kZScsIHZwRWxlbWVudCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHZwQXQgPT09IGN4Q29uc3RhbnRzLkUpIHtcbiAgICAgICAgICAgIGJ5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnZWRnZScsIHZwRWxlbWVudCkpO1xuXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy9BZGQgZGVmYXVsdCBzdHlsZVxuICAgIG91dHB1dC5zdHlsZS5wdXNoKGdldFN0eWxlRWxlbWVudChOT0RFX1NFTEVDVE9SLCBkZWZhdWx0Q1NTTm9kZVN0eWxlKSk7XG4gICAgb3V0cHV0LnN0eWxlLnB1c2goZ2V0U3R5bGVFbGVtZW50KEVER0VfU0VMRUNUT1IsIGRlZmF1bHRDU1NFZGdlU3R5bGUpKTtcblxuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgbWFwcGluZ0NTU05vZGVTdHlsZSk7XG4gICAgb3V0cHV0LnN0eWxlLnB1c2guYXBwbHkob3V0cHV0LnN0eWxlLCBtYXBwaW5nQ1NTRWRnZVN0eWxlKTtcblxuICAgIG91dHB1dFsnYmFja2dyb3VuZC1jb2xvciddID0gY3NzTmV0d29ya0JhY2tncm91bmRDb2xvcjtcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cblxuXG5mdW5jdGlvbiBnZXREYXRhKHYsIGF0dHJpYnV0ZU5hbWVNYXAsIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIGxldCBkYXRhID0ge307XG4gICAgT2JqZWN0LmtleXModikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICBkYXRhW25ld0tleV0gPSB2W2tleV07XG4gICAgfSk7XG4gICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKCFkYXRhW2tleV0pIHtcbiAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5cblxuXG5jb25zdCBjb252ZXJ0ZXIgPSB7XG4gICAgdGFyZ2V0Rm9ybWF0OiAnY3l0b3NjYXBlSlMnLFxuICAgIGNvbnZlcnQ6IChjeCkgPT4ge1xuICAgICAgICBjb25zdCBvdXRwdXQgPSB7XG4gICAgICAgICAgICBzdHlsZTogW10sXG4gICAgICAgICAgICBlbGVtZW50czoge30sXG4gICAgICAgICAgICBsYXlvdXQ6IHt9LFxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbm9kZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICBcbiAgICAgICAgbGV0IGN4VmlzdWFsUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcblxuICAgICAgICBsZXQgbm9kZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBlZGdlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBsZXQgbm9kZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBlZGdlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBsZXQgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyA9IGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uczogXCIgKyBKU09OLnN0cmluZ2lmeShjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucywgbnVsbCwgMikpO1xuICAgICAgICAgICAgICAgIGN4VXRpbC5wcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zKGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLFxuICAgICAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hOb2RlWydpZCddLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVNYXAuc2V0KGN4SWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjeE5vZGVbJ2lkJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB2OiBjeE5vZGVbJ3YnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IGN4Tm9kZVsneCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IGN4Tm9kZVsneSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHo6IGN4Tm9kZVsneiddXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhub2RlQXR0cmlidXRlVHlwZU1hcCwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4Tm9kZVsndiddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3hJZCA9IGN4RWRnZVsnaWQnXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBlZGdlTWFwLnNldChjeElkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogY3hFZGdlWydpZCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgdjogY3hFZGdlWyd2J10sXG4gICAgICAgICAgICAgICAgICAgICAgICBzOiBjeEVkZ2VbJ3MnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHQ6IGN4RWRnZVsndCddXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhlZGdlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGN4RWRnZVsndiddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXSkge1xuICAgICAgICAgICAgICAgIGN4VmlzdWFsUHJvcGVydGllcyA9IGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLmZvckVhY2goKGluZmVycmVkVHlwZSwgYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZmVycmVkIGF0dHJpYnV0ZSB0eXBlIGZvciBub2RlOiAnICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcC5mb3JFYWNoKChpbmZlcnJlZFR5cGUsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3IgZWRnZTogJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9BZGQgbm9kZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydub2RlcyddID0gW107XG4gICAgICAgIG91dHB1dC5lbGVtZW50c1snZWRnZXMnXSA9IFtdO1xuICAgICAgICBub2RlTWFwLmZvckVhY2goKGN4Tm9kZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ge307XG4gICAgICAgICAgICBlbGVtZW50WydkYXRhJ10gPSBnZXREYXRhKGN4Tm9kZS52LCBub2RlQXR0cmlidXRlTmFtZU1hcCwgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ2lkJ10gPSBjeE5vZGUuaWQ7XG4gICAgICAgICAgICBlbGVtZW50Wydwb3NpdGlvbiddID0ge1xuICAgICAgICAgICAgICAgIHg6IGN4Tm9kZS5sYXlvdXQueCxcbiAgICAgICAgICAgICAgICB5OiBjeE5vZGUubGF5b3V0LnlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dHB1dC5lbGVtZW50cy5ub2Rlcy5wdXNoKGVsZW1lbnQpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vQWRkIGVkZ2VzXG4gICAgICAgIG91dHB1dC5lbGVtZW50c1snZWRnZXMnXSA9IFtdO1xuICAgICAgICBlZGdlTWFwLmZvckVhY2goKGN4RWRnZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ge307XG4gICAgICAgICAgICBlbGVtZW50WydkYXRhJ10gPSBnZXREYXRhKGN4RWRnZS52LCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ2lkJ10gPSBjeEVkZ2UuaWQ7XG4gICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ3NvdXJjZSddID0gY3hFZGdlLnM7XG4gICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ3RhcmdldCddID0gY3hFZGdlLnQ7XG4gICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMuZWRnZXMucHVzaChlbGVtZW50KVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzdHlsZSA9IGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBub2RlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgIG91dHB1dC5zdHlsZSA9IHN0eWxlLnN0eWxlO1xuICAgICAgICBvdXRwdXRbJ2JhY2tncm91bmQtY29sb3InXSA9IHN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnZlcnRlcjogY29udmVydGVyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKUy5qcyIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICAnc2hhcGUnOiAnc2hhcGUnLFxuICAgICd3aWR0aCc6ICd3aWR0aCcsIFxuICAgICdoZWlnaHQnOiAnaGVpZ2h0JyxcbiAgICAnYmFja2dyb3VuZF9jb2xvcic6ICdiYWNrZ3JvdW5kLWNvbG9yJyxcbiAgICAnYmFja2dyb3VuZF9vcGFjaXR5JzogJ2JhY2tncm91bmQtb3BhY2l0eScsXG4gICAgJ2xhYmVsJzogJ2xhYmVsJyxcbiAgICAnbGFiZWxfY29sb3InOiAnbGFiZWwtY29sb3InLCBcbiAgICAnb3BhY2l0eSc6ICdvcGFjaXR5JyxcbiAgICAnbGluZV9jb2xvcic6ICdsaW5lLWNvbG9yJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==