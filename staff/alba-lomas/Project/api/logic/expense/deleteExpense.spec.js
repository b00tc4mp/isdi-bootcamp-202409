


import "dotenv/config"
import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Expense } from "dat"
import { errors } from "com"

const { NotFoundError, OwnershipError, SystemError } = errors

import deleteExpense from "./deleteExpense.js"

describe("deleteExpense.js", () => {
    before(() => db.connect(process.env.MONGO_URL))

    const userData = {
        role: "employee",
        name: "Alba",
        email: "alba@lomas.com",
        license: "46718412-F",
        password: "123123123",
    }

    it("succeeds for an existing user and their expense", async () => {
        const user = await User.create(userData)

        const expense = await Expense.create({
            author: user.id,
            amount: 360.90,
            type: "carne",
            provider: "carnia",
            date: new Date("2024-12-07"),
        })

        await deleteExpense(user.id, expense.id)

        const deletedExpense = await Expense.findById(expense.id)
        expect(deletedExpense).to.be.null
    })

    it("fails when the user does not exist", async () => {
        const fakeUserId = "012345678901234567890123"
        const fakeExpenseId = "012345678901234567890123"

        await expect(deleteExpense(fakeUserId, fakeExpenseId)).to.be.rejectedWith(
            NotFoundError,
            /^No se encuentra el usuario$/
        )
    })

    it("fails when the expense does not exist", async () => {
        const user = await User.create(userData)

        const fakeExpenseId = "012345678901234567890123"

        await expect(deleteExpense(user.id, fakeExpenseId)).to.be.rejectedWith(
            NotFoundError,
            /^No se encuentra el gasto$/
        )
    })

    it("fails when the expense does not belong to the user", async () => {
        const user = await User.create(userData)

        const otherUser = await User.create({
            role: "employee",
            name: "laura",
            email: "laura@cervera.com",
            license: "46928373-J",
            password: "123123123",
        })

        const expense = await Expense.create({
            author: otherUser.id,
            amount: 807.35,
            type: "pescado",
            provider: "aropesa",
            date: new Date("2024-12-10"),
        })

        await expect(deleteExpense(user.id, expense.id)).to.be.rejectedWith(
            OwnershipError,
            /^El usuario no es el autor del gasto$/
        )
    })

    afterEach(() => Promise.all([User.deleteMany(), Expense.deleteMany()]))

    after(() => db.disconnect())
})

