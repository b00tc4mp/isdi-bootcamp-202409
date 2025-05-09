import { Alert } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default async function loginUser(email, password) {
    try {
        const response = await axios.post('http://192.168.0.25:8080/users/auth', {
            email,
            password,
        })

        console.log('API Response:', response)

        const token = response.data
        console.log('Token', token)
        await AsyncStorage.setItem('token', token)
    }
    catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message)
        Alert.alert('Error', error.message || 'An error ocurred.')
    }
}
