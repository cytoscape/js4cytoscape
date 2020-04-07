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
var cxUtil = __webpack_require__(1);

function simpleDefaultPropertyConvert(targetStyleField, portablePropertValue) {
    var targetStyleEntry = new Map();
    targetStyleEntry.set(targetStyleField, portablePropertValue);
    return targetStyleEntry;
}

var defaultPropertyConvert = {
    'node': {
        'shape': function shape(portablePropertyValue) {
            return simpleDefaultPropertyConvert('shape', portablePropertyValue);
        },
        'width': function width(portablePropertyValue) {
            return simpleDefaultPropertyConvert('width', portablePropertyValue);
        },
        'height': function height(portablePropertyValue) {
            return simpleDefaultPropertyConvert('height', portablePropertyValue);
        },
        'background-color': function backgroundColor(portablePropertyValue) {
            return simpleDefaultPropertyConvert('background-color', portablePropertyValue);
        },
        'background-opacity': function backgroundOpacity(portablePropertyValue) {
            return simpleDefaultPropertyConvert('background-opacity', portablePropertyValue);
        },
        'label': function label(portablePropertyValue) {
            return simpleDefaultPropertyConvert('label', portablePropertyValue);
        },
        'label-color': function labelColor(portablePropertyValue) {
            return simpleDefaultPropertyConvert('label-color', portablePropertyValue);
        }
    },
    'edge': {
        'width': function width(portablePropertyValue) {
            return simpleDefaultPropertyConvert('width', portablePropertyValue);
        },
        'opacity': function opacity(portablePropertyValue) {
            return simpleDefaultPropertyConvert('opacity', portablePropertyValue);
        },
        'line-color': function lineColor(portablePropertyValue) {
            return simpleDefaultPropertyConvert('line-color', portablePropertyValue);
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

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyZDgzM2E1YjgzNDcxMDhkZTA1MSIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIk9iamVjdCIsImZyZWV6ZSIsIkNYX1ZFUlNJT04iLCJOT0RFIiwiRURHRSIsIk5FVFdPUksiLCJOT0RFUyIsIkVER0VTIiwiSUQiLCJYIiwiWSIsIloiLCJWIiwiQVQiLCJOIiwiRSIsIlZJU1VBTF9QUk9QRVJUSUVTIiwiREVGQVVMVCIsIlNUWUxFIiwiZ2V0Q3hWZXJzaW9uIiwidmVyc2lvblN0cmluZyIsInZlcnNpb25BcnJheSIsInNwbGl0IiwibWFwIiwibnVtYmVyU3RyaW5nIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXNOYU4iLCJlbGVtZW50IiwiZ2V0Q3hNYWpvclZlcnNpb24iLCJjb252ZXJ0ZXIiLCJyZXF1aXJlIiwiY29udmVydCIsImN4IiwidGFyZ2V0Rm9ybWF0IiwiY3hDb25zdGFudHMiLCJsYXJnZU5ldHdvcmsiLCJjeXRvc2NhcGVKUyIsImN4VXRpbCIsInZlcmlmeVZlcnNpb24iLCJmaXJzdEVsZW1lbnQiLCJtYWpvclZlcnNpb24iLCJsbnZDb252ZXJ0Iiwib3V0cHV0Iiwibm9kZVZhbHVlTWFwIiwibm9kZUxheW91dE1hcCIsImN4Tm9kZXMiLCJjeEVkZ2VzIiwiY3hWaXN1YWxQcm9wZXJ0aWVzIiwiY3hOb2RlIiwiY3hJZCIsInRvU3RyaW5nIiwieCIsInkiLCJ6IiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJub2RlQ291bnQiLCJlZGdlQ291bnQiLCJ2aXN1YWxQcm9wZXJ0eUNvdW50Iiwic2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCIsInRhcmdldFN0eWxlRmllbGQiLCJwb3J0YWJsZVByb3BlcnRWYWx1ZSIsInRhcmdldFN0eWxlRW50cnkiLCJNYXAiLCJzZXQiLCJkZWZhdWx0UHJvcGVydHlDb252ZXJ0IiwicG9ydGFibGVQcm9wZXJ0eVZhbHVlIiwic2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCIsImF0dHJpYnV0ZU5hbWUiLCJwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0IiwiZ2V0Q1NTU3R5bGVFbnRyaWVzIiwiY3hTdHlsZUVudHJpZXMiLCJlbnRpdHlUeXBlIiwia2V5cyIsImtleSIsImNzc0VudHJpZXMiLCJ2YWx1ZSIsImdldElkU2VsZWN0b3IiLCJpZCIsImVsZW1lbnRUeXBlIiwiZ2V0U3R5bGVFbGVtZW50Iiwic2VsZWN0b3IiLCJjc3MiLCJnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJ5IiwicG9ydGFibGVQcm9wZXJ0eUtleSIsImN4TWFwcGluZ0RlZmluaXRpb24iLCJnZXRQYXNzdGhyb3VnaE1hcHBpbmdDU1NFbnRyeSIsImF0dHJpYnV0ZSIsImdldERpc2NyZXRlU2VsZWN0b3IiLCJhdHRyaWJ1dGVEYXRhVHlwZSIsImF0dHJpYnV0ZVZhbHVlIiwiZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cnkiLCJhdHR0cmlidXRlVG9WYWx1ZU1hcCIsImRpc2NyZXRlTWFwIiwidiIsInZwIiwic3R5bGVNYXAiLCJnZXRDU1NNYXBwaW5nRW50cmllcyIsImN4TWFwcGluZ0VudHJpZXMiLCJhdHRyaWJ1dGVUeXBlTWFwIiwiY3hNYXBwaW5nRW50cnkiLCJ0eXBlIiwicHVzaCIsImRlZmluaXRpb24iLCJnZXRWaXN1YWxQcm9wZXJ0aWVzIiwibm9kZUF0dHJpYnV0ZVR5cGVNYXAiLCJlZGdlQXR0cmlidXRlVHlwZU1hcCIsInN0eWxlIiwidW5kZWZpbmVkIiwiZGVmYXVsdENTU05vZGVTdHlsZSIsImRlZmF1bHRDU1NFZGdlU3R5bGUiLCJjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yIiwibWFwcGluZ0NTU05vZGVTdHlsZSIsIm1hcHBpbmdDU1NFZGdlU3R5bGUiLCJ2cEVsZW1lbnQiLCJ2cEF0IiwiYXQiLCJkZWZhdWx0U3R5bGVzIiwiZGVmYXVsdCIsIm5vZGUiLCJlZGdlIiwibmV0d29yayIsIm5vZGVNYXBwaW5nIiwiZWRnZU1hcHBpbmciLCJOT0RFX1NFTEVDVE9SIiwiRURHRV9TRUxFQ1RPUiIsImFwcGx5IiwiZ2V0RGF0YSIsImF0dHJpYnV0ZU5hbWVNYXAiLCJhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJkYXRhIiwibmV3S2V5IiwiaGFzIiwiZ2V0IiwidXBkYXRlQXR0cmlidXRlVHlwZU1hcCIsImF0dHJpYnV0ZURlY2xhcmF0aW9ucyIsImF0dHJpYnV0ZURlY2xhcmF0aW9uIiwiZCIsInVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAiLCJhIiwidXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwiZWxlbWVudHMiLCJsYXlvdXQiLCJub2RlTWFwIiwiZWRnZU1hcCIsImN4QXR0cmlidXRlRGVjbGFyYXRpb25zIiwibm9kZUF0dHJpYnV0ZU5hbWVNYXAiLCJlZGdlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwidXBkYXRlSW5mZXJyZWRUeXBlcyIsImluZmVycmVkVHlwZSIsImN4QXNwZWN0IiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbiIsIm5vZGVzIiwiZWRnZXMiLCJjeEVkZ2UiLCJzIiwidCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7O1FBRUE7UUFDQTs7Ozs7Ozs7OztBQzVEQUEsT0FBT0MsT0FBUCxHQUFpQkMsT0FBT0MsTUFBUCxDQUFjO0FBQzNCQyxnQkFBWSxXQURlO0FBRTNCQyxVQUFNLE1BRnFCO0FBRzNCQyxVQUFNLE1BSHFCO0FBSTNCQyxhQUFTLFNBSmtCOztBQU0zQkMsV0FBTyxPQU5vQjtBQU8zQkMsV0FBTyxPQVBvQjs7QUFTM0JDLFFBQUksSUFUdUI7QUFVM0JDLE9BQUcsR0FWd0I7QUFXM0JDLE9BQUcsR0FYd0I7QUFZM0JDLE9BQUcsR0Fad0I7QUFhM0JDLE9BQUcsR0Fid0I7O0FBZTNCQyxRQUFJLElBZnVCO0FBZ0IzQkMsT0FBRyxHQWhCd0I7QUFpQjNCQyxPQUFHLEdBakJ3Qjs7QUFtQjNCQyx1QkFBbUIsa0JBbkJRO0FBb0IzQkMsYUFBUyxTQXBCa0I7O0FBc0IzQkMsV0FBTztBQXRCb0IsQ0FBZCxDQUFqQixDOzs7Ozs7Ozs7QUNEQSxTQUFTQyxZQUFULENBQXNCQyxhQUF0QixFQUFxQztBQUNqQyxRQUFNQyxlQUFlRCxjQUFjRSxLQUFkLENBQW9CLEdBQXBCLEVBQXlCQyxHQUF6QixDQUE2QixVQUFDQyxZQUFELEVBQWtCO0FBQUUsZUFBT0MsU0FBU0QsWUFBVCxFQUF1QixFQUF2QixDQUFQO0FBQW9DLEtBQXJGLENBQXJCO0FBQ0EsUUFBSUgsYUFBYUssTUFBYixLQUF3QixDQUF4QixJQUE2QkwsYUFBYUssTUFBYixJQUF1QixDQUF4RCxFQUEyRDtBQUN2RCxjQUFNLGtDQUFrQ04sYUFBeEM7QUFDSDtBQUNEQyxpQkFBYU0sT0FBYixDQUFxQixtQkFBVztBQUM1QixZQUFJQyxNQUFNQyxPQUFOLENBQUosRUFBb0I7QUFDaEIsa0JBQU0sMENBQTBDVCxhQUFoRDtBQUNIO0FBQ0osS0FKRDtBQUtBLFdBQU9DLFlBQVA7QUFDSDs7QUFFRCxTQUFTUyxpQkFBVCxDQUEyQlYsYUFBM0IsRUFBMEM7QUFDdEMsV0FBT0EsZ0JBQWdCRCxhQUFhQyxhQUFiLEVBQTRCLENBQTVCLENBQWhCLEdBQWlELENBQXhEO0FBQ0g7O0FBRUR0QixPQUFPQyxPQUFQLEdBQWlCO0FBQ2JvQixrQkFBY0EsWUFERDtBQUViVyx1QkFBbUJBO0FBRk4sQ0FBakIsQzs7Ozs7OztBQ2pCYTs7QUFFYixJQUFNQyxZQUFZQyxtQkFBT0EsQ0FBRSxDQUFULENBQWxCOztBQUVBbEMsT0FBT0MsT0FBUCxDQUFla0MsT0FBZixHQUF5QixVQUFDQyxFQUFELEVBQUtDLFlBQUwsRUFBc0I7QUFBRSxTQUFPSixVQUFVRSxPQUFWLENBQWtCQyxFQUFsQixFQUFzQkMsWUFBdEIsQ0FBUDtBQUE2QyxDQUE5RixDOzs7Ozs7Ozs7QUNIQSxJQUFNQyxjQUFjSixtQkFBT0EsQ0FBQyxDQUFSLENBQXBCO0FBQ0EsSUFBTUssZUFBZUwsbUJBQU9BLENBQUUsQ0FBVCxDQUFyQjtBQUNBLElBQU1NLGNBQWNOLG1CQUFPQSxDQUFFLENBQVQsQ0FBcEI7QUFDQSxJQUFNTyxTQUFTUCxtQkFBT0EsQ0FBQyxDQUFSLENBQWY7O0FBRUEsU0FBU1EsYUFBVCxDQUF1Qk4sRUFBdkIsRUFBMkI7QUFDdkIsUUFBTU8sZUFBZVAsR0FBRyxDQUFILENBQXJCO0FBQ0EsUUFBTWQsZ0JBQWdCcUIsYUFBYUwsWUFBWWxDLFVBQXpCLENBQXRCOztBQUVBLFFBQU13QyxlQUFlSCxPQUFPVCxpQkFBUCxDQUF5QlYsYUFBekIsQ0FBckI7O0FBRUEsUUFBSXNCLGlCQUFpQixDQUFyQixFQUF3QjtBQUNwQixjQUFNLDhCQUE4QnRCLGFBQXBDO0FBQ0g7QUFDSjs7QUFFRCxTQUFTYSxPQUFULENBQWlCQyxFQUFqQixFQUFxQkMsWUFBckIsRUFBbUM7QUFDL0JLLGtCQUFjTixFQUFkO0FBQ0EsWUFBT0MsWUFBUDtBQUNJLGFBQUtFLGFBQWFOLFNBQWIsQ0FBdUJJLFlBQTVCO0FBQTBDO0FBQ3RDLHVCQUFPRSxhQUFhTixTQUFiLENBQXVCRSxPQUF2QixDQUErQkMsRUFBL0IsQ0FBUDtBQUNIO0FBQ0QsYUFBS0ksWUFBWVAsU0FBWixDQUFzQkksWUFBM0I7QUFBeUM7QUFDckMsdUJBQU9HLFlBQVlQLFNBQVosQ0FBc0JFLE9BQXRCLENBQThCQyxFQUE5QixDQUFQO0FBQ0g7QUFOTDtBQVFIOztBQUVEcEMsT0FBT0MsT0FBUCxHQUFpQjtBQUNia0MsYUFBU0E7QUFESSxDQUFqQixDOzs7Ozs7Ozs7QUM1QkEsSUFBTUcsY0FBY0osbUJBQU9BLENBQUMsQ0FBUixDQUFwQjtBQUNBLElBQU1PLFNBQVNQLG1CQUFPQSxDQUFDLENBQVIsQ0FBZjs7QUFFQSxTQUFTVyxVQUFULENBQW9CVCxFQUFwQixFQUF3QjtBQUNwQixRQUFJVSxTQUFTLEVBQWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBSUMsZUFBZSxFQUFuQjtBQUNBLFFBQUlDLGdCQUFnQixFQUFwQjtBQUNBLFFBQUlDLGdCQUFKO0FBQ0EsUUFBSUMsZ0JBQUo7QUFDQSxRQUFJQywyQkFBSjtBQUNBZixPQUFHUCxPQUFILENBQVcsVUFBQ0UsT0FBRCxFQUFhO0FBQ3BCLFlBQUlBLFFBQVEsT0FBUixDQUFKLEVBQXNCO0FBQ2xCa0Isc0JBQVVsQixRQUFRLE9BQVIsQ0FBVjtBQUNBa0Isb0JBQVFwQixPQUFSLENBQWdCLFVBQUN1QixNQUFELEVBQVk7QUFDeEIsb0JBQU1DLE9BQU9ELE9BQU8sSUFBUCxFQUFhRSxRQUFiLEVBQWI7QUFDQVAsNkJBQWFNLElBQWIsSUFBcUJELE9BQU8sR0FBUCxDQUFyQjtBQUNBSiw4QkFBY0ssSUFBZCxJQUFzQjtBQUNsQkUsdUJBQUdILE9BQU8sR0FBUCxDQURlO0FBRWxCSSx1QkFBR0osT0FBTyxHQUFQLENBRmU7QUFHbEJLLHVCQUFHTCxPQUFPLEdBQVA7QUFIZSxpQkFBdEI7QUFLSCxhQVJEO0FBU0gsU0FYRCxNQVdPLElBQUlyQixRQUFRLE9BQVIsQ0FBSixFQUFzQjtBQUN6Qm1CLHNCQUFVbkIsUUFBUSxPQUFSLENBQVY7QUFDSCxTQUZNLE1BRUEsSUFBSUEsUUFBUSxrQkFBUixDQUFKLEVBQWlDO0FBQ3BDb0IsaUNBQXFCcEIsUUFBUSxrQkFBUixDQUFyQjtBQUNIO0FBQ0osS0FqQkQ7O0FBbUJBMkIsWUFBUUMsR0FBUixDQUFZLGlCQUFpQkMsS0FBS0MsU0FBTCxDQUFlZCxZQUFmLENBQTdCO0FBQ0FXLFlBQVFDLEdBQVIsQ0FBWSxhQUFhQyxLQUFLQyxTQUFMLENBQWViLGFBQWYsQ0FBekI7O0FBRUE7QUFDQTtBQUNBRixXQUFPZ0IsU0FBUCxHQUFtQmIsUUFBUXJCLE1BQTNCO0FBQ0FrQixXQUFPaUIsU0FBUCxHQUFtQmIsUUFBUXRCLE1BQTNCO0FBQ0FrQixXQUFPa0IsbUJBQVAsR0FBNkJiLG1CQUFtQnZCLE1BQWhEOztBQUVBLFdBQU9rQixNQUFQO0FBQ0g7O0FBSUQsSUFBTWIsWUFBWTtBQUNkSSxrQkFBYyxLQURBO0FBRWRGLGFBQVUsaUJBQUNDLEVBQUQsRUFBUTtBQUNkLGVBQU9TLFdBQVdULEVBQVgsQ0FBUDtBQUNIO0FBSmEsQ0FBbEI7O0FBT0FwQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JnQyxlQUFXQTtBQURFLENBQWpCLEM7Ozs7Ozs7Ozs7O0FDdERBLElBQU1LLGNBQWNKLG1CQUFPQSxDQUFDLENBQVIsQ0FBcEI7QUFDQSxJQUFNTyxTQUFTUCxtQkFBT0EsQ0FBQyxDQUFSLENBQWY7O0FBRUEsU0FBUytCLDRCQUFULENBQXNDQyxnQkFBdEMsRUFBd0RDLG9CQUF4RCxFQUE4RTtBQUMxRSxRQUFNQyxtQkFBbUIsSUFBSUMsR0FBSixFQUF6QjtBQUNBRCxxQkFBaUJFLEdBQWpCLENBQXFCSixnQkFBckIsRUFBdUNDLG9CQUF2QztBQUNBLFdBQU9DLGdCQUFQO0FBQ0g7O0FBRUQsSUFBTUcseUJBQXlCO0FBQzNCLFlBQVE7QUFDSixpQkFBUyxlQUFDQyxxQkFBRDtBQUFBLG1CQUEyQlAsNkJBQTZCLE9BQTdCLEVBQXNDTyxxQkFBdEMsQ0FBM0I7QUFBQSxTQURMO0FBRUosaUJBQVMsZUFBQ0EscUJBQUQ7QUFBQSxtQkFBMkJQLDZCQUE2QixPQUE3QixFQUFzQ08scUJBQXRDLENBQTNCO0FBQUEsU0FGTDtBQUdKLGtCQUFVLGdCQUFDQSxxQkFBRDtBQUFBLG1CQUEyQlAsNkJBQTZCLFFBQTdCLEVBQXVDTyxxQkFBdkMsQ0FBM0I7QUFBQSxTQUhOO0FBSUosNEJBQW9CLHlCQUFDQSxxQkFBRDtBQUFBLG1CQUEyQlAsNkJBQTZCLGtCQUE3QixFQUFpRE8scUJBQWpELENBQTNCO0FBQUEsU0FKaEI7QUFLSiw4QkFBc0IsMkJBQUNBLHFCQUFEO0FBQUEsbUJBQTJCUCw2QkFBNkIsb0JBQTdCLEVBQW1ETyxxQkFBbkQsQ0FBM0I7QUFBQSxTQUxsQjtBQU1KLGlCQUFTLGVBQUNBLHFCQUFEO0FBQUEsbUJBQTJCUCw2QkFBNkIsT0FBN0IsRUFBc0NPLHFCQUF0QyxDQUEzQjtBQUFBLFNBTkw7QUFPSix1QkFBZSxvQkFBQ0EscUJBQUQ7QUFBQSxtQkFBMkJQLDZCQUE2QixhQUE3QixFQUE0Q08scUJBQTVDLENBQTNCO0FBQUE7QUFQWCxLQURtQjtBQVUzQixZQUFRO0FBQ0osaUJBQVMsZUFBQ0EscUJBQUQ7QUFBQSxtQkFBMkJQLDZCQUE2QixPQUE3QixFQUFzQ08scUJBQXRDLENBQTNCO0FBQUEsU0FETDtBQUVKLG1CQUFXLGlCQUFDQSxxQkFBRDtBQUFBLG1CQUEyQlAsNkJBQTZCLFNBQTdCLEVBQXdDTyxxQkFBeEMsQ0FBM0I7QUFBQSxTQUZQO0FBR0osc0JBQWMsbUJBQUNBLHFCQUFEO0FBQUEsbUJBQTJCUCw2QkFBNkIsWUFBN0IsRUFBMkNPLHFCQUEzQyxDQUEzQjtBQUFBO0FBSFY7QUFWbUIsQ0FBL0I7O0FBaUJBLFNBQVNDLCtCQUFULENBQXlDUCxnQkFBekMsRUFBMkRRLGFBQTNELEVBQTBFO0FBQ3RFLFFBQU01QixTQUFTLEVBQWY7QUFDQUEsV0FBT29CLGdCQUFQLElBQTJCLFVBQVVRLGFBQVYsR0FBMEIsR0FBckQ7QUFDQSxXQUFPNUIsTUFBUDtBQUNIOztBQUVELElBQU02Qiw0QkFBNEI7QUFDOUIsWUFBUTtBQUNKLGlCQUFTLGVBQUNELGFBQUQ7QUFBQSxtQkFBbUJELGdDQUFnQyxPQUFoQyxFQUF5Q0MsYUFBekMsQ0FBbkI7QUFBQSxTQURMO0FBRUosaUJBQVMsZUFBQ0EsYUFBRDtBQUFBLG1CQUFtQkQsZ0NBQWdDLE9BQWhDLEVBQXlDQyxhQUF6QyxDQUFuQjtBQUFBLFNBRkw7QUFHSixrQkFBVSxnQkFBQ0EsYUFBRDtBQUFBLG1CQUFtQkQsZ0NBQWdDLFFBQWhDLEVBQTBDQyxhQUExQyxDQUFuQjtBQUFBLFNBSE47QUFJSiw0QkFBb0IseUJBQUNBLGFBQUQ7QUFBQSxtQkFBbUJELGdDQUFnQyxrQkFBaEMsRUFBb0RDLGFBQXBELENBQW5CO0FBQUEsU0FKaEI7QUFLSiw4QkFBc0IsMkJBQUNBLGFBQUQ7QUFBQSxtQkFBbUJELGdDQUFnQyxvQkFBaEMsRUFBc0RDLGFBQXRELENBQW5CO0FBQUEsU0FMbEI7QUFNSixpQkFBUyxlQUFDQSxhQUFEO0FBQUEsbUJBQW1CRCxnQ0FBZ0MsT0FBaEMsRUFBeUNDLGFBQXpDLENBQW5CO0FBQUEsU0FOTDtBQU9KLHVCQUFlLG9CQUFDQSxhQUFEO0FBQUEsbUJBQW1CRCxnQ0FBZ0MsYUFBaEMsRUFBK0NDLGFBQS9DLENBQW5CO0FBQUE7QUFQWCxLQURzQjtBQVU5QixZQUFRO0FBQ0osaUJBQVMsZUFBQ0EsYUFBRDtBQUFBLG1CQUFtQkQsZ0NBQWdDLE9BQWhDLEVBQXlDQyxhQUF6QyxDQUFuQjtBQUFBLFNBREw7QUFFSixtQkFBVyxpQkFBQ0EsYUFBRDtBQUFBLG1CQUFtQkQsZ0NBQWdDLFNBQWhDLEVBQTJDQyxhQUEzQyxDQUFuQjtBQUFBLFNBRlA7QUFHSixzQkFBYyxtQkFBQ0EsYUFBRDtBQUFBLG1CQUFtQkQsZ0NBQWdDLFlBQWhDLEVBQThDQyxhQUE5QyxDQUFuQjtBQUFBO0FBSFY7QUFWc0IsQ0FBbEM7O0FBaUJBLFNBQVNFLGtCQUFULENBQTRCQyxjQUE1QixFQUE0Q0MsVUFBNUMsRUFBd0Q7QUFDcEQsUUFBSWhDLFNBQVMsRUFBYjtBQUNBNUMsV0FBTzZFLElBQVAsQ0FBWUYsY0FBWixFQUE0QmhELE9BQTVCLENBQW9DLFVBQUNtRCxHQUFELEVBQVM7QUFDekMsWUFBTVIsd0JBQXdCSyxlQUFlRyxHQUFmLENBQTlCO0FBQ0EsWUFBSVQsdUJBQXVCTyxVQUF2QixFQUFtQ0UsR0FBbkMsQ0FBSixFQUE2QztBQUN6QyxnQkFBTUMsYUFBYVYsdUJBQXVCTyxVQUF2QixFQUFtQ0UsR0FBbkMsRUFBd0NSLHFCQUF4QyxDQUFuQjtBQUNBUyx1QkFBV3BELE9BQVgsQ0FBbUIsVUFBQ3FELEtBQUQsRUFBUUYsR0FBUixFQUFnQjtBQUMvQmxDLHVCQUFPa0MsR0FBUCxJQUFjRSxLQUFkO0FBQ0gsYUFGRDtBQUdIO0FBQ0osS0FSRDtBQVNBLFdBQU9wQyxNQUFQO0FBQ0g7O0FBRUQsU0FBU3FDLGFBQVQsQ0FBdUJDLEVBQXZCLEVBQTJCQyxXQUEzQixFQUF3QztBQUNwQztBQUNBLFdBQU9BLGNBQWMsR0FBZCxHQUFvQkQsRUFBM0I7QUFDSDs7QUFJRCxTQUFTRSxlQUFULENBQXlCQyxRQUF6QixFQUFtQ0MsR0FBbkMsRUFBd0M7QUFDcEMsV0FBTyxFQUFFLFlBQVlELFFBQWQsRUFBd0IsU0FBU0MsR0FBakMsRUFBUDtBQUNIOztBQUVELFNBQVNDLDRCQUFULENBQXNDQyxtQkFBdEMsRUFBMkRDLG1CQUEzRCxFQUFnRmIsVUFBaEYsRUFBNEY7QUFDeEYsV0FBTyxFQUFQO0FBQ0g7O0FBRUQsU0FBU2MsNkJBQVQsQ0FBdUNGLG1CQUF2QyxFQUE0REMsbUJBQTVELEVBQWlGYixVQUFqRixFQUE2RjtBQUN6RixRQUFJSCwwQkFBMEJHLFVBQTFCLEVBQXNDWSxtQkFBdEMsQ0FBSixFQUFnRTtBQUM1RCxZQUFNRixNQUFNYiwwQkFBMEJHLFVBQTFCLEVBQXNDWSxtQkFBdEMsRUFBMkRDLG9CQUFvQkUsU0FBL0UsQ0FBWjtBQUNBLGVBQU9QLGdCQUFnQlIsVUFBaEIsRUFBNEJVLEdBQTVCLENBQVA7QUFDSDtBQUNELFdBQU8sSUFBUDtBQUNIOztBQUVELFNBQVNNLG1CQUFULENBQTZCaEIsVUFBN0IsRUFBeUNKLGFBQXpDLEVBQXdEcUIsaUJBQXhELEVBQTJFQyxjQUEzRSxFQUEyRjtBQUN2RixRQUFJRCxxQkFBcUIsUUFBekIsRUFBbUM7QUFDL0IsZUFBT2pCLGFBQWEsR0FBYixHQUFtQkosYUFBbkIsR0FBbUMsT0FBbkMsR0FBNkNzQixjQUE3QyxHQUE4RCxLQUFyRTtBQUNILEtBRkQsTUFFTyxJQUFJRCxxQkFBcUIsU0FBekIsRUFBb0M7O0FBRXZDLFlBQUlDLGtCQUFrQixNQUF0QixFQUE4QjtBQUMxQixtQkFBT2xCLGFBQWEsSUFBYixHQUFvQkosYUFBcEIsR0FBb0MsR0FBM0M7QUFDSCxTQUZELE1BRU87QUFDSCxtQkFBT0ksYUFBYSxHQUFiLEdBQW1CSixhQUFuQixHQUFtQyxLQUFuQyxHQUEyQ0EsYUFBM0MsR0FBMkQsR0FBbEU7QUFDSDtBQUNKLEtBUE0sTUFPQTtBQUNILGVBQU9JLGFBQWEsR0FBYixHQUFtQkosYUFBbkIsR0FBbUMsS0FBbkMsR0FBMkNzQixjQUEzQyxHQUE0RCxHQUFuRTtBQUNIO0FBQ0o7O0FBR0QsU0FBU0MsMEJBQVQsQ0FBb0NQLG1CQUFwQyxFQUF5REMsbUJBQXpELEVBQThFYixVQUE5RSxFQUEwRjtBQUN0RixRQUFNb0IsdUJBQXVCUCxvQkFBb0IsS0FBcEIsQ0FBN0I7QUFDQSxRQUFNakIsZ0JBQWdCaUIsb0JBQW9CLFdBQXBCLENBQXRCO0FBQ0EsUUFBTUksb0JBQW9CLFFBQTFCO0FBQ0FHLHlCQUFxQnJFLE9BQXJCLENBQTZCLFVBQUNzRSxXQUFELEVBQWlCO0FBQzFDekMsZ0JBQVFDLEdBQVIsQ0FBWSx1QkFBdUIrQixtQkFBdkIsR0FBNkMsSUFBN0MsR0FBb0RTLFlBQVlDLENBQWhFLEdBQW9FLE1BQXBFLEdBQTZFRCxZQUFZRSxFQUFyRzs7QUFFQSxZQUFNZCxXQUFXTyxvQkFBb0JoQixVQUFwQixFQUFnQ0osYUFBaEMsRUFBK0NxQixpQkFBL0MsRUFBa0VJLFlBQVlDLENBQTlFLENBQWpCO0FBQ0ExQyxnQkFBUUMsR0FBUixDQUFZLGlCQUFpQjRCLFFBQTdCO0FBQ0EsWUFBSWhCLHVCQUF1Qk8sVUFBdkIsRUFBbUNZLG1CQUFuQyxDQUFKLEVBQTZEO0FBQ3pELGdCQUFNWSxXQUFXL0IsdUJBQXVCTyxVQUF2QixFQUFtQ1ksbUJBQW5DLEVBQXdEUyxZQUFZRSxFQUFwRSxDQUFqQjtBQUNBLGdCQUFNYixNQUFNLEVBQVo7QUFDQWMscUJBQVN6RSxPQUFULENBQWlCLFVBQUNxRCxLQUFELEVBQVFGLEdBQVIsRUFBZ0I7QUFDN0JRLG9CQUFJUixHQUFKLElBQVdFLEtBQVg7QUFDSCxhQUZEO0FBR0F4QixvQkFBUUMsR0FBUixDQUFZLGVBQWVDLEtBQUtDLFNBQUwsQ0FBZTJCLEdBQWYsQ0FBM0I7QUFDSDtBQUNKLEtBYkQ7O0FBZ0JBLFdBQU8sSUFBUCxDQXBCc0YsQ0FvQnpFO0FBQ2hCOztBQUVEOzs7QUFHQSxTQUFTZSxvQkFBVCxDQUNJQyxnQkFESixFQUVJMUIsVUFGSixFQUdJMkIsZ0JBSEosRUFHc0I7QUFDbEIsUUFBSTNELFNBQVMsRUFBYjtBQUNBNUMsV0FBTzZFLElBQVAsQ0FBWXlCLGdCQUFaLEVBQThCM0UsT0FBOUIsQ0FBc0MsVUFBQ21ELEdBQUQsRUFBUztBQUMzQyxZQUFNMEIsaUJBQWlCRixpQkFBaUJ4QixHQUFqQixDQUF2QjtBQUNBdEIsZ0JBQVFDLEdBQVIsQ0FBWSxvQkFBb0IrQyxlQUFlQyxJQUEvQztBQUNBLGdCQUFRRCxlQUFlQyxJQUF2QjtBQUNJLGlCQUFLLFlBQUw7QUFBbUI7O0FBRWY7QUFDSDtBQUNELGlCQUFLLGFBQUw7QUFBb0I7QUFDaEI3RCwyQkFBTzhELElBQVAsQ0FBWWhCLDhCQUE4QlosR0FBOUIsRUFBbUMwQixlQUFlRyxVQUFsRCxFQUE4RC9CLFVBQTlELENBQVo7QUFDQTtBQUNIO0FBQ0QsaUJBQUssVUFBTDtBQUNJO0FBQ0ltQiwrQ0FBMkJqQixHQUEzQixFQUFnQzBCLGVBQWVHLFVBQS9DLEVBQTJEL0IsVUFBM0Q7QUFDQTtBQUNIO0FBYlQ7QUFnQkgsS0FuQkQ7QUFvQkEsV0FBT2hDLE1BQVA7QUFDSDs7QUFFRCxTQUFTZ0UsbUJBQVQsQ0FBNkIzRCxrQkFBN0IsRUFBaUQ0RCxvQkFBakQsRUFBdUVDLG9CQUF2RSxFQUE2RjtBQUN6RixRQUFJbEUsU0FBUztBQUNUbUUsZUFBTyxFQURFO0FBRVQsNEJBQW9CQztBQUZYLEtBQWI7O0FBS0EsUUFBSUMsc0JBQXNCRCxTQUExQjtBQUNBLFFBQUlFLHNCQUFzQkYsU0FBMUI7O0FBRUEsUUFBSUcsNEJBQTRCSCxTQUFoQzs7QUFFQSxRQUFJSSxzQkFBc0JKLFNBQTFCO0FBQ0EsUUFBSUssc0JBQXNCTCxTQUExQjs7QUFFQS9ELHVCQUFtQnRCLE9BQW5CLENBQTJCLFVBQUMyRixTQUFELEVBQWU7QUFDdEMsWUFBTUMsT0FBT0QsVUFBVUUsRUFBdkI7QUFDQSxZQUFJRCxTQUFTbkYsWUFBWWxCLEtBQXpCLEVBQWdDO0FBQzVCLGdCQUFNOEQsUUFBUXNDLFVBQVVwQixDQUF4QjtBQUNBLGdCQUFNdUIsZ0JBQWdCekMsTUFBTTBDLE9BQTVCOztBQUVBVCxrQ0FBc0J2QyxtQkFBbUIrQyxjQUFjRSxJQUFqQyxFQUF1QyxNQUF2QyxDQUF0QjtBQUNBVCxrQ0FBc0J4QyxtQkFBbUIrQyxjQUFjRyxJQUFqQyxFQUF1QyxNQUF2QyxDQUF0Qjs7QUFFQVQsd0NBQTRCTSxjQUFjSSxPQUFkLENBQXNCLGtCQUF0QixDQUE1Qjs7QUFFQSxnQkFBTUMsY0FBYzlDLE1BQU04QyxXQUExQjtBQUNBVixrQ0FBc0JmLHFCQUFxQnlCLFdBQXJCLEVBQWtDLE1BQWxDLEVBQTBDakIsb0JBQTFDLENBQXRCOztBQUVBLGdCQUFNa0IsY0FBYy9DLE1BQU0rQyxXQUExQjtBQUNBVixrQ0FBc0JoQixxQkFBcUIwQixXQUFyQixFQUFrQyxNQUFsQyxFQUEwQ2pCLG9CQUExQyxDQUF0QjtBQUVILFNBZkQsTUFlTyxJQUFJUSxhQUFhbEYsWUFBWXRCLENBQTdCLEVBQWdDO0FBQ25DO0FBQ0gsU0FGTSxNQUVBLElBQUl3RyxhQUFhbEYsWUFBWXJCLENBQTdCLEVBQWdDO0FBQ25DO0FBQ0g7QUFDSixLQXRCRDs7QUF3QkE7QUFDQTZCLFdBQU9tRSxLQUFQLENBQWFMLElBQWIsQ0FBa0J0QixnQkFBZ0I0QyxhQUFoQixFQUErQmYsbUJBQS9CLENBQWxCO0FBQ0FyRSxXQUFPbUUsS0FBUCxDQUFhTCxJQUFiLENBQWtCdEIsZ0JBQWdCNkMsYUFBaEIsRUFBK0JmLG1CQUEvQixDQUFsQjs7QUFFQXRFLFdBQU9tRSxLQUFQLENBQWFMLElBQWIsQ0FBa0J3QixLQUFsQixDQUF3QnRGLE9BQU9tRSxLQUEvQixFQUFzQ0ssbUJBQXRDOztBQUVBeEUsV0FBTyxrQkFBUCxJQUE2QnVFLHlCQUE3Qjs7QUFFQSxXQUFPdkUsTUFBUDtBQUNIOztBQUVELElBQU1vRixnQkFBZ0IsTUFBdEI7QUFDQSxJQUFNQyxnQkFBZ0IsTUFBdEI7O0FBRUEsU0FBU0UsT0FBVCxDQUFpQmpDLENBQWpCLEVBQW9Ca0MsZ0JBQXBCLEVBQXNDQyx3QkFBdEMsRUFBZ0U7QUFDNUQsUUFBSUMsT0FBTyxFQUFYO0FBQ0F0SSxXQUFPNkUsSUFBUCxDQUFZcUIsQ0FBWixFQUFldkUsT0FBZixDQUF1QixVQUFDbUQsR0FBRCxFQUFTO0FBQzVCLFlBQU15RCxTQUFTSCxpQkFBaUJJLEdBQWpCLENBQXFCMUQsR0FBckIsSUFBNEJzRCxpQkFBaUJLLEdBQWpCLENBQXFCM0QsR0FBckIsQ0FBNUIsR0FBd0RBLEdBQXZFO0FBQ0F3RCxhQUFLQyxNQUFMLElBQWVyQyxFQUFFcEIsR0FBRixDQUFmO0FBQ0gsS0FIRDtBQUlBdUQsNkJBQXlCMUcsT0FBekIsQ0FBaUMsVUFBQ3FELEtBQUQsRUFBUUYsR0FBUixFQUFnQjtBQUM3QyxZQUFJLENBQUN3RCxLQUFLeEQsR0FBTCxDQUFMLEVBQWdCO0FBQ1p3RCxpQkFBS3hELEdBQUwsSUFBWUUsS0FBWjtBQUNIO0FBQ0osS0FKRDtBQUtBLFdBQU9zRCxJQUFQO0FBQ0g7O0FBRUQsU0FBU0ksc0JBQVQsQ0FBZ0NuQyxnQkFBaEMsRUFBa0RvQyxxQkFBbEQsRUFBeUU7QUFDckUzSSxXQUFPNkUsSUFBUCxDQUFZOEQscUJBQVosRUFBbUNoSCxPQUFuQyxDQUEyQyxVQUFDNkMsYUFBRCxFQUFtQjtBQUMxRCxZQUFNb0UsdUJBQXVCRCxzQkFBc0JuRSxhQUF0QixDQUE3QjtBQUNBLFlBQUlvRSxxQkFBcUIsR0FBckIsQ0FBSixFQUErQjtBQUMzQnJDLDZCQUFpQm5DLEdBQWpCLENBQXFCSSxhQUFyQixFQUFvQ29FLHFCQUFxQkMsQ0FBekQ7QUFDSDtBQUNKLEtBTEQ7QUFNSDs7QUFFRCxTQUFTQyxzQkFBVCxDQUFnQ1YsZ0JBQWhDLEVBQWtETyxxQkFBbEQsRUFBeUU7QUFDckUzSSxXQUFPNkUsSUFBUCxDQUFZOEQscUJBQVosRUFBbUNoSCxPQUFuQyxDQUEyQyxVQUFDNkMsYUFBRCxFQUFtQjtBQUMxRCxZQUFNb0UsdUJBQXVCRCxzQkFBc0JuRSxhQUF0QixDQUE3QjtBQUNBLFlBQUlvRSxxQkFBcUIsR0FBckIsQ0FBSixFQUErQjtBQUMzQnBGLG9CQUFRQyxHQUFSLENBQVksZUFBZW1GLHFCQUFxQkcsQ0FBcEMsR0FBd0Msd0JBQXhDLEdBQW1FdkUsYUFBL0U7QUFDQTRELDZCQUFpQmhFLEdBQWpCLENBQXFCd0UscUJBQXFCRyxDQUExQyxFQUE2Q3ZFLGFBQTdDO0FBQ0g7QUFDSixLQU5EO0FBT0g7O0FBRUQsU0FBU3dFLDhCQUFULENBQXdDWCx3QkFBeEMsRUFBa0VNLHFCQUFsRSxFQUF5RjtBQUNyRjNJLFdBQU82RSxJQUFQLENBQVk4RCxxQkFBWixFQUFtQ2hILE9BQW5DLENBQTJDLFVBQUM2QyxhQUFELEVBQW1CO0FBQzFELFlBQU1vRSx1QkFBdUJELHNCQUFzQm5FLGFBQXRCLENBQTdCO0FBQ0EsWUFBSW9FLHFCQUFxQixHQUFyQixDQUFKLEVBQStCO0FBQzNCcEYsb0JBQVFDLEdBQVIsQ0FBWSxlQUFlZSxhQUFmLEdBQStCLHFCQUEvQixHQUF1RG9FLHFCQUFxQjFDLENBQXhGO0FBQ0FtQyxxQ0FBeUJqRSxHQUF6QixDQUE2QkksYUFBN0IsRUFBNENvRSxxQkFBcUIxQyxDQUFqRTtBQUNIO0FBQ0osS0FORDtBQU9IOztBQUVELElBQU1uRSxZQUFZO0FBQ2RJLGtCQUFjLGFBREE7QUFFZEYsYUFBUyxpQkFBQ0MsRUFBRCxFQUFRO0FBQ2IsWUFBTVUsU0FBUztBQUNYbUUsbUJBQU8sRUFESTtBQUVYa0Msc0JBQVUsRUFGQztBQUdYQyxvQkFBUSxFQUhHO0FBSVgsZ0NBQW9CO0FBSlQsU0FBZjs7QUFPQSxZQUFJQyxVQUFVLElBQUloRixHQUFKLEVBQWQ7QUFDQSxZQUFJaUYsVUFBVSxJQUFJakYsR0FBSixFQUFkOztBQUVBLFlBQUlrRiwwQkFBMEJyQyxTQUE5QjtBQUNBLFlBQUkvRCxxQkFBcUIrRCxTQUF6Qjs7QUFFQSxZQUFJSCx1QkFBdUIsSUFBSTFDLEdBQUosRUFBM0I7QUFDQSxZQUFJMkMsdUJBQXVCLElBQUkzQyxHQUFKLEVBQTNCOztBQUVBLFlBQUltRix1QkFBdUIsSUFBSW5GLEdBQUosRUFBM0I7QUFDQSxZQUFJb0YsdUJBQXVCLElBQUlwRixHQUFKLEVBQTNCOztBQUVBLFlBQUlxRiwrQkFBK0IsSUFBSXJGLEdBQUosRUFBbkM7QUFDQSxZQUFJc0YsK0JBQStCLElBQUl0RixHQUFKLEVBQW5DOztBQUVBLFlBQUl1RixzQkFBc0IsU0FBdEJBLG1CQUFzQixDQUFVbkQsZ0JBQVYsRUFBNEI2QixnQkFBNUIsRUFBOENsQyxDQUE5QyxFQUFpRDtBQUN2RWxHLG1CQUFPNkUsSUFBUCxDQUFZcUIsQ0FBWixFQUFldkUsT0FBZixDQUF1QixVQUFDbUQsR0FBRCxFQUFTO0FBQzVCLG9CQUFJLENBQUN5QixpQkFBaUJpQyxHQUFqQixDQUFxQjFELEdBQXJCLENBQUwsRUFBZ0M7QUFDNUIsd0JBQU1FLFFBQVFrQixFQUFFcEIsR0FBRixDQUFkO0FBQ0Esd0JBQU02RSxzQkFBc0IzRSxLQUF0Qix5Q0FBc0JBLEtBQXRCLENBQU47QUFDQSx3QkFBTXVELFNBQVNILGlCQUFpQkksR0FBakIsQ0FBcUIxRCxHQUFyQixJQUE0QnNELGlCQUFpQkssR0FBakIsQ0FBcUIzRCxHQUFyQixDQUE1QixHQUF3REEsR0FBdkU7QUFDQXlCLHFDQUFpQm5DLEdBQWpCLENBQXFCbUUsTUFBckIsRUFBNkJvQixZQUE3QjtBQUNIO0FBQ0osYUFQRDtBQVFILFNBVEQ7O0FBV0F6SCxXQUFHUCxPQUFILENBQVcsVUFBQ2lJLFFBQUQsRUFBYztBQUNyQixnQkFBSUEsU0FBUyx1QkFBVCxDQUFKLEVBQXVDO0FBQ25DUCwwQ0FBMEJPLFNBQVMsdUJBQVQsQ0FBMUI7QUFDQXBHLHdCQUFRQyxHQUFSLENBQVksK0JBQStCQyxLQUFLQyxTQUFMLENBQWUwRix1QkFBZixFQUF3QyxJQUF4QyxFQUE4QyxDQUE5QyxDQUEzQztBQUNBQSx3Q0FBd0IxSCxPQUF4QixDQUFnQyxVQUFDa0ksc0JBQUQsRUFBNEI7QUFDeEQsd0JBQUlBLHVCQUF1QixPQUF2QixDQUFKLEVBQXFDO0FBQ2pDZiwrQ0FBdUJRLG9CQUF2QixFQUE2Q08sdUJBQXVCQyxLQUFwRTtBQUNBcEIsK0NBQXVCN0Isb0JBQXZCLEVBQTZDZ0QsdUJBQXVCQyxLQUFwRTtBQUNBZCx1REFBK0JRLDRCQUEvQixFQUE2REssdUJBQXVCQyxLQUFwRjtBQUNIO0FBQ0Qsd0JBQUlELHVCQUF1QixPQUF2QixDQUFKLEVBQXFDO0FBQ2pDZiwrQ0FBdUJTLG9CQUF2QixFQUE2Q00sdUJBQXVCRSxLQUFwRTtBQUNBckIsK0NBQXVCNUIsb0JBQXZCLEVBQTZDK0MsdUJBQXVCRSxLQUFwRTtBQUNBZix1REFBK0JTLDRCQUEvQixFQUE2REksdUJBQXVCRSxLQUFwRjtBQUNIO0FBQ0osaUJBWEQ7QUFZSCxhQWZELE1BZU8sSUFBSUgsU0FBUyxPQUFULENBQUosRUFBdUI7QUFDMUIsb0JBQU03RyxVQUFVNkcsU0FBUyxPQUFULENBQWhCO0FBQ0E3Ryx3QkFBUXBCLE9BQVIsQ0FBZ0IsVUFBQ3VCLE1BQUQsRUFBWTtBQUN4Qix3QkFBTUMsT0FBT0QsT0FBTyxJQUFQLEVBQWFFLFFBQWIsRUFBYjtBQUNBK0YsNEJBQVEvRSxHQUFSLENBQVlqQixJQUFaLEVBQWtCO0FBQ2QrQiw0QkFBSWhDLE9BQU8sSUFBUCxDQURVO0FBRWRnRCwyQkFBR2hELE9BQU8sR0FBUCxDQUZXO0FBR2RnRyxnQ0FBUTtBQUNKN0YsK0JBQUdILE9BQU8sR0FBUCxDQURDO0FBRUpJLCtCQUFHSixPQUFPLEdBQVAsQ0FGQztBQUdKSywrQkFBR0wsT0FBTyxHQUFQO0FBSEM7QUFITSxxQkFBbEI7QUFTQXdHLHdDQUFvQjdDLG9CQUFwQixFQUEwQ3lDLG9CQUExQyxFQUFnRXBHLE9BQU8sR0FBUCxDQUFoRTtBQUNILGlCQVpEO0FBYUgsYUFmTSxNQWVBLElBQUkwRyxTQUFTLE9BQVQsQ0FBSixFQUF1QjtBQUMxQixvQkFBTTVHLFVBQVU0RyxTQUFTLE9BQVQsQ0FBaEI7QUFDQTVHLHdCQUFRckIsT0FBUixDQUFnQixVQUFDcUksTUFBRCxFQUFZO0FBQ3hCLHdCQUFNN0csT0FBTzZHLE9BQU8sSUFBUCxFQUFhNUcsUUFBYixFQUFiO0FBQ0FnRyw0QkFBUWhGLEdBQVIsQ0FBWWpCLElBQVosRUFBa0I7QUFDZCtCLDRCQUFJOEUsT0FBTyxJQUFQLENBRFU7QUFFZDlELDJCQUFHOEQsT0FBTyxHQUFQLENBRlc7QUFHZEMsMkJBQUdELE9BQU8sR0FBUCxDQUhXO0FBSWRFLDJCQUFHRixPQUFPLEdBQVA7QUFKVyxxQkFBbEI7QUFNQU4sd0NBQW9CNUMsb0JBQXBCLEVBQTBDeUMsb0JBQTFDLEVBQWdFUyxPQUFPLEdBQVAsQ0FBaEU7QUFDSCxpQkFURDtBQVVILGFBWk0sTUFZQSxJQUFJSixTQUFTLGtCQUFULENBQUosRUFBa0M7QUFDckMzRyxxQ0FBcUIyRyxTQUFTLGtCQUFULENBQXJCO0FBQ0g7QUFDSixTQTlDRDs7QUFnREEvQyw2QkFBcUJsRixPQUFyQixDQUE2QixVQUFDZ0ksWUFBRCxFQUFlbkYsYUFBZixFQUFpQztBQUMxRGhCLG9CQUFRQyxHQUFSLENBQVksc0NBQXNDZSxhQUF0QyxHQUFzRCxJQUF0RCxHQUE2RG1GLFlBQXpFO0FBQ0gsU0FGRDs7QUFJQTdDLDZCQUFxQm5GLE9BQXJCLENBQTZCLFVBQUNnSSxZQUFELEVBQWVuRixhQUFmLEVBQWlDO0FBQzFEaEIsb0JBQVFDLEdBQVIsQ0FBWSxzQ0FBc0NlLGFBQXRDLEdBQXNELElBQXRELEdBQTZEbUYsWUFBekU7QUFDSCxTQUZEOztBQUlBO0FBQ0EvRyxlQUFPcUcsUUFBUCxDQUFnQixPQUFoQixJQUEyQixFQUEzQjtBQUNBckcsZUFBT3FHLFFBQVAsQ0FBZ0IsT0FBaEIsSUFBMkIsRUFBM0I7QUFDQUUsZ0JBQVF4SCxPQUFSLENBQWdCLFVBQUN1QixNQUFELEVBQVM0QixHQUFULEVBQWlCO0FBQzdCLGdCQUFNakQsVUFBVSxFQUFoQjtBQUNBQSxvQkFBUSxNQUFSLElBQWtCc0csUUFBUWpGLE9BQU9nRCxDQUFmLEVBQWtCb0Qsb0JBQWxCLEVBQXdDRSw0QkFBeEMsQ0FBbEI7QUFDQTNILG9CQUFRLE1BQVIsRUFBZ0IsSUFBaEIsSUFBd0JxQixPQUFPZ0MsRUFBL0I7QUFDQXJELG9CQUFRLFVBQVIsSUFBc0I7QUFDbEJ3QixtQkFBR0gsT0FBT2dHLE1BQVAsQ0FBYzdGLENBREM7QUFFbEJDLG1CQUFHSixPQUFPZ0csTUFBUCxDQUFjNUY7QUFGQyxhQUF0Qjs7QUFLQVYsbUJBQU9xRyxRQUFQLENBQWdCYSxLQUFoQixDQUFzQnBELElBQXRCLENBQTJCN0UsT0FBM0I7QUFDSCxTQVZEOztBQVlBO0FBQ0FlLGVBQU9xRyxRQUFQLENBQWdCLE9BQWhCLElBQTJCLEVBQTNCO0FBQ0FHLGdCQUFRekgsT0FBUixDQUFnQixVQUFDcUksTUFBRCxFQUFTbEYsR0FBVCxFQUFpQjtBQUM3QixnQkFBTWpELFVBQVUsRUFBaEI7QUFDQUEsb0JBQVEsTUFBUixJQUFrQnNHLFFBQVE2QixPQUFPOUQsQ0FBZixFQUFrQnFELG9CQUFsQixFQUF3Q0UsNEJBQXhDLENBQWxCO0FBQ0E1SCxvQkFBUSxNQUFSLEVBQWdCLElBQWhCLElBQXdCbUksT0FBTzlFLEVBQS9CO0FBQ0FyRCxvQkFBUSxNQUFSLEVBQWdCLFFBQWhCLElBQTRCbUksT0FBT0MsQ0FBbkM7QUFDQXBJLG9CQUFRLE1BQVIsRUFBZ0IsUUFBaEIsSUFBNEJtSSxPQUFPRSxDQUFuQztBQUNBdEgsbUJBQU9xRyxRQUFQLENBQWdCYyxLQUFoQixDQUFzQnJELElBQXRCLENBQTJCN0UsT0FBM0I7QUFDSCxTQVBEOztBQVNBLFlBQU1rRixRQUFRSCxvQkFBb0IzRCxrQkFBcEIsRUFBd0NvRyx1QkFBeEMsQ0FBZDs7QUFFQXpHLGVBQU9tRSxLQUFQLEdBQWVBLE1BQU1BLEtBQXJCO0FBQ0FuRSxlQUFPLGtCQUFQLElBQTZCbUUsTUFBTSxrQkFBTixDQUE3Qjs7QUFFQSxlQUFPbkUsTUFBUDtBQUNIO0FBNUhhLENBQWxCOztBQStIQTlDLE9BQU9DLE9BQVAsR0FBaUI7QUFDYmdDLGVBQVdBO0FBREUsQ0FBakIsQyIsImZpbGUiOiIuL2J1aWxkL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyZDgzM2E1YjgzNDcxMDhkZTA1MSIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBDWF9WRVJTSU9OOiAnQ1hWZXJzaW9uJyxcbiAgICBOT0RFOiAnbm9kZScsXG4gICAgRURHRTogJ2VkZ2UnLFxuICAgIE5FVFdPUks6ICduZXR3b3JrJyxcblxuICAgIE5PREVTOiAnbm9kZXMnLFxuICAgIEVER0VTOiAnZWRnZXMnLFxuXG4gICAgSUQ6ICdpZCcsXG4gICAgWDogJ3gnLFxuICAgIFk6ICd5JyxcbiAgICBaOiAneicsXG4gICAgVjogJ3YnLFxuXG4gICAgQVQ6ICdhdCcsXG4gICAgTjogJ24nLFxuICAgIEU6ICdlJyxcblxuICAgIFZJU1VBTF9QUk9QRVJUSUVTOiAndmlzdWFsUHJvcGVydGllcycsXG4gICAgREVGQVVMVDogJ2RlZmF1bHQnLFxuXG4gICAgU1RZTEU6ICdzdHlsZSdcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeENvbnN0YW50cy5qcyIsImZ1bmN0aW9uIGdldEN4VmVyc2lvbih2ZXJzaW9uU3RyaW5nKSB7XG4gICAgY29uc3QgdmVyc2lvbkFycmF5ID0gdmVyc2lvblN0cmluZy5zcGxpdCgnLicpLm1hcCgobnVtYmVyU3RyaW5nKSA9PiB7IHJldHVybiBwYXJzZUludChudW1iZXJTdHJpbmcsIDEwKTsgfSk7XG4gICAgaWYgKHZlcnNpb25BcnJheS5sZW5ndGggIT09IDIgJiYgdmVyc2lvbkFycmF5Lmxlbmd0aCAhPSAzKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgdmVyc2lvbiBmb3JtYXQ6ICcgKyB2ZXJzaW9uU3RyaW5nO1xuICAgIH1cbiAgICB2ZXJzaW9uQXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgaWYgKGlzTmFOKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyAnTm9uLWludGVnZXIgdmFsdWUgaW4gdmVyc2lvbiBzdHJpbmc6ICcgKyB2ZXJzaW9uU3RyaW5nO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZlcnNpb25BcnJheTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3hNYWpvclZlcnNpb24odmVyc2lvblN0cmluZykge1xuICAgIHJldHVybiB2ZXJzaW9uU3RyaW5nID8gZ2V0Q3hWZXJzaW9uKHZlcnNpb25TdHJpbmcpWzBdIDogMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0Q3hWZXJzaW9uOiBnZXRDeFZlcnNpb24sXG4gICAgZ2V0Q3hNYWpvclZlcnNpb246IGdldEN4TWFqb3JWZXJzaW9uXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeFV0aWwuanMiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNvbnZlcnRlciA9IHJlcXVpcmUgKCcuL2NvbnZlcnRlci5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cy5jb252ZXJ0ID0gKGN4LCB0YXJnZXRGb3JtYXQpID0+IHsgcmV0dXJuIGNvbnZlcnRlci5jb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQpOyB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGxhcmdlTmV0d29yayA9IHJlcXVpcmUgKCcuL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmsuanMnKTsgXG5jb25zdCBjeXRvc2NhcGVKUyA9IHJlcXVpcmUgKCcuL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiB2ZXJpZnlWZXJzaW9uKGN4KSB7XG4gICAgY29uc3QgZmlyc3RFbGVtZW50ID0gY3hbMF07XG4gICAgY29uc3QgdmVyc2lvblN0cmluZyA9IGZpcnN0RWxlbWVudFtjeENvbnN0YW50cy5DWF9WRVJTSU9OXTtcblxuICAgIGNvbnN0IG1ham9yVmVyc2lvbiA9IGN4VXRpbC5nZXRDeE1ham9yVmVyc2lvbih2ZXJzaW9uU3RyaW5nKTtcblxuICAgIGlmIChtYWpvclZlcnNpb24gIT09IDIpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSBDWCB2ZXJzaW9uOiAnICsgdmVyc2lvblN0cmluZztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnQoY3gsIHRhcmdldEZvcm1hdCkge1xuICAgIHZlcmlmeVZlcnNpb24oY3gpO1xuICAgIHN3aXRjaCh0YXJnZXRGb3JtYXQpIHtcbiAgICAgICAgY2FzZSBsYXJnZU5ldHdvcmsuY29udmVydGVyLnRhcmdldEZvcm1hdDoge1xuICAgICAgICAgICAgcmV0dXJuIGxhcmdlTmV0d29yay5jb252ZXJ0ZXIuY29udmVydChjeCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBjeXRvc2NhcGVKUy5jb252ZXJ0ZXIudGFyZ2V0Rm9ybWF0OiB7XG4gICAgICAgICAgICByZXR1cm4gY3l0b3NjYXBlSlMuY29udmVydGVyLmNvbnZlcnQoY3gpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0OiBjb252ZXJ0XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb252ZXJ0ZXIuanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGN4VXRpbCA9IHJlcXVpcmUoJy4uL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiBsbnZDb252ZXJ0KGN4KSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuXG4gICAgLy9GaXJzdCBwYXNzLiBcbiAgICAvLyBXZSBtYXkgbmVlZCB0byBjb2xsZWN0IG9iamVjdCBhdHRyaWJ1dGVzIHRvIGNhbGN1bGF0ZVxuICAgIC8vIG1hcHBpbmdzIGluIHRoZSBzZWNvbmQgcGFzcy4gXG4gICAgbGV0IG5vZGVWYWx1ZU1hcCA9IHt9O1xuICAgIGxldCBub2RlTGF5b3V0TWFwID0ge307XG4gICAgbGV0IGN4Tm9kZXM7XG4gICAgbGV0IGN4RWRnZXM7XG4gICAgbGV0IGN4VmlzdWFsUHJvcGVydGllcztcbiAgICBjeC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChlbGVtZW50Wydub2RlcyddKSB7XG4gICAgICAgICAgICBjeE5vZGVzID0gZWxlbWVudFsnbm9kZXMnXTtcbiAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hJZCA9IGN4Tm9kZVsnaWQnXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIG5vZGVWYWx1ZU1hcFtjeElkXSA9IGN4Tm9kZVsndiddO1xuICAgICAgICAgICAgICAgIG5vZGVMYXlvdXRNYXBbY3hJZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGN4Tm9kZVsneCddLFxuICAgICAgICAgICAgICAgICAgICB5OiBjeE5vZGVbJ3knXSxcbiAgICAgICAgICAgICAgICAgICAgejogY3hOb2RlWyd6J11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnRbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgIGN4RWRnZXMgPSBlbGVtZW50WydlZGdlcyddO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnRbJ3Zpc3VhbFByb3BlcnRpZXMnXSkge1xuICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gZWxlbWVudFsndmlzdWFsUHJvcGVydGllcyddO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZyhcImF0dHJpYnV0ZXM6IFwiICsgSlNPTi5zdHJpbmdpZnkobm9kZVZhbHVlTWFwKSk7XG4gICAgY29uc29sZS5sb2coXCJsYXlvdXQ6IFwiICsgSlNPTi5zdHJpbmdpZnkobm9kZUxheW91dE1hcCkpO1xuXG4gICAgLy9TZWNvbmQgcGFzcy4gXG4gICAgLy8gSGVyZSBpcyB3aGVyZSB0aGUgYWN0dWFsIG91dHB1dCBpcyBnZW5lcmF0ZWQuXG4gICAgb3V0cHV0Lm5vZGVDb3VudCA9IGN4Tm9kZXMubGVuZ3RoO1xuICAgIG91dHB1dC5lZGdlQ291bnQgPSBjeEVkZ2VzLmxlbmd0aDtcbiAgICBvdXRwdXQudmlzdWFsUHJvcGVydHlDb3VudCA9IGN4VmlzdWFsUHJvcGVydGllcy5sZW5ndGg7XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5cblxuY29uc3QgY29udmVydGVyID0ge1xuICAgIHRhcmdldEZvcm1hdDogJ2xudicsXG4gICAgY29udmVydDogIChjeCkgPT4ge1xuICAgICAgICByZXR1cm4gbG52Q29udmVydChjeCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0ZXI6IGNvbnZlcnRlclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuLi9jeENvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpIHtcbiAgICBjb25zdCB0YXJnZXRTdHlsZUVudHJ5ID0gbmV3IE1hcCgpO1xuICAgIHRhcmdldFN0eWxlRW50cnkuc2V0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKTtcbiAgICByZXR1cm4gdGFyZ2V0U3R5bGVFbnRyeTtcbn1cblxuY29uc3QgZGVmYXVsdFByb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ3NoYXBlJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCgnc2hhcGUnLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnd2lkdGgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCd3aWR0aCcsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdoZWlnaHQnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCdoZWlnaHQnLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoJ2JhY2tncm91bmQtY29sb3InLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnYmFja2dyb3VuZC1vcGFjaXR5JzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCgnYmFja2dyb3VuZC1vcGFjaXR5JywgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ2xhYmVsJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCgnbGFiZWwnLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnbGFiZWwtY29sb3InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCdsYWJlbC1jb2xvcicsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnd2lkdGgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCd3aWR0aCcsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdvcGFjaXR5JzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCgnb3BhY2l0eScsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdsaW5lLWNvbG9yJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCgnbGluZS1jb2xvcicsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9LFxufVxuXG5mdW5jdGlvbiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIGF0dHJpYnV0ZU5hbWUpIHtcbiAgICBjb25zdCBvdXRwdXQgPSB7fTtcbiAgICBvdXRwdXRbdGFyZ2V0U3R5bGVGaWVsZF0gPSAnZGF0YSgnICsgYXR0cmlidXRlTmFtZSArICcpJztcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnc2hhcGUnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCgnc2hhcGUnLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ3dpZHRoJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoJ3dpZHRoJywgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdoZWlnaHQnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCgnaGVpZ2h0JywgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoJ2JhY2tncm91bmQtY29sb3InLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ2JhY2tncm91bmQtb3BhY2l0eSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KCdiYWNrZ3JvdW5kLW9wYWNpdHknLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ2xhYmVsJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoJ2xhYmVsJywgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdsYWJlbC1jb2xvcic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KCdsYWJlbC1jb2xvcicsIGF0dHJpYnV0ZU5hbWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ3dpZHRoJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoJ3dpZHRoJywgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdvcGFjaXR5JzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoJ29wYWNpdHknLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ2xpbmUtY29sb3InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCgnbGluZS1jb2xvcicsIGF0dHJpYnV0ZU5hbWUpXG4gICAgfSxcbn1cblxuZnVuY3Rpb24gZ2V0Q1NTU3R5bGVFbnRyaWVzKGN4U3R5bGVFbnRyaWVzLCBlbnRpdHlUeXBlKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4U3R5bGVFbnRyaWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gY3hTdHlsZUVudHJpZXNba2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgY3NzRW50cmllcyA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgY3NzRW50cmllcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0SWRTZWxlY3RvcihpZCwgZWxlbWVudFR5cGUpIHtcbiAgICAvL25vZGUjaWQgb3IgZWRnZSNpZFxuICAgIHJldHVybiBlbGVtZW50VHlwZSArICcjJyArIGlkO1xufVxuXG5cblxuZnVuY3Rpb24gZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpIHtcbiAgICByZXR1cm4geyAnc2VsZWN0b3InOiBzZWxlY3RvciwgJ3N0eWxlJzogY3NzIH07XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cnkocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSkge1xuICAgIHJldHVybiB7fTtcbn1cblxuZnVuY3Rpb24gZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSkge1xuICAgIGlmIChwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgIGNvbnN0IGNzcyA9IHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oY3hNYXBwaW5nRGVmaW5pdGlvbi5hdHRyaWJ1dGUpO1xuICAgICAgICByZXR1cm4gZ2V0U3R5bGVFbGVtZW50KGVudGl0eVR5cGUsIGNzcyk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXREaXNjcmV0ZVNlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURhdGFUeXBlLCBhdHRyaWJ1dGVWYWx1ZSkge1xuICAgIGlmIChhdHRyaWJ1dGVEYXRhVHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gXFwnJyArIGF0dHJpYnV0ZVZhbHVlICsgJ1xcJ10nO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ2Jvb2xlYW4nKSB7XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZVZhbHVlID09ICd0cnVlJykge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWz8nICsgYXR0cmlidXRlTmFtZSArICddJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICddWyEnICsgYXR0cmlidXRlTmFtZSArICddJztcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICcgPSAnICsgYXR0cmlidXRlVmFsdWUgKyAnXSc7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGdldERpc2NyZXRlTWFwcGluZ0NTU0VudHJ5KHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUpIHtcbiAgICBjb25zdCBhdHR0cmlidXRlVG9WYWx1ZU1hcCA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ21hcCddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydhdHRyaWJ1dGUnXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVEYXRhVHlwZSA9ICdzdHJpbmcnO1xuICAgIGF0dHRyaWJ1dGVUb1ZhbHVlTWFwLmZvckVhY2goKGRpc2NyZXRlTWFwKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcgZGlzY3JldGUgbWFwIGZvciAnICsgcG9ydGFibGVQcm9wZXJ0eUtleSArICc6ICcgKyBkaXNjcmV0ZU1hcC52ICsgJyAtPiAnICsgZGlzY3JldGVNYXAudnApO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0RGlzY3JldGVTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEYXRhVHlwZSwgZGlzY3JldGVNYXAudik7XG4gICAgICAgIGNvbnNvbGUubG9nKCcgIHNlbGVjdG9yOiAnICsgc2VsZWN0b3IpO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGRpc2NyZXRlTWFwLnZwKTtcbiAgICAgICAgICAgIGNvbnN0IGNzcyA9IHt9O1xuICAgICAgICAgICAgc3R5bGVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGNzc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgICBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGNzcykpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIHJldHVybiBudWxsOyAvL2dldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKTtcbn1cblxuLyoqIFxuICogXG4qL1xuZnVuY3Rpb24gZ2V0Q1NTTWFwcGluZ0VudHJpZXMoXG4gICAgY3hNYXBwaW5nRW50cmllcyxcbiAgICBlbnRpdHlUeXBlLFxuICAgIGF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgT2JqZWN0LmtleXMoY3hNYXBwaW5nRW50cmllcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IGN4TWFwcGluZ0VudHJ5ID0gY3hNYXBwaW5nRW50cmllc1trZXldO1xuICAgICAgICBjb25zb2xlLmxvZyhcIiBtYXBwaW5nIHR5cGU6IFwiICsgY3hNYXBwaW5nRW50cnkudHlwZSk7XG4gICAgICAgIHN3aXRjaCAoY3hNYXBwaW5nRW50cnkudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnY29udGludW91cyc6IHtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAncGFzc3Rocm91Z2gnOiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdkaXNjcmV0ZSc6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyeShrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBub2RlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBzdHlsZTogW10sXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgbGV0IGRlZmF1bHRDU1NOb2RlU3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGRlZmF1bHRDU1NFZGdlU3R5bGUgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgY3NzTmV0d29ya0JhY2tncm91bmRDb2xvciA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBtYXBwaW5nQ1NTTm9kZVN0eWxlID0gdW5kZWZpbmVkO1xuICAgIGxldCBtYXBwaW5nQ1NTRWRnZVN0eWxlID0gdW5kZWZpbmVkO1xuXG4gICAgY3hWaXN1YWxQcm9wZXJ0aWVzLmZvckVhY2goKHZwRWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCB2cEF0ID0gdnBFbGVtZW50LmF0O1xuICAgICAgICBpZiAodnBBdCA9PT0gY3hDb25zdGFudHMuU1RZTEUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdnBFbGVtZW50LnY7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0U3R5bGVzID0gdmFsdWUuZGVmYXVsdDtcblxuICAgICAgICAgICAgZGVmYXVsdENTU05vZGVTdHlsZSA9IGdldENTU1N0eWxlRW50cmllcyhkZWZhdWx0U3R5bGVzLm5vZGUsICdub2RlJyk7XG4gICAgICAgICAgICBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gZ2V0Q1NTU3R5bGVFbnRyaWVzKGRlZmF1bHRTdHlsZXMuZWRnZSwgJ2VkZ2UnKTtcblxuICAgICAgICAgICAgY3NzTmV0d29ya0JhY2tncm91bmRDb2xvciA9IGRlZmF1bHRTdHlsZXMubmV0d29ya1snYmFja2dyb3VuZC1jb2xvciddO1xuXG4gICAgICAgICAgICBjb25zdCBub2RlTWFwcGluZyA9IHZhbHVlLm5vZGVNYXBwaW5nO1xuICAgICAgICAgICAgbWFwcGluZ0NTU05vZGVTdHlsZSA9IGdldENTU01hcHBpbmdFbnRyaWVzKG5vZGVNYXBwaW5nLCAnbm9kZScsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICAgICAgY29uc3QgZWRnZU1hcHBpbmcgPSB2YWx1ZS5lZGdlTWFwcGluZztcbiAgICAgICAgICAgIG1hcHBpbmdDU1NFZGdlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhlZGdlTWFwcGluZywgJ2VkZ2UnLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh2cEVsZW1lbnQgPT0gY3hDb25zdGFudHMuTikge1xuICAgICAgICAgICAgLy9CeXBhc3Mgc3R5bGUgbm9kZVxuICAgICAgICB9IGVsc2UgaWYgKHZwRWxlbWVudCA9PSBjeENvbnN0YW50cy5FKSB7XG4gICAgICAgICAgICAvL0J5cGFzcyBzdHlsZSBlZGdlXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy9BZGQgZGVmYXVsdCBzdHlsZVxuICAgIG91dHB1dC5zdHlsZS5wdXNoKGdldFN0eWxlRWxlbWVudChOT0RFX1NFTEVDVE9SLCBkZWZhdWx0Q1NTTm9kZVN0eWxlKSk7XG4gICAgb3V0cHV0LnN0eWxlLnB1c2goZ2V0U3R5bGVFbGVtZW50KEVER0VfU0VMRUNUT1IsIGRlZmF1bHRDU1NFZGdlU3R5bGUpKTtcblxuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgbWFwcGluZ0NTU05vZGVTdHlsZSk7XG5cbiAgICBvdXRwdXRbJ2JhY2tncm91bmQtY29sb3InXSA9IGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBOT0RFX1NFTEVDVE9SID0gJ25vZGUnO1xuY29uc3QgRURHRV9TRUxFQ1RPUiA9ICdlZGdlJztcblxuZnVuY3Rpb24gZ2V0RGF0YSh2LCBhdHRyaWJ1dGVOYW1lTWFwLCBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApIHtcbiAgICBsZXQgZGF0YSA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHYpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdLZXkgPSBhdHRyaWJ1dGVOYW1lTWFwLmhhcyhrZXkpID8gYXR0cmlidXRlTmFtZU1hcC5nZXQoa2V5KSA6IGtleTtcbiAgICAgICAgZGF0YVtuZXdLZXldID0gdltrZXldO1xuICAgIH0pO1xuICAgIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGlmICghZGF0YVtrZXldKSB7XG4gICAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWydkJ10pIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLmQpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAoYXR0cmlidXRlTmFtZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2EnXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlRGVjbGFyYXRpb24uYSArICcgc2hvdWxkIGJlIHJlbmFtZWQgdG8gJyArIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgYXR0cmlidXRlTmFtZU1hcC5zZXQoYXR0cmlidXRlRGVjbGFyYXRpb24uYSwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ3YnXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlTmFtZSArICcgaGFzIGRlZmF1bHQgdmFsdWUgJyArIGF0dHJpYnV0ZURlY2xhcmF0aW9uLnYpO1xuICAgICAgICAgICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLnNldChhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbi52KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5jb25zdCBjb252ZXJ0ZXIgPSB7XG4gICAgdGFyZ2V0Rm9ybWF0OiAnY3l0b3NjYXBlSlMnLFxuICAgIGNvbnZlcnQ6IChjeCkgPT4ge1xuICAgICAgICBjb25zdCBvdXRwdXQgPSB7XG4gICAgICAgICAgICBzdHlsZTogW10sXG4gICAgICAgICAgICBlbGVtZW50czoge30sXG4gICAgICAgICAgICBsYXlvdXQ6IHt9LFxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbm9kZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgbGV0IGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gdW5kZWZpbmVkO1xuICAgICAgICBsZXQgY3hWaXN1YWxQcm9wZXJ0aWVzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBsZXQgdXBkYXRlSW5mZXJyZWRUeXBlcyA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVUeXBlTWFwLCBhdHRyaWJ1dGVOYW1lTWFwLCB2KSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWF0dHJpYnV0ZVR5cGVNYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2W2tleV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZmVycmVkVHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3S2V5ID0gYXR0cmlidXRlTmFtZU1hcC5oYXMoa2V5KSA/IGF0dHJpYnV0ZU5hbWVNYXAuZ2V0KGtleSkgOiBrZXk7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGVNYXAuc2V0KG5ld0tleSwgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ10pIHtcbiAgICAgICAgICAgICAgICBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyA9IGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uczogXCIgKyBKU09OLnN0cmluZ2lmeShjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucywgbnVsbCwgMikpO1xuICAgICAgICAgICAgICAgIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLmZvckVhY2goKGN4QXR0cmlidXRlRGVjbGFyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN4QXR0cmlidXRlRGVjbGFyYXRpb25bJ25vZGVzJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAobm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlVHlwZU1hcChub2RlQXR0cmlidXRlVHlwZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAobm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN4QXR0cmlidXRlRGVjbGFyYXRpb25bJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAoZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlVHlwZU1hcChlZGdlQXR0cmlidXRlVHlwZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAoZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3hJZCA9IGN4Tm9kZVsnaWQnXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBub2RlTWFwLnNldChjeElkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogY3hOb2RlWydpZCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgdjogY3hOb2RlWyd2J10sXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBjeE5vZGVbJ3gnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBjeE5vZGVbJ3knXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6OiBjeE5vZGVbJ3onXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlSW5mZXJyZWRUeXBlcyhub2RlQXR0cmlidXRlVHlwZU1hcCwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4Tm9kZVsndiddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3hJZCA9IGN4RWRnZVsnaWQnXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBlZGdlTWFwLnNldChjeElkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogY3hFZGdlWydpZCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgdjogY3hFZGdlWyd2J10sXG4gICAgICAgICAgICAgICAgICAgICAgICBzOiBjeEVkZ2VbJ3MnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHQ6IGN4RWRnZVsndCddXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVJbmZlcnJlZFR5cGVzKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hFZGdlWyd2J10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAuZm9yRWFjaCgoaW5mZXJyZWRUeXBlLCBhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW5mZXJyZWQgYXR0cmlidXRlIHR5cGUgZm9yIG5vZGUuJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWRnZUF0dHJpYnV0ZVR5cGVNYXAuZm9yRWFjaCgoaW5mZXJyZWRUeXBlLCBhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW5mZXJyZWQgYXR0cmlidXRlIHR5cGUgZm9yIGVkZ2UuJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9BZGQgbm9kZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydub2RlcyddID0gW107XG4gICAgICAgIG91dHB1dC5lbGVtZW50c1snZWRnZXMnXSA9IFtdO1xuICAgICAgICBub2RlTWFwLmZvckVhY2goKGN4Tm9kZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ge307XG4gICAgICAgICAgICBlbGVtZW50WydkYXRhJ10gPSBnZXREYXRhKGN4Tm9kZS52LCBub2RlQXR0cmlidXRlTmFtZU1hcCwgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ2lkJ10gPSBjeE5vZGUuaWQ7XG4gICAgICAgICAgICBlbGVtZW50Wydwb3NpdGlvbiddID0ge1xuICAgICAgICAgICAgICAgIHg6IGN4Tm9kZS5sYXlvdXQueCxcbiAgICAgICAgICAgICAgICB5OiBjeE5vZGUubGF5b3V0LnlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb3V0cHV0LmVsZW1lbnRzLm5vZGVzLnB1c2goZWxlbWVudClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9BZGQgZWRnZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydlZGdlcyddID0gW107XG4gICAgICAgIGVkZ2VNYXAuZm9yRWFjaCgoY3hFZGdlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7fTtcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGdldERhdGEoY3hFZGdlLnYsIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnaWQnXSA9IGN4RWRnZS5pZDtcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnc291cmNlJ10gPSBjeEVkZ2UucztcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsndGFyZ2V0J10gPSBjeEVkZ2UudDtcbiAgICAgICAgICAgIG91dHB1dC5lbGVtZW50cy5lZGdlcy5wdXNoKGVsZW1lbnQpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0VmlzdWFsUHJvcGVydGllcyhjeFZpc3VhbFByb3BlcnRpZXMsIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zKTtcblxuICAgICAgICBvdXRwdXQuc3R5bGUgPSBzdHlsZS5zdHlsZTtcbiAgICAgICAgb3V0cHV0WydiYWNrZ3JvdW5kLWNvbG9yJ10gPSBzdHlsZVsnYmFja2dyb3VuZC1jb2xvciddO1xuXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0ZXI6IGNvbnZlcnRlclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiXSwic291cmNlUm9vdCI6IiJ9