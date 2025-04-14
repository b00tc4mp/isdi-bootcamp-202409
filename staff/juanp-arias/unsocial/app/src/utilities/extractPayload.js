export default token => {
    const indexFrom = token.indexOf('.')
    const indexTo = token.lastIndexOf('.')

    const payload864 = token.slice(indexFrom + 1, indexTo)
    const payloadJSON = atob(payload864)
    const payload = JSON.parse(payloadJSON)

    return payload
}