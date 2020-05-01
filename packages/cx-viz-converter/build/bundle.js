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

function getVpRange(vpMin, vpMax) {
    return vpMax - vpMin;
}

function getMap(vpMin, vpRange, attributeRatio) {
    return vpMin + vpRange * attributeRatio;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function continuousNumberPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
    var attributeRatio = getAttributeRatio(attributeValue, attributeMin, attributeMax);
    var vpRange = getVpRange(vpMin, vpMax);

    var output = getMap(vpMin, vpRange, attributeRatio);

    return output;
}

function continuousColorPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
    var minRGB = hexToRGB(vpMin);
    var maxRGB = hexToRGB(vpMax);

    var attributeRatio = getAttributeRatio(attributeValue, attributeMin, attributeMax);

    var rRange = getVpRange(minRGB[0], maxRGB[1]);
    var gRange = getVpRange(minRGB[1], maxRGB[1]);
    var bRange = getVpRange(minRGB[2], maxRGB[2]);

    var output = [clamp(Math.round(getMap(minRGB[0], rRange, attributeRatio)), 0, 255), clamp(Math.round(getMap(minRGB[1], gRange, attributeRatio)), 0, 255), clamp(Math.round(getMap(minRGB[2], bRange, attributeRatio)), 0, 255)];
    return output;
}

function continuousAlphaPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
    var attributeRatio = getAttributeRatio(attributeValue, attributeMin, attributeMax);
    var vpRange = getVpRange(vpMin, vpMax);

    var alphaDecimal = getMap(vpMin, vpRange, attributeRatio);

    console.log("alphaDecimal = " + alphaDecimal);

    return alphaToInt(alphaDecimal);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjNjMzMjFmOTY1MDg4YzdiYjI3MCIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsIlBPIiwiZ2V0Q3hWZXJzaW9uIiwidmVyc2lvblN0cmluZyIsInZlcnNpb25BcnJheSIsInNwbGl0IiwibWFwIiwibnVtYmVyU3RyaW5nIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXNOYU4iLCJlbGVtZW50IiwiZ2V0Q3hNYWpvclZlcnNpb24iLCJwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVBdHRyaWJ1dGVUeXBlTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwiZWRnZUF0dHJpYnV0ZVR5cGVNYXAiLCJlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjeEF0dHJpYnV0ZURlY2xhcmF0aW9uIiwidXBkYXRlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVzIiwidXBkYXRlQXR0cmlidXRlVHlwZU1hcCIsInVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VzIiwiYXR0cmlidXRlVHlwZU1hcCIsImF0dHJpYnV0ZURlY2xhcmF0aW9ucyIsImtleXMiLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlRGVjbGFyYXRpb24iLCJzZXQiLCJkIiwiYXR0cmlidXRlTmFtZU1hcCIsImEiLCJhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJ2IiwidXBkYXRlSW5mZXJyZWRUeXBlcyIsImtleSIsImhhcyIsInZhbHVlIiwiaW5mZXJyZWRUeXBlIiwibmV3S2V5IiwiZ2V0IiwiZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzIiwiZGF0YSIsImNvbnZlcnRlciIsInJlcXVpcmUiLCJjb252ZXJ0IiwiY3giLCJ0YXJnZXRGb3JtYXQiLCJjeENvbnN0YW50cyIsImxhcmdlTmV0d29yayIsImN5dG9zY2FwZUpTIiwiY3hVdGlsIiwidmVyaWZ5VmVyc2lvbiIsImZpcnN0RWxlbWVudCIsIm1ham9yVmVyc2lvbiIsImRlZmF1bHRDb252ZXJ0ZXJzIiwiY29udmVydGVycyIsInNlbGVjdGVkQ29udmVydGVyIiwidW5kZWZpbmVkIiwibGFyZ2VOZXR3b3JrQ29uc3RhbnRzIiwic2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCIsInRhcmdldFN0eWxlRmllbGQiLCJwb3J0YWJsZVByb3BlcnRWYWx1ZSIsInRhcmdldFN0eWxlRW50cnkiLCJoZXhUb1JHQiIsImhleCIsInIiLCJnIiwiYiIsImFscGhhVG9JbnQiLCJhbHBoYURlY2ltYWwiLCJjbGFtcCIsIk1hdGgiLCJyb3VuZCIsImRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJwb3J0YWJsZVByb3BlcnR5VmFsdWUiLCJwcmVwcm9jZXNzTm9kZVdpZHRoIiwicHJlcHJvY2Vzc05vZGVIZWlnaHQiLCJwcmVwcm9jZXNzQ29sb3IiLCJwcmVwcm9jZXNzQWxwaGEiLCJsYWJlbCIsInByZXByb2Nlc3NMYWJlbENvbG9yIiwicHJlcHJvY2Vzc0xhYmVsQWxwaGEiLCJsYWJlbEZvbnRTaXplIiwid2lkdGgiLCJnZXREZWZhdWx0VmFsdWVzIiwiZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMiLCJvdXRwdXQiLCJub2RlIiwiZWRnZSIsIm5vZGVEZWZhdWx0IiwibG52RW50cmllcyIsImdldExOVlZhbHVlcyIsImFzc2lnbiIsImVkZ2VEZWZhdWx0IiwiZW50aXR5VHlwZSIsImVudHJpZXMiLCJwb3J0YWJsZVByb3BlcnR5S2V5IiwibG52RW50cnkiLCJsbnZLZXkiLCJwcm9jZXNzQ29sb3IiLCJjb2xvckFycmF5IiwiYWxwaGEiLCJwcm9jZXNzU2l6ZSIsImhlaWdodCIsIm1heCIsInByb2Nlc3NOb2RlVmlldyIsIm5vZGVWaWV3IiwibGFiZWxDb2xvckFycmF5IiwibGFiZWxBbHBoYSIsImlkIiwicG9zaXRpb24iLCJjb2xvciIsImxhYmVsQ29sb3IiLCJzaXplIiwicHJvY2Vzc0VkZ2VWaWV3IiwiZWRnZVZpZXciLCJzIiwidCIsImdldE1hcHBpbmdzIiwibWFwcGluZ3MiLCJtYXBwaW5nIiwicHJvcGVydHlLZXkiLCJkZWZpbml0aW9uIiwiYXR0cmlidXRlIiwidHlwZSIsInZwIiwiZ2V0QXR0cmlidXRlUmF0aW8iLCJhdHRyaWJ1dGVWYWx1ZSIsImF0dHJpYnV0ZU1pbiIsImF0dHJpYnV0ZU1heCIsImdldFZwUmFuZ2UiLCJ2cE1pbiIsInZwTWF4IiwiZ2V0TWFwIiwidnBSYW5nZSIsImF0dHJpYnV0ZVJhdGlvIiwibWluIiwiY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydCIsImNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydCIsIm1pblJHQiIsIm1heFJHQiIsInJSYW5nZSIsImdSYW5nZSIsImJSYW5nZSIsImNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydCIsImNvbnRpbnVvdXNQcm9wZXJ0eUNvbnZlcnQiLCJpc0luUmFuZ2UiLCJpbmNsdWRlTWluIiwiaW5jbHVkZU1heCIsIm1pblNhdGlzZmllZCIsIm1heFNhdGlzZmllZCIsImdldE1hcHBwZWRWYWx1ZXMiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlS2V5IiwiZGlzY3JldGVNYXAiLCJrZXlWYWx1ZSIsImNvbnZlcnRlZCIsImNvbnRpbnVvdXNNYXBwaW5ncyIsIm1hcHBpbmdSYW5nZSIsIm1pblZQVmFsdWUiLCJtYXhWUFZhbHVlIiwibG52Q29udmVydCIsImN4VmlzdWFsUHJvcGVydGllcyIsImN4Tm9kZUJ5cGFzc2VzIiwiY3hFZGdlQnlwYXNzZXMiLCJNYXAiLCJkZWZhdWx0VmFsdWVzIiwiYnlwYXNzTWFwcGluZ3MiLCJjeEFzcGVjdCIsImN4Tm9kZXMiLCJjeE5vZGUiLCJjeEVkZ2VzIiwiY3hFZGdlIiwibm9kZUJ5cGFzc2VzIiwicHVzaCIsImJ5cGFzcyIsImVkZ2VCeXBhc3NlcyIsIm5vZGVWaWV3cyIsImVkZ2VWaWV3cyIsImRlZmF1bHRTdHlsZXMiLCJ2cEVsZW1lbnQiLCJkZWZhdWx0Iiwibm9kZU1hcHBpbmciLCJlZGdlTWFwcGluZyIsInRvU3RyaW5nIiwidmFsdWVzIiwiY3hJZCIsImRlZmF1bHROb2RlVmlzdWFsUHJvcGVydGllcyIsImV4cGFuZGVkQXR0cmlidXRlcyIsIm1hcHBpbmdWYWx1ZXMiLCJwcm9jZXNzZWROb2RlVmlldyIsImRlZmF1bHRFZGdlVmlzdWFsUHJvcGVydGllcyIsInByb2Nlc3NlZEVkZ2VWaWV3IiwianNDb25zdGFudHMiLCJzaGFwZSIsImJhY2tncm91bmRfY29sb3IiLCJiYWNrZ3JvdW5kX29wYWNpdHkiLCJsYWJlbF9jb2xvciIsImxhYmVsX29wYWNpdHkiLCJsYWJlbF9mb250X3NpemUiLCJvcGFjaXR5IiwibGluZV9jb2xvciIsInNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0Iiwic2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydCIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJtaW5WUCIsIm1heFZQIiwibWFwRGF0YVByb3BlcnR5Q29udmVydCIsImdldENTU1N0eWxlRW50cmllcyIsImN4U3R5bGVFbnRyaWVzIiwiY3NzRW50cmllcyIsImdldElkU2VsZWN0b3IiLCJlbGVtZW50VHlwZSIsImdldFN0eWxlRWxlbWVudCIsInNlbGVjdG9yIiwiY3NzIiwiZ2V0Q29udGludW91c1NlbGVjdG9yIiwibWluQ29uZGl0aW9uIiwibWF4Q29uZGl0aW9uIiwiZ2V0Q29udGludW91c1N0eWxlIiwiZ2V0Q29udGludW91c01hcHBpbmdDU1NFbnRyaWVzIiwiY3hNYXBwaW5nRGVmaW5pdGlvbiIsInJhbmdlTWFwcyIsInJhbmdlIiwic3R5bGUiLCJnZXRQYXNzdGhyb3VnaE1hcHBpbmdDU1NFbnRyeSIsImdldERpc2NyZXRlU2VsZWN0b3IiLCJhdHRyaWJ1dGVEYXRhVHlwZSIsImdldERpc2NyZXRlTWFwcGluZ0NTU0VudHJpZXMiLCJhdHR0cmlidXRlVG9WYWx1ZU1hcCIsInN0eWxlTWFwIiwiZ2V0QnlwYXNzQ1NTRW50cnkiLCJjeEVsZW1lbnQiLCJnZXRDU1NNYXBwaW5nRW50cmllcyIsImN4TWFwcGluZ0VudHJpZXMiLCJjeE1hcHBpbmdFbnRyeSIsImNvbnRpbm91c01hcHBpbmdzIiwiY29udGlub3VzTWFwcGluZyIsImNzc0VudHJ5IiwiZGlzY3JldGVNYXBwaW5ncyIsImRpc2NyZXRlTWFwcGluZyIsIk5PREVfU0VMRUNUT1IiLCJFREdFX1NFTEVDVE9SIiwiZ2V0VmlzdWFsUHJvcGVydGllcyIsImRlZmF1bHRDU1NOb2RlU3R5bGUiLCJkZWZhdWx0Q1NTRWRnZVN0eWxlIiwiY3NzTmV0d29ya0JhY2tncm91bmRDb2xvciIsIm1hcHBpbmdDU1NOb2RlU3R5bGUiLCJtYXBwaW5nQ1NTRWRnZVN0eWxlIiwiYnlwYXNzQ1NTRW50cmllcyIsIm5ldHdvcmsiLCJhcHBseSIsImVsZW1lbnRzIiwibGF5b3V0IiwieCIsInkiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0E7Ozs7Ozs7Ozs7QUM1REFBLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU9DLE1BQVAsQ0FBYztBQUMzQkMsZ0JBQVksV0FEZTtBQUUzQkMsVUFBTSxNQUZxQjtBQUczQkMsVUFBTSxNQUhxQjtBQUkzQkMsYUFBUyxTQUprQjs7QUFNM0JDLFdBQU8sT0FOb0I7QUFPM0JDLFdBQU8sT0FQb0I7O0FBUzNCQyxRQUFJLElBVHVCO0FBVTNCQyxPQUFHLEdBVndCO0FBVzNCQyxPQUFHLEdBWHdCO0FBWTNCQyxPQUFHLEdBWndCO0FBYTNCQyxPQUFHLEdBYndCOztBQWUzQkMsUUFBSSxJQWZ1QjtBQWdCM0JDLE9BQUcsR0FoQndCO0FBaUIzQkMsT0FBRyxHQWpCd0I7O0FBbUIzQkMsdUJBQW1CLGtCQW5CUTtBQW9CM0JDLGFBQVMsU0FwQmtCOztBQXNCM0JDLFdBQU8sT0F0Qm9COztBQXdCM0JDLFFBQUk7QUF4QnVCLENBQWQsQ0FBakIsQzs7Ozs7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QTdCLEVBQW1DLENBQW5DLENBQXhCOztBQUVBNUksZUFBTyxrQkFBUCxJQUE2QjRJLE1BQU0sa0JBQU4sQ0FBN0I7O0FBRUEsZUFBTzVJLE1BQVA7QUFDSDtBQTVHYSxDQUFsQjs7QUErR0FwSCxPQUFPQyxPQUFQLEdBQWlCO0FBQ2J1RSxlQUFXQTtBQURFLENBQWpCLEM7Ozs7Ozs7OztBQzFhQXhFLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU9DLE1BQVAsQ0FBYztBQUMzQixhQUFTLE9BRGtCO0FBRTNCLGFBQVMsT0FGa0I7QUFHM0IsY0FBVSxRQUhpQjtBQUkzQix3QkFBb0Isa0JBSk87QUFLM0IsMEJBQXNCLG9CQUxLO0FBTTNCLGFBQVMsT0FOa0I7QUFPM0IsbUJBQWUsT0FQWTtBQVEzQix1QkFBb0IsV0FSTztBQVMzQixxQkFBa0IsY0FUUztBQVUzQixlQUFXLFNBVmdCO0FBVzNCLGtCQUFjO0FBWGEsQ0FBZCxDQUFqQixDIiwiZmlsZSI6Ii4vYnVpbGQvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3hWaXpDb252ZXJ0ZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiY3hWaXpDb252ZXJ0ZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGM2MzMyMWY5NjUwODhjN2JiMjcwIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgIENYX1ZFUlNJT046ICdDWFZlcnNpb24nLFxuICAgIE5PREU6ICdub2RlJyxcbiAgICBFREdFOiAnZWRnZScsXG4gICAgTkVUV09SSzogJ25ldHdvcmsnLFxuXG4gICAgTk9ERVM6ICdub2RlcycsXG4gICAgRURHRVM6ICdlZGdlcycsXG5cbiAgICBJRDogJ2lkJyxcbiAgICBYOiAneCcsXG4gICAgWTogJ3knLFxuICAgIFo6ICd6JyxcbiAgICBWOiAndicsXG5cbiAgICBBVDogJ2F0JyxcbiAgICBOOiAnbicsXG4gICAgRTogJ2UnLFxuXG4gICAgVklTVUFMX1BST1BFUlRJRVM6ICd2aXN1YWxQcm9wZXJ0aWVzJyxcbiAgICBERUZBVUxUOiAnZGVmYXVsdCcsXG5cbiAgICBTVFlMRTogJ3N0eWxlJyxcblxuICAgIFBPOiAncG8nXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hDb25zdGFudHMuanMiLCJmdW5jdGlvbiBnZXRDeFZlcnNpb24odmVyc2lvblN0cmluZykge1xuICAgIGNvbnN0IHZlcnNpb25BcnJheSA9IHZlcnNpb25TdHJpbmcuc3BsaXQoJy4nKS5tYXAoKG51bWJlclN0cmluZykgPT4geyByZXR1cm4gcGFyc2VJbnQobnVtYmVyU3RyaW5nLCAxMCk7IH0pO1xuICAgIGlmICh2ZXJzaW9uQXJyYXkubGVuZ3RoICE9PSAyICYmIHZlcnNpb25BcnJheS5sZW5ndGggIT0gMykge1xuICAgICAgICB0aHJvdyAnSW5jb21wYXRpYmxlIHZlcnNpb24gZm9ybWF0OiAnICsgdmVyc2lvblN0cmluZztcbiAgICB9XG4gICAgdmVyc2lvbkFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGlmIChpc05hTihlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgJ05vbi1pbnRlZ2VyIHZhbHVlIGluIHZlcnNpb24gc3RyaW5nOiAnICsgdmVyc2lvblN0cmluZztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2ZXJzaW9uQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGdldEN4TWFqb3JWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcbiAgICByZXR1cm4gdmVyc2lvblN0cmluZyA/IGdldEN4VmVyc2lvbih2ZXJzaW9uU3RyaW5nKVswXSA6IDE7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIFxuICAgIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBcbiAgICBub2RlQXR0cmlidXRlVHlwZU1hcCwgXG4gICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgXG4gICAgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBcbiAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKSB7XG4gICAgY29uc29sZS5sb2coXCIgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IFwiICsgSlNPTi5zdHJpbmdpZnkoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIG51bGwsIDIpKTtcbiAgICBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucy5mb3JFYWNoKChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uKSA9PiB7XG4gICAgICAgIGlmIChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uWydub2RlcyddKSB7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uWydlZGdlcyddKSB7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAoYXR0cmlidXRlVHlwZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2QnXSkge1xuICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGVjbGFyYXRpb24uZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlTmFtZU1hcChhdHRyaWJ1dGVOYW1lTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsnYSddKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXR0cmlidXRlICcgKyBhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hICsgJyBzaG91bGQgYmUgcmVuYW1lZCB0byAnICsgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVOYW1lTWFwLnNldChhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hLCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAoYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsndiddKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXR0cmlidXRlICcgKyBhdHRyaWJ1dGVOYW1lICsgJyBoYXMgZGVmYXVsdCB2YWx1ZSAnICsgYXR0cmlidXRlRGVjbGFyYXRpb24udik7XG4gICAgICAgICAgICBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLnYpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUluZmVycmVkVHlwZXMoYXR0cmlidXRlVHlwZU1hcCwgYXR0cmlidXRlTmFtZU1hcCwgdikge1xuICAgIE9iamVjdC5rZXlzKHYpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZVR5cGVNYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdltrZXldO1xuICAgICAgICAgICAgY29uc3QgaW5mZXJyZWRUeXBlID0gdHlwZW9mIHZhbHVlO1xuICAgICAgICAgICAgY29uc3QgbmV3S2V5ID0gYXR0cmlidXRlTmFtZU1hcC5oYXMoa2V5KSA/IGF0dHJpYnV0ZU5hbWVNYXAuZ2V0KGtleSkgOiBrZXk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVUeXBlTWFwLnNldChuZXdLZXksIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBnZXRFeHBhbmRlZEF0dHJpYnV0ZXModiwgYXR0cmlidXRlTmFtZU1hcCwgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKSB7XG4gICAgbGV0IGRhdGEgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgbmV3S2V5ID0gYXR0cmlidXRlTmFtZU1hcC5oYXMoa2V5KSA/IGF0dHJpYnV0ZU5hbWVNYXAuZ2V0KGtleSkgOiBrZXk7XG4gICAgICAgIGRhdGFbbmV3S2V5XSA9IHZba2V5XTtcbiAgICB9KTtcbiAgICBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBpZiAoIWRhdGFba2V5XSkge1xuICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0Q3hWZXJzaW9uOiBnZXRDeFZlcnNpb24sXG4gICAgZ2V0Q3hNYWpvclZlcnNpb246IGdldEN4TWFqb3JWZXJzaW9uLFxuICAgIHByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IHByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgdXBkYXRlQXR0cmlidXRlVHlwZU1hcDogdXBkYXRlQXR0cmlidXRlVHlwZU1hcCxcbiAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwOiB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwLFxuICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcDogdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgIHVwZGF0ZUluZmVycmVkVHlwZXM6IHVwZGF0ZUluZmVycmVkVHlwZXMsXG4gICAgZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzIDogZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeFV0aWwuanMiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNvbnZlcnRlciA9IHJlcXVpcmUgKCcuL2NvbnZlcnRlci5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cy5jb252ZXJ0ID0gKGN4LCB0YXJnZXRGb3JtYXQpID0+IHsgcmV0dXJuIGNvbnZlcnRlci5jb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQpOyB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGxhcmdlTmV0d29yayA9IHJlcXVpcmUgKCcuL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmsuanMnKTsgXG5jb25zdCBjeXRvc2NhcGVKUyA9IHJlcXVpcmUgKCcuL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiB2ZXJpZnlWZXJzaW9uKGN4KSB7XG4gICAgY29uc3QgZmlyc3RFbGVtZW50ID0gY3hbMF07XG4gICAgY29uc3QgdmVyc2lvblN0cmluZyA9IGZpcnN0RWxlbWVudFtjeENvbnN0YW50cy5DWF9WRVJTSU9OXTtcblxuICAgIGNvbnN0IG1ham9yVmVyc2lvbiA9IGN4VXRpbC5nZXRDeE1ham9yVmVyc2lvbih2ZXJzaW9uU3RyaW5nKTtcblxuICAgIGlmIChtYWpvclZlcnNpb24gIT09IDIpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSBDWCB2ZXJzaW9uOiAnICsgdmVyc2lvblN0cmluZztcbiAgICB9XG59XG5cbmNvbnN0IGRlZmF1bHRDb252ZXJ0ZXJzID0gW1xuICAgIGxhcmdlTmV0d29yayxcbiAgICBjeXRvc2NhcGVKU1xuXTtcblxuZnVuY3Rpb24gY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0LCBjb252ZXJ0ZXJzID0gZGVmYXVsdENvbnZlcnRlcnMpIHtcbiAgICB2ZXJpZnlWZXJzaW9uKGN4KTtcbiAgICBsZXQgc2VsZWN0ZWRDb252ZXJ0ZXIgPSB1bmRlZmluZWQ7XG4gICAgXG4gICAgY29udmVydGVycy5mb3JFYWNoKCBjb252ZXJ0ZXIgPT4ge1xuICAgICAgICBpZiAoY29udmVydGVyLmNvbnZlcnRlci50YXJnZXRGb3JtYXQgPT0gdGFyZ2V0Rm9ybWF0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGFyZ2V0IGZvcm1hdDogJyArIGNvbnZlcnRlci5jb252ZXJ0ZXIudGFyZ2V0Rm9ybWF0KTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0ZWRDb252ZXJ0ZXIgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvbnZlcnRlciA9IGNvbnZlcnRlcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ2NvbnZlcnRlcnMgY29udGFpbiBtdWx0aXBsZSBlbnRyaWVzIGZvciB0YXJnZXQgZm9ybWF0OiAnICsgdGFyZ2V0Rm9ybWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIHNlbGVjdGVkQ29udmVydGVyID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93ICdubyBjb252ZXJ0ZXIgYXZhaWxhYmxlIGZvciB0YXJnZXQgZm9ybWF0OiAnICsgdGFyZ2V0Rm9ybWF0XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdGVkQ29udmVydGVyLmNvbnZlcnRlci5jb252ZXJ0KGN4KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0OiBjb252ZXJ0XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb252ZXJ0ZXIuanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGxhcmdlTmV0d29ya0NvbnN0YW50cyA9IHJlcXVpcmUoJy4vbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSkge1xuICAgIGNvbnN0IHRhcmdldFN0eWxlRW50cnkgPSB7fTtcbiAgICB0YXJnZXRTdHlsZUVudHJ5W3RhcmdldFN0eWxlRmllbGRdID0gcG9ydGFibGVQcm9wZXJ0VmFsdWU7XG4gICAgcmV0dXJuIHRhcmdldFN0eWxlRW50cnk7XG59XG5cbmZ1bmN0aW9uIGhleFRvUkdCKGhleCkge1xuICAgIGxldCByID0gMCwgZyA9IDAsIGIgPSAwO1xuXG4gICAgLy8gMyBkaWdpdHNcbiAgICBpZiAoaGV4Lmxlbmd0aCA9PSA0KSB7XG4gICAgICAgIHIgPSBcIjB4XCIgKyBoZXhbMV0gKyBoZXhbMV07XG4gICAgICAgIGcgPSBcIjB4XCIgKyBoZXhbMl0gKyBoZXhbMl07XG4gICAgICAgIGIgPSBcIjB4XCIgKyBoZXhbM10gKyBoZXhbM107XG5cbiAgICAgICAgLy8gNiBkaWdpdHNcbiAgICB9IGVsc2UgaWYgKGhleC5sZW5ndGggPT0gNykge1xuICAgICAgICByID0gXCIweFwiICsgaGV4WzFdICsgaGV4WzJdO1xuICAgICAgICBnID0gXCIweFwiICsgaGV4WzNdICsgaGV4WzRdO1xuICAgICAgICBiID0gXCIweFwiICsgaGV4WzVdICsgaGV4WzZdO1xuICAgIH1cblxuICAgIHJldHVybiBbcGFyc2VJbnQociksIHBhcnNlSW50KGcpLCBwYXJzZUludChiKV07XG59XG5cbmZ1bmN0aW9uIGFscGhhVG9JbnQoYWxwaGFEZWNpbWFsKSB7XG4gICAgcmV0dXJuIGNsYW1wKE1hdGgucm91bmQoYWxwaGFEZWNpbWFsICogMjU1KSwgMCwgMjU1KTtcbn1cblxuY29uc3QgZGVmYXVsdFByb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTm9kZVdpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTm9kZUhlaWdodCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NDb2xvciwgaGV4VG9SR0IocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NBbHBoYSwgYWxwaGFUb0ludChwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvciwgaGV4VG9SR0IocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0xBQkVMX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSwgYWxwaGFUb0ludChwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfRk9OVF9TSVpFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxGb250U2l6ZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMud2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnRURHRV9MQUJFTCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yLCBoZXhUb1JHQihwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhLCBhbHBoYVRvSW50KHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbEZvbnRTaXplLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfVxufVxuXG5cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlcyhkZWZhdWx0VmlzdWFsUHJvcGVydGllcykge1xuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIG5vZGU6IHt9LFxuICAgICAgICBlZGdlOiB7fVxuICAgIH07XG4gICAgaWYgKGRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzWydub2RlJ10pIHtcbiAgICAgICAgY29uc3Qgbm9kZURlZmF1bHQgPSBkZWZhdWx0VmlzdWFsUHJvcGVydGllcy5ub2RlO1xuICAgICAgICBjb25zdCBsbnZFbnRyaWVzID0gZ2V0TE5WVmFsdWVzKCdub2RlJywgbm9kZURlZmF1bHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dC5ub2RlLCBsbnZFbnRyaWVzKTtcbiAgICB9XG4gICAgaWYgKGRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzWydlZGdlJ10pIHtcbiAgICAgICAgY29uc3QgZWRnZURlZmF1bHQgPSBkZWZhdWx0VmlzdWFsUHJvcGVydGllcy5lZGdlO1xuICAgICAgICBjb25zdCBsbnZFbnRyaWVzID0gZ2V0TE5WVmFsdWVzKCdlZGdlJywgZWRnZURlZmF1bHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dC5lZGdlLCBsbnZFbnRyaWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0TE5WVmFsdWVzKGVudGl0eVR5cGUsIGVudHJpZXMpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgT2JqZWN0LmtleXMoZW50cmllcykuZm9yRWFjaChwb3J0YWJsZVByb3BlcnR5S2V5ID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gZW50cmllc1twb3J0YWJsZVByb3BlcnR5S2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGxudkVudHJ5ID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobG52RW50cnkpLmZvckVhY2gobG52S2V5ID0+IHtcbiAgICAgICAgICAgICAgICBvdXRwdXRbbG52S2V5XSA9IGxudkVudHJ5W2xudktleV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0NvbG9yKGNvbG9yQXJyYXksIGFscGhhKSB7XG4gICAgcmV0dXJuIGNvbG9yQXJyYXkgIT0gdW5kZWZpbmVkXG4gICAgICAgID8gYWxwaGEgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IFtjb2xvckFycmF5WzBdLCBjb2xvckFycmF5WzFdLCBjb2xvckFycmF5WzJdLCBhbHBoYV1cbiAgICAgICAgICAgIDogW2NvbG9yQXJyYXlbMF0sIGNvbG9yQXJyYXlbMV0sIGNvbG9yQXJyYXlbMl1dXG4gICAgICAgIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzU2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KHdpZHRoLCBoZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzTm9kZVZpZXcobm9kZVZpZXcpIHtcbiAgICBsZXQgd2lkdGggPSB1bmRlZmluZWQ7XG4gICAgbGV0IGhlaWdodCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgY29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgYWxwaGEgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgbGFiZWxDb2xvckFycmF5ID0gdW5kZWZpbmVkO1xuICAgIGxldCBsYWJlbEFscGhhID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgaWQ6IG5vZGVWaWV3LmlkLFxuICAgICAgICBwb3NpdGlvbjogbm9kZVZpZXcucG9zaXRpb25cbiAgICB9O1xuXG5cbiAgICBPYmplY3Qua2V5cyhub2RlVmlldykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVXaWR0aCkge1xuICAgICAgICAgICAgd2lkdGggPSBub2RlVmlldy5wcmVwcm9jZXNzTm9kZVdpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlSGVpZ2h0KSB7XG4gICAgICAgICAgICBoZWlnaHQgPSBub2RlVmlldy5wcmVwcm9jZXNzTm9kZUhlaWdodDtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IpIHtcbiAgICAgICAgICAgIGNvbG9yQXJyYXkgPSBub2RlVmlldy5wcmVwcm9jZXNzQ29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhKSB7XG4gICAgICAgICAgICBhbHBoYSA9IG5vZGVWaWV3LnByZXByb2Nlc3NBbHBoYTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvcikge1xuICAgICAgICAgICAgbGFiZWxDb2xvckFycmF5ID0gbm9kZVZpZXcucHJlcHJvY2Vzc0xhYmVsQ29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEpIHtcbiAgICAgICAgICAgIGxhYmVsQWxwaGEgPSBub2RlVmlldy5wcmVwcm9jZXNzTGFiZWxBbHBoYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dHB1dFtrZXldID0gbm9kZVZpZXdba2V5XTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29sb3IgPSBwcm9jZXNzQ29sb3IoY29sb3JBcnJheSwgYWxwaGEpO1xuICAgIGlmIChjb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmNvbG9yXSA9IGNvbG9yO1xuICAgIH1cblxuICAgIGNvbnN0IGxhYmVsQ29sb3IgPSBwcm9jZXNzQ29sb3IobGFiZWxDb2xvckFycmF5LCBsYWJlbEFscGhhKTtcbiAgICBpZiAobGFiZWxDb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsQ29sb3JdID0gbGFiZWxDb2xvcjtcbiAgICB9XG5cbiAgICBjb25zdCBzaXplID0gcHJvY2Vzc1NpemUod2lkdGgsIGhlaWdodCk7XG4gICAgaWYgKHNpemUpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5zaXplXSA9IHByb2Nlc3NTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzRWRnZVZpZXcoZWRnZVZpZXcpIHtcbiAgICBsZXQgY29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgYWxwaGEgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgbGFiZWxDb2xvckFycmF5ID0gdW5kZWZpbmVkO1xuICAgIGxldCBsYWJlbEFscGhhID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgaWQ6IGVkZ2VWaWV3LmlkLFxuICAgICAgICBzOiBlZGdlVmlldy5zLFxuICAgICAgICB0OiBlZGdlVmlldy50XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoZWRnZVZpZXcpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NDb2xvcikge1xuICAgICAgICAgICAgY29sb3JBcnJheSA9IGVkZ2VWaWV3LnByZXByb2Nlc3NDb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEpIHtcbiAgICAgICAgICAgIGFscGhhID0gZWRnZVZpZXcucHJlcHJvY2Vzc0FscGhhO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yKSB7XG4gICAgICAgICAgICBsYWJlbENvbG9yQXJyYXkgPSBlZGdlVmlldy5wcmVwcm9jZXNzTGFiZWxDb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSkge1xuICAgICAgICAgICAgbGFiZWxBbHBoYSA9IGVkZ2VWaWV3LnByZXByb2Nlc3NMYWJlbEFscGhhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBlZGdlVmlld1trZXldO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2xvciA9IHByb2Nlc3NDb2xvcihjb2xvckFycmF5LCBhbHBoYSk7XG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuY29sb3JdID0gY29sb3I7XG4gICAgfVxuXG4gICAgY29uc3QgbGFiZWxDb2xvciA9IHByb2Nlc3NDb2xvcihsYWJlbENvbG9yQXJyYXksIGxhYmVsQWxwaGEpO1xuICAgIGlmIChsYWJlbENvbG9yKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxDb2xvcl0gPSBsYWJlbENvbG9yO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldE1hcHBpbmdzKG1hcHBpbmdzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9XG4gICAgT2JqZWN0LmtleXMobWFwcGluZ3MpLmZvckVhY2gocHJvcGVydHlLZXkgPT4ge1xuICAgICAgICBjb25zdCBtYXBwaW5nID0gbWFwcGluZ3NbcHJvcGVydHlLZXldO1xuICAgICAgICBvdXRwdXRbbWFwcGluZy5kZWZpbml0aW9uLmF0dHJpYnV0ZV0gPSB7XG4gICAgICAgICAgICB0eXBlOiBtYXBwaW5nLnR5cGUsXG4gICAgICAgICAgICB2cDogcHJvcGVydHlLZXksXG4gICAgICAgICAgICBkZWZpbml0aW9uOiBtYXBwaW5nLmRlZmluaXRpb25cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cblxuZnVuY3Rpb24gZ2V0QXR0cmlidXRlUmF0aW8oYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4KSB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZVZhbHVlIC8gKGF0dHJpYnV0ZU1heCAtIGF0dHJpYnV0ZU1pbik7XG59XG5cbmZ1bmN0aW9uIGdldFZwUmFuZ2UodnBNaW4sIHZwTWF4KSB7XG4gICAgcmV0dXJuIHZwTWF4IC0gdnBNaW47XG59XG5cbmZ1bmN0aW9uIGdldE1hcCh2cE1pbiwgdnBSYW5nZSwgYXR0cmlidXRlUmF0aW8pIHtcbiAgICByZXR1cm4gdnBNaW4gKyB2cFJhbmdlICogYXR0cmlidXRlUmF0aW87XG59XG5cbmZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgbWluKSwgbWF4KTtcbn1cblxuZnVuY3Rpb24gY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZVJhdGlvID0gZ2V0QXR0cmlidXRlUmF0aW8oYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4KTtcbiAgICBjb25zdCB2cFJhbmdlID0gZ2V0VnBSYW5nZSh2cE1pbiwgdnBNYXgpO1xuXG4gICAgY29uc3Qgb3V0cHV0ID0gZ2V0TWFwKHZwTWluLCB2cFJhbmdlLCBhdHRyaWJ1dGVSYXRpbyk7XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpIHtcbiAgICBjb25zdCBtaW5SR0IgPSBoZXhUb1JHQih2cE1pbik7XG4gICAgY29uc3QgbWF4UkdCID0gaGV4VG9SR0IodnBNYXgpO1xuXG4gICAgY29uc3QgYXR0cmlidXRlUmF0aW8gPSBnZXRBdHRyaWJ1dGVSYXRpbyhhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgpO1xuXG4gICAgY29uc3QgclJhbmdlID0gZ2V0VnBSYW5nZShtaW5SR0JbMF0sIG1heFJHQlsxXSk7XG4gICAgY29uc3QgZ1JhbmdlID0gZ2V0VnBSYW5nZShtaW5SR0JbMV0sIG1heFJHQlsxXSk7XG4gICAgY29uc3QgYlJhbmdlID0gZ2V0VnBSYW5nZShtaW5SR0JbMl0sIG1heFJHQlsyXSk7XG5cbiAgICBjb25zdCBvdXRwdXQgPSBbXG4gICAgICAgIGNsYW1wKE1hdGgucm91bmQoZ2V0TWFwKG1pblJHQlswXSwgclJhbmdlLCBhdHRyaWJ1dGVSYXRpbykpLCAwLCAyNTUpLFxuICAgICAgICBjbGFtcChNYXRoLnJvdW5kKGdldE1hcChtaW5SR0JbMV0sIGdSYW5nZSwgYXR0cmlidXRlUmF0aW8pKSwgMCwgMjU1KSxcbiAgICAgICAgY2xhbXAoTWF0aC5yb3VuZChnZXRNYXAobWluUkdCWzJdLCBiUmFuZ2UsIGF0dHJpYnV0ZVJhdGlvKSksIDAsIDI1NSlcbiAgICBdXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSB7XG4gICAgY29uc3QgYXR0cmlidXRlUmF0aW8gPSBnZXRBdHRyaWJ1dGVSYXRpbyhhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgpO1xuICAgIGNvbnN0IHZwUmFuZ2UgPSBnZXRWcFJhbmdlKHZwTWluLCB2cE1heCk7XG5cbiAgICBjb25zdCBhbHBoYURlY2ltYWwgPSBnZXRNYXAodnBNaW4sIHZwUmFuZ2UsIGF0dHJpYnV0ZVJhdGlvKTtcblxuICAgIGNvbnNvbGUubG9nKFwiYWxwaGFEZWNpbWFsID0gXCIgKyBhbHBoYURlY2ltYWwpO1xuXG4gICAgcmV0dXJuIGFscGhhVG9JbnQoYWxwaGFEZWNpbWFsKTtcbn1cblxuY29uc3QgY29udGludW91c1Byb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfV0lEVEgnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlV2lkdGgsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTm9kZUhlaWdodCwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NBbHBoYSwgY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvciwgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhLCBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbEZvbnRTaXplLCBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMud2lkdGgsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhLCBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yLCBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yLCBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEsIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsRm9udFNpemUsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNJblJhbmdlKGF0dHJpYnV0ZVZhbHVlLCBtaW4sIG1heCwgaW5jbHVkZU1pbiwgaW5jbHVkZU1heCkge1xuICAgIGNvbnN0IG1pblNhdGlzZmllZCA9IGluY2x1ZGVNaW4gPyBtaW4gPD0gYXR0cmlidXRlVmFsdWUgOiBtaW4gPCBhdHRyaWJ1dGVWYWx1ZTtcbiAgICBjb25zdCBtYXhTYXRpc2ZpZWQgPSBpbmNsdWRlTWF4ID8gbWF4ID49IGF0dHJpYnV0ZVZhbHVlIDogbWF4ID4gYXR0cmlidXRlVmFsdWU7XG4gICAgY29uc29sZS5sb2coJ2lzSW5SYW5nZTogJyArIGF0dHJpYnV0ZVZhbHVlICsgJyAnICsgbWluICsgJyAnICsgbWF4ICsgJyAnICsgaW5jbHVkZU1pbiArICcgJyArIGluY2x1ZGVNYXggKyAnICcgKyBtaW5TYXRpc2ZpZWQgKyAnICcgKyBtYXhTYXRpc2ZpZWQpO1xuICAgIHJldHVybiBtaW5TYXRpc2ZpZWQgJiYgbWF4U2F0aXNmaWVkO1xufVxuXG5mdW5jdGlvbiBnZXRNYXBwcGVkVmFsdWVzKG1hcHBpbmdzLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goYXR0cmlidXRlS2V5ID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZUtleV07XG4gICAgICAgIGlmIChtYXBwaW5nc1tlbnRpdHlUeXBlXVthdHRyaWJ1dGVLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBtYXBwaW5nID0gbWFwcGluZ3NbZW50aXR5VHlwZV1bYXR0cmlidXRlS2V5XTtcblxuICAgICAgICAgICAgaWYgKG1hcHBpbmcudHlwZSA9PT0gJ0RJU0NSRVRFJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlTWFwID0gbWFwcGluZy5kZWZpbml0aW9uLm1hcDtcbiAgICAgICAgICAgICAgICBkaXNjcmV0ZU1hcC5mb3JFYWNoKGtleVZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleVZhbHVlLnYgPT0gYXR0cmlidXRlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udmVydGVkID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXShrZXlWYWx1ZS52cCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIGNvbnZlcnRlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWFwcGluZy50eXBlID09PSAnUEFTU1RIUk9VR0gnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udmVydGVkID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXShhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0LCBjb252ZXJ0ZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWFwcGluZy50eXBlID09PSAnQ09OVElOVU9VUycpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250aW51b3VzTWFwcGluZ3MgPSBtYXBwaW5nLmRlZmluaXRpb24ubWFwO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVvdXNNYXBwaW5ncy5mb3JFYWNoKG1hcHBpbmdSYW5nZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgnbWluJyBpbiBtYXBwaW5nUmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICdtYXgnIGluIG1hcHBpbmdSYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgJ2luY2x1ZGVNaW4nIGluIG1hcHBpbmdSYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgJ2luY2x1ZGVNYXgnIGluIG1hcHBpbmdSYW5nZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNJblJhbmdlKGF0dHJpYnV0ZVZhbHVlLCBtYXBwaW5nUmFuZ2UubWluLCBtYXBwaW5nUmFuZ2UubWF4LCBtYXBwaW5nUmFuZ2UuaW5jbHVkZU1pbiwgbWFwcGluZ1JhbmdlLmluY2x1ZGVNYXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgY29udGludW91c1Byb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGNvbnRpbnVvdXNQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0oYXR0cmlidXRlVmFsdWUsIG1hcHBpbmdSYW5nZS5taW4sIG1hcHBpbmdSYW5nZS5tYXgsIG1hcHBpbmdSYW5nZS5taW5WUFZhbHVlLCBtYXBwaW5nUmFuZ2UubWF4VlBWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIGNvbnZlcnRlZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gbG52Q29udmVydChjeCkge1xuXG4gICAgLy9GaXJzdCBwYXNzLiBcbiAgICAvLyBXZSBuZWVkIHRvIGNvbGxlY3Qgb2JqZWN0IGF0dHJpYnV0ZXMgdG8gY2FsY3VsYXRlXG4gICAgLy8gbWFwcGluZ3MgaW4gdGhlIHNlY29uZCBwYXNzLiBcblxuICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGN4Tm9kZUJ5cGFzc2VzID0gW107XG4gICAgbGV0IGN4RWRnZUJ5cGFzc2VzID0gW107XG5cbiAgICBsZXQgbm9kZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IG5vZGVBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IGRlZmF1bHRWYWx1ZXMgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG1hcHBpbmdzID0ge1xuICAgICAgICBub2RlOiB7fSxcbiAgICAgICAgZWRnZToge31cbiAgICB9XG4gICAgbGV0IGJ5cGFzc01hcHBpbmdzID0ge1xuICAgICAgICAnbm9kZSc6IHt9LFxuICAgICAgICAnZWRnZSc6IHt9XG4gICAgfTtcblxuICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgIGlmIChjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddO1xuICAgICAgICAgICAgY3hVdGlsLnByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hOb2RlWyd2J10pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhlZGdlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGN4RWRnZVsndiddKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXSkge1xuICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZUJ5cGFzc2VzJ10pIHtcbiAgICAgICAgICAgIGN4QXNwZWN0Lm5vZGVCeXBhc3Nlcy5mb3JFYWNoKGJ5cGFzcyA9PiB7XG4gICAgICAgICAgICAgICAgY3hOb2RlQnlwYXNzZXMucHVzaChieXBhc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VCeXBhc3NlcyddKSB7XG4gICAgICAgICAgICBjeEFzcGVjdC5lZGdlQnlwYXNzZXMuZm9yRWFjaChieXBhc3MgPT4ge1xuICAgICAgICAgICAgICAgIGN4RWRnZUJ5cGFzc2VzLnB1c2goYnlwYXNzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgb3V0cHV0ID0ge307XG5cbiAgICBsZXQgbm9kZVZpZXdzID0gW107XG4gICAgbGV0IGVkZ2VWaWV3cyA9IFtdO1xuXG4gICAgY3hWaXN1YWxQcm9wZXJ0aWVzLmZvckVhY2godnBFbGVtZW50ID0+IHtcblxuICAgICAgICBjb25zdCBkZWZhdWx0U3R5bGVzID0gdnBFbGVtZW50LmRlZmF1bHQ7XG5cbiAgICAgICAgZGVmYXVsdFZhbHVlcyA9IGdldERlZmF1bHRWYWx1ZXMoZGVmYXVsdFN0eWxlcyk7XG5cbiAgICAgICAgbWFwcGluZ3Mubm9kZSA9IHZwRWxlbWVudC5ub2RlTWFwcGluZyA/IGdldE1hcHBpbmdzKHZwRWxlbWVudC5ub2RlTWFwcGluZykgOiB7fTtcbiAgICAgICAgbWFwcGluZ3MuZWRnZSA9IHZwRWxlbWVudC5lZGdlTWFwcGluZyA/IGdldE1hcHBpbmdzKHZwRWxlbWVudC5lZGdlTWFwcGluZykgOiB7fTtcblxuXG4gICAgfSk7XG5cbiAgICBjeE5vZGVCeXBhc3Nlcy5mb3JFYWNoKCh2cEVsZW1lbnQpID0+IHtcblxuICAgICAgICBjb25zdCBrZXkgPSB2cEVsZW1lbnRbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGdldExOVlZhbHVlcygnbm9kZScsIHZwRWxlbWVudC52KVxuXG4gICAgICAgIGlmICghYnlwYXNzTWFwcGluZ3Mubm9kZVtrZXldKSB7XG4gICAgICAgICAgICBieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdieXBhc3MgY2FsY3VsYXRlZDogJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlcywgbnVsbCwgMikpO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oYnlwYXNzTWFwcGluZ3Mubm9kZVtrZXldLCB2YWx1ZXMpO1xuICAgICAgICAvL2J5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnbm9kZScsIHZwRWxlbWVudCkpO1xuICAgIH0pO1xuXG4gICAgY3hFZGdlQnlwYXNzZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IHZwRWxlbWVudFtjeENvbnN0YW50cy5JRF0udG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gZ2V0TE5WVmFsdWVzKCdlZGdlJywgdnBFbGVtZW50LnYpXG5cbiAgICAgICAgaWYgKCFieXBhc3NNYXBwaW5ncy5lZGdlW2tleV0pIHtcbiAgICAgICAgICAgIGJ5cGFzc01hcHBpbmdzLmVkZ2Vba2V5XSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2J5cGFzcyBjYWxjdWxhdGVkOiAnICsgSlNPTi5zdHJpbmdpZnkodmFsdWVzLCBudWxsLCAyKSk7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihieXBhc3NNYXBwaW5ncy5lZGdlW2tleV0sIHZhbHVlcyk7XG4gICAgfVxuICAgICk7XG5cbiAgICBjb25zb2xlLmxvZygnbWFwcGluZ3M6ICcgKyBKU09OLnN0cmluZ2lmeShtYXBwaW5ncywgbnVsbCwgMikpO1xuXG4gICAgLy9TZWNvbmQgcGFzcy4gXG4gICAgLy8gSGVyZSBpcyB3aGVyZSB0aGUgYWN0dWFsIG91dHB1dCBpcyBnZW5lcmF0ZWQuXG5cbiAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcblxuXG4gICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeE5vZGVbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGVWaWV3ID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogY3hJZCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGN4Tm9kZVsneiddID9cbiAgICAgICAgICAgICAgICAgICAgICAgIFtjeE5vZGVbJ3gnXSwgY3hOb2RlWyd5J10sIGN4Tm9kZVsneiddXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBbY3hOb2RlWyd4J10sIGN4Tm9kZVsneSddXVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vVE9ETyBjYWxjdWxhdGUgbG52IHZwcyBiYXNlZCBvbiBkZWZhdWx0cyBhbmQgYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHROb2RlVmlzdWFsUHJvcGVydGllcyA9IGRlZmF1bHRWYWx1ZXNbJ25vZGUnXTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlVmlldywgZGVmYXVsdE5vZGVWaXN1YWxQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9Bc3NpZ24gbWFwcGluZ3NcbiAgICAgICAgICAgICAgICBjb25zdCBleHBhbmRlZEF0dHJpYnV0ZXMgPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4Tm9kZVsndiddLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFwcGluZ1ZhbHVlcyA9IGdldE1hcHBwZWRWYWx1ZXMobWFwcGluZ3MsICdub2RlJywgZXhwYW5kZWRBdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG5vZGVWaWV3LCBtYXBwaW5nVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgIC8vQXNzaWduIGJ5cGFzc1xuICAgICAgICAgICAgICAgIGlmIChieXBhc3NNYXBwaW5ncy5ub2RlW2N4SWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obm9kZVZpZXcsIGJ5cGFzc01hcHBpbmdzLm5vZGVbY3hJZF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZE5vZGVWaWV3ID0gcHJvY2Vzc05vZGVWaWV3KG5vZGVWaWV3KTtcblxuICAgICAgICAgICAgICAgIG5vZGVWaWV3cy5wdXNoKHByb2Nlc3NlZE5vZGVWaWV3KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcblxuICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hFZGdlW2N4Q29uc3RhbnRzLklEXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVkZ2VWaWV3ID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogY3hJZCxcbiAgICAgICAgICAgICAgICAgICAgczogY3hFZGdlLnMudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgdDogY3hFZGdlLnQudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vVE9ETyBjYWxjdWxhdGUgbG52IHZwcyBiYXNlZCBvbiBkZWZhdWx0cyBhbmQgYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRFZGdlVmlzdWFsUHJvcGVydGllcyA9IGRlZmF1bHRWYWx1ZXNbJ2VkZ2UnXTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlZGdlVmlldywgZGVmYXVsdEVkZ2VWaXN1YWxQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBleHBhbmRlZEF0dHJpYnV0ZXMgPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4RWRnZVsndiddLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFwcGluZ1ZhbHVlcyA9IGdldE1hcHBwZWRWYWx1ZXMobWFwcGluZ3MsICdub2RlJywgZXhwYW5kZWRBdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBtYXBwaW5nVmFsdWVzKTtcbiAgICAgICAgICAgICAgICAvL0Fzc2lnbiBieXBhc3NcbiAgICAgICAgICAgICAgICBpZiAoYnlwYXNzTWFwcGluZ3MuZWRnZVtjeElkXSkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBieXBhc3NNYXBwaW5ncy5lZGdlW2N4SWRdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRFZGdlVmlldyA9IHByb2Nlc3NFZGdlVmlldyhlZGdlVmlldyk7XG5cbiAgICAgICAgICAgICAgICBlZGdlVmlld3MucHVzaChwcm9jZXNzZWRFZGdlVmlldyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5ub2RlVmlld3NdID0gbm9kZVZpZXdzO1xuICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuZWRnZVZpZXdzXSA9IGVkZ2VWaWV3cztcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdsbnYnLFxuICAgIGNvbnZlcnQ6IChjeCkgPT4ge1xuICAgICAgICByZXR1cm4gbG52Q29udmVydChjeCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0OiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0LFxuICAgIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQ6IGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQsXG4gICAgY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0OiBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQsXG4gICAgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0OiBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQsXG4gICAgcHJvY2Vzc05vZGVWaWV3OiBwcm9jZXNzTm9kZVZpZXcsXG4gICAgcHJvY2Vzc0VkZ2VWaWV3OiBwcm9jZXNzRWRnZVZpZXcsXG4gICAgZ2V0RGVmYXVsdFZhbHVlczogZ2V0RGVmYXVsdFZhbHVlcyxcbiAgICBpc0luUmFuZ2U6IGlzSW5SYW5nZSxcbiAgICBjb252ZXJ0ZXI6IGNvbnZlcnRlclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICAnbm9kZVZpZXdzJzogJ25vZGVWaWV3cycsXG4gICAgJ2VkZ2VWaWV3cyc6ICdlZGdlVmlld3MnLCBcbiAgICAnaWQnOiAnaWQnLFxuICAgICdwb3NpdGlvbic6ICdwb3NpdGlvbicsXG4gICAgJ3MnOiAncycsXG4gICAgJ3QnOiAndCcsXG4gICAgJ2xhYmVsJzogJ2xhYmVsJywgXG4gICAgJ2xhYmVsQ29sb3InIDogJ2xhYmVsQ29sb3InLFxuICAgICdsYWJlbEZvbnRTaXplJyA6ICdsYWJlbEZvbnRTaXplJyxcbiAgICAnY29sb3InOiAnY29sb3InLFxuICAgICdzaXplJyA6ICdzaXplJyxcbiAgICAnd2lkdGgnIDogJ3dpZHRoJyxcblxuICAgICdwcmVwcm9jZXNzQ29sb3InOiAncHJlcHJvY2Vzc0NvbG9yJyxcbiAgICAncHJlcHJvY2Vzc0FscGhhJzogJ3ByZXByb2Nlc3NBbHBoYScsXG4gICAgJ3ByZXByb2Nlc3NMYWJlbENvbG9yJzogJ3ByZXByb2Nlc3NMYWJlbENvbG9yJyxcbiAgICAncHJlcHJvY2Vzc0xhYmVsQWxwaGEnOiAncHJlcHJvY2Vzc0xhYmVsQWxwaGEnLFxuICAgICdwcmVwcm9jZXNzTm9kZVdpZHRoJyA6ICdwcmVwcm9jZXNzTm9kZVdpZHRoJyxcbiAgICAncHJlcHJvY2Vzc05vZGVIZWlnaHQnIDogJ3ByZXByb2Nlc3NOb2RlSGVpZ2h0J1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmtDb25zdGFudHMuanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGpzQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9jeXRvc2NhcGVKU0NvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpIHtcbiAgICBjb25zdCB0YXJnZXRTdHlsZUVudHJ5ID0gbmV3IE1hcCgpO1xuICAgIHRhcmdldFN0eWxlRW50cnkuc2V0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKTtcbiAgICByZXR1cm4gdGFyZ2V0U3R5bGVFbnRyeTtcbn1cblxuY29uc3QgZGVmYXVsdFByb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfU0hBUEUnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9XSURUSCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0ZPTlRfU0laRSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MQUJFTCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xBQkVMX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xBQkVMX0ZPTlRfU0laRSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbn1cblxuZnVuY3Rpb24gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgY29uc3Qgb3V0cHV0ID0ge307XG4gICAgb3V0cHV0W3RhcmdldFN0eWxlRmllbGRdID0gJ2RhdGEoJyArIGF0dHJpYnV0ZU5hbWUgKyAnKSc7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgcGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfU0hBUEUnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIGF0dHJpYnV0ZU5hbWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9MQUJFTCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG59XG5mdW5jdGlvbiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9ICdtYXBEYXRhKCcgKyBhdHRyaWJ1dGVOYW1lXG4gICAgICAgICsgJywgJyArIG1pblZhbHVlXG4gICAgICAgICsgJywgJyArIG1heFZhbHVlXG4gICAgICAgICsgJywgJyArIG1pblZQXG4gICAgICAgICsgJywgJyArIG1heFZQXG4gICAgICAgICsgJyknO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IG1hcERhdGFQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKVxuXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGluZV9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MQUJFTCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApXG4gICAgfSxcbn1cblxuXG5mdW5jdGlvbiBnZXRDU1NTdHlsZUVudHJpZXMoY3hTdHlsZUVudHJpZXMsIGVudGl0eVR5cGUpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgT2JqZWN0LmtleXMoY3hTdHlsZUVudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBwb3J0YWJsZVByb3BlcnR5VmFsdWUgPSBjeFN0eWxlRW50cmllc1trZXldO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtrZXldKSB7XG4gICAgICAgICAgICBjb25zdCBjc3NFbnRyaWVzID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtrZXldKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICBjc3NFbnRyaWVzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRJZFNlbGVjdG9yKGlkLCBlbGVtZW50VHlwZSkge1xuICAgIC8vbm9kZSNpZCBvciBlZGdlI2lkXG4gICAgcmV0dXJuIGVsZW1lbnRUeXBlICsgJyMnICsgaWQ7XG59XG5cblxuXG5mdW5jdGlvbiBnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcykge1xuICAgIHJldHVybiB7ICdzZWxlY3Rvcic6IHNlbGVjdG9yLCAnc3R5bGUnOiBjc3MgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29udGludW91c1NlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgaW5jbHVkZU1pbiwgaW5jbHVkZU1heCkge1xuICAgIGNvbnN0IG1pbkNvbmRpdGlvbiA9IGluY2x1ZGVNaW4gPyAnPj0nIDogJz4nO1xuICAgIGNvbnN0IG1heENvbmRpdGlvbiA9IGluY2x1ZGVNYXggPyAnPD0nIDogJzwnO1xuXG4gICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyAnICsgbWluQ29uZGl0aW9uICsgJyAnICsgbWluVmFsdWUgKyAnXVsnICsgYXR0cmlidXRlTmFtZSArICcgJyArIG1heENvbmRpdGlvbiArICcgJyArIG1heFZhbHVlICsgJ10nXG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNTdHlsZShlbnRpdHlUeXBlLCBwb3J0YWJsZVByb3BlcnR5S2V5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBpZiAobWFwRGF0YVByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICByZXR1cm4gbWFwRGF0YVByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cmllcyhwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydhdHRyaWJ1dGUnXTtcbiAgICBjb25zdCByYW5nZU1hcHMgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydtYXAnXTtcbiAgICBjb25zb2xlLmxvZygnY29udGludW91cyBtYXBwaW5nIGZvciAnICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBKU09OLnN0cmluZ2lmeShyYW5nZU1hcHMsIG51bGwsIDIpKTtcblxuICAgIHJhbmdlTWFwcy5mb3JFYWNoKChyYW5nZSkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGdldENvbnRpbnVvdXNTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCByYW5nZS5taW4sIHJhbmdlLm1heCwgcmFuZ2UuaW5jbHVkZU1pbiwgcmFuZ2UuaW5jbHVkZU1heCk7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29udGludW91c1N0eWxlKGVudGl0eVR5cGUsIHBvcnRhYmxlUHJvcGVydHlLZXksIGF0dHJpYnV0ZU5hbWUsIHJhbmdlLm1pbiwgcmFuZ2UubWF4LCByYW5nZS5taW5WUFZhbHVlLCByYW5nZS5tYXhWUFZhbHVlKTtcblxuICAgICAgICBvdXRwdXQucHVzaChnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIHN0eWxlKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSkge1xuICAgIGlmIChwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgIGNvbnN0IGNzcyA9IHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oY3hNYXBwaW5nRGVmaW5pdGlvbi5hdHRyaWJ1dGUpO1xuICAgICAgICByZXR1cm4gZ2V0U3R5bGVFbGVtZW50KGVudGl0eVR5cGUsIGNzcyk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXREaXNjcmV0ZVNlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURhdGFUeXBlLCBhdHRyaWJ1dGVWYWx1ZSkge1xuICAgIGlmIChhdHRyaWJ1dGVEYXRhVHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gXFwnJyArIGF0dHJpYnV0ZVZhbHVlICsgJ1xcJ10nO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ2Jvb2xlYW4nKSB7XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZVZhbHVlID09ICd0cnVlJykge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWz8nICsgYXR0cmlidXRlTmFtZSArICddJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICddWyEnICsgYXR0cmlidXRlTmFtZSArICddJztcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICcgPSAnICsgYXR0cmlidXRlVmFsdWUgKyAnXSc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzKHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgY29uc3QgYXR0dHJpYnV0ZVRvVmFsdWVNYXAgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydtYXAnXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnYXR0cmlidXRlJ107XG4gICAgY29uc3QgYXR0cmlidXRlRGF0YVR5cGUgPSBhdHRyaWJ1dGVUeXBlTWFwLmdldChhdHRyaWJ1dGVOYW1lKTtcbiAgICBhdHR0cmlidXRlVG9WYWx1ZU1hcC5mb3JFYWNoKChkaXNjcmV0ZU1hcCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnIGRpc2NyZXRlIG1hcCBmb3IgJyArIHBvcnRhYmxlUHJvcGVydHlLZXkgKyAnOiAnICsgZGlzY3JldGVNYXAudiArICcgKCcgKyBhdHRyaWJ1dGVOYW1lICsgJzwnICsgYXR0cmlidXRlRGF0YVR5cGUgKyAnPikgLT4gJyArIGRpc2NyZXRlTWFwLnZwKTtcblxuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGdldERpc2NyZXRlU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGF0YVR5cGUsIGRpc2NyZXRlTWFwLnYpO1xuXG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZU1hcCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oZGlzY3JldGVNYXAudnApO1xuICAgICAgICAgICAgY29uc3QgY3NzID0ge307XG4gICAgICAgICAgICBzdHlsZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY3NzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyAgIHN0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkoY3NzKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIG91dHB1dDsgLy9nZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcyk7XG59XG5cbmZ1bmN0aW9uIGdldEJ5cGFzc0NTU0VudHJ5KGVudGl0eVR5cGUsIGN4RWxlbWVudCkge1xuXG4gICAgY29uc3QgaWQgPSBjeEVsZW1lbnQuaWQ7XG4gICAgY29uc3QgY3NzID0ge307XG4gICAgT2JqZWN0LmtleXMoY3hFbGVtZW50LnYpLmZvckVhY2goKHBvcnRhYmxlUHJvcGVydHlLZXkpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gY3hFbGVtZW50LnZbcG9ydGFibGVQcm9wZXJ0eUtleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZU1hcCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIHN0eWxlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBjc3Nba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0SWRTZWxlY3RvcihpZCwgZW50aXR5VHlwZSk7XG4gICAgcmV0dXJuIGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKTtcbn1cblxuLyoqIFxuICogXG4qL1xuZnVuY3Rpb24gZ2V0Q1NTTWFwcGluZ0VudHJpZXMoXG4gICAgY3hNYXBwaW5nRW50cmllcyxcbiAgICBlbnRpdHlUeXBlLFxuICAgIGF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgT2JqZWN0LmtleXMoY3hNYXBwaW5nRW50cmllcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IGN4TWFwcGluZ0VudHJ5ID0gY3hNYXBwaW5nRW50cmllc1trZXldO1xuICAgICAgICBjb25zb2xlLmxvZyhcIiBtYXBwaW5nIHR5cGU6IFwiICsgY3hNYXBwaW5nRW50cnkudHlwZSk7XG4gICAgICAgIHN3aXRjaCAoY3hNYXBwaW5nRW50cnkudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnQ09OVElOVU9VUyc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250aW5vdXNNYXBwaW5ncyA9IGdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cmllcyhrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApO1xuICAgICAgICAgICAgICAgIGNvbnRpbm91c01hcHBpbmdzLmZvckVhY2goKGNvbnRpbm91c01hcHBpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goY29udGlub3VzTWFwcGluZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ1BBU1NUSFJPVUdIJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNzc0VudHJ5ID0gZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlKTtcbiAgICAgICAgICAgICAgICBpZiAoY3NzRW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goY3NzRW50cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ0RJU0NSRVRFJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlTWFwcGluZ3MgPSBnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzKGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCk7XG4gICAgICAgICAgICAgICAgZGlzY3JldGVNYXBwaW5ncy5mb3JFYWNoKChkaXNjcmV0ZU1hcHBpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goZGlzY3JldGVNYXBwaW5nKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgTk9ERV9TRUxFQ1RPUiA9ICdub2RlJztcbmNvbnN0IEVER0VfU0VMRUNUT1IgPSAnZWRnZSc7XG5cbmZ1bmN0aW9uIGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBjeE5vZGVCeXBhc3NlcywgY3hFZGdlQnlwYXNzZXMsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICBsZXQgZGVmYXVsdENTU05vZGVTdHlsZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgZGVmYXVsdENTU0VkZ2VTdHlsZSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IG1hcHBpbmdDU1NOb2RlU3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG1hcHBpbmdDU1NFZGdlU3R5bGUgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgYnlwYXNzQ1NTRW50cmllcyA9IFtdO1xuXG4gICAgY3hWaXN1YWxQcm9wZXJ0aWVzLmZvckVhY2goKHZwRWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCBkZWZhdWx0U3R5bGVzID0gdnBFbGVtZW50LmRlZmF1bHQ7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2RlZmF1bHQgc3R5bGU6ICcgKyBKU09OLnN0cmluZ2lmeShkZWZhdWx0U3R5bGVzKSk7XG4gICAgICAgIGRlZmF1bHRDU1NOb2RlU3R5bGUgPSBnZXRDU1NTdHlsZUVudHJpZXMoZGVmYXVsdFN0eWxlcy5ub2RlLCAnbm9kZScpO1xuICAgICAgICBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gZ2V0Q1NTU3R5bGVFbnRyaWVzKGRlZmF1bHRTdHlsZXMuZWRnZSwgJ2VkZ2UnKTtcblxuICAgICAgICBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gZGVmYXVsdFN0eWxlcy5uZXR3b3JrWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgY29uc3Qgbm9kZU1hcHBpbmcgPSB2cEVsZW1lbnQubm9kZU1hcHBpbmc7XG4gICAgICAgIG1hcHBpbmdDU1NOb2RlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhub2RlTWFwcGluZywgJ25vZGUnLCBub2RlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgY29uc3QgZWRnZU1hcHBpbmcgPSB2cEVsZW1lbnQuZWRnZU1hcHBpbmc7XG4gICAgICAgIG1hcHBpbmdDU1NFZGdlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhlZGdlTWFwcGluZywgJ2VkZ2UnLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICB9KVxuXG4gICAgY3hOb2RlQnlwYXNzZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGJ5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnbm9kZScsIHZwRWxlbWVudCkpO1xuICAgIH0pO1xuXG4gICAgY3hFZGdlQnlwYXNzZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGJ5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnZWRnZScsIHZwRWxlbWVudCkpO1xuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coJ2RlZmF1bHQgbm9kZSBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGRlZmF1bHRDU1NOb2RlU3R5bGUpKTtcblxuICAgIC8vQWRkIGRlZmF1bHQgc3R5bGVcbiAgICBvdXRwdXQuc3R5bGUucHVzaChnZXRTdHlsZUVsZW1lbnQoTk9ERV9TRUxFQ1RPUiwgZGVmYXVsdENTU05vZGVTdHlsZSkpO1xuICAgIG91dHB1dC5zdHlsZS5wdXNoKGdldFN0eWxlRWxlbWVudChFREdFX1NFTEVDVE9SLCBkZWZhdWx0Q1NTRWRnZVN0eWxlKSk7XG5cbiAgICBvdXRwdXQuc3R5bGUucHVzaC5hcHBseShvdXRwdXQuc3R5bGUsIG1hcHBpbmdDU1NOb2RlU3R5bGUpO1xuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgbWFwcGluZ0NTU0VkZ2VTdHlsZSk7XG5cbiAgICBvdXRwdXQuc3R5bGUucHVzaC5hcHBseShvdXRwdXQuc3R5bGUsIGJ5cGFzc0NTU0VudHJpZXMpO1xuXG4gICAgb3V0cHV0WydiYWNrZ3JvdW5kLWNvbG9yJ10gPSBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgY29udmVydGVyID0ge1xuICAgIHRhcmdldEZvcm1hdDogJ2N5dG9zY2FwZUpTJyxcbiAgICBjb252ZXJ0OiAoY3gpID0+IHtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0ge1xuICAgICAgICAgICAgc3R5bGU6IFtdLFxuICAgICAgICAgICAgZWxlbWVudHM6IHt9LFxuICAgICAgICAgICAgbGF5b3V0OiB7fSxcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN4VmlzdWFsUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGN4Tm9kZUJ5cGFzc2VzID0gW107XG4gICAgICAgIGxldCBjeEVkZ2VCeXBhc3NlcyA9IFtdO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgICAgICAgICAgICAgY3hVdGlsLnByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeE5vZGVbJ3YnXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuICAgICAgICAgICAgICAgIGN4RWRnZXMuZm9yRWFjaCgoY3hFZGdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hFZGdlWyd2J10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVCeXBhc3NlcyddKSB7XG4gICAgICAgICAgICAgICAgY3hBc3BlY3Qubm9kZUJ5cGFzc2VzLmZvckVhY2goYnlwYXNzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hOb2RlQnlwYXNzZXMucHVzaChieXBhc3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZUJ5cGFzc2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjeEFzcGVjdC5lZGdlQnlwYXNzZXMuZm9yRWFjaChieXBhc3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjeEVkZ2VCeXBhc3Nlcy5wdXNoKGJ5cGFzcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLmZvckVhY2goKGluZmVycmVkVHlwZSwgYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZmVycmVkIGF0dHJpYnV0ZSB0eXBlIGZvciBub2RlOiAnICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcC5mb3JFYWNoKChpbmZlcnJlZFR5cGUsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3IgZWRnZTogJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9BZGQgbm9kZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydub2RlcyddID0gW107XG5cbiAgICAgICAgLy9BZGQgZWRnZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydlZGdlcyddID0gW107XG5cblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuICAgICAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddID0gY3hVdGlsLmdldEV4cGFuZGVkQXR0cmlidXRlcyhjeE5vZGVbJ3YnXSwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ2lkJ10gPSBjeE5vZGUuaWQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsncG9zaXRpb24nXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGN4Tm9kZVsneCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogY3hOb2RlWyd5J11cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMubm9kZXMucHVzaChlbGVtZW50KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcbiAgICAgICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hFZGdlWyd2J10sIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydpZCddID0gY3hFZGdlLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnc291cmNlJ10gPSBjeEVkZ2VbJ3MnXTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWyd0YXJnZXQnXSA9IGN4RWRnZVsndCddO1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMuZWRnZXMucHVzaChlbGVtZW50KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzdHlsZSA9IGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBjeE5vZGVCeXBhc3NlcywgY3hFZGdlQnlwYXNzZXMsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgb3V0cHV0LnN0eWxlID0gc3R5bGUuc3R5bGU7XG4gICAgICAgIGNvbnNvbGUubG9nKCd2aXN1YWxQcm9wZXJ0aWVzOiAnICsgSlNPTi5zdHJpbmdpZnkoY3hWaXN1YWxQcm9wZXJ0aWVzLCBudWxsLCAyKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KG91dHB1dC5zdHlsZSwgbnVsbCwgMikpO1xuXG4gICAgICAgIG91dHB1dFsnYmFja2dyb3VuZC1jb2xvciddID0gc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXTtcblxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydGVyOiBjb252ZXJ0ZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTLmpzIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgICdzaGFwZSc6ICdzaGFwZScsXG4gICAgJ3dpZHRoJzogJ3dpZHRoJywgXG4gICAgJ2hlaWdodCc6ICdoZWlnaHQnLFxuICAgICdiYWNrZ3JvdW5kX2NvbG9yJzogJ2JhY2tncm91bmQtY29sb3InLFxuICAgICdiYWNrZ3JvdW5kX29wYWNpdHknOiAnYmFja2dyb3VuZC1vcGFjaXR5JyxcbiAgICAnbGFiZWwnOiAnbGFiZWwnLFxuICAgICdsYWJlbF9jb2xvcic6ICdjb2xvcicsXG4gICAgJ2xhYmVsX2ZvbnRfc2l6ZScgOiAnZm9udC1zaXplJyxcbiAgICAnbGFiZWxfb3BhY2l0eScgOiAndGV4dC1vcGFjaXR5JyxcbiAgICAnb3BhY2l0eSc6ICdvcGFjaXR5JyxcbiAgICAnbGluZV9jb2xvcic6ICdsaW5lLWNvbG9yJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==