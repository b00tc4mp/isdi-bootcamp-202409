import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { authenticateUserHandler, registerUserHandler, getUserHandler, getUserNameHandler, getProfileHandler, updateProfileHandler } from './handlers/index.js'


const usersRouter = Router()

//Temp: Usually will be called /register
usersRouter.post('/', jsonBodyParser, registerUserHandler)

//Temp: Usually will be called /login
usersRouter.post('/auth', jsonBodyParser, authenticateUserHandler)

//Profile
//Temp: Usually will be called /profile
usersRouter.get('/personal-info', authorizationHandler, getProfileHandler)
usersRouter.put('/personal-info', authorizationHandler, updateProfileHandler)





//usersRouter.get('/:id', authorizationHandler, getUserHandler)
//usersRouter.get('/:targetUserId/name', authorizationHandler, getUserNameHandler)


export default usersRouter