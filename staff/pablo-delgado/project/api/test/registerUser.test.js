import { expect } from 'chai'
import 'dotenv/config'
import db from './db.js'
import registerUser from '../logic/users/registerUser.js'
import { User } from '../models/models.js'

describe('registerUser', () => {
  before(async () => {
    await db.connect(process.env.MONGO_URL_TEST)
  })

  beforeEach(async () => {
    await User.deleteMany({}) // clean up before new one
  })

  after(async () => {
    await db.disconnect()
  })

  it('should register a user successfully with matching passwords', async () => {
    const result = await registerUser('Coco Drilo', 'coco@drilo.com', '12345678910', '12345678910')

    expect(result).to.be.a('string')  
    expect(result).to.equal('User registered successfully') 
  })

  it('should fail if passwords do not match', async () => {
    try {
      await registerUser('Jane Doe', 'jane@doe.com', 'password1', 'password2')
      throw new Error('Test should fail but passed')
    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.equal('passwords do not match')
    }
  })
})
