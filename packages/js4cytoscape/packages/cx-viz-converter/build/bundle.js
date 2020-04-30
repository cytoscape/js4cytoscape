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

            mappings.node = value.nodeMapping ? getMappings(value.nodeMapping) : {};
            mappings.edge = value.edgeMapping ? getMappings(value.edgeMapping) : {};
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

        console.log('portable node style: ' + JSON.stringify(defaultStyles.node));
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
        var cxNodeBypasses = undefined;
        var cxEdgeBypasses = undefined;

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
                cxNodeBypasses = cxAspect['nodeBypasses'];
            } else if (cxAspect['edgeBypasses']) {
                cxEdgeBypasses = cxAspect['edgeBypasses'];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyMTE5MzdiOTY0MDNkMDU3MWJiMSIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsIlBPIiwiZ2V0Q3hWZXJzaW9uIiwidmVyc2lvblN0cmluZyIsInZlcnNpb25BcnJheSIsInNwbGl0IiwibWFwIiwibnVtYmVyU3RyaW5nIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXNOYU4iLCJlbGVtZW50IiwiZ2V0Q3hNYWpvclZlcnNpb24iLCJwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVBdHRyaWJ1dGVUeXBlTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwiZWRnZUF0dHJpYnV0ZVR5cGVNYXAiLCJlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjeEF0dHJpYnV0ZURlY2xhcmF0aW9uIiwidXBkYXRlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVzIiwidXBkYXRlQXR0cmlidXRlVHlwZU1hcCIsInVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VzIiwiYXR0cmlidXRlVHlwZU1hcCIsImF0dHJpYnV0ZURlY2xhcmF0aW9ucyIsImtleXMiLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlRGVjbGFyYXRpb24iLCJzZXQiLCJkIiwiYXR0cmlidXRlTmFtZU1hcCIsImEiLCJhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJ2IiwidXBkYXRlSW5mZXJyZWRUeXBlcyIsImtleSIsImhhcyIsInZhbHVlIiwiaW5mZXJyZWRUeXBlIiwibmV3S2V5IiwiZ2V0IiwiZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzIiwiZGF0YSIsImNvbnZlcnRlciIsInJlcXVpcmUiLCJjb252ZXJ0IiwiY3giLCJ0YXJnZXRGb3JtYXQiLCJjeENvbnN0YW50cyIsImxhcmdlTmV0d29yayIsImN5dG9zY2FwZUpTIiwiY3hVdGlsIiwidmVyaWZ5VmVyc2lvbiIsImZpcnN0RWxlbWVudCIsIm1ham9yVmVyc2lvbiIsImRlZmF1bHRDb252ZXJ0ZXJzIiwiY29udmVydGVycyIsInNlbGVjdGVkQ29udmVydGVyIiwidW5kZWZpbmVkIiwibGFyZ2VOZXR3b3JrQ29uc3RhbnRzIiwic2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCIsInRhcmdldFN0eWxlRmllbGQiLCJwb3J0YWJsZVByb3BlcnRWYWx1ZSIsInRhcmdldFN0eWxlRW50cnkiLCJoZXhUb1JHQiIsImhleCIsInIiLCJnIiwiYiIsImFscGhhVG9JbnQiLCJhbHBoYURlY2ltYWwiLCJjbGFtcCIsIk1hdGgiLCJyb3VuZCIsImRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJwb3J0YWJsZVByb3BlcnR5VmFsdWUiLCJwcmVwcm9jZXNzTm9kZVdpZHRoIiwicHJlcHJvY2Vzc05vZGVIZWlnaHQiLCJwcmVwcm9jZXNzQ29sb3IiLCJwcmVwcm9jZXNzQWxwaGEiLCJsYWJlbCIsInByZXByb2Nlc3NMYWJlbENvbG9yIiwicHJlcHJvY2Vzc0xhYmVsQWxwaGEiLCJsYWJlbEZvbnRTaXplIiwid2lkdGgiLCJnZXREZWZhdWx0VmFsdWVzIiwiZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMiLCJvdXRwdXQiLCJub2RlIiwiZWRnZSIsIm5vZGVEZWZhdWx0IiwibG52RW50cmllcyIsImdldExOVlZhbHVlcyIsImFzc2lnbiIsImVkZ2VEZWZhdWx0IiwiZW50aXR5VHlwZSIsImVudHJpZXMiLCJwb3J0YWJsZVByb3BlcnR5S2V5IiwibG52RW50cnkiLCJsbnZLZXkiLCJwcm9jZXNzQ29sb3IiLCJjb2xvckFycmF5IiwiYWxwaGEiLCJwcm9jZXNzU2l6ZSIsImhlaWdodCIsIm1heCIsInByb2Nlc3NOb2RlVmlldyIsIm5vZGVWaWV3IiwibGFiZWxDb2xvckFycmF5IiwibGFiZWxBbHBoYSIsImlkIiwicG9zaXRpb24iLCJjb2xvciIsImxhYmVsQ29sb3IiLCJzaXplIiwicHJvY2Vzc0VkZ2VWaWV3IiwiZWRnZVZpZXciLCJzIiwidCIsImdldE1hcHBpbmdzIiwibWFwcGluZ3MiLCJtYXBwaW5nIiwicHJvcGVydHlLZXkiLCJkZWZpbml0aW9uIiwiYXR0cmlidXRlIiwidHlwZSIsInZwIiwiZ2V0QXR0cmlidXRlUmF0aW8iLCJhdHRyaWJ1dGVWYWx1ZSIsImF0dHJpYnV0ZU1pbiIsImF0dHJpYnV0ZU1heCIsImdldFZwUmFuZ2UiLCJ2cE1pbiIsInZwTWF4IiwiZ2V0TWFwIiwidnBSYW5nZSIsImF0dHJpYnV0ZVJhdGlvIiwibWluIiwiY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydCIsImNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydCIsIm1pblJHQiIsIm1heFJHQiIsInJSYW5nZSIsImdSYW5nZSIsImJSYW5nZSIsImNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydCIsImNvbnRpbnVvdXNQcm9wZXJ0eUNvbnZlcnQiLCJpc0luUmFuZ2UiLCJpbmNsdWRlTWluIiwiaW5jbHVkZU1heCIsIm1pblNhdGlzZmllZCIsIm1heFNhdGlzZmllZCIsImdldE1hcHBwZWRWYWx1ZXMiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlS2V5IiwiZGlzY3JldGVNYXAiLCJrZXlWYWx1ZSIsImNvbnZlcnRlZCIsImNvbnRpbnVvdXNNYXBwaW5ncyIsIm1hcHBpbmdSYW5nZSIsIm1pblZQVmFsdWUiLCJtYXhWUFZhbHVlIiwibG52Q29udmVydCIsImN4VmlzdWFsUHJvcGVydGllcyIsIk1hcCIsImRlZmF1bHRWYWx1ZXMiLCJieXBhc3NNYXBwaW5ncyIsImN4QXNwZWN0IiwiY3hOb2RlcyIsImN4Tm9kZSIsImN4RWRnZXMiLCJjeEVkZ2UiLCJub2RlVmlld3MiLCJlZGdlVmlld3MiLCJ2cEF0IiwidnBFbGVtZW50IiwiYXQiLCJkZWZhdWx0U3R5bGVzIiwiZGVmYXVsdCIsIm5vZGVNYXBwaW5nIiwiZWRnZU1hcHBpbmciLCJ0b1N0cmluZyIsInZhbHVlcyIsImN4SWQiLCJkZWZhdWx0Tm9kZVZpc3VhbFByb3BlcnRpZXMiLCJleHBhbmRlZEF0dHJpYnV0ZXMiLCJtYXBwaW5nVmFsdWVzIiwicHJvY2Vzc2VkTm9kZVZpZXciLCJwdXNoIiwiZGVmYXVsdEVkZ2VWaXN1YWxQcm9wZXJ0aWVzIiwicHJvY2Vzc2VkRWRnZVZpZXciLCJqc0NvbnN0YW50cyIsInNoYXBlIiwiYmFja2dyb3VuZF9jb2xvciIsImJhY2tncm91bmRfb3BhY2l0eSIsImxhYmVsX2NvbG9yIiwibGFiZWxfb3BhY2l0eSIsImxhYmVsX2ZvbnRfc2l6ZSIsIm9wYWNpdHkiLCJsaW5lX2NvbG9yIiwic2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCIsInBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0IiwibWluVmFsdWUiLCJtYXhWYWx1ZSIsIm1pblZQIiwibWF4VlAiLCJtYXBEYXRhUHJvcGVydHlDb252ZXJ0IiwiZ2V0Q1NTU3R5bGVFbnRyaWVzIiwiY3hTdHlsZUVudHJpZXMiLCJjc3NFbnRyaWVzIiwiZ2V0SWRTZWxlY3RvciIsImVsZW1lbnRUeXBlIiwiZ2V0U3R5bGVFbGVtZW50Iiwic2VsZWN0b3IiLCJjc3MiLCJnZXRDb250aW51b3VzU2VsZWN0b3IiLCJtaW5Db25kaXRpb24iLCJtYXhDb25kaXRpb24iLCJnZXRDb250aW51b3VzU3R5bGUiLCJnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMiLCJjeE1hcHBpbmdEZWZpbml0aW9uIiwicmFuZ2VNYXBzIiwicmFuZ2UiLCJzdHlsZSIsImdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5IiwiZ2V0RGlzY3JldGVTZWxlY3RvciIsImF0dHJpYnV0ZURhdGFUeXBlIiwiZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyIsImF0dHRyaWJ1dGVUb1ZhbHVlTWFwIiwic3R5bGVNYXAiLCJnZXRCeXBhc3NDU1NFbnRyeSIsImN4RWxlbWVudCIsImdldENTU01hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cmllcyIsImN4TWFwcGluZ0VudHJ5IiwiY29udGlub3VzTWFwcGluZ3MiLCJjb250aW5vdXNNYXBwaW5nIiwiY3NzRW50cnkiLCJkaXNjcmV0ZU1hcHBpbmdzIiwiZGlzY3JldGVNYXBwaW5nIiwiTk9ERV9TRUxFQ1RPUiIsIkVER0VfU0VMRUNUT1IiLCJnZXRWaXN1YWxQcm9wZXJ0aWVzIiwiY3hOb2RlQnlwYXNzZXMiLCJjeEVkZ2VCeXBhc3NlcyIsImRlZmF1bHRDU1NOb2RlU3R5bGUiLCJkZWZhdWx0Q1NTRWRnZVN0eWxlIiwiY3NzTmV0d29ya0JhY2tncm91bmRDb2xvciIsIm1hcHBpbmdDU1NOb2RlU3R5bGUiLCJtYXBwaW5nQ1NTRWRnZVN0eWxlIiwiYnlwYXNzQ1NTRW50cmllcyIsIm5ldHdvcmsiLCJhcHBseSIsImVsZW1lbnRzIiwibGF5b3V0IiwieCIsInkiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0E7Ozs7Ozs7Ozs7QUM1REFBLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU9DLE1BQVAsQ0FBYztBQUMzQkMsZ0JBQVksV0FEZTtBQUUzQkMsVUFBTSxNQUZxQjtBQUczQkMsVUFBTSxNQUhxQjtBQUkzQkMsYUFBUyxTQUprQjs7QUFNM0JDLFdBQU8sT0FOb0I7QUFPM0JDLFdBQU8sT0FQb0I7O0FBUzNCQyxRQUFJLElBVHVCO0FBVTNCQyxPQUFHLEdBVndCO0FBVzNCQyxPQUFHLEdBWHdCO0FBWTNCQyxPQUFHLEdBWndCO0FBYTNCQyxPQUFHLEdBYndCOztBQWUzQkMsUUFBSSxJQWZ1QjtBQWdCM0JDLE9BQUcsR0FoQndCO0FBaUIzQkMsT0FBRyxHQWpCd0I7O0FBbUIzQkMsdUJBQW1CLGtCQW5CUTtBQW9CM0JDLGFBQVMsU0FwQmtCOztBQXNCM0JDLFdBQU8sT0F0Qm9COztBQXdCM0JDLFFBQUk7QUF4QnVCLENBQWQsQ0FBakIsQzs7Ozs7Ozs7Ozs7QUNEQSxTQUFTQyxZQUFULENBQXNC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V0FSTztBQVMzQixxQkFBa0IsY0FUUztBQVUzQixlQUFXLFNBVmdCO0FBVzNCLGtCQUFjO0FBWGEsQ0FBZCxDQUFqQixDIiwiZmlsZSI6Ii4vYnVpbGQvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3hWaXpDb252ZXJ0ZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiY3hWaXpDb252ZXJ0ZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDIxMTkzN2I5NjQwM2QwNTcxYmIxIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgIENYX1ZFUlNJT046ICdDWFZlcnNpb24nLFxuICAgIE5PREU6ICdub2RlJyxcbiAgICBFREdFOiAnZWRnZScsXG4gICAgTkVUV09SSzogJ25ldHdvcmsnLFxuXG4gICAgTk9ERVM6ICdub2RlcycsXG4gICAgRURHRVM6ICdlZGdlcycsXG5cbiAgICBJRDogJ2lkJyxcbiAgICBYOiAneCcsXG4gICAgWTogJ3knLFxuICAgIFo6ICd6JyxcbiAgICBWOiAndicsXG5cbiAgICBBVDogJ2F0JyxcbiAgICBOOiAnbicsXG4gICAgRTogJ2UnLFxuXG4gICAgVklTVUFMX1BST1BFUlRJRVM6ICd2aXN1YWxQcm9wZXJ0aWVzJyxcbiAgICBERUZBVUxUOiAnZGVmYXVsdCcsXG5cbiAgICBTVFlMRTogJ3N0eWxlJyxcblxuICAgIFBPOiAncG8nXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hDb25zdGFudHMuanMiLCJmdW5jdGlvbiBnZXRDeFZlcnNpb24odmVyc2lvblN0cmluZykge1xuICAgIGNvbnN0IHZlcnNpb25BcnJheSA9IHZlcnNpb25TdHJpbmcuc3BsaXQoJy4nKS5tYXAoKG51bWJlclN0cmluZykgPT4geyByZXR1cm4gcGFyc2VJbnQobnVtYmVyU3RyaW5nLCAxMCk7IH0pO1xuICAgIGlmICh2ZXJzaW9uQXJyYXkubGVuZ3RoICE9PSAyICYmIHZlcnNpb25BcnJheS5sZW5ndGggIT0gMykge1xuICAgICAgICB0aHJvdyAnSW5jb21wYXRpYmxlIHZlcnNpb24gZm9ybWF0OiAnICsgdmVyc2lvblN0cmluZztcbiAgICB9XG4gICAgdmVyc2lvbkFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGlmIChpc05hTihlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgJ05vbi1pbnRlZ2VyIHZhbHVlIGluIHZlcnNpb24gc3RyaW5nOiAnICsgdmVyc2lvblN0cmluZztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2ZXJzaW9uQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGdldEN4TWFqb3JWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcbiAgICByZXR1cm4gdmVyc2lvblN0cmluZyA/IGdldEN4VmVyc2lvbih2ZXJzaW9uU3RyaW5nKVswXSA6IDE7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIFxuICAgIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBcbiAgICBub2RlQXR0cmlidXRlVHlwZU1hcCwgXG4gICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgXG4gICAgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBcbiAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKSB7XG4gICAgY29uc29sZS5sb2coXCIgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IFwiICsgSlNPTi5zdHJpbmdpZnkoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIG51bGwsIDIpKTtcbiAgICBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucy5mb3JFYWNoKChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uKSA9PiB7XG4gICAgICAgIGlmIChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uWydub2RlcyddKSB7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uWydlZGdlcyddKSB7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAoYXR0cmlidXRlVHlwZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2QnXSkge1xuICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGVjbGFyYXRpb24uZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlTmFtZU1hcChhdHRyaWJ1dGVOYW1lTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsnYSddKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXR0cmlidXRlICcgKyBhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hICsgJyBzaG91bGQgYmUgcmVuYW1lZCB0byAnICsgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVOYW1lTWFwLnNldChhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hLCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAoYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsndiddKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXR0cmlidXRlICcgKyBhdHRyaWJ1dGVOYW1lICsgJyBoYXMgZGVmYXVsdCB2YWx1ZSAnICsgYXR0cmlidXRlRGVjbGFyYXRpb24udik7XG4gICAgICAgICAgICBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLnYpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUluZmVycmVkVHlwZXMoYXR0cmlidXRlVHlwZU1hcCwgYXR0cmlidXRlTmFtZU1hcCwgdikge1xuICAgIE9iamVjdC5rZXlzKHYpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZVR5cGVNYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdltrZXldO1xuICAgICAgICAgICAgY29uc3QgaW5mZXJyZWRUeXBlID0gdHlwZW9mIHZhbHVlO1xuICAgICAgICAgICAgY29uc3QgbmV3S2V5ID0gYXR0cmlidXRlTmFtZU1hcC5oYXMoa2V5KSA/IGF0dHJpYnV0ZU5hbWVNYXAuZ2V0KGtleSkgOiBrZXk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVUeXBlTWFwLnNldChuZXdLZXksIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBnZXRFeHBhbmRlZEF0dHJpYnV0ZXModiwgYXR0cmlidXRlTmFtZU1hcCwgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKSB7XG4gICAgbGV0IGRhdGEgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgbmV3S2V5ID0gYXR0cmlidXRlTmFtZU1hcC5oYXMoa2V5KSA/IGF0dHJpYnV0ZU5hbWVNYXAuZ2V0KGtleSkgOiBrZXk7XG4gICAgICAgIGRhdGFbbmV3S2V5XSA9IHZba2V5XTtcbiAgICB9KTtcbiAgICBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBpZiAoIWRhdGFba2V5XSkge1xuICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0Q3hWZXJzaW9uOiBnZXRDeFZlcnNpb24sXG4gICAgZ2V0Q3hNYWpvclZlcnNpb246IGdldEN4TWFqb3JWZXJzaW9uLFxuICAgIHByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IHByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgdXBkYXRlQXR0cmlidXRlVHlwZU1hcDogdXBkYXRlQXR0cmlidXRlVHlwZU1hcCxcbiAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwOiB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwLFxuICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcDogdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgIHVwZGF0ZUluZmVycmVkVHlwZXM6IHVwZGF0ZUluZmVycmVkVHlwZXMsXG4gICAgZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzIDogZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeFV0aWwuanMiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNvbnZlcnRlciA9IHJlcXVpcmUgKCcuL2NvbnZlcnRlci5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cy5jb252ZXJ0ID0gKGN4LCB0YXJnZXRGb3JtYXQpID0+IHsgcmV0dXJuIGNvbnZlcnRlci5jb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQpOyB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGxhcmdlTmV0d29yayA9IHJlcXVpcmUgKCcuL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmsuanMnKTsgXG5jb25zdCBjeXRvc2NhcGVKUyA9IHJlcXVpcmUgKCcuL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiB2ZXJpZnlWZXJzaW9uKGN4KSB7XG4gICAgY29uc3QgZmlyc3RFbGVtZW50ID0gY3hbMF07XG4gICAgY29uc3QgdmVyc2lvblN0cmluZyA9IGZpcnN0RWxlbWVudFtjeENvbnN0YW50cy5DWF9WRVJTSU9OXTtcblxuICAgIGNvbnN0IG1ham9yVmVyc2lvbiA9IGN4VXRpbC5nZXRDeE1ham9yVmVyc2lvbih2ZXJzaW9uU3RyaW5nKTtcblxuICAgIGlmIChtYWpvclZlcnNpb24gIT09IDIpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSBDWCB2ZXJzaW9uOiAnICsgdmVyc2lvblN0cmluZztcbiAgICB9XG59XG5cbmNvbnN0IGRlZmF1bHRDb252ZXJ0ZXJzID0gW1xuICAgIGxhcmdlTmV0d29yayxcbiAgICBjeXRvc2NhcGVKU1xuXTtcblxuZnVuY3Rpb24gY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0LCBjb252ZXJ0ZXJzID0gZGVmYXVsdENvbnZlcnRlcnMpIHtcbiAgICB2ZXJpZnlWZXJzaW9uKGN4KTtcbiAgICBsZXQgc2VsZWN0ZWRDb252ZXJ0ZXIgPSB1bmRlZmluZWQ7XG4gICAgXG4gICAgY29udmVydGVycy5mb3JFYWNoKCBjb252ZXJ0ZXIgPT4ge1xuICAgICAgICBpZiAoY29udmVydGVyLmNvbnZlcnRlci50YXJnZXRGb3JtYXQgPT0gdGFyZ2V0Rm9ybWF0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGFyZ2V0IGZvcm1hdDogJyArIGNvbnZlcnRlci5jb252ZXJ0ZXIudGFyZ2V0Rm9ybWF0KTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0ZWRDb252ZXJ0ZXIgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvbnZlcnRlciA9IGNvbnZlcnRlcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ2NvbnZlcnRlcnMgY29udGFpbiBtdWx0aXBsZSBlbnRyaWVzIGZvciB0YXJnZXQgZm9ybWF0OiAnICsgdGFyZ2V0Rm9ybWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIHNlbGVjdGVkQ29udmVydGVyID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93ICdubyBjb252ZXJ0ZXIgYXZhaWxhYmxlIGZvciB0YXJnZXQgZm9ybWF0OiAnICsgdGFyZ2V0Rm9ybWF0XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdGVkQ29udmVydGVyLmNvbnZlcnRlci5jb252ZXJ0KGN4KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0OiBjb252ZXJ0XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb252ZXJ0ZXIuanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGxhcmdlTmV0d29ya0NvbnN0YW50cyA9IHJlcXVpcmUoJy4vbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSkge1xuICAgIGNvbnN0IHRhcmdldFN0eWxlRW50cnkgPSB7fTtcbiAgICB0YXJnZXRTdHlsZUVudHJ5W3RhcmdldFN0eWxlRmllbGRdID0gcG9ydGFibGVQcm9wZXJ0VmFsdWU7XG4gICAgcmV0dXJuIHRhcmdldFN0eWxlRW50cnk7XG59XG5cbmZ1bmN0aW9uIGhleFRvUkdCKGhleCkge1xuICAgIGxldCByID0gMCwgZyA9IDAsIGIgPSAwO1xuXG4gICAgLy8gMyBkaWdpdHNcbiAgICBpZiAoaGV4Lmxlbmd0aCA9PSA0KSB7XG4gICAgICAgIHIgPSBcIjB4XCIgKyBoZXhbMV0gKyBoZXhbMV07XG4gICAgICAgIGcgPSBcIjB4XCIgKyBoZXhbMl0gKyBoZXhbMl07XG4gICAgICAgIGIgPSBcIjB4XCIgKyBoZXhbM10gKyBoZXhbM107XG5cbiAgICAgICAgLy8gNiBkaWdpdHNcbiAgICB9IGVsc2UgaWYgKGhleC5sZW5ndGggPT0gNykge1xuICAgICAgICByID0gXCIweFwiICsgaGV4WzFdICsgaGV4WzJdO1xuICAgICAgICBnID0gXCIweFwiICsgaGV4WzNdICsgaGV4WzRdO1xuICAgICAgICBiID0gXCIweFwiICsgaGV4WzVdICsgaGV4WzZdO1xuICAgIH1cblxuICAgIHJldHVybiBbcGFyc2VJbnQociksIHBhcnNlSW50KGcpLCBwYXJzZUludChiKV07XG59XG5cbmZ1bmN0aW9uIGFscGhhVG9JbnQoYWxwaGFEZWNpbWFsKSB7XG4gICAgcmV0dXJuIGNsYW1wKE1hdGgucm91bmQoYWxwaGFEZWNpbWFsICogMjU1KSwwLDI1NSk7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVXaWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVIZWlnaHQsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9MQUJFTF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0xBQkVMX0ZPTlRfU0laRScgOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbEZvbnRTaXplLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy53aWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NBbHBoYSwgYWxwaGFUb0ludChwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NDb2xvciwgaGV4VG9SR0IocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdFREdFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xBQkVMX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdFREdFX0xBQkVMX0ZPTlRfU0laRScgOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbEZvbnRTaXplLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfVxufVxuXG5cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlcyhkZWZhdWx0VmlzdWFsUHJvcGVydGllcykge1xuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIG5vZGU6IHt9LFxuICAgICAgICBlZGdlOiB7fVxuICAgIH07XG4gICAgaWYgKGRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzWydub2RlJ10pIHtcbiAgICAgICAgY29uc3Qgbm9kZURlZmF1bHQgPSBkZWZhdWx0VmlzdWFsUHJvcGVydGllcy5ub2RlO1xuICAgICAgICBjb25zdCBsbnZFbnRyaWVzID0gZ2V0TE5WVmFsdWVzKCdub2RlJywgbm9kZURlZmF1bHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dC5ub2RlLCBsbnZFbnRyaWVzKTtcbiAgICB9XG4gICAgaWYgKGRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzWydlZGdlJ10pIHtcbiAgICAgICAgY29uc3QgZWRnZURlZmF1bHQgPSBkZWZhdWx0VmlzdWFsUHJvcGVydGllcy5lZGdlO1xuICAgICAgICBjb25zdCBsbnZFbnRyaWVzID0gZ2V0TE5WVmFsdWVzKCdlZGdlJywgZWRnZURlZmF1bHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dC5lZGdlLCBsbnZFbnRyaWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0TE5WVmFsdWVzKGVudGl0eVR5cGUsIGVudHJpZXMpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgT2JqZWN0LmtleXMoZW50cmllcykuZm9yRWFjaChwb3J0YWJsZVByb3BlcnR5S2V5ID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gZW50cmllc1twb3J0YWJsZVByb3BlcnR5S2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGxudkVudHJ5ID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobG52RW50cnkpLmZvckVhY2gobG52S2V5ID0+IHtcbiAgICAgICAgICAgICAgICBvdXRwdXRbbG52S2V5XSA9IGxudkVudHJ5W2xudktleV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0NvbG9yKGNvbG9yQXJyYXksIGFscGhhKSB7XG4gICAgcmV0dXJuIGNvbG9yQXJyYXkgIT0gdW5kZWZpbmVkXG4gICAgICAgID8gYWxwaGEgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IFtjb2xvckFycmF5WzBdLCBjb2xvckFycmF5WzFdLCBjb2xvckFycmF5WzJdLCBhbHBoYV1cbiAgICAgICAgICAgIDogW2NvbG9yQXJyYXlbMF0sIGNvbG9yQXJyYXlbMV0sIGNvbG9yQXJyYXlbMl1dXG4gICAgICAgIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzU2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KHdpZHRoLCBoZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzTm9kZVZpZXcobm9kZVZpZXcpIHtcbiAgICBsZXQgd2lkdGggPSB1bmRlZmluZWQ7XG4gICAgbGV0IGhlaWdodCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgY29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgYWxwaGEgPSB1bmRlZmluZWQ7XG4gICAgXG4gICAgbGV0IGxhYmVsQ29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFiZWxBbHBoYSA9IHVuZGVmaW5lZDtcbiAgICBcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBpZDogbm9kZVZpZXcuaWQsXG4gICAgICAgIHBvc2l0aW9uOiBub2RlVmlldy5wb3NpdGlvblxuICAgIH07XG5cblxuICAgIE9iamVjdC5rZXlzKG5vZGVWaWV3KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTm9kZVdpZHRoKSB7XG4gICAgICAgICAgICB3aWR0aCA9IG5vZGVWaWV3LnByZXByb2Nlc3NOb2RlV2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVIZWlnaHQpIHtcbiAgICAgICAgICAgIGhlaWdodCA9IG5vZGVWaWV3LnByZXByb2Nlc3NOb2RlSGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NDb2xvcikge1xuICAgICAgICAgICAgY29sb3JBcnJheSA9IG5vZGVWaWV3LnByZXByb2Nlc3NDb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEpIHtcbiAgICAgICAgICAgIGFscGhhID0gbm9kZVZpZXcucHJlcHJvY2Vzc0FscGhhO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yKSB7XG4gICAgICAgICAgICBsYWJlbENvbG9yQXJyYXkgPSBub2RlVmlldy5wcmVwcm9jZXNzTGFiZWxDb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSkge1xuICAgICAgICAgICAgbGFiZWxBbHBoYSA9IG5vZGVWaWV3LnByZXByb2Nlc3NMYWJlbEFscGhhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBub2RlVmlld1trZXldO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2xvciA9IHByb2Nlc3NDb2xvcihjb2xvckFycmF5LCBhbHBoYSk7XG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuY29sb3JdID0gY29sb3I7XG4gICAgfVxuXG4gICAgY29uc3QgbGFiZWxDb2xvciA9IHByb2Nlc3NDb2xvcihsYWJlbENvbG9yQXJyYXksIGxhYmVsQWxwaGEpO1xuICAgIGlmIChsYWJlbENvbG9yKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxDb2xvcl0gPSBsYWJlbENvbG9yO1xuICAgIH1cblxuICAgIGNvbnN0IHNpemUgPSBwcm9jZXNzU2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICBpZiAoc2l6ZSkge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnNpemVdID0gcHJvY2Vzc1NpemUod2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NFZGdlVmlldyhlZGdlVmlldykge1xuICAgIGxldCBjb2xvckFycmF5ID0gdW5kZWZpbmVkO1xuICAgIGxldCBhbHBoYSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBsYWJlbENvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGxhYmVsQWxwaGEgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBpZDogZWRnZVZpZXcuaWQsXG4gICAgICAgIHM6IGVkZ2VWaWV3LnMsXG4gICAgICAgIHQ6IGVkZ2VWaWV3LnRcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhlZGdlVmlldykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yKSB7XG4gICAgICAgICAgICBjb2xvckFycmF5ID0gZWRnZVZpZXcucHJlcHJvY2Vzc0NvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NBbHBoYSkge1xuICAgICAgICAgICAgYWxwaGEgPSBlZGdlVmlldy5wcmVwcm9jZXNzQWxwaGE7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IpIHtcbiAgICAgICAgICAgIGxhYmVsQ29sb3JBcnJheSA9IGVkZ2VWaWV3LnByZXByb2Nlc3NMYWJlbENvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhKSB7XG4gICAgICAgICAgICBsYWJlbEFscGhhID0gZWRnZVZpZXcucHJlcHJvY2Vzc0xhYmVsQWxwaGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRwdXRba2V5XSA9IGVkZ2VWaWV3W2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbG9yID0gcHJvY2Vzc0NvbG9yKGNvbG9yQXJyYXksIGFscGhhKTtcbiAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5jb2xvcl0gPSBjb2xvcjtcbiAgICB9XG5cbiAgICBjb25zdCBsYWJlbENvbG9yID0gcHJvY2Vzc0NvbG9yKGxhYmVsQ29sb3JBcnJheSwgbGFiZWxBbHBoYSk7XG4gICAgaWYgKGxhYmVsQ29sb3IpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbENvbG9yXSA9IGxhYmVsQ29sb3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0TWFwcGluZ3MobWFwcGluZ3MpIHtcbiAgICBsZXQgb3V0cHV0ID0ge31cbiAgICBPYmplY3Qua2V5cyhtYXBwaW5ncykuZm9yRWFjaChwcm9wZXJ0eUtleSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcHBpbmcgPSBtYXBwaW5nc1twcm9wZXJ0eUtleV07XG4gICAgICAgIG91dHB1dFttYXBwaW5nLmRlZmluaXRpb24uYXR0cmlidXRlXSA9IHtcbiAgICAgICAgICAgIHR5cGU6IG1hcHBpbmcudHlwZSxcbiAgICAgICAgICAgIHZwOiBwcm9wZXJ0eUtleSxcbiAgICAgICAgICAgIGRlZmluaXRpb246IG1hcHBpbmcuZGVmaW5pdGlvblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGVSYXRpbyhhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgpIHtcbiAgICByZXR1cm4gYXR0cmlidXRlVmFsdWUgLyAoYXR0cmlidXRlTWF4IC0gYXR0cmlidXRlTWluKTtcbn1cblxuZnVuY3Rpb24gZ2V0VnBSYW5nZSh2cE1pbiwgdnBNYXgpIHtcbiAgICByZXR1cm4gdnBNYXggLSB2cE1pbjtcbn1cblxuZnVuY3Rpb24gZ2V0TWFwKHZwTWluLCB2cFJhbmdlLCBhdHRyaWJ1dGVSYXRpbykge1xuICAgIHJldHVybiB2cE1pbiArIHZwUmFuZ2UgKiBhdHRyaWJ1dGVSYXRpbztcbn1cblxuZnVuY3Rpb24gY2xhbXAodmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbHVlLCBtaW4pLCBtYXgpO1xuICB9XG5cbmZ1bmN0aW9uIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVSYXRpbyA9IGdldEF0dHJpYnV0ZVJhdGlvKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCk7XG4gICAgY29uc3QgdnBSYW5nZSA9Z2V0VnBSYW5nZSh2cE1pbiwgdnBNYXgpO1xuXG4gICAgY29uc3Qgb3V0cHV0ID0gZ2V0TWFwKHZwTWluLCB2cFJhbmdlLCBhdHRyaWJ1dGVSYXRpbyk7XG4gICBcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpIHtcbiAgICBjb25zdCBtaW5SR0IgPSBoZXhUb1JHQih2cE1pbik7XG4gICAgY29uc3QgbWF4UkdCID0gaGV4VG9SR0IodnBNYXgpO1xuXG4gICAgY29uc3QgYXR0cmlidXRlUmF0aW8gPSBnZXRBdHRyaWJ1dGVSYXRpbyhhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgpO1xuICAgIFxuICAgIGNvbnN0IHJSYW5nZSA9IGdldFZwUmFuZ2UobWluUkdCWzBdLCBtYXhSR0JbMV0pO1xuICAgIGNvbnN0IGdSYW5nZSA9IGdldFZwUmFuZ2UobWluUkdCWzFdLCBtYXhSR0JbMV0pO1xuICAgIGNvbnN0IGJSYW5nZSA9IGdldFZwUmFuZ2UobWluUkdCWzJdLCBtYXhSR0JbMl0pO1xuXG4gICAgY29uc3Qgb3V0cHV0ID0gW1xuICAgICAgICBjbGFtcChNYXRoLnJvdW5kKGdldE1hcChtaW5SR0JbMF0sIHJSYW5nZSwgYXR0cmlidXRlUmF0aW8pKSwgMCwgMjU1KSxcbiAgICAgICAgY2xhbXAoTWF0aC5yb3VuZChnZXRNYXAobWluUkdCWzFdLCBnUmFuZ2UsIGF0dHJpYnV0ZVJhdGlvKSksIDAsIDI1NSksXG4gICAgICAgIGNsYW1wKE1hdGgucm91bmQoZ2V0TWFwKG1pblJHQlsyXSwgYlJhbmdlLCBhdHRyaWJ1dGVSYXRpbykpLCAwLCAyNTUpXG4gICAgXVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZVJhdGlvID0gZ2V0QXR0cmlidXRlUmF0aW8oYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4KTtcbiAgICBjb25zdCB2cFJhbmdlID1nZXRWcFJhbmdlKHZwTWluLCB2cE1heCk7XG5cbiAgICBjb25zdCBhbHBoYURlY2ltYWwgPSBnZXRNYXAodnBNaW4sIHZwUmFuZ2UsIGF0dHJpYnV0ZVJhdGlvKTtcbiAgIFxuICAgIGNvbnNvbGUubG9nKFwiYWxwaGFEZWNpbWFsID0gXCIgKyBhbHBoYURlY2ltYWwpO1xuXG4gICAgcmV0dXJuIGFscGhhVG9JbnQoYWxwaGFEZWNpbWFsKTtcbn1cblxuY29uc3QgY29udGludW91c1Byb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfV0lEVEgnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlV2lkdGgsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTm9kZUhlaWdodCwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NBbHBoYSwgY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvciwgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhLCBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbEZvbnRTaXplLCBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMud2lkdGgsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhLCBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yLCBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yLCBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEsIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsRm9udFNpemUsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNJblJhbmdlKGF0dHJpYnV0ZVZhbHVlLCBtaW4sIG1heCwgaW5jbHVkZU1pbiwgaW5jbHVkZU1heCkgeyBcbiAgICBjb25zdCBtaW5TYXRpc2ZpZWQgPSBpbmNsdWRlTWluID8gbWluIDw9IGF0dHJpYnV0ZVZhbHVlIDogbWluIDwgYXR0cmlidXRlVmFsdWU7XG4gICAgY29uc3QgbWF4U2F0aXNmaWVkID0gaW5jbHVkZU1heCA/IG1heCA+PSBhdHRyaWJ1dGVWYWx1ZSA6IG1heCA+IGF0dHJpYnV0ZVZhbHVlO1xuICAgIGNvbnNvbGUubG9nKCdpc0luUmFuZ2U6ICcgKyBhdHRyaWJ1dGVWYWx1ZSArICcgJyArIG1pbiArICcgJyArIG1heCArICcgJyArIGluY2x1ZGVNaW4gKyAnICcgKyBpbmNsdWRlTWF4ICsgJyAnICsgbWluU2F0aXNmaWVkICsgJyAnICsgbWF4U2F0aXNmaWVkKTtcbiAgICByZXR1cm4gbWluU2F0aXNmaWVkICYmIG1heFNhdGlzZmllZDsgICBcbn1cblxuZnVuY3Rpb24gZ2V0TWFwcHBlZFZhbHVlcyhtYXBwaW5ncywgZW50aXR5VHlwZSwgYXR0cmlidXRlcykge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHJpYnV0ZUtleSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZVZhbHVlID0gYXR0cmlidXRlc1thdHRyaWJ1dGVLZXldO1xuICAgICAgICBpZiAobWFwcGluZ3NbZW50aXR5VHlwZV1bYXR0cmlidXRlS2V5XSkge1xuICAgICAgICAgICAgY29uc3QgbWFwcGluZyA9IG1hcHBpbmdzW2VudGl0eVR5cGVdW2F0dHJpYnV0ZUtleV07XG4gICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChtYXBwaW5nLnR5cGUgPT09ICdESVNDUkVURScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzY3JldGVNYXAgPSBtYXBwaW5nLmRlZmluaXRpb24ubWFwO1xuICAgICAgICAgICAgICAgICAgICBkaXNjcmV0ZU1hcC5mb3JFYWNoKGtleVZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXlWYWx1ZS52ID09IGF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKGtleVZhbHVlLnZwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIGNvbnZlcnRlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hcHBpbmcudHlwZSA9PT0gJ1BBU1NUSFJPVUdIJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKGF0dHJpYnV0ZVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0LCBjb252ZXJ0ZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXBwaW5nLnR5cGUgPT09ICdDT05USU5VT1VTJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250aW51b3VzTWFwcGluZ3MgPSBtYXBwaW5nLmRlZmluaXRpb24ubWFwO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51b3VzTWFwcGluZ3MuZm9yRWFjaChtYXBwaW5nUmFuZ2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCdtaW4nIGluIG1hcHBpbmdSYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmICdtYXgnIGluIG1hcHBpbmdSYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmICdpbmNsdWRlTWluJyBpbiBtYXBwaW5nUmFuZ2UgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgJ2luY2x1ZGVNYXgnIGluIG1hcHBpbmdSYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0luUmFuZ2UoYXR0cmlidXRlVmFsdWUsIG1hcHBpbmdSYW5nZS5taW4sIG1hcHBpbmdSYW5nZS5tYXgsIG1hcHBpbmdSYW5nZS5pbmNsdWRlTWluLCBtYXBwaW5nUmFuZ2UuaW5jbHVkZU1heClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGNvbnRpbnVvdXNQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGNvbnRpbnVvdXNQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0oYXR0cmlidXRlVmFsdWUsIG1hcHBpbmdSYW5nZS5taW4sIG1hcHBpbmdSYW5nZS5tYXgsIG1hcHBpbmdSYW5nZS5taW5WUFZhbHVlLCBtYXBwaW5nUmFuZ2UubWF4VlBWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgY29udmVydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBsbnZDb252ZXJ0KGN4KSB7XG5cbiAgICAvL0ZpcnN0IHBhc3MuIFxuICAgIC8vIFdlIG1heSBuZWVkIHRvIGNvbGxlY3Qgb2JqZWN0IGF0dHJpYnV0ZXMgdG8gY2FsY3VsYXRlXG4gICAgLy8gbWFwcGluZ3MgaW4gdGhlIHNlY29uZCBwYXNzLiBcblxuICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXM7XG5cbiAgICBsZXQgbm9kZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IG5vZGVBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IGRlZmF1bHRWYWx1ZXMgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG1hcHBpbmdzID0ge1xuICAgICAgICBub2RlOiB7fSxcbiAgICAgICAgZWRnZToge31cbiAgICB9XG4gICAgbGV0IGJ5cGFzc01hcHBpbmdzID0ge1xuICAgICAgICAnbm9kZSc6IHt9LFxuICAgICAgICAnZWRnZSc6IHt9XG4gICAgfTtcblxuICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgIGlmIChjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddO1xuICAgICAgICAgICAgY3hVdGlsLnByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hOb2RlWyd2J10pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhlZGdlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGN4RWRnZVsndiddKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXSkge1xuICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IG91dHB1dCA9IHt9O1xuXG4gICAgbGV0IG5vZGVWaWV3cyA9IFtdO1xuICAgIGxldCBlZGdlVmlld3MgPSBbXTtcblxuICAgIGN4VmlzdWFsUHJvcGVydGllcy5mb3JFYWNoKHZwRWxlbWVudCA9PiB7XG4gICAgICAgIGNvbnN0IHZwQXQgPSB2cEVsZW1lbnQuYXQ7XG4gICAgICAgIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5TVFlMRSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2cEVsZW1lbnQudjtcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZXMgPSB2YWx1ZS5kZWZhdWx0O1xuXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWVzID0gZ2V0RGVmYXVsdFZhbHVlcyhkZWZhdWx0U3R5bGVzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbWFwcGluZ3Mubm9kZSA9IHZhbHVlLm5vZGVNYXBwaW5nID8gZ2V0TWFwcGluZ3ModmFsdWUubm9kZU1hcHBpbmcpIDoge307XG4gICAgICAgICAgICBtYXBwaW5ncy5lZGdlID0gdmFsdWUuZWRnZU1hcHBpbmcgPyBnZXRNYXBwaW5ncyh2YWx1ZS5lZGdlTWFwcGluZykgOiB7fTtcbiAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSBpZiAodnBBdCA9PT0gY3hDb25zdGFudHMuTikge1xuXG4gICAgICAgICAgICBjb25zdCBrZXkgPSB2cEVsZW1lbnRbY3hDb25zdGFudHMuUE9dLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBnZXRMTlZWYWx1ZXMoJ25vZGUnLCB2cEVsZW1lbnQudilcblxuICAgICAgICAgICAgaWYgKCFieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0pIHtcbiAgICAgICAgICAgICAgICBieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0gPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J5cGFzcyBjYWxjdWxhdGVkOiAnICsgSlNPTi5zdHJpbmdpZnkodmFsdWVzLCBudWxsLCAyKSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYnlwYXNzTWFwcGluZ3Mubm9kZVtrZXldLCB2YWx1ZXMpO1xuICAgICAgICAgICAgLy9ieXBhc3NDU1NFbnRyaWVzLnB1c2goZ2V0QnlwYXNzQ1NTRW50cnkoJ25vZGUnLCB2cEVsZW1lbnQpKTtcbiAgICAgICAgfSBlbHNlIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5FKSB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSB2cEVsZW1lbnRbY3hDb25zdGFudHMuUE9dLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBnZXRMTlZWYWx1ZXMoJ2VkZ2UnLCB2cEVsZW1lbnQudilcblxuICAgICAgICAgICAgaWYgKCFieXBhc3NNYXBwaW5ncy5lZGdlW2tleV0pIHtcbiAgICAgICAgICAgICAgICBieXBhc3NNYXBwaW5ncy5lZGdlW2tleV0gPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J5cGFzcyBjYWxjdWxhdGVkOiAnICsgSlNPTi5zdHJpbmdpZnkodmFsdWVzLCBudWxsLCAyKSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYnlwYXNzTWFwcGluZ3MuZWRnZVtrZXldLCB2YWx1ZXMpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZygnbWFwcGluZ3M6ICcgKyBKU09OLnN0cmluZ2lmeShtYXBwaW5ncywgbnVsbCwgMikpO1xuXG4gICAgLy9TZWNvbmQgcGFzcy4gXG4gICAgLy8gSGVyZSBpcyB3aGVyZSB0aGUgYWN0dWFsIG91dHB1dCBpcyBnZW5lcmF0ZWQuXG5cbiAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcblxuXG4gICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeE5vZGVbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGVWaWV3ID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogY3hJZCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGN4Tm9kZVsneiddID9cbiAgICAgICAgICAgICAgICAgICAgICAgIFtjeE5vZGVbJ3gnXSwgY3hOb2RlWyd5J10sIGN4Tm9kZVsneiddXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBbY3hOb2RlWyd4J10sIGN4Tm9kZVsneSddXVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vVE9ETyBjYWxjdWxhdGUgbG52IHZwcyBiYXNlZCBvbiBkZWZhdWx0cyBhbmQgYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHROb2RlVmlzdWFsUHJvcGVydGllcyA9IGRlZmF1bHRWYWx1ZXNbJ25vZGUnXTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlVmlldywgZGVmYXVsdE5vZGVWaXN1YWxQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9Bc3NpZ24gbWFwcGluZ3NcbiAgICAgICAgICAgICAgICBjb25zdCBleHBhbmRlZEF0dHJpYnV0ZXMgPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4Tm9kZVsndiddLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFwcGluZ1ZhbHVlcyA9IGdldE1hcHBwZWRWYWx1ZXMobWFwcGluZ3MsICdub2RlJywgZXhwYW5kZWRBdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG5vZGVWaWV3LCBtYXBwaW5nVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgIC8vQXNzaWduIGJ5cGFzc1xuICAgICAgICAgICAgICAgIGlmIChieXBhc3NNYXBwaW5ncy5ub2RlW2N4SWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obm9kZVZpZXcsIGJ5cGFzc01hcHBpbmdzLm5vZGVbY3hJZF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZE5vZGVWaWV3ID0gcHJvY2Vzc05vZGVWaWV3KG5vZGVWaWV3KTtcblxuICAgICAgICAgICAgICAgIG5vZGVWaWV3cy5wdXNoKHByb2Nlc3NlZE5vZGVWaWV3KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcblxuICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hFZGdlW2N4Q29uc3RhbnRzLklEXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVkZ2VWaWV3ID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogY3hJZCxcbiAgICAgICAgICAgICAgICAgICAgczogY3hFZGdlLnMudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgdDogY3hFZGdlLnQudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vVE9ETyBjYWxjdWxhdGUgbG52IHZwcyBiYXNlZCBvbiBkZWZhdWx0cyBhbmQgYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRFZGdlVmlzdWFsUHJvcGVydGllcyA9IGRlZmF1bHRWYWx1ZXNbJ2VkZ2UnXTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlZGdlVmlldywgZGVmYXVsdEVkZ2VWaXN1YWxQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBleHBhbmRlZEF0dHJpYnV0ZXMgPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4RWRnZVsndiddLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFwcGluZ1ZhbHVlcyA9IGdldE1hcHBwZWRWYWx1ZXMobWFwcGluZ3MsICdub2RlJywgZXhwYW5kZWRBdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBtYXBwaW5nVmFsdWVzKTtcbiAgICAgICAgICAgICAgICAvL0Fzc2lnbiBieXBhc3NcbiAgICAgICAgICAgICAgICBpZiAoYnlwYXNzTWFwcGluZ3MuZWRnZVtjeElkXSkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBieXBhc3NNYXBwaW5ncy5lZGdlW2N4SWRdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRFZGdlVmlldyA9IHByb2Nlc3NFZGdlVmlldyhlZGdlVmlldyk7XG5cbiAgICAgICAgICAgICAgICBlZGdlVmlld3MucHVzaChwcm9jZXNzZWRFZGdlVmlldyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5ub2RlVmlld3NdID0gbm9kZVZpZXdzO1xuICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuZWRnZVZpZXdzXSA9IGVkZ2VWaWV3cztcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdsbnYnLFxuICAgIGNvbnZlcnQ6IChjeCkgPT4ge1xuICAgICAgICByZXR1cm4gbG52Q29udmVydChjeCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0IDogc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCxcbiAgICBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0IDogY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydCxcbiAgICBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQgOiBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQsXG4gICAgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0IDogY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0LFxuICAgIHByb2Nlc3NOb2RlVmlldzogcHJvY2Vzc05vZGVWaWV3LFxuICAgIHByb2Nlc3NFZGdlVmlldzogcHJvY2Vzc0VkZ2VWaWV3LFxuICAgIGdldERlZmF1bHRWYWx1ZXM6IGdldERlZmF1bHRWYWx1ZXMsXG4gICAgaXNJblJhbmdlOiBpc0luUmFuZ2UsXG4gICAgY29udmVydGVyOiBjb252ZXJ0ZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmsuanMiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgJ25vZGVWaWV3cyc6ICdub2RlVmlld3MnLFxuICAgICdlZGdlVmlld3MnOiAnZWRnZVZpZXdzJywgXG4gICAgJ2lkJzogJ2lkJyxcbiAgICAncG9zaXRpb24nOiAncG9zaXRpb24nLFxuICAgICdzJzogJ3MnLFxuICAgICd0JzogJ3QnLFxuICAgICdsYWJlbCc6ICdsYWJlbCcsIFxuICAgICdsYWJlbENvbG9yJyA6ICdsYWJlbENvbG9yJyxcbiAgICAnbGFiZWxGb250U2l6ZScgOiAnbGFiZWxGb250U2l6ZScsXG4gICAgJ2NvbG9yJzogJ2NvbG9yJyxcbiAgICAnc2l6ZScgOiAnc2l6ZScsXG4gICAgJ3dpZHRoJyA6ICd3aWR0aCcsXG5cbiAgICAncHJlcHJvY2Vzc0NvbG9yJzogJ3ByZXByb2Nlc3NDb2xvcicsXG4gICAgJ3ByZXByb2Nlc3NBbHBoYSc6ICdwcmVwcm9jZXNzQWxwaGEnLFxuICAgICdwcmVwcm9jZXNzTGFiZWxDb2xvcic6ICdwcmVwcm9jZXNzTGFiZWxDb2xvcicsXG4gICAgJ3ByZXByb2Nlc3NMYWJlbEFscGhhJzogJ3ByZXByb2Nlc3NMYWJlbEFscGhhJyxcbiAgICAncHJlcHJvY2Vzc05vZGVXaWR0aCcgOiAncHJlcHJvY2Vzc05vZGVXaWR0aCcsXG4gICAgJ3ByZXByb2Nlc3NOb2RlSGVpZ2h0JyA6ICdwcmVwcm9jZXNzTm9kZUhlaWdodCdcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBqc0NvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3l0b3NjYXBlSlNDb25zdGFudHMuanMnKTtcbmNvbnN0IGN4VXRpbCA9IHJlcXVpcmUoJy4uL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKSB7XG4gICAgY29uc3QgdGFyZ2V0U3R5bGVFbnRyeSA9IG5ldyBNYXAoKTtcbiAgICB0YXJnZXRTdHlsZUVudHJ5LnNldCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSk7XG4gICAgcmV0dXJuIHRhcmdldFN0eWxlRW50cnk7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfTEFCRUwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG59XG5cbmZ1bmN0aW9uIHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgYXR0cmlidXRlTmFtZSkge1xuICAgIGNvbnN0IG91dHB1dCA9IHt9O1xuICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9ICdkYXRhKCcgKyBhdHRyaWJ1dGVOYW1lICsgJyknO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuc2hhcGUsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9XSURUSCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfY29sb3IsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgYXR0cmlidXRlTmFtZSlcbiAgICB9LFxufVxuZnVuY3Rpb24gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBvdXRwdXRbdGFyZ2V0U3R5bGVGaWVsZF0gPSAnbWFwRGF0YSgnICsgYXR0cmlidXRlTmFtZVxuICAgICAgICArICcsICcgKyBtaW5WYWx1ZVxuICAgICAgICArICcsICcgKyBtYXhWYWx1ZVxuICAgICAgICArICcsICcgKyBtaW5WUFxuICAgICAgICArICcsICcgKyBtYXhWUFxuICAgICAgICArICcpJztcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBtYXBEYXRhUHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9TSEFQRSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9XSURUSCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUClcblxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKVxuICAgIH0sXG59XG5cblxuZnVuY3Rpb24gZ2V0Q1NTU3R5bGVFbnRyaWVzKGN4U3R5bGVFbnRyaWVzLCBlbnRpdHlUeXBlKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4U3R5bGVFbnRyaWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gY3hTdHlsZUVudHJpZXNba2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgY3NzRW50cmllcyA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgY3NzRW50cmllcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0SWRTZWxlY3RvcihpZCwgZWxlbWVudFR5cGUpIHtcbiAgICAvL25vZGUjaWQgb3IgZWRnZSNpZFxuICAgIHJldHVybiBlbGVtZW50VHlwZSArICcjJyArIGlkO1xufVxuXG5cblxuZnVuY3Rpb24gZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpIHtcbiAgICByZXR1cm4geyAnc2VsZWN0b3InOiBzZWxlY3RvciwgJ3N0eWxlJzogY3NzIH07XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIGluY2x1ZGVNaW4sIGluY2x1ZGVNYXgpIHtcbiAgICBjb25zdCBtaW5Db25kaXRpb24gPSBpbmNsdWRlTWluID8gJz49JyA6ICc+JztcbiAgICBjb25zdCBtYXhDb25kaXRpb24gPSBpbmNsdWRlTWF4ID8gJzw9JyA6ICc8JztcblxuICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICcgJyArIG1pbkNvbmRpdGlvbiArICcgJyArIG1pblZhbHVlICsgJ11bJyArIGF0dHJpYnV0ZU5hbWUgKyAnICcgKyBtYXhDb25kaXRpb24gKyAnICcgKyBtYXhWYWx1ZSArICddJ1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzU3R5bGUoZW50aXR5VHlwZSwgcG9ydGFibGVQcm9wZXJ0eUtleSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgaWYgKG1hcERhdGFQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgcmV0dXJuIG1hcERhdGFQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnYXR0cmlidXRlJ107XG4gICAgY29uc3QgcmFuZ2VNYXBzID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgY29uc29sZS5sb2coJ2NvbnRpbnVvdXMgbWFwcGluZyBmb3IgJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgSlNPTi5zdHJpbmdpZnkocmFuZ2VNYXBzLCBudWxsLCAyKSk7XG5cbiAgICByYW5nZU1hcHMuZm9yRWFjaCgocmFuZ2UpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRDb250aW51b3VzU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIHJhbmdlLmluY2x1ZGVNaW4sIHJhbmdlLmluY2x1ZGVNYXgpO1xuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbnRpbnVvdXNTdHlsZShlbnRpdHlUeXBlLCBwb3J0YWJsZVByb3BlcnR5S2V5LCBhdHRyaWJ1dGVOYW1lLCByYW5nZS5taW4sIHJhbmdlLm1heCwgcmFuZ2UubWluVlBWYWx1ZSwgcmFuZ2UubWF4VlBWYWx1ZSk7XG5cbiAgICAgICAgb3V0cHV0LnB1c2goZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBzdHlsZSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUpIHtcbiAgICBpZiAocGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICBjb25zdCBjc3MgPSBwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGN4TWFwcGluZ0RlZmluaXRpb24uYXR0cmlidXRlKTtcbiAgICAgICAgcmV0dXJuIGdldFN0eWxlRWxlbWVudChlbnRpdHlUeXBlLCBjc3MpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEYXRhVHlwZSwgYXR0cmlidXRlVmFsdWUpIHtcbiAgICBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyA9IFxcJycgKyBhdHRyaWJ1dGVWYWx1ZSArICdcXCddJztcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZURhdGFUeXBlID09ICdib29sZWFuJykge1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVWYWx1ZSA9PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1s/JyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnXVshJyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gJyArIGF0dHJpYnV0ZVZhbHVlICsgJ10nO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyhwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIGNvbnN0IGF0dHRyaWJ1dGVUb1ZhbHVlTWFwID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ2F0dHJpYnV0ZSddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZURhdGFUeXBlID0gYXR0cmlidXRlVHlwZU1hcC5nZXQoYXR0cmlidXRlTmFtZSk7XG4gICAgYXR0dHJpYnV0ZVRvVmFsdWVNYXAuZm9yRWFjaCgoZGlzY3JldGVNYXApID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJyBkaXNjcmV0ZSBtYXAgZm9yICcgKyBwb3J0YWJsZVByb3BlcnR5S2V5ICsgJzogJyArIGRpc2NyZXRlTWFwLnYgKyAnICgnICsgYXR0cmlidXRlTmFtZSArICc8JyArIGF0dHJpYnV0ZURhdGFUeXBlICsgJz4pIC0+ICcgKyBkaXNjcmV0ZU1hcC52cCk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXREaXNjcmV0ZVNlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURhdGFUeXBlLCBkaXNjcmV0ZU1hcC52KTtcblxuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGRpc2NyZXRlTWFwLnZwKTtcbiAgICAgICAgICAgIGNvbnN0IGNzcyA9IHt9O1xuICAgICAgICAgICAgc3R5bGVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGNzc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcgICBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGNzcykpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIHJldHVybiBvdXRwdXQ7IC8vZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpO1xufVxuXG5mdW5jdGlvbiBnZXRCeXBhc3NDU1NFbnRyeShlbnRpdHlUeXBlLCBjeEVsZW1lbnQpIHtcblxuICAgIGNvbnN0IGlkID0gY3hFbGVtZW50LmlkO1xuICAgIGNvbnN0IGNzcyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4RWxlbWVudC52KS5mb3JFYWNoKChwb3J0YWJsZVByb3BlcnR5S2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGN4RWxlbWVudC52W3BvcnRhYmxlUHJvcGVydHlLZXldO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICBzdHlsZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY3NzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWxlY3RvciA9IGdldElkU2VsZWN0b3IoaWQsIGVudGl0eVR5cGUpO1xuICAgIHJldHVybiBnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcyk7XG59XG5cbi8qKiBcbiAqIFxuKi9cbmZ1bmN0aW9uIGdldENTU01hcHBpbmdFbnRyaWVzKFxuICAgIGN4TWFwcGluZ0VudHJpZXMsXG4gICAgZW50aXR5VHlwZSxcbiAgICBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGN4TWFwcGluZ0VudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBjeE1hcHBpbmdFbnRyeSA9IGN4TWFwcGluZ0VudHJpZXNba2V5XTtcbiAgICAgICAgY29uc29sZS5sb2coXCIgbWFwcGluZyB0eXBlOiBcIiArIGN4TWFwcGluZ0VudHJ5LnR5cGUpO1xuICAgICAgICBzd2l0Y2ggKGN4TWFwcGluZ0VudHJ5LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0NPTlRJTlVPVVMnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGlub3VzTWFwcGluZ3MgPSBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKTtcbiAgICAgICAgICAgICAgICBjb250aW5vdXNNYXBwaW5ncy5mb3JFYWNoKChjb250aW5vdXNNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGNvbnRpbm91c01hcHBpbmcpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdQQVNTVEhST1VHSCc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjc3NFbnRyeSA9IGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNzc0VudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGNzc0VudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdESVNDUkVURSc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNjcmV0ZU1hcHBpbmdzID0gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyhrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApO1xuICAgICAgICAgICAgICAgIGRpc2NyZXRlTWFwcGluZ3MuZm9yRWFjaCgoZGlzY3JldGVNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGRpc2NyZXRlTWFwcGluZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IE5PREVfU0VMRUNUT1IgPSAnbm9kZSc7XG5jb25zdCBFREdFX1NFTEVDVE9SID0gJ2VkZ2UnO1xuXG5mdW5jdGlvbiBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgY3hOb2RlQnlwYXNzZXMsIGN4RWRnZUJ5cGFzc2VzLCBub2RlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBzdHlsZTogW10sXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgbGV0IGRlZmF1bHRDU1NOb2RlU3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGRlZmF1bHRDU1NFZGdlU3R5bGUgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgY3NzTmV0d29ya0JhY2tncm91bmRDb2xvciA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBtYXBwaW5nQ1NTTm9kZVN0eWxlID0gdW5kZWZpbmVkO1xuICAgIGxldCBtYXBwaW5nQ1NTRWRnZVN0eWxlID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGJ5cGFzc0NTU0VudHJpZXMgPSBbXTtcblxuICAgIGN4VmlzdWFsUHJvcGVydGllcy5mb3JFYWNoKCh2cEVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFN0eWxlcyA9IHZwRWxlbWVudC5kZWZhdWx0O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdwb3J0YWJsZSBub2RlIHN0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkoZGVmYXVsdFN0eWxlcy5ub2RlKSk7XG4gICAgICAgIGRlZmF1bHRDU1NOb2RlU3R5bGUgPSBnZXRDU1NTdHlsZUVudHJpZXMoZGVmYXVsdFN0eWxlcy5ub2RlLCAnbm9kZScpO1xuICAgICAgICBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gZ2V0Q1NTU3R5bGVFbnRyaWVzKGRlZmF1bHRTdHlsZXMuZWRnZSwgJ2VkZ2UnKTtcblxuICAgICAgICBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gZGVmYXVsdFN0eWxlcy5uZXR3b3JrWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgY29uc3Qgbm9kZU1hcHBpbmcgPSB2cEVsZW1lbnQubm9kZU1hcHBpbmc7XG4gICAgICAgIG1hcHBpbmdDU1NOb2RlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhub2RlTWFwcGluZywgJ25vZGUnLCBub2RlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgY29uc3QgZWRnZU1hcHBpbmcgPSB2cEVsZW1lbnQuZWRnZU1hcHBpbmc7XG4gICAgICAgIG1hcHBpbmdDU1NFZGdlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhlZGdlTWFwcGluZywgJ2VkZ2UnLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICB9KVxuICAgIGN4Tm9kZUJ5cGFzc2VzLmZvckVhY2goKHZwRWxlbWVudCkgPT4ge1xuICAgICAgIFxuICAgICAgICBieXBhc3NDU1NFbnRyaWVzLnB1c2goZ2V0QnlwYXNzQ1NTRW50cnkoJ25vZGUnLCB2cEVsZW1lbnQpKTtcbiAgICB9KTtcblxuICAgIGN4RWRnZUJ5cGFzc2VzLmZvckVhY2goKHZwRWxlbWVudCkgPT4ge1xuICAgICAgICBieXBhc3NDU1NFbnRyaWVzLnB1c2goZ2V0QnlwYXNzQ1NTRW50cnkoJ2VkZ2UnLCB2cEVsZW1lbnQpKTtcbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKCdkZWZhdWx0IG5vZGUgc3R5bGU6ICcgKyBKU09OLnN0cmluZ2lmeShkZWZhdWx0Q1NTTm9kZVN0eWxlKSk7XG5cbiAgICAvL0FkZCBkZWZhdWx0IHN0eWxlXG4gICAgb3V0cHV0LnN0eWxlLnB1c2goZ2V0U3R5bGVFbGVtZW50KE5PREVfU0VMRUNUT1IsIGRlZmF1bHRDU1NOb2RlU3R5bGUpKTtcbiAgICBvdXRwdXQuc3R5bGUucHVzaChnZXRTdHlsZUVsZW1lbnQoRURHRV9TRUxFQ1RPUiwgZGVmYXVsdENTU0VkZ2VTdHlsZSkpO1xuXG4gICAgb3V0cHV0LnN0eWxlLnB1c2guYXBwbHkob3V0cHV0LnN0eWxlLCBtYXBwaW5nQ1NTTm9kZVN0eWxlKTtcbiAgICBvdXRwdXQuc3R5bGUucHVzaC5hcHBseShvdXRwdXQuc3R5bGUsIG1hcHBpbmdDU1NFZGdlU3R5bGUpO1xuXG4gICAgb3V0cHV0LnN0eWxlLnB1c2guYXBwbHkob3V0cHV0LnN0eWxlLCBieXBhc3NDU1NFbnRyaWVzKTtcblxuICAgIG91dHB1dFsnYmFja2dyb3VuZC1jb2xvciddID0gY3NzTmV0d29ya0JhY2tncm91bmRDb2xvcjtcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdjeXRvc2NhcGVKUycsXG4gICAgY29udmVydDogKGN4KSA9PiB7XG4gICAgICAgIGNvbnN0IG91dHB1dCA9IHtcbiAgICAgICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiB7fSxcbiAgICAgICAgICAgIGxheW91dDoge30sXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBjeE5vZGVCeXBhc3NlcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGN4RWRnZUJ5cGFzc2VzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgICAgICAgICAgICAgY3hVdGlsLnByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeE5vZGVbJ3YnXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuICAgICAgICAgICAgICAgIGN4RWRnZXMuZm9yRWFjaCgoY3hFZGdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hFZGdlWyd2J10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVCeXBhc3NlcyddKSB7XG4gICAgICAgICAgICAgICAgY3hOb2RlQnlwYXNzZXMgPSBjeEFzcGVjdFsnbm9kZUJ5cGFzc2VzJ107XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlQnlwYXNzZXMnXSkge1xuICAgICAgICAgICAgICAgIGN4RWRnZUJ5cGFzc2VzID0gY3hBc3BlY3RbJ2VkZ2VCeXBhc3NlcyddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcC5mb3JFYWNoKChpbmZlcnJlZFR5cGUsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3Igbm9kZTogJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWRnZUF0dHJpYnV0ZVR5cGVNYXAuZm9yRWFjaCgoaW5mZXJyZWRUeXBlLCBhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW5mZXJyZWQgYXR0cmlidXRlIHR5cGUgZm9yIGVkZ2U6ICcgKyBhdHRyaWJ1dGVOYW1lICsgJzogJyArIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vQWRkIG5vZGVzXG4gICAgICAgIG91dHB1dC5lbGVtZW50c1snbm9kZXMnXSA9IFtdO1xuXG4gICAgICAgIC8vQWRkIGVkZ2VzXG4gICAgICAgIG91dHB1dC5lbGVtZW50c1snZWRnZXMnXSA9IFtdO1xuXG5cbiAgICAgICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hOb2RlWyd2J10sIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydpZCddID0gY3hOb2RlLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ3Bvc2l0aW9uJ10gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBjeE5vZGVbJ3gnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGN4Tm9kZVsneSddXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmVsZW1lbnRzLm5vZGVzLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ10gPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4RWRnZVsndiddLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnaWQnXSA9IGN4RWRnZS5pZC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ3NvdXJjZSddID0gY3hFZGdlWydzJ107XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsndGFyZ2V0J10gPSBjeEVkZ2VbJ3QnXTtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmVsZW1lbnRzLmVkZ2VzLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgY3hOb2RlQnlwYXNzZXMsIGN4RWRnZUJ5cGFzc2VzLCBub2RlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgIG91dHB1dC5zdHlsZSA9IHN0eWxlLnN0eWxlO1xuICAgICAgICBjb25zb2xlLmxvZygndmlzdWFsUHJvcGVydGllczogJyArIEpTT04uc3RyaW5naWZ5KGN4VmlzdWFsUHJvcGVydGllcywgbnVsbCwgMikpO1xuICAgICAgICBjb25zb2xlLmxvZygnc3R5bGU6ICcgKyBKU09OLnN0cmluZ2lmeShvdXRwdXQuc3R5bGUsIG51bGwsIDIpKTtcblxuICAgICAgICBvdXRwdXRbJ2JhY2tncm91bmQtY29sb3InXSA9IHN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnZlcnRlcjogY29udmVydGVyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKUy5qcyIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICAnc2hhcGUnOiAnc2hhcGUnLFxuICAgICd3aWR0aCc6ICd3aWR0aCcsIFxuICAgICdoZWlnaHQnOiAnaGVpZ2h0JyxcbiAgICAnYmFja2dyb3VuZF9jb2xvcic6ICdiYWNrZ3JvdW5kLWNvbG9yJyxcbiAgICAnYmFja2dyb3VuZF9vcGFjaXR5JzogJ2JhY2tncm91bmQtb3BhY2l0eScsXG4gICAgJ2xhYmVsJzogJ2xhYmVsJyxcbiAgICAnbGFiZWxfY29sb3InOiAnY29sb3InLFxuICAgICdsYWJlbF9mb250X3NpemUnIDogJ2ZvbnQtc2l6ZScsXG4gICAgJ2xhYmVsX29wYWNpdHknIDogJ3RleHQtb3BhY2l0eScsXG4gICAgJ29wYWNpdHknOiAnb3BhY2l0eScsXG4gICAgJ2xpbmVfY29sb3InOiAnbGluZS1jb2xvcidcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKU0NvbnN0YW50cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=