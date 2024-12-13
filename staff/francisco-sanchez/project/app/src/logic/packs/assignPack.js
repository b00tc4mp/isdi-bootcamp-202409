import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors


export default (customerSearch, selectPack) => {
    //Validates here

    return fetch(`${import.meta.env.VITE_API_URL}/packs/assign-pack`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({ customerSearch, selectPack })
    })

        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(res => {
            if (res.ok)
                return

            return res.json()
                .catch(error => {
                    throw new SystemError(error.message)
                })
                .then(({ error, message }) => {
                    throw new errors[error](message)
                })

        })

}

