import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getUserName from './getUserName.js'

describe('getUserName', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => User.deleteMany())

  it('succeeds on existing user', async () => {
    const user = await User.create({ name: 'Cris Beriso', email: 'cris@beriso.com', username: 'beriso', password: 'criscris' })

    const name = await getUserName(user.id, user.id)

    expect(name).to.equal('Cris Beriso')
  })

  it('fails on non-existing user', () =>
    expect(
      getUserName('012345678901234567890123', '012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, 'user not found')
  )

  it('fails on non-existing target-user', () =>
    expect(
      User.create({ name: 'Cris Beriso', email: 'cris@beriso.com', username: 'beriso', password: 'criscris' })
        .then(user => getUserName(user.id, '012345678901234567890123'))
    ).to.be.rejectedWith(NotFoundError, 'target user not found')
  )

  after(() => db.disconnect())
})