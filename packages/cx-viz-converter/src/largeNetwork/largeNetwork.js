
const cxConstants = require('../cxConstants.js');
const largeNetworkConstants = require('./largeNetworkConstants.js');
const cxUtil = require('../cxUtil.js');

function lnvConvert(cx) {
    
    //First pass. 
    // We may need to collect object attributes to calculate
    // mappings in the second pass. 
    let nodeMap = new Map();
    let edgeMap = new Map();

    let cxVisualProperties;

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
                const cxId = cxNode[cxConstants.ID].toString();
                const node = {
                    id : cxId,
                    position: cxNode['z'] ? 
                        [cxNode['x'],cxNode['y'],cxNode['z']] 
                        : [cxNode['x'],cxNode['y']]
                }
                nodeMap.set(cxId, node);
            })
        } else if (cxAspect['edges']) {
            const cxEdges = cxAspect['edges'];
            cxEdges.forEach((cxEdge) => {
                const cxId = cxEdge[cxConstants.ID].toString();
                const edge = {
                    id : cxId,
                    s : cxEdge.s.toString(),
                    t : cxEdge.t.toString() 
                }
                edgeMap.set(cxId, edge);
            })
        } else if (cxAspect['visualProperties']) {
            cxVisualProperties = cxAspect['visualProperties'];
        }
    });

    let output = {};
    
    let nodeViews = [];
    let edgeViews = [];


    //Second pass. 
    // Here is where the actual output is generated.
    
    nodeMap.forEach((value, id) => {
        nodeViews.push(value);
    });

    edgeMap.forEach((value, id) => {
        edgeViews.push(value);
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