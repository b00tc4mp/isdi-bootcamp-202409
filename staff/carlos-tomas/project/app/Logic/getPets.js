import axios from 'axios'
import { errors } from '../com'
import { getToken } from '../utils/index'

const { SystemError } = errors

export default async () => {
    let token

    try {
        token = await getToken()
    } catch (error) {
        throw new SystemError(error.message)
    }

    let response

    try {
        response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/veterinary/pets`, {
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

