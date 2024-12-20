import extractPayloadFromJWT from '../../util/extractPayloadJWT.js'

const getUserId = () => extractPayloadFromJWT(localStorage.token).sub

export default getUserId