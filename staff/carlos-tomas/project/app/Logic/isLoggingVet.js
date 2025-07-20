import { extractPayloadFromJWT } from '../utils'
import { getToken } from '../utils/index'

export default async () => {

    let token

    try {
        token = await getToken()

    } catch (error) {
        console.error('rol no encontrado')
    }

    if (!token) {
        return false
    }
    const roll = extractPayloadFromJWT(token)
    const role = roll.role
    if (role === 'veterinary')
        return true
    else
        return false
}


