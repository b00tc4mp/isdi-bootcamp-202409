import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpeers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { postId } } = req

    return logic.deletePost(userId, postId).then(() => res.status(204).send())
})