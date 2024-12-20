import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { taskId } } = req

    return logic.toggleTaskViewed(userId, taskId).then(() => res.status(204).send())
})