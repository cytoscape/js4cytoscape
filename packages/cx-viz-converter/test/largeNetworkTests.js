var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
const largeNetwork = require ('../src/largeNetwork/largeNetwork.js');
const fs = require('fs-extra');

describe('largeNetworkTests', function(){
  it('test targetFormat is lnv', function(){
    expect(largeNetwork.converter.targetFormat).to.equal('lnv');
  });

  it('test simpleDefaultPropertyConvert', function(){
    const output = largeNetwork.simpleDefaultPropertyConvert('key', 'value');
    const expected = { 'key' : 'value'};
    expect(output).to.eql(expected);
  });

  it('test processEdgeView', function(){
    const input = {
        id:'idValue',
        s: 'sValue',
        t: 'tValue',
        preprocessLabelColor: [
            210,
            220,
            230
          ],
          preprocessLabelAlpha: 240,  
          labelFontSize: 10,
          preprocessColor: [
            110,
            120,
            130
          ],
          preprocessAlpha: 140      
    }
    
    const output = largeNetwork.processEdgeView(input);
    const expected = {
          color: [
            110,
            120,
            130,
            140
          ],
          id: "idValue",
          labelColor: [
            210,
            220,
            230,
            240
          ],
          labelFontSize: 10,
          s: "sValue",
          t: "tValue",
         }
  
    expect(output).to.eql(expected);
  });

  it('test processNodeView', function(){
    const input = {
        id:'idValue',
        preprocessLabelColor: [
            210,
            220,
            230
          ],
          preprocessLabelAlpha: 240,  
          labelFontSize: 10,
          preprocessColor: [
            110,
            120,
            130
          ],
          preprocessAlpha: 140,  

          position:[30,40],

          preprocessNodeWidth: 35,
          preprocessNodeHeight: 10
    }
    
    const output = largeNetwork.processNodeView(input);
    const expected = {
          color: [
            110,
            120,
            130,
            140
          ],
          id: "idValue",
          labelColor: [
            210,
            220,
            230,
            240
          ],
          position:[30,40],
          labelFontSize: 10,
          size: 35
         }
  
    expect(output).to.eql(expected);
  });

  it('test getDefaultValues', function(){
    const input = {
        edge: {
            EDGE_LABEL_COLOR: "#D2DCE6",
            EDGE_LABEL_FONT_SIZE: 10,
            EDGE_LABEL_OPACITY: 0.94,
            EDGE_LINE_COLOR: "#6E7882",
            EDGE_OPACITY: 0.55,
            EDGE_WIDTH: 2.0
        },
        network: {
            NETWORK_BACKGROUND_COLOR: "#FFFFFF"
        },
        node: {
            NODE_BACKGROUND_COLOR: "#6E7882",
            NODE_BACKGROUND_OPACITY: 0.55,
            NODE_HEIGHT: 10.0,
            NODE_LABEL_COLOR: "#D2DCE6",
            NODE_LABEL_FONT_SIZE: 12,
            NODE_LABEL_OPACITY: 0.94,
            NODE_WIDTH: 35.0
        }
    };

    const output = largeNetwork.getDefaultValues(input);
    const expected = {
        edge: {
            labelFontSize: 10,
            preprocessAlpha: 140,
            preprocessColor: [
              110,
              120,
              130,
            ],
            preprocessLabelAlpha: 240,
            preprocessLabelColor: [
              210,
              220,
              230,
            ],
            width: 2
          },
          node: {
            labelFontSize: 12,
            preprocessAlpha: 140,
            preprocessColor: [
              110,
              120,
              130,
            ],
            preprocessLabelColor: [
              210,
              220,
              230,
            ],
            preprocessLabelAlpha: 240,
            preprocessNodeHeight: 10,
            preprocessNodeWidth: 35
          }
  };
    expect(output).to.eql(expected);
  });
});