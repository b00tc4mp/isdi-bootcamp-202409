import { extractPayloadFromJWT } from '../util'

export default () => extractPayloadFromJWT (sessionStorage.token).role === 'moderator'