/**
 * List the SUIDs for all network views associated with a given network.
 *
 * @param {*} [network=null]
 * @return {*} 
 */
async function getNetworkViews(network = null, baseUrl = defaultBaseUrl){
    let netSuid = await getNetworkSuid(network, baseUrl);
    let cmd = "networks/" + netSuid + "/views";
    let res = cyrestGET(cmd, baseUrl);
    let printOut = res.then((data) => { console.log("Network views suid: " + data) });
    return res;
}

/**
 * Zoom to fit network content to current window in Cytoscape.
 *
 * @param {boolean} [selectedOnly=false]
 * @param {*} [network=null]
 */
async function fitContent(selectedOnly = false, network = null, baseUrl = defaultBaseUrl){
    let viewSuid = await getNetworkViewsSuid(network, baseUrl);
    let selected = 'view fit selected view=SUID:'  + viewSuid;
    let notSelected = 'view fit content view=SUID:' + viewSuid;
    if (selectedOnly == true) {
        commandsPOST(selected, baseUrl);
    } else {
        commandsPOST(notSelected, baseUrl);
    }
}

/**
 * Set the current network view.
 *
 * @param {*} [network=null]
 * @param {*} [baseUrl=defaultBaseUrl]
 */
async function setCurrentView(network = null, baseUrl = defaultBaseUrl){
    let viewSuid = await getNetworkViewsSuid(network, baseUrl);
    commandsPOST('view set current view=SUID:"' + viewSuid + '"', baseUrl=baseUrl);
}
