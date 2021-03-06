async function getNetworkViews(network = null, baseUrl = defaultBaseUrl){
    let netSuid = await getNetworkSuid(network, baseUrl);
    let cmd = "networks/" + netSuid + "/views";
    let res = cyrestGET(cmd, baseUrl);
    let printOut = res.then((data) => { console.log("Network views suid: " + data) });
    return res;
}


async function getNetworkViewsSuid(network = null, baseUrl = defaultBaseUrl){
    let netSuid = await getNetworkSuid(network, baseUrl);
    let anyViews = await getNetworkViews(netSuid, baseUrl);
    return anyViews;
}


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

async function setCurrentView(network = null, baseUrl = defaultBaseUrl){
    let viewSuid = await getNetworkViewsSuid(network, baseUrl);
    commandsPOST('view set current view=SUID:"' + viewSuid + '"', baseUrl=baseUrl);
}
