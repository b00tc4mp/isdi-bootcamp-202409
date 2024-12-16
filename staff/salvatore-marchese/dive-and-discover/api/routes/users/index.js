import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { authenticateUserHandler, registerUserDiverHandler, getUserHandler, getUserNameHandler, getProfileHandler, updateProfileHandler, registerUserCenterHandler, addOpeningHoursHandler } from '../users/handlers/index.js'


const usersRouter = Router()


//Temp: Usually will be called /register
usersRouter.post('/diver', jsonBodyParser, registerUserDiverHandler)
usersRouter.post('/center', jsonBodyParser, registerUserCenterHandler)

//Temp: Usually will be called /login
usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)

//Profile Diver
//Temp: Usually will be called /profile
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)
usersRouter.get('/personal-info', authorizationHandler, getProfileHandler)
usersRouter.put('/:targetUserId', authorizationHandler, updateProfileHandler)

//Profile Center
usersRouter.get('/home-center', authorizationHandler, getProfileHandler )
usersRouter.post('/opening-hours', authorizationHandler, addOpeningHoursHandler)
usersRouter.get('/center-info',authorizationHandler, getProfileHandler, addOpeningHoursHandler )


//usersRouter.get('/:id', authorizationHandler, getUserHandler)



export default usersRouter