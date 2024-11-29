import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpeers/index.js'


export default createFunctionalHandler((req, res) => {
    const { userId, params: { postId }, body: { text } } = req

    return logic.createComment(userId, postId, text).then(() => res.status(201).send())
})