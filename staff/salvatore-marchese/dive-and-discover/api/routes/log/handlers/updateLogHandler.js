import logic from '../../../logic/index.js'
import createFunctionHandler from '../../helpers/createFunctionalHandler.js'

export default createFunctionHandler  ((req, res) => {
    const { userId, params: { logbookId }, body: data} = req

    return logic.updateLog(userId, logbookId, data).then(() => res.status(200).send())
})