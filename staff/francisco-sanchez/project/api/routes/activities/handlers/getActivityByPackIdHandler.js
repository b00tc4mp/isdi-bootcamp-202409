import logic from "../../../logic/index.js";
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    //const { packId } = req.params
    //const { userId, params: { packId } } = req

    const { userId } = req
    const { packId } = req.params

    const activities = await logic.getActivityByPackId(userId, packId)

    res.status(200).json(activities)
})