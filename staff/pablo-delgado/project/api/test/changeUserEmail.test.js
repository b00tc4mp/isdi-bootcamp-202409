import { expect } from 'chai'
import db from './db.js'
import { User } from '../models/models.js'
import { errors } from '../../com/errors.js'
import changeUserEmail from '../logic/users/changeUserEmail.js'

const { NotFoundError } = errors

describe('changeUserEmail', () => {
  let userId

  before(async () => {
    await db.connect(process.env.MONGO_URL_TEST)

    await User.deleteMany({ email: { $in: ['original@test.com', 'newemail@test.com'] } })

    const user = await User.create({
      name: 'User Email Change',
      email: 'original@test.com',
      password: 'password123'
    })

    userId = user._id.toString()
  })

  after(async () => {
    await User.deleteMany({ email: { $in: ['original@test.com', 'newemail@test.com'] } })
    await db.disconnect()
  })

  it('debería cambiar el email correctamente si userId y email son válidos', async () => {
    await changeUserEmail(userId, 'newemail@test.com')
    const updatedUser = await User.findById(userId)
    expect(updatedUser.email).to.equal('newemail@test.com')
  })

  it('should throw NotFoundError if the user does not exist', async () => {
    try {
      await changeUserEmail('000000000000000000000000', 'otro@test.com')
      throw new Error('No debería llegar aquí')
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError)
      expect(error.message).to.equal('User not found')
    }
  })

  it('should throw an error if the userId is invalid', async () => {
    try {
      await changeUserEmail('id_mal', 'email@test.com')
      throw new Error('No debería llegar aquí')
    } catch (error) {
      expect(error.message).to.include('userId')
    }
  })

  it('should throw an error if the email is invalid', async () => {
    try {
      await changeUserEmail(userId, 'no-es-un-email')
      throw new Error('No debería llegar aquí')
    } catch (error) {
      expect(error.message).to.include('email')
    }
  })
})
