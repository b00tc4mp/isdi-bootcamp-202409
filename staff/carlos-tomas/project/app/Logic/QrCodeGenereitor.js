import AsyncStorage from '@react-native-async-storage/async-storage'

import { extractPayloadFromJWT } from '../utils/index'
import { errors } from '../com'

const { SystemError } = errors

const QrCodeGeneraitor = async () => {

    try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
            throw new SystemError('token not found')
        }
        const paylaod = await extractPayloadFromJWT(token)
        if (!paylaod)
            throw new SystemError('Userid not found')

        return (paylaod.sub)
    } catch (error) {
        console.error('Qr not generated')
    }


}

export default QrCodeGeneraitor