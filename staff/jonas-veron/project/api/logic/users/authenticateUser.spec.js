import "dotenv/config"

import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import bcrypt from "bcryptjs"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from "dat"
import { errors } from "com"

const { CredentialsError } = errors

import authenticateUser from "./authenticateUser.js"

describe("authenticateUser", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => User.deleteMany())
  afterEach(() => User.deleteMany())

  it("user exists", async () => {
    await User.create({
      name: "Girona Baila",
      email: "girona@baila.com",
      password: bcrypt.hashSync("123123123", 10),
      role: "dancer",
    })

    const user = await authenticateUser("girona@baila.com", "123123123")
    expect(user).to.exist
    expect(user.id).to.be.a.string
    expect(user.id).to.have.lengthOf(24)
    expect(user.role).to.equal("dancer")
  })

  it("fails on non-existing user", () =>
    expect(
      authenticateUser("girona@baila.com", "123123123")
    ).to.be.rejectedWith(CredentialsError, /^wrong credentials$/))

  it("fails on password non-match", async () => {
    await User.create({
      name: "Girona Baila",
      email: "girona@baila.com",
      password: bcrypt.hashSync("123123123", 10),
      role: "dancer",
    })

    await expect(
      authenticateUser("girona@baila.com", "122122122")
    ).to.be.rejectedWith(CredentialsError, /^wrong credentials$/)
  })

  after(() => db.disconnect())
})
