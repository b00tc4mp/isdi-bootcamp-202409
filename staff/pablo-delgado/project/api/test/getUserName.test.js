import { expect } from 'chai'
import db from './db.js'
import getUserName from '../logic/users/getUserName.js'
import { User } from '../models/models.js'
import { errors } from '../../com/errors.js'


const { NotFoundError } = errors;

describe('getUserName', () => {
  let userId
  let targetUserId

  before(async () => {
    await db.connect(process.env.MONGO_URL_TEST)

    // clean up users
    await User.deleteMany({ email: { $in: ['user1@test.com', 'user2@test.com'] } })

    // create two new users
    const user1 = await User.create({
      name: 'User One',
      email: 'user1@test.com',
      password: 'hashedpassword1'
    })

    const user2 = await User.create({
      name: 'User Two',
      email: 'user2@test.com',
      password: 'hashedpassword2'
    })

    userId = user1._id.toString()
    targetUserId = user2._id.toString()
  })

  after(async () => {
    await db.disconnect()
  })

  it('should return the name of the targetUser if both IDs are valid', async () => {
    const name = await getUserName(userId, targetUserId)
    expect(name).to.equal('User Two')
  })

  it('should throw NotFoundError if userId does not exist', async () => {
    try {
      await getUserName('000000000000000000000000', targetUserId)
      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError)
      expect(error.message).to.equal('user not found')
    }
  })

  it('should throw NotFoundError if targetUserId does not exist', async () => {
    try {
      await getUserName(userId, '000000000000000000000000')
      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError)
      expect(error.message).to.equal('target user not found')
    }
  })

  it('should throw an error if userId is invalid', async () => {
    try {
      await getUserName('invalidid', targetUserId)
      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error.message).to.include('userId')
    }
  })

  it('should throw an error if targetUserId is invalid', async () => {
    try {
      await getUserName(userId, 'invalidid')
      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error.message).to.include('targetUserId')
    }
  })
})
