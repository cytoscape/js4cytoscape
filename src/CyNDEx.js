async function importNetworkFromNDEX(serverUrl=serverUrl, uuid, username, password) {
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


async function exportNetworkToNDEx(serverUrl=serverUrl, username, password, isPublic, network='current', metadata=null) {
    const cyRESTParams = {
        serverUrl: serverUrl,
        username: username,
        password: password,
        metadata: metadata,
        isPublic: isPublic
      }
    let networkSuid = getNetworkSuid(network=network);
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
