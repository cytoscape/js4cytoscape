async function cyrestGET(e="",t="",n=defaultBaseUrl){let a=n.concat("/",e);if(""!=t){const e=t;a=a.concat("?",e)}const o=await fetch(a,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}});return await o.json()}async function cyrestDELETE(e="",t="",n=defaultBaseUrl){let a=n.concat("/",e);if(""!=t){const e=t;a=a.concat("?",e)}const o=await fetch(a,{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json"}});return await o.text()}async function cyrestPOST(e="",t="",n={},a=defaultBaseUrl){let o=a.concat("/",e);if(""!=t){const e=t;o=o.concat("?",e)}const s=JSON.stringify(n),l=await fetch(o,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:s});return await l.json()}async function cyrestPUT(e="",t="",n={},a=defaultBaseUrl){let o=a.concat("/",e);if(""!=t){const e=t;o=o.concat("?",e)}const s=JSON.stringify(n),l=await fetch(o,{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:s});return await l.json()}async function commandsGET(e,t=defaultBaseUrl){const n=command2getQuery(e,t),a=await fetch(n,{method:"GET",headers:{Accept:"text/plain","Content-Type":"text/plain"}});return await a.text()}async function commandsRun(e,t=defaultBaseUrl){commandsGET(e,t=t)}async function commandsPOST(e,t=defaultBaseUrl){const n=command2postQueryUrl(e,t);let a=command2postQueryBody(e);a=JSON.stringify(a);const o=await fetch(n,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:a});return await o.text()}function command2getQuery(e,t=defaultBaseUrl){let n=e.replace(/\ [A-Za-z0-9_-]*=/g,"XXXXXX$&").split("XXXXXX"),a=n[0].replace(" ","/"),o=t.concat("/commands/"),s=encodeURI(o.concat(a)),l=n.slice(1).join(" "),c="",r=[],i=[];if(void 0!==l&&0!=l.length){const e=/[A-Za-z0-9_-]+=/g;r=(r=(l=l.replace(/['"]+/g,"")).match(e)).map(function(e){return e.replace(/=/g,"")});const t=/\ *[A-Za-z0-9_-]+=/g;i=l.split(t).slice(1),c=r[0]+"="+encodeURI(i[0]);for(var d=1;d<r.length;d++){c=c+"&"+(r[d]+"="+encodeURI(i[d]))}return s+"?"+c}return s}function command2postQueryUrl(e,t=defaultBaseUrl){let n=e.replace(/\ [A-Za-z0-9_-]*=/g,"XXXXXX$&").split("XXXXXX")[0].replace(" ","/"),a=t.concat("/commands/");return encodeURI(a.concat(n))}function command2postQueryBody(e){let t=e.replace(/\ [A-Za-z0-9_-]*=/g,"XXXXXX$&").split("XXXXXX").slice(1).join(" "),n={},a=[],o=[];if(void 0!==t&&0!=t.length){const e=/[A-Za-z0-9_-]+=/g;a=(a=(t=t.replace(/['"]+/g,"")).match(e)).map(function(e){return e.replace(/=/g,"")});const s=/\ *[A-Za-z0-9_-]+=/g;return o=t.split(s).slice(1),a.forEach((e,t)=>n[e]=o[t]),n}return n={atLeastOneArg:"required"}}async function setCurrentNetwork(e=null,t=defaultBaseUrl){commandsPOST('network set current network=SUID:"'+await getNetworkSuid(e,t)+'"',t=t)}async function renameNetwork(e,t=null,n=defaultBaseUrl){commandsPOST('network rename name="'+e+'" sourceNetwork=SUID:"'+await getNetworkSuid(t,n)+'""',n)}async function getNetworkCount(e=defaultBaseUrl){let t=cyrestGET("networks/count",e),n=t.then(e=>{console.log(e.count)});return n=t.then(e=>e.count)}async function deleteNetwork(e=null,t=defaultBaseUrl){cyrestDELETE("networks/"+await getNetworkSuid(e,t),t=t);console.log("Selected network is deleted.")}async function deleteAllNetworks(e=defaultBaseUrl){cyrestDELETE("networks",e=e);console.log("All networks are deleted.")}async function getNetworkSuid(e=null,t=defaultBaseUrl){let n;if("string"==typeof e||e instanceof String)if("current"==e)n=e;else{(await getNetworkList(t=t)).includes(e)?n=e:console.log("Network does not exist: "+e)}else if("number"==typeof e){if((await cyrestGET("networks",t=t)).includes(e))return console.log(e),e;console.log("Network does not exist: "+e)}else n="current";let a=commandsPOST('network get attribute network="'+n+'" namespace="default" columnList="SUID"',t=t),o=a.then(e=>{console.log("Network suid: "+JSON.parse(e).data[0].SUID)});return o=a.then(e=>JSON.parse(e).data[0].SUID)}async function getNetworkList(e=defaultBaseUrl){if(0==await getNetworkCount(e))return console.log([]),[];let t=await cyrestGET("networks",e=e),n=[];for(const e of t){let t=(await cyrestGET("networks/"+e.toString())).data.name;n.push(t)}return console.log(n),n}let cyrunning,cybadgeKey,cybadgeVal,cybadgeElm,cyversion;async function cyBadge(e=defaultBaseUrl){if(inCyBrowser){console.log("cytoscape is running and CyBrowser detected"),cybadgeElm=document.getElementsByClassName("cytoscape-badge");for(let e=0;e<cybadgeElm.length;e++)(cybadgeKey=document.createElement("span")).className="cybadgekey",cybadgeKey.innerHTML="cybrowser",(cybadgeVal=document.createElement("span")).className="cybadgeval",cybadgeVal.style="background:#0078B9;",cybadgeVal.innerHTML="detected",cybadgeElm[e].appendChild(cybadgeKey),cybadgeElm[e].appendChild(cybadgeVal)}else{cyrunning=!1;try{cyversion=await cyrestGET("version"),cyrunning=!0,console.log("cytoscape v"+cyversion.cytoscapeVersion+" is running")}catch(e){cyrunning=!1,console.log("cytoscape is not running")}cybadgeElm=document.getElementsByClassName("cytoscape-badge");for(let e=0;e<cybadgeElm.length;e++)(cybadgeKey=document.createElement("span")).className="cybadgekey",cybadgeKey.innerHTML="cytoscape",(cybadgeVal=document.createElement("span")).className="cybadgeval",cyrunning?(cybadgeVal.style="background:#0078B9;",cybadgeVal.innerHTML="v"+cyversion.cytoscapeVersion):(cybadgeVal.style="background:#CD5F46;",cybadgeVal.innerHTML="not running"),cybadgeElm[e].appendChild(cybadgeKey),cybadgeElm[e].appendChild(cybadgeVal)}}async function checkCytoscape(){try{await cyrestGET("version");disabledButton=!1}catch(e){disabledButton=!0}const e=document.getElementById("cytobutton");disabledButton&&(e.disabled="disabled"),disabledButton&&(document.getElementById("cytobutton").innerText="Download Cytoscape"),disabledButton&&document.getElementById("cytobutton").setAttribute("title","Download Cytoscape")}async function cytoscapeVersionInfo(e=defaultBaseUrl){let t=cyrestGET("version",e=e);t.then(e=>{console.log("apiVersion: "+e.apiVersion)}),t.then(e=>{console.log("cytoscapeVersion: "+e.cytoscapeVersion)});return data.cytoscapeVersion}async function cytoscapeMemoryStatus(e=defaultBaseUrl){cyrestGET("","",e=e).then(e=>{console.log(e.memoryStatus)});return data.memoryStatus}async function importNetworkFromNDEX(e=e,t,n,a){const o={serverUrl:e,uuid:t,username:n,password:a},s=CYREST_BASE_URL+"/cyndex2/v1/networks";console.log("Calling CyREST POST:",s);const l=await fetch(s,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(o)}),c=await l.json();console.log("Response JSON: "+JSON.stringify(c));const r=c.data.suid;return console.log("network SUID: "+r),r}async function exportNetworkToNDEx(e=e,t,n,a,o="current",s=null){const l={serverUrl:e,username:t,password:n,metadata:s,isPublic:a};let c=await getNetworkSuid(o=o);console.log(c);const r=CYREST_BASE_URL+"/cyndex2/v1/networks/"+c;console.log("Calling CyREST POST:",r);const i=await fetch(r,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(l)}),d=await i.json();console.log("Response JSON: "+JSON.stringify(d));const u=d.data.suid;return console.log("network SUID: "+u),u}const defaultBaseUrl="http://127.0.0.1:1234/v1",serverUrl="https://ndexbio.org/v2",CYREST_BASE_URL="http://127.0.0.1:1234";let ndex,disabledButton;function displayCX(e,t){const n=document.getElementById(t),a=new cytoscapeCx2js.CyNetworkUtils,o=a.rawCXtoNiceCX(e),s=new cytoscapeCx2js.CxToJs(a);let l={};const c=s.cyElementsFromNiceCX(o,l),r=s.cyStyleFromNiceCX(o,l),i=s.cyBackgroundColorFromNiceCX(o),d=s.getDefaultLayout(),u=s.cyZoomFromNiceCX(o),y=s.cyPanFromNiceCX(o);n.style.backgroundColor=i,cytoscape({container:n,style:r,elements:c,layout:d,zoom:u,pan:y}).fit()}function initNdexClient(){ndex=new ndexClient.NDEx(serverUrl)}function displayNDExCX(e,t){initNdexClient(),ndex.getRawNetwork(e).then(e=>{displayCX(e,t)})}function displayLocalCX(e,t){initNdexClient(),fetch(e).then(function(e){return e.json()}).then(e=>{displayCX(e,t)})}async function checkCytoscape(){try{await cyrestGET("version");disabledButton=!1}catch(e){disabledButton=!0}const e=document.getElementById("cytobutton");disabledButton&&(e.disabled="disabled"),disabledButton&&(document.getElementById("cytobutton").innerText="Download Cytoscape"),disabledButton&&document.getElementById("cytobutton").setAttribute("title","Download Cytoscape")}async function getAvailableApps(e=defaultBaseUrl){commandsGET("apps list available",e=e).then(e=>{console.log("Available apps: "+e)})}async function getInstalledApps(e=defaultBaseUrl){commandsGET("apps list installed",e=e).then(e=>{console.log("Installed apps: "+e)})}async function getDisabledApps(e=defaultBaseUrl){commandsGET("apps list disabled",e=e).then(e=>{console.log("Disabled apps: "+e)})}async function getAppUpdates(e=defaultBaseUrl){commandsGET("apps list updates",e=e)}async function openAppStore(e,t=defaultBaseUrl){commandsGET("apps open appstore app='"+e+"'",t=t)}async function getFilterList(e=defaultBaseUrl){commandsPOST("filter list",e=e).then(e=>{console.log("Filter list: "+JSON.stringify(JSON.parse(e).data))})}async function analyzeNetwork(e=!1,t=defaultBaseUrl){commandsPOST("analyzer analyze directed="+e,t=t).then(e=>{console.log("Analyze network: "+JSON.stringify(JSON.parse(e).data))})}async function getNetworkViews(e=null,t=defaultBaseUrl){let n=cyrestGET("networks/"+await getNetworkSuid(e,t)+"/views",t);n.then(e=>{console.log("Network views suid: "+e)});return n}async function getNetworkViewsSuid(e=null,t=defaultBaseUrl){let n=await getNetworkSuid(e,t);return await getNetworkViews(n,t)}async function fitContent(e=!1,t=null,n=defaultBaseUrl){let a=await getNetworkViewsSuid(t,n);commandsPOST(1==e?"view fit selected view=SUID:"+a:"view fit content view=SUID:"+a,n)}async function setCurrentView(e=null,t=defaultBaseUrl){commandsPOST('view set current view=SUID:"'+await getNetworkViewsSuid(e,t)+'"',t=t)}async function openSession(e=null,t=defaultBaseUrl){let n="file";null===e?e="./sampleData/sessions/Yeast Perturbation.cys":e.startsWith("http")&&(n="url");let a="session open "+n+'="'+e;if(inCyBrowser)return cybrowser.executeCyCommand(a),null;{let n=commandsPOST(a,t=t);return console.log("Opening session file at "+e),n.then(e=>{console.log("openSession: completed")}),n.then(e=>JSON.parse(e).data)}}async function closeSession(e,t=null,n=defaultBaseUrl){e&&saveSession(t,n);let a="session new";if(inCyBrowser)return cybrowser.executeCyCommand(a),null;{let e=commandsPOST(a,n=n);return console.log("Closing session"),e.then(e=>{console.log("closeSession: completed")}),e.then(e=>JSON.parse(e).data)}}async function saveSession(e=null,t=defaultBaseUrl){if(null===e)if(inCyBrowser||""==(e=cyrestGET("session/name",t=t))&&alert("Save not completed. Provide a filename the first time you save a session."),inCyBrowser)cybrowser.executeCyCommand("session save");else{let n=commandsPOST("session save",t=t);console.log("Saving session file at "+e),n.then(e=>{console.log("saveSession: completed")})}else{let n="session save as file="+e+'"';if(inCyBrowser)cybrowser.executeCyCommand(n);else{let a=commandsPOST(n,t=t);console.log("Saving session file at "+e),a.then(e=>{console.log("saveSession: completed")})}}return res}async function getVisualStyleNames(e=defaultBaseUrl){let t=await cyrestGET("apply/styles",e);return console.log(t),t}async function getCurrentStyle(e=null,t=defaultBaseUrl){let n=await getNetworkSuid(e,t),a=await getNetworkViewsSuid(n,t),o=await cyrestGET("networks/"+n+"/views/"+a+"/currentStyle",t);return console.log(o.title),o.title}async function getArrowShapes(e=defaultBaseUrl){let t=await cyrestGET("styles/visualproperties/EDGE_TARGET_ARROW_SHAPE/values",e);return console.log(t.values),t.values}async function getLineStyles(e=defaultBaseUrl){let t=await cyrestGET("styles/visualproperties/EDGE_LINE_TYPE/values",e);return console.log(t.values),t.values}async function getNodeShapes(e=defaultBaseUrl){let t=await cyrestGET("styles/visualproperties/NODE_SHAPE/values",e);return console.log(t.values),t.values}async function layoutNetwork(e=null,t=null,n=defaultBaseUrl){let a=await getNetworkSuid(t,n);if(null===e)commandsPOST('layout apply preferred networkSelected="SUID:'+a+'"',n=n);else commandsPOST("layout "+e+' network="SUID:'+a+'"',n=n)}async function getLayoutNames(e=defaultBaseUrl){let t=await cyrestGET("apply/layouts",e);return console.log(t),t}async function deleteSelectedEdges(e=null,t=defaultBaseUrl){commandsPOST("network delete edgeList=selected network=SUID:"+await getNetworkSuid(e,t)+'"',t=t)}