
const cxConstants = require('./cxConstants.js');
const largeNetwork = require ('./largeNetwork/largeNetwork.js'); 
const cytoscapeJS = require ('./cytoscapeJS/cytoscapeJS.js');
const cxUtil = require('./cxUtil.js');

function verifyVersion(cx) {
    const firstElement = cx[0];
    const versionString = firstElement[cxConstants.CX_VERSION];

    const majorVersion = cxUtil.getCxMajorVersion(versionString);

    if (majorVersion !== 2) {
        throw 'Incompatible CX version: ' + versionString;
    }
}

function convert(cx, targetFormat) {
    verifyVersion(cx);
    switch(targetFormat) {
        case largeNetwork.converter.targetFormat: {
            return largeNetwork.converter.convert(cx);
        }
        case cytoscapeJS.converter.targetFormat: {
            return cytoscapeJS.converter.convert(cx);
        }
    }
}

module.exports = {
    convert: convert
};