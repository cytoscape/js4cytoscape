async function cyrestGET(e="",t="",a=defaultBaseUrl){let n=a.concat("/",e);if(""!=t){const e=t;n=n.concat("?",e)}const s=await fetch(n,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}});return await s.json()}async function cyrestDELETE(e="",t="",a=defaultBaseUrl){let n=a.concat("/",e);if(""!=t){const e=t;n=n.concat("?",e)}const s=await fetch(n,{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json"}});return await s.text()}async function cyrestPOST(e="",t="",a={},n=defaultBaseUrl){let s=n.concat("/",e);if(""!=t){const e=t;s=s.concat("?",e)}const o=JSON.stringify(a),r=await fetch(s,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:o});return await r.json()}async function cyrestPUT(e="",t="",a={},n=defaultBaseUrl){let s=n.concat("/",e);if(""!=t){const e=t;s=s.concat("?",e)}const o=JSON.stringify(a),r=await fetch(s,{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:o});return await r.json()}async function commandsGET(e,t=defaultBaseUrl){const a=command2getQuery(e,t),n=await fetch(a,{method:"GET",headers:{Accept:"text/plain","Content-Type":"text/plain"}});return await n.text()}async function commandsPOST(e,t=defaultBaseUrl){const a=command2postQueryUrl(e,t);let n=command2postQueryBody(e);n=JSON.stringify(n);const s=await fetch(a,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:n});return await s.text()}function command2getQuery(e,t=defaultBaseUrl){let a=e.replace(/\ [A-Za-z0-9_-]*=/g,"XXXXXX$&").split("XXXXXX"),n=a[0].replace(" ","/"),s=t.concat("/commands/"),o=encodeURI(s.concat(n)),r=a.slice(1).join(" "),l="",c=[],i=[];if(void 0!==r&&0!=r.length){const e=/[A-Za-z0-9_-]+=/g;c=(c=(r=r.replace(/['"]+/g,"")).match(e)).map(function(e){return e.replace(/=/g,"")});const t=/\ *[A-Za-z0-9_-]+=/g;i=r.split(t).slice(1),l=c[0]+"="+encodeURI(i[0]);for(var d=1;d<c.length;d++){l=l+"&"+(c[d]+"="+encodeURI(i[d]))}return o+"?"+l}return o}function command2postQueryUrl(e,t=defaultBaseUrl){let a=e.replace(/\ [A-Za-z0-9_-]*=/g,"XXXXXX$&").split("XXXXXX")[0].replace(" ","/"),n=t.concat("/commands/");return encodeURI(n.concat(a))}function command2postQueryBody(e){let t=e.replace(/\ [A-Za-z0-9_-]*=/g,"XXXXXX$&").split("XXXXXX").slice(1).join(" "),a={},n=[],s=[];if(void 0!==t&&0!=t.length){const e=/[A-Za-z0-9_-]+=/g;n=(n=(t=t.replace(/['"]+/g,"")).match(e)).map(function(e){return e.replace(/=/g,"")});const o=/\ *[A-Za-z0-9_-]+=/g;return s=t.split(o).slice(1),n.forEach((e,t)=>a[e]=s[t]),a}return a={atLeastOneArg:"required"}}async function setCurrentNetwork(e=null,t=defaultBaseUrl){commandsPOST('network set current network=SUID:"'+await getNetworkSuid(e,t)+'"',t=t)}async function renameNetwork(e,t=null,a=defaultBaseUrl){commandsPOST('network rename name="'+e+'" sourceNetwork=SUID:"'+await getNetworkSuid(t,a)+'""',a)}async function getNetworkCount(e=defaultBaseUrl){let t=cyrestGET("networks/count",e),a=t.then(e=>{console.log(e.count)});return a=t.then(e=>e.count)}async function deleteNetwork(e=null,t=defaultBaseUrl){cyrestDELETE("networks/"+await getNetworkSuid(e,t),t=t);console.log("Selected network is deleted.")}async function deleteAllNetworks(e=defaultBaseUrl){cyrestDELETE("networks",e=e);console.log("All networks are deleted.")}async function getNetworkSuid(e=null,t=defaultBaseUrl){let a;if("string"==typeof e||e instanceof String)if("current"==e)a=e;else{(await getNetworkList(t=t)).includes(e)?a=e:console.log("Network does not exist: "+e)}else if("number"==typeof e){if((await cyrestGET("networks",t=t)).includes(e))return console.log(e),e;console.log("Network does not exist: "+e)}else a="current";let n=commandsPOST('network get attribute network="'+a+'" namespace="default" columnList="SUID"',t=t),s=n.then(e=>{console.log("Network suid: "+JSON.parse(e).data[0].SUID)});return s=n.then(e=>JSON.parse(e).data[0].SUID)}async function getNetworkList(e=defaultBaseUrl){if(0==await getNetworkCount(e))return console.log([]),[];let t=await cyrestGET("networks",e=e),a=[];for(const e of t){let t=(await cyrestGET("networks/"+e.toString())).data.name;a.push(t)}return console.log(a),a}let cyrunning,cybadgeKey,cybadgeVal,cybadgeElm,cyversion;async function cyBadge(e=defaultBaseUrl){if(inCyBrowser){console.log("cytoscape is running and CyBrowser detected"),cybadgeElm=document.getElementsByClassName("cytoscape-badge");for(let e=0;e<cybadgeElm.length;e++)(cybadgeKey=document.createElement("span")).className="cybadgekey",cybadgeKey.innerHTML="cybrowser",(cybadgeVal=document.createElement("span")).className="cybadgeval",cybadgeVal.style="background:#0078B9;",cybadgeVal.innerHTML="detected",cybadgeElm[e].appendChild(cybadgeKey),cybadgeElm[e].appendChild(cybadgeVal)}else{cyrunning=!1;try{cyversion=cyrestGET("version",e=e),cyrunning=!0,console.log("cytoscape v"+cyversion.cytoscapeVersion+" is running")}catch(e){cyrunning=!1,console.log("cytoscape is not running")}cybadgeElm=document.getElementsByClassName("cytoscape-badge");for(let e=0;e<cybadgeElm.length;e++)(cybadgeKey=document.createElement("span")).className="cybadgekey",cybadgeKey.innerHTML="cytoscape",(cybadgeVal=document.createElement("span")).className="cybadgeval",cyrunning?(cybadgeVal.style="background:#0078B9;",cybadgeVal.innerHTML="v"+cyversion.cytoscapeVersion):(cybadgeVal.style="background:#CD5F46;",cybadgeVal.innerHTML="not running"),cybadgeElm[e].appendChild(cybadgeKey),cybadgeElm[e].appendChild(cybadgeVal)}}async function checkCytoscape(e=defaultBaseUrl){try{cyrestGET("version",e=e);disabledButton=!1}catch(e){disabledButton=!0}const t=document.getElementById("cytobutton");disabledButton&&(t.disabled="disabled"),disabledButton&&(document.getElementById("cytobutton").innerText="Download Cytoscape"),disabledButton&&document.getElementById("cytobutton").setAttribute("title","Download Cytoscape")}async function cytoscapeVersionInfo(e=defaultBaseUrl){let t=cyrestGET("version",e=e);t.then(e=>{console.log("apiVersion: "+e.apiVersion)}),t.then(e=>{console.log("cytoscapeVersion: "+e.cytoscapeVersion)});return data.cytoscapeVersion}async function cytoscapeMemoryStatus(e=defaultBaseUrl){cyrestGET("","",e=e).then(e=>{console.log(e.memoryStatus)});return data.memoryStatus}async function importNetworkFromNDEx(e=e,t,a,n){const s={serverUrl:e,uuid:t,username:a,password:n},o=CYREST_BASE_URL+"/cyndex2/v1/networks";console.log("Calling CyREST POST:",o);const r=await fetch(o,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(s)}),l=await r.json();console.log("Response JSON: "+JSON.stringify(l));const c=l.data.suid;return console.log("network SUID: "+c),c}async function exportNetworkToNDEx(e=e,t,a,n,s="current",o=null){const r={serverUrl:e,username:t,password:a,metadata:o,isPublic:n};let l=await getNetworkSuid(s=s);console.log(l);const c=CYREST_BASE_URL+"/cyndex2/v1/networks/"+l;console.log("Calling CyREST POST:",c);const i=await fetch(c,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(r)}),d=await i.json();console.log("Response JSON: "+JSON.stringify(d));const p=d.data.suid;return console.log("network SUID: "+p),p}const defaultBaseUrl="http://127.0.0.1:1234/v1",serverUrl="https://ndexbio.org/v2",CYREST_BASE_URL="http://127.0.0.1:1234";let ndex,disabledButton;function displayCX(e,t){const a=document.getElementById(t),n=new cytoscapeCx2js.CyNetworkUtils,s=n.rawCXtoNiceCX(e),o=new cytoscapeCx2js.CxToJs(n);let r={};const l=o.cyElementsFromNiceCX(s,r),c=o.cyStyleFromNiceCX(s,r),i=o.cyBackgroundColorFromNiceCX(s),d=o.getDefaultLayout(),p=o.cyZoomFromNiceCX(s),u=o.cyPanFromNiceCX(s);a.style.backgroundColor=i,cytoscape({container:a,style:c,elements:l,layout:d,zoom:p,pan:u}).fit()}function initNdexClient(){ndex=new ndexClient.NDEx(serverUrl)}function displayNDExCX(e,t){initNdexClient(),ndex.getRawNetwork(e).then(e=>{displayCX(e,t)})}function displayLocalCX(e,t){initNdexClient(),fetch(e).then(function(e){return e.json()}).then(e=>{displayCX(e,t)})}async function getAvailableApps(e=defaultBaseUrl){return await commandsGET("apps list available",e=e)}async function getInstalledApps(e=defaultBaseUrl){return await commandsGET("apps list installed",e=e)}async function getDisabledApps(e=defaultBaseUrl){return await commandsGET("apps list disabled",e=e)}async function getAppUpdates(e=defaultBaseUrl){return await commandsGET("apps list updates",e=e)}async function openAppStore(e,t=defaultBaseUrl){return await commandsGET("apps open appstore app='"+e+"'",t=t)}async function disableApp(e,t=defaultBaseUrl){return await commandsGET("apps disable app='"+e+"'",t=t)}async function enableApp(e,t=defaultBaseUrl){return await commandsGET("apps enable app='"+e+"'",t=t)}async function getFilterList(e=defaultBaseUrl){commandsPOST("filter list",e=e).then(e=>{console.log("Filter list: "+JSON.stringify(JSON.parse(e).data))})}async function analyzeNetwork(e=!1,t=defaultBaseUrl){commandsPOST("analyzer analyze directed="+e,t=t).then(e=>{console.log("Analyze network: "+JSON.stringify(JSON.parse(e).data))})}async function getNetworkViews(e=null,t=defaultBaseUrl){let a=cyrestGET("networks/"+await getNetworkSuid(e,t)+"/views",t);a.then(e=>{console.log("Network views suid: "+e)});return a}async function fitContent(e=!1,t=null,a=defaultBaseUrl){let n=await getNetworkViewsSuid(t,a);commandsPOST(1==e?"view fit selected view=SUID:"+n:"view fit content view=SUID:"+n,a)}async function setCurrentView(e=null,t=defaultBaseUrl){commandsPOST('view set current view=SUID:"'+await getNetworkViewsSuid(e,t)+'"',t=t)}async function openSession(e=null,t=defaultBaseUrl){let a="file";null===e?e="./sampleData/sessions/Yeast Perturbation.cys":e.startsWith("http")&&(a="url");let n="session open "+a+'="'+e;if(inCyBrowser)return cybrowser.executeCyCommand(n),null;{let a=commandsPOST(n,t=t);return console.log("Opening session file at "+e),a.then(e=>{console.log("openSession: completed")}),a.then(e=>JSON.parse(e).data)}}async function closeSession(e,t=null,a=defaultBaseUrl){e&&saveSession(t,a);let n="session new";if(inCyBrowser)return cybrowser.executeCyCommand(n),null;{let e=commandsPOST(n,a=a);return console.log("Closing session"),e.then(e=>{console.log("closeSession: completed")}),e.then(e=>JSON.parse(e).data)}}async function saveSession(e=null,t=defaultBaseUrl){if(null===e)if(inCyBrowser||""==(e=cyrestGET("session/name",t=t))&&alert("Save not completed. Provide a filename the first time you save a session."),inCyBrowser)cybrowser.executeCyCommand("session save");else{let a=commandsPOST("session save",t=t);console.log("Saving session file at "+e),a.then(e=>{console.log("saveSession: completed")})}else{let a="session save as file="+e+'"';if(inCyBrowser)cybrowser.executeCyCommand(a);else{let n=commandsPOST(a,t=t);console.log("Saving session file at "+e),n.then(e=>{console.log("saveSession: completed")})}}return res}async function getVisualStyleNames(e=defaultBaseUrl){let t=await cyrestGET("apply/styles",e);return console.log(t),t}async function getCurrentStyle(e=null,t=defaultBaseUrl){let a=await getNetworkSuid(e,t),n=await getNetworkViewsSuid(a,t),s=await cyrestGET("networks/"+a+"/views/"+n+"/currentStyle",t);return console.log(s.title),s.title}async function getArrowShapes(e=defaultBaseUrl){let t=await cyrestGET("styles/visualproperties/EDGE_TARGET_ARROW_SHAPE/values",e);return console.log(t.values),t.values}async function getLineStyles(e=defaultBaseUrl){let t=await cyrestGET("styles/visualproperties/EDGE_LINE_TYPE/values",e);return console.log(t.values),t.values}async function getNodeShapes(e=defaultBaseUrl){let t=await cyrestGET("styles/visualproperties/NODE_SHAPE/values",e);return console.log(t.values),t.values}async function layoutNetwork(e=null,t=null,a=defaultBaseUrl){let n=await getNetworkSuid(t,a);if(null===e)commandsPOST('layout apply preferred networkSelected="SUID:'+n+'"',a=a);else commandsPOST("layout "+e+' network="SUID:'+n+'"',a=a)}async function getLayoutNames(e=defaultBaseUrl){let t=await cyrestGET("apply/layouts",e);return console.log(t),t}async function deleteSelectedEdges(e=null,t=defaultBaseUrl){commandsPOST("network delete edgeList=selected network=SUID:"+await getNetworkSuid(e,t)+'"',t=t)}const coreApps=["BioPAX Reader","Biomart Web Service Client","CX Support","Core Apps","CyNDEx-2","CyCL","Diffusion","FileTransfer","ID Mapper","JSON Support","Network Merge","NetworkAnalyzer","OpenCL Prefuse Layout","PSI-MI Reader","PSICQUIC Web Service Client","SBML Reader","aMatReader","copycatLayout","cyBrowser","cyChart","cyREST"];async function updateAllApps(e,t,a=defaultBaseUrl){let n=await commandsGET("apps update app=",a=a);return renderAllAppUpdates(e),checkUpdateApp(t),n}async function checkUpdateApp(e){let t=await commandsGET("apps list updates");const a=document.getElementById(e);t.includes("name")?a.disabled=!1:a.disabled=!0}function renderCurrentlyInstalledApp(e){let t=Promise.resolve(getInstalledApps());enableAppTitle="<h4>Installed Apps</h4>",t.then(t=>{array=t.replace(/(\r\n|\n|\r)/gm,"<br> <br>"),array1=array.replace(/Finished/g,""),array2=array1.replace(/name: ([^,]+),/g,'<button type="button" class="btn btn-warning" onclick="disableApp((&quot;$1&quot))" >Disable App</button> <a href="https://apps.cytoscape.org/apps/$1">$1</a>'),array3=array2.replace(/version/g,"Current Version"),array4=array3.replace(/, status/g," Status"),array5=enableAppTitle.concat(array4),document.getElementById(e).innerHTML=array5})}function renderDisabledApp(e){let t=Promise.resolve(getDisabledApps());disableAppTitle="<h4>Disabled Apps</h4>",t.then(t=>{array=t.replace(/(\r\n|\n|\r)/gm,"<br> <br>"),array1=array.replace(/Finished/g,""),array2=array1.replace(/name: ([^,]+),/g,'<button type="button" class="btn btn-success" onclick="enableApp((&quot;$1&quot))" >Enable App</button> <a href="https://apps.cytoscape.org/apps/$1">$1</a>'),array3=array2.replace(/version/g,"Current Version"),array4=array3.replace(/, status/g," Status"),array5=disableAppTitle.concat(array4),document.getElementById(e).innerHTML=array5})}function renderAllAvailableApps(e){let t=Promise.resolve(getAvailableApps());allAppTitle="<h4>All Available Apps</h4>",t.then(t=>{array=t.replace(/(\r\n|\n|\r)/gm,"<br>"),array1=array.replace(/Finished/g,""),array2=array1.replace(/name: ([^,]+),/g,'<a href="https://apps.cytoscape.org/apps/$1">$1</a>'),array3=array2.replace(/version/g," Latest Version"),array4=allAppTitle.concat(array3),document.getElementById(e).innerHTML=array4})}function renderAllAppUpdates(e){let t=Promise.resolve(getAppUpdates());updateAppTitle="<h4>Update Available Apps</h4>",t.then(t=>{array=t.replace(/(\r\n|\n|\r)/gm,"<br> <br>"),array1=array.replace(/Finished/g,""),array2=array1.replace(/name: ([^,]+),/g,'<button type="button" class="btn btn-warning">Update</button> <a href="https://apps.cytoscape.org/apps/$1">$1</a>'),array3=array2.replace(/ current version/g," Current Version"),array4=array3.replace(/, new version/g," New Version"),array5=updateAppTitle.concat(array4),document.getElementById(e).innerHTML=array5})}