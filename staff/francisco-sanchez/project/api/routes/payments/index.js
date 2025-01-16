import { Router, json } from "express"

import { jsonBodyParser, authorizationHandler } from "../helpers/index.js"

import {
    addPaymentHandler,
    getPaymentsHandler,
    deletePaymentHandler
} from './handlers/index.js'

const paymentsRouter = Router()

paymentsRouter.post('/add-payment', authorizationHandler, jsonBodyParser, addPaymentHandler)
paymentsRouter.get('/get-payments/:packId', authorizationHandler, getPaymentsHandler)
paymentsRouter.delete('/delete/:paymentId', authorizationHandler, deletePaymentHandler)

export default paymentsRouter