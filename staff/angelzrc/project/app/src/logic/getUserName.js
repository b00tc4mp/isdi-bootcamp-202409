import { errors } from '../../com'
import { extractPayloadFromJWT } from './util'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const { SystemError } = errors

export default async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new SystemError('No token found');
        }
        console.log(token)

        const { sub: userId } = extractPayloadFromJWT(token);
        console.log(userId)
        const response = await axios.get(`http://192.168.1.25:8080/users/${userId}/name`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Axios error handling
            const responseError = error.response?.data;
            console.log(responseError)
            if (responseError) {
                throw new errors[responseError.error](responseError.message);
            }
            throw new SystemError(error.message);
        } else {
            // Any other errors (e.g., token not found)
            throw new SystemError(error.message);
        }
    }
}