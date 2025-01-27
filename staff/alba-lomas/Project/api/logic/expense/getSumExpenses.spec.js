


import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Expense } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getSumExpenses from './getSumExpenses.js'
import addExpense from './addExpense.js'

describe('getSumExpenses', () => {
    let userId // Variable para almacenar el userId creado en la prueba

    before(() => db.connect(process.env.MONGO_URL))

    beforeEach(async () => {
        // Eliminamos solo los gastos del usuario que vamos a crear
        if (userId) {
            await Expense.deleteMany({ author: userId })
        }
    })

    const userData = {
        role: 'employee',
        name: 'marta',
        email: 'marta@gomez.com',
        license: '46712012-F',
        password: '123123123',
    }

    it('succeeds for an existing user and their summed expenses by type', async () => {
        // Crear un usuario
        const user = await User.create(userData)
        userId = user.id // Guardar el userId para usarlo en las pruebas

        // Datos de gastos
        const expenseData1 = {
            amount: 360.90,
            type: 'carne',
            provider: 'carnia',
            date: new Date('2024-12-07'),
        }

        const expenseData2 = {
            amount: 807.35,
            type: 'pescado',
            provider: 'aropesa',
            date: new Date('2024-12-08'),
        }

        const expenseData3 = {
            amount: 100.00,
            type: 'carne',
            provider: 'carnia',
            date: new Date('2024-12-09'),
        }

        // Añadir los gastos
        await addExpense(user.id, ...Object.values(expenseData1))
        await addExpense(user.id, ...Object.values(expenseData2))
        await addExpense(user.id, ...Object.values(expenseData3))

        // Obtener el resumen de los gastos sumados por tipo
        const totalsByType = await getSumExpenses(user.id)

        // Verificar que los totales por tipo sean correctos
        expect(totalsByType).to.have.property('carne').that.equals(460.90)
        expect(totalsByType).to.have.property('pescado').that.equals(807.35)
    })
    it('fails when the user does not have expenses', async () => {
        const user = await User.create(userData)
        const userId = user.id // Guardar el userId para usarlo en las pruebas
        await expect(getSumExpenses(userId)).to.be.rejectedWith(
            NotFoundError,
            /^No se encontraron gastos para este usuario$/
        )
    })

    it('fails when the user does not exist', async () => {
        const fakeUserId = '012345678901234567890123'
        await expect(getSumExpenses(fakeUserId)).to.be.rejectedWith(
            NotFoundError,
            /^Usuario no encontrado$/
        )
    })

    afterEach(async () => {
        // Eliminar los gastos del usuario después de cada prueba
        if (userId) {
            await Expense.deleteMany({ author: userId })
            await User.deleteOne({ _id: userId }) // Eliminar el usuario si es necesario
        }
    })

    after(() => db.disconnect())
})
