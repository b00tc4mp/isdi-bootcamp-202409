import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../../helpers/index.js'
import { registerUserDiverHandler, getUserNameHandler, getProfileHandler, updateProfileHandler, searchDiveCentersHandler, getFaunaFloraByCityHandler } from '../../users/diver/handlers/index.js'



const usersRouter = Router()

//Temp: Usually will be called /register
usersRouter.post('/', jsonBodyParser, registerUserDiverHandler)

//Profile Diver
//Temp: Usually will be called /profile
usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)
usersRouter.get('/profile/:targetUserId', authorizationHandler, getProfileHandler)
usersRouter.put('/profile/:targetUserId', authorizationHandler, updateProfileHandler)

// Search route
usersRouter.get('/search', authorizationHandler, searchDiveCentersHandler)

// Fauna Flora route 
usersRouter.get('/faunaFlora', authorizationHandler, getFaunaFloraByCityHandler)


export default usersRouter