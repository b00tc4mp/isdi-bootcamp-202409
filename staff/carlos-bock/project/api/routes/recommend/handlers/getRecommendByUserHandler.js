import logic from '../../../logic/index.js'
import createFunctionalHandler from '../../helpers/createFunctionalHandler.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { targetUserId } } = req

    return logic.getRecommendByUser(userId, targetUserId).then(recommend => res.json(recommend))
})
