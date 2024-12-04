import { Router } from 'express';
import { jsonBodyParser, authorizationHandler } from '../../middleware/index.js'
import {
    getCartHandler,
    addToCartHandler,
    removeAllFromCartHandler,
    updateQuantityHandler
} from './handlers/index.js';

const cartRouter = Router();

cartRouter.post("/add", jsonBodyParser, authorizationHandler, addToCartHandler);
cartRouter.get("/", authorizationHandler, getCartHandler);
cartRouter.delete("/remove/:cartItemId", authorizationHandler, removeAllFromCartHandler);
cartRouter.patch("/update/:cartItemId", jsonBodyParser, authorizationHandler, updateQuantityHandler);

export default cartRouter;
