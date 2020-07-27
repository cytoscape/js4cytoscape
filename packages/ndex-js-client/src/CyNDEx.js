const CY_REST_BASE_URL = 'http://127.0.0.1';

const axios = require('axios');

class CyNDEx {

  constructor(port = 1234) {
    this._port = port;
  }
  get port() { return this._port; }

  static get cyRestBaseURL() {
    return CY_REST_BASE_URL;
  }

  setNDExServer(ndexServer) {
    if (ndexServer !== undefined && ndexServer != null && ndexServer !== '') {
      this._ndexServer = ndexServer;
    }
  }

  getNDExServer() {
    return this._ndexServer ? this._ndexServer : 'http://public.ndexbio.org/v2';
  }

  setBasicAuth(username, password) {
    if (username !== undefined && username != null && username !== '') {
      this._username = username;
      this._password = password;
    }
  }

  cyRestURL() {
    return CY_REST_BASE_URL + ':' + this._port;
  }

  _httpGet(url) {

    const baseURL = this.cyRestURL();

    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: url,
        baseURL: baseURL
      }).then((response) => {
        if (response.status === 200) {
          return resolve(response.data);
        }
        return reject(response);
      },
        (response) => { return reject(response); }
      );
    });
  }

  _httpPut(url, parameters, data) {
    return this._http('put', url, parameters, data)
  }

  _httpPost(url, parameters, data) {
    return this._http('post', url, parameters, data)
  }

  _http(method, url, parameters, data) {

    const baseURL = this.cyRestURL();

    let config = {
      method: method,
      url: url,
      baseURL: baseURL
    };

    if (parameters !== undefined) {
      config['params'] = parameters;
    }

    config.data = data;
    return new Promise(function (resolve, reject) {
      axios(config).then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return resolve(response.data);
        }
        return reject(response);
      },
        (response) => {
          return reject(response);
        }
      );
    });

  }

  getCyNDExStatus() {
    return this._httpGet('/cyndex2/v1');
  }

  getCytoscapeNetworkSummary(suid = 'current') {
    return this._httpGet('/cyndex2/v1/networks/' + suid);
  }

  postNDExNetworkInCytoscape(uuid, accessKey, idToken) {
    const importParams = {
      serverUrl: this.getNDExServer(),
      uuid: uuid,
      username: accessKey || idToken ? undefined : this._username,
      password: accessKey || idToken ? undefined : this._password,
      accessKey: accessKey,
      idToken: idToken
    }

    return this._httpPost('/cyndex2/v1/networks', undefined, importParams);
  }

  postCXNetworkToCytoscape(cx) {
    return this._httpPost('/cyndex2/v1/networks/cx', undefined, cx);
  }

  postCytoscapeNetworkToNDEx(suid = 'current') {
    const saveParams = {
      serverUrl: this.getNDExServer(),
      username: this._username,
      password: this._password
    }

    return this._httpPost('/cyndex2/v1/networks/' + suid, undefined, saveParams);
  }

  putCytoscapeNetworkInNDEx(suid = 'current', uuid) {
    const saveParams = {
      serverUrl: this.getNDExServer(),
      //uuid: uuid,
      username: this._username,
      password: this._password
    }

    return this._httpPut('/cyndex2/v1/networks/' + suid, undefined, saveParams);
  }
  /* network set functions */

  /* undocumented functions. Might be changed ... */

}

module.exports = { CyNDEx };
