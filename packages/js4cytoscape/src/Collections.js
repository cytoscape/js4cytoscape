async function getCollectionList(baseUrl = defaultBaseUrl) {
    let res = cyrestGET('collections', baseUrl = baseUrl);
    const apiVersion = res.then(data => { console.log(data['apiVersion']) });
    const cytoscapeVersion = res.then(data => { console.log(data['cytoscapeVersion']) });
}
