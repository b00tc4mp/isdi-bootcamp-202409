import axios from 'axios'
import { errors, validate } from '../com'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { SystemError } = errors

const getHistoriesPets = async (type, petId) => {
    validate.type(type)
    validate.id(petId, 'petId')

    try {

        token = await AsyncStorage.getItem('token')
        if (!token) {
            throw new SystemError('token not found')
        }

        const response = await axios.get(`http://192.168.98.176:8080/pets/history/${type}/${petId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return response.data
    } catch (error) {
        if (error.response) {
            const { data } = error.response
            throw new errors[data.error](data.message)
        } else {
            throw new SystemError(error.message)
        }
    }
}
export default getHistoriesPets