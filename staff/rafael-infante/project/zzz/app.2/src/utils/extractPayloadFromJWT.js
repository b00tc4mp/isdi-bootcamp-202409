export default (token) => {
  const payloadB64 = token.split('.')[1]

  const payloadJSON = atob(payloadB64)

  const payload = JSON.parse(payloadJSON)

  return payload
}
