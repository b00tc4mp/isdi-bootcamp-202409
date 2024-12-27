import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getUserDetails from './getUserDetails.js'

describe('getUserDetails', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ name: 'Anna', email: 'an@na.com', password: '123123123' })

        const details = await getUserDetails(user.id, user.id)

        expect(details.name).to.equal('Anna')
        expect(details.email).to.equal('an@na.com')
    })

    it('fails on non-existing user', () =>
        expect(
            getUserDetails('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, 'User not found')
    )

    after(() => db.disconnect())
})