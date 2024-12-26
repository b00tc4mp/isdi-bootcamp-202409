import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai
import db, { User } from 'dat'
import { errors } from 'com'

const { CredentialsError } = errors

import authenticateUser from './authenticateUser.js'

describe('authenticateUser', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => User.deleteMany())

  it('succeeds on existing user', async () => {
    await User.create({
      name: 'Alba Cete',
      email: 'alba@cete.com',
      password: bcrypt.hashSync('123123123', 10),
    })

    const user = await authenticateUser('alba@cete.com', '123123123')
    expect(user).to.exist
    expect(user.id).to.be.a.string
    expect(user.role).to.equal('caregiver')
    expect(user.id).to.have.lengthOf(24)
  })

  it('fails on non-existing user', () =>
    expect(
      (async () => {
        await authenticateUser('elber@dugo.com', '123123123')
      })()
    ).to.be.rejectedWith(CredentialsError, /^wrong credentials$/))

  after(() => db.disconnect())
})
