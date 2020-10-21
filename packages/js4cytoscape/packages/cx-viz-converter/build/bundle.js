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
                    if (mapping.definition.map) {
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
                    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1MGIwYTFiMDVkZmQ3NzEzNzJkNSIsIndlYnBhY2s6Ly8vLi9zcmMvY3hDb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N4VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29yay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFyZ2VOZXR3b3JrL2xhcmdlTmV0d29ya0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3l0b3NjYXBlSlMvY3l0b3NjYXBlSlMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJmcmVlemUiLCJDWF9WRVJTSU9OIiwiTk9ERSIsIkVER0UiLCJORVRXT1JLIiwiTk9ERVMiLCJFREdFUyIsIklEIiwiWCIsIlkiLCJaIiwiViIsIkFUIiwiTiIsIkUiLCJWSVNVQUxfUFJPUEVSVElFUyIsIkRFRkFVTFQiLCJTVFlMRSIsIlBPIiwiZ2V0Q3hWZXJzaW9uIiwidmVyc2lvblN0cmluZyIsInZlcnNpb25BcnJheSIsInNwbGl0IiwibWFwIiwibnVtYmVyU3RyaW5nIiwicGFyc2VJbnQiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXNOYU4iLCJlbGVtZW50IiwiZ2V0Q3hNYWpvclZlcnNpb24iLCJwcm9jZXNzQXR0cmlidXRlRGVjbGFyYXRpb25zIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJub2RlQXR0cmlidXRlTmFtZU1hcCIsIm5vZGVBdHRyaWJ1dGVUeXBlTWFwIiwibm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCIsImVkZ2VBdHRyaWJ1dGVOYW1lTWFwIiwiZWRnZUF0dHJpYnV0ZVR5cGVNYXAiLCJlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwiY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbiIsInVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAiLCJub2RlcyIsInVwZGF0ZUF0dHJpYnV0ZVR5cGVNYXAiLCJ1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAiLCJlZGdlcyIsImF0dHJpYnV0ZVR5cGVNYXAiLCJhdHRyaWJ1dGVEZWNsYXJhdGlvbnMiLCJrZXlzIiwiYXR0cmlidXRlTmFtZSIsImF0dHJpYnV0ZURlY2xhcmF0aW9uIiwic2V0IiwiZCIsImF0dHJpYnV0ZU5hbWVNYXAiLCJhIiwiYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwIiwidiIsInVwZGF0ZUluZmVycmVkVHlwZXMiLCJrZXkiLCJoYXMiLCJ2YWx1ZSIsImluZmVycmVkVHlwZSIsIm5ld0tleSIsImdldCIsImdldEV4cGFuZGVkQXR0cmlidXRlcyIsImRhdGEiLCJjb252ZXJ0ZXIiLCJyZXF1aXJlIiwiY29udmVydCIsImN4IiwidGFyZ2V0Rm9ybWF0IiwiY3hDb25zdGFudHMiLCJsYXJnZU5ldHdvcmsiLCJjeXRvc2NhcGVKUyIsImN4VXRpbCIsInZlcmlmeVZlcnNpb24iLCJmaXJzdEVsZW1lbnQiLCJtYWpvclZlcnNpb24iLCJkZWZhdWx0Q29udmVydGVycyIsInNlbGVjdENvbnZlcnRlciIsImNvbnZlcnRlcnMiLCJzZWxlY3RlZENvbnZlcnRlciIsInVuZGVmaW5lZCIsImdldEVtcHR5TmV0d29yayIsImVtcHR5TmV0d29yayIsImxhcmdlTmV0d29ya0NvbnN0YW50cyIsInNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQiLCJ0YXJnZXRTdHlsZUZpZWxkIiwicG9ydGFibGVQcm9wZXJ0VmFsdWUiLCJ0YXJnZXRTdHlsZUVudHJ5IiwiaGV4VG9SR0IiLCJoZXgiLCJyIiwiZyIsImIiLCJhbHBoYVRvSW50IiwiYWxwaGFEZWNpbWFsIiwiY2xhbXAiLCJNYXRoIiwicm91bmQiLCJkZWZhdWx0UHJvcGVydHlDb252ZXJ0IiwicG9ydGFibGVQcm9wZXJ0eVZhbHVlIiwicHJlcHJvY2Vzc05vZGVXaWR0aCIsInByZXByb2Nlc3NOb2RlSGVpZ2h0IiwicHJlcHJvY2Vzc0NvbG9yIiwicHJlcHJvY2Vzc0FscGhhIiwibGFiZWwiLCJwcmVwcm9jZXNzTGFiZWxDb2xvciIsInByZXByb2Nlc3NMYWJlbEFscGhhIiwibGFiZWxGb250U2l6ZSIsIndpZHRoIiwiZ2V0RGVmYXVsdFZhbHVlcyIsImRlZmF1bHRWaXN1YWxQcm9wZXJ0aWVzIiwib3V0cHV0Iiwibm9kZSIsImVkZ2UiLCJub2RlRGVmYXVsdCIsImxudkVudHJpZXMiLCJnZXRMTlZWYWx1ZXMiLCJhc3NpZ24iLCJlZGdlRGVmYXVsdCIsImVudGl0eVR5cGUiLCJlbnRyaWVzIiwicG9ydGFibGVQcm9wZXJ0eUtleSIsImxudkVudHJ5IiwibG52S2V5IiwicHJvY2Vzc0NvbG9yIiwiY29sb3JBcnJheSIsImFscGhhIiwicHJvY2Vzc1NpemUiLCJoZWlnaHQiLCJtYXgiLCJwcm9jZXNzTm9kZVZpZXciLCJub2RlVmlldyIsImxhYmVsQ29sb3JBcnJheSIsImxhYmVsQWxwaGEiLCJpZCIsInBvc2l0aW9uIiwiY29sb3IiLCJsYWJlbENvbG9yIiwic2l6ZSIsInByb2Nlc3NFZGdlVmlldyIsImVkZ2VWaWV3IiwicyIsInQiLCJnZXRNYXBwaW5ncyIsIm1hcHBpbmdzIiwibWFwcGluZyIsInByb3BlcnR5S2V5IiwibWFwcGluZ0xpc3QiLCJkZWZpbml0aW9uIiwiYXR0cmlidXRlIiwicHVzaCIsInR5cGUiLCJ2cCIsImdldEF0dHJpYnV0ZVJhdGlvIiwiYXR0cmlidXRlVmFsdWUiLCJhdHRyaWJ1dGVNaW4iLCJhdHRyaWJ1dGVNYXgiLCJnZXRNYXAiLCJ2cE1pbiIsInZwTWF4IiwiYXR0cmlidXRlUmF0aW8iLCJtaW4iLCJjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0IiwiY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0IiwibWluUkdCIiwibWF4UkdCIiwiY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0IiwiY29udGludW91c1Byb3BlcnR5Q29udmVydCIsImlzSW5SYW5nZSIsImluY2x1ZGVNaW4iLCJpbmNsdWRlTWF4IiwibWluU2F0aXNmaWVkIiwibWF4U2F0aXNmaWVkIiwiZ2V0TWFwcGVkVmFsdWVzIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZUtleSIsImRpc2NyZXRlTWFwIiwia2V5VmFsdWUiLCJjb252ZXJ0ZWQiLCJjb250aW51b3VzTWFwcGluZ3MiLCJtYXBwaW5nUmFuZ2UiLCJtaW5WUFZhbHVlIiwibWF4VlBWYWx1ZSIsImxudkNvbnZlcnQiLCJjeFZpc3VhbFByb3BlcnRpZXMiLCJjeE5vZGVCeXBhc3NlcyIsImN4RWRnZUJ5cGFzc2VzIiwiTWFwIiwiZGVmYXVsdFZhbHVlcyIsImJ5cGFzc01hcHBpbmdzIiwiY3hBc3BlY3QiLCJjeE5vZGVzIiwiY3hOb2RlIiwiY3hFZGdlcyIsImN4RWRnZSIsIm5vZGVCeXBhc3NlcyIsImJ5cGFzcyIsImVkZ2VCeXBhc3NlcyIsIm5vZGVWaWV3cyIsImVkZ2VWaWV3cyIsImRlZmF1bHRTdHlsZXMiLCJ2cEVsZW1lbnQiLCJkZWZhdWx0Iiwibm9kZU1hcHBpbmciLCJlZGdlTWFwcGluZyIsInRvU3RyaW5nIiwidmFsdWVzIiwiY3hJZCIsImRlZmF1bHROb2RlVmlzdWFsUHJvcGVydGllcyIsImV4cGFuZGVkQXR0cmlidXRlcyIsIm1hcHBpbmdWYWx1ZXMiLCJwcm9jZXNzZWROb2RlVmlldyIsImRlZmF1bHRFZGdlVmlzdWFsUHJvcGVydGllcyIsInByb2Nlc3NlZEVkZ2VWaWV3IiwianNDb25zdGFudHMiLCJzaGFwZSIsImJhY2tncm91bmRfY29sb3IiLCJiYWNrZ3JvdW5kX29wYWNpdHkiLCJsYWJlbF9jb2xvciIsImxhYmVsX29wYWNpdHkiLCJsYWJlbF9mb250X3NpemUiLCJvcGFjaXR5IiwibGluZV9jb2xvciIsInNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQiLCJwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0Iiwic2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydCIsIm1pblZhbHVlIiwibWF4VmFsdWUiLCJtaW5WUCIsIm1heFZQIiwibWFwRGF0YVByb3BlcnR5Q29udmVydCIsImdldENTU1N0eWxlRW50cmllcyIsImN4U3R5bGVFbnRyaWVzIiwiY3NzRW50cmllcyIsImdldElkU2VsZWN0b3IiLCJlbGVtZW50VHlwZSIsImdldFN0eWxlRWxlbWVudCIsInNlbGVjdG9yIiwiY3NzIiwiZ2V0Q29udGludW91c1NlbGVjdG9yIiwibWluQ29uZGl0aW9uIiwibWF4Q29uZGl0aW9uIiwibWluQm91bmQiLCJtYXhCb3VuZCIsImdldENvbnRpbnVvdXNTdHlsZSIsImdldENvbnRpbnVvdXNNYXBwaW5nQ1NTRW50cmllcyIsImN4TWFwcGluZ0RlZmluaXRpb24iLCJyYW5nZU1hcHMiLCJyYW5nZSIsInN0eWxlIiwiZ2V0UGFzc3Rocm91Z2hNYXBwaW5nQ1NTRW50cnkiLCJnZXREaXNjcmV0ZVNlbGVjdG9yIiwiYXR0cmlidXRlRGF0YVR5cGUiLCJnZXREaXNjcmV0ZU1hcHBpbmdDU1NFbnRyaWVzIiwiYXR0dHJpYnV0ZVRvVmFsdWVNYXAiLCJzdHlsZU1hcCIsImdldEJ5cGFzc0NTU0VudHJ5IiwiY3hFbGVtZW50IiwiZ2V0Q1NTTWFwcGluZ0VudHJpZXMiLCJjeE1hcHBpbmdFbnRyaWVzIiwiY3hNYXBwaW5nRW50cnkiLCJjb250aW5vdXNNYXBwaW5ncyIsImNvbnRpbm91c01hcHBpbmciLCJjc3NFbnRyeSIsImRpc2NyZXRlTWFwcGluZ3MiLCJkaXNjcmV0ZU1hcHBpbmciLCJOT0RFX1NFTEVDVE9SIiwiRURHRV9TRUxFQ1RPUiIsImdldFZpc3VhbFByb3BlcnRpZXMiLCJkZWZhdWx0Q1NTTm9kZVN0eWxlIiwiZGVmYXVsdENTU0VkZ2VTdHlsZSIsImNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3IiLCJtYXBwaW5nQ1NTTm9kZVN0eWxlIiwibWFwcGluZ0NTU0VkZ2VTdHlsZSIsImJ5cGFzc0NTU0VudHJpZXMiLCJuZXR3b3JrIiwiYXBwbHkiLCJlbGVtZW50cyIsImxheW91dCIsIngiLCJ5Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7Ozs7O0FDNURBQSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPQyxNQUFQLENBQWM7QUFDM0JDLGdCQUFZLFdBRGU7QUFFM0JDLFVBQU0sTUFGcUI7QUFHM0JDLFVBQU0sTUFIcUI7QUFJM0JDLGFBQVMsU0FKa0I7O0FBTTNCQyxXQUFPLE9BTm9CO0FBTzNCQyxXQUFPLE9BUG9COztBQVMzQkMsUUFBSSxJQVR1QjtBQVUzQkMsT0FBRyxHQVZ3QjtBQVczQkMsT0FBRyxHQVh3QjtBQVkzQkMsT0FBRyxHQVp3QjtBQWEzQkMsT0FBRyxHQWJ3Qjs7QUFlM0JDLFFBQUksSUFmdUI7QUFnQjNCQyxPQUFHLEdBaEJ3QjtBQWlCM0JDLE9BQUcsR0FqQndCOztBQW1CM0JDLHVCQUFtQixrQkFuQlE7QUFvQjNCQyxhQUFTLFNBcEJrQjs7QUFzQjNCQyxXQUFPLE9BdEJvQjs7QUF3QjNCQyxRQUFJO0FBeEJ1QixDQUFkLENBQWpCLEM7Ozs7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LFFBSGlCO0FBSTNCLHdCQUFvQixrQkFKTztBQUszQiwwQkFBc0Isb0JBTEs7QUFNM0IsYUFBUyxPQU5rQjtBQU8zQixtQkFBZSxPQVBZO0FBUTNCLHVCQUFvQixXQVJPO0FBUzNCLHFCQUFrQixjQVRTO0FBVTNCLGVBQVcsU0FWZ0I7QUFXM0Isa0JBQWM7QUFYYSxDQUFkLENBQWpCLEMiLCJmaWxlIjoiLi9idWlsZC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJjeFZpekNvbnZlcnRlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjeFZpekNvbnZlcnRlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTBiMGExYjA1ZGZkNzcxMzcyZDUiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgQ1hfVkVSU0lPTjogJ0NYVmVyc2lvbicsXG4gICAgTk9ERTogJ25vZGUnLFxuICAgIEVER0U6ICdlZGdlJyxcbiAgICBORVRXT1JLOiAnbmV0d29yaycsXG5cbiAgICBOT0RFUzogJ25vZGVzJyxcbiAgICBFREdFUzogJ2VkZ2VzJyxcblxuICAgIElEOiAnaWQnLFxuICAgIFg6ICd4JyxcbiAgICBZOiAneScsXG4gICAgWjogJ3onLFxuICAgIFY6ICd2JyxcblxuICAgIEFUOiAnYXQnLFxuICAgIE46ICduJyxcbiAgICBFOiAnZScsXG5cbiAgICBWSVNVQUxfUFJPUEVSVElFUzogJ3Zpc3VhbFByb3BlcnRpZXMnLFxuICAgIERFRkFVTFQ6ICdkZWZhdWx0JyxcblxuICAgIFNUWUxFOiAnc3R5bGUnLFxuXG4gICAgUE86ICdwbydcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeENvbnN0YW50cy5qcyIsImZ1bmN0aW9uIGdldEN4VmVyc2lvbih2ZXJzaW9uU3RyaW5nKSB7XG4gICAgY29uc3QgdmVyc2lvbkFycmF5ID0gdmVyc2lvblN0cmluZy5zcGxpdCgnLicpLm1hcCgobnVtYmVyU3RyaW5nKSA9PiB7IHJldHVybiBwYXJzZUludChudW1iZXJTdHJpbmcsIDEwKTsgfSk7XG4gICAgaWYgKHZlcnNpb25BcnJheS5sZW5ndGggIT09IDIgJiYgdmVyc2lvbkFycmF5Lmxlbmd0aCAhPSAzKSB7XG4gICAgICAgIHRocm93ICdJbmNvbXBhdGlibGUgdmVyc2lvbiBmb3JtYXQ6ICcgKyB2ZXJzaW9uU3RyaW5nO1xuICAgIH1cbiAgICB2ZXJzaW9uQXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgaWYgKGlzTmFOKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyAnTm9uLWludGVnZXIgdmFsdWUgaW4gdmVyc2lvbiBzdHJpbmc6ICcgKyB2ZXJzaW9uU3RyaW5nO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZlcnNpb25BcnJheTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3hNYWpvclZlcnNpb24odmVyc2lvblN0cmluZykge1xuICAgIHJldHVybiB2ZXJzaW9uU3RyaW5nID8gZ2V0Q3hWZXJzaW9uKHZlcnNpb25TdHJpbmcpWzBdIDogMTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyhjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucywgXG4gICAgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIFxuICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBcbiAgICBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBcbiAgICBlZGdlQXR0cmlidXRlTmFtZU1hcCwgZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIFxuICAgIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApIHtcbiAgICAvL2NvbnNvbGUubG9nKFwiIGN4QXR0cmlidXRlRGVjbGFyYXRpb25zOiBcIiArIEpTT04uc3RyaW5naWZ5KGN4QXR0cmlidXRlRGVjbGFyYXRpb25zLCBudWxsLCAyKSk7XG4gICAgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMuZm9yRWFjaCgoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbikgPT4ge1xuICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnbm9kZXMnXSkge1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5ub2Rlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLm5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvblsnZWRnZXMnXSkge1xuICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlTmFtZU1hcChlZGdlQXR0cmlidXRlTmFtZU1hcCwgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbi5lZGdlcyk7XG4gICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGVkZ2VBdHRyaWJ1dGVUeXBlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcChlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBjeEF0dHJpYnV0ZURlY2xhcmF0aW9uLmVkZ2VzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVUeXBlTWFwKGF0dHJpYnV0ZVR5cGVNYXAsIGF0dHJpYnV0ZURlY2xhcmF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZURlY2xhcmF0aW9ucykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVEZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZURlY2xhcmF0aW9uc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZURlY2xhcmF0aW9uWydkJ10pIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGVNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZURlY2xhcmF0aW9uLmQpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZU5hbWVNYXAoYXR0cmlidXRlTmFtZU1hcCwgYXR0cmlidXRlRGVjbGFyYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlRGVjbGFyYXRpb25zKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURlY2xhcmF0aW9uID0gYXR0cmlidXRlRGVjbGFyYXRpb25zW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBpZiAoYXR0cmlidXRlRGVjbGFyYXRpb25bJ2EnXSkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYXR0cmlidXRlICcgKyBhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hICsgJyBzaG91bGQgYmUgcmVuYW1lZCB0byAnICsgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVOYW1lTWFwLnNldChhdHRyaWJ1dGVEZWNsYXJhdGlvbi5hLCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAoYXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLCBhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVEZWNsYXJhdGlvbnMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlRGVjbGFyYXRpb24gPSBhdHRyaWJ1dGVEZWNsYXJhdGlvbnNbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVEZWNsYXJhdGlvblsndiddKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhdHRyaWJ1dGUgJyArIGF0dHJpYnV0ZU5hbWUgKyAnIGhhcyBkZWZhdWx0IHZhbHVlICcgKyBhdHRyaWJ1dGVEZWNsYXJhdGlvbi52KTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcC5zZXQoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGVjbGFyYXRpb24udik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlSW5mZXJyZWRUeXBlcyhhdHRyaWJ1dGVUeXBlTWFwLCBhdHRyaWJ1dGVOYW1lTWFwLCB2KSB7XG4gICAgdiAmJiBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgaWYgKCFhdHRyaWJ1dGVUeXBlTWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IGluZmVycmVkVHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0tleSA9IGF0dHJpYnV0ZU5hbWVNYXAuaGFzKGtleSkgPyBhdHRyaWJ1dGVOYW1lTWFwLmdldChrZXkpIDoga2V5O1xuICAgICAgICAgICAgYXR0cmlidXRlVHlwZU1hcC5zZXQobmV3S2V5LCBpbmZlcnJlZFR5cGUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKHYsIGF0dHJpYnV0ZU5hbWVNYXAsIGF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCkge1xuICAgIGxldCBkYXRhID0ge307XG4gICAgdiAmJiBPYmplY3Qua2V5cyh2KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgbmV3S2V5ID0gYXR0cmlidXRlTmFtZU1hcC5oYXMoa2V5KSA/IGF0dHJpYnV0ZU5hbWVNYXAuZ2V0KGtleSkgOiBrZXk7XG4gICAgICAgIGRhdGFbbmV3S2V5XSA9IHZba2V5XTtcbiAgICB9KTtcbiAgICBhdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBpZiAoIWRhdGFba2V5XSkge1xuICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0Q3hWZXJzaW9uOiBnZXRDeFZlcnNpb24sXG4gICAgZ2V0Q3hNYWpvclZlcnNpb246IGdldEN4TWFqb3JWZXJzaW9uLFxuICAgIHByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IHByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgdXBkYXRlQXR0cmlidXRlVHlwZU1hcDogdXBkYXRlQXR0cmlidXRlVHlwZU1hcCxcbiAgICB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwOiB1cGRhdGVBdHRyaWJ1dGVOYW1lTWFwLFxuICAgIHVwZGF0ZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcDogdXBkYXRlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgIHVwZGF0ZUluZmVycmVkVHlwZXM6IHVwZGF0ZUluZmVycmVkVHlwZXMsXG4gICAgZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzIDogZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeFV0aWwuanMiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNvbnZlcnRlciA9IHJlcXVpcmUgKCcuL2NvbnZlcnRlci5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cy5jb252ZXJ0ID0gKGN4LCB0YXJnZXRGb3JtYXQpID0+IHsgcmV0dXJuIGNvbnZlcnRlci5jb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQpOyB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGxhcmdlTmV0d29yayA9IHJlcXVpcmUgKCcuL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmsuanMnKTsgXG5jb25zdCBjeXRvc2NhcGVKUyA9IHJlcXVpcmUgKCcuL2N5dG9zY2FwZUpTL2N5dG9zY2FwZUpTLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiB2ZXJpZnlWZXJzaW9uKGN4KSB7XG4gICAgY29uc3QgZmlyc3RFbGVtZW50ID0gY3hbMF07XG4gICAgY29uc3QgdmVyc2lvblN0cmluZyA9IGZpcnN0RWxlbWVudFtjeENvbnN0YW50cy5DWF9WRVJTSU9OXTtcblxuICAgIGNvbnN0IG1ham9yVmVyc2lvbiA9IGN4VXRpbC5nZXRDeE1ham9yVmVyc2lvbih2ZXJzaW9uU3RyaW5nKTtcblxuICAgIGlmIChtYWpvclZlcnNpb24gIT09IDIpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSBDWCB2ZXJzaW9uOiAnICsgdmVyc2lvblN0cmluZztcbiAgICB9XG59XG5cbmNvbnN0IGRlZmF1bHRDb252ZXJ0ZXJzID0gW1xuICAgIGxhcmdlTmV0d29yayxcbiAgICBjeXRvc2NhcGVKU1xuXTtcblxuZnVuY3Rpb24gc2VsZWN0Q29udmVydGVyKHRhcmdldEZvcm1hdCwgY29udmVydGVycykge1xuICAgIGxldCBzZWxlY3RlZENvbnZlcnRlciA9IHVuZGVmaW5lZDtcbiAgICBcbiAgICBjb252ZXJ0ZXJzLmZvckVhY2goIGNvbnZlcnRlciA9PiB7XG4gICAgICAgIGlmIChjb252ZXJ0ZXIuY29udmVydGVyLnRhcmdldEZvcm1hdCA9PSB0YXJnZXRGb3JtYXQpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3RhcmdldCBmb3JtYXQ6ICcgKyBjb252ZXJ0ZXIuY29udmVydGVyLnRhcmdldEZvcm1hdCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdGVkQ29udmVydGVyID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDb252ZXJ0ZXIgPSBjb252ZXJ0ZXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93ICdjb252ZXJ0ZXJzIGNvbnRhaW4gbXVsdGlwbGUgZW50cmllcyBmb3IgdGFyZ2V0IGZvcm1hdDogJyArIHRhcmdldEZvcm1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RlZENvbnZlcnRlciA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyAnbm8gY29udmVydGVyIGF2YWlsYWJsZSBmb3IgdGFyZ2V0IGZvcm1hdDogJyArIHRhcmdldEZvcm1hdFxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0ZWRDb252ZXJ0ZXI7XG59XG5cbmZ1bmN0aW9uIGdldEVtcHR5TmV0d29yayh0YXJnZXRGb3JtYXQsIGNvbnZlcnRlcnMpIHtcbiAgICBjb25zdCBzZWxlY3RlZENvbnZlcnRlciA9IHNlbGVjdENvbnZlcnRlcih0YXJnZXRGb3JtYXQsIGNvbnZlcnRlcnMpO1xuICAgIHJldHVybiBzZWxlY3RlZENvbnZlcnRlci5jb252ZXJ0ZXIuZW1wdHlOZXR3b3JrO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0KGN4LCB0YXJnZXRGb3JtYXQsIGNvbnZlcnRlcnMgPSBkZWZhdWx0Q29udmVydGVycykge1xuICAgIFxuICAgIGlmIChjeC5sZW5ndGggPT0gMCkge1xuICAgICAgICByZXR1cm4gZ2V0RW1wdHlOZXR3b3JrKHRhcmdldEZvcm1hdCwgY29udmVydGVycyk7XG4gICAgfVxuICAgIFxuICAgIHZlcmlmeVZlcnNpb24oY3gpO1xuICAgIGNvbnN0IHNlbGVjdGVkQ29udmVydGVyID0gc2VsZWN0Q29udmVydGVyKHRhcmdldEZvcm1hdCwgY29udmVydGVycyk7XG4gICAgcmV0dXJuIHNlbGVjdGVkQ29udmVydGVyLmNvbnZlcnRlci5jb252ZXJ0KGN4KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb252ZXJ0OiBjb252ZXJ0XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb252ZXJ0ZXIuanMiLCJcbmNvbnN0IGN4Q29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY3hDb25zdGFudHMuanMnKTtcbmNvbnN0IGxhcmdlTmV0d29ya0NvbnN0YW50cyA9IHJlcXVpcmUoJy4vbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmpzJyk7XG5jb25zdCBjeFV0aWwgPSByZXF1aXJlKCcuLi9jeFV0aWwuanMnKTtcblxuZnVuY3Rpb24gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSkge1xuICAgIGNvbnN0IHRhcmdldFN0eWxlRW50cnkgPSB7fTtcbiAgICB0YXJnZXRTdHlsZUVudHJ5W3RhcmdldFN0eWxlRmllbGRdID0gcG9ydGFibGVQcm9wZXJ0VmFsdWU7XG4gICAgcmV0dXJuIHRhcmdldFN0eWxlRW50cnk7XG59XG5cbmZ1bmN0aW9uIGhleFRvUkdCKGhleCkge1xuICAgIGlmIChoZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gaGV4O1xuICAgIH1cbiAgICBsZXQgciA9IDAsIGcgPSAwLCBiID0gMDtcblxuICAgIC8vIDMgZGlnaXRzXG4gICAgaWYgKGhleC5sZW5ndGggPT0gNCkge1xuICAgICAgICByID0gXCIweFwiICsgaGV4WzFdICsgaGV4WzFdO1xuICAgICAgICBnID0gXCIweFwiICsgaGV4WzJdICsgaGV4WzJdO1xuICAgICAgICBiID0gXCIweFwiICsgaGV4WzNdICsgaGV4WzNdO1xuXG4gICAgICAgIC8vIDYgZGlnaXRzXG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDcpIHtcbiAgICAgICAgciA9IFwiMHhcIiArIGhleFsxXSArIGhleFsyXTtcbiAgICAgICAgZyA9IFwiMHhcIiArIGhleFszXSArIGhleFs0XTtcbiAgICAgICAgYiA9IFwiMHhcIiArIGhleFs1XSArIGhleFs2XTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3BhcnNlSW50KHIpLCBwYXJzZUludChnKSwgcGFyc2VJbnQoYildO1xufVxuXG5mdW5jdGlvbiBhbHBoYVRvSW50KGFscGhhRGVjaW1hbCkge1xuICAgIHJldHVybiBjbGFtcChNYXRoLnJvdW5kKGFscGhhRGVjaW1hbCAqIDI1NSksIDAsIDI1NSk7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVXaWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVIZWlnaHQsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWwsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IsIGhleFRvUkdCKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnTk9ERV9MQUJFTF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEsIGFscGhhVG9JbnQocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdOT0RFX0xBQkVMX0ZPTlRfU0laRSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsRm9udFNpemUsIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSlcbiAgICB9LFxuICAgICdlZGdlJzoge1xuICAgICAgICAnRURHRV9XSURUSCc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhLCBhbHBoYVRvSW50KHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yLCBoZXhUb1JHQihwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ0VER0VfTEFCRUwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvciwgaGV4VG9SR0IocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSksXG4gICAgICAgICdFREdFX0xBQkVMX09QQUNJVFknOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSwgYWxwaGFUb0ludChwb3J0YWJsZVByb3BlcnR5VmFsdWUpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfRk9OVF9TSVpFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxGb250U2l6ZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH1cbn1cblxuXG5cbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZXMoZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMpIHtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBub2RlOiB7fSxcbiAgICAgICAgZWRnZToge31cbiAgICB9O1xuICAgIGlmIChkZWZhdWx0VmlzdWFsUHJvcGVydGllc1snbm9kZSddKSB7XG4gICAgICAgIGNvbnN0IG5vZGVEZWZhdWx0ID0gZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMubm9kZTtcbiAgICAgICAgY29uc3QgbG52RW50cmllcyA9IGdldExOVlZhbHVlcygnbm9kZScsIG5vZGVEZWZhdWx0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQubm9kZSwgbG52RW50cmllcyk7XG4gICAgfVxuICAgIGlmIChkZWZhdWx0VmlzdWFsUHJvcGVydGllc1snZWRnZSddKSB7XG4gICAgICAgIGNvbnN0IGVkZ2VEZWZhdWx0ID0gZGVmYXVsdFZpc3VhbFByb3BlcnRpZXMuZWRnZTtcbiAgICAgICAgY29uc3QgbG52RW50cmllcyA9IGdldExOVlZhbHVlcygnZWRnZScsIGVkZ2VEZWZhdWx0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQuZWRnZSwgbG52RW50cmllcyk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldExOVlZhbHVlcyhlbnRpdHlUeXBlLCBlbnRyaWVzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGVudHJpZXMpLmZvckVhY2gocG9ydGFibGVQcm9wZXJ0eUtleSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcnRhYmxlUHJvcGVydHlWYWx1ZSA9IGVudHJpZXNbcG9ydGFibGVQcm9wZXJ0eUtleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBsbnZFbnRyeSA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxudkVudHJ5KS5mb3JFYWNoKGxudktleSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2xudktleV0gPSBsbnZFbnRyeVtsbnZLZXldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NDb2xvcihjb2xvckFycmF5LCBhbHBoYSkge1xuICAgIHJldHVybiBjb2xvckFycmF5ICE9IHVuZGVmaW5lZFxuICAgICAgICA/IGFscGhhICE9IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBbY29sb3JBcnJheVswXSwgY29sb3JBcnJheVsxXSwgY29sb3JBcnJheVsyXSwgYWxwaGFdXG4gICAgICAgICAgICA6IFtjb2xvckFycmF5WzBdLCBjb2xvckFycmF5WzFdLCBjb2xvckFycmF5WzJdXVxuICAgICAgICA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1NpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHJldHVybiBNYXRoLm1heCh3aWR0aCwgaGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc05vZGVWaWV3KG5vZGVWaWV3KSB7XG4gICAgbGV0IHdpZHRoID0gdW5kZWZpbmVkO1xuICAgIGxldCBoZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGNvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGFscGhhID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGxhYmVsQ29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFiZWxBbHBoYSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIGlkOiBub2RlVmlldy5pZCxcbiAgICAgICAgcG9zaXRpb246IG5vZGVWaWV3LnBvc2l0aW9uXG4gICAgfTtcblxuXG4gICAgT2JqZWN0LmtleXMobm9kZVZpZXcpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NOb2RlV2lkdGgpIHtcbiAgICAgICAgICAgIHdpZHRoID0gbm9kZVZpZXcucHJlcHJvY2Vzc05vZGVXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTm9kZUhlaWdodCkge1xuICAgICAgICAgICAgaGVpZ2h0ID0gbm9kZVZpZXcucHJlcHJvY2Vzc05vZGVIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yKSB7XG4gICAgICAgICAgICBjb2xvckFycmF5ID0gbm9kZVZpZXcucHJlcHJvY2Vzc0NvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NBbHBoYSkge1xuICAgICAgICAgICAgYWxwaGEgPSBub2RlVmlldy5wcmVwcm9jZXNzQWxwaGE7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IpIHtcbiAgICAgICAgICAgIGxhYmVsQ29sb3JBcnJheSA9IG5vZGVWaWV3LnByZXByb2Nlc3NMYWJlbENvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhKSB7XG4gICAgICAgICAgICBsYWJlbEFscGhhID0gbm9kZVZpZXcucHJlcHJvY2Vzc0xhYmVsQWxwaGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRwdXRba2V5XSA9IG5vZGVWaWV3W2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbG9yID0gcHJvY2Vzc0NvbG9yKGNvbG9yQXJyYXksIGFscGhhKTtcbiAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5jb2xvcl0gPSBjb2xvcjtcbiAgICB9XG5cbiAgICBjb25zdCBsYWJlbENvbG9yID0gcHJvY2Vzc0NvbG9yKGxhYmVsQ29sb3JBcnJheSwgbGFiZWxBbHBoYSk7XG4gICAgaWYgKGxhYmVsQ29sb3IpIHtcbiAgICAgICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbENvbG9yXSA9IGxhYmVsQ29sb3I7XG4gICAgfVxuXG4gICAgY29uc3Qgc2l6ZSA9IHByb2Nlc3NTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIGlmIChzaXplKSB7XG4gICAgICAgIG91dHB1dFtsYXJnZU5ldHdvcmtDb25zdGFudHMuc2l6ZV0gPSBwcm9jZXNzU2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0VkZ2VWaWV3KGVkZ2VWaWV3KSB7XG4gICAgbGV0IGNvbG9yQXJyYXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGFscGhhID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGxhYmVsQ29sb3JBcnJheSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgbGFiZWxBbHBoYSA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBvdXRwdXQgPSB7XG4gICAgICAgIGlkOiBlZGdlVmlldy5pZCxcbiAgICAgICAgczogZWRnZVZpZXcucyxcbiAgICAgICAgdDogZWRnZVZpZXcudFxuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKGVkZ2VWaWV3KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQ29sb3IpIHtcbiAgICAgICAgICAgIGNvbG9yQXJyYXkgPSBlZGdlVmlldy5wcmVwcm9jZXNzQ29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0FscGhhKSB7XG4gICAgICAgICAgICBhbHBoYSA9IGVkZ2VWaWV3LnByZXByb2Nlc3NBbHBoYTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvcikge1xuICAgICAgICAgICAgbGFiZWxDb2xvckFycmF5ID0gZWRnZVZpZXcucHJlcHJvY2Vzc0xhYmVsQ29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQWxwaGEpIHtcbiAgICAgICAgICAgIGxhYmVsQWxwaGEgPSBlZGdlVmlldy5wcmVwcm9jZXNzTGFiZWxBbHBoYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dHB1dFtrZXldID0gZWRnZVZpZXdba2V5XTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29sb3IgPSBwcm9jZXNzQ29sb3IoY29sb3JBcnJheSwgYWxwaGEpO1xuICAgIGlmIChjb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmNvbG9yXSA9IGNvbG9yO1xuICAgIH1cblxuICAgIGNvbnN0IGxhYmVsQ29sb3IgPSBwcm9jZXNzQ29sb3IobGFiZWxDb2xvckFycmF5LCBsYWJlbEFscGhhKTtcbiAgICBpZiAobGFiZWxDb2xvcikge1xuICAgICAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmxhYmVsQ29sb3JdID0gbGFiZWxDb2xvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRNYXBwaW5ncyhtYXBwaW5ncykge1xuICAgIGxldCBvdXRwdXQgPSB7fVxuICAgIE9iamVjdC5rZXlzKG1hcHBpbmdzKS5mb3JFYWNoKHByb3BlcnR5S2V5ID0+IHtcbiAgICAgICAgY29uc3QgbWFwcGluZyA9IG1hcHBpbmdzW3Byb3BlcnR5S2V5XTtcbiAgICAgICAgY29uc3QgbWFwcGluZ0xpc3QgPSBvdXRwdXRbbWFwcGluZy5kZWZpbml0aW9uLmF0dHJpYnV0ZV0gPyBvdXRwdXRbbWFwcGluZy5kZWZpbml0aW9uLmF0dHJpYnV0ZV0gOiBbXVxuICAgICAgICBtYXBwaW5nTGlzdC5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IG1hcHBpbmcudHlwZSxcbiAgICAgICAgICAgIHZwOiBwcm9wZXJ0eUtleSxcbiAgICAgICAgICAgIGRlZmluaXRpb246IG1hcHBpbmcuZGVmaW5pdGlvblxuICAgICAgICB9KVxuICAgICAgICBvdXRwdXRbbWFwcGluZy5kZWZpbml0aW9uLmF0dHJpYnV0ZV0gPSBtYXBwaW5nTGlzdDtcbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZVJhdGlvKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCkge1xuICAgIHJldHVybiAoYXR0cmlidXRlVmFsdWUgLSBhdHRyaWJ1dGVNaW4pIC8gKGF0dHJpYnV0ZU1heCAtIGF0dHJpYnV0ZU1pbik7XG59XG5cbmZ1bmN0aW9uIGdldE1hcCh2cE1pbiwgdnBNYXgsIGF0dHJpYnV0ZVJhdGlvKSB7XG4gICAgaWYgKHZwTWluICE9PSB1bmRlZmluZWQgJiYgdnBNYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdnBNaW4gKyAoKHZwTWF4IC0gdnBNaW4pICogYXR0cmlidXRlUmF0aW8pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh2cE1pbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdnBNYXg7XG4gICAgICAgIH0gZWxzZSBpZiAodnBNYXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHZwTWluO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjbGFtcCh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsIG1pbiksIG1heCk7XG59XG5cbmZ1bmN0aW9uIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVSYXRpbyA9IGdldEF0dHJpYnV0ZVJhdGlvKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCk7XG5cbiAgICBjb25zdCBvdXRwdXQgPSBnZXRNYXAodnBNaW4sIHZwTWF4LCBhdHRyaWJ1dGVSYXRpbyk7XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpIHtcbiAgICBjb25zdCBtaW5SR0IgPSBoZXhUb1JHQih2cE1pbik7XG4gICAgY29uc3QgbWF4UkdCID0gaGV4VG9SR0IodnBNYXgpO1xuXG4gICAgY29uc3QgYXR0cmlidXRlUmF0aW8gPSBnZXRBdHRyaWJ1dGVSYXRpbyhhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgpO1xuXG4gICAgY29uc3Qgb3V0cHV0ID0gW1xuICAgICAgICAvL1RPRE8gY2hlY2sgdGhhdCBtaW5SR0IgYW5kIG1heFJHQiBhcmUgZGVmaW5lZC91bmRlZmluZWRcbiAgICAgICAgY2xhbXAoTWF0aC5yb3VuZChnZXRNYXAobWluUkdCID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBtaW5SR0JbMF0sIG1heFJHQiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogbWF4UkdCWzBdLCBhdHRyaWJ1dGVSYXRpbykpLCAwLCAyNTUpLFxuICAgICAgICBjbGFtcChNYXRoLnJvdW5kKGdldE1hcChtaW5SR0IgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IG1pblJHQlsxXSwgbWF4UkdCID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBtYXhSR0JbMV0sIGF0dHJpYnV0ZVJhdGlvKSksIDAsIDI1NSksXG4gICAgICAgIGNsYW1wKE1hdGgucm91bmQoZ2V0TWFwKG1pblJHQiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogbWluUkdCWzJdLCBtYXhSR0IgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IG1heFJHQlsyXSwgYXR0cmlidXRlUmF0aW8pKSwgMCwgMjU1KVxuICAgIF1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVSYXRpbyA9IGdldEF0dHJpYnV0ZVJhdGlvKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCk7XG5cbiAgICBjb25zdCBhbHBoYURlY2ltYWwgPSBnZXRNYXAodnBNaW4sIHZwTWF4LCBhdHRyaWJ1dGVSYXRpbyk7XG5cbiAgICAvL2NvbnNvbGUubG9nKFwiYWxwaGFEZWNpbWFsID0gXCIgKyBhbHBoYURlY2ltYWwpO1xuICAgIHJldHVybiBhbHBoYVRvSW50KGFscGhhRGVjaW1hbCk7XG59XG5cbmNvbnN0IGNvbnRpbnVvdXNQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1dJRFRIJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTm9kZVdpZHRoLCBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0hFSUdIVCc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc05vZGVIZWlnaHQsIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0NvbG9yLCBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzQWxwaGEsIGNvbnRpbnVvdXNBbHBoYVByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9MQUJFTF9DT0xPUic6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMucHJlcHJvY2Vzc0xhYmVsQ29sb3IsIGNvbnRpbnVvdXNDb2xvclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpLFxuICAgICAgICAnTk9ERV9MQUJFTF9PUEFDSVRZJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxBbHBoYSwgY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdOT0RFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChsYXJnZU5ldHdvcmtDb25zdGFudHMubGFiZWxGb250U2l6ZSwgY29udGludW91c051bWJlclByb3BlcnR5Q29udmVydChhdHRyaWJ1dGVWYWx1ZSwgYXR0cmlidXRlTWluLCBhdHRyaWJ1dGVNYXgsIHZwTWluLCB2cE1heCkpXG4gICAgfSxcbiAgICAnZWRnZSc6IHtcbiAgICAgICAgJ0VER0VfV0lEVEgnOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLndpZHRoLCBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NBbHBoYSwgY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NDb2xvciwgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdFREdFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5wcmVwcm9jZXNzTGFiZWxDb2xvciwgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSksXG4gICAgICAgICdFREdFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQobGFyZ2VOZXR3b3JrQ29uc3RhbnRzLnByZXByb2Nlc3NMYWJlbEFscGhhLCBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQoYXR0cmlidXRlVmFsdWUsIGF0dHJpYnV0ZU1pbiwgYXR0cmlidXRlTWF4LCB2cE1pbiwgdnBNYXgpKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGxhcmdlTmV0d29ya0NvbnN0YW50cy5sYWJlbEZvbnRTaXplLCBjb250aW51b3VzTnVtYmVyUHJvcGVydHlDb252ZXJ0KGF0dHJpYnV0ZVZhbHVlLCBhdHRyaWJ1dGVNaW4sIGF0dHJpYnV0ZU1heCwgdnBNaW4sIHZwTWF4KSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzSW5SYW5nZShhdHRyaWJ1dGVWYWx1ZSwgbWluLCBtYXgsIGluY2x1ZGVNaW4sIGluY2x1ZGVNYXgpIHtcbiAgICBjb25zdCBtaW5TYXRpc2ZpZWQgPSBtaW4gIT09IHVuZGVmaW5lZFxuICAgICAgICA/IChpbmNsdWRlTWluID8gbWluIDw9IGF0dHJpYnV0ZVZhbHVlIDogbWluIDwgYXR0cmlidXRlVmFsdWUpXG4gICAgICAgIDogdHJ1ZTtcbiAgICBjb25zdCBtYXhTYXRpc2ZpZWQgPSBtYXggIT0gdW5kZWZpbmVkXG4gICAgICAgID8gKGluY2x1ZGVNYXggPyBtYXggPj0gYXR0cmlidXRlVmFsdWUgOiBtYXggPiBhdHRyaWJ1dGVWYWx1ZSlcbiAgICAgICAgOiB0cnVlO1xuICAgIC8vY29uc29sZS5sb2coJ2lzSW5SYW5nZTogJyArIGF0dHJpYnV0ZVZhbHVlICsgJyAnICsgbWluICsgJyAnICsgbWF4ICsgJyAnICsgaW5jbHVkZU1pbiArICcgJyArIGluY2x1ZGVNYXggKyAnICcgKyBtaW5TYXRpc2ZpZWQgKyAnICcgKyBtYXhTYXRpc2ZpZWQpO1xuICAgIHJldHVybiBtaW5TYXRpc2ZpZWQgJiYgbWF4U2F0aXNmaWVkO1xufVxuXG5mdW5jdGlvbiBnZXRNYXBwZWRWYWx1ZXMobWFwcGluZ3MsIGVudGl0eVR5cGUsIGF0dHJpYnV0ZXMpIHtcbiAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChhdHRyaWJ1dGVLZXkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlS2V5XTtcbiAgICAgICAgaWYgKG1hcHBpbmdzW2VudGl0eVR5cGVdW2F0dHJpYnV0ZUtleV0pIHtcbiAgICAgICAgICAgIG1hcHBpbmdzW2VudGl0eVR5cGVdW2F0dHJpYnV0ZUtleV0uZm9yRWFjaChcbiAgICAgICAgICAgICAgICAobWFwcGluZykgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXBwaW5nLnR5cGUgPT09ICdESVNDUkVURScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXBwaW5nLmRlZmluaXRpb24ubWFwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzY3JldGVNYXAgPSBtYXBwaW5nLmRlZmluaXRpb24ubWFwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3Byb2Nlc3NpbmcgZGlzY3JldGUgbWFwOicgKyBlbnRpdHlUeXBlICsgJyBtYXBwaW5nLnZwPScgKyBtYXBwaW5nLnZwICsgJyAnICsgYXR0cmlidXRlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNjcmV0ZU1hcC5mb3JFYWNoKGtleVZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleVZhbHVlLnYgPT0gYXR0cmlidXRlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1xcdGtleVZhbHVlLnY9JyArIGtleVZhbHVlLnYgKyAnICcgKyBhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0oa2V5VmFsdWUudnApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1xcdGNvbnZlcnRlZCAnICsgSlNPTi5zdHJpbmdpZnkoY29udmVydGVkKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgY29udmVydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hcHBpbmcudHlwZSA9PT0gJ1BBU1NUSFJPVUdIJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSBkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW21hcHBpbmcudnBdKGF0dHJpYnV0ZVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgY29udmVydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXBwaW5nLnR5cGUgPT09ICdDT05USU5VT1VTJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGludW91c01hcHBpbmdzID0gbWFwcGluZy5kZWZpbml0aW9uLm1hcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVvdXNNYXBwaW5ncy5mb3JFYWNoKG1hcHBpbmdSYW5nZSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNJblJhbmdlKGF0dHJpYnV0ZVZhbHVlLCBtYXBwaW5nUmFuZ2UubWluLCBtYXBwaW5nUmFuZ2UubWF4LCBtYXBwaW5nUmFuZ2UuaW5jbHVkZU1pbiwgbWFwcGluZ1JhbmdlLmluY2x1ZGVNYXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGNvbnRpbnVvdXNQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bbWFwcGluZy52cF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udmVydGVkID0gY29udGludW91c1Byb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVttYXBwaW5nLnZwXShhdHRyaWJ1dGVWYWx1ZSwgbWFwcGluZ1JhbmdlLm1pbiwgbWFwcGluZ1JhbmdlLm1heCwgbWFwcGluZ1JhbmdlLm1pblZQVmFsdWUsIG1hcHBpbmdSYW5nZS5tYXhWUFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIGNvbnZlcnRlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gbG52Q29udmVydChjeCkge1xuXG4gICAgLy9GaXJzdCBwYXNzLiBcbiAgICAvLyBXZSBuZWVkIHRvIGNvbGxlY3Qgb2JqZWN0IGF0dHJpYnV0ZXMgdG8gY2FsY3VsYXRlXG4gICAgLy8gbWFwcGluZ3MgaW4gdGhlIHNlY29uZCBwYXNzLiBcblxuICAgIGxldCBjeFZpc3VhbFByb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGN4Tm9kZUJ5cGFzc2VzID0gW107XG4gICAgbGV0IGN4RWRnZUJ5cGFzc2VzID0gW107XG5cbiAgICBsZXQgbm9kZUF0dHJpYnV0ZVR5cGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IG5vZGVBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgIGxldCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgbGV0IGRlZmF1bHRWYWx1ZXMgPSB1bmRlZmluZWQ7XG4gICAgbGV0IG1hcHBpbmdzID0ge1xuICAgICAgICBub2RlOiB7fSxcbiAgICAgICAgZWRnZToge31cbiAgICB9XG4gICAgbGV0IGJ5cGFzc01hcHBpbmdzID0ge1xuICAgICAgICAnbm9kZSc6IHt9LFxuICAgICAgICAnZWRnZSc6IHt9XG4gICAgfTtcblxuICAgIGN4LmZvckVhY2goKGN4QXNwZWN0KSA9PiB7XG4gICAgICAgIGlmIChjeEFzcGVjdFsnYXR0cmlidXRlRGVjbGFyYXRpb25zJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddO1xuICAgICAgICAgICAgY3hVdGlsLnByb2Nlc3NBdHRyaWJ1dGVEZWNsYXJhdGlvbnMoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlVHlwZU1hcCxcbiAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG4gICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGN4VXRpbC51cGRhdGVJbmZlcnJlZFR5cGVzKG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBub2RlQXR0cmlidXRlTmFtZU1hcCwgY3hOb2RlWyd2J10pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgY29uc3QgY3hFZGdlcyA9IGN4QXNwZWN0WydlZGdlcyddO1xuICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhlZGdlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZU5hbWVNYXAsIGN4RWRnZVsndiddKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXSkge1xuICAgICAgICAgICAgY3hWaXN1YWxQcm9wZXJ0aWVzID0gY3hBc3BlY3RbJ3Zpc3VhbFByb3BlcnRpZXMnXTtcbiAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZUJ5cGFzc2VzJ10pIHtcbiAgICAgICAgICAgIGN4QXNwZWN0Lm5vZGVCeXBhc3Nlcy5mb3JFYWNoKGJ5cGFzcyA9PiB7XG4gICAgICAgICAgICAgICAgY3hOb2RlQnlwYXNzZXMucHVzaChieXBhc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VCeXBhc3NlcyddKSB7XG4gICAgICAgICAgICBjeEFzcGVjdC5lZGdlQnlwYXNzZXMuZm9yRWFjaChieXBhc3MgPT4ge1xuICAgICAgICAgICAgICAgIGN4RWRnZUJ5cGFzc2VzLnB1c2goYnlwYXNzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgb3V0cHV0ID0ge307XG5cbiAgICBsZXQgbm9kZVZpZXdzID0gW107XG4gICAgbGV0IGVkZ2VWaWV3cyA9IFtdO1xuXG4gICAgY3hWaXN1YWxQcm9wZXJ0aWVzICYmIGN4VmlzdWFsUHJvcGVydGllcy5mb3JFYWNoKHZwRWxlbWVudCA9PiB7XG5cbiAgICAgICAgY29uc3QgZGVmYXVsdFN0eWxlcyA9IHZwRWxlbWVudC5kZWZhdWx0O1xuXG4gICAgICAgIGRlZmF1bHRWYWx1ZXMgPSBnZXREZWZhdWx0VmFsdWVzKGRlZmF1bHRTdHlsZXMpO1xuXG4gICAgICAgIG1hcHBpbmdzLm5vZGUgPSB2cEVsZW1lbnQubm9kZU1hcHBpbmcgPyBnZXRNYXBwaW5ncyh2cEVsZW1lbnQubm9kZU1hcHBpbmcpIDoge307XG4gICAgICAgIG1hcHBpbmdzLmVkZ2UgPSB2cEVsZW1lbnQuZWRnZU1hcHBpbmcgPyBnZXRNYXBwaW5ncyh2cEVsZW1lbnQuZWRnZU1hcHBpbmcpIDoge307XG5cblxuICAgIH0pO1xuXG4gICAgY3hOb2RlQnlwYXNzZXMgJiYgY3hOb2RlQnlwYXNzZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG5cbiAgICAgICAgY29uc3Qga2V5ID0gdnBFbGVtZW50W2N4Q29uc3RhbnRzLklEXS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBnZXRMTlZWYWx1ZXMoJ25vZGUnLCB2cEVsZW1lbnQudilcblxuICAgICAgICBpZiAoIWJ5cGFzc01hcHBpbmdzLm5vZGVba2V5XSkge1xuICAgICAgICAgICAgYnlwYXNzTWFwcGluZ3Mubm9kZVtrZXldID0ge307XG4gICAgICAgIH1cblxuICAgICAgICAvL2NvbnNvbGUubG9nKCdieXBhc3MgY2FsY3VsYXRlZDogJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlcywgbnVsbCwgMikpO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oYnlwYXNzTWFwcGluZ3Mubm9kZVtrZXldLCB2YWx1ZXMpO1xuICAgICAgICAvL2J5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnbm9kZScsIHZwRWxlbWVudCkpO1xuICAgIH0pO1xuXG4gICAgY3hFZGdlQnlwYXNzZXMgJiYgY3hFZGdlQnlwYXNzZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IHZwRWxlbWVudFtjeENvbnN0YW50cy5JRF0udG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gZ2V0TE5WVmFsdWVzKCdlZGdlJywgdnBFbGVtZW50LnYpXG5cbiAgICAgICAgaWYgKCFieXBhc3NNYXBwaW5ncy5lZGdlW2tleV0pIHtcbiAgICAgICAgICAgIGJ5cGFzc01hcHBpbmdzLmVkZ2Vba2V5XSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnYnlwYXNzIGNhbGN1bGF0ZWQ6ICcgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZXMsIG51bGwsIDIpKTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKGJ5cGFzc01hcHBpbmdzLmVkZ2Vba2V5XSwgdmFsdWVzKTtcbiAgICB9XG4gICAgKTtcblxuICAgIC8vY29uc29sZS5sb2coJ21hcHBpbmdzOiAnICsgSlNPTi5zdHJpbmdpZnkobWFwcGluZ3MsIG51bGwsIDIpKTtcblxuICAgIC8vU2Vjb25kIHBhc3MuIFxuICAgIC8vIEhlcmUgaXMgd2hlcmUgdGhlIGFjdHVhbCBvdXRwdXQgaXMgZ2VuZXJhdGVkLlxuXG4gICAgY3guZm9yRWFjaCgoY3hBc3BlY3QpID0+IHtcbiAgICAgICAgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICBjb25zdCBjeE5vZGVzID0gY3hBc3BlY3RbJ25vZGVzJ107XG5cblxuICAgICAgICAgICAgY3hOb2Rlcy5mb3JFYWNoKChjeE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hOb2RlW2N4Q29uc3RhbnRzLklEXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGxldCBub2RlVmlldyA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGN4SWQsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBjeE5vZGVbJ3onXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBbY3hOb2RlWyd4J10sIGN4Tm9kZVsneSddLCBjeE5vZGVbJ3onXV1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogW2N4Tm9kZVsneCddLCBjeE5vZGVbJ3knXV1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL1RPRE8gY2FsY3VsYXRlIGxudiB2cHMgYmFzZWQgb24gZGVmYXVsdHMgYW5kIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0Tm9kZVZpc3VhbFByb3BlcnRpZXMgPSBkZWZhdWx0VmFsdWVzWydub2RlJ107XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obm9kZVZpZXcsIGRlZmF1bHROb2RlVmlzdWFsUHJvcGVydGllcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vQXNzaWduIG1hcHBpbmdzXG4gICAgICAgICAgICAgICAgY29uc3QgZXhwYW5kZWRBdHRyaWJ1dGVzID0gY3hVdGlsLmdldEV4cGFuZGVkQXR0cmlidXRlcyhjeE5vZGVbJ3YnXSwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBpbmdWYWx1ZXMgPSBnZXRNYXBwZWRWYWx1ZXMobWFwcGluZ3MsICdub2RlJywgZXhwYW5kZWRBdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG5vZGVWaWV3LCBtYXBwaW5nVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgIC8vQXNzaWduIGJ5cGFzc1xuICAgICAgICAgICAgICAgIGlmIChieXBhc3NNYXBwaW5ncy5ub2RlW2N4SWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obm9kZVZpZXcsIGJ5cGFzc01hcHBpbmdzLm5vZGVbY3hJZF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZE5vZGVWaWV3ID0gcHJvY2Vzc05vZGVWaWV3KG5vZGVWaWV3KTtcblxuICAgICAgICAgICAgICAgIG5vZGVWaWV3cy5wdXNoKHByb2Nlc3NlZE5vZGVWaWV3KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcblxuICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeElkID0gY3hFZGdlW2N4Q29uc3RhbnRzLklEXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVkZ2VWaWV3ID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogY3hJZCxcbiAgICAgICAgICAgICAgICAgICAgczogY3hFZGdlLnMudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgdDogY3hFZGdlLnQudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vVE9ETyBjYWxjdWxhdGUgbG52IHZwcyBiYXNlZCBvbiBkZWZhdWx0cyBhbmQgYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRFZGdlVmlzdWFsUHJvcGVydGllcyA9IGRlZmF1bHRWYWx1ZXNbJ2VkZ2UnXTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlZGdlVmlldywgZGVmYXVsdEVkZ2VWaXN1YWxQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBleHBhbmRlZEF0dHJpYnV0ZXMgPSBjeFV0aWwuZ2V0RXhwYW5kZWRBdHRyaWJ1dGVzKGN4RWRnZVsndiddLCBlZGdlQXR0cmlidXRlTmFtZU1hcCwgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFwcGluZ1ZhbHVlcyA9IGdldE1hcHBlZFZhbHVlcyhtYXBwaW5ncywgJ2VkZ2UnLCBleHBhbmRlZEF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWRnZVZpZXcsIG1hcHBpbmdWYWx1ZXMpO1xuICAgICAgICAgICAgICAgIC8vQXNzaWduIGJ5cGFzc1xuICAgICAgICAgICAgICAgIGlmIChieXBhc3NNYXBwaW5ncy5lZGdlW2N4SWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWRnZVZpZXcsIGJ5cGFzc01hcHBpbmdzLmVkZ2VbY3hJZF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEVkZ2VWaWV3ID0gcHJvY2Vzc0VkZ2VWaWV3KGVkZ2VWaWV3KTtcblxuICAgICAgICAgICAgICAgIGVkZ2VWaWV3cy5wdXNoKHByb2Nlc3NlZEVkZ2VWaWV3KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBvdXRwdXRbbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLm5vZGVWaWV3c10gPSBub2RlVmlld3M7XG4gICAgb3V0cHV0W2xhcmdlTmV0d29ya0NvbnN0YW50cy5lZGdlVmlld3NdID0gZWRnZVZpZXdzO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuY29uc3QgY29udmVydGVyID0ge1xuICAgIHRhcmdldEZvcm1hdDogJ2xudicsXG4gICAgZW1wdHlOZXR3b3JrOiB7IFwibm9kZVZpZXdzXCI6IFtdLCBcImVkZ2VWaWV3c1wiOiBbXSB9LFxuICAgIGNvbnZlcnQ6IChjeCkgPT4ge1xuICAgICAgICByZXR1cm4gbG52Q29udmVydChjeCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0OiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0LFxuICAgIGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQ6IGNvbnRpbnVvdXNOdW1iZXJQcm9wZXJ0eUNvbnZlcnQsXG4gICAgY29udGludW91c0FscGhhUHJvcGVydHlDb252ZXJ0OiBjb250aW51b3VzQWxwaGFQcm9wZXJ0eUNvbnZlcnQsXG4gICAgY29udGludW91c0NvbG9yUHJvcGVydHlDb252ZXJ0OiBjb250aW51b3VzQ29sb3JQcm9wZXJ0eUNvbnZlcnQsXG4gICAgcHJvY2Vzc05vZGVWaWV3OiBwcm9jZXNzTm9kZVZpZXcsXG4gICAgcHJvY2Vzc0VkZ2VWaWV3OiBwcm9jZXNzRWRnZVZpZXcsXG4gICAgZ2V0RGVmYXVsdFZhbHVlczogZ2V0RGVmYXVsdFZhbHVlcyxcbiAgICBnZXRBdHRyaWJ1dGVSYXRpbzogZ2V0QXR0cmlidXRlUmF0aW8sXG4gICAgaXNJblJhbmdlOiBpc0luUmFuZ2UsXG4gICAgY29udmVydGVyOiBjb252ZXJ0ZXJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xhcmdlTmV0d29yay9sYXJnZU5ldHdvcmsuanMiLCJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgJ25vZGVWaWV3cyc6ICdub2RlVmlld3MnLFxuICAgICdlZGdlVmlld3MnOiAnZWRnZVZpZXdzJywgXG4gICAgJ2lkJzogJ2lkJyxcbiAgICAncG9zaXRpb24nOiAncG9zaXRpb24nLFxuICAgICdzJzogJ3MnLFxuICAgICd0JzogJ3QnLFxuICAgICdsYWJlbCc6ICdsYWJlbCcsIFxuICAgICdsYWJlbENvbG9yJyA6ICdsYWJlbENvbG9yJyxcbiAgICAnbGFiZWxGb250U2l6ZScgOiAnbGFiZWxGb250U2l6ZScsXG4gICAgJ2NvbG9yJzogJ2NvbG9yJyxcbiAgICAnc2l6ZScgOiAnc2l6ZScsXG4gICAgJ3dpZHRoJyA6ICd3aWR0aCcsXG5cbiAgICAncHJlcHJvY2Vzc0NvbG9yJzogJ3ByZXByb2Nlc3NDb2xvcicsXG4gICAgJ3ByZXByb2Nlc3NBbHBoYSc6ICdwcmVwcm9jZXNzQWxwaGEnLFxuICAgICdwcmVwcm9jZXNzTGFiZWxDb2xvcic6ICdwcmVwcm9jZXNzTGFiZWxDb2xvcicsXG4gICAgJ3ByZXByb2Nlc3NMYWJlbEFscGhhJzogJ3ByZXByb2Nlc3NMYWJlbEFscGhhJyxcbiAgICAncHJlcHJvY2Vzc05vZGVXaWR0aCcgOiAncHJlcHJvY2Vzc05vZGVXaWR0aCcsXG4gICAgJ3ByZXByb2Nlc3NOb2RlSGVpZ2h0JyA6ICdwcmVwcm9jZXNzTm9kZUhlaWdodCdcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9sYXJnZU5ldHdvcmsvbGFyZ2VOZXR3b3JrQ29uc3RhbnRzLmpzIiwiXG5jb25zdCBjeENvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2N4Q29uc3RhbnRzLmpzJyk7XG5jb25zdCBqc0NvbnN0YW50cyA9IHJlcXVpcmUoJy4vY3l0b3NjYXBlSlNDb25zdGFudHMuanMnKTtcbmNvbnN0IGN4VXRpbCA9IHJlcXVpcmUoJy4uL2N4VXRpbC5qcycpO1xuXG5mdW5jdGlvbiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KHRhcmdldFN0eWxlRmllbGQsIHBvcnRhYmxlUHJvcGVydFZhbHVlKSB7XG4gICAgY29uc3QgdGFyZ2V0U3R5bGVFbnRyeSA9IG5ldyBNYXAoKTtcbiAgICB0YXJnZXRTdHlsZUVudHJ5LnNldCh0YXJnZXRTdHlsZUZpZWxkLCBwb3J0YWJsZVByb3BlcnRWYWx1ZSk7XG4gICAgcmV0dXJuIHRhcmdldFN0eWxlRW50cnk7XG59XG5cbmNvbnN0IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfV0lEVEgnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmhlaWdodCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIHBvcnRhYmxlUHJvcGVydHlWYWx1ZSksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfT1BBQ0lUWSc6IChwb3J0YWJsZVByb3BlcnR5VmFsdWUpID0+IHNpbXBsZURlZmF1bHRQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKSxcbiAgICAgICAgJ0VER0VfTEFCRUwnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJzogKHBvcnRhYmxlUHJvcGVydHlWYWx1ZSkgPT4gc2ltcGxlRGVmYXVsdFByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBwb3J0YWJsZVByb3BlcnR5VmFsdWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9GT05UX1NJWkUnOiAocG9ydGFibGVQcm9wZXJ0eVZhbHVlKSA9PiBzaW1wbGVEZWZhdWx0UHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgcG9ydGFibGVQcm9wZXJ0eVZhbHVlKVxuICAgIH0sXG59XG5cbmZ1bmN0aW9uIHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQodGFyZ2V0U3R5bGVGaWVsZCwgYXR0cmlidXRlTmFtZSkge1xuICAgIGNvbnN0IG91dHB1dCA9IHt9O1xuICAgIG91dHB1dFt0YXJnZXRTdHlsZUZpZWxkXSA9ICdkYXRhKCcgKyBhdHRyaWJ1dGVOYW1lICsgJyknO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IHBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQgPSB7XG4gICAgJ25vZGUnOiB7XG4gICAgICAgICdOT0RFX1NIQVBFJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuc2hhcGUsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9XSURUSCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfSEVJR0hUJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfQkFDS0dST1VORF9DT0xPUic6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmJhY2tncm91bmRfY29sb3IsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5iYWNrZ3JvdW5kX29wYWNpdHksIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnTk9ERV9MQUJFTCc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9jb2xvciwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdOT0RFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ05PREVfTEFCRUxfRk9OVF9TSVpFJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBhdHRyaWJ1dGVOYW1lKVxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMud2lkdGgsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xJTkVfQ09MT1InOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5saW5lX2NvbG9yLCBhdHRyaWJ1dGVOYW1lKSxcbiAgICAgICAgJ0VER0VfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSkgPT4gc2ltcGxlUGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydChqc0NvbnN0YW50cy5sYWJlbCwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgICAnRURHRV9MQUJFTF9PUEFDSVRZJzogKGF0dHJpYnV0ZU5hbWUpID0+IHNpbXBsZVBhc3N0aHJvdWdoTWFwcGluZ0NvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSksXG4gICAgICAgICdFREdFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVOYW1lKSA9PiBzaW1wbGVQYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2ZvbnRfc2l6ZSwgYXR0cmlidXRlTmFtZSlcbiAgICB9LFxufVxuZnVuY3Rpb24gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydCh0YXJnZXRTdHlsZUZpZWxkLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkge1xuICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICBpZiAobWluVmFsdWUgIT0gdW5kZWZpbmVkICYmIG1heFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBvdXRwdXRbdGFyZ2V0U3R5bGVGaWVsZF0gPSAnbWFwRGF0YSgnICsgYXR0cmlidXRlTmFtZVxuICAgICAgICArICcsICcgKyBtaW5WYWx1ZVxuICAgICAgICArICcsICcgKyBtYXhWYWx1ZVxuICAgICAgICArICcsICcgKyBtaW5WUFxuICAgICAgICArICcsICcgKyBtYXhWUFxuICAgICAgICArICcpJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobWluVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3V0cHV0W3RhcmdldFN0eWxlRmllbGRdID0gbWF4VlA7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4VmFsdWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvdXRwdXRbdGFyZ2V0U3R5bGVGaWVsZF0gPSBtaW5WUDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBtYXBEYXRhUHJvcGVydHlDb252ZXJ0ID0ge1xuICAgICdub2RlJzoge1xuICAgICAgICAnTk9ERV9TSEFQRSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5zaGFwZSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9XSURUSCc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy53aWR0aCwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9IRUlHSFQnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuaGVpZ2h0LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0JBQ0tHUk9VTkRfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9jb2xvciwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9CQUNLR1JPVU5EX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMuYmFja2dyb3VuZF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0xBQkVMJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0xBQkVMX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxhYmVsX2NvbG9yLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdOT0RFX0xBQkVMX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfb3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnTk9ERV9MQUJFTF9GT05UX1NJWkUnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfZm9udF9zaXplLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUClcblxuICAgIH0sXG4gICAgJ2VkZ2UnOiB7XG4gICAgICAgICdFREdFX1dJRFRIJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLndpZHRoLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX09QQUNJVFknOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMub3BhY2l0eSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApLFxuICAgICAgICAnRURHRV9MSU5FX0NPTE9SJzogKGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSA9PiBzaW1wbGVNYXBEYXRhUHJvcGVydHlDb252ZXJ0KGpzQ29uc3RhbnRzLmxpbmVfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTEFCRUwnOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWwsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfQ09MT1InOiAoYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApID0+IHNpbXBsZU1hcERhdGFQcm9wZXJ0eUNvbnZlcnQoanNDb25zdGFudHMubGFiZWxfY29sb3IsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKSxcbiAgICAgICAgJ0VER0VfTEFCRUxfT1BBQ0lUWSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9vcGFjaXR5LCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCksXG4gICAgICAgICdFREdFX0xBQkVMX0ZPTlRfU0laRSc6IChhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCkgPT4gc2ltcGxlTWFwRGF0YVByb3BlcnR5Q29udmVydChqc0NvbnN0YW50cy5sYWJlbF9mb250X3NpemUsIGF0dHJpYnV0ZU5hbWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgbWluVlAsIG1heFZQKVxuICAgIH0sXG59XG5cblxuZnVuY3Rpb24gZ2V0Q1NTU3R5bGVFbnRyaWVzKGN4U3R5bGVFbnRyaWVzLCBlbnRpdHlUeXBlKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN4U3R5bGVFbnRyaWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gY3hTdHlsZUVudHJpZXNba2V5XTtcbiAgICAgICAgaWYgKGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XSkge1xuICAgICAgICAgICAgY29uc3QgY3NzRW50cmllcyA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1ba2V5XShwb3J0YWJsZVByb3BlcnR5VmFsdWUpO1xuICAgICAgICAgICAgY3NzRW50cmllcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0SWRTZWxlY3RvcihpZCwgZWxlbWVudFR5cGUpIHtcbiAgICAvL25vZGUjaWQgb3IgZWRnZSNpZFxuICAgIHJldHVybiBlbGVtZW50VHlwZSArICcjJyArIGlkO1xufVxuXG5cblxuZnVuY3Rpb24gZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpIHtcbiAgICByZXR1cm4geyAnc2VsZWN0b3InOiBzZWxlY3RvciwgJ3N0eWxlJzogY3NzIH07XG59XG5cbmZ1bmN0aW9uIGdldENvbnRpbnVvdXNTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIGluY2x1ZGVNaW4sIGluY2x1ZGVNYXgpIHtcbiAgICBjb25zdCBtaW5Db25kaXRpb24gPSBpbmNsdWRlTWluID8gJz49JyA6ICc+JztcbiAgICBjb25zdCBtYXhDb25kaXRpb24gPSBpbmNsdWRlTWF4ID8gJzw9JyA6ICc8JztcbiAgICBjb25zdCBtaW5Cb3VuZCA9IChtaW5WYWx1ZSAhPT0gdW5kZWZpbmVkKSA/ICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnICcgKyBtaW5Db25kaXRpb24gKyAnICcgKyBtaW5WYWx1ZSArICddJyA6ICcnO1xuICAgIGNvbnN0IG1heEJvdW5kID0gKG1heFZhbHVlICE9PSB1bmRlZmluZWQpID8gJ1snICsgYXR0cmlidXRlTmFtZSArICcgJyArIG1heENvbmRpdGlvbiArICcgJyArIG1heFZhbHVlICsgJ10nIDogJyc7XG4gICAgcmV0dXJuIGVudGl0eVR5cGUgKyBtaW5Cb3VuZCArIG1heEJvdW5kO1xufVxuXG5mdW5jdGlvbiBnZXRDb250aW51b3VzU3R5bGUoZW50aXR5VHlwZSwgcG9ydGFibGVQcm9wZXJ0eUtleSwgYXR0cmlidXRlTmFtZSwgbWluVmFsdWUsIG1heFZhbHVlLCBtaW5WUCwgbWF4VlApIHtcbiAgICBpZiAobWFwRGF0YVByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICByZXR1cm4gbWFwRGF0YVByb3BlcnR5Q29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XShhdHRyaWJ1dGVOYW1lLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIG1pblZQLCBtYXhWUCk7XG4gICAgfVxuICAgIHJldHVybiB7fTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29udGludW91c01hcHBpbmdDU1NFbnRyaWVzKHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ2F0dHJpYnV0ZSddO1xuICAgIGNvbnN0IHJhbmdlTWFwcyA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ21hcCddO1xuICAgIC8vY29uc29sZS5sb2coJ2NvbnRpbnVvdXMgbWFwcGluZyBmb3IgJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgSlNPTi5zdHJpbmdpZnkocmFuZ2VNYXBzLCBudWxsLCAyKSk7XG5cbiAgICByYW5nZU1hcHMuZm9yRWFjaCgocmFuZ2UpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBnZXRDb250aW51b3VzU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgcmFuZ2UubWluLCByYW5nZS5tYXgsIHJhbmdlLmluY2x1ZGVNaW4sIHJhbmdlLmluY2x1ZGVNYXgpO1xuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbnRpbnVvdXNTdHlsZShlbnRpdHlUeXBlLCBwb3J0YWJsZVByb3BlcnR5S2V5LCBhdHRyaWJ1dGVOYW1lLCByYW5nZS5taW4sIHJhbmdlLm1heCwgcmFuZ2UubWluVlBWYWx1ZSwgcmFuZ2UubWF4VlBWYWx1ZSk7XG5cbiAgICAgICAgb3V0cHV0LnB1c2goZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBzdHlsZSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmZ1bmN0aW9uIGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KHBvcnRhYmxlUHJvcGVydHlLZXksIGN4TWFwcGluZ0RlZmluaXRpb24sIGVudGl0eVR5cGUpIHtcbiAgICBpZiAocGFzc3Rocm91Z2hNYXBwaW5nQ29udmVydFtlbnRpdHlUeXBlXVtwb3J0YWJsZVByb3BlcnR5S2V5XSkge1xuICAgICAgICBjb25zdCBjc3MgPSBwYXNzdGhyb3VnaE1hcHBpbmdDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKGN4TWFwcGluZ0RlZmluaXRpb24uYXR0cmlidXRlKTtcbiAgICAgICAgcmV0dXJuIGdldFN0eWxlRWxlbWVudChlbnRpdHlUeXBlLCBjc3MpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVTZWxlY3RvcihlbnRpdHlUeXBlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVEYXRhVHlwZSwgYXR0cmlidXRlVmFsdWUpIHtcbiAgICBpZiAoYXR0cmlidXRlRGF0YVR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgKyAnWycgKyBhdHRyaWJ1dGVOYW1lICsgJyA9IFxcJycgKyBhdHRyaWJ1dGVWYWx1ZSArICdcXCddJztcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZURhdGFUeXBlID09ICdib29sZWFuJykge1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVWYWx1ZSA9PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlICsgJ1s/JyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnXVshJyArIGF0dHJpYnV0ZU5hbWUgKyAnXSc7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW50aXR5VHlwZSArICdbJyArIGF0dHJpYnV0ZU5hbWUgKyAnID0gJyArIGF0dHJpYnV0ZVZhbHVlICsgJ10nO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyhwb3J0YWJsZVByb3BlcnR5S2V5LCBjeE1hcHBpbmdEZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKSB7XG4gICAgbGV0IG91dHB1dCA9IFtdO1xuICAgIGNvbnN0IGF0dHRyaWJ1dGVUb1ZhbHVlTWFwID0gY3hNYXBwaW5nRGVmaW5pdGlvblsnbWFwJ107XG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGN4TWFwcGluZ0RlZmluaXRpb25bJ2F0dHJpYnV0ZSddO1xuICAgIGNvbnN0IGF0dHJpYnV0ZURhdGFUeXBlID0gYXR0cmlidXRlVHlwZU1hcC5nZXQoYXR0cmlidXRlTmFtZSk7XG4gICAgYXR0dHJpYnV0ZVRvVmFsdWVNYXAuZm9yRWFjaCgoZGlzY3JldGVNYXApID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnIGRpc2NyZXRlIG1hcCBmb3IgJyArIHBvcnRhYmxlUHJvcGVydHlLZXkgKyAnOiAnICsgZGlzY3JldGVNYXAudiArICcgKCcgKyBhdHRyaWJ1dGVOYW1lICsgJzwnICsgYXR0cmlidXRlRGF0YVR5cGUgKyAnPikgLT4gJyArIGRpc2NyZXRlTWFwLnZwKTtcblxuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGdldERpc2NyZXRlU2VsZWN0b3IoZW50aXR5VHlwZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlRGF0YVR5cGUsIGRpc2NyZXRlTWFwLnYpO1xuXG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZU1hcCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0oZGlzY3JldGVNYXAudnApO1xuICAgICAgICAgICAgY29uc3QgY3NzID0ge307XG4gICAgICAgICAgICBzdHlsZU1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY3NzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goZ2V0U3R5bGVFbGVtZW50KHNlbGVjdG9yLCBjc3MpKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyAgIHN0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkoY3NzKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIG91dHB1dDsgLy9nZXRTdHlsZUVsZW1lbnQoc2VsZWN0b3IsIGNzcyk7XG59XG5cbmZ1bmN0aW9uIGdldEJ5cGFzc0NTU0VudHJ5KGVudGl0eVR5cGUsIGN4RWxlbWVudCkge1xuXG4gICAgY29uc3QgaWQgPSBjeEVsZW1lbnQuaWQ7XG4gICAgY29uc3QgY3NzID0ge307XG4gICAgT2JqZWN0LmtleXMoY3hFbGVtZW50LnYpLmZvckVhY2goKHBvcnRhYmxlUHJvcGVydHlLZXkpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydGFibGVQcm9wZXJ0eVZhbHVlID0gY3hFbGVtZW50LnZbcG9ydGFibGVQcm9wZXJ0eUtleV07XG4gICAgICAgIGlmIChkZWZhdWx0UHJvcGVydHlDb252ZXJ0W2VudGl0eVR5cGVdW3BvcnRhYmxlUHJvcGVydHlLZXldKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZU1hcCA9IGRlZmF1bHRQcm9wZXJ0eUNvbnZlcnRbZW50aXR5VHlwZV1bcG9ydGFibGVQcm9wZXJ0eUtleV0ocG9ydGFibGVQcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgIHN0eWxlTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBjc3Nba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0SWRTZWxlY3RvcihpZCwgZW50aXR5VHlwZSk7XG4gICAgcmV0dXJuIGdldFN0eWxlRWxlbWVudChzZWxlY3RvciwgY3NzKTtcbn1cblxuLyoqIFxuICogXG4qL1xuZnVuY3Rpb24gZ2V0Q1NTTWFwcGluZ0VudHJpZXMoXG4gICAgY3hNYXBwaW5nRW50cmllcyxcbiAgICBlbnRpdHlUeXBlLFxuICAgIGF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG4gICAgY3hNYXBwaW5nRW50cmllcyAmJiBPYmplY3Qua2V5cyhjeE1hcHBpbmdFbnRyaWVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgY3hNYXBwaW5nRW50cnkgPSBjeE1hcHBpbmdFbnRyaWVzW2tleV07XG4gICAgICAgIC8vY29uc29sZS5sb2coXCIgbWFwcGluZyB0eXBlOiBcIiArIGN4TWFwcGluZ0VudHJ5LnR5cGUpO1xuICAgICAgICBzd2l0Y2ggKGN4TWFwcGluZ0VudHJ5LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0NPTlRJTlVPVVMnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGlub3VzTWFwcGluZ3MgPSBnZXRDb250aW51b3VzTWFwcGluZ0NTU0VudHJpZXMoa2V5LCBjeE1hcHBpbmdFbnRyeS5kZWZpbml0aW9uLCBlbnRpdHlUeXBlLCBhdHRyaWJ1dGVUeXBlTWFwKTtcbiAgICAgICAgICAgICAgICBjb250aW5vdXNNYXBwaW5ncy5mb3JFYWNoKChjb250aW5vdXNNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGNvbnRpbm91c01hcHBpbmcpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdQQVNTVEhST1VHSCc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjc3NFbnRyeSA9IGdldFBhc3N0aHJvdWdoTWFwcGluZ0NTU0VudHJ5KGtleSwgY3hNYXBwaW5nRW50cnkuZGVmaW5pdGlvbiwgZW50aXR5VHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNzc0VudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGNzc0VudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdESVNDUkVURSc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNjcmV0ZU1hcHBpbmdzID0gZ2V0RGlzY3JldGVNYXBwaW5nQ1NTRW50cmllcyhrZXksIGN4TWFwcGluZ0VudHJ5LmRlZmluaXRpb24sIGVudGl0eVR5cGUsIGF0dHJpYnV0ZVR5cGVNYXApO1xuICAgICAgICAgICAgICAgIGRpc2NyZXRlTWFwcGluZ3MuZm9yRWFjaCgoZGlzY3JldGVNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKGRpc2NyZXRlTWFwcGluZyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5cbmNvbnN0IE5PREVfU0VMRUNUT1IgPSAnbm9kZSc7XG5jb25zdCBFREdFX1NFTEVDVE9SID0gJ2VkZ2UnO1xuXG5mdW5jdGlvbiBnZXRWaXN1YWxQcm9wZXJ0aWVzKGN4VmlzdWFsUHJvcGVydGllcywgY3hOb2RlQnlwYXNzZXMsIGN4RWRnZUJ5cGFzc2VzLCBub2RlQXR0cmlidXRlVHlwZU1hcCwgZWRnZUF0dHJpYnV0ZVR5cGVNYXApIHtcbiAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICBzdHlsZTogW10sXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgbGV0IGRlZmF1bHRDU1NOb2RlU3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGRlZmF1bHRDU1NFZGdlU3R5bGUgPSB1bmRlZmluZWQ7XG5cbiAgICBsZXQgY3NzTmV0d29ya0JhY2tncm91bmRDb2xvciA9IHVuZGVmaW5lZDtcblxuICAgIGxldCBtYXBwaW5nQ1NTTm9kZVN0eWxlID0gdW5kZWZpbmVkO1xuICAgIGxldCBtYXBwaW5nQ1NTRWRnZVN0eWxlID0gdW5kZWZpbmVkO1xuXG4gICAgbGV0IGJ5cGFzc0NTU0VudHJpZXMgPSBbXTtcblxuICAgIGN4VmlzdWFsUHJvcGVydGllcy5mb3JFYWNoKCh2cEVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFN0eWxlcyA9IHZwRWxlbWVudC5kZWZhdWx0O1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2RlZmF1bHQgc3R5bGU6ICcgKyBKU09OLnN0cmluZ2lmeShkZWZhdWx0U3R5bGVzKSk7XG4gICAgICAgIGRlZmF1bHRDU1NOb2RlU3R5bGUgPSBnZXRDU1NTdHlsZUVudHJpZXMoZGVmYXVsdFN0eWxlcy5ub2RlLCAnbm9kZScpO1xuICAgICAgICBkZWZhdWx0Q1NTRWRnZVN0eWxlID0gZ2V0Q1NTU3R5bGVFbnRyaWVzKGRlZmF1bHRTdHlsZXMuZWRnZSwgJ2VkZ2UnKTtcblxuICAgICAgICBjc3NOZXR3b3JrQmFja2dyb3VuZENvbG9yID0gZGVmYXVsdFN0eWxlcy5uZXR3b3JrWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgY29uc3Qgbm9kZU1hcHBpbmcgPSB2cEVsZW1lbnQubm9kZU1hcHBpbmc7XG4gICAgICAgIG1hcHBpbmdDU1NOb2RlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhub2RlTWFwcGluZywgJ25vZGUnLCBub2RlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgY29uc3QgZWRnZU1hcHBpbmcgPSB2cEVsZW1lbnQuZWRnZU1hcHBpbmc7XG4gICAgICAgIG1hcHBpbmdDU1NFZGdlU3R5bGUgPSBnZXRDU1NNYXBwaW5nRW50cmllcyhlZGdlTWFwcGluZywgJ2VkZ2UnLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICB9KVxuXG4gICAgY3hOb2RlQnlwYXNzZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGJ5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnbm9kZScsIHZwRWxlbWVudCkpO1xuICAgIH0pO1xuXG4gICAgY3hFZGdlQnlwYXNzZXMuZm9yRWFjaCgodnBFbGVtZW50KSA9PiB7XG4gICAgICAgIGJ5cGFzc0NTU0VudHJpZXMucHVzaChnZXRCeXBhc3NDU1NFbnRyeSgnZWRnZScsIHZwRWxlbWVudCkpO1xuICAgIH0pO1xuXG4gICAgLy9jb25zb2xlLmxvZygnZGVmYXVsdCBub2RlIHN0eWxlOiAnICsgSlNPTi5zdHJpbmdpZnkoZGVmYXVsdENTU05vZGVTdHlsZSkpO1xuXG4gICAgLy9BZGQgZGVmYXVsdCBzdHlsZVxuICAgIG91dHB1dC5zdHlsZS5wdXNoKGdldFN0eWxlRWxlbWVudChOT0RFX1NFTEVDVE9SLCBkZWZhdWx0Q1NTTm9kZVN0eWxlKSk7XG4gICAgb3V0cHV0LnN0eWxlLnB1c2goZ2V0U3R5bGVFbGVtZW50KEVER0VfU0VMRUNUT1IsIGRlZmF1bHRDU1NFZGdlU3R5bGUpKTtcblxuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgbWFwcGluZ0NTU05vZGVTdHlsZSk7XG4gICAgb3V0cHV0LnN0eWxlLnB1c2guYXBwbHkob3V0cHV0LnN0eWxlLCBtYXBwaW5nQ1NTRWRnZVN0eWxlKTtcblxuICAgIG91dHB1dC5zdHlsZS5wdXNoLmFwcGx5KG91dHB1dC5zdHlsZSwgYnlwYXNzQ1NTRW50cmllcyk7XG5cbiAgICBvdXRwdXRbJ2JhY2tncm91bmQtY29sb3InXSA9IGNzc05ldHdvcmtCYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufVxuXG5jb25zdCBjb252ZXJ0ZXIgPSB7XG4gICAgdGFyZ2V0Rm9ybWF0OiAnY3l0b3NjYXBlSlMnLFxuICAgIGVtcHR5TmV0d29yazoge1xuICAgICAgICBzdHlsZTogW10sXG4gICAgICAgIGVsZW1lbnRzOiB7fSxcbiAgICAgICAgbGF5b3V0OiB7fSxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBudWxsXG4gICAgfSxcbiAgICBjb252ZXJ0OiAoY3gpID0+IHtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0ge1xuICAgICAgICAgICAgc3R5bGU6IFtdLFxuICAgICAgICAgICAgZWxlbWVudHM6IHt9LFxuICAgICAgICAgICAgbGF5b3V0OiB7fSxcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN4VmlzdWFsUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGN4Tm9kZUJ5cGFzc2VzID0gW107XG4gICAgICAgIGxldCBjeEVkZ2VCeXBhc3NlcyA9IFtdO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVUeXBlTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlTmFtZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGVkZ2VBdHRyaWJ1dGVOYW1lTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGxldCBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgZWRnZUF0dHJpYnV0ZURlZmF1bHRWYWx1ZU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0WydhdHRyaWJ1dGVEZWNsYXJhdGlvbnMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4QXR0cmlidXRlRGVjbGFyYXRpb25zID0gY3hBc3BlY3RbJ2F0dHJpYnV0ZURlY2xhcmF0aW9ucyddO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIgY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnM6IFwiICsgSlNPTi5zdHJpbmdpZnkoY3hBdHRyaWJ1dGVEZWNsYXJhdGlvbnMsIG51bGwsIDIpKTtcbiAgICAgICAgICAgICAgICBjeFV0aWwucHJvY2Vzc0F0dHJpYnV0ZURlY2xhcmF0aW9ucyhjeEF0dHJpYnV0ZURlY2xhcmF0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsXG4gICAgICAgICAgICAgICAgICAgIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLFxuICAgICAgICAgICAgICAgICAgICBub2RlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwLFxuICAgICAgICAgICAgICAgICAgICBlZGdlQXR0cmlidXRlTmFtZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZUF0dHJpYnV0ZVR5cGVNYXAsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4Tm9kZXMgPSBjeEFzcGVjdFsnbm9kZXMnXTtcbiAgICAgICAgICAgICAgICBjeE5vZGVzLmZvckVhY2goKGN4Tm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjeFV0aWwudXBkYXRlSW5mZXJyZWRUeXBlcyhub2RlQXR0cmlidXRlVHlwZU1hcCwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIGN4Tm9kZVsndiddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3hBc3BlY3RbJ2VkZ2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjeEVkZ2VzID0gY3hBc3BlY3RbJ2VkZ2VzJ107XG4gICAgICAgICAgICAgICAgY3hFZGdlcy5mb3JFYWNoKChjeEVkZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3hVdGlsLnVwZGF0ZUluZmVycmVkVHlwZXMoZWRnZUF0dHJpYnV0ZVR5cGVNYXAsIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBjeEVkZ2VbJ3YnXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0Wyd2aXN1YWxQcm9wZXJ0aWVzJ10pIHtcbiAgICAgICAgICAgICAgICBjeFZpc3VhbFByb3BlcnRpZXMgPSBjeEFzcGVjdFsndmlzdWFsUHJvcGVydGllcyddO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnbm9kZUJ5cGFzc2VzJ10pIHtcbiAgICAgICAgICAgICAgICBjeEFzcGVjdC5ub2RlQnlwYXNzZXMuZm9yRWFjaChieXBhc3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjeE5vZGVCeXBhc3Nlcy5wdXNoKGJ5cGFzcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN4QXNwZWN0WydlZGdlQnlwYXNzZXMnXSkge1xuICAgICAgICAgICAgICAgIGN4QXNwZWN0LmVkZ2VCeXBhc3Nlcy5mb3JFYWNoKGJ5cGFzcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN4RWRnZUJ5cGFzc2VzLnB1c2goYnlwYXNzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbm9kZUF0dHJpYnV0ZVR5cGVNYXAuZm9yRWFjaCgoaW5mZXJyZWRUeXBlLCBhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3Igbm9kZTogJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWRnZUF0dHJpYnV0ZVR5cGVNYXAuZm9yRWFjaCgoaW5mZXJyZWRUeXBlLCBhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdpbmZlcnJlZCBhdHRyaWJ1dGUgdHlwZSBmb3IgZWRnZTogJyArIGF0dHJpYnV0ZU5hbWUgKyAnOiAnICsgaW5mZXJyZWRUeXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9BZGQgbm9kZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydub2RlcyddID0gW107XG5cbiAgICAgICAgLy9BZGQgZWRnZXNcbiAgICAgICAgb3V0cHV0LmVsZW1lbnRzWydlZGdlcyddID0gW107XG5cblxuICAgICAgICBjeC5mb3JFYWNoKChjeEFzcGVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGN4QXNwZWN0Wydub2RlcyddKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3hOb2RlcyA9IGN4QXNwZWN0Wydub2RlcyddO1xuICAgICAgICAgICAgICAgIGN4Tm9kZXMuZm9yRWFjaCgoY3hOb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddID0gY3hVdGlsLmdldEV4cGFuZGVkQXR0cmlidXRlcyhjeE5vZGVbJ3YnXSwgbm9kZUF0dHJpYnV0ZU5hbWVNYXAsIG5vZGVBdHRyaWJ1dGVEZWZhdWx0VmFsdWVNYXApO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WydkYXRhJ11bJ2lkJ10gPSBjeE5vZGUuaWQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsncG9zaXRpb24nXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGN4Tm9kZVsneCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogY3hOb2RlWyd5J11cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMubm9kZXMucHVzaChlbGVtZW50KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjeEFzcGVjdFsnZWRnZXMnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4RWRnZXMgPSBjeEFzcGVjdFsnZWRnZXMnXTtcbiAgICAgICAgICAgICAgICBjeEVkZ2VzLmZvckVhY2goKGN4RWRnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXSA9IGN4VXRpbC5nZXRFeHBhbmRlZEF0dHJpYnV0ZXMoY3hFZGdlWyd2J10sIGVkZ2VBdHRyaWJ1dGVOYW1lTWFwLCBlZGdlQXR0cmlidXRlRGVmYXVsdFZhbHVlTWFwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWydpZCddID0gY3hFZGdlLmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbJ2RhdGEnXVsnc291cmNlJ10gPSBjeEVkZ2VbJ3MnXTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnZGF0YSddWyd0YXJnZXQnXSA9IGN4RWRnZVsndCddO1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuZWxlbWVudHMuZWRnZXMucHVzaChlbGVtZW50KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzdHlsZSA9IGdldFZpc3VhbFByb3BlcnRpZXMoY3hWaXN1YWxQcm9wZXJ0aWVzLCBjeE5vZGVCeXBhc3NlcywgY3hFZGdlQnlwYXNzZXMsIG5vZGVBdHRyaWJ1dGVUeXBlTWFwLCBlZGdlQXR0cmlidXRlVHlwZU1hcCk7XG5cbiAgICAgICAgb3V0cHV0LnN0eWxlID0gc3R5bGUuc3R5bGU7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3Zpc3VhbFByb3BlcnRpZXM6ICcgKyBKU09OLnN0cmluZ2lmeShjeFZpc3VhbFByb3BlcnRpZXMsIG51bGwsIDIpKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnc3R5bGU6ICcgKyBKU09OLnN0cmluZ2lmeShvdXRwdXQuc3R5bGUsIG51bGwsIDIpKTtcblxuICAgICAgICBvdXRwdXRbJ2JhY2tncm91bmQtY29sb3InXSA9IHN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ107XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnZlcnRlcjogY29udmVydGVyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKUy5qcyIsIlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgICAnc2hhcGUnOiAnc2hhcGUnLFxuICAgICd3aWR0aCc6ICd3aWR0aCcsIFxuICAgICdoZWlnaHQnOiAnaGVpZ2h0JyxcbiAgICAnYmFja2dyb3VuZF9jb2xvcic6ICdiYWNrZ3JvdW5kLWNvbG9yJyxcbiAgICAnYmFja2dyb3VuZF9vcGFjaXR5JzogJ2JhY2tncm91bmQtb3BhY2l0eScsXG4gICAgJ2xhYmVsJzogJ2xhYmVsJyxcbiAgICAnbGFiZWxfY29sb3InOiAnY29sb3InLFxuICAgICdsYWJlbF9mb250X3NpemUnIDogJ2ZvbnQtc2l6ZScsXG4gICAgJ2xhYmVsX29wYWNpdHknIDogJ3RleHQtb3BhY2l0eScsXG4gICAgJ29wYWNpdHknOiAnb3BhY2l0eScsXG4gICAgJ2xpbmVfY29sb3InOiAnbGluZS1jb2xvcidcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeXRvc2NhcGVKUy9jeXRvc2NhcGVKU0NvbnN0YW50cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=