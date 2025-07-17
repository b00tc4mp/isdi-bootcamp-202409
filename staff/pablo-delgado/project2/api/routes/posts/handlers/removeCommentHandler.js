import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { postId, commentId } } = req

    return logic.removeComment(userId, postId, commentId).then(() => res.status(204).send())
})