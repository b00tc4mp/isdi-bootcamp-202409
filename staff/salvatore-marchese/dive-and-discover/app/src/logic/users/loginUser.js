import { validate, errors } from 'com'

const { SystemError } = errors

export default (email, password) => {
    validate.email(email)
    validate.password(password)

    // Send a POST request to authenticate the user
    return fetch(`http://${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .catch(error => { 
            throw new SystemError(error.message) 
        })
        .then(res => {
            if (res.ok) {
                return res.json()
                    .catch(error => { 
                        throw new SystemError(error.message) 
                    })
                    .then(token => { 
                        sessionStorage.token = token // Save the token to sessionStorage
                    })
            }

            return res.json()
                .catch(error => { 
                    throw new SystemError(error.message) 
                })
                .then(({ error, message }) => { 
                    throw new errors[error](message) 
                })
        })
}