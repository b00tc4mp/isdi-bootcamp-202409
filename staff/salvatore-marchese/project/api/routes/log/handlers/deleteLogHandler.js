import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler ((req, res) => {
    const { userId, params: { logbookId }} = req

    return logic.deleteLog(userId, logbookId).then(() => res.status(204).send())
    .catch(err => {
        console.error('Handler error:', err);
        res.status(500).send({ error: 'SystemError', message: err.message });
    })
}) 