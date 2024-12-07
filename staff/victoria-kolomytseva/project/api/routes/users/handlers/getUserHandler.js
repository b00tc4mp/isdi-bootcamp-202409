import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { params: { targetUserId } } = req

    return logic.getUserById(targetUserId).then(name => res.json(name))
})