/* global describe, it, before */

const {expect } = require('chai');
const {NDEx} = require('../src/');
const {testAccount} = require('./testconfig.js');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function errorPrinter(err) {
  console.log(err);
}

describe('input validation', () => {
  it('throws an error when http:// or https:// is not at the start of the url', () => {
    let url = 'dev.ndexbio.org/v2';

    expect(() => new NDEx(url)).to.throw();
  });

  it('doesnt throw an error when the url has http:// or https:// at the start of the url', () => {
    expect(() => new NDEx('http://dev.ndexbio.org/v2')).not.to.throw();
    expect(() => new NDEx('https://dev.ndexbio.org/v2')).not.to.throw();
  });
});

describe('testing client', () => {
  //this.timeout(5000);
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

  ndex.setBasicAuth(testAccount.username, testAccount.password);

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

  it('get user object by UUID', ()=>{
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

      return ndex.getGroup(groupid).then((groupObj)=>{
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

  it('Workspace CRUD operations', () => {
    return ndex.createCyWebWorkspace({
      'name': 'workspace 1',
      'options': {'darkmode':true, 'foo': 24},
      'networkIDs':["8ca5050b-0fed-11e7-a52f-06832d634f41","9025e42a-9e3f-11e7-8676-06832d634f41"]
    }).then((workspaceid) => {
      // console.log(networkList);
      expect(workspaceid.length).to.equal(36);

      return ndex.getCyWebWorkspace(workspaceid).then((workspaceObj)=>{
        expect(workspaceObj.name).to.equal('workspace 1');

        expect (workspaceObj.options.foo).to.equal(24);
        
        expect (workspaceObj.networkIDs.length).to.equal(2);

        ndex.updateCyWebWorkspace(workspaceid, 
          {'name': 'updated workspace', 'options': {'bar':'something'}, 'networkIDs':['f9c1b960-1330-11e7-b0de-06832d634f41']}
          ).then((response) =>{
          expect(response).to.equal('');
          ndex.getCyWebWorkspace(workspaceid)
            .then((newWorkspace) =>{
              // console.log(newgroup);
              expect(newWorkspace.name).to.equal("updated workspace");
              ndex.deleteCyWebWorkspace(workspaceid).then((foo) => {
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

  it('get private network summary through accessKey', ()=> {
    return ndex.getNetworkSummary('9025e42a-9e3f-11e7-8676-06832d634f41',
      'a93fa15fae6a6c087ec1e2b562deaac930c083ea4cb110110247f5e40f88d46a')
      .then((summary) => {
        expect(summary.owner).to.equal('cj1');
        expect(summary.nodeCount).to.equal(3);
        expect(summary.name).to.equal('cj test Network for unit test - dont remove');
        expect(summary.visibility).to.equal('PRIVATE');
      });
  });

});

describe('Authticated network test', () =>{
  let ndexclient = new NDEx('http://dev.ndexbio.org/v2');

  ndexclient.setBasicAuth(testAccount.username, testAccount.password);

  it('get private network', ()=> {
    return ndexclient.getRawNetwork('2977ee7f-1d34-11e7-8145-06832d634f41')
      .then((network) => {
        expect(network[10].nodes.length).to.equal(37);
        expect(network[7].edges.length).to.equal(37);
        expect(network[9].networkAttributes.length).to.equal(8);
        expect(network[3].citations.length).to.equal(1);
        expect(network[12].supports.length).to.equal(15);

      });
  });

  it('create private network', ()=> {
    return ndexclient.getRawNetwork('2977ee7f-1d34-11e7-8145-06832d634f41')
      .then((network) => {
        network.splice(0, 1);
        network.splice(1, 2);

        return ndexclient.createNetworkFromRawCX(network);
      }, errorPrinter)
      .then(
        (networkId) =>{
          sleep(3000).then(()=>{
            ndexclient.getRawNetwork(networkId)
              .then((newNet)=>{
                expect(newNet[5].edges.length).to.equal(37);
                newNet[7].networkAttributes[0] = {n: 'name', v: 'my updated network'};
                return ndexclient.updateNetworkFromRawCX(networkId, newNet);
              }, errorPrinter)
              .then((res)=> {
                sleep(3000).then(()=>{
                  return ndexclient.getRawNetwork(networkId);
                }, errorPrinter)
                  .then((updatedNet)=>{
                    expect(updatedNet[5].edges.length).to.equal(37);
                    expect(updatedNet[7].networkAttributes[0].v).to.equal('my updated network');

                    return ndexclient.deleteNetwork(networkId);
                  }, errorPrinter)
                  .then(
                    (response) => {
                      expect(response).to.equal('');
                    }, errorPrinter);
              }, errorPrinter);
          }, errorPrinter);
        }, errorPrinter);
  });

});

describe('Search function test', () =>{
  let ndexclient = new NDEx('http://dev.ndexbio.org/v2');

  ndexclient.setBasicAuth(testAccount.username, testAccount.password);

  it('search users', ()=>{
    return ndexclient.searchUsers('ccbb').then((result)=>{
      expect(result.numFound).to.equal(2);
      expect(result.resultList[0].userName).to.equal('ccbb_test');
    }, errorPrinter);
  });

  it('search groups', ()=>{
    return ndexclient.searchGroups('cravat').then((result)=>{
      expect(result.numFound).to.equal(1);
      expect(result.resultList[0].groupName).to.equal('cravat_enrich');
    }, errorPrinter);
  });

  it('search networks', ()=>{
    return ndexclient.searchNetworks('corpus').then((r)=> {
      expect(r.numFound).to.be.above(11);
      expect(r.networks[0].nodeCount).to.equal(37);
    }, errorPrinter
    );

  });

  it('search networks with paramter', ()=>{
    return ndexclient.searchNetworks('corpus', undefined, undefined, {accountName: 'cj1'}).then((r)=> {
      expect(r.numFound).to.be.above(6);
      expect(r.numFound).to.be.below(9);
      expect(r.networks[0].nodeCount).to.equal(37);
    }, errorPrinter
    );

  });

  it('neighborhood query on network', ()=>{
    return ndexclient.neighborhoodQuery('86fbe77b-a799-11e7-b522-06832d634f41', 'tpx2').then((r)=> {
      expect(r.length).to.equal(12);
    }, errorPrinter
    );

  });

  it('interconnect query on network', ()=>{
    return ndexclient.interConnectQuery('86fbe77b-a799-11e7-b522-06832d634f41', 'tpx2 aurka git1').then((r)=> {
      expect(r.length).to.equal(11);
    }, errorPrinter
    );

  });

  it('get users by a list of uuids', ()=>{
    return ndexclient.getUsersByUUIDs(['ff38bcec-3b20-11e7-9d8f-06832d634f41', 'c7e2c763-4652-11e7-96f7-06832d634f41',
      'f60c0d3b-aa96-11e6-9c4b-06832d634f41']).then((r)=> {
      expect(r.length).to.equal(3);
      expect(r[0].userName).to.equal('ccbb_test');
      expect(r[1].userName).to.equal('cj00');
      expect(r[2].userName).to.equal('cj22');
    }, errorPrinter
    );

  });

  it('get groups by a list of uuids', ()=>{
    return ndexclient.getGroupsByUUIDs(['06677c2c-b0d0-11e6-a04e-06832d634f41',
      '206f181f-aeb3-11e7-9b0a-06832d634f41']).then((r)=> {
      expect(r.length).to.equal(2);
      expect(r[0].groupName).to.equal('cravat_enrich');
      expect(r[1].groupName).to.equal('CJ\'s group for Unit Test');
    }, errorPrinter
    );
  });

  it('get networks by a list of uuids', ()=>{
    return ndexclient.getNetworkSummariesByUUIDs(['86fbe77b-a799-11e7-b522-06832d634f41',
      'ae908c8d-5db2-11e7-a54f-06832d634f41']).then((r)=> {
      expect(r.length).to.equal(2);
    }, errorPrinter
    );
  });

  it('get network permissions by a list of uuids', ()=>{
    return ndexclient.getNetworkPermissionsByUUIDs(['86fbe77b-a799-11e7-b522-06832d634f41',
      'ae908c8d-5db2-11e7-a54f-06832d634f41', 'be5c3f09-254f-11e7-bbd5-06832d634f41']).then((r)=> {
      expect(r['86fbe77b-a799-11e7-b522-06832d634f41']).to.equal('ADMIN');
      expect(r['ae908c8d-5db2-11e7-a54f-06832d634f41']).to.equal('ADMIN');
      expect(r['be5c3f09-254f-11e7-bbd5-06832d634f41']).to.equal('WRITE');
    }, errorPrinter
    );
  });

  it('export GSEA report of 2 networks', ()=>{
    return ndexclient.exportNetworks(
      { exportFormat: 'GSEA Gene Set',
        networkIds: ['86fbe77b-a799-11e7-b522-06832d634f41',
          '2977ee7f-1d34-11e7-8145-06832d634f41']
      }).then((r)=> {
      expect(r['86fbe77b-a799-11e7-b522-06832d634f41'].length).to.equal(36);
      expect(r['2977ee7f-1d34-11e7-8145-06832d634f41'].length).to.equal(36);
    }, errorPrinter
    );
  });

  it('get edges', ()=>{
    return ndexclient.getRandomEdges(
      '86fbe77b-a799-11e7-b522-06832d634f41', 5).then((r)=> {
        expect(r.length).to.equal(5);
      }, errorPrinter
    );
  });

  it('get nodes', ()=>{
    return ndexclient.getAspectElements(
      '86fbe77b-a799-11e7-b522-06832d634f41', 'nodes',5).then((r)=> {
        expect(r.length).to.equal(5);
        expect(r[0].id).to.equal(1);
        expect(r[0].v.n).to.equal("IMB1");
      }, errorPrinter
    );
  });

  it('get metadata', ()=>{
    return ndexclient.getMetaData(
      '86fbe77b-a799-11e7-b522-06832d634f41').then((r)=> {
        expect(r.metaData.length).to.equal(10);
        expect(r.metaData[2].name).to.equal('nodes');
        expect(r.metaData[2].elementCount).to.equal(32);

        expect(r.metaData[3].name).to.equal('edges');
        expect(r.metaData[3].elementCount).to.equal(47);

        expect(r.metaData[5].name).to.equal('nodeAttributes');
        expect(r.metaData[5].elementCount).to.equal(64);

      }, errorPrinter
    );
  });

  it('get all nodes', ()=>{
    return ndexclient.getAspectElements(
      '86fbe77b-a799-11e7-b522-06832d634f41', 'nodes').then((r)=> {
        expect(r.length).to.equal(32);
        expect(r[0].id).to.equal(1);
        expect(r[0].v.n).to.equal("IMB1");
        expect(r[31].id).to.equal(32);
        expect(r[31].v.n).to.equal("DLGP5");
        expect(r[31].v.type).to.equal('Protein');
        expect(r[31].v.alias[0]).to.equal("uniprot knowledgebase:A8MTM6");
        expect(r[31].x).to.equal(520.0389842438293);
      }, errorPrinter
    );
  });

  it('get filtered edges', ()=>{
    return ndexclient.getFilteredEdges(
      'be5c3f09-254f-11e7-bbd5-06832d634f41', "weight", "0.30", ">").then((r)=> {
        expect(r.length).to.equal(8);
        expect(r[0].id).to.equal(1202);
        expect(r[0].s).to.equal(286);
        expect(r[6].id).to.equal(1180);
        expect(r[6].s).to.equal(269);
        expect(r[6].v.weight).to.equal(0.367647058824);
        expect(r[7].v.weight).to.equal(0.321853878339);
      }, errorPrinter
    );
  });

  it('get filtered edges with limit', ()=>{
    return ndexclient.getFilteredEdges(
      'be5c3f09-254f-11e7-bbd5-06832d634f41', "weight", "0.35", ">", 4).then((r)=> {
        expect(r.length).to.equal(4);
        expect(r[0].id).to.equal(1202);
        expect(r[0].s).to.equal(286);
        expect(r[0].v.weight).to.equal(0.738552437223);
        expect(r[3].id).to.equal(579);
        expect(r[3].s).to.equal(384);
        expect(r[3].v.weight).to.equal(0.367647058824);
      }, errorPrinter
    );
  });

  it('get cx2 metadata', ()=>{
    return ndexclient.getCX2MetaData(
      'be5c3f09-254f-11e7-bbd5-06832d634f41').then((r)=> {
        expect(r.length).to.equal(8);
        expect(r[3].name).to.equal("nodeBypasses");
        expect(r[3].elementCount).to.equal(402);
      }, errorPrinter
    );
  });

  it('get cx2 network', ()=> {
    return ndexclient.getCX2Network('be5c3f09-254f-11e7-bbd5-06832d634f41')
      .then((network) => {
        expect(network[4].nodes.length).to.equal(402);
        expect(network[5].edges.length).to.equal(832);
        expect(network[9].visualEditorProperties.length).to.equal(1);
        expect(network[10].status.length).to.equal(1);
      });
  });

});

describe('Networkset tests', () => {
  let ndexclient = new NDEx('http://dev.ndexbio.org/v2');
  ndexclient.setBasicAuth(testAccount.username, testAccount.password);
  const networkSetData = {
      name: 'ndex-client-test-networkset',
      description: 'test networkset'
  };

  let createdNetworkSet = '';
  let createdNetworkSetMember = '';
  it('creates a networkset', () => {

    return ndexclient.createNetworkSet(networkSetData).then(res => {
      expect(res).to.be.a('string');
      createdNetworkSet = res;
    });
  });

  it('gets a networkset', () => {
      return ndexclient.getNetworkSet(createdNetworkSet).then(res => {
          expect(res.description).to.equal(networkSetData.description);
          expect(res.name).to.equal(networkSetData.name);
      });
  });

  it('updates a networkset', async () => {
      const updated = {
          name: 'updated',
          description: 'updated'
      };
      await ndexclient.updateNetworkSet(createdNetworkSet, updated);
      const updatedNetworkSet = await ndexclient.getNetworkSet(createdNetworkSet);
      expect(updatedNetworkSet.name).to.equal(updated.name);
      expect(updatedNetworkSet.description).to.equal(updated.description);
  });

  it('adds networks to a networkset', async () => {
      const network = await ndexclient.getRawNetwork('2977ee7f-1d34-11e7-8145-06832d634f41');

      const network0 = network.splice(0, 1).splice(1, 2);

      const nsBefore = await ndexclient.getNetworkSet(createdNetworkSet);
      const nsBeforeMembers = nsBefore.networks;

      const network0Id = await ndexclient.createNetworkFromRawCX(network0);
      createdNetworkSetMember = network0Id;

      await ndexclient.addToNetworkSet(createdNetworkSet, [network0Id]);

      const nsAfter = await ndexclient.getNetworkSet(createdNetworkSet);
      const nsAfterMembers = nsAfter.networks;

      expect(nsBeforeMembers.length).to.equal(0);
      expect(nsAfterMembers.length).to.equal(1);
  });

  it('deletes networks from a networkset', async () => {

      const nsBefore = await ndexclient.getNetworkSet(createdNetworkSet);
      const nsBeforeMembers = nsBefore.networks;

      const network0Id = createdNetworkSetMember;

      await ndexclient.deleteFromNetworkSet(createdNetworkSet, [network0Id]);

      const nsAfter = await ndexclient.getNetworkSet(createdNetworkSet);
      const nsAfterMembers = nsAfter.networks;

      expect(nsBeforeMembers.length).to.equal(1);
      expect(nsAfterMembers.length).to.equal(0);
  });

  it('updates networkset system properties', async () => {
      const nsBefore = await ndexclient.getNetworkSet(createdNetworkSet);
      await ndexclient.updateNetworkSetSystemProperty(createdNetworkSet, {showcase: true});

      const nsAfter = await ndexclient.getNetworkSet(createdNetworkSet);

      expect(nsBefore.showcased).to.equal(false);
      expect(nsAfter.showcased).to.equal(true);
  })

  it('deletes a networkset', () => {
    return ndexclient.deleteNetworkSet(createdNetworkSet).then(res => {
      expect(res).to.equal('');
    });
  });
});

describe('Aspect updates',  () => {
  let ndexclient = new NDEx('http://dev.ndexbio.org/v2');
  ndexclient.setBasicAuth(testAccount.username, testAccount.password);
  const networkWithoutLayoutAspect = '2977ee7f-1d34-11e7-8145-06832d634f41';
  const networkWithLayoutAspect = '5b7b8d84-eee0-11ea-a908-525400c25d22';

  it('updates node positions for a network with a layout aspect', async () => {
    const network = await ndexclient.getRawNetwork(networkWithLayoutAspect);
    const network0Id = await ndexclient.createNetworkFromRawCX(network);
    const network0 = await ndexclient.getRawNetwork(network0Id);
    const nodes = network0.filter(o => Object.keys(o)[0] === 'nodes')[0];
    const positions = nodes['nodes'].map(nodeObj => {
      return {
        node: nodeObj['@id'],
        x: 100,
        y: 100
      };
    });

    await ndexclient.updateCartesianLayoutAspect(network0Id, positions);
    const updated = await ndexclient.getRawNetwork(network0Id);

    updated.filter(o => Object.keys(o)[0] === 'cartesianLayout')[0]['cartesianLayout'].forEach(positionObj => {
      expect(positionObj['x']).to.equal(100);
      expect(positionObj['y']).to.equal(100);
    });

    await ndexclient.deleteNetwork(network0Id);
  });

  // it('can update a subset of node positions in a network', async () => {
  //   const network = await ndexclient.getRawNetwork(networkWithLayoutAspect);

  //   const network0Id = await ndexclient.createNetworkFromRawCX(network);
  //   const network0 = await ndexclient.getRawNetwork(network0Id);
  //   const nodes = network0.filter(o => Object.keys(o)[0] === 'nodes')[0];

  //   const singleNodeId = nodes['nodes'][0]['@id'];
  //   const positions = [{
  //     node: singleNodeId,
  //     x: 1,
  //     y: 1
  //   }];

  //   expect(() =>ndexclient.updateCartesianLayoutAspect(network0Id, positions)).to.throw();
  //   // const updated = await ndexclient.getRawNetwork(network0Id);

  //   // const updatedNode = updated.filter(o => Object.keys(o)[0] === 'cartesianLayout')[0]['cartesianLayout'].filter(positionObj => positionObj.node === singleNodeId)[0];
  //   // expect(updatedNode.x).to.equal(1);
  //   // expect(updatedNode.y).to.equal(1);
  //   await ndexclient.deleteNetwork(network0Id);
  // });
/*
  it('updating a network with out a cartesianLayout aspect adds a cartesian layout aspect', async () => {
    const network = await ndexclient.getRawNetwork(networkWithoutLayoutAspect);
    const network0Id = await ndexclient.createNetworkFromRawCX(network);
    const network0 = await ndexclient.getRawNetwork(network0Id);
    const nodes = network0.filter(o => Object.keys(o)[0] === 'nodes')[0];
    const positions = nodes['nodes'].map(nodeObj => {
      return {
        node: nodeObj['@id'],
        x: 100,
        y: 100
      };
    });

    // the network doesnt have a cartesian layout aspect
    expect(network.filter(o => Object.keys(o)[0] === 'cartesianLayout').length).to.equal(0);

    await ndexclient.updateCartesianLayoutAspect(network0Id, positions);

    const updated = await ndexclient.getRawNetwork(network0Id);
    updated.filter(o => Object.keys(o)[0] === 'cartesianLayout')[0]['cartesianLayout'].forEach(positionObj => {
      expect(positionObj['x']).to.equal(100);
      expect(positionObj['y']).to.equal(100);
    });

    expect(updated.filter(o => Object.keys(o)[0] === 'cartesianLayout').length).to.equal(1);
    await ndexclient.deleteNetwork(network0Id);
  });


  it('updating some nodes in a network with out a cartesianLayout aspect adds a cartesian layout aspect', async () => {
    const network = await ndexclient.getRawNetwork(networkWithoutLayoutAspect);
    const network0Id = await ndexclient.createNetworkFromRawCX(network);
    const network0 = await ndexclient.getRawNetwork(network0Id);
    const nodes = network0.filter(o => Object.keys(o)[0] === 'nodes')[0];
    const singleNodeId = nodes['nodes'][0]['@id'];
    const positions = [{
      node: singleNodeId,
      x: 1,
      y: 1
    }];

    // the network doesnt have a cartesian layout aspect
    expect(network.filter(o => Object.keys(o)[0] === 'cartesianLayout').length).to.equal(0);

    await ndexclient.updateCartesianLayoutAspect(network0Id, positions);

    const updated = await ndexclient.getRawNetwork(network0Id);

    // when you update the cartesian layout aspect for a network that doesn't have one and you
    // only include a subset of node positions, only that subset will have a position
    expect(updated.filter(o => Object.keys(o)[0] === 'cartesianLayout')[0]['cartesianLayout'].length).to.equal(1);

    await ndexclient.deleteNetwork(network0Id);
  });

*/

});