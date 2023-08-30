/**
 * Run network analyzer tool on current network in Cytoscape.
 *
 * @param {boolean} [directed=false]
 */
async function analyzeNetwork(directed = false, baseUrl = defaultBaseUrl) {
    let analyze = commandsPOST('analyzer analyze directed=' + directed, baseUrl=baseUrl);
    let res = analyze.then(data => { console.log('Analyze network: ' + JSON.stringify(JSON.parse(data)['data']))});
}


/**
 * Import wikipathway networks into Cytoscape.
 *
 * @param {String} wikipathway ID
 */
async function wikipathwayImport(wikipathwayId, baseUrl = defaultBaseUrl) {
    let importAsPathway = commandsGET('wikipathways import-as-pathway id=' + wikipathwayId, baseUrl=baseUrl);
    let res = importAsPathway.then(data => { console.log('Import as pathway: ' + JSON.stringify(JSON.parse(data)['data']))});
}
