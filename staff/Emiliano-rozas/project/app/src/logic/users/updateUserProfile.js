import { validate, errors } from '../../../../com/index'

const { SystemError } = errors

export default (street, phone, city, country, postalCode) => {
    validate.street(street, 'street')
    validate.phone(phone, 'phone')
    validate.text(city, 'city')
    validate.text(country, 'country')
    validate.postalCode(postalCode, 'postalCode')

    return fetch(`http://${import.meta.env.VITE_API_URL}/users/profile`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            street,
            phone,
            city,
            country,
            postalCode
        })
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