import logic from "../../../logic/index.js";

import createFunctionalHandler from "../../helpers/createFunctionalHandler.js";

export default createFunctionalHandler(async (req, res) => {
    const { userId, body: { packId, customerId, description, timeAdjust } } = req

    const updatedPack = await logic.toggleManualTimeTracker(userId, packId, customerId, description, timeAdjust)

    res.status(201).json(updatedPack)
})
