import { validate, errors } from '../../../com'

const { SystemError } = errors

export default async (name, email, password, passwordRepeat, address, postcode, country, city, telephone) => {
    validate.name(name)
    validate.email(email)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)
    validate.address(address)
    validate.postcode(postcode)
    validate.country(country)
    validate.city(city)
    validate.telephone(telephone)

    return fetch(`http://${import.meta.env.VITE_API_URL}/home-center`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, 'password-repeat': passwordRepeat, address, postcode, country, city, telephone })
    })

        .catch(error => { throw new SystemError (error.message) })
        .then(res => {
            if (res.ok)
                return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => {
                throw new errors[error] (message) })
        })
}
