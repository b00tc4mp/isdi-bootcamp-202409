import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../helpers/index.js';

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req.query; // TODO: ¿?¿?¿? Extraer userId de los query params 

    if (!userId) {
        res.status(400).json({ error: 'Bad Request', message: 'userId is required' })
        return
    }

    const basePacks = await logic.getBasePacks(userId)

    res.status(200).json(basePacks)
})