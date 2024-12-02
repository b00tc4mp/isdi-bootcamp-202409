import AsyncStorage from '@react-native-async-storage/async-storage'
import { validate, errors } from '../com'
import axios from 'axios'


const { SystemError } = errors

export default async (username, password) => {
    validate.username(username)
    validate.password(password)


    try {
        const response = await axios.post('http://192.168.1.107:8080/users/auth', {
            username,
            password

        })
        const { data } = response;
        if (data && data.token) {
            await AsyncStorage.setItem('token', data.token) // Usamos AsyncStorage para almacenar el token
            return
        }

        throw new SystemError('Token not found in the response')
    } catch (error) {
        if (error.response) {
            const { data } = error.response;
            throw new errors[data.error](data.message);
        } else {
            throw new SystemError(error.message);

        }
    }
}