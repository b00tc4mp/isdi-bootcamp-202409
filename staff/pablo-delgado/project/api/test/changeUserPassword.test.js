import { expect } from 'chai'
import db from './db.js'
import { User } from '../models/models.js'
import { errors } from '../../com/errors.js'
import changeUserPassword from '../logic/users/changeUserPassword.js'
import bcrypt from 'bcryptjs'

const { NotFoundError, CredentialsError } = errors

describe('changeUserPassword', () => {
  let userId

  before(async () => {
    await db.connect(process.env.MONGO_URL_TEST)

    // clean previously used user
    await User.deleteMany({ email: 'changepass@test.com' })

    // create new user w hashed password
    const hashedPassword = await bcrypt.hash('oldpassword123', 10)
    const user = await User.create({
      name: 'Password User',
      email: 'changepass@test.com',
      password: hashedPassword
    })

    userId = user._id.toString()
  })

  after(async () => {
    await User.deleteMany({ email: 'changepass@test.com' })
    await db.disconnect()
  })

  it('should change the password if the current one is correct', async () => {
    await changeUserPassword(userId, 'oldpassword123', 'newpassword456')
    const updatedUser = await User.findById(userId)

    const passwordMatch = await bcrypt.compare('newpassword456', updatedUser.password)
    expect(passwordMatch).to.be.true
  })

  it('should throw CredentialsError if the current password is incorrect', async () => {
    try {
      await changeUserPassword(userId, 'wrongpassword', 'anotherpass')
      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error).to.be.instanceOf(CredentialsError)
      expect(error.message).to.equal('Incorrect current password')
    }
  })

  it('should throw NotFoundError if the user does not exist', async () => {
    try {
      await changeUserPassword('000000000000000000000000', 'oldpassword123', 'newpass')
      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError)
      expect(error.message).to.equal('User not found')
    }
  })

  it('should throw an error if userId is invalid', async () => {
    try {
      await changeUserPassword('bad-id', 'oldpassword123', 'newpassword456')
      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error.message).to.include('userId')
    }
  })

  it('should throw an error if oldPassword is invalid', async () => {
    try {
      await changeUserPassword(userId, '', 'newpassword456')
      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error.message).to.include('oldPassword')
    }
  })

  it('should throw an error if newPassword is invalid', async () => {
    try {
      await changeUserPassword(userId, 'oldpassword123', '')
      throw new Error('Should not reach this point')
    } catch (error) {
      expect(error.message).to.include('newPassword')
    }
  })
})
