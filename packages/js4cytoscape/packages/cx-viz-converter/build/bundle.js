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

    cxVisualProperties && cxVisualProperties.forEach(function (vpElement) {

        var defaultStyles = vpElement.default;

        defaultValues = getDefaultValues(defaultStyles);

        mappings.node = vpElement.nodeMapping ? getMappings(vpElement.nodeMapping) : {};
        mappings.edge = vpElement.edgeMapping ? getMappings(vpElement.edgeMapping) : {};
    });

    cxNodeBypasses && cxNodeBypasses.forEach(function (vpElement) {

        var key = vpElement[cxConstants.ID].toString();
        var values = getLNVValues('node', vpElement.v);

        if (!bypassMappings.node[key]) {
            bypassMappings.node[key] = {};
        }

        //console.log('bypass calculated: ' + JSON.stringify(values, null, 2));

        Object.assign(bypassMappings.node[key], values);
        //bypassCSSEntries.push(getBypassCSSEntry('node', vpElement));
    });

    cxEdgeBypasses && cxEdgeBypasses.forEach(function (vpElement) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkM2MzZTg3MWMzYjAyNjA0ZDRhNSIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsIlBPIiwiZ2V0Q3hWZXJzaW9uIiwidmVyc2lvblN0cmluZyIsInZlcnNpb25BcnJheSIsInNwbGl0IiwibWFwIiwibnVtYmVyU3RyaW5nIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXNOYU4iLCJlbGVtZW50IiwiZ2V0Q3hNYWpvclZlcnNpb24iLCJwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVBdHRyaWJ1dGVUeXBlTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwiZWRnZUF0dHJpYnV0ZVR5cGVNYXAiLCJlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbiIsInVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAiLCJub2RlcyIsInVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAiLCJ1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJlZGdlcyIsImF0dHJpYnV0ZVR5cGVNYXAiLCJhdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJrZXlzIiwiYXR0cmlidXRlTmFtZSIsImF0dHJpYnV0ZURlY2xhcmF0aW9uIiwic2V0IiwiZCIsImF0dHJpYnV0ZU5hbWVNYXAiLCJhIiwiYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwidiIsInVwZGF0ZUluZmVycmVkVHlwZXMiLCJrZXkiLCJoYXMiLCJ2YWx1ZSIsImluZmVycmVkVHlwZSIsIm5ld0tleSIsImdldCIsImdldEV4cGFuZGVkQXR0cmlidXRlcyIsImRhdGEiLCJjb252ZXJ0ZXIiLCJyZXF1aXJlIiwiY29udmVydCIsImN4IiwidGFyZ2V0Rm9ybWF0IiwiY3hDb25zdGFudHMiLCJsYXJnZU5ldHdvcmsiLCJjeXRvc2NhcGVKUyIsImN4VXRpbCIsInZlcmlmeVZlcnNpb24iLCJmaXJzdEVsZW1lbnQiLCJtYWpvclZlcnNpb24iLCJkZWZhdWx0Q29udmVydGVycyIsInNlbGVjdENvbnZlcnRlciIsImNvbnZlcnRlcnMiLCJzZWxlY3RlZENvbnZlcnRlciIsInVuZGVmaW5lZCIsImdldEVtcHR5TmV0d29yayIsImVtcHR5TmV0d29yayIsImxhcmdlTmV0d29ya0NvbnN0YW50cyIsInNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJ0YXJnZXRTdHlsZUZpZWxkIiwicG9ydGFibGVQcm9wZXJ0VmFsdWUiLCJ0YXJnZXRTdHlsZUVudHJ5IiwiaGV4VG9SR0IiLCJoZXgiLCJyIiwiZyIsImIiLCJhbHBoYVRvSW50IiwiYWxwaGFEZWNpbWFsIiwiY2xhbXAiLCJNYXRoIiwicm91bmQiLCJkZWZhdWx0UHJvcGVydHlDb252ZXJ0IiwicG9ydGFibGVQcm9wZXJ0eVZhbHVlIiwicHJlcHJvY2Vzc05vZGVXaWR0aCIsInByZXByb2Nlc3NOb2RlSGVpZ2h0IiwicHJlcHJvY2Vzc0NvbG9yIiwicHJlcHJvY2Vzc0FscGhhIiwibGFiZWwiLCJwcmVwcm9jZXNzTGFiZWxDb2xvciIsInByZXByb2Nlc3NMYWJlbEFscGhhIiwibGFiZWxGb250U2l6ZSIsIndpZHRoIiwiZ2V0RGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzIiwib3V0cHV0Iiwibm9kZSIsImVkZ2UiLCJub2RlRGVmYXVsdCIsImxudkVudHJpZXMiLCJnZXRMTlZWYWx1ZXMiLCJhc3NpZ24iLCJlZGdlRGVmYXVsdCIsImVudGl0eVR5cGUiLCJlbnRyaWVzIiwicG9ydGFibGVQcm9wZXJ0eUtleSIsImxudkVudHJ5IiwibG52S2V5IiwicHJvY2Vzc0NvbG9yIiwiY29sb3JBcnJheSIsImFscGhhIiwicHJvY2Vzc1NpemUiLCJoZWlnaHQiLCJtYXgiLCJwcm9jZXNzTm9kZVZpZXciLCJub2RlVmlldyIsImxhYmVsQ29sb3JBcnJheSIsImxhYmVsQWxwaGEiLCJpZCIsInBvc2l0aW9uIiwiY29sb3IiLCJsYWJlbENvbG9yIiwic2l6ZSIsInByb2Nlc3NFZGdlVmlldyIsImVkZ2VWaWV3IiwicyIsInQiLCJnZXRNYXBwaW5ncyIsIm1hcHBpbmdzIiwibWFwcGluZyIsInByb3BlcnR5S2V5IiwibWFwcGluZ0xpc3QiLCJkZWZpbml0aW9uIiwiYXR0cmlidXRlIiwicHVzaCIsInR5cGUiLCJ2cCIsImdldEF0dHJpYnV0ZVJhdGlvIiwiYXR0cmlidXRlVmFsdWUiLCJhdHRyaWJ1dGVNaW4iLCJhdHRyaWJ1dGVNYXgiLCJnZXRNYXAiLCJ2cE1pbiIsInZwTWF4IiwiYXR0cmlidXRlUmF0aW8iLCJtaW4iLCJjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0IiwiY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0IiwibWluUkdCIiwibWF4UkdCIiwiY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0IiwiY29udGludW91c1Byb3BlcnR5Q29udmVydCIsImlzSW5SYW5nZSIsImluY2x1ZGVNaW4iLCJpbmNsdWRlTWF4IiwibWluU2F0aXNmaWVkIiwibWF4U2F0aXNmaWVkIiwiZ2V0TWFwcGVkVmFsdWVzIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZUtleSIsImRpc2NyZXRlTWFwIiwia2V5VmFsdWUiLCJjb252ZXJ0ZWQiLCJjb250aW51b3VzTWFwcGluZ3MiLCJtYXBwaW5nUmFuZ2UiLCJtaW5WUFZhbHVlIiwibWF4VlBWYWx1ZSIsImxudkNvbnZlcnQiLCJjeFZpc3VhbFByb3BlcnRpZXMiLCJjeE5vZGVCeXBhc3NlcyIsImN4RWRnZUJ5cGFzc2VzIiwiTWFwIiwiZGVmYXVsdFZhbHVlcyIsImJ5cGFzc01hcHBpbmdzIiwiY3hBc3BlY3QiLCJjeE5vZGVzIiwiY3hOb2RlIiwiY3hFZGdlcyIsImN4RWRnZSIsIm5vZGVCeXBhc3NlcyIsImJ5cGFzcyIsImVkZ2VCeXBhc3NlcyIsIm5vZGVWaWV3cyIsImVkZ2VWaWV3cyIsImRlZmF1bHRTdHlsZXMiLCJ2cEVsZW1lbnQiLCJkZWZhdWx0Iiwibm9kZU1hcHBpbmciLCJlZGdlTWFwcGluZyIsInRvU3RyaW5nIiwidmFsdWVzIiwiY3hJZCIsImRlZmF1bHROb2RlVmlzdWFsUHJvcGVydGllcyIsImV4cGFuZGVkQXR0cmlidXRlcyIsIm1hcHBpbmdWYWx1ZXMiLCJwcm9jZXNzZWROb2RlVmlldyIsImRlZmF1bHRFZGdlVmlzdWFsUHJvcGVydGllcyIsInByb2Nlc3NlZEVkZ2VWaWV3IiwianNDb25zdGFudHMiLCJzaGFwZSIsImJhY2tncm91bmRfY29sb3IiLCJiYWNrZ3JvdW5kX29wYWNpdHkiLCJsYWJlbF9jb2xvciIsImxhYmVsX29wYWNpdHkiLCJsYWJlbF9mb250X3NpemUiLCJvcGFjaXR5IiwibGluZV9jb2xvciIsInNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0Iiwic2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydCIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJtaW5WUCIsIm1heFZQIiwibWFwRGF0YVByb3BlcnR5Q29udmVydCIsImdldENTU1N0eWxlRW50cmllcyIsImN4U3R5bGVFbnRyaWVzIiwiY3NzRW50cmllcyIsImdldElkU2VsZWN0b3IiLCJlbGVtZW50VHlwZSIsImdldFN0eWxlRWxlbWVudCIsInNlbGVjdG9yIiwiY3NzIiwiZ2V0Q29udGludW91c1NlbGVjdG9yIiwibWluQ29uZGl0aW9uIiwibWF4Q29uZGl0aW9uIiwibWluQm91bmQiLCJtYXhCb3VuZCIsImdldENvbnRpbnVvdXNTdHlsZSIsImdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cmllcyIsImN4TWFwcGluZ0RlZmluaXRpb24iLCJyYW5nZU1hcHMiLCJyYW5nZSIsInN0eWxlIiwiZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkiLCJnZXREaXNjcmV0ZVNlbGVjdG9yIiwiYXR0cmlidXRlRGF0YVR5cGUiLCJnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzIiwiYXR0dHJpYnV0ZVRvVmFsdWVNYXAiLCJzdHlsZU1hcCIsImdldEJ5cGFzc0NTU0VudHJ5IiwiY3hFbGVtZW50IiwiZ2V0Q1NTTWFwcGluZ0VudHJpZXMiLCJjeE1hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cnkiLCJjb250aW5vdXNNYXBwaW5ncyIsImNvbnRpbm91c01hcHBpbmciLCJjc3NFbnRyeSIsImRpc2NyZXRlTWFwcGluZ3MiLCJkaXNjcmV0ZU1hcHBpbmciLCJOT0RFX1NFTEVDVE9SIiwiRURHRV9TRUxFQ1RPUiIsImdldFZpc3VhbFByb3BlcnRpZXMiLCJkZWZhdWx0Q1NTTm9kZVN0eWxlIiwiZGVmYXVsdENTU0VkZ2VTdHlsZSIsImNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IiLCJtYXBwaW5nQ1NTTm9kZVN0eWxlIiwibWFwcGluZ0NTU0VkZ2VTdHlsZSIsImJ5cGFzc0NTU0VudHJpZXMiLCJuZXR3b3JrIiwiYXBwbHkiLCJlbGVtZW50cyIsImxheW91dCIsIngiLCJ5Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7Ozs7O0FDNURBQSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPQyxNQUFQLENBQWM7QUFDM0JDLGdCQUFZLFdBRGU7QUFFM0JDLFVBQU0sTUFGcUI7QUFHM0JDLFVBQU0sTUFIcUI7QUFJM0JDLGFBQVMsU0FKa0I7O0FBTTNCQyxXQUFPLE9BTm9CO0FBTzNCQyxXQUFPLE9BUG9COztBQVMzQkMsUUFBSSxJQVR1QjtBQVUzQkMsT0FBRyxHQVZ3QjtBQVczQkMsT0FBRyxHQVh3QjtBQVkzQkMsT0FBRyxHQVp3QjtBQWEzQkMsT0FBRyxHQWJ3Qjs7QUFlM0JDLFFBQUksSUFmdUI7QUFnQjNCQyxPQUFHLEdBaEJ3QjtBQWlCM0JDLE9BQUcsR0FqQndCOztBQW1CM0JDLHVCQUFtQixrQkFuQlE7QUFvQjNCQyxhQUFTLFNBcEJrQjs7QUFzQjNCQyxXQUFPLE9BdEJvQjs7QUF3QjNCQyxRQUFJO0FBeEJ1QixDQUFkLENBQWpCLEM7Ozs7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QixhQUFTLE9BTmtCO0FBTzNCLG1CQUFlLE9BUFk7QUFRM0IsdUJBQW9CLFdBUk87QUFTM0IscUJBQWtCLGNBVFM7QUFVM0IsZUFBVyxTQVZnQjtBQVczQixrQkFBYztBQVhhLENBQWQsQ0FBakIsQyIsImZpbGUiOiIuL2J1aWxkL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN4Vml6Q29udmVydGVyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkM2MzZTg3MWMzYjAyNjA0ZDRhNSIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBDWF9WRVJTSU9OOiAnQ1hWZXJzaW9uJyxcbiAgICBOT0RFOiAnbm9kZScsXG4gICAgRURHRTogJ2VkZ2UnLFxuICAgIE5FVFdPUks6ICduZXR3b3JrJyxcblxuICAgIE5PREVTOiAnbm9kZXMnLFxuICAgIEVER0VTOiAnZWRnZXMnLFxuXG4gICAgSUQ6ICdpZCcsXG4gICAgWDogJ3gnLFxuICAgIFk6ICd5JyxcbiAgICBaOiAneicsXG4gICAgVjogJ3YnLFxuXG4gICAgQVQ6ICdhdCcsXG4gICAgTjogJ24nLFxuICAgIEU6ICdlJyxcblxuICAgIFZJU1VBTF9QUk9QRVJUSUVTOiAndmlzdWFsUHJvcGVydGllcycsXG4gICAgREVGQVVMVDogJ2RlZmF1bHQnLFxuXG4gICAgU1RZTEU6ICdzdHlsZScsXG5cbiAgICBQTzogJ3BvJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N4Q29uc3RhbnRzLmpzIiwiZnVuY3Rpb24gZ2V0Q3hWZXJzaW9uKHZlcnNpb25TdHJpbmcpIHtcbiAgICBjb25zdCB2ZXJzaW9uQXJyYXkgPSB2ZXJzaW9uU3RyaW5nLnNwbGl0KCcuJykubWFwKChudW1iZXJTdHJpbmcpID0+IHsgcmV0dXJuIHBhcnNlSW50KG51bWJlclN0cmluZywgMTApOyB9KTtcbiAgICBpZiAodmVyc2lvbkFycmF5Lmxlbmd0aCAhPT0gMiAmJiB2ZXJzaW9uQXJyYXkubGVuZ3RoICE9IDMpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSB2ZXJzaW9uIGZvcm1hdDogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgfVxuICAgIHZlcnNpb25BcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAoaXNOYU4oZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRocm93ICdOb24taW50ZWdlciB2YWx1ZSBpbiB2ZXJzaW9uIHN0cmluZzogJyArIHZlcnNpb25TdHJpbmc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdmVyc2lvbkFycmF5O1xufVxuXG5mdW5jdGlvbiBnZXRDeE1ham9yVmVyc2lvbih2ZXJzaW9uU3RyaW5nKSB7XG4gICAgcmV0dXJuIHZlcnNpb25TdHJpbmcgPyBnZXRDeFZlcnNpb24odmVyc2lvblN0cmluZylbMF0gOiAxO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zKGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBcbiAgICBub2RlQXR0cmlidXRlTmFtZU1hcCwgXG4gICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIFxuICAgIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIFxuICAgIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCwgXG4gICAgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIC8vY29uc29sZS5sb2coXCIgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IFwiICsgSlNPTi5zdHJpbmdpZnkoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIG51bGwsIDIpKTtcbiAgICBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucy5mb3JFYWNoKChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uKSA9PiB7XG4gICAgICAgIGlmIChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uWydub2RlcyddKSB7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24ubm9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjeEF0dHJpYnV0ZURlY2xhcmF0aW9uWydlZGdlcyddKSB7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwKGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGN4QXR0cmlidXRlRGVjbGFyYXRpb24uZWRnZXMpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAoYXR0cmlidXRlVHlwZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2QnXSkge1xuICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGVjbGFyYXRpb24uZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlTmFtZU1hcChhdHRyaWJ1dGVOYW1lTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsnYSddKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhdHRyaWJ1dGUgJyArIGF0dHJpYnV0ZURlY2xhcmF0aW9uLmEgKyAnIHNob3VsZCBiZSByZW5hbWVkIHRvICcgKyBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWVNYXAuc2V0KGF0dHJpYnV0ZURlY2xhcmF0aW9uLmEsIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWyd2J10pIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2F0dHJpYnV0ZSAnICsgYXR0cmlidXRlTmFtZSArICcgaGFzIGRlZmF1bHQgdmFsdWUgJyArIGF0dHJpYnV0ZURlY2xhcmF0aW9uLnYpO1xuICAgICAgICAgICAgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLnNldChhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbi52KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVJbmZlcnJlZFR5cGVzKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZU5hbWVNYXAsIHYpIHtcbiAgICB2ICYmIE9iamVjdC5rZXlzKHYpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZVR5cGVNYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdltrZXldO1xuICAgICAgICAgICAgY29uc3QgaW5mZXJyZWRUeXBlID0gdHlwZW9mIHZhbHVlO1xuICAgICAgICAgICAgY29uc3QgbmV3S2V5ID0gYXR0cmlidXRlTmFtZU1hcC5oYXMoa2V5KSA/IGF0dHJpYnV0ZU5hbWVNYXAuZ2V0KGtleSkgOiBrZXk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVUeXBlTWFwLnNldChuZXdLZXksIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBnZXRFeHBhbmRlZEF0dHJpYnV0ZXModiwgYXR0cmlidXRlTmFtZU1hcCwgYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKSB7XG4gICAgbGV0IGRhdGEgPSB7fTtcbiAgICB2ICYmIE9iamVjdC5rZXlzKHYpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdLZXkgPSBhdHRyaWJ1dGVOYW1lTWFwLmhhcyhrZXkpID8gYXR0cmlidXRlTmFtZU1hcC5nZXQoa2V5KSA6IGtleTtcbiAgICAgICAgZGF0YVtuZXdLZXldID0gdltrZXldO1xuICAgIH0pO1xuICAgIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGlmICghZGF0YVtrZXldKSB7XG4gICAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRDeFZlcnNpb246IGdldEN4VmVyc2lvbixcbiAgICBnZXRDeE1ham9yVmVyc2lvbjogZ2V0Q3hNYWpvclZlcnNpb24sXG4gICAgcHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9uczogcHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyxcbiAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwOiB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwLFxuICAgIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXA6IHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwOiB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsXG4gICAgdXBkYXRlSW5mZXJyZWRUeXBlczogdXBkYXRlSW5mZXJyZWRUeXBlcyxcbiAgICBnZXRFeHBhbmRlZEF0dHJpYnV0ZXMgOiBnZXRFeHBhbmRlZEF0dHJpYnV0ZXNcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2N4VXRpbC5qcyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29udmVydGVyID0gcmVxdWlyZSAoJy4vY29udmVydGVyLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzLmNvbnZlcnQgPSAoY3gsIHRhcmdldEZvcm1hdCkgPT4geyByZXR1cm4gY29udmVydGVyLmNvbnZlcnQoY3gsIHRhcmdldEZvcm1hdCk7IH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi9jeENvbnN0YW50cy5qcycpO1xuY29uc3QgbGFyZ2VOZXR3b3JrID0gcmVxdWlyZSAoJy4vbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcycpOyBcbmNvbnN0IGN5dG9zY2FwZUpTID0gcmVxdWlyZSAoJy4vY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMnKTtcbmNvbnN0IGN4VXRpbCA9IHJlcXVpcmUoJy4vY3hVdGlsLmpzJyk7XG5cbmZ1bmN0aW9uIHZlcmlmeVZlcnNpb24oY3gpIHtcbiAgICBjb25zdCBmaXJzdEVsZW1lbnQgPSBjeFswXTtcbiAgICBjb25zdCB2ZXJzaW9uU3RyaW5nID0gZmlyc3RFbGVtZW50W2N4Q29uc3RhbnRzLkNYX1ZFUlNJT05dO1xuXG4gICAgY29uc3QgbWFqb3JWZXJzaW9uID0gY3hVdGlsLmdldEN4TWFqb3JWZXJzaW9uKHZlcnNpb25TdHJpbmcpO1xuXG4gICAgaWYgKG1ham9yVmVyc2lvbiAhPT0gMikge1xuICAgICAgICB0aHJvdyAnSW5jb21wYXRpYmxlIENYIHZlcnNpb246ICcgKyB2ZXJzaW9uU3RyaW5nO1xuICAgIH1cbn1cblxuY29uc3QgZGVmYXVsdENvbnZlcnRlcnMgPSBbXG4gICAgbGFyZ2VOZXR3b3JrLFxuICAgIGN5dG9zY2FwZUpTXG5dO1xuXG5mdW5jdGlvbiBzZWxlY3RDb252ZXJ0ZXIodGFyZ2V0Rm9ybWF0LCBjb252ZXJ0ZXJzKSB7XG4gICAgbGV0IHNlbGVjdGVkQ29udmVydGVyID0gdW5kZWZpbmVkO1xuICAgIFxuICAgIGNvbnZlcnRlcnMuZm9yRWFjaCggY29udmVydGVyID0+IHtcbiAgICAgICAgaWYgKGNvbnZlcnRlci5jb252ZXJ0ZXIudGFyZ2V0Rm9ybWF0ID09IHRhcmdldEZvcm1hdCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygndGFyZ2V0IGZvcm1hdDogJyArIGNvbnZlcnRlci5jb252ZXJ0ZXIudGFyZ2V0Rm9ybWF0KTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0ZWRDb252ZXJ0ZXIgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvbnZlcnRlciA9IGNvbnZlcnRlcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ2NvbnZlcnRlcnMgY29udGFpbiBtdWx0aXBsZSBlbnRyaWVzIGZvciB0YXJnZXQgZm9ybWF0OiAnICsgdGFyZ2V0Rm9ybWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIHNlbGVjdGVkQ29udmVydGVyID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93ICdubyBjb252ZXJ0ZXIgYXZhaWxhYmxlIGZvciB0YXJnZXQgZm9ybWF0OiAnICsgdGFyZ2V0Rm9ybWF0XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RlZENvbnZlcnRlcjtcbn1cblxuZnVuY3Rpb24gZ2V0RW1wdHlOZXR3b3JrKHRhcmdldEZvcm1hdCwgY29udmVydGVycykge1xuICAgIGNvbnN0IHNlbGVjdGVkQ29udmVydGVyID0gc2VsZWN0Q29udmVydGVyKHRhcmdldEZvcm1hdCwgY29udmVydGVycyk7XG4gICAgcmV0dXJuIHNlbGVjdGVkQ29udmVydGVyLmNvbnZlcnRlci5lbXB0eU5ldHdvcms7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnQoY3gsIHRhcmdldEZvcm1hdCwgY29udmVydGVycyA9IGRlZmF1bHRDb252ZXJ0ZXJzKSB7XG4gICAgXG4gICAgaWYgKGN4Lmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIHJldHVybiBnZXRFbXB0eU5ldHdvcmsodGFyZ2V0Rm9ybWF0LCBjb252ZXJ0ZXJzKTtcbiAgICB9XG4gICAgXG4gICAgdmVyaWZ5VmVyc2lvbihjeCk7XG4gICAgY29uc3Qgc2VsZWN0ZWRDb252ZXJ0ZXIgPSBzZWxlY3RDb252ZXJ0ZXIodGFyZ2V0Rm9ybWF0LCBjb252ZXJ0ZXJzKTtcbiAgICByZXR1cm4gc2VsZWN0ZWRDb252ZXJ0ZXIuY29udmVydGVyLmNvbnZlcnQoY3gpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnZlcnQ6IGNvbnZlcnRcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnZlcnRlci5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuLi9jeENvbnN0YW50cy5qcycpO1xuY29uc3QgbGFyZ2VOZXR3b3JrQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9sYXJnZU5ldHdvcmtDb25zdGFudHMuanMnKTtcbmNvbnN0IGN4VXRpbCA9IHJlcXVpcmUoJy4uL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKSB7XG4gICAgY29uc3QgdGFyZ2V0U3R5bGVFbnRyeSA9IHt9O1xuICAgIHRhcmdldFN0eWxlRW50cnlbdGFyZ2V0U3R5bGVGaWVsZF0gPSBwb3J0YWJsZVByb3BlcnRWYWx1ZTtcbiAgICByZXR1cm4gdGFyZ2V0U3R5bGVFbnRyeTtcbn1cblxuZnVuY3Rpb24gaGV4VG9SR0IoaGV4KSB7XG4gICAgaWYgKGhleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBoZXg7XG4gICAgfVxuICAgIGxldCByID0gMCwgZyA9IDAsIGIgPSAwO1xuXG4gICAgLy8gMyBkaWdpdHNcbiAgICBpZiAoaGV4Lmxlbmd0aCA9PSA0KSB7XG4gICAgICAgIHIgPSBcIjB4XCIgKyBoZXhbMV0gKyBoZXhbMV07XG4gICAgICAgIGcgPSBcIjB4XCIgKyBoZXhbMl0gKyBoZXhbMl07XG4gICAgICAgIGIgPSBcIjB4XCIgKyBoZXhbM10gKyBoZXhbM107XG5cbiAgICAgICAgLy8gNiBkaWdpdHNcbiAgICB9IGVsc2UgaWYgKGhleC5sZW5ndGggPT0gNykge1xuICAgICAgICByID0gXCIweFwiICsgaGV4WzFdICsgaGV4WzJdO1xuICAgICAgICBnID0gXCIweFwiICsgaGV4WzNdICsgaGV4WzRdO1xuICAgICAgICBiID0gXCIweFwiICsgaGV4WzVdICsgaGV4WzZdO1xuICAgIH1cblxuICAgIHJldHVybiBbcGFyc2VJbnQociksIHBhcnNlSW50KGcpLCBwYXJzZUludChiKV07XG59XG5cbmZ1bmN0aW9uIGFscGhhVG9JbnQoYWxwaGFEZWNpbWFsKSB7XG4gICAgcmV0dXJuIGNsYW1wKE1hdGgucm91bmQoYWxwaGFEZWNpbWFsICogMjU1KSwgMCwgMjU1KTtcbn1cblxuY29uc3QgZGVmYXVsdFByb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTm9kZVdpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTm9kZUhlaWdodCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NDb2xvciwgaGV4VG9SR0IocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NBbHBoYSwgYWxwaGFUb0ludChwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvciwgaGV4VG9SR0IocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0xBQkVMX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSwgYWxwaGFUb0ludChwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfRk9OVF9TSVpFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxGb250U2l6ZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMud2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnRURHRV9MQUJFTCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yLCBoZXhUb1JHQihwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhLCBhbHBoYVRvSW50KHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbEZvbnRTaXplLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpXG4gICAgfVxufVxuXG5cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlcyhkZWZhdWx0VmlzdWFsUHJvcGVydGllcykge1xuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIG5vZGU6IHt9LFxuICAgICAgICBlZGdlOiB7fVxuICAgIH07XG4gICAgaWYgKGRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzWydub2RlJ10pIHtcbiAgICAgICAgY29uc3Qgbm9kZURlZmF1bHQgPSBkZWZhdWx0VmlzdWFsUHJvcGVydGllcy5ub2RlO1xuICAgICAgICBjb25zdCBsbnZFbnRyaWVzID0gZ2V0TE5WVmFsdWVzKCdub2RlJywgbm9kZURlZmF1bHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dC5ub2RlLCBsbnZFbnRyaWVzKTtcbiAgICB9XG4gICAgaWYgKGRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzWydlZGdlJ10pIHtcbiAgICAgICAgY29uc3QgZWRnZURlZmF1bHQgPSBkZWZhdWx0VmlzdWFsUHJvcGVydGllcy5lZGdlO1xuICAgICAgICBjb25zdCBsbnZFbnRyaWVzID0gZ2V0TE5WVmFsdWVzKCdlZGdlJywgZWRnZURlZmF1bHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dC5lZGdlLCBsbnZFbnRyaWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0TE5WVmFsdWVzKGVudGl0eVR5cGUsIGVudHJpZXMpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgT2JqZWN0LmtleXMoZW50cmllcykuZm9yRWFjaChwb3J0YWJsZVByb3BlcnR5S2V5ID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gZW50cmllc1twb3J0YWJsZVByb3BlcnR5S2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGxudkVudHJ5ID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobG52RW50cnkpLmZvckVhY2gobG52S2V5ID0+IHtcbiAgICAgICAgICAgICAgICBvdXRwdXRbbG52S2V5XSA9IGxudkVudHJ5W2xudktleV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0NvbG9yKGNvbG9yQXJyYXksIGFscGhhKSB7XG4gICAgcmV0dXJuIGNvbG9yQXJyYXkgIT0gdW5kZWZpbmVkXG4gICAgICAgID8gYWxwaGEgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IFtjb2xvckFycmF5WzBdLCBjb2xvckFycmF5WzFdLCBjb2xvckFycmF5WzJdLCBhbHBoYV1cbiAgICAgICAgICAgIDogW2NvbG9yQXJyYXlbMF0sIGNvbG9yQXJyYXlbMV0sIGNvbG9yQXJyYXlbMl1dXG4gICAgICAgIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzU2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KHdpZHRoLCBoZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzTm9kZVZpZXcobm9kZVZpZXcpIHtcbiAgICBsZXQgd2lkdGggPSB1bmRlZmluZWQ7XG4gICAgbGV0IGhlaWdodCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgY29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgYWxwaGEgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgbGFiZWxDb2xvckFycmF5ID0gdW5kZWZpbmVkO1xuICAgIGxldCBsYWJlbEFscGhhID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgaWQ6IG5vZGVWaWV3LmlkLFxuICAgICAgICBwb3NpdGlvbjogbm9kZVZpZXcucG9zaXRpb25cbiAgICB9O1xuXG5cbiAgICBPYmplY3Qua2V5cyhub2RlVmlldykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVXaWR0aCkge1xuICAgICAgICAgICAgd2lkdGggPSBub2RlVmlldy5wcmVwcm9jZXNzTm9kZVdpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlSGVpZ2h0KSB7XG4gICAgICAgICAgICBoZWlnaHQgPSBub2RlVmlldy5wcmVwcm9jZXNzTm9kZUhlaWdodDtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IpIHtcbiAgICAgICAgICAgIGNvbG9yQXJyYXkgPSBub2RlVmlldy5wcmVwcm9jZXNzQ29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhKSB7XG4gICAgICAgICAgICBhbHBoYSA9IG5vZGVWaWV3LnByZXByb2Nlc3NBbHBoYTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvcikge1xuICAgICAgICAgICAgbGFiZWxDb2xvckFycmF5ID0gbm9kZVZpZXcucHJlcHJvY2Vzc0xhYmVsQ29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEpIHtcbiAgICAgICAgICAgIGxhYmVsQWxwaGEgPSBub2RlVmlldy5wcmVwcm9jZXNzTGFiZWxBbHBoYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dHB1dFtrZXldID0gbm9kZVZpZXdba2V5XTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29sb3IgPSBwcm9jZXNzQ29sb3IoY29sb3JBcnJheSwgYWxwaGEpO1xuICAgIGlmIChjb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmNvbG9yXSA9IGNvbG9yO1xuICAgIH1cblxuICAgIGNvbnN0IGxhYmVsQ29sb3IgPSBwcm9jZXNzQ29sb3IobGFiZWxDb2xvckFycmF5LCBsYWJlbEFscGhhKTtcbiAgICBpZiAobGFiZWxDb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsQ29sb3JdID0gbGFiZWxDb2xvcjtcbiAgICB9XG5cbiAgICBjb25zdCBzaXplID0gcHJvY2Vzc1NpemUod2lkdGgsIGhlaWdodCk7XG4gICAgaWYgKHNpemUpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5zaXplXSA9IHByb2Nlc3NTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzRWRnZVZpZXcoZWRnZVZpZXcpIHtcbiAgICBsZXQgY29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgYWxwaGEgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgbGFiZWxDb2xvckFycmF5ID0gdW5kZWZpbmVkO1xuICAgIGxldCBsYWJlbEFscGhhID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgaWQ6IGVkZ2VWaWV3LmlkLFxuICAgICAgICBzOiBlZGdlVmlldy5zLFxuICAgICAgICB0OiBlZGdlVmlldy50XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoZWRnZVZpZXcpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NDb2xvcikge1xuICAgICAgICAgICAgY29sb3JBcnJheSA9IGVkZ2VWaWV3LnByZXByb2Nlc3NDb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEpIHtcbiAgICAgICAgICAgIGFscGhhID0gZWRnZVZpZXcucHJlcHJvY2Vzc0FscGhhO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yKSB7XG4gICAgICAgICAgICBsYWJlbENvbG9yQXJyYXkgPSBlZGdlVmlldy5wcmVwcm9jZXNzTGFiZWxDb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSkge1xuICAgICAgICAgICAgbGFiZWxBbHBoYSA9IGVkZ2VWaWV3LnByZXByb2Nlc3NMYWJlbEFscGhhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBlZGdlVmlld1trZXldO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2xvciA9IHByb2Nlc3NDb2xvcihjb2xvckFycmF5LCBhbHBoYSk7XG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuY29sb3JdID0gY29sb3I7XG4gICAgfVxuXG4gICAgY29uc3QgbGFiZWxDb2xvciA9IHByb2Nlc3NDb2xvcihsYWJlbENvbG9yQXJyYXksIGxhYmVsQWxwaGEpO1xuICAgIGlmIChsYWJlbENvbG9yKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxDb2xvcl0gPSBsYWJlbENvbG9yO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldE1hcHBpbmdzKG1hcHBpbmdzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9XG4gICAgT2JqZWN0LmtleXMobWFwcGluZ3MpLmZvckVhY2gocHJvcGVydHlLZXkgPT4ge1xuICAgICAgICBjb25zdCBtYXBwaW5nID0gbWFwcGluZ3NbcHJvcGVydHlLZXldO1xuICAgICAgICBjb25zdCBtYXBwaW5nTGlzdCA9IG91dHB1dFttYXBwaW5nLmRlZmluaXRpb24uYXR0cmlidXRlXSA/IG91dHB1dFttYXBwaW5nLmRlZmluaXRpb24uYXR0cmlidXRlXSA6IFtdXG4gICAgICAgIG1hcHBpbmdMaXN0LnB1c2goe1xuICAgICAgICAgICAgdHlwZTogbWFwcGluZy50eXBlLFxuICAgICAgICAgICAgdnA6IHByb3BlcnR5S2V5LFxuICAgICAgICAgICAgZGVmaW5pdGlvbjogbWFwcGluZy5kZWZpbml0aW9uXG4gICAgICAgIH0pXG4gICAgICAgIG91dHB1dFttYXBwaW5nLmRlZmluaXRpb24uYXR0cmlidXRlXSA9IG1hcHBpbmdMaXN0O1xuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cblxuZnVuY3Rpb24gZ2V0QXR0cmlidXRlUmF0aW8oYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4KSB7XG4gICAgcmV0dXJuIChhdHRyaWJ1dGVWYWx1ZSAtIGF0dHJpYnV0ZU1pbikgLyAoYXR0cmlidXRlTWF4IC0gYXR0cmlidXRlTWluKTtcbn1cblxuZnVuY3Rpb24gZ2V0TWFwKHZwTWluLCB2cE1heCwgYXR0cmlidXRlUmF0aW8pIHtcbiAgICBpZiAodnBNaW4gIT09IHVuZGVmaW5lZCAmJiB2cE1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB2cE1pbiArICgodnBNYXggLSB2cE1pbikgKiBhdHRyaWJ1dGVSYXRpbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHZwTWluID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB2cE1heDtcbiAgICAgICAgfSBlbHNlIGlmICh2cE1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdnBNaW47XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgbWluKSwgbWF4KTtcbn1cblxuZnVuY3Rpb24gY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZVJhdGlvID0gZ2V0QXR0cmlidXRlUmF0aW8oYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4KTtcblxuICAgIGNvbnN0IG91dHB1dCA9IGdldE1hcCh2cE1pbiwgdnBNYXgsIGF0dHJpYnV0ZVJhdGlvKTtcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkge1xuICAgIGNvbnN0IG1pblJHQiA9IGhleFRvUkdCKHZwTWluKTtcbiAgICBjb25zdCBtYXhSR0IgPSBoZXhUb1JHQih2cE1heCk7XG5cbiAgICBjb25zdCBhdHRyaWJ1dGVSYXRpbyA9IGdldEF0dHJpYnV0ZVJhdGlvKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCk7XG5cbiAgICBjb25zdCBvdXRwdXQgPSBbXG4gICAgICAgIC8vVE9ETyBjaGVjayB0aGF0IG1pblJHQiBhbmQgbWF4UkdCIGFyZSBkZWZpbmVkL3VuZGVmaW5lZFxuICAgICAgICBjbGFtcChNYXRoLnJvdW5kKGdldE1hcChtaW5SR0IgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IG1pblJHQlswXSwgbWF4UkdCID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBtYXhSR0JbMF0sIGF0dHJpYnV0ZVJhdGlvKSksIDAsIDI1NSksXG4gICAgICAgIGNsYW1wKE1hdGgucm91bmQoZ2V0TWFwKG1pblJHQiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogbWluUkdCWzFdLCBtYXhSR0IgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IG1heFJHQlsxXSwgYXR0cmlidXRlUmF0aW8pKSwgMCwgMjU1KSxcbiAgICAgICAgY2xhbXAoTWF0aC5yb3VuZChnZXRNYXAobWluUkdCID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBtaW5SR0JbMl0sIG1heFJHQiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogbWF4UkdCWzJdLCBhdHRyaWJ1dGVSYXRpbykpLCAwLCAyNTUpXG4gICAgXVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZVJhdGlvID0gZ2V0QXR0cmlidXRlUmF0aW8oYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4KTtcblxuICAgIGNvbnN0IGFscGhhRGVjaW1hbCA9IGdldE1hcCh2cE1pbiwgdnBNYXgsIGF0dHJpYnV0ZVJhdGlvKTtcblxuICAgIC8vY29uc29sZS5sb2coXCJhbHBoYURlY2ltYWwgPSBcIiArIGFscGhhRGVjaW1hbCk7XG4gICAgcmV0dXJuIGFscGhhVG9JbnQoYWxwaGFEZWNpbWFsKTtcbn1cblxuY29uc3QgY29udGludW91c1Byb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfV0lEVEgnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlV2lkdGgsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTm9kZUhlaWdodCwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NBbHBoYSwgY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvciwgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhLCBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbEZvbnRTaXplLCBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMud2lkdGgsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhLCBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yLCBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbENvbG9yLCBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEsIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsRm9udFNpemUsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNJblJhbmdlKGF0dHJpYnV0ZVZhbHVlLCBtaW4sIG1heCwgaW5jbHVkZU1pbiwgaW5jbHVkZU1heCkge1xuICAgIGNvbnN0IG1pblNhdGlzZmllZCA9IG1pbiAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gKGluY2x1ZGVNaW4gPyBtaW4gPD0gYXR0cmlidXRlVmFsdWUgOiBtaW4gPCBhdHRyaWJ1dGVWYWx1ZSlcbiAgICAgICAgOiB0cnVlO1xuICAgIGNvbnN0IG1heFNhdGlzZmllZCA9IG1heCAhPSB1bmRlZmluZWRcbiAgICAgICAgPyAoaW5jbHVkZU1heCA/IG1heCA+PSBhdHRyaWJ1dGVWYWx1ZSA6IG1heCA+IGF0dHJpYnV0ZVZhbHVlKVxuICAgICAgICA6IHRydWU7XG4gICAgLy9jb25zb2xlLmxvZygnaXNJblJhbmdlOiAnICsgYXR0cmlidXRlVmFsdWUgKyAnICcgKyBtaW4gKyAnICcgKyBtYXggKyAnICcgKyBpbmNsdWRlTWluICsgJyAnICsgaW5jbHVkZU1heCArICcgJyArIG1pblNhdGlzZmllZCArICcgJyArIG1heFNhdGlzZmllZCk7XG4gICAgcmV0dXJuIG1pblNhdGlzZmllZCAmJiBtYXhTYXRpc2ZpZWQ7XG59XG5cbmZ1bmN0aW9uIGdldE1hcHBlZFZhbHVlcyhtYXBwaW5ncywgZW50aXR5VHlwZSwgYXR0cmlidXRlcykge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHJpYnV0ZUtleSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZVZhbHVlID0gYXR0cmlidXRlc1thdHRyaWJ1dGVLZXldO1xuICAgICAgICBpZiAobWFwcGluZ3NbZW50aXR5VHlwZV1bYXR0cmlidXRlS2V5XSkge1xuICAgICAgICAgICAgbWFwcGluZ3NbZW50aXR5VHlwZV1bYXR0cmlidXRlS2V5XS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgIChtYXBwaW5nKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcHBpbmcudHlwZSA9PT0gJ0RJU0NSRVRFJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzY3JldGVNYXAgPSBtYXBwaW5nLmRlZmluaXRpb24ubWFwO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncHJvY2Vzc2luZyBkaXNjcmV0ZSBtYXA6JyArIGVudGl0eVR5cGUgKyAnIG1hcHBpbmcudnA9JyArIG1hcHBpbmcudnAgKyAnICcgKyBhdHRyaWJ1dGVLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzY3JldGVNYXAuZm9yRWFjaChrZXlWYWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleVZhbHVlLnYgPT0gYXR0cmlidXRlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnXFx0a2V5VmFsdWUudj0nICsga2V5VmFsdWUudiArICcgJyArIGF0dHJpYnV0ZVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0oa2V5VmFsdWUudnApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnXFx0Y29udmVydGVkICcgKyBKU09OLnN0cmluZ2lmeShjb252ZXJ0ZWQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIGNvbnZlcnRlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXBwaW5nLnR5cGUgPT09ICdQQVNTVEhST1VHSCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udmVydGVkID0gZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXShhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIGNvbnZlcnRlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWFwcGluZy50eXBlID09PSAnQ09OVElOVU9VUycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRpbnVvdXNNYXBwaW5ncyA9IG1hcHBpbmcuZGVmaW5pdGlvbi5tYXA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51b3VzTWFwcGluZ3MuZm9yRWFjaChtYXBwaW5nUmFuZ2UgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW5SYW5nZShhdHRyaWJ1dGVWYWx1ZSwgbWFwcGluZ1JhbmdlLm1pbiwgbWFwcGluZ1JhbmdlLm1heCwgbWFwcGluZ1JhbmdlLmluY2x1ZGVNaW4sIG1hcHBpbmdSYW5nZS5pbmNsdWRlTWF4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBjb250aW51b3VzUHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGNvbnRpbnVvdXNQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0oYXR0cmlidXRlVmFsdWUsIG1hcHBpbmdSYW5nZS5taW4sIG1hcHBpbmdSYW5nZS5tYXgsIG1hcHBpbmdSYW5nZS5taW5WUFZhbHVlLCBtYXBwaW5nUmFuZ2UubWF4VlBWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0LCBjb252ZXJ0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGxudkNvbnZlcnQoY3gpIHtcblxuICAgIC8vRmlyc3QgcGFzcy4gXG4gICAgLy8gV2UgbmVlZCB0byBjb2xsZWN0IG9iamVjdCBhdHRyaWJ1dGVzIHRvIGNhbGN1bGF0ZVxuICAgIC8vIG1hcHBpbmdzIGluIHRoZSBzZWNvbmQgcGFzcy4gXG5cbiAgICBsZXQgY3hWaXN1YWxQcm9wZXJ0aWVzID0gdW5kZWZpbmVkO1xuICAgIGxldCBjeE5vZGVCeXBhc3NlcyA9IFtdO1xuICAgIGxldCBjeEVkZ2VCeXBhc3NlcyA9IFtdO1xuXG4gICAgbGV0IG5vZGVBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgIGxldCBub2RlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcbiAgICBsZXQgZWRnZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICBsZXQgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcbiAgICBsZXQgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgIGxldCBkZWZhdWx0VmFsdWVzID0gdW5kZWZpbmVkO1xuICAgIGxldCBtYXBwaW5ncyA9IHtcbiAgICAgICAgbm9kZToge30sXG4gICAgICAgIGVkZ2U6IHt9XG4gICAgfVxuICAgIGxldCBieXBhc3NNYXBwaW5ncyA9IHtcbiAgICAgICAgJ25vZGUnOiB7fSxcbiAgICAgICAgJ2VkZ2UnOiB7fVxuICAgIH07XG5cbiAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICBpZiAoY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyA9IGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXTtcbiAgICAgICAgICAgIGN4VXRpbC5wcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zKGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLFxuICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAsXG4gICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhub2RlQXR0cmlidXRlVHlwZU1hcCwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4Tm9kZVsndiddKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcbiAgICAgICAgICAgIGN4RWRnZXMuZm9yRWFjaCgoY3hFZGdlKSA9PiB7XG4gICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEVkZ2VbJ3YnXSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ10pIHtcbiAgICAgICAgICAgIGN4VmlzdWFsUHJvcGVydGllcyA9IGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ107XG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVCeXBhc3NlcyddKSB7XG4gICAgICAgICAgICBjeEFzcGVjdC5ub2RlQnlwYXNzZXMuZm9yRWFjaChieXBhc3MgPT4ge1xuICAgICAgICAgICAgICAgIGN4Tm9kZUJ5cGFzc2VzLnB1c2goYnlwYXNzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlQnlwYXNzZXMnXSkge1xuICAgICAgICAgICAgY3hBc3BlY3QuZWRnZUJ5cGFzc2VzLmZvckVhY2goYnlwYXNzID0+IHtcbiAgICAgICAgICAgICAgICBjeEVkZ2VCeXBhc3Nlcy5wdXNoKGJ5cGFzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IG91dHB1dCA9IHt9O1xuXG4gICAgbGV0IG5vZGVWaWV3cyA9IFtdO1xuICAgIGxldCBlZGdlVmlld3MgPSBbXTtcblxuICAgIGN4VmlzdWFsUHJvcGVydGllcyAmJiBjeFZpc3VhbFByb3BlcnRpZXMuZm9yRWFjaCh2cEVsZW1lbnQgPT4ge1xuXG4gICAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZXMgPSB2cEVsZW1lbnQuZGVmYXVsdDtcblxuICAgICAgICBkZWZhdWx0VmFsdWVzID0gZ2V0RGVmYXVsdFZhbHVlcyhkZWZhdWx0U3R5bGVzKTtcblxuICAgICAgICBtYXBwaW5ncy5ub2RlID0gdnBFbGVtZW50Lm5vZGVNYXBwaW5nID8gZ2V0TWFwcGluZ3ModnBFbGVtZW50Lm5vZGVNYXBwaW5nKSA6IHt9O1xuICAgICAgICBtYXBwaW5ncy5lZGdlID0gdnBFbGVtZW50LmVkZ2VNYXBwaW5nID8gZ2V0TWFwcGluZ3ModnBFbGVtZW50LmVkZ2VNYXBwaW5nKSA6IHt9O1xuXG5cbiAgICB9KTtcblxuICAgIGN4Tm9kZUJ5cGFzc2VzICYmIGN4Tm9kZUJ5cGFzc2VzLmZvckVhY2goKHZwRWxlbWVudCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGtleSA9IHZwRWxlbWVudFtjeENvbnN0YW50cy5JRF0udG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gZ2V0TE5WVmFsdWVzKCdub2RlJywgdnBFbGVtZW50LnYpXG5cbiAgICAgICAgaWYgKCFieXBhc3NNYXBwaW5ncy5ub2RlW2tleV0pIHtcbiAgICAgICAgICAgIGJ5cGFzc01hcHBpbmdzLm5vZGVba2V5XSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnYnlwYXNzIGNhbGN1bGF0ZWQ6ICcgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZXMsIG51bGwsIDIpKTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKGJ5cGFzc01hcHBpbmdzLm5vZGVba2V5XSwgdmFsdWVzKTtcbiAgICAgICAgLy9ieXBhc3NDU1NFbnRyaWVzLnB1c2goZ2V0QnlwYXNzQ1NTRW50cnkoJ25vZGUnLCB2cEVsZW1lbnQpKTtcbiAgICB9KTtcblxuICAgIGN4RWRnZUJ5cGFzc2VzICYmIGN4RWRnZUJ5cGFzc2VzLmZvckVhY2goKHZwRWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSB2cEVsZW1lbnRbY3hDb25zdGFudHMuSURdLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGdldExOVlZhbHVlcygnZWRnZScsIHZwRWxlbWVudC52KVxuXG4gICAgICAgIGlmICghYnlwYXNzTWFwcGluZ3MuZWRnZVtrZXldKSB7XG4gICAgICAgICAgICBieXBhc3NNYXBwaW5ncy5lZGdlW2tleV0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2J5cGFzcyBjYWxjdWxhdGVkOiAnICsgSlNPTi5zdHJpbmdpZnkodmFsdWVzLCBudWxsLCAyKSk7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihieXBhc3NNYXBwaW5ncy5lZGdlW2tleV0sIHZhbHVlcyk7XG4gICAgfVxuICAgICk7XG5cbiAgICAvL2NvbnNvbGUubG9nKCdtYXBwaW5nczogJyArIEpTT04uc3RyaW5naWZ5KG1hcHBpbmdzLCBudWxsLCAyKSk7XG5cbiAgICAvL1NlY29uZCBwYXNzLiBcbiAgICAvLyBIZXJlIGlzIHdoZXJlIHRoZSBhY3R1YWwgb3V0cHV0IGlzIGdlbmVyYXRlZC5cblxuICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuXG5cbiAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hJZCA9IGN4Tm9kZVtjeENvbnN0YW50cy5JRF0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZVZpZXcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBjeElkLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogY3hOb2RlWyd6J10gP1xuICAgICAgICAgICAgICAgICAgICAgICAgW2N4Tm9kZVsneCddLCBjeE5vZGVbJ3knXSwgY3hOb2RlWyd6J11dXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFtjeE5vZGVbJ3gnXSwgY3hOb2RlWyd5J11dXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9UT0RPIGNhbGN1bGF0ZSBsbnYgdnBzIGJhc2VkIG9uIGRlZmF1bHRzIGFuZCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdE5vZGVWaXN1YWxQcm9wZXJ0aWVzID0gZGVmYXVsdFZhbHVlc1snbm9kZSddO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG5vZGVWaWV3LCBkZWZhdWx0Tm9kZVZpc3VhbFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0Fzc2lnbiBtYXBwaW5nc1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkQXR0cmlidXRlcyA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hOb2RlWyd2J10sIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBwaW5nVmFsdWVzID0gZ2V0TWFwcGVkVmFsdWVzKG1hcHBpbmdzLCAnbm9kZScsIGV4cGFuZGVkQXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlVmlldywgbWFwcGluZ1ZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICAvL0Fzc2lnbiBieXBhc3NcbiAgICAgICAgICAgICAgICBpZiAoYnlwYXNzTWFwcGluZ3Mubm9kZVtjeElkXSkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG5vZGVWaWV3LCBieXBhc3NNYXBwaW5ncy5ub2RlW2N4SWRdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWROb2RlVmlldyA9IHByb2Nlc3NOb2RlVmlldyhub2RlVmlldyk7XG5cbiAgICAgICAgICAgICAgICBub2RlVmlld3MucHVzaChwcm9jZXNzZWROb2RlVmlldyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG5cbiAgICAgICAgICAgIGN4RWRnZXMuZm9yRWFjaCgoY3hFZGdlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hJZCA9IGN4RWRnZVtjeENvbnN0YW50cy5JRF0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlZGdlVmlldyA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGN4SWQsXG4gICAgICAgICAgICAgICAgICAgIHM6IGN4RWRnZS5zLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHQ6IGN4RWRnZS50LnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL1RPRE8gY2FsY3VsYXRlIGxudiB2cHMgYmFzZWQgb24gZGVmYXVsdHMgYW5kIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0RWRnZVZpc3VhbFByb3BlcnRpZXMgPSBkZWZhdWx0VmFsdWVzWydlZGdlJ107XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWRnZVZpZXcsIGRlZmF1bHRFZGdlVmlzdWFsUHJvcGVydGllcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZXhwYW5kZWRBdHRyaWJ1dGVzID0gY3hVdGlsLmdldEV4cGFuZGVkQXR0cmlidXRlcyhjeEVkZ2VbJ3YnXSwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBpbmdWYWx1ZXMgPSBnZXRNYXBwZWRWYWx1ZXMobWFwcGluZ3MsICdlZGdlJywgZXhwYW5kZWRBdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBtYXBwaW5nVmFsdWVzKTtcbiAgICAgICAgICAgICAgICAvL0Fzc2lnbiBieXBhc3NcbiAgICAgICAgICAgICAgICBpZiAoYnlwYXNzTWFwcGluZ3MuZWRnZVtjeElkXSkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVkZ2VWaWV3LCBieXBhc3NNYXBwaW5ncy5lZGdlW2N4SWRdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRFZGdlVmlldyA9IHByb2Nlc3NFZGdlVmlldyhlZGdlVmlldyk7XG5cbiAgICAgICAgICAgICAgICBlZGdlVmlld3MucHVzaChwcm9jZXNzZWRFZGdlVmlldyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5ub2RlVmlld3NdID0gbm9kZVZpZXdzO1xuICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuZWRnZVZpZXdzXSA9IGVkZ2VWaWV3cztcblxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IGNvbnZlcnRlciA9IHtcbiAgICB0YXJnZXRGb3JtYXQ6ICdsbnYnLFxuICAgIGVtcHR5TmV0d29yazogeyBcIm5vZGVWaWV3c1wiOiBbXSwgXCJlZGdlVmlld3NcIjogW10gfSxcbiAgICBjb252ZXJ0OiAoY3gpID0+IHtcbiAgICAgICAgcmV0dXJuIGxudkNvbnZlcnQoY3gpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydDogc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCxcbiAgICBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0OiBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0LFxuICAgIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydDogY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0LFxuICAgIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydDogY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0LFxuICAgIHByb2Nlc3NOb2RlVmlldzogcHJvY2Vzc05vZGVWaWV3LFxuICAgIHByb2Nlc3NFZGdlVmlldzogcHJvY2Vzc0VkZ2VWaWV3LFxuICAgIGdldERlZmF1bHRWYWx1ZXM6IGdldERlZmF1bHRWYWx1ZXMsXG4gICAgZ2V0QXR0cmlidXRlUmF0aW86IGdldEF0dHJpYnV0ZVJhdGlvLFxuICAgIGlzSW5SYW5nZTogaXNJblJhbmdlLFxuICAgIGNvbnZlcnRlcjogY29udmVydGVyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrLmpzIiwiXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICAgICdub2RlVmlld3MnOiAnbm9kZVZpZXdzJyxcbiAgICAnZWRnZVZpZXdzJzogJ2VkZ2VWaWV3cycsIFxuICAgICdpZCc6ICdpZCcsXG4gICAgJ3Bvc2l0aW9uJzogJ3Bvc2l0aW9uJyxcbiAgICAncyc6ICdzJyxcbiAgICAndCc6ICd0JyxcbiAgICAnbGFiZWwnOiAnbGFiZWwnLCBcbiAgICAnbGFiZWxDb2xvcicgOiAnbGFiZWxDb2xvcicsXG4gICAgJ2xhYmVsRm9udFNpemUnIDogJ2xhYmVsRm9udFNpemUnLFxuICAgICdjb2xvcic6ICdjb2xvcicsXG4gICAgJ3NpemUnIDogJ3NpemUnLFxuICAgICd3aWR0aCcgOiAnd2lkdGgnLFxuXG4gICAgJ3ByZXByb2Nlc3NDb2xvcic6ICdwcmVwcm9jZXNzQ29sb3InLFxuICAgICdwcmVwcm9jZXNzQWxwaGEnOiAncHJlcHJvY2Vzc0FscGhhJyxcbiAgICAncHJlcHJvY2Vzc0xhYmVsQ29sb3InOiAncHJlcHJvY2Vzc0xhYmVsQ29sb3InLFxuICAgICdwcmVwcm9jZXNzTGFiZWxBbHBoYSc6ICdwcmVwcm9jZXNzTGFiZWxBbHBoYScsXG4gICAgJ3ByZXByb2Nlc3NOb2RlV2lkdGgnIDogJ3ByZXByb2Nlc3NOb2RlV2lkdGgnLFxuICAgICdwcmVwcm9jZXNzTm9kZUhlaWdodCcgOiAncHJlcHJvY2Vzc05vZGVIZWlnaHQnXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIlxuY29uc3QgY3hDb25zdGFudHMgPSByZXF1aXJlKCcuLi9jeENvbnN0YW50cy5qcycpO1xuY29uc3QganNDb25zdGFudHMgPSByZXF1aXJlKCcuL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSkge1xuICAgIGNvbnN0IHRhcmdldFN0eWxlRW50cnkgPSBuZXcgTWFwKCk7XG4gICAgdGFyZ2V0U3R5bGVFbnRyeS5zZXQodGFyZ2V0U3R5bGVGaWVsZCwgcG9ydGFibGVQcm9wZXJ0VmFsdWUpO1xuICAgIHJldHVybiB0YXJnZXRTdHlsZUVudHJ5O1xufVxuXG5jb25zdCBkZWZhdWx0UHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9TSEFQRSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuc2hhcGUsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5oZWlnaHQsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfY29sb3IsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUxfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUxfRk9OVF9TSVpFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLm9wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdFREdFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGluZV9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfRk9OVF9TSVpFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9LFxufVxuXG5mdW5jdGlvbiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIGF0dHJpYnV0ZU5hbWUpIHtcbiAgICBjb25zdCBvdXRwdXQgPSB7fTtcbiAgICBvdXRwdXRbdGFyZ2V0U3R5bGVGaWVsZF0gPSAnZGF0YSgnICsgYXR0cmlidXRlTmFtZSArICcpJztcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9TSEFQRSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLnNoYXBlLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfV0lEVEgnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgYXR0cmlidXRlTmFtZSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLm9wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGluZV9jb2xvciwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xBQkVMJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIGF0dHJpYnV0ZU5hbWUpXG4gICAgfSxcbn1cbmZ1bmN0aW9uIHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgaWYgKG1pblZhbHVlICE9IHVuZGVmaW5lZCAmJiBtYXhWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgb3V0cHV0W3RhcmdldFN0eWxlRmllbGRdID0gJ21hcERhdGEoJyArIGF0dHJpYnV0ZU5hbWVcbiAgICAgICAgKyAnLCAnICsgbWluVmFsdWVcbiAgICAgICAgKyAnLCAnICsgbWF4VmFsdWVcbiAgICAgICAgKyAnLCAnICsgbWluVlBcbiAgICAgICAgKyAnLCAnICsgbWF4VlBcbiAgICAgICAgKyAnKSc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1pblZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9IG1heFZQO1xuICAgICAgICB9IGVsc2UgaWYgKG1heFZhbHVlID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3V0cHV0W3RhcmdldFN0eWxlRmllbGRdID0gbWluVlA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgbWFwRGF0YVByb3BlcnR5Q29udmVydCA9IHtcbiAgICAnbm9kZSc6IHtcbiAgICAgICAgJ05PREVfU0hBUEUnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuc2hhcGUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfV0lEVEgnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9MQUJFTCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9MQUJFTF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ05PREVfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApXG5cbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLm9wYWNpdHksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTElORV9DT0xPUic6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xBQkVMJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUClcbiAgICB9LFxufVxuXG5cbmZ1bmN0aW9uIGdldENTU1N0eWxlRW50cmllcyhjeFN0eWxlRW50cmllcywgZW50aXR5VHlwZSkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhjeFN0eWxlRW50cmllcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGN4U3R5bGVFbnRyaWVzW2tleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW2tleV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGNzc0VudHJpZXMgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW2tleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIGNzc0VudHJpZXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIG91dHB1dFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldElkU2VsZWN0b3IoaWQsIGVsZW1lbnRUeXBlKSB7XG4gICAgLy9ub2RlI2lkIG9yIGVkZ2UjaWRcbiAgICByZXR1cm4gZWxlbWVudFR5cGUgKyAnIycgKyBpZDtcbn1cblxuXG5cbmZ1bmN0aW9uIGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKSB7XG4gICAgcmV0dXJuIHsgJ3NlbGVjdG9yJzogc2VsZWN0b3IsICdzdHlsZSc6IGNzcyB9O1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBpbmNsdWRlTWluLCBpbmNsdWRlTWF4KSB7XG4gICAgY29uc3QgbWluQ29uZGl0aW9uID0gaW5jbHVkZU1pbiA/ICc+PScgOiAnPic7XG4gICAgY29uc3QgbWF4Q29uZGl0aW9uID0gaW5jbHVkZU1heCA/ICc8PScgOiAnPCc7XG4gICAgY29uc3QgbWluQm91bmQgPSAobWluVmFsdWUgIT09IHVuZGVmaW5lZCkgPyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyAnICsgbWluQ29uZGl0aW9uICsgJyAnICsgbWluVmFsdWUgKyAnXScgOiAnJztcbiAgICBjb25zdCBtYXhCb3VuZCA9IChtYXhWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/ICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnICcgKyBtYXhDb25kaXRpb24gKyAnICcgKyBtYXhWYWx1ZSArICddJyA6ICcnO1xuICAgIHJldHVybiBlbnRpdHlUeXBlICsgbWluQm91bmQgKyBtYXhCb3VuZDtcbn1cblxuZnVuY3Rpb24gZ2V0Q29udGludW91c1N0eWxlKGVudGl0eVR5cGUsIHBvcnRhYmxlUHJvcGVydHlLZXksIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSB7XG4gICAgaWYgKG1hcERhdGFQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgcmV0dXJuIG1hcERhdGFQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApO1xuICAgIH1cbiAgICByZXR1cm4ge307XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cmllcyhwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydhdHRyaWJ1dGUnXTtcbiAgICBjb25zdCByYW5nZU1hcHMgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydtYXAnXTtcbiAgICAvL2NvbnNvbGUubG9nKCdjb250aW51b3VzIG1hcHBpbmcgZm9yICcgKyBhdHRyaWJ1dGVOYW1lICsgJzogJyArIEpTT04uc3RyaW5naWZ5KHJhbmdlTWFwcywgbnVsbCwgMikpO1xuXG4gICAgcmFuZ2VNYXBzLmZvckVhY2goKHJhbmdlKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0Q29udGludW91c1NlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIHJhbmdlLm1pbiwgcmFuZ2UubWF4LCByYW5nZS5pbmNsdWRlTWluLCByYW5nZS5pbmNsdWRlTWF4KTtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb250aW51b3VzU3R5bGUoZW50aXR5VHlwZSwgcG9ydGFibGVQcm9wZXJ0eUtleSwgYXR0cmlidXRlTmFtZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIHJhbmdlLm1pblZQVmFsdWUsIHJhbmdlLm1heFZQVmFsdWUpO1xuXG4gICAgICAgIG91dHB1dC5wdXNoKGdldFN0eWxlRWxlbWVudChzZWxlY3Rvciwgc3R5bGUpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRQYXNzdGhyb3VnaE1hcHBpbmdDU1NFbnRyeShwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlKSB7XG4gICAgaWYgKHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0pIHtcbiAgICAgICAgY29uc3QgY3NzID0gcGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShjeE1hcHBpbmdEZWZpbml0aW9uLmF0dHJpYnV0ZSk7XG4gICAgICAgIHJldHVybiBnZXRTdHlsZUVsZW1lbnQoZW50aXR5VHlwZSwgY3NzKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldERpc2NyZXRlU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGF0YVR5cGUsIGF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgaWYgKGF0dHJpYnV0ZURhdGFUeXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1snICsgYXR0cmlidXRlTmFtZSArICcgPSBcXCcnICsgYXR0cmlidXRlVmFsdWUgKyAnXFwnXSc7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVEYXRhVHlwZSA9PSAnYm9vbGVhbicpIHtcblxuICAgICAgICBpZiAoYXR0cmlidXRlVmFsdWUgPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbPycgKyBhdHRyaWJ1dGVOYW1lICsgJ10nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJ11bIScgKyBhdHRyaWJ1dGVOYW1lICsgJ10nO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyA9ICcgKyBhdHRyaWJ1dGVWYWx1ZSArICddJztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldERpc2NyZXRlTWFwcGluZ0NTU0VudHJpZXMocG9ydGFibGVQcm9wZXJ0eUtleSwgY3hNYXBwaW5nRGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICBjb25zdCBhdHR0cmlidXRlVG9WYWx1ZU1hcCA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ21hcCddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBjeE1hcHBpbmdEZWZpbml0aW9uWydhdHRyaWJ1dGUnXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVEYXRhVHlwZSA9IGF0dHJpYnV0ZVR5cGVNYXAuZ2V0KGF0dHJpYnV0ZU5hbWUpO1xuICAgIGF0dHRyaWJ1dGVUb1ZhbHVlTWFwLmZvckVhY2goKGRpc2NyZXRlTWFwKSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJyBkaXNjcmV0ZSBtYXAgZm9yICcgKyBwb3J0YWJsZVByb3BlcnR5S2V5ICsgJzogJyArIGRpc2NyZXRlTWFwLnYgKyAnICgnICsgYXR0cmlidXRlTmFtZSArICc8JyArIGF0dHJpYnV0ZURhdGFUeXBlICsgJz4pIC0+ICcgKyBkaXNjcmV0ZU1hcC52cCk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXREaXNjcmV0ZVNlbGVjdG9yKGVudGl0eVR5cGUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURhdGFUeXBlLCBkaXNjcmV0ZU1hcC52KTtcblxuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGRpc2NyZXRlTWFwLnZwKTtcbiAgICAgICAgICAgIGNvbnN0IGNzcyA9IHt9O1xuICAgICAgICAgICAgc3R5bGVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGNzc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcgICBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGNzcykpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIHJldHVybiBvdXRwdXQ7IC8vZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpO1xufVxuXG5mdW5jdGlvbiBnZXRCeXBhc3NDU1NFbnRyeShlbnRpdHlUeXBlLCBjeEVsZW1lbnQpIHtcblxuICAgIGNvbnN0IGlkID0gY3hFbGVtZW50LmlkO1xuICAgIGNvbnN0IGNzcyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4RWxlbWVudC52KS5mb3JFYWNoKChwb3J0YWJsZVByb3BlcnR5S2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGN4RWxlbWVudC52W3BvcnRhYmxlUHJvcGVydHlLZXldO1xuICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSk7XG4gICAgICAgICAgICBzdHlsZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY3NzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWxlY3RvciA9IGdldElkU2VsZWN0b3IoaWQsIGVudGl0eVR5cGUpO1xuICAgIHJldHVybiBnZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcyk7XG59XG5cbi8qKiBcbiAqIFxuKi9cbmZ1bmN0aW9uIGdldENTU01hcHBpbmdFbnRyaWVzKFxuICAgIGN4TWFwcGluZ0VudHJpZXMsXG4gICAgZW50aXR5VHlwZSxcbiAgICBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIGN4TWFwcGluZ0VudHJpZXMgJiYgT2JqZWN0LmtleXMoY3hNYXBwaW5nRW50cmllcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IGN4TWFwcGluZ0VudHJ5ID0gY3hNYXBwaW5nRW50cmllc1trZXldO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiIG1hcHBpbmcgdHlwZTogXCIgKyBjeE1hcHBpbmdFbnRyeS50eXBlKTtcbiAgICAgICAgc3dpdGNoIChjeE1hcHBpbmdFbnRyeS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdDT05USU5VT1VTJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRpbm91c01hcHBpbmdzID0gZ2V0Q29udGludW91c01hcHBpbmdDU1NFbnRyaWVzKGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSwgYXR0cmlidXRlVHlwZU1hcCk7XG4gICAgICAgICAgICAgICAgY29udGlub3VzTWFwcGluZ3MuZm9yRWFjaCgoY29udGlub3VzTWFwcGluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChjb250aW5vdXNNYXBwaW5nKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnUEFTU1RIUk9VR0gnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3NzRW50cnkgPSBnZXRQYXNzdGhyb3VnaE1hcHBpbmdDU1NFbnRyeShrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUpO1xuICAgICAgICAgICAgICAgIGlmIChjc3NFbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChjc3NFbnRyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnRElTQ1JFVEUnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzY3JldGVNYXBwaW5ncyA9IGdldERpc2NyZXRlTWFwcGluZ0NTU0VudHJpZXMoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKTtcbiAgICAgICAgICAgICAgICBkaXNjcmV0ZU1hcHBpbmdzLmZvckVhY2goKGRpc2NyZXRlTWFwcGluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChkaXNjcmV0ZU1hcHBpbmcpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBOT0RFX1NFTEVDVE9SID0gJ25vZGUnO1xuY29uc3QgRURHRV9TRUxFQ1RPUiA9ICdlZGdlJztcblxuZnVuY3Rpb24gZ2V0VmlzdWFsUHJvcGVydGllcyhjeFZpc3VhbFByb3BlcnRpZXMsIGN4Tm9kZUJ5cGFzc2VzLCBjeEVkZ2VCeXBhc3Nlcywgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgc3R5bGU6IFtdLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGxldCBkZWZhdWx0Q1NTTm9kZVN0eWxlID0gdW5kZWZpbmVkO1xuICAgIGxldCBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgbWFwcGluZ0NTU05vZGVTdHlsZSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbWFwcGluZ0NTU0VkZ2VTdHlsZSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBieXBhc3NDU1NFbnRyaWVzID0gW107XG5cbiAgICBjeFZpc3VhbFByb3BlcnRpZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZXMgPSB2cEVsZW1lbnQuZGVmYXVsdDtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKCdkZWZhdWx0IHN0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkoZGVmYXVsdFN0eWxlcykpO1xuICAgICAgICBkZWZhdWx0Q1NTTm9kZVN0eWxlID0gZ2V0Q1NTU3R5bGVFbnRyaWVzKGRlZmF1bHRTdHlsZXMubm9kZSwgJ25vZGUnKTtcbiAgICAgICAgZGVmYXVsdENTU0VkZ2VTdHlsZSA9IGdldENTU1N0eWxlRW50cmllcyhkZWZhdWx0U3R5bGVzLmVkZ2UsICdlZGdlJyk7XG5cbiAgICAgICAgY3NzTmV0d29ya0JhY2tncm91bmRDb2xvciA9IGRlZmF1bHRTdHlsZXMubmV0d29ya1snYmFja2dyb3VuZC1jb2xvciddO1xuXG4gICAgICAgIGNvbnN0IG5vZGVNYXBwaW5nID0gdnBFbGVtZW50Lm5vZGVNYXBwaW5nO1xuICAgICAgICBtYXBwaW5nQ1NTTm9kZVN0eWxlID0gZ2V0Q1NTTWFwcGluZ0VudHJpZXMobm9kZU1hcHBpbmcsICdub2RlJywgbm9kZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgIGNvbnN0IGVkZ2VNYXBwaW5nID0gdnBFbGVtZW50LmVkZ2VNYXBwaW5nO1xuICAgICAgICBtYXBwaW5nQ1NTRWRnZVN0eWxlID0gZ2V0Q1NTTWFwcGluZ0VudHJpZXMoZWRnZU1hcHBpbmcsICdlZGdlJywgZWRnZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgfSlcblxuICAgIGN4Tm9kZUJ5cGFzc2VzLmZvckVhY2goKHZwRWxlbWVudCkgPT4ge1xuICAgICAgICBieXBhc3NDU1NFbnRyaWVzLnB1c2goZ2V0QnlwYXNzQ1NTRW50cnkoJ25vZGUnLCB2cEVsZW1lbnQpKTtcbiAgICB9KTtcblxuICAgIGN4RWRnZUJ5cGFzc2VzLmZvckVhY2goKHZwRWxlbWVudCkgPT4ge1xuICAgICAgICBieXBhc3NDU1NFbnRyaWVzLnB1c2goZ2V0QnlwYXNzQ1NTRW50cnkoJ2VkZ2UnLCB2cEVsZW1lbnQpKTtcbiAgICB9KTtcblxuICAgIC8vY29uc29sZS5sb2coJ2RlZmF1bHQgbm9kZSBzdHlsZTogJyArIEpTT04uc3RyaW5naWZ5KGRlZmF1bHRDU1NOb2RlU3R5bGUpKTtcblxuICAgIC8vQWRkIGRlZmF1bHQgc3R5bGVcbiAgICBvdXRwdXQuc3R5bGUucHVzaChnZXRTdHlsZUVsZW1lbnQoTk9ERV9TRUxFQ1RPUiwgZGVmYXVsdENTU05vZGVTdHlsZSkpO1xuICAgIG91dHB1dC5zdHlsZS5wdXNoKGdldFN0eWxlRWxlbWVudChFREdFX1NFTEVDVE9SLCBkZWZhdWx0Q1NTRWRnZVN0eWxlKSk7XG5cbiAgICBvdXRwdXQuc3R5bGUucHVzaC5hcHBseShvdXRwdXQuc3R5bGUsIG1hcHBpbmdDU1NOb2RlU3R5bGUpO1xuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgbWFwcGluZ0NTU0VkZ2VTdHlsZSk7XG5cbiAgICBvdXRwdXQuc3R5bGUucHVzaC5hcHBseShvdXRwdXQuc3R5bGUsIGJ5cGFzc0NTU0VudHJpZXMpO1xuXG4gICAgb3V0cHV0WydiYWNrZ3JvdW5kLWNvbG9yJ10gPSBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgY29udmVydGVyID0ge1xuICAgIHRhcmdldEZvcm1hdDogJ2N5dG9zY2FwZUpTJyxcbiAgICBlbXB0eU5ldHdvcms6IHtcbiAgICAgICAgc3R5bGU6IFtdLFxuICAgICAgICBlbGVtZW50czoge30sXG4gICAgICAgIGxheW91dDoge30sXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogbnVsbFxuICAgIH0sXG4gICAgY29udmVydDogKGN4KSA9PiB7XG4gICAgICAgIGNvbnN0IG91dHB1dCA9IHtcbiAgICAgICAgICAgIHN0eWxlOiBbXSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiB7fSxcbiAgICAgICAgICAgIGxheW91dDoge30sXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBjeE5vZGVCeXBhc3NlcyA9IFtdO1xuICAgICAgICBsZXQgY3hFZGdlQnlwYXNzZXMgPSBbXTtcblxuICAgICAgICBsZXQgbm9kZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBlZGdlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBsZXQgbm9kZUF0dHJpYnV0ZU5hbWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBlZGdlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBsZXQgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyA9IGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgICAgICAgICAgICAgY3hVdGlsLnByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLFxuICAgICAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMobm9kZUF0dHJpYnV0ZVR5cGVNYXAsIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBjeE5vZGVbJ3YnXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuICAgICAgICAgICAgICAgIGN4RWRnZXMuZm9yRWFjaCgoY3hFZGdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hFZGdlWyd2J10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddKSB7XG4gICAgICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ25vZGVCeXBhc3NlcyddKSB7XG4gICAgICAgICAgICAgICAgY3hBc3BlY3Qubm9kZUJ5cGFzc2VzLmZvckVhY2goYnlwYXNzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hOb2RlQnlwYXNzZXMucHVzaChieXBhc3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZUJ5cGFzc2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjeEFzcGVjdC5lZGdlQnlwYXNzZXMuZm9yRWFjaChieXBhc3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjeEVkZ2VCeXBhc3Nlcy5wdXNoKGJ5cGFzcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLmZvckVhY2goKGluZmVycmVkVHlwZSwgYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnaW5mZXJyZWQgYXR0cmlidXRlIHR5cGUgZm9yIG5vZGU6ICcgKyBhdHRyaWJ1dGVOYW1lICsgJzogJyArIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLmZvckVhY2goKGluZmVycmVkVHlwZSwgYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnaW5mZXJyZWQgYXR0cmlidXRlIHR5cGUgZm9yIGVkZ2U6ICcgKyBhdHRyaWJ1dGVOYW1lICsgJzogJyArIGluZmVycmVkVHlwZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vQWRkIG5vZGVzXG4gICAgICAgIG91dHB1dC5lbGVtZW50c1snbm9kZXMnXSA9IFtdO1xuXG4gICAgICAgIC8vQWRkIGVkZ2VzXG4gICAgICAgIG91dHB1dC5lbGVtZW50c1snZWRnZXMnXSA9IFtdO1xuXG5cbiAgICAgICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hOb2RlWyd2J10sIG5vZGVBdHRyaWJ1dGVOYW1lTWFwLCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydpZCddID0gY3hOb2RlLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ3Bvc2l0aW9uJ10gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBjeE5vZGVbJ3gnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGN4Tm9kZVsneSddXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmVsZW1lbnRzLm5vZGVzLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ10gPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4RWRnZVsndiddLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnaWQnXSA9IGN4RWRnZS5pZC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ3NvdXJjZSddID0gY3hFZGdlWydzJ107XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsndGFyZ2V0J10gPSBjeEVkZ2VbJ3QnXTtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmVsZW1lbnRzLmVkZ2VzLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgY3hOb2RlQnlwYXNzZXMsIGN4RWRnZUJ5cGFzc2VzLCBub2RlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZVR5cGVNYXApO1xuXG4gICAgICAgIG91dHB1dC5zdHlsZSA9IHN0eWxlLnN0eWxlO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCd2aXN1YWxQcm9wZXJ0aWVzOiAnICsgSlNPTi5zdHJpbmdpZnkoY3hWaXN1YWxQcm9wZXJ0aWVzLCBudWxsLCAyKSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3N0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkob3V0cHV0LnN0eWxlLCBudWxsLCAyKSk7XG5cbiAgICAgICAgb3V0cHV0WydiYWNrZ3JvdW5kLWNvbG9yJ10gPSBzdHlsZVsnYmFja2dyb3VuZC1jb2xvciddO1xuXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0ZXI6IGNvbnZlcnRlclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgJ3NoYXBlJzogJ3NoYXBlJyxcbiAgICAnd2lkdGgnOiAnd2lkdGgnLCBcbiAgICAnaGVpZ2h0JzogJ2hlaWdodCcsXG4gICAgJ2JhY2tncm91bmRfY29sb3InOiAnYmFja2dyb3VuZC1jb2xvcicsXG4gICAgJ2JhY2tncm91bmRfb3BhY2l0eSc6ICdiYWNrZ3JvdW5kLW9wYWNpdHknLFxuICAgICdsYWJlbCc6ICdsYWJlbCcsXG4gICAgJ2xhYmVsX2NvbG9yJzogJ2NvbG9yJyxcbiAgICAnbGFiZWxfZm9udF9zaXplJyA6ICdmb250LXNpemUnLFxuICAgICdsYWJlbF9vcGFjaXR5JyA6ICd0ZXh0LW9wYWNpdHknLFxuICAgICdvcGFjaXR5JzogJ29wYWNpdHknLFxuICAgICdsaW5lX2NvbG9yJzogJ2xpbmUtY29sb3InXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlNDb25zdGFudHMuanMiXSwic291cmNlUm9vdCI6IiJ9