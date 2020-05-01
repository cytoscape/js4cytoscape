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

var defaultConverters = [largeNetwork, cytoscapeJS];

function convert(cx, targetFormat) {
    var converters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultConverters;

    verifyVersion(cx);
    var selectedConverter = undefined;

    converters.forEach(function (converter) {
        if (converter.converter.targetFormat == targetFormat) {
            console.log('target format: ' + converter.converter.targetFormat);
            if (typeof selectedConverter == 'undefined') {
                selectedConverter = converter;
            } else {
                throw 'converters contain multiple entries for target format: ' + targetFormat;
            }
        }
    });

    if (typeof selectedConverter == 'undefined') {
        throw 'no converter available for target format: ' + targetFormat;
    }

    return selectedConverter.converter.convert(cx);
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
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessNodeWidth, portablePropertyValue);
        },
        'NODE_HEIGHT': function NODE_HEIGHT(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessNodeHeight, portablePropertyValue);
        },
        'NODE_BACKGROUND_COLOR': function NODE_BACKGROUND_COLOR(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessColor, hexToRGB(portablePropertyValue));
        },
        'NODE_BACKGROUND_OPACITY': function NODE_BACKGROUND_OPACITY(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessAlpha, alphaToInt(portablePropertyValue));
        },
        'NODE_LABEL': function NODE_LABEL(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.label, portablePropertyValue);
        },
        'NODE_LABEL_COLOR': function NODE_LABEL_COLOR(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessLabelColor, hexToRGB(portablePropertyValue));
        },
        'NODE_LABEL_OPACITY': function NODE_LABEL_OPACITY(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessLabelAlpha, alphaToInt(portablePropertyValue));
        },
        'NODE_LABEL_FONT_SIZE': function NODE_LABEL_FONT_SIZE(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.labelFontSize, portablePropertyValue);
        }
    },
    'edge': {
        'EDGE_WIDTH': function EDGE_WIDTH(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.width, portablePropertyValue);
        },
        'EDGE_OPACITY': function EDGE_OPACITY(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessAlpha, alphaToInt(portablePropertyValue));
        },
        'EDGE_LINE_COLOR': function EDGE_LINE_COLOR(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessColor, hexToRGB(portablePropertyValue));
        },
        'EDGE_LABEL': function EDGE_LABEL(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.label, portablePropertyValue);
        },
        'EDGE_LABEL_COLOR': function EDGE_LABEL_COLOR(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessLabelColor, hexToRGB(portablePropertyValue));
        },
        'EDGE_LABEL_OPACITY': function EDGE_LABEL_OPACITY(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessLabelAlpha, alphaToInt(portablePropertyValue));
        },
        'EDGE_LABEL_FONT_SIZE': function EDGE_LABEL_FONT_SIZE(portablePropertyValue) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.labelFontSize, portablePropertyValue);
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

    var labelColorArray = undefined;
    var labelAlpha = undefined;

    var output = {
        id: nodeView.id,
        position: nodeView.position
    };

    Object.keys(nodeView).forEach(function (key) {
        if (key === largeNetworkConstants.preprocessNodeWidth) {
            width = nodeView.preprocessNodeWidth;
        } else if (key === largeNetworkConstants.preprocessNodeHeight) {
            height = nodeView.preprocessNodeHeight;
        } else if (key === largeNetworkConstants.preprocessColor) {
            colorArray = nodeView.preprocessColor;
        } else if (key === largeNetworkConstants.preprocessAlpha) {
            alpha = nodeView.preprocessAlpha;
        } else if (key === largeNetworkConstants.preprocessLabelColor) {
            labelColorArray = nodeView.preprocessLabelColor;
        } else if (key === largeNetworkConstants.preprocessLabelAlpha) {
            labelAlpha = nodeView.preprocessLabelAlpha;
        } else {
            output[key] = nodeView[key];
        }
    });

    var color = processColor(colorArray, alpha);
    if (color) {
        output[largeNetworkConstants.color] = color;
    }

    var labelColor = processColor(labelColorArray, labelAlpha);
    if (labelColor) {
        output[largeNetworkConstants.labelColor] = labelColor;
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

    var labelColorArray = undefined;
    var labelAlpha = undefined;

    var output = {
        id: edgeView.id,
        s: edgeView.s,
        t: edgeView.t
    };

    Object.keys(edgeView).forEach(function (key) {
        if (key === largeNetworkConstants.preprocessColor) {
            colorArray = edgeView.preprocessColor;
        } else if (key === largeNetworkConstants.preprocessAlpha) {
            alpha = edgeView.preprocessAlpha;
        } else if (key === largeNetworkConstants.preprocessLabelColor) {
            labelColorArray = edgeView.preprocessLabelColor;
        } else if (key === largeNetworkConstants.preprocessLabelAlpha) {
            labelAlpha = edgeView.preprocessLabelAlpha;
        } else {
            output[key] = edgeView[key];
        }
    });

    var color = processColor(colorArray, alpha);
    if (color) {
        output[largeNetworkConstants.color] = color;
    }

    var labelColor = processColor(labelColorArray, labelAlpha);
    if (labelColor) {
        output[largeNetworkConstants.labelColor] = labelColor;
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

function getMap(vpMin, vpMax, attributeRatio) {
    return vpMin + (vpMax - vpMin) * attributeRatio;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function continuousNumberPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
    var attributeRatio = getAttributeRatio(attributeValue, attributeMin, attributeMax);

    var output = getMap(vpMin, vpMax, attributeRatio);

    return output;
}

function continuousColorPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
    var minRGB = hexToRGB(vpMin);
    var maxRGB = hexToRGB(vpMax);

    var attributeRatio = getAttributeRatio(attributeValue, attributeMin, attributeMax);

    var output = [clamp(Math.round(getMap(minRGB[0], maxRGB[0], attributeRatio)), 0, 255), clamp(Math.round(getMap(minRGB[1], maxRGB[1], attributeRatio)), 0, 255), clamp(Math.round(getMap(minRGB[2], maxRGB[2], attributeRatio)), 0, 255)];
    return output;
}

function continuousAlphaPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
    var attributeRatio = getAttributeRatio(attributeValue, attributeMin, attributeMax);

    if (vpMin && vpMax) {
        var alphaDecimal = getMap(vpMin, vpMax, attributeRatio);

        console.log("alphaDecimal = " + alphaDecimal);
        return alphaToInt(alphaDecimal);
    }
}

