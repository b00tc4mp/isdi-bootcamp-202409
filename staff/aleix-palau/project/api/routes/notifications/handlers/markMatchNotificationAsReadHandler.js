import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // from JWT token
    const { notificationId } = req.params

    await logic.markMatchNotificationAsRead(userId, notificationId)

    res.status(204).send() // No content response for successful update
})