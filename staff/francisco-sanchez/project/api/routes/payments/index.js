import { Router, json } from "express"

import { jsonBodyParser, authorizationHandler } from "../helpers/index.js"

import {
    addPaymentHandler
} from './handlers/index.js'

const paymentsRouter = Router()

paymentsRouter.post('/add-payment', authorizationHandler, jsonBodyParser, addPaymentHandler)

export default paymentsRouter