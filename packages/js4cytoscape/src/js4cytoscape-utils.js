const defaultBaseUrl = 'http://127.0.0.1:1234/v1';
const serverUrl = 'http://ndexbio.org/v2';
const CYREST_BASE_URL = 'http://127.0.0.1:1234';
let ndex;
let disabledButton;

function displayCX(cx, elementId) {
    const element = document.getElementById(elementId);
    const utils = new cytoscapeCx2js.CyNetworkUtils();
    const niceCX = utils.rawCXtoNiceCX(cx);
    const cx2Js = new cytoscapeCx2js.CxToJs(utils);
    let attributeNameMap = {};
    const elements = cx2Js.cyElementsFromNiceCX(niceCX, attributeNameMap);
    const style = cx2Js.cyStyleFromNiceCX(niceCX, attributeNameMap);
    const cyBackgroundColor = cx2Js.cyBackgroundColorFromNiceCX(niceCX);
    const layout = cx2Js.getDefaultLayout();
    const zoom = cx2Js.cyZoomFromNiceCX(niceCX);
    const pan = cx2Js.cyPanFromNiceCX(niceCX);
    element.style.backgroundColor = cyBackgroundColor;
    const cytoscapeJS = {
        container: element,
        style: style,
        elements: elements,
        layout: layout,
        zoom: zoom,
        pan: pan
    };
    const cy = cytoscape(cytoscapeJS);
    cy.fit()
};


function initNdexClient() {
    ndex = new ndexClient.NDEx(serverUrl);
}


function displayNDExCX(uuid, element) {
    initNdexClient()
    ndex.getRawNetwork(uuid).then((cx) => { displayCX(cx, element); });
}


function displayLocalCX(fileLocation, element) {
    initNdexClient()
    fetch(fileLocation)
      .then(function (response) {
        return response.json();
      }).then((cx) => { displayCX(cx, element); });
}

async function checkCytoscape() {
    try {
      let res = await cyrestGET('version');
      disabledButton = false;
    } catch(err){
      disabledButton = true;
    }
    const button = document.getElementById('cytobutton');
    if (disabledButton) button.disabled = "disabled";
    if (disabledButton) document.getElementById('cytobutton').innerText = 'Download Cytoscape';
    if (disabledButton) document.getElementById("cytobutton").setAttribute('title',"Download Cytoscape");
}
