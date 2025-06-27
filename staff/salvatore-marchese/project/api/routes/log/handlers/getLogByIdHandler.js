import logic from '../../../logic/index.js'
import { createFunctionalHandler } from "../../helpers/index.js"

export default createFunctionalHandler(async (req, res) => {
    const { userId, params: { logbookId }} = req

     const log = await logic.getLog(userId, logbookId)
     
     return res.json(log);

});
