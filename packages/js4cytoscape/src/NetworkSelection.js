/**
 * Delete selected edges from network.
 *
 * @param {*} [network=null]
 */
async function deleteSelectedEdges(network = null, baseUrl = defaultBaseUrl){
    let suid = await getNetworkSuid(network, baseUrl);
    let cmd = 'network delete edgeList=selected network=SUID:' + suid + '"';
    let res = commandsPOST(cmd, baseUrl=baseUrl);
}
