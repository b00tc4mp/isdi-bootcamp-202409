import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Chat } from 'dat'
import { errors } from 'com'
const { ValidationError } = errors
import createChat from './createChat.js'

describe('createChat', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))
  beforeEach(() => Promise.all([Chat.deleteMany(), User.deleteMany()]))

  it('succeeds on valid chat creation', async () => {
    const owner = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "owner@test.com",
      password: "$2a$10$zg6o7Ba3Zh1rkVcN57MkgupOeg6NFxW13OYEkKZBsgZIcSlvfhp7K"
    })

    const peer = await User.create({
      firstName: "peer",
      lastName: "user",
      email: "peer@test.com",
      password: "$2a$10$zg6o7Ba3Zh1rkVcN57MkgupOeg6NFxW13OYEkKZBsgZIcSlvfhp7K"
    })

    const chatId = await createChat({
      productOwner: owner.id,
      userId: peer.id,
      message: "Hello, this is a test message"
    })

    const chat = await Chat.findById(chatId)
    expect(chat).to.exist
    expect(chat.owner.toString()).to.equal(owner.id)
    expect(chat.peer.toString()).to.equal(peer.id)
    expect(chat.messages).to.have.lengthOf(1)
    expect(chat.messages[0].text).to.equal("Hello, this is a test message")
    expect(chat.messages[0].author.toString()).to.equal(peer.id)
  })

  describe('validation', () => {
    let owner, peer

    beforeEach(async () => {
      owner = await User.create({
        firstName: "josue",
        lastName: "cano",
        email: "owner@test.com",
        password: "$2a$10$zg6o7Ba3Zh1rkVcN57MkgupOeg6NFxW13OYEkKZBsgZIcSlvfhp7K"
      })

      peer = await User.create({
        firstName: "peer",
        lastName: "user",
        email: "peer@test.com",
        password: "$2a$10$zg6o7Ba3Zh1rkVcN57MkgupOeg6NFxW13OYEkKZBsgZIcSlvfhp7K"
      })
    })

    it('fails on missing productOwner', async () => {
      await expect(createChat({
        userId: peer.id,
        message: "Test message"
      })).to.be.rejectedWith(ValidationError, 'product owner is required')
    })

    it('fails on missing userId', async () => {
      await expect(createChat({
        productOwner: owner.id,
        message: "Test message"
      })).to.be.rejectedWith(ValidationError, 'user id is required')
    })

    it('fails on missing message', async () => {
      await expect(createChat({
        productOwner: owner.id,
        userId: peer.id
      })).to.be.rejectedWith(ValidationError, 'message is required')
    })

    it('fails on empty message', async () => {
      await expect(createChat({
        productOwner: owner.id,
        userId: peer.id,
        message: ''
      })).to.be.rejectedWith(ValidationError, 'message is required')
    })

    it('fails on non-existent productOwner', async () => {
      const fakeId = '507f1f77bcf86cd799439011'
      await expect(createChat({
        productOwner: fakeId,
        userId: peer.id,
        message: 'Test message'
      })).to.be.rejectedWith(ValidationError, 'product owner not found')
    })

    it('fails on non-existent userId', async () => {
      const fakeId = '507f1f77bcf86cd799439011'
      await expect(createChat({
        productOwner: owner.id,
        userId: fakeId,
        message: 'Test message'
      })).to.be.rejectedWith(ValidationError, 'user not found')
    })
  })

  after(() => db.disconnect())
})