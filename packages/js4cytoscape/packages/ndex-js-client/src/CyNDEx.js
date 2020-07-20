const CY_REST_BASE_URL = 'http://127.0.0.1';

const axios = require('axios');

class CyNDEx {
    
    constructor(port = 1234) {
      this._port = port;
    }
    get port() { return this._port;}

    static get cyRestBaseURL() {
        return CY_REST_BASE_URL;
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
            (response) =>{return reject(response);}
            );
          });
    }

    getStatus() {
        return this._httpGet('/cyndex2/v1');
    }
  
    

    /* network set functions */
  
    /* undocumented functions. Might be changed ... */
  
  }

  module.exports = { CyNDEx };
