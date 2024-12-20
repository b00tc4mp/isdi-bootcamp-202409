import "dotenv/config"

import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Event } from "dat"
import { errors } from "com"

const { NotFoundError, ValidationError, PermissionError } = errors

import createEvent from "./createEvent.js"

describe("createEvent", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

  it("succeeds for existing user", async () => {
    const user = await User.create({
      name: "Carlos Diaz",
      email: "carlos@dancer.com",
      role: "organizer",
      permission: "write",
      password: "123123123",
    })
    const event = await createEvent(
      user.id,
      [
        "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
      ],
      "Sociales",
      "A bailar!",
      "2025-06-07",
      {
        address: "Barcelona",
        province: "Barcelona",
        coordinates: [41.3870154, 2.1700471],
      }
    )

    const createdEvent = await Event.findOne({ author: user.id })

    expect(createdEvent).to.exist
    expect(createdEvent).to.have.property("id")
    expect(createdEvent).to.exist
    expect(createdEvent.author.toString()).to.equal(user.id)
    expect(createdEvent.images).to.deep.equal([
      "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
    ])
    expect(createdEvent.text).to.equal("A bailar!")
    expect(createdEvent.date).to.be.instanceOf(Date)
    expect(createdEvent.location.address).to.equal("Barcelona")
    expect(createdEvent.location.coordinates).to.deep.equal([
      41.3870154, 2.1700471,
    ])
  })

  it("fails on non-existing user", () =>
    expect(
      createEvent(
        "012345678901234567890123",
        [
          "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
        ],
        "Sociales",
        "A bailar!",
        "2025-06-07",
        {
          address: "Barcelona",
          province: "Barcelona",
          coordinates: [41.3870154, 2.1700471],
        }
      )
    ).to.be.rejectedWith(NotFoundError, /^user not found$/))

  it("fails on non-string user-id", () =>
    expect(() =>
      createEvent(
        "0123",
        [
          "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
        ],
        "Sociales",
        "A bailar!",
        "2025-06-07",
        {
          address: "Barcelona",
          province: "Barcelona",
          coordinates: [41.3870154, 2.1700471],
        }
      )
    ).to.throw(ValidationError, /^invalid userId length$/))

  it("fails on non-24-chars-length user-id", () =>
    expect(() =>
      createEvent(
        true,
        [
          "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
        ],
        "Sociales",
        "A bailar!",
        "2025-06-07",
        {
          address: "Barcelona",
          province: "Barcelona",
          coordinates: [41.3870154, 2.1700471],
        }
      )
    ).to.throw(ValidationError, /^invalid userId$/))

  it("fails on non-string image", () =>
    expect(() =>
      createEvent(
        "012345678901234567890123",
        true,
        "Sociales",
        "A bailar!",
        "2025-06-07",
        {
          address: "Barcelona",
          province: "Barcelona",
          coordinates: [41.3870154, 2.1700471],
        }
      )
    ).to.throw(ValidationError, /^images must be an array$/))

  it("fails on non-string text", () =>
    expect(() =>
      createEvent(
        "012345678901234567890123",
        [
          "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
        ],
        "Sociales",
        true,
        "2025-06-07",
        {
          address: "Barcelona",
          province: "Barcelona",
          coordinates: [41.3870154, 2.1700471],
        }
      )
    ).to.throw(ValidationError, /^invalid text$/))

  it("failure in permission that is not an write", async () => {
    const user = await User.create({
      name: "Carlos Diaz",
      email: "carlos@dancer.com",
      role: "organizer",
      permission: "read",
      password: "123123123",
    })
    await expect(
      createEvent(
        user.id,
        [
          "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
        ],
        "Sociales",
        "A bailar!",
        "2025-06-07",
        {
          address: "Barcelona",
          province: "Barcelona",
          coordinates: [41.3870154, 2.1700471],
        }
      )
    ).to.be.rejectedWith(
      PermissionError,
      /^user has not permission to create event$/
    )
  })

  //TODO hacer test si falla desde el servidor

  after(() => db.disconnect())
})
