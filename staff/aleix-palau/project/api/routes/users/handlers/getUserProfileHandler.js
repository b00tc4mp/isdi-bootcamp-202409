import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // extracts userId from middleware (e.g., JWT authorization)

    const profile = await logic.getUserProfile(userId)

    res.json(profile) // sends the profile as a JSON response
})