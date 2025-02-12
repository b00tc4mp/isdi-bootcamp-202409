import AsyncStorage from '@react-native-async-storage/async-storage'
import { errors } from '../com'

const { SystemError, NotFoundError } = errors

export default getToken = async () => {
    let token
    try {
        token = await AsyncStorage.getItem('token')
    } catch (error) {
        throw new SystemError(error.message)
    }
    if (!token) {
        throw new NotFoundError('token not found')
    }
    return token
}


//TODO cambiar el nombre del archivo 