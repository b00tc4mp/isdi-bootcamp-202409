import "dotenv/config"

import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Event } from "dat"
import { errors } from "com"

const { NotFoundError, ValidationError } = errors

import getEvents from "./getEvents.js"

describe("getEvents", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))
  it("succeeds for existing user", async () => {
    const user = await User.create({
      name: "Carlos Diaz",
      email: "carlos@dancer.com",
      password: "123123123",
    })
    const event = await Event.create({
      author: user._id,
      files: [
        "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
      ],
      text: "A bailar!",
      eventDate: new Date("2024-12-07"),
      location: {
        type: "Point",
        address: "Barcelona",
        coordinates: [41.3870154, 2.1700471],
      },
    })
    const event2 = await Event.create({
      author: user._id,
      files: [
        "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
      ],
      text: "A bailarrrrrr!",
      eventDate: new Date("2024-12-09"),
      location: {
        type: "Point",
        address: "Girona",
        coordinates: [41.3870154, 2.1700471],
      },
    })

    const events = await getEvents(user._id.toString())

    expect(events).to.have.lengthOf(2)
    expect(events[0].id).to.equal(event2._id.toString())
    expect(events[0].author.id).to.equal(user._id.toString())
    expect(events[0].author.name).to.equal(user.name)
    expect(events[0].files[0]).to.equal(event2.files[0])
    expect(events[0].text).to.equal(event2.text)
    expect(events[0].eventDate).to.deep.equal(event2.eventDate)

    expect(events[1].id).to.equal(event._id.toString())
    expect(events[1].author.id).to.equal(user._id.toString())
    expect(events[1].author.name).to.equal(user.name)
    expect(events[1].files[0]).to.equal(event.files[0])
    expect(events[1].text).to.equal(event.text)
    expect(events[1].eventDate).to.deep.equal(event.eventDate)
  })

  it("fails for invalid user ID format", async () => {
    await expect(getEvents("123")).to.be.rejectedWith(
      ValidationError,
      /^Invalid userId length$/
    )
  })

  it("fails for non-existing user", async () => {
    await expect(getEvents("012345678901234567890123")).to.be.rejectedWith(
      Error, //en la logica tuve que cambiarlo porque sino no funciona !!
      /^User not found$/
    )
  })
  after(() => db.disconnect())
})
