import logic from '../../../logic/index.js'
import createFunctionalHandler from '../../helpers/createFunctionalHandler.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: { city, country, category, price, link, imageUrl, recommend, subject } } = req

    return logic.createRecommend(userId, city, country, category, price, link, imageUrl, recommend, subject)
        .then(() => res.status(201).send())
})