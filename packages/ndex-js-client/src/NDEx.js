const axios = require('axios');

export default class NDEx {
  constructor() {
    /* if (x.host != null) {
      this._host = x.host;
    }
    if (x.googleAuth != null) {
      this._authType = 'g'; // g for google
      this._googleAuth = x.googleAuth;
    } else if (x.username != null) {
      this._authType = 'b'; // b for basic auth
      this._username = x.username;
      this._password = x.password;
    } else { */
    // }
  }

  set host(hostURLPrefix) {
    this._host = hostURLPrefix;
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

  get authStr() { return this._authStr;}
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
    this._authStr = undefined;
  }

  _httpGetOpenObj(URL) {
    let APIEndPointPrefix = this.host ;

    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: URL,
        baseURL: APIEndPointPrefix
        /* headers: {'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*'} */
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

  _httpGetProtectedObj(URL) {
    let APIEndPointPrefix = this.host ;

    let config = {
      method: 'get',
      url: URL,
      baseURL: APIEndPointPrefix,
      withCredentials: true
    };

    let u = this.username;

    if (this._authType === 'b') {
      config ['auth'] = { username: u,
        password: this.password};
    }

    return new Promise(function (resolve, reject) {
      axios(config).then((response) => {
        if (response.status === 200) {
          return resolve(response.data);
        }
        console.log(response);
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

  getSignedInUser() {
    if (this._authType == null) {
      return new Promise(function (resolve, reject) {
        return resolve(null);
      });
    }
    return this._httpGetProtectedObj('user?valid=true');
  }

}

// local test
/*
let ndex = new NDEx();

ndex.host = 'http://dev.ndexbio.org/v2';

ndex.setBasicAuth('cj1', 'aaaaaaaaa');

ndex.getSignedInUser().then((user) => {
  console.log(user);
  expect(user.username).to.equal('cj1');
}, (err) => {
  console.log(err);
});
*/
