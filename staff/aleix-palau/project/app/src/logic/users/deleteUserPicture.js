import { validate, errors } from 'com'

const { SystemError } = errors

export default pictureToRemove => {
    validate.pictures([pictureToRemove])

    return fetch(`http://${import.meta.env.VITE_API_URL}/users/pictures`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({ pictureToRemove })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok) {
                // On success, the backend returns { pictures, profilePicture }
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
            }

            // On error, parse the JSON to see which custom error was thrown
            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}