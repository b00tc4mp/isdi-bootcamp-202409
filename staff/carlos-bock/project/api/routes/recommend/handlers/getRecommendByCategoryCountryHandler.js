import logic from '../../../logic/index.js'
import createFunctionalHandler from '../../helpers/createFunctionalHandler.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { category }, params: { country } } = req

    return logic.getRecommendByCategoryCountry(userId, Number(category), country)
        .then(recommend => res.json(recommend))
})
