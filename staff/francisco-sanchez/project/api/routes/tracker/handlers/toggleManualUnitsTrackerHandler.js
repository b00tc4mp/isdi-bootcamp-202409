
import logic from "../../../logic/index.js";

import createFunctionalHandler from "../../helpers/createFunctionalHandler.js";

export default createFunctionalHandler(async (req, res) => {
    const { userId, body: { packId, customerId, description, unitsAdjust } } = req

    const updatedPack = await logic.toggleManualUnitsTracker(userId, packId, customerId, description, unitsAdjust)

    res.status(201).json(updatedPack)
})
