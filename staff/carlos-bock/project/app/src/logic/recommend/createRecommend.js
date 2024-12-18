import validate from '../../../../com/validate.js'; import errors from '../../../../com/errors.js'

const { SystemError } = errors

const createRecommend = (city, country, category, price, link, imageUrl, recommend, subject) => {
    validate.text(city); validate.text(country)
    validate.category(category); validate.price(price)
    validate.link(link); validate.link(imageUrl)


    return fetch(`http://${import.meta.env.VITE_API_URL}/recommends`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city, country, category, price, link, imageUrl, recommend, subject })
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

export default createRecommend