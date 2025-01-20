import { Router, json } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'

import { getHistoriesPetsHandler, getPetsHandlers, registerHistoryHandler, registerPetHandler, updateVaccinesDewornsPetHandler } from './handlers/index.js'

const veterinaryRouter = Router()

veterinaryRouter.get('/pets', authorizationHandler, getPetsHandlers)
veterinaryRouter.get('/pets/history/:type/:petId', authorizationHandler, jsonBodyParser, getHistoriesPetsHandler)
veterinaryRouter.post('/registerPet', authorizationHandler, jsonBodyParser, registerPetHandler)
veterinaryRouter.post('/registerHistory', authorizationHandler, jsonBodyParser, registerHistoryHandler)
veterinaryRouter.patch('/updatePet', authorizationHandler, jsonBodyParser, updateVaccinesDewornsPetHandler)

export default veterinaryRouter


