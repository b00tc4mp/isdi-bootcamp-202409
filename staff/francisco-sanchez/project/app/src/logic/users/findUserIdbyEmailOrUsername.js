import { /* validate, */ errors } from 'com'

const { SystemError, NotFoundError } = errors

export default async (searchTerm) => {

    //const tokenTest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzUwMzZjMDEwNDczZjNkODA5ZTUzNTkiLCJyb2xlIjoic3RhbmRhcmQiLCJpYXQiOjE3MzQwMDE2NjcsImV4cCI6MTczNDAzMDQ2N30.3FTPCl32xe1A-1rp5haXdEHd0sOr-CB3daCoH0GyDyw'

    const headers = {
        Authorization: `Bearer ${localStorage.token}`
        //Authorization: `Bearer ${tokenTest}`
    }

    const handleResponse = async (res) => {
        if (res.ok) {
            return res.json()
        }

        const errorData = await res.json().catch(() => ({}))
        const { error, message } = errorData
        throw new (errors[error] || SystemError)(message || 'Unexpected error')
    }

    try {
        const userIdEmailResponsed = await fetch(`${import.meta.env.VITE_API_URL}/users/findbyemail/${searchTerm}`, {
            //const userIdEmailResponsed = await fetch(`http://localhost:8080/users/findbyemail/${searchTerm}`, {
            method: 'GET',
            headers
        })

        if (userIdEmailResponsed.ok) {
            return await handleResponse(userIdEmailResponsed)
        }

        const UsedIdUsernameResponsed = await fetch(`${import.meta.env.VITE_API_URL}/users/findbyusername/${searchTerm}`, {
            //const UsedIdUsernameResponsed = await fetch(`http://localhost:8080/users/findbyusername/${searchTerm}`, {
            method: 'GET',
            headers
        })

        return await handleResponse(UsedIdUsernameResponsed)

    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError('User or email not found')
        }
        throw new SystemError(error.message)
    }
}