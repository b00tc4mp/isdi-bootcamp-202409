import AsyncStorage from '@react-native-async-storage/async-storage'

import { extractPayloadFromJWT } from '../utils/index'
import { errors } from '../com'

const { SystemError, NotFoundError } = errors

export default async () => {
    let token
    try {

        token = await AsyncStorage.getItem('token')
    } catch (error) {
        throw new SystemError(error.message)
    }
    if (!token) {
        throw new NotFoundError('token not found')
    }

    let paylaod

    try {
        paylaod = await extractPayloadFromJWT(token)
    } catch (error) {
        throw new SystemError(error.message)
    }
    if (!paylaod)
        throw new NotFoundError('Userid not found')

    return (paylaod.sub)
}

