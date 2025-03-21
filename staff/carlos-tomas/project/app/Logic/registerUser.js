import { validate, errors } from '../com'
import axios from 'axios'

const { SystemError } = errors

export default async (name, username, password, phone, email, passwordRepeat) => {
    validate.name(name)
    validate.username(username)
    validate.password(password)
    validate.phone(phone)
    validate.email(email)
    validate.passwordsMatch(password, passwordRepeat)

    let response
    try {
        response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/users/register`,
            {
                name,
                username,
                password,
                phone,
                email,
                passwordRepeat
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