import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError, ValidationError } = errors

import registerUser from './registerUser.js'

describe('registerUser', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => User.deleteMany())
  afterEach(() => User.deleteMany())

  it('succeds on new user', async () => {
    await registerUser('Rive Lino', 'rive@lino.com', '123123123', '123123123')

    const user = await User.findOne({ email: 'rive@lino.com' })

    expect(user).to.exist //.not.to.be.null
    expect(user.name).to.equal('Rive Lino')
    expect(user.email).to.equal('rive@lino.com')
    expect(bcrypt.compareSync('123123123', user.password)).to.be.true
  })

  it('fails on existing user', () =>
    expect(
      (async () => {
        await User.create({ name: 'Casi Miro', email: 'casi@miro.com', password: bcrypt.hashSync('123123123', 10) })

        await registerUser('Casi Miro', 'casi@miro.com', '123123123', '123123123')
      })()
    ).to.be.rejectedWith(DuplicityError, 'user already exists'))

  it('fails on existing user', () =>
    expect(
      (async () => {
        await registerUser(undefined, 'casi@miro.com', '123123123', '123123123')
      })()
    ).to.be.rejectedWith(ValidationError, 'Invalid name'))

  it('fails on existing email', () =>
    expect(
      (async () => {
        await registerUser('Seño Rito', undefined, '123123123', '123123123')
      })()
    ).to.be.rejectedWith(ValidationError, 'Invalid email'))

  it('fails when passwords do not match', () =>
    expect(
      (async () => {
        await registerUser('Seño Rito', 'seño@rito.com', '123123124', '123123123')
      })()
    ).to.be.rejectedWith(ValidationError, 'passwords do not match'))

  after(() => db.disconnect())
})
