import logic from '../../../logic/index.js'
import createFunctionalHandler from '../../helpers/createFunctionalHandler.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req

    return logic.getRecommend(userId).then(posts => res.json(posts))
})