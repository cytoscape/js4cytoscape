
const cxConstants = require('../cxConstants.js');
const jsConstants = require('./cytoscapeJSConstants.js');
const cxUtil = require('../cxUtil.js');

function simpleDefaultPropertyConvert(targetStyleField, portablePropertValue) {
    const targetStyleEntry = new Map();
    targetStyleEntry.set(targetStyleField, portablePropertValue);
    return targetStyleEntry;
}

const defaultPropertyConvert = {
    'node': {
        'NODE_SHAPE': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.shape, portablePropertyValue),
        'NODE_WIDTH': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.width, portablePropertyValue),
        'NODE_HEIGHT': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.height, portablePropertyValue),
        'NODE_BACKGROUND_COLOR': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.background_color, portablePropertyValue),
        'NODE_BACKGROUND_OPACITY': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.background_opacity, portablePropertyValue),
        'NODE_LABEL': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.label, portablePropertyValue),
        'NODE_LABEL_COLOR': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.label_color, portablePropertyValue),
        'NODE_LABEL_OPACITY': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.label_opacity, portablePropertyValue),
        'NODE_LABEL_FONT_SIZE': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.label_font_size, portablePropertyValue)
    },
    'edge': {
        'EDGE_WIDTH': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.width, portablePropertyValue),
        'EDGE_OPACITY': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.opacity, portablePropertyValue),
        'EDGE_LABEL': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.label, portablePropertyValue),
        'EDGE_LINE_COLOR': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.line_color, portablePropertyValue),
        'EDGE_LABEL_OPACITY': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.label_opacity, portablePropertyValue),
        'EDGE_LABEL_FONT_SIZE': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.label_font_size, portablePropertyValue)
    },
}

function simplePassthroughMappingConvert(targetStyleField, attributeName) {
    const output = {};
    output[targetStyleField] = 'data(' + attributeName + ')';
    return output;
}

const passthroughMappingConvert = {
    'node': {
        'NODE_SHAPE': (attributeName) => simplePassthroughMappingConvert(jsConstants.shape, attributeName),
        'NODE_WIDTH': (attributeName) => simplePassthroughMappingConvert(jsConstants.width, attributeName),
        'NODE_HEIGHT': (attributeName) => simplePassthroughMappingConvert(jsConstants.height, attributeName),
        'NODE_BACKGROUND_COLOR': (attributeName) => simplePassthroughMappingConvert(jsConstants.background_color, attributeName),
        'NODE_BACKGROUND_OPACITY': (attributeName) => simplePassthroughMappingConvert(jsConstants.background_opacity, attributeName),
        'NODE_LABEL': (attributeName) => simplePassthroughMappingConvert(jsConstants.label, attributeName),
        'NODE_LABEL_COLOR': (attributeName) => simplePassthroughMappingConvert(jsConstants.label_color, attributeName),
        'NODE_LABEL_OPACITY': (attributeName) => simplePassthroughMappingConvert(jsConstants.label_opacity, attributeName),
        'NODE_LABEL_FONT_SIZE': (attributeName) => simplePassthroughMappingConvert(jsConstants.label_font_size, attributeName)
    },
    'edge': {
        'EDGE_WIDTH': (attributeName) => simplePassthroughMappingConvert(jsConstants.width, attributeName),
        'EDGE_OPACITY': (attributeName) => simplePassthroughMappingConvert(jsConstants.opacity, attributeName),
        'EDGE_LINE_COLOR': (attributeName) => simplePassthroughMappingConvert(jsConstants.line_color, attributeName),
        'EDGE_LABEL': (attributeName) => simplePassthroughMappingConvert(jsConstants.label, attributeName),
        'EDGE_LABEL_COLOR': (attributeName) => simplePassthroughMappingConvert(jsConstants.label_color, attributeName),
        'EDGE_LABEL_OPACITY': (attributeName) => simplePassthroughMappingConvert(jsConstants.label_opacity, attributeName),
        'EDGE_LABEL_FONT_SIZE': (attributeName) => simplePassthroughMappingConvert(jsConstants.label_font_size, attributeName)
    },
}
function simpleMapDataPropertyConvert(targetStyleField, attributeName, minValue, maxValue, minVP, maxVP) {
    let output = {};
    output[targetStyleField] = 'mapData(' + attributeName
        + ', ' + minValue
        + ', ' + maxValue
        + ', ' + minVP
        + ', ' + maxVP
        + ')';
    return output;
}

