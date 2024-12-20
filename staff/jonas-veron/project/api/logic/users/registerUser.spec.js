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
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => User.deleteMany())

  it("succeeds on new user", async () => {
    await registerUser(
      "Girona Baila",
      "girona@baila.com",
      "dancer",
      "123123123",
      "123123123"
    )

    const user = await User.findOne({ email: "girona@baila.com" })

    expect(user).to.exist
    expect(user.name).to.equal("Girona Baila")
    expect(user.email).to.equal("girona@baila.com")
    expect(bcrypt.compareSync("123123123", user.password)).to.be.true
  })

  it("fails on existing user", () =>
    expect(
      (async () => {
        await User.create({
          name: "Girona Baila",
          email: "girona@baila.com",
          role: "dancer",
          password: bcrypt.hashSync("123123123", 10),
        })
        await registerUser(
          "Girona Baila",
          "girona@baila.com",
          "dancer",
          "123123123",
          "123123123"
        )
      })()
    ).to.be.rejectedWith(DuplicityError, "user already exists"))

  it("fails when name is missing", () =>
    expect(
      (async () => {
        await registerUser(
          undefined,
          "girona@baila.com",
          "dancer",
          "123123123",
          "123123123"
        )
      })()
    ).to.be.rejectedWith(ValidationError, "invalid name"))

  it("fails when passwords do not match", () =>
    expect(
      (async () => {
        await registerUser(
          "Girona Baila",
          "girona@baila.com",
          "dancer",
          "123123123",
          "321321321"
        )
      })()
    ).to.be.rejectedWith(ValidationError, "passwords do not match"))

  it("fails when e-mail is invalid ", () =>
    expect(
      (async () => {
        await registerUser(
          "Girona Baila",
          "girona@baila",
          "dancer",
          "123123123",
          "123123123"
        )
      })()
    ).to.be.rejectedWith(ValidationError, "invalid e-mail"))

  after(() => db.disconnect())
})
