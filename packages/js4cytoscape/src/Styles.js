async function getVisualStyleNames(baseUrl = defaultBaseUrl){
    let res = await cyrestGET("apply/styles", baseUrl);
    console.log(res);
    return res;
}


async function getCurrentStyle(network = null, baseUrl = defaultBaseUrl){
    let netSuid = await getNetworkSuid(network, baseUrl);
    let viewSuid = await getNetworkViewsSuid(netSuid, baseUrl);
    let res = await cyrestGET("networks/" + netSuid + "/views/" + viewSuid + "/currentStyle", baseUrl);
    console.log(res['title']);
    return res['title'];
}


async function getArrowShapes(baseUrl = defaultBaseUrl){
    let res = await cyrestGET("styles/visualproperties/EDGE_TARGET_ARROW_SHAPE/values", baseUrl);
    console.log(res['values']);
    return res['values'];
}


async function getLineStyles(baseUrl = defaultBaseUrl){
    let res = await cyrestGET("styles/visualproperties/EDGE_LINE_TYPE/values", baseUrl);
    console.log(res['values']);
    return res['values'];
}


async function getNodeShapes(baseUrl = defaultBaseUrl){
    let res = await cyrestGET("styles/visualproperties/NODE_SHAPE/values", baseUrl);
    console.log(res['values']);
    return res['values'];
}
