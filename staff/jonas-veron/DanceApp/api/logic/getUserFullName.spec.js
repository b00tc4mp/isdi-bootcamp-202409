import "dotenv/config"

import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from "dat"
import { errors } from "com"

const { NotFoundError } = errors

import getUserFullName from "./getUserFullName.js"

describe("getUserFullName", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => User.deleteMany())

  it("succeeds on existing user", async () => {
    const user = await User.create({
      fullName: "Cristian Medina",
      email: "cristian@dancer.com",
      password: "123123123",
    })

    const fullName = await getUserFullName(user.id, user.id)
    expect(fullName).to.equal("Cristian Medina")
  })

  it("fails on non-existing user", () =>
    expect(
      getUserFullName("012345678901234567890123", "012345678901234567890123")
    ).to.be.rejectedWith(NotFoundError, "user not found"))

  it("fails on non-existing target-user", () =>
    expect(
      User.create({
        fullName: "Cristian Medina",
        email: "cristian@dancer.com",
        password: "123123123",
      }).then((user) => getUserFullName(user.id, "012345678901234567890123"))
    ).to.be.rejectedWith(NotFoundError, "target user not found"))

  after(() => db.disconnect())
})
