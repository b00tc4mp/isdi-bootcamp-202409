import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpeers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req

    return logic.getPosts(userId).then(posts => res.json(posts))
})