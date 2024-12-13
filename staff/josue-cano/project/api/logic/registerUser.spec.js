import "dotenv/config"

import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from "dat"
import { errors } from "com"

const { DuplicityError, ValidationError } = errors

import registerUser from "./registerUser.js"

describe("registerUser", () => {
  before(() => db.connect(process.env.MONGO_URL))

  beforeEach(() => User.deleteMany())
  afterEach(() => User.deleteMany())

  it("succeeds on new user", async () => {
    await registerUser(
      "josue",
      "cano",
      "josue@gmail.com",
      "675c34a750659ce09993db93",
      "123123123",
      "123123123"
    )

    const user = await User.findOne({ email: "josue@gmail.com" })

    expect(user).to.exist
    expect(user.name).to.equal("josue cano")
    expect(user.email).to.equal("josue@gmail.com")
    expect(bcrypt.compareSync("123123123", user.password)).to.be.true
  })

  it("fails on existing user", () =>
    expect(
      (async () => {
        await User.create({
          name: "josue cano",
          email: "josue@gmail.com",
          password: bcrypt.hashSync("123123123", 10),
        })
        await registerUser(
          "josue cano",
          "josue@gmail.com",
          "123123123",
          "123123123"
        )
      })()
    ).to.be.rejectedWith(DuplicityError, "User already exists"))

  it("fails when name is missing", () =>
    expect(
      (async () => {
        await registerUser(
          undefined,
          "josue@gmail.com",
          "123123123",
          "123123123"
        )
      })()
    ).to.be.rejectedWith(ValidationError, "Invalid name"))

  it("fails when passwords do not match", () =>
    expect(
      (async () => {
        await registerUser(
          "josue cano",
          "josue@gmail.com",
          "123123123",
          "321321321"
        )
      })()
    ).to.be.rejectedWith(ValidationError, "Passwords do not match"))

  it("fails when e-mail is invalid ", () =>
    expect(
      (async () => {
        await registerUser(
          "josue cano",
          "josue@gmail.com",
          "123123123",
          "123123123"
        )
      })()
    ).to.be.rejectedWith(ValidationError, "Invalid e-mail"))

  after(() => db.disconnect())
})
