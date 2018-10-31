const {NDEx} = require('../lib/ndex-client.js');

let ndex = new NDEx();

ndex.setBasicAuth('cj1', 'aaaaaaaaa');
ndex.getSignedInUser().then((user) => {
  console.log(user);
  return;
});
