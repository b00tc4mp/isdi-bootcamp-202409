import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import db from './db.js'
import authenticateUser from '../logic/users/authenticateUser.js'
import { User } from '../models/models.js'

describe('authenticateUser', () => {
    before(async () => {
      await db.connect(process.env.MONGO_URL_TEST)
  
      await User.deleteMany({ email: 'test@mail.com' })
  
      const passwordHash = await bcrypt.hash('12345678910', 10)
  
      await User.create({
        name: 'Test User',
        email: 'test@mail.com',
        username: 'testuser',
        password: passwordHash
      })
    })
  
    after(async () => {
      await db.disconnect()
    })
  
    it('should log in with valid credentials', async () => {
      const result = await authenticateUser('test@mail.com', '12345678910')
      
      expect(result).to.be.an('object')
      expect(result).to.have.property('id').that.is.a('string')
      expect(result).to.have.property('role').that.is.a('string')
    })
  })