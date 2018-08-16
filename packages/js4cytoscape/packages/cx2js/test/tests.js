const { expect, assert } = require('chai');
const { CxToJs, CyNetworkUtils } = require('../src');

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


describe('Example', function(){
  it('niceCX empty', function(){
   
    var utils = new CyNetworkUtils();
    
    var rawCX = {

    };
    var niceCX = utils.rawCXtoNiceCX(rawCX);

    expect( niceCX ).to.eql( { edges : {}} );
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

  it('cxToJs base parseMappingDefinition', function(){
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

  it('cxToJs base getCyVisualAttributeForVP', function(){
    var utils = new CyNetworkUtils();
    var cxToJs = new CxToJs(utils);

    var cxVP = "NODE_FILL_COLOR";

    let jsVisualAttribute = "background-color";
    var result = cxToJs.getCyVisualAttributeForVP(cxVP);

    expect( result ).to.eql(jsVisualAttribute);
  });


});
