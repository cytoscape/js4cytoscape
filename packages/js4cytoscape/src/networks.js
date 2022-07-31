/**
 * Set the current network the Cytoscape session.
 *
 * @param {*} [network=null]
 */
async function setCurrentNetwork(network = null, baseUrl = defaultBaseUrl){
    let suid = await getNetworkSuid(network, baseUrl);
    let cmd = 'network set current network=SUID:"' + suid + '"';
    let res = commandsPOST(cmd, baseUrl=baseUrl);
}


/**
 * Rename a network.
 *
 * @param {*} title
 * @param {*} [network=null]
 */
async function renameNetwork(title, network = null, baseUrl = defaultBaseUrl){
    let oldSuid = await getNetworkSuid(network, baseUrl);
    let cmd = 'network rename name="' + title + '" sourceNetwork=SUID:"' + oldSuid +'""';
    let res = commandsPOST(cmd, baseUrl);
}


/**
 * Count the networks in the Cytoscape session.
 *
 * @return {*} Number of networks
 */
async function getNetworkCount(baseUrl = defaultBaseUrl){
    let cmd = cyrestGET('networks/count', baseUrl);
    let res = cmd.then(data => { console.log(data['count']) });
    res = cmd.then(data => { return data['count'] });
    return res;
}

/**
 * Delete a network from Cytoscape session.
 *
 * @param {*} [network=null]
 */
async function deleteNetwork(network = null, baseUrl = defaultBaseUrl) {
    let suid = await getNetworkSuid(network, baseUrl)
    let res = cyrestDELETE('networks/' + suid, baseUrl = baseUrl);
    console.log("Selected network is deleted.")
}

/**
 * Delete all networks from Cytoscape session.
 *
 */
async function deleteAllNetworks(baseUrl = defaultBaseUrl) {
    let res = cyrestDELETE('networks', baseUrl = baseUrl);
    console.log("All networks are deleted.")
}


/**
 * Get the SUID for a network by title.
 *
 * @param {*} [title=null]
 * @param {*} [baseUrl=defaultBaseUrl]
 * @return {*} 
 */
async function getNetworkSuid(title = null, baseUrl = defaultBaseUrl){
      let networkTitle;
      if (typeof title === 'string' || title instanceof String){
        if (title == "current"){
          networkTitle = title;
        } else {
          let netNames = await getNetworkList(baseUrl=baseUrl);
          if (netNames.includes(title)){
            networkTitle = title;
          } else {
            console.log("Network does not exist: " + title);
          }
        }
      } else if (typeof title === 'number'){
          let netSuids = await cyrestGET('networks', baseUrl=baseUrl);
          if (netSuids.includes(title)){
            console.log(title);
            return title;
          } else {
            console.log("Network does not exist: " + title);
          }
      } else {
        networkTitle = "current";
      }
      let cmd = 'network get attribute network="' + networkTitle + '" namespace="default" columnList="SUID"';
      let suid = commandsPOST(cmd, baseUrl=baseUrl);
      let res = suid.then((data) => { console.log("Network suid: " + JSON.parse(data)['data'][0]['SUID']) });
      res = suid.then((data) => { return JSON.parse(data)['data'][0]['SUID'] });
      return res;
}

/**
 * Retrieve the list of networks in Cytoscape session.
 *
 * @return {*} 
 */
async function getNetworkList(baseUrl = defaultBaseUrl){
      let count = await getNetworkCount(baseUrl);
      if(count == 0) {
          console.log([]);
          return [];
      }
      let cynetworksSUIDs = await cyrestGET('networks', baseUrl = baseUrl);
      let cynetworksnames = [];
      for (const cynetworksSUID of cynetworksSUIDs){
          let res = await cyrestGET(("networks/" + cynetworksSUID.toString()));
          let netname = res['data']['name'];
          cynetworksnames.push(netname);
      }
      console.log(cynetworksnames);
      return cynetworksnames;
}
