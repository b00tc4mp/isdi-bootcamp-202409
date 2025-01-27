


import { Router } from "express"
import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'
import { addExpenseHandler, getExpensesHandler, deleteExpenseHandler, updateExpenseHandler, getSumExpensesHandler } from './handlers/index.js'

const expensesRouter = Router()

expensesRouter.post('/', authorizationHandler, jsonBodyParser, addExpenseHandler)
expensesRouter.get('/', authorizationHandler, getExpensesHandler)
expensesRouter.get('/sum', authorizationHandler, getSumExpensesHandler)
expensesRouter.delete('/:expenseId', authorizationHandler, deleteExpenseHandler)
expensesRouter.put('/:expenseId', jsonBodyParser, updateExpenseHandler)

export default expensesRouter