async function getNetworkViews(network = null, baseUrl = defaultBaseUrl){
      let netSuid = await getNetworkSuid(network, baseUrl);
      let cmd = "networks/" + netSuid + "/views";
      let res = cyrestGET(cmd, baseUrl);
      let printOut = res.then((data) => { console.log("Network views suid: " + data) });
      return res;
}


async function getNetworkViesSuid(network = null, baseUrl = defaultBaseUrl){
      let netSuid = await getNetworkSuid(network, baseUrl);
      let anyViews = await getNetworkViews(netSuid, baseUrl);
      return anyViews;
}
