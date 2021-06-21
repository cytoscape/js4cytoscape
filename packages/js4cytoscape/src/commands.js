let CYREST_BASE_URL = 'http://127.0.0.1:1234';


async function getCurrent(){
    const geturl=CYREST_BASE_URL +"/v1/networks/currentNetwork";
    let response = await fetch(geturl);
    let data = await response.json();
    console.log(data);
}
