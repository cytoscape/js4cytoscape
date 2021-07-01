async function cyrestGET(t="",e="",n=defaultBaseUrl){let a=n.concat("/",t);if(""!=e){const t=e;a=a.concat("?",t)}const c=await fetch(a,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}});return await c.json()}async function cyrestDELETE(t="",e="",n=defaultBaseUrl){let a=n.concat("/",t);if(""!=e){const t=e;a=a.concat("?",t)}const c=await fetch(a,{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json"}});return await c.text()}async function cyrestPOST(t="",e="",n={},a=defaultBaseUrl){let c=a.concat("/",t);if(""!=e){const t=e;c=c.concat("?",t)}const o=JSON.stringify(n),s=await fetch(c,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:o});return await s.json()}async function cyrestPUT(t="",e="",n={},a=defaultBaseUrl){let c=a.concat("/",t);if(""!=e){const t=e;c=c.concat("?",t)}const o=JSON.stringify(n),s=await fetch(c,{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:o});return await s.json()}async function commandsGET(t,e=defaultBaseUrl){const n=command2getQuery(t,e);await fetch(n,{method:"GET",headers:{Accept:"text/plain","Content-Type":"text/plain"}}).then(t=>t.text()).then(t=>{console.log(t)})}async function commandsRun(t,e=defaultBaseUrl){commandsGET(t,e=e)}async function commandsPOST(t,e=defaultBaseUrl){const n=command2PostQueryUrl(t,e);let a=command2PostQueryBody(t);a=JSON.stringify(a);await fetch(n,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:a}).then(t=>t.text()).then(t=>{console.log(t)})}function command2getQuery(t,e=defaultBaseUrl){let n=t.replace(/\ [A-Za-z0-9_-]*=/g,"XXXXXX$&").split("XXXXXX"),a=n[0].replace(" ","/"),c=e.concat("/commands/"),o=encodeURI(c.concat(a)),s=n.slice(1).join(" "),l="",i=[],r=[];if(void 0!==s&&0!=s.length){const t=/[A-Za-z0-9_-]+=/g;i=(i=(s=s.replace(/['"]+/g,"")).match(t)).map(function(t){return t.replace(/=/g,"")});const e=/\ *[A-Za-z0-9_-]+=/g;r=s.split(e).slice(1),l=i[0]+"="+encodeURI(r[0]);for(var p=1;p<i.length;p++){l=l+"&"+(i[p]+"="+encodeURI(r[p]))}return o+"?"+l}return o}function command2PostQueryUrl(t,e=defaultBaseUrl){let n=t.replace(/\ [A-Za-z0-9_-]*=/g,"XXXXXX$&").split("XXXXXX")[0].replace(" ","/"),a=e.concat("/commands/");return encodeURI(a.concat(n))}function command2PostQueryBody(t){let e=t.replace(/\ [A-Za-z0-9_-]*=/g,"XXXXXX$&").split("XXXXXX").slice(1).join(" "),n={},a=[],c=[];if(void 0!==e&&0!=e.length){const t=/[A-Za-z0-9_-]+=/g;a=(a=(e=e.replace(/['"]+/g,"")).match(t)).map(function(t){return t.replace(/=/g,"")});const o=/\ *[A-Za-z0-9_-]+=/g;return c=e.split(o).slice(1),a.forEach((t,e)=>n[t]=c[e]),n}return n={atLeastOneArg:"required"}}async function deleteAllNetworks(t=defaultBaseUrl){cyrestDELETE("networks",t=t);console.log("All networks are deleted.")}async function cytoscapeVersionInfo(t=defaultBaseUrl){let e=cyrestGET("version",t=t);e.then(t=>{console.log("apiVersion: "+t.apiVersion)}),e.then(t=>{console.log("cytoscapeVersion: "+t.cytoscapeVersion)})}async function cytoscapeMemoryStatus(t=defaultBaseUrl){cyrestGET("","",t=t).then(t=>{console.log(t.memoryStatus)})}const defaultBaseUrl="http://127.0.0.1:1234/v1";async function getAvailableApps(t=defaultBaseUrl){commandsGET("apps list available",t=t)}async function getInstalledApps(t=defaultBaseUrl){commandsGET("apps list installed",t=t)}async function getDisabledApps(t=defaultBaseUrl){commandsGET("apps list disabled",t=t)}async function getAppUpdates(t=defaultBaseUrl){commandsGET("apps list updates",t=t)}async function openAppStore(t,e=defaultBaseUrl){commandsGET("apps open appstore app='"+t+"'",e=e)}async function getFilterList(t=defaultBaseUrl){commandsPOST("filter list",t=t)}async function analyzeNetwork(t=!1,e=defaultBaseUrl){commandsPOST("analyzer analyze directed="+t,e=e)}