async function getAvailableApps(baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps list available', baseUrl=baseUrl);
    return res;
}


async function getInstalledApps(baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps list installed', baseUrl=baseUrl);
    return res;
}


async function getDisabledApps(baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps list disabled', baseUrl=baseUrl);
    return res;
}


async function getAppUpdates(baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps list updates', baseUrl=baseUrl);
    return res;
}


async function openAppStore(app, baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps open appstore app=' + "'" + app + "'", baseUrl=baseUrl);
    return res;
}


async function openAppStore(app, baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps open appstore app=' + "'" + app + "'", baseUrl=baseUrl);
    return res;
}


async function disableApp(app, baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps disable app=' + "'" + app + "'", baseUrl=baseUrl);
    return res;
}


async function enableApp(app, baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps enable app=' + "'" + app + "'", baseUrl=baseUrl);
    return res;
}
