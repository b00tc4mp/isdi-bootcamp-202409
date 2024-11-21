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
  before(() => db.connect(process.env.MONGO_URL))

  beforeEach(() => User.deleteMany())

  it('succeeds on new user', () =>
    registerUser('Cris Beriso', 'cris@beriso.com', 'beriso', 'criscris', 'criscris')
      .then(() => User.findOne({ username: 'beriso' }))
      .then(user => {
        expect(user).to.exist //.not.to.be.null
        expect(user.name).to.equal('Cris Beriso')
        expect(user.email).to.equal('cris@beriso.com')
        expect(user.username).to.equal('beriso')
        expect(bcrypt.compareSync('criscris', user.password)).to.be.true
      })
  )

  it('fails on existing user', () =>
    expect(
      User.create({ name: 'Cris Beriso', email: 'cris@beriso.com', username: 'beriso', password: bcrypt.hashSync('criscris', 10) })
        .then(() => registerUser('Cris Beriso', 'cris@beriso.com', 'beriso', 'criscris', 'criscris'))
    ).to.be.rejectedWith(DuplicityError, 'user already exists')
  )

  after(() => db.disconnect())
}) 