import { errors } from 'apu'

const { SystemError } = errors

export default () => {
    const options = {
        headers: {
            'Authorization': `Bearer ${localStorage.token}`
        }
    }

    return fetch(`http://${import.meta.env.VITE_API_URL}/posts`, options)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            const { status } = res;

            if (status === 200) {
                return res.json()
            }

            return res.json()
                .then(res => {
                    const { error, message } = res

                    const constructor = errors[error]

                    throw new constructor(message)
                });
        })
}