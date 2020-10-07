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
    //console.log(" cxAttributeDeclarations: " + JSON.stringify(cxAttributeDeclarations, null, 2));
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
            //console.log('attribute ' + attributeDeclaration.a + ' should be renamed to ' + attributeName);
            attributeNameMap.set(attributeDeclaration.a, attributeName);
        }
    });
}

function updateAttributeDefaultValueMap(attributeDefaultValueMap, attributeDeclarations) {
    Object.keys(attributeDeclarations).forEach(function (attributeName) {
        var attributeDeclaration = attributeDeclarations[attributeName];
        if (attributeDeclaration['v']) {
            //console.log('attribute ' + attributeName + ' has default value ' + attributeDeclaration.v);
            attributeDefaultValueMap.set(attributeName, attributeDeclaration.v);
        }
    });
}

function updateInferredTypes(attributeTypeMap, attributeNameMap, v) {
    v && Object.keys(v).forEach(function (key) {
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
    v && Object.keys(v).forEach(function (key) {
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

function selectConverter(targetFormat, converters) {
    var selectedConverter = undefined;

    converters.forEach(function (converter) {
        if (converter.converter.targetFormat == targetFormat) {
            //console.log('target format: ' + converter.converter.targetFormat);
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
    return selectedConverter;
}

function getEmptyNetwork(targetFormat, converters) {
    var selectedConverter = selectConverter(targetFormat, converters);
    return selectedConverter.converter.emptyNetwork;
}

function convert(cx, targetFormat) {
    var converters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultConverters;


    if (cx.length == 0) {
        return getEmptyNetwork(targetFormat, converters);
    }

    verifyVersion(cx);
    var selectedConverter = selectConverter(targetFormat, converters);
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
    return (attributeValue - attributeMin) / (attributeMax - attributeMin);
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

    var output = [
    //TODO check that minRGB and maxRGB are defined/undefined
    clamp(Math.round(getMap(minRGB === undefined ? undefined : minRGB[0], maxRGB === undefined ? undefined : maxRGB[0], attributeRatio)), 0, 255), clamp(Math.round(getMap(minRGB === undefined ? undefined : minRGB[1], maxRGB === undefined ? undefined : maxRGB[1], attributeRatio)), 0, 255), clamp(Math.round(getMap(minRGB === undefined ? undefined : minRGB[2], maxRGB === undefined ? undefined : maxRGB[2], attributeRatio)), 0, 255)];
    return output;
}

function continuousAlphaPropertyConvert(attributeValue, attributeMin, attributeMax, vpMin, vpMax) {
    var attributeRatio = getAttributeRatio(attributeValue, attributeMin, attributeMax);

    var alphaDecimal = getMap(vpMin, vpMax, attributeRatio);

    //console.log("alphaDecimal = " + alphaDecimal);
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
    //console.log('isInRange: ' + attributeValue + ' ' + min + ' ' + max + ' ' + includeMin + ' ' + includeMax + ' ' + minSatisfied + ' ' + maxSatisfied);
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

        //console.log('bypass calculated: ' + JSON.stringify(values, null, 2));

        Object.assign(bypassMappings.node[key], values);
        //bypassCSSEntries.push(getBypassCSSEntry('node', vpElement));
    });

    cxEdgeBypasses.forEach(function (vpElement) {
        var key = vpElement[cxConstants.ID].toString();
        var values = getLNVValues('edge', vpElement.v);

        if (!bypassMappings.edge[key]) {
            bypassMappings.edge[key] = {};
        }

        //console.log('bypass calculated: ' + JSON.stringify(values, null, 2));

        Object.assign(bypassMappings.edge[key], values);
    });

    //console.log('mappings: ' + JSON.stringify(mappings, null, 2));

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
                var mappingValues = getMappedValues(mappings, 'edge', expandedAttributes);
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
    emptyNetwork: { "nodeViews": [], "edgeViews": [] },
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
    getAttributeRatio: getAttributeRatio,
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
    //console.log('continuous mapping for ' + attributeName + ': ' + JSON.stringify(rangeMaps, null, 2));

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
        //console.log(' discrete map for ' + portablePropertyKey + ': ' + discreteMap.v + ' (' + attributeName + '<' + attributeDataType + '>) -> ' + discreteMap.vp);

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
        //console.log(" mapping type: " + cxMappingEntry.type);
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

        //console.log('default style: ' + JSON.stringify(defaultStyles));
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

    //console.log('default node style: ' + JSON.stringify(defaultCSSNodeStyle));

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
    emptyNetwork: {
        style: [],
        elements: {},
        layout: {},
        'background-color': null
    },
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
                //console.log(" cxAttributeDeclarations: " + JSON.stringify(cxAttributeDeclarations, null, 2));
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
            //console.log('inferred attribute type for node: ' + attributeName + ': ' + inferredType);
        });

        edgeAttributeTypeMap.forEach(function (inferredType, attributeName) {
            //console.log('inferred attribute type for edge: ' + attributeName + ': ' + inferredType);
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
        //console.log('visualProperties: ' + JSON.stringify(cxVisualProperties, null, 2));
        //console.log('style: ' + JSON.stringify(output.style, null, 2));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjNWRiZDRlNmViNWViZGM0MWE5YSIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsIlBPIiwiZ2V0Q3hWZXJzaW9uIiwidmVyc2lvblN0cmluZyIsInZlcnNpb25BcnJheSIsInNwbGl0IiwibWFwIiwibnVtYmVyU3RyaW5nIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXNOYU4iLCJlbGVtZW50IiwiZ2V0Q3hNYWpvclZlcnNpb24iLCJwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVBdHRyaWJ1dGVUeXBlTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwiZWRnZUF0dHJpYnV0ZVR5cGVNYXAiLCJlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbiIsInVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAiLCJub2RlcyIsInVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAiLCJ1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJlZGdlcyIsImF0dHJpYnV0ZVR5cGVNYXAiLCJhdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJrZXlzIiwiYXR0cmlidXRlTmFtZSIsImF0dHJpYnV0ZURlY2xhcmF0aW9uIiwic2V0IiwiZCIsImF0dHJpYnV0ZU5hbWVNYXAiLCJhIiwiYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwidiIsInVwZGF0ZUluZmVycmVkVHlwZXMiLCJrZXkiLCJoYXMiLCJ2YWx1ZSIsImluZmVycmVkVHlwZSIsIm5ld0tleSIsImdldCIsImdldEV4cGFuZGVkQXR0cmlidXRlcyIsImRhdGEiLCJjb252ZXJ0ZXIiLCJyZXF1aXJlIiwiY29udmVydCIsImN4IiwidGFyZ2V0Rm9ybWF0IiwiY3hDb25zdGFudHMiLCJsYXJnZU5ldHdvcmsiLCJjeXRvc2NhcGVKUyIsImN4VXRpbCIsInZlcmlmeVZlcnNpb24iLCJmaXJzdEVsZW1lbnQiLCJtYWpvclZlcnNpb24iLCJkZWZhdWx0Q29udmVydGVycyIsInNlbGVjdENvbnZlcnRlciIsImNvbnZlcnRlcnMiLCJzZWxlY3RlZENvbnZlcnRlciIsInVuZGVmaW5lZCIsImdldEVtcHR5TmV0d29yayIsImVtcHR5TmV0d29yayIsImxhcmdlTmV0d29ya0NvbnN0YW50cyIsInNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJ0YXJnZXRTdHlsZUZpZWxkIiwicG9ydGFibGVQcm9wZXJ0VmFsdWUiLCJ0YXJnZXRTdHlsZUVudHJ5IiwiaGV4VG9SR0IiLCJoZXgiLCJyIiwiZyIsImIiLCJhbHBoYVRvSW50IiwiYWxwaGFEZWNpbWFsIiwiY2xhbXAiLCJNYXRoIiwicm91bmQiLCJkZWZhdWx0UHJvcGVydHlDb252ZXJ0IiwicG9ydGFibGVQcm9wZXJ0eVZhbHVlIiwicHJlcHJvY2Vzc05vZGVXaWR0aCIsInByZXByb2Nlc3NOb2RlSGVpZ2h0IiwicHJlcHJvY2Vzc0NvbG9yIiwicHJlcHJvY2Vzc0FscGhhIiwibGFiZWwiLCJwcmVwcm9jZXNzTGFiZWxDb2xvciIsInByZXByb2Nlc3NMYWJlbEFscGhhIiwibGFiZWxGb250U2l6ZSIsIndpZHRoIiwiZ2V0RGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzIiwib3V0cHV0Iiwibm9kZSIsImVkZ2UiLCJub2RlRGVmYXVsdCIsImxudkVudHJpZXMiLCJnZXRMTlZWYWx1ZXMiLCJhc3NpZ24iLCJlZGdlRGVmYXVsdCIsImVudGl0eVR5cGUiLCJlbnRyaWVzIiwicG9ydGFibGVQcm9wZXJ0eUtleSIsImxudkVudHJ5IiwibG52S2V5IiwicHJvY2Vzc0NvbG9yIiwiY29sb3JBcnJheSIsImFscGhhIiwicHJvY2Vzc1NpemUiLCJoZWlnaHQiLCJtYXgiLCJwcm9jZXNzTm9kZVZpZXciLCJub2RlVmlldyIsImxhYmVsQ29sb3JBcnJheSIsImxhYmVsQWxwaGEiLCJpZCIsInBvc2l0aW9uIiwiY29sb3IiLCJsYWJlbENvbG9yIiwic2l6ZSIsInByb2Nlc3NFZGdlVmlldyIsImVkZ2VWaWV3IiwicyIsInQiLCJnZXRNYXBwaW5ncyIsIm1hcHBpbmdzIiwibWFwcGluZyIsInByb3BlcnR5S2V5IiwiZGVmaW5pdGlvbiIsImF0dHJpYnV0ZSIsInR5cGUiLCJ2cCIsImdldEF0dHJpYnV0ZVJhdGlvIiwiYXR0cmlidXRlVmFsdWUiLCJhdHRyaWJ1dGVNaW4iLCJhdHRyaWJ1dGVNYXgiLCJnZXRNYXAiLCJ2cE1pbiIsInZwTWF4IiwiYXR0cmlidXRlUmF0aW8iLCJtaW4iLCJjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0IiwiY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0IiwibWluUkdCIiwibWF4UkdCIiwiY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0IiwiY29udGludW91c1Byb3BlcnR5Q29udmVydCIsImlzSW5SYW5nZSIsImluY2x1ZGVNaW4iLCJpbmNsdWRlTWF4IiwibWluU2F0aXNmaWVkIiwibWF4U2F0aXNmaWVkIiwiZ2V0TWFwcGVkVmFsdWVzIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZUtleSIsImRpc2NyZXRlTWFwIiwia2V5VmFsdWUiLCJjb252ZXJ0ZWQiLCJjb250aW51b3VzTWFwcGluZ3MiLCJtYXBwaW5nUmFuZ2UiLCJtaW5WUFZhbHVlIiwibWF4VlBWYWx1ZSIsImxudkNvbnZlcnQiLCJjeFZpc3VhbFByb3BlcnRpZXMiLCJjeE5vZGVCeXBhc3NlcyIsImN4RWRnZUJ5cGFzc2VzIiwiTWFwIiwiZGVmYXVsdFZhbHVlcyIsImJ5cGFzc01hcHBpbmdzIiwiY3hBc3BlY3QiLCJjeE5vZGVzIiwiY3hOb2RlIiwiY3hFZGdlcyIsImN4RWRnZSIsIm5vZGVCeXBhc3NlcyIsInB1c2giLCJieXBhc3MiLCJlZGdlQnlwYXNzZXMiLCJub2RlVmlld3MiLCJlZGdlVmlld3MiLCJkZWZhdWx0U3R5bGVzIiwidnBFbGVtZW50IiwiZGVmYXVsdCIsIm5vZGVNYXBwaW5nIiwiZWRnZU1hcHBpbmciLCJ0b1N0cmluZyIsInZhbHVlcyIsImN4SWQiLCJkZWZhdWx0Tm9kZVZpc3VhbFByb3BlcnRpZXMiLCJleHBhbmRlZEF0dHJpYnV0ZXMiLCJtYXBwaW5nVmFsdWVzIiwicHJvY2Vzc2VkTm9kZVZpZXciLCJkZWZhdWx0RWRnZVZpc3VhbFByb3BlcnRpZXMiLCJwcm9jZXNzZWRFZGdlVmlldyIsImpzQ29uc3RhbnRzIiwic2hhcGUiLCJiYWNrZ3JvdW5kX2NvbG9yIiwiYmFja2dyb3VuZF9vcGFjaXR5IiwibGFiZWxfY29sb3IiLCJsYWJlbF9vcGFjaXR5IiwibGFiZWxfZm9udF9zaXplIiwib3BhY2l0eSIsImxpbmVfY29sb3IiLCJzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0IiwicGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCIsInNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQiLCJtaW5WYWx1ZSIsIm1heFZhbHVlIiwibWluVlAiLCJtYXhWUCIsIm1hcERhdGFQcm9wZXJ0eUNvbnZlcnQiLCJnZXRDU1NTdHlsZUVudHJpZXMiLCJjeFN0eWxlRW50cmllcyIsImNzc0VudHJpZXMiLCJnZXRJZFNlbGVjdG9yIiwiZWxlbWVudFR5cGUiLCJnZXRTdHlsZUVsZW1lbnQiLCJzZWxlY3RvciIsImNzcyIsImdldENvbnRpbnVvdXNTZWxlY3RvciIsIm1pbkNvbmRpdGlvbiIsIm1heENvbmRpdGlvbiIsIm1pbkJvdW5kIiwibWF4Qm91bmQiLCJnZXRDb250aW51b3VzU3R5bGUiLCJnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMiLCJjeE1hcHBpbmdEZWZpbml0aW9uIiwicmFuZ2VNYXBzIiwicmFuZ2UiLCJzdHlsZSIsImdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5IiwiZ2V0RGlzY3JldGVTZWxlY3RvciIsImF0dHJpYnV0ZURhdGFUeXBlIiwiZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyIsImF0dHRyaWJ1dGVUb1ZhbHVlTWFwIiwic3R5bGVNYXAiLCJnZXRCeXBhc3NDU1NFbnRyeSIsImN4RWxlbWVudCIsImdldENTU01hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cmllcyIsImN4TWFwcGluZ0VudHJ5IiwiY29udGlub3VzTWFwcGluZ3MiLCJjb250aW5vdXNNYXBwaW5nIiwiY3NzRW50cnkiLCJkaXNjcmV0ZU1hcHBpbmdzIiwiZGlzY3JldGVNYXBwaW5nIiwiTk9ERV9TRUxFQ1RPUiIsIkVER0VfU0VMRUNUT1IiLCJnZXRWaXN1YWxQcm9wZXJ0aWVzIiwiZGVmYXVsdENTU05vZGVTdHlsZSIsImRlZmF1bHRDU1NFZGdlU3R5bGUiLCJjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yIiwibWFwcGluZ0NTU05vZGVTdHlsZSIsIm1hcHBpbmdDU1NFZGdlU3R5bGUiLCJieXBhc3NDU1NFbnRyaWVzIiwibmV0d29yayIsImFwcGx5IiwiZWxlbWVudHMiLCJsYXlvdXQiLCJ4IiwieSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7O1FBRUE7UUFDQTs7Ozs7Ozs7OztBQzVEQUEsT0FBT0MsT0FBUCxHQUFpQkMsT0FBT0MsTUFBUCxDQUFjO0FBQzNCQyxnQkFBWSxXQURlO0FBRTNCQyxVQUFNLE1BRnFCO0FBRzNCQyxVQUFNLE1BSHFCO0FBSTNCQyxhQUFTLFNBSmtCOztBQU0zQkMsV0FBTyxPQU5vQjtBQU8zQkMsV0FBTyxPQVBvQjs7QUFTM0JDLFFBQUksSUFUdUI7QUFVM0JDLE9BQUcsR0FWd0I7QUFXM0JDLE9BQUcsR0FYd0I7QUFZM0JDLE9BQUcsR0Fad0I7QUFhM0JDLE9BQUcsR0Fid0I7O0FBZTNCQyxRQUFJLElBZnVCO0FBZ0IzQkMsT0FBRyxHQWhCd0I7QUFpQjNCQyxPQUFHLEdBakJ3Qjs7QUFtQjNCQyx1QkFBbUIsa0JBbkJRO0FBb0IzQkMsYUFBUyxTQXBCa0I7O0FBc0IzQkMsV0FBTyxPQXRCb0I7O0FBd0IzQkMsUUFBSTtBQXhCdUIsQ0FBZCxDQUFqQixDOzs7Ozs7Ozs7OztBQ0RBLFNB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QWhCLElBQXdCb0ssT0FBTzFELEVBQVAsQ0FBVXNFLFFBQVYsRUFBeEI7QUFDQWhMLDRCQUFRLE1BQVIsRUFBZ0IsUUFBaEIsSUFBNEJvSyxPQUFPLEdBQVAsQ0FBNUI7QUFDQXBLLDRCQUFRLE1BQVIsRUFBZ0IsUUFBaEIsSUFBNEJvSyxPQUFPLEdBQVAsQ0FBNUI7QUFDQWpGLDJCQUFPcUssUUFBUCxDQUFnQnpPLEtBQWhCLENBQXNCdUosSUFBdEIsQ0FBMkJ0SyxPQUEzQjtBQUNILGlCQVBEO0FBUUg7QUFDSixTQXhCRDs7QUEwQkEsWUFBTTROLFFBQVFtQixvQkFBb0JyRixrQkFBcEIsRUFBd0NDLGNBQXhDLEVBQXdEQyxjQUF4RCxFQUF3RXZKLG9CQUF4RSxFQUE4Rkcsb0JBQTlGLENBQWQ7O0FBRUEyRSxlQUFPeUksS0FBUCxHQUFlQSxNQUFNQSxLQUFyQjtBQUNBO0FBQ0E7O0FBRUF6SSxlQUFPLGtCQUFQLElBQTZCeUksTUFBTSxrQkFBTixDQUE3Qjs7QUFFQSxlQUFPekksTUFBUDtBQUNIO0FBbEhhLENBQWxCOztBQXFIQW5ILE9BQU9DLE9BQVAsR0FBaUI7QUFDYm1FLGVBQVdBO0FBREUsQ0FBakIsQzs7Ozs7Ozs7O0FDeGJBcEUsT0FBT0MsT0FBUCxHQUFpQkMsT0FBT0MsTUFBUCxDQUFjO0FBQzNCLGFBQVMsT0FEa0I7QUFFM0IsYUFBUyxPQUZrQjtBQUczQixjQUFVLFFBSGlCO0FBSTNCLHdCQUFvQixrQkFKTztBQUszQiwwQkFBc0Isb0JBTEs7QUFNM0IsYUFBUyxPQU5rQjtBQU8zQixtQkFBZSxPQVBZO0FBUTNCLHVCQUFvQixXQVJPO0FBUzNCLHFCQUFrQixjQVRTO0FBVTNCLGVBQVcsU0FWZ0I7QUFXM0Isa0JBQWM7QUFYYSxDQUFkLENBQWpCLEMiLCJmaWxlIjoiLi9idWlsZC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJjeFZpekNvbnZlcnRlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjeFZpekNvbnZlcnRlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzVkYmQ0ZTZlYjVlYmRjNDFhOWEiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgQ1hfVkVSU0lPTjogJ0NYVmVyc2lvbicsXG4gICAgTk9ERTogJ25vZGUnLFxuICAgIEVER0U6ICdlZGdlJyxcbiAgICBORVRXT1JLOiAnbmV0d29yaycsXG5cbiAgICBOT0RFUzogJ25vZGVzJyxcbiAgICBFREdFUzogJ2VkZ2VzJyxcblxuICAgIElEOiAnaWQnLFxuICAgIFg6ICd4JyxcbiAgICBZOiAneScsXG4gICAgWjogJ3onLFxuICAgIFY6ICd2JyxcblxuICAgIEFUOiAnYXQnLFxuICAgIE46ICduJyxcbiAgICBFOiAnZScsXG5cbiAgICBWSVNVQUxfUFJPUEVSVElFUzogJ3Zpc3VhbFByb3BlcnRpZXMnLFxuICAgIERFRkFVTFQ6ICdkZWZhdWx0JyxcblxuICAgIFNUWUxFOiAnc3R5bGUnLFxuXG4gICAgUE86ICdwbydcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeENvbnN0YW50cy5qcyIsImZ1bmN0aW9uIGdldEN4VmVyc2lvbih2ZXJzaW9uU3RyaW5nKSB7XG4gICAgY29uc3QgdmVyc2lvbkFycmF5ID0gdmVyc2lvblN0cmluZy5zcGxpdCgnLicpLm1hcCgobnVtYmVyU3RyaW5nKSA9PiB7IHJldHVybiBwYXJzZUludChudW1iZXJTdHJpbmcsIDEwKTsgfSk7XG4gICAgaWYgKHZlcnNpb25BcnJheS5sZW5ndGggIT09IDIgJiYgdmVyc2lvbkFycmF5Lmxlbmd0aCAhPSAzKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgdmVyc2lvbiBmb3JtYXQ6ICcgKyB2ZXJzaW9uU3RyaW5nO1xuICAgIH1cbiAgICB2ZXJzaW9uQXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgaWYgKGlzTmFOKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyAnTm9uLWludGVnZXIgdmFsdWUgaW4gdmVyc2lvbiBzdHJpbmc6ICcgKyB2ZXJzaW9uU3RyaW5nO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZlcnNpb25BcnJheTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3hNYWpvclZlcnNpb24odmVyc2lvblN0cmluZykge1xuICAgIHJldHVybiB2ZXJzaW9uU3RyaW5nID8gZ2V0Q3hWZXJzaW9uKHZlcnNpb25TdHJpbmcpWzBdIDogMTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyhjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucywgXG4gICAgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIFxuICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBcbiAgICBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBcbiAgICBlZGdlQXR0cmlidXRlTmFtZU1hcCwgZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIFxuICAgIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApIHtcbiAgICAvL2NvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMuZm9yRWFjaCgoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbikgPT4ge1xuICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnbm9kZXMnXSkge1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnZWRnZXMnXSkge1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWydkJ10pIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLmQpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAoYXR0cmlidXRlTmFtZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2EnXSkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYXR0cmlidXRlICcgKyBhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hICsgJyBzaG91bGQgYmUgcmVuYW1lZCB0byAnICsgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVOYW1lTWFwLnNldChhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hLCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAoYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsndiddKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhdHRyaWJ1dGUgJyArIGF0dHJpYnV0ZU5hbWUgKyAnIGhhcyBkZWZhdWx0IHZhbHVlICcgKyBhdHRyaWJ1dGVEZWNsYXJhdGlvbi52KTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcC5zZXQoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGVjbGFyYXRpb24udik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlSW5mZXJyZWRUeXBlcyhhdHRyaWJ1dGVUeXBlTWFwLCBhdHRyaWJ1dGVOYW1lTWFwLCB2KSB7XG4gICAgdiAmJiBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgaWYgKCFhdHRyaWJ1dGVUeXBlTWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IGluZmVycmVkVHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQobmV3S2V5LCBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKHYsIGF0dHJpYnV0ZU5hbWVNYXAsIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIGxldCBkYXRhID0ge307XG4gICAgdiAmJiBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgbmV3S2V5ID0gYXR0cmlidXRlTmFtZU1hcC5oYXMoa2V5KSA/IGF0dHJpYnV0ZU5hbWVNYXAuZ2V0KGtleSkgOiBrZXk7XG4gICAgICAgIGRhdGFbbmV3S2V5XSA9IHZba2V5XTtcbiAgICB9KTtcbiAgICBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBpZiAoIWRhdGFba2V5XSkge1xuICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0Q3hWZXJzaW9uOiBnZXRDeFZlcnNpb24sXG4gICAgZ2V0Q3hNYWpvclZlcnNpb246IGdldEN4TWFqb3JWZXJzaW9uLFxuICAgIHByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IHByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgdXBkYXRlQXR0cmlidXRlVHlwZU1hcDogdXBkYXRlQXR0cmlidXRlVHlwZU1hcCxcbiAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwOiB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwLFxuICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcDogdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgIHVwZGF0ZUluZmVycmVkVHlwZXM6IHVwZGF0ZUluZmVycmVkVHlwZXMsXG4gICAgZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzIDogZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeFV0aWwuanMiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNvbnZlcnRlciA9IHJlcXVpcmUgKCcuL2NvbnZlcnRlci5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cy5jb252ZXJ0ID0gKGN4LCB0YXJnZXRGb3JtYXQpID0+IHsgcmV0dXJuIGNvbnZlcnRlci5jb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQpOyB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGxhcmdlTmV0d29yayA9IHJlcXVpcmUgKCcuL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmsuanMnKTsgXG5jb25zdCBjeXRvc2NhcGVKUyA9IHJlcXVpcmUgKCcuL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiB2ZXJpZnlWZXJzaW9uKGN4KSB7XG4gICAgY29uc3QgZmlyc3RFbGVtZW50ID0gY3hbMF07XG4gICAgY29uc3QgdmVyc2lvblN0cmluZyA9IGZpcnN0RWxlbWVudFtjeENvbnN0YW50cy5DWF9WRVJTSU9OXTtcblxuICAgIGNvbnN0IG1ham9yVmVyc2lvbiA9IGN4VXRpbC5nZXRDeE1ham9yVmVyc2lvbih2ZXJzaW9uU3RyaW5nKTtcblxuICAgIGlmIChtYWpvclZlcnNpb24gIT09IDIpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSBDWCB2ZXJzaW9uOiAnICsgdmVyc2lvblN0cmluZztcbiAgICB9XG59XG5cbmNvbnN0IGRlZmF1bHRDb252ZXJ0ZXJzID0gW1xuICAgIGxhcmdlTmV0d29yayxcbiAgICBjeXRvc2NhcGVKU1xuXTtcblxuZnVuY3Rpb24gc2VsZWN0Q29udmVydGVyKHRhcmdldEZvcm1hdCwgY29udmVydGVycykge1xuICAgIGxldCBzZWxlY3RlZENvbnZlcnRlciA9IHVuZGVmaW5lZDtcbiAgICBcbiAgICBjb252ZXJ0ZXJzLmZvckVhY2goIGNvbnZlcnRlciA9PiB7XG4gICAgICAgIGlmIChjb252ZXJ0ZXIuY29udmVydGVyLnRhcmdldEZvcm1hdCA9PSB0YXJnZXRGb3JtYXQpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3RhcmdldCBmb3JtYXQ6ICcgKyBjb252ZXJ0ZXIuY29udmVydGVyLnRhcmdldEZvcm1hdCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdGVkQ29udmVydGVyID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDb252ZXJ0ZXIgPSBjb252ZXJ0ZXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93ICdjb252ZXJ0ZXJzIGNvbnRhaW4gbXVsdGlwbGUgZW50cmllcyBmb3IgdGFyZ2V0IGZvcm1hdDogJyArIHRhcmdldEZvcm1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RlZENvbnZlcnRlciA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyAnbm8gY29udmVydGVyIGF2YWlsYWJsZSBmb3IgdGFyZ2V0IGZvcm1hdDogJyArIHRhcmdldEZvcm1hdFxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0ZWRDb252ZXJ0ZXI7XG59XG5cbmZ1bmN0aW9uIGdldEVtcHR5TmV0d29yayh0YXJnZXRGb3JtYXQsIGNvbnZlcnRlcnMpIHtcbiAgICBjb25zdCBzZWxlY3RlZENvbnZlcnRlciA9IHNlbGVjdENvbnZlcnRlcih0YXJnZXRGb3JtYXQsIGNvbnZlcnRlcnMpO1xuICAgIHJldHVybiBzZWxlY3RlZENvbnZlcnRlci5jb252ZXJ0ZXIuZW1wdHlOZXR3b3JrO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQsIGNvbnZlcnRlcnMgPSBkZWZhdWx0Q29udmVydGVycykge1xuICAgIFxuICAgIGlmIChjeC5sZW5ndGggPT0gMCkge1xuICAgICAgICByZXR1cm4gZ2V0RW1wdHlOZXR3b3JrKHRhcmdldEZvcm1hdCwgY29udmVydGVycyk7XG4gICAgfVxuICAgIFxuICAgIHZlcmlmeVZlcnNpb24oY3gpO1xuICAgIGNvbnN0IHNlbGVjdGVkQ29udmVydGVyID0gc2VsZWN0Q29udmVydGVyKHRhcmdldEZvcm1hdCwgY29udmVydGVycyk7XG4gICAgcmV0dXJuIHNlbGVjdGVkQ29udmVydGVyLmNvbnZlcnRlci5jb252ZXJ0KGN4KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0OiBjb252ZXJ0XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb252ZXJ0ZXIuanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGxhcmdlTmV0d29ya0NvbnN0YW50cyA9IHJlcXVpcmUoJy4vbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSkge1xuICAgIGNvbnN0IHRhcmdldFN0eWxlRW50cnkgPSB7fTtcbiAgICB0YXJnZXRTdHlsZUVudHJ5W3RhcmdldFN0eWxlRmllbGRdID0gcG9ydGFibGVQcm9wZXJ0VmFsdWU7XG4gICAgcmV0dXJuIHRhcmdldFN0eWxlRW50cnk7XG59XG5cbmZ1bmN0aW9uIGhleFRvUkdCKGhleCkge1xuICAgIGlmIChoZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gaGV4O1xuICAgIH1cbiAgICBsZXQgciA9IDAsIGcgPSAwLCBiID0gMDtcblxuICAgIC8vIDMgZGlnaXRzXG4gICAgaWYgKGhleC5sZW5ndGggPT0gNCkge1xuICAgICAgICByID0gXCIweFwiICsgaGV4WzFdICsgaGV4WzFdO1xuICAgICAgICBnID0gXCIweFwiICsgaGV4WzJdICsgaGV4WzJdO1xuICAgICAgICBiID0gXCIweFwiICsgaGV4WzNdICsgaGV4WzNdO1xuXG4gICAgICAgIC8vIDYgZGlnaXRzXG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDcpIHtcbiAgICAgICAgciA9IFwiMHhcIiArIGhleFsxXSArIGhleFsyXTtcbiAgICAgICAgZyA9IFwiMHhcIiArIGhleFszXSArIGhleFs0XTtcbiAgICAgICAgYiA9IFwiMHhcIiArIGhleFs1XSArIGhleFs2XTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3BhcnNlSW50KHIpLCBwYXJzZUludChnKSwgcGFyc2VJbnQoYildO1xufVxuXG5mdW5jdGlvbiBhbHBoYVRvSW50KGFscGhhRGVjaW1hbCkge1xuICAgIHJldHVybiBjbGFtcChNYXRoLnJvdW5kKGFscGhhRGVjaW1hbCAqIDI1NSksIDAsIDI1NSk7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVXaWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVIZWlnaHQsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9MQUJFTF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0xBQkVMX0ZPTlRfU0laRSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsRm9udFNpemUsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhLCBhbHBoYVRvSW50KHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yLCBoZXhUb1JHQihwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ0VER0VfTEFCRUwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvciwgaGV4VG9SR0IocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdFREdFX0xBQkVMX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSwgYWxwaGFUb0ludChwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfRk9OVF9TSVpFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxGb250U2l6ZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH1cbn1cblxuXG5cbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZXMoZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMpIHtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBub2RlOiB7fSxcbiAgICAgICAgZWRnZToge31cbiAgICB9O1xuICAgIGlmIChkZWZhdWx0VmlzdWFsUHJvcGVydGllc1snbm9kZSddKSB7XG4gICAgICAgIGNvbnN0IG5vZGVEZWZhdWx0ID0gZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMubm9kZTtcbiAgICAgICAgY29uc3QgbG52RW50cmllcyA9IGdldExOVlZhbHVlcygnbm9kZScsIG5vZGVEZWZhdWx0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQubm9kZSwgbG52RW50cmllcyk7XG4gICAgfVxuICAgIGlmIChkZWZhdWx0VmlzdWFsUHJvcGVydGllc1snZWRnZSddKSB7XG4gICAgICAgIGNvbnN0IGVkZ2VEZWZhdWx0ID0gZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMuZWRnZTtcbiAgICAgICAgY29uc3QgbG52RW50cmllcyA9IGdldExOVlZhbHVlcygnZWRnZScsIGVkZ2VEZWZhdWx0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQuZWRnZSwgbG52RW50cmllcyk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldExOVlZhbHVlcyhlbnRpdHlUeXBlLCBlbnRyaWVzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGVudHJpZXMpLmZvckVhY2gocG9ydGFibGVQcm9wZXJ0eUtleSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGVudHJpZXNbcG9ydGFibGVQcm9wZXJ0eUtleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBsbnZFbnRyeSA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxudkVudHJ5KS5mb3JFYWNoKGxudktleSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2xudktleV0gPSBsbnZFbnRyeVtsbnZLZXldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NDb2xvcihjb2xvckFycmF5LCBhbHBoYSkge1xuICAgIHJldHVybiBjb2xvckFycmF5ICE9IHVuZGVmaW5lZFxuICAgICAgICA/IGFscGhhICE9IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBbY29sb3JBcnJheVswXSwgY29sb3JBcnJheVsxXSwgY29sb3JBcnJheVsyXSwgYWxwaGFdXG4gICAgICAgICAgICA6IFtjb2xvckFycmF5WzBdLCBjb2xvckFycmF5WzFdLCBjb2xvckFycmF5WzJdXVxuICAgICAgICA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1NpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHJldHVybiBNYXRoLm1heCh3aWR0aCwgaGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc05vZGVWaWV3KG5vZGVWaWV3KSB7XG4gICAgbGV0IHdpZHRoID0gdW5kZWZpbmVkO1xuICAgIGxldCBoZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGNvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGFscGhhID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGxhYmVsQ29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFiZWxBbHBoYSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIGlkOiBub2RlVmlldy5pZCxcbiAgICAgICAgcG9zaXRpb246IG5vZGVWaWV3LnBvc2l0aW9uXG4gICAgfTtcblxuXG4gICAgT2JqZWN0LmtleXMobm9kZVZpZXcpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlV2lkdGgpIHtcbiAgICAgICAgICAgIHdpZHRoID0gbm9kZVZpZXcucHJlcHJvY2Vzc05vZGVXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTm9kZUhlaWdodCkge1xuICAgICAgICAgICAgaGVpZ2h0ID0gbm9kZVZpZXcucHJlcHJvY2Vzc05vZGVIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yKSB7XG4gICAgICAgICAgICBjb2xvckFycmF5ID0gbm9kZVZpZXcucHJlcHJvY2Vzc0NvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NBbHBoYSkge1xuICAgICAgICAgICAgYWxwaGEgPSBub2RlVmlldy5wcmVwcm9jZXNzQWxwaGE7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IpIHtcbiAgICAgICAgICAgIGxhYmVsQ29sb3JBcnJheSA9IG5vZGVWaWV3LnByZXByb2Nlc3NMYWJlbENvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhKSB7XG4gICAgICAgICAgICBsYWJlbEFscGhhID0gbm9kZVZpZXcucHJlcHJvY2Vzc0xhYmVsQWxwaGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRwdXRba2V5XSA9IG5vZGVWaWV3W2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbG9yID0gcHJvY2Vzc0NvbG9yKGNvbG9yQXJyYXksIGFscGhhKTtcbiAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5jb2xvcl0gPSBjb2xvcjtcbiAgICB9XG5cbiAgICBjb25zdCBsYWJlbENvbG9yID0gcHJvY2Vzc0NvbG9yKGxhYmVsQ29sb3JBcnJheSwgbGFiZWxBbHBoYSk7XG4gICAgaWYgKGxhYmVsQ29sb3IpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbENvbG9yXSA9IGxhYmVsQ29sb3I7XG4gICAgfVxuXG4gICAgY29uc3Qgc2l6ZSA9IHByb2Nlc3NTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIGlmIChzaXplKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuc2l6ZV0gPSBwcm9jZXNzU2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0VkZ2VWaWV3KGVkZ2VWaWV3KSB7XG4gICAgbGV0IGNvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGFscGhhID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGxhYmVsQ29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFiZWxBbHBoYSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIGlkOiBlZGdlVmlldy5pZCxcbiAgICAgICAgczogZWRnZVZpZXcucyxcbiAgICAgICAgdDogZWRnZVZpZXcudFxuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKGVkZ2VWaWV3KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IpIHtcbiAgICAgICAgICAgIGNvbG9yQXJyYXkgPSBlZGdlVmlldy5wcmVwcm9jZXNzQ29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhKSB7XG4gICAgICAgICAgICBhbHBoYSA9IGVkZ2VWaWV3LnByZXByb2Nlc3NBbHBoYTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvcikge1xuICAgICAgICAgICAgbGFiZWxDb2xvckFycmF5ID0gZWRnZVZpZXcucHJlcHJvY2Vzc0xhYmVsQ29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEpIHtcbiAgICAgICAgICAgIGxhYmVsQWxwaGEgPSBlZGdlVmlldy5wcmVwcm9jZXNzTGFiZWxBbHBoYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dHB1dFtrZXldID0gZWRnZVZpZXdba2V5XTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29sb3IgPSBwcm9jZXNzQ29sb3IoY29sb3JBcnJheSwgYWxwaGEpO1xuICAgIGlmIChjb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmNvbG9yXSA9IGNvbG9yO1xuICAgIH1cblxuICAgIGNvbnN0IGxhYmVsQ29sb3IgPSBwcm9jZXNzQ29sb3IobGFiZWxDb2xvckFycmF5LCBsYWJlbEFscGhhKTtcbiAgICBpZiAobGFiZWxDb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsQ29sb3JdID0gbGFiZWxDb2xvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRNYXBwaW5ncyhtYXBwaW5ncykge1xuICAgIGxldCBvdXRwdXQgPSB7fVxuICAgIE9iamVjdC5rZXlzKG1hcHBpbmdzKS5mb3JFYWNoKHByb3BlcnR5S2V5ID0+IHtcbiAgICAgICAgY29uc3QgbWFwcGluZyA9IG1hcHBpbmdzW3Byb3BlcnR5S2V5XTtcbiAgICAgICAgb3V0cHV0W21hcHBpbmcuZGVmaW5pdGlvbi5hdHRyaWJ1dGVdID0ge1xuICAgICAgICAgICAgdHlwZTogbWFwcGluZy50eXBlLFxuICAgICAgICAgICAgdnA6IHByb3BlcnR5S2V5LFxuICAgICAgICAgICAgZGVmaW5pdGlvbjogbWFwcGluZy5kZWZpbml0aW9uXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZVJhdGlvKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCkge1xuICAgIHJldHVybiAoYXR0cmlidXRlVmFsdWUgLSBhdHRyaWJ1dGVNaW4pIC8gKGF0dHJpYnV0ZU1heCAtIGF0dHJpYnV0ZU1pbik7XG59XG5cbmZ1bmN0aW9uIGdldE1hcCh2cE1pbiwgdnBNYXgsIGF0dHJpYnV0ZVJhdGlvKSB7XG4gICAgaWYgKHZwTWluICE9PSB1bmRlZmluZWQgJiYgdnBNYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdnBNaW4gKyAoKHZwTWF4IC0gdnBNaW4pICogYXR0cmlidXRlUmF0aW8pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh2cE1pbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdnBNYXg7XG4gICAgICAgIH0gZWxzZSBpZiAodnBNYXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHZwTWluO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjbGFtcCh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsIG1pbiksIG1heCk7XG59XG5cbmZ1bmN0aW9uIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVSYXRpbyA9IGdldEF0dHJpYnV0ZVJhdGlvKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCk7XG5cbiAgICBjb25zdCBvdXRwdXQgPSBnZXRNYXAodnBNaW4sIHZwTWF4LCBhdHRyaWJ1dGVSYXRpbyk7XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpIHtcbiAgICBjb25zdCBtaW5SR0IgPSBoZXhUb1JHQih2cE1pbik7XG4gICAgY29uc3QgbWF4UkdCID0gaGV4VG9SR0IodnBNYXgpO1xuXG4gICAgY29uc3QgYXR0cmlidXRlUmF0aW8gPSBnZXRBdHRyaWJ1dGVSYXRpbyhhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgpO1xuXG4gICAgY29uc3Qgb3V0cHV0ID0gW1xuICAgICAgICAvL1RPRE8gY2hlY2sgdGhhdCBtaW5SR0IgYW5kIG1heFJHQiBhcmUgZGVmaW5lZC91bmRlZmluZWRcbiAgICAgICAgY2xhbXAoTWF0aC5yb3VuZChnZXRNYXAobWluUkdCID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBtaW5SR0JbMF0sIG1heFJHQiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkOiBtYXhSR0JbMF0sIGF0dHJpYnV0ZVJhdGlvKSksIDAsIDI1NSksXG4gICAgICAgIGNsYW1wKE1hdGgucm91bmQoZ2V0TWFwKG1pblJHQiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogbWluUkdCWzFdLCBtYXhSR0IgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZDogbWF4UkdCWzFdLCBhdHRyaWJ1dGVSYXRpbykpLCAwLCAyNTUpLFxuICAgICAgICBjbGFtcChNYXRoLnJvdW5kKGdldE1hcChtaW5SR0IgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IG1pblJHQlsyXSwgbWF4UkdCID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQ6IG1heFJHQlsyXSwgYXR0cmlidXRlUmF0aW8pKSwgMCwgMjU1KVxuICAgIF1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVSYXRpbyA9IGdldEF0dHJpYnV0ZVJhdGlvKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCk7XG4gICAgXG4gICAgY29uc3QgYWxwaGFEZWNpbWFsID0gZ2V0TWFwKHZwTWluLCB2cE1heCwgYXR0cmlidXRlUmF0aW8pO1xuXG4gICAgLy9jb25zb2xlLmxvZyhcImFscGhhRGVjaW1hbCA9IFwiICsgYWxwaGFEZWNpbWFsKTtcbiAgICByZXR1cm4gYWxwaGFUb0ludChhbHBoYURlY2ltYWwpO1xufVxuXG5jb25zdCBjb250aW51b3VzUHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9XSURUSCc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVXaWR0aCwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlSGVpZ2h0LCBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NDb2xvciwgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhLCBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yLCBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEsIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsRm9udFNpemUsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy53aWR0aCwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEsIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IsIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSwgY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdFREdFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxGb250U2l6ZSwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0luUmFuZ2UoYXR0cmlidXRlVmFsdWUsIG1pbiwgbWF4LCBpbmNsdWRlTWluLCBpbmNsdWRlTWF4KSB7XG4gICAgY29uc3QgbWluU2F0aXNmaWVkID0gbWluICE9PSB1bmRlZmluZWQgXG4gICAgICAgID8gKGluY2x1ZGVNaW4gPyBtaW4gPD0gYXR0cmlidXRlVmFsdWUgOiBtaW4gPCBhdHRyaWJ1dGVWYWx1ZSkgXG4gICAgICAgIDogdHJ1ZTtcbiAgICBjb25zdCBtYXhTYXRpc2ZpZWQgPSBtYXggIT0gdW5kZWZpbmVkXG4gICAgICAgID8gKGluY2x1ZGVNYXggPyBtYXggPj0gYXR0cmlidXRlVmFsdWUgOiBtYXggPiBhdHRyaWJ1dGVWYWx1ZSlcbiAgICAgICAgOiB0cnVlO1xuICAgIC8vY29uc29sZS5sb2coJ2lzSW5SYW5nZTogJyArIGF0dHJpYnV0ZVZhbHVlICsgJyAnICsgbWluICsgJyAnICsgbWF4ICsgJyAnICsgaW5jbHVkZU1pbiArICcgJyArIGluY2x1ZGVNYXggKyAnICcgKyBtaW5TYXRpc2ZpZWQgKyAnICcgKyBtYXhTYXRpc2ZpZWQpO1xuICAgIHJldHVybiBtaW5TYXRpc2ZpZWQgJiYgbWF4U2F0aXNmaWVkO1xufVxuXG5mdW5jdGlvbiBnZXRNYXBwZWRWYWx1ZXMobWFwcGluZ3MsIGVudGl0eVR5cGUsIGF0dHJpYnV0ZXMpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChhdHRyaWJ1dGVLZXkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlS2V5XTtcbiAgICAgICAgaWYgKG1hcHBpbmdzW2VudGl0eVR5cGVdW2F0dHJpYnV0ZUtleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcHBpbmcgPSBtYXBwaW5nc1tlbnRpdHlUeXBlXVthdHRyaWJ1dGVLZXldO1xuXG4gICAgICAgICAgICBpZiAobWFwcGluZy50eXBlID09PSAnRElTQ1JFVEUnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzY3JldGVNYXAgPSBtYXBwaW5nLmRlZmluaXRpb24ubWFwO1xuICAgICAgICAgICAgICAgIGRpc2NyZXRlTWFwLmZvckVhY2goa2V5VmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5VmFsdWUudiA9PSBhdHRyaWJ1dGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKGtleVZhbHVlLnZwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgY29udmVydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXBwaW5nLnR5cGUgPT09ICdQQVNTVEhST1VHSCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKGF0dHJpYnV0ZVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIGNvbnZlcnRlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXBwaW5nLnR5cGUgPT09ICdDT05USU5VT1VTJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRpbnVvdXNNYXBwaW5ncyA9IG1hcHBpbmcuZGVmaW5pdGlvbi5tYXA7XG4gICAgICAgICAgICAgICAgY29udGludW91c01hcHBpbmdzLmZvckVhY2gobWFwcGluZ1JhbmdlID0+IHtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW5SYW5nZShhdHRyaWJ1dGVWYWx1ZSwgbWFwcGluZ1JhbmdlLm1pbiwgbWFwcGluZ1JhbmdlLm1heCwgbWFwcGluZ1JhbmdlLmluY2x1ZGVNaW4sIG1hcHBpbmdSYW5nZS5pbmNsdWRlTWF4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGNvbnRpbnVvdXNQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSBjb250aW51b3VzUHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKGF0dHJpYnV0ZVZhbHVlLCBtYXBwaW5nUmFuZ2UubWluLCBtYXBwaW5nUmFuZ2UubWF4LCBtYXBwaW5nUmFuZ2UubWluVlBWYWx1ZSwgbWFwcGluZ1JhbmdlLm1heFZQVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0LCBjb252ZXJ0ZWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gbG52Q29udmVydChjeCkge1xuXG4gICAgLy9GaXJzdCBwYXNzLiBcbiAgICAvLyBXZSBuZWVkIHRvIGNvbGxlY3Qgb2JqZWN0IGF0dHJpYnV0ZXMgdG8gY2FsY3VsYXRlXG4gICAgLy8gbWFwcGluZ3MgaW4gdGhlIHNlY29uZCBwYXNzLiBcblxuICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGN4Tm9kZUJ5cGFzc2VzID0gW107XG4gICAgbGV0IGN4RWRnZUJ5cGFzc2VzID0gW107XG5cbiAgICBsZXQgbm9kZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IG5vZGVBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IGRlZmF1bHRWYWx1ZXMgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG1hcHBpbmdzID0ge1xuICAgICAgICBub2RlOiB7fSxcbiAgICAgICAgZWRnZToge31cbiAgICB9XG4gICAgbGV0IGJ5cGFzc01hcHBpbmdzID0ge1xuICAgICAgICAnbm9kZSc6IHt9LFxuICAgICAgICAnZWRnZSc6IHt9XG4gICAgfTtcblxuICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgIGlmIChjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddO1xuICAgICAgICAgICAgY3hVdGlsLnByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hOb2RlWyd2J10pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhlZGdlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGN4RWRnZVsndiddKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXSkge1xuICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZUJ5cGFzc2VzJ10pIHtcbiAgICAgICAgICAgIGN4QXNwZWN0Lm5vZGVCeXBhc3Nlcy5mb3JFYWNoKGJ5cGFzcyA9PiB7XG4gICAgICAgICAgICAgICAgY3hOb2RlQnlwYXNzZXMucHVzaChieXBhc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VCeXBhc3NlcyddKSB7XG4gICAgICAgICAgICBjeEFzcGVjdC5lZGdlQnlwYXNzZXMuZm9yRWFjaChieXBhc3MgPT4ge1xuICAgICAgICAgICAgICAgIGN4RWRnZUJ5cGFzc2VzLnB1c2goYnlwYXNzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgb3V0cHV0ID0ge307XG5cbiAgICBsZXQgbm9kZVZpZXdzID0gW107XG4gICAgbGV0IGVkZ2VWaWV3cyA9IFtdO1xuXG4gICAgY3hWaXN1YWxQcm9wZXJ0aWVzLmZvckVhY2godnBFbGVtZW50ID0+IHtcblxuICAgICAgICBjb25zdCBkZWZhdWx0U3R5bGVzID0gdnBFbGVtZW50LmRlZmF1bHQ7XG5cbiAgICAgICAgZGVmYXVsdFZhbHVlcyA9IGdldERlZmF1bHRWYWx1ZXMoZGVmYXVsdFN0eWxlcyk7XG5cbiAgICAgICAgbWFwcGluZ3Mubm9kZSA9IHZwRWxlbWVudC5ub2RlTWFwcGluZyA/IGdldE1hcHBpbmdzKHZwRWxlbWVudC5ub2RlTWFwcGluZykgOiB7fTtcbiAgICAgICAgbWFwcGluZ3MuZWRnZSA9IHZwRWxlbWVudC5lZGdlTWFwcGluZyA/IGdldE1hcHBpbmdzKHZwRWxlbWVudC5lZGdlTWFwcGluZykgOiB7fTtcblxuXG4gICAgfSk7XG5cbiAgICBjeE5vZGVCeXBhc3Nlcy5mb3JFYWNoKCh2cEVsZW1lbnQpID0+IHtcblxuICAgICAgICBjb25zdCBrZXkgPSB2cEVsZW1lbnRbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGdldExOVlZhbHVlcygnbm9kZScsIHZwRWxlbWVudC52KVxuXG4gICAgICAgIGlmICghYnlwYXNzTWFwcGluZ3Mubm9kZVtrZXldKSB7XG4gICAgICAgICAgICBieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2J5cGFzcyBjYWxjdWxhdGVkOiAnICsgSlNPTi5zdHJpbmdpZnkodmFsdWVzLCBudWxsLCAyKSk7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0sIHZhbHVlcyk7XG4gICAgICAgIC8vYnlwYXNzQ1NTRW50cmllcy5wdXNoKGdldEJ5cGFzc0NTU0VudHJ5KCdub2RlJywgdnBFbGVtZW50KSk7XG4gICAgfSk7XG5cbiAgICBjeEVkZ2VCeXBhc3Nlcy5mb3JFYWNoKCh2cEVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gdnBFbGVtZW50W2N4Q29uc3RhbnRzLklEXS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBnZXRMTlZWYWx1ZXMoJ2VkZ2UnLCB2cEVsZW1lbnQudilcblxuICAgICAgICBpZiAoIWJ5cGFzc01hcHBpbmdzLmVkZ2Vba2V5XSkge1xuICAgICAgICAgICAgYnlwYXNzTWFwcGluZ3MuZWRnZVtrZXldID0ge307XG4gICAgICAgIH1cblxuICAgICAgICAvL2NvbnNvbGUubG9nKCdieXBhc3MgY2FsY3VsYXRlZDogJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlcywgbnVsbCwgMikpO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oYnlwYXNzTWFwcGluZ3MuZWRnZVtrZXldLCB2YWx1ZXMpO1xuICAgIH1cbiAgICApO1xuXG4gICAgLy9jb25zb2xlLmxvZygnbWFwcGluZ3M6ICcgKyBKU09OLnN0cmluZ2lmeShtYXBwaW5ncywgbnVsbCwgMikpO1xuXG4gICAgLy9TZWNvbmQgcGFzcy4gXG4gICAgLy8gSGVyZSBpcyB3aGVyZSB0aGUgYWN0dWFsIG91dHB1dCBpcyBnZW5lcmF0ZWQuXG5cbiAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcblxuXG4gICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeE5vZGVbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGVWaWV3ID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogY3hJZCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGN4Tm9kZVsneiddID9cbiAgICAgICAgICAgICAgICAgICAgICAgIFtjeE5vZGVbJ3gnXSwgY3hOb2RlWyd5J10sIGN4Tm9kZVsneiddXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBbY3hOb2RlWyd4J10sIGN4Tm9kZVsneSddXVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vVE9ETyBjYWxjdWxhdGUgbG52IHZwcyBiYXNlZCBvbiBkZWZhdWx0cyBhbmQgYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHROb2RlVmlzdWFsUHJvcGVydGllcyA9IGRlZmF1bHRWYWx1ZXNbJ25vZGUnXTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlVmlldywgZGVmYXVsdE5vZGVWaXN1YWxQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9Bc3NpZ24gbWFwcGluZ3NcbiAgICAgICAgICAgICAgICBjb25zdCBleHBhbmRlZEF0dHJpYnV0ZXMgPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4Tm9kZVsndiddLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFwcGluZ1ZhbHVlcyA9IGdldE1hcHBlZFZhbHVlcyhtYXBwaW5ncywgJ25vZGUnLCBleHBhbmRlZEF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obm9kZVZpZXcsIG1hcHBpbmdWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgLy9Bc3NpZ24gYnlwYXNzXG4gICAgICAgICAgICAgICAgaWYgKGJ5cGFzc01hcHBpbmdzLm5vZGVbY3hJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlVmlldywgYnlwYXNzTWFwcGluZ3Mubm9kZVtjeElkXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkTm9kZVZpZXcgPSBwcm9jZXNzTm9kZVZpZXcobm9kZVZpZXcpO1xuXG4gICAgICAgICAgICAgICAgbm9kZVZpZXdzLnB1c2gocHJvY2Vzc2VkTm9kZVZpZXcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuXG4gICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeEVkZ2VbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRnZVZpZXcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBjeElkLFxuICAgICAgICAgICAgICAgICAgICBzOiBjeEVkZ2Uucy50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICB0OiBjeEVkZ2UudC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9UT0RPIGNhbGN1bGF0ZSBsbnYgdnBzIGJhc2VkIG9uIGRlZmF1bHRzIGFuZCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdEVkZ2VWaXN1YWxQcm9wZXJ0aWVzID0gZGVmYXVsdFZhbHVlc1snZWRnZSddO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBkZWZhdWx0RWRnZVZpc3VhbFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkQXR0cmlidXRlcyA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hFZGdlWyd2J10sIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBwaW5nVmFsdWVzID0gZ2V0TWFwcGVkVmFsdWVzKG1hcHBpbmdzLCAnZWRnZScsIGV4cGFuZGVkQXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlZGdlVmlldywgbWFwcGluZ1ZhbHVlcyk7XG4gICAgICAgICAgICAgICAgLy9Bc3NpZ24gYnlwYXNzXG4gICAgICAgICAgICAgICAgaWYgKGJ5cGFzc01hcHBpbmdzLmVkZ2VbY3hJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlZGdlVmlldywgYnlwYXNzTWFwcGluZ3MuZWRnZVtjeElkXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkRWRnZVZpZXcgPSBwcm9jZXNzRWRnZVZpZXcoZWRnZVZpZXcpO1xuXG4gICAgICAgICAgICAgICAgZWRnZVZpZXdzLnB1c2gocHJvY2Vzc2VkRWRnZVZpZXcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMubm9kZVZpZXdzXSA9IG5vZGVWaWV3cztcbiAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmVkZ2VWaWV3c10gPSBlZGdlVmlld3M7XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBjb252ZXJ0ZXIgPSB7XG4gICAgdGFyZ2V0Rm9ybWF0OiAnbG52JyxcbiAgICBlbXB0eU5ldHdvcms6IHtcIm5vZGVWaWV3c1wiOltdLFwiZWRnZVZpZXdzXCI6W119LFxuICAgIGNvbnZlcnQ6IChjeCkgPT4ge1xuICAgICAgICByZXR1cm4gbG52Q29udmVydChjeCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0OiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0LFxuICAgIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQ6IGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQsXG4gICAgY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0OiBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQsXG4gICAgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0OiBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQsXG4gICAgcHJvY2Vzc05vZGVWaWV3OiBwcm9jZXNzTm9kZVZpZXcsXG4gICAgcHJvY2Vzc0VkZ2VWaWV3OiBwcm9jZXNzRWRnZVZpZXcsXG4gICAgZ2V0RGVmYXVsdFZhbHVlczogZ2V0RGVmYXVsdFZhbHVlcyxcbiAgICBnZXRBdHRyaWJ1dGVSYXRpbzogZ2V0QXR0cmlidXRlUmF0aW8sXG4gICAgaXNJblJhbmdlOiBpc0luUmFuZ2UsXG4gICAgY29udmVydGVyOiBjb252ZXJ0ZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmsuanMiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgJ25vZGVWaWV3cyc6ICdub2RlVmlld3MnLFxuICAgICdlZGdlVmlld3MnOiAnZWRnZVZpZXdzJywgXG4gICAgJ2lkJzogJ2lkJyxcbiAgICAncG9zaXRpb24nOiAncG9zaXRpb24nLFxuICAgICdzJzogJ3MnLFxuICAgICd0JzogJ3QnLFxuICAgICdsYWJlbCc6ICdsYWJlbCcsIFxuICAgICdsYWJlbENvbG9yJyA6ICdsYWJlbENvbG9yJyxcbiAgICAnbGFiZWxGb250U2l6ZScgOiAnbGFiZWxGb250U2l6ZScsXG4gICAgJ2NvbG9yJzogJ2NvbG9yJyxcbiAgICAnc2l6ZScgOiAnc2l6ZScsXG4gICAgJ3dpZHRoJyA6ICd3aWR0aCcsXG5cbiAgICAncHJlcHJvY2Vzc0NvbG9yJzogJ3ByZXByb2Nlc3NDb2xvcicsXG4gICAgJ3ByZXByb2Nlc3NBbHBoYSc6ICdwcmVwcm9jZXNzQWxwaGEnLFxuICAgICdwcmVwcm9jZXNzTGFiZWxDb2xvcic6ICdwcmVwcm9jZXNzTGFiZWxDb2xvcicsXG4gICAgJ3ByZXByb2Nlc3NMYWJlbEFscGhhJzogJ3ByZXByb2Nlc3NMYWJlbEFscGhhJyxcbiAgICAncHJlcHJvY2Vzc05vZGVXaWR0aCcgOiAncHJlcHJvY2Vzc05vZGVXaWR0aCcsXG4gICAgJ3ByZXByb2Nlc3NOb2RlSGVpZ2h0JyA6ICdwcmVwcm9jZXNzTm9kZUhlaWdodCdcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBqc0NvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3l0b3NjYXBlSlNDb25zdGFudHMuanMnKTtcbmNvbnN0IGN4VXRpbCA9IHJlcXVpcmUoJy4uL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKSB7XG4gICAgY29uc3QgdGFyZ2V0U3R5bGVFbnRyeSA9IG5ldyBNYXAoKTtcbiAgICB0YXJnZXRTdHlsZUVudHJ5LnNldCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSk7XG4gICAgcmV0dXJuIHRhcmdldFN0eWxlRW50cnk7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfTEFCRUwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG59XG5cbmZ1bmN0aW9uIHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgYXR0cmlidXRlTmFtZSkge1xuICAgIGNvbnN0IG91dHB1dCA9IHt9O1xuICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9ICdkYXRhKCcgKyBhdHRyaWJ1dGVOYW1lICsgJyknO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuc2hhcGUsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9XSURUSCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfY29sb3IsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgYXR0cmlidXRlTmFtZSlcbiAgICB9LFxufVxuZnVuY3Rpb24gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBpZiAobWluVmFsdWUgIT0gdW5kZWZpbmVkICYmIG1heFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBvdXRwdXRbdGFyZ2V0U3R5bGVGaWVsZF0gPSAnbWFwRGF0YSgnICsgYXR0cmlidXRlTmFtZVxuICAgICAgICArICcsICcgKyBtaW5WYWx1ZVxuICAgICAgICArICcsICcgKyBtYXhWYWx1ZVxuICAgICAgICArICcsICcgKyBtaW5WUFxuICAgICAgICArICcsICcgKyBtYXhWUFxuICAgICAgICArICcpJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobWluVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3V0cHV0W3RhcmdldFN0eWxlRmllbGRdID0gbWF4VlA7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4VmFsdWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvdXRwdXRbdGFyZ2V0U3R5bGVGaWVsZF0gPSBtaW5WUDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBtYXBEYXRhUHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9TSEFQRSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9XSURUSCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUClcblxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKVxuICAgIH0sXG59XG5cblxuZnVuY3Rpb24gZ2V0Q1NTU3R5bGVFbnRyaWVzKGN4U3R5bGVFbnRyaWVzLCBlbnRpdHlUeXBlKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4U3R5bGVFbnRyaWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gY3hTdHlsZUVudHJpZXNba2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgY3NzRW50cmllcyA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgY3NzRW50cmllcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0SWRTZWxlY3RvcihpZCwgZWxlbWVudFR5cGUpIHtcbiAgICAvL25vZGUjaWQgb3IgZWRnZSNpZFxuICAgIHJldHVybiBlbGVtZW50VHlwZSArICcjJyArIGlkO1xufVxuXG5cblxuZnVuY3Rpb24gZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpIHtcbiAgICByZXR1cm4geyAnc2VsZWN0b3InOiBzZWxlY3RvciwgJ3N0eWxlJzogY3NzIH07XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIGluY2x1ZGVNaW4sIGluY2x1ZGVNYXgpIHtcbiAgICBjb25zdCBtaW5Db25kaXRpb24gPSBpbmNsdWRlTWluID8gJz49JyA6ICc+JztcbiAgICBjb25zdCBtYXhDb25kaXRpb24gPSBpbmNsdWRlTWF4ID8gJzw9JyA6ICc8JztcbiAgICBjb25zdCBtaW5Cb3VuZCA9IChtaW5WYWx1ZSAhPT0gdW5kZWZpbmVkKSA/ICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnICcgKyBtaW5Db25kaXRpb24gKyAnICcgKyBtaW5WYWx1ZSArICddJyA6ICcnO1xuICAgIGNvbnN0IG1heEJvdW5kID0gKG1heFZhbHVlICE9PSB1bmRlZmluZWQpID8gJ1snICsgYXR0cmlidXRlTmFtZSArICcgJyArIG1heENvbmRpdGlvbiArICcgJyArIG1heFZhbHVlICsgJ10nIDogJyc7XG4gICAgcmV0dXJuIGVudGl0eVR5cGUgKyBtaW5Cb3VuZCArIG1heEJvdW5kO1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzU3R5bGUoZW50aXR5VHlwZSwgcG9ydGFibGVQcm9wZXJ0eUtleSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApIHtcbiAgICBpZiAobWFwRGF0YVByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICByZXR1cm4gbWFwRGF0YVByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCk7XG4gICAgfVxuICAgIHJldHVybiB7fTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29udGludW91c01hcHBpbmdDU1NFbnRyaWVzKHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ2F0dHJpYnV0ZSddO1xuICAgIGNvbnN0IHJhbmdlTWFwcyA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ21hcCddO1xuICAgIC8vY29uc29sZS5sb2coJ2NvbnRpbnVvdXMgbWFwcGluZyBmb3IgJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgSlNPTi5zdHJpbmdpZnkocmFuZ2VNYXBzLCBudWxsLCAyKSk7XG5cbiAgICByYW5nZU1hcHMuZm9yRWFjaCgocmFuZ2UpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRDb250aW51b3VzU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIHJhbmdlLmluY2x1ZGVNaW4sIHJhbmdlLmluY2x1ZGVNYXgpO1xuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbnRpbnVvdXNTdHlsZShlbnRpdHlUeXBlLCBwb3J0YWJsZVByb3BlcnR5S2V5LCBhdHRyaWJ1dGVOYW1lLCByYW5nZS5taW4sIHJhbmdlLm1heCwgcmFuZ2UubWluVlBWYWx1ZSwgcmFuZ2UubWF4VlBWYWx1ZSk7XG5cbiAgICAgICAgb3V0cHV0LnB1c2goZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBzdHlsZSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUpIHtcbiAgICBpZiAocGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICBjb25zdCBjc3MgPSBwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGN4TWFwcGluZ0RlZmluaXRpb24uYXR0cmlidXRlKTtcbiAgICAgICAgcmV0dXJuIGdldFN0eWxlRWxlbWVudChlbnRpdHlUeXBlLCBjc3MpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEYXRhVHlwZSwgYXR0cmlidXRlVmFsdWUpIHtcbiAgICBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyA9IFxcJycgKyBhdHRyaWJ1dGVWYWx1ZSArICdcXCddJztcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZURhdGFUeXBlID09ICdib29sZWFuJykge1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVWYWx1ZSA9PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1s/JyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnXVshJyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gJyArIGF0dHJpYnV0ZVZhbHVlICsgJ10nO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyhwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIGNvbnN0IGF0dHRyaWJ1dGVUb1ZhbHVlTWFwID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ2F0dHJpYnV0ZSddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZURhdGFUeXBlID0gYXR0cmlidXRlVHlwZU1hcC5nZXQoYXR0cmlidXRlTmFtZSk7XG4gICAgYXR0dHJpYnV0ZVRvVmFsdWVNYXAuZm9yRWFjaCgoZGlzY3JldGVNYXApID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnIGRpc2NyZXRlIG1hcCBmb3IgJyArIHBvcnRhYmxlUHJvcGVydHlLZXkgKyAnOiAnICsgZGlzY3JldGVNYXAudiArICcgKCcgKyBhdHRyaWJ1dGVOYW1lICsgJzwnICsgYXR0cmlidXRlRGF0YVR5cGUgKyAnPikgLT4gJyArIGRpc2NyZXRlTWFwLnZwKTtcblxuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGdldERpc2NyZXRlU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGF0YVR5cGUsIGRpc2NyZXRlTWFwLnYpO1xuXG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZU1hcCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oZGlzY3JldGVNYXAudnApO1xuICAgICAgICAgICAgY29uc3QgY3NzID0ge307XG4gICAgICAgICAgICBzdHlsZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY3NzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyAgIHN0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkoY3NzKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIG91dHB1dDsgLy9nZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcyk7XG59XG5cbmZ1bmN0aW9uIGdldEJ5cGFzc0NTU0VudHJ5KGVudGl0eVR5cGUsIGN4RWxlbWVudCkge1xuXG4gICAgY29uc3QgaWQgPSBjeEVsZW1lbnQuaWQ7XG4gICAgY29uc3QgY3NzID0ge307XG4gICAgT2JqZWN0LmtleXMoY3hFbGVtZW50LnYpLmZvckVhY2goKHBvcnRhYmxlUHJvcGVydHlLZXkpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gY3hFbGVtZW50LnZbcG9ydGFibGVQcm9wZXJ0eUtleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZU1hcCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIHN0eWxlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBjc3Nba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0SWRTZWxlY3RvcihpZCwgZW50aXR5VHlwZSk7XG4gICAgcmV0dXJuIGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKTtcbn1cblxuLyoqIFxuICogXG4qL1xuZnVuY3Rpb24gZ2V0Q1NTTWFwcGluZ0VudHJpZXMoXG4gICAgY3hNYXBwaW5nRW50cmllcyxcbiAgICBlbnRpdHlUeXBlLFxuICAgIGF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgY3hNYXBwaW5nRW50cmllcyAmJiBPYmplY3Qua2V5cyhjeE1hcHBpbmdFbnRyaWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgY3hNYXBwaW5nRW50cnkgPSBjeE1hcHBpbmdFbnRyaWVzW2tleV07XG4gICAgICAgIC8vY29uc29sZS5sb2coXCIgbWFwcGluZyB0eXBlOiBcIiArIGN4TWFwcGluZ0VudHJ5LnR5cGUpO1xuICAgICAgICBzd2l0Y2ggKGN4TWFwcGluZ0VudHJ5LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0NPTlRJTlVPVVMnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGlub3VzTWFwcGluZ3MgPSBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKTtcbiAgICAgICAgICAgICAgICBjb250aW5vdXNNYXBwaW5ncy5mb3JFYWNoKChjb250aW5vdXNNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGNvbnRpbm91c01hcHBpbmcpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdQQVNTVEhST1VHSCc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjc3NFbnRyeSA9IGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNzc0VudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGNzc0VudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdESVNDUkVURSc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNjcmV0ZU1hcHBpbmdzID0gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyhrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApO1xuICAgICAgICAgICAgICAgIGRpc2NyZXRlTWFwcGluZ3MuZm9yRWFjaCgoZGlzY3JldGVNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGRpc2NyZXRlTWFwcGluZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IE5PREVfU0VMRUNUT1IgPSAnbm9kZSc7XG5jb25zdCBFREdFX1NFTEVDVE9SID0gJ2VkZ2UnO1xuXG5mdW5jdGlvbiBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgY3hOb2RlQnlwYXNzZXMsIGN4RWRnZUJ5cGFzc2VzLCBub2RlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBzdHlsZTogW10sXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgbGV0IGRlZmF1bHRDU1NOb2RlU3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGRlZmF1bHRDU1NFZGdlU3R5bGUgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgY3NzTmV0d29ya0JhY2tncm91bmRDb2xvciA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBtYXBwaW5nQ1NTTm9kZVN0eWxlID0gdW5kZWZpbmVkO1xuICAgIGxldCBtYXBwaW5nQ1NTRWRnZVN0eWxlID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGJ5cGFzc0NTU0VudHJpZXMgPSBbXTtcblxuICAgIGN4VmlzdWFsUHJvcGVydGllcy5mb3JFYWNoKCh2cEVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFN0eWxlcyA9IHZwRWxlbWVudC5kZWZhdWx0O1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2RlZmF1bHQgc3R5bGU6ICcgKyBKU09OLnN0cmluZ2lmeShkZWZhdWx0U3R5bGVzKSk7XG4gICAgICAgIGRlZmF1bHRDU1NOb2RlU3R5bGUgPSBnZXRDU1NTdHlsZUVudHJpZXMoZGVmYXVsdFN0eWxlcy5ub2RlLCAnbm9kZScpO1xuICAgICAgICBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gZ2V0Q1NTU3R5bGVFbnRyaWVzKGRlZmF1bHRTdHlsZXMuZWRnZSwgJ2VkZ2UnKTtcblxuICAgICAgICBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gZGVmYXVsdFN0eWxlcy5uZXR3b3JrWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgY29uc3Qgbm9kZU1hcHBpbmcgPSB2cEVsZW1lbnQubm9kZU1hcHBpbmc7XG4gICAgICAgIG1hcHBpbmdDU1NOb2RlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhub2RlTWFwcGluZywgJ25vZGUnLCBub2RlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgY29uc3QgZWRnZU1hcHBpbmcgPSB2cEVsZW1lbnQuZWRnZU1hcHBpbmc7XG4gICAgICAgIG1hcHBpbmdDU1NFZGdlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhlZGdlTWFwcGluZywgJ2VkZ2UnLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICB9KVxuXG4gICAgY3hOb2RlQnlwYXNzZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGJ5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnbm9kZScsIHZwRWxlbWVudCkpO1xuICAgIH0pO1xuXG4gICAgY3hFZGdlQnlwYXNzZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGJ5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnZWRnZScsIHZwRWxlbWVudCkpO1xuICAgIH0pO1xuXG4gICAgLy9jb25zb2xlLmxvZygnZGVmYXVsdCBub2RlIHN0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkoZGVmYXVsdENTU05vZGVTdHlsZSkpO1xuXG4gICAgLy9BZGQgZGVmYXVsdCBzdHlsZVxuICAgIG91dHB1dC5zdHlsZS5wdXNoKGdldFN0eWxlRWxlbWVudChOT0RFX1NFTEVDVE9SLCBkZWZhdWx0Q1NTTm9kZVN0eWxlKSk7XG4gICAgb3V0cHV0LnN0eWxlLnB1c2goZ2V0U3R5bGVFbGVtZW50KEVER0VfU0VMRUNUT1IsIGRlZmF1bHRDU1NFZGdlU3R5bGUpKTtcblxuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgbWFwcGluZ0NTU05vZGVTdHlsZSk7XG4gICAgb3V0cHV0LnN0eWxlLnB1c2guYXBwbHkob3V0cHV0LnN0eWxlLCBtYXBwaW5nQ1NTRWRnZVN0eWxlKTtcblxuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgYnlwYXNzQ1NTRW50cmllcyk7XG5cbiAgICBvdXRwdXRbJ2JhY2tncm91bmQtY29sb3InXSA9IGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBjb252ZXJ0ZXIgPSB7XG4gICAgdGFyZ2V0Rm9ybWF0OiAnY3l0b3NjYXBlSlMnLFxuICAgIGVtcHR5TmV0d29yazoge1xuICAgICAgICBzdHlsZTogW10sXG4gICAgICAgIGVsZW1lbnRzOiB7fSxcbiAgICAgICAgbGF5b3V0OiB7fSxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBudWxsXG4gICAgfSxcbiAgICBjb252ZXJ0OiAoY3gpID0+IHtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0ge1xuICAgICAgICAgICAgc3R5bGU6IFtdLFxuICAgICAgICAgICAgZWxlbWVudHM6IHt9LFxuICAgICAgICAgICAgbGF5b3V0OiB7fSxcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN4VmlzdWFsUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGN4Tm9kZUJ5cGFzc2VzID0gW107XG4gICAgICAgIGxldCBjeEVkZ2VCeXBhc3NlcyA9IFtdO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IFwiICsgSlNPTi5zdHJpbmdpZnkoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIG51bGwsIDIpKTtcbiAgICAgICAgICAgICAgICBjeFV0aWwucHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyhjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgICAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhub2RlQXR0cmlidXRlVHlwZU1hcCwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4Tm9kZVsndiddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEVkZ2VbJ3YnXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ10pIHtcbiAgICAgICAgICAgICAgICBjeFZpc3VhbFByb3BlcnRpZXMgPSBjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZUJ5cGFzc2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjeEFzcGVjdC5ub2RlQnlwYXNzZXMuZm9yRWFjaChieXBhc3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjeE5vZGVCeXBhc3Nlcy5wdXNoKGJ5cGFzcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlQnlwYXNzZXMnXSkge1xuICAgICAgICAgICAgICAgIGN4QXNwZWN0LmVkZ2VCeXBhc3Nlcy5mb3JFYWNoKGJ5cGFzcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN4RWRnZUJ5cGFzc2VzLnB1c2goYnlwYXNzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAuZm9yRWFjaCgoaW5mZXJyZWRUeXBlLCBhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3Igbm9kZTogJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWRnZUF0dHJpYnV0ZVR5cGVNYXAuZm9yRWFjaCgoaW5mZXJyZWRUeXBlLCBhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3IgZWRnZTogJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9BZGQgbm9kZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydub2RlcyddID0gW107XG5cbiAgICAgICAgLy9BZGQgZWRnZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydlZGdlcyddID0gW107XG5cblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuICAgICAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddID0gY3hVdGlsLmdldEV4cGFuZGVkQXR0cmlidXRlcyhjeE5vZGVbJ3YnXSwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ2lkJ10gPSBjeE5vZGUuaWQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsncG9zaXRpb24nXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGN4Tm9kZVsneCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogY3hOb2RlWyd5J11cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMubm9kZXMucHVzaChlbGVtZW50KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcbiAgICAgICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hFZGdlWyd2J10sIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydpZCddID0gY3hFZGdlLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnc291cmNlJ10gPSBjeEVkZ2VbJ3MnXTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWyd0YXJnZXQnXSA9IGN4RWRnZVsndCddO1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMuZWRnZXMucHVzaChlbGVtZW50KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzdHlsZSA9IGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBjeE5vZGVCeXBhc3NlcywgY3hFZGdlQnlwYXNzZXMsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgb3V0cHV0LnN0eWxlID0gc3R5bGUuc3R5bGU7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3Zpc3VhbFByb3BlcnRpZXM6ICcgKyBKU09OLnN0cmluZ2lmeShjeFZpc3VhbFByb3BlcnRpZXMsIG51bGwsIDIpKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnc3R5bGU6ICcgKyBKU09OLnN0cmluZ2lmeShvdXRwdXQuc3R5bGUsIG51bGwsIDIpKTtcblxuICAgICAgICBvdXRwdXRbJ2JhY2tncm91bmQtY29sb3InXSA9IHN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnZlcnRlcjogY29udmVydGVyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKUy5qcyIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICAnc2hhcGUnOiAnc2hhcGUnLFxuICAgICd3aWR0aCc6ICd3aWR0aCcsIFxuICAgICdoZWlnaHQnOiAnaGVpZ2h0JyxcbiAgICAnYmFja2dyb3VuZF9jb2xvcic6ICdiYWNrZ3JvdW5kLWNvbG9yJyxcbiAgICAnYmFja2dyb3VuZF9vcGFjaXR5JzogJ2JhY2tncm91bmQtb3BhY2l0eScsXG4gICAgJ2xhYmVsJzogJ2xhYmVsJyxcbiAgICAnbGFiZWxfY29sb3InOiAnY29sb3InLFxuICAgICdsYWJlbF9mb250X3NpemUnIDogJ2ZvbnQtc2l6ZScsXG4gICAgJ2xhYmVsX29wYWNpdHknIDogJ3RleHQtb3BhY2l0eScsXG4gICAgJ29wYWNpdHknOiAnb3BhY2l0eScsXG4gICAgJ2xpbmVfY29sb3InOiAnbGluZS1jb2xvcidcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKU0NvbnN0YW50cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=