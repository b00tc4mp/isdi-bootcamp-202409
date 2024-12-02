import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError } = errors

import registerUser from './registerUser.js'

describe('registerUser', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => User.deleteMany())

  it('succeeds on new user', async () => {
    await registerUser('Pine Apple', 'pine@apple.com', 'pineapple', 'criscris', 'criscris')

    const user = await User.findOne({ username: 'pineapple' })

    expect(user).to.exist
    expect(user.name).to.equal('Pine Apple')
    expect(user.email).to.equal('pine@apple.com')
    expect(user.username).to.equal('pineapple')
    expect(bcrypt.compareSync('criscris', user.password)).to.be.true
  })

  it('fails on existing user', () =>
    expect((async () => {
      await User.create({ name: 'Pine Apple', email: 'pine@apple.com', username: 'pineapple', password: 'criscris', password: bcrypt.hashSync('criscris', 10) })

      await registerUser('Pine Apple', 'pine@apple.com', 'pineapple', 'criscris', 'criscris')
    })()).to.be.rejectedWith(DuplicityError, 'user already exists')
  )

  after(() => db.disconnect())
})