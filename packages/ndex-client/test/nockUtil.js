const repeatRequest = (uri, requestBody) => {
  //console.log(JSON.stringify(requestBody));
  return [
    200,
    requestBody
    //{ header: 'value' }, // optional headers
  ]
}

module.exports = { repeatRequest };