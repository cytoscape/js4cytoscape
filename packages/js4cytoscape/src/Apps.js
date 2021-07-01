async function getAvailableApps(baseUrl = defaultBaseUrl) {
    let res = commandsGET('apps list available', baseUrl=baseUrl);
}


async function getInstalledApps(baseUrl = defaultBaseUrl) {
    let res = commandsGET('apps list installed', baseUrl=baseUrl);
}


async function getDisabledApps(baseUrl = defaultBaseUrl) {
    let res = commandsGET('apps list disabled', baseUrl=baseUrl);
}


async function getAppUpdates(baseUrl = defaultBaseUrl) {
    let res = commandsGET('apps list updates', baseUrl=baseUrl);
}


async function openAppStore(app, baseUrl = defaultBaseUrl) {
    let res = commandsGET('apps open appstore app=' + "'" + app + "'", baseUrl=baseUrl);
}
