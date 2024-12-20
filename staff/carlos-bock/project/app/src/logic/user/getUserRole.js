import extractPayloadFromJWT from '../../util/extractPayloadJWT.js'

const getUserRole = () => extractPayloadFromJWT(localStorage.token).role

export default getUserRole
