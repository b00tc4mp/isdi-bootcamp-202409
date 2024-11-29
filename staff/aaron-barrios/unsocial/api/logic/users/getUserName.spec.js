import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getUserName from './getUserName.js'

//debugger

describe('getUserName', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany()) //callback para cada test (it)

    it('succeeds on existing user', () =>
        User.create({ name: 'aaron', email: 'aaron@ar.com', username: 'aaron', password: '123' })
            .then(user => getUserName(user.id, user.id))
            .then(name => expect(name).to.equal('aaron'))
    )

    it('fails on non-existing user', () =>
        expect(
            getUserName('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on non-existing user', () =>
        expect(
            User.create({ name: 'aaron', email: 'aaron@ar.com', username: 'aaron', password: '123' })
                .then(user => getUserName(user.id, '012345678901234567890123'))
        ).to.be.rejectedWith(NotFoundError, 'target user not found')
    )

    after(() => db.disconnect())
})



