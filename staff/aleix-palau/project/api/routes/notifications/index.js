import { Router } from 'express'

import { authorizationHandler } from '../helpers/index.js'
import { getUnreadNotificationsHandler, markMessageNotificationsAsReadHandler, markMatchNotificationAsReadHandler } from './handlers/index.js'

const notificationsRouter = Router()

// Get unread notifications count for the logged-in user
notificationsRouter.get('/unread', authorizationHandler, getUnreadNotificationsHandler)

// Mark all message notifications as read for a specific match
notificationsRouter.patch('/:matchId/read', authorizationHandler, markMessageNotificationsAsReadHandler)

// Mark a specific match notification as read
notificationsRouter.patch('/match/:notificationId/read', authorizationHandler, markMatchNotificationAsReadHandler)

export default notificationsRouter