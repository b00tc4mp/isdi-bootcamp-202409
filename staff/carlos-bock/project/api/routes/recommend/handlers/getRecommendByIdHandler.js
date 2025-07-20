import logic from '../../../logic/index.js'
import createFunctionalHandler from '../../helpers/createFunctionalHandler.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req
    const { recommendId } = req.params

    return logic.getRecommendById(userId, recommendId)
        .then(recommend => res.json(recommend))
});
