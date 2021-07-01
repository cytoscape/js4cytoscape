async function analyzeNetwork(directed = false, baseUrl = defaultBaseUrl) {
    let res = commandsPOST('analyzer analyze directed=' + directed, baseUrl=baseUrl);
}
