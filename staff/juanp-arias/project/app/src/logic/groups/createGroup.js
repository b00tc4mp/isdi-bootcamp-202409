import { validate, errors } from 'com'

const { SystemError } = errors

export default (name, students) => {
    validate.name(name)
    validate.students(students)

    return fetch(`http://${import.meta.env.VITE_API_URL}/groups`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, students })
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