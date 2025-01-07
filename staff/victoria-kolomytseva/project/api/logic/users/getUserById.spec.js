import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'
const { NotFoundError } = errors

import getUserById from './getUserById.js'

describe('getUserById', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())
    it('succeeds on existing user', async () => {
        const userCreate = await User.create({ name: 'María López', email: 'maria.lopez@example.com', password: bcrypt.hashSync('secure456', 10) })

        const user = await getUserById(userCreate._id.toString(), userCreate._id.toString())

        expect(user).to.exist
        expect(user.id).to.be.a.string
        expect(user.id).to.have.lengthOf(24)
        expect(user.role).to.equal('user')
    })

    it('fails on non-existing user', () =>
        expect((async () => {
            await getUserById('123412341234123412341234', '123412341234123412341234')
        })()).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    after(() => db.disconnect())
})
