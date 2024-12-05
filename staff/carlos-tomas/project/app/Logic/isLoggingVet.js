import AsyncStorage from '@react-native-async-storage/async-storage'
import { extractPayloadFromJWT } from '../utils'

const isLoggingVet = async () => {

    try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
            return false
        }
        const roll = extractPayloadFromJWT(token)
        const role = roll.role
        if (role === 'veterinary')
            return true
        else
            return false

    } catch (error) {
        console.errror('rol no encontrado')
    }

}

export default isLoggingVet
