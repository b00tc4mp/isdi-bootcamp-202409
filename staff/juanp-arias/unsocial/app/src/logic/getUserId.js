import { extractPayload } from '../utilities'

export default () => extractPayload(sessionStorage.token).sub