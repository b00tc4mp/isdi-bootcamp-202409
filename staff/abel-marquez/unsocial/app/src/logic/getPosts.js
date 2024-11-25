import { validate, errors }  from 'com'

const { SystemError } = errors


export default () => {
   return fetch(`http://${import.meta.env.VITE_API_URL}/posts`,{
        headers: {
            'Authorization': `Bearer ${localStorage.token}`
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
            })
    })
}   

