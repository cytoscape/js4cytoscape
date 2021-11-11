const {NDEx} = require('../src/');
let ndex0 = new NDEx('http://dev.ndexbio.org/v2');

ndex0.getStatus().then(function (r) {
  console.log(r.message);},
  (err) => {console.log(err); });

