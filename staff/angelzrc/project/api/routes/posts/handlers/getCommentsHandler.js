import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { postId } } = req

    return logic.getComments(userId, postId).then(comments => res.json(comments))
})