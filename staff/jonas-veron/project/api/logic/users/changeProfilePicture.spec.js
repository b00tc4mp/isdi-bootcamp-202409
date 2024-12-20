import "dotenv/config"

import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from "dat"
import { errors } from "com"

const { ValidationError, NotFoundError } = errors

import changeProfilePicture from "./changeProfilePicture.js"

describe("changeProfilePicture", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => User.deleteMany())

  it("succeeds on existing user", async () => {
    const user = await User.create({
      name: "Juan",
      email: "juan@dancer.com",
      password: "123123123",
      role: "dancer",
    })
    await changeProfilePicture(
      user.id,
      "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg"
    )

    const updatedUser = await User.findById(user.id)

    expect(updatedUser.profilePicture).to.deep.equal(
      "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg"
    )
  })

  it("fails on non-existing user", () =>
    expect(
      changeProfilePicture(
        "012345678901234567890123",
        "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg"
      )
    ).to.be.rejectedWith(NotFoundError, /^user not found$/))

  it("fails when userId is invalid", () => {
    expect(() =>
      changeProfilePicture(
        true,
        "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg"
      )
    ).to.throw(ValidationError, /^invalid userId$/)
  })

  it("fails when image is invalid", () => {
    expect(() =>
      changeProfilePicture("012345678901234567890123", 123)
    ).to.throw(ValidationError, /^invalid image$/)
  })

  after(() => db.disconnect())
})
