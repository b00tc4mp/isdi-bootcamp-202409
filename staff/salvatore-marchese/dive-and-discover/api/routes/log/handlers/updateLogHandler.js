import logic from '../../../logic/log/updateLog.js'
import createFunctionHandler from '../../helpers/createFunctionalHandler.js'

export default createFunctionHandler  ((req, res) => {
    const { userId, params: { logbookId }} = req

    return logic.updateLog(userId, logbookId).then(() => res.status(200).send())
})