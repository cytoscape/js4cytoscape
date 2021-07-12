async function getAvailableApps(baseUrl = defaultBaseUrl) {
    let res = commandsGET('apps list available', baseUrl=baseUrl);
    let availableApps = res.then(data => { console.log('Available apps: ' + data) });
}


async function getInstalledApps(baseUrl = defaultBaseUrl) {
    let res = commandsGET('apps list installed', baseUrl=baseUrl);
    let installedApps = res.then(data => { console.log('Installed apps: ' + data) });

}


async function getDisabledApps(baseUrl = defaultBaseUrl) {
    let res = commandsGET('apps list disabled', baseUrl=baseUrl);
    let disabledApps = res.then(data => { console.log('Disabled apps: ' + data) });
}


async function getAppUpdates(baseUrl = defaultBaseUrl) {
    let res = commandsGET('apps list updates', baseUrl=baseUrl);
}


async function openAppStore(app, baseUrl = defaultBaseUrl) {
    let res = commandsGET('apps open appstore app=' + "'" + app + "'", baseUrl=baseUrl);
}
