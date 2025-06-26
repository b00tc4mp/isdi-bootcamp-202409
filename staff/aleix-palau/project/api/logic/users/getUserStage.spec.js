import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import getUserStage from './getUserStage.js'
import { errors } from 'com'

const { NotFoundError } = errors

describe('getUserStage', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    const mockUserData = {
        password: '123123123',
        coordinates: { type: 'Point', coordinates: [0, 0] }
    }

    it('succeeds on existing user with default stage', async () => {
        const user = await User.create({ ...mockUserData, email: 'al@eix.com' })

        const stage = await getUserStage(user.id)

        expect(stage).to.equal('name-dob')
    })

    it('succeeds on existing user with custom stage', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            stage: 'gender',
        })

        const stage = await getUserStage(user.id)

        expect(stage).to.equal('gender')
    })

    it('fails on non-existing user', () =>
        expect(getUserStage('000000000000000000000000')).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    after(() => db.disconnect())
})