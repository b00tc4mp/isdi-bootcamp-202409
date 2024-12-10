import { Router } from "express";
import { jsonBodyParser } from "../../middleware/index.js";

import {
    processPaymentHandler,
    retrievePaymentHandler
} from './handlers/index.js';

const paymentsRouter = Router();

paymentsRouter.post('/intent', jsonBodyParser, processPaymentHandler);
paymentsRouter.get('/intent/:id', retrievePaymentHandler);

export default paymentsRouter;
