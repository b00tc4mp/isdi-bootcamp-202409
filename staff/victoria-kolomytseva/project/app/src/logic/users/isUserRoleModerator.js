import { extractPayloadFromJWT } from '../../util'

export default () => extractPayloadFromJWT(localStorage.token).role === 'admin'