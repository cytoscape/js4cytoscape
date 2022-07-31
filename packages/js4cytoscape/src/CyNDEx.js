/**
 * Import a network from NDEx
 *
 * @param {*} [serverUrl=serverUrl]
 * @param {*} uuid
 * @param {*} username
 * @param {*} password
 * @return {*} 
 */
async function importNetworkFromNDEx(serverUrl=serverUrl, uuid, username, password) {
    const cyRESTParams = {
        serverUrl: serverUrl,
        uuid: uuid,
        username: username,
        password: password
      }
    const importNetworkUrl = CYREST_BASE_URL + '/cyndex2/v1/networks'
    console.log('Calling CyREST POST:', importNetworkUrl)
    const response = await fetch(importNetworkUrl, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(cyRESTParams)
      });
    const json = await response.json();
    console.log('Response JSON: ' + JSON.stringify(json))
    const suid = json.data.suid;
    console.log('network SUID: ' + suid);
    return suid;
}


/**
 * Export a network to NDEx
 *
 * @param {*} [serverUrl=serverUrl]
 * @param {*} username
 * @param {*} password
 * @param {*} isPublic
 * @param {string} [network='current']
 * @param {*} [metadata=null]
 * @return {*} 
 */
async function exportNetworkToNDEx(serverUrl=serverUrl, username, password, isPublic, network='current', metadata=null) {
    const cyRESTParams = {
        serverUrl: serverUrl,
        username: username,
        password: password,
        metadata: metadata,
        isPublic: isPublic
      }
    let networkSuid = await getNetworkSuid(network=network);
    console.log(networkSuid);
    const exportNetworkUrl = CYREST_BASE_URL + '/cyndex2/v1/networks/' + networkSuid;
    console.log('Calling CyREST POST:', exportNetworkUrl)
    const response = await fetch(exportNetworkUrl, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(cyRESTParams)
      });
    const json = await response.json();
    console.log('Response JSON: ' + JSON.stringify(json))
    const suid = json.data.suid;
    console.log('network SUID: ' + suid);
    return suid;
}
