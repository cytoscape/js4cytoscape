async function getAvailableApps(baseUrl = defaultBaseUrl) {
    let res = commandsGET('apps list available', baseUrl=baseUrl);
}
