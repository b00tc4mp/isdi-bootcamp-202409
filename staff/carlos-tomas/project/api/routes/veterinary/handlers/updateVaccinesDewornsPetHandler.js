import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'


export default createFunctionalHandler(async (req, res) => {
    const { userId } = req
    const { petId, vaccine, deworn } = req.body

    await logic.updateVaccinesDewornsPet(userId, petId, vaccine, deworn)

    res.status(201).send()

})