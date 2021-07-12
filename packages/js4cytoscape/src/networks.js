async function deleteAllNetworks(baseUrl = defaultBaseUrl) {
    let res = cyrestDELETE('networks', baseUrl = baseUrl);
    console.log("All networks are deleted.")
}


async function getNetworkSuid(title = "current", baseUrl = defaultBaseUrl){
      let cmd = 'network get attribute network="' + title + '" namespace="default" columnList="SUID"';
      let suid = commandsPOST(cmd, baseUrl=baseUrl);
      let res = suid.then(data => { console.log('Suid: ' + JSON.parse(data)['data'][0]['SUID']) });
}
