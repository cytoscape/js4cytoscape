const { expect, assert } = require('chai');
const { CxToJs, CyNetworkUtils } = require('../src');
const fs  = require('fs-extra');

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


describe('CX to JS', function(){
  
  it('niceCX end to end small_graph', function(){
   
    var utils = new CyNetworkUtils();
    
    var content = fs.readFileSync('test_resources/small_graph/small_graph.cx');
    var rawCX = JSON.parse(content);

    var niceCX = utils.rawCXtoNiceCX(rawCX);

    var expectedContent = fs.readFileSync('test_resources/small_graph/small_graph_nice.cx');
    var expectedNiceCX = JSON.parse(expectedContent);

    expect( niceCX ).to.eql( expectedNiceCX );
  });
  
  it('niceCX end to end hiview', function(){
   
    this.timeout(15000);

    var utils = new CyNetworkUtils();
    
    var content = fs.readFileSync('test_resources/hiview/hiview.cx');
    var rawCX = JSON.parse(content);

    var niceCX = utils.rawCXtoNiceCX(rawCX);

    var cxToJs = new CxToJs(utils);

    var attributeNameMap = {};
    var elements = cxToJs.cyElementsFromNiceCX(niceCX,  attributeNameMap);

    var expectedContent = fs.readFileSync('test_resources/hiview/hiview.json');
    var expectedJSON = JSON.parse(expectedContent);

    expect( elements['nodes'].length ).to.eql( expectedJSON['elements']['nodes'].length );
    expect( elements['edges'].length ).to.eql( expectedJSON['elements']['edges'].length );
    
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

  it('niceCX empty', function(){
   
    var utils = new CyNetworkUtils();
    
    var rawCX = {

    };
    var niceCX = utils.rawCXtoNiceCX(rawCX);

    expect( niceCX ).to.eql( { edges : {}} );
  });

  it('small_graph end to end', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var content = fs.readFileSync('test_resources/small_graph/small_graph_nice.cx');
    var niceCX = JSON.parse(content);

    var attributeNameMap = {};
    var elements = cxToJs.cyElementsFromNiceCX(niceCX, attributeNameMap);
    
    var expectedElementsContent = fs.readFileSync('test_resources/small_graph/small_graph_elements.json');
    var expectedElementsJson = JSON.parse(expectedElementsContent);
    expect( elements ).to.eql( expectedElementsJson );

    var style = cxToJs.cyStyleFromNiceCX(niceCX, attributeNameMap);

    var expectedStyleContent = fs.readFileSync('test_resources/small_graph/small_graph_style.json');
    var expectedStyleJson = JSON.parse(expectedStyleContent);
    expect( style ).to.eql( expectedStyleJson );
  });

  it('java_logical_fonts identification', function() {
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);
    expect( cxToJs.isJavaLogicalFont('Dialog.plain') ).to.eql( true );
  });

  it('java_logical_fonts end to end', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var content = fs.readFileSync('test_resources/java_logical_fonts/java_logical_fonts.nicecx.json');
    var niceCX = JSON.parse(content);

    var attributeNameMap = {};
    var elements = cxToJs.cyElementsFromNiceCX(niceCX, attributeNameMap);
    
    var expectedElementsContent = fs.readFileSync('test_resources/java_logical_fonts/java_logical_fonts.elements.json');
    var expectedElementsJson = JSON.parse(expectedElementsContent);
    expect( elements ).to.eql( expectedElementsJson );

    var style = cxToJs.cyStyleFromNiceCX(niceCX, attributeNameMap);

    var expectedStyleContent = fs.readFileSync('test_resources/java_logical_fonts/java_logical_fonts.style.json');
    var expectedStyleJson = JSON.parse(expectedStyleContent);
    expect( style ).to.eql( expectedStyleJson );
  });

  it('cxToJs defaultStyle', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var defaultStyle = cxToJs.getDefaultStyle();

    expect( defaultStyle ).to.eql( DEFAULT_STYLE );
  });

  it('cxToJs getCyAttributeName', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var attributeNameMap = {'foo' : 'bar'};

    var attributeName = cxToJs.getCyAttributeName('foo', attributeNameMap);

    expect( attributeName ).to.equal( 'bar' );
  });

  it('cxToJs specialCase getCyAttributeName', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var attributeNameMap = {'foo' : 'bar'};

    var attributeName = cxToJs.getCyAttributeName('id', attributeNameMap);

    expect( attributeName ).to.equal( 'cx_id' );
  });

  it('cxToJs direct getCyAttributeName', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var attributeNameMap = {'foo' : 'bar'};

    var attributeName = cxToJs.getCyAttributeName('hodor', attributeNameMap);

    expect( attributeName ).to.equal( 'hodor' );
  });

  it('cxToJs invalidChar sanitizeAttributeNameMap', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var attributeNameMap = {'$id' : '$id'};

    cxToJs.sanitizeAttributeNameMap(attributeNameMap);

    expect( attributeNameMap ).to.eql({'$id' : '_id_u1'});
  });

  it('cxToJs sanitizeAttributeNameMap', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var attributeNameMap = {'foo' : 'foo'};

    cxToJs.sanitizeAttributeNameMap(attributeNameMap);

    expect( attributeNameMap ).to.eql({'foo' : 'foo'});
  });

  it('cxToJs specialCase sanitizeAttributeNameMap', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var attributeNameMap = {'shared name' : 'replace me'};

    cxToJs.sanitizeAttributeNameMap(attributeNameMap);

    expect( attributeNameMap ).to.eql({'shared name' : 'name'});
  });

  it('cxToJs list_of_string getFirstElementFromList', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var list = {'d' : 'list_of_string','v' : ['element the first', 'element the second']};

    var firstElement = cxToJs.getFirstElementFromList(list);

    expect( firstElement ).to.equal('element the first');
  });

  it('cxToJs list_of_boolean getFirstElementFromList', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var list = {'d' : 'list_of_boolean','v' : [true, false]};

    var firstElement = cxToJs.getFirstElementFromList(list);

    expect( firstElement ).to.equal(true);
  });

  it('cxToJs list_of_numbers getFirstElementFromList', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var list = {'d' : 'list_of_numbers','v' : [1, 2]};

    var firstElement = cxToJs.getFirstElementFromList(list);

    expect( firstElement ).to.equal(1);
  });

  it('cxToJs cyColorFromCX', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxColor = '#0088FF';

    var cyColor = cxToJs.cyColorFromCX(cxColor);

    expect( cyColor ).to.equal('rgb(0,136,255)');
  });

  it('cxToJs cyNumberFromString', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxNumber = '1e06';

    var cyNumber = cxToJs.cyNumberFromString(cxNumber);

    expect( cyNumber ).to.equal(1000000);
  });

  it('cxToJs cyOpacityFromCX', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxOpacity = 128;

    var cyOpacity = cxToJs.cyOpacityFromCX(cxOpacity);

    expect( cyOpacity ).to.equal(128/255);
  });

  it('cxToJs base commaDelimitedListStringToStringList2', function(){
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

    expect( list ).to.eql(expectedList);
  });

  it('cxToJs discreet parseMappingDefinition', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var definition = "COL=directed,T=boolean,K=0=true,V=0=DELTA";

    let expectedList = { 
      m: { '0': { K: 'true', V: 'DELTA' } },
      COL: 'directed',
      T: 'boolean' 
    };
    var result = cxToJs.parseMappingDefinition(definition);

    expect( result ).to.eql(expectedList);
  });

  it('cxToJs continuous parseMappingDefinition', function(){
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

    expect( result ).to.eql(expectedList);
  });

  it('cxToJs passthrough parseMappingDefinition', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var definition = 'COL=COMMON,T=string';

    let expectedList = { 
      'COL': 'COMMON',
      'T': 'string',
      'm': {}
    };
    var result = cxToJs.parseMappingDefinition(definition);

    expect( result ).to.eql(expectedList);
  });

  it('cxToJs base getNodeLabelPosition', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxPosition = "C,C,c,0.00,0.00";

    let jsPosition = {
      "text-halign": "center",
      "text-valign": "center"
    };
    var result = cxToJs.getNodeLabelPosition(cxPosition);

    expect( result ).to.eql(jsPosition);
  });

  it('cxToJs Dialog.plain expandFontProperties', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var labelFontFace = "Dialog.plain,plain,15";
    var objectProperties = {};
    cxToJs.expandProperties('NODE_LABEL_FONT_FACE', labelFontFace, objectProperties);

    var expandedFontProperties = {
      "font-family": "Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif",
      "font-size": "15"
    };

    expect( objectProperties ).to.eql(expandedFontProperties);
  });



  it('cxToJs java.bolditalic expandFontProperties', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var labelFontFace = "Dialog.bolditalic,plain,15";
    var objectProperties = {};
    cxToJs.expandProperties('NODE_LABEL_FONT_FACE', labelFontFace, objectProperties);

    var expandedFontProperties = {
      "font-family": "Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif",
      'font-size': '15',
      "font-style": "italic",
      "font-weight": "bold"
    };

    expect( objectProperties ).to.eql(expandedFontProperties);
  });

  it('cxToJs ArialMT expandFontProperties', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var labelFontFace = "ArialMT,plain,10";
    var objectProperties = {};
    cxToJs.expandProperties('NODE_LABEL_FONT_FACE', labelFontFace, objectProperties);

    var expandedFontProperties = {
      "font-family": "Arial,Helvetica Neue,Helvetica,sans-serif",
      'font-size': '10'
    };

    expect( objectProperties ).to.eql(expandedFontProperties);
  });

  it('cxToJs expandDefaultProperties', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var objectProperties = {};
    cxToJs.expandDefaultProperties('NODE_LABEL_FONT_FACE', objectProperties);

    var expandedProperties = {
      'font-family': 'sans-serif',
      'font-weight': 'normal'
    };

    expect( objectProperties ).to.eql(expandedProperties);
  });

  it('cxToJs base expandLabelPosition', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cyLabelPosition = "C,C,c,0.00,0.00"; 
    var objectProperties = {};

    cxToJs.expandProperties('NODE_LABEL_POSITION', cyLabelPosition, objectProperties);

    var expandedLabelPosition = {
      "text-halign": "center",
      "text-valign": "center",
    };

    expect( objectProperties ).to.eql(expandedLabelPosition);
  });

  it('cxToJs NWCc expandLabelPosition', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cyLabelPosition = "NW,C,c,0.00,0.00"; 
    var objectProperties = {};

    cxToJs.expandProperties('NODE_LABEL_POSITION', cyLabelPosition, objectProperties);

    var expandedLabelPosition = {
      "text-halign": "left",
      "text-valign": "top",
    };

    expect( objectProperties ).to.eql(expandedLabelPosition);
  });

  it('cxToJs base getCyVisualAttributeForVP', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVP = "NODE_FILL_COLOR";

    let jsVisualAttribute = "background-color";
    var result = cxToJs.getCyVisualAttributeForVP(cxVP);

    expect( result ).to.equal(jsVisualAttribute);
  });

  it('cxToJs base getCyVisualAttributeObjForVP', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVP = "NODE_FILL_COLOR";

    let jsVisualAttribute = { att: 'background-color', type: 'color' };

    var result = cxToJs.getCyVisualAttributeObjForVP(cxVP);

    expect( result ).to.eql(jsVisualAttribute);
  });

  it('cxToJs base getCyVisualAttributeTypeForVp', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVP = "NODE_FILL_COLOR";

    let jsVisualAttributeType = 'color' ;

    var result = cxToJs.getCyVisualAttributeTypeForVp(cxVP);

    expect( result ).to.equal(jsVisualAttributeType);
  });

  it('cxToJs base getCyVisualAttributeValue', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVPValue = "#0088FF";
    var cxVPType = 'color';

    let jsVisualAttributeValue = 'rgb(0,136,255)' ;

    var result = cxToJs.getCyVisualAttributeValue(cxVPValue, cxVPType);

    expect( result ).to.equal(jsVisualAttributeValue);
  });

  it('cxToJs base discreteMappingStyle', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVP = "EDGE_TARGET_ARROW_SHAPE";
    var cxElementType = "edge";
   
    var cxDef = { 
      m: { '0': { K: 'true', V: 'DELTA' } },
      COL: 'directed',
      T: 'boolean' 
    };

    let jsDiscreetMappingStyle = [ { selector: 'edge[directed = \'true\']',
    css: { 'target-arrow-shape': 'triangle' } } ];

    var result = cxToJs.discreteMappingStyle(cxElementType, cxVP, cxDef, {});

    expect( result ).to.eql(jsDiscreetMappingStyle);
  });

  it('cxToJs base continuousMappingStyle', function(){
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
      { selector: 'node[Degree < 1]',
        css: { 'font-size': 1 } },
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
        } ];

    var result = cxToJs.continuousMappingStyle(cxElementType, cxVP, cxDef, {});

    expect( result ).to.eql(jsContinuousMappingStyle);
  });

  it('cxToJs base passthroughMappingStyle', function(){
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
      } ];

    var result = cxToJs.passthroughMappingStyle(cxElementType, cxVP, cxDef, {});

    expect( result ).to.eql(jsPassthroughMappingStyle);
  });

  it('cxToJs base cyZoomFromNiceCX', function(){
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
          ]}};
  
    var result = cxToJs.cyZoomFromNiceCX(niceCX);

    expect( result ).to.eql(2);
  });

  it('cxToJs base cyBackgroundColorFromNiceCX', function(){
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
          ]}};
  
    var result = cxToJs.cyBackgroundColorFromNiceCX(niceCX);

    expect( result ).to.eql('#CCCCCC');
  });

  it('cxToJs base cyPanFromNiceCX', function(){
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
          ]}};
  
    var result = cxToJs.cyPanFromNiceCX(niceCX);
    var pan = { x: 2, y:3};

    expect( result ).to.eql(pan);
  });

});
