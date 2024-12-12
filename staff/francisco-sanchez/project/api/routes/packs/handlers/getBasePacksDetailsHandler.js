import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../helpers/index.js';

export default createFunctionalHandler(async (req, res) => {
    const { basePackId } = req.params

    if (!basePackId) {
        res.status(400).json({ error: 'Bad request', message: 'basePackId is required' })
        return
    }
    const getBasePackDetails = await logic.getBasePackDetails(basePackId)

    res.status(200).json(getBasePackDetails)

})