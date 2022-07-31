const coreApps = ["BioPAX Reader",  "Biomart Web Service Client", "CX Support",
                  "Core Apps", "CyNDEx-2", "CyCL", "Diffusion", "FileTransfer",
                  "ID Mapper", "JSON Support", "Network Merge", "NetworkAnalyzer",
                  "OpenCL Prefuse Layout", "PSI-MI Reader", "PSICQUIC Web Service Client",
                  "SBML Reader", "aMatReader", "copycatLayout", "cyBrowser",
                  "cyChart", "cyREST"]


/**
 * Update an app or all apps.
 *
 * @param {String} tabId
 * @param {String} buttonId
 * @return null
 */
async function updateAllApps(tabId, buttonId, baseUrl = defaultBaseUrl) {
    let res = await commandsGET('apps update app=', baseUrl=baseUrl);
    renderAllAppUpdates(tabId)
    checkUpdateApp(buttonId)
    return res;
}

/**
 * Return a list of the apps that have updates in the app store.
 *
 * @param {String} buttonId
 */
async function checkUpdateApp(buttonId) {
    let res = await commandsGET('apps list updates')
    const button = document.getElementById(buttonId);
    if (res.includes("name")) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
}


/**
 * Render a list of currently installed apps.
 *
 * @param {String} tabId
 */
function renderCurrentlyInstalledApp(tabId) {
    let apps = Promise.resolve(getInstalledApps())
    enableAppTitle = '<h4>Installed Apps</h4>'
    apps.then(data => {
      array = data.replace(/(\r\n|\n|\r)/gm, "<br> <br>")
      array1 = array.replace(/Finished/g, "")
      array2 = array1.replace(/name: ([^,]+),/g,'<button type="button" class="btn btn-warning" onclick="disableApp((&quot;$1&quot))" >Disable App</button> <a href="https://apps.cytoscape.org/apps/$1">$1</a>');
      array3 = array2.replace(/version/g, "Current Version")
      array4 = array3.replace(/, status/g, " Status")
      array5 = enableAppTitle.concat(array4);
      document.getElementById(tabId).innerHTML = array5;
    });
}


function renderDisabledApp(tabId) {
    let disabledApps = Promise.resolve(getDisabledApps())
    disableAppTitle = '<h4>Disabled Apps</h4>'
    disabledApps.then(data => {
      array = data.replace(/(\r\n|\n|\r)/gm, "<br> <br>")
      array1 = array.replace(/Finished/g, "")
      array2 = array1.replace(/name: ([^,]+),/g,'<button type="button" class="btn btn-success" onclick="enableApp((&quot;$1&quot))" >Enable App</button> <a href="https://apps.cytoscape.org/apps/$1">$1</a>');
      array3 = array2.replace(/version/g, "Current Version")
      array4 = array3.replace(/, status/g, " Status")
      array5 = disableAppTitle.concat(array4);
      document.getElementById(tabId).innerHTML = array5;
    });
}


function renderAllAvailableApps (tabId) {
    let apps = Promise.resolve(getAvailableApps())
    allAppTitle = '<h4>All Available Apps</h4>'
    apps.then(data => {
      array = data.replace(/(\r\n|\n|\r)/gm, "<br>")
      array1 = array.replace(/Finished/g, "")
      array2 = array1.replace(/name: ([^,]+),/g,'<a href="https://apps.cytoscape.org/apps/$1">$1</a>');
      array3 = array2.replace(/version/g, " Latest Version")
      array4 = allAppTitle.concat(array3);
      document.getElementById(tabId).innerHTML = array4;
    });
}


function renderAllAppUpdates(tabId) {
    let apps = Promise.resolve(getAppUpdates())
    updateAppTitle = '<h4>Update Available Apps</h4>'
    apps.then(data => {
      array = data.replace(/(\r\n|\n|\r)/gm, "<br> <br>")
      array1 = array.replace(/Finished/g, "")
      array2 = array1.replace(/name: ([^,]+),/g,'<button type="button" class="btn btn-warning">Update</button> <a href="https://apps.cytoscape.org/apps/$1">$1</a>');
      array3 = array2.replace(/ current version/g, " Current Version")
      array4 = array3.replace(/, new version/g, " New Version")
      array5 = updateAppTitle.concat(array4);
      document.getElementById(tabId).innerHTML = array5;
    });
}
