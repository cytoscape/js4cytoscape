async function analyzeNetwork(directed = false, baseUrl = defaultBaseUrl) {
    let analyze = commandsPOST('analyzer analyze directed=' + directed, baseUrl=baseUrl);
    let res = analyze.then(data => { console.log('Analyze network: ' + JSON.stringify(JSON.parse(data)['data']))});
}
