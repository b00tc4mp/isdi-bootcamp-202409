import { validate, errors } from 'com'

const { SystemError } = errors

export default (userId, targetUserId, username, email, name, surname1, surname2, dni, biography, country, province, city, postalCode, address1, address2, number, flat, legalName, website) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')
    validate.username(username)
    validate.email(email)
    validate.name(name)
    if (dni !== '') validate.dni(dni)
    if (surname1 !== '') validate.text(surname1, 'surname1')
    if (surname2 !== '') validate.text(surname2, 'surname2')
    if (biography !== '') validate.bio(biography)
    if (country !== '') validate.generic(country, 50, 'country')
    if (province !== '') validate.generic(province, 50, 'province')
    if (city !== '') validate.generic(city, 50, 'city')
    if (postalCode !== '') validate.generic(postalCode, 10, 'postalCode')
    if (address1 !== '') validate.generic(address1, 255, 'address1')
    if (address2 !== '') validate.generic(address2, 255, 'address2')
    if (number !== '') validate.generic(number, 3, 'number')
    if (flat !== '') validate.generic(flat, 3, 'flat')
    if (legalName !== '') validate.generic(legalName, 255, 'legalName')
    if (website !== '') validate.url(website)

    return fetch(`${import.meta.env.VITE_API_URL}/users/update/${targetUserId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, name, surname1, surname2, dni, biography, country, province, city, postalCode, address1, address2, number, flat, legalName, website })
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