import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'

import registerAnonymousUser from './registerAnonymousUser.js'
import { describe } from 'mocha'

describe('registerAnonymousUser', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {
        await registerAnonymousUser()

        const user = await User.findOne()

        expect(user).to.exist
        expect(user!.role).to.equal('anonymous')
    })

    after(() => db.disconnect())
})
