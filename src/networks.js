export async function deleteAllNetworks(baseUrl = defaultBaseUrl) {
    let res = cyrestDELETE('networks', baseUrl = baseUrl);
    console.log("All networks are deleted.")
}
