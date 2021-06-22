async function cytoscapeVersionInfo(baseUrl = defaultBaseUrl) {
    let res = cyrestGET('version', baseUrl = baseUrl);
    console.log(res)
}


async function cytoscapeMemoryStatus(baseUrl = defaultBaseUrl) {
    let res = cyrestGET('', baseUrl = baseUrl);
    console.log(res);
}
