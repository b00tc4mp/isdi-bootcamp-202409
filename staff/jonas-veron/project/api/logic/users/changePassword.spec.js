import "dotenv/config"

import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from "dat"
import { errors } from "com"

const { ValidationError, CredentialsError, NotFoundError } = errors

import changePassword from "./changePassword.js"

describe("changePassword", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => User.deleteMany())

  it("succeeds on existing user", async () => {
    const user = await User.create({
      name: "Juan",
      email: "juan@dancer.com",
      password: bcrypt.hashSync("123123123", 10),
      role: "dancer",
    })
    await changePassword(user.id, "123123123", "456456456", "456456456")

    const updatedUser = await User.findById(user.id)
    expect(bcrypt.compareSync("456456456", updatedUser.password)).to.be.true
  })

  it("fails on non-existing user", () =>
    expect(
      changePassword(
        "012345678901234567890123",
        "123123123",
        "456456456",
        "456456456"
      )
    ).to.be.rejectedWith(NotFoundError, /^user not found$/))
  debugger
  it("fails when current password is incorrect", async () => {
    const user = await User.create({
      name: "Juan",
      email: "juan@dancer.com",
      password: bcrypt.hashSync("123123123", 10),
      role: "dancer",
    })
    await expect(
      changePassword(user.id, "123222222", "456456456", "456456456")
    ).to.be.rejectedWith(CredentialsError, /^wrong credentials$/)

    const updatedUser = await User.findById(user.id)
    expect(bcrypt.compareSync("123123123", updatedUser.password)).to.be.true
  })

  it("fails when new password does not meet validation", () => {
    const user = {
      id: "012345678901234567890123",
    }
    expect(() => changePassword(user.id, "123123123", "123")).to.throw(
      ValidationError,
      /^invalid password length$/
    )
  })

  it("fails when userId is invalid", () => {
    expect(() => changePassword(true, "123123123", "456456456")).to.throw(
      ValidationError,
      /^invalid userId$/
    )
  })

  after(() => db.disconnect())
})
