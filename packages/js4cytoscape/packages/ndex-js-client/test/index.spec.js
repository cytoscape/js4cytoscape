/* global describe, it, before */

// import chai from 'chai';
const {expect } = require('chai');
// import chai from 'chai';
const {NDEx} = require('../lib/ndex-client.js');

// chai.expect();
// const expect = chai.expect;
// chai.assert();
// const assert = chai.assert;

// const assert = chai.assert;

// let lib;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function errorPrinter(err) {
  console.log(err);
}

describe('testing client', () => {
  /*
  it('get status on non-exist server', () => {
    let ndex0 = new NDEx('http://dev11.ndexbio.org/v2');

    return ndex0.getStatus().then(function (r) {
      expect(r.message).to.equal('Online');
    },
    (err) => {
      expect(err.response).to.be.undefined;
      expect(err.message).to.equal('Network Error');
    });
  });
  */

  // test all the open functions in this section.
  it('get status', () => {

    let ndex0 = new NDEx('http://dev.ndexbio.org/v2');

    // this should raise an error if uncommented.
    // let user = ndex0.getSignedInUser();

    // console.log(user);

    return ndex0.getStatus().then(function (r) {
      expect(r.message).to.equal('Online');
    }, (err) => {console.log(err); expect(err.message).to.equal('');});
  });

  // test all the autheticated functions here.
  let ndex = new NDEx('http://dev.ndexbio.org/v2');

  ndex.setBasicAuth('cj1', 'aaaaaaaaa');

  it('get signed in user', () => {
    return ndex.getSignedInUser().then((user) => {
      // console.log(user);
      expect(user.userName).to.equal('cj1');
      expect(user.externalId).to.equal('08c4b530-e89c-11e6-b7e1-06832d634f41');
    }, (err) => {
      console.log('error.....');
      return console.log(err);
    });
  });

  it('get user obj', ()=>{
    return ndex.getUser('f60c0d3b-aa96-11e6-9c4b-06832d634f41')
      .then((user)=>{
        expect(user.firstName).to.equal('fooooo');
        expect(user.lastName).to.equal('barrrr');
        expect(user.userName).to.equal('cj22');
      });
  });

  it('get account page networks', () => {
    ndex.getAccountPageNetworks(0, 11).then((networkList) => {
      // console.log(networkList);
      expect(networkList.length).to.equal(11);
      // expect(user.externalId).to.equal('08c4b530-e89c-11e6-b7e1-06832d634f41');
    }, (err) => {
      console.log('error.....');
      return console.log(err);
    });

    return ndex.getAccountPageNetworksByUUID('08c4b530-e89c-11e6-b7e1-06832d634f41', 0, 11).then((networkList) => {
      // console.log(networkList);
      expect(networkList.length).to.equal(11);
      // expect(user.externalId).to.equal('08c4b530-e89c-11e6-b7e1-06832d634f41');
    }, (err) => {
      console.log('error.....');
      return console.log(err);
    });
  });

  it('group CRUD operations', () => {
    return ndex.createGroup({
      'groupName': 'Melanoma Group 1',
      'image': 'http://example.com/image/group1.jpg',
      'website': 'http://www.ucsd.edu',
      'description': 'description of group 1 is missing.'
    }).then((groupid) => {
      // console.log(networkList);
      expect(groupid.length).to.equal(36);

      ndex.getGroup(groupid).then((groupObj)=>{
        expect(groupObj.groupName).to.equal('Melanoma Group 1');

        groupObj.description = 'This group is for testing only.';
        ndex.updateGroup(groupObj).then((response) =>{
          expect(response).to.equal('');
          ndex.getGroup(groupid)
            .then((newgroup) =>{
              // console.log(newgroup);
              expect(newgroup.description).to.equal('This group is for testing only.');
              ndex.deleteGroup(groupid).then((foo) => {
                expect(foo).to.equal('');
              });
            });
        });
      });

    }, (err) => {
      console.log('error.....');
      return console.log(err);
    });
  });

  it('get signed in user with wrong password', () => {
    let ndex0 = new NDEx('http://dev.ndexbio.org/v2');

    ndex0.setBasicAuth('cj1', 'foo');
    return ndex0.getSignedInUser().then((user) => {
      expect(user.userName).to.equal('cj1');
      expect(user.externalId).to.equal('08c4b530-e89c-11e6-b7e1-06832d634f41');
    }, (err) => {
      expect(err.response.data.message).to.equal('Invalid password for user cj1.');
      expect(err.response.status).to.equal(401);
    });
  });

});

describe('Anonymous test', () =>{
  let ndex = new NDEx('http://dev.ndexbio.org/v2');

  it('get public network', ()=> {
    return ndex.getRawNetwork('2015e494-1f11-11e7-8156-06832d634f41')
      .then((network) => {
        expect(network[10].nodes.length).to.equal(5);
        expect(network[7].edges.length).to.equal(8);
        expect(network[8].networkAttributes.length).to.equal(4);
        expect(network[9].nodeAttributes.length).to.equal(9);
      });
  });

  it('get private network through accessKey', ()=> {
    return ndex.getRawNetwork('9025e42a-9e3f-11e7-8676-06832d634f41',
      'a93fa15fae6a6c087ec1e2b562deaac930c083ea4cb110110247f5e40f88d46a')
      .then((network) => {
        expect(network[4].nodes.length).to.equal(3);
        expect(network[5].edges.length).to.equal(3);
        expect(network[8].cartesianLayout.length).to.equal(3);
        expect(network[10].status.length).to.equal(1);
      });
  });
});

describe('Authticated network test', () =>{
  let ndexclient = new NDEx('http://dev.ndexbio.org/v2');

  ndexclient.setBasicAuth('cj1', 'aaaaaaaaa');

  it('get private network', ()=> {
    return ndexclient.getRawNetwork('2977ee7f-1d34-11e7-8145-06832d634f41')
      .then((network) => {
        expect(network[12].nodes.length).to.equal(37);
        expect(network[9].edges.length).to.equal(37);
        expect(network[11].networkAttributes.length).to.equal(8);
        expect(network[5].citations.length).to.equal(1);
        expect(network[14].supports.length).to.equal(15);

      });
  });

  it('create private network', ()=> {
    return ndexclient.getRawNetwork('2977ee7f-1d34-11e7-8145-06832d634f41')
      .then((network) => {
        network.splice(0, 1);
        network.splice(1, 2);

        ndexclient.createNetworkFromRawCX(network).then(
          (networkId) =>{
            sleep(3000).then(()=>{
              ndexclient.getRawNetwork(networkId)
                .then((newNet)=>{
                  expect(newNet[7].edges.length).to.equal(37);
                  newNet[9].networkAttributes[0] = {n: 'name', v: 'my updated network'};
                  ndexclient.updateNetworkFromRawCX(networkId, newNet)
                    .then((res)=> {
                      sleep(3000).then(()=>{
                        return ndexclient.getRawNetwork(networkId)
                          .then((updatedNet)=>{
                            expect(updatedNet[7].edges.length).to.equal(37);
                            expect(updatedNet[9].networkAttributes[0].v).to.equal('my updated network');

                            ndexclient.deleteNetwork(networkId).then(
                              (response) => {
                                expect(response).to.equal('');
                              }, errorPrinter
                            );

                          }, errorPrinter);
                      });
                    }, errorPrinter);
                }, errorPrinter);
            });
          }, errorPrinter);

      });
  });

});
