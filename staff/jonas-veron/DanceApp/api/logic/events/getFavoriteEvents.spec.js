import "dotenv/config"

import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Event } from "dat"
import { errors } from "com"

const { NotFoundError, ValidationError } = errors

import getFavoriteEvents from "./getFavoriteEvents.js"

describe("getFavoriteEvents", () => {
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
    const event2 = await Event.create({
      author: user._id,
      images: [
        "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
      ],
      type: "Sociales",
      text: "A bailarrrrrr!",
      date: new Date("2024-12-09"),
      location: {
        type: "Point",
        address: "Girona",
        province: "Barcelona",
        coordinates: [41.3870154, 2.1700471],
      },
    })
    const user2 = await User.create({
      name: "Juan",
      email: "juan@dancer.com",
      password: "123123123",
      favorites: [event.id, event2.id],
    })
    const favoriteEvents = await getFavoriteEvents(user2.id)

    expect(favoriteEvents).to.have.lengthOf(2)
    expect(favoriteEvents[0].author.name).to.equal("Carlos Diaz")
    expect(favoriteEvents[1].author.name).to.equal("Carlos Diaz")
  })

  it("fails for invalid user ID format", async () =>
    await expect(getFavoriteEvents("123")).to.be.rejectedWith(
      ValidationError,
      /^invalid userId length$/
    ))

  it("fails for non-existing user", () => {
    getFavoriteEvents("012345678901234567890123")
      .then()
      .catch((error) => {
        expect(error.message).to.equal(/^user not found$/)
      })
  })

  after(() => db.disconnect())
})
