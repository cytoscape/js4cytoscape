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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var defaultConverters = {
    largeNetwork: largeNetwork,
    cytoscapeJS: cytoscapeJS
};

function convert(cx, targetFormat) {
    var converters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultConverters;

    verifyVersion(cx);
    var selectedConverter = undefined;
    converters.forEach(function (converter) {
        if (converter.converter.targetFormat === targetFormat) {
            if ((typeof selectedConverter === 'undefined' ? 'undefined' : _typeof(selectedConverter)) == undefined) {
                selectedConverter = converter;
            } else {
                throw 'converters contain multiple entries for target format: ' + targetFormat;
            }
        }
    });

    if ((typeof selectedConverter === 'undefined' ? 'undefined' : _typeof(selectedConverter)) == undefined) {
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

    return alphatoInt(alphaDecimal);
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
    var maxSatisfied = includeMax ? max >= attributeValue : min < attributeValue;
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
    processNodeView: processNodeView,
    processEdgeView: processEdgeView,
    getDefaultValues: getDefaultValues,
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

            console.log('portable node style: ' + JSON.stringify(defaultStyles.node));
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

    console.log('default node style: ' + JSON.stringify(defaultCSSNodeStyle));

    //Add default style
    output.style.push(getStyleElement(NODE_SELECTOR, defaultCSSNodeStyle));
    output.style.push(getStyleElement(EDGE_SELECTOR, defaultCSSEdgeStyle));

    output.style.push.apply(output.style, mappingCSSNodeStyle);
    output.style.push.apply(output.style, mappingCSSEdgeStyle);

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

        var style = getVisualProperties(cxVisualProperties, nodeAttributeTypeMap, edgeAttributeTypeMap);

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
    'label_opacity': 'text-opacity',
    'opacity': 'opacity',
    'line_color': 'line-color'
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkYmIxMDEwYWU5ZDk1NDdkOWVjZiIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsIlBPIiwiZ2V0Q3hWZXJzaW9uIiwidmVyc2lvblN0cmluZyIsInZlcnNpb25BcnJheSIsInNwbGl0IiwibWFwIiwibnVtYmVyU3RyaW5nIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXNOYU4iLCJlbGVtZW50IiwiZ2V0Q3hNYWpvclZlcnNpb24iLCJwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVBdHRyaWJ1dGVUeXBlTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwiZWRnZUF0dHJpYnV0ZVR5cGVNYXAiLCJlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjeEF0dHJpYnV0ZURlY2xhcmF0aW9uIiwidXBkYXRlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVzIiwidXBkYXRlQXR0cmlidXRlVHlwZU1hcCIsInVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VzIiwiYXR0cmlidXRlVHlwZU1hcCIsImF0dHJpYnV0ZURlY2xhcmF0aW9ucyIsImtleXMiLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlRGVjbGFyYXRpb24iLCJzZXQiLCJkIiwiYXR0cmlidXRlTmFtZU1hcCIsImEiLCJhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJ2IiwidXBkYXRlSW5mZXJyZWRUeXBlcyIsImtleSIsImhhcyIsInZhbHVlIiwiaW5mZXJyZWRUeXBlIiwibmV3S2V5IiwiZ2V0IiwiZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzIiwiZGF0YSIsImNvbnZlcnRlciIsInJlcXVpcmUiLCJjb252ZXJ0IiwiY3giLCJ0YXJnZXRGb3JtYXQiLCJjeENvbnN0YW50cyIsImxhcmdlTmV0d29yayIsImN5dG9zY2FwZUpTIiwiY3hVdGlsIiwidmVyaWZ5VmVyc2lvbiIsImZpcnN0RWxlbWVudCIsIm1ham9yVmVyc2lvbiIsImRlZmF1bHRDb252ZXJ0ZXJzIiwiY29udmVydGVycyIsInNlbGVjdGVkQ29udmVydGVyIiwidW5kZWZpbmVkIiwibGFyZ2VOZXR3b3JrQ29uc3RhbnRzIiwic2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCIsInRhcmdldFN0eWxlRmllbGQiLCJwb3J0YWJsZVByb3BlcnRWYWx1ZSIsInRhcmdldFN0eWxlRW50cnkiLCJoZXhUb1JHQiIsImhleCIsInIiLCJnIiwiYiIsImFscGhhVG9JbnQiLCJhbHBoYURlY2ltYWwiLCJjbGFtcCIsIk1hdGgiLCJyb3VuZCIsImRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJwb3J0YWJsZVByb3BlcnR5VmFsdWUiLCJwcmVwcm9jZXNzTm9kZVdpZHRoIiwicHJlcHJvY2Vzc05vZGVIZWlnaHQiLCJwcmVwcm9jZXNzQ29sb3IiLCJwcmVwcm9jZXNzQWxwaGEiLCJsYWJlbCIsInByZXByb2Nlc3NMYWJlbENvbG9yIiwicHJlcHJvY2Vzc0xhYmVsQWxwaGEiLCJsYWJlbEZvbnRTaXplIiwid2lkdGgiLCJnZXREZWZhdWx0VmFsdWVzIiwiZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMiLCJvdXRwdXQiLCJub2RlIiwiZWRnZSIsIm5vZGVEZWZhdWx0IiwibG52RW50cmllcyIsImdldExOVlZhbHVlcyIsImFzc2lnbiIsImVkZ2VEZWZhdWx0IiwiZW50aXR5VHlwZSIsImVudHJpZXMiLCJwb3J0YWJsZVByb3BlcnR5S2V5IiwibG52RW50cnkiLCJsbnZLZXkiLCJwcm9jZXNzQ29sb3IiLCJjb2xvckFycmF5IiwiYWxwaGEiLCJwcm9jZXNzU2l6ZSIsImhlaWdodCIsIm1heCIsInByb2Nlc3NOb2RlVmlldyIsIm5vZGVWaWV3IiwibGFiZWxDb2xvckFycmF5IiwibGFiZWxBbHBoYSIsImlkIiwicG9zaXRpb24iLCJjb2xvciIsImxhYmVsQ29sb3IiLCJzaXplIiwicHJvY2Vzc0VkZ2VWaWV3IiwiZWRnZVZpZXciLCJzIiwidCIsImdldE1hcHBpbmdzIiwibWFwcGluZ3MiLCJtYXBwaW5nIiwicHJvcGVydHlLZXkiLCJkZWZpbml0aW9uIiwiYXR0cmlidXRlIiwidHlwZSIsInZwIiwiZ2V0QXR0cmlidXRlUmF0aW8iLCJhdHRyaWJ1dGVWYWx1ZSIsImF0dHJpYnV0ZU1pbiIsImF0dHJpYnV0ZU1heCIsImdldFZwUmFuZ2UiLCJ2cE1pbiIsInZwTWF4IiwiZ2V0TWFwIiwidnBSYW5nZSIsImF0dHJpYnV0ZVJhdGlvIiwibWluIiwiY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydCIsImNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydCIsIm1pblJHQiIsIm1heFJHQiIsInJSYW5nZSIsImdSYW5nZSIsImJSYW5nZSIsImNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydCIsImFscGhhdG9JbnQiLCJjb250aW51b3VzUHJvcGVydHlDb252ZXJ0IiwiaXNJblJhbmdlIiwiaW5jbHVkZU1pbiIsImluY2x1ZGVNYXgiLCJtaW5TYXRpc2ZpZWQiLCJtYXhTYXRpc2ZpZWQiLCJnZXRNYXBwcGVkVmFsdWVzIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZUtleSIsImRpc2NyZXRlTWFwIiwia2V5VmFsdWUiLCJjb252ZXJ0ZWQiLCJjb250aW51b3VzTWFwcGluZ3MiLCJtYXBwaW5nUmFuZ2UiLCJtaW5WUFZhbHVlIiwibWF4VlBWYWx1ZSIsImxudkNvbnZlcnQiLCJjeFZpc3VhbFByb3BlcnRpZXMiLCJNYXAiLCJkZWZhdWx0VmFsdWVzIiwiYnlwYXNzTWFwcGluZ3MiLCJjeEFzcGVjdCIsImN4Tm9kZXMiLCJjeE5vZGUiLCJjeEVkZ2VzIiwiY3hFZGdlIiwibm9kZVZpZXdzIiwiZWRnZVZpZXdzIiwidnBBdCIsInZwRWxlbWVudCIsImF0IiwiZGVmYXVsdFN0eWxlcyIsImRlZmF1bHQiLCJub2RlTWFwcGluZyIsImVkZ2VNYXBwaW5nIiwidG9TdHJpbmciLCJ2YWx1ZXMiLCJjeElkIiwiZGVmYXVsdE5vZGVWaXN1YWxQcm9wZXJ0aWVzIiwiZXhwYW5kZWRBdHRyaWJ1dGVzIiwibWFwcGluZ1ZhbHVlcyIsInByb2Nlc3NlZE5vZGVWaWV3IiwicHVzaCIsImRlZmF1bHRFZGdlVmlzdWFsUHJvcGVydGllcyIsInByb2Nlc3NlZEVkZ2VWaWV3IiwianNDb25zdGFudHMiLCJzaGFwZSIsImJhY2tncm91bmRfY29sb3IiLCJiYWNrZ3JvdW5kX29wYWNpdHkiLCJsYWJlbF9jb2xvciIsImxhYmVsX29wYWNpdHkiLCJsYWJlbF9mb250X3NpemUiLCJvcGFjaXR5IiwibGluZV9jb2xvciIsInNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0Iiwic2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydCIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJtaW5WUCIsIm1heFZQIiwibWFwRGF0YVByb3BlcnR5Q29udmVydCIsImdldENTU1N0eWxlRW50cmllcyIsImN4U3R5bGVFbnRyaWVzIiwiY3NzRW50cmllcyIsImdldElkU2VsZWN0b3IiLCJlbGVtZW50VHlwZSIsImdldFN0eWxlRWxlbWVudCIsInNlbGVjdG9yIiwiY3NzIiwiZ2V0Q29udGludW91c1NlbGVjdG9yIiwibWluQ29uZGl0aW9uIiwibWF4Q29uZGl0aW9uIiwiZ2V0Q29udGludW91c1N0eWxlIiwiZ2V0Q29udGludW91c01hcHBpbmdDU1NFbnRyaWVzIiwiY3hNYXBwaW5nRGVmaW5pdGlvbiIsInJhbmdlTWFwcyIsInJhbmdlIiwic3R5bGUiLCJnZXRQYXNzdGhyb3VnaE1hcHBpbmdDU1NFbnRyeSIsImdldERpc2NyZXRlU2VsZWN0b3IiLCJhdHRyaWJ1dGVEYXRhVHlwZSIsImdldERpc2NyZXRlTWFwcGluZ0NTU0VudHJpZXMiLCJhdHR0cmlidXRlVG9WYWx1ZU1hcCIsInN0eWxlTWFwIiwiZ2V0QnlwYXNzQ1NTRW50cnkiLCJjeEVsZW1lbnQiLCJwbyIsImdldENTU01hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cmllcyIsImN4TWFwcGluZ0VudHJ5IiwiY29udGlub3VzTWFwcGluZ3MiLCJjb250aW5vdXNNYXBwaW5nIiwiY3NzRW50cnkiLCJkaXNjcmV0ZU1hcHBpbmdzIiwiZGlzY3JldGVNYXBwaW5nIiwiTk9ERV9TRUxFQ1RPUiIsIkVER0VfU0VMRUNUT1IiLCJnZXRWaXN1YWxQcm9wZXJ0aWVzIiwiZGVmYXVsdENTU05vZGVTdHlsZSIsImRlZmF1bHRDU1NFZGdlU3R5bGUiLCJjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yIiwibWFwcGluZ0NTU05vZGVTdHlsZSIsIm1hcHBpbmdDU1NFZGdlU3R5bGUiLCJieXBhc3NDU1NFbnRyaWVzIiwibmV0d29yayIsImFwcGx5IiwiZWxlbWVudHMiLCJsYXlvdXQiLCJ4IiwieSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7O1FBRUE7UUFDQTs7Ozs7Ozs7OztBQzVEQUEsT0FBT0MsT0FBUCxHQUFpQkMsT0FBT0MsTUFBUCxDQUFjO0FBQzNCQyxnQkFBWSxXQURlO0FBRTNCQyxVQUFNLE1BRnFCO0FBRzNCQyxVQUFNLE1BSHFCO0FBSTNCQyxhQUFTLFNBSmtCOztBQU0zQkMsV0FBTyxPQU5vQjtBQU8zQkMsV0FBTyxPQVBvQjs7QUFTM0JDLFFBQUksSUFUdUI7QUFVM0JDLE9BQUcsR0FWd0I7QUFXM0JDLE9BQUcsR0FYd0I7QUFZM0JDLE9BQUcsR0Fad0I7QUFhM0JDLE9BQUcsR0Fid0I7O0FBZTNCQyxRQUFJLElBZnVCO0FBZ0IzQkMsT0FBRyxHQWhCd0I7QUFpQjNCQyxPQUFHLEdBakJ3Qjs7QUFtQjNCQyx1QkFBbUIsa0JBbkJRO0FBb0IzQkMsYUFBUyxTQXBCa0I7O0FBc0IzQkMsV0FBTyxPQXRCb0I7O0FBd0IzQkMsUUFBSTtBQXhCdUIsQ0FBZCxDQUFqQixDOzs7Ozs7Ozs7OztBQ0RBLFNBQVNDLFlBQVQsQ0FBc0JDLGFBQXRCLEVBQXFDO0FB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QVFDLEdBQVIsQ0FBWSx1QkFBdUJDLEtBQUtDLFNBQUwsQ0FBZW9KLGtCQUFmLEVBQW1DLElBQW5DLEVBQXlDLENBQXpDLENBQW5DO0FBQ0F2SixnQkFBUUMsR0FBUixDQUFZLFlBQVlDLEtBQUtDLFNBQUwsQ0FBZXVFLE9BQU8wSSxLQUF0QixFQUE2QixJQUE3QixFQUFtQyxDQUFuQyxDQUF4Qjs7QUFFQTFJLGVBQU8sa0JBQVAsSUFBNkIwSSxNQUFNLGtCQUFOLENBQTdCOztBQUVBLGVBQU8xSSxNQUFQO0FBQ0g7QUFsR2EsQ0FBbEI7O0FBcUdBcEgsT0FBT0MsT0FBUCxHQUFpQjtBQUNidUUsZUFBV0E7QUFERSxDQUFqQixDOzs7Ozs7Ozs7QUM5WkF4RSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPQyxNQUFQLENBQWM7QUFDM0IsYUFBUyxPQURrQjtBQUUzQixhQUFTLE9BRmtCO0FBRzNCLGNBQVUsUUFIaUI7QUFJM0Isd0JBQW9CLGtCQUpPO0FBSzNCLDBCQUFzQixvQkFMSztBQU0zQixhQUFTLE9BTmtCO0FBTzNCLG1CQUFlLE9BUFk7QUFRM0IscUJBQWtCLGNBUlM7QUFTM0IsZUFBVyxTQVRnQjtBQVUzQixrQkFBYztBQVZhLENBQWQsQ0FBakIsQyIsImZpbGUiOiIuL2J1aWxkL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkYmIxMDEwYWU5ZDk1NDdkOWVjZiIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBDWF9WRVJTSU9OOiAnQ1hWZXJzaW9uJyxcbiAgICBOT0RFOiAnbm9kZScsXG4gICAgRURHRTogJ2VkZ2UnLFxuICAgIE5FVFdPUks6ICduZXR3b3JrJyxcblxuICAgIE5PREVTOiAnbm9kZXMnLFxuICAgIEVER0VTOiAnZWRnZXMnLFxuXG4gICAgSUQ6ICdpZCcsXG4gICAgWDogJ3gnLFxuICAgIFk6ICd5JyxcbiAgICBaOiAneicsXG4gICAgVjogJ3YnLFxuXG4gICAgQVQ6ICdhdCcsXG4gICAgTjogJ24nLFxuICAgIEU6ICdlJyxcblxuICAgIFZJU1VBTF9QUk9QRVJUSUVTOiAndmlzdWFsUHJvcGVydGllcycsXG4gICAgREVGQVVMVDogJ2RlZmF1bHQnLFxuXG4gICAgU1RZTEU6ICdzdHlsZScsXG5cbiAgICBQTzogJ3BvJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N4Q29uc3RhbnRzLmpzIiwiZnVuY3Rpb24gZ2V0Q3hWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcbiAgICBjb25zdCB2ZXJzaW9uQXJyYXkgPSB2ZXJzaW9uU3RyaW5nLnNwbGl0KCcuJykubWFwKChudW1iZXJTdHJpbmcpID0+IHsgcmV0dXJuIHBhcnNlSW50KG51bWJlclN0cmluZywgMTApOyB9KTtcbiAgICBpZiAodmVyc2lvbkFycmF5Lmxlbmd0aCAhPT0gMiAmJiB2ZXJzaW9uQXJyYXkubGVuZ3RoICE9IDMpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSB2ZXJzaW9uIGZvcm1hdDogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxuICAgIHZlcnNpb25BcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAoaXNOYU4oZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93ICdOb24taW50ZWdlciB2YWx1ZSBpbiB2ZXJzaW9uIHN0cmluZzogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdmVyc2lvbkFycmF5O1xufVxuXG5mdW5jdGlvbiBnZXRDeE1ham9yVmVyc2lvbih2ZXJzaW9uU3RyaW5nKSB7XG4gICAgcmV0dXJuIHZlcnNpb25TdHJpbmcgPyBnZXRDeFZlcnNpb24odmVyc2lvblN0cmluZylbMF0gOiAxO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zKGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBcbiAgICBub2RlQXR0cmlidXRlTmFtZU1hcCwgXG4gICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIFxuICAgIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIFxuICAgIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCwgXG4gICAgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIGNvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMuZm9yRWFjaCgoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbikgPT4ge1xuICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnbm9kZXMnXSkge1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnZWRnZXMnXSkge1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWydkJ10pIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLmQpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAoYXR0cmlidXRlTmFtZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2EnXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlRGVjbGFyYXRpb24uYSArICcgc2hvdWxkIGJlIHJlbmFtZWQgdG8gJyArIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgYXR0cmlidXRlTmFtZU1hcC5zZXQoYXR0cmlidXRlRGVjbGFyYXRpb24uYSwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ3YnXSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlTmFtZSArICcgaGFzIGRlZmF1bHQgdmFsdWUgJyArIGF0dHJpYnV0ZURlY2xhcmF0aW9uLnYpO1xuICAgICAgICAgICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLnNldChhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbi52KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVJbmZlcnJlZFR5cGVzKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZU5hbWVNYXAsIHYpIHtcbiAgICBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgaWYgKCFhdHRyaWJ1dGVUeXBlTWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IGluZmVycmVkVHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQobmV3S2V5LCBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKHYsIGF0dHJpYnV0ZU5hbWVNYXAsIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIGxldCBkYXRhID0ge307XG4gICAgT2JqZWN0LmtleXModikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICBkYXRhW25ld0tleV0gPSB2W2tleV07XG4gICAgfSk7XG4gICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKCFkYXRhW2tleV0pIHtcbiAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEN4VmVyc2lvbjogZ2V0Q3hWZXJzaW9uLFxuICAgIGdldEN4TWFqb3JWZXJzaW9uOiBnZXRDeE1ham9yVmVyc2lvbixcbiAgICBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zOiBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zLFxuICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXA6IHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcDogdXBkYXRlQXR0cmlidXRlTmFtZU1hcCxcbiAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXA6IHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICB1cGRhdGVJbmZlcnJlZFR5cGVzOiB1cGRhdGVJbmZlcnJlZFR5cGVzLFxuICAgIGdldEV4cGFuZGVkQXR0cmlidXRlcyA6IGdldEV4cGFuZGVkQXR0cmlidXRlc1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hVdGlsLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb252ZXJ0ZXIgPSByZXF1aXJlICgnLi9jb252ZXJ0ZXIuanMnKTtcblxubW9kdWxlLmV4cG9ydHMuY29udmVydCA9IChjeCwgdGFyZ2V0Rm9ybWF0KSA9PiB7IHJldHVybiBjb252ZXJ0ZXIuY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0KTsgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmsgPSByZXF1aXJlICgnLi9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrLmpzJyk7IFxuY29uc3QgY3l0b3NjYXBlSlMgPSByZXF1aXJlICgnLi9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKUy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gdmVyaWZ5VmVyc2lvbihjeCkge1xuICAgIGNvbnN0IGZpcnN0RWxlbWVudCA9IGN4WzBdO1xuICAgIGNvbnN0IHZlcnNpb25TdHJpbmcgPSBmaXJzdEVsZW1lbnRbY3hDb25zdGFudHMuQ1hfVkVSU0lPTl07XG5cbiAgICBjb25zdCBtYWpvclZlcnNpb24gPSBjeFV0aWwuZ2V0Q3hNYWpvclZlcnNpb24odmVyc2lvblN0cmluZyk7XG5cbiAgICBpZiAobWFqb3JWZXJzaW9uICE9PSAyKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgQ1ggdmVyc2lvbjogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxufVxuXG5jb25zdCBkZWZhdWx0Q29udmVydGVycyA9IHtcbiAgICBsYXJnZU5ldHdvcmssXG4gICAgY3l0b3NjYXBlSlNcbn1cblxuZnVuY3Rpb24gY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0LCBjb252ZXJ0ZXJzID0gZGVmYXVsdENvbnZlcnRlcnMpIHtcbiAgICB2ZXJpZnlWZXJzaW9uKGN4KTtcbiAgICBsZXQgc2VsZWN0ZWRDb252ZXJ0ZXIgPSB1bmRlZmluZWQ7XG4gICAgY29udmVydGVycy5mb3JFYWNoKCBjb252ZXJ0ZXIgPT4ge1xuICAgICAgICBpZiAoY29udmVydGVyLmNvbnZlcnRlci50YXJnZXRGb3JtYXQgPT09IHRhcmdldEZvcm1hdCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RlZENvbnZlcnRlciA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvbnZlcnRlciA9IGNvbnZlcnRlcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ2NvbnZlcnRlcnMgY29udGFpbiBtdWx0aXBsZSBlbnRyaWVzIGZvciB0YXJnZXQgZm9ybWF0OiAnICsgdGFyZ2V0Rm9ybWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIHNlbGVjdGVkQ29udmVydGVyID09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyAnbm8gY29udmVydGVyIGF2YWlsYWJsZSBmb3IgdGFyZ2V0IGZvcm1hdDogJyArIHRhcmdldEZvcm1hdFxuICAgIH1cblxuICAgIHJldHVybiBzZWxlY3RlZENvbnZlcnRlci5jb252ZXJ0ZXIuY29udmVydChjeClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydDogY29udmVydFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udmVydGVyLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmtDb25zdGFudHMgPSByZXF1aXJlKCcuL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpIHtcbiAgICBjb25zdCB0YXJnZXRTdHlsZUVudHJ5ID0ge307XG4gICAgdGFyZ2V0U3R5bGVFbnRyeVt0YXJnZXRTdHlsZUZpZWxkXSA9IHBvcnRhYmxlUHJvcGVydFZhbHVlO1xuICAgIHJldHVybiB0YXJnZXRTdHlsZUVudHJ5O1xufVxuXG5mdW5jdGlvbiBoZXhUb1JHQihoZXgpIHtcbiAgICBsZXQgciA9IDAsIGcgPSAwLCBiID0gMDtcblxuICAgIC8vIDMgZGlnaXRzXG4gICAgaWYgKGhleC5sZW5ndGggPT0gNCkge1xuICAgICAgICByID0gXCIweFwiICsgaGV4WzFdICsgaGV4WzFdO1xuICAgICAgICBnID0gXCIweFwiICsgaGV4WzJdICsgaGV4WzJdO1xuICAgICAgICBiID0gXCIweFwiICsgaGV4WzNdICsgaGV4WzNdO1xuXG4gICAgICAgIC8vIDYgZGlnaXRzXG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDcpIHtcbiAgICAgICAgciA9IFwiMHhcIiArIGhleFsxXSArIGhleFsyXTtcbiAgICAgICAgZyA9IFwiMHhcIiArIGhleFszXSArIGhleFs0XTtcbiAgICAgICAgYiA9IFwiMHhcIiArIGhleFs1XSArIGhleFs2XTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3BhcnNlSW50KHIpLCBwYXJzZUludChnKSwgcGFyc2VJbnQoYildO1xufVxuXG5mdW5jdGlvbiBhbHBoYVRvSW50KGFscGhhRGVjaW1hbCkge1xuICAgIHJldHVybiBjbGFtcChNYXRoLnJvdW5kKGFscGhhRGVjaW1hbCAqIDI1NSksMCwyNTUpO1xufVxuXG5jb25zdCBkZWZhdWx0UHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9XSURUSCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlV2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlSGVpZ2h0LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yLCBoZXhUb1JHQihwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhLCBhbHBoYVRvSW50KHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9MQUJFTCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yLCBoZXhUb1JHQihwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhLCBhbHBoYVRvSW50KHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnIDogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxGb250U2l6ZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMud2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnRURHRV9MQUJFTCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yLCBoZXhUb1JHQihwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhLCBhbHBoYVRvSW50KHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnIDogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxGb250U2l6ZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH1cbn1cblxuXG5cbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZXMoZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMpIHtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBub2RlOiB7fSxcbiAgICAgICAgZWRnZToge31cbiAgICB9O1xuICAgIGlmIChkZWZhdWx0VmlzdWFsUHJvcGVydGllc1snbm9kZSddKSB7XG4gICAgICAgIGNvbnN0IG5vZGVEZWZhdWx0ID0gZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMubm9kZTtcbiAgICAgICAgY29uc3QgbG52RW50cmllcyA9IGdldExOVlZhbHVlcygnbm9kZScsIG5vZGVEZWZhdWx0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQubm9kZSwgbG52RW50cmllcyk7XG4gICAgfVxuICAgIGlmIChkZWZhdWx0VmlzdWFsUHJvcGVydGllc1snZWRnZSddKSB7XG4gICAgICAgIGNvbnN0IGVkZ2VEZWZhdWx0ID0gZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMuZWRnZTtcbiAgICAgICAgY29uc3QgbG52RW50cmllcyA9IGdldExOVlZhbHVlcygnZWRnZScsIGVkZ2VEZWZhdWx0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQuZWRnZSwgbG52RW50cmllcyk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldExOVlZhbHVlcyhlbnRpdHlUeXBlLCBlbnRyaWVzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGVudHJpZXMpLmZvckVhY2gocG9ydGFibGVQcm9wZXJ0eUtleSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGVudHJpZXNbcG9ydGFibGVQcm9wZXJ0eUtleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBsbnZFbnRyeSA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxudkVudHJ5KS5mb3JFYWNoKGxudktleSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2xudktleV0gPSBsbnZFbnRyeVtsbnZLZXldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NDb2xvcihjb2xvckFycmF5LCBhbHBoYSkge1xuICAgIHJldHVybiBjb2xvckFycmF5ICE9IHVuZGVmaW5lZFxuICAgICAgICA/IGFscGhhICE9IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBbY29sb3JBcnJheVswXSwgY29sb3JBcnJheVsxXSwgY29sb3JBcnJheVsyXSwgYWxwaGFdXG4gICAgICAgICAgICA6IFtjb2xvckFycmF5WzBdLCBjb2xvckFycmF5WzFdLCBjb2xvckFycmF5WzJdXVxuICAgICAgICA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1NpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHJldHVybiBNYXRoLm1heCh3aWR0aCwgaGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc05vZGVWaWV3KG5vZGVWaWV3KSB7XG4gICAgbGV0IHdpZHRoID0gdW5kZWZpbmVkO1xuICAgIGxldCBoZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGNvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGFscGhhID0gdW5kZWZpbmVkO1xuICAgIFxuICAgIGxldCBsYWJlbENvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGxhYmVsQWxwaGEgPSB1bmRlZmluZWQ7XG4gICAgXG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgaWQ6IG5vZGVWaWV3LmlkLFxuICAgICAgICBwb3NpdGlvbjogbm9kZVZpZXcucG9zaXRpb25cbiAgICB9O1xuXG5cbiAgICBPYmplY3Qua2V5cyhub2RlVmlldykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVXaWR0aCkge1xuICAgICAgICAgICAgd2lkdGggPSBub2RlVmlldy5wcmVwcm9jZXNzTm9kZVdpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlSGVpZ2h0KSB7XG4gICAgICAgICAgICBoZWlnaHQgPSBub2RlVmlldy5wcmVwcm9jZXNzTm9kZUhlaWdodDtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IpIHtcbiAgICAgICAgICAgIGNvbG9yQXJyYXkgPSBub2RlVmlldy5wcmVwcm9jZXNzQ29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhKSB7XG4gICAgICAgICAgICBhbHBoYSA9IG5vZGVWaWV3LnByZXByb2Nlc3NBbHBoYTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvcikge1xuICAgICAgICAgICAgbGFiZWxDb2xvckFycmF5ID0gbm9kZVZpZXcucHJlcHJvY2Vzc0xhYmVsQ29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEpIHtcbiAgICAgICAgICAgIGxhYmVsQWxwaGEgPSBub2RlVmlldy5wcmVwcm9jZXNzTGFiZWxBbHBoYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dHB1dFtrZXldID0gbm9kZVZpZXdba2V5XTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29sb3IgPSBwcm9jZXNzQ29sb3IoY29sb3JBcnJheSwgYWxwaGEpO1xuICAgIGlmIChjb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmNvbG9yXSA9IGNvbG9yO1xuICAgIH1cblxuICAgIGNvbnN0IGxhYmVsQ29sb3IgPSBwcm9jZXNzQ29sb3IobGFiZWxDb2xvckFycmF5LCBsYWJlbEFscGhhKTtcbiAgICBpZiAobGFiZWxDb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsQ29sb3JdID0gbGFiZWxDb2xvcjtcbiAgICB9XG5cbiAgICBjb25zdCBzaXplID0gcHJvY2Vzc1NpemUod2lkdGgsIGhlaWdodCk7XG4gICAgaWYgKHNpemUpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5zaXplXSA9IHByb2Nlc3NTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzRWRnZVZpZXcoZWRnZVZpZXcpIHtcbiAgICBsZXQgY29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgYWxwaGEgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgbGFiZWxDb2xvckFycmF5ID0gdW5kZWZpbmVkO1xuICAgIGxldCBsYWJlbEFscGhhID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgaWQ6IGVkZ2VWaWV3LmlkLFxuICAgICAgICBzOiBlZGdlVmlldy5zLFxuICAgICAgICB0OiBlZGdlVmlldy50XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoZWRnZVZpZXcpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NDb2xvcikge1xuICAgICAgICAgICAgY29sb3JBcnJheSA9IGVkZ2VWaWV3LnByZXByb2Nlc3NDb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEpIHtcbiAgICAgICAgICAgIGFscGhhID0gZWRnZVZpZXcucHJlcHJvY2Vzc0FscGhhO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yKSB7XG4gICAgICAgICAgICBsYWJlbENvbG9yQXJyYXkgPSBlZGdlVmlldy5wcmVwcm9jZXNzTGFiZWxDb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSkge1xuICAgICAgICAgICAgbGFiZWxBbHBoYSA9IGVkZ2VWaWV3LnByZXByb2Nlc3NMYWJlbEFscGhhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBlZGdlVmlld1trZXldO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2xvciA9IHByb2Nlc3NDb2xvcihjb2xvckFycmF5LCBhbHBoYSk7XG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuY29sb3JdID0gY29sb3I7XG4gICAgfVxuXG4gICAgY29uc3QgbGFiZWxDb2xvciA9IHByb2Nlc3NDb2xvcihsYWJlbENvbG9yQXJyYXksIGxhYmVsQWxwaGEpO1xuICAgIGlmIChsYWJlbENvbG9yKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxDb2xvcl0gPSBsYWJlbENvbG9yO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldE1hcHBpbmdzKG1hcHBpbmdzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9XG4gICAgT2JqZWN0LmtleXMobWFwcGluZ3MpLmZvckVhY2gocHJvcGVydHlLZXkgPT4ge1xuICAgICAgICBjb25zdCBtYXBwaW5nID0gbWFwcGluZ3NbcHJvcGVydHlLZXldO1xuICAgICAgICBvdXRwdXRbbWFwcGluZy5kZWZpbml0aW9uLmF0dHJpYnV0ZV0gPSB7XG4gICAgICAgICAgICB0eXBlOiBtYXBwaW5nLnR5cGUsXG4gICAgICAgICAgICB2cDogcHJvcGVydHlLZXksXG4gICAgICAgICAgICBkZWZpbml0aW9uOiBtYXBwaW5nLmRlZmluaXRpb25cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cblxuZnVuY3Rpb24gZ2V0QXR0cmlidXRlUmF0aW8oYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4KSB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZVZhbHVlIC8gKGF0dHJpYnV0ZU1heCAtIGF0dHJpYnV0ZU1pbik7XG59XG5cbmZ1bmN0aW9uIGdldFZwUmFuZ2UodnBNaW4sIHZwTWF4KSB7XG4gICAgcmV0dXJuIHZwTWF4IC0gdnBNaW47XG59XG5cbmZ1bmN0aW9uIGdldE1hcCh2cE1pbiwgdnBSYW5nZSwgYXR0cmlidXRlUmF0aW8pIHtcbiAgICByZXR1cm4gdnBNaW4gKyB2cFJhbmdlICogYXR0cmlidXRlUmF0aW87XG59XG5cbmZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgbWluKSwgbWF4KTtcbiAgfVxuXG5mdW5jdGlvbiBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSB7XG4gICAgY29uc3QgYXR0cmlidXRlUmF0aW8gPSBnZXRBdHRyaWJ1dGVSYXRpbyhhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgpO1xuICAgIGNvbnN0IHZwUmFuZ2UgPWdldFZwUmFuZ2UodnBNaW4sIHZwTWF4KTtcblxuICAgIGNvbnN0IG91dHB1dCA9IGdldE1hcCh2cE1pbiwgdnBSYW5nZSwgYXR0cmlidXRlUmF0aW8pO1xuICAgXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSB7XG4gICAgY29uc3QgbWluUkdCID0gaGV4VG9SR0IodnBNaW4pO1xuICAgIGNvbnN0IG1heFJHQiA9IGhleFRvUkdCKHZwTWF4KTtcblxuICAgIGNvbnN0IGF0dHJpYnV0ZVJhdGlvID0gZ2V0QXR0cmlidXRlUmF0aW8oYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4KTtcbiAgICBcbiAgICBjb25zdCByUmFuZ2UgPSBnZXRWcFJhbmdlKG1pblJHQlswXSwgbWF4UkdCWzFdKTtcbiAgICBjb25zdCBnUmFuZ2UgPSBnZXRWcFJhbmdlKG1pblJHQlsxXSwgbWF4UkdCWzFdKTtcbiAgICBjb25zdCBiUmFuZ2UgPSBnZXRWcFJhbmdlKG1pblJHQlsyXSwgbWF4UkdCWzJdKTtcblxuICAgIGNvbnN0IG91dHB1dCA9IFtcbiAgICAgICAgY2xhbXAoTWF0aC5yb3VuZChnZXRNYXAobWluUkdCWzBdLCByUmFuZ2UsIGF0dHJpYnV0ZVJhdGlvKSksIDAsIDI1NSksXG4gICAgICAgIGNsYW1wKE1hdGgucm91bmQoZ2V0TWFwKG1pblJHQlsxXSwgZ1JhbmdlLCBhdHRyaWJ1dGVSYXRpbykpLCAwLCAyNTUpLFxuICAgICAgICBjbGFtcChNYXRoLnJvdW5kKGdldE1hcChtaW5SR0JbMl0sIGJSYW5nZSwgYXR0cmlidXRlUmF0aW8pKSwgMCwgMjU1KVxuICAgIF1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVSYXRpbyA9IGdldEF0dHJpYnV0ZVJhdGlvKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCk7XG4gICAgY29uc3QgdnBSYW5nZSA9Z2V0VnBSYW5nZSh2cE1pbiwgdnBNYXgpO1xuXG4gICAgY29uc3QgYWxwaGFEZWNpbWFsID0gZ2V0TWFwKHZwTWluLCB2cFJhbmdlLCBhdHRyaWJ1dGVSYXRpbyk7XG4gICBcbiAgICByZXR1cm4gYWxwaGF0b0ludChhbHBoYURlY2ltYWwpO1xufVxuXG5jb25zdCBjb250aW51b3VzUHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9XSURUSCc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVXaWR0aCwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlSGVpZ2h0LCBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NDb2xvciwgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhLCBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yLCBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEsIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsRm9udFNpemUsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy53aWR0aCwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEsIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IsIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSwgY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdFREdFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxGb250U2l6ZSwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0luUmFuZ2UoYXR0cmlidXRlVmFsdWUsIG1pbiwgbWF4LCBpbmNsdWRlTWluLCBpbmNsdWRlTWF4KSB7IFxuICAgIGNvbnN0IG1pblNhdGlzZmllZCA9IGluY2x1ZGVNaW4gPyBtaW4gPD0gYXR0cmlidXRlVmFsdWUgOiBtaW4gPCBhdHRyaWJ1dGVWYWx1ZTtcbiAgICBjb25zdCBtYXhTYXRpc2ZpZWQgPSBpbmNsdWRlTWF4ID8gbWF4ID49IGF0dHJpYnV0ZVZhbHVlIDogbWluIDwgYXR0cmlidXRlVmFsdWU7XG4gICAgY29uc29sZS5sb2coJ2lzSW5SYW5nZTogJyArIGF0dHJpYnV0ZVZhbHVlICsgJyAnICsgbWluICsgJyAnICsgbWF4ICsgJyAnICsgaW5jbHVkZU1pbiArICcgJyArIGluY2x1ZGVNYXggKyAnICcgKyBtaW5TYXRpc2ZpZWQgKyAnICcgKyBtYXhTYXRpc2ZpZWQpO1xuICAgIHJldHVybiBtaW5TYXRpc2ZpZWQgJiYgbWF4U2F0aXNmaWVkOyAgIFxufVxuXG5mdW5jdGlvbiBnZXRNYXBwcGVkVmFsdWVzKG1hcHBpbmdzLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goYXR0cmlidXRlS2V5ID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZUtleV07XG4gICAgICAgIGlmIChtYXBwaW5nc1tlbnRpdHlUeXBlXVthdHRyaWJ1dGVLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBtYXBwaW5nID0gbWFwcGluZ3NbZW50aXR5VHlwZV1bYXR0cmlidXRlS2V5XTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKG1hcHBpbmcudHlwZSA9PT0gJ0RJU0NSRVRFJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNjcmV0ZU1hcCA9IG1hcHBpbmcuZGVmaW5pdGlvbi5tYXA7XG4gICAgICAgICAgICAgICAgICAgIGRpc2NyZXRlTWFwLmZvckVhY2goa2V5VmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleVZhbHVlLnYgPT0gYXR0cmlidXRlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0oa2V5VmFsdWUudnApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgY29udmVydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWFwcGluZy50eXBlID09PSAnUEFTU1RIUk9VR0gnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0oYXR0cmlidXRlVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIGNvbnZlcnRlZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hcHBpbmcudHlwZSA9PT0gJ0NPTlRJTlVPVVMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRpbnVvdXNNYXBwaW5ncyA9IG1hcHBpbmcuZGVmaW5pdGlvbi5tYXA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVvdXNNYXBwaW5ncy5mb3JFYWNoKG1hcHBpbmdSYW5nZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJ21pbicgaW4gbWFwcGluZ1JhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgJ21heCcgaW4gbWFwcGluZ1JhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgJ2luY2x1ZGVNaW4nIGluIG1hcHBpbmdSYW5nZSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAnaW5jbHVkZU1heCcgaW4gbWFwcGluZ1JhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW5SYW5nZShhdHRyaWJ1dGVWYWx1ZSwgbWFwcGluZ1JhbmdlLm1pbiwgbWFwcGluZ1JhbmdlLm1heCwgbWFwcGluZ1JhbmdlLmluY2x1ZGVNaW4sIG1hcHBpbmdSYW5nZS5pbmNsdWRlTWF4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgY29udGludW91c1Byb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udmVydGVkID0gY29udGludW91c1Byb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXShhdHRyaWJ1dGVWYWx1ZSwgbWFwcGluZ1JhbmdlLm1pbiwgbWFwcGluZ1JhbmdlLm1heCwgbWFwcGluZ1JhbmdlLm1pblZQVmFsdWUsIG1hcHBpbmdSYW5nZS5tYXhWUFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0LCBjb252ZXJ0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGxudkNvbnZlcnQoY3gpIHtcblxuICAgIC8vRmlyc3QgcGFzcy4gXG4gICAgLy8gV2UgbWF5IG5lZWQgdG8gY29sbGVjdCBvYmplY3QgYXR0cmlidXRlcyB0byBjYWxjdWxhdGVcbiAgICAvLyBtYXBwaW5ncyBpbiB0aGUgc2Vjb25kIHBhc3MuIFxuXG4gICAgbGV0IGN4VmlzdWFsUHJvcGVydGllcztcblxuICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICBsZXQgZWRnZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICBsZXQgbm9kZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICBsZXQgZGVmYXVsdFZhbHVlcyA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbWFwcGluZ3MgPSB7XG4gICAgICAgIG5vZGU6IHt9LFxuICAgICAgICBlZGdlOiB7fVxuICAgIH1cbiAgICBsZXQgYnlwYXNzTWFwcGluZ3MgPSB7XG4gICAgICAgICdub2RlJzoge30sXG4gICAgICAgICdlZGdlJzoge31cbiAgICB9O1xuXG4gICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMgPSBjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ107XG4gICAgICAgICAgICBjeFV0aWwucHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyhjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeE5vZGVbJ3YnXSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hFZGdlWyd2J10pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICBjeFZpc3VhbFByb3BlcnRpZXMgPSBjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgb3V0cHV0ID0ge307XG5cbiAgICBsZXQgbm9kZVZpZXdzID0gW107XG4gICAgbGV0IGVkZ2VWaWV3cyA9IFtdO1xuXG4gICAgY3hWaXN1YWxQcm9wZXJ0aWVzLmZvckVhY2godnBFbGVtZW50ID0+IHtcbiAgICAgICAgY29uc3QgdnBBdCA9IHZwRWxlbWVudC5hdDtcbiAgICAgICAgaWYgKHZwQXQgPT09IGN4Q29uc3RhbnRzLlNUWUxFKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZwRWxlbWVudC52O1xuICAgICAgICAgICAgY29uc3QgZGVmYXVsdFN0eWxlcyA9IHZhbHVlLmRlZmF1bHQ7XG5cbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZXMgPSBnZXREZWZhdWx0VmFsdWVzKGRlZmF1bHRTdHlsZXMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBtYXBwaW5ncy5ub2RlID0gdmFsdWUubm9kZU1hcHBpbmcgPyBnZXRNYXBwaW5ncyh2YWx1ZS5ub2RlTWFwcGluZykgOiB7fTtcbiAgICAgICAgICAgIG1hcHBpbmdzLmVkZ2UgPSB2YWx1ZS5lZGdlTWFwcGluZyA/IGdldE1hcHBpbmdzKHZhbHVlLmVkZ2VNYXBwaW5nKSA6IHt9O1xuICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5OKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHZwRWxlbWVudFtjeENvbnN0YW50cy5QT10udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IGdldExOVlZhbHVlcygnbm9kZScsIHZwRWxlbWVudC52KVxuXG4gICAgICAgICAgICBpZiAoIWJ5cGFzc01hcHBpbmdzLm5vZGVba2V5XSkge1xuICAgICAgICAgICAgICAgIGJ5cGFzc01hcHBpbmdzLm5vZGVba2V5XSA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYnlwYXNzIGNhbGN1bGF0ZWQ6ICcgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZXMsIG51bGwsIDIpKTtcblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0sIHZhbHVlcyk7XG4gICAgICAgICAgICAvL2J5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnbm9kZScsIHZwRWxlbWVudCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHZwQXQgPT09IGN4Q29uc3RhbnRzLkUpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHZwRWxlbWVudFtjeENvbnN0YW50cy5QT10udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IGdldExOVlZhbHVlcygnZWRnZScsIHZwRWxlbWVudC52KVxuXG4gICAgICAgICAgICBpZiAoIWJ5cGFzc01hcHBpbmdzLmVkZ2Vba2V5XSkge1xuICAgICAgICAgICAgICAgIGJ5cGFzc01hcHBpbmdzLmVkZ2Vba2V5XSA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYnlwYXNzIGNhbGN1bGF0ZWQ6ICcgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZXMsIG51bGwsIDIpKTtcblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihieXBhc3NNYXBwaW5ncy5lZGdlW2tleV0sIHZhbHVlcyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKCdtYXBwaW5nczogJyArIEpTT04uc3RyaW5naWZ5KG1hcHBpbmdzLCBudWxsLCAyKSk7XG5cbiAgICAvL1NlY29uZCBwYXNzLiBcbiAgICAvLyBIZXJlIGlzIHdoZXJlIHRoZSBhY3R1YWwgb3V0cHV0IGlzIGdlbmVyYXRlZC5cblxuICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuXG5cbiAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hJZCA9IGN4Tm9kZVtjeENvbnN0YW50cy5JRF0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZVZpZXcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBjeElkLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogY3hOb2RlWyd6J10gP1xuICAgICAgICAgICAgICAgICAgICAgICAgW2N4Tm9kZVsneCddLCBjeE5vZGVbJ3knXSwgY3hOb2RlWyd6J11dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFtjeE5vZGVbJ3gnXSwgY3hOb2RlWyd5J11dXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9UT0RPIGNhbGN1bGF0ZSBsbnYgdnBzIGJhc2VkIG9uIGRlZmF1bHRzIGFuZCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdE5vZGVWaXN1YWxQcm9wZXJ0aWVzID0gZGVmYXVsdFZhbHVlc1snbm9kZSddO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG5vZGVWaWV3LCBkZWZhdWx0Tm9kZVZpc3VhbFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0Fzc2lnbiBtYXBwaW5nc1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkQXR0cmlidXRlcyA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hOb2RlWyd2J10sIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBwaW5nVmFsdWVzID0gZ2V0TWFwcHBlZFZhbHVlcyhtYXBwaW5ncywgJ25vZGUnLCBleHBhbmRlZEF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obm9kZVZpZXcsIG1hcHBpbmdWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgLy9Bc3NpZ24gYnlwYXNzXG4gICAgICAgICAgICAgICAgaWYgKGJ5cGFzc01hcHBpbmdzLm5vZGVbY3hJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlVmlldywgYnlwYXNzTWFwcGluZ3Mubm9kZVtjeElkXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkTm9kZVZpZXcgPSBwcm9jZXNzTm9kZVZpZXcobm9kZVZpZXcpO1xuXG4gICAgICAgICAgICAgICAgbm9kZVZpZXdzLnB1c2gocHJvY2Vzc2VkTm9kZVZpZXcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuXG4gICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeEVkZ2VbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRnZVZpZXcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBjeElkLFxuICAgICAgICAgICAgICAgICAgICBzOiBjeEVkZ2Uucy50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICB0OiBjeEVkZ2UudC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9UT0RPIGNhbGN1bGF0ZSBsbnYgdnBzIGJhc2VkIG9uIGRlZmF1bHRzIGFuZCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdEVkZ2VWaXN1YWxQcm9wZXJ0aWVzID0gZGVmYXVsdFZhbHVlc1snZWRnZSddO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBkZWZhdWx0RWRnZVZpc3VhbFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkQXR0cmlidXRlcyA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hFZGdlWyd2J10sIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBwaW5nVmFsdWVzID0gZ2V0TWFwcHBlZFZhbHVlcyhtYXBwaW5ncywgJ25vZGUnLCBleHBhbmRlZEF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWRnZVZpZXcsIG1hcHBpbmdWYWx1ZXMpO1xuICAgICAgICAgICAgICAgIC8vQXNzaWduIGJ5cGFzc1xuICAgICAgICAgICAgICAgIGlmIChieXBhc3NNYXBwaW5ncy5lZGdlW2N4SWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWRnZVZpZXcsIGJ5cGFzc01hcHBpbmdzLmVkZ2VbY3hJZF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEVkZ2VWaWV3ID0gcHJvY2Vzc0VkZ2VWaWV3KGVkZ2VWaWV3KTtcblxuICAgICAgICAgICAgICAgIGVkZ2VWaWV3cy5wdXNoKHByb2Nlc3NlZEVkZ2VWaWV3KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLm5vZGVWaWV3c10gPSBub2RlVmlld3M7XG4gICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5lZGdlVmlld3NdID0gZWRnZVZpZXdzO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgY29udmVydGVyID0ge1xuICAgIHRhcmdldEZvcm1hdDogJ2xudicsXG4gICAgY29udmVydDogKGN4KSA9PiB7XG4gICAgICAgIHJldHVybiBsbnZDb252ZXJ0KGN4KTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgOiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0LFxuICAgIHByb2Nlc3NOb2RlVmlldzogcHJvY2Vzc05vZGVWaWV3LFxuICAgIHByb2Nlc3NFZGdlVmlldzogcHJvY2Vzc0VkZ2VWaWV3LFxuICAgIGdldERlZmF1bHRWYWx1ZXM6IGdldERlZmF1bHRWYWx1ZXMsXG4gICAgY29udmVydGVyOiBjb252ZXJ0ZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmsuanMiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgJ25vZGVWaWV3cyc6ICdub2RlVmlld3MnLFxuICAgICdlZGdlVmlld3MnOiAnZWRnZVZpZXdzJywgXG4gICAgJ2lkJzogJ2lkJyxcbiAgICAncG9zaXRpb24nOiAncG9zaXRpb24nLFxuICAgICdzJzogJ3MnLFxuICAgICd0JzogJ3QnLFxuICAgICdsYWJlbCc6ICdsYWJlbCcsIFxuICAgICdsYWJlbENvbG9yJyA6ICdsYWJlbENvbG9yJyxcbiAgICAnbGFiZWxGb250U2l6ZScgOiAnbGFiZWxGb250U2l6ZScsXG4gICAgJ2NvbG9yJzogJ2NvbG9yJyxcbiAgICAnc2l6ZScgOiAnc2l6ZScsXG4gICAgJ3dpZHRoJyA6ICd3aWR0aCcsXG5cbiAgICAncHJlcHJvY2Vzc0NvbG9yJzogJ3ByZXByb2Nlc3NDb2xvcicsXG4gICAgJ3ByZXByb2Nlc3NBbHBoYSc6ICdwcmVwcm9jZXNzQWxwaGEnLFxuICAgICdwcmVwcm9jZXNzTGFiZWxDb2xvcic6ICdwcmVwcm9jZXNzTGFiZWxDb2xvcicsXG4gICAgJ3ByZXByb2Nlc3NMYWJlbEFscGhhJzogJ3ByZXByb2Nlc3NMYWJlbEFscGhhJyxcbiAgICAncHJlcHJvY2Vzc05vZGVXaWR0aCcgOiAncHJlcHJvY2Vzc05vZGVXaWR0aCcsXG4gICAgJ3ByZXByb2Nlc3NOb2RlSGVpZ2h0JyA6ICdwcmVwcm9jZXNzTm9kZUhlaWdodCdcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBqc0NvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3l0b3NjYXBlSlNDb25zdGFudHMuanMnKTtcbmNvbnN0IGN4VXRpbCA9IHJlcXVpcmUoJy4uL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKSB7XG4gICAgY29uc3QgdGFyZ2V0U3R5bGVFbnRyeSA9IG5ldyBNYXAoKTtcbiAgICB0YXJnZXRTdHlsZUVudHJ5LnNldCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSk7XG4gICAgcmV0dXJuIHRhcmdldFN0eWxlRW50cnk7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9PUEFDSVRZJyA6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUxfRk9OVF9TSVpFJyA6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MQUJFTCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xBQkVMX09QQUNJVFknIDogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnIDogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9LFxufVxuXG5mdW5jdGlvbiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIGF0dHJpYnV0ZU5hbWUpIHtcbiAgICBjb25zdCBvdXRwdXQgPSB7fTtcbiAgICBvdXRwdXRbdGFyZ2V0U3R5bGVGaWVsZF0gPSAnZGF0YSgnICsgYXR0cmlidXRlTmFtZSArICcpJztcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9TSEFQRSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfV0lEVEgnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9PUEFDSVRZJyA6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnIDogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJyA6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnIDogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG59XG5mdW5jdGlvbiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9ICdtYXBEYXRhKCcgKyBhdHRyaWJ1dGVOYW1lXG4gICAgICAgICsgJywgJyArIG1pblZhbHVlXG4gICAgICAgICsgJywgJyArIG1heFZhbHVlXG4gICAgICAgICsgJywgJyArIG1pblZQXG4gICAgICAgICsgJywgJyArIG1heFZQXG4gICAgICAgICsgJyknO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IG1hcERhdGFQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUxfT1BBQ0lUWScgOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnIDogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApXG5cbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLm9wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xBQkVMJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xBQkVMX09QQUNJVFknIDogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfRk9OVF9TSVpFJyA6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKVxuICAgIH0sXG59XG5cblxuZnVuY3Rpb24gZ2V0Q1NTU3R5bGVFbnRyaWVzKGN4U3R5bGVFbnRyaWVzLCBlbnRpdHlUeXBlKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4U3R5bGVFbnRyaWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gY3hTdHlsZUVudHJpZXNba2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgY3NzRW50cmllcyA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgY3NzRW50cmllcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0SWRTZWxlY3RvcihpZCwgZWxlbWVudFR5cGUpIHtcbiAgICAvL25vZGUjaWQgb3IgZWRnZSNpZFxuICAgIHJldHVybiBlbGVtZW50VHlwZSArICcjJyArIGlkO1xufVxuXG5cblxuZnVuY3Rpb24gZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpIHtcbiAgICByZXR1cm4geyAnc2VsZWN0b3InOiBzZWxlY3RvciwgJ3N0eWxlJzogY3NzIH07XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIGluY2x1ZGVNaW4sIGluY2x1ZGVNYXgpIHtcbiAgICBjb25zdCBtaW5Db25kaXRpb24gPSBpbmNsdWRlTWluID8gJz49JyA6ICc+JztcbiAgICBjb25zdCBtYXhDb25kaXRpb24gPSBpbmNsdWRlTWF4ID8gJzw9JyA6ICc8JztcblxuICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICcgJyArIG1pbkNvbmRpdGlvbiArICcgJyArIG1pblZhbHVlICsgJ11bJyArIGF0dHJpYnV0ZU5hbWUgKyAnICcgKyBtYXhDb25kaXRpb24gKyAnICcgKyBtYXhWYWx1ZSArICddJ1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzU3R5bGUoZW50aXR5VHlwZSwgcG9ydGFibGVQcm9wZXJ0eUtleSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgaWYgKG1hcERhdGFQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgcmV0dXJuIG1hcERhdGFQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnYXR0cmlidXRlJ107XG4gICAgY29uc3QgcmFuZ2VNYXBzID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgY29uc29sZS5sb2coJ2NvbnRpbnVvdXMgbWFwcGluZyBmb3IgJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgSlNPTi5zdHJpbmdpZnkocmFuZ2VNYXBzLCBudWxsLCAyKSk7XG5cbiAgICByYW5nZU1hcHMuZm9yRWFjaCgocmFuZ2UpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRDb250aW51b3VzU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIHJhbmdlLmluY2x1ZGVNaW4sIHJhbmdlLmluY2x1ZGVNYXgpO1xuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbnRpbnVvdXNTdHlsZShlbnRpdHlUeXBlLCBwb3J0YWJsZVByb3BlcnR5S2V5LCBhdHRyaWJ1dGVOYW1lLCByYW5nZS5taW4sIHJhbmdlLm1heCwgcmFuZ2UubWluVlBWYWx1ZSwgcmFuZ2UubWF4VlBWYWx1ZSk7XG5cbiAgICAgICAgb3V0cHV0LnB1c2goZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBzdHlsZSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUpIHtcbiAgICBpZiAocGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICBjb25zdCBjc3MgPSBwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGN4TWFwcGluZ0RlZmluaXRpb24uYXR0cmlidXRlKTtcbiAgICAgICAgcmV0dXJuIGdldFN0eWxlRWxlbWVudChlbnRpdHlUeXBlLCBjc3MpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEYXRhVHlwZSwgYXR0cmlidXRlVmFsdWUpIHtcbiAgICBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyA9IFxcJycgKyBhdHRyaWJ1dGVWYWx1ZSArICdcXCddJztcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZURhdGFUeXBlID09ICdib29sZWFuJykge1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVWYWx1ZSA9PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1s/JyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnXVshJyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gJyArIGF0dHJpYnV0ZVZhbHVlICsgJ10nO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyhwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIGNvbnN0IGF0dHRyaWJ1dGVUb1ZhbHVlTWFwID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ2F0dHJpYnV0ZSddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZURhdGFUeXBlID0gYXR0cmlidXRlVHlwZU1hcC5nZXQoYXR0cmlidXRlTmFtZSk7XG4gICAgYXR0dHJpYnV0ZVRvVmFsdWVNYXAuZm9yRWFjaCgoZGlzY3JldGVNYXApID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJyBkaXNjcmV0ZSBtYXAgZm9yICcgKyBwb3J0YWJsZVByb3BlcnR5S2V5ICsgJzogJyArIGRpc2NyZXRlTWFwLnYgKyAnICgnICsgYXR0cmlidXRlTmFtZSArICc8JyArIGF0dHJpYnV0ZURhdGFUeXBlICsgJz4pIC0+ICcgKyBkaXNjcmV0ZU1hcC52cCk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXREaXNjcmV0ZVNlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURhdGFUeXBlLCBkaXNjcmV0ZU1hcC52KTtcblxuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGRpc2NyZXRlTWFwLnZwKTtcbiAgICAgICAgICAgIGNvbnN0IGNzcyA9IHt9O1xuICAgICAgICAgICAgc3R5bGVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGNzc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcgICBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGNzcykpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIHJldHVybiBvdXRwdXQ7IC8vZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpO1xufVxuXG5mdW5jdGlvbiBnZXRCeXBhc3NDU1NFbnRyeShlbnRpdHlUeXBlLCBjeEVsZW1lbnQpIHtcblxuICAgIGNvbnN0IGlkID0gY3hFbGVtZW50LnBvO1xuICAgIGNvbnN0IGNzcyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4RWxlbWVudC52KS5mb3JFYWNoKChwb3J0YWJsZVByb3BlcnR5S2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGN4RWxlbWVudC52W3BvcnRhYmxlUHJvcGVydHlLZXldO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICBzdHlsZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY3NzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWxlY3RvciA9IGdldElkU2VsZWN0b3IoaWQpO1xuICAgIHJldHVybiBnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcyk7XG59XG5cbi8qKiBcbiAqIFxuKi9cbmZ1bmN0aW9uIGdldENTU01hcHBpbmdFbnRyaWVzKFxuICAgIGN4TWFwcGluZ0VudHJpZXMsXG4gICAgZW50aXR5VHlwZSxcbiAgICBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGN4TWFwcGluZ0VudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBjeE1hcHBpbmdFbnRyeSA9IGN4TWFwcGluZ0VudHJpZXNba2V5XTtcbiAgICAgICAgY29uc29sZS5sb2coXCIgbWFwcGluZyB0eXBlOiBcIiArIGN4TWFwcGluZ0VudHJ5LnR5cGUpO1xuICAgICAgICBzd2l0Y2ggKGN4TWFwcGluZ0VudHJ5LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0NPTlRJTlVPVVMnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGlub3VzTWFwcGluZ3MgPSBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKTtcbiAgICAgICAgICAgICAgICBjb250aW5vdXNNYXBwaW5ncy5mb3JFYWNoKChjb250aW5vdXNNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGNvbnRpbm91c01hcHBpbmcpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdQQVNTVEhST1VHSCc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjc3NFbnRyeSA9IGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNzc0VudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGNzc0VudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdESVNDUkVURSc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNjcmV0ZU1hcHBpbmdzID0gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyhrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApO1xuICAgICAgICAgICAgICAgIGRpc2NyZXRlTWFwcGluZ3MuZm9yRWFjaCgoZGlzY3JldGVNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGRpc2NyZXRlTWFwcGluZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IE5PREVfU0VMRUNUT1IgPSAnbm9kZSc7XG5jb25zdCBFREdFX1NFTEVDVE9SID0gJ2VkZ2UnO1xuXG5mdW5jdGlvbiBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgc3R5bGU6IFtdLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGxldCBkZWZhdWx0Q1NTTm9kZVN0eWxlID0gdW5kZWZpbmVkO1xuICAgIGxldCBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgbWFwcGluZ0NTU05vZGVTdHlsZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbWFwcGluZ0NTU0VkZ2VTdHlsZSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBieXBhc3NDU1NFbnRyaWVzID0gW107XG5cbiAgICBjeFZpc3VhbFByb3BlcnRpZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHZwQXQgPSB2cEVsZW1lbnQuYXQ7XG4gICAgICAgIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5TVFlMRSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2cEVsZW1lbnQudjtcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZXMgPSB2YWx1ZS5kZWZhdWx0O1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncG9ydGFibGUgbm9kZSBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGRlZmF1bHRTdHlsZXMubm9kZSkpO1xuICAgICAgICAgICAgZGVmYXVsdENTU05vZGVTdHlsZSA9IGdldENTU1N0eWxlRW50cmllcyhkZWZhdWx0U3R5bGVzLm5vZGUsICdub2RlJyk7XG4gICAgICAgICAgICBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gZ2V0Q1NTU3R5bGVFbnRyaWVzKGRlZmF1bHRTdHlsZXMuZWRnZSwgJ2VkZ2UnKTtcblxuICAgICAgICAgICAgY3NzTmV0d29ya0JhY2tncm91bmRDb2xvciA9IGRlZmF1bHRTdHlsZXMubmV0d29ya1snYmFja2dyb3VuZC1jb2xvciddO1xuXG4gICAgICAgICAgICBjb25zdCBub2RlTWFwcGluZyA9IHZhbHVlLm5vZGVNYXBwaW5nO1xuICAgICAgICAgICAgbWFwcGluZ0NTU05vZGVTdHlsZSA9IGdldENTU01hcHBpbmdFbnRyaWVzKG5vZGVNYXBwaW5nLCAnbm9kZScsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICAgICAgY29uc3QgZWRnZU1hcHBpbmcgPSB2YWx1ZS5lZGdlTWFwcGluZztcbiAgICAgICAgICAgIG1hcHBpbmdDU1NFZGdlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhlZGdlTWFwcGluZywgJ2VkZ2UnLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5OKSB7XG4gICAgICAgICAgICBieXBhc3NDU1NFbnRyaWVzLnB1c2goZ2V0QnlwYXNzQ1NTRW50cnkoJ25vZGUnLCB2cEVsZW1lbnQpKTtcbiAgICAgICAgfSBlbHNlIGlmICh2cEF0ID09PSBjeENvbnN0YW50cy5FKSB7XG4gICAgICAgICAgICBieXBhc3NDU1NFbnRyaWVzLnB1c2goZ2V0QnlwYXNzQ1NTRW50cnkoJ2VkZ2UnLCB2cEVsZW1lbnQpKTtcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zb2xlLmxvZygnZGVmYXVsdCBub2RlIHN0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkoZGVmYXVsdENTU05vZGVTdHlsZSkpO1xuXG4gICAgLy9BZGQgZGVmYXVsdCBzdHlsZVxuICAgIG91dHB1dC5zdHlsZS5wdXNoKGdldFN0eWxlRWxlbWVudChOT0RFX1NFTEVDVE9SLCBkZWZhdWx0Q1NTTm9kZVN0eWxlKSk7XG4gICAgb3V0cHV0LnN0eWxlLnB1c2goZ2V0U3R5bGVFbGVtZW50KEVER0VfU0VMRUNUT1IsIGRlZmF1bHRDU1NFZGdlU3R5bGUpKTtcblxuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgbWFwcGluZ0NTU05vZGVTdHlsZSk7XG4gICAgb3V0cHV0LnN0eWxlLnB1c2guYXBwbHkob3V0cHV0LnN0eWxlLCBtYXBwaW5nQ1NTRWRnZVN0eWxlKTtcblxuICAgIG91dHB1dFsnYmFja2dyb3VuZC1jb2xvciddID0gY3NzTmV0d29ya0JhY2tncm91bmRDb2xvcjtcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdjeXRvc2NhcGVKUycsXG4gICAgY29udmVydDogKGN4KSA9PiB7XG4gICAgICAgIGNvbnN0IG91dHB1dCA9IHtcbiAgICAgICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiB7fSxcbiAgICAgICAgICAgIGxheW91dDoge30sXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMgPSBjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ107XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IFwiICsgSlNPTi5zdHJpbmdpZnkoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIG51bGwsIDIpKTtcbiAgICAgICAgICAgICAgICBjeFV0aWwucHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyhjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgICAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhub2RlQXR0cmlidXRlVHlwZU1hcCwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4Tm9kZVsndiddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEVkZ2VbJ3YnXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ10pIHtcbiAgICAgICAgICAgICAgICBjeFZpc3VhbFByb3BlcnRpZXMgPSBjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcC5mb3JFYWNoKChpbmZlcnJlZFR5cGUsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3Igbm9kZTogJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWRnZUF0dHJpYnV0ZVR5cGVNYXAuZm9yRWFjaCgoaW5mZXJyZWRUeXBlLCBhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaW5mZXJyZWQgYXR0cmlidXRlIHR5cGUgZm9yIGVkZ2U6ICcgKyBhdHRyaWJ1dGVOYW1lICsgJzogJyArIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vQWRkIG5vZGVzXG4gICAgICAgIG91dHB1dC5lbGVtZW50c1snbm9kZXMnXSA9IFtdO1xuXG4gICAgICAgIC8vQWRkIGVkZ2VzXG4gICAgICAgIG91dHB1dC5lbGVtZW50c1snZWRnZXMnXSA9IFtdO1xuXG5cbiAgICAgICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hOb2RlWyd2J10sIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydpZCddID0gY3hOb2RlLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ3Bvc2l0aW9uJ10gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBjeE5vZGVbJ3gnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGN4Tm9kZVsneSddXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmVsZW1lbnRzLm5vZGVzLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ10gPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4RWRnZVsndiddLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnaWQnXSA9IGN4RWRnZS5pZC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ3NvdXJjZSddID0gY3hFZGdlWydzJ107XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsndGFyZ2V0J10gPSBjeEVkZ2VbJ3QnXTtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmVsZW1lbnRzLmVkZ2VzLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICBvdXRwdXQuc3R5bGUgPSBzdHlsZS5zdHlsZTtcbiAgICAgICAgY29uc29sZS5sb2coJ3Zpc3VhbFByb3BlcnRpZXM6ICcgKyBKU09OLnN0cmluZ2lmeShjeFZpc3VhbFByb3BlcnRpZXMsIG51bGwsIDIpKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3N0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkob3V0cHV0LnN0eWxlLCBudWxsLCAyKSk7XG5cbiAgICAgICAgb3V0cHV0WydiYWNrZ3JvdW5kLWNvbG9yJ10gPSBzdHlsZVsnYmFja2dyb3VuZC1jb2xvciddO1xuXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0ZXI6IGNvbnZlcnRlclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgJ3NoYXBlJzogJ3NoYXBlJyxcbiAgICAnd2lkdGgnOiAnd2lkdGgnLCBcbiAgICAnaGVpZ2h0JzogJ2hlaWdodCcsXG4gICAgJ2JhY2tncm91bmRfY29sb3InOiAnYmFja2dyb3VuZC1jb2xvcicsXG4gICAgJ2JhY2tncm91bmRfb3BhY2l0eSc6ICdiYWNrZ3JvdW5kLW9wYWNpdHknLFxuICAgICdsYWJlbCc6ICdsYWJlbCcsXG4gICAgJ2xhYmVsX2NvbG9yJzogJ2NvbG9yJyxcbiAgICAnbGFiZWxfb3BhY2l0eScgOiAndGV4dC1vcGFjaXR5JyxcbiAgICAnb3BhY2l0eSc6ICdvcGFjaXR5JyxcbiAgICAnbGluZV9jb2xvcic6ICdsaW5lLWNvbG9yJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==