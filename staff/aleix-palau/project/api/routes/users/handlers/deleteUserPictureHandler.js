import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // The authorization middleware sets req.userId based on the JWT token.
    const { pictureToRemove } = req.body

    const result = await logic.deleteUserPicture(userId, pictureToRemove)

    res.json(result) // Return the updated pictures array and profile picture.
})