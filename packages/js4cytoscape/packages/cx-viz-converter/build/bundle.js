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

function getContinuousMappingCSSEntry(portablePropertyKey, cxMappingDefinition, entityType) {
    return {};
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

function getDiscreteMappingCSSEntries(portablePropertyKey, cxMappingDefinition, entityType) {
    var output = [];
    var atttributeToValueMap = cxMappingDefinition['map'];
    var attributeName = cxMappingDefinition['attribute'];
    var attributeDataType = 'string';
    atttributeToValueMap.forEach(function (discreteMap) {
        console.log(' discrete map for ' + portablePropertyKey + ': ' + discreteMap.v + ' -> ' + discreteMap.vp);

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

                    break;
                }
            case 'passthrough':
                {
                    output.push(getPassthroughMappingCSSEntry(key, cxMappingEntry.definition, entityType));
                    break;
                }
            case 'discrete':
                {
                    var discreteMappings = getDiscreteMappingCSSEntries(key, cxMappingEntry.definition, entityType);
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
            console.log('inferred attribute type for node.' + attributeName + ': ' + inferredType);
        });

        edgeAttributeTypeMap.forEach(function (inferredType, attributeName) {
            console.log('inferred attribute type for edge.' + attributeName + ': ' + inferredType);
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

        var style = getVisualProperties(cxVisualProperties, cxAttributeDeclarations);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkZWI0ZjdlMzczNWI4MTk2MjIxMSIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsImdldEN4VmVyc2lvbiIsInZlcnNpb25TdHJpbmciLCJ2ZXJzaW9uQXJyYXkiLCJzcGxpdCIsIm1hcCIsIm51bWJlclN0cmluZyIsInBhcnNlSW50IiwibGVuZ3RoIiwiZm9yRWFjaCIsImlzTmFOIiwiZWxlbWVudCIsImdldEN4TWFqb3JWZXJzaW9uIiwiY29udmVydGVyIiwicmVxdWlyZSIsImNvbnZlcnQiLCJjeCIsInRhcmdldEZvcm1hdCIsImN4Q29uc3RhbnRzIiwibGFyZ2VOZXR3b3JrIiwiY3l0b3NjYXBlSlMiLCJjeFV0aWwiLCJ2ZXJpZnlWZXJzaW9uIiwiZmlyc3RFbGVtZW50IiwibWFqb3JWZXJzaW9uIiwibG52Q29udmVydCIsIm91dHB1dCIsIm5vZGVWYWx1ZU1hcCIsIm5vZGVMYXlvdXRNYXAiLCJjeE5vZGVzIiwiY3hFZGdlcyIsImN4VmlzdWFsUHJvcGVydGllcyIsImN4Tm9kZSIsImN4SWQiLCJ0b1N0cmluZyIsIngiLCJ5IiwieiIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5Iiwibm9kZUNvdW50IiwiZWRnZUNvdW50IiwidmlzdWFsUHJvcGVydHlDb3VudCIsImpzQ29uc3RhbnRzIiwic2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCIsInRhcmdldFN0eWxlRmllbGQiLCJwb3J0YWJsZVByb3BlcnRWYWx1ZSIsInRhcmdldFN0eWxlRW50cnkiLCJNYXAiLCJzZXQiLCJkZWZhdWx0UHJvcGVydHlDb252ZXJ0IiwicG9ydGFibGVQcm9wZXJ0eVZhbHVlIiwic2hhcGUiLCJ3aWR0aCIsImhlaWdodCIsImJhY2tncm91bmRfY29sb3IiLCJiYWNrZ3JvdW5kX29wYWNpdHkiLCJsYWJlbCIsImxhYmVsX2NvbG9yIiwib3BhY2l0eSIsImxpbmVfY29sb3IiLCJzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0IiwiYXR0cmlidXRlTmFtZSIsInBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJnZXRDU1NTdHlsZUVudHJpZXMiLCJjeFN0eWxlRW50cmllcyIsImVudGl0eVR5cGUiLCJrZXlzIiwia2V5IiwiY3NzRW50cmllcyIsInZhbHVlIiwiZ2V0SWRTZWxlY3RvciIsImlkIiwiZWxlbWVudFR5cGUiLCJnZXRTdHlsZUVsZW1lbnQiLCJzZWxlY3RvciIsImNzcyIsImdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cnkiLCJwb3J0YWJsZVByb3BlcnR5S2V5IiwiY3hNYXBwaW5nRGVmaW5pdGlvbiIsImdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5IiwiYXR0cmlidXRlIiwiZ2V0RGlzY3JldGVTZWxlY3RvciIsImF0dHJpYnV0ZURhdGFUeXBlIiwiYXR0cmlidXRlVmFsdWUiLCJnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzIiwiYXR0dHJpYnV0ZVRvVmFsdWVNYXAiLCJkaXNjcmV0ZU1hcCIsInYiLCJ2cCIsInN0eWxlTWFwIiwicHVzaCIsImdldENTU01hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cmllcyIsImF0dHJpYnV0ZVR5cGVNYXAiLCJjeE1hcHBpbmdFbnRyeSIsInR5cGUiLCJkZWZpbml0aW9uIiwiZGlzY3JldGVNYXBwaW5ncyIsImRpc2NyZXRlTWFwcGluZyIsImdldFZpc3VhbFByb3BlcnRpZXMiLCJub2RlQXR0cmlidXRlVHlwZU1hcCIsImVkZ2VBdHRyaWJ1dGVUeXBlTWFwIiwic3R5bGUiLCJ1bmRlZmluZWQiLCJkZWZhdWx0Q1NTTm9kZVN0eWxlIiwiZGVmYXVsdENTU0VkZ2VTdHlsZSIsImNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IiLCJtYXBwaW5nQ1NTTm9kZVN0eWxlIiwibWFwcGluZ0NTU0VkZ2VTdHlsZSIsInZwRWxlbWVudCIsInZwQXQiLCJhdCIsImRlZmF1bHRTdHlsZXMiLCJkZWZhdWx0Iiwibm9kZSIsImVkZ2UiLCJuZXR3b3JrIiwibm9kZU1hcHBpbmciLCJlZGdlTWFwcGluZyIsIk5PREVfU0VMRUNUT1IiLCJFREdFX1NFTEVDVE9SIiwiYXBwbHkiLCJnZXREYXRhIiwiYXR0cmlidXRlTmFtZU1hcCIsImF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImRhdGEiLCJuZXdLZXkiLCJoYXMiLCJnZXQiLCJ1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwIiwiYXR0cmlidXRlRGVjbGFyYXRpb25zIiwiYXR0cmlidXRlRGVjbGFyYXRpb24iLCJkIiwidXBkYXRlQXR0cmlidXRlTmFtZU1hcCIsImEiLCJ1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJlbGVtZW50cyIsImxheW91dCIsIm5vZGVNYXAiLCJlZGdlTWFwIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJ1cGRhdGVJbmZlcnJlZFR5cGVzIiwiaW5mZXJyZWRUeXBlIiwiY3hBc3BlY3QiLCJjeEF0dHJpYnV0ZURlY2xhcmF0aW9uIiwibm9kZXMiLCJlZGdlcyIsImN4RWRnZSIsInMiLCJ0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7Ozs7O0FDNURBQSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPQyxNQUFQLENBQWM7QUFDM0JDLGdCQUFZLFdBRGU7QUFFM0JDLFVBQU0sTUFGcUI7QUFHM0JDLFVBQU0sTUFIcUI7QUFJM0JDLGFBQVMsU0FKa0I7O0FBTTNCQyxXQUFPLE9BTm9CO0FBTzNCQyxXQUFPLE9BUG9COztBQVMzQkMsUUFBSSxJQVR1QjtBQVUzQkMsT0FBRyxHQVZ3QjtBQVczQkMsT0FBRyxHQVh3QjtBQVkzQkMsT0FBRyxHQVp3QjtBQWEzQkMsT0FBRyxHQWJ3Qjs7QUFlM0JDLFFBQUksSUFmdUI7QUFnQjNCQyxPQUFHLEdBaEJ3QjtBQWlCM0JDLE9BQUcsR0FqQndCOztBQW1CM0JDLHVCQUFtQixrQkFuQlE7QUFvQjNCQyxhQUFTLFNBcEJrQjs7QUFzQjNCQyxXQUFPO0FBdEJvQixD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O0FBQ0gsU0FQRDs7QUFTQSxZQUFNOEYsUUFBUUgsb0JBQW9CdkUsa0JBQXBCLEVBQXdDZ0gsdUJBQXhDLENBQWQ7O0FBRUFySCxlQUFPK0UsS0FBUCxHQUFlQSxNQUFNQSxLQUFyQjtBQUNBL0UsZUFBTyxrQkFBUCxJQUE2QitFLE1BQU0sa0JBQU4sQ0FBN0I7O0FBRUEsZUFBTy9FLE1BQVA7QUFDSDtBQTVIYSxDQUFsQjs7QUErSEE5QyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JnQyxlQUFXQTtBQURFLENBQWpCLEM7Ozs7Ozs7OztBQ2hZQWpDLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU9DLE1BQVAsQ0FBYztBQUMzQixhQUFTLE9BRGtCO0FBRTNCLGFBQVMsT0FGa0I7QUFHM0IsY0FBVSxRQUhpQjtBQUkzQix3QkFBb0Isa0JBSk87QUFLM0IsMEJBQXNCLG9CQUxLO0FBTTNCLGFBQVMsT0FOa0I7QUFPM0IsbUJBQWUsYUFQWTtBQVEzQixlQUFXLFNBUmdCO0FBUzNCLGtCQUFjO0FBVGEsQ0FBZCxDQUFqQixDIiwiZmlsZSI6Ii4vYnVpbGQvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3hWaXpDb252ZXJ0ZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiY3hWaXpDb252ZXJ0ZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGRlYjRmN2UzNzM1YjgxOTYyMjExIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgIENYX1ZFUlNJT046ICdDWFZlcnNpb24nLFxuICAgIE5PREU6ICdub2RlJyxcbiAgICBFREdFOiAnZWRnZScsXG4gICAgTkVUV09SSzogJ25ldHdvcmsnLFxuXG4gICAgTk9ERVM6ICdub2RlcycsXG4gICAgRURHRVM6ICdlZGdlcycsXG5cbiAgICBJRDogJ2lkJyxcbiAgICBYOiAneCcsXG4gICAgWTogJ3knLFxuICAgIFo6ICd6JyxcbiAgICBWOiAndicsXG5cbiAgICBBVDogJ2F0JyxcbiAgICBOOiAnbicsXG4gICAgRTogJ2UnLFxuXG4gICAgVklTVUFMX1BST1BFUlRJRVM6ICd2aXN1YWxQcm9wZXJ0aWVzJyxcbiAgICBERUZBVUxUOiAnZGVmYXVsdCcsXG5cbiAgICBTVFlMRTogJ3N0eWxlJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N4Q29uc3RhbnRzLmpzIiwiZnVuY3Rpb24gZ2V0Q3hWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcbiAgICBjb25zdCB2ZXJzaW9uQXJyYXkgPSB2ZXJzaW9uU3RyaW5nLnNwbGl0KCcuJykubWFwKChudW1iZXJTdHJpbmcpID0+IHsgcmV0dXJuIHBhcnNlSW50KG51bWJlclN0cmluZywgMTApOyB9KTtcbiAgICBpZiAodmVyc2lvbkFycmF5Lmxlbmd0aCAhPT0gMiAmJiB2ZXJzaW9uQXJyYXkubGVuZ3RoICE9IDMpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSB2ZXJzaW9uIGZvcm1hdDogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxuICAgIHZlcnNpb25BcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAoaXNOYU4oZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93ICdOb24taW50ZWdlciB2YWx1ZSBpbiB2ZXJzaW9uIHN0cmluZzogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdmVyc2lvbkFycmF5O1xufVxuXG5mdW5jdGlvbiBnZXRDeE1ham9yVmVyc2lvbih2ZXJzaW9uU3RyaW5nKSB7XG4gICAgcmV0dXJuIHZlcnNpb25TdHJpbmcgPyBnZXRDeFZlcnNpb24odmVyc2lvblN0cmluZylbMF0gOiAxO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRDeFZlcnNpb246IGdldEN4VmVyc2lvbixcbiAgICBnZXRDeE1ham9yVmVyc2lvbjogZ2V0Q3hNYWpvclZlcnNpb25cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N4VXRpbC5qcyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29udmVydGVyID0gcmVxdWlyZSAoJy4vY29udmVydGVyLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzLmNvbnZlcnQgPSAoY3gsIHRhcmdldEZvcm1hdCkgPT4geyByZXR1cm4gY29udmVydGVyLmNvbnZlcnQoY3gsIHRhcmdldEZvcm1hdCk7IH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi9jeENvbnN0YW50cy5qcycpO1xuY29uc3QgbGFyZ2VOZXR3b3JrID0gcmVxdWlyZSAoJy4vbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcycpOyBcbmNvbnN0IGN5dG9zY2FwZUpTID0gcmVxdWlyZSAoJy4vY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMnKTtcbmNvbnN0IGN4VXRpbCA9IHJlcXVpcmUoJy4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHZlcmlmeVZlcnNpb24oY3gpIHtcbiAgICBjb25zdCBmaXJzdEVsZW1lbnQgPSBjeFswXTtcbiAgICBjb25zdCB2ZXJzaW9uU3RyaW5nID0gZmlyc3RFbGVtZW50W2N4Q29uc3RhbnRzLkNYX1ZFUlNJT05dO1xuXG4gICAgY29uc3QgbWFqb3JWZXJzaW9uID0gY3hVdGlsLmdldEN4TWFqb3JWZXJzaW9uKHZlcnNpb25TdHJpbmcpO1xuXG4gICAgaWYgKG1ham9yVmVyc2lvbiAhPT0gMikge1xuICAgICAgICB0aHJvdyAnSW5jb21wYXRpYmxlIENYIHZlcnNpb246ICcgKyB2ZXJzaW9uU3RyaW5nO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0KSB7XG4gICAgdmVyaWZ5VmVyc2lvbihjeCk7XG4gICAgc3dpdGNoKHRhcmdldEZvcm1hdCkge1xuICAgICAgICBjYXNlIGxhcmdlTmV0d29yay5jb252ZXJ0ZXIudGFyZ2V0Rm9ybWF0OiB7XG4gICAgICAgICAgICByZXR1cm4gbGFyZ2VOZXR3b3JrLmNvbnZlcnRlci5jb252ZXJ0KGN4KTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGN5dG9zY2FwZUpTLmNvbnZlcnRlci50YXJnZXRGb3JtYXQ6IHtcbiAgICAgICAgICAgIHJldHVybiBjeXRvc2NhcGVKUy5jb252ZXJ0ZXIuY29udmVydChjeCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnZlcnQ6IGNvbnZlcnRcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnZlcnRlci5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuLi9jeENvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIGxudkNvbnZlcnQoY3gpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG5cbiAgICAvL0ZpcnN0IHBhc3MuIFxuICAgIC8vIFdlIG1heSBuZWVkIHRvIGNvbGxlY3Qgb2JqZWN0IGF0dHJpYnV0ZXMgdG8gY2FsY3VsYXRlXG4gICAgLy8gbWFwcGluZ3MgaW4gdGhlIHNlY29uZCBwYXNzLiBcbiAgICBsZXQgbm9kZVZhbHVlTWFwID0ge307XG4gICAgbGV0IG5vZGVMYXlvdXRNYXAgPSB7fTtcbiAgICBsZXQgY3hOb2RlcztcbiAgICBsZXQgY3hFZGdlcztcbiAgICBsZXQgY3hWaXN1YWxQcm9wZXJ0aWVzO1xuICAgIGN4LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnRbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgIGN4Tm9kZXMgPSBlbGVtZW50Wydub2RlcyddO1xuICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hOb2RlWydpZCddLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgbm9kZVZhbHVlTWFwW2N4SWRdID0gY3hOb2RlWyd2J107XG4gICAgICAgICAgICAgICAgbm9kZUxheW91dE1hcFtjeElkXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogY3hOb2RlWyd4J10sXG4gICAgICAgICAgICAgICAgICAgIHk6IGN4Tm9kZVsneSddLFxuICAgICAgICAgICAgICAgICAgICB6OiBjeE5vZGVbJ3onXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgY3hFZGdlcyA9IGVsZW1lbnRbJ2VkZ2VzJ107XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICBjeFZpc3VhbFByb3BlcnRpZXMgPSBlbGVtZW50Wyd2aXN1YWxQcm9wZXJ0aWVzJ107XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKFwiYXR0cmlidXRlczogXCIgKyBKU09OLnN0cmluZ2lmeShub2RlVmFsdWVNYXApKTtcbiAgICBjb25zb2xlLmxvZyhcImxheW91dDogXCIgKyBKU09OLnN0cmluZ2lmeShub2RlTGF5b3V0TWFwKSk7XG5cbiAgICAvL1NlY29uZCBwYXNzLiBcbiAgICAvLyBIZXJlIGlzIHdoZXJlIHRoZSBhY3R1YWwgb3V0cHV0IGlzIGdlbmVyYXRlZC5cbiAgICBvdXRwdXQubm9kZUNvdW50ID0gY3hOb2Rlcy5sZW5ndGg7XG4gICAgb3V0cHV0LmVkZ2VDb3VudCA9IGN4RWRnZXMubGVuZ3RoO1xuICAgIG91dHB1dC52aXN1YWxQcm9wZXJ0eUNvdW50ID0gY3hWaXN1YWxQcm9wZXJ0aWVzLmxlbmd0aDtcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cblxuXG5jb25zdCBjb252ZXJ0ZXIgPSB7XG4gICAgdGFyZ2V0Rm9ybWF0OiAnbG52JyxcbiAgICBjb252ZXJ0OiAgKGN4KSA9PiB7XG4gICAgICAgIHJldHVybiBsbnZDb252ZXJ0KGN4KTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnZlcnRlcjogY29udmVydGVyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBqc0NvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3l0b3NjYXBlSlNDb25zdGFudHMuanMnKTtcbmNvbnN0IGN4VXRpbCA9IHJlcXVpcmUoJy4uL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKSB7XG4gICAgY29uc3QgdGFyZ2V0U3R5bGVFbnRyeSA9IG5ldyBNYXAoKTtcbiAgICB0YXJnZXRTdHlsZUVudHJ5LnNldCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSk7XG4gICAgcmV0dXJuIHRhcmdldFN0eWxlRW50cnk7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdzaGFwZSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuc2hhcGUsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICd3aWR0aCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdoZWlnaHQnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdiYWNrZ3JvdW5kLW9wYWNpdHknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ2xhYmVsJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ2xhYmVsLWNvbG9yJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICd3aWR0aCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdvcGFjaXR5JzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnbGluZS1jb2xvcic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGluZV9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG59XG5cbmZ1bmN0aW9uIHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgYXR0cmlidXRlTmFtZSkge1xuICAgIGNvbnN0IG91dHB1dCA9IHt9O1xuICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9ICdkYXRhKCcgKyBhdHRyaWJ1dGVOYW1lICsgJyknO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdzaGFwZSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ3dpZHRoJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnaGVpZ2h0JzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ2JhY2tncm91bmQtb3BhY2l0eSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdsYWJlbCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ2xhYmVsLWNvbG9yJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ3dpZHRoJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnb3BhY2l0eSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLm9wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnbGluZS1jb2xvcic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIGF0dHJpYnV0ZU5hbWUpXG4gICAgfSxcbn1cblxuZnVuY3Rpb24gZ2V0Q1NTU3R5bGVFbnRyaWVzKGN4U3R5bGVFbnRyaWVzLCBlbnRpdHlUeXBlKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4U3R5bGVFbnRyaWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gY3hTdHlsZUVudHJpZXNba2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgY3NzRW50cmllcyA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgY3NzRW50cmllcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0SWRTZWxlY3RvcihpZCwgZWxlbWVudFR5cGUpIHtcbiAgICAvL25vZGUjaWQgb3IgZWRnZSNpZFxuICAgIHJldHVybiBlbGVtZW50VHlwZSArICcjJyArIGlkO1xufVxuXG5cblxuZnVuY3Rpb24gZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpIHtcbiAgICByZXR1cm4geyAnc2VsZWN0b3InOiBzZWxlY3RvciwgJ3N0eWxlJzogY3NzIH07XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cnkocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSkge1xuICAgIHJldHVybiB7fTtcbn1cblxuZnVuY3Rpb24gZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSkge1xuICAgIGlmIChwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgIGNvbnN0IGNzcyA9IHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oY3hNYXBwaW5nRGVmaW5pdGlvbi5hdHRyaWJ1dGUpO1xuICAgICAgICByZXR1cm4gZ2V0U3R5bGVFbGVtZW50KGVudGl0eVR5cGUsIGNzcyk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXREaXNjcmV0ZVNlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURhdGFUeXBlLCBhdHRyaWJ1dGVWYWx1ZSkge1xuICAgIGlmIChhdHRyaWJ1dGVEYXRhVHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gXFwnJyArIGF0dHJpYnV0ZVZhbHVlICsgJ1xcJ10nO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ2Jvb2xlYW4nKSB7XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZVZhbHVlID09ICd0cnVlJykge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWz8nICsgYXR0cmlidXRlTmFtZSArICddJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICddWyEnICsgYXR0cmlidXRlTmFtZSArICddJztcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICcgPSAnICsgYXR0cmlidXRlVmFsdWUgKyAnXSc7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGdldERpc2NyZXRlTWFwcGluZ0NTU0VudHJpZXMocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBjb25zdCBhdHR0cmlidXRlVG9WYWx1ZU1hcCA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ21hcCddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydhdHRyaWJ1dGUnXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVEYXRhVHlwZSA9ICdzdHJpbmcnO1xuICAgIGF0dHRyaWJ1dGVUb1ZhbHVlTWFwLmZvckVhY2goKGRpc2NyZXRlTWFwKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcgZGlzY3JldGUgbWFwIGZvciAnICsgcG9ydGFibGVQcm9wZXJ0eUtleSArICc6ICcgKyBkaXNjcmV0ZU1hcC52ICsgJyAtPiAnICsgZGlzY3JldGVNYXAudnApO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0RGlzY3JldGVTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEYXRhVHlwZSwgZGlzY3JldGVNYXAudik7XG4gICAgICAgXG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZU1hcCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oZGlzY3JldGVNYXAudnApO1xuICAgICAgICAgICAgY29uc3QgY3NzID0ge307XG4gICAgICAgICAgICBzdHlsZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY3NzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyAgIHN0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkoY3NzKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIG91dHB1dDsgLy9nZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcyk7XG59XG5cbi8qKiBcbiAqIFxuKi9cbmZ1bmN0aW9uIGdldENTU01hcHBpbmdFbnRyaWVzKFxuICAgIGN4TWFwcGluZ0VudHJpZXMsXG4gICAgZW50aXR5VHlwZSxcbiAgICBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGN4TWFwcGluZ0VudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBjeE1hcHBpbmdFbnRyeSA9IGN4TWFwcGluZ0VudHJpZXNba2V5XTtcbiAgICAgICAgY29uc29sZS5sb2coXCIgbWFwcGluZyB0eXBlOiBcIiArIGN4TWFwcGluZ0VudHJ5LnR5cGUpO1xuICAgICAgICBzd2l0Y2ggKGN4TWFwcGluZ0VudHJ5LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2NvbnRpbnVvdXMnOiB7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ3Bhc3N0aHJvdWdoJzoge1xuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnZGlzY3JldGUnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzY3JldGVNYXBwaW5ncyA9IGdldERpc2NyZXRlTWFwcGluZ0NTU0VudHJpZXMoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlKTtcbiAgICAgICAgICAgICAgICBkaXNjcmV0ZU1hcHBpbmdzLmZvckVhY2goKGRpc2NyZXRlTWFwcGluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChkaXNjcmV0ZU1hcHBpbmcpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBub2RlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBzdHlsZTogW10sXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgbGV0IGRlZmF1bHRDU1NOb2RlU3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGRlZmF1bHRDU1NFZGdlU3R5bGUgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgY3NzTmV0d29ya0JhY2tncm91bmRDb2xvciA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBtYXBwaW5nQ1NTTm9kZVN0eWxlID0gdW5kZWZpbmVkO1xuICAgIGxldCBtYXBwaW5nQ1NTRWRnZVN0eWxlID0gdW5kZWZpbmVkO1xuXG4gICAgY3hWaXN1YWxQcm9wZXJ0aWVzLmZvckVhY2goKHZwRWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCB2cEF0ID0gdnBFbGVtZW50LmF0O1xuICAgICAgICBpZiAodnBBdCA9PT0gY3hDb25zdGFudHMuU1RZTEUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdnBFbGVtZW50LnY7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0U3R5bGVzID0gdmFsdWUuZGVmYXVsdDtcblxuICAgICAgICAgICAgZGVmYXVsdENTU05vZGVTdHlsZSA9IGdldENTU1N0eWxlRW50cmllcyhkZWZhdWx0U3R5bGVzLm5vZGUsICdub2RlJyk7XG4gICAgICAgICAgICBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gZ2V0Q1NTU3R5bGVFbnRyaWVzKGRlZmF1bHRTdHlsZXMuZWRnZSwgJ2VkZ2UnKTtcblxuICAgICAgICAgICAgY3NzTmV0d29ya0JhY2tncm91bmRDb2xvciA9IGRlZmF1bHRTdHlsZXMubmV0d29ya1snYmFja2dyb3VuZC1jb2xvciddO1xuXG4gICAgICAgICAgICBjb25zdCBub2RlTWFwcGluZyA9IHZhbHVlLm5vZGVNYXBwaW5nO1xuICAgICAgICAgICAgbWFwcGluZ0NTU05vZGVTdHlsZSA9IGdldENTU01hcHBpbmdFbnRyaWVzKG5vZGVNYXBwaW5nLCAnbm9kZScsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICAgICAgY29uc3QgZWRnZU1hcHBpbmcgPSB2YWx1ZS5lZGdlTWFwcGluZztcbiAgICAgICAgICAgIG1hcHBpbmdDU1NFZGdlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhlZGdlTWFwcGluZywgJ2VkZ2UnLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh2cEVsZW1lbnQgPT0gY3hDb25zdGFudHMuTikge1xuICAgICAgICAgICAgLy9CeXBhc3Mgc3R5bGUgbm9kZVxuICAgICAgICB9IGVsc2UgaWYgKHZwRWxlbWVudCA9PSBjeENvbnN0YW50cy5FKSB7XG4gICAgICAgICAgICAvL0J5cGFzcyBzdHlsZSBlZGdlXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy9BZGQgZGVmYXVsdCBzdHlsZVxuICAgIG91dHB1dC5zdHlsZS5wdXNoKGdldFN0eWxlRWxlbWVudChOT0RFX1NFTEVDVE9SLCBkZWZhdWx0Q1NTTm9kZVN0eWxlKSk7XG4gICAgb3V0cHV0LnN0eWxlLnB1c2goZ2V0U3R5bGVFbGVtZW50KEVER0VfU0VMRUNUT1IsIGRlZmF1bHRDU1NFZGdlU3R5bGUpKTtcblxuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgbWFwcGluZ0NTU05vZGVTdHlsZSk7XG4gICAgb3V0cHV0LnN0eWxlLnB1c2guYXBwbHkob3V0cHV0LnN0eWxlLCBtYXBwaW5nQ1NTRWRnZVN0eWxlKTtcblxuICAgIG91dHB1dFsnYmFja2dyb3VuZC1jb2xvciddID0gY3NzTmV0d29ya0JhY2tncm91bmRDb2xvcjtcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IE5PREVfU0VMRUNUT1IgPSAnbm9kZSc7XG5jb25zdCBFREdFX1NFTEVDVE9SID0gJ2VkZ2UnO1xuXG5mdW5jdGlvbiBnZXREYXRhKHYsIGF0dHJpYnV0ZU5hbWVNYXAsIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIGxldCBkYXRhID0ge307XG4gICAgT2JqZWN0LmtleXModikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICBkYXRhW25ld0tleV0gPSB2W2tleV07XG4gICAgfSk7XG4gICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKCFkYXRhW2tleV0pIHtcbiAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAoYXR0cmlidXRlVHlwZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2QnXSkge1xuICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGVjbGFyYXRpb24uZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlTmFtZU1hcChhdHRyaWJ1dGVOYW1lTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsnYSddKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXR0cmlidXRlICcgKyBhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hICsgJyBzaG91bGQgYmUgcmVuYW1lZCB0byAnICsgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVOYW1lTWFwLnNldChhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hLCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAoYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsndiddKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXR0cmlidXRlICcgKyBhdHRyaWJ1dGVOYW1lICsgJyBoYXMgZGVmYXVsdCB2YWx1ZSAnICsgYXR0cmlidXRlRGVjbGFyYXRpb24udik7XG4gICAgICAgICAgICBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLnYpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdjeXRvc2NhcGVKUycsXG4gICAgY29udmVydDogKGN4KSA9PiB7XG4gICAgICAgIGNvbnN0IG91dHB1dCA9IHtcbiAgICAgICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiB7fSxcbiAgICAgICAgICAgIGxheW91dDoge30sXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBub2RlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBsZXQgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCB1cGRhdGVJbmZlcnJlZFR5cGVzID0gZnVuY3Rpb24gKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZU5hbWVNYXAsIHYpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHYpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghYXR0cmlidXRlVHlwZU1hcC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5mZXJyZWRUeXBlID0gdHlwZW9mIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdLZXkgPSBhdHRyaWJ1dGVOYW1lTWFwLmhhcyhrZXkpID8gYXR0cmlidXRlTmFtZU1hcC5nZXQoa2V5KSA6IGtleTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQobmV3S2V5LCBpbmZlcnJlZFR5cGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgICAgIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgICAgICAgICAgICAgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMuZm9yRWFjaCgoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnbm9kZXMnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnZWRnZXMnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hOb2RlWydpZCddLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVNYXAuc2V0KGN4SWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjeE5vZGVbJ2lkJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB2OiBjeE5vZGVbJ3YnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IGN4Tm9kZVsneCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IGN4Tm9kZVsneSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHo6IGN4Tm9kZVsneiddXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVJbmZlcnJlZFR5cGVzKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hOb2RlWyd2J10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcbiAgICAgICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hFZGdlWydpZCddLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGVkZ2VNYXAuc2V0KGN4SWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjeEVkZ2VbJ2lkJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB2OiBjeEVkZ2VbJ3YnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHM6IGN4RWRnZVsncyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgdDogY3hFZGdlWyd0J11cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUluZmVycmVkVHlwZXMoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEVkZ2VbJ3YnXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ10pIHtcbiAgICAgICAgICAgICAgICBjeFZpc3VhbFByb3BlcnRpZXMgPSBjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcC5mb3JFYWNoKChpbmZlcnJlZFR5cGUsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3Igbm9kZS4nICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcC5mb3JFYWNoKChpbmZlcnJlZFR5cGUsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3IgZWRnZS4nICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL0FkZCBub2Rlc1xuICAgICAgICBvdXRwdXQuZWxlbWVudHNbJ25vZGVzJ10gPSBbXTtcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydlZGdlcyddID0gW107XG4gICAgICAgIG5vZGVNYXAuZm9yRWFjaCgoY3hOb2RlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7fTtcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGdldERhdGEoY3hOb2RlLnYsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnaWQnXSA9IGN4Tm9kZS5pZDtcbiAgICAgICAgICAgIGVsZW1lbnRbJ3Bvc2l0aW9uJ10gPSB7XG4gICAgICAgICAgICAgICAgeDogY3hOb2RlLmxheW91dC54LFxuICAgICAgICAgICAgICAgIHk6IGN4Tm9kZS5sYXlvdXQueVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMubm9kZXMucHVzaChlbGVtZW50KVxuICAgICAgICB9KTtcblxuICAgICAgICAvL0FkZCBlZGdlc1xuICAgICAgICBvdXRwdXQuZWxlbWVudHNbJ2VkZ2VzJ10gPSBbXTtcbiAgICAgICAgZWRnZU1hcC5mb3JFYWNoKChjeEVkZ2UsIGtleSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHt9O1xuICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddID0gZ2V0RGF0YShjeEVkZ2UudiwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydpZCddID0gY3hFZGdlLmlkO1xuICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydzb3VyY2UnXSA9IGN4RWRnZS5zO1xuICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWyd0YXJnZXQnXSA9IGN4RWRnZS50O1xuICAgICAgICAgICAgb3V0cHV0LmVsZW1lbnRzLmVkZ2VzLnB1c2goZWxlbWVudClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMpO1xuXG4gICAgICAgIG91dHB1dC5zdHlsZSA9IHN0eWxlLnN0eWxlO1xuICAgICAgICBvdXRwdXRbJ2JhY2tncm91bmQtY29sb3InXSA9IHN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnZlcnRlcjogY29udmVydGVyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKUy5qcyIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICAnc2hhcGUnOiAnc2hhcGUnLFxuICAgICd3aWR0aCc6ICd3aWR0aCcsIFxuICAgICdoZWlnaHQnOiAnaGVpZ2h0JyxcbiAgICAnYmFja2dyb3VuZF9jb2xvcic6ICdiYWNrZ3JvdW5kLWNvbG9yJyxcbiAgICAnYmFja2dyb3VuZF9vcGFjaXR5JzogJ2JhY2tncm91bmQtb3BhY2l0eScsXG4gICAgJ2xhYmVsJzogJ2xhYmVsJyxcbiAgICAnbGFiZWxfY29sb3InOiAnbGFiZWwtY29sb3InLCBcbiAgICAnb3BhY2l0eSc6ICdvcGFjaXR5JyxcbiAgICAnbGluZV9jb2xvcic6ICdsaW5lLWNvbG9yJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==