


import "dotenv/config"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Expense } from "dat"
import { errors } from "com"

const { NotFoundError, SystemError } = errors

import updateExpense from "./updateExpense.js"  // Asegúrate de importar correctamente el archivo

describe("updateExpense.js", () => {
    before(() => db.connect(process.env.MONGO_URL))  // Conectarse a la base de datos

    beforeEach(() => Promise.all([User.deleteMany(), Expense.deleteMany()]))  // Limpiar la base de datos antes de cada prueba

    // Datos consistentes para todos los tests
    const userData = {
        role: "employee",
        name: "Alba",
        email: "alba@lomas.com",
        license: "46718412-F",
        password: "123123123",
    }

    it("succeeds for an existing expense", async () => {
        const user = await User.create(userData)

        // Crear un gasto inicial
        const initialExpense = await Expense.create({
            author: user.id,
            amount: 100.00,
            type: "carne",
            provider: "carnia",
            date: new Date("2024-12-07"),
        })

        const updatedAmount = 200.00
        const updatedType = "bebidas"
        const updatedProvider = "tienda"

        // Llamada a la función de actualización
        const updatedExpense = await updateExpense(
            initialExpense.id,
            updatedAmount,
            updatedType,
            updatedProvider
        )

        expect(updatedExpense).to.have.property("amount", updatedAmount)
        expect(updatedExpense).to.have.property("type", updatedType)
        expect(updatedExpense).to.have.property("provider", updatedProvider)
        expect(updatedExpense).to.have.property("date").that.deep.equals(initialExpense.date)
    })

    it("fails when the expense does not exist", async () => {
        const fakeExpenseId = "012345678901234567890123"
        const amount = 200.00
        const type = "bebidas"
        const provider = "tienda"

        await expect(
            updateExpense(fakeExpenseId, amount, type, provider)
        ).to.be.rejectedWith(NotFoundError, /^Gasto no encontrado$/)
    })

    it("fails when validation errors occur", async () => {
        const user = await User.create(userData)

        // Crear un gasto inicial
        const initialExpense = await Expense.create({
            author: user.id,
            amount: 100.00,
            type: "carne",
            provider: "carnia",
            date: new Date("2024-12-07"),
        })

        const invalidAmount = "invalid"  // Cantidad no válida (cadena en lugar de número)
        const type = "bebidas"
        const provider = "tienda"
        try {
            updateExpense(initialExpense.id, invalidAmount, type, provider)
        }catch(error){
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.be.equal("El valor debe ser un número")
        }
    })

    after(() => db.disconnect())  // Desconectar de la base de datos después de las pruebas
})
