async function layoutNetwork(layoutName = null, network = null, baseUrl = defaultBaseUrl){
    let suid = await getNetworkSuid(network, baseUrl);
    if (layoutName === null) {
      let cmd = 'layout apply preferred networkSelected="SUID:' + suid + '"';
      let res = commandsPOST(cmd, baseUrl=baseUrl);
    } else {
      let cmd = 'layout' + layoutName + 'network="SUID:' + suid + '"';
      let res = commandsPOST(cmd, baseUrl=baseUrl);
  }
}


async function getLayoutNames(baseUrl = defaultBaseUrl){
    let res = await cyrestGET("apply/layouts", baseUrl);
    console.log(res);
    return res;
}
