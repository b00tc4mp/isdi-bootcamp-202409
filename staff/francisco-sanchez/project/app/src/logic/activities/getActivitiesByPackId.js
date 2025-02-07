import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (packId) => {
    //Validations
    validate.id(packId, 'packId')

    //logic and chall the api
    return fetch(`${import.meta.env.VITE_API_URL}/activities/get-activities/${packId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return res.json()
                .then(({ error, message }) => {
                    throw new errors[error](message);
                })
                .catch(error => {
                    throw new SystemError(error.message);
                });
        })
}