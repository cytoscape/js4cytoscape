/**
 * Return a list of the available apps in the app store.
 *
 * @return {*} 
 */
async function getAvailableApps(baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps list available', baseUrl=baseUrl);
    return res;
}


/**
 * Return a list of apps currently installed in local Cytoscape.
 *
 * @return {*} 
 */
async function getInstalledApps(baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps list installed', baseUrl=baseUrl);
    return res;
}

/**
 * Return a list of apps currently disabled in local Cytoscape.
 *
 * @return {*} 
 */
async function getDisabledApps(baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps list disabled', baseUrl=baseUrl);
    return res;
}

/**
 * Return a list of currently installed apps with updates available.
 *
 * @return {*} 
 */
async function getAppUpdates(baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps list updates', baseUrl=baseUrl);
    return res;
}


/**
 * Open the app store page for an app.
 *
 * @param {String} app Name of app
 * @return {*} 
 */
async function openAppStore(app, baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps open appstore app=' + "'" + app + "'", baseUrl=baseUrl);
    return res;
}


/**
 * Disable a currently installed app in the local Cytoscape instance.
 *
 * @param {String} app Name of app
 * @return {*} 
 */
async function disableApp(app, baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps disable app=' + "'" + app + "'", baseUrl=baseUrl);
    return res;
}

/**
 * Enable a currently installed app in the local Cytoscape instance.
 *
 * @param {String} app Name of app
 * @return {*} 
 */
async function enableApp(app, baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps enable app=' + "'" + app + "'", baseUrl=baseUrl);
    return res;
}
