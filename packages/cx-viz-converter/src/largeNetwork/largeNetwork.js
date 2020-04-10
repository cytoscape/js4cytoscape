
const cxConstants = require('../cxConstants.js');
const largeNetworkConstants = require('./largeNetworkConstants.js');
const cxUtil = require('../cxUtil.js');

function simpleDefaultPropertyConvert(targetStyleField, portablePropertValue) {
    const targetStyleEntry = {};
    targetStyleEntry[targetStyleField] = portablePropertValue;
    return targetStyleEntry;
}

function hexToRGB(hex) {
    let r = 0, g = 0, b = 0;

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
    return alphaDecimal * 255;
}

const defaultPropertyConvert = {
    'node': {
        'NODE_WIDTH': (portablePropertyValue) => simpleDefaultPropertyConvert('width', portablePropertyValue),
        'NODE_HEIGHT': (portablePropertyValue) => simpleDefaultPropertyConvert('height', portablePropertyValue),
        'NODE_BACKGROUND_COLOR': (portablePropertyValue) => simpleDefaultPropertyConvert(largeNetworkConstants.color, hexToRGB(portablePropertyValue)),
        'NODE_BACKGROUND_OPACITY': (portablePropertyValue) => simpleDefaultPropertyConvert('alpha', alphaToInt(portablePropertyValue)),
        'NODE_LABEL': (portablePropertyValue) => simpleDefaultPropertyConvert(largeNetworkConstants.label, portablePropertyValue),
    },
    'edge': {
        'EDGE_WIDTH': (portablePropertyValue) => simpleDefaultPropertyConvert(largeNetworkConstants.width, portablePropertyValue),
        'EDGE_OPACITY': (portablePropertyValue) => simpleDefaultPropertyConvert('alpha', alphaToInt(portablePropertyValue)),
        'EDGE_LINE_COLOR': (portablePropertyValue) => simpleDefaultPropertyConvert(largeNetworkConstants.color, hexToRGB(portablePropertyValue))
    }
}



function getDefaultValues(defaultVisualProperties) {
    let output = {
        node: {},
        edge: {}
    };
    if (defaultVisualProperties['node']) {
        const nodeDefault = defaultVisualProperties.node;
        const lnvEntries = getLNVValues('node', nodeDefault);
        Object.assign(output.node, lnvEntries);
    }
    if (defaultVisualProperties['edge']) {
        const edgeDefault = defaultVisualProperties.edge;
        const lnvEntries = getLNVValues('edge', edgeDefault);
        Object.assign(output.edge, lnvEntries);
    }
    return output;
}

function getLNVValues(entityType, entries) {
    let output = {};
    Object.keys(entries).forEach(portablePropertyKey => {
        const portablePropertyValue = entries[portablePropertyKey];
        if (defaultPropertyConvert[entityType][portablePropertyKey]) {
            const lnvEntry = defaultPropertyConvert[entityType][portablePropertyKey](portablePropertyValue);
            Object.keys(lnvEntry).forEach(lnvKey => {
                output[lnvKey] = lnvEntry[lnvKey];
            });
        }
    })
    return output;
}

function processColor(colorArray, alpha) {
    return colorArray != undefined
        ? alpha != undefined
            ? [colorArray[0], colorArray[1], colorArray[2], alpha]
            : [colorArray[0], colorArray[1], colorArray[2]]
        : undefined;
}

function processSize(width, height) {
    return Math.max(width, height);
}

function processNodeView(nodeView) {
    let width = undefined;
    let height = undefined;
    let colorArray = undefined;
    let alpha = undefined;
    let output = {
        id: nodeView.id,
        position: nodeView.position
    };


    Object.keys(nodeView).forEach(key => {
        if (key === 'width') {
            width = nodeView.width;
        } else if (key === 'height') {
            height = nodeView.height;
        } else if (key === 'color') {
            colorArray = nodeView.color;
        } else if (key === 'alpha') {
            alpha = nodeView.alpha;
        } else {
            output[key] = nodeView[key];
        }
    });

    const color = processColor(colorArray, alpha);
    if (color) {
        output[largeNetworkConstants.color] = color;
    }

    const size = processSize(width, height);
    if (size) {
        output[largeNetworkConstants.size] = processSize(width, height);
    }
    return output;
}

