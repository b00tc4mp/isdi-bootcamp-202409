import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import bcrypt from 'bcryptjs'
import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getUserCenter from './getUserCenter.js'

describe('getUserCenter', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeed on exisitng user', async () => {
        const user = await User.create({ name: 'TestDiveCenter', email: 'divecenter@test.com', password: bcrypt.hashSync('123123123', 10),address: 'seafront road 1', country: 'Spain', city: 'Barcelona', postcode: '08001' })

        const profile = await getUserCenter(user.id, user.id)

        expect(profile._id.toString()).to.equal(user.id)
    })

    it('fails on non-existing user', () => 
    expect(
        getUserCenter('012345678901234567890123', '012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, 'user not found')
    )
    after(() => db.disconnect())
})