import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { logbookId } } = req

    return logic.getLogs(userId, logbookId).then(logs => res.json(logs))
});