// I. CyREST API functions
/**
 * Send GET request to CyREST.
 *
 * @param {string} [operation='']
 * @param {string} [parameters='']
 * @return {string} JSON 
 */
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

/**
 * Send DELETE request to CyREST.
 *
 * @param {string} [operation='']
 * @param {string} [parameters='']
 * @return {string} JSON 
 */
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


/**
 * Send POST request to CyREST.
 *
 * @param {string} [operation='']
 * @param {string} [parameters='']
 * @param {*} [body={}]
 * @return {*} 
 */
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

/**
 * Send PUT request to CyREST.
 *
 * @param {string} [operation='']
 * @param {string} [parameters='']
 * @param {*} [body={}]
 * @return {*} 
 */
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
/**
 * Send GET request to CyREST Commands API
 *
 * @param {*} cmdString
 * @return {*} 
 */
async function commandsGET(cmdString, baseUrl = defaultBaseUrl) {
  const qurl = command2getQuery(cmdString, baseUrl)
  const res = await fetch(qurl, {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'text/plain'
      }
    });
    const json = await res.text();
    return json;
}

/**
 * Send POST request to CyREST Commands API
 *
 * @param {*} cmdString
 * @return {*} 
 */
async function commandsPOST(cmdString, baseUrl = defaultBaseUrl) {
  const qurl = command2postQueryUrl(cmdString, baseUrl);
  let qbody = command2postQueryBody(cmdString);
  qbody = JSON.stringify(qbody);
  const res = await fetch(qurl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: qbody
  });
    const json = await res.text();
    return json;
}


/**
 * Process command string to correct syntax for commandsGET
 *
 * @param {*} cmdString
 * @return {*} 
 */
function command2getQuery(cmdString, baseUrl = defaultBaseUrl){
    let pattern =  /\ [A-Za-z0-9_-]*=/g;
    let cmdMarkParams = cmdString.replace(pattern, "XXXXXX$&");
    let splitCmd = cmdMarkParams.split("XXXXXX");
    let cyCmd = splitCmd[0];
    let tempString = cyCmd.replace(" ", "/");
    let commandUrl = baseUrl.concat('/commands/')
    let url = encodeURI(commandUrl.concat(tempString));
    let args = (splitCmd.slice(1)).join(' ');
    let qargs = "";
    let keyList = [];
    let valueList = [];
    if (!(args === undefined || args.length == 0)) {
        args = args.replace(/['"]+/g, '');
        const re1 = /[A-Za-z0-9_-]+=/g;
        keyList = args.match(re1);
        keyList = keyList.map(function(x){ return x.replace(/=/g,"") });
        const re2 = /\ *[A-Za-z0-9_-]+=/g;
        valueList = args.split(re2).slice(1);
        qargs = keyList[0] + "=" + encodeURI(valueList[0]);
        for (var i = 1; i < keyList.length; i++){
          let tempArgs = keyList[i] + "=" + encodeURI(valueList[i]);
          qargs = qargs + "&" + tempArgs;
        }
        return url + "?" + qargs;
    } else {
        return url;
    }
}

/**
 * Process command string to correct syntax for URL in commandsPOST
 *
 * @param {*} cmdString
 * @return {*} 
 */
function command2postQueryUrl(cmdString, baseUrl = defaultBaseUrl){
    let pattern =  /\ [A-Za-z0-9_-]*=/g;
    let cmdMarkParams = cmdString.replace(pattern, "XXXXXX$&");
    let splitCmd = cmdMarkParams.split("XXXXXX");
    let cyCmd = splitCmd[0];
    let tempString = cyCmd.replace(" ", "/");
    let commandUrl = baseUrl.concat('/commands/')
    let urlPost = encodeURI(commandUrl.concat(tempString));
    return urlPost;
}

/**
 * Process command string to correct syntax for Body in commandsPOST
 *
 * @param {*} cmdString
 * @return {*} 
 */
function command2postQueryBody(cmdString){
    let pattern =  /\ [A-Za-z0-9_-]*=/g;
    let cmdMarkParams = cmdString.replace(pattern, "XXXXXX$&");
    let splitCmd = cmdMarkParams.split("XXXXXX");
    let args = (splitCmd.slice(1)).join(' ');
    let qargs = {};
    let keyList = [];
    let valueList = [];
    if (!(args === undefined || args.length == 0)) {
        args = args.replace(/['"]+/g, '');
        const re1 = /[A-Za-z0-9_-]+=/g;
        keyList = args.match(re1);
        keyList = keyList.map(function(x){ return x.replace(/=/g,"") });
        const re2 = /\ *[A-Za-z0-9_-]+=/g;
        valueList = args.split(re2).slice(1);
        keyList.forEach((key, i) => qargs[key] = valueList[i]);
        return qargs;
    } else {
        qargs = {'atLeastOneArg':'required'};
        return qargs;
    }
}
