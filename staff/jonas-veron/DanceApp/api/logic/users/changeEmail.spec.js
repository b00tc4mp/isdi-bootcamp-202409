import "dotenv/config"

import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from "dat"
import { errors } from "com"

const { ValidationError, NotFoundError, CredentialsError } = errors

import changeEmail from "./changeEmail.js"

describe("changeEmail", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => User.deleteMany())

  it("succeeds on existing user", async () => {
    const user = await User.create({
      name: "Juan",
      email: "juan@dancer.com",
      password: bcrypt.hashSync("123123123", 10),
      role: "dancer",
    })
    await changeEmail(
      user.id,
      "juan@dancer.com",
      "holasoyjuan@gmail.com",
      "holasoyjuan@gmail.com"
    )

    const updatedUser = await User.findById(user.id)
    expect(updatedUser.email).to.equal("holasoyjuan@gmail.com")
  })

  it("fails on non-existing user", () =>
    expect(
      changeEmail(
        "012345678901234567890123",
        "juan@dancer.com",
        "holasoyjuan@gmail.com",
        "holasoyjuan@gmail.com"
      )
    ).to.be.rejectedWith(NotFoundError, /^user not found$/))

  it("fails when current email is incorrect", async () => {
    const user = await User.create({
      name: "Juan",
      email: "juan@dancer.com",
      password: bcrypt.hashSync("123123123", 10),
      role: "dancer",
    })
    await expect(
      changeEmail(
        user.id,
        "juan@gmail.com",
        "juan10@dance.com",
        "juan10@dance.com"
      )
    ).to.be.rejectedWith(CredentialsError, /^wrong credentials$/)
  })

  it("fails when new email does not meet validation", async () => {
    const user = { id: "012345678901234567890123" }
    expect(() =>
      changeEmail(
        user.id,
        "juan@gmail.com",
        "juan10@dance.com",
        "juan10dance.com"
      )
    ).to.throw(ValidationError, /^emails do not match$/)
  })

  it("fails when userId is invalid", () => {
    expect(() =>
      changeEmail(true, "juan10@dance.com", "juan10@dance.com")
    ).to.throw(ValidationError, /^invalid userId$/)
  })

  after(() => db.disconnect())
})
