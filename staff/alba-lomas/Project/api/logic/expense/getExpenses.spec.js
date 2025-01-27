


import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Expense } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getExpenses from './getExpenses.js'
import addExpense from './addExpense.js'

describe('getExpenses', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Expense.deleteMany()]))  // Limpiar la base de datos antes de cada prueba

    const userData = {
        role: 'employee',
        name: 'Alba',
        email: 'alba@lomas.com',
        license: '46718412-F',
        password: '123123123',
    }

    it('succeeds for an existing user and their expenses', async () => {
        const user = await User.create(userData)

        const expenseData1 = {
            amount: 360,
            type: 'carne',
            provider: 'carnia',
            date: new Date('2024-12-07'),
        }

        const expenseData2 = {
            amount: 807,
            type: 'pescado',
            provider: 'aropesa',
            date: new Date('2024-12-08'),
        }

        await addExpense(user.id, expenseData1.amount, expenseData1.type, expenseData1.provider, expenseData1.date)
        await addExpense(user.id, expenseData2.amount, expenseData2.type, expenseData2.provider, expenseData2.date)

        const expenses = await getExpenses(user.id)

        expect(expenses).to.have.lengthOf(2)
        expect(expenses[0].amount).to.equal(expenseData2.amount)
        expect(expenses[1].amount).to.equal(expenseData1.amount)
    })

    it('fails when the user does not exist', async () => {
        const fakeUserId = '012345678901234567890123'
        await expect(getExpenses(fakeUserId)).to.be.rejectedWith(
            NotFoundError,
            /^Usuario no encontrado$/
        )
    })

    after(() => db.disconnect())
})
