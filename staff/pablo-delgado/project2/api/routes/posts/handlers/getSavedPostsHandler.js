import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req

    return logic.getSavedPosts(userId)
        .then(posts => res.json(posts))
        .catch(error => {
            res.status(500).json({ error: error.name, message: error.message })
        })
})
