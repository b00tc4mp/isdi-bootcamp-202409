import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'


export default createFunctionalHandler(async (req, res) => {
    const { userId } = req

    const userPets = await logic.getUserPets(userId)

    res.json(userPets)

})