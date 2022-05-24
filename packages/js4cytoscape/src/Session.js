/*==============================================================================
 Functions for managing Cytoscape SESSIONS, including save, open and close.
------------------------------------------------------------------------------*/

/*
openSession
  Opens a session file. If no file is provided, then it opens YeastPerturbation.cys.
  CyBrowser compatible.
  
  - fileLocation = local file or URL
*/
async function openSession(fileLocation=null, baseUrl=defaultBaseUrl) {
    let type = 'file';
    if(fileLocation === null){
        fileLocation = './sampleData/sessions/Yeast Perturbation.cys';
    } else if(fileLocation.startsWith('http')){
        type = 'url';
    } 
    let cmd = 'session open ' + type + '="' + fileLocation;
    if (inCyBrowser){
        cybrowser.executeCyCommand(cmd);
        return null;
    } else {
        let res = commandsPOST(cmd, baseUrl=baseUrl);
        console.log('Opening session file at '+fileLocation);
        res.then((obj) => { console.log("openSession: completed") });
        let resData = res.then((obj) => { return JSON.parse(obj)['data'] });
        return resData;
    }
}

/*
closeSession
  Closes the current session. Can save before closing.
  CyBrowser compatible.
  
  - saveBeforeClosing = boolean. A false arg is required (not assumed) to 
  close without saving.
  - filename = name of file (only used if saving)
*/
async function closeSession(saveBeforeClosing, filename=null, baseUrl=defaultBaseUrl) {
    if(saveBeforeClosing) saveSession(filename, baseUrl);
    let cmd = 'session new';
    if (inCyBrowser){
        cybrowser.executeCyCommand(cmd);
        return null;
    } else {
        let res = commandsPOST(cmd, baseUrl=baseUrl);
        console.log('Closing session');
        res.then((obj) => { console.log("closeSession: completed") });
        let resData = res.then((obj) => { return JSON.parse(obj)['data'] });
        return resData;
    }
}

/*
saveSession
  Saves the current session. Saves as a new file if not previously saved.
  CyBrowser compatible (except for the optional cyREST check on current session name).
  
  - filename = name of file
*/
async function saveSession(filename=null, baseUrl=defaultBaseUrl) {
    if (filename === null){
        if (!inCyBrowser){ //use cyrest (if not in CyBrowser) to check name first
            filename = cyrestGET('session/name', baseUrl=baseUrl);
            if(filename=="") alert('Save not completed. Provide a filename the first time you save a session.');
        }
        if (inCyBrowser){
            let res = cybrowser.executeCyCommand('session save');
        } else {
            let res = commandsPOST('session save', baseUrl=baseUrl);
            console.log('Saving session file at '+filename);
            res.then((obj) => { console.log("saveSession: completed") });
        }
    } else {
        let cmd = 'session save as file=' + filename + '"';
        if (inCyBrowser){
            let res = cybrowser.executeCyCommand(cmd);
        } else {
            let res = commandsPOST(cmd, baseUrl=baseUrl);
            console.log('Saving session file at '+filename);
            res.then((obj) => { console.log("saveSession: completed") });
        }
    }
    return res;
}
