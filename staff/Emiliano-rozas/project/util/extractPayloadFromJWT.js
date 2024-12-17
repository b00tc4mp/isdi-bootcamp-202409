export default token => {
    if (!token) {
        throw new Error('Token is not defined');

    }
    const indexFrom = token.indexOf('.')
    const indexTo = token.lastIndexOf('.')

    const payloadB64 = token.slice(indexFrom + 1, indexTo)

    const payloadJSON = atob(payloadB64)

    const payload = JSON.parse(payloadJSON)

    return payload
}