const mapDataPropertyConvert = {
    'node': {
        'NODE_SHAPE': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.shape, attributeName, minValue, maxValue, minVP, maxVP),
        'NODE_WIDTH': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.width, attributeName, minValue, maxValue, minVP, maxVP),
        'NODE_HEIGHT': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.height, attributeName, minValue, maxValue, minVP, maxVP),
        'NODE_BACKGROUND_COLOR': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.background_color, attributeName, minValue, maxValue, minVP, maxVP),
        'NODE_BACKGROUND_OPACITY': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.background_opacity, attributeName, minValue, maxValue, minVP, maxVP),
        'NODE_LABEL': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.label, attributeName, minValue, maxValue, minVP, maxVP),
        'NODE_LABEL_COLOR': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.label_color, attributeName, minValue, maxValue, minVP, maxVP),
        'NODE_LABEL_OPACITY': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.label_opacity, attributeName, minValue, maxValue, minVP, maxVP),
        'NODE_LABEL_FONT_SIZE': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.label_font_size, attributeName, minValue, maxValue, minVP, maxVP)

    },
    'edge': {
        'EDGE_WIDTH': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.width, attributeName, minValue, maxValue, minVP, maxVP),
        'EDGE_OPACITY': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.opacity, attributeName, minValue, maxValue, minVP, maxVP),
        'EDGE_LINE_COLOR': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.line_color, attributeName, minValue, maxValue, minVP, maxVP),
        'EDGE_LABEL': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.label, attributeName, minValue, maxValue, minVP, maxVP),
        'EDGE_LABEL_COLOR': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.label_color, attributeName, minValue, maxValue, minVP, maxVP),
        'EDGE_LABEL_OPACITY': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.label_opacity, attributeName, minValue, maxValue, minVP, maxVP),
        'EDGE_LABEL_FONT_SIZE': (attributeName, minValue, maxValue, minVP, maxVP) => simpleMapDataPropertyConvert(jsConstants.label_font_size, attributeName, minValue, maxValue, minVP, maxVP)
    },
}


