import { Router } from 'express';
import { jsonBodyParser, authorizationHandler } from '../../middleware/index.js'
import {
    getCartHandler,
    // addToCartHandler,
    // removeAllFromCartHandler,
    // updateQuantityHandler,
    updateCartHandler
} from './handlers/index.js';

const cartRouter = Router();

cartRouter.post('/updates/', authorizationHandler, jsonBodyParser, updateCartHandler);
cartRouter.get('/', authorizationHandler, getCartHandler);
// cartRouter.post('/add', authorizationHandler, jsonBodyParser, addToCartHandler);
// cartRouter.delete('/remove/:cartItemId', authorizationHandler, removeAllFromCartHandler);
// cartRouter.patch('/update/:cartItemId', authorizationHandler, jsonBodyParser, updateQuantityHandler);

export default cartRouter;
