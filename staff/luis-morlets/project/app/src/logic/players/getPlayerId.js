import extractPayloadFromJWT from '../../utils/extractPayloadFromJWT'

export default () => extractPayloadFromJWT(localStorage.token).sub