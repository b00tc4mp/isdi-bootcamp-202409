import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'


export default createFunctionalHandler(async (req, res) => {
    const { userId } = req
    const { petId, type, text } = req.body

    await logic.registerHistory(userId, petId, type, text)

    res.status(201).send()

})