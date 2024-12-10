import { validate, errors } from '../../com'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
const { SystemError } = errors

export default async function registerUser(name, email, username, password, passwordRepeat) {
    /* validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat) */

    try {
        const response = await axios.post('http://192.168.0.25:8080/users/', {
            name,
            email,
            username,
            password,
            passwordRepeat

        })

        return response.data


    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message)
        Alert.alert('Error', error.message || 'An error ocurred.')
    }
}