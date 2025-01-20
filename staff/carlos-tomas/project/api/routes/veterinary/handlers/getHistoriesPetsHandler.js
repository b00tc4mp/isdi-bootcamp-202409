import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'


export default createFunctionalHandler(async (req, res) => {
    const { userId, params: { type, petId } } = req

    const histories = await logic.getHistoriesPets(userId, type, petId)

    res.json(histories)

})