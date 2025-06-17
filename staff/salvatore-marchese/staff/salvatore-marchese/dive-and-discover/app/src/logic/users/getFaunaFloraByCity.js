import { errors } from 'com'

const { ValidationError, SystemError } = errors

export default (city) => {
    // Validate the input
    if (!city || typeof city !== 'string') {
        throw new ValidationError('City is required and must be a string')
    }

    const url = `http://${import.meta.env.VITE_API_URL}/users/diver/faunaFlora?city=${encodeURIComponent(city)}`
    const headers = {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Include token if required
    }

    // Fetch with error handler
    return fetch(url, { method: 'GET', headers })
        .catch(error => {
            throw new SystemError(error.message || 'Failed to fetch fauna and flora data')
        })
        .then(res => {
            if (res.ok) {
                return res.json().catch(error => {
                    throw new SystemError(error.message || 'Failed to parse fauna and flora data')
                })
            }

            return res.json()
                .catch(error => { throw new SystemError(error.message || 'Error fetching fauna and flora data') })
                .then(({ message }) => {
                    throw new ValidationError(message)
                })
        })
}