import logic from '../../../logic/index.js'
import createFunctionalHandler from '../../helpers/createFunctionalHandler.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { recommendId, commentId } } = req

    return logic.removeComment(userId, recommendId, commentId).then(() => res.status(204).send())
})