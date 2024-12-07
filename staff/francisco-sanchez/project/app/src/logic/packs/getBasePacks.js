import { /* validate, */ errors } from 'com'

import getUserId from '../users/getUserId'

const { SystemError } = errors

export default () => {
    //Validates will come here

    //Get userId
    const userId = getUserId()
    console.log('The userID is: ' + userId)

    //Logic and call to the api
    return fetch(`${import.meta.env.VITE_API_URL}/packs/get-basepack?userId=${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

        .then(res => {
            if (res.ok) {
                // Si la respuesta es válida, devolvemos los datos
                return res.json();
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
        });
}
