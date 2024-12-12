import { /* validate, */ errors } from 'com'

import getUserId from './getUserId.js'

const { SystemError } = errors

export default () => {
    //Validates will come here

    //Get userId
    /*     const userId = getUserId()
        console.log('The userID is: ' + userId) */

    //Logic to call api
    return fetch(`${import.meta.env.VITE_API_URL}/users/customers/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        },
    })

        .then(res => {
            if (res.ok) {
                return res.json()
            }

            // Si la respuesta no es válida, procesamos el error
            return res.json()
                .then(({ error, message }) => {
                    throw new errors[error](message);
                })
                .catch(error => {
                    throw new SystemError(error.message);
                });
        })
        .catch(error => {
            // Manejo de errores generales
            throw new SystemError(error.message);
        })
}