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
            return simplePassthroughMappingConvert('shape', attributeName);
        },
        'width': function width(attributeName) {
            return simplePassthroughMappingConvert('width', attributeName);
        },
        'height': function height(attributeName) {
            return simplePassthroughMappingConvert('height', attributeName);
        },
        'background-color': function backgroundColor(attributeName) {
            return simplePassthroughMappingConvert('background-color', attributeName);
        },
        'background-opacity': function backgroundOpacity(attributeName) {
            return simplePassthroughMappingConvert('background-opacity', attributeName);
        },
        'label': function label(attributeName) {
            return simplePassthroughMappingConvert('label', attributeName);
        },
        'label-color': function labelColor(attributeName) {
            return simplePassthroughMappingConvert('label-color', attributeName);
        }
    },
    'edge': {
        'width': function width(attributeName) {
            return simplePassthroughMappingConvert('width', attributeName);
        },
        'opacity': function opacity(attributeName) {
            return simplePassthroughMappingConvert('opacity', attributeName);
        },
        'line-color': function lineColor(attributeName) {
            return simplePassthroughMappingConvert('line-color', attributeName);
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

function getDiscreteMappingCSSEntry(portablePropertyKey, cxMappingDefinition, entityType) {
    var atttributeToValueMap = cxMappingDefinition['map'];
    var attributeName = cxMappingDefinition['attribute'];
    var attributeDataType = 'string';
    atttributeToValueMap.forEach(function (discreteMap) {
        console.log(' discrete map for ' + portablePropertyKey + ': ' + discreteMap.v + ' -> ' + discreteMap.vp);

        var selector = getDiscreteSelector(entityType, attributeName, attributeDataType, discreteMap.v);
        console.log('  selector: ' + selector);
        if (defaultPropertyConvert[entityType][portablePropertyKey]) {
            var styleMap = defaultPropertyConvert[entityType][portablePropertyKey](discreteMap.vp);
            var css = {};
            styleMap.forEach(function (value, key) {
                css[key] = value;
            });
            console.log('   style: ' + JSON.stringify(css));
        }
    });

    return null; //getStyleElement(selector, css);
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
                    getDiscreteMappingCSSEntry(key, cxMappingEntry.definition, entityType);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmN2M5N2Q4YjI5NGRkMzlhNzUxNCIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsImdldEN4VmVyc2lvbiIsInZlcnNpb25TdHJpbmciLCJ2ZXJzaW9uQXJyYXkiLCJzcGxpdCIsIm1hcCIsIm51bWJlclN0cmluZyIsInBhcnNlSW50IiwibGVuZ3RoIiwiZm9yRWFjaCIsImlzTmFOIiwiZWxlbWVudCIsImdldEN4TWFqb3JWZXJzaW9uIiwiY29udmVydGVyIiwicmVxdWlyZSIsImNvbnZlcnQiLCJjeCIsInRhcmdldEZvcm1hdCIsImN4Q29uc3RhbnRzIiwibGFyZ2VOZXR3b3JrIiwiY3l0b3NjYXBlSlMiLCJjeFV0aWwiLCJ2ZXJpZnlWZXJzaW9uIiwiZmlyc3RFbGVtZW50IiwibWFqb3JWZXJzaW9uIiwibG52Q29udmVydCIsIm91dHB1dCIsIm5vZGVWYWx1ZU1hcCIsIm5vZGVMYXlvdXRNYXAiLCJjeE5vZGVzIiwiY3hFZGdlcyIsImN4VmlzdWFsUHJvcGVydGllcyIsImN4Tm9kZSIsImN4SWQiLCJ0b1N0cmluZyIsIngiLCJ5IiwieiIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5Iiwibm9kZUNvdW50IiwiZWRnZUNvdW50IiwidmlzdWFsUHJvcGVydHlDb3VudCIsImpzQ29uc3RhbnRzIiwic2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCIsInRhcmdldFN0eWxlRmllbGQiLCJwb3J0YWJsZVByb3BlcnRWYWx1ZSIsInRhcmdldFN0eWxlRW50cnkiLCJNYXAiLCJzZXQiLCJkZWZhdWx0UHJvcGVydHlDb252ZXJ0IiwicG9ydGFibGVQcm9wZXJ0eVZhbHVlIiwic2hhcGUiLCJ3aWR0aCIsImhlaWdodCIsImJhY2tncm91bmRfY29sb3IiLCJiYWNrZ3JvdW5kX29wYWNpdHkiLCJsYWJlbCIsImxhYmVsX2NvbG9yIiwib3BhY2l0eSIsImxpbmVfY29sb3IiLCJzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0IiwiYXR0cmlidXRlTmFtZSIsInBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJnZXRDU1NTdHlsZUVudHJpZXMiLCJjeFN0eWxlRW50cmllcyIsImVudGl0eVR5cGUiLCJrZXlzIiwia2V5IiwiY3NzRW50cmllcyIsInZhbHVlIiwiZ2V0SWRTZWxlY3RvciIsImlkIiwiZWxlbWVudFR5cGUiLCJnZXRTdHlsZUVsZW1lbnQiLCJzZWxlY3RvciIsImNzcyIsImdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cnkiLCJwb3J0YWJsZVByb3BlcnR5S2V5IiwiY3hNYXBwaW5nRGVmaW5pdGlvbiIsImdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5IiwiYXR0cmlidXRlIiwiZ2V0RGlzY3JldGVTZWxlY3RvciIsImF0dHJpYnV0ZURhdGFUeXBlIiwiYXR0cmlidXRlVmFsdWUiLCJnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyeSIsImF0dHRyaWJ1dGVUb1ZhbHVlTWFwIiwiZGlzY3JldGVNYXAiLCJ2IiwidnAiLCJzdHlsZU1hcCIsImdldENTU01hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cmllcyIsImF0dHJpYnV0ZVR5cGVNYXAiLCJjeE1hcHBpbmdFbnRyeSIsInR5cGUiLCJwdXNoIiwiZGVmaW5pdGlvbiIsImdldFZpc3VhbFByb3BlcnRpZXMiLCJub2RlQXR0cmlidXRlVHlwZU1hcCIsImVkZ2VBdHRyaWJ1dGVUeXBlTWFwIiwic3R5bGUiLCJ1bmRlZmluZWQiLCJkZWZhdWx0Q1NTTm9kZVN0eWxlIiwiZGVmYXVsdENTU0VkZ2VTdHlsZSIsImNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IiLCJtYXBwaW5nQ1NTTm9kZVN0eWxlIiwibWFwcGluZ0NTU0VkZ2VTdHlsZSIsInZwRWxlbWVudCIsInZwQXQiLCJhdCIsImRlZmF1bHRTdHlsZXMiLCJkZWZhdWx0Iiwibm9kZSIsImVkZ2UiLCJuZXR3b3JrIiwibm9kZU1hcHBpbmciLCJlZGdlTWFwcGluZyIsIk5PREVfU0VMRUNUT1IiLCJFREdFX1NFTEVDVE9SIiwiYXBwbHkiLCJnZXREYXRhIiwiYXR0cmlidXRlTmFtZU1hcCIsImF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImRhdGEiLCJuZXdLZXkiLCJoYXMiLCJnZXQiLCJ1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwIiwiYXR0cmlidXRlRGVjbGFyYXRpb25zIiwiYXR0cmlidXRlRGVjbGFyYXRpb24iLCJkIiwidXBkYXRlQXR0cmlidXRlTmFtZU1hcCIsImEiLCJ1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJlbGVtZW50cyIsImxheW91dCIsIm5vZGVNYXAiLCJlZGdlTWFwIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJ1cGRhdGVJbmZlcnJlZFR5cGVzIiwiaW5mZXJyZWRUeXBlIiwiY3hBc3BlY3QiLCJjeEF0dHJpYnV0ZURlY2xhcmF0aW9uIiwibm9kZXMiLCJlZGdlcyIsImN4RWRnZSIsInMiLCJ0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7Ozs7O0FDNURBQSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPQyxNQUFQLENBQWM7QUFDM0JDLGdCQUFZLFdBRGU7QUFFM0JDLFVBQU0sTUFGcUI7QUFHM0JDLFVBQU0sTUFIcUI7QUFJM0JDLGFBQVMsU0FKa0I7O0FBTTNCQyxXQUFPLE9BTm9CO0FBTzNCQyxXQUFPLE9BUG9COztBQVMzQkMsUUFBSSxJQVR1QjtBQVUzQkMsT0FBRyxHQVZ3QjtBQVczQkMsT0FBRyxHQVh3QjtBQVkzQkMsT0FBRyxHQVp3QjtBQWEzQkMsT0FBRyxHQWJ3Qjs7QUFlM0JDLFFBQUksSUFmdUI7QUFnQjNCQyxPQUFHLEdBaEJ3QjtBQWlCM0JDLE9BQUcsR0FqQndCOztBQW1CM0JDLHVCQUFtQixrQkFuQlE7QUFvQjNCQyxhQUFTLFNBcEJrQjs7QUFzQjNCQyxXQUFPO0FBdEJvQixDQUFkLENBQWpCLEM7Ozs7Ozs7OztBQ0RBLFNBQVNDLFlBQVQsQ0FB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REUsQ0FBakIsQzs7Ozs7Ozs7O0FDM1hBakMsT0FBT0MsT0FBUCxHQUFpQkMsT0FBT0MsTUFBUCxDQUFjO0FBQzNCLGFBQVMsT0FEa0I7QUFFM0IsYUFBUyxPQUZrQjtBQUczQixjQUFVLFFBSGlCO0FBSTNCLHdCQUFvQixrQkFKTztBQUszQiwwQkFBc0Isb0JBTEs7QUFNM0IsYUFBUyxPQU5rQjtBQU8zQixtQkFBZSxhQVBZO0FBUTNCLGVBQVcsU0FSZ0I7QUFTM0Isa0JBQWM7QUFUYSxDQUFkLENBQWpCLEMiLCJmaWxlIjoiLi9idWlsZC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJjeFZpekNvbnZlcnRlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjeFZpekNvbnZlcnRlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZjdjOTdkOGIyOTRkZDM5YTc1MTQiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgQ1hfVkVSU0lPTjogJ0NYVmVyc2lvbicsXG4gICAgTk9ERTogJ25vZGUnLFxuICAgIEVER0U6ICdlZGdlJyxcbiAgICBORVRXT1JLOiAnbmV0d29yaycsXG5cbiAgICBOT0RFUzogJ25vZGVzJyxcbiAgICBFREdFUzogJ2VkZ2VzJyxcblxuICAgIElEOiAnaWQnLFxuICAgIFg6ICd4JyxcbiAgICBZOiAneScsXG4gICAgWjogJ3onLFxuICAgIFY6ICd2JyxcblxuICAgIEFUOiAnYXQnLFxuICAgIE46ICduJyxcbiAgICBFOiAnZScsXG5cbiAgICBWSVNVQUxfUFJPUEVSVElFUzogJ3Zpc3VhbFByb3BlcnRpZXMnLFxuICAgIERFRkFVTFQ6ICdkZWZhdWx0JyxcblxuICAgIFNUWUxFOiAnc3R5bGUnXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hDb25zdGFudHMuanMiLCJmdW5jdGlvbiBnZXRDeFZlcnNpb24odmVyc2lvblN0cmluZykge1xuICAgIGNvbnN0IHZlcnNpb25BcnJheSA9IHZlcnNpb25TdHJpbmcuc3BsaXQoJy4nKS5tYXAoKG51bWJlclN0cmluZykgPT4geyByZXR1cm4gcGFyc2VJbnQobnVtYmVyU3RyaW5nLCAxMCk7IH0pO1xuICAgIGlmICh2ZXJzaW9uQXJyYXkubGVuZ3RoICE9PSAyICYmIHZlcnNpb25BcnJheS5sZW5ndGggIT0gMykge1xuICAgICAgICB0aHJvdyAnSW5jb21wYXRpYmxlIHZlcnNpb24gZm9ybWF0OiAnICsgdmVyc2lvblN0cmluZztcbiAgICB9XG4gICAgdmVyc2lvbkFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGlmIChpc05hTihlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgJ05vbi1pbnRlZ2VyIHZhbHVlIGluIHZlcnNpb24gc3RyaW5nOiAnICsgdmVyc2lvblN0cmluZztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2ZXJzaW9uQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGdldEN4TWFqb3JWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcbiAgICByZXR1cm4gdmVyc2lvblN0cmluZyA/IGdldEN4VmVyc2lvbih2ZXJzaW9uU3RyaW5nKVswXSA6IDE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEN4VmVyc2lvbjogZ2V0Q3hWZXJzaW9uLFxuICAgIGdldEN4TWFqb3JWZXJzaW9uOiBnZXRDeE1ham9yVmVyc2lvblxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hVdGlsLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb252ZXJ0ZXIgPSByZXF1aXJlICgnLi9jb252ZXJ0ZXIuanMnKTtcblxubW9kdWxlLmV4cG9ydHMuY29udmVydCA9IChjeCwgdGFyZ2V0Rm9ybWF0KSA9PiB7IHJldHVybiBjb252ZXJ0ZXIuY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0KTsgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmsgPSByZXF1aXJlICgnLi9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrLmpzJyk7IFxuY29uc3QgY3l0b3NjYXBlSlMgPSByZXF1aXJlICgnLi9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKUy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gdmVyaWZ5VmVyc2lvbihjeCkge1xuICAgIGNvbnN0IGZpcnN0RWxlbWVudCA9IGN4WzBdO1xuICAgIGNvbnN0IHZlcnNpb25TdHJpbmcgPSBmaXJzdEVsZW1lbnRbY3hDb25zdGFudHMuQ1hfVkVSU0lPTl07XG5cbiAgICBjb25zdCBtYWpvclZlcnNpb24gPSBjeFV0aWwuZ2V0Q3hNYWpvclZlcnNpb24odmVyc2lvblN0cmluZyk7XG5cbiAgICBpZiAobWFqb3JWZXJzaW9uICE9PSAyKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgQ1ggdmVyc2lvbjogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQpIHtcbiAgICB2ZXJpZnlWZXJzaW9uKGN4KTtcbiAgICBzd2l0Y2godGFyZ2V0Rm9ybWF0KSB7XG4gICAgICAgIGNhc2UgbGFyZ2VOZXR3b3JrLmNvbnZlcnRlci50YXJnZXRGb3JtYXQ6IHtcbiAgICAgICAgICAgIHJldHVybiBsYXJnZU5ldHdvcmsuY29udmVydGVyLmNvbnZlcnQoY3gpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgY3l0b3NjYXBlSlMuY29udmVydGVyLnRhcmdldEZvcm1hdDoge1xuICAgICAgICAgICAgcmV0dXJuIGN5dG9zY2FwZUpTLmNvbnZlcnRlci5jb252ZXJ0KGN4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydDogY29udmVydFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udmVydGVyLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gbG52Q29udmVydChjeCkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcblxuICAgIC8vRmlyc3QgcGFzcy4gXG4gICAgLy8gV2UgbWF5IG5lZWQgdG8gY29sbGVjdCBvYmplY3QgYXR0cmlidXRlcyB0byBjYWxjdWxhdGVcbiAgICAvLyBtYXBwaW5ncyBpbiB0aGUgc2Vjb25kIHBhc3MuIFxuICAgIGxldCBub2RlVmFsdWVNYXAgPSB7fTtcbiAgICBsZXQgbm9kZUxheW91dE1hcCA9IHt9O1xuICAgIGxldCBjeE5vZGVzO1xuICAgIGxldCBjeEVkZ2VzO1xuICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXM7XG4gICAgY3guZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgY3hOb2RlcyA9IGVsZW1lbnRbJ25vZGVzJ107XG4gICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeE5vZGVbJ2lkJ10udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBub2RlVmFsdWVNYXBbY3hJZF0gPSBjeE5vZGVbJ3YnXTtcbiAgICAgICAgICAgICAgICBub2RlTGF5b3V0TWFwW2N4SWRdID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBjeE5vZGVbJ3gnXSxcbiAgICAgICAgICAgICAgICAgICAgeTogY3hOb2RlWyd5J10sXG4gICAgICAgICAgICAgICAgICAgIHo6IGN4Tm9kZVsneiddXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50WydlZGdlcyddKSB7XG4gICAgICAgICAgICBjeEVkZ2VzID0gZWxlbWVudFsnZWRnZXMnXTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50Wyd2aXN1YWxQcm9wZXJ0aWVzJ10pIHtcbiAgICAgICAgICAgIGN4VmlzdWFsUHJvcGVydGllcyA9IGVsZW1lbnRbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coXCJhdHRyaWJ1dGVzOiBcIiArIEpTT04uc3RyaW5naWZ5KG5vZGVWYWx1ZU1hcCkpO1xuICAgIGNvbnNvbGUubG9nKFwibGF5b3V0OiBcIiArIEpTT04uc3RyaW5naWZ5KG5vZGVMYXlvdXRNYXApKTtcblxuICAgIC8vU2Vjb25kIHBhc3MuIFxuICAgIC8vIEhlcmUgaXMgd2hlcmUgdGhlIGFjdHVhbCBvdXRwdXQgaXMgZ2VuZXJhdGVkLlxuICAgIG91dHB1dC5ub2RlQ291bnQgPSBjeE5vZGVzLmxlbmd0aDtcbiAgICBvdXRwdXQuZWRnZUNvdW50ID0gY3hFZGdlcy5sZW5ndGg7XG4gICAgb3V0cHV0LnZpc3VhbFByb3BlcnR5Q291bnQgPSBjeFZpc3VhbFByb3BlcnRpZXMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdsbnYnLFxuICAgIGNvbnZlcnQ6ICAoY3gpID0+IHtcbiAgICAgICAgcmV0dXJuIGxudkNvbnZlcnQoY3gpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydGVyOiBjb252ZXJ0ZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmsuanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGpzQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9jeXRvc2NhcGVKU0NvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpIHtcbiAgICBjb25zdCB0YXJnZXRTdHlsZUVudHJ5ID0gbmV3IE1hcCgpO1xuICAgIHRhcmdldFN0eWxlRW50cnkuc2V0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKTtcbiAgICByZXR1cm4gdGFyZ2V0U3R5bGVFbnRyeTtcbn1cblxuY29uc3QgZGVmYXVsdFByb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ3NoYXBlJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ3dpZHRoJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ2hlaWdodCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ2JhY2tncm91bmQtb3BhY2l0eSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnbGFiZWwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnbGFiZWwtY29sb3InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ3dpZHRoJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ29wYWNpdHknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLm9wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdsaW5lLWNvbG9yJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbn1cblxuZnVuY3Rpb24gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgY29uc3Qgb3V0cHV0ID0ge307XG4gICAgb3V0cHV0W3RhcmdldFN0eWxlRmllbGRdID0gJ2RhdGEoJyArIGF0dHJpYnV0ZU5hbWUgKyAnKSc7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgcGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ3NoYXBlJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoJ3NoYXBlJywgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICd3aWR0aCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KCd3aWR0aCcsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnaGVpZ2h0JzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoJ2hlaWdodCcsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KCdiYWNrZ3JvdW5kLWNvbG9yJywgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdiYWNrZ3JvdW5kLW9wYWNpdHknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCgnYmFja2dyb3VuZC1vcGFjaXR5JywgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdsYWJlbCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KCdsYWJlbCcsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnbGFiZWwtY29sb3InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCgnbGFiZWwtY29sb3InLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICd3aWR0aCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KCd3aWR0aCcsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnb3BhY2l0eSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KCdvcGFjaXR5JywgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdsaW5lLWNvbG9yJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoJ2xpbmUtY29sb3InLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG59XG5cbmZ1bmN0aW9uIGdldENTU1N0eWxlRW50cmllcyhjeFN0eWxlRW50cmllcywgZW50aXR5VHlwZSkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhjeFN0eWxlRW50cmllcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGN4U3R5bGVFbnRyaWVzW2tleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW2tleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGNzc0VudHJpZXMgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW2tleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIGNzc0VudHJpZXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIG91dHB1dFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldElkU2VsZWN0b3IoaWQsIGVsZW1lbnRUeXBlKSB7XG4gICAgLy9ub2RlI2lkIG9yIGVkZ2UjaWRcbiAgICByZXR1cm4gZWxlbWVudFR5cGUgKyAnIycgKyBpZDtcbn1cblxuXG5cbmZ1bmN0aW9uIGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKSB7XG4gICAgcmV0dXJuIHsgJ3NlbGVjdG9yJzogc2VsZWN0b3IsICdzdHlsZSc6IGNzcyB9O1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJ5KHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUpIHtcbiAgICByZXR1cm4ge307XG59XG5cbmZ1bmN0aW9uIGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUpIHtcbiAgICBpZiAocGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICBjb25zdCBjc3MgPSBwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGN4TWFwcGluZ0RlZmluaXRpb24uYXR0cmlidXRlKTtcbiAgICAgICAgcmV0dXJuIGdldFN0eWxlRWxlbWVudChlbnRpdHlUeXBlLCBjc3MpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEYXRhVHlwZSwgYXR0cmlidXRlVmFsdWUpIHtcbiAgICBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyA9IFxcJycgKyBhdHRyaWJ1dGVWYWx1ZSArICdcXCddJztcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZURhdGFUeXBlID09ICdib29sZWFuJykge1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVWYWx1ZSA9PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1s/JyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnXVshJyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gJyArIGF0dHJpYnV0ZVZhbHVlICsgJ10nO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyeShwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlKSB7XG4gICAgY29uc3QgYXR0dHJpYnV0ZVRvVmFsdWVNYXAgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydtYXAnXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnYXR0cmlidXRlJ107XG4gICAgY29uc3QgYXR0cmlidXRlRGF0YVR5cGUgPSAnc3RyaW5nJztcbiAgICBhdHR0cmlidXRlVG9WYWx1ZU1hcC5mb3JFYWNoKChkaXNjcmV0ZU1hcCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnIGRpc2NyZXRlIG1hcCBmb3IgJyArIHBvcnRhYmxlUHJvcGVydHlLZXkgKyAnOiAnICsgZGlzY3JldGVNYXAudiArICcgLT4gJyArIGRpc2NyZXRlTWFwLnZwKTtcblxuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGdldERpc2NyZXRlU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGF0YVR5cGUsIGRpc2NyZXRlTWFwLnYpO1xuICAgICAgICBjb25zb2xlLmxvZygnICBzZWxlY3RvcjogJyArIHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlTWFwID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShkaXNjcmV0ZU1hcC52cCk7XG4gICAgICAgICAgICBjb25zdCBjc3MgPSB7fTtcbiAgICAgICAgICAgIHN0eWxlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBjc3Nba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnICAgc3R5bGU6ICcgKyBKU09OLnN0cmluZ2lmeShjc3MpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICByZXR1cm4gbnVsbDsgLy9nZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcyk7XG59XG5cbi8qKiBcbiAqIFxuKi9cbmZ1bmN0aW9uIGdldENTU01hcHBpbmdFbnRyaWVzKFxuICAgIGN4TWFwcGluZ0VudHJpZXMsXG4gICAgZW50aXR5VHlwZSxcbiAgICBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGN4TWFwcGluZ0VudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBjeE1hcHBpbmdFbnRyeSA9IGN4TWFwcGluZ0VudHJpZXNba2V5XTtcbiAgICAgICAgY29uc29sZS5sb2coXCIgbWFwcGluZyB0eXBlOiBcIiArIGN4TWFwcGluZ0VudHJ5LnR5cGUpO1xuICAgICAgICBzd2l0Y2ggKGN4TWFwcGluZ0VudHJ5LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2NvbnRpbnVvdXMnOiB7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ3Bhc3N0aHJvdWdoJzoge1xuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnZGlzY3JldGUnOiB7XG4gICAgICAgICAgICAgICAgZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cnkoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0VmlzdWFsUHJvcGVydGllcyhjeFZpc3VhbFByb3BlcnRpZXMsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICBsZXQgZGVmYXVsdENTU05vZGVTdHlsZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgZGVmYXVsdENTU0VkZ2VTdHlsZSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IG1hcHBpbmdDU1NOb2RlU3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG1hcHBpbmdDU1NFZGdlU3R5bGUgPSB1bmRlZmluZWQ7XG5cbiAgICBjeFZpc3VhbFByb3BlcnRpZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHZwQXQgPSB2cEVsZW1lbnQuYXQ7XG4gICAgICAgIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5TVFlMRSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2cEVsZW1lbnQudjtcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZXMgPSB2YWx1ZS5kZWZhdWx0O1xuXG4gICAgICAgICAgICBkZWZhdWx0Q1NTTm9kZVN0eWxlID0gZ2V0Q1NTU3R5bGVFbnRyaWVzKGRlZmF1bHRTdHlsZXMubm9kZSwgJ25vZGUnKTtcbiAgICAgICAgICAgIGRlZmF1bHRDU1NFZGdlU3R5bGUgPSBnZXRDU1NTdHlsZUVudHJpZXMoZGVmYXVsdFN0eWxlcy5lZGdlLCAnZWRnZScpO1xuXG4gICAgICAgICAgICBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gZGVmYXVsdFN0eWxlcy5uZXR3b3JrWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGVNYXBwaW5nID0gdmFsdWUubm9kZU1hcHBpbmc7XG4gICAgICAgICAgICBtYXBwaW5nQ1NTTm9kZVN0eWxlID0gZ2V0Q1NTTWFwcGluZ0VudHJpZXMobm9kZU1hcHBpbmcsICdub2RlJywgbm9kZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgICAgICBjb25zdCBlZGdlTWFwcGluZyA9IHZhbHVlLmVkZ2VNYXBwaW5nO1xuICAgICAgICAgICAgbWFwcGluZ0NTU0VkZ2VTdHlsZSA9IGdldENTU01hcHBpbmdFbnRyaWVzKGVkZ2VNYXBwaW5nLCAnZWRnZScsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHZwRWxlbWVudCA9PSBjeENvbnN0YW50cy5OKSB7XG4gICAgICAgICAgICAvL0J5cGFzcyBzdHlsZSBub2RlXG4gICAgICAgIH0gZWxzZSBpZiAodnBFbGVtZW50ID09IGN4Q29uc3RhbnRzLkUpIHtcbiAgICAgICAgICAgIC8vQnlwYXNzIHN0eWxlIGVkZ2VcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvL0FkZCBkZWZhdWx0IHN0eWxlXG4gICAgb3V0cHV0LnN0eWxlLnB1c2goZ2V0U3R5bGVFbGVtZW50KE5PREVfU0VMRUNUT1IsIGRlZmF1bHRDU1NOb2RlU3R5bGUpKTtcbiAgICBvdXRwdXQuc3R5bGUucHVzaChnZXRTdHlsZUVsZW1lbnQoRURHRV9TRUxFQ1RPUiwgZGVmYXVsdENTU0VkZ2VTdHlsZSkpO1xuXG4gICAgb3V0cHV0LnN0eWxlLnB1c2guYXBwbHkob3V0cHV0LnN0eWxlLCBtYXBwaW5nQ1NTTm9kZVN0eWxlKTtcbiAgICBvdXRwdXQuc3R5bGUucHVzaC5hcHBseShvdXRwdXQuc3R5bGUsIG1hcHBpbmdDU1NFZGdlU3R5bGUpO1xuXG4gICAgb3V0cHV0WydiYWNrZ3JvdW5kLWNvbG9yJ10gPSBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgTk9ERV9TRUxFQ1RPUiA9ICdub2RlJztcbmNvbnN0IEVER0VfU0VMRUNUT1IgPSAnZWRnZSc7XG5cbmZ1bmN0aW9uIGdldERhdGEodiwgYXR0cmlidXRlTmFtZU1hcCwgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKSB7XG4gICAgbGV0IGRhdGEgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgbmV3S2V5ID0gYXR0cmlidXRlTmFtZU1hcC5oYXMoa2V5KSA/IGF0dHJpYnV0ZU5hbWVNYXAuZ2V0KGtleSkgOiBrZXk7XG4gICAgICAgIGRhdGFbbmV3S2V5XSA9IHZba2V5XTtcbiAgICB9KTtcbiAgICBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBpZiAoIWRhdGFba2V5XSkge1xuICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlVHlwZU1hcChhdHRyaWJ1dGVUeXBlTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsnZCddKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVUeXBlTWFwLnNldChhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbi5kKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKGF0dHJpYnV0ZU5hbWVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWydhJ10pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhdHRyaWJ1dGUgJyArIGF0dHJpYnV0ZURlY2xhcmF0aW9uLmEgKyAnIHNob3VsZCBiZSByZW5hbWVkIHRvICcgKyBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWVNYXAuc2V0KGF0dHJpYnV0ZURlY2xhcmF0aW9uLmEsIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWyd2J10pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhdHRyaWJ1dGUgJyArIGF0dHJpYnV0ZU5hbWUgKyAnIGhhcyBkZWZhdWx0IHZhbHVlICcgKyBhdHRyaWJ1dGVEZWNsYXJhdGlvbi52KTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcC5zZXQoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGVjbGFyYXRpb24udik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuY29uc3QgY29udmVydGVyID0ge1xuICAgIHRhcmdldEZvcm1hdDogJ2N5dG9zY2FwZUpTJyxcbiAgICBjb252ZXJ0OiAoY3gpID0+IHtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0ge1xuICAgICAgICAgICAgc3R5bGU6IFtdLFxuICAgICAgICAgICAgZWxlbWVudHM6IHt9LFxuICAgICAgICAgICAgbGF5b3V0OiB7fSxcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5vZGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBlZGdlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyA9IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGN4VmlzdWFsUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcblxuICAgICAgICBsZXQgbm9kZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBlZGdlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBsZXQgbm9kZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBlZGdlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBsZXQgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgbGV0IHVwZGF0ZUluZmVycmVkVHlwZXMgPSBmdW5jdGlvbiAoYXR0cmlidXRlVHlwZU1hcCwgYXR0cmlidXRlTmFtZU1hcCwgdikge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFhdHRyaWJ1dGVUeXBlTWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdltrZXldO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmZlcnJlZFR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlTWFwLnNldChuZXdLZXksIGluZmVycmVkVHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddKSB7XG4gICAgICAgICAgICAgICAgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMgPSBjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ107XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IFwiICsgSlNPTi5zdHJpbmdpZnkoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIG51bGwsIDIpKTtcbiAgICAgICAgICAgICAgICBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucy5mb3JFYWNoKChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uWydub2RlcyddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uWydlZGdlcyddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuICAgICAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeE5vZGVbJ2lkJ10udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcC5zZXQoY3hJZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGN4Tm9kZVsnaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHY6IGN4Tm9kZVsndiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogY3hOb2RlWyd4J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogY3hOb2RlWyd5J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgejogY3hOb2RlWyd6J11cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUluZmVycmVkVHlwZXMobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeE5vZGVbJ3YnXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuICAgICAgICAgICAgICAgIGN4RWRnZXMuZm9yRWFjaCgoY3hFZGdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeEVkZ2VbJ2lkJ10udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgZWRnZU1hcC5zZXQoY3hJZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGN4RWRnZVsnaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHY6IGN4RWRnZVsndiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgczogY3hFZGdlWydzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB0OiBjeEVkZ2VbJ3QnXVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlSW5mZXJyZWRUeXBlcyhlZGdlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGN4RWRnZVsndiddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXSkge1xuICAgICAgICAgICAgICAgIGN4VmlzdWFsUHJvcGVydGllcyA9IGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLmZvckVhY2goKGluZmVycmVkVHlwZSwgYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZmVycmVkIGF0dHJpYnV0ZSB0eXBlIGZvciBub2RlLicgKyBhdHRyaWJ1dGVOYW1lICsgJzogJyArIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLmZvckVhY2goKGluZmVycmVkVHlwZSwgYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZmVycmVkIGF0dHJpYnV0ZSB0eXBlIGZvciBlZGdlLicgKyBhdHRyaWJ1dGVOYW1lICsgJzogJyArIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vQWRkIG5vZGVzXG4gICAgICAgIG91dHB1dC5lbGVtZW50c1snbm9kZXMnXSA9IFtdO1xuICAgICAgICBvdXRwdXQuZWxlbWVudHNbJ2VkZ2VzJ10gPSBbXTtcbiAgICAgICAgbm9kZU1hcC5mb3JFYWNoKChjeE5vZGUsIGtleSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHt9O1xuICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddID0gZ2V0RGF0YShjeE5vZGUudiwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydpZCddID0gY3hOb2RlLmlkO1xuICAgICAgICAgICAgZWxlbWVudFsncG9zaXRpb24nXSA9IHtcbiAgICAgICAgICAgICAgICB4OiBjeE5vZGUubGF5b3V0LngsXG4gICAgICAgICAgICAgICAgeTogY3hOb2RlLmxheW91dC55XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG91dHB1dC5lbGVtZW50cy5ub2Rlcy5wdXNoKGVsZW1lbnQpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vQWRkIGVkZ2VzXG4gICAgICAgIG91dHB1dC5lbGVtZW50c1snZWRnZXMnXSA9IFtdO1xuICAgICAgICBlZGdlTWFwLmZvckVhY2goKGN4RWRnZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ge307XG4gICAgICAgICAgICBlbGVtZW50WydkYXRhJ10gPSBnZXREYXRhKGN4RWRnZS52LCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ2lkJ10gPSBjeEVkZ2UuaWQ7XG4gICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ3NvdXJjZSddID0gY3hFZGdlLnM7XG4gICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ3RhcmdldCddID0gY3hFZGdlLnQ7XG4gICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMuZWRnZXMucHVzaChlbGVtZW50KVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzdHlsZSA9IGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyk7XG5cbiAgICAgICAgb3V0cHV0LnN0eWxlID0gc3R5bGUuc3R5bGU7XG4gICAgICAgIG91dHB1dFsnYmFja2dyb3VuZC1jb2xvciddID0gc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXTtcblxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydGVyOiBjb252ZXJ0ZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTLmpzIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgICdzaGFwZSc6ICdzaGFwZScsXG4gICAgJ3dpZHRoJzogJ3dpZHRoJywgXG4gICAgJ2hlaWdodCc6ICdoZWlnaHQnLFxuICAgICdiYWNrZ3JvdW5kX2NvbG9yJzogJ2JhY2tncm91bmQtY29sb3InLFxuICAgICdiYWNrZ3JvdW5kX29wYWNpdHknOiAnYmFja2dyb3VuZC1vcGFjaXR5JyxcbiAgICAnbGFiZWwnOiAnbGFiZWwnLFxuICAgICdsYWJlbF9jb2xvcic6ICdsYWJlbC1jb2xvcicsIFxuICAgICdvcGFjaXR5JzogJ29wYWNpdHknLFxuICAgICdsaW5lX2NvbG9yJzogJ2xpbmUtY29sb3InXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlNDb25zdGFudHMuanMiXSwic291cmNlUm9vdCI6IiJ9