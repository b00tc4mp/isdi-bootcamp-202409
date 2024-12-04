import logic from '../../../logic/index.js'
import createFunctionalHandler from '../../helpers/createFunctionalHandler.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { recommendId } } = req

    return logic.getRecommend(userId, recommendId).then(comments => res.json(comments))
})