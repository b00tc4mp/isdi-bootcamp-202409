import logic from "../../../logic/index.js";
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { packId } = req.params

    const activities = await logic.getActivityByPackId(packId)

    res.status(200).json(activities)
})