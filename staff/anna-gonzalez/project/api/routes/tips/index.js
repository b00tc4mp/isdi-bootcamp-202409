import { Router } from 'express'

import { authorizationHandler } from '../helpers/index.js'
import { getExerciseTipsHandler, getMusicTipsHandler, getNutritionTipsHandler, getSelfCareTipsHandler } from './handlers/index.js'

const tipsRouter = Router()

tipsRouter.get('/:cyclePhase/exerciseTips', authorizationHandler, getExerciseTipsHandler)
tipsRouter.get('/:cyclePhase/musicTips', authorizationHandler, getMusicTipsHandler)
tipsRouter.get('/:cyclePhase/nutritionTips', authorizationHandler, getNutritionTipsHandler)
tipsRouter.get('/:cyclePhase/selfCareTips', authorizationHandler, getSelfCareTipsHandler)

export default tipsRouter