var continuousPropertyConvert = {
    'node': {
        'NODE_WIDTH': function NODE_WIDTH(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessNodeWidth, continuousNumberPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'NODE_HEIGHT': function NODE_HEIGHT(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessNodeHeight, continuousNumberPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'NODE_BACKGROUND_COLOR': function NODE_BACKGROUND_COLOR(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessColor, continuousColorPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'NODE_BACKGROUND_OPACITY': function NODE_BACKGROUND_OPACITY(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessAlpha, continuousAlphaPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'NODE_LABEL_COLOR': function NODE_LABEL_COLOR(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessLabelColor, continuousColorPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'NODE_LABEL_OPACITY': function NODE_LABEL_OPACITY(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessLabelAlpha, continuousAlphaPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'NODE_LABEL_FONT_SIZE': function NODE_LABEL_FONT_SIZE(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.labelFontSize, continuousNumberPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        }
    },
    'edge': {
        'EDGE_WIDTH': function EDGE_WIDTH(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.width, continuousNumberPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'EDGE_OPACITY': function EDGE_OPACITY(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessAlpha, continuousAlphaPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'EDGE_LINE_COLOR': function EDGE_LINE_COLOR(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessColor, continuousColorPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'EDGE_LABEL_COLOR': function EDGE_LABEL_COLOR(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessLabelColor, continuousColorPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'EDGE_LABEL_OPACITY': function EDGE_LABEL_OPACITY(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.preprocessLabelAlpha, continuousAlphaPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        },
        'EDGE_LABEL_FONT_SIZE': function EDGE_LABEL_FONT_SIZE(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
            return simpleDefaultPropertyConvert(largeNetworkConstants.labelFontSize, continuousNumberPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax));
        }
    }
};

function isInRange(attributeValue, min, max, includeMin, includeMax) {
    var minSatisfied = includeMin ? min <= attributeValue : min < attributeValue;
    var maxSatisfied = includeMax ? max >= attributeValue : max > attributeValue;
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
    // We need to collect object attributes to calculate
    // mappings in the second pass. 

    var cxVisualProperties = undefined;
    var cxNodeBypasses = [];
    var cxEdgeBypasses = [];

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
        } else if (cxAspect['nodeBypasses']) {
            cxAspect.nodeBypasses.forEach(function (bypass) {
                cxNodeBypasses.push(bypass);
            });
        } else if (cxAspect['edgeBypasses']) {
            cxAspect.edgeBypasses.forEach(function (bypass) {
                cxEdgeBypasses.push(bypass);
            });
        }
    });

    var output = {};

    var nodeViews = [];
    var edgeViews = [];

    cxVisualProperties.forEach(function (vpElement) {

        var defaultStyles = vpElement.default;

        defaultValues = getDefaultValues(defaultStyles);

        mappings.node = vpElement.nodeMapping ? getMappings(vpElement.nodeMapping) : {};
        mappings.edge = vpElement.edgeMapping ? getMappings(vpElement.edgeMapping) : {};
    });

    cxNodeBypasses.forEach(function (vpElement) {

        var key = vpElement[cxConstants.ID].toString();
        var values = getLNVValues('node', vpElement.v);

        if (!bypassMappings.node[key]) {
            bypassMappings.node[key] = {};
        }

        console.log('bypass calculated: ' + JSON.stringify(values, null, 2));

        Object.assign(bypassMappings.node[key], values);
        //bypassCSSEntries.push(getBypassCSSEntry('node', vpElement));
    });

    cxEdgeBypasses.forEach(function (vpElement) {
        var key = vpElement[cxConstants.ID].toString();
        var values = getLNVValues('edge', vpElement.v);

        if (!bypassMappings.edge[key]) {
            bypassMappings.edge[key] = {};
        }

        console.log('bypass calculated: ' + JSON.stringify(values, null, 2));

        Object.assign(bypassMappings.edge[key], values);
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
    simpleDefaultPropertyConvert: simpleDefaultPropertyConvert,
    continuousNumberPropertyConvert: continuousNumberPropertyConvert,
    continuousAlphaPropertyConvert: continuousAlphaPropertyConvert,
    continuousColorPropertyConvert: continuousColorPropertyConvert,
    processNodeView: processNodeView,
    processEdgeView: processEdgeView,
    getDefaultValues: getDefaultValues,
    isInRange: isInRange,
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
    'labelColor': 'labelColor',
    'labelFontSize': 'labelFontSize',
    'color': 'color',
    'size': 'size',
    'width': 'width',

    'preprocessColor': 'preprocessColor',
    'preprocessAlpha': 'preprocessAlpha',
    'preprocessLabelColor': 'preprocessLabelColor',
    'preprocessLabelAlpha': 'preprocessLabelAlpha',
    'preprocessNodeWidth': 'preprocessNodeWidth',
    'preprocessNodeHeight': 'preprocessNodeHeight'
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
        },
        'NODE_LABEL_OPACITY': function NODE_LABEL_OPACITY(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.label_opacity, portablePropertyValue);
        },
        'NODE_LABEL_FONT_SIZE': function NODE_LABEL_FONT_SIZE(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.label_font_size, portablePropertyValue);
        }
    },
    'edge': {
        'EDGE_WIDTH': function EDGE_WIDTH(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.width, portablePropertyValue);
        },
        'EDGE_OPACITY': function EDGE_OPACITY(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.opacity, portablePropertyValue);
        },
        'EDGE_LABEL': function EDGE_LABEL(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.label, portablePropertyValue);
        },
        'EDGE_LINE_COLOR': function EDGE_LINE_COLOR(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.line_color, portablePropertyValue);
        },
        'EDGE_LABEL_OPACITY': function EDGE_LABEL_OPACITY(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.label_opacity, portablePropertyValue);
        },
        'EDGE_LABEL_FONT_SIZE': function EDGE_LABEL_FONT_SIZE(portablePropertyValue) {
            return simpleDefaultPropertyConvert(jsConstants.label_font_size, portablePropertyValue);
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
        },
        'NODE_LABEL_OPACITY': function NODE_LABEL_OPACITY(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.label_opacity, attributeName);
        },
        'NODE_LABEL_FONT_SIZE': function NODE_LABEL_FONT_SIZE(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.label_font_size, attributeName);
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
        },
        'EDGE_LABEL': function EDGE_LABEL(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.label, attributeName);
        },
        'EDGE_LABEL_COLOR': function EDGE_LABEL_COLOR(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.label_color, attributeName);
        },
        'EDGE_LABEL_OPACITY': function EDGE_LABEL_OPACITY(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.label_opacity, attributeName);
        },
        'EDGE_LABEL_FONT_SIZE': function EDGE_LABEL_FONT_SIZE(attributeName) {
            return simplePassthroughMappingConvert(jsConstants.label_font_size, attributeName);
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
        },
        'NODE_LABEL_OPACITY': function NODE_LABEL_OPACITY(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.label_opacity, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'NODE_LABEL_FONT_SIZE': function NODE_LABEL_FONT_SIZE(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.label_font_size, attributeName, minValue, maxValue, minVP, maxVP);
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
        },
        'EDGE_LABEL': function EDGE_LABEL(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.label, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'EDGE_LABEL_COLOR': function EDGE_LABEL_COLOR(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.label_color, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'EDGE_LABEL_OPACITY': function EDGE_LABEL_OPACITY(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.label_opacity, attributeName, minValue, maxValue, minVP, maxVP);
        },
        'EDGE_LABEL_FONT_SIZE': function EDGE_LABEL_FONT_SIZE(attributeName, minValue, maxValue, minVP, maxVP) {
            return simpleMapDataPropertyConvert(jsConstants.label_font_size, attributeName, minValue, maxValue, minVP, maxVP);
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
    var minBound = minValue ? '[' + attributeName + ' ' + minCondition + ' ' + minValue + ']' : '';
    var maxBound = maxValue ? '[' + attributeName + ' ' + maxCondition + ' ' + maxValue + ']' : '';
    return entityType + minBound + maxBound;
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

    var id = cxElement.id;
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

    var selector = getIdSelector(id, entityType);
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

function getVisualProperties(cxVisualProperties, cxNodeBypasses, cxEdgeBypasses, nodeAttributeTypeMap, edgeAttributeTypeMap) {
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
        var defaultStyles = vpElement.default;

        console.log('default style: ' + JSON.stringify(defaultStyles));
        defaultCSSNodeStyle = getCSSStyleEntries(defaultStyles.node, 'node');
        defaultCSSEdgeStyle = getCSSStyleEntries(defaultStyles.edge, 'edge');

        cssNetworkBackgroundColor = defaultStyles.network['background-color'];

        var nodeMapping = vpElement.nodeMapping;
        mappingCSSNodeStyle = getCSSMappingEntries(nodeMapping, 'node', nodeAttributeTypeMap);

        var edgeMapping = vpElement.edgeMapping;
        mappingCSSEdgeStyle = getCSSMappingEntries(edgeMapping, 'edge', edgeAttributeTypeMap);
    });

    cxNodeBypasses.forEach(function (vpElement) {
        bypassCSSEntries.push(getBypassCSSEntry('node', vpElement));
    });

    cxEdgeBypasses.forEach(function (vpElement) {
        bypassCSSEntries.push(getBypassCSSEntry('edge', vpElement));
    });

    console.log('default node style: ' + JSON.stringify(defaultCSSNodeStyle));

    //Add default style
    output.style.push(getStyleElement(NODE_SELECTOR, defaultCSSNodeStyle));
    output.style.push(getStyleElement(EDGE_SELECTOR, defaultCSSEdgeStyle));

    output.style.push.apply(output.style, mappingCSSNodeStyle);
    output.style.push.apply(output.style, mappingCSSEdgeStyle);

    output.style.push.apply(output.style, bypassCSSEntries);

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
        var cxNodeBypasses = [];
        var cxEdgeBypasses = [];

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
            } else if (cxAspect['nodeBypasses']) {
                cxAspect.nodeBypasses.forEach(function (bypass) {
                    cxNodeBypasses.push(bypass);
                });
            } else if (cxAspect['edgeBypasses']) {
                cxAspect.edgeBypasses.forEach(function (bypass) {
                    cxEdgeBypasses.push(bypass);
                });
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

        var style = getVisualProperties(cxVisualProperties, cxNodeBypasses, cxEdgeBypasses, nodeAttributeTypeMap, edgeAttributeTypeMap);

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
    'label_font_size': 'font-size',
    'label_opacity': 'text-opacity',
    'opacity': 'opacity',
    'line_color': 'line-color'
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1NGM0YzA1NTY5ZGQyNjI1M2Y4YyIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsIlBPIiwiZ2V0Q3hWZXJzaW9uIiwidmVyc2lvblN0cmluZyIsInZlcnNpb25BcnJheSIsInNwbGl0IiwibWFwIiwibnVtYmVyU3RyaW5nIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXNOYU4iLCJlbGVtZW50IiwiZ2V0Q3hNYWpvclZlcnNpb24iLCJwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVBdHRyaWJ1dGVUeXBlTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwiZWRnZUF0dHJpYnV0ZVR5cGVNYXAiLCJlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjeEF0dHJpYnV0ZURlY2xhcmF0aW9uIiwidXBkYXRlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVzIiwidXBkYXRlQXR0cmlidXRlVHlwZU1hcCIsInVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VzIiwiYXR0cmlidXRlVHlwZU1hcCIsImF0dHJpYnV0ZURlY2xhcmF0aW9ucyIsImtleXMiLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlRGVjbGFyYXRpb24iLCJzZXQiLCJkIiwiYXR0cmlidXRlTmFtZU1hcCIsImEiLCJhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJ2IiwidXBkYXRlSW5mZXJyZWRUeXBlcyIsImtleSIsImhhcyIsInZhbHVlIiwiaW5mZXJyZWRUeXBlIiwibmV3S2V5IiwiZ2V0IiwiZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzIiwiZGF0YSIsImNvbnZlcnRlciIsInJlcXVpcmUiLCJjb252ZXJ0IiwiY3giLCJ0YXJnZXRGb3JtYXQiLCJjeENvbnN0YW50cyIsImxhcmdlTmV0d29yayIsImN5dG9zY2FwZUpTIiwiY3hVdGlsIiwidmVyaWZ5VmVyc2lvbiIsImZpcnN0RWxlbWVudCIsIm1ham9yVmVyc2lvbiIsImRlZmF1bHRDb252ZXJ0ZXJzIiwiY29udmVydGVycyIsInNlbGVjdGVkQ29udmVydGVyIiwidW5kZWZpbmVkIiwibGFyZ2VOZXR3b3JrQ29uc3RhbnRzIiwic2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCIsInRhcmdldFN0eWxlRmllbGQiLCJwb3J0YWJsZVByb3BlcnRWYWx1ZSIsInRhcmdldFN0eWxlRW50cnkiLCJoZXhUb1JHQiIsImhleCIsInIiLCJnIiwiYiIsImFscGhhVG9JbnQiLCJhbHBoYURlY2ltYWwiLCJjbGFtcCIsIk1hdGgiLCJyb3VuZCIsImRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJwb3J0YWJsZVByb3BlcnR5VmFsdWUiLCJwcmVwcm9jZXNzTm9kZVdpZHRoIiwicHJlcHJvY2Vzc05vZGVIZWlnaHQiLCJwcmVwcm9jZXNzQ29sb3IiLCJwcmVwcm9jZXNzQWxwaGEiLCJsYWJlbCIsInByZXByb2Nlc3NMYWJlbENvbG9yIiwicHJlcHJvY2Vzc0xhYmVsQWxwaGEiLCJsYWJlbEZvbnRTaXplIiwid2lkdGgiLCJnZXREZWZhdWx0VmFsdWVzIiwiZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMiLCJvdXRwdXQiLCJub2RlIiwiZWRnZSIsIm5vZGVEZWZhdWx0IiwibG52RW50cmllcyIsImdldExOVlZhbHVlcyIsImFzc2lnbiIsImVkZ2VEZWZhdWx0IiwiZW50aXR5VHlwZSIsImVudHJpZXMiLCJwb3J0YWJsZVByb3BlcnR5S2V5IiwibG52RW50cnkiLCJsbnZLZXkiLCJwcm9jZXNzQ29sb3IiLCJjb2xvckFycmF5IiwiYWxwaGEiLCJwcm9jZXNzU2l6ZSIsImhlaWdodCIsIm1heCIsInByb2Nlc3NOb2RlVmlldyIsIm5vZGVWaWV3IiwibGFiZWxDb2xvckFycmF5IiwibGFiZWxBbHBoYSIsImlkIiwicG9zaXRpb24iLCJjb2xvciIsImxhYmVsQ29sb3IiLCJzaXplIiwicHJvY2Vzc0VkZ2VWaWV3IiwiZWRnZVZpZXciLCJzIiwidCIsImdldE1hcHBpbmdzIiwibWFwcGluZ3MiLCJtYXBwaW5nIiwicHJvcGVydHlLZXkiLCJkZWZpbml0aW9uIiwiYXR0cmlidXRlIiwidHlwZSIsInZwIiwiZ2V0QXR0cmlidXRlUmF0aW8iLCJhdHRyaWJ1dGVWYWx1ZSIsImF0dHJpYnV0ZU1pbiIsImF0dHJpYnV0ZU1heCIsImdldE1hcCIsInZwTWluIiwidnBNYXgiLCJhdHRyaWJ1dGVSYXRpbyIsIm1pbiIsImNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQiLCJjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQiLCJtaW5SR0IiLCJtYXhSR0IiLCJjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQiLCJjb250aW51b3VzUHJvcGVydHlDb252ZXJ0IiwiaXNJblJhbmdlIiwiaW5jbHVkZU1pbiIsImluY2x1ZGVNYXgiLCJtaW5TYXRpc2ZpZWQiLCJtYXhTYXRpc2ZpZWQiLCJnZXRNYXBwcGVkVmFsdWVzIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZUtleSIsImRpc2NyZXRlTWFwIiwia2V5VmFsdWUiLCJjb252ZXJ0ZWQiLCJjb250aW51b3VzTWFwcGluZ3MiLCJtYXBwaW5nUmFuZ2UiLCJtaW5WUFZhbHVlIiwibWF4VlBWYWx1ZSIsImxudkNvbnZlcnQiLCJjeFZpc3VhbFByb3BlcnRpZXMiLCJjeE5vZGVCeXBhc3NlcyIsImN4RWRnZUJ5cGFzc2VzIiwiTWFwIiwiZGVmYXVsdFZhbHVlcyIsImJ5cGFzc01hcHBpbmdzIiwiY3hBc3BlY3QiLCJjeE5vZGVzIiwiY3hOb2RlIiwiY3hFZGdlcyIsImN4RWRnZSIsIm5vZGVCeXBhc3NlcyIsInB1c2giLCJieXBhc3MiLCJlZGdlQnlwYXNzZXMiLCJub2RlVmlld3MiLCJlZGdlVmlld3MiLCJkZWZhdWx0U3R5bGVzIiwidnBFbGVtZW50IiwiZGVmYXVsdCIsIm5vZGVNYXBwaW5nIiwiZWRnZU1hcHBpbmciLCJ0b1N0cmluZyIsInZhbHVlcyIsImN4SWQiLCJkZWZhdWx0Tm9kZVZpc3VhbFByb3BlcnRpZXMiLCJleHBhbmRlZEF0dHJpYnV0ZXMiLCJtYXBwaW5nVmFsdWVzIiwicHJvY2Vzc2VkTm9kZVZpZXciLCJkZWZhdWx0RWRnZVZpc3VhbFByb3BlcnRpZXMiLCJwcm9jZXNzZWRFZGdlVmlldyIsImpzQ29uc3RhbnRzIiwic2hhcGUiLCJiYWNrZ3JvdW5kX2NvbG9yIiwiYmFja2dyb3VuZF9vcGFjaXR5IiwibGFiZWxfY29sb3IiLCJsYWJlbF9vcGFjaXR5IiwibGFiZWxfZm9udF9zaXplIiwib3BhY2l0eSIsImxpbmVfY29sb3IiLCJzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0IiwicGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCIsInNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQiLCJtaW5WYWx1ZSIsIm1heFZhbHVlIiwibWluVlAiLCJtYXhWUCIsIm1hcERhdGFQcm9wZXJ0eUNvbnZlcnQiLCJnZXRDU1NTdHlsZUVudHJpZXMiLCJjeFN0eWxlRW50cmllcyIsImNzc0VudHJpZXMiLCJnZXRJZFNlbGVjdG9yIiwiZWxlbWVudFR5cGUiLCJnZXRTdHlsZUVsZW1lbnQiLCJzZWxlY3RvciIsImNzcyIsImdldENvbnRpbnVvdXNTZWxlY3RvciIsIm1pbkNvbmRpdGlvbiIsIm1heENvbmRpdGlvbiIsIm1pbkJvdW5kIiwibWF4Qm91bmQiLCJnZXRDb250aW51b3VzU3R5bGUiLCJnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMiLCJjeE1hcHBpbmdEZWZpbml0aW9uIiwicmFuZ2VNYXBzIiwicmFuZ2UiLCJzdHlsZSIsImdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5IiwiZ2V0RGlzY3JldGVTZWxlY3RvciIsImF0dHJpYnV0ZURhdGFUeXBlIiwiZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyIsImF0dHRyaWJ1dGVUb1ZhbHVlTWFwIiwic3R5bGVNYXAiLCJnZXRCeXBhc3NDU1NFbnRyeSIsImN4RWxlbWVudCIsImdldENTU01hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cmllcyIsImN4TWFwcGluZ0VudHJ5IiwiY29udGlub3VzTWFwcGluZ3MiLCJjb250aW5vdXNNYXBwaW5nIiwiY3NzRW50cnkiLCJkaXNjcmV0ZU1hcHBpbmdzIiwiZGlzY3JldGVNYXBwaW5nIiwiTk9ERV9TRUxFQ1RPUiIsIkVER0VfU0VMRUNUT1IiLCJnZXRWaXN1YWxQcm9wZXJ0aWVzIiwiZGVmYXVsdENTU05vZGVTdHlsZSIsImRlZmF1bHRDU1NFZGdlU3R5bGUiLCJjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yIiwibWFwcGluZ0NTU05vZGVTdHlsZSIsIm1hcHBpbmdDU1NFZGdlU3R5bGUiLCJieXBhc3NDU1NFbnRyaWVzIiwibmV0d29yayIsImFwcGx5IiwiZWxlbWVudHMiLCJsYXlvdXQiLCJ4IiwieSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7O1FBRUE7UUFDQTs7Ozs7Ozs7OztBQzVEQUEsT0FBT0MsT0FBUCxHQUFpQkMsT0FBT0MsTUFBUCxDQUFjO0FBQzNCQyxnQkFBWSxXQURlO0FBRTNCQyxVQUFNLE1BRnFCO0FBRzNCQyxVQUFNLE1BSHFCO0FBSTNCQyxhQUFTLFNBSmtCOztBQU0zQkMsV0FBTyxPQU5vQjtBQU8zQkMsV0FBTyxPQVBvQjs7QUFTM0JDLFFBQUksSUFUdUI7QUFVM0JDLE9BQUcsR0FWd0I7QUFXM0JDLE9BQUcsR0FYd0I7QUFZM0JDLE9BQUcsR0Fad0I7QUFhM0JDLE9BQUcsR0Fid0I7O0FBZTNCQyxRQUFJLElBZnVCO0FBZ0IzQkMsT0FBRyxHQWhCd0I7QUFpQjNCQyxPQUFHLEdBakJ3Qjs7QUFtQjNCQyx1QkFBbUIsa0JBbkJRO0FBb0IzQkMsYUFBUyxTQXBCa0I7O0FBc0IzQkMsV0FBTyxPQXRCb0I7O0FBd0IzQkMsUUFBSTtBQXhCdUIsQ0FBZCxDQUFqQixDOzs7Ozs7Ozs7OztBQ0RBLFNBQVNDLFlBQVQsQ0FBc0JD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LGNBQVUsUUFIaUI7QUFJM0Isd0JBQW9CLGtCQUpPO0FBSzNCLDBCQUFzQixvQkFMSztBQU0zQixhQUFTLE9BTmtCO0FBTzNCLG1CQUFlLE9BUFk7QUFRM0IsdUJBQW9CLFdBUk87QUFTM0IscUJBQWtCLGNBVFM7QUFVM0IsZUFBVyxTQVZnQjtBQVczQixrQkFBYztBQVhhLENBQWQsQ0FBakIsQyIsImZpbGUiOiIuL2J1aWxkL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1NGM0YzA1NTY5ZGQyNjI1M2Y4YyIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBDWF9WRVJTSU9OOiAnQ1hWZXJzaW9uJyxcbiAgICBOT0RFOiAnbm9kZScsXG4gICAgRURHRTogJ2VkZ2UnLFxuICAgIE5FVFdPUks6ICduZXR3b3JrJyxcblxuICAgIE5PREVTOiAnbm9kZXMnLFxuICAgIEVER0VTOiAnZWRnZXMnLFxuXG4gICAgSUQ6ICdpZCcsXG4gICAgWDogJ3gnLFxuICAgIFk6ICd5JyxcbiAgICBaOiAneicsXG4gICAgVjogJ3YnLFxuXG4gICAgQVQ6ICdhdCcsXG4gICAgTjogJ24nLFxuICAgIEU6ICdlJyxcblxuICAgIFZJU1VBTF9QUk9QRVJUSUVTOiAndmlzdWFsUHJvcGVydGllcycsXG4gICAgREVGQVVMVDogJ2RlZmF1bHQnLFxuXG4gICAgU1RZTEU6ICdzdHlsZScsXG5cbiAgICBQTzogJ3BvJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N4Q29uc3RhbnRzLmpzIiwiZnVuY3Rpb24gZ2V0Q3hWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcbiAgICBjb25zdCB2ZXJzaW9uQXJyYXkgPSB2ZXJzaW9uU3RyaW5nLnNwbGl0KCcuJykubWFwKChudW1iZXJTdHJpbmcpID0+IHsgcmV0dXJuIHBhcnNlSW50KG51bWJlclN0cmluZywgMTApOyB9KTtcbiAgICBpZiAodmVyc2lvbkFycmF5Lmxlbmd0aCAhPT0gMiAmJiB2ZXJzaW9uQXJyYXkubGVuZ3RoICE9IDMpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSB2ZXJzaW9uIGZvcm1hdDogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxuICAgIHZlcnNpb25BcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAoaXNOYU4oZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93ICdOb24taW50ZWdlciB2YWx1ZSBpbiB2ZXJzaW9uIHN0cmluZzogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdmVyc2lvbkFycmF5O1xufVxuXG5mdW5jdGlvbiBnZXRDeE1ham9yVmVyc2lvbih2ZXJzaW9uU3RyaW5nKSB7XG4gICAgcmV0dXJuIHZlcnNpb25TdHJpbmcgPyBnZXRDeFZlcnNpb24odmVyc2lvblN0cmluZylbMF0gOiAxO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zKGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBcbiAgICBub2RlQXR0cmlidXRlTmFtZU1hcCwgXG4gICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIFxuICAgIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIFxuICAgIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCwgXG4gICAgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIGNvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMuZm9yRWFjaCgoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbikgPT4ge1xuICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnbm9kZXMnXSkge1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnZWRnZXMnXSkge1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWydkJ10pIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLmQpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAoYXR0cmlidXRlTmFtZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2EnXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlRGVjbGFyYXRpb24uYSArICcgc2hvdWxkIGJlIHJlbmFtZWQgdG8gJyArIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgYXR0cmlidXRlTmFtZU1hcC5zZXQoYXR0cmlidXRlRGVjbGFyYXRpb24uYSwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ3YnXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlTmFtZSArICcgaGFzIGRlZmF1bHQgdmFsdWUgJyArIGF0dHJpYnV0ZURlY2xhcmF0aW9uLnYpO1xuICAgICAgICAgICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLnNldChhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbi52KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVJbmZlcnJlZFR5cGVzKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZU5hbWVNYXAsIHYpIHtcbiAgICBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgaWYgKCFhdHRyaWJ1dGVUeXBlTWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IGluZmVycmVkVHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQobmV3S2V5LCBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKHYsIGF0dHJpYnV0ZU5hbWVNYXAsIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIGxldCBkYXRhID0ge307XG4gICAgT2JqZWN0LmtleXModikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICBkYXRhW25ld0tleV0gPSB2W2tleV07XG4gICAgfSk7XG4gICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKCFkYXRhW2tleV0pIHtcbiAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEN4VmVyc2lvbjogZ2V0Q3hWZXJzaW9uLFxuICAgIGdldEN4TWFqb3JWZXJzaW9uOiBnZXRDeE1ham9yVmVyc2lvbixcbiAgICBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zOiBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zLFxuICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXA6IHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcDogdXBkYXRlQXR0cmlidXRlTmFtZU1hcCxcbiAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXA6IHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICB1cGRhdGVJbmZlcnJlZFR5cGVzOiB1cGRhdGVJbmZlcnJlZFR5cGVzLFxuICAgIGdldEV4cGFuZGVkQXR0cmlidXRlcyA6IGdldEV4cGFuZGVkQXR0cmlidXRlc1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hVdGlsLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb252ZXJ0ZXIgPSByZXF1aXJlICgnLi9jb252ZXJ0ZXIuanMnKTtcblxubW9kdWxlLmV4cG9ydHMuY29udmVydCA9IChjeCwgdGFyZ2V0Rm9ybWF0KSA9PiB7IHJldHVybiBjb252ZXJ0ZXIuY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0KTsgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmsgPSByZXF1aXJlICgnLi9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrLmpzJyk7IFxuY29uc3QgY3l0b3NjYXBlSlMgPSByZXF1aXJlICgnLi9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKUy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gdmVyaWZ5VmVyc2lvbihjeCkge1xuICAgIGNvbnN0IGZpcnN0RWxlbWVudCA9IGN4WzBdO1xuICAgIGNvbnN0IHZlcnNpb25TdHJpbmcgPSBmaXJzdEVsZW1lbnRbY3hDb25zdGFudHMuQ1hfVkVSU0lPTl07XG5cbiAgICBjb25zdCBtYWpvclZlcnNpb24gPSBjeFV0aWwuZ2V0Q3hNYWpvclZlcnNpb24odmVyc2lvblN0cmluZyk7XG5cbiAgICBpZiAobWFqb3JWZXJzaW9uICE9PSAyKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgQ1ggdmVyc2lvbjogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxufVxuXG5jb25zdCBkZWZhdWx0Q29udmVydGVycyA9IFtcbiAgICBsYXJnZU5ldHdvcmssXG4gICAgY3l0b3NjYXBlSlNcbl07XG5cbmZ1bmN0aW9uIGNvbnZlcnQoY3gsIHRhcmdldEZvcm1hdCwgY29udmVydGVycyA9IGRlZmF1bHRDb252ZXJ0ZXJzKSB7XG4gICAgdmVyaWZ5VmVyc2lvbihjeCk7XG4gICAgbGV0IHNlbGVjdGVkQ29udmVydGVyID0gdW5kZWZpbmVkO1xuICAgIFxuICAgIGNvbnZlcnRlcnMuZm9yRWFjaCggY29udmVydGVyID0+IHtcbiAgICAgICAgaWYgKGNvbnZlcnRlci5jb252ZXJ0ZXIudGFyZ2V0Rm9ybWF0ID09IHRhcmdldEZvcm1hdCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RhcmdldCBmb3JtYXQ6ICcgKyBjb252ZXJ0ZXIuY29udmVydGVyLnRhcmdldEZvcm1hdCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdGVkQ29udmVydGVyID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDb252ZXJ0ZXIgPSBjb252ZXJ0ZXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93ICdjb252ZXJ0ZXJzIGNvbnRhaW4gbXVsdGlwbGUgZW50cmllcyBmb3IgdGFyZ2V0IGZvcm1hdDogJyArIHRhcmdldEZvcm1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RlZENvbnZlcnRlciA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyAnbm8gY29udmVydGVyIGF2YWlsYWJsZSBmb3IgdGFyZ2V0IGZvcm1hdDogJyArIHRhcmdldEZvcm1hdFxuICAgIH1cblxuICAgIHJldHVybiBzZWxlY3RlZENvbnZlcnRlci5jb252ZXJ0ZXIuY29udmVydChjeClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydDogY29udmVydFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udmVydGVyLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmtDb25zdGFudHMgPSByZXF1aXJlKCcuL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpIHtcbiAgICBjb25zdCB0YXJnZXRTdHlsZUVudHJ5ID0ge307XG4gICAgdGFyZ2V0U3R5bGVFbnRyeVt0YXJnZXRTdHlsZUZpZWxkXSA9IHBvcnRhYmxlUHJvcGVydFZhbHVlO1xuICAgIHJldHVybiB0YXJnZXRTdHlsZUVudHJ5O1xufVxuXG5mdW5jdGlvbiBoZXhUb1JHQihoZXgpIHtcbiAgICBsZXQgciA9IDAsIGcgPSAwLCBiID0gMDtcblxuICAgIC8vIDMgZGlnaXRzXG4gICAgaWYgKGhleC5sZW5ndGggPT0gNCkge1xuICAgICAgICByID0gXCIweFwiICsgaGV4WzFdICsgaGV4WzFdO1xuICAgICAgICBnID0gXCIweFwiICsgaGV4WzJdICsgaGV4WzJdO1xuICAgICAgICBiID0gXCIweFwiICsgaGV4WzNdICsgaGV4WzNdO1xuXG4gICAgICAgIC8vIDYgZGlnaXRzXG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDcpIHtcbiAgICAgICAgciA9IFwiMHhcIiArIGhleFsxXSArIGhleFsyXTtcbiAgICAgICAgZyA9IFwiMHhcIiArIGhleFszXSArIGhleFs0XTtcbiAgICAgICAgYiA9IFwiMHhcIiArIGhleFs1XSArIGhleFs2XTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3BhcnNlSW50KHIpLCBwYXJzZUludChnKSwgcGFyc2VJbnQoYildO1xufVxuXG5mdW5jdGlvbiBhbHBoYVRvSW50KGFscGhhRGVjaW1hbCkge1xuICAgIHJldHVybiBjbGFtcChNYXRoLnJvdW5kKGFscGhhRGVjaW1hbCAqIDI1NSksIDAsIDI1NSk7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVXaWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVIZWlnaHQsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9MQUJFTF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0xBQkVMX0ZPTlRfU0laRSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsRm9udFNpemUsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhLCBhbHBoYVRvSW50KHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yLCBoZXhUb1JHQihwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ0VER0VfTEFCRUwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvciwgaGV4VG9SR0IocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdFREdFX0xBQkVMX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSwgYWxwaGFUb0ludChwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfRk9OVF9TSVpFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxGb250U2l6ZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH1cbn1cblxuXG5cbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZXMoZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMpIHtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBub2RlOiB7fSxcbiAgICAgICAgZWRnZToge31cbiAgICB9O1xuICAgIGlmIChkZWZhdWx0VmlzdWFsUHJvcGVydGllc1snbm9kZSddKSB7XG4gICAgICAgIGNvbnN0IG5vZGVEZWZhdWx0ID0gZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMubm9kZTtcbiAgICAgICAgY29uc3QgbG52RW50cmllcyA9IGdldExOVlZhbHVlcygnbm9kZScsIG5vZGVEZWZhdWx0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQubm9kZSwgbG52RW50cmllcyk7XG4gICAgfVxuICAgIGlmIChkZWZhdWx0VmlzdWFsUHJvcGVydGllc1snZWRnZSddKSB7XG4gICAgICAgIGNvbnN0IGVkZ2VEZWZhdWx0ID0gZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMuZWRnZTtcbiAgICAgICAgY29uc3QgbG52RW50cmllcyA9IGdldExOVlZhbHVlcygnZWRnZScsIGVkZ2VEZWZhdWx0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQuZWRnZSwgbG52RW50cmllcyk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldExOVlZhbHVlcyhlbnRpdHlUeXBlLCBlbnRyaWVzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGVudHJpZXMpLmZvckVhY2gocG9ydGFibGVQcm9wZXJ0eUtleSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGVudHJpZXNbcG9ydGFibGVQcm9wZXJ0eUtleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBsbnZFbnRyeSA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxudkVudHJ5KS5mb3JFYWNoKGxudktleSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2xudktleV0gPSBsbnZFbnRyeVtsbnZLZXldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NDb2xvcihjb2xvckFycmF5LCBhbHBoYSkge1xuICAgIHJldHVybiBjb2xvckFycmF5ICE9IHVuZGVmaW5lZFxuICAgICAgICA/IGFscGhhICE9IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBbY29sb3JBcnJheVswXSwgY29sb3JBcnJheVsxXSwgY29sb3JBcnJheVsyXSwgYWxwaGFdXG4gICAgICAgICAgICA6IFtjb2xvckFycmF5WzBdLCBjb2xvckFycmF5WzFdLCBjb2xvckFycmF5WzJdXVxuICAgICAgICA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1NpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHJldHVybiBNYXRoLm1heCh3aWR0aCwgaGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc05vZGVWaWV3KG5vZGVWaWV3KSB7XG4gICAgbGV0IHdpZHRoID0gdW5kZWZpbmVkO1xuICAgIGxldCBoZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGNvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGFscGhhID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGxhYmVsQ29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFiZWxBbHBoYSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIGlkOiBub2RlVmlldy5pZCxcbiAgICAgICAgcG9zaXRpb246IG5vZGVWaWV3LnBvc2l0aW9uXG4gICAgfTtcblxuXG4gICAgT2JqZWN0LmtleXMobm9kZVZpZXcpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlV2lkdGgpIHtcbiAgICAgICAgICAgIHdpZHRoID0gbm9kZVZpZXcucHJlcHJvY2Vzc05vZGVXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTm9kZUhlaWdodCkge1xuICAgICAgICAgICAgaGVpZ2h0ID0gbm9kZVZpZXcucHJlcHJvY2Vzc05vZGVIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yKSB7XG4gICAgICAgICAgICBjb2xvckFycmF5ID0gbm9kZVZpZXcucHJlcHJvY2Vzc0NvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NBbHBoYSkge1xuICAgICAgICAgICAgYWxwaGEgPSBub2RlVmlldy5wcmVwcm9jZXNzQWxwaGE7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IpIHtcbiAgICAgICAgICAgIGxhYmVsQ29sb3JBcnJheSA9IG5vZGVWaWV3LnByZXByb2Nlc3NMYWJlbENvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhKSB7XG4gICAgICAgICAgICBsYWJlbEFscGhhID0gbm9kZVZpZXcucHJlcHJvY2Vzc0xhYmVsQWxwaGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRwdXRba2V5XSA9IG5vZGVWaWV3W2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbG9yID0gcHJvY2Vzc0NvbG9yKGNvbG9yQXJyYXksIGFscGhhKTtcbiAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5jb2xvcl0gPSBjb2xvcjtcbiAgICB9XG5cbiAgICBjb25zdCBsYWJlbENvbG9yID0gcHJvY2Vzc0NvbG9yKGxhYmVsQ29sb3JBcnJheSwgbGFiZWxBbHBoYSk7XG4gICAgaWYgKGxhYmVsQ29sb3IpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbENvbG9yXSA9IGxhYmVsQ29sb3I7XG4gICAgfVxuXG4gICAgY29uc3Qgc2l6ZSA9IHByb2Nlc3NTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIGlmIChzaXplKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuc2l6ZV0gPSBwcm9jZXNzU2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0VkZ2VWaWV3KGVkZ2VWaWV3KSB7XG4gICAgbGV0IGNvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGFscGhhID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGxhYmVsQ29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFiZWxBbHBoYSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIGlkOiBlZGdlVmlldy5pZCxcbiAgICAgICAgczogZWRnZVZpZXcucyxcbiAgICAgICAgdDogZWRnZVZpZXcudFxuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKGVkZ2VWaWV3KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IpIHtcbiAgICAgICAgICAgIGNvbG9yQXJyYXkgPSBlZGdlVmlldy5wcmVwcm9jZXNzQ29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhKSB7XG4gICAgICAgICAgICBhbHBoYSA9IGVkZ2VWaWV3LnByZXByb2Nlc3NBbHBoYTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvcikge1xuICAgICAgICAgICAgbGFiZWxDb2xvckFycmF5ID0gZWRnZVZpZXcucHJlcHJvY2Vzc0xhYmVsQ29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEpIHtcbiAgICAgICAgICAgIGxhYmVsQWxwaGEgPSBlZGdlVmlldy5wcmVwcm9jZXNzTGFiZWxBbHBoYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dHB1dFtrZXldID0gZWRnZVZpZXdba2V5XTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29sb3IgPSBwcm9jZXNzQ29sb3IoY29sb3JBcnJheSwgYWxwaGEpO1xuICAgIGlmIChjb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmNvbG9yXSA9IGNvbG9yO1xuICAgIH1cblxuICAgIGNvbnN0IGxhYmVsQ29sb3IgPSBwcm9jZXNzQ29sb3IobGFiZWxDb2xvckFycmF5LCBsYWJlbEFscGhhKTtcbiAgICBpZiAobGFiZWxDb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsQ29sb3JdID0gbGFiZWxDb2xvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRNYXBwaW5ncyhtYXBwaW5ncykge1xuICAgIGxldCBvdXRwdXQgPSB7fVxuICAgIE9iamVjdC5rZXlzKG1hcHBpbmdzKS5mb3JFYWNoKHByb3BlcnR5S2V5ID0+IHtcbiAgICAgICAgY29uc3QgbWFwcGluZyA9IG1hcHBpbmdzW3Byb3BlcnR5S2V5XTtcbiAgICAgICAgb3V0cHV0W21hcHBpbmcuZGVmaW5pdGlvbi5hdHRyaWJ1dGVdID0ge1xuICAgICAgICAgICAgdHlwZTogbWFwcGluZy50eXBlLFxuICAgICAgICAgICAgdnA6IHByb3BlcnR5S2V5LFxuICAgICAgICAgICAgZGVmaW5pdGlvbjogbWFwcGluZy5kZWZpbml0aW9uXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZVJhdGlvKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCkge1xuICAgIHJldHVybiBhdHRyaWJ1dGVWYWx1ZSAvIChhdHRyaWJ1dGVNYXggLSBhdHRyaWJ1dGVNaW4pO1xufVxuXG5mdW5jdGlvbiBnZXRNYXAodnBNaW4sIHZwTWF4LCBhdHRyaWJ1dGVSYXRpbykge1xuICAgIHJldHVybiB2cE1pbiArICgodnBNYXggLSB2cE1pbikgKiBhdHRyaWJ1dGVSYXRpbyk7XG59XG5cbmZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgbWluKSwgbWF4KTtcbn1cblxuZnVuY3Rpb24gY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZVJhdGlvID0gZ2V0QXR0cmlidXRlUmF0aW8oYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4KTtcblxuICAgIGNvbnN0IG91dHB1dCA9IGdldE1hcCh2cE1pbiwgdnBNYXgsIGF0dHJpYnV0ZVJhdGlvKTtcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkge1xuICAgIGNvbnN0IG1pblJHQiA9IGhleFRvUkdCKHZwTWluKTtcbiAgICBjb25zdCBtYXhSR0IgPSBoZXhUb1JHQih2cE1heCk7XG5cbiAgICBjb25zdCBhdHRyaWJ1dGVSYXRpbyA9IGdldEF0dHJpYnV0ZVJhdGlvKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCk7XG5cbiAgICBjb25zdCBvdXRwdXQgPSBbXG4gICAgICAgIGNsYW1wKE1hdGgucm91bmQoZ2V0TWFwKG1pblJHQlswXSwgbWF4UkdCWzBdLCBhdHRyaWJ1dGVSYXRpbykpLCAwLCAyNTUpLFxuICAgICAgICBjbGFtcChNYXRoLnJvdW5kKGdldE1hcChtaW5SR0JbMV0sIG1heFJHQlsxXSwgYXR0cmlidXRlUmF0aW8pKSwgMCwgMjU1KSxcbiAgICAgICAgY2xhbXAoTWF0aC5yb3VuZChnZXRNYXAobWluUkdCWzJdLCBtYXhSR0JbMl0sIGF0dHJpYnV0ZVJhdGlvKSksIDAsIDI1NSlcbiAgICBdXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSB7XG4gICAgY29uc3QgYXR0cmlidXRlUmF0aW8gPSBnZXRBdHRyaWJ1dGVSYXRpbyhhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgpO1xuICAgIFxuICAgIGlmICh2cE1pbiAmJiB2cE1heCkge1xuICAgICAgICBjb25zdCBhbHBoYURlY2ltYWwgPSBnZXRNYXAodnBNaW4sIHZwTWF4LCBhdHRyaWJ1dGVSYXRpbyk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJhbHBoYURlY2ltYWwgPSBcIiArIGFscGhhRGVjaW1hbCk7XG4gICAgICAgIHJldHVybiBhbHBoYVRvSW50KGFscGhhRGVjaW1hbCk7XG4gICAgfVxufVxuXG5jb25zdCBjb250aW51b3VzUHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9XSURUSCc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVXaWR0aCwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlSGVpZ2h0LCBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NDb2xvciwgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhLCBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yLCBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEsIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsRm9udFNpemUsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy53aWR0aCwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEsIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IsIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSwgY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdFREdFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxGb250U2l6ZSwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0luUmFuZ2UoYXR0cmlidXRlVmFsdWUsIG1pbiwgbWF4LCBpbmNsdWRlTWluLCBpbmNsdWRlTWF4KSB7XG4gICAgY29uc3QgbWluU2F0aXNmaWVkID0gaW5jbHVkZU1pbiA/IG1pbiA8PSBhdHRyaWJ1dGVWYWx1ZSA6IG1pbiA8IGF0dHJpYnV0ZVZhbHVlO1xuICAgIGNvbnN0IG1heFNhdGlzZmllZCA9IGluY2x1ZGVNYXggPyBtYXggPj0gYXR0cmlidXRlVmFsdWUgOiBtYXggPiBhdHRyaWJ1dGVWYWx1ZTtcbiAgICBjb25zb2xlLmxvZygnaXNJblJhbmdlOiAnICsgYXR0cmlidXRlVmFsdWUgKyAnICcgKyBtaW4gKyAnICcgKyBtYXggKyAnICcgKyBpbmNsdWRlTWluICsgJyAnICsgaW5jbHVkZU1heCArICcgJyArIG1pblNhdGlzZmllZCArICcgJyArIG1heFNhdGlzZmllZCk7XG4gICAgcmV0dXJuIG1pblNhdGlzZmllZCAmJiBtYXhTYXRpc2ZpZWQ7XG59XG5cbmZ1bmN0aW9uIGdldE1hcHBwZWRWYWx1ZXMobWFwcGluZ3MsIGVudGl0eVR5cGUsIGF0dHJpYnV0ZXMpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChhdHRyaWJ1dGVLZXkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlS2V5XTtcbiAgICAgICAgaWYgKG1hcHBpbmdzW2VudGl0eVR5cGVdW2F0dHJpYnV0ZUtleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcHBpbmcgPSBtYXBwaW5nc1tlbnRpdHlUeXBlXVthdHRyaWJ1dGVLZXldO1xuXG4gICAgICAgICAgICBpZiAobWFwcGluZy50eXBlID09PSAnRElTQ1JFVEUnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzY3JldGVNYXAgPSBtYXBwaW5nLmRlZmluaXRpb24ubWFwO1xuICAgICAgICAgICAgICAgIGRpc2NyZXRlTWFwLmZvckVhY2goa2V5VmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5VmFsdWUudiA9PSBhdHRyaWJ1dGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKGtleVZhbHVlLnZwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgY29udmVydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXBwaW5nLnR5cGUgPT09ICdQQVNTVEhST1VHSCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKGF0dHJpYnV0ZVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIGNvbnZlcnRlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXBwaW5nLnR5cGUgPT09ICdDT05USU5VT1VTJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRpbnVvdXNNYXBwaW5ncyA9IG1hcHBpbmcuZGVmaW5pdGlvbi5tYXA7XG4gICAgICAgICAgICAgICAgY29udGludW91c01hcHBpbmdzLmZvckVhY2gobWFwcGluZ1JhbmdlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdtaW4nIGluIG1hcHBpbmdSYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgJ21heCcgaW4gbWFwcGluZ1JhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAnaW5jbHVkZU1pbicgaW4gbWFwcGluZ1JhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAnaW5jbHVkZU1heCcgaW4gbWFwcGluZ1JhbmdlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0luUmFuZ2UoYXR0cmlidXRlVmFsdWUsIG1hcHBpbmdSYW5nZS5taW4sIG1hcHBpbmdSYW5nZS5tYXgsIG1hcHBpbmdSYW5nZS5pbmNsdWRlTWluLCBtYXBwaW5nUmFuZ2UuaW5jbHVkZU1heClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBjb250aW51b3VzUHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udmVydGVkID0gY29udGludW91c1Byb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXShhdHRyaWJ1dGVWYWx1ZSwgbWFwcGluZ1JhbmdlLm1pbiwgbWFwcGluZ1JhbmdlLm1heCwgbWFwcGluZ1JhbmdlLm1pblZQVmFsdWUsIG1hcHBpbmdSYW5nZS5tYXhWUFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgY29udmVydGVkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBsbnZDb252ZXJ0KGN4KSB7XG5cbiAgICAvL0ZpcnN0IHBhc3MuIFxuICAgIC8vIFdlIG5lZWQgdG8gY29sbGVjdCBvYmplY3QgYXR0cmlidXRlcyB0byBjYWxjdWxhdGVcbiAgICAvLyBtYXBwaW5ncyBpbiB0aGUgc2Vjb25kIHBhc3MuIFxuXG4gICAgbGV0IGN4VmlzdWFsUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcbiAgICBsZXQgY3hOb2RlQnlwYXNzZXMgPSBbXTtcbiAgICBsZXQgY3hFZGdlQnlwYXNzZXMgPSBbXTtcblxuICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICBsZXQgZWRnZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICBsZXQgbm9kZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICBsZXQgZGVmYXVsdFZhbHVlcyA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbWFwcGluZ3MgPSB7XG4gICAgICAgIG5vZGU6IHt9LFxuICAgICAgICBlZGdlOiB7fVxuICAgIH1cbiAgICBsZXQgYnlwYXNzTWFwcGluZ3MgPSB7XG4gICAgICAgICdub2RlJzoge30sXG4gICAgICAgICdlZGdlJzoge31cbiAgICB9O1xuXG4gICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMgPSBjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ107XG4gICAgICAgICAgICBjeFV0aWwucHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyhjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeE5vZGVbJ3YnXSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hFZGdlWyd2J10pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICBjeFZpc3VhbFByb3BlcnRpZXMgPSBjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddO1xuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wydub2RlQnlwYXNzZXMnXSkge1xuICAgICAgICAgICAgY3hBc3BlY3Qubm9kZUJ5cGFzc2VzLmZvckVhY2goYnlwYXNzID0+IHtcbiAgICAgICAgICAgICAgICBjeE5vZGVCeXBhc3Nlcy5wdXNoKGJ5cGFzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZUJ5cGFzc2VzJ10pIHtcbiAgICAgICAgICAgIGN4QXNwZWN0LmVkZ2VCeXBhc3Nlcy5mb3JFYWNoKGJ5cGFzcyA9PiB7XG4gICAgICAgICAgICAgICAgY3hFZGdlQnlwYXNzZXMucHVzaChieXBhc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBvdXRwdXQgPSB7fTtcblxuICAgIGxldCBub2RlVmlld3MgPSBbXTtcbiAgICBsZXQgZWRnZVZpZXdzID0gW107XG5cbiAgICBjeFZpc3VhbFByb3BlcnRpZXMuZm9yRWFjaCh2cEVsZW1lbnQgPT4ge1xuXG4gICAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZXMgPSB2cEVsZW1lbnQuZGVmYXVsdDtcblxuICAgICAgICBkZWZhdWx0VmFsdWVzID0gZ2V0RGVmYXVsdFZhbHVlcyhkZWZhdWx0U3R5bGVzKTtcblxuICAgICAgICBtYXBwaW5ncy5ub2RlID0gdnBFbGVtZW50Lm5vZGVNYXBwaW5nID8gZ2V0TWFwcGluZ3ModnBFbGVtZW50Lm5vZGVNYXBwaW5nKSA6IHt9O1xuICAgICAgICBtYXBwaW5ncy5lZGdlID0gdnBFbGVtZW50LmVkZ2VNYXBwaW5nID8gZ2V0TWFwcGluZ3ModnBFbGVtZW50LmVkZ2VNYXBwaW5nKSA6IHt9O1xuXG5cbiAgICB9KTtcblxuICAgIGN4Tm9kZUJ5cGFzc2VzLmZvckVhY2goKHZwRWxlbWVudCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGtleSA9IHZwRWxlbWVudFtjeENvbnN0YW50cy5JRF0udG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gZ2V0TE5WVmFsdWVzKCdub2RlJywgdnBFbGVtZW50LnYpXG5cbiAgICAgICAgaWYgKCFieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0pIHtcbiAgICAgICAgICAgIGJ5cGFzc01hcHBpbmdzLm5vZGVba2V5XSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2J5cGFzcyBjYWxjdWxhdGVkOiAnICsgSlNPTi5zdHJpbmdpZnkodmFsdWVzLCBudWxsLCAyKSk7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0sIHZhbHVlcyk7XG4gICAgICAgIC8vYnlwYXNzQ1NTRW50cmllcy5wdXNoKGdldEJ5cGFzc0NTU0VudHJ5KCdub2RlJywgdnBFbGVtZW50KSk7XG4gICAgfSk7XG5cbiAgICBjeEVkZ2VCeXBhc3Nlcy5mb3JFYWNoKCh2cEVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gdnBFbGVtZW50W2N4Q29uc3RhbnRzLklEXS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBnZXRMTlZWYWx1ZXMoJ2VkZ2UnLCB2cEVsZW1lbnQudilcblxuICAgICAgICBpZiAoIWJ5cGFzc01hcHBpbmdzLmVkZ2Vba2V5XSkge1xuICAgICAgICAgICAgYnlwYXNzTWFwcGluZ3MuZWRnZVtrZXldID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZygnYnlwYXNzIGNhbGN1bGF0ZWQ6ICcgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZXMsIG51bGwsIDIpKTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKGJ5cGFzc01hcHBpbmdzLmVkZ2Vba2V5XSwgdmFsdWVzKTtcbiAgICB9XG4gICAgKTtcblxuICAgIGNvbnNvbGUubG9nKCdtYXBwaW5nczogJyArIEpTT04uc3RyaW5naWZ5KG1hcHBpbmdzLCBudWxsLCAyKSk7XG5cbiAgICAvL1NlY29uZCBwYXNzLiBcbiAgICAvLyBIZXJlIGlzIHdoZXJlIHRoZSBhY3R1YWwgb3V0cHV0IGlzIGdlbmVyYXRlZC5cblxuICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuXG5cbiAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hJZCA9IGN4Tm9kZVtjeENvbnN0YW50cy5JRF0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZVZpZXcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBjeElkLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogY3hOb2RlWyd6J10gP1xuICAgICAgICAgICAgICAgICAgICAgICAgW2N4Tm9kZVsneCddLCBjeE5vZGVbJ3knXSwgY3hOb2RlWyd6J11dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFtjeE5vZGVbJ3gnXSwgY3hOb2RlWyd5J11dXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9UT0RPIGNhbGN1bGF0ZSBsbnYgdnBzIGJhc2VkIG9uIGRlZmF1bHRzIGFuZCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdE5vZGVWaXN1YWxQcm9wZXJ0aWVzID0gZGVmYXVsdFZhbHVlc1snbm9kZSddO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG5vZGVWaWV3LCBkZWZhdWx0Tm9kZVZpc3VhbFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0Fzc2lnbiBtYXBwaW5nc1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkQXR0cmlidXRlcyA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hOb2RlWyd2J10sIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBwaW5nVmFsdWVzID0gZ2V0TWFwcHBlZFZhbHVlcyhtYXBwaW5ncywgJ25vZGUnLCBleHBhbmRlZEF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obm9kZVZpZXcsIG1hcHBpbmdWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgLy9Bc3NpZ24gYnlwYXNzXG4gICAgICAgICAgICAgICAgaWYgKGJ5cGFzc01hcHBpbmdzLm5vZGVbY3hJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlVmlldywgYnlwYXNzTWFwcGluZ3Mubm9kZVtjeElkXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkTm9kZVZpZXcgPSBwcm9jZXNzTm9kZVZpZXcobm9kZVZpZXcpO1xuXG4gICAgICAgICAgICAgICAgbm9kZVZpZXdzLnB1c2gocHJvY2Vzc2VkTm9kZVZpZXcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuXG4gICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeEVkZ2VbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRnZVZpZXcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBjeElkLFxuICAgICAgICAgICAgICAgICAgICBzOiBjeEVkZ2Uucy50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICB0OiBjeEVkZ2UudC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9UT0RPIGNhbGN1bGF0ZSBsbnYgdnBzIGJhc2VkIG9uIGRlZmF1bHRzIGFuZCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdEVkZ2VWaXN1YWxQcm9wZXJ0aWVzID0gZGVmYXVsdFZhbHVlc1snZWRnZSddO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBkZWZhdWx0RWRnZVZpc3VhbFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkQXR0cmlidXRlcyA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hFZGdlWyd2J10sIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBwaW5nVmFsdWVzID0gZ2V0TWFwcHBlZFZhbHVlcyhtYXBwaW5ncywgJ25vZGUnLCBleHBhbmRlZEF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWRnZVZpZXcsIG1hcHBpbmdWYWx1ZXMpO1xuICAgICAgICAgICAgICAgIC8vQXNzaWduIGJ5cGFzc1xuICAgICAgICAgICAgICAgIGlmIChieXBhc3NNYXBwaW5ncy5lZGdlW2N4SWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWRnZVZpZXcsIGJ5cGFzc01hcHBpbmdzLmVkZ2VbY3hJZF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEVkZ2VWaWV3ID0gcHJvY2Vzc0VkZ2VWaWV3KGVkZ2VWaWV3KTtcblxuICAgICAgICAgICAgICAgIGVkZ2VWaWV3cy5wdXNoKHByb2Nlc3NlZEVkZ2VWaWV3KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLm5vZGVWaWV3c10gPSBub2RlVmlld3M7XG4gICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5lZGdlVmlld3NdID0gZWRnZVZpZXdzO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgY29udmVydGVyID0ge1xuICAgIHRhcmdldEZvcm1hdDogJ2xudicsXG4gICAgY29udmVydDogKGN4KSA9PiB7XG4gICAgICAgIHJldHVybiBsbnZDb252ZXJ0KGN4KTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQ6IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQsXG4gICAgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydDogY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydCxcbiAgICBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQ6IGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydCxcbiAgICBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQ6IGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydCxcbiAgICBwcm9jZXNzTm9kZVZpZXc6IHByb2Nlc3NOb2RlVmlldyxcbiAgICBwcm9jZXNzRWRnZVZpZXc6IHByb2Nlc3NFZGdlVmlldyxcbiAgICBnZXREZWZhdWx0VmFsdWVzOiBnZXREZWZhdWx0VmFsdWVzLFxuICAgIGlzSW5SYW5nZTogaXNJblJhbmdlLFxuICAgIGNvbnZlcnRlcjogY29udmVydGVyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrLmpzIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgICdub2RlVmlld3MnOiAnbm9kZVZpZXdzJyxcbiAgICAnZWRnZVZpZXdzJzogJ2VkZ2VWaWV3cycsIFxuICAgICdpZCc6ICdpZCcsXG4gICAgJ3Bvc2l0aW9uJzogJ3Bvc2l0aW9uJyxcbiAgICAncyc6ICdzJyxcbiAgICAndCc6ICd0JyxcbiAgICAnbGFiZWwnOiAnbGFiZWwnLCBcbiAgICAnbGFiZWxDb2xvcicgOiAnbGFiZWxDb2xvcicsXG4gICAgJ2xhYmVsRm9udFNpemUnIDogJ2xhYmVsRm9udFNpemUnLFxuICAgICdjb2xvcic6ICdjb2xvcicsXG4gICAgJ3NpemUnIDogJ3NpemUnLFxuICAgICd3aWR0aCcgOiAnd2lkdGgnLFxuXG4gICAgJ3ByZXByb2Nlc3NDb2xvcic6ICdwcmVwcm9jZXNzQ29sb3InLFxuICAgICdwcmVwcm9jZXNzQWxwaGEnOiAncHJlcHJvY2Vzc0FscGhhJyxcbiAgICAncHJlcHJvY2Vzc0xhYmVsQ29sb3InOiAncHJlcHJvY2Vzc0xhYmVsQ29sb3InLFxuICAgICdwcmVwcm9jZXNzTGFiZWxBbHBoYSc6ICdwcmVwcm9jZXNzTGFiZWxBbHBoYScsXG4gICAgJ3ByZXByb2Nlc3NOb2RlV2lkdGgnIDogJ3ByZXByb2Nlc3NOb2RlV2lkdGgnLFxuICAgICdwcmVwcm9jZXNzTm9kZUhlaWdodCcgOiAncHJlcHJvY2Vzc05vZGVIZWlnaHQnXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuLi9jeENvbnN0YW50cy5qcycpO1xuY29uc3QganNDb25zdGFudHMgPSByZXF1aXJlKCcuL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSkge1xuICAgIGNvbnN0IHRhcmdldFN0eWxlRW50cnkgPSBuZXcgTWFwKCk7XG4gICAgdGFyZ2V0U3R5bGVFbnRyeS5zZXQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpO1xuICAgIHJldHVybiB0YXJnZXRTdHlsZUVudHJ5O1xufVxuXG5jb25zdCBkZWZhdWx0UHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9TSEFQRSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuc2hhcGUsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUxfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUxfRk9OVF9TSVpFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLm9wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGluZV9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfRk9OVF9TSVpFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9LFxufVxuXG5mdW5jdGlvbiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIGF0dHJpYnV0ZU5hbWUpIHtcbiAgICBjb25zdCBvdXRwdXQgPSB7fTtcbiAgICBvdXRwdXRbdGFyZ2V0U3R5bGVGaWVsZF0gPSAnZGF0YSgnICsgYXR0cmlidXRlTmFtZSArICcpJztcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9TSEFQRSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfV0lEVEgnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgYXR0cmlidXRlTmFtZSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLm9wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGluZV9jb2xvciwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xBQkVMJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIGF0dHJpYnV0ZU5hbWUpXG4gICAgfSxcbn1cbmZ1bmN0aW9uIHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgb3V0cHV0W3RhcmdldFN0eWxlRmllbGRdID0gJ21hcERhdGEoJyArIGF0dHJpYnV0ZU5hbWVcbiAgICAgICAgKyAnLCAnICsgbWluVmFsdWVcbiAgICAgICAgKyAnLCAnICsgbWF4VmFsdWVcbiAgICAgICAgKyAnLCAnICsgbWluVlBcbiAgICAgICAgKyAnLCAnICsgbWF4VlBcbiAgICAgICAgKyAnKSc7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgbWFwRGF0YVByb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfU0hBUEUnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuc2hhcGUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfV0lEVEgnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9MQUJFTCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9MQUJFTF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApXG5cbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLm9wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xBQkVMJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUClcbiAgICB9LFxufVxuXG5cbmZ1bmN0aW9uIGdldENTU1N0eWxlRW50cmllcyhjeFN0eWxlRW50cmllcywgZW50aXR5VHlwZSkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhjeFN0eWxlRW50cmllcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGN4U3R5bGVFbnRyaWVzW2tleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW2tleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGNzc0VudHJpZXMgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW2tleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIGNzc0VudHJpZXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIG91dHB1dFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldElkU2VsZWN0b3IoaWQsIGVsZW1lbnRUeXBlKSB7XG4gICAgLy9ub2RlI2lkIG9yIGVkZ2UjaWRcbiAgICByZXR1cm4gZWxlbWVudFR5cGUgKyAnIycgKyBpZDtcbn1cblxuXG5cbmZ1bmN0aW9uIGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKSB7XG4gICAgcmV0dXJuIHsgJ3NlbGVjdG9yJzogc2VsZWN0b3IsICdzdHlsZSc6IGNzcyB9O1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBpbmNsdWRlTWluLCBpbmNsdWRlTWF4KSB7XG4gICAgY29uc3QgbWluQ29uZGl0aW9uID0gaW5jbHVkZU1pbiA/ICc+PScgOiAnPic7XG4gICAgY29uc3QgbWF4Q29uZGl0aW9uID0gaW5jbHVkZU1heCA/ICc8PScgOiAnPCc7XG4gICAgY29uc3QgbWluQm91bmQgPSBtaW5WYWx1ZSA/ICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnICcgKyBtaW5Db25kaXRpb24gKyAnICcgKyBtaW5WYWx1ZSArICddJyA6ICcnO1xuICAgIGNvbnN0IG1heEJvdW5kID0gbWF4VmFsdWUgPyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyAnICsgbWF4Q29uZGl0aW9uICsgJyAnICsgbWF4VmFsdWUgKyAnXScgOiAnJztcbiAgICByZXR1cm4gZW50aXR5VHlwZSArIG1pbkJvdW5kICsgbWF4Qm91bmQ7XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNTdHlsZShlbnRpdHlUeXBlLCBwb3J0YWJsZVByb3BlcnR5S2V5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBpZiAobWFwRGF0YVByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICByZXR1cm4gbWFwRGF0YVByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cmllcyhwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydhdHRyaWJ1dGUnXTtcbiAgICBjb25zdCByYW5nZU1hcHMgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydtYXAnXTtcbiAgICBjb25zb2xlLmxvZygnY29udGludW91cyBtYXBwaW5nIGZvciAnICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBKU09OLnN0cmluZ2lmeShyYW5nZU1hcHMsIG51bGwsIDIpKTtcblxuICAgIHJhbmdlTWFwcy5mb3JFYWNoKChyYW5nZSkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGdldENvbnRpbnVvdXNTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCByYW5nZS5taW4sIHJhbmdlLm1heCwgcmFuZ2UuaW5jbHVkZU1pbiwgcmFuZ2UuaW5jbHVkZU1heCk7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29udGludW91c1N0eWxlKGVudGl0eVR5cGUsIHBvcnRhYmxlUHJvcGVydHlLZXksIGF0dHJpYnV0ZU5hbWUsIHJhbmdlLm1pbiwgcmFuZ2UubWF4LCByYW5nZS5taW5WUFZhbHVlLCByYW5nZS5tYXhWUFZhbHVlKTtcblxuICAgICAgICBvdXRwdXQucHVzaChnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIHN0eWxlKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSkge1xuICAgIGlmIChwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgIGNvbnN0IGNzcyA9IHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oY3hNYXBwaW5nRGVmaW5pdGlvbi5hdHRyaWJ1dGUpO1xuICAgICAgICByZXR1cm4gZ2V0U3R5bGVFbGVtZW50KGVudGl0eVR5cGUsIGNzcyk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXREaXNjcmV0ZVNlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURhdGFUeXBlLCBhdHRyaWJ1dGVWYWx1ZSkge1xuICAgIGlmIChhdHRyaWJ1dGVEYXRhVHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gXFwnJyArIGF0dHJpYnV0ZVZhbHVlICsgJ1xcJ10nO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ2Jvb2xlYW4nKSB7XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZVZhbHVlID09ICd0cnVlJykge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWz8nICsgYXR0cmlidXRlTmFtZSArICddJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICddWyEnICsgYXR0cmlidXRlTmFtZSArICddJztcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICcgPSAnICsgYXR0cmlidXRlVmFsdWUgKyAnXSc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzKHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgY29uc3QgYXR0dHJpYnV0ZVRvVmFsdWVNYXAgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydtYXAnXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnYXR0cmlidXRlJ107XG4gICAgY29uc3QgYXR0cmlidXRlRGF0YVR5cGUgPSBhdHRyaWJ1dGVUeXBlTWFwLmdldChhdHRyaWJ1dGVOYW1lKTtcbiAgICBhdHR0cmlidXRlVG9WYWx1ZU1hcC5mb3JFYWNoKChkaXNjcmV0ZU1hcCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnIGRpc2NyZXRlIG1hcCBmb3IgJyArIHBvcnRhYmxlUHJvcGVydHlLZXkgKyAnOiAnICsgZGlzY3JldGVNYXAudiArICcgKCcgKyBhdHRyaWJ1dGVOYW1lICsgJzwnICsgYXR0cmlidXRlRGF0YVR5cGUgKyAnPikgLT4gJyArIGRpc2NyZXRlTWFwLnZwKTtcblxuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGdldERpc2NyZXRlU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGF0YVR5cGUsIGRpc2NyZXRlTWFwLnYpO1xuXG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZU1hcCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oZGlzY3JldGVNYXAudnApO1xuICAgICAgICAgICAgY29uc3QgY3NzID0ge307XG4gICAgICAgICAgICBzdHlsZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY3NzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyAgIHN0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkoY3NzKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIG91dHB1dDsgLy9nZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcyk7XG59XG5cbmZ1bmN0aW9uIGdldEJ5cGFzc0NTU0VudHJ5KGVudGl0eVR5cGUsIGN4RWxlbWVudCkge1xuXG4gICAgY29uc3QgaWQgPSBjeEVsZW1lbnQuaWQ7XG4gICAgY29uc3QgY3NzID0ge307XG4gICAgT2JqZWN0LmtleXMoY3hFbGVtZW50LnYpLmZvckVhY2goKHBvcnRhYmxlUHJvcGVydHlLZXkpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gY3hFbGVtZW50LnZbcG9ydGFibGVQcm9wZXJ0eUtleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZU1hcCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIHN0eWxlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBjc3Nba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0SWRTZWxlY3RvcihpZCwgZW50aXR5VHlwZSk7XG4gICAgcmV0dXJuIGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKTtcbn1cblxuLyoqIFxuICogXG4qL1xuZnVuY3Rpb24gZ2V0Q1NTTWFwcGluZ0VudHJpZXMoXG4gICAgY3hNYXBwaW5nRW50cmllcyxcbiAgICBlbnRpdHlUeXBlLFxuICAgIGF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgT2JqZWN0LmtleXMoY3hNYXBwaW5nRW50cmllcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IGN4TWFwcGluZ0VudHJ5ID0gY3hNYXBwaW5nRW50cmllc1trZXldO1xuICAgICAgICBjb25zb2xlLmxvZyhcIiBtYXBwaW5nIHR5cGU6IFwiICsgY3hNYXBwaW5nRW50cnkudHlwZSk7XG4gICAgICAgIHN3aXRjaCAoY3hNYXBwaW5nRW50cnkudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnQ09OVElOVU9VUyc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250aW5vdXNNYXBwaW5ncyA9IGdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cmllcyhrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApO1xuICAgICAgICAgICAgICAgIGNvbnRpbm91c01hcHBpbmdzLmZvckVhY2goKGNvbnRpbm91c01hcHBpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goY29udGlub3VzTWFwcGluZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ1BBU1NUSFJPVUdIJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNzc0VudHJ5ID0gZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlKTtcbiAgICAgICAgICAgICAgICBpZiAoY3NzRW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goY3NzRW50cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ0RJU0NSRVRFJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlTWFwcGluZ3MgPSBnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzKGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCk7XG4gICAgICAgICAgICAgICAgZGlzY3JldGVNYXBwaW5ncy5mb3JFYWNoKChkaXNjcmV0ZU1hcHBpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goZGlzY3JldGVNYXBwaW5nKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgTk9ERV9TRUxFQ1RPUiA9ICdub2RlJztcbmNvbnN0IEVER0VfU0VMRUNUT1IgPSAnZWRnZSc7XG5cbmZ1bmN0aW9uIGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBjeE5vZGVCeXBhc3NlcywgY3hFZGdlQnlwYXNzZXMsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICBsZXQgZGVmYXVsdENTU05vZGVTdHlsZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgZGVmYXVsdENTU0VkZ2VTdHlsZSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IG1hcHBpbmdDU1NOb2RlU3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG1hcHBpbmdDU1NFZGdlU3R5bGUgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgYnlwYXNzQ1NTRW50cmllcyA9IFtdO1xuXG4gICAgY3hWaXN1YWxQcm9wZXJ0aWVzLmZvckVhY2goKHZwRWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCBkZWZhdWx0U3R5bGVzID0gdnBFbGVtZW50LmRlZmF1bHQ7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2RlZmF1bHQgc3R5bGU6ICcgKyBKU09OLnN0cmluZ2lmeShkZWZhdWx0U3R5bGVzKSk7XG4gICAgICAgIGRlZmF1bHRDU1NOb2RlU3R5bGUgPSBnZXRDU1NTdHlsZUVudHJpZXMoZGVmYXVsdFN0eWxlcy5ub2RlLCAnbm9kZScpO1xuICAgICAgICBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gZ2V0Q1NTU3R5bGVFbnRyaWVzKGRlZmF1bHRTdHlsZXMuZWRnZSwgJ2VkZ2UnKTtcblxuICAgICAgICBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gZGVmYXVsdFN0eWxlcy5uZXR3b3JrWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgY29uc3Qgbm9kZU1hcHBpbmcgPSB2cEVsZW1lbnQubm9kZU1hcHBpbmc7XG4gICAgICAgIG1hcHBpbmdDU1NOb2RlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhub2RlTWFwcGluZywgJ25vZGUnLCBub2RlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgY29uc3QgZWRnZU1hcHBpbmcgPSB2cEVsZW1lbnQuZWRnZU1hcHBpbmc7XG4gICAgICAgIG1hcHBpbmdDU1NFZGdlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhlZGdlTWFwcGluZywgJ2VkZ2UnLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICB9KVxuXG4gICAgY3hOb2RlQnlwYXNzZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGJ5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnbm9kZScsIHZwRWxlbWVudCkpO1xuICAgIH0pO1xuXG4gICAgY3hFZGdlQnlwYXNzZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGJ5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnZWRnZScsIHZwRWxlbWVudCkpO1xuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coJ2RlZmF1bHQgbm9kZSBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGRlZmF1bHRDU1NOb2RlU3R5bGUpKTtcblxuICAgIC8vQWRkIGRlZmF1bHQgc3R5bGVcbiAgICBvdXRwdXQuc3R5bGUucHVzaChnZXRTdHlsZUVsZW1lbnQoTk9ERV9TRUxFQ1RPUiwgZGVmYXVsdENTU05vZGVTdHlsZSkpO1xuICAgIG91dHB1dC5zdHlsZS5wdXNoKGdldFN0eWxlRWxlbWVudChFREdFX1NFTEVDVE9SLCBkZWZhdWx0Q1NTRWRnZVN0eWxlKSk7XG5cbiAgICBvdXRwdXQuc3R5bGUucHVzaC5hcHBseShvdXRwdXQuc3R5bGUsIG1hcHBpbmdDU1NOb2RlU3R5bGUpO1xuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgbWFwcGluZ0NTU0VkZ2VTdHlsZSk7XG5cbiAgICBvdXRwdXQuc3R5bGUucHVzaC5hcHBseShvdXRwdXQuc3R5bGUsIGJ5cGFzc0NTU0VudHJpZXMpO1xuXG4gICAgb3V0cHV0WydiYWNrZ3JvdW5kLWNvbG9yJ10gPSBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgY29udmVydGVyID0ge1xuICAgIHRhcmdldEZvcm1hdDogJ2N5dG9zY2FwZUpTJyxcbiAgICBjb252ZXJ0OiAoY3gpID0+IHtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0ge1xuICAgICAgICAgICAgc3R5bGU6IFtdLFxuICAgICAgICAgICAgZWxlbWVudHM6IHt9LFxuICAgICAgICAgICAgbGF5b3V0OiB7fSxcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN4VmlzdWFsUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGN4Tm9kZUJ5cGFzc2VzID0gW107XG4gICAgICAgIGxldCBjeEVkZ2VCeXBhc3NlcyA9IFtdO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgICAgICAgICAgICAgY3hVdGlsLnByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeE5vZGVbJ3YnXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuICAgICAgICAgICAgICAgIGN4RWRnZXMuZm9yRWFjaCgoY3hFZGdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hFZGdlWyd2J10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVCeXBhc3NlcyddKSB7XG4gICAgICAgICAgICAgICAgY3hBc3BlY3Qubm9kZUJ5cGFzc2VzLmZvckVhY2goYnlwYXNzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hOb2RlQnlwYXNzZXMucHVzaChieXBhc3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZUJ5cGFzc2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjeEFzcGVjdC5lZGdlQnlwYXNzZXMuZm9yRWFjaChieXBhc3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjeEVkZ2VCeXBhc3Nlcy5wdXNoKGJ5cGFzcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLmZvckVhY2goKGluZmVycmVkVHlwZSwgYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZmVycmVkIGF0dHJpYnV0ZSB0eXBlIGZvciBub2RlOiAnICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcC5mb3JFYWNoKChpbmZlcnJlZFR5cGUsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3IgZWRnZTogJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9BZGQgbm9kZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydub2RlcyddID0gW107XG5cbiAgICAgICAgLy9BZGQgZWRnZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydlZGdlcyddID0gW107XG5cblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuICAgICAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddID0gY3hVdGlsLmdldEV4cGFuZGVkQXR0cmlidXRlcyhjeE5vZGVbJ3YnXSwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ2lkJ10gPSBjeE5vZGUuaWQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsncG9zaXRpb24nXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGN4Tm9kZVsneCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogY3hOb2RlWyd5J11cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMubm9kZXMucHVzaChlbGVtZW50KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcbiAgICAgICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hFZGdlWyd2J10sIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydpZCddID0gY3hFZGdlLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnc291cmNlJ10gPSBjeEVkZ2VbJ3MnXTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWyd0YXJnZXQnXSA9IGN4RWRnZVsndCddO1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMuZWRnZXMucHVzaChlbGVtZW50KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzdHlsZSA9IGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBjeE5vZGVCeXBhc3NlcywgY3hFZGdlQnlwYXNzZXMsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgb3V0cHV0LnN0eWxlID0gc3R5bGUuc3R5bGU7XG4gICAgICAgIGNvbnNvbGUubG9nKCd2aXN1YWxQcm9wZXJ0aWVzOiAnICsgSlNPTi5zdHJpbmdpZnkoY3hWaXN1YWxQcm9wZXJ0aWVzLCBudWxsLCAyKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KG91dHB1dC5zdHlsZSwgbnVsbCwgMikpO1xuXG4gICAgICAgIG91dHB1dFsnYmFja2dyb3VuZC1jb2xvciddID0gc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXTtcblxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydGVyOiBjb252ZXJ0ZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTLmpzIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgICdzaGFwZSc6ICdzaGFwZScsXG4gICAgJ3dpZHRoJzogJ3dpZHRoJywgXG4gICAgJ2hlaWdodCc6ICdoZWlnaHQnLFxuICAgICdiYWNrZ3JvdW5kX2NvbG9yJzogJ2JhY2tncm91bmQtY29sb3InLFxuICAgICdiYWNrZ3JvdW5kX29wYWNpdHknOiAnYmFja2dyb3VuZC1vcGFjaXR5JyxcbiAgICAnbGFiZWwnOiAnbGFiZWwnLFxuICAgICdsYWJlbF9jb2xvcic6ICdjb2xvcicsXG4gICAgJ2xhYmVsX2ZvbnRfc2l6ZScgOiAnZm9udC1zaXplJyxcbiAgICAnbGFiZWxfb3BhY2l0eScgOiAndGV4dC1vcGFjaXR5JyxcbiAgICAnb3BhY2l0eSc6ICdvcGFjaXR5JyxcbiAgICAnbGluZV9jb2xvcic6ICdsaW5lLWNvbG9yJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==