function processEdgeView(edgeView) {
    let colorArray = undefined;
    let alpha = undefined;

    let output = {
        id: edgeView.id,
        s: edgeView.s,
        t: edgeView.t
    }

    Object.keys(edgeView).forEach(key => {
        if (key === 'color') {
            colorArray = edgeView.color;
        } else if (key === 'alpha') {
            alpha = edgeView.alpha;
        }
    });

    const color = processColor(colorArray, alpha);
    if (color) {
        output[largeNetworkConstants.color] = color;
    }
    return output;
}

const mappingPropertyConvert = {
    'node': {
        'NODE_WIDTH': ['width'],
        'NODE_HEIGHT': ['height'],
        'NODE_BACKGROUND_COLOR': [largeNetworkConstants.color],
        'NODE_BACKGROUND_OPACITY': ['alpha'],
        'NODE_LABEL': [largeNetworkConstants.label],
    },
    'edge': {
        'EDGE_WIDTH': [largeNetworkConstants.width],
        'EDGE_OPACITY': ['alpha'],
        'EDGE_LINE_COLOR': [largeNetworkConstants.color]
    }
}

function getMappings(mappings) {
    let output = {}
    Object.keys(mappings).forEach(propertyKey => {
        const mapping = mappings[propertyKey];
        output[mapping.definition.attribute] = {
            type: mapping.type,
            vp: propertyKey,
            definition: mapping.definition
        }
    });
    return output;
}

function getMapppedValues(mappings, entityType, attributes) {
    let output = {};
    Object.keys(attributes).forEach(attributeKey => {
        const attributeValue = attributes[attributeKey];
        if (mappings[entityType][attributeKey]) {
            const mapping = mappings[entityType][attributeKey];
            const lnvVPs = mappingPropertyConvert[entityType][mapping.vp];
            lnvVPs.forEach(lnvVP => {
                if (mapping.type === 'DISCRETE') {
                    
                } else if (mapping.type === 'PASSTHROUGH') {
                    output[lnvVP] = attributeValue;
                } else if (mapping.type === 'CONTINUOUS') {

                }
            });
        }
    });
    return output;
}

