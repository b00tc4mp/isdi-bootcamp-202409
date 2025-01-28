import { Router } from 'express'
import { categorySearch } from './handlers/index.js'
import { providersRoute } from './handlers/index.js'

const providersRouter = Router()

providersRouter.get('/providers', categorySearch)
providersRouter.get('/providers', providersRoute)

export default {
    categorySearch,
    providersRoute
}