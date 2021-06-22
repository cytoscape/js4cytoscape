async function cytoscapeVersionInfo(baseUrl = defaultBaseUrl) {
    let res = cyrestGET('version', baseUrl = baseUrl);
    const apiVersion = res.then(data => { console.log(data['apiVersion']) });
    const cytoscapeVersion = res.then(data => { console.log(data['cytoscapeVersion']) });
}


async function cytoscapeMemoryStatus(baseUrl = defaultBaseUrl) {
    let res = cyrestGET('', '', baseUrl = baseUrl);
    const memory = res.then(data => { console.log(data['memoryStatus']) });
}
