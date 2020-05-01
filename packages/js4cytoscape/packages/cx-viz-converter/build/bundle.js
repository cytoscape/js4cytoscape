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
    if (hex === undefined) {
        return hex;
    }
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
    if (vpMin !== undefined && vpMax !== undefined) {
        return vpMin + (vpMax - vpMin) * attributeRatio;
    } else {
        if (vpMin === undefined) {
            return vpMax;
        } else if (vpMax === undefined) {
            return vpMin;
        }
    }
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

    var alphaDecimal = getMap(vpMin, vpMax, attributeRatio);

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
    var minSatisfied = min !== undefined ? includeMin ? min <= attributeValue : min < attributeValue : true;
    var maxSatisfied = max != undefined ? includeMax ? max >= attributeValue : max > attributeValue : true;
    console.log('isInRange: ' + attributeValue + ' ' + min + ' ' + max + ' ' + includeMin + ' ' + includeMax + ' ' + minSatisfied + ' ' + maxSatisfied);
    return minSatisfied && maxSatisfied;
}

function getMappedValues(mappings, entityType, attributes) {
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

                    if (isInRange(attributeValue, mappingRange.min, mappingRange.max, mappingRange.includeMin, mappingRange.includeMax) && continuousPropertyConvert[entityType][mapping.vp]) {
                        var _converted = continuousPropertyConvert[entityType][mapping.vp](attributeValue, mappingRange.min, mappingRange.max, mappingRange.minVPValue, mappingRange.maxVPValue);
                        Object.assign(output, _converted);
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
                var mappingValues = getMappedValues(mappings, 'node', expandedAttributes);
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
                var mappingValues = getMappedValues(mappings, 'node', expandedAttributes);
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
    if (minValue != undefined && maxValue !== undefined) {
        output[targetStyleField] = 'mapData(' + attributeName + ', ' + minValue + ', ' + maxValue + ', ' + minVP + ', ' + maxVP + ')';
    } else {
        if (minValue === undefined) {
            output[targetStyleField] = maxVP;
        } else if (maxValue == undefined) {
            output[targetStyleField] = minVP;
        }
    }
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
    var minBound = minValue !== undefined ? '[' + attributeName + ' ' + minCondition + ' ' + minValue + ']' : '';
    var maxBound = maxValue !== undefined ? '[' + attributeName + ' ' + maxCondition + ' ' + maxValue + ']' : '';
    return entityType + minBound + maxBound;
}

function getContinuousStyle(entityType, portablePropertyKey, attributeName, minValue, maxValue, minVP, maxVP) {
    if (mapDataPropertyConvert[entityType][portablePropertyKey]) {
        return mapDataPropertyConvert[entityType][portablePropertyKey](attributeName, minValue, maxValue, minVP, maxVP);
    }
    return {};
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
    cxMappingEntries && Object.keys(cxMappingEntries).forEach(function (key) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3MWRlNjNjYmM4NTJhMjA0MWZmZCIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsIlBPIiwiZ2V0Q3hWZXJzaW9uIiwidmVyc2lvblN0cmluZyIsInZlcnNpb25BcnJheSIsInNwbGl0IiwibWFwIiwibnVtYmVyU3RyaW5nIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXNOYU4iLCJlbGVtZW50IiwiZ2V0Q3hNYWpvclZlcnNpb24iLCJwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVBdHRyaWJ1dGVUeXBlTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwiZWRnZUF0dHJpYnV0ZVR5cGVNYXAiLCJlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjeEF0dHJpYnV0ZURlY2xhcmF0aW9uIiwidXBkYXRlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVzIiwidXBkYXRlQXR0cmlidXRlVHlwZU1hcCIsInVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VzIiwiYXR0cmlidXRlVHlwZU1hcCIsImF0dHJpYnV0ZURlY2xhcmF0aW9ucyIsImtleXMiLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlRGVjbGFyYXRpb24iLCJzZXQiLCJkIiwiYXR0cmlidXRlTmFtZU1hcCIsImEiLCJhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJ2IiwidXBkYXRlSW5mZXJyZWRUeXBlcyIsImtleSIsImhhcyIsInZhbHVlIiwiaW5mZXJyZWRUeXBlIiwibmV3S2V5IiwiZ2V0IiwiZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzIiwiZGF0YSIsImNvbnZlcnRlciIsInJlcXVpcmUiLCJjb252ZXJ0IiwiY3giLCJ0YXJnZXRGb3JtYXQiLCJjeENvbnN0YW50cyIsImxhcmdlTmV0d29yayIsImN5dG9zY2FwZUpTIiwiY3hVdGlsIiwidmVyaWZ5VmVyc2lvbiIsImZpcnN0RWxlbWVudCIsIm1ham9yVmVyc2lvbiIsImRlZmF1bHRDb252ZXJ0ZXJzIiwiY29udmVydGVycyIsInNlbGVjdGVkQ29udmVydGVyIiwidW5kZWZpbmVkIiwibGFyZ2VOZXR3b3JrQ29uc3RhbnRzIiwic2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCIsInRhcmdldFN0eWxlRmllbGQiLCJwb3J0YWJsZVByb3BlcnRWYWx1ZSIsInRhcmdldFN0eWxlRW50cnkiLCJoZXhUb1JHQiIsImhleCIsInIiLCJnIiwiYiIsImFscGhhVG9JbnQiLCJhbHBoYURlY2ltYWwiLCJjbGFtcCIsIk1hdGgiLCJyb3VuZCIsImRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJwb3J0YWJsZVByb3BlcnR5VmFsdWUiLCJwcmVwcm9jZXNzTm9kZVdpZHRoIiwicHJlcHJvY2Vzc05vZGVIZWlnaHQiLCJwcmVwcm9jZXNzQ29sb3IiLCJwcmVwcm9jZXNzQWxwaGEiLCJsYWJlbCIsInByZXByb2Nlc3NMYWJlbENvbG9yIiwicHJlcHJvY2Vzc0xhYmVsQWxwaGEiLCJsYWJlbEZvbnRTaXplIiwid2lkdGgiLCJnZXREZWZhdWx0VmFsdWVzIiwiZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMiLCJvdXRwdXQiLCJub2RlIiwiZWRnZSIsIm5vZGVEZWZhdWx0IiwibG52RW50cmllcyIsImdldExOVlZhbHVlcyIsImFzc2lnbiIsImVkZ2VEZWZhdWx0IiwiZW50aXR5VHlwZSIsImVudHJpZXMiLCJwb3J0YWJsZVByb3BlcnR5S2V5IiwibG52RW50cnkiLCJsbnZLZXkiLCJwcm9jZXNzQ29sb3IiLCJjb2xvckFycmF5IiwiYWxwaGEiLCJwcm9jZXNzU2l6ZSIsImhlaWdodCIsIm1heCIsInByb2Nlc3NOb2RlVmlldyIsIm5vZGVWaWV3IiwibGFiZWxDb2xvckFycmF5IiwibGFiZWxBbHBoYSIsImlkIiwicG9zaXRpb24iLCJjb2xvciIsImxhYmVsQ29sb3IiLCJzaXplIiwicHJvY2Vzc0VkZ2VWaWV3IiwiZWRnZVZpZXciLCJzIiwidCIsImdldE1hcHBpbmdzIiwibWFwcGluZ3MiLCJtYXBwaW5nIiwicHJvcGVydHlLZXkiLCJkZWZpbml0aW9uIiwiYXR0cmlidXRlIiwidHlwZSIsInZwIiwiZ2V0QXR0cmlidXRlUmF0aW8iLCJhdHRyaWJ1dGVWYWx1ZSIsImF0dHJpYnV0ZU1pbiIsImF0dHJpYnV0ZU1heCIsImdldE1hcCIsInZwTWluIiwidnBNYXgiLCJhdHRyaWJ1dGVSYXRpbyIsIm1pbiIsImNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQiLCJjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQiLCJtaW5SR0IiLCJtYXhSR0IiLCJjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQiLCJjb250aW51b3VzUHJvcGVydHlDb252ZXJ0IiwiaXNJblJhbmdlIiwiaW5jbHVkZU1pbiIsImluY2x1ZGVNYXgiLCJtaW5TYXRpc2ZpZWQiLCJtYXhTYXRpc2ZpZWQiLCJnZXRNYXBwZWRWYWx1ZXMiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlS2V5IiwiZGlzY3JldGVNYXAiLCJrZXlWYWx1ZSIsImNvbnZlcnRlZCIsImNvbnRpbnVvdXNNYXBwaW5ncyIsIm1hcHBpbmdSYW5nZSIsIm1pblZQVmFsdWUiLCJtYXhWUFZhbHVlIiwibG52Q29udmVydCIsImN4VmlzdWFsUHJvcGVydGllcyIsImN4Tm9kZUJ5cGFzc2VzIiwiY3hFZGdlQnlwYXNzZXMiLCJNYXAiLCJkZWZhdWx0VmFsdWVzIiwiYnlwYXNzTWFwcGluZ3MiLCJjeEFzcGVjdCIsImN4Tm9kZXMiLCJjeE5vZGUiLCJjeEVkZ2VzIiwiY3hFZGdlIiwibm9kZUJ5cGFzc2VzIiwicHVzaCIsImJ5cGFzcyIsImVkZ2VCeXBhc3NlcyIsIm5vZGVWaWV3cyIsImVkZ2VWaWV3cyIsImRlZmF1bHRTdHlsZXMiLCJ2cEVsZW1lbnQiLCJkZWZhdWx0Iiwibm9kZU1hcHBpbmciLCJlZGdlTWFwcGluZyIsInRvU3RyaW5nIiwidmFsdWVzIiwiY3hJZCIsImRlZmF1bHROb2RlVmlzdWFsUHJvcGVydGllcyIsImV4cGFuZGVkQXR0cmlidXRlcyIsIm1hcHBpbmdWYWx1ZXMiLCJwcm9jZXNzZWROb2RlVmlldyIsImRlZmF1bHRFZGdlVmlzdWFsUHJvcGVydGllcyIsInByb2Nlc3NlZEVkZ2VWaWV3IiwianNDb25zdGFudHMiLCJzaGFwZSIsImJhY2tncm91bmRfY29sb3IiLCJiYWNrZ3JvdW5kX29wYWNpdHkiLCJsYWJlbF9jb2xvciIsImxhYmVsX29wYWNpdHkiLCJsYWJlbF9mb250X3NpemUiLCJvcGFjaXR5IiwibGluZV9jb2xvciIsInNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0Iiwic2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydCIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJtaW5WUCIsIm1heFZQIiwibWFwRGF0YVByb3BlcnR5Q29udmVydCIsImdldENTU1N0eWxlRW50cmllcyIsImN4U3R5bGVFbnRyaWVzIiwiY3NzRW50cmllcyIsImdldElkU2VsZWN0b3IiLCJlbGVtZW50VHlwZSIsImdldFN0eWxlRWxlbWVudCIsInNlbGVjdG9yIiwiY3NzIiwiZ2V0Q29udGludW91c1NlbGVjdG9yIiwibWluQ29uZGl0aW9uIiwibWF4Q29uZGl0aW9uIiwibWluQm91bmQiLCJtYXhCb3VuZCIsImdldENvbnRpbnVvdXNTdHlsZSIsImdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cmllcyIsImN4TWFwcGluZ0RlZmluaXRpb24iLCJyYW5nZU1hcHMiLCJyYW5nZSIsInN0eWxlIiwiZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkiLCJnZXREaXNjcmV0ZVNlbGVjdG9yIiwiYXR0cmlidXRlRGF0YVR5cGUiLCJnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzIiwiYXR0dHJpYnV0ZVRvVmFsdWVNYXAiLCJzdHlsZU1hcCIsImdldEJ5cGFzc0NTU0VudHJ5IiwiY3hFbGVtZW50IiwiZ2V0Q1NTTWFwcGluZ0VudHJpZXMiLCJjeE1hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cnkiLCJjb250aW5vdXNNYXBwaW5ncyIsImNvbnRpbm91c01hcHBpbmciLCJjc3NFbnRyeSIsImRpc2NyZXRlTWFwcGluZ3MiLCJkaXNjcmV0ZU1hcHBpbmciLCJOT0RFX1NFTEVDVE9SIiwiRURHRV9TRUxFQ1RPUiIsImdldFZpc3VhbFByb3BlcnRpZXMiLCJkZWZhdWx0Q1NTTm9kZVN0eWxlIiwiZGVmYXVsdENTU0VkZ2VTdHlsZSIsImNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IiLCJtYXBwaW5nQ1NTTm9kZVN0eWxlIiwibWFwcGluZ0NTU0VkZ2VTdHlsZSIsImJ5cGFzc0NTU0VudHJpZXMiLCJuZXR3b3JrIiwiYXBwbHkiLCJlbGVtZW50cyIsImxheW91dCIsIngiLCJ5Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7Ozs7O0FDNURBQSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPQyxNQUFQLENBQWM7QUFDM0JDLGdCQUFZLFdBRGU7QUFFM0JDLFVBQU0sTUFGcUI7QUFHM0JDLFVBQU0sTUFIcUI7QUFJM0JDLGFBQVMsU0FKa0I7O0FBTTNCQyxXQUFPLE9BTm9CO0FBTzNCQyxXQUFPLE9BUG9COztBQVMzQkMsUUFBSSxJQVR1QjtBQVUzQkMsT0FBRyxHQVZ3QjtBQVczQkMsT0FBRyxHQVh3QjtBQVkzQkMsT0FBRyxHQVp3QjtBQWEzQkMsT0FBRyxHQWJ3Qjs7QUFlM0JDLFFBQUksSUFmdUI7QUFnQjNCQyxPQUFHLEdBaEJ3QjtBQWlCM0JDLE9BQUcsR0FqQndCOztBQW1CM0JDLHVCQUFtQixrQkFuQlE7QUFvQjNCQyxhQUFTLFNBcEJrQjs7QUFzQjNCQyxXQUFPLE9BdEJvQjs7QUF3QjNCQyxRQUFJO0FBeEJ1QixDQUFkLENBQWpCLEM7Ozs7Ozs7Ozs7O0FDREEsU0FBU0MsWUFBVCxDQUFzQkMs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LEtBQXJCO0FBQ0FuTixnQkFBUUMsR0FBUixDQUFZLHVCQUF1QkMsS0FBS0MsU0FBTCxDQUFlOEksa0JBQWYsRUFBbUMsSUFBbkMsRUFBeUMsQ0FBekMsQ0FBbkM7QUFDQWpKLGdCQUFRQyxHQUFSLENBQVksWUFBWUMsS0FBS0MsU0FBTCxDQUFldUUsT0FBT3lJLEtBQXRCLEVBQTZCLElBQTdCLEVBQW1DLENBQW5DLENBQXhCOztBQUVBekksZUFBTyxrQkFBUCxJQUE2QnlJLE1BQU0sa0JBQU4sQ0FBN0I7O0FBRUEsZUFBT3pJLE1BQVA7QUFDSDtBQTVHYSxDQUFsQjs7QUErR0FwSCxPQUFPQyxPQUFQLEdBQWlCO0FBQ2J1RSxlQUFXQTtBQURFLENBQWpCLEM7Ozs7Ozs7OztBQ2xiQXhFLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU9DLE1BQVAsQ0FBYztBQUMzQixhQUFTLE9BRGtCO0FBRTNCLGFBQVMsT0FGa0I7QUFHM0IsY0FBVSxRQUhpQjtBQUkzQix3QkFBb0Isa0JBSk87QUFLM0IsMEJBQXNCLG9CQUxLO0FBTTNCLGFBQVMsT0FOa0I7QUFPM0IsbUJBQWUsT0FQWTtBQVEzQix1QkFBb0IsV0FSTztBQVMzQixxQkFBa0IsY0FUUztBQVUzQixlQUFXLFNBVmdCO0FBVzNCLGtCQUFjO0FBWGEsQ0FBZCxDQUFqQixDIiwiZmlsZSI6Ii4vYnVpbGQvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3hWaXpDb252ZXJ0ZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiY3hWaXpDb252ZXJ0ZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDcxZGU2M2NiYzg1MmEyMDQxZmZkIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgIENYX1ZFUlNJT046ICdDWFZlcnNpb24nLFxuICAgIE5PREU6ICdub2RlJyxcbiAgICBFREdFOiAnZWRnZScsXG4gICAgTkVUV09SSzogJ25ldHdvcmsnLFxuXG4gICAgTk9ERVM6ICdub2RlcycsXG4gICAgRURHRVM6ICdlZGdlcycsXG5cbiAgICBJRDogJ2lkJyxcbiAgICBYOiAneCcsXG4gICAgWTogJ3knLFxuICAgIFo6ICd6JyxcbiAgICBWOiAndicsXG5cbiAgICBBVDogJ2F0JyxcbiAgICBOOiAnbicsXG4gICAgRTogJ2UnLFxuXG4gICAgVklTVUFMX1BST1BFUlRJRVM6ICd2aXN1YWxQcm9wZXJ0aWVzJyxcbiAgICBERUZBVUxUOiAnZGVmYXVsdCcsXG5cbiAgICBTVFlMRTogJ3N0eWxlJyxcblxuICAgIFBPOiAncG8nXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hDb25zdGFudHMuanMiLCJmdW5jdGlvbiBnZXRDeFZlcnNpb24odmVyc2lvblN0cmluZykge1xuICAgIGNvbnN0IHZlcnNpb25BcnJheSA9IHZlcnNpb25TdHJpbmcuc3BsaXQoJy4nKS5tYXAoKG51bWJlclN0cmluZykgPT4geyByZXR1cm4gcGFyc2VJbnQobnVtYmVyU3RyaW5nLCAxMCk7IH0pO1xuICAgIGlmICh2ZXJzaW9uQXJyYXkubGVuZ3RoICE9PSAyICYmIHZlcnNpb25BcnJheS5sZW5ndGggIT0gMykge1xuICAgICAgICB0aHJvdyAnSW5jb21wYXRpYmxlIHZlcnNpb24gZm9ybWF0OiAnICsgdmVyc2lvblN0cmluZztcbiAgICB9XG4gICAgdmVyc2lvbkFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGlmIChpc05hTihlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgJ05vbi1pbnRlZ2VyIHZhbHVlIGluIHZlcnNpb24gc3RyaW5nOiAnICsgdmVyc2lvblN0cmluZztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2ZXJzaW9uQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGdldEN4TWFqb3JWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcbiAgICByZXR1cm4gdmVyc2lvblN0cmluZyA/IGdldEN4VmVyc2lvbih2ZXJzaW9uU3RyaW5nKVswXSA6IDE7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIFxuICAgIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBcbiAgICBub2RlQXR0cmlidXRlVHlwZU1hcCwgXG4gICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgXG4gICAgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBcbiAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKSB7XG4gICAgY29uc29sZS5sb2coXCIgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IFwiICsgSlNPTi5zdHJpbmdpZnkoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIG51bGwsIDIpKTtcbiAgICBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucy5mb3JFYWNoKChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uKSA9PiB7XG4gICAgICAgIGlmIChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uWydub2RlcyddKSB7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uWydlZGdlcyddKSB7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAoYXR0cmlidXRlVHlwZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2QnXSkge1xuICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGVjbGFyYXRpb24uZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlTmFtZU1hcChhdHRyaWJ1dGVOYW1lTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsnYSddKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXR0cmlidXRlICcgKyBhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hICsgJyBzaG91bGQgYmUgcmVuYW1lZCB0byAnICsgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVOYW1lTWFwLnNldChhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hLCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAoYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsndiddKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXR0cmlidXRlICcgKyBhdHRyaWJ1dGVOYW1lICsgJyBoYXMgZGVmYXVsdCB2YWx1ZSAnICsgYXR0cmlidXRlRGVjbGFyYXRpb24udik7XG4gICAgICAgICAgICBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLnYpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUluZmVycmVkVHlwZXMoYXR0cmlidXRlVHlwZU1hcCwgYXR0cmlidXRlTmFtZU1hcCwgdikge1xuICAgIE9iamVjdC5rZXlzKHYpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZVR5cGVNYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdltrZXldO1xuICAgICAgICAgICAgY29uc3QgaW5mZXJyZWRUeXBlID0gdHlwZW9mIHZhbHVlO1xuICAgICAgICAgICAgY29uc3QgbmV3S2V5ID0gYXR0cmlidXRlTmFtZU1hcC5oYXMoa2V5KSA/IGF0dHJpYnV0ZU5hbWVNYXAuZ2V0KGtleSkgOiBrZXk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVUeXBlTWFwLnNldChuZXdLZXksIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBnZXRFeHBhbmRlZEF0dHJpYnV0ZXModiwgYXR0cmlidXRlTmFtZU1hcCwgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKSB7XG4gICAgbGV0IGRhdGEgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgbmV3S2V5ID0gYXR0cmlidXRlTmFtZU1hcC5oYXMoa2V5KSA/IGF0dHJpYnV0ZU5hbWVNYXAuZ2V0KGtleSkgOiBrZXk7XG4gICAgICAgIGRhdGFbbmV3S2V5XSA9IHZba2V5XTtcbiAgICB9KTtcbiAgICBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBpZiAoIWRhdGFba2V5XSkge1xuICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0Q3hWZXJzaW9uOiBnZXRDeFZlcnNpb24sXG4gICAgZ2V0Q3hNYWpvclZlcnNpb246IGdldEN4TWFqb3JWZXJzaW9uLFxuICAgIHByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IHByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgdXBkYXRlQXR0cmlidXRlVHlwZU1hcDogdXBkYXRlQXR0cmlidXRlVHlwZU1hcCxcbiAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwOiB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwLFxuICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcDogdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgIHVwZGF0ZUluZmVycmVkVHlwZXM6IHVwZGF0ZUluZmVycmVkVHlwZXMsXG4gICAgZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzIDogZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeFV0aWwuanMiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNvbnZlcnRlciA9IHJlcXVpcmUgKCcuL2NvbnZlcnRlci5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cy5jb252ZXJ0ID0gKGN4LCB0YXJnZXRGb3JtYXQpID0+IHsgcmV0dXJuIGNvbnZlcnRlci5jb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQpOyB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGxhcmdlTmV0d29yayA9IHJlcXVpcmUgKCcuL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmsuanMnKTsgXG5jb25zdCBjeXRvc2NhcGVKUyA9IHJlcXVpcmUgKCcuL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiB2ZXJpZnlWZXJzaW9uKGN4KSB7XG4gICAgY29uc3QgZmlyc3RFbGVtZW50ID0gY3hbMF07XG4gICAgY29uc3QgdmVyc2lvblN0cmluZyA9IGZpcnN0RWxlbWVudFtjeENvbnN0YW50cy5DWF9WRVJTSU9OXTtcblxuICAgIGNvbnN0IG1ham9yVmVyc2lvbiA9IGN4VXRpbC5nZXRDeE1ham9yVmVyc2lvbih2ZXJzaW9uU3RyaW5nKTtcblxuICAgIGlmIChtYWpvclZlcnNpb24gIT09IDIpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSBDWCB2ZXJzaW9uOiAnICsgdmVyc2lvblN0cmluZztcbiAgICB9XG59XG5cbmNvbnN0IGRlZmF1bHRDb252ZXJ0ZXJzID0gW1xuICAgIGxhcmdlTmV0d29yayxcbiAgICBjeXRvc2NhcGVKU1xuXTtcblxuZnVuY3Rpb24gY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0LCBjb252ZXJ0ZXJzID0gZGVmYXVsdENvbnZlcnRlcnMpIHtcbiAgICB2ZXJpZnlWZXJzaW9uKGN4KTtcbiAgICBsZXQgc2VsZWN0ZWRDb252ZXJ0ZXIgPSB1bmRlZmluZWQ7XG4gICAgXG4gICAgY29udmVydGVycy5mb3JFYWNoKCBjb252ZXJ0ZXIgPT4ge1xuICAgICAgICBpZiAoY29udmVydGVyLmNvbnZlcnRlci50YXJnZXRGb3JtYXQgPT0gdGFyZ2V0Rm9ybWF0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGFyZ2V0IGZvcm1hdDogJyArIGNvbnZlcnRlci5jb252ZXJ0ZXIudGFyZ2V0Rm9ybWF0KTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0ZWRDb252ZXJ0ZXIgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvbnZlcnRlciA9IGNvbnZlcnRlcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ2NvbnZlcnRlcnMgY29udGFpbiBtdWx0aXBsZSBlbnRyaWVzIGZvciB0YXJnZXQgZm9ybWF0OiAnICsgdGFyZ2V0Rm9ybWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIHNlbGVjdGVkQ29udmVydGVyID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93ICdubyBjb252ZXJ0ZXIgYXZhaWxhYmxlIGZvciB0YXJnZXQgZm9ybWF0OiAnICsgdGFyZ2V0Rm9ybWF0XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdGVkQ29udmVydGVyLmNvbnZlcnRlci5jb252ZXJ0KGN4KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0OiBjb252ZXJ0XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb252ZXJ0ZXIuanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGxhcmdlTmV0d29ya0NvbnN0YW50cyA9IHJlcXVpcmUoJy4vbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSkge1xuICAgIGNvbnN0IHRhcmdldFN0eWxlRW50cnkgPSB7fTtcbiAgICB0YXJnZXRTdHlsZUVudHJ5W3RhcmdldFN0eWxlRmllbGRdID0gcG9ydGFibGVQcm9wZXJ0VmFsdWU7XG4gICAgcmV0dXJuIHRhcmdldFN0eWxlRW50cnk7XG59XG5cbmZ1bmN0aW9uIGhleFRvUkdCKGhleCkge1xuICAgIGlmIChoZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gaGV4O1xuICAgIH1cbiAgICBsZXQgciA9IDAsIGcgPSAwLCBiID0gMDtcblxuICAgIC8vIDMgZGlnaXRzXG4gICAgaWYgKGhleC5sZW5ndGggPT0gNCkge1xuICAgICAgICByID0gXCIweFwiICsgaGV4WzFdICsgaGV4WzFdO1xuICAgICAgICBnID0gXCIweFwiICsgaGV4WzJdICsgaGV4WzJdO1xuICAgICAgICBiID0gXCIweFwiICsgaGV4WzNdICsgaGV4WzNdO1xuXG4gICAgICAgIC8vIDYgZGlnaXRzXG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDcpIHtcbiAgICAgICAgciA9IFwiMHhcIiArIGhleFsxXSArIGhleFsyXTtcbiAgICAgICAgZyA9IFwiMHhcIiArIGhleFszXSArIGhleFs0XTtcbiAgICAgICAgYiA9IFwiMHhcIiArIGhleFs1XSArIGhleFs2XTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3BhcnNlSW50KHIpLCBwYXJzZUludChnKSwgcGFyc2VJbnQoYildO1xufVxuXG5mdW5jdGlvbiBhbHBoYVRvSW50KGFscGhhRGVjaW1hbCkge1xuICAgIHJldHVybiBjbGFtcChNYXRoLnJvdW5kKGFscGhhRGVjaW1hbCAqIDI1NSksIDAsIDI1NSk7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVXaWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVIZWlnaHQsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9MQUJFTF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0xBQkVMX0ZPTlRfU0laRSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsRm9udFNpemUsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhLCBhbHBoYVRvSW50KHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yLCBoZXhUb1JHQihwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ0VER0VfTEFCRUwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvciwgaGV4VG9SR0IocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdFREdFX0xBQkVMX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSwgYWxwaGFUb0ludChwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfRk9OVF9TSVpFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxGb250U2l6ZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH1cbn1cblxuXG5cbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZXMoZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMpIHtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBub2RlOiB7fSxcbiAgICAgICAgZWRnZToge31cbiAgICB9O1xuICAgIGlmIChkZWZhdWx0VmlzdWFsUHJvcGVydGllc1snbm9kZSddKSB7XG4gICAgICAgIGNvbnN0IG5vZGVEZWZhdWx0ID0gZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMubm9kZTtcbiAgICAgICAgY29uc3QgbG52RW50cmllcyA9IGdldExOVlZhbHVlcygnbm9kZScsIG5vZGVEZWZhdWx0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQubm9kZSwgbG52RW50cmllcyk7XG4gICAgfVxuICAgIGlmIChkZWZhdWx0VmlzdWFsUHJvcGVydGllc1snZWRnZSddKSB7XG4gICAgICAgIGNvbnN0IGVkZ2VEZWZhdWx0ID0gZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMuZWRnZTtcbiAgICAgICAgY29uc3QgbG52RW50cmllcyA9IGdldExOVlZhbHVlcygnZWRnZScsIGVkZ2VEZWZhdWx0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQuZWRnZSwgbG52RW50cmllcyk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldExOVlZhbHVlcyhlbnRpdHlUeXBlLCBlbnRyaWVzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGVudHJpZXMpLmZvckVhY2gocG9ydGFibGVQcm9wZXJ0eUtleSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGVudHJpZXNbcG9ydGFibGVQcm9wZXJ0eUtleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBsbnZFbnRyeSA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxudkVudHJ5KS5mb3JFYWNoKGxudktleSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2xudktleV0gPSBsbnZFbnRyeVtsbnZLZXldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NDb2xvcihjb2xvckFycmF5LCBhbHBoYSkge1xuICAgIHJldHVybiBjb2xvckFycmF5ICE9IHVuZGVmaW5lZFxuICAgICAgICA/IGFscGhhICE9IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBbY29sb3JBcnJheVswXSwgY29sb3JBcnJheVsxXSwgY29sb3JBcnJheVsyXSwgYWxwaGFdXG4gICAgICAgICAgICA6IFtjb2xvckFycmF5WzBdLCBjb2xvckFycmF5WzFdLCBjb2xvckFycmF5WzJdXVxuICAgICAgICA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1NpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHJldHVybiBNYXRoLm1heCh3aWR0aCwgaGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc05vZGVWaWV3KG5vZGVWaWV3KSB7XG4gICAgbGV0IHdpZHRoID0gdW5kZWZpbmVkO1xuICAgIGxldCBoZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGNvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGFscGhhID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGxhYmVsQ29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFiZWxBbHBoYSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIGlkOiBub2RlVmlldy5pZCxcbiAgICAgICAgcG9zaXRpb246IG5vZGVWaWV3LnBvc2l0aW9uXG4gICAgfTtcblxuXG4gICAgT2JqZWN0LmtleXMobm9kZVZpZXcpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlV2lkdGgpIHtcbiAgICAgICAgICAgIHdpZHRoID0gbm9kZVZpZXcucHJlcHJvY2Vzc05vZGVXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTm9kZUhlaWdodCkge1xuICAgICAgICAgICAgaGVpZ2h0ID0gbm9kZVZpZXcucHJlcHJvY2Vzc05vZGVIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yKSB7XG4gICAgICAgICAgICBjb2xvckFycmF5ID0gbm9kZVZpZXcucHJlcHJvY2Vzc0NvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NBbHBoYSkge1xuICAgICAgICAgICAgYWxwaGEgPSBub2RlVmlldy5wcmVwcm9jZXNzQWxwaGE7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IpIHtcbiAgICAgICAgICAgIGxhYmVsQ29sb3JBcnJheSA9IG5vZGVWaWV3LnByZXByb2Nlc3NMYWJlbENvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhKSB7XG4gICAgICAgICAgICBsYWJlbEFscGhhID0gbm9kZVZpZXcucHJlcHJvY2Vzc0xhYmVsQWxwaGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRwdXRba2V5XSA9IG5vZGVWaWV3W2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbG9yID0gcHJvY2Vzc0NvbG9yKGNvbG9yQXJyYXksIGFscGhhKTtcbiAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5jb2xvcl0gPSBjb2xvcjtcbiAgICB9XG5cbiAgICBjb25zdCBsYWJlbENvbG9yID0gcHJvY2Vzc0NvbG9yKGxhYmVsQ29sb3JBcnJheSwgbGFiZWxBbHBoYSk7XG4gICAgaWYgKGxhYmVsQ29sb3IpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbENvbG9yXSA9IGxhYmVsQ29sb3I7XG4gICAgfVxuXG4gICAgY29uc3Qgc2l6ZSA9IHByb2Nlc3NTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIGlmIChzaXplKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuc2l6ZV0gPSBwcm9jZXNzU2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0VkZ2VWaWV3KGVkZ2VWaWV3KSB7XG4gICAgbGV0IGNvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGFscGhhID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGxhYmVsQ29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFiZWxBbHBoYSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIGlkOiBlZGdlVmlldy5pZCxcbiAgICAgICAgczogZWRnZVZpZXcucyxcbiAgICAgICAgdDogZWRnZVZpZXcudFxuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKGVkZ2VWaWV3KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IpIHtcbiAgICAgICAgICAgIGNvbG9yQXJyYXkgPSBlZGdlVmlldy5wcmVwcm9jZXNzQ29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhKSB7XG4gICAgICAgICAgICBhbHBoYSA9IGVkZ2VWaWV3LnByZXByb2Nlc3NBbHBoYTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvcikge1xuICAgICAgICAgICAgbGFiZWxDb2xvckFycmF5ID0gZWRnZVZpZXcucHJlcHJvY2Vzc0xhYmVsQ29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEpIHtcbiAgICAgICAgICAgIGxhYmVsQWxwaGEgPSBlZGdlVmlldy5wcmVwcm9jZXNzTGFiZWxBbHBoYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dHB1dFtrZXldID0gZWRnZVZpZXdba2V5XTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29sb3IgPSBwcm9jZXNzQ29sb3IoY29sb3JBcnJheSwgYWxwaGEpO1xuICAgIGlmIChjb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmNvbG9yXSA9IGNvbG9yO1xuICAgIH1cblxuICAgIGNvbnN0IGxhYmVsQ29sb3IgPSBwcm9jZXNzQ29sb3IobGFiZWxDb2xvckFycmF5LCBsYWJlbEFscGhhKTtcbiAgICBpZiAobGFiZWxDb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsQ29sb3JdID0gbGFiZWxDb2xvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRNYXBwaW5ncyhtYXBwaW5ncykge1xuICAgIGxldCBvdXRwdXQgPSB7fVxuICAgIE9iamVjdC5rZXlzKG1hcHBpbmdzKS5mb3JFYWNoKHByb3BlcnR5S2V5ID0+IHtcbiAgICAgICAgY29uc3QgbWFwcGluZyA9IG1hcHBpbmdzW3Byb3BlcnR5S2V5XTtcbiAgICAgICAgb3V0cHV0W21hcHBpbmcuZGVmaW5pdGlvbi5hdHRyaWJ1dGVdID0ge1xuICAgICAgICAgICAgdHlwZTogbWFwcGluZy50eXBlLFxuICAgICAgICAgICAgdnA6IHByb3BlcnR5S2V5LFxuICAgICAgICAgICAgZGVmaW5pdGlvbjogbWFwcGluZy5kZWZpbml0aW9uXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZVJhdGlvKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCkge1xuICAgIHJldHVybiBhdHRyaWJ1dGVWYWx1ZSAvIChhdHRyaWJ1dGVNYXggLSBhdHRyaWJ1dGVNaW4pO1xufVxuXG5mdW5jdGlvbiBnZXRNYXAodnBNaW4sIHZwTWF4LCBhdHRyaWJ1dGVSYXRpbykge1xuICAgIGlmICh2cE1pbiAhPT0gdW5kZWZpbmVkICYmIHZwTWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHZwTWluICsgKCh2cE1heCAtIHZwTWluKSAqIGF0dHJpYnV0ZVJhdGlvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodnBNaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHZwTWF4O1xuICAgICAgICB9IGVsc2UgaWYgKHZwTWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB2cE1pbjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2xhbXAodmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbHVlLCBtaW4pLCBtYXgpO1xufVxuXG5mdW5jdGlvbiBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSB7XG4gICAgY29uc3QgYXR0cmlidXRlUmF0aW8gPSBnZXRBdHRyaWJ1dGVSYXRpbyhhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgpO1xuXG4gICAgY29uc3Qgb3V0cHV0ID0gZ2V0TWFwKHZwTWluLCB2cE1heCwgYXR0cmlidXRlUmF0aW8pO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSB7XG4gICAgY29uc3QgbWluUkdCID0gaGV4VG9SR0IodnBNaW4pO1xuICAgIGNvbnN0IG1heFJHQiA9IGhleFRvUkdCKHZwTWF4KTtcblxuICAgIGNvbnN0IGF0dHJpYnV0ZVJhdGlvID0gZ2V0QXR0cmlidXRlUmF0aW8oYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4KTtcblxuICAgIGNvbnN0IG91dHB1dCA9IFtcbiAgICAgICAgY2xhbXAoTWF0aC5yb3VuZChnZXRNYXAobWluUkdCWzBdLCBtYXhSR0JbMF0sIGF0dHJpYnV0ZVJhdGlvKSksIDAsIDI1NSksXG4gICAgICAgIGNsYW1wKE1hdGgucm91bmQoZ2V0TWFwKG1pblJHQlsxXSwgbWF4UkdCWzFdLCBhdHRyaWJ1dGVSYXRpbykpLCAwLCAyNTUpLFxuICAgICAgICBjbGFtcChNYXRoLnJvdW5kKGdldE1hcChtaW5SR0JbMl0sIG1heFJHQlsyXSwgYXR0cmlidXRlUmF0aW8pKSwgMCwgMjU1KVxuICAgIF1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVSYXRpbyA9IGdldEF0dHJpYnV0ZVJhdGlvKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCk7XG4gICAgXG4gICAgY29uc3QgYWxwaGFEZWNpbWFsID0gZ2V0TWFwKHZwTWluLCB2cE1heCwgYXR0cmlidXRlUmF0aW8pO1xuXG4gICAgY29uc29sZS5sb2coXCJhbHBoYURlY2ltYWwgPSBcIiArIGFscGhhRGVjaW1hbCk7XG4gICAgcmV0dXJuIGFscGhhVG9JbnQoYWxwaGFEZWNpbWFsKTtcbn1cblxuY29uc3QgY29udGludW91c1Byb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfV0lEVEgnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlV2lkdGgsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTm9kZUhlaWdodCwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NBbHBoYSwgY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvciwgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhLCBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbEZvbnRTaXplLCBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMud2lkdGgsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhLCBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yLCBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yLCBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEsIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsRm9udFNpemUsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNJblJhbmdlKGF0dHJpYnV0ZVZhbHVlLCBtaW4sIG1heCwgaW5jbHVkZU1pbiwgaW5jbHVkZU1heCkge1xuICAgIGNvbnN0IG1pblNhdGlzZmllZCA9IG1pbiAhPT0gdW5kZWZpbmVkIFxuICAgICAgICA/IChpbmNsdWRlTWluID8gbWluIDw9IGF0dHJpYnV0ZVZhbHVlIDogbWluIDwgYXR0cmlidXRlVmFsdWUpIFxuICAgICAgICA6IHRydWU7XG4gICAgY29uc3QgbWF4U2F0aXNmaWVkID0gbWF4ICE9IHVuZGVmaW5lZFxuICAgICAgICA/IChpbmNsdWRlTWF4ID8gbWF4ID49IGF0dHJpYnV0ZVZhbHVlIDogbWF4ID4gYXR0cmlidXRlVmFsdWUpXG4gICAgICAgIDogdHJ1ZTtcbiAgICBjb25zb2xlLmxvZygnaXNJblJhbmdlOiAnICsgYXR0cmlidXRlVmFsdWUgKyAnICcgKyBtaW4gKyAnICcgKyBtYXggKyAnICcgKyBpbmNsdWRlTWluICsgJyAnICsgaW5jbHVkZU1heCArICcgJyArIG1pblNhdGlzZmllZCArICcgJyArIG1heFNhdGlzZmllZCk7XG4gICAgcmV0dXJuIG1pblNhdGlzZmllZCAmJiBtYXhTYXRpc2ZpZWQ7XG59XG5cbmZ1bmN0aW9uIGdldE1hcHBlZFZhbHVlcyhtYXBwaW5ncywgZW50aXR5VHlwZSwgYXR0cmlidXRlcykge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHJpYnV0ZUtleSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZVZhbHVlID0gYXR0cmlidXRlc1thdHRyaWJ1dGVLZXldO1xuICAgICAgICBpZiAobWFwcGluZ3NbZW50aXR5VHlwZV1bYXR0cmlidXRlS2V5XSkge1xuICAgICAgICAgICAgY29uc3QgbWFwcGluZyA9IG1hcHBpbmdzW2VudGl0eVR5cGVdW2F0dHJpYnV0ZUtleV07XG5cbiAgICAgICAgICAgIGlmIChtYXBwaW5nLnR5cGUgPT09ICdESVNDUkVURScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNjcmV0ZU1hcCA9IG1hcHBpbmcuZGVmaW5pdGlvbi5tYXA7XG4gICAgICAgICAgICAgICAgZGlzY3JldGVNYXAuZm9yRWFjaChrZXlWYWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlWYWx1ZS52ID09IGF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0oa2V5VmFsdWUudnApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0LCBjb252ZXJ0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hcHBpbmcudHlwZSA9PT0gJ1BBU1NUSFJPVUdIJykge1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0oYXR0cmlidXRlVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgY29udmVydGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hcHBpbmcudHlwZSA9PT0gJ0NPTlRJTlVPVVMnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGludW91c01hcHBpbmdzID0gbWFwcGluZy5kZWZpbml0aW9uLm1hcDtcbiAgICAgICAgICAgICAgICBjb250aW51b3VzTWFwcGluZ3MuZm9yRWFjaChtYXBwaW5nUmFuZ2UgPT4ge1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNJblJhbmdlKGF0dHJpYnV0ZVZhbHVlLCBtYXBwaW5nUmFuZ2UubWluLCBtYXBwaW5nUmFuZ2UubWF4LCBtYXBwaW5nUmFuZ2UuaW5jbHVkZU1pbiwgbWFwcGluZ1JhbmdlLmluY2x1ZGVNYXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgY29udGludW91c1Byb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGNvbnRpbnVvdXNQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0oYXR0cmlidXRlVmFsdWUsIG1hcHBpbmdSYW5nZS5taW4sIG1hcHBpbmdSYW5nZS5tYXgsIG1hcHBpbmdSYW5nZS5taW5WUFZhbHVlLCBtYXBwaW5nUmFuZ2UubWF4VlBWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIGNvbnZlcnRlZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBsbnZDb252ZXJ0KGN4KSB7XG5cbiAgICAvL0ZpcnN0IHBhc3MuIFxuICAgIC8vIFdlIG5lZWQgdG8gY29sbGVjdCBvYmplY3QgYXR0cmlidXRlcyB0byBjYWxjdWxhdGVcbiAgICAvLyBtYXBwaW5ncyBpbiB0aGUgc2Vjb25kIHBhc3MuIFxuXG4gICAgbGV0IGN4VmlzdWFsUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcbiAgICBsZXQgY3hOb2RlQnlwYXNzZXMgPSBbXTtcbiAgICBsZXQgY3hFZGdlQnlwYXNzZXMgPSBbXTtcblxuICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICBsZXQgZWRnZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICBsZXQgbm9kZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICBsZXQgZGVmYXVsdFZhbHVlcyA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbWFwcGluZ3MgPSB7XG4gICAgICAgIG5vZGU6IHt9LFxuICAgICAgICBlZGdlOiB7fVxuICAgIH1cbiAgICBsZXQgYnlwYXNzTWFwcGluZ3MgPSB7XG4gICAgICAgICdub2RlJzoge30sXG4gICAgICAgICdlZGdlJzoge31cbiAgICB9O1xuXG4gICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMgPSBjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ107XG4gICAgICAgICAgICBjeFV0aWwucHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyhjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeE5vZGVbJ3YnXSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hFZGdlWyd2J10pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICBjeFZpc3VhbFByb3BlcnRpZXMgPSBjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddO1xuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wydub2RlQnlwYXNzZXMnXSkge1xuICAgICAgICAgICAgY3hBc3BlY3Qubm9kZUJ5cGFzc2VzLmZvckVhY2goYnlwYXNzID0+IHtcbiAgICAgICAgICAgICAgICBjeE5vZGVCeXBhc3Nlcy5wdXNoKGJ5cGFzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZUJ5cGFzc2VzJ10pIHtcbiAgICAgICAgICAgIGN4QXNwZWN0LmVkZ2VCeXBhc3Nlcy5mb3JFYWNoKGJ5cGFzcyA9PiB7XG4gICAgICAgICAgICAgICAgY3hFZGdlQnlwYXNzZXMucHVzaChieXBhc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBvdXRwdXQgPSB7fTtcblxuICAgIGxldCBub2RlVmlld3MgPSBbXTtcbiAgICBsZXQgZWRnZVZpZXdzID0gW107XG5cbiAgICBjeFZpc3VhbFByb3BlcnRpZXMuZm9yRWFjaCh2cEVsZW1lbnQgPT4ge1xuXG4gICAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZXMgPSB2cEVsZW1lbnQuZGVmYXVsdDtcblxuICAgICAgICBkZWZhdWx0VmFsdWVzID0gZ2V0RGVmYXVsdFZhbHVlcyhkZWZhdWx0U3R5bGVzKTtcblxuICAgICAgICBtYXBwaW5ncy5ub2RlID0gdnBFbGVtZW50Lm5vZGVNYXBwaW5nID8gZ2V0TWFwcGluZ3ModnBFbGVtZW50Lm5vZGVNYXBwaW5nKSA6IHt9O1xuICAgICAgICBtYXBwaW5ncy5lZGdlID0gdnBFbGVtZW50LmVkZ2VNYXBwaW5nID8gZ2V0TWFwcGluZ3ModnBFbGVtZW50LmVkZ2VNYXBwaW5nKSA6IHt9O1xuXG5cbiAgICB9KTtcblxuICAgIGN4Tm9kZUJ5cGFzc2VzLmZvckVhY2goKHZwRWxlbWVudCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGtleSA9IHZwRWxlbWVudFtjeENvbnN0YW50cy5JRF0udG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gZ2V0TE5WVmFsdWVzKCdub2RlJywgdnBFbGVtZW50LnYpXG5cbiAgICAgICAgaWYgKCFieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0pIHtcbiAgICAgICAgICAgIGJ5cGFzc01hcHBpbmdzLm5vZGVba2V5XSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2J5cGFzcyBjYWxjdWxhdGVkOiAnICsgSlNPTi5zdHJpbmdpZnkodmFsdWVzLCBudWxsLCAyKSk7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0sIHZhbHVlcyk7XG4gICAgICAgIC8vYnlwYXNzQ1NTRW50cmllcy5wdXNoKGdldEJ5cGFzc0NTU0VudHJ5KCdub2RlJywgdnBFbGVtZW50KSk7XG4gICAgfSk7XG5cbiAgICBjeEVkZ2VCeXBhc3Nlcy5mb3JFYWNoKCh2cEVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gdnBFbGVtZW50W2N4Q29uc3RhbnRzLklEXS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBnZXRMTlZWYWx1ZXMoJ2VkZ2UnLCB2cEVsZW1lbnQudilcblxuICAgICAgICBpZiAoIWJ5cGFzc01hcHBpbmdzLmVkZ2Vba2V5XSkge1xuICAgICAgICAgICAgYnlwYXNzTWFwcGluZ3MuZWRnZVtrZXldID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZygnYnlwYXNzIGNhbGN1bGF0ZWQ6ICcgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZXMsIG51bGwsIDIpKTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKGJ5cGFzc01hcHBpbmdzLmVkZ2Vba2V5XSwgdmFsdWVzKTtcbiAgICB9XG4gICAgKTtcblxuICAgIGNvbnNvbGUubG9nKCdtYXBwaW5nczogJyArIEpTT04uc3RyaW5naWZ5KG1hcHBpbmdzLCBudWxsLCAyKSk7XG5cbiAgICAvL1NlY29uZCBwYXNzLiBcbiAgICAvLyBIZXJlIGlzIHdoZXJlIHRoZSBhY3R1YWwgb3V0cHV0IGlzIGdlbmVyYXRlZC5cblxuICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuXG5cbiAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hJZCA9IGN4Tm9kZVtjeENvbnN0YW50cy5JRF0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZVZpZXcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBjeElkLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogY3hOb2RlWyd6J10gP1xuICAgICAgICAgICAgICAgICAgICAgICAgW2N4Tm9kZVsneCddLCBjeE5vZGVbJ3knXSwgY3hOb2RlWyd6J11dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFtjeE5vZGVbJ3gnXSwgY3hOb2RlWyd5J11dXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9UT0RPIGNhbGN1bGF0ZSBsbnYgdnBzIGJhc2VkIG9uIGRlZmF1bHRzIGFuZCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdE5vZGVWaXN1YWxQcm9wZXJ0aWVzID0gZGVmYXVsdFZhbHVlc1snbm9kZSddO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG5vZGVWaWV3LCBkZWZhdWx0Tm9kZVZpc3VhbFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0Fzc2lnbiBtYXBwaW5nc1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkQXR0cmlidXRlcyA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hOb2RlWyd2J10sIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBwaW5nVmFsdWVzID0gZ2V0TWFwcGVkVmFsdWVzKG1hcHBpbmdzLCAnbm9kZScsIGV4cGFuZGVkQXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlVmlldywgbWFwcGluZ1ZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICAvL0Fzc2lnbiBieXBhc3NcbiAgICAgICAgICAgICAgICBpZiAoYnlwYXNzTWFwcGluZ3Mubm9kZVtjeElkXSkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG5vZGVWaWV3LCBieXBhc3NNYXBwaW5ncy5ub2RlW2N4SWRdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWROb2RlVmlldyA9IHByb2Nlc3NOb2RlVmlldyhub2RlVmlldyk7XG5cbiAgICAgICAgICAgICAgICBub2RlVmlld3MucHVzaChwcm9jZXNzZWROb2RlVmlldyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG5cbiAgICAgICAgICAgIGN4RWRnZXMuZm9yRWFjaCgoY3hFZGdlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hJZCA9IGN4RWRnZVtjeENvbnN0YW50cy5JRF0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlZGdlVmlldyA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGN4SWQsXG4gICAgICAgICAgICAgICAgICAgIHM6IGN4RWRnZS5zLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHQ6IGN4RWRnZS50LnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL1RPRE8gY2FsY3VsYXRlIGxudiB2cHMgYmFzZWQgb24gZGVmYXVsdHMgYW5kIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0RWRnZVZpc3VhbFByb3BlcnRpZXMgPSBkZWZhdWx0VmFsdWVzWydlZGdlJ107XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWRnZVZpZXcsIGRlZmF1bHRFZGdlVmlzdWFsUHJvcGVydGllcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZXhwYW5kZWRBdHRyaWJ1dGVzID0gY3hVdGlsLmdldEV4cGFuZGVkQXR0cmlidXRlcyhjeEVkZ2VbJ3YnXSwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBpbmdWYWx1ZXMgPSBnZXRNYXBwZWRWYWx1ZXMobWFwcGluZ3MsICdub2RlJywgZXhwYW5kZWRBdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBtYXBwaW5nVmFsdWVzKTtcbiAgICAgICAgICAgICAgICAvL0Fzc2lnbiBieXBhc3NcbiAgICAgICAgICAgICAgICBpZiAoYnlwYXNzTWFwcGluZ3MuZWRnZVtjeElkXSkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBieXBhc3NNYXBwaW5ncy5lZGdlW2N4SWRdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRFZGdlVmlldyA9IHByb2Nlc3NFZGdlVmlldyhlZGdlVmlldyk7XG5cbiAgICAgICAgICAgICAgICBlZGdlVmlld3MucHVzaChwcm9jZXNzZWRFZGdlVmlldyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5ub2RlVmlld3NdID0gbm9kZVZpZXdzO1xuICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuZWRnZVZpZXdzXSA9IGVkZ2VWaWV3cztcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdsbnYnLFxuICAgIGNvbnZlcnQ6IChjeCkgPT4ge1xuICAgICAgICByZXR1cm4gbG52Q29udmVydChjeCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0OiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0LFxuICAgIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQ6IGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQsXG4gICAgY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0OiBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQsXG4gICAgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0OiBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQsXG4gICAgcHJvY2Vzc05vZGVWaWV3OiBwcm9jZXNzTm9kZVZpZXcsXG4gICAgcHJvY2Vzc0VkZ2VWaWV3OiBwcm9jZXNzRWRnZVZpZXcsXG4gICAgZ2V0RGVmYXVsdFZhbHVlczogZ2V0RGVmYXVsdFZhbHVlcyxcbiAgICBpc0luUmFuZ2U6IGlzSW5SYW5nZSxcbiAgICBjb252ZXJ0ZXI6IGNvbnZlcnRlclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICAnbm9kZVZpZXdzJzogJ25vZGVWaWV3cycsXG4gICAgJ2VkZ2VWaWV3cyc6ICdlZGdlVmlld3MnLCBcbiAgICAnaWQnOiAnaWQnLFxuICAgICdwb3NpdGlvbic6ICdwb3NpdGlvbicsXG4gICAgJ3MnOiAncycsXG4gICAgJ3QnOiAndCcsXG4gICAgJ2xhYmVsJzogJ2xhYmVsJywgXG4gICAgJ2xhYmVsQ29sb3InIDogJ2xhYmVsQ29sb3InLFxuICAgICdsYWJlbEZvbnRTaXplJyA6ICdsYWJlbEZvbnRTaXplJyxcbiAgICAnY29sb3InOiAnY29sb3InLFxuICAgICdzaXplJyA6ICdzaXplJyxcbiAgICAnd2lkdGgnIDogJ3dpZHRoJyxcblxuICAgICdwcmVwcm9jZXNzQ29sb3InOiAncHJlcHJvY2Vzc0NvbG9yJyxcbiAgICAncHJlcHJvY2Vzc0FscGhhJzogJ3ByZXByb2Nlc3NBbHBoYScsXG4gICAgJ3ByZXByb2Nlc3NMYWJlbENvbG9yJzogJ3ByZXByb2Nlc3NMYWJlbENvbG9yJyxcbiAgICAncHJlcHJvY2Vzc0xhYmVsQWxwaGEnOiAncHJlcHJvY2Vzc0xhYmVsQWxwaGEnLFxuICAgICdwcmVwcm9jZXNzTm9kZVdpZHRoJyA6ICdwcmVwcm9jZXNzTm9kZVdpZHRoJyxcbiAgICAncHJlcHJvY2Vzc05vZGVIZWlnaHQnIDogJ3ByZXByb2Nlc3NOb2RlSGVpZ2h0J1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmtDb25zdGFudHMuanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGpzQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9jeXRvc2NhcGVKU0NvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpIHtcbiAgICBjb25zdCB0YXJnZXRTdHlsZUVudHJ5ID0gbmV3IE1hcCgpO1xuICAgIHRhcmdldFN0eWxlRW50cnkuc2V0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKTtcbiAgICByZXR1cm4gdGFyZ2V0U3R5bGVFbnRyeTtcbn1cblxuY29uc3QgZGVmYXVsdFByb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfU0hBUEUnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9XSURUSCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0ZPTlRfU0laRSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MQUJFTCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xBQkVMX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xBQkVMX0ZPTlRfU0laRSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbn1cblxuZnVuY3Rpb24gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgY29uc3Qgb3V0cHV0ID0ge307XG4gICAgb3V0cHV0W3RhcmdldFN0eWxlRmllbGRdID0gJ2RhdGEoJyArIGF0dHJpYnV0ZU5hbWUgKyAnKSc7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgcGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfU0hBUEUnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIGF0dHJpYnV0ZU5hbWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9MQUJFTCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG59XG5mdW5jdGlvbiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIGlmIChtaW5WYWx1ZSAhPSB1bmRlZmluZWQgJiYgbWF4VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9ICdtYXBEYXRhKCcgKyBhdHRyaWJ1dGVOYW1lXG4gICAgICAgICsgJywgJyArIG1pblZhbHVlXG4gICAgICAgICsgJywgJyArIG1heFZhbHVlXG4gICAgICAgICsgJywgJyArIG1pblZQXG4gICAgICAgICsgJywgJyArIG1heFZQXG4gICAgICAgICsgJyknO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtaW5WYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvdXRwdXRbdGFyZ2V0U3R5bGVGaWVsZF0gPSBtYXhWUDtcbiAgICAgICAgfSBlbHNlIGlmIChtYXhWYWx1ZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9IG1pblZQO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IG1hcERhdGFQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKVxuXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGluZV9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MQUJFTCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApXG4gICAgfSxcbn1cblxuXG5mdW5jdGlvbiBnZXRDU1NTdHlsZUVudHJpZXMoY3hTdHlsZUVudHJpZXMsIGVudGl0eVR5cGUpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgT2JqZWN0LmtleXMoY3hTdHlsZUVudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBwb3J0YWJsZVByb3BlcnR5VmFsdWUgPSBjeFN0eWxlRW50cmllc1trZXldO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtrZXldKSB7XG4gICAgICAgICAgICBjb25zdCBjc3NFbnRyaWVzID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtrZXldKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICBjc3NFbnRyaWVzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRJZFNlbGVjdG9yKGlkLCBlbGVtZW50VHlwZSkge1xuICAgIC8vbm9kZSNpZCBvciBlZGdlI2lkXG4gICAgcmV0dXJuIGVsZW1lbnRUeXBlICsgJyMnICsgaWQ7XG59XG5cblxuXG5mdW5jdGlvbiBnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcykge1xuICAgIHJldHVybiB7ICdzZWxlY3Rvcic6IHNlbGVjdG9yLCAnc3R5bGUnOiBjc3MgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29udGludW91c1NlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgaW5jbHVkZU1pbiwgaW5jbHVkZU1heCkge1xuICAgIGNvbnN0IG1pbkNvbmRpdGlvbiA9IGluY2x1ZGVNaW4gPyAnPj0nIDogJz4nO1xuICAgIGNvbnN0IG1heENvbmRpdGlvbiA9IGluY2x1ZGVNYXggPyAnPD0nIDogJzwnO1xuICAgIGNvbnN0IG1pbkJvdW5kID0gKG1pblZhbHVlICE9PSB1bmRlZmluZWQpID8gJ1snICsgYXR0cmlidXRlTmFtZSArICcgJyArIG1pbkNvbmRpdGlvbiArICcgJyArIG1pblZhbHVlICsgJ10nIDogJyc7XG4gICAgY29uc3QgbWF4Qm91bmQgPSAobWF4VmFsdWUgIT09IHVuZGVmaW5lZCkgPyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyAnICsgbWF4Q29uZGl0aW9uICsgJyAnICsgbWF4VmFsdWUgKyAnXScgOiAnJztcbiAgICByZXR1cm4gZW50aXR5VHlwZSArIG1pbkJvdW5kICsgbWF4Qm91bmQ7XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNTdHlsZShlbnRpdHlUeXBlLCBwb3J0YWJsZVByb3BlcnR5S2V5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkge1xuICAgIGlmIChtYXBEYXRhUHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgIHJldHVybiBtYXBEYXRhUHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKTtcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnYXR0cmlidXRlJ107XG4gICAgY29uc3QgcmFuZ2VNYXBzID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgY29uc29sZS5sb2coJ2NvbnRpbnVvdXMgbWFwcGluZyBmb3IgJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgSlNPTi5zdHJpbmdpZnkocmFuZ2VNYXBzLCBudWxsLCAyKSk7XG5cbiAgICByYW5nZU1hcHMuZm9yRWFjaCgocmFuZ2UpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRDb250aW51b3VzU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIHJhbmdlLmluY2x1ZGVNaW4sIHJhbmdlLmluY2x1ZGVNYXgpO1xuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbnRpbnVvdXNTdHlsZShlbnRpdHlUeXBlLCBwb3J0YWJsZVByb3BlcnR5S2V5LCBhdHRyaWJ1dGVOYW1lLCByYW5nZS5taW4sIHJhbmdlLm1heCwgcmFuZ2UubWluVlBWYWx1ZSwgcmFuZ2UubWF4VlBWYWx1ZSk7XG5cbiAgICAgICAgb3V0cHV0LnB1c2goZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBzdHlsZSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUpIHtcbiAgICBpZiAocGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICBjb25zdCBjc3MgPSBwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGN4TWFwcGluZ0RlZmluaXRpb24uYXR0cmlidXRlKTtcbiAgICAgICAgcmV0dXJuIGdldFN0eWxlRWxlbWVudChlbnRpdHlUeXBlLCBjc3MpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEYXRhVHlwZSwgYXR0cmlidXRlVmFsdWUpIHtcbiAgICBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyA9IFxcJycgKyBhdHRyaWJ1dGVWYWx1ZSArICdcXCddJztcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZURhdGFUeXBlID09ICdib29sZWFuJykge1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVWYWx1ZSA9PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1s/JyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnXVshJyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gJyArIGF0dHJpYnV0ZVZhbHVlICsgJ10nO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyhwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIGNvbnN0IGF0dHRyaWJ1dGVUb1ZhbHVlTWFwID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ2F0dHJpYnV0ZSddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZURhdGFUeXBlID0gYXR0cmlidXRlVHlwZU1hcC5nZXQoYXR0cmlidXRlTmFtZSk7XG4gICAgYXR0dHJpYnV0ZVRvVmFsdWVNYXAuZm9yRWFjaCgoZGlzY3JldGVNYXApID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJyBkaXNjcmV0ZSBtYXAgZm9yICcgKyBwb3J0YWJsZVByb3BlcnR5S2V5ICsgJzogJyArIGRpc2NyZXRlTWFwLnYgKyAnICgnICsgYXR0cmlidXRlTmFtZSArICc8JyArIGF0dHJpYnV0ZURhdGFUeXBlICsgJz4pIC0+ICcgKyBkaXNjcmV0ZU1hcC52cCk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXREaXNjcmV0ZVNlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURhdGFUeXBlLCBkaXNjcmV0ZU1hcC52KTtcblxuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGRpc2NyZXRlTWFwLnZwKTtcbiAgICAgICAgICAgIGNvbnN0IGNzcyA9IHt9O1xuICAgICAgICAgICAgc3R5bGVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGNzc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcgICBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGNzcykpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIHJldHVybiBvdXRwdXQ7IC8vZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpO1xufVxuXG5mdW5jdGlvbiBnZXRCeXBhc3NDU1NFbnRyeShlbnRpdHlUeXBlLCBjeEVsZW1lbnQpIHtcblxuICAgIGNvbnN0IGlkID0gY3hFbGVtZW50LmlkO1xuICAgIGNvbnN0IGNzcyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4RWxlbWVudC52KS5mb3JFYWNoKChwb3J0YWJsZVByb3BlcnR5S2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGN4RWxlbWVudC52W3BvcnRhYmxlUHJvcGVydHlLZXldO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICBzdHlsZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY3NzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWxlY3RvciA9IGdldElkU2VsZWN0b3IoaWQsIGVudGl0eVR5cGUpO1xuICAgIHJldHVybiBnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcyk7XG59XG5cbi8qKiBcbiAqIFxuKi9cbmZ1bmN0aW9uIGdldENTU01hcHBpbmdFbnRyaWVzKFxuICAgIGN4TWFwcGluZ0VudHJpZXMsXG4gICAgZW50aXR5VHlwZSxcbiAgICBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIGN4TWFwcGluZ0VudHJpZXMgJiYgT2JqZWN0LmtleXMoY3hNYXBwaW5nRW50cmllcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IGN4TWFwcGluZ0VudHJ5ID0gY3hNYXBwaW5nRW50cmllc1trZXldO1xuICAgICAgICBjb25zb2xlLmxvZyhcIiBtYXBwaW5nIHR5cGU6IFwiICsgY3hNYXBwaW5nRW50cnkudHlwZSk7XG4gICAgICAgIHN3aXRjaCAoY3hNYXBwaW5nRW50cnkudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnQ09OVElOVU9VUyc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250aW5vdXNNYXBwaW5ncyA9IGdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cmllcyhrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApO1xuICAgICAgICAgICAgICAgIGNvbnRpbm91c01hcHBpbmdzLmZvckVhY2goKGNvbnRpbm91c01hcHBpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goY29udGlub3VzTWFwcGluZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ1BBU1NUSFJPVUdIJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNzc0VudHJ5ID0gZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlKTtcbiAgICAgICAgICAgICAgICBpZiAoY3NzRW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goY3NzRW50cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ0RJU0NSRVRFJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlTWFwcGluZ3MgPSBnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzKGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCk7XG4gICAgICAgICAgICAgICAgZGlzY3JldGVNYXBwaW5ncy5mb3JFYWNoKChkaXNjcmV0ZU1hcHBpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goZGlzY3JldGVNYXBwaW5nKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgTk9ERV9TRUxFQ1RPUiA9ICdub2RlJztcbmNvbnN0IEVER0VfU0VMRUNUT1IgPSAnZWRnZSc7XG5cbmZ1bmN0aW9uIGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBjeE5vZGVCeXBhc3NlcywgY3hFZGdlQnlwYXNzZXMsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICBsZXQgZGVmYXVsdENTU05vZGVTdHlsZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgZGVmYXVsdENTU0VkZ2VTdHlsZSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IG1hcHBpbmdDU1NOb2RlU3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG1hcHBpbmdDU1NFZGdlU3R5bGUgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgYnlwYXNzQ1NTRW50cmllcyA9IFtdO1xuXG4gICAgY3hWaXN1YWxQcm9wZXJ0aWVzLmZvckVhY2goKHZwRWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCBkZWZhdWx0U3R5bGVzID0gdnBFbGVtZW50LmRlZmF1bHQ7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2RlZmF1bHQgc3R5bGU6ICcgKyBKU09OLnN0cmluZ2lmeShkZWZhdWx0U3R5bGVzKSk7XG4gICAgICAgIGRlZmF1bHRDU1NOb2RlU3R5bGUgPSBnZXRDU1NTdHlsZUVudHJpZXMoZGVmYXVsdFN0eWxlcy5ub2RlLCAnbm9kZScpO1xuICAgICAgICBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gZ2V0Q1NTU3R5bGVFbnRyaWVzKGRlZmF1bHRTdHlsZXMuZWRnZSwgJ2VkZ2UnKTtcblxuICAgICAgICBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gZGVmYXVsdFN0eWxlcy5uZXR3b3JrWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgY29uc3Qgbm9kZU1hcHBpbmcgPSB2cEVsZW1lbnQubm9kZU1hcHBpbmc7XG4gICAgICAgIG1hcHBpbmdDU1NOb2RlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhub2RlTWFwcGluZywgJ25vZGUnLCBub2RlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgY29uc3QgZWRnZU1hcHBpbmcgPSB2cEVsZW1lbnQuZWRnZU1hcHBpbmc7XG4gICAgICAgIG1hcHBpbmdDU1NFZGdlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhlZGdlTWFwcGluZywgJ2VkZ2UnLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICB9KVxuXG4gICAgY3hOb2RlQnlwYXNzZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGJ5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnbm9kZScsIHZwRWxlbWVudCkpO1xuICAgIH0pO1xuXG4gICAgY3hFZGdlQnlwYXNzZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGJ5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnZWRnZScsIHZwRWxlbWVudCkpO1xuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coJ2RlZmF1bHQgbm9kZSBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGRlZmF1bHRDU1NOb2RlU3R5bGUpKTtcblxuICAgIC8vQWRkIGRlZmF1bHQgc3R5bGVcbiAgICBvdXRwdXQuc3R5bGUucHVzaChnZXRTdHlsZUVsZW1lbnQoTk9ERV9TRUxFQ1RPUiwgZGVmYXVsdENTU05vZGVTdHlsZSkpO1xuICAgIG91dHB1dC5zdHlsZS5wdXNoKGdldFN0eWxlRWxlbWVudChFREdFX1NFTEVDVE9SLCBkZWZhdWx0Q1NTRWRnZVN0eWxlKSk7XG5cbiAgICBvdXRwdXQuc3R5bGUucHVzaC5hcHBseShvdXRwdXQuc3R5bGUsIG1hcHBpbmdDU1NOb2RlU3R5bGUpO1xuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgbWFwcGluZ0NTU0VkZ2VTdHlsZSk7XG5cbiAgICBvdXRwdXQuc3R5bGUucHVzaC5hcHBseShvdXRwdXQuc3R5bGUsIGJ5cGFzc0NTU0VudHJpZXMpO1xuXG4gICAgb3V0cHV0WydiYWNrZ3JvdW5kLWNvbG9yJ10gPSBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgY29udmVydGVyID0ge1xuICAgIHRhcmdldEZvcm1hdDogJ2N5dG9zY2FwZUpTJyxcbiAgICBjb252ZXJ0OiAoY3gpID0+IHtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0ge1xuICAgICAgICAgICAgc3R5bGU6IFtdLFxuICAgICAgICAgICAgZWxlbWVudHM6IHt9LFxuICAgICAgICAgICAgbGF5b3V0OiB7fSxcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN4VmlzdWFsUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGN4Tm9kZUJ5cGFzc2VzID0gW107XG4gICAgICAgIGxldCBjeEVkZ2VCeXBhc3NlcyA9IFtdO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgICAgICAgICAgICAgY3hVdGlsLnByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeE5vZGVbJ3YnXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuICAgICAgICAgICAgICAgIGN4RWRnZXMuZm9yRWFjaCgoY3hFZGdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hFZGdlWyd2J10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVCeXBhc3NlcyddKSB7XG4gICAgICAgICAgICAgICAgY3hBc3BlY3Qubm9kZUJ5cGFzc2VzLmZvckVhY2goYnlwYXNzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hOb2RlQnlwYXNzZXMucHVzaChieXBhc3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZUJ5cGFzc2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjeEFzcGVjdC5lZGdlQnlwYXNzZXMuZm9yRWFjaChieXBhc3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjeEVkZ2VCeXBhc3Nlcy5wdXNoKGJ5cGFzcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLmZvckVhY2goKGluZmVycmVkVHlwZSwgYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luZmVycmVkIGF0dHJpYnV0ZSB0eXBlIGZvciBub2RlOiAnICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcC5mb3JFYWNoKChpbmZlcnJlZFR5cGUsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3IgZWRnZTogJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9BZGQgbm9kZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydub2RlcyddID0gW107XG5cbiAgICAgICAgLy9BZGQgZWRnZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydlZGdlcyddID0gW107XG5cblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuICAgICAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddID0gY3hVdGlsLmdldEV4cGFuZGVkQXR0cmlidXRlcyhjeE5vZGVbJ3YnXSwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ2lkJ10gPSBjeE5vZGUuaWQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsncG9zaXRpb24nXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGN4Tm9kZVsneCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogY3hOb2RlWyd5J11cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMubm9kZXMucHVzaChlbGVtZW50KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcbiAgICAgICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hFZGdlWyd2J10sIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydpZCddID0gY3hFZGdlLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnc291cmNlJ10gPSBjeEVkZ2VbJ3MnXTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWyd0YXJnZXQnXSA9IGN4RWRnZVsndCddO1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMuZWRnZXMucHVzaChlbGVtZW50KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzdHlsZSA9IGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBjeE5vZGVCeXBhc3NlcywgY3hFZGdlQnlwYXNzZXMsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgb3V0cHV0LnN0eWxlID0gc3R5bGUuc3R5bGU7XG4gICAgICAgIGNvbnNvbGUubG9nKCd2aXN1YWxQcm9wZXJ0aWVzOiAnICsgSlNPTi5zdHJpbmdpZnkoY3hWaXN1YWxQcm9wZXJ0aWVzLCBudWxsLCAyKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KG91dHB1dC5zdHlsZSwgbnVsbCwgMikpO1xuXG4gICAgICAgIG91dHB1dFsnYmFja2dyb3VuZC1jb2xvciddID0gc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXTtcblxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydGVyOiBjb252ZXJ0ZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTLmpzIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgICdzaGFwZSc6ICdzaGFwZScsXG4gICAgJ3dpZHRoJzogJ3dpZHRoJywgXG4gICAgJ2hlaWdodCc6ICdoZWlnaHQnLFxuICAgICdiYWNrZ3JvdW5kX2NvbG9yJzogJ2JhY2tncm91bmQtY29sb3InLFxuICAgICdiYWNrZ3JvdW5kX29wYWNpdHknOiAnYmFja2dyb3VuZC1vcGFjaXR5JyxcbiAgICAnbGFiZWwnOiAnbGFiZWwnLFxuICAgICdsYWJlbF9jb2xvcic6ICdjb2xvcicsXG4gICAgJ2xhYmVsX2ZvbnRfc2l6ZScgOiAnZm9udC1zaXplJyxcbiAgICAnbGFiZWxfb3BhY2l0eScgOiAndGV4dC1vcGFjaXR5JyxcbiAgICAnb3BhY2l0eSc6ICdvcGFjaXR5JyxcbiAgICAnbGluZV9jb2xvcic6ICdsaW5lLWNvbG9yJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==