import { /* validate, */ errors } from 'com'

const { SystemError } = errors

export default (basePackId) => {
    //Validates will come here

    return fetch(`${import.meta.env.VITE_API_URL}/packs/get-basepack-details/${basePackId}`, {
        method: 'GET',
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