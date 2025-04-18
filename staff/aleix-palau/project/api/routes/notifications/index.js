import { Router } from 'express'

import { authorizationHandler } from '../helpers/index.js'
import { getUnreadNotificationsHandler, markNotificationsAsReadHandler } from './handlers/index.js'

const notificationsRouter = Router()

// Get count of unread notifications for the logged-in user
notificationsRouter.get('/unread', authorizationHandler, getUnreadNotificationsHandler)

// Mark notifications as read for a specific match
notificationsRouter.patch('/:matchId/read', authorizationHandler, markNotificationsAsReadHandler)
// Using PATCH as it's updating the 'read' status

export default notificationsRouter