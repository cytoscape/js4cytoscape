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
