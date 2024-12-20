import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../helpers/index.js';

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req

    const basePacks = await logic.getBasePacks(userId)

    res.status(200).json(basePacks)
})