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
    'CX_VERSION': 'CXVersion',
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

module.exports = {
    getCxVersion: getCxVersion,
    getCxMajorVersion: getCxMajorVersion
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
var cytoscapeJS = __webpack_require__(5);
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
var cxUtil = __webpack_require__(1);

function lnvConvert(cx) {
    var output = {};

    //First pass. 
    // We may need to collect object attributes to calculate
    // mappings in the second pass. 
    var nodeValueMap = {};
    var nodeLayoutMap = {};
    var cxNodes = void 0;
    var cxEdges = void 0;
    var cxVisualProperties = void 0;
    cx.forEach(function (element) {
        if (element['nodes']) {
            cxNodes = element['nodes'];
            cxNodes.forEach(function (cxNode) {
                var cxId = cxNode['id'].toString();
                nodeValueMap[cxId] = cxNode['v'];
                nodeLayoutMap[cxId] = {
                    x: cxNode['x'],
                    y: cxNode['y'],
                    z: cxNode['z']
                };
            });
        } else if (element['edges']) {
            cxEdges = element['edges'];
        } else if (element['visualProperties']) {
            cxVisualProperties = element['visualProperties'];
        }
    });

    console.log("attributes: " + JSON.stringify(nodeValueMap));
    console.log("layout: " + JSON.stringify(nodeLayoutMap));

    //Second pass. 
    // Here is where the actual output is generated.
    output.nodeCount = cxNodes.length;
    output.edgeCount = cxEdges.length;
    output.visualPropertyCount = cxVisualProperties.length;

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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var cxConstants = __webpack_require__(0);
var jsConstants = __webpack_require__(6);
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
        } else if (vpElement == cxConstants.N) {
            //Bypass style node
        } else if (vpElement == cxConstants.E) {
            //Bypass style edge
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

var NODE_SELECTOR = 'node';
var EDGE_SELECTOR = 'edge';

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

        var cxAttributeDeclarations = undefined;
        var cxVisualProperties = undefined;

        var nodeAttributeTypeMap = new Map();
        var edgeAttributeTypeMap = new Map();

        var nodeAttributeNameMap = new Map();
        var edgeAttributeNameMap = new Map();

        var nodeAttributeDefaultValueMap = new Map();
        var edgeAttributeDefaultValueMap = new Map();

        var updateInferredTypes = function updateInferredTypes(attributeTypeMap, attributeNameMap, v) {
            Object.keys(v).forEach(function (key) {
                if (!attributeTypeMap.has(key)) {
                    var value = v[key];
                    var inferredType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
                    var newKey = attributeNameMap.has(key) ? attributeNameMap.get(key) : key;
                    attributeTypeMap.set(newKey, inferredType);
                }
            });
        };

        cx.forEach(function (cxAspect) {
            if (cxAspect['attributeDeclarations']) {
                cxAttributeDeclarations = cxAspect['attributeDeclarations'];
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
                    updateInferredTypes(nodeAttributeTypeMap, nodeAttributeNameMap, cxNode['v']);
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
                    updateInferredTypes(edgeAttributeTypeMap, edgeAttributeNameMap, cxEdge['v']);
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
/* 6 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMWNlZWMyYzQ4MDRjNGM4MDE5MiIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJOT0RFIiwiRURHRSIsIk5FVFdPUksiLCJOT0RFUyIsIkVER0VTIiwiSUQiLCJYIiwiWSIsIloiLCJWIiwiQVQiLCJOIiwiRSIsIlZJU1VBTF9QUk9QRVJUSUVTIiwiREVGQVVMVCIsIlNUWUxFIiwiZ2V0Q3hWZXJzaW9uIiwidmVyc2lvblN0cmluZyIsInZlcnNpb25BcnJheSIsInNwbGl0IiwibWFwIiwibnVtYmVyU3RyaW5nIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXNOYU4iLCJlbGVtZW50IiwiZ2V0Q3hNYWpvclZlcnNpb24iLCJjb252ZXJ0ZXIiLCJyZXF1aXJlIiwiY29udmVydCIsImN4IiwidGFyZ2V0Rm9ybWF0IiwiY3hDb25zdGFudHMiLCJsYXJnZU5ldHdvcmsiLCJjeXRvc2NhcGVKUyIsImN4VXRpbCIsInZlcmlmeVZlcnNpb24iLCJmaXJzdEVsZW1lbnQiLCJDWF9WRVJTSU9OIiwibWFqb3JWZXJzaW9uIiwibG52Q29udmVydCIsIm91dHB1dCIsIm5vZGVWYWx1ZU1hcCIsIm5vZGVMYXlvdXRNYXAiLCJjeE5vZGVzIiwiY3hFZGdlcyIsImN4VmlzdWFsUHJvcGVydGllcyIsImN4Tm9kZSIsImN4SWQiLCJ0b1N0cmluZyIsIngiLCJ5IiwieiIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5Iiwibm9kZUNvdW50IiwiZWRnZUNvdW50IiwidmlzdWFsUHJvcGVydHlDb3VudCIsImpzQ29uc3RhbnRzIiwic2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCIsInRhcmdldFN0eWxlRmllbGQiLCJwb3J0YWJsZVByb3BlcnRWYWx1ZSIsInRhcmdldFN0eWxlRW50cnkiLCJNYXAiLCJzZXQiLCJkZWZhdWx0UHJvcGVydHlDb252ZXJ0IiwicG9ydGFibGVQcm9wZXJ0eVZhbHVlIiwic2hhcGUiLCJ3aWR0aCIsImhlaWdodCIsImJhY2tncm91bmRfY29sb3IiLCJiYWNrZ3JvdW5kX29wYWNpdHkiLCJsYWJlbCIsImxhYmVsX2NvbG9yIiwib3BhY2l0eSIsImxpbmVfY29sb3IiLCJzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0IiwiYXR0cmlidXRlTmFtZSIsInBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0IiwibWluVmFsdWUiLCJtYXhWYWx1ZSIsIm1pblZQIiwibWF4VlAiLCJtYXBEYXRhUHJvcGVydHlDb252ZXJ0IiwiZ2V0Q1NTU3R5bGVFbnRyaWVzIiwiY3hTdHlsZUVudHJpZXMiLCJlbnRpdHlUeXBlIiwia2V5cyIsImtleSIsImNzc0VudHJpZXMiLCJ2YWx1ZSIsImdldElkU2VsZWN0b3IiLCJpZCIsImVsZW1lbnRUeXBlIiwiZ2V0U3R5bGVFbGVtZW50Iiwic2VsZWN0b3IiLCJjc3MiLCJnZXRDb250aW51b3VzU2VsZWN0b3IiLCJpbmNsdWRlTWluIiwiaW5jbHVkZU1heCIsIm1pbkNvbmRpdGlvbiIsIm1heENvbmRpdGlvbiIsImdldENvbnRpbnVvdXNTdHlsZSIsInBvcnRhYmxlUHJvcGVydHlLZXkiLCJnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMiLCJjeE1hcHBpbmdEZWZpbml0aW9uIiwiYXR0cmlidXRlVHlwZU1hcCIsInJhbmdlTWFwcyIsInJhbmdlIiwibWluIiwibWF4Iiwic3R5bGUiLCJtaW5WUFZhbHVlIiwibWF4VlBWYWx1ZSIsInB1c2giLCJnZXRQYXNzdGhyb3VnaE1hcHBpbmdDU1NFbnRyeSIsImF0dHJpYnV0ZSIsImdldERpc2NyZXRlU2VsZWN0b3IiLCJhdHRyaWJ1dGVEYXRhVHlwZSIsImF0dHJpYnV0ZVZhbHVlIiwiZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyIsImF0dHRyaWJ1dGVUb1ZhbHVlTWFwIiwiZ2V0IiwiZGlzY3JldGVNYXAiLCJ2IiwidnAiLCJzdHlsZU1hcCIsImdldENTU01hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cmllcyIsImN4TWFwcGluZ0VudHJ5IiwidHlwZSIsImNvbnRpbm91c01hcHBpbmdzIiwiZGVmaW5pdGlvbiIsImNvbnRpbm91c01hcHBpbmciLCJkaXNjcmV0ZU1hcHBpbmdzIiwiZGlzY3JldGVNYXBwaW5nIiwiZ2V0VmlzdWFsUHJvcGVydGllcyIsIm5vZGVBdHRyaWJ1dGVUeXBlTWFwIiwiZWRnZUF0dHJpYnV0ZVR5cGVNYXAiLCJ1bmRlZmluZWQiLCJkZWZhdWx0Q1NTTm9kZVN0eWxlIiwiZGVmYXVsdENTU0VkZ2VTdHlsZSIsImNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IiLCJtYXBwaW5nQ1NTTm9kZVN0eWxlIiwibWFwcGluZ0NTU0VkZ2VTdHlsZSIsInZwRWxlbWVudCIsInZwQXQiLCJhdCIsImRlZmF1bHRTdHlsZXMiLCJkZWZhdWx0Iiwibm9kZSIsImVkZ2UiLCJuZXR3b3JrIiwibm9kZU1hcHBpbmciLCJlZGdlTWFwcGluZyIsIk5PREVfU0VMRUNUT1IiLCJFREdFX1NFTEVDVE9SIiwiYXBwbHkiLCJnZXREYXRhIiwiYXR0cmlidXRlTmFtZU1hcCIsImF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImRhdGEiLCJuZXdLZXkiLCJoYXMiLCJ1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwIiwiYXR0cmlidXRlRGVjbGFyYXRpb25zIiwiYXR0cmlidXRlRGVjbGFyYXRpb24iLCJkIiwidXBkYXRlQXR0cmlidXRlTmFtZU1hcCIsImEiLCJ1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJlbGVtZW50cyIsImxheW91dCIsIm5vZGVNYXAiLCJlZGdlTWFwIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJ1cGRhdGVJbmZlcnJlZFR5cGVzIiwiaW5mZXJyZWRUeXBlIiwiY3hBc3BlY3QiLCJjeEF0dHJpYnV0ZURlY2xhcmF0aW9uIiwibm9kZXMiLCJlZGdlcyIsImN4RWRnZSIsInMiLCJ0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7Ozs7O0FDNURBQSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPQyxNQUFQLENBQWM7QUFDM0Isa0JBQWMsV0FEYTtBQUUzQkMsVUFBTSxN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RGtCO0FBRTNCLGFBQVMsT0FGa0I7QUFHM0IsY0FBVSxRQUhpQjtBQUkzQix3QkFBb0Isa0JBSk87QUFLM0IsMEJBQXNCLG9CQUxLO0FBTTNCLGFBQVMsT0FOa0I7QUFPM0IsbUJBQWUsYUFQWTtBQVEzQixlQUFXLFNBUmdCO0FBUzNCLGtCQUFjO0FBVGEsQ0FBZCxDQUFqQixDIiwiZmlsZSI6Ii4vYnVpbGQvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3hWaXpDb252ZXJ0ZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiY3hWaXpDb252ZXJ0ZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGMxY2VlYzJjNDgwNGM0YzgwMTkyIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgICdDWF9WRVJTSU9OJzogJ0NYVmVyc2lvbicsXG4gICAgTk9ERTogJ25vZGUnLFxuICAgIEVER0U6ICdlZGdlJyxcbiAgICBORVRXT1JLOiAnbmV0d29yaycsXG5cbiAgICBOT0RFUzogJ25vZGVzJyxcbiAgICBFREdFUzogJ2VkZ2VzJyxcblxuICAgIElEOiAnaWQnLFxuICAgIFg6ICd4JyxcbiAgICBZOiAneScsXG4gICAgWjogJ3onLFxuICAgIFY6ICd2JyxcblxuICAgIEFUOiAnYXQnLFxuICAgIE46ICduJyxcbiAgICBFOiAnZScsXG5cbiAgICBWSVNVQUxfUFJPUEVSVElFUzogJ3Zpc3VhbFByb3BlcnRpZXMnLFxuICAgIERFRkFVTFQ6ICdkZWZhdWx0JyxcblxuICAgIFNUWUxFOiAnc3R5bGUnXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hDb25zdGFudHMuanMiLCJmdW5jdGlvbiBnZXRDeFZlcnNpb24odmVyc2lvblN0cmluZykge1xuICAgIGNvbnN0IHZlcnNpb25BcnJheSA9IHZlcnNpb25TdHJpbmcuc3BsaXQoJy4nKS5tYXAoKG51bWJlclN0cmluZykgPT4geyByZXR1cm4gcGFyc2VJbnQobnVtYmVyU3RyaW5nLCAxMCk7IH0pO1xuICAgIGlmICh2ZXJzaW9uQXJyYXkubGVuZ3RoICE9PSAyICYmIHZlcnNpb25BcnJheS5sZW5ndGggIT0gMykge1xuICAgICAgICB0aHJvdyAnSW5jb21wYXRpYmxlIHZlcnNpb24gZm9ybWF0OiAnICsgdmVyc2lvblN0cmluZztcbiAgICB9XG4gICAgdmVyc2lvbkFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGlmIChpc05hTihlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgJ05vbi1pbnRlZ2VyIHZhbHVlIGluIHZlcnNpb24gc3RyaW5nOiAnICsgdmVyc2lvblN0cmluZztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2ZXJzaW9uQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGdldEN4TWFqb3JWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcbiAgICByZXR1cm4gdmVyc2lvblN0cmluZyA/IGdldEN4VmVyc2lvbih2ZXJzaW9uU3RyaW5nKVswXSA6IDE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEN4VmVyc2lvbjogZ2V0Q3hWZXJzaW9uLFxuICAgIGdldEN4TWFqb3JWZXJzaW9uOiBnZXRDeE1ham9yVmVyc2lvblxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hVdGlsLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb252ZXJ0ZXIgPSByZXF1aXJlICgnLi9jb252ZXJ0ZXIuanMnKTtcblxubW9kdWxlLmV4cG9ydHMuY29udmVydCA9IChjeCwgdGFyZ2V0Rm9ybWF0KSA9PiB7IHJldHVybiBjb252ZXJ0ZXIuY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0KTsgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmsgPSByZXF1aXJlICgnLi9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrLmpzJyk7IFxuY29uc3QgY3l0b3NjYXBlSlMgPSByZXF1aXJlICgnLi9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKUy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gdmVyaWZ5VmVyc2lvbihjeCkge1xuICAgIGNvbnN0IGZpcnN0RWxlbWVudCA9IGN4WzBdO1xuICAgIGNvbnN0IHZlcnNpb25TdHJpbmcgPSBmaXJzdEVsZW1lbnRbY3hDb25zdGFudHMuQ1hfVkVSU0lPTl07XG5cbiAgICBjb25zdCBtYWpvclZlcnNpb24gPSBjeFV0aWwuZ2V0Q3hNYWpvclZlcnNpb24odmVyc2lvblN0cmluZyk7XG5cbiAgICBpZiAobWFqb3JWZXJzaW9uICE9PSAyKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgQ1ggdmVyc2lvbjogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQpIHtcbiAgICB2ZXJpZnlWZXJzaW9uKGN4KTtcbiAgICBzd2l0Y2godGFyZ2V0Rm9ybWF0KSB7XG4gICAgICAgIGNhc2UgbGFyZ2VOZXR3b3JrLmNvbnZlcnRlci50YXJnZXRGb3JtYXQ6IHtcbiAgICAgICAgICAgIHJldHVybiBsYXJnZU5ldHdvcmsuY29udmVydGVyLmNvbnZlcnQoY3gpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgY3l0b3NjYXBlSlMuY29udmVydGVyLnRhcmdldEZvcm1hdDoge1xuICAgICAgICAgICAgcmV0dXJuIGN5dG9zY2FwZUpTLmNvbnZlcnRlci5jb252ZXJ0KGN4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydDogY29udmVydFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udmVydGVyLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gbG52Q29udmVydChjeCkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcblxuICAgIC8vRmlyc3QgcGFzcy4gXG4gICAgLy8gV2UgbWF5IG5lZWQgdG8gY29sbGVjdCBvYmplY3QgYXR0cmlidXRlcyB0byBjYWxjdWxhdGVcbiAgICAvLyBtYXBwaW5ncyBpbiB0aGUgc2Vjb25kIHBhc3MuIFxuICAgIGxldCBub2RlVmFsdWVNYXAgPSB7fTtcbiAgICBsZXQgbm9kZUxheW91dE1hcCA9IHt9O1xuICAgIGxldCBjeE5vZGVzO1xuICAgIGxldCBjeEVkZ2VzO1xuICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXM7XG4gICAgY3guZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgY3hOb2RlcyA9IGVsZW1lbnRbJ25vZGVzJ107XG4gICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeE5vZGVbJ2lkJ10udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBub2RlVmFsdWVNYXBbY3hJZF0gPSBjeE5vZGVbJ3YnXTtcbiAgICAgICAgICAgICAgICBub2RlTGF5b3V0TWFwW2N4SWRdID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBjeE5vZGVbJ3gnXSxcbiAgICAgICAgICAgICAgICAgICAgeTogY3hOb2RlWyd5J10sXG4gICAgICAgICAgICAgICAgICAgIHo6IGN4Tm9kZVsneiddXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50WydlZGdlcyddKSB7XG4gICAgICAgICAgICBjeEVkZ2VzID0gZWxlbWVudFsnZWRnZXMnXTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50Wyd2aXN1YWxQcm9wZXJ0aWVzJ10pIHtcbiAgICAgICAgICAgIGN4VmlzdWFsUHJvcGVydGllcyA9IGVsZW1lbnRbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coXCJhdHRyaWJ1dGVzOiBcIiArIEpTT04uc3RyaW5naWZ5KG5vZGVWYWx1ZU1hcCkpO1xuICAgIGNvbnNvbGUubG9nKFwibGF5b3V0OiBcIiArIEpTT04uc3RyaW5naWZ5KG5vZGVMYXlvdXRNYXApKTtcblxuICAgIC8vU2Vjb25kIHBhc3MuIFxuICAgIC8vIEhlcmUgaXMgd2hlcmUgdGhlIGFjdHVhbCBvdXRwdXQgaXMgZ2VuZXJhdGVkLlxuICAgIG91dHB1dC5ub2RlQ291bnQgPSBjeE5vZGVzLmxlbmd0aDtcbiAgICBvdXRwdXQuZWRnZUNvdW50ID0gY3hFZGdlcy5sZW5ndGg7XG4gICAgb3V0cHV0LnZpc3VhbFByb3BlcnR5Q291bnQgPSBjeFZpc3VhbFByb3BlcnRpZXMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdsbnYnLFxuICAgIGNvbnZlcnQ6ICAoY3gpID0+IHtcbiAgICAgICAgcmV0dXJuIGxudkNvbnZlcnQoY3gpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydGVyOiBjb252ZXJ0ZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmsuanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGpzQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9jeXRvc2NhcGVKU0NvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpIHtcbiAgICBjb25zdCB0YXJnZXRTdHlsZUVudHJ5ID0gbmV3IE1hcCgpO1xuICAgIHRhcmdldFN0eWxlRW50cnkuc2V0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKTtcbiAgICByZXR1cm4gdGFyZ2V0U3R5bGVFbnRyeTtcbn1cblxuY29uc3QgZGVmYXVsdFByb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ3NoYXBlJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ3dpZHRoJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ2hlaWdodCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ2JhY2tncm91bmQtb3BhY2l0eSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnbGFiZWwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnbGFiZWwtY29sb3InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ3dpZHRoJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ29wYWNpdHknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLm9wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdsaW5lLWNvbG9yJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbn1cblxuZnVuY3Rpb24gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgY29uc3Qgb3V0cHV0ID0ge307XG4gICAgb3V0cHV0W3RhcmdldFN0eWxlRmllbGRdID0gJ2RhdGEoJyArIGF0dHJpYnV0ZU5hbWUgKyAnKSc7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgcGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ3NoYXBlJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuc2hhcGUsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnd2lkdGgnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdoZWlnaHQnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfY29sb3IsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnYmFja2dyb3VuZC1vcGFjaXR5JzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ2xhYmVsJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnbGFiZWwtY29sb3InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgYXR0cmlidXRlTmFtZSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnd2lkdGgnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdvcGFjaXR5JzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdsaW5lLWNvbG9yJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGluZV9jb2xvciwgYXR0cmlidXRlTmFtZSlcbiAgICB9LFxufVxuZnVuY3Rpb24gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBvdXRwdXRbdGFyZ2V0U3R5bGVGaWVsZF0gPSAnbWFwRGF0YSgnICsgYXR0cmlidXRlTmFtZSBcbiAgICArICcsICcgKyBtaW5WYWx1ZSBcbiAgICArICcsICcgKyBtYXhWYWx1ZSBcbiAgICArICcsICcgKyBtaW5WUCBcbiAgICArICcsICcgKyBtYXhWUFxuICAgICsgJyknO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IG1hcERhdGFQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdzaGFwZSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnd2lkdGgnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ2hlaWdodCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnYmFja2dyb3VuZC1vcGFjaXR5JzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnbGFiZWwnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ2xhYmVsLWNvbG9yJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUClcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnd2lkdGgnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ29wYWNpdHknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnbGluZS1jb2xvcic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUClcbiAgICB9LFxufVxuXG5cbmZ1bmN0aW9uIGdldENTU1N0eWxlRW50cmllcyhjeFN0eWxlRW50cmllcywgZW50aXR5VHlwZSkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhjeFN0eWxlRW50cmllcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGN4U3R5bGVFbnRyaWVzW2tleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW2tleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGNzc0VudHJpZXMgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW2tleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIGNzc0VudHJpZXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIG91dHB1dFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldElkU2VsZWN0b3IoaWQsIGVsZW1lbnRUeXBlKSB7XG4gICAgLy9ub2RlI2lkIG9yIGVkZ2UjaWRcbiAgICByZXR1cm4gZWxlbWVudFR5cGUgKyAnIycgKyBpZDtcbn1cblxuXG5cbmZ1bmN0aW9uIGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKSB7XG4gICAgcmV0dXJuIHsgJ3NlbGVjdG9yJzogc2VsZWN0b3IsICdzdHlsZSc6IGNzcyB9O1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBpbmNsdWRlTWluLCBpbmNsdWRlTWF4KSB7XG4gICAgY29uc3QgbWluQ29uZGl0aW9uID0gaW5jbHVkZU1pbiA/ICc+PScgOiAnPic7XG4gICAgY29uc3QgbWF4Q29uZGl0aW9uID0gaW5jbHVkZU1heCA/ICc8PScgOiAnPCc7XG5cbiAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJythdHRyaWJ1dGVOYW1lKycgJyAgKyBtaW5Db25kaXRpb24gKyAnICcrbWluVmFsdWUrJ11bJythdHRyaWJ1dGVOYW1lKycgJyArIG1heENvbmRpdGlvbiArICcgJyttYXhWYWx1ZSsnXSdcbn1cblxuZnVuY3Rpb24gZ2V0Q29udGludW91c1N0eWxlKGVudGl0eVR5cGUsIHBvcnRhYmxlUHJvcGVydHlLZXksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIGlmIChtYXBEYXRhUHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgIHJldHVybiBtYXBEYXRhUHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0Q29udGludW91c01hcHBpbmdDU1NFbnRyaWVzKHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ2F0dHJpYnV0ZSddO1xuICAgIGNvbnN0IHJhbmdlTWFwcyA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ21hcCddO1xuICAgIGNvbnNvbGUubG9nKCdjb250aW51b3VzIG1hcHBpbmcgZm9yICcgKyBhdHRyaWJ1dGVOYW1lICsgJzogJyArIEpTT04uc3RyaW5naWZ5KHJhbmdlTWFwcywgbnVsbCwgMikpO1xuICAgIFxuICAgIHJhbmdlTWFwcy5mb3JFYWNoKChyYW5nZSk9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0Q29udGludW91c1NlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIHJhbmdlLm1pbiwgcmFuZ2UubWF4LCByYW5nZS5pbmNsdWRlTWluLCByYW5nZS5pbmNsdWRlTWF4KTtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb250aW51b3VzU3R5bGUoZW50aXR5VHlwZSwgcG9ydGFibGVQcm9wZXJ0eUtleSwgYXR0cmlidXRlTmFtZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIHJhbmdlLm1pblZQVmFsdWUsIHJhbmdlLm1heFZQVmFsdWUpO1xuICAgICAgICBcbiAgICAgICAgb3V0cHV0LnB1c2goZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBzdHlsZSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUpIHtcbiAgICBpZiAocGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICBjb25zdCBjc3MgPSBwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGN4TWFwcGluZ0RlZmluaXRpb24uYXR0cmlidXRlKTtcbiAgICAgICAgcmV0dXJuIGdldFN0eWxlRWxlbWVudChlbnRpdHlUeXBlLCBjc3MpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEYXRhVHlwZSwgYXR0cmlidXRlVmFsdWUpIHtcbiAgICBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyA9IFxcJycgKyBhdHRyaWJ1dGVWYWx1ZSArICdcXCddJztcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZURhdGFUeXBlID09ICdib29sZWFuJykge1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVWYWx1ZSA9PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1s/JyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnXVshJyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gJyArIGF0dHJpYnV0ZVZhbHVlICsgJ10nO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyhwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIGNvbnN0IGF0dHRyaWJ1dGVUb1ZhbHVlTWFwID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ2F0dHJpYnV0ZSddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZURhdGFUeXBlID0gYXR0cmlidXRlVHlwZU1hcC5nZXQoYXR0cmlidXRlTmFtZSk7XG4gICAgYXR0dHJpYnV0ZVRvVmFsdWVNYXAuZm9yRWFjaCgoZGlzY3JldGVNYXApID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJyBkaXNjcmV0ZSBtYXAgZm9yICcgKyBwb3J0YWJsZVByb3BlcnR5S2V5ICsgJzogJyArIGRpc2NyZXRlTWFwLnYgKyAnICgnICsgYXR0cmlidXRlTmFtZSArICc8JyArYXR0cmlidXRlRGF0YVR5cGUgKyc+KSAtPiAnICsgZGlzY3JldGVNYXAudnApO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0RGlzY3JldGVTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEYXRhVHlwZSwgZGlzY3JldGVNYXAudik7XG4gICAgICAgXG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZU1hcCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oZGlzY3JldGVNYXAudnApO1xuICAgICAgICAgICAgY29uc3QgY3NzID0ge307XG4gICAgICAgICAgICBzdHlsZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY3NzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyAgIHN0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkoY3NzKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIG91dHB1dDsgLy9nZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcyk7XG59XG5cbi8qKiBcbiAqIFxuKi9cbmZ1bmN0aW9uIGdldENTU01hcHBpbmdFbnRyaWVzKFxuICAgIGN4TWFwcGluZ0VudHJpZXMsXG4gICAgZW50aXR5VHlwZSxcbiAgICBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGN4TWFwcGluZ0VudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBjeE1hcHBpbmdFbnRyeSA9IGN4TWFwcGluZ0VudHJpZXNba2V5XTtcbiAgICAgICAgY29uc29sZS5sb2coXCIgbWFwcGluZyB0eXBlOiBcIiArIGN4TWFwcGluZ0VudHJ5LnR5cGUpO1xuICAgICAgICBzd2l0Y2ggKGN4TWFwcGluZ0VudHJ5LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2NvbnRpbnVvdXMnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGlub3VzTWFwcGluZ3MgPSBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKTtcbiAgICAgICAgICAgICAgICBjb250aW5vdXNNYXBwaW5ncy5mb3JFYWNoKChjb250aW5vdXNNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGNvbnRpbm91c01hcHBpbmcpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdwYXNzdGhyb3VnaCc6IHtcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChnZXRQYXNzdGhyb3VnaE1hcHBpbmdDU1NFbnRyeShrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2Rpc2NyZXRlJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlTWFwcGluZ3MgPSBnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzKGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCk7XG4gICAgICAgICAgICAgICAgZGlzY3JldGVNYXBwaW5ncy5mb3JFYWNoKChkaXNjcmV0ZU1hcHBpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goZGlzY3JldGVNYXBwaW5nKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgc3R5bGU6IFtdLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGxldCBkZWZhdWx0Q1NTTm9kZVN0eWxlID0gdW5kZWZpbmVkO1xuICAgIGxldCBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgbWFwcGluZ0NTU05vZGVTdHlsZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbWFwcGluZ0NTU0VkZ2VTdHlsZSA9IHVuZGVmaW5lZDtcblxuICAgIGN4VmlzdWFsUHJvcGVydGllcy5mb3JFYWNoKCh2cEVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgdnBBdCA9IHZwRWxlbWVudC5hdDtcbiAgICAgICAgaWYgKHZwQXQgPT09IGN4Q29uc3RhbnRzLlNUWUxFKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZwRWxlbWVudC52O1xuICAgICAgICAgICAgY29uc3QgZGVmYXVsdFN0eWxlcyA9IHZhbHVlLmRlZmF1bHQ7XG5cbiAgICAgICAgICAgIGRlZmF1bHRDU1NOb2RlU3R5bGUgPSBnZXRDU1NTdHlsZUVudHJpZXMoZGVmYXVsdFN0eWxlcy5ub2RlLCAnbm9kZScpO1xuICAgICAgICAgICAgZGVmYXVsdENTU0VkZ2VTdHlsZSA9IGdldENTU1N0eWxlRW50cmllcyhkZWZhdWx0U3R5bGVzLmVkZ2UsICdlZGdlJyk7XG5cbiAgICAgICAgICAgIGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IgPSBkZWZhdWx0U3R5bGVzLm5ldHdvcmtbJ2JhY2tncm91bmQtY29sb3InXTtcblxuICAgICAgICAgICAgY29uc3Qgbm9kZU1hcHBpbmcgPSB2YWx1ZS5ub2RlTWFwcGluZztcbiAgICAgICAgICAgIG1hcHBpbmdDU1NOb2RlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhub2RlTWFwcGluZywgJ25vZGUnLCBub2RlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGVkZ2VNYXBwaW5nID0gdmFsdWUuZWRnZU1hcHBpbmc7XG4gICAgICAgICAgICBtYXBwaW5nQ1NTRWRnZVN0eWxlID0gZ2V0Q1NTTWFwcGluZ0VudHJpZXMoZWRnZU1hcHBpbmcsICdlZGdlJywgZWRnZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodnBFbGVtZW50ID09IGN4Q29uc3RhbnRzLk4pIHtcbiAgICAgICAgICAgIC8vQnlwYXNzIHN0eWxlIG5vZGVcbiAgICAgICAgfSBlbHNlIGlmICh2cEVsZW1lbnQgPT0gY3hDb25zdGFudHMuRSkge1xuICAgICAgICAgICAgLy9CeXBhc3Mgc3R5bGUgZWRnZVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vQWRkIGRlZmF1bHQgc3R5bGVcbiAgICBvdXRwdXQuc3R5bGUucHVzaChnZXRTdHlsZUVsZW1lbnQoTk9ERV9TRUxFQ1RPUiwgZGVmYXVsdENTU05vZGVTdHlsZSkpO1xuICAgIG91dHB1dC5zdHlsZS5wdXNoKGdldFN0eWxlRWxlbWVudChFREdFX1NFTEVDVE9SLCBkZWZhdWx0Q1NTRWRnZVN0eWxlKSk7XG5cbiAgICBvdXRwdXQuc3R5bGUucHVzaC5hcHBseShvdXRwdXQuc3R5bGUsIG1hcHBpbmdDU1NOb2RlU3R5bGUpO1xuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgbWFwcGluZ0NTU0VkZ2VTdHlsZSk7XG5cbiAgICBvdXRwdXRbJ2JhY2tncm91bmQtY29sb3InXSA9IGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBOT0RFX1NFTEVDVE9SID0gJ25vZGUnO1xuY29uc3QgRURHRV9TRUxFQ1RPUiA9ICdlZGdlJztcblxuZnVuY3Rpb24gZ2V0RGF0YSh2LCBhdHRyaWJ1dGVOYW1lTWFwLCBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApIHtcbiAgICBsZXQgZGF0YSA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHYpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdLZXkgPSBhdHRyaWJ1dGVOYW1lTWFwLmhhcyhrZXkpID8gYXR0cmlidXRlTmFtZU1hcC5nZXQoa2V5KSA6IGtleTtcbiAgICAgICAgZGF0YVtuZXdLZXldID0gdltrZXldO1xuICAgIH0pO1xuICAgIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGlmICghZGF0YVtrZXldKSB7XG4gICAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWydkJ10pIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLmQpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAoYXR0cmlidXRlTmFtZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2EnXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlRGVjbGFyYXRpb24uYSArICcgc2hvdWxkIGJlIHJlbmFtZWQgdG8gJyArIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgYXR0cmlidXRlTmFtZU1hcC5zZXQoYXR0cmlidXRlRGVjbGFyYXRpb24uYSwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ3YnXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlTmFtZSArICcgaGFzIGRlZmF1bHQgdmFsdWUgJyArIGF0dHJpYnV0ZURlY2xhcmF0aW9uLnYpO1xuICAgICAgICAgICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLnNldChhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbi52KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5jb25zdCBjb252ZXJ0ZXIgPSB7XG4gICAgdGFyZ2V0Rm9ybWF0OiAnY3l0b3NjYXBlSlMnLFxuICAgIGNvbnZlcnQ6IChjeCkgPT4ge1xuICAgICAgICBjb25zdCBvdXRwdXQgPSB7XG4gICAgICAgICAgICBzdHlsZTogW10sXG4gICAgICAgICAgICBlbGVtZW50czoge30sXG4gICAgICAgICAgICBsYXlvdXQ6IHt9LFxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbm9kZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgbGV0IGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gdW5kZWZpbmVkO1xuICAgICAgICBsZXQgY3hWaXN1YWxQcm9wZXJ0aWVzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBsZXQgdXBkYXRlSW5mZXJyZWRUeXBlcyA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVUeXBlTWFwLCBhdHRyaWJ1dGVOYW1lTWFwLCB2KSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWF0dHJpYnV0ZVR5cGVNYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2W2tleV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZmVycmVkVHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3S2V5ID0gYXR0cmlidXRlTmFtZU1hcC5oYXMoa2V5KSA/IGF0dHJpYnV0ZU5hbWVNYXAuZ2V0KGtleSkgOiBrZXk7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGVNYXAuc2V0KG5ld0tleSwgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ10pIHtcbiAgICAgICAgICAgICAgICBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyA9IGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uczogXCIgKyBKU09OLnN0cmluZ2lmeShjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucywgbnVsbCwgMikpO1xuICAgICAgICAgICAgICAgIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLmZvckVhY2goKGN4QXR0cmlidXRlRGVjbGFyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN4QXR0cmlidXRlRGVjbGFyYXRpb25bJ25vZGVzJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAobm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlVHlwZU1hcChub2RlQXR0cmlidXRlVHlwZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAobm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN4QXR0cmlidXRlRGVjbGFyYXRpb25bJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAoZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlVHlwZU1hcChlZGdlQXR0cmlidXRlVHlwZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAoZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3hJZCA9IGN4Tm9kZVsnaWQnXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBub2RlTWFwLnNldChjeElkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogY3hOb2RlWydpZCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgdjogY3hOb2RlWyd2J10sXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBjeE5vZGVbJ3gnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBjeE5vZGVbJ3knXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6OiBjeE5vZGVbJ3onXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlSW5mZXJyZWRUeXBlcyhub2RlQXR0cmlidXRlVHlwZU1hcCwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4Tm9kZVsndiddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3hJZCA9IGN4RWRnZVsnaWQnXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBlZGdlTWFwLnNldChjeElkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogY3hFZGdlWydpZCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgdjogY3hFZGdlWyd2J10sXG4gICAgICAgICAgICAgICAgICAgICAgICBzOiBjeEVkZ2VbJ3MnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHQ6IGN4RWRnZVsndCddXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVJbmZlcnJlZFR5cGVzKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hFZGdlWyd2J10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAuZm9yRWFjaCgoaW5mZXJyZWRUeXBlLCBhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW5mZXJyZWQgYXR0cmlidXRlIHR5cGUgZm9yIG5vZGU6ICcgKyBhdHRyaWJ1dGVOYW1lICsgJzogJyArIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLmZvckVhY2goKGluZmVycmVkVHlwZSwgYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZmVycmVkIGF0dHJpYnV0ZSB0eXBlIGZvciBlZGdlOiAnICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL0FkZCBub2Rlc1xuICAgICAgICBvdXRwdXQuZWxlbWVudHNbJ25vZGVzJ10gPSBbXTtcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydlZGdlcyddID0gW107XG4gICAgICAgIG5vZGVNYXAuZm9yRWFjaCgoY3hOb2RlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7fTtcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGdldERhdGEoY3hOb2RlLnYsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnaWQnXSA9IGN4Tm9kZS5pZDtcbiAgICAgICAgICAgIGVsZW1lbnRbJ3Bvc2l0aW9uJ10gPSB7XG4gICAgICAgICAgICAgICAgeDogY3hOb2RlLmxheW91dC54LFxuICAgICAgICAgICAgICAgIHk6IGN4Tm9kZS5sYXlvdXQueVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMubm9kZXMucHVzaChlbGVtZW50KVxuICAgICAgICB9KTtcblxuICAgICAgICAvL0FkZCBlZGdlc1xuICAgICAgICBvdXRwdXQuZWxlbWVudHNbJ2VkZ2VzJ10gPSBbXTtcbiAgICAgICAgZWRnZU1hcC5mb3JFYWNoKChjeEVkZ2UsIGtleSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHt9O1xuICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddID0gZ2V0RGF0YShjeEVkZ2UudiwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydpZCddID0gY3hFZGdlLmlkO1xuICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydzb3VyY2UnXSA9IGN4RWRnZS5zO1xuICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWyd0YXJnZXQnXSA9IGN4RWRnZS50O1xuICAgICAgICAgICAgb3V0cHV0LmVsZW1lbnRzLmVkZ2VzLnB1c2goZWxlbWVudClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICBvdXRwdXQuc3R5bGUgPSBzdHlsZS5zdHlsZTtcbiAgICAgICAgb3V0cHV0WydiYWNrZ3JvdW5kLWNvbG9yJ10gPSBzdHlsZVsnYmFja2dyb3VuZC1jb2xvciddO1xuXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0ZXI6IGNvbnZlcnRlclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgJ3NoYXBlJzogJ3NoYXBlJyxcbiAgICAnd2lkdGgnOiAnd2lkdGgnLCBcbiAgICAnaGVpZ2h0JzogJ2hlaWdodCcsXG4gICAgJ2JhY2tncm91bmRfY29sb3InOiAnYmFja2dyb3VuZC1jb2xvcicsXG4gICAgJ2JhY2tncm91bmRfb3BhY2l0eSc6ICdiYWNrZ3JvdW5kLW9wYWNpdHknLFxuICAgICdsYWJlbCc6ICdsYWJlbCcsXG4gICAgJ2xhYmVsX2NvbG9yJzogJ2xhYmVsLWNvbG9yJywgXG4gICAgJ29wYWNpdHknOiAnb3BhY2l0eScsXG4gICAgJ2xpbmVfY29sb3InOiAnbGluZS1jb2xvcidcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKU0NvbnN0YW50cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=