import axios from 'axios'
import { errors, validate } from '../com'
import { getToken } from '../utils/index'


const { SystemError } = errors

export default async (type, petId) => {
    validate.type(type)
    validate.id(petId, 'petId')

    let token

    try {
        token = await getToken()
    } catch (error) {
        throw new SystemError(error.message)
    }

    let response

    try {
        response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/veterinary/pets/history/${type}/${petId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

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
