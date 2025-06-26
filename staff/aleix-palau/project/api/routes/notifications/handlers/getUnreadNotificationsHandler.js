import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // from JWT token

    const result = await logic.getUnreadNotifications(userId)

    // Returns structured response with message counts and match notifications
    res.json(result)
})