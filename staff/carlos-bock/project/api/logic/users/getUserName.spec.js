import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from '../../../dat/index.js'
import errors from '../../../com/errors.js'

const { NotFoundError } = errors

import getUserName from './getUserName.js'

describe('getUserName', () => {
    before(() => db.connect('mongodb://127.0.0.1:27017/mired-test')) //process.env.MONGO_ULR_TEST

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({
            name: 'Luis Fonci',
            email: 'fonci@pr.net',
            username: 'lfonci25',
            password: '123456789'
        })
        const name = await getUserName(user.id, user.id)

        expect(name).to.equal('Luis Fonci')
    })

    it('fails on non-existing user', () =>
        expect(
            getUserName('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on non-exiting target-user', () =>
        expect(
            User.create({
                name: 'Luis Fonci',
                email: 'fonci@pr.net',
                username: 'lfonci25',
                password: '123456789'
            })
                .then(user => getUserName(user.id, '012345678901234567890123'))
        ).to.be.rejectedWith(NotFoundError, 'target user not found')
    )

    after(() => db.disconnect())
})