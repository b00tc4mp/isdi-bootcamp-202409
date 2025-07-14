import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import updateUserStage from './updateUserStage.js'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

describe('updateUserStage', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    const mockUserData = {
        password: '123123123',
        coordinates: { type: 'Point', coordinates: [0, 0] }
    }

    it('succeeds on updating existing user stage', async () => {
        const user = await User.create({ ...mockUserData, email: 'al@eix.com', stage: 'name-dob' })

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
        const user = await User.create({ ...mockUserData, email: 'al@eix.com', stage: 'name-dob' })

        expect(() => updateUserStage(user.id, 'invalid-stage')).to.throw(ValidationError)
    })

    after(() => db.disconnect())
})