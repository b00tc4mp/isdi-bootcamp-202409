import { extractPayload } from '../../util'

export default () => extractPayload(localStorage.token).role