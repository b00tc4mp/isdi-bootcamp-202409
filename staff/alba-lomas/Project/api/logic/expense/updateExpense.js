


import { Expense } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (expenseId, amount, type, provider) => {
    validate.id(expenseId, 'expenseId')
    validate.number(amount, 'amount')
    validate.text(type, 'type')
    validate.text(provider, 'provider')

    return Expense.findById(expenseId)
        .catch(error => { throw new SystemError(error.message) })
        .then(expense => {
            if (!expense) throw new NotFoundError('Gasto no encontrado')

            return Expense.findByIdAndUpdate(expenseId, { amount, type, provider }, { new: true, runValidators: true })
                .catch(error => { throw new SystemError(error.message) })
        })
}