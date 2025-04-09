import { validate, errors } from 'com'

const { SystemError } = errors

export default (name, nickname, password, passwordRepeat) => {
    validate.name(name)
    validate.nickname(nickname)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return fetch(`http://${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, nickname, password, 'password-repeat': passwordRepeat })
    })

        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}