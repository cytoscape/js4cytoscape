var node_suid=undefined
var subnetwork_SUID=undefined
var allNodes=[]
var differenceNodes=[]
var nodeName=undefined
const CYREST_BASE_URL = 'http://127.0.0.1:1234';
var network_SUID = undefined;
const fetch = require("node-fetch");


async function getCurrent(){
    const geturl=CYREST_BASE_URL +"/v1/networks/currentNetwork"
    try{
          const response=await fetch(geturl,{
          method:"GET",
          headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          })
          if(response.status>=200 && response.status<=299){
          const json=await response.json()
          network_SUID=json["data"]["networkSUID"]
          console.log(network_SUID)
      }
    else{
      throw "No Network Selected.Select a Network in the Cytoscape App"
    }}
    catch(err){
      console.log(err)
      return false
    }}

module.exports = { getCurrent };