function lnvConvert(cx) {

    //First pass. 
    // We may need to collect object attributes to calculate
    // mappings in the second pass. 

    let cxVisualProperties;

    let nodeAttributeTypeMap = new Map();
    let edgeAttributeTypeMap = new Map();

    let nodeAttributeNameMap = new Map();
    let edgeAttributeNameMap = new Map();

    let nodeAttributeDefaultValueMap = new Map();
    let edgeAttributeDefaultValueMap = new Map();

    let defaultValues = undefined;
    let mappings = {
        node: {},
        edge: {}
    }
    let bypassMappings = {
        'node': {},
        'edge': {}
    };

    cx.forEach((cxAspect) => {
        if (cxAspect['attributeDeclarations']) {
            const cxAttributeDeclarations = cxAspect['attributeDeclarations'];
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
            })
        } else if (cxAspect['edges']) {
            const cxEdges = cxAspect['edges'];
            cxEdges.forEach((cxEdge) => {
                cxUtil.updateInferredTypes(edgeAttributeTypeMap, edgeAttributeNameMap, cxEdge['v']);
            })
        } else if (cxAspect['visualProperties']) {
            cxVisualProperties = cxAspect['visualProperties'];
        }
    });

    let output = {};

    let nodeViews = [];
    let edgeViews = [];

    cxVisualProperties.forEach(vpElement => {
        const vpAt = vpElement.at;
        if (vpAt === cxConstants.STYLE) {
            const value = vpElement.v;
            const defaultStyles = value.default;

            defaultValues = getDefaultValues(defaultStyles);
            console.log('large network default style = ' + JSON.stringify(defaultValues, null, 2));

            const nodeMapping = value.nodeMapping;
            mappings.node = getMappings(nodeMapping);
            //mappingCSSNodeStyle = getCSSMappingEntries(nodeMapping, 'node', nodeAttributeTypeMap);

            const edgeMapping = value.edgeMapping;
            mappings.edge = getMappings(edgeMapping);

            //mappingCSSEdgeStyle = getCSSMappingEntries(edgeMapping, 'edge', edgeAttributeTypeMap);

        } else if (vpAt === cxConstants.N) {

            const key = vpElement[cxConstants.PO].toString();
            const values = getLNVValues('node', vpElement.v)

            if (!bypassMappings.node[key]) {
                bypassMappings.node[key] = {};
            }

            console.log('bypass calculated: ' + JSON.stringify(values, null, 2));

            Object.assign(bypassMappings.node[key], values);
            //bypassCSSEntries.push(getBypassCSSEntry('node', vpElement));
        } else if (vpAt === cxConstants.E) {
            const key = vpElement[cxConstants.PO].toString();
            const values = getLNVValues('edge', vpElement.v)

            if (!bypassMappings.edge[key]) {
                bypassMappings.edge[key] = {};
            }

            console.log('bypass calculated: ' + JSON.stringify(values, null, 2));

            Object.assign(bypassMappings.edge[key], values);
        }
    });

    console.log('mappings: ' + JSON.stringify(mappings, null, 2));

    //Second pass. 
    // Here is where the actual output is generated.

    cx.forEach((cxAspect) => {
        if (cxAspect['nodes']) {
            const cxNodes = cxAspect['nodes'];


            cxNodes.forEach((cxNode) => {
                const cxId = cxNode[cxConstants.ID].toString();
                let nodeView = {
                    id: cxId,
                    position: cxNode['z'] ?
                        [cxNode['x'], cxNode['y'], cxNode['z']]
                        : [cxNode['x'], cxNode['y']]
                }

                //TODO calculate lnv vps based on defaults and attributes
                if (defaultValues) {
                    const defaultNodeVisualProperties = defaultValues['node'];
                    Object.assign(nodeView, defaultNodeVisualProperties);
                }
                //Assign mappings
                const expandedAttributes = cxUtil.getExpandedAttributes(cxNode['v'], nodeAttributeNameMap, nodeAttributeDefaultValueMap);
                const mappingValues = getMapppedValues(mappings, 'node', expandedAttributes);
                Object.assign(nodeView, mappingValues);

                //Assign bypass
                if (bypassMappings.node[cxId]) {
                    Object.assign(nodeView, bypassMappings.node[cxId]);
                }

                const processedNodeView = processNodeView(nodeView);

                nodeViews.push(processedNodeView);
            });

        } else if (cxAspect['edges']) {
            const cxEdges = cxAspect['edges'];

            cxEdges.forEach((cxEdge) => {
                const cxId = cxEdge[cxConstants.ID].toString();
                const edgeView = {
                    id: cxId,
                    s: cxEdge.s.toString(),
                    t: cxEdge.t.toString()
                }

                //TODO calculate lnv vps based on defaults and attributes
                if (defaultValues) {
                    const defaultEdgeVisualProperties = defaultValues['edge'];
                    Object.assign(edgeView, defaultEdgeVisualProperties);
                }

                const expandedAttributes = cxUtil.getExpandedAttributes(cxEdge['v'], edgeAttributeNameMap, edgeAttributeDefaultValueMap);
                const mappingValues = getMapppedValues(mappings, 'node', expandedAttributes);
                Object.assign(edgeView, mappingValues);
                //Assign bypass
                if (bypassMappings.edge[cxId]) {
                    Object.assign(edgeView, bypassMappings.edge[cxId]);
                }

                const processedEdgeView = processEdgeView(edgeView);

                edgeViews.push(processedEdgeView);
            });
        }
    });

    output[largeNetworkConstants.nodeViews] = nodeViews;
    output[largeNetworkConstants.edgeViews] = edgeViews;

    return output;
}



const converter = {
    targetFormat: 'lnv',
    convert: (cx) => {
        return lnvConvert(cx);
    }
}

module.exports = {
    converter: converter
};