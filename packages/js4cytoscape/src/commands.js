// I. CyREST API functions
async function cyrestGET(operation = '', parameters = '', baseUrl = defaultBaseUrl) {
    let qurl = baseUrl.concat('/', operation);
    if (parameters != '') {
        const qparameters = parameters;
        qurl = qurl.concat('?', qparameters);
    }
    const res = await fetch(qurl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const json = await res.json();
      return json;
}


async function cyrestDELETE(operation = '', parameters = '', baseUrl = defaultBaseUrl) {
    let qurl = baseUrl.concat('/', operation);
    if (parameters != '') {
        const qparameters = parameters;
        qurl = qurl.concat('?', qparameters);
    }
    const res = await fetch(qurl, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const json = await res.text();
      return json;
}


async function cyrestPOST(operation = '', parameters = '', body = {}, baseUrl = defaultBaseUrl) {
    let qurl = baseUrl.concat('/', operation);
    if (parameters != '') {
        const qparameters = parameters;
        qurl = qurl.concat('?', qparameters);
    }
    const qbody = JSON.stringify(body)
    const res = await fetch(qurl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: qbody
      });
      const json = await res.json();
      return json;
}


async function cyrestPUT(operation = '', parameters = '', body = {}, baseUrl = defaultBaseUrl) {
    let qurl = baseUrl.concat('/', operation);
    if (parameters != '') {
        const qparameters = parameters;
        qurl = qurl.concat('?', qparameters);
    }
    const qbody = JSON.stringify(body)
    const res = await fetch(qurl, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: qbody
      });
      const json = await res.json();
      return json;
}


// II. Commands API functions
async function commandsGET(cmdString, baseUrl = defaultBaseUrl) {
  const qurl = command2getQuery(cmdString, baseUrl)
  const res = await fetch(qurl, {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'text/plain'
      }
    });
    const json = await res.json();
    return json;
}


function command2getQuery(cmdString, baseUrl = defaultBaseUrl){
    let pattern =  /\ [A-Za-z0-9_-]*=/g;
    let cmdMarkParams = cmdString.replace(pattern, "XXXXXX$&");
    let splitCmd = cmdMarkParams.split("XXXXXX");
    let cyCmd = splitCmd[0];
    let tempString = cyCmd.replace(" ", "/");
    let commandUrl = baseUrl.concat('/commands/')
    let url = encodeURI(commandUrl.concat(tempString));
    let args = (splitCmd.slice(1)).join(' ');
    let argDict = null;
    if (!(args === undefined || args.length == 0)) {
        let tempArgs = args.replace(/['"]+/g, '');
        console.log(tempArgs);
    } else {
        argDict = null;
    }
    return args;
}
