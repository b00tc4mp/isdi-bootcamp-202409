import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../../helpers/index.js'
import { getCenterInfoHandler, updateCenterInfoHandler, registerUserCenterHandler } from '../../users/center/handlers/index.js'

const centerRouter = Router()

//Temp: Usually will be called /register
centerRouter.post('/', jsonBodyParser, registerUserCenterHandler)

//Profile Center
centerRouter.get('/home-center/:targetUserId', authorizationHandler, getCenterInfoHandler )

centerRouter.get('/center-info/:targetUserId',authorizationHandler, getCenterInfoHandler )

centerRouter.get('/center-info/:id',authorizationHandler, getCenterInfoHandler )


centerRouter.put('/center-info/:targetUserId', authorizationHandler, updateCenterInfoHandler )
 

export default centerRouter;