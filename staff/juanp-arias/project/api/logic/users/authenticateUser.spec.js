import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { CredentialsError, SystemError } = errors
import authenticateUser from './authenticateUser.js'

describe('authenticateUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        await User.create({ name: 'Coco Loco', email: 'coco@loco.com', dateOfBirth: new Date('07/04/2000'), password: bcrypt.hashSync('123456', 10) })

        const user = await authenticateUser('coco@loco.com', '123456')
        expect(user).to.exist
        expect(user.id).to.be.a.string
        expect(user.id).to.have.lengthOf(24)
        expect(user.role).to.equal('student')
    })


    it('fails on non-existing user', () =>
        expect(
            authenticateUser('coco@loco.com', '123456')
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
                authenticateUser('coco@loco.com', '123456')
            ).to.be.rejectedWith(SystemError, /^system error on User.findOne$/)
        )
        afterEach(() => User.findOne = findOne)
    })

    after(() => db.disconnect())
})