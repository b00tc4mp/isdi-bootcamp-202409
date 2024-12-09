import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getUserStage from './getUserStage.js'

describe('getUserStage', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user with default stage', async () => {
        const user = await User.create({ email: 'al@eix.com', password: '123123123' })

        const stage = await getUserStage(user.id)

        expect(stage).to.equal('name-dob')
    })

    it('succeeds on existing user with custom stage', async () => {
        const user = await User.create({
            email: 'al@eix.com',
            password: '123123123',
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