function getCSSStyleEntries(cxStyleEntries, entityType) {
    let output = {};
    Object.keys(cxStyleEntries).forEach((key) => {
        const portablePropertyValue = cxStyleEntries[key];
        if (defaultPropertyConvert[entityType][key]) {
            const cssEntries = defaultPropertyConvert[entityType][key](portablePropertyValue);
            cssEntries.forEach((value, key) => {
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
    const minCondition = includeMin ? '>=' : '>';
    const maxCondition = includeMax ? '<=' : '<';

    return entityType + '[' + attributeName + ' ' + minCondition + ' ' + minValue + '][' + attributeName + ' ' + maxCondition + ' ' + maxValue + ']'
}

function getContinuousStyle(entityType, portablePropertyKey, attributeName, minValue, maxValue, minVP, maxVP) {
    let output = {};
    if (mapDataPropertyConvert[entityType][portablePropertyKey]) {
        return mapDataPropertyConvert[entityType][portablePropertyKey](attributeName, minValue, maxValue, minVP, maxVP);
    }
    return output;
}

function getContinuousMappingCSSEntries(portablePropertyKey, cxMappingDefinition, entityType, attributeTypeMap) {
    let output = [];
    const attributeName = cxMappingDefinition['attribute'];
    const rangeMaps = cxMappingDefinition['map'];
    console.log('continuous mapping for ' + attributeName + ': ' + JSON.stringify(rangeMaps, null, 2));

    rangeMaps.forEach((range) => {
        const selector = getContinuousSelector(entityType, attributeName, range.min, range.max, range.includeMin, range.includeMax);
        const style = getContinuousStyle(entityType, portablePropertyKey, attributeName, range.min, range.max, range.minVPValue, range.maxVPValue);

        output.push(getStyleElement(selector, style));
    });
    return output;
}

function getPassthroughMappingCSSEntry(portablePropertyKey, cxMappingDefinition, entityType) {
    if (passthroughMappingConvert[entityType][portablePropertyKey]) {
        const css = passthroughMappingConvert[entityType][portablePropertyKey](cxMappingDefinition.attribute);
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
    let output = [];
    const atttributeToValueMap = cxMappingDefinition['map'];
    const attributeName = cxMappingDefinition['attribute'];
    const attributeDataType = attributeTypeMap.get(attributeName);
    atttributeToValueMap.forEach((discreteMap) => {
        console.log(' discrete map for ' + portablePropertyKey + ': ' + discreteMap.v + ' (' + attributeName + '<' + attributeDataType + '>) -> ' + discreteMap.vp);

        const selector = getDiscreteSelector(entityType, attributeName, attributeDataType, discreteMap.v);

        if (defaultPropertyConvert[entityType][portablePropertyKey]) {
            const styleMap = defaultPropertyConvert[entityType][portablePropertyKey](discreteMap.vp);
            const css = {};
            styleMap.forEach((value, key) => {
                css[key] = value;
            });
            output.push(getStyleElement(selector, css));
            //console.log('   style: ' + JSON.stringify(css));
        }
    });


    return output; //getStyleElement(selector, css);
}

function getBypassCSSEntry(entityType, cxElement) {

    const id = cxElement.id;
    const css = {};
    Object.keys(cxElement.v).forEach((portablePropertyKey) => {
        const portablePropertyValue = cxElement.v[portablePropertyKey];
        if (defaultPropertyConvert[entityType][portablePropertyKey]) {
            const styleMap = defaultPropertyConvert[entityType][portablePropertyKey](portablePropertyValue);
            styleMap.forEach((value, key) => {
                css[key] = value;
            });
        }
    });

    const selector = getIdSelector(id, entityType);
    return getStyleElement(selector, css);
}

/** 
 * 
*/
function getCSSMappingEntries(
    cxMappingEntries,
    entityType,
    attributeTypeMap) {
    let output = [];
    Object.keys(cxMappingEntries).forEach((key) => {
        const cxMappingEntry = cxMappingEntries[key];
        console.log(" mapping type: " + cxMappingEntry.type);
        switch (cxMappingEntry.type) {
            case 'CONTINUOUS': {
                const continousMappings = getContinuousMappingCSSEntries(key, cxMappingEntry.definition, entityType, attributeTypeMap);
                continousMappings.forEach((continousMapping) => {
                    output.push(continousMapping);
                })
                break;
            }
            case 'PASSTHROUGH': {
                const cssEntry = getPassthroughMappingCSSEntry(key, cxMappingEntry.definition, entityType);
                if (cssEntry) {
                    output.push(cssEntry);
                }
                break;
            }
            case 'DISCRETE': {
                const discreteMappings = getDiscreteMappingCSSEntries(key, cxMappingEntry.definition, entityType, attributeTypeMap);
                discreteMappings.forEach((discreteMapping) => {
                    output.push(discreteMapping);
                })
                break;
            }
        }
    });
    return output;
}

const NODE_SELECTOR = 'node';
const EDGE_SELECTOR = 'edge';

function getVisualProperties(cxVisualProperties, cxNodeBypasses, cxEdgeBypasses, nodeAttributeTypeMap, edgeAttributeTypeMap) {
    let output = {
        style: [],
        'background-color': undefined
    }

    let defaultCSSNodeStyle = undefined;
    let defaultCSSEdgeStyle = undefined;

    let cssNetworkBackgroundColor = undefined;

    let mappingCSSNodeStyle = undefined;
    let mappingCSSEdgeStyle = undefined;

    let bypassCSSEntries = [];

    cxVisualProperties.forEach((vpElement) => {
        const defaultStyles = vpElement.default;

        console.log('portable node style: ' + JSON.stringify(defaultStyles.node));
        defaultCSSNodeStyle = getCSSStyleEntries(defaultStyles.node, 'node');
        defaultCSSEdgeStyle = getCSSStyleEntries(defaultStyles.edge, 'edge');

        cssNetworkBackgroundColor = defaultStyles.network['background-color'];

        const nodeMapping = vpElement.nodeMapping;
        mappingCSSNodeStyle = getCSSMappingEntries(nodeMapping, 'node', nodeAttributeTypeMap);

        const edgeMapping = vpElement.edgeMapping;
        mappingCSSEdgeStyle = getCSSMappingEntries(edgeMapping, 'edge', edgeAttributeTypeMap);

    })
    cxNodeBypasses.forEach((vpElement) => {
       
        bypassCSSEntries.push(getBypassCSSEntry('node', vpElement));
    });

    cxEdgeBypasses.forEach((vpElement) => {
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

const converter = {
    targetFormat: 'cytoscapeJS',
    convert: (cx) => {
        const output = {
            style: [],
            elements: {},
            layout: {},
            'background-color': null
        }

        let cxVisualProperties = undefined;
        let cxNodeBypasses = undefined;
        let cxEdgeBypasses = undefined;

        let nodeAttributeTypeMap = new Map();
        let edgeAttributeTypeMap = new Map();

        let nodeAttributeNameMap = new Map();
        let edgeAttributeNameMap = new Map();

        let nodeAttributeDefaultValueMap = new Map();
        let edgeAttributeDefaultValueMap = new Map();

        cx.forEach((cxAspect) => {
            if (cxAspect['attributeDeclarations']) {
                const cxAttributeDeclarations = cxAspect['attributeDeclarations'];
                console.log(" cxAttributeDeclarations: " + JSON.stringify(cxAttributeDeclarations, null, 2));
                cxUtil.processAttributeDeclarations(cxAttributeDeclarations,
                    nodeAttributeNameMap,
                    nodeAttributeTypeMap,
                    nodeAttributeDefaultValueMap,
                    edgeAttributeNameMap,
                    edgeAttributeTypeMap,
                    edgeAttributeDefaultValueMap
                );
            } else if (cxAspect['nodes']) {
                const cxNodes = cxAspect['nodes'];
                cxNodes.forEach((cxNode) => {
                    cxUtil.updateInferredTypes(nodeAttributeTypeMap, nodeAttributeNameMap, cxNode['v']);
                });
            } else if (cxAspect['edges']) {
                const cxEdges = cxAspect['edges'];
                cxEdges.forEach((cxEdge) => {
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

        nodeAttributeTypeMap.forEach((inferredType, attributeName) => {
            console.log('inferred attribute type for node: ' + attributeName + ': ' + inferredType);
        });

        edgeAttributeTypeMap.forEach((inferredType, attributeName) => {
            console.log('inferred attribute type for edge: ' + attributeName + ': ' + inferredType);
        });

        //Add nodes
        output.elements['nodes'] = [];

        //Add edges
        output.elements['edges'] = [];


        cx.forEach((cxAspect) => {
            if (cxAspect['nodes']) {
                const cxNodes = cxAspect['nodes'];
                cxNodes.forEach((cxNode) => {
                    const element = {};
                    element['data'] = cxUtil.getExpandedAttributes(cxNode['v'], nodeAttributeNameMap, nodeAttributeDefaultValueMap);
                    element['data']['id'] = cxNode.id.toString();
                    element['position'] = {
                        x: cxNode['x'],
                        y: cxNode['y']
                    }
                    output.elements.nodes.push(element)
                });
            } else if (cxAspect['edges']) {
                const cxEdges = cxAspect['edges'];
                cxEdges.forEach((cxEdge) => {
                    const element = {};
                    element['data'] = cxUtil.getExpandedAttributes(cxEdge['v'], edgeAttributeNameMap, edgeAttributeDefaultValueMap);
                    element['data']['id'] = cxEdge.id.toString();
                    element['data']['source'] = cxEdge['s'];
                    element['data']['target'] = cxEdge['t'];
                    output.elements.edges.push(element)
                });
            }
        });

        const style = getVisualProperties(cxVisualProperties, cxNodeBypasses, cxEdgeBypasses, nodeAttributeTypeMap, edgeAttributeTypeMap);

        output.style = style.style;
        console.log('visualProperties: ' + JSON.stringify(cxVisualProperties, null, 2));
        console.log('style: ' + JSON.stringify(output.style, null, 2));

        output['background-color'] = style['background-color'];

        return output;
    }
}

module.exports = {
    converter: converter
};