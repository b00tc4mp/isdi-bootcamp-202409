import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req
    const { status } = req.query;//obtener el valor de `status` desde los query params

    return logic.getPosts(userId, status).then(posts => res.json(posts))
})