async function cytoscapeVersionInfo(baseUrl = defaultBaseUrl) {
    let res = cyrestGET('version', baseUrl = baseUrl);
    console.log(res)
}
