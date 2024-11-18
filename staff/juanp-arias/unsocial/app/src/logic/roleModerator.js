import { extractPayload } from '../utilities'

export default () => extractPayload(sessionStorage.token).role === 'moderator'