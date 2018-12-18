var fs = require('fs');
var path = require('path');
var cx2js = require('cytoscape-cx2js');

var fileName = 'network.cx';
if (process.argv[2]) {
    fileName = process.argv[2];
}

var content = fs.readFileSync(fileName);

var fileTitle = path.parse(fileName)['name'];

var rawCX = JSON.parse(content);

var utils = new cx2js.CyNetworkUtils();

var niceCX = utils.rawCXtoNiceCX(rawCX);
fs.writeFileSync('./results/'+fileTitle+'.nicecx.json', JSON.stringify(niceCX, null, 2));

var cx2Js = new cx2js.CxToJs(utils);

var attributeNameMap = {};

var elements = cx2Js.cyElementsFromNiceCX(niceCX, attributeNameMap);
fs.writeFileSync('./results/'+fileTitle+'.elements.json', JSON.stringify(elements, null, 2));

var style = cx2Js.cyStyleFromNiceCX(niceCX, attributeNameMap);
fs.writeFileSync('./results/'+fileTitle+'.style.json', JSON.stringify(style, null, 2));

var cxBGColor = cx2Js.cyBackgroundColorFromNiceCX(niceCX);

var cyLayout = cx2Js.getDefaultLayout();
fs.writeFileSync('./results/' + fileTitle +'.layout.json', JSON.stringify(cyLayout, null, 2));
