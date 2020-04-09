
const cxConstants = require('../cxConstants.js');
const largeNetworkConstants = require('./largeNetworkConstants.js');
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
        'NODE_LABEL_COLOR': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.label_color, portablePropertyValue)
    },
    'edge': {
        'EDGE_WIDTH': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.width, portablePropertyValue),
        'EDGE_OPACITY': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.opacity, portablePropertyValue),
        'EDGE_LINE_COLOR': (portablePropertyValue) => simpleDefaultPropertyConvert(jsConstants.line_color, portablePropertyValue)
    },
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

    
    //Object.keys(nodeView).forEach();

    output[largeNetworkConstants.color] = processColor(colorArray, alpha);
    output[largeNetworkConstants.size] = processSize(width, height);

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

    //Object.keys(edgeView).forEach();
    
    output[largeNetworkConstants.color] = processColor(colorArray, alpha);
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

    let defaultValues = {};
    let bypassMappings = {};
    let discreteMappings = {};
    let continuousMappings = {};


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

            //defaultCSSNodeStyle = getCSSStyleEntries(defaultStyles.node, 'node');
           // defaultCSSEdgeStyle = getCSSStyleEntries(defaultStyles.edge, 'edge');

           
            const nodeMapping = value.nodeMapping;
            //mappingCSSNodeStyle = getCSSMappingEntries(nodeMapping, 'node', nodeAttributeTypeMap);

            const edgeMapping = value.edgeMapping;
            //mappingCSSEdgeStyle = getCSSMappingEntries(edgeMapping, 'edge', edgeAttributeTypeMap);

        } else if (vpAt === cxConstants.N) {
            //bypassCSSEntries.push(getBypassCSSEntry('node', vpElement));
        } else if (vpAt === cxConstants.E) {
            //bypassCSSEntries.push(getBypassCSSEntry('edge', vpElement));

        }
    });
    //Second pass. 
    // Here is where the actual output is generated.

    cx.forEach((cxAspect) => {
         if (cxAspect['nodes']) {
            const cxNodes = cxAspect['nodes'];
            cxNodes.forEach((cxNode) => {
                const cxId = cxNode[cxConstants.ID].toString();
                const nodeView = {
                    id : cxId,
                    position: cxNode['z'] ? 
                        [cxNode['x'],cxNode['y'],cxNode['z']] 
                        : [cxNode['x'],cxNode['y']]
                }

                const processedNodeView = processNodeView(nodeView);

                nodeViews.push(processedNodeView);
            })
        } else if (cxAspect['edges']) {
            const cxEdges = cxAspect['edges'];
            cxEdges.forEach((cxEdge) => {
                const cxId = cxEdge[cxConstants.ID].toString();
                const edgeView = {
                    id : cxId,
                    s : cxEdge.s.toString(),
                    t : cxEdge.t.toString() 
                }

                const processedEdgeView = processEdgeView(edgeView);

                edgeViews.push(processedEdgeView);
            })
        }
    });
    
    output[largeNetworkConstants.nodeViews] = nodeViews;
    output[largeNetworkConstants.edgeViews] = edgeViews;

    return output;
}



const converter = {
    targetFormat: 'lnv',
    convert:  (cx) => {
        return lnvConvert(cx);
    }
}

module.exports = {
    converter: converter
};