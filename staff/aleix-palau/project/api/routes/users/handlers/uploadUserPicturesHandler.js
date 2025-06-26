import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req
    const { pictures } = req.body

    const result = await logic.uploadUserPictures(userId, pictures)

    res.json(result) // Return the updated pictures array and profile picture as JSON
})