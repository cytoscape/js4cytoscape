
const cxConstants = require('./cxConstants.js');
const cxUtil = require('./cxUtil.js');

function lnvConvert(cx) {
    let output = {};

    //First pass. 
    // We may need to collect object attributes to calculate
    // mappings in the second pass. 
    let nodeValueMap = {};
    let nodeLayoutMap = {};
    let cxNodes;
    let cxEdges;
    let cxVisualProperties;
    cx.forEach((element) => {
        if (element['nodes']) {
            cxNodes = element['nodes'];
            cxNodes.forEach((cxNode) => {
                const cxId = cxNode['id'].toString();
                nodeValueMap[cxId] = cxNode['v'];
                nodeLayoutMap[cxId] = {
                    x: cxNode['x'],
                    y: cxNode['y'],
                    z: cxNode['z']
                }
            })
        } else if (element['edges']) {
            cxEdges = element['edges'];
        } else if (element['visualProperties']) {
            cxVisualProperties = element['visualProperties'];
        }
    });

    console.log("attributes: " + JSON.stringify(nodeValueMap));
    console.log("layout: " + JSON.stringify(nodeLayoutMap));

    //Second pass. 
    // Here is where the actual output is generated.
    output.nodeCount = cxNodes.length;
    output.edgeCount = cxEdges.length;
    output.visualPropertyCount = cxVisualProperties.length;

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