import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { CredentialsError, SystemError } = errors

import authenticateUser from './authenticateUser.js'

describe('authenticateUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
            .then(() => authenticateUser('cocoloco', '123123123'))
            .then(user => {
                expect(user).to.exist
                expect(user.id).to.be.a.string
                expect(user.id).to.have.lengthOf(24)
                expect(user.role).to.equal('regular')
            })
    )

    it('fails on non-existing user', () =>
        expect(
            authenticateUser('cocoloco', '123123123')
        ).to.be.rejectedWith(CredentialsError, 'wrong credentials')
    )

    describe('fails on User.findOne error', () => {
        let findOne

        beforeEach(() => {
            findOne = User.findOne

            User.findOne = () => Promise.reject(new SystemError('system error on User.findOne'))
        })

        it('fails on User.findOne error', () =>
            expect(
                authenticateUser('cocoloco', '123456')
            ).to.be.rejectedWith(SystemError, /^system error on User.findOne$/)
        )
        afterEach(() => User.findOne = findOne)
    })

    after(() => db.disconnect())
})
