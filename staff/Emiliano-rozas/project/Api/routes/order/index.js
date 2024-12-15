import { Router } from "express"
import { jsonBodyParser, authorizationHandler } from "../../middleware/index.js"

import {
    getOrdersHandler,
    placeOrderHandler,
    updateOrderHandler
} from './handlers/index.js'

const orderRouter = Router()

orderRouter.post('/', authorizationHandler, placeOrderHandler)
orderRouter.get('/', authorizationHandler, getOrdersHandler)
orderRouter.patch('/update/:orderId', jsonBodyParser, authorizationHandler, updateOrderHandler);

export default orderRouter