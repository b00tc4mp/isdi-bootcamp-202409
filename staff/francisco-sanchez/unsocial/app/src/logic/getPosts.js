import { errors } from 'com'

const { SystemError } = errors

export default () => {
    //Tenemos que poer el return delate del fetch para poder capturarlo desde el .then
    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {

        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`
        }
    })

        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            const { status } = res;

            if (status === 200) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
            }

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(res => {
                    const { error, message } = res
                    const constructor = errors[error]
                    throw new constructor(message)
                });
        })

}