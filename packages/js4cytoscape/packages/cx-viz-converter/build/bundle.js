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
        var mappingList = output[mapping.definition.attribute] ? output[mapping.definition.attribute] : [];
        mappingList.push({
            type: mapping.type,
            vp: propertyKey,
            definition: mapping.definition
        });
        output[mapping.definition.attribute] = mappingList;
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
            mappings[entityType][attributeKey].forEach(function (mapping) {

                if (mapping.type === 'DISCRETE') {
                    var discreteMap = mapping.definition.map;
                    //console.log('processing discrete map:' + entityType + ' mapping.vp=' + mapping.vp + ' ' + attributeKey);
                    discreteMap.forEach(function (keyValue) {
                        if (keyValue.v == attributeValue) {
                            //console.log('\tkeyValue.v=' + keyValue.v + ' ' + attributeValue);
                            if (defaultPropertyConvert[entityType][mapping.vp]) {
                                var converted = defaultPropertyConvert[entityType][mapping.vp](keyValue.vp);
                                //console.log('\tconverted ' + JSON.stringify(converted))
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
            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyODVhOTZkMDZjZTI5NTJlZTZmMSIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsIlBPIiwiZ2V0Q3hWZXJzaW9uIiwidmVyc2lvblN0cmluZyIsInZlcnNpb25BcnJheSIsInNwbGl0IiwibWFwIiwibnVtYmVyU3RyaW5nIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXNOYU4iLCJlbGVtZW50IiwiZ2V0Q3hNYWpvclZlcnNpb24iLCJwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVBdHRyaWJ1dGVUeXBlTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwiZWRnZUF0dHJpYnV0ZVR5cGVNYXAiLCJlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbiIsInVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAiLCJub2RlcyIsInVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAiLCJ1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJlZGdlcyIsImF0dHJpYnV0ZVR5cGVNYXAiLCJhdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJrZXlzIiwiYXR0cmlidXRlTmFtZSIsImF0dHJpYnV0ZURlY2xhcmF0aW9uIiwic2V0IiwiZCIsImF0dHJpYnV0ZU5hbWVNYXAiLCJhIiwiYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwidiIsInVwZGF0ZUluZmVycmVkVHlwZXMiLCJrZXkiLCJoYXMiLCJ2YWx1ZSIsImluZmVycmVkVHlwZSIsIm5ld0tleSIsImdldCIsImdldEV4cGFuZGVkQXR0cmlidXRlcyIsImRhdGEiLCJjb252ZXJ0ZXIiLCJyZXF1aXJlIiwiY29udmVydCIsImN4IiwidGFyZ2V0Rm9ybWF0IiwiY3hDb25zdGFudHMiLCJsYXJnZU5ldHdvcmsiLCJjeXRvc2NhcGVKUyIsImN4VXRpbCIsInZlcmlmeVZlcnNpb24iLCJmaXJzdEVsZW1lbnQiLCJtYWpvclZlcnNpb24iLCJkZWZhdWx0Q29udmVydGVycyIsInNlbGVjdENvbnZlcnRlciIsImNvbnZlcnRlcnMiLCJzZWxlY3RlZENvbnZlcnRlciIsInVuZGVmaW5lZCIsImdldEVtcHR5TmV0d29yayIsImVtcHR5TmV0d29yayIsImxhcmdlTmV0d29ya0NvbnN0YW50cyIsInNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJ0YXJnZXRTdHlsZUZpZWxkIiwicG9ydGFibGVQcm9wZXJ0VmFsdWUiLCJ0YXJnZXRTdHlsZUVudHJ5IiwiaGV4VG9SR0IiLCJoZXgiLCJyIiwiZyIsImIiLCJhbHBoYVRvSW50IiwiYWxwaGFEZWNpbWFsIiwiY2xhbXAiLCJNYXRoIiwicm91bmQiLCJkZWZhdWx0UHJvcGVydHlDb252ZXJ0IiwicG9ydGFibGVQcm9wZXJ0eVZhbHVlIiwicHJlcHJvY2Vzc05vZGVXaWR0aCIsInByZXByb2Nlc3NOb2RlSGVpZ2h0IiwicHJlcHJvY2Vzc0NvbG9yIiwicHJlcHJvY2Vzc0FscGhhIiwibGFiZWwiLCJwcmVwcm9jZXNzTGFiZWxDb2xvciIsInByZXByb2Nlc3NMYWJlbEFscGhhIiwibGFiZWxGb250U2l6ZSIsIndpZHRoIiwiZ2V0RGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzIiwib3V0cHV0Iiwibm9kZSIsImVkZ2UiLCJub2RlRGVmYXVsdCIsImxudkVudHJpZXMiLCJnZXRMTlZWYWx1ZXMiLCJhc3NpZ24iLCJlZGdlRGVmYXVsdCIsImVudGl0eVR5cGUiLCJlbnRyaWVzIiwicG9ydGFibGVQcm9wZXJ0eUtleSIsImxudkVudHJ5IiwibG52S2V5IiwicHJvY2Vzc0NvbG9yIiwiY29sb3JBcnJheSIsImFscGhhIiwicHJvY2Vzc1NpemUiLCJoZWlnaHQiLCJtYXgiLCJwcm9jZXNzTm9kZVZpZXciLCJub2RlVmlldyIsImxhYmVsQ29sb3JBcnJheSIsImxhYmVsQWxwaGEiLCJpZCIsInBvc2l0aW9uIiwiY29sb3IiLCJsYWJlbENvbG9yIiwic2l6ZSIsInByb2Nlc3NFZGdlVmlldyIsImVkZ2VWaWV3IiwicyIsInQiLCJnZXRNYXBwaW5ncyIsIm1hcHBpbmdzIiwibWFwcGluZyIsInByb3BlcnR5S2V5IiwibWFwcGluZ0xpc3QiLCJkZWZpbml0aW9uIiwiYXR0cmlidXRlIiwicHVzaCIsInR5cGUiLCJ2cCIsImdldEF0dHJpYnV0ZVJhdGlvIiwiYXR0cmlidXRlVmFsdWUiLCJhdHRyaWJ1dGVNaW4iLCJhdHRyaWJ1dGVNYXgiLCJnZXRNYXAiLCJ2cE1pbiIsInZwTWF4IiwiYXR0cmlidXRlUmF0aW8iLCJtaW4iLCJjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0IiwiY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0IiwibWluUkdCIiwibWF4UkdCIiwiY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0IiwiY29udGludW91c1Byb3BlcnR5Q29udmVydCIsImlzSW5SYW5nZSIsImluY2x1ZGVNaW4iLCJpbmNsdWRlTWF4IiwibWluU2F0aXNmaWVkIiwibWF4U2F0aXNmaWVkIiwiZ2V0TWFwcGVkVmFsdWVzIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZUtleSIsImRpc2NyZXRlTWFwIiwia2V5VmFsdWUiLCJjb252ZXJ0ZWQiLCJjb250aW51b3VzTWFwcGluZ3MiLCJtYXBwaW5nUmFuZ2UiLCJtaW5WUFZhbHVlIiwibWF4VlBWYWx1ZSIsImxudkNvbnZlcnQiLCJjeFZpc3VhbFByb3BlcnRpZXMiLCJjeE5vZGVCeXBhc3NlcyIsImN4RWRnZUJ5cGFzc2VzIiwiTWFwIiwiZGVmYXVsdFZhbHVlcyIsImJ5cGFzc01hcHBpbmdzIiwiY3hBc3BlY3QiLCJjeE5vZGVzIiwiY3hOb2RlIiwiY3hFZGdlcyIsImN4RWRnZSIsIm5vZGVCeXBhc3NlcyIsImJ5cGFzcyIsImVkZ2VCeXBhc3NlcyIsIm5vZGVWaWV3cyIsImVkZ2VWaWV3cyIsImRlZmF1bHRTdHlsZXMiLCJ2cEVsZW1lbnQiLCJkZWZhdWx0Iiwibm9kZU1hcHBpbmciLCJlZGdlTWFwcGluZyIsInRvU3RyaW5nIiwidmFsdWVzIiwiY3hJZCIsImRlZmF1bHROb2RlVmlzdWFsUHJvcGVydGllcyIsImV4cGFuZGVkQXR0cmlidXRlcyIsIm1hcHBpbmdWYWx1ZXMiLCJwcm9jZXNzZWROb2RlVmlldyIsImRlZmF1bHRFZGdlVmlzdWFsUHJvcGVydGllcyIsInByb2Nlc3NlZEVkZ2VWaWV3IiwianNDb25zdGFudHMiLCJzaGFwZSIsImJhY2tncm91bmRfY29sb3IiLCJiYWNrZ3JvdW5kX29wYWNpdHkiLCJsYWJlbF9jb2xvciIsImxhYmVsX29wYWNpdHkiLCJsYWJlbF9mb250X3NpemUiLCJvcGFjaXR5IiwibGluZV9jb2xvciIsInNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0Iiwic2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydCIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJtaW5WUCIsIm1heFZQIiwibWFwRGF0YVByb3BlcnR5Q29udmVydCIsImdldENTU1N0eWxlRW50cmllcyIsImN4U3R5bGVFbnRyaWVzIiwiY3NzRW50cmllcyIsImdldElkU2VsZWN0b3IiLCJlbGVtZW50VHlwZSIsImdldFN0eWxlRWxlbWVudCIsInNlbGVjdG9yIiwiY3NzIiwiZ2V0Q29udGludW91c1NlbGVjdG9yIiwibWluQ29uZGl0aW9uIiwibWF4Q29uZGl0aW9uIiwibWluQm91bmQiLCJtYXhCb3VuZCIsImdldENvbnRpbnVvdXNTdHlsZSIsImdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cmllcyIsImN4TWFwcGluZ0RlZmluaXRpb24iLCJyYW5nZU1hcHMiLCJyYW5nZSIsInN0eWxlIiwiZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkiLCJnZXREaXNjcmV0ZVNlbGVjdG9yIiwiYXR0cmlidXRlRGF0YVR5cGUiLCJnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzIiwiYXR0dHJpYnV0ZVRvVmFsdWVNYXAiLCJzdHlsZU1hcCIsImdldEJ5cGFzc0NTU0VudHJ5IiwiY3hFbGVtZW50IiwiZ2V0Q1NTTWFwcGluZ0VudHJpZXMiLCJjeE1hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cnkiLCJjb250aW5vdXNNYXBwaW5ncyIsImNvbnRpbm91c01hcHBpbmciLCJjc3NFbnRyeSIsImRpc2NyZXRlTWFwcGluZ3MiLCJkaXNjcmV0ZU1hcHBpbmciLCJOT0RFX1NFTEVDVE9SIiwiRURHRV9TRUxFQ1RPUiIsImdldFZpc3VhbFByb3BlcnRpZXMiLCJkZWZhdWx0Q1NTTm9kZVN0eWxlIiwiZGVmYXVsdENTU0VkZ2VTdHlsZSIsImNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IiLCJtYXBwaW5nQ1NTTm9kZVN0eWxlIiwibWFwcGluZ0NTU0VkZ2VTdHlsZSIsImJ5cGFzc0NTU0VudHJpZXMiLCJuZXR3b3JrIiwiYXBwbHkiLCJlbGVtZW50cyIsImxheW91dCIsIngiLCJ5Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7Ozs7O0FDNURBQSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPQyxNQUFQLENBQWM7QUFDM0JDLGdCQUFZLFdBRGU7QUFFM0JDLFVBQU0sTUFGcUI7QUFHM0JDLFVBQU0sTUFIcUI7QUFJM0JDLGFBQVMsU0FKa0I7O0FBTTNCQyxXQUFPLE9BTm9CO0FBTzNCQyxXQUFPLE9BUG9COztBQVMzQkMsUUFBSSxJQVR1QjtBQVUzQkMsT0FBRyxHQVZ3QjtBQVczQkMsT0FBRyxHQVh3QjtBQVkzQkMsT0FBRyxHQVp3QjtBQWEzQkMsT0FBRyxHQWJ3Qjs7QUFlM0JDLFFBQUksSUFmdUI7QUFnQjNCQyxPQUFHLEdBaEJ3QjtBQWlCM0JDLE9BQUcsR0FqQndCOztBQW1CM0JDLHVCQUFtQixrQkFuQlE7QUFvQjNCQyxhQUFTLFNBcEJrQjs7QUFzQjNCQyxXQUFPLE9BdEJvQjs7QUF3QjNCQyxRQUFJO0FBeEJ1QixDQUFkLENBQWpCLEM7Ozs7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V0FSTztBQVMzQixxQkFBa0IsY0FUUztBQVUzQixlQUFXLFNBVmdCO0FBVzNCLGtCQUFjO0FBWGEsQ0FBZCxDQUFqQixDIiwiZmlsZSI6Ii4vYnVpbGQvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3hWaXpDb252ZXJ0ZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiY3hWaXpDb252ZXJ0ZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDI4NWE5NmQwNmNlMjk1MmVlNmYxIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgIENYX1ZFUlNJT046ICdDWFZlcnNpb24nLFxuICAgIE5PREU6ICdub2RlJyxcbiAgICBFREdFOiAnZWRnZScsXG4gICAgTkVUV09SSzogJ25ldHdvcmsnLFxuXG4gICAgTk9ERVM6ICdub2RlcycsXG4gICAgRURHRVM6ICdlZGdlcycsXG5cbiAgICBJRDogJ2lkJyxcbiAgICBYOiAneCcsXG4gICAgWTogJ3knLFxuICAgIFo6ICd6JyxcbiAgICBWOiAndicsXG5cbiAgICBBVDogJ2F0JyxcbiAgICBOOiAnbicsXG4gICAgRTogJ2UnLFxuXG4gICAgVklTVUFMX1BST1BFUlRJRVM6ICd2aXN1YWxQcm9wZXJ0aWVzJyxcbiAgICBERUZBVUxUOiAnZGVmYXVsdCcsXG5cbiAgICBTVFlMRTogJ3N0eWxlJyxcblxuICAgIFBPOiAncG8nXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hDb25zdGFudHMuanMiLCJmdW5jdGlvbiBnZXRDeFZlcnNpb24odmVyc2lvblN0cmluZykge1xuICAgIGNvbnN0IHZlcnNpb25BcnJheSA9IHZlcnNpb25TdHJpbmcuc3BsaXQoJy4nKS5tYXAoKG51bWJlclN0cmluZykgPT4geyByZXR1cm4gcGFyc2VJbnQobnVtYmVyU3RyaW5nLCAxMCk7IH0pO1xuICAgIGlmICh2ZXJzaW9uQXJyYXkubGVuZ3RoICE9PSAyICYmIHZlcnNpb25BcnJheS5sZW5ndGggIT0gMykge1xuICAgICAgICB0aHJvdyAnSW5jb21wYXRpYmxlIHZlcnNpb24gZm9ybWF0OiAnICsgdmVyc2lvblN0cmluZztcbiAgICB9XG4gICAgdmVyc2lvbkFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGlmIChpc05hTihlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgJ05vbi1pbnRlZ2VyIHZhbHVlIGluIHZlcnNpb24gc3RyaW5nOiAnICsgdmVyc2lvblN0cmluZztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2ZXJzaW9uQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGdldEN4TWFqb3JWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcbiAgICByZXR1cm4gdmVyc2lvblN0cmluZyA/IGdldEN4VmVyc2lvbih2ZXJzaW9uU3RyaW5nKVswXSA6IDE7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIFxuICAgIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBcbiAgICBub2RlQXR0cmlidXRlVHlwZU1hcCwgXG4gICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgXG4gICAgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBcbiAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKSB7XG4gICAgLy9jb25zb2xlLmxvZyhcIiBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uczogXCIgKyBKU09OLnN0cmluZ2lmeShjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucywgbnVsbCwgMikpO1xuICAgIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLmZvckVhY2goKGN4QXR0cmlidXRlRGVjbGFyYXRpb24pID0+IHtcbiAgICAgICAgaWYgKGN4QXR0cmlidXRlRGVjbGFyYXRpb25bJ25vZGVzJ10pIHtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAobm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlVHlwZU1hcChub2RlQXR0cmlidXRlVHlwZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAobm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN4QXR0cmlidXRlRGVjbGFyYXRpb25bJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAoZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlVHlwZU1hcChlZGdlQXR0cmlidXRlVHlwZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAoZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlVHlwZU1hcChhdHRyaWJ1dGVUeXBlTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsnZCddKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVUeXBlTWFwLnNldChhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbi5kKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKGF0dHJpYnV0ZU5hbWVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWydhJ10pIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlRGVjbGFyYXRpb24uYSArICcgc2hvdWxkIGJlIHJlbmFtZWQgdG8gJyArIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgYXR0cmlidXRlTmFtZU1hcC5zZXQoYXR0cmlidXRlRGVjbGFyYXRpb24uYSwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ3YnXSkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYXR0cmlidXRlICcgKyBhdHRyaWJ1dGVOYW1lICsgJyBoYXMgZGVmYXVsdCB2YWx1ZSAnICsgYXR0cmlidXRlRGVjbGFyYXRpb24udik7XG4gICAgICAgICAgICBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLnYpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUluZmVycmVkVHlwZXMoYXR0cmlidXRlVHlwZU1hcCwgYXR0cmlidXRlTmFtZU1hcCwgdikge1xuICAgIHYgJiYgT2JqZWN0LmtleXModikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGlmICghYXR0cmlidXRlVHlwZU1hcC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2W2tleV07XG4gICAgICAgICAgICBjb25zdCBpbmZlcnJlZFR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBuZXdLZXkgPSBhdHRyaWJ1dGVOYW1lTWFwLmhhcyhrZXkpID8gYXR0cmlidXRlTmFtZU1hcC5nZXQoa2V5KSA6IGtleTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGVNYXAuc2V0KG5ld0tleSwgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGdldEV4cGFuZGVkQXR0cmlidXRlcyh2LCBhdHRyaWJ1dGVOYW1lTWFwLCBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApIHtcbiAgICBsZXQgZGF0YSA9IHt9O1xuICAgIHYgJiYgT2JqZWN0LmtleXModikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICBkYXRhW25ld0tleV0gPSB2W2tleV07XG4gICAgfSk7XG4gICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKCFkYXRhW2tleV0pIHtcbiAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEN4VmVyc2lvbjogZ2V0Q3hWZXJzaW9uLFxuICAgIGdldEN4TWFqb3JWZXJzaW9uOiBnZXRDeE1ham9yVmVyc2lvbixcbiAgICBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zOiBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zLFxuICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXA6IHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcDogdXBkYXRlQXR0cmlidXRlTmFtZU1hcCxcbiAgICB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXA6IHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICB1cGRhdGVJbmZlcnJlZFR5cGVzOiB1cGRhdGVJbmZlcnJlZFR5cGVzLFxuICAgIGdldEV4cGFuZGVkQXR0cmlidXRlcyA6IGdldEV4cGFuZGVkQXR0cmlidXRlc1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3hVdGlsLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb252ZXJ0ZXIgPSByZXF1aXJlICgnLi9jb252ZXJ0ZXIuanMnKTtcblxubW9kdWxlLmV4cG9ydHMuY29udmVydCA9IChjeCwgdGFyZ2V0Rm9ybWF0KSA9PiB7IHJldHVybiBjb252ZXJ0ZXIuY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0KTsgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmsgPSByZXF1aXJlICgnLi9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrLmpzJyk7IFxuY29uc3QgY3l0b3NjYXBlSlMgPSByZXF1aXJlICgnLi9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKUy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gdmVyaWZ5VmVyc2lvbihjeCkge1xuICAgIGNvbnN0IGZpcnN0RWxlbWVudCA9IGN4WzBdO1xuICAgIGNvbnN0IHZlcnNpb25TdHJpbmcgPSBmaXJzdEVsZW1lbnRbY3hDb25zdGFudHMuQ1hfVkVSU0lPTl07XG5cbiAgICBjb25zdCBtYWpvclZlcnNpb24gPSBjeFV0aWwuZ2V0Q3hNYWpvclZlcnNpb24odmVyc2lvblN0cmluZyk7XG5cbiAgICBpZiAobWFqb3JWZXJzaW9uICE9PSAyKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgQ1ggdmVyc2lvbjogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxufVxuXG5jb25zdCBkZWZhdWx0Q29udmVydGVycyA9IFtcbiAgICBsYXJnZU5ldHdvcmssXG4gICAgY3l0b3NjYXBlSlNcbl07XG5cbmZ1bmN0aW9uIHNlbGVjdENvbnZlcnRlcih0YXJnZXRGb3JtYXQsIGNvbnZlcnRlcnMpIHtcbiAgICBsZXQgc2VsZWN0ZWRDb252ZXJ0ZXIgPSB1bmRlZmluZWQ7XG4gICAgXG4gICAgY29udmVydGVycy5mb3JFYWNoKCBjb252ZXJ0ZXIgPT4ge1xuICAgICAgICBpZiAoY29udmVydGVyLmNvbnZlcnRlci50YXJnZXRGb3JtYXQgPT0gdGFyZ2V0Rm9ybWF0KSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCd0YXJnZXQgZm9ybWF0OiAnICsgY29udmVydGVyLmNvbnZlcnRlci50YXJnZXRGb3JtYXQpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RlZENvbnZlcnRlciA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ29udmVydGVyID0gY29udmVydGVyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyAnY29udmVydGVycyBjb250YWluIG11bHRpcGxlIGVudHJpZXMgZm9yIHRhcmdldCBmb3JtYXQ6ICcgKyB0YXJnZXRGb3JtYXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2Ygc2VsZWN0ZWRDb252ZXJ0ZXIgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgJ25vIGNvbnZlcnRlciBhdmFpbGFibGUgZm9yIHRhcmdldCBmb3JtYXQ6ICcgKyB0YXJnZXRGb3JtYXRcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGVkQ29udmVydGVyO1xufVxuXG5mdW5jdGlvbiBnZXRFbXB0eU5ldHdvcmsodGFyZ2V0Rm9ybWF0LCBjb252ZXJ0ZXJzKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRDb252ZXJ0ZXIgPSBzZWxlY3RDb252ZXJ0ZXIodGFyZ2V0Rm9ybWF0LCBjb252ZXJ0ZXJzKTtcbiAgICByZXR1cm4gc2VsZWN0ZWRDb252ZXJ0ZXIuY29udmVydGVyLmVtcHR5TmV0d29yaztcbn1cblxuZnVuY3Rpb24gY29udmVydChjeCwgdGFyZ2V0Rm9ybWF0LCBjb252ZXJ0ZXJzID0gZGVmYXVsdENvbnZlcnRlcnMpIHtcbiAgICBcbiAgICBpZiAoY3gubGVuZ3RoID09IDApIHtcbiAgICAgICAgcmV0dXJuIGdldEVtcHR5TmV0d29yayh0YXJnZXRGb3JtYXQsIGNvbnZlcnRlcnMpO1xuICAgIH1cbiAgICBcbiAgICB2ZXJpZnlWZXJzaW9uKGN4KTtcbiAgICBjb25zdCBzZWxlY3RlZENvbnZlcnRlciA9IHNlbGVjdENvbnZlcnRlcih0YXJnZXRGb3JtYXQsIGNvbnZlcnRlcnMpO1xuICAgIHJldHVybiBzZWxlY3RlZENvbnZlcnRlci5jb252ZXJ0ZXIuY29udmVydChjeClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydDogY29udmVydFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udmVydGVyLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBsYXJnZU5ldHdvcmtDb25zdGFudHMgPSByZXF1aXJlKCcuL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpIHtcbiAgICBjb25zdCB0YXJnZXRTdHlsZUVudHJ5ID0ge307XG4gICAgdGFyZ2V0U3R5bGVFbnRyeVt0YXJnZXRTdHlsZUZpZWxkXSA9IHBvcnRhYmxlUHJvcGVydFZhbHVlO1xuICAgIHJldHVybiB0YXJnZXRTdHlsZUVudHJ5O1xufVxuXG5mdW5jdGlvbiBoZXhUb1JHQihoZXgpIHtcbiAgICBpZiAoaGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGhleDtcbiAgICB9XG4gICAgbGV0IHIgPSAwLCBnID0gMCwgYiA9IDA7XG5cbiAgICAvLyAzIGRpZ2l0c1xuICAgIGlmIChoZXgubGVuZ3RoID09IDQpIHtcbiAgICAgICAgciA9IFwiMHhcIiArIGhleFsxXSArIGhleFsxXTtcbiAgICAgICAgZyA9IFwiMHhcIiArIGhleFsyXSArIGhleFsyXTtcbiAgICAgICAgYiA9IFwiMHhcIiArIGhleFszXSArIGhleFszXTtcblxuICAgICAgICAvLyA2IGRpZ2l0c1xuICAgIH0gZWxzZSBpZiAoaGV4Lmxlbmd0aCA9PSA3KSB7XG4gICAgICAgIHIgPSBcIjB4XCIgKyBoZXhbMV0gKyBoZXhbMl07XG4gICAgICAgIGcgPSBcIjB4XCIgKyBoZXhbM10gKyBoZXhbNF07XG4gICAgICAgIGIgPSBcIjB4XCIgKyBoZXhbNV0gKyBoZXhbNl07XG4gICAgfVxuXG4gICAgcmV0dXJuIFtwYXJzZUludChyKSwgcGFyc2VJbnQoZyksIHBhcnNlSW50KGIpXTtcbn1cblxuZnVuY3Rpb24gYWxwaGFUb0ludChhbHBoYURlY2ltYWwpIHtcbiAgICByZXR1cm4gY2xhbXAoTWF0aC5yb3VuZChhbHBoYURlY2ltYWwgKiAyNTUpLCAwLCAyNTUpO1xufVxuXG5jb25zdCBkZWZhdWx0UHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9XSURUSCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlV2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlSGVpZ2h0LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yLCBoZXhUb1JHQihwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhLCBhbHBoYVRvSW50KHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9MQUJFTCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yLCBoZXhUb1JHQihwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhLCBhbHBoYVRvSW50KHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbEZvbnRTaXplLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy53aWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NBbHBoYSwgYWxwaGFUb0ludChwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NDb2xvciwgaGV4VG9SR0IocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdFREdFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xBQkVMX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdFREdFX0xBQkVMX0ZPTlRfU0laRSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsRm9udFNpemUsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9XG59XG5cblxuXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWVzKGRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzKSB7XG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgbm9kZToge30sXG4gICAgICAgIGVkZ2U6IHt9XG4gICAgfTtcbiAgICBpZiAoZGVmYXVsdFZpc3VhbFByb3BlcnRpZXNbJ25vZGUnXSkge1xuICAgICAgICBjb25zdCBub2RlRGVmYXVsdCA9IGRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzLm5vZGU7XG4gICAgICAgIGNvbnN0IGxudkVudHJpZXMgPSBnZXRMTlZWYWx1ZXMoJ25vZGUnLCBub2RlRGVmYXVsdCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0Lm5vZGUsIGxudkVudHJpZXMpO1xuICAgIH1cbiAgICBpZiAoZGVmYXVsdFZpc3VhbFByb3BlcnRpZXNbJ2VkZ2UnXSkge1xuICAgICAgICBjb25zdCBlZGdlRGVmYXVsdCA9IGRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzLmVkZ2U7XG4gICAgICAgIGNvbnN0IGxudkVudHJpZXMgPSBnZXRMTlZWYWx1ZXMoJ2VkZ2UnLCBlZGdlRGVmYXVsdCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0LmVkZ2UsIGxudkVudHJpZXMpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRMTlZWYWx1ZXMoZW50aXR5VHlwZSwgZW50cmllcykge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhlbnRyaWVzKS5mb3JFYWNoKHBvcnRhYmxlUHJvcGVydHlLZXkgPT4ge1xuICAgICAgICBjb25zdCBwb3J0YWJsZVByb3BlcnR5VmFsdWUgPSBlbnRyaWVzW3BvcnRhYmxlUHJvcGVydHlLZXldO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3QgbG52RW50cnkgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhsbnZFbnRyeSkuZm9yRWFjaChsbnZLZXkgPT4ge1xuICAgICAgICAgICAgICAgIG91dHB1dFtsbnZLZXldID0gbG52RW50cnlbbG52S2V5XTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzQ29sb3IoY29sb3JBcnJheSwgYWxwaGEpIHtcbiAgICByZXR1cm4gY29sb3JBcnJheSAhPSB1bmRlZmluZWRcbiAgICAgICAgPyBhbHBoYSAhPSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gW2NvbG9yQXJyYXlbMF0sIGNvbG9yQXJyYXlbMV0sIGNvbG9yQXJyYXlbMl0sIGFscGhhXVxuICAgICAgICAgICAgOiBbY29sb3JBcnJheVswXSwgY29sb3JBcnJheVsxXSwgY29sb3JBcnJheVsyXV1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NTaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgod2lkdGgsIGhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NOb2RlVmlldyhub2RlVmlldykge1xuICAgIGxldCB3aWR0aCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgaGVpZ2h0ID0gdW5kZWZpbmVkO1xuICAgIGxldCBjb2xvckFycmF5ID0gdW5kZWZpbmVkO1xuICAgIGxldCBhbHBoYSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBsYWJlbENvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGxhYmVsQWxwaGEgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBpZDogbm9kZVZpZXcuaWQsXG4gICAgICAgIHBvc2l0aW9uOiBub2RlVmlldy5wb3NpdGlvblxuICAgIH07XG5cblxuICAgIE9iamVjdC5rZXlzKG5vZGVWaWV3KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTm9kZVdpZHRoKSB7XG4gICAgICAgICAgICB3aWR0aCA9IG5vZGVWaWV3LnByZXByb2Nlc3NOb2RlV2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVIZWlnaHQpIHtcbiAgICAgICAgICAgIGhlaWdodCA9IG5vZGVWaWV3LnByZXByb2Nlc3NOb2RlSGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NDb2xvcikge1xuICAgICAgICAgICAgY29sb3JBcnJheSA9IG5vZGVWaWV3LnByZXByb2Nlc3NDb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEpIHtcbiAgICAgICAgICAgIGFscGhhID0gbm9kZVZpZXcucHJlcHJvY2Vzc0FscGhhO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yKSB7XG4gICAgICAgICAgICBsYWJlbENvbG9yQXJyYXkgPSBub2RlVmlldy5wcmVwcm9jZXNzTGFiZWxDb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSkge1xuICAgICAgICAgICAgbGFiZWxBbHBoYSA9IG5vZGVWaWV3LnByZXByb2Nlc3NMYWJlbEFscGhhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBub2RlVmlld1trZXldO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2xvciA9IHByb2Nlc3NDb2xvcihjb2xvckFycmF5LCBhbHBoYSk7XG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuY29sb3JdID0gY29sb3I7XG4gICAgfVxuXG4gICAgY29uc3QgbGFiZWxDb2xvciA9IHByb2Nlc3NDb2xvcihsYWJlbENvbG9yQXJyYXksIGxhYmVsQWxwaGEpO1xuICAgIGlmIChsYWJlbENvbG9yKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxDb2xvcl0gPSBsYWJlbENvbG9yO1xuICAgIH1cblxuICAgIGNvbnN0IHNpemUgPSBwcm9jZXNzU2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICBpZiAoc2l6ZSkge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnNpemVdID0gcHJvY2Vzc1NpemUod2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NFZGdlVmlldyhlZGdlVmlldykge1xuICAgIGxldCBjb2xvckFycmF5ID0gdW5kZWZpbmVkO1xuICAgIGxldCBhbHBoYSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBsYWJlbENvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGxhYmVsQWxwaGEgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBpZDogZWRnZVZpZXcuaWQsXG4gICAgICAgIHM6IGVkZ2VWaWV3LnMsXG4gICAgICAgIHQ6IGVkZ2VWaWV3LnRcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhlZGdlVmlldykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yKSB7XG4gICAgICAgICAgICBjb2xvckFycmF5ID0gZWRnZVZpZXcucHJlcHJvY2Vzc0NvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NBbHBoYSkge1xuICAgICAgICAgICAgYWxwaGEgPSBlZGdlVmlldy5wcmVwcm9jZXNzQWxwaGE7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IpIHtcbiAgICAgICAgICAgIGxhYmVsQ29sb3JBcnJheSA9IGVkZ2VWaWV3LnByZXByb2Nlc3NMYWJlbENvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhKSB7XG4gICAgICAgICAgICBsYWJlbEFscGhhID0gZWRnZVZpZXcucHJlcHJvY2Vzc0xhYmVsQWxwaGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRwdXRba2V5XSA9IGVkZ2VWaWV3W2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbG9yID0gcHJvY2Vzc0NvbG9yKGNvbG9yQXJyYXksIGFscGhhKTtcbiAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5jb2xvcl0gPSBjb2xvcjtcbiAgICB9XG5cbiAgICBjb25zdCBsYWJlbENvbG9yID0gcHJvY2Vzc0NvbG9yKGxhYmVsQ29sb3JBcnJheSwgbGFiZWxBbHBoYSk7XG4gICAgaWYgKGxhYmVsQ29sb3IpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbENvbG9yXSA9IGxhYmVsQ29sb3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0TWFwcGluZ3MobWFwcGluZ3MpIHtcbiAgICBsZXQgb3V0cHV0ID0ge31cbiAgICBPYmplY3Qua2V5cyhtYXBwaW5ncykuZm9yRWFjaChwcm9wZXJ0eUtleSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcHBpbmcgPSBtYXBwaW5nc1twcm9wZXJ0eUtleV07XG4gICAgICAgIGNvbnN0IG1hcHBpbmdMaXN0ID0gb3V0cHV0W21hcHBpbmcuZGVmaW5pdGlvbi5hdHRyaWJ1dGVdID8gb3V0cHV0W21hcHBpbmcuZGVmaW5pdGlvbi5hdHRyaWJ1dGVdIDogW11cbiAgICAgICAgbWFwcGluZ0xpc3QucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBtYXBwaW5nLnR5cGUsXG4gICAgICAgICAgICB2cDogcHJvcGVydHlLZXksXG4gICAgICAgICAgICBkZWZpbml0aW9uOiBtYXBwaW5nLmRlZmluaXRpb25cbiAgICAgICAgfSlcbiAgICAgICAgb3V0cHV0W21hcHBpbmcuZGVmaW5pdGlvbi5hdHRyaWJ1dGVdID0gbWFwcGluZ0xpc3Q7XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGVSYXRpbyhhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgpIHtcbiAgICByZXR1cm4gKGF0dHJpYnV0ZVZhbHVlIC0gYXR0cmlidXRlTWluKSAvIChhdHRyaWJ1dGVNYXggLSBhdHRyaWJ1dGVNaW4pO1xufVxuXG5mdW5jdGlvbiBnZXRNYXAodnBNaW4sIHZwTWF4LCBhdHRyaWJ1dGVSYXRpbykge1xuICAgIGlmICh2cE1pbiAhPT0gdW5kZWZpbmVkICYmIHZwTWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHZwTWluICsgKCh2cE1heCAtIHZwTWluKSAqIGF0dHJpYnV0ZVJhdGlvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodnBNaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHZwTWF4O1xuICAgICAgICB9IGVsc2UgaWYgKHZwTWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB2cE1pbjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2xhbXAodmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbHVlLCBtaW4pLCBtYXgpO1xufVxuXG5mdW5jdGlvbiBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSB7XG4gICAgY29uc3QgYXR0cmlidXRlUmF0aW8gPSBnZXRBdHRyaWJ1dGVSYXRpbyhhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgpO1xuXG4gICAgY29uc3Qgb3V0cHV0ID0gZ2V0TWFwKHZwTWluLCB2cE1heCwgYXR0cmlidXRlUmF0aW8pO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSB7XG4gICAgY29uc3QgbWluUkdCID0gaGV4VG9SR0IodnBNaW4pO1xuICAgIGNvbnN0IG1heFJHQiA9IGhleFRvUkdCKHZwTWF4KTtcblxuICAgIGNvbnN0IGF0dHJpYnV0ZVJhdGlvID0gZ2V0QXR0cmlidXRlUmF0aW8oYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4KTtcblxuICAgIGNvbnN0IG91dHB1dCA9IFtcbiAgICAgICAgLy9UT0RPIGNoZWNrIHRoYXQgbWluUkdCIGFuZCBtYXhSR0IgYXJlIGRlZmluZWQvdW5kZWZpbmVkXG4gICAgICAgIGNsYW1wKE1hdGgucm91bmQoZ2V0TWFwKG1pblJHQiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogbWluUkdCWzBdLCBtYXhSR0IgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IG1heFJHQlswXSwgYXR0cmlidXRlUmF0aW8pKSwgMCwgMjU1KSxcbiAgICAgICAgY2xhbXAoTWF0aC5yb3VuZChnZXRNYXAobWluUkdCID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBtaW5SR0JbMV0sIG1heFJHQiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogbWF4UkdCWzFdLCBhdHRyaWJ1dGVSYXRpbykpLCAwLCAyNTUpLFxuICAgICAgICBjbGFtcChNYXRoLnJvdW5kKGdldE1hcChtaW5SR0IgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IG1pblJHQlsyXSwgbWF4UkdCID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBtYXhSR0JbMl0sIGF0dHJpYnV0ZVJhdGlvKSksIDAsIDI1NSlcbiAgICBdXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSB7XG4gICAgY29uc3QgYXR0cmlidXRlUmF0aW8gPSBnZXRBdHRyaWJ1dGVSYXRpbyhhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgpO1xuXG4gICAgY29uc3QgYWxwaGFEZWNpbWFsID0gZ2V0TWFwKHZwTWluLCB2cE1heCwgYXR0cmlidXRlUmF0aW8pO1xuXG4gICAgLy9jb25zb2xlLmxvZyhcImFscGhhRGVjaW1hbCA9IFwiICsgYWxwaGFEZWNpbWFsKTtcbiAgICByZXR1cm4gYWxwaGFUb0ludChhbHBoYURlY2ltYWwpO1xufVxuXG5jb25zdCBjb250aW51b3VzUHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9XSURUSCc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVXaWR0aCwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlSGVpZ2h0LCBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NDb2xvciwgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhLCBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yLCBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEsIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsRm9udFNpemUsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy53aWR0aCwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEsIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IsIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSwgY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdFREdFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxGb250U2l6ZSwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0luUmFuZ2UoYXR0cmlidXRlVmFsdWUsIG1pbiwgbWF4LCBpbmNsdWRlTWluLCBpbmNsdWRlTWF4KSB7XG4gICAgY29uc3QgbWluU2F0aXNmaWVkID0gbWluICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyAoaW5jbHVkZU1pbiA/IG1pbiA8PSBhdHRyaWJ1dGVWYWx1ZSA6IG1pbiA8IGF0dHJpYnV0ZVZhbHVlKVxuICAgICAgICA6IHRydWU7XG4gICAgY29uc3QgbWF4U2F0aXNmaWVkID0gbWF4ICE9IHVuZGVmaW5lZFxuICAgICAgICA/IChpbmNsdWRlTWF4ID8gbWF4ID49IGF0dHJpYnV0ZVZhbHVlIDogbWF4ID4gYXR0cmlidXRlVmFsdWUpXG4gICAgICAgIDogdHJ1ZTtcbiAgICAvL2NvbnNvbGUubG9nKCdpc0luUmFuZ2U6ICcgKyBhdHRyaWJ1dGVWYWx1ZSArICcgJyArIG1pbiArICcgJyArIG1heCArICcgJyArIGluY2x1ZGVNaW4gKyAnICcgKyBpbmNsdWRlTWF4ICsgJyAnICsgbWluU2F0aXNmaWVkICsgJyAnICsgbWF4U2F0aXNmaWVkKTtcbiAgICByZXR1cm4gbWluU2F0aXNmaWVkICYmIG1heFNhdGlzZmllZDtcbn1cblxuZnVuY3Rpb24gZ2V0TWFwcGVkVmFsdWVzKG1hcHBpbmdzLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goYXR0cmlidXRlS2V5ID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZUtleV07XG4gICAgICAgIGlmIChtYXBwaW5nc1tlbnRpdHlUeXBlXVthdHRyaWJ1dGVLZXldKSB7XG4gICAgICAgICAgICBtYXBwaW5nc1tlbnRpdHlUeXBlXVthdHRyaWJ1dGVLZXldLmZvckVhY2goXG4gICAgICAgICAgICAgICAgKG1hcHBpbmcpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobWFwcGluZy50eXBlID09PSAnRElTQ1JFVEUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNjcmV0ZU1hcCA9IG1hcHBpbmcuZGVmaW5pdGlvbi5tYXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwcm9jZXNzaW5nIGRpc2NyZXRlIG1hcDonICsgZW50aXR5VHlwZSArICcgbWFwcGluZy52cD0nICsgbWFwcGluZy52cCArICcgJyArIGF0dHJpYnV0ZUtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNjcmV0ZU1hcC5mb3JFYWNoKGtleVZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5VmFsdWUudiA9PSBhdHRyaWJ1dGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdcXHRrZXlWYWx1ZS52PScgKyBrZXlWYWx1ZS52ICsgJyAnICsgYXR0cmlidXRlVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udmVydGVkID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXShrZXlWYWx1ZS52cCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdcXHRjb252ZXJ0ZWQgJyArIEpTT04uc3RyaW5naWZ5KGNvbnZlcnRlZCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgY29udmVydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hcHBpbmcudHlwZSA9PT0gJ1BBU1NUSFJPVUdIJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKGF0dHJpYnV0ZVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgY29udmVydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXBwaW5nLnR5cGUgPT09ICdDT05USU5VT1VTJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGludW91c01hcHBpbmdzID0gbWFwcGluZy5kZWZpbml0aW9uLm1hcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVvdXNNYXBwaW5ncy5mb3JFYWNoKG1hcHBpbmdSYW5nZSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNJblJhbmdlKGF0dHJpYnV0ZVZhbHVlLCBtYXBwaW5nUmFuZ2UubWluLCBtYXBwaW5nUmFuZ2UubWF4LCBtYXBwaW5nUmFuZ2UuaW5jbHVkZU1pbiwgbWFwcGluZ1JhbmdlLmluY2x1ZGVNYXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGNvbnRpbnVvdXNQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udmVydGVkID0gY29udGludW91c1Byb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXShhdHRyaWJ1dGVWYWx1ZSwgbWFwcGluZ1JhbmdlLm1pbiwgbWFwcGluZ1JhbmdlLm1heCwgbWFwcGluZ1JhbmdlLm1pblZQVmFsdWUsIG1hcHBpbmdSYW5nZS5tYXhWUFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIGNvbnZlcnRlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gbG52Q29udmVydChjeCkge1xuXG4gICAgLy9GaXJzdCBwYXNzLiBcbiAgICAvLyBXZSBuZWVkIHRvIGNvbGxlY3Qgb2JqZWN0IGF0dHJpYnV0ZXMgdG8gY2FsY3VsYXRlXG4gICAgLy8gbWFwcGluZ3MgaW4gdGhlIHNlY29uZCBwYXNzLiBcblxuICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGN4Tm9kZUJ5cGFzc2VzID0gW107XG4gICAgbGV0IGN4RWRnZUJ5cGFzc2VzID0gW107XG5cbiAgICBsZXQgbm9kZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IG5vZGVBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IGRlZmF1bHRWYWx1ZXMgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG1hcHBpbmdzID0ge1xuICAgICAgICBub2RlOiB7fSxcbiAgICAgICAgZWRnZToge31cbiAgICB9XG4gICAgbGV0IGJ5cGFzc01hcHBpbmdzID0ge1xuICAgICAgICAnbm9kZSc6IHt9LFxuICAgICAgICAnZWRnZSc6IHt9XG4gICAgfTtcblxuICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgIGlmIChjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddO1xuICAgICAgICAgICAgY3hVdGlsLnByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hOb2RlWyd2J10pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhlZGdlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGN4RWRnZVsndiddKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXSkge1xuICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZUJ5cGFzc2VzJ10pIHtcbiAgICAgICAgICAgIGN4QXNwZWN0Lm5vZGVCeXBhc3Nlcy5mb3JFYWNoKGJ5cGFzcyA9PiB7XG4gICAgICAgICAgICAgICAgY3hOb2RlQnlwYXNzZXMucHVzaChieXBhc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VCeXBhc3NlcyddKSB7XG4gICAgICAgICAgICBjeEFzcGVjdC5lZGdlQnlwYXNzZXMuZm9yRWFjaChieXBhc3MgPT4ge1xuICAgICAgICAgICAgICAgIGN4RWRnZUJ5cGFzc2VzLnB1c2goYnlwYXNzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgb3V0cHV0ID0ge307XG5cbiAgICBsZXQgbm9kZVZpZXdzID0gW107XG4gICAgbGV0IGVkZ2VWaWV3cyA9IFtdO1xuXG4gICAgY3hWaXN1YWxQcm9wZXJ0aWVzLmZvckVhY2godnBFbGVtZW50ID0+IHtcblxuICAgICAgICBjb25zdCBkZWZhdWx0U3R5bGVzID0gdnBFbGVtZW50LmRlZmF1bHQ7XG5cbiAgICAgICAgZGVmYXVsdFZhbHVlcyA9IGdldERlZmF1bHRWYWx1ZXMoZGVmYXVsdFN0eWxlcyk7XG5cbiAgICAgICAgbWFwcGluZ3Mubm9kZSA9IHZwRWxlbWVudC5ub2RlTWFwcGluZyA/IGdldE1hcHBpbmdzKHZwRWxlbWVudC5ub2RlTWFwcGluZykgOiB7fTtcbiAgICAgICAgbWFwcGluZ3MuZWRnZSA9IHZwRWxlbWVudC5lZGdlTWFwcGluZyA/IGdldE1hcHBpbmdzKHZwRWxlbWVudC5lZGdlTWFwcGluZykgOiB7fTtcblxuXG4gICAgfSk7XG5cbiAgICBjeE5vZGVCeXBhc3Nlcy5mb3JFYWNoKCh2cEVsZW1lbnQpID0+IHtcblxuICAgICAgICBjb25zdCBrZXkgPSB2cEVsZW1lbnRbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGdldExOVlZhbHVlcygnbm9kZScsIHZwRWxlbWVudC52KVxuXG4gICAgICAgIGlmICghYnlwYXNzTWFwcGluZ3Mubm9kZVtrZXldKSB7XG4gICAgICAgICAgICBieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2J5cGFzcyBjYWxjdWxhdGVkOiAnICsgSlNPTi5zdHJpbmdpZnkodmFsdWVzLCBudWxsLCAyKSk7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0sIHZhbHVlcyk7XG4gICAgICAgIC8vYnlwYXNzQ1NTRW50cmllcy5wdXNoKGdldEJ5cGFzc0NTU0VudHJ5KCdub2RlJywgdnBFbGVtZW50KSk7XG4gICAgfSk7XG5cbiAgICBjeEVkZ2VCeXBhc3Nlcy5mb3JFYWNoKCh2cEVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gdnBFbGVtZW50W2N4Q29uc3RhbnRzLklEXS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBnZXRMTlZWYWx1ZXMoJ2VkZ2UnLCB2cEVsZW1lbnQudilcblxuICAgICAgICBpZiAoIWJ5cGFzc01hcHBpbmdzLmVkZ2Vba2V5XSkge1xuICAgICAgICAgICAgYnlwYXNzTWFwcGluZ3MuZWRnZVtrZXldID0ge307XG4gICAgICAgIH1cblxuICAgICAgICAvL2NvbnNvbGUubG9nKCdieXBhc3MgY2FsY3VsYXRlZDogJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlcywgbnVsbCwgMikpO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oYnlwYXNzTWFwcGluZ3MuZWRnZVtrZXldLCB2YWx1ZXMpO1xuICAgIH1cbiAgICApO1xuXG4gICAgLy9jb25zb2xlLmxvZygnbWFwcGluZ3M6ICcgKyBKU09OLnN0cmluZ2lmeShtYXBwaW5ncywgbnVsbCwgMikpO1xuXG4gICAgLy9TZWNvbmQgcGFzcy4gXG4gICAgLy8gSGVyZSBpcyB3aGVyZSB0aGUgYWN0dWFsIG91dHB1dCBpcyBnZW5lcmF0ZWQuXG5cbiAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcblxuXG4gICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeE5vZGVbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGVWaWV3ID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogY3hJZCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGN4Tm9kZVsneiddID9cbiAgICAgICAgICAgICAgICAgICAgICAgIFtjeE5vZGVbJ3gnXSwgY3hOb2RlWyd5J10sIGN4Tm9kZVsneiddXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBbY3hOb2RlWyd4J10sIGN4Tm9kZVsneSddXVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vVE9ETyBjYWxjdWxhdGUgbG52IHZwcyBiYXNlZCBvbiBkZWZhdWx0cyBhbmQgYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHROb2RlVmlzdWFsUHJvcGVydGllcyA9IGRlZmF1bHRWYWx1ZXNbJ25vZGUnXTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlVmlldywgZGVmYXVsdE5vZGVWaXN1YWxQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9Bc3NpZ24gbWFwcGluZ3NcbiAgICAgICAgICAgICAgICBjb25zdCBleHBhbmRlZEF0dHJpYnV0ZXMgPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4Tm9kZVsndiddLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFwcGluZ1ZhbHVlcyA9IGdldE1hcHBlZFZhbHVlcyhtYXBwaW5ncywgJ25vZGUnLCBleHBhbmRlZEF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obm9kZVZpZXcsIG1hcHBpbmdWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgLy9Bc3NpZ24gYnlwYXNzXG4gICAgICAgICAgICAgICAgaWYgKGJ5cGFzc01hcHBpbmdzLm5vZGVbY3hJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlVmlldywgYnlwYXNzTWFwcGluZ3Mubm9kZVtjeElkXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkTm9kZVZpZXcgPSBwcm9jZXNzTm9kZVZpZXcobm9kZVZpZXcpO1xuXG4gICAgICAgICAgICAgICAgbm9kZVZpZXdzLnB1c2gocHJvY2Vzc2VkTm9kZVZpZXcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuXG4gICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4SWQgPSBjeEVkZ2VbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRnZVZpZXcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBjeElkLFxuICAgICAgICAgICAgICAgICAgICBzOiBjeEVkZ2Uucy50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICB0OiBjeEVkZ2UudC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9UT0RPIGNhbGN1bGF0ZSBsbnYgdnBzIGJhc2VkIG9uIGRlZmF1bHRzIGFuZCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdEVkZ2VWaXN1YWxQcm9wZXJ0aWVzID0gZGVmYXVsdFZhbHVlc1snZWRnZSddO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBkZWZhdWx0RWRnZVZpc3VhbFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkQXR0cmlidXRlcyA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hFZGdlWyd2J10sIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBwaW5nVmFsdWVzID0gZ2V0TWFwcGVkVmFsdWVzKG1hcHBpbmdzLCAnZWRnZScsIGV4cGFuZGVkQXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlZGdlVmlldywgbWFwcGluZ1ZhbHVlcyk7XG4gICAgICAgICAgICAgICAgLy9Bc3NpZ24gYnlwYXNzXG4gICAgICAgICAgICAgICAgaWYgKGJ5cGFzc01hcHBpbmdzLmVkZ2VbY3hJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlZGdlVmlldywgYnlwYXNzTWFwcGluZ3MuZWRnZVtjeElkXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkRWRnZVZpZXcgPSBwcm9jZXNzRWRnZVZpZXcoZWRnZVZpZXcpO1xuXG4gICAgICAgICAgICAgICAgZWRnZVZpZXdzLnB1c2gocHJvY2Vzc2VkRWRnZVZpZXcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMubm9kZVZpZXdzXSA9IG5vZGVWaWV3cztcbiAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmVkZ2VWaWV3c10gPSBlZGdlVmlld3M7XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBjb252ZXJ0ZXIgPSB7XG4gICAgdGFyZ2V0Rm9ybWF0OiAnbG52JyxcbiAgICBlbXB0eU5ldHdvcms6IHsgXCJub2RlVmlld3NcIjogW10sIFwiZWRnZVZpZXdzXCI6IFtdIH0sXG4gICAgY29udmVydDogKGN4KSA9PiB7XG4gICAgICAgIHJldHVybiBsbnZDb252ZXJ0KGN4KTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQ6IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQsXG4gICAgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydDogY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydCxcbiAgICBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQ6IGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydCxcbiAgICBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQ6IGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydCxcbiAgICBwcm9jZXNzTm9kZVZpZXc6IHByb2Nlc3NOb2RlVmlldyxcbiAgICBwcm9jZXNzRWRnZVZpZXc6IHByb2Nlc3NFZGdlVmlldyxcbiAgICBnZXREZWZhdWx0VmFsdWVzOiBnZXREZWZhdWx0VmFsdWVzLFxuICAgIGdldEF0dHJpYnV0ZVJhdGlvOiBnZXRBdHRyaWJ1dGVSYXRpbyxcbiAgICBpc0luUmFuZ2U6IGlzSW5SYW5nZSxcbiAgICBjb252ZXJ0ZXI6IGNvbnZlcnRlclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICAnbm9kZVZpZXdzJzogJ25vZGVWaWV3cycsXG4gICAgJ2VkZ2VWaWV3cyc6ICdlZGdlVmlld3MnLCBcbiAgICAnaWQnOiAnaWQnLFxuICAgICdwb3NpdGlvbic6ICdwb3NpdGlvbicsXG4gICAgJ3MnOiAncycsXG4gICAgJ3QnOiAndCcsXG4gICAgJ2xhYmVsJzogJ2xhYmVsJywgXG4gICAgJ2xhYmVsQ29sb3InIDogJ2xhYmVsQ29sb3InLFxuICAgICdsYWJlbEZvbnRTaXplJyA6ICdsYWJlbEZvbnRTaXplJyxcbiAgICAnY29sb3InOiAnY29sb3InLFxuICAgICdzaXplJyA6ICdzaXplJyxcbiAgICAnd2lkdGgnIDogJ3dpZHRoJyxcblxuICAgICdwcmVwcm9jZXNzQ29sb3InOiAncHJlcHJvY2Vzc0NvbG9yJyxcbiAgICAncHJlcHJvY2Vzc0FscGhhJzogJ3ByZXByb2Nlc3NBbHBoYScsXG4gICAgJ3ByZXByb2Nlc3NMYWJlbENvbG9yJzogJ3ByZXByb2Nlc3NMYWJlbENvbG9yJyxcbiAgICAncHJlcHJvY2Vzc0xhYmVsQWxwaGEnOiAncHJlcHJvY2Vzc0xhYmVsQWxwaGEnLFxuICAgICdwcmVwcm9jZXNzTm9kZVdpZHRoJyA6ICdwcmVwcm9jZXNzTm9kZVdpZHRoJyxcbiAgICAncHJlcHJvY2Vzc05vZGVIZWlnaHQnIDogJ3ByZXByb2Nlc3NOb2RlSGVpZ2h0J1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmtDb25zdGFudHMuanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGpzQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9jeXRvc2NhcGVKU0NvbnN0YW50cy5qcycpO1xuY29uc3QgY3hVdGlsID0gcmVxdWlyZSgnLi4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpIHtcbiAgICBjb25zdCB0YXJnZXRTdHlsZUVudHJ5ID0gbmV3IE1hcCgpO1xuICAgIHRhcmdldFN0eWxlRW50cnkuc2V0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKTtcbiAgICByZXR1cm4gdGFyZ2V0U3R5bGVFbnRyeTtcbn1cblxuY29uc3QgZGVmYXVsdFByb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfU0hBUEUnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9XSURUSCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0ZPTlRfU0laRSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MQUJFTCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xBQkVMX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xBQkVMX0ZPTlRfU0laRSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfSxcbn1cblxuZnVuY3Rpb24gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgY29uc3Qgb3V0cHV0ID0ge307XG4gICAgb3V0cHV0W3RhcmdldFN0eWxlRmllbGRdID0gJ2RhdGEoJyArIGF0dHJpYnV0ZU5hbWUgKyAnKSc7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgcGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfU0hBUEUnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIGF0dHJpYnV0ZU5hbWUpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9MQUJFTCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG59XG5mdW5jdGlvbiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIGlmIChtaW5WYWx1ZSAhPSB1bmRlZmluZWQgJiYgbWF4VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9ICdtYXBEYXRhKCcgKyBhdHRyaWJ1dGVOYW1lXG4gICAgICAgICsgJywgJyArIG1pblZhbHVlXG4gICAgICAgICsgJywgJyArIG1heFZhbHVlXG4gICAgICAgICsgJywgJyArIG1pblZQXG4gICAgICAgICsgJywgJyArIG1heFZQXG4gICAgICAgICsgJyknO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtaW5WYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvdXRwdXRbdGFyZ2V0U3R5bGVGaWVsZF0gPSBtYXhWUDtcbiAgICAgICAgfSBlbHNlIGlmIChtYXhWYWx1ZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9IG1pblZQO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IG1hcERhdGFQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKVxuXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGluZV9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MQUJFTCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApXG4gICAgfSxcbn1cblxuXG5mdW5jdGlvbiBnZXRDU1NTdHlsZUVudHJpZXMoY3hTdHlsZUVudHJpZXMsIGVudGl0eVR5cGUpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgT2JqZWN0LmtleXMoY3hTdHlsZUVudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBwb3J0YWJsZVByb3BlcnR5VmFsdWUgPSBjeFN0eWxlRW50cmllc1trZXldO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtrZXldKSB7XG4gICAgICAgICAgICBjb25zdCBjc3NFbnRyaWVzID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtrZXldKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICBjc3NFbnRyaWVzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRJZFNlbGVjdG9yKGlkLCBlbGVtZW50VHlwZSkge1xuICAgIC8vbm9kZSNpZCBvciBlZGdlI2lkXG4gICAgcmV0dXJuIGVsZW1lbnRUeXBlICsgJyMnICsgaWQ7XG59XG5cblxuXG5mdW5jdGlvbiBnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcykge1xuICAgIHJldHVybiB7ICdzZWxlY3Rvcic6IHNlbGVjdG9yLCAnc3R5bGUnOiBjc3MgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29udGludW91c1NlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgaW5jbHVkZU1pbiwgaW5jbHVkZU1heCkge1xuICAgIGNvbnN0IG1pbkNvbmRpdGlvbiA9IGluY2x1ZGVNaW4gPyAnPj0nIDogJz4nO1xuICAgIGNvbnN0IG1heENvbmRpdGlvbiA9IGluY2x1ZGVNYXggPyAnPD0nIDogJzwnO1xuICAgIGNvbnN0IG1pbkJvdW5kID0gKG1pblZhbHVlICE9PSB1bmRlZmluZWQpID8gJ1snICsgYXR0cmlidXRlTmFtZSArICcgJyArIG1pbkNvbmRpdGlvbiArICcgJyArIG1pblZhbHVlICsgJ10nIDogJyc7XG4gICAgY29uc3QgbWF4Qm91bmQgPSAobWF4VmFsdWUgIT09IHVuZGVmaW5lZCkgPyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyAnICsgbWF4Q29uZGl0aW9uICsgJyAnICsgbWF4VmFsdWUgKyAnXScgOiAnJztcbiAgICByZXR1cm4gZW50aXR5VHlwZSArIG1pbkJvdW5kICsgbWF4Qm91bmQ7XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNTdHlsZShlbnRpdHlUeXBlLCBwb3J0YWJsZVByb3BlcnR5S2V5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkge1xuICAgIGlmIChtYXBEYXRhUHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgIHJldHVybiBtYXBEYXRhUHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKTtcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnYXR0cmlidXRlJ107XG4gICAgY29uc3QgcmFuZ2VNYXBzID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgLy9jb25zb2xlLmxvZygnY29udGludW91cyBtYXBwaW5nIGZvciAnICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBKU09OLnN0cmluZ2lmeShyYW5nZU1hcHMsIG51bGwsIDIpKTtcblxuICAgIHJhbmdlTWFwcy5mb3JFYWNoKChyYW5nZSkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGdldENvbnRpbnVvdXNTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCByYW5nZS5taW4sIHJhbmdlLm1heCwgcmFuZ2UuaW5jbHVkZU1pbiwgcmFuZ2UuaW5jbHVkZU1heCk7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29udGludW91c1N0eWxlKGVudGl0eVR5cGUsIHBvcnRhYmxlUHJvcGVydHlLZXksIGF0dHJpYnV0ZU5hbWUsIHJhbmdlLm1pbiwgcmFuZ2UubWF4LCByYW5nZS5taW5WUFZhbHVlLCByYW5nZS5tYXhWUFZhbHVlKTtcblxuICAgICAgICBvdXRwdXQucHVzaChnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIHN0eWxlKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSkge1xuICAgIGlmIChwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgIGNvbnN0IGNzcyA9IHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oY3hNYXBwaW5nRGVmaW5pdGlvbi5hdHRyaWJ1dGUpO1xuICAgICAgICByZXR1cm4gZ2V0U3R5bGVFbGVtZW50KGVudGl0eVR5cGUsIGNzcyk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXREaXNjcmV0ZVNlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURhdGFUeXBlLCBhdHRyaWJ1dGVWYWx1ZSkge1xuICAgIGlmIChhdHRyaWJ1dGVEYXRhVHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gXFwnJyArIGF0dHJpYnV0ZVZhbHVlICsgJ1xcJ10nO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ2Jvb2xlYW4nKSB7XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZVZhbHVlID09ICd0cnVlJykge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWz8nICsgYXR0cmlidXRlTmFtZSArICddJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICddWyEnICsgYXR0cmlidXRlTmFtZSArICddJztcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICcgPSAnICsgYXR0cmlidXRlVmFsdWUgKyAnXSc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzKHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgY29uc3QgYXR0dHJpYnV0ZVRvVmFsdWVNYXAgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydtYXAnXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnYXR0cmlidXRlJ107XG4gICAgY29uc3QgYXR0cmlidXRlRGF0YVR5cGUgPSBhdHRyaWJ1dGVUeXBlTWFwLmdldChhdHRyaWJ1dGVOYW1lKTtcbiAgICBhdHR0cmlidXRlVG9WYWx1ZU1hcC5mb3JFYWNoKChkaXNjcmV0ZU1hcCkgPT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCcgZGlzY3JldGUgbWFwIGZvciAnICsgcG9ydGFibGVQcm9wZXJ0eUtleSArICc6ICcgKyBkaXNjcmV0ZU1hcC52ICsgJyAoJyArIGF0dHJpYnV0ZU5hbWUgKyAnPCcgKyBhdHRyaWJ1dGVEYXRhVHlwZSArICc+KSAtPiAnICsgZGlzY3JldGVNYXAudnApO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0RGlzY3JldGVTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEYXRhVHlwZSwgZGlzY3JldGVNYXAudik7XG5cbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlTWFwID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShkaXNjcmV0ZU1hcC52cCk7XG4gICAgICAgICAgICBjb25zdCBjc3MgPSB7fTtcbiAgICAgICAgICAgIHN0eWxlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBjc3Nba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvdXRwdXQucHVzaChnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcykpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnICAgc3R5bGU6ICcgKyBKU09OLnN0cmluZ2lmeShjc3MpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICByZXR1cm4gb3V0cHV0OyAvL2dldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKTtcbn1cblxuZnVuY3Rpb24gZ2V0QnlwYXNzQ1NTRW50cnkoZW50aXR5VHlwZSwgY3hFbGVtZW50KSB7XG5cbiAgICBjb25zdCBpZCA9IGN4RWxlbWVudC5pZDtcbiAgICBjb25zdCBjc3MgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhjeEVsZW1lbnQudikuZm9yRWFjaCgocG9ydGFibGVQcm9wZXJ0eUtleSkgPT4ge1xuICAgICAgICBjb25zdCBwb3J0YWJsZVByb3BlcnR5VmFsdWUgPSBjeEVsZW1lbnQudltwb3J0YWJsZVByb3BlcnR5S2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlTWFwID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgc3R5bGVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGNzc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRJZFNlbGVjdG9yKGlkLCBlbnRpdHlUeXBlKTtcbiAgICByZXR1cm4gZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpO1xufVxuXG4vKiogXG4gKiBcbiovXG5mdW5jdGlvbiBnZXRDU1NNYXBwaW5nRW50cmllcyhcbiAgICBjeE1hcHBpbmdFbnRyaWVzLFxuICAgIGVudGl0eVR5cGUsXG4gICAgYXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBjeE1hcHBpbmdFbnRyaWVzICYmIE9iamVjdC5rZXlzKGN4TWFwcGluZ0VudHJpZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBjeE1hcHBpbmdFbnRyeSA9IGN4TWFwcGluZ0VudHJpZXNba2V5XTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIiBtYXBwaW5nIHR5cGU6IFwiICsgY3hNYXBwaW5nRW50cnkudHlwZSk7XG4gICAgICAgIHN3aXRjaCAoY3hNYXBwaW5nRW50cnkudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnQ09OVElOVU9VUyc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250aW5vdXNNYXBwaW5ncyA9IGdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cmllcyhrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApO1xuICAgICAgICAgICAgICAgIGNvbnRpbm91c01hcHBpbmdzLmZvckVhY2goKGNvbnRpbm91c01hcHBpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goY29udGlub3VzTWFwcGluZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ1BBU1NUSFJPVUdIJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNzc0VudHJ5ID0gZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlKTtcbiAgICAgICAgICAgICAgICBpZiAoY3NzRW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goY3NzRW50cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ0RJU0NSRVRFJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlTWFwcGluZ3MgPSBnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzKGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCk7XG4gICAgICAgICAgICAgICAgZGlzY3JldGVNYXBwaW5ncy5mb3JFYWNoKChkaXNjcmV0ZU1hcHBpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goZGlzY3JldGVNYXBwaW5nKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgTk9ERV9TRUxFQ1RPUiA9ICdub2RlJztcbmNvbnN0IEVER0VfU0VMRUNUT1IgPSAnZWRnZSc7XG5cbmZ1bmN0aW9uIGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBjeE5vZGVCeXBhc3NlcywgY3hFZGdlQnlwYXNzZXMsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICBsZXQgZGVmYXVsdENTU05vZGVTdHlsZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgZGVmYXVsdENTU0VkZ2VTdHlsZSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IG1hcHBpbmdDU1NOb2RlU3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG1hcHBpbmdDU1NFZGdlU3R5bGUgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgYnlwYXNzQ1NTRW50cmllcyA9IFtdO1xuXG4gICAgY3hWaXN1YWxQcm9wZXJ0aWVzLmZvckVhY2goKHZwRWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCBkZWZhdWx0U3R5bGVzID0gdnBFbGVtZW50LmRlZmF1bHQ7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnZGVmYXVsdCBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGRlZmF1bHRTdHlsZXMpKTtcbiAgICAgICAgZGVmYXVsdENTU05vZGVTdHlsZSA9IGdldENTU1N0eWxlRW50cmllcyhkZWZhdWx0U3R5bGVzLm5vZGUsICdub2RlJyk7XG4gICAgICAgIGRlZmF1bHRDU1NFZGdlU3R5bGUgPSBnZXRDU1NTdHlsZUVudHJpZXMoZGVmYXVsdFN0eWxlcy5lZGdlLCAnZWRnZScpO1xuXG4gICAgICAgIGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IgPSBkZWZhdWx0U3R5bGVzLm5ldHdvcmtbJ2JhY2tncm91bmQtY29sb3InXTtcblxuICAgICAgICBjb25zdCBub2RlTWFwcGluZyA9IHZwRWxlbWVudC5ub2RlTWFwcGluZztcbiAgICAgICAgbWFwcGluZ0NTU05vZGVTdHlsZSA9IGdldENTU01hcHBpbmdFbnRyaWVzKG5vZGVNYXBwaW5nLCAnbm9kZScsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICBjb25zdCBlZGdlTWFwcGluZyA9IHZwRWxlbWVudC5lZGdlTWFwcGluZztcbiAgICAgICAgbWFwcGluZ0NTU0VkZ2VTdHlsZSA9IGdldENTU01hcHBpbmdFbnRyaWVzKGVkZ2VNYXBwaW5nLCAnZWRnZScsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgIH0pXG5cbiAgICBjeE5vZGVCeXBhc3Nlcy5mb3JFYWNoKCh2cEVsZW1lbnQpID0+IHtcbiAgICAgICAgYnlwYXNzQ1NTRW50cmllcy5wdXNoKGdldEJ5cGFzc0NTU0VudHJ5KCdub2RlJywgdnBFbGVtZW50KSk7XG4gICAgfSk7XG5cbiAgICBjeEVkZ2VCeXBhc3Nlcy5mb3JFYWNoKCh2cEVsZW1lbnQpID0+IHtcbiAgICAgICAgYnlwYXNzQ1NTRW50cmllcy5wdXNoKGdldEJ5cGFzc0NTU0VudHJ5KCdlZGdlJywgdnBFbGVtZW50KSk7XG4gICAgfSk7XG5cbiAgICAvL2NvbnNvbGUubG9nKCdkZWZhdWx0IG5vZGUgc3R5bGU6ICcgKyBKU09OLnN0cmluZ2lmeShkZWZhdWx0Q1NTTm9kZVN0eWxlKSk7XG5cbiAgICAvL0FkZCBkZWZhdWx0IHN0eWxlXG4gICAgb3V0cHV0LnN0eWxlLnB1c2goZ2V0U3R5bGVFbGVtZW50KE5PREVfU0VMRUNUT1IsIGRlZmF1bHRDU1NOb2RlU3R5bGUpKTtcbiAgICBvdXRwdXQuc3R5bGUucHVzaChnZXRTdHlsZUVsZW1lbnQoRURHRV9TRUxFQ1RPUiwgZGVmYXVsdENTU0VkZ2VTdHlsZSkpO1xuXG4gICAgb3V0cHV0LnN0eWxlLnB1c2guYXBwbHkob3V0cHV0LnN0eWxlLCBtYXBwaW5nQ1NTTm9kZVN0eWxlKTtcbiAgICBvdXRwdXQuc3R5bGUucHVzaC5hcHBseShvdXRwdXQuc3R5bGUsIG1hcHBpbmdDU1NFZGdlU3R5bGUpO1xuXG4gICAgb3V0cHV0LnN0eWxlLnB1c2guYXBwbHkob3V0cHV0LnN0eWxlLCBieXBhc3NDU1NFbnRyaWVzKTtcblxuICAgIG91dHB1dFsnYmFja2dyb3VuZC1jb2xvciddID0gY3NzTmV0d29ya0JhY2tncm91bmRDb2xvcjtcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdjeXRvc2NhcGVKUycsXG4gICAgZW1wdHlOZXR3b3JrOiB7XG4gICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgZWxlbWVudHM6IHt9LFxuICAgICAgICBsYXlvdXQ6IHt9LFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IG51bGxcbiAgICB9LFxuICAgIGNvbnZlcnQ6IChjeCkgPT4ge1xuICAgICAgICBjb25zdCBvdXRwdXQgPSB7XG4gICAgICAgICAgICBzdHlsZTogW10sXG4gICAgICAgICAgICBlbGVtZW50czoge30sXG4gICAgICAgICAgICBsYXlvdXQ6IHt9LFxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3hWaXN1YWxQcm9wZXJ0aWVzID0gdW5kZWZpbmVkO1xuICAgICAgICBsZXQgY3hOb2RlQnlwYXNzZXMgPSBbXTtcbiAgICAgICAgbGV0IGN4RWRnZUJ5cGFzc2VzID0gW107XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgbGV0IG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMgPSBjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ107XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIiBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uczogXCIgKyBKU09OLnN0cmluZ2lmeShjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucywgbnVsbCwgMikpO1xuICAgICAgICAgICAgICAgIGN4VXRpbC5wcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zKGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLFxuICAgICAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuICAgICAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hOb2RlWyd2J10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcbiAgICAgICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhlZGdlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGN4RWRnZVsndiddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXSkge1xuICAgICAgICAgICAgICAgIGN4VmlzdWFsUHJvcGVydGllcyA9IGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ107XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wydub2RlQnlwYXNzZXMnXSkge1xuICAgICAgICAgICAgICAgIGN4QXNwZWN0Lm5vZGVCeXBhc3Nlcy5mb3JFYWNoKGJ5cGFzcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN4Tm9kZUJ5cGFzc2VzLnB1c2goYnlwYXNzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VCeXBhc3NlcyddKSB7XG4gICAgICAgICAgICAgICAgY3hBc3BlY3QuZWRnZUJ5cGFzc2VzLmZvckVhY2goYnlwYXNzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hFZGdlQnlwYXNzZXMucHVzaChieXBhc3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcC5mb3JFYWNoKChpbmZlcnJlZFR5cGUsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2luZmVycmVkIGF0dHJpYnV0ZSB0eXBlIGZvciBub2RlOiAnICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcC5mb3JFYWNoKChpbmZlcnJlZFR5cGUsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2luZmVycmVkIGF0dHJpYnV0ZSB0eXBlIGZvciBlZGdlOiAnICsgYXR0cmlidXRlTmFtZSArICc6ICcgKyBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL0FkZCBub2Rlc1xuICAgICAgICBvdXRwdXQuZWxlbWVudHNbJ25vZGVzJ10gPSBbXTtcblxuICAgICAgICAvL0FkZCBlZGdlc1xuICAgICAgICBvdXRwdXQuZWxlbWVudHNbJ2VkZ2VzJ10gPSBbXTtcblxuXG4gICAgICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ10gPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4Tm9kZVsndiddLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnaWQnXSA9IGN4Tm9kZS5pZC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Wydwb3NpdGlvbiddID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogY3hOb2RlWyd4J10sXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBjeE5vZGVbJ3knXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5lbGVtZW50cy5ub2Rlcy5wdXNoKGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuICAgICAgICAgICAgICAgIGN4RWRnZXMuZm9yRWFjaCgoY3hFZGdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddID0gY3hVdGlsLmdldEV4cGFuZGVkQXR0cmlidXRlcyhjeEVkZ2VbJ3YnXSwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ2lkJ10gPSBjeEVkZ2UuaWQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydzb3VyY2UnXSA9IGN4RWRnZVsncyddO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ3RhcmdldCddID0gY3hFZGdlWyd0J107XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5lbGVtZW50cy5lZGdlcy5wdXNoKGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0VmlzdWFsUHJvcGVydGllcyhjeFZpc3VhbFByb3BlcnRpZXMsIGN4Tm9kZUJ5cGFzc2VzLCBjeEVkZ2VCeXBhc3Nlcywgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKTtcblxuICAgICAgICBvdXRwdXQuc3R5bGUgPSBzdHlsZS5zdHlsZTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygndmlzdWFsUHJvcGVydGllczogJyArIEpTT04uc3RyaW5naWZ5KGN4VmlzdWFsUHJvcGVydGllcywgbnVsbCwgMikpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KG91dHB1dC5zdHlsZSwgbnVsbCwgMikpO1xuXG4gICAgICAgIG91dHB1dFsnYmFja2dyb3VuZC1jb2xvciddID0gc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXTtcblxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udmVydGVyOiBjb252ZXJ0ZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTLmpzIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgICdzaGFwZSc6ICdzaGFwZScsXG4gICAgJ3dpZHRoJzogJ3dpZHRoJywgXG4gICAgJ2hlaWdodCc6ICdoZWlnaHQnLFxuICAgICdiYWNrZ3JvdW5kX2NvbG9yJzogJ2JhY2tncm91bmQtY29sb3InLFxuICAgICdiYWNrZ3JvdW5kX29wYWNpdHknOiAnYmFja2dyb3VuZC1vcGFjaXR5JyxcbiAgICAnbGFiZWwnOiAnbGFiZWwnLFxuICAgICdsYWJlbF9jb2xvcic6ICdjb2xvcicsXG4gICAgJ2xhYmVsX2ZvbnRfc2l6ZScgOiAnZm9udC1zaXplJyxcbiAgICAnbGFiZWxfb3BhY2l0eScgOiAndGV4dC1vcGFjaXR5JyxcbiAgICAnb3BhY2l0eSc6ICdvcGFjaXR5JyxcbiAgICAnbGluZV9jb2xvcic6ICdsaW5lLWNvbG9yJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==