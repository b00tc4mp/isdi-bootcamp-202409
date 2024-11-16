import { extractPayload } from '../util'

export default () => extractPayload(sessionStorage.token).sub