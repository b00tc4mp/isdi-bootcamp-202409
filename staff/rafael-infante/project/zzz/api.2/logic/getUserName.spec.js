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
    const user = await User.create({ name: 'Maria Perez', email: 'maria@perez.com', password: '123123123' })

    const name = await getUserName(user.id, user.id)

    expect(name).to.equal('Maria Perez')
  })

  after(() => db.disconnect())
})
