import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import updateUserStage from './updateUserStage.js'

describe('updateUserStage', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on updating existing user stage', async () => {
        const user = await User.create({ email: 'al@eix.com', password: '123123123', stage: 'name-dob' })

        await updateUserStage(user.id, 'gender')

        const updatedUser = await User.findById(user.id)

        expect(updatedUser).to.exist
        expect(updatedUser.stage).to.equal('gender')
    })

    it('fails on non-existing user', () =>
        expect(
            updateUserStage('000000000000000000000000', 'gender')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on invalid stage', async () => {
        const user = await User.create({ email: 'al@eix.com', password: '123123123', stage: 'name-dob' })

        expect(() => updateUserStage(user.id, 'invalid-stage')).to.throw(ValidationError, /^invalid stage: invalid-stage$/)
    })

    after(() => db.disconnect())
})