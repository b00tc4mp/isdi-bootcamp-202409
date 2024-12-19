import { Router } from 'express'

import { authorizationHandler } from '../helpers/index.js'
import { getTipsHandler } from './handlers/index.js'

const tipsRouter = Router()

tipsRouter.get('/:cyclePhase/tips', authorizationHandler, getTipsHandler)

export default tipsRouter