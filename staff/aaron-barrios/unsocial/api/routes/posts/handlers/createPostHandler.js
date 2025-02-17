import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpeers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: { text, image } } = req

    return logic.createPost(userId, text, image).then(() => res.status(201).send())
})