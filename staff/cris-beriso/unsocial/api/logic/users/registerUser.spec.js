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
  // before(async () => await db.connect(process.env.MONGO_URL_TEST))
  before(() => db.connect(process.env.MONGO_URL_TEST))

  // before(async() => await User.deleteMany())
  beforeEach(() => User.deleteMany())

  it('succeeds on new user', async () => {
    await registerUser('Cris Beriso', 'cris@beriso.com', 'beriso', 'criscris', 'criscris')

    const user = await User.findOne({ username: 'beriso' })

    expect(user).to.exist //.not.to.be.null
    expect(user.name).to.equal('Cris Beriso')
    expect(user.email).to.equal('cris@beriso.com')
    expect(user.username).to.equal('beriso')
    expect(bcrypt.compareSync('criscris', user.password)).to.be.true

  })

  it('fails on existing user', () =>
    expect((async () => {
      await User.create({ name: 'Cris Beriso', email: 'cris@beriso.com', username: 'beriso', password: bcrypt.hashSync('criscris', 10) })

      await registerUser('Cris Beriso', 'cris@beriso.com', 'beriso', 'criscris', 'criscris')
    })()).to.be.rejectedWith(DuplicityError, 'user already exists')
  )


  //after(async() => await db.diconnect())
  after(() => db.disconnect())
})