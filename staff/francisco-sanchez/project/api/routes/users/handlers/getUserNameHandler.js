import logic from '../../../logic/index.js'

import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { targetUserId } } = req

    return logic.getUserName(userId, targetUserId).then(name => res.json(name))
})