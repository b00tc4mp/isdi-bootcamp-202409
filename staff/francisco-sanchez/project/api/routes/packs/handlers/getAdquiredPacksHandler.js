import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../helpers/index.js';

export default createFunctionalHandler(async (req, res) => {
    //const { targetUserId } = req.params
    const { params: { targetUserId } } = req

    const packs = await logic.getAdquiredPacks(targetUserId)

    res.status(200).json(packs)
})