//export default () => sessionStorage.userId

import { extractPayloadFromJWT } from '../utils'

export default () => extractPayloadFromJWT(sessionStorage.token).sub