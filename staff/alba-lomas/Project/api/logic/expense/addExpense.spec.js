


import "dotenv/config"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Expense } from "dat"
import { errors } from "com"

const { NotFoundError } = errors

import addExpense from "./addExpense.js"

describe("addExpense.js", () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Expense.deleteMany()]))  // Limpiar la base de datos antes de cada prueba

    const userData = {
        role: "employee",
        name: "Alba",
        email: "alba@lomas.com",
        license: "46718412-F",
        password: "123123123",
    }

    it("succeeds for an existing user", async () => {
        const user = await User.create(userData)

        const amount = 360.90
        const type = "carne"
        const provider = "carnia"
        const date = new Date("2024-12-07")

        const expense = await addExpense(user.id, amount, type, provider, date)

        expect(expense).to.have.property("amount", amount)
        expect(expense).to.have.property("type", type)
        expect(expense).to.have.property("provider", provider)
        expect(expense).to.have.property("date").that.deep.equals(date)
    })

    it("fails when the user does not exist", async () => {
        const fakeUserId = "012345678901234567890123"
        const amount = 360.90
        const type = "carne"
        const provider = "carnia"
        const date = new Date("2024-12-07")

        await expect(
            addExpense(fakeUserId, amount, type, provider, date)
        ).to.be.rejectedWith(NotFoundError, /^Usuario no encontrado$/)
    })
    after(() => db.disconnect())
})