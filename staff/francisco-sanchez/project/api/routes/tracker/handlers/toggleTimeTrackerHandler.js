import logic from "../../../logic/index.js";

import createFunctionalHandler from "../../helpers/createFunctionalHandler.js";

export default createFunctionalHandler(async (req, res) => {
    const { userId, body: { packId, customerId, description, operation } } = req

    const updatedPack = await logic.toggleTimeTracker(userId, packId, customerId, description, operation)

    res.status(201).json(updatedPack)
})