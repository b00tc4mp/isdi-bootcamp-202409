import "dotenv/config"

import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Event } from "dat"
import { errors } from "com"

const { NotFoundError, ValidationError, SystemError } = errors

import addComment from "./addComment.js"

describe("addComment", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))
  debugger
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
      date: new Date("2025-05-07"),
      location: {
        type: "Point",
        address: "Barcelona",
        province: "Barcelona",
        coordinates: [41.3870154, 2.1700471],
      },
    })
    await addComment(user.id, event.id, "hello comment")

    const updatedEvent = await Event.findById(event._id)

    expect(updatedEvent).to.exist
    expect(updatedEvent.comments).to.have.lengthOf(1)

    const [comment] = updatedEvent.comments
    expect(comment.author.toString()).to.equal(user.id)
    expect(comment.text).to.equal("hello comment")
    expect(comment.createdAt).to.be.instanceof(Date)
  })

  it("fails on non-existing user", () =>
    expect(
      addComment(
        "012345678901234567890123",
        "012345678901234567890123",
        "hello comment"
      )
    ).to.be.rejectedWith(NotFoundError, /^user not found$/))

  it("fails on non-existing event", () =>
    expect(
      User.create({
        name: "Carlos Diaz",
        email: "carlos@dancer.com",
        password: "123123123",
      }).then((user) =>
        addComment(user.id, "012345678901234567890123", "hello comment")
      )
    ).to.be.rejectedWith(NotFoundError, /^event not found$/))

  it("fails on non-string user-id", () =>
    expect(() =>
      addComment(true, "012345678901234567890123", "hello comment")
    ).to.throw(ValidationError, /^invalid userId$/))

  after(() => db.disconnect())
})
