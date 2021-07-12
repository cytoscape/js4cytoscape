async function getFilterList(baseUrl = defaultBaseUrl) {
    let filterList = commandsPOST('filter list', baseUrl=baseUrl);
    let res = filterList.then(data => { console.log('Filter list: ' + JSON.stringify(JSON.parse(data)['data'])) });
}
