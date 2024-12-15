import { extractPayloadFromJWT } from '../../../../util/index'

export default () => extractPayloadFromJWT(localStorage.token).sub