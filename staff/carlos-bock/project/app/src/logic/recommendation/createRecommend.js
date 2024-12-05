import validate from '../../../../com/validate.js'; import errors from '../../../../com/errors.js'

const { SystemError } = errors

const createRecommend = (city, country, category, price, link, imageUrl, recommend) => {
    validate.text(city); validate.text(country)
    //add validate logic for number - category     //add validate logic for number - price
    validate.image(link); validate.image(imageUrl)// update method name to be generic

    return fetch(`http://${import.meta.env.VITE_API_URL}/recommend`, { //plural? double check
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city, country, category, price, link, imageUrl, recommend })
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