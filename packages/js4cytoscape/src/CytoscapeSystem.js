/*==============================================================================
 Functions for checking CYTOSCAPE SYSTEM information, including versions
 memory usage and a function to free Java memory used by the Cytoscape session. 
 ------------------------------------------------------------------------------*/

/* 
cyBadge
  Reports the status of your local instance of Cytoscape, displaying the version 
  if it is successfully detected. Expects an element with class="cytoscape-badge"
  and the js4cytoscape-style.css. CyBrowser compatible.
*/
let cyrunning;
let cybadgeKey;
let cybadgeVal;
let cybadgeElm;
let cyversion;

async function cyBadge(baseUrl = defaultBaseUrl) {
if (inCyBrowser){
    console.log('cytoscape is running and CyBrowser detected');
    cybadgeElm = document.getElementsByClassName('cytoscape-badge');
    //just in case there is more than on badge on a page
    for(let i = 0; i < cybadgeElm.length; i++) {
        cybadgeKey = document.createElement('span');
        cybadgeKey.className = 'cybadgekey';
        cybadgeKey.innerHTML = 'cybrowser';
        cybadgeVal = document.createElement('span');
        cybadgeVal.className = 'cybadgeval';
        cybadgeVal.style = 'background:#0078B9;';
        cybadgeVal.innerHTML = 'detected';
        cybadgeElm[i].appendChild(cybadgeKey);
        cybadgeElm[i].appendChild(cybadgeVal);
    }
} else {
  cyrunning = false;
  try {
    cyversion = await cyrestGET('version');
    cyrunning = true;
    console.log('cytoscape v' + cyversion["cytoscapeVersion"] + ' is running');
  } catch(err){
    cyrunning = false;
    console.log('cytoscape is not running');
  }
  cybadgeElm = document.getElementsByClassName('cytoscape-badge');
  //just in case there is more than on badge on a page
  for(let i = 0; i < cybadgeElm.length; i++) {
    cybadgeKey = document.createElement('span');
    cybadgeKey.className = 'cybadgekey';
    cybadgeKey.innerHTML = 'cytoscape';
    cybadgeVal = document.createElement('span');
    cybadgeVal.className = 'cybadgeval';
    if (cyrunning){
      cybadgeVal.style = 'background:#0078B9;';
      cybadgeVal.innerHTML = 'v' + cyversion["cytoscapeVersion"];
    } else {
      cybadgeVal.style = 'background:#CD5F46;';
      cybadgeVal.innerHTML = 'not running';
    }
    cybadgeElm[i].appendChild(cybadgeKey);
    cybadgeElm[i].appendChild(cybadgeVal);
  } 
}
}

/*
checkCytoscape - DEPRECATED
  Checks the local running version of Cytoscape and updates a #cytobutton element.
*/
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

/*
cytoscapeVersionInfo
    Returns the version of Cytoscape running locally. Not compatible with CyBrowser.
*/
async function cytoscapeVersionInfo(baseUrl = defaultBaseUrl) {
    let res = cyrestGET('version', baseUrl = baseUrl);
    const apiVersion = res.then(data => { console.log("apiVersion: " + data['apiVersion']) });
    const cytoscapeVersion = res.then(data => { console.log("cytoscapeVersion: " + data['cytoscapeVersion']) });
    return data['cytoscapeVersion'];
}

/*
cytoscapeMemoryStatus
    Returns the version of Cytoscape running locally. Not compatible with CyBrowser.
*/
async function cytoscapeMemoryStatus(baseUrl = defaultBaseUrl) {
    let res = cyrestGET('', '', baseUrl = baseUrl);
    const memory = res.then(data => { console.log(data['memoryStatus']) });
    return data['memoryStatus'];
}
