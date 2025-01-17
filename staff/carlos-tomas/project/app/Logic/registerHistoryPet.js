import axios from 'axios'
import { validate, errors } from '../com'
import { getToken } from '../utils'

const { SystemError } = errors

export default async (petId, type, text) => {
    validate.id(petId, 'petId')
    validate.text(text)
    validate.type(type)

    let token

    try {
        token = await getToken()
    } catch (error) {
        throw new SystemError(error.message)
    }
    let response
    try {

        response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/veterinary/registerHistory`, {
            petId,
            type,
            text
        },
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