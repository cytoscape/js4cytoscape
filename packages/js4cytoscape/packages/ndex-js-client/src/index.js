const axios = require('axios');

export class NDEx {
  constructor(hostprefix) {
    if (hostprefix === undefined || hostprefix === null || hostprefix === '') {
      throw new Error('NDEx server endpoint base URL is required in client constructor.');
    }

    this._host = hostprefix;
  }
  get host() { return this._host;}

  get googleAuth() {
    return this._googleAuth;
  }

  set googleAuth(googleAuthObj) {
    this._googleAuth = googleAuthObj;
    this._authType = 'g'; // valid values are 'g','b' or undefined
  }

  get authenticationType() {
    return this._authType;
  }

  get username() {
    return this._username;
  }

  // get authStr() { return this._authStr;}
  get password() { return this._password;}

  setBasicAuth(accountname, password) {
    if (accountname !== undefined && accountname != null && accountname !== '') {
      this._username = accountname;
      this._password = password;
      this._authType = 'b';
      // this._authStr = 'Basic ' + btoa(username + ':' + password);
      return;
    }
    this._username = undefined;
    this._password = undefined;
    this._authType = undefined;
    // this._authStr = undefined;
  }

  _httpGetOpenObj(URL) {
    let APIEndPointPrefix = this.host ;

    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: URL,
        baseURL: APIEndPointPrefix
      }).then((response) => {
        if (response.status === 200) {
          return resolve(response.data);
        }
        return reject(response);
      },
      (response) =>{return reject(response);}
      );
    });
  }

  // access endpoints that supports authentication

  _httpGetProtectedObj(URL, parameters) {

    let config = {
      method: 'get',
      url: URL,
      baseURL: this.host
    };

    if (this._authType === 'b') {
      config ['auth'] = { username: this.username,
        password: this.password};
    }

    if (parameters !== undefined) {
      config['params'] = parameters;
    }
    return new Promise(function (resolve, reject) {
      axios(config).then((response) => {
        if (response.status === 200) {
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

  _httpPostProtectedObj(URL, parameters, data) {
    let config = {
      method: 'post',
      url: URL,
      baseURL: this.host
    };

    if (this._authType === 'b') {
      config ['auth'] = { username: this.username,
        password: this.password};
    }

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

  _httpPutObj(URL, parameters, data) {
    let config = {
      method: 'put',
      url: URL,
      baseURL: this.host
    };

    if (this._authType === 'b') {
      config ['auth'] = { username: this.username,
        password: this.password};
    }

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
  _httpDeleteObj(URL, parameters) {
    let config = {
      method: 'delete',
      url: URL,
      baseURL: this.host
    };

    if (this._authType === 'b') {
      config ['auth'] = { username: this.username,
        password: this.password};
    }

    if (parameters !== undefined) {
      config['params'] = parameters;
    }

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

  getStatus() {
    return this._httpGetOpenObj('admin/status');
  }

  /* user functions */

  getSignedInUser() {
    if (this._authType == null) {
      throw new Error('Authentication parameters are missing in NDEx client.');
    }
    return this._httpGetProtectedObj('user', {valid: true});
  }

  getUser(uuid) {
    return this._httpGetProtectedObj('user/' + uuid);
  }

  getAccountPageNetworks(offset, limit) {
    return new Promise((resolve, reject) => {
      this.getSignedInUser().then((user) => {
        let params = {};

        if (offset !== undefined) {
          params.offset = offset;
        }
        if (limit !== undefined) {
          params.limit = limit;
        }
        this._httpGetProtectedObj('/user/' + user.externalId + '/networksummary', params).then(
          (networkArray) => {resolve(networkArray);}, (err) => {reject(err);}
        );
      }, (err) => {reject(err);});

    });
  }

  getAccountPageNetworksByUUID(uuid, offset, limit) {
    let params = {};

    if (offset !== undefined) {
      params.offset = offset;
    }
    if (limit !== undefined) {
      params.limit = limit;
    }
    return this._httpGetProtectedObj('user/' + uuid + '/networksummary', params);
  }

  /* group functions */

  // return the UUID of the created group to the resolver
  createGroup(group) {
    return new Promise((resolve, reject)=> {
      this._httpPostProtectedObj('group', undefined, group).then(
        (response) => {
          let uuidr = response.split('/');
          let uuid = uuidr[uuidr.length - 1];

          return resolve(uuid);
        },
        (err) => {reject(err);}
      );
    });
  }

  getGroup(uuid) {
    return this._httpGetProtectedObj('group/' + uuid);
  }

  updateGroup(group) {
    return new Promise((resolve, reject)=> {
      this._httpPutObj('group/' + group.externalId, undefined, group).then(
        (response) => {
          return resolve(response);
        },
        (err) => {reject(err);}
      );
    });
  }

  deleteGroup(uuid) {
    return this._httpDeleteObj('group/' + uuid);
  }

  /* network functions */

  getRawNetwork(uuid, accessKey) {

    let parameters = {};

    if (accessKey !== undefined) {
      parameters = {accesskey: accessKey};
    }

    return this._httpGetProtectedObj('network/' + uuid, parameters);

  }

  getNetworkSummary(uuid, accessKey) {
    let parameters = {};

    if (accessKey !== undefined) {
      parameters = {accesskey: accessKey};
    }

    return this._httpGetProtectedObj('network/' + uuid + '/summary', parameters);
  }

  createNetworkFromRawCX(rawCX, parameters) {
    return new Promise((resolve, reject) =>{
      this._httpPostProtectedObj('network', parameters, rawCX).then(
        (response) => {
          let uuidr = response.split('/');
          let uuid = uuidr[uuidr.length - 1];

          return resolve(uuid);
        },
        (err) => {reject(err);}
      );
    });
  }

  updateNetworkFromRawCX(uuid, rawcx) {
    return this._httpPutObj('network/' + uuid, undefined, rawcx);
  }

  deleteNetwork(uuid) {
    return this._httpDeleteObj('network/' + uuid);
  }

  /* task functions */

  /* search functions */
  searchUsers(searchTerms, start, size) {
    let params = {};

    if (start !== undefined) {
      params.start = start;
    }
    if (size !== undefined) {
      params.limit = size;
    }
    let data = {searchString: searchTerms};

    return this._httpPostProtectedObj('search/user', params, data);

  }

  searchGroups(searchTerms, start, size) {
    let params = {};

    if (start !== undefined) {
      params.start = start;
    }
    if (size !== undefined) {
      params.limit = size;
    }
    let data = {searchString: searchTerms};

    return this._httpPostProtectedObj('search/group', params, data);

  }

  searchNetworks(searchTerms, start, size, optionalParameters) {
    let params = {};

    if (start !== undefined) {
      params.start = start;
    }
    if (size !== undefined) {
      params.limit = size;
    }

    let data = {searchString: searchTerms};

    if (optionalParameters !== undefined) {
      if (optionalParameters.permission !== undefined) {
        data.permission = optionalParameters.permission;
      }
      if (optionalParameters.includeGroups !== undefined) {
        data.includeGroups = optionalParameters.includeGroups;
      }
      if (optionalParameters.accountName !== undefined) {
        data.accountName = optionalParameters.accountName;
      }
    }

    return this._httpPostProtectedObj('search/network', params, data);
  }

  neighborhoodQuery(uuid, searchTerms, saveResult, parameters) {
    let params = {};

    if (saveResult !== undefined && saveResult === true) {params.save = true;}

    let data = {searchString: searchTerms,
      searchDepth: 1};

    if (parameters !== undefined) {
      if (parameters.searchDepth !== undefined) {
        data.searchDepth = parameters.searchDepth;
      }
      if (parameters.edgeLimit !== undefined) {
        data.edgeLimit = parameters.edgeLimit;
      }
      if (parameters.errorWhenLimitIsOver !== undefined) {
        data.errorWhenLimitIsOver = parameters.errorWhenLimitIsOver;
      }
      if (parameters.directOnly !== undefined) {
        data.directOnly = parameters.directOnly;
      }
    }
    return this._httpPostProtectedObj('search/network/' + uuid + '/query', params, data);

  }

  interConnectQuery(uuid, searchTerms, saveResult, parameters) {
    let params = {};

    if (saveResult !== undefined && saveResult === true) {params.save = true;}

    let data = {searchString: searchTerms};

    if (parameters !== undefined) {
      if (parameters.edgeLimit !== undefined) {
        data.edgeLimit = parameters.edgeLimit;
      }
      if (parameters.errorWhenLimitIsOver !== undefined) {
        data.errorWhenLimitIsOver = parameters.errorWhenLimitIsOver;
      }
    }
    return this._httpPostProtectedObj('search/network/' + uuid + '/interconnectquery', params, data);

  }

  /* batch functions */
  getUsersByUUIDs(uuidList) {
    return this._httpPostProtectedObj('batch/user', undefined, uuidList);
  }

  getGroupsByUUIDs(uuidList) {
    return this._httpPostProtectedObj('batch/group', undefined, uuidList);
  }

  getNetworkSummariesByUUIDs(uuidList, accessKey) {
    let parameter = accessKey === undefined ? undefined :
      {accesskey: accessKey};

    return this._httpPostProtectedObj('batch/network/summary', parameter, uuidList);
  }

  getNetworkPermissionsByUUIDs(uuidList) {
    return this._httpPostProtectedObj('batch/network/permission', undefined, uuidList);
  }

  exportNetworks(exportJob) {
    return this._httpPostProtectedObj('batch/network/export', undefined, exportJob);
  }
  /* network set functions */

}

