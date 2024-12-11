import { Router } from "express";
import { jsonBodyParser, authorizationHandler } from "../../middleware/index.js";

import {
    processPaymentHandler,
    retrievePaymentHandler
} from './handlers/index.js';

const paymentsRouter = Router();

paymentsRouter.post('/intent', authorizationHandler, jsonBodyParser, processPaymentHandler);
paymentsRouter.get('/intent/:id', authorizationHandler, retrievePaymentHandler);

export default paymentsRouter;
