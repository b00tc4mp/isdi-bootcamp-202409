import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getProfile from './getProfile.js'

describe('getProfile', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ name: 'TestDiveCenter2', email: 'test2@divecenter.com', password: '123123123', role: 'center'})

        const profile = await getProfile(user.id, user.id)

        expect(profile._id.toString()).to.equal(user.id)
    })

    it('fails on non-exisitng user', () => 
    expect(
        getProfile('012345678901234567890123')
    ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    after(() => db.disconnect())
})

