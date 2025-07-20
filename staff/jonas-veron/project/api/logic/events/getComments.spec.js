import "dotenv/config"

import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Event, Comment } from "dat"
import { errors } from "com"

const { NotFoundError, ValidationError } = errors

import getComments from "./getComments.js"

describe("getComments", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

  it("succeeds for existing user", async () => {
    const user = await User.create({
      name: "Carlos Diaz",
      email: "carlos@dancer.com",
      password: "123123123",
    })
    const user2 = await User.create({
      name: "Juan Diego",
      email: "juan@dancer.com",
      password: "123123123",
    })
    const comment = await Comment.create({
      author: user.id,
      text: "hello iam Carlos",
    })
    const comment2 = await Comment.create({
      author: user2.id,
      text: "hello iam Juan",
    })
    const event = await Event.create({
      author: user._id,
      files: [
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
      comments: [comment, comment2],
    })
    const comments = await getComments(user.id, event.id)

    expect(comments).to.have.lengthOf(2)
    expect(comments[0].id).to.equal(comment.id)
    expect(comments[0].author.id).to.equal(user._id.toString())
    expect(comments[0].author.name).to.equal(user.name)
    expect(comments[0].text).to.equal("hello iam Carlos")

    expect(comments[1].id).to.equal(comment2.id)
    expect(comments[1].author.id).to.equal(user2._id.toString())
    expect(comments[1].author.name).to.equal(user2.name)
    expect(comments[1].text).to.equal("hello iam Juan")
  })

  it("fails for non-existing user", async () => {
    await expect(
      getComments("012345678901234567890123", "012345678901234567890123")
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  })

  it("fails for non-existing event", async () => {
    const user = await User.create({
      name: "Carlos Diaz",
      email: "carlos@dancer.com",
      password: "123123123",
    })
    await expect(
      getComments(user.id, "012345678901234567890123")
    ).to.be.rejectedWith(NotFoundError, /^event not found$/)
  })

  after(() => db.disconnect())
})
