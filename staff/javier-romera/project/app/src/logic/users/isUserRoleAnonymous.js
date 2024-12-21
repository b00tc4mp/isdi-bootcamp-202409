import { extractPayloadFromJWT } from '../../util'

export default () => {
    if (!localStorage.token) return

    return extractPayloadFromJWT(localStorage.token).role === 'anonymous'
}