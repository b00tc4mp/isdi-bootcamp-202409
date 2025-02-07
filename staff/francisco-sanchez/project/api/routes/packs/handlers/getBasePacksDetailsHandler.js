import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../helpers/index.js';

export default createFunctionalHandler(async (req, res) => {
    const { basePackId } = req.params
    const { userId } = req

    const getBasePackDetails = await logic.getBasePackDetails(userId, basePackId)

    res.status(200).json(getBasePackDetails)

})