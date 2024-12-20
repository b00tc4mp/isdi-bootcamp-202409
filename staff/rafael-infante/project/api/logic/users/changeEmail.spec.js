import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError, ValidationError, NotFoundError, CredentialsError } = errors

import changeEmail from './changeEmail.js'

describe('changeEmail', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => User.deleteMany())
  afterEach(() => User.deleteMany())

  it('succeeds on existing user', async () => {
    const user = await User.create({
      name: 'Filo Mena',
      email: 'filo@mena.com',
      password: bcrypt.hashSync('123123123', 10),
    })

    await changeEmail(user.id, 'filo@mena.com', 'mena@filo.com', 'mena@filo.com')

    const updatedUser = await User.findById(user.id)

    expect(updatedUser.email).to.equal('mena@filo.com')
  })

  it('fails on non-existing user', () =>
    expect(
      changeEmail('6759b077a2a65d1cb279b9d3', 'filo@mena.com', 'mena@filo.com', 'mena@filo.com')
    ).to.be.rejectedWith(NotFoundError, /^user not found$/))

  after(() => db.disconnect())

  it('fails when emails do not match', () => {
    const user = { id: '012345678901234567891234' }

    expect(() => changeEmail(user.id, 'filo@mena.com', 'mena@filo.com', 'meni@fili.com')).to.throw(
      ValidationError,
      /^emails do not match$/
    )
  })

  after(() => db.disconnect())
})
