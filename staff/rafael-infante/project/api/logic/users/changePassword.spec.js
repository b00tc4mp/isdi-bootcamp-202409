import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError, ValidationError, NotFoundError, CredentialsError } = errors

import changePassword from './changePassword.js'

describe('changePassword', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => User.deleteMany())
  afterEach(() => User.deleteMany())

  it('succeeds on existing user', async () => {
    const user = await User.create({
      name: 'Filo Mena',
      email: 'filo@mena.com',
      password: bcrypt.hashSync('123123123', 10),
    })

    await changePassword(user.id, '123123123', '333444555', '333444555')

    const updatedUser = await User.findById(user.id)

    expect(bcrypt.compareSync('333444555', updatedUser.password)).to.be.true
  })

  it('fails on non-existing user', () =>
    expect(changePassword('6759b077a2a65d1cb279b9d3', '123123123', '222333444', '222333444')).to.be.rejectedWith(
      NotFoundError,
      /^user not found$/
    ))

  it('fails when current password is incorrect', async () => {
    const user = await User.create({
      name: 'Filo Mena',
      email: 'filo@mena.com',
      password: bcrypt.hashSync('123123123', 10),
    })

    await expect(changePassword(user.id, '123123333', '333444555', '333444555')).to.be.rejectedWith(
      CredentialsError,
      /^wrong credentials$/
    )

    const updatedUser = await User.findById(user.id)
    expect(bcrypt.compareSync('123123123', updatedUser.password)).to.be.true
  })

  after(() => db.disconnect())
})
