async function deleteAllNetworks(baseUrl = defaultBaseUrl) {
    res = cyrestDELETE('networks', baseUrl = baseUrl);
    console.log("All networks are deleted.")
}
