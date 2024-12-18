import "dotenv/config"

import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Event, Comment } from "dat"
import { errors } from "com"

const { NotFoundError, OwnershipError, ValidationError, SystemError } = errors

import removeComment from "./removeComment.js"

describe("removeComment", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

  it("succeeds for existing user", async () => {
    const user = await User.create({
      name: "Carlos Diaz",
      email: "carlos@dancer.com",
      password: "123123123",
    })
    const comment = await Comment.create({
      author: user.id,
      text: "hello comment",
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
      comments: [comment],
    })
    await removeComment(user.id, event.id, comment.id)

    const updatedEvent = await Event.findById(event.id)
    expect(updatedEvent).to.exist
    expect(updatedEvent.comments).to.have.lengthOf(0)
  })

  it("fails on non-existing user", () =>
    expect(
      removeComment(
        "012345678901234567890123",
        "012345678901234567890123",
        "012345678901234567890123"
      )
    ).to.be.rejectedWith(NotFoundError, /^user not found$/))

  it("fails on non-existing event", () =>
    expect(
      User.create({
        name: "Carlos Diaz",
        email: "carlos@dancer.com",
        password: "123123123",
      }).then((user) =>
        removeComment(
          user.id,
          "012345678901234567890123",
          "012345678901234567890123"
        )
      )
    ).to.be.rejectedWith(NotFoundError, /^event not found$/))

  it("fails on non-existing comment", async () => {
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
    await expect(
      removeComment(user.id, event.id, "012345678901234567890123")
    ).to.be.rejectedWith(NotFoundError, /^comment not found$/)
  })

  it("fails on non-own comment", async () => {
    const user = await User.create({
      name: "Carlos Diaz",
      email: "carlos@dancer.com",
      password: "123123123",
    })
    const user2 = await User.create({
      name: "Juan Carlo",
      email: "juancito@dancer.com",
      password: "123123123",
    })
    const comment = await Comment.create({
      author: user.id,
      text: "hello comment",
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
      comments: [comment],
    })
    await expect(
      removeComment(user2.id, event.id, event.comments[0].id)
    ).to.be.rejectedWith(OwnershipError, /^user not author of comment$/)
  })
  after(() => db.disconnect())
})
