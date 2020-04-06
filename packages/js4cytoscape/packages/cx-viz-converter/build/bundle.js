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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzOWIwN2VkM2IzZGU0N2E4MjE1NyIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrLmpzIiwid2VicGFjazovLy8uL3NyYy9jeXRvc2NhcGVKUy5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiT2JqZWN0IiwiZnJlZXplIiwiQ1hfVkVSU0lPTiIsIk5PREUiLCJFREdFIiwiTkVUV09SSyIsIk5PREVTIiwiRURHRVMiLCJJRCIsIlgiLCJZIiwiWiIsIlYiLCJBVCIsIk4iLCJFIiwiVklTVUFMX1BST1BFUlRJRVMiLCJERUZBVUxUIiwiU1RZTEUiLCJnZXRDeFZlcnNpb24iLCJ2ZXJzaW9uU3RyaW5nIiwidmVyc2lvbkFycmF5Iiwic3BsaXQiLCJtYXAiLCJudW1iZXJTdHJpbmciLCJwYXJzZUludCIsImxlbmd0aCIsImZvckVhY2giLCJpc05hTiIsImVsZW1lbnQiLCJnZXRDeE1ham9yVmVyc2lvbiIsImNvbnZlcnRlciIsInJlcXVpcmUiLCJjb252ZXJ0IiwiY3giLCJ0YXJnZXRGb3JtYXQiLCJjeENvbnN0YW50cyIsImxhcmdlTmV0d29yayIsImN5dG9zY2FwZUpTIiwiY3hVdGlsIiwidmVyaWZ5VmVyc2lvbiIsImZpcnN0RWxlbWVudCIsIm1ham9yVmVyc2lvbiIsImxudkNvbnZlcnQiLCJvdXRwdXQiLCJub2RlVmFsdWVNYXAiLCJub2RlTGF5b3V0TWFwIiwiY3hOb2RlcyIsImN4RWRnZXMiLCJjeFZpc3VhbFByb3BlcnRpZXMiLCJjeE5vZGUiLCJjeElkIiwidG9TdHJpbmciLCJ4IiwieSIsInoiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5vZGVDb3VudCIsImVkZ2VDb3VudCIsInZpc3VhbFByb3BlcnR5Q291bnQiLCJzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0IiwidGFyZ2V0U3R5bGVGaWVsZCIsInBvcnRhYmxlUHJvcGVydFZhbHVlIiwidGFyZ2V0U3R5bGVFbnRyeSIsIk1hcCIsInNldCIsImRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJwb3J0YWJsZVByb3BlcnR5VmFsdWUiLCJzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0IiwiYXR0cmlidXRlTmFtZSIsInBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJnZXRDU1NTdHlsZUVudHJpZXMiLCJjeFN0eWxlRW50cmllcyIsImVudGl0eVR5cGUiLCJrZXlzIiwia2V5IiwiY3NzRW50cmllcyIsInZhbHVlIiwiZ2V0SWRTZWxlY3RvciIsImlkIiwiZWxlbWVudFR5cGUiLCJnZXRTdHlsZUVsZW1lbnQiLCJzZWxlY3RvciIsImNzcyIsImdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cnkiLCJwb3J0YWJsZVByb3BlcnR5S2V5IiwiY3hNYXBwaW5nRGVmaW5pdGlvbiIsImdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5IiwiYXR0cmlidXRlIiwiZ2V0RGlzY3JldGVTZWxlY3RvciIsImF0dHJpYnV0ZURhdGFUeXBlIiwiYXR0cmlidXRlVmFsdWUiLCJnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyeSIsImF0dHRyaWJ1dGVUb1ZhbHVlTWFwIiwiZGlzY3JldGVNYXAiLCJ2IiwidnAiLCJzdHlsZU1hcCIsImdldENTU01hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cmllcyIsImF0dHJpYnV0ZVR5cGVNYXAiLCJjeE1hcHBpbmdFbnRyeSIsInR5cGUiLCJwdXNoIiwiZGVmaW5pdGlvbiIsImdldFZpc3VhbFByb3BlcnRpZXMiLCJub2RlQXR0cmlidXRlVHlwZU1hcCIsImVkZ2VBdHRyaWJ1dGVUeXBlTWFwIiwic3R5bGUiLCJ1bmRlZmluZWQiLCJkZWZhdWx0Q1NTTm9kZVN0eWxlIiwiZGVmYXVsdENTU0VkZ2VTdHlsZSIsImNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IiLCJtYXBwaW5nQ1NTTm9kZVN0eWxlIiwibWFwcGluZ0NTU0VkZ2VTdHlsZSIsInZwRWxlbWVudCIsInZwQXQiLCJhdCIsImRlZmF1bHRTdHlsZXMiLCJkZWZhdWx0Iiwibm9kZSIsImVkZ2UiLCJuZXR3b3JrIiwibm9kZU1hcHBpbmciLCJlZGdlTWFwcGluZyIsIk5PREVfU0VMRUNUT1IiLCJFREdFX1NFTEVDVE9SIiwiYXBwbHkiLCJnZXREYXRhIiwiYXR0cmlidXRlTmFtZU1hcCIsImF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImRhdGEiLCJuZXdLZXkiLCJoYXMiLCJnZXQiLCJ1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwIiwiYXR0cmlidXRlRGVjbGFyYXRpb25zIiwiYXR0cmlidXRlRGVjbGFyYXRpb24iLCJkIiwidXBkYXRlQXR0cmlidXRlTmFtZU1hcCIsImEiLCJ1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJlbGVtZW50cyIsImxheW91dCIsIm5vZGVNYXAiLCJlZGdlTWFwIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJ1cGRhdGVJbmZlcnJlZFR5cGVzIiwiaW5mZXJyZWRUeXBlIiwiY3hBc3BlY3QiLCJjeEF0dHJpYnV0ZURlY2xhcmF0aW9uIiwibm9kZXMiLCJlZGdlcyIsImN4RWRnZSIsInMiLCJ0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtR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UUFBUTZCLE9BQU85RCxDQUFmLEVBQWtCcUQsb0JBQWxCLEVBQXdDRSw0QkFBeEMsQ0FBbEI7QUFDQTVILG9CQUFRLE1BQVIsRUFBZ0IsSUFBaEIsSUFBd0JtSSxPQUFPOUUsRUFBL0I7QUFDQXJELG9CQUFRLE1BQVIsRUFBZ0IsUUFBaEIsSUFBNEJtSSxPQUFPQyxDQUFuQztBQUNBcEksb0JBQVEsTUFBUixFQUFnQixRQUFoQixJQUE0Qm1JLE9BQU9FLENBQW5DO0FBQ0F0SCxtQkFBT3FHLFFBQVAsQ0FBZ0JjLEtBQWhCLENBQXNCckQsSUFBdEIsQ0FBMkI3RSxPQUEzQjtBQUNILFNBUEQ7O0FBU0EsWUFBTWtGLFFBQVFILG9CQUFvQjNELGtCQUFwQixFQUF3Q29HLHVCQUF4QyxDQUFkOztBQUVBekcsZUFBT21FLEtBQVAsR0FBZUEsTUFBTUEsS0FBckI7QUFDQW5FLGVBQU8sa0JBQVAsSUFBNkJtRSxNQUFNLGtCQUFOLENBQTdCOztBQUVBLGVBQU9uRSxNQUFQO0FBQ0g7QUE1SGEsQ0FBbEI7O0FBK0hBOUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNiZ0MsZUFBV0E7QUFERSxDQUFqQixDIiwiZmlsZSI6Ii4vYnVpbGQvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3hWaXpDb252ZXJ0ZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiY3hWaXpDb252ZXJ0ZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDM5YjA3ZWQzYjNkZTQ3YTgyMTU3IiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgIENYX1ZFUlNJT046ICdDWFZlcnNpb24nLFxuICAgIE5PREU6ICdub2RlJyxcbiAgICBFREdFOiAnZWRnZScsXG4gICAgTkVUV09SSzogJ25ldHdvcmsnLFxuXG4gICAgTk9ERVM6ICdub2RlcycsXG4gICAgRURHRVM6ICdlZGdlcycsXG5cbiAgICBJRDogJ2lkJyxcbiAgICBYOiAneCcsXG4gICAgWTogJ3knLFxuICAgIFo6ICd6JyxcbiAgICBWOiAndicsXG5cbiAgICBBVDogJ2F0JyxcbiAgICBOOiAnbicsXG4gICAgRTogJ2UnLFxuXG4gICAgVklTVUFMX1BST1BFUlRJRVM6ICd2aXN1YWxQcm9wZXJ0aWVzJyxcbiAgICBERUZBVUxUOiAnZGVmYXVsdCcsXG5cbiAgICBTVFlMRTogJ3N0eWxlJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N4Q29uc3RhbnRzLmpzIiwiZnVuY3Rpb24gZ2V0Q3hWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcbiAgICBjb25zdCB2ZXJzaW9uQXJyYXkgPSB2ZXJzaW9uU3RyaW5nLnNwbGl0KCcuJykubWFwKChudW1iZXJTdHJpbmcpID0+IHsgcmV0dXJuIHBhcnNlSW50KG51bWJlclN0cmluZywgMTApOyB9KTtcbiAgICBpZiAodmVyc2lvbkFycmF5Lmxlbmd0aCAhPT0gMiAmJiB2ZXJzaW9uQXJyYXkubGVuZ3RoICE9IDMpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSB2ZXJzaW9uIGZvcm1hdDogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxuICAgIHZlcnNpb25BcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAoaXNOYU4oZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93ICdOb24taW50ZWdlciB2YWx1ZSBpbiB2ZXJzaW9uIHN0cmluZzogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdmVyc2lvbkFycmF5O1xufVxuXG5mdW5jdGlvbiBnZXRDeE1ham9yVmVyc2lvbih2ZXJzaW9uU3RyaW5nKSB7XG4gICAgcmV0dXJuIHZlcnNpb25TdHJpbmcgPyBnZXRDeFZlcnNpb24odmVyc2lvblN0cmluZylbMF0gOiAxO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRDeFZlcnNpb246IGdldEN4VmVyc2lvbixcbiAgICBnZXRDeE1ham9yVmVyc2lvbjogZ2V0Q3hNYWpvclZlcnNpb25cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N4VXRpbC5qcyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29udmVydGVyID0gcmVxdWlyZSAoJy4vY29udmVydGVyLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzLmNvbnZlcnQgPSAoY3gsIHRhcmdldEZvcm1hdCkgPT4geyByZXR1cm4gY29udmVydGVyLmNvbnZlcnQoY3gsIHRhcmdldEZvcm1hdCk7IH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi9jeENvbnN0YW50cy5qcycpO1xuY29uc3QgbGFyZ2VOZXR3b3JrID0gcmVxdWlyZSAoJy4vbGFyZ2VOZXR3b3JrLmpzJyk7IFxuY29uc3QgY3l0b3NjYXBlSlMgPSByZXF1aXJlICgnLi9jeXRvc2NhcGVKUy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gdmVyaWZ5VmVyc2lvbihjeCkge1xuICAgIGNvbnN0IGZpcnN0RWxlbWVudCA9IGN4WzBdO1xuICAgIGNvbnN0IHZlcnNpb25TdHJpbmcgPSBmaXJzdEVsZW1lbnRbY3hDb25zdGFudHMuQ1hfVkVSU0lPTl07XG5cbiAgICBjb25zdCBtYWpvclZlcnNpb24gPSBjeFV0aWwuZ2V0Q3hNYWpvclZlcnNpb24odmVyc2lvblN0cmluZyk7XG5cbiAgICBpZiAobWFqb3JWZXJzaW9uICE9PSAyKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgQ1ggdmVyc2lvbjogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQpIHtcbiAgICB2ZXJpZnlWZXJzaW9uKGN4KTtcbiAgICBzd2l0Y2godGFyZ2V0Rm9ybWF0KSB7XG4gICAgICAgIGNhc2UgbGFyZ2VOZXR3b3JrLmNvbnZlcnRlci50YXJnZXRGb3JtYXQ6IHtcbiAgICAgICAgICAgIHJldHVybiBsYXJnZU5ldHdvcmsuY29udmVydGVyLmNvbnZlcnQoY3gpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgY3l0b3NjYXBlSlMuY29udmVydGVyLnRhcmdldEZvcm1hdDoge1xuICAgICAgICAgICAgcmV0dXJuIGN5dG9zY2FwZUpTLmNvbnZlcnRlci5jb252ZXJ0KGN4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydDogY29udmVydFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udmVydGVyLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGN4VXRpbCA9IHJlcXVpcmUoJy4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIGxudkNvbnZlcnQoY3gpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG5cbiAgICAvL0ZpcnN0IHBhc3MuIFxuICAgIC8vIFdlIG1heSBuZWVkIHRvIGNvbGxlY3Qgb2JqZWN0IGF0dHJpYnV0ZXMgdG8gY2FsY3VsYXRlXG4gICAgLy8gbWFwcGluZ3MgaW4gdGhlIHNlY29uZCBwYXNzLiBcbiAgICBsZXQgbm9kZVZhbHVlTWFwID0ge307XG4gICAgbGV0IG5vZGVMYXlvdXRNYXAgPSB7fTtcbiAgICBsZXQgY3hOb2RlcztcbiAgICBsZXQgY3hFZGdlcztcbiAgICBsZXQgY3hWaXN1YWxQcm9wZXJ0aWVzO1xuICAgIGN4LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnRbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgIGN4Tm9kZXMgPSBlbGVtZW50Wydub2RlcyddO1xuICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hOb2RlWydpZCddLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgbm9kZVZhbHVlTWFwW2N4SWRdID0gY3hOb2RlWyd2J107XG4gICAgICAgICAgICAgICAgbm9kZUxheW91dE1hcFtjeElkXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogY3hOb2RlWyd4J10sXG4gICAgICAgICAgICAgICAgICAgIHk6IGN4Tm9kZVsneSddLFxuICAgICAgICAgICAgICAgICAgICB6OiBjeE5vZGVbJ3onXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgY3hFZGdlcyA9IGVsZW1lbnRbJ2VkZ2VzJ107XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICBjeFZpc3VhbFByb3BlcnRpZXMgPSBlbGVtZW50Wyd2aXN1YWxQcm9wZXJ0aWVzJ107XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKFwiYXR0cmlidXRlczogXCIgKyBKU09OLnN0cmluZ2lmeShub2RlVmFsdWVNYXApKTtcbiAgICBjb25zb2xlLmxvZyhcImxheW91dDogXCIgKyBKU09OLnN0cmluZ2lmeShub2RlTGF5b3V0TWFwKSk7XG5cbiAgICAvL1NlY29uZCBwYXNzLiBcbiAgICAvLyBIZXJlIGlzIHdoZXJlIHRoZSBhY3R1YWwgb3V0cHV0IGlzIGdlbmVyYXRlZC5cbiAgICBvdXRwdXQubm9kZUNvdW50ID0gY3hOb2Rlcy5sZW5ndGg7XG4gICAgb3V0cHV0LmVkZ2VDb3VudCA9IGN4RWRnZXMubGVuZ3RoO1xuICAgIG91dHB1dC52aXN1YWxQcm9wZXJ0eUNvdW50ID0gY3hWaXN1YWxQcm9wZXJ0aWVzLmxlbmd0aDtcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cblxuXG5jb25zdCBjb252ZXJ0ZXIgPSB7XG4gICAgdGFyZ2V0Rm9ybWF0OiAnbG52JyxcbiAgICBjb252ZXJ0OiAgKGN4KSA9PiB7XG4gICAgICAgIHJldHVybiBsbnZDb252ZXJ0KGN4KTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnZlcnRlcjogY29udmVydGVyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXJnZU5ldHdvcmsuanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi9jeENvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSkge1xuICAgIGNvbnN0IHRhcmdldFN0eWxlRW50cnkgPSBuZXcgTWFwKCk7XG4gICAgdGFyZ2V0U3R5bGVFbnRyeS5zZXQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpO1xuICAgIHJldHVybiB0YXJnZXRTdHlsZUVudHJ5O1xufVxuXG5jb25zdCBkZWZhdWx0UHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnc2hhcGUnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCdzaGFwZScsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICd3aWR0aCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoJ3dpZHRoJywgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ2hlaWdodCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoJ2hlaWdodCcsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCgnYmFja2dyb3VuZC1jb2xvcicsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdiYWNrZ3JvdW5kLW9wYWNpdHknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCdiYWNrZ3JvdW5kLW9wYWNpdHknLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnbGFiZWwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCdsYWJlbCcsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdsYWJlbC1jb2xvcic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoJ2xhYmVsLWNvbG9yJywgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICd3aWR0aCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoJ3dpZHRoJywgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ29wYWNpdHknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCdvcGFjaXR5JywgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ2xpbmUtY29sb3InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KCdsaW5lLWNvbG9yJywgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG59XG5cbmZ1bmN0aW9uIHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgYXR0cmlidXRlTmFtZSkge1xuICAgIGNvbnN0IG91dHB1dCA9IHt9O1xuICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9ICdkYXRhKCcgKyBhdHRyaWJ1dGVOYW1lICsgJyknO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdzaGFwZSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KCdzaGFwZScsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnd2lkdGgnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCgnd2lkdGgnLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ2hlaWdodCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KCdoZWlnaHQnLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCgnYmFja2dyb3VuZC1jb2xvcicsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnYmFja2dyb3VuZC1vcGFjaXR5JzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoJ2JhY2tncm91bmQtb3BhY2l0eScsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnbGFiZWwnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCgnbGFiZWwnLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ2xhYmVsLWNvbG9yJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoJ2xhYmVsLWNvbG9yJywgYXR0cmlidXRlTmFtZSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnd2lkdGgnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCgnd2lkdGgnLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ29wYWNpdHknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCgnb3BhY2l0eScsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnbGluZS1jb2xvcic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KCdsaW5lLWNvbG9yJywgYXR0cmlidXRlTmFtZSlcbiAgICB9LFxufVxuXG5mdW5jdGlvbiBnZXRDU1NTdHlsZUVudHJpZXMoY3hTdHlsZUVudHJpZXMsIGVudGl0eVR5cGUpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgT2JqZWN0LmtleXMoY3hTdHlsZUVudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBwb3J0YWJsZVByb3BlcnR5VmFsdWUgPSBjeFN0eWxlRW50cmllc1trZXldO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtrZXldKSB7XG4gICAgICAgICAgICBjb25zdCBjc3NFbnRyaWVzID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtrZXldKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICBjc3NFbnRyaWVzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRJZFNlbGVjdG9yKGlkLCBlbGVtZW50VHlwZSkge1xuICAgIC8vbm9kZSNpZCBvciBlZGdlI2lkXG4gICAgcmV0dXJuIGVsZW1lbnRUeXBlICsgJyMnICsgaWQ7XG59XG5cblxuXG5mdW5jdGlvbiBnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcykge1xuICAgIHJldHVybiB7ICdzZWxlY3Rvcic6IHNlbGVjdG9yLCAnc3R5bGUnOiBjc3MgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29udGludW91c01hcHBpbmdDU1NFbnRyeShwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlKSB7XG4gICAgcmV0dXJuIHt9O1xufVxuXG5mdW5jdGlvbiBnZXRQYXNzdGhyb3VnaE1hcHBpbmdDU1NFbnRyeShwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlKSB7XG4gICAgaWYgKHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgY29uc3QgY3NzID0gcGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShjeE1hcHBpbmdEZWZpbml0aW9uLmF0dHJpYnV0ZSk7XG4gICAgICAgIHJldHVybiBnZXRTdHlsZUVsZW1lbnQoZW50aXR5VHlwZSwgY3NzKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldERpc2NyZXRlU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGF0YVR5cGUsIGF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgaWYgKGF0dHJpYnV0ZURhdGFUeXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICcgPSBcXCcnICsgYXR0cmlidXRlVmFsdWUgKyAnXFwnXSc7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVEYXRhVHlwZSA9PSAnYm9vbGVhbicpIHtcblxuICAgICAgICBpZiAoYXR0cmlidXRlVmFsdWUgPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbPycgKyBhdHRyaWJ1dGVOYW1lICsgJ10nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJ11bIScgKyBhdHRyaWJ1dGVOYW1lICsgJ10nO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyA9ICcgKyBhdHRyaWJ1dGVWYWx1ZSArICddJztcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cnkocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSkge1xuICAgIGNvbnN0IGF0dHRyaWJ1dGVUb1ZhbHVlTWFwID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ2F0dHJpYnV0ZSddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZURhdGFUeXBlID0gJ3N0cmluZyc7XG4gICAgYXR0dHJpYnV0ZVRvVmFsdWVNYXAuZm9yRWFjaCgoZGlzY3JldGVNYXApID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJyBkaXNjcmV0ZSBtYXAgZm9yICcgKyBwb3J0YWJsZVByb3BlcnR5S2V5ICsgJzogJyArIGRpc2NyZXRlTWFwLnYgKyAnIC0+ICcgKyBkaXNjcmV0ZU1hcC52cCk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXREaXNjcmV0ZVNlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURhdGFUeXBlLCBkaXNjcmV0ZU1hcC52KTtcbiAgICAgICAgY29uc29sZS5sb2coJyAgc2VsZWN0b3I6ICcgKyBzZWxlY3Rvcik7XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZU1hcCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oZGlzY3JldGVNYXAudnApO1xuICAgICAgICAgICAgY29uc3QgY3NzID0ge307XG4gICAgICAgICAgICBzdHlsZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY3NzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJyAgIHN0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkoY3NzKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIG51bGw7IC8vZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpO1xufVxuXG4vKiogXG4gKiBcbiovXG5mdW5jdGlvbiBnZXRDU1NNYXBwaW5nRW50cmllcyhcbiAgICBjeE1hcHBpbmdFbnRyaWVzLFxuICAgIGVudGl0eVR5cGUsXG4gICAgYXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhjeE1hcHBpbmdFbnRyaWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgY3hNYXBwaW5nRW50cnkgPSBjeE1hcHBpbmdFbnRyaWVzW2tleV07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiIG1hcHBpbmcgdHlwZTogXCIgKyBjeE1hcHBpbmdFbnRyeS50eXBlKTtcbiAgICAgICAgc3dpdGNoIChjeE1hcHBpbmdFbnRyeS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdjb250aW51b3VzJzoge1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdwYXNzdGhyb3VnaCc6IHtcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChnZXRQYXNzdGhyb3VnaE1hcHBpbmdDU1NFbnRyeShrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2Rpc2NyZXRlJzpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGdldERpc2NyZXRlTWFwcGluZ0NTU0VudHJ5KGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0VmlzdWFsUHJvcGVydGllcyhjeFZpc3VhbFByb3BlcnRpZXMsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICBsZXQgZGVmYXVsdENTU05vZGVTdHlsZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgZGVmYXVsdENTU0VkZ2VTdHlsZSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IG1hcHBpbmdDU1NOb2RlU3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG1hcHBpbmdDU1NFZGdlU3R5bGUgPSB1bmRlZmluZWQ7XG5cbiAgICBjeFZpc3VhbFByb3BlcnRpZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHZwQXQgPSB2cEVsZW1lbnQuYXQ7XG4gICAgICAgIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5TVFlMRSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2cEVsZW1lbnQudjtcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZXMgPSB2YWx1ZS5kZWZhdWx0O1xuXG4gICAgICAgICAgICBkZWZhdWx0Q1NTTm9kZVN0eWxlID0gZ2V0Q1NTU3R5bGVFbnRyaWVzKGRlZmF1bHRTdHlsZXMubm9kZSwgJ25vZGUnKTtcbiAgICAgICAgICAgIGRlZmF1bHRDU1NFZGdlU3R5bGUgPSBnZXRDU1NTdHlsZUVudHJpZXMoZGVmYXVsdFN0eWxlcy5lZGdlLCAnZWRnZScpO1xuXG4gICAgICAgICAgICBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gZGVmYXVsdFN0eWxlcy5uZXR3b3JrWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGVNYXBwaW5nID0gdmFsdWUubm9kZU1hcHBpbmc7XG4gICAgICAgICAgICBtYXBwaW5nQ1NTTm9kZVN0eWxlID0gZ2V0Q1NTTWFwcGluZ0VudHJpZXMobm9kZU1hcHBpbmcsICdub2RlJywgbm9kZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgICAgICBjb25zdCBlZGdlTWFwcGluZyA9IHZhbHVlLmVkZ2VNYXBwaW5nO1xuICAgICAgICAgICAgbWFwcGluZ0NTU0VkZ2VTdHlsZSA9IGdldENTU01hcHBpbmdFbnRyaWVzKGVkZ2VNYXBwaW5nLCAnZWRnZScsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHZwRWxlbWVudCA9PSBjeENvbnN0YW50cy5OKSB7XG4gICAgICAgICAgICAvL0J5cGFzcyBzdHlsZSBub2RlXG4gICAgICAgIH0gZWxzZSBpZiAodnBFbGVtZW50ID09IGN4Q29uc3RhbnRzLkUpIHtcbiAgICAgICAgICAgIC8vQnlwYXNzIHN0eWxlIGVkZ2VcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvL0FkZCBkZWZhdWx0IHN0eWxlXG4gICAgb3V0cHV0LnN0eWxlLnB1c2goZ2V0U3R5bGVFbGVtZW50KE5PREVfU0VMRUNUT1IsIGRlZmF1bHRDU1NOb2RlU3R5bGUpKTtcbiAgICBvdXRwdXQuc3R5bGUucHVzaChnZXRTdHlsZUVsZW1lbnQoRURHRV9TRUxFQ1RPUiwgZGVmYXVsdENTU0VkZ2VTdHlsZSkpO1xuXG4gICAgb3V0cHV0LnN0eWxlLnB1c2guYXBwbHkob3V0cHV0LnN0eWxlLCBtYXBwaW5nQ1NTTm9kZVN0eWxlKTtcblxuICAgIG91dHB1dFsnYmFja2dyb3VuZC1jb2xvciddID0gY3NzTmV0d29ya0JhY2tncm91bmRDb2xvcjtcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IE5PREVfU0VMRUNUT1IgPSAnbm9kZSc7XG5jb25zdCBFREdFX1NFTEVDVE9SID0gJ2VkZ2UnO1xuXG5mdW5jdGlvbiBnZXREYXRhKHYsIGF0dHJpYnV0ZU5hbWVNYXAsIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIGxldCBkYXRhID0ge307XG4gICAgT2JqZWN0LmtleXModikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICBkYXRhW25ld0tleV0gPSB2W2tleV07XG4gICAgfSk7XG4gICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKCFkYXRhW2tleV0pIHtcbiAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAoYXR0cmlidXRlVHlwZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2QnXSkge1xuICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGVjbGFyYXRpb24uZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlTmFtZU1hcChhdHRyaWJ1dGVOYW1lTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsnYSddKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXR0cmlidXRlICcgKyBhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hICsgJyBzaG91bGQgYmUgcmVuYW1lZCB0byAnICsgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVOYW1lTWFwLnNldChhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hLCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAoYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsndiddKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXR0cmlidXRlICcgKyBhdHRyaWJ1dGVOYW1lICsgJyBoYXMgZGVmYXVsdCB2YWx1ZSAnICsgYXR0cmlidXRlRGVjbGFyYXRpb24udik7XG4gICAgICAgICAgICBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLnYpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdjeXRvc2NhcGVKUycsXG4gICAgY29udmVydDogKGN4KSA9PiB7XG4gICAgICAgIGNvbnN0IG91dHB1dCA9IHtcbiAgICAgICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiB7fSxcbiAgICAgICAgICAgIGxheW91dDoge30sXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBub2RlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBsZXQgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCB1cGRhdGVJbmZlcnJlZFR5cGVzID0gZnVuY3Rpb24gKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZU5hbWVNYXAsIHYpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHYpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghYXR0cmlidXRlVHlwZU1hcC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5mZXJyZWRUeXBlID0gdHlwZW9mIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdLZXkgPSBhdHRyaWJ1dGVOYW1lTWFwLmhhcyhrZXkpID8gYXR0cmlidXRlTmFtZU1hcC5nZXQoa2V5KSA6IGtleTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQobmV3S2V5LCBpbmZlcnJlZFR5cGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgICAgIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgICAgICAgICAgICAgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMuZm9yRWFjaCgoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnbm9kZXMnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnZWRnZXMnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hOb2RlWydpZCddLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVNYXAuc2V0KGN4SWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjeE5vZGVbJ2lkJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB2OiBjeE5vZGVbJ3YnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IGN4Tm9kZVsneCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IGN4Tm9kZVsneSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHo6IGN4Tm9kZVsneiddXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVJbmZlcnJlZFR5cGVzKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hOb2RlWyd2J10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcbiAgICAgICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hFZGdlWydpZCddLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGVkZ2VNYXAuc2V0KGN4SWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjeEVkZ2VbJ2lkJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB2OiBjeEVkZ2VbJ3YnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHM6IGN4RWRnZVsncyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgdDogY3hFZGdlWyd0J11cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUluZmVycmVkVHlwZXMoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEVkZ2VbJ3YnXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ10pIHtcbiAgICAgICAgICAgICAgICBjeFZpc3VhbFByb3BlcnRpZXMgPSBjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcC5mb3JFYWNoKChpbmZlcnJlZFR5cGUsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3Igbm9kZS4nICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcC5mb3JFYWNoKChpbmZlcnJlZFR5cGUsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3IgZWRnZS4nICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL0FkZCBub2Rlc1xuICAgICAgICBvdXRwdXQuZWxlbWVudHNbJ25vZGVzJ10gPSBbXTtcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydlZGdlcyddID0gW107XG4gICAgICAgIG5vZGVNYXAuZm9yRWFjaCgoY3hOb2RlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7fTtcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGdldERhdGEoY3hOb2RlLnYsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnaWQnXSA9IGN4Tm9kZS5pZDtcbiAgICAgICAgICAgIGVsZW1lbnRbJ3Bvc2l0aW9uJ10gPSB7XG4gICAgICAgICAgICAgICAgeDogY3hOb2RlLmxheW91dC54LFxuICAgICAgICAgICAgICAgIHk6IGN4Tm9kZS5sYXlvdXQueVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMubm9kZXMucHVzaChlbGVtZW50KVxuICAgICAgICB9KTtcblxuICAgICAgICAvL0FkZCBlZGdlc1xuICAgICAgICBvdXRwdXQuZWxlbWVudHNbJ2VkZ2VzJ10gPSBbXTtcbiAgICAgICAgZWRnZU1hcC5mb3JFYWNoKChjeEVkZ2UsIGtleSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHt9O1xuICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddID0gZ2V0RGF0YShjeEVkZ2UudiwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydpZCddID0gY3hFZGdlLmlkO1xuICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydzb3VyY2UnXSA9IGN4RWRnZS5zO1xuICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWyd0YXJnZXQnXSA9IGN4RWRnZS50O1xuICAgICAgICAgICAgb3V0cHV0LmVsZW1lbnRzLmVkZ2VzLnB1c2goZWxlbWVudClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMpO1xuXG4gICAgICAgIG91dHB1dC5zdHlsZSA9IHN0eWxlLnN0eWxlO1xuICAgICAgICBvdXRwdXRbJ2JhY2tncm91bmQtY29sb3InXSA9IHN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnZlcnRlcjogY29udmVydGVyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeXRvc2NhcGVKUy5qcyJdLCJzb3VyY2VSb290IjoiIn0=