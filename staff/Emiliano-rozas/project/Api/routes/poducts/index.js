import { Router } from 'express';
import {
    getProductsHandler
} from './handlers/index.js'

const productsRouter = Router()

productsRouter.get('/', getProductsHandler)

export default productsRouter;