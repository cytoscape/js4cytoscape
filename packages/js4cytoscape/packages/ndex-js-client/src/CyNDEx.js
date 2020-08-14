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

  setGoogleAuth(googleAuthObj) {
    if (googleAuthObj !== undefined) {
      this._googleAuth = googleAuthObj;
      this._authType = 'g'; // valid values are 'g','b' or undefined
    }
  }

  setGoogleUser(googleUser) {
    if (googleUser !== undefined ) {
      this._googleUser = googleUser;
      this._authType = 'g'; // valid values are 'g','b' or undefined
    }
  }

  setBasicAuth(username, password) {
    if (username !== undefined && username != null && username !== '') {
      this._username = username;
      this._password = password;
      this._authType = 'b';
    }
  }

  cyRestURL() {
    return CY_REST_BASE_URL + ':' + this._port;
  }

  _getIdToken() {
    const user = this._googleUser ? this._googleUser : this._googleAuth.getAuthInstance().currentUser.get();
    return user.getAuthResponse().id_token;
  }

  _getAuthorizationFields() {
    switch (this._authType) {
      case 'b' : return {
        username : this._username,
        password : this._password
      };
      case 'g' : return {
        idToken : this._getIdToken()
      };
      default : return {};
    }
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
    return this._http('put', url, parameters, data);
  }

  _httpPost(url, parameters, data) {
    return this._http('post', url, parameters, data);
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

  postNDExNetworkToCytoscape(uuid, accessKey) {
    const importParams = {
      serverUrl: this.getNDExServer(),
      uuid: uuid,
      accessKey: accessKey,
    };

    const authorizationFields = this._getAuthorizationFields();

    return this._httpPost('/cyndex2/v1/networks', undefined, Object.assign(importParams, authorizationFields));
  }

  postCXNetworkToCytoscape(cx) {
    return this._httpPost('/cyndex2/v1/networks/cx', undefined, cx);
  }

  postCytoscapeNetworkToNDEx(suid = 'current') {
    const saveParams = {
      serverUrl: this.getNDExServer(),
    };

    const authorizationFields = this._getAuthorizationFields();

    return this._httpPost('/cyndex2/v1/networks/' + suid, undefined, Object.assign(saveParams, authorizationFields));
  }

  putCytoscapeNetworkInNDEx(suid = 'current', uuid) {
    const saveParams = {
      serverUrl: this.getNDExServer(),
      uuid: uuid
    };

    const authorizationFields = this._getAuthorizationFields();

    return this._httpPut('/cyndex2/v1/networks/' + suid, undefined, Object.assign(saveParams, authorizationFields));
  }
}

module.exports = { CyNDEx };
