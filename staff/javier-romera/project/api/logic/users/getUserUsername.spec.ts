import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai
import bcrypt from 'bcryptjs'

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getUserUsername from './getUserUsername.js'

describe('getUserUsername', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        const username = await getUserUsername(user.id, user.id)

        expect(username).to.equal('javi')
    })

    it('fails on non-existing user', () =>
        expect(
            getUserUsername('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing target-user', () =>
        expect(
            User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })
                .then(user => getUserUsername(user.id, '012345678901234567890123'))
        ).to.be.rejectedWith(NotFoundError, /^target user not found$/)
    )

    after(() => db.disconnect())
})