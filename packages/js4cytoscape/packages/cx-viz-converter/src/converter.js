
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

const defaultConverters = [
    largeNetwork,
    cytoscapeJS
];

function selectConverter(targetFormat, converters) {
    let selectedConverter = undefined;
    
    converters.forEach( converter => {
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
        throw 'no converter available for target format: ' + targetFormat
    }
    return selectedConverter;
}

function getEmptyNetwork(targetFormat, converters) {
    const selectedConverter = selectConverter(targetFormat, converters);
    return selectedConverter.converter.emptyNetwork;
}

function convert(cx, targetFormat, converters = defaultConverters) {
    
    if (cx.length == 0) {
        return getEmptyNetwork(targetFormat, converters);
    }
    
    verifyVersion(cx);
    const selectedConverter = selectConverter(targetFormat, converters);
    return selectedConverter.converter.convert(cx)
}

module.exports = {
    convert: convert
};