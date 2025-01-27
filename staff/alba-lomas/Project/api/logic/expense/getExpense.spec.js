


import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Expense } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getExpense from './getExpense.js'

describe('getExpense.js', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Expense.deleteMany()])) // Limpiar la base de datos antes de cada prueba

    const userData = {
        role: 'employee',
        name: 'Alba',
        email: 'alba@lomas.com',
        license: '46718412-F',
        password: '123123123',
    }

    it('succeeds for an existing user and their expenses', async () => {
        const user = await User.create(userData)

        const expenseData1 = await Expense.create({
            author: user.id,
            amount: 360.90,
            type: 'carne',
            provider: 'carnia',
            date: new Date('2024-12-07'),
        })

        const expenseData2 = await Expense.create({
            author: user.id,
            amount: 807.20,
            type: 'pescado',
            provider: 'aropesa',
            date: new Date('2024-12-08'),
        })

        const expense = await getExpense(user.id, expenseData1._id.toString())

        expect(expense).to.have.property('amount', expenseData1.amount)
        expect(expense).to.have.property('type', expenseData1.type)
        expect(expense).to.have.property('provider', expenseData1.provider)
        expect(expense).to.have.property('date').that.deep.equals(expenseData1.date)
        expect(expense).to.have.property('id').that.equals(expenseData1._id.toString())
        expect(expense.author.id).to.equal(user.id.toString()) // Corregido aquí
    })

    it('fails when the user does not exist', async () => {
        const fakeUserId = '676539925d31a5c9c087d241'
        const fakeExpenseId = '676539925d31a5c9c087d242'

        await expect(getExpense(fakeUserId, fakeExpenseId)).to.be.rejectedWith(
            NotFoundError,
            /^Usuario no encontrado$/
        )
    })

    it('fails when the expense does not exist', async () => {
        const user = await User.create(userData)
        const fakeExpenseId = '676539925d31a5c9c087d242'

        await expect(getExpense(user.id, fakeExpenseId)).to.be.rejectedWith(
            NotFoundError,
            /^Gasto no encontrado$/
        )
    })

    after(() => db.disconnect())
})