const { expect } = require('chai');
const rewire = require('rewire');
const { CxToJs, CyNetworkUtils } = require('../src');
const fs = require('fs-extra');

var appsrc = rewire('../src/cx_to_js.js');

const visualPropertyMap = appsrc.__get__('visualPropertyMap');

const DEFAULT_STYLE = [
  {
    'selector': 'node',
    'style': {
      'background-color': '#f6eecb',
      'background-opacity': 0.8,
      'font-family': 'Roboto, sans-serif',
      'height': '40px',
      'label': 'data(name)',
      'width': '40px',
    }
  },
  {
    'selector': 'edge',
    'style': {
      'curve-style': 'bezier',
      'font-family': "Roboto, sans-serif",
      'line-color': "#75736c",
      'text-opacity': 0.8,
      'width': '2px'
    }
  },
  {
    'selector': 'node:selected',
    'style': {
      'background-color': 'yellow',
      'color': '#fb1605'
    }
  },
  {
    'selector': 'edge:selected',
    'style': {
      'color': '#fb1605',
      'label': 'data(interaction)',
      'line-color': 'yellow',
      'width': 6
    }
  }
];

describe('CX to JS', function () {

  it('niceCX end to end small_graph', function () {

    var utils = new CyNetworkUtils();

    var content = fs.readFileSync('test_resources/small_graph/small_graph.cx');
    var rawCX = JSON.parse(content);

    var niceCX = utils.rawCXtoNiceCX(rawCX);

    var expectedContent = fs.readFileSync('test_resources/small_graph/small_graph_nice.cx');
    var expectedNiceCX = JSON.parse(expectedContent);

    expect(niceCX).to.eql(expectedNiceCX);
  });

  it('niceCX end to end hiview', function () {

    this.timeout(15000);

    var utils = new CyNetworkUtils();

    var content = fs.readFileSync('test_resources/hiview/hiview.cx');
    var rawCX = JSON.parse(content);

    var niceCX = utils.rawCXtoNiceCX(rawCX);

    var cxToJs = new CxToJs(utils);

    var attributeNameMap = {};
    var elements = cxToJs.cyElementsFromNiceCX(niceCX, attributeNameMap);

    var expectedContent = fs.readFileSync('test_resources/hiview/hiview.json');
    var expectedJSON = JSON.parse(expectedContent);

    expect(elements['nodes'].length).to.eql(expectedJSON['elements']['nodes'].length);
    expect(elements['edges'].length).to.eql(expectedJSON['elements']['edges'].length);

    var actualNodeElement;
    var expectedNodeElement;

    for (let i = 0; i < elements['nodes'].length; i++) {
      if (elements['nodes'][i]['data']['name'] == 'TULP2') {
        actualNodeElement = elements['nodes'][i];
      }
      if (expectedJSON['elements']['nodes'][i]['data']['name'] == 'TULP2') {
        expectedNodeElement = expectedJSON['elements']['nodes'][i];
      }
    }

    //console.log(actualNodeElement);
    //console.log(expectedNodeElement);

    //TODO fix this breakage!
    //expect(actualNodeElement).to.eql(expectedNodeElement);
  });

  it('niceCX empty', function () {

    var utils = new CyNetworkUtils();

    var rawCX = {

    };
    var niceCX = utils.rawCXtoNiceCX(rawCX);

    expect(niceCX).to.eql({ edges: {} });
  });

  it('niceCX stringifyFunctionTerm', function () {

    var utils = new CyNetworkUtils();

    var functionTerm = {

      "po": 105590984,
      "f": "bel:biologicalProcess",
      "args": [
        "GO:cell proliferation"
      ]

    };
    var string = utils.stringifyFunctionTerm(functionTerm);

    expect(string).to.eql("bp(GO:cell proliferation)");
  });

  it('niceCX getDefaultNodeLabel name', function () {

    var utils = new CyNetworkUtils();

    const niceCX = {};

    var nodeEntry = {
      "@id": 4980,
      "n": "x"
    };
    var name = utils.getDefaultNodeLabel(niceCX, nodeEntry);

    expect(name).to.eql("x");
  });

  it('niceCX getDefaultNodeLabel zero length name', function () {

    var utils = new CyNetworkUtils();

    const niceCX = {};

    var nodeEntry = {
      "@id": 4980,
      "n": ""
    };
    var name = utils.getDefaultNodeLabel(niceCX, nodeEntry);

    expect(name).to.eql("");
  });

  it('niceCX getDefaultNodeLabel no name', function () {

    var utils = new CyNetworkUtils();

    const niceCX = {};

    var nodeEntry = {
      "@id": 4980,
    };
    var name = utils.getDefaultNodeLabel(niceCX, nodeEntry);

    expect(name).to.eql(null);
  });

  it('niceCX stringifyFunctionTerm recursion', function () {

    var utils = new CyNetworkUtils();

    var functionTerm = {
      "po": 105590995,
      "f": "bel:peptidaseActivity",
      "args": [
        {
          "po": null,
          "f": "bel:complexAbundance",
          "args": [
            {
              "po": null,
              "f": "bel:proteinAbundance",
              "args": [
                "HGNC:F3"
              ]
            },
            {
              "po": null,
              "f": "bel:proteinAbundance",
              "args": [
                "HGNC:F7"
              ]
            }
          ]
        }
      ]
    };
    var string = utils.stringifyFunctionTerm(functionTerm);

    expect(string).to.eql("pep(complex(p(HGNC:F3), p(HGNC:F7)))");
  });

  it('small_graph end to end', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var content = fs.readFileSync('test_resources/small_graph/small_graph_nice.cx');
    var niceCX = JSON.parse(content);

    var attributeNameMap = {};
    var elements = cxToJs.cyElementsFromNiceCX(niceCX, attributeNameMap);

    var expectedElementsContent = fs.readFileSync('test_resources/small_graph/small_graph_elements.json');
    var expectedElementsJson = JSON.parse(expectedElementsContent);
    expect(elements.nodes).to.have.deep.members(expectedElementsJson.nodes);
    expect(elements.edges).to.have.deep.members(expectedElementsJson.edges);

    var style = cxToJs.cyStyleFromNiceCX(niceCX, attributeNameMap);

    var expectedStyleContent = fs.readFileSync('test_resources/small_graph/small_graph_style.json');
    var expectedStyleJson = JSON.parse(expectedStyleContent);
    expect(style).to.have.deep.members(expectedStyleJson);
  });

  it('java_logical_fonts identification', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);
    expect(cxToJs.isJavaLogicalFont('Dialog.plain')).to.eql(true);
  });

  it('java_logical_fonts end to end', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var content = fs.readFileSync('test_resources/java_logical_fonts/java_logical_fonts.nicecx.json');
    var niceCX = JSON.parse(content);

    var attributeNameMap = {};
    var elements = cxToJs.cyElementsFromNiceCX(niceCX, attributeNameMap);

    var expectedElementsContent = fs.readFileSync('test_resources/java_logical_fonts/java_logical_fonts.elements.json');
    var expectedElementsJson = JSON.parse(expectedElementsContent);
    expect(elements.nodes).to.have.deep.members(expectedElementsJson.nodes);
    expect(elements.edges).to.have.deep.members(expectedElementsJson.edges);
    var style = cxToJs.cyStyleFromNiceCX(niceCX, attributeNameMap);

    var expectedStyleContent = fs.readFileSync('test_resources/java_logical_fonts/java_logical_fonts.style.json');
    var expectedStyleJson = JSON.parse(expectedStyleContent);
    expect(style).to.have.deep.members(expectedStyleJson);
  });

  it('cxToJs defaultStyle', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var defaultStyle = cxToJs.getDefaultStyle();

    expect(defaultStyle).to.eql(DEFAULT_STYLE);
  });

  it('cxToJs getCyAttributeName', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var attributeNameMap = { 'foo': 'bar' };

    var attributeName = cxToJs.getCyAttributeName('foo', attributeNameMap);

    expect(attributeName).to.equal('bar');
  });

  it('cxToJs specialCase getCyAttributeName', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var attributeNameMap = { 'foo': 'bar' };

    var attributeName = cxToJs.getCyAttributeName('id', attributeNameMap);

    expect(attributeName).to.equal('cx_id');
  });

  it('cxToJs direct getCyAttributeName', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var attributeNameMap = { 'foo': 'bar' };

    var attributeName = cxToJs.getCyAttributeName('hOdor', attributeNameMap);

    expect(attributeName).to.equal('hOdor');

    var attributeName2 = cxToJs.getCyAttributeName('hoDOR', attributeNameMap);
    expect(attributeName2).to.equal('hOdor');
  });

  it('cxToJs invalidChar sanitizeAttributeNameMap', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var attributeNameMap = { '$id': '$id' };

    cxToJs.sanitizeAttributeNameMap(attributeNameMap);

    expect(attributeNameMap).to.eql({ '$id': '_id_u1' });
  });

  it('cxToJs sanitizeAttributeNameMap', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var attributeNameMap = { 'foo': 'foo' };

    cxToJs.sanitizeAttributeNameMap(attributeNameMap);

    expect(attributeNameMap).to.eql({ 'foo': 'foo' });
  });

  it('cxToJs specialCase sanitizeAttributeNameMap', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var attributeNameMap = { 'shared name': 'replace me' };

    cxToJs.sanitizeAttributeNameMap(attributeNameMap);

    expect(attributeNameMap).to.eql({ 'shared name': 'name' });
  });

  it('cxToJs list_of_string getFirstElementFromList', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var list = { 'd': 'list_of_string', 'v': ['element the first', 'element the second'] };

    var firstElement = cxToJs.getFirstElementFromList(list);

    expect(firstElement).to.equal('element the first');
  });

  it('cxToJs list_of_boolean getFirstElementFromList', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var list = { 'd': 'list_of_boolean', 'v': [true, false] };

    var firstElement = cxToJs.getFirstElementFromList(list);

    expect(firstElement).to.equal(true);
  });

  it('cxToJs list_of_numbers getFirstElementFromList', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var list = { 'd': 'list_of_numbers', 'v': [1, 2] };

    var firstElement = cxToJs.getFirstElementFromList(list);

    expect(firstElement).to.equal(1);
  });

  it('cxToJs cyColorFromCX', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxColor = '#0088FF';

    var cyColor = cxToJs.cyColorFromCX(cxColor);

    expect(cyColor).to.equal('rgb(0,136,255)');
  });

  it('cxToJs cyNumberFromString', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxNumber = '1e06';

    var cyNumber = cxToJs.cyNumberFromString(cxNumber);

    expect(cyNumber).to.equal(1000000);
  });

  it('cxToJs cyOpacityFromCX', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxOpacity = 128;

    var cyOpacity = cxToJs.cyOpacityFromCX(cxOpacity);

    expect(cyOpacity).to.equal(128 / 255);
  });

  it('cxToJs base commaDelimitedListStringToStringList2', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var commaDelimitedList = "COL=name,T=string,K=0=Node=1,V=0=#00FF99,K=1=Node,,2,V=1=#CC0099";

    let expectedList = ["COL=name",
      "T=string",
      "K=0=Node=1",
      "V=0=#00FF99",
      "K=1=Node,2",
      "V=1=#CC0099",
    ];
    var list = cxToJs.commaDelimitedListStringToStringList2(commaDelimitedList);

    expect(list).to.eql(expectedList);
  });

  it('cxToJs discreet parseMappingDefinition', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var definition = "COL=directed,T=boolean,K=0=true,V=0=DELTA";

    let expectedList = {
      m: { '0': { K: 'true', V: 'DELTA' } },
      COL: 'directed',
      T: 'boolean'
    };
    var result = cxToJs.parseMappingDefinition(definition);

    expect(result).to.eql(expectedList);
  });

  it('cxToJs discreet parseMappingDefinition NODE_SIZE', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var definition = "COL=node type,T=string,K=0=a,V=0=20.0,K=1=b,V=1=15.0";

    let expectedList = {
      "COL": "node type",
      "T": "string",
      "m": {
        "0": {
          "K": "a",
          "V": "20.0"

        },
        "1": {
          "K": "b",
          "V": "15.0"
        }
      }
    };
    var result = cxToJs.parseMappingDefinition(definition);

    expect(result).to.eql(expectedList);
  });

  it('cxToJs continuous parseMappingDefinition', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var definition = "COL=Degree,T=integer,L=0=1,E=0=10,G=0=10,OV=0=1.0,L=1=40,E=1=40,G=1=1,OV=1=18.0";

    let expectedList = {
      'COL': 'Degree',
      'T': 'integer',
      'm': {
        '0': {
          'E': '10',
          'G': '10',
          'L': '1',
          'OV': '1.0'
        },
        '1': {
          'E': '40',
          'G': '1',
          'L': '40',
          'OV': '18.0'
        }
      }
    };
    var result = cxToJs.parseMappingDefinition(definition);

    expect(result).to.eql(expectedList);
  });

  it('cxToJs passthrough parseMappingDefinition', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var definition = 'COL=COMMON,T=string';

    let expectedList = {
      'COL': 'COMMON',
      'T': 'string',
      'm': {}
    };
    var result = cxToJs.parseMappingDefinition(definition);

    expect(result).to.eql(expectedList);
  });

  it('postProcessNodeProperties', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var vpElement = {
      dependencies: {

      }
    };
    var postProcessParams = { nodeSize: 45 };
    var nodeProperties = { width: 30, height: 40 };
    cxToJs.postProcessNodeProperties(vpElement, postProcessParams, nodeProperties);

    let expectedNodeProperties = {
      width: 30,
      height: 40
    };

    expect(nodeProperties).to.eql(expectedNodeProperties);
  });

  it('postProcessNodeProperties locked', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var vpElement = {
      dependencies: {
        nodeSizeLocked: 'true'
      }
    };
    var postProcessParams = { nodeSize: 45 };
    var nodeProperties = {};
    cxToJs.postProcessNodeProperties(vpElement, postProcessParams, nodeProperties);

    let expectedNodeProperties = {
      width: 45,
      height: 45
    };

    expect(nodeProperties).to.eql(expectedNodeProperties);
  });

  it('cxToJs style removes bend points from mappings', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var niceCX = {
      /*"cyTableColumn": {
        "elements": [
          {
            "applies_to": "edge_table",
            "n": "BEND_MAP_ID",
            "d": "long"
          }
        ]
      },*/
      "visualProperties": {
        "elements": [
          {
            "properties_of": "edges:default",
            "mappings": {
              "EDGE_BEND": {
                "type": "DISCRETE",
                "definition": "COL=BEND_MAP_ID,T=long,K=0=32768,V=0=-0.999465341096995,,0.03269605398006593,,0.019276522475253997|0.9695559291694197,,0.24486996592563826,,0.4928228037719012|0.9775849566562197,,-0.21054133209291012,,0.7497379871752963,K=1=32769,V=1=-0.8180894351619633,,-0.5750910154717946,,0.11517130454940294|0.48926506182749563,,-0.872135138195301,,0.12395195145033311|-0.5740923897181274,,-0.8187905275879356,,0.08896345341033057"
              }
            }
          }
        ]
      }
    };
    var attributeNameMap = { 'bend_map_id': 'BEND_MAP_ID' };
    var result = cxToJs.cyStyleFromNiceCX(niceCX, attributeNameMap);

    var expectedResult = [
      {
        "css": {
          "curve-style": "bezier"
        },
        "selector": "edge"
      }
    ];

    expect(result).to.eql(expectedResult);

  });

  it('cxToJs style calls postProcessNodeProperties', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var niceCX = {
      "visualProperties": {
        "elements": [
          {
            "properties_of": "nodes:default",
            "properties": {
              "NODE_SIZE": "80.0",
              "NODE_WIDTH": "40",
              "NODE_HEIGHT": "50"
            }
          }
        ]
      }
    };

    var result = cxToJs.cyStyleFromNiceCX(niceCX);

    var expectedResult = [
      {
        "css": {
          width: 40,
          "text-wrap": "wrap",
          height: 50
        },
        "selector": "node"
      }
    ];

    expect(result).to.eql(expectedResult);

  });

  it('cxToJs pieChart', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var niceCX = {
      "cyVisualProperties": {
        "elements": [
          {
            "properties_of": "nodes:default",
            "properties": {
              "NODE_CUSTOMGRAPHICS_1": "org.cytoscape.PieChart:{\"cy_range\":[4.19689134222E-20,0.0493210553996],\"cy_colors\":[\"#FF0000\",\"#00FFFF\",\"#0000FF\",\"#00FF00\"],\"cy_borderWidth\":0.0,\"cy_borderColor\":\"#FFFFFF\",\"cy_dataColumns\":[\"Basal\",\"Her2\",\"LumA\",\"LumB\"]}",
            }
          }]
      }
    };

    const attributeNameMap = {
      basal: 'basal',
      her2: 'her2',
      luma: 'luma',
      lumb: 'lumb'
    };

    const result = cxToJs.cyStyleFromNiceCX(niceCX, attributeNameMap);

    expect(result[0].css["pie-1-background-color"]).to.eql("#FF0000");
    expect(result[0].css["pie-2-background-color"]).to.eql("#00FFFF");
    expect(result[0].css["pie-3-background-color"]).to.eql("#0000FF");
    expect(result[0].css["pie-4-background-color"]).to.eql("#00FF00");

    let ele = {};

    ele.json = function () {
      return {
        data: {

          basal: 4,
          her2: 3,
          luma: 2,
          lumb: 1
        }
      };
    };

    expect(result[0].css['pie-1-background-size'](ele)).to.eql(40);
    expect(result[0].css['pie-2-background-size'](ele)).to.eql(30);
    expect(result[0].css['pie-3-background-size'](ele)).to.eql(20);
    expect(result[0].css['pie-4-background-size'](ele)).to.eql(10);
  });

  it('cxToJs base getNodeLabelPosition', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxPosition = "C,C,c,0.00,0.00";

    let jsPosition = {
      "text-halign": "center",
      "text-valign": "center",
      "text-justification": "center",
      "text-margin-x": 0,
      "text-margin-y": 0
    };
    var result = cxToJs.getNodeLabelPosition(cxPosition);

    expect(result).to.eql(jsPosition);
  });

  it('cxToJs getNodeLabelPosition with x-y offsets', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxPosition = "C,C,c,136.42,-15.48";

    let jsPosition = {
      "text-halign": "center",
      "text-valign": "center",
      "text-justification": "center",
      "text-margin-x": 136.42,
      "text-margin-y": -15.48
    };
    var result = cxToJs.getNodeLabelPosition(cxPosition);

    expect(result).to.eql(jsPosition);
  });

  it('cxToJs getNodeLabelPosition with left justified text', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxPosition = "C,C,l,0.00,0.00";

    let jsPosition = {
      "text-halign": "center",
      "text-valign": "center",
      "text-justification": "left",
      "text-margin-x": 0,
      "text-margin-y": 0
    };
    var result = cxToJs.getNodeLabelPosition(cxPosition);

    expect(result).to.eql(jsPosition);
  });

  it('cxToJs getNodeLabelPosition with right justified text', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxPosition = "C,C,r,0.00,0.00";

    let jsPosition = {
      "text-halign": "center",
      "text-valign": "center",
      "text-justification": "right",
      "text-margin-x": 0,
      "text-margin-y": 0
    };
    var result = cxToJs.getNodeLabelPosition(cxPosition);

    expect(result).to.eql(jsPosition);
  });

  it('cxToJs Dialog.plain expandFontProperties', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var labelFontFace = "Dialog.plain,plain,15";
    var objectProperties = {};
    cxToJs.expandPropertiesFromFunctionMap('NODE_LABEL_FONT_FACE', labelFontFace, objectProperties);

    var expandedFontProperties = {
      "font-family": "Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif",
      "font-size": "15"
    };

    expect(objectProperties).to.eql(expandedFontProperties);
  });



  it('cxToJs java.bolditalic expandFontProperties', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var labelFontFace = "Dialog.bolditalic,plain,15";
    var objectProperties = {};
    cxToJs.expandPropertiesFromFunctionMap('NODE_LABEL_FONT_FACE', labelFontFace, objectProperties);

    var expandedFontProperties = {
      "font-family": "Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif",
      'font-size': '15',
      "font-style": "italic",
      "font-weight": "bold"
    };

    expect(objectProperties).to.eql(expandedFontProperties);
  });

  it('cxToJs ArialMT expandFontProperties', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var labelFontFace = "ArialMT,plain,10";
    var objectProperties = {};
    cxToJs.expandPropertiesFromFunctionMap('NODE_LABEL_FONT_FACE', labelFontFace, objectProperties);

    var expandedFontProperties = {
      "font-family": "Arial,Helvetica Neue,Helvetica,sans-serif",
      'font-size': '10'
    };

    expect(objectProperties).to.eql(expandedFontProperties);
  });

  it('cxToJs expandDefaultProperties', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var objectProperties = {};
    cxToJs.expandPropertiesFromDefaultMap('NODE_LABEL_FONT_FACE', objectProperties);

    var expandedProperties = {
      'font-family': 'sans-serif',
      'font-weight': 'normal'
    };

    expect(objectProperties).to.eql(expandedProperties);
  });

  it('cxToJs base expandLabelPosition', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cyLabelPosition = "C,C,c,0.00,0.00";
    var objectProperties = {};

    cxToJs.expandPropertiesFromFunctionMap('NODE_LABEL_POSITION', cyLabelPosition, objectProperties);

    var expandedLabelPosition = {
      "text-halign": "center",
      "text-valign": "center",
      "text-justification": "center",
      "text-margin-x": 0,
      "text-margin-y": 0
    };

    expect(objectProperties).to.eql(expandedLabelPosition);
  });

  it('cxToJs NWCc expandLabelPosition', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cyLabelPosition = "NW,C,c,0.00,0.00";
    var objectProperties = {};

    cxToJs.expandPropertiesFromFunctionMap('NODE_LABEL_POSITION', cyLabelPosition, objectProperties);

    var expandedLabelPosition = {
      "text-halign": "left",
      "text-valign": "top",
      "text-justification": "center",
      "text-margin-x": 0,
      "text-margin-y": 0
    };

    expect(objectProperties).to.eql(expandedLabelPosition);
  });

  it('cxToJs map EDGE_CURVED', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);
    var objectProperties = {};

    cxToJs.expandPropertiesFromFunctionMap('EDGE_CURVED', "true", objectProperties);

    var expandedEdgeCurved = {
      'curve-style': 'unbundled-bezier'
    };

    expect(objectProperties).to.eql(expandedEdgeCurved);

    cxToJs.expandPropertiesFromFunctionMap('EDGE_CURVED', "false", objectProperties);

    expandedEdgeCurved = {
      'curve-style': 'straight'
    };
    expect(objectProperties).to.eql(expandedEdgeCurved);
  });


  it('cxToJs base getCyVisualAttributeForVP', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVP = "NODE_FILL_COLOR";

    let jsVisualAttribute = "background-color";
    var result = cxToJs.getCyVisualAttributeForVP(cxVP, visualPropertyMap);

    expect(result).to.equal(jsVisualAttribute);
  });

  it('cxToJs base getCyVisualAttributeObjForVP', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVP = "NODE_FILL_COLOR";

    let jsVisualAttribute = { att: 'background-color', type: 'color' };

    var result = cxToJs.getCyVisualAttributeObjForVP(cxVP, visualPropertyMap);

    expect(result).to.eql(jsVisualAttribute);
  });

  it('cxToJs base getCyVisualAttributeTypeForVp', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVP = "NODE_FILL_COLOR";

    let jsVisualAttributeType = 'color';

    var result = cxToJs.getCyVisualAttributeTypeForVp(cxVP, visualPropertyMap);

    expect(result).to.equal(jsVisualAttributeType);
  });

  it('cxToJs base getCyVisualAttributeValue', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVPValue = "#0088FF";
    var cxVPType = 'color';

    let jsVisualAttributeValue = 'rgb(0,136,255)';

    var result = cxToJs.getCyVisualAttributeValue(cxVPValue, cxVPType);

    expect(result).to.equal(jsVisualAttributeValue);
  });

  it('cxToJs getCySelector boolean false', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxElementType = "edge";

    let cySelector = 'edge[boolCol][!boolCol]';

    var result = cxToJs.getCySelector(cxElementType, 'boolean', 'boolCol', 'false');

    expect(result).to.eql(cySelector);
  });

  it('cxToJs getCySelector boolean true', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxElementType = "edge";

    let cySelector = 'edge[?boolCol]';

    var result = cxToJs.getCySelector(cxElementType, 'boolean', 'boolCol', 'true');

    expect(result).to.eql(cySelector);
  });

  it('cxToJs getCySelector string', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxElementType = "edge";

    let cySelector = 'edge[stringCol = \'abc\']';

    var result = cxToJs.getCySelector(cxElementType, 'string', 'stringCol', 'abc');

    expect(result).to.eql(cySelector);
  });

  it('cxToJs getCySelector float', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxElementType = "edge";

    let cySelector = 'edge[floatCol = 6]';

    var result = cxToJs.getCySelector(cxElementType, 'float', 'floatCol', 6);

    expect(result).to.eql(cySelector);
  });

  it('cxToJs discreteMappingStyle base', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVP = "EDGE_WIDTH";
    var cxElementType = "edge";

    var cxDef = {
      m: { '0': { K: 'true', V: '3' } },
      COL: 'directed',
      T: 'boolean'
    };

    let jsDiscreetMappingStyle = [{
      selector: 'edge[?directed]',
      css: { 'width': 3 }
    }];

    var result = cxToJs.discreteMappingStyle(cxElementType, cxVP, cxDef, {},visualPropertyMap);

    expect(result).to.eql(jsDiscreetMappingStyle);
  });

  it('cxToJs discreteMappingStyle NODE_SIZE', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVP = "NODE_SIZE";
    var cxElementType = "node";

    var cxDef = {
      "COL": "node type",
      "T": "string",
      "m": {
        "0": {
          "K": "a",
          "V": "20.0"

        },
        "1": {
          "K": "b",
          "V": "15.0"
        }
      }
    };

    let jsDiscreetMappingStyle = [{
      selector: 'node[node type = \'a\']',
      css: { 'width': 20, "height": 20 }
    }, {
      selector: "node[node type = 'b']",
      css: { 'width': 15, 'height': 15 }
    }
    ];

    var result = cxToJs.discreteMappingStyle(cxElementType, cxVP, cxDef, {},visualPropertyMap);

    expect(result).to.eql(jsDiscreetMappingStyle);
  });

  it('cxToJs discreteMappingStyle expanded', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVP = "EDGE_TARGET_ARROW_SHAPE";
    var cxElementType = "edge";

    var cxDef = {
      m: { '0': { K: 'true', V: 'OPEN_DELTA' } },
      COL: 'directed',
      T: 'boolean'
    };

    let jsDiscreetMappingStyle = [{
      selector: 'edge[?directed]',
      css: { "target-arrow-fill": "hollow", 'target-arrow-shape': 'triangle' }
    }];

    var result = cxToJs.discreteMappingStyle(cxElementType, cxVP, cxDef, {}, visualPropertyMap);

    expect(result).to.eql(jsDiscreetMappingStyle);
  });

  it('cxToJs base continuousMappingStyle', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVP = "NODE_LABEL_FONT_SIZE";
    var cxElementType = "node";

    var cxDef = {
      'COL': 'Degree',
      'T': 'integer',
      'm': {
        '0': {
          'E': '10',
          'G': '10',
          'L': '1',
          'OV': '1.0'
        },
        '1': {
          'E': '40',
          'G': '1',
          'L': '40',
          'OV': '18.0'
        }
      }
    };

    let jsContinuousMappingStyle = [
      {
        selector: 'node[Degree < 1]',
        css: { 'font-size': 1 }
      },
      {
        "css": {
          "font-size": 10
        },
        "selector": "node[Degree = 1]"
      },
      {
        "css": {
          "font-size": "mapData(Degree,1,18,10,40)"
        },
        "selector": "node[Degree > 1][Degree < 18]"
      },
      {
        "css": {
          "font-size": 40
        },
        "selector": "node[Degree = 18]"
      },
      {
        "css": {
          "font-size": 40
        },
        "selector": "node[Degree > 18]"
      }];

    var result = cxToJs.continuousMappingStyle(cxElementType, cxVP, cxDef, {},visualPropertyMap);

    expect(result).to.eql(jsContinuousMappingStyle);
  });

  it('cxToJs nodeSize continuousMappingStyle', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVP = "NODE_SIZE";
    var cxElementType = "node";

    var cxDef = {
      'COL': 'Degree',
      'T': 'integer',
      'm': {
        '0': {
          'E': '10',
          'G': '10',
          'L': '1',
          'OV': '1.0'
        },
        '1': {
          'E': '40',
          'G': '1',
          'L': '40',
          'OV': '18.0'
        }
      }
    };

    let jsContinuousMappingStyle = [
      {
        selector: 'node[Degree < 1]',
        css: { 'height': 1, 'width': 1 }
      },
      {
        "css": {
          "height": 10,
          "width": 10,
        },
        "selector": "node[Degree = 1]"
      },
      {
        "css": {
          "height": "mapData(Degree,1,18,10,40)",
          "width": "mapData(Degree,1,18,10,40)"
        },
        "selector": "node[Degree > 1][Degree < 18]"
      },
      {
        "css": {
          "height": 40,
          "width": 40
        },
        "selector": "node[Degree = 18]"
      },
      {
        "css": {
          "height": 40,
          "width": 40
        },
        "selector": "node[Degree > 18]"
      }];

    var result = cxToJs.continuousMappingStyle(cxElementType, cxVP, cxDef, {}, visualPropertyMap);

    expect(result).to.eql(jsContinuousMappingStyle);
  });


  it('cxToJs base passthroughMappingStyle', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVP = "NODE_LABEL";
    var cxElementType = "node";

    var cxDef = {
      'COL': 'COMMON',
      'T': 'string',
      'm': {}
    };

    let jsPassthroughMappingStyle = [
      {
        "css": {
          "content": "data(COMMON)"
        },
        "selector": "node[COMMON]"
      }];

    var result = cxToJs.passthroughMappingStyle(cxElementType, cxVP, cxDef, {},visualPropertyMap);

    expect(result).to.eql(jsPassthroughMappingStyle);
  });

  it('cxToJs boolean passthroughMappingStyle', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVP = "NODE_LABEL";
    var cxElementType = "node";

    var cxDef = {
      'COL': 'COMMON',
      'T': 'boolean',
      'm': {}
    };

    let jsPassthroughMappingStyle = [
      {
        "css": {
          "content": "data(COMMON)"
        },
        "selector": "node[COMMON]"
      }];

    var result = cxToJs.passthroughMappingStyle(cxElementType, cxVP, cxDef, {}, visualPropertyMap);

    expect(result).to.eql(jsPassthroughMappingStyle);
  });

  it('cxToJs expand EDGE_BEND', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var objectProperties = {};
    let angle = Math.PI / 3;
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);
    let ratio = 0.5;
    var bendValue = cos + "," + sin + "," + ratio;
    cxToJs.expandPropertiesFromFunctionMap('EDGE_BEND', bendValue, objectProperties);

    var expectedBendDistance = sin * ratio;
    var expectedBendWeight = cos * ratio;

    var expandedBendProperties = {
      "bend-point-distances": [
        expectedBendDistance
      ],
      "bend-point-weights": [
        expectedBendWeight
      ]
    };

    expect(objectProperties).to.eql(expandedBendProperties);
  });

  it('cxToJs postProcessEdgeBends curved is true', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var niceCX = {
      "edges": {
        "e147": {
          "@id": 147,
          "s": 143,
          "t": 141
        }
      },
      "cartesianLayout": {
        "elements": [
          {
            "node": 143,
            "x": 0,
            "y": 0
          },
          {
            "node": 141,
            "x": 2,
            "y": 0
          }
        ]
      }
    };

    var edgeDefaultStyles = [
      {
        "selector": "edge",
        "css": {
          "curve-style": "unbundled-bezier"
        }
      }
    ];

    let angle = Math.PI / 3;
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);
    let ratio = 0.5;

    var bendDistance = sin * ratio;
    var bendWeight = cos * ratio;

    var edgeSpecificStyles = {
      'e147': {
        "selector": "edge[ id = 'e147' ]",
        "css": {
          "bend-point-weights": [
            bendWeight
          ],
          "bend-point-distances": [
            bendDistance
          ]
        }
      }
    };

    var expectedEdgeSpecificStyles = {
      e147:
      {
        selector: 'edge[ id = \'e147\' ]',
        css:
        {
          'curve-style': 'unbundled-bezier',
          'edge-distances': 'node-position',
          'control-point-weights': [bendWeight],
          'control-point-distances': [bendDistance * 2]
        }
      }
    };

    cxToJs.postProcessEdgeBends(niceCX, edgeDefaultStyles, edgeSpecificStyles);
    expect(edgeSpecificStyles).to.eql(expectedEdgeSpecificStyles);
  });

  it('cxToJs postProcessEdgeBends curved is false', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var niceCX = {
      "edges": {
        "e147": {
          "@id": 147,
          "s": 143,
          "t": 141
        }
      },
      "cartesianLayout": {
        "elements": [
          {
            "node": 143,
            "x": 0,
            "y": 0
          },
          {
            "node": 141,
            "x": 2,
            "y": 0
          }
        ]
      }
    };

    var edgeDefaultStyles = [
      {
        "selector": "edge",
        "css": {
          "curve-style": "segments"
        }
      }
    ];

    let angle = Math.PI / 3;
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);
    let ratio = 0.5;

    var bendDistance = sin * ratio;
    var bendWeight = cos * ratio;

    var edgeSpecificStyles = {
      'e147': {
        "selector": "edge[ id = 'e147' ]",
        "css": {
          "bend-point-weights": [
            bendWeight
          ],
          "bend-point-distances": [
            bendDistance
          ]
        }
      }
    };

    var expectedEdgeSpecificStyles = {
      e147:
      {
        selector: 'edge[ id = \'e147\' ]',
        css:
        {
          'curve-style': 'segments',
          'edge-distances': 'node-position',
          'segment-weights': [bendWeight],
          'segment-distances': [bendDistance * 2]
        }
      }
    };

    cxToJs.postProcessEdgeBends(niceCX, edgeDefaultStyles, edgeSpecificStyles);

    var expectedEdgeDefaultStyles = [{
      selector: 'edge',
      css: {
        'curve-style': 'straight',
      }
    }];

    expect(edgeDefaultStyles).to.eql(expectedEdgeDefaultStyles);
    expect(edgeSpecificStyles).to.eql(expectedEdgeSpecificStyles);
  });

  it('cxToJs postProcessEdgeBends runs without cartesianLayout', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var niceCX = {
      "edges": {
        "e147": {
          "@id": 147,
          "s": 143,
          "t": 141
        }
      },
    };

    var edgeDefaultStyles = [
      {
        "selector": "edge",
        "css": {
          "curve-style": "unbundled-bezier"
        }
      }
    ];

    let angle = Math.PI / 3;
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);
    let ratio = 0.5;

    var bendDistance = sin * ratio;
    var bendWeight = cos * ratio;

    var edgeSpecificStyles = {
      'e147': {
        "selector": "edge[ id = 'e147' ]",
        "css": {
          "bend-point-weights": [
            bendWeight
          ],
          "bend-point-distances": [
            bendDistance
          ]
        }
      }
    };

    var expectedEdgeSpecificStyles = {
      e147:
      {
        selector: 'edge[ id = \'e147\' ]',
        css:
        {
          'curve-style': 'unbundled-bezier',
          'edge-distances': 'node-position'
        }
      }
    };

    cxToJs.postProcessEdgeBends(niceCX, edgeDefaultStyles, edgeSpecificStyles);
    expect(edgeSpecificStyles).to.eql(expectedEdgeSpecificStyles);
  });

  it('cxToJs postProcessEdgeBends math', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var niceCX = {
      "edges": {
        "e147": {
          "@id": 147,
          "s": 143,
          "t": 141
        }
      },
      "cartesianLayout": {
        "elements": [
          {
            "node": 143,
            "x": 0,
            "y": 0
          },
          {
            "node": 141,
            "x": 2,
            "y": 0
          }
        ]
      }
    };

    var edgeDefaultStyles = [
      {
        "selector": "edge",
        "css": {
          "curve-style": "unbundled-bezier"
        }
      }
    ];

    let angle = Math.PI / 3;
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);
    let ratio = 0.5;

    var bendDistance = sin * ratio;
    var bendWeight = cos * ratio;

    var edgeSpecificStyles = {
      'e147': {
        "selector": "edge[ id = 'e147' ]",
        "css": {
          "curve-style": "segments",
          "bend-point-weights": [
            bendWeight
          ],
          "bend-point-distances": [
            bendDistance
          ]
        }
      }
    };

    var expectedEdgeSpecificStyles = {
      e147:
      {
        selector: 'edge[ id = \'e147\' ]',
        css:
        {
          'curve-style': 'segments',
          'edge-distances': 'node-position',
          'segment-weights': [bendWeight],
          'segment-distances': [bendDistance * 2]
        }
      }
    };

    cxToJs.postProcessEdgeBends(niceCX, edgeDefaultStyles, edgeSpecificStyles);

    var expectedEdgeDefaultStyles = [{
      selector: 'edge',
      css: {
        'curve-style': 'bezier',
      }
    }];

    expect(edgeDefaultStyles).to.eql(expectedEdgeDefaultStyles);
    expect(edgeSpecificStyles).to.eql(expectedEdgeSpecificStyles);
  });

  it('cxToJs postProcessEdgeBends multiple', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var niceCX = {
      "edges": {
        "e145": {
          "@id": 145,
          "s": 139,
          "t": 141
        },
        "e147": {
          "@id": 147,
          "s": 143,
          "t": 141
        }
      },
      "cartesianLayout": {
        "elements": [
          {
            "node": 143,
            "x": -118.94376881726248,
            "y": 33.01054382324219
          },
          {
            "node": 141,
            "x": -131.49737548828125,
            "y": -102.6236089051531
          },
          {
            "node": 139,
            "x": -292,
            "y": -106
          }
        ]
      }
    };

    var edgeDefaultStyles = [
      {
        "selector": "edge",
        "css": {
          "curve-style": "unbundled-bezier"
        }
      }
    ];

    var edgeSpecificStyles = {
      'e147': {
        "selector": "edge[ id = 'e147' ]",
        "css": {
          "curve-style": "segments",
          "bend-point-weights": [
            -0.04840381846583039
          ],
          "bend-point-distances": [
            99.70264173408412
          ]
        }
      },
      'e145': {
        "selector": "edge[ id = 'e145' ]",
        "css": {
          "bend-point-weights": [
            -0.013547149312127105
          ],
          "bend-point-distances": [
            -99.97612853192109
          ]
        }
      }
    };

    var expectedEdgeSpecificStyles = {
      e147:
      {
        selector: 'edge[ id = \'e147\' ]',
        css:
        {
          'curve-style': 'segments',
          'edge-distances': 'node-position',
          'segment-weights': [-0.04840381846583039],
          'segment-distances': [13580.881964856446]
        }
      },
      e145:
      {
        selector: 'edge[ id = \'e145\' ]',
        css:
        {
          'curve-style': 'unbundled-bezier',
          'edge-distances': 'node-position',
          'control-point-weights': [-0.013547149312127105],
          'control-point-distances': [-16049.981126461222]
        }
      }
    };

    var expectedEdgeDefaultStyles = [{
      selector: 'edge',
      css: {
        'curve-style': 'bezier',
      }
    }];

    cxToJs.postProcessEdgeBends(niceCX, edgeDefaultStyles, edgeSpecificStyles);

    expect(edgeDefaultStyles).to.eql(expectedEdgeDefaultStyles);
    expect(edgeSpecificStyles).to.eql(expectedEdgeSpecificStyles);

  });

  it('cxToJs base cyZoomFromNiceCX', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var niceCX = {
      "visualProperties": {
        "elements": [
          {
            "properties_of": "network",
            "properties": {
              "NETWORK_CENTER_Z_LOCATION": "0.0",
              "NETWORK_SCALE_FACTOR": "2.0",
              "NETWORK_CENTER_Y_LOCATION": "0.0"
            }
          }
        ]
      }
    };

    var result = cxToJs.cyZoomFromNiceCX(niceCX);

    expect(result).to.eql(2);
  });

  it('cxToJs base cyBackgroundColorFromNiceCX', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var niceCX = {
      "visualProperties": {
        "elements": [
          {
            "properties_of": "network",
            "properties": {
              "NETWORK_EDGE_SELECTION": "true",
              "NETWORK_BACKGROUND_PAINT": "#CCCCCC",
              "NETWORK_CENTER_X_LOCATION": "0.0"
            }
          }
        ]
      }
    };

    var result = cxToJs.cyBackgroundColorFromNiceCX(niceCX);

    expect(result).to.eql('#CCCCCC');
  });

  it('cxToJs base cyPanFromNiceCX', function () {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var niceCX = {
      "visualProperties": {
        "elements": [
          {
            "properties_of": "network",
            "properties": {
              "NETWORK_EDGE_SELECTION": "true",
              "NETWORK_CENTER_X_LOCATION": "2.0",
              "NETWORK_CENTER_Y_LOCATION": "3.0",
              "NETWORK_BACKGROUND_PAINT": "#CCCCCC",
            }
          }
        ]
      }
    };

    var result = cxToJs.cyPanFromNiceCX(niceCX);
    var pan = { x: 2, y: 3 };

    expect(result).to.eql(pan);
  });

  it('cx2js mappingFunctionValidator', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var testCases = [
      {
        'mappingType': 'DISCRETE',
        'visualProperty': 'NODE_LABEL_FONT_SIZE',
        'definition': 'COL=CD_CommunityName,T=string'
      },
      {
        'mappingType': 'CONTINUOUS',
        'visualProperty': 'NODE_LABEL_WIDTH',
        'definition': 'COL=CD_CommunityName,T=string'
      },
      {
        'mappingType': 'PASSTHROUGH',
        'visualProperty': 'NODE_LABEL',
        'definition': 'COL=CD_CommunityName,T=string'
      },
      {
        'mappingType': 'PASSTHROUGH',
        'visualProperty': 'NODE_LABEL_COLOR',
        'definition': 'COL=CD_MemberList_LogSize,T=double'
      },
      {
        'mappingType': 'PASSTHROUGH',
        'visualProperty': 'NODE_Z_LOCATION',
        'definition': 'COL=CD_MemberList_LogSize,T=double'
      },
      {
        'mappingType': 'PASSTHROUGH',
        'visualProperty': 'NODE_HEIGHT',
        'definition': 'COL=CD_MemberList_LogSize,T=boolean'
      },
      {
        'mappingType': 'PASSTHROUGH',
        'visualProperty': 'NODE_VISIBLE',
        'definition': 'COL=CD_MemberList_LogSize,T=integer'
      },
    ];

    var expectedResults = [true, true, true, false, true, false, false];

    for (let i = 0; i < testCases.length; i++){
      var testCase = testCases[i]
      var res = cxToJs.mappingFunctionValidator(testCase['mappingType'], testCase['visualProperty'], testCase['definition']);
      expect(res).to.eql(expectedResults[i])
    }
  })

});

it('WP2806 style test', function () {
  var utils = new CyNetworkUtils();
  var cxToJs = new CxToJs(utils);

  var content = fs.readFileSync('test_resources/WP2806.cx');
  var rawCX = JSON.parse(content);
  var niceCX = utils.rawCXtoNiceCX(rawCX);

  var attributeNameMap = {};
  var elements = cxToJs.cyElementsFromNiceCX(niceCX, attributeNameMap);

  //var expectedElementsContent = fs.readFileSync('test_resources/small_graph/small_graph_elements.json');
  //var expectedElementsJson = JSON.parse(expectedElementsContent);
  //expect(elements.nodes).to.have.deep.members(expectedElementsJson.nodes);
  //expect(elements.edges).to.have.deep.members(expectedElementsJson.edges);

  var style = cxToJs.cyStyleFromNiceCX(niceCX, attributeNameMap);

  //var expectedStyleContent = fs.readFileSync('test_resources/small_graph/small_graph_style.json');
  //var expectedStyleJson = JSON.parse(expectedStyleContent);
  //expect(style).to.have.deep.members(expectedStyleJson);

  console.log(style);
});