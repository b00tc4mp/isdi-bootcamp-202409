import "dotenv/config"

import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Event } from "dat"
import { errors } from "com"

const { NotFoundError, OwnershipError, ValidationError, SystemError } = errors

import deleteEvent from "./deleteEvent.js"

describe("deleteEvent", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

  it("succeeds for existing user", async () => {
    const user = await User.create({
      name: "Carlos Diaz",
      email: "carlos@dancer.com",
      password: "123123123",
    })
    const event = await Event.create({
      author: user.id,
      images: [
        "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
      ],
      type: "Sociales",
      text: "A bailar!",
      date: new Date("2024-12-07"),
      location: {
        type: "Point",
        address: "Barcelona",
        province: "Barcelona",
        coordinates: [41.3870154, 2.1700471],
      },
    })
    await deleteEvent(user.id, event.id)
    const deletedEvent = await Event.findById(event.id)
    expect(deletedEvent).to.be.null

    const existingUser = await User.findById(user.id)
    expect(existingUser).to.exist
    expect(existingUser.email).to.equal("carlos@dancer.com")
  })

  it("fails on non-existing user", () =>
    expect(
      deleteEvent("012345678901234567890123", "012345678901234567890123")
    ).to.be.rejectedWith(NotFoundError, /^user not found$/))

  it("fails on non-existing event", () =>
    expect(
      User.create({
        name: "Carlos Diaz",
        email: "carlos@dancer.com",
        password: "123123123",
      }).then((user) => deleteEvent(user.id, "012345678901234567890123"))
    ).to.be.rejectedWith(NotFoundError, /^event not found$/))

  it("fails on non-own event", async () => {
    const user = await User.create({
      name: "Carlos Diaz",
      email: "carlos@dancer.com",
      password: "123123123",
    })
    const user2 = await User.create({
      name: "Juan Carlos",
      email: "juan@dancer.com",
      password: "123123123",
    })
    const event = await Event.create({
      author: user2.id,
      image:
        "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
      type: "Sociales",
      text: "A bailar!",
      date: new Date("2024-12-07"),
      location: {
        type: "Point",
        address: "Barcelona",
        province: "Barcelona",
        coordinates: [41.3870154, 2.1700471],
      },
    })
    await expect(deleteEvent(user.id, event.id)).to.be.rejectedWith(
      OwnershipError,
      /^user is not author of event$/
    )
    const existingEvent = await Event.findById(event.id)
    expect(existingEvent).to.exist
    expect(existingEvent.author.toString()).to.equal(user2.id)
  })

  after(() => db.disconnect())
})
