import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../../helpers/index.js'
import { getCenterInfoHandler, updateCenterInfoHandler, registerUserCenterHandler, addOpeningHoursHandler } from '../../users/center/handlers/index.js'

const centerRouter = Router()

//Temp: Usually will be called /register
centerRouter.post('/', jsonBodyParser, registerUserCenterHandler)

//Profile Center
centerRouter.get('/home-center', authorizationHandler, getCenterInfoHandler )
centerRouter.get('/center-info',authorizationHandler, getCenterInfoHandler )

centerRouter.get('/center-info/:id',authorizationHandler, getCenterInfoHandler )


centerRouter.put('/center-info', authorizationHandler, updateCenterInfoHandler )
 
// Opening hours
centerRouter.post('/opening-hours', authorizationHandler, addOpeningHoursHandler)

export default centerRouter;