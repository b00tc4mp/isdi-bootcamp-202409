export default token => {
    const indexFrom = token.indexOf('.')
    const indexTo = token.lastIndexOf('.')

    const payloadB64 = token.slice(indexFrom + 1, indexTo)

    const payloadJson = atob(payloadB64)

    const payload = JSON.parse(payloadJson)

    return payload
}