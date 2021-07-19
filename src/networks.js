async function setCurrentNetwork(network = null, baseUrl = defaultBaseUrl){
    let suid = await getNetworkSuid(network, baseUrl);
    let cmd = 'network set current network=SUID:"' + suid + '"';
    let res = commandsPOST(cmd, baseUrl=baseUrl);
}


async function renameNetwork(title, network = null, baseUrl = defaultBaseUrl){
    let oldSuid = await getNetworkSuid(network, baseUrl);
    let cmd = 'network rename name="' + title + '" sourceNetwork=SUID:"' + oldSuid +'""';
    let res = commandsPOST(cmd, baseUrl);
}


async function getNetworkCount(baseUrl = defaultBaseUrl){
    let cmd = cyrestGET('networks/count', baseUrl);
    let res = cmd.then(data => { console.log(data['count']) });
    res = cmd.then(data => { return data['count'] });
    return res;
}


async function deleteAllNetworks(baseUrl = defaultBaseUrl) {
    let res = cyrestDELETE('networks', baseUrl = baseUrl);
    console.log("All networks are deleted.")
}


async function getNetworkSuid(title = "current", baseUrl = defaultBaseUrl){
      let cmd = 'network get attribute network="' + title + '" namespace="default" columnList="SUID"';
      let suid = commandsPOST(cmd, baseUrl=baseUrl);
      let res = suid.then((data) => { console.log("Network suid: " + JSON.parse(data)['data'][0]['SUID']) });
      res = suid.then((data) => { return JSON.parse(data)['data'][0]['SUID'] });
      return res;
}
