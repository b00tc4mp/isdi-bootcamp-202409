import { validate, errors } from 'com'
const { SystemError } = errors

export default (username, email, oldPassword, newPassword, newPasswordRepeat) => {
    validate.updateProfile(username, email, oldPassword, newPassword, newPasswordRepeat)
    username && validate.username(username)
    email && validate.email(email);
    (oldPassword || newPassword || newPasswordRepeat) && validate.passwordUpdate(oldPassword, newPassword, newPasswordRepeat)
    oldPassword && validate.password(oldPassword)
    newPassword && validate.password(newPassword)
    newPasswordRepeat && validate.password(newPasswordRepeat)

    return fetch(`http://${import.meta.env.VITE_API_URL}/users/profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({ username, email, oldPassword: oldPassword, newPassword: newPassword, newPasswordRepeat: newPasswordRepeat })
    })

        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok) return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}