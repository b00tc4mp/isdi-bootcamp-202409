import logic from '../../../logic/index.js'
import createFunctionalHandler from '../../helpers/createFunctionalHandler.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { category } } = req


    return logic.getRecommendByCategory(userId, category)
        .then(recommend => res.json(recommend))
});
