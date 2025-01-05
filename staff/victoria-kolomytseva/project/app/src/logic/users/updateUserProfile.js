import { validate, errors } from 'com'

const { SystemError } = errors

export default (id, name, surname, phone, city, postalCode) => {
    validate.id(id)
    validate.name(name)
    validate.surname(surname)
    validate.phone(phone)
    validate.city(city)
    validate.postalCode(postalCode)

    return fetch(`http://${import.meta.env.VITE_API_URL}/users`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.token}` },

        body: JSON.stringify({ id, name, surname, phone, city, postalCode })
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