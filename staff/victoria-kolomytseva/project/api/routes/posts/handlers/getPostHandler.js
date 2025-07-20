import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req
    const { whatHappened } = req.query;//obtener el valor de `whatHappened` desde los query params

    return logic.getPosts(userId, whatHappened).then(posts => res.json(posts))
})