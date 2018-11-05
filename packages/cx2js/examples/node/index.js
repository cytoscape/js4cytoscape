var fs = require('fs');
var cxjs = require('cytoscape-cx2js');

var content = fs.readFileSync('network.cx');

var rawCX = JSON.parse(content);

var utils = new cxjs.CyNetworkUtils();

var niceCX = utils.rawCXtoNiceCX(rawCX);
fs.writeFileSync('./results/small_graph_nicecx.json', JSON.stringify(niceCX, null, 2));

var cx2Js = new cxjs.CxToJs(utils);

var attributeNameMap = {};

var elements = cx2Js.cyElementsFromNiceCX(niceCX, attributeNameMap);
fs.writeFileSync('./results/small_graph_elements.json', JSON.stringify(elements, null, 2));

var style = cx2Js.cyStyleFromNiceCX(niceCX, attributeNameMap);
fs.writeFileSync('./results/small_graph_style.json', JSON.stringify(style, null, 2));

var cxBGColor = cx2Js.cyBackgroundColorFromNiceCX(niceCX);

var cyLayout = cx2Js.getDefaultLayout();
fs.writeFileSync('./results/small_graph_layout.json', JSON.stringify(cyLayout, null, 2));
