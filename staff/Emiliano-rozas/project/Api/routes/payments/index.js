import { Router } from "express";
import { jsonBodyParser, authorizationHandler } from "../../middleware/index.js";

import {
    processPaymentHandler,

} from './handlers/index.js';

const paymentsRouter = Router();

paymentsRouter.post('/intent', authorizationHandler, jsonBodyParser, processPaymentHandler);


export default paymentsRouter;
