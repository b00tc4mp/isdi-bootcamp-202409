import { Router } from 'express'

import authenticateUserHandler from '../users/handlers/authenticateUserHandler.js'
import jsonBodyParser from '../helpers/jsonBodyParser.js'



const recommendRouter = Router()




export default recommendRouter