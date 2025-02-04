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
        const user = await User.create({ name: 'Frank', email: 'frank@gmail.com', password: '123123123', role: 'diver' })

        const profile = await getProfile(user.id, user.id)

        expect(profile.id).to.equal(user.id)
        expect(profile.name).to.equal(user.name)
        expect(profile.email).to.equal(user.email)
        expect(profile.role).to.equal(user.role)
    })

    it('fails on non-exisitng user', () =>
        expect(
            getProfile('67a0a8733ef526ddff674b25', '67a0a8733ef526ddff674b25')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on non-exisitng targetUser', async () => {
         const user = await User.create({ name: 'Frank', email: 'frank@gmail.com', password: '123123123', role: 'diver' })

        return expect(
            getProfile(user.id, '67a0a8733ef526ddff674b25')
        ).to.be.rejectedWith(NotFoundError, 'target user not found')
    }
    )

    after(() => db.disconnect())
})

