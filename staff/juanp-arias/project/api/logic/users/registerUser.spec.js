import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'
import registerUser from './registerUser.js'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError, SystemError } = errors

describe('registerUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {
        await registerUser('Coco Loco', 'coco@loco.com', new Date('07/01/2000'), '12345678', '12345678')

        const user = await User.findOne({ email: 'coco@loco.com' })

        expect(user).to.exist
        expect(user.name).to.equal('Coco Loco')
        expect(user.email).to.equal('coco@loco.com')
        expect(bcrypt.compareSync('12345678', user.password)).to.be.true
    })

    it('fails on existing user', () =>
        expect((async () => {
            await User.create({ name: 'Coco Loco', email: 'coco@loco.com', dateOfBirth: new Date('07/01/2000'), password: '12345678' })
            await registerUser('Coco Loco', 'coco@loco.com', new Date('07/01/2000'), '12345678', '12345678')
        })()).to.be.rejectedWith(DuplicityError, 'user already exists')
    )
    describe('fails on User.create error', () => {
        let create

        beforeEach(() => {
            create = User.create

            User.create = () => Promise.reject(new SystemError('system error on User.create'))
        })

        it('fails on User.create error', () =>
            expect(
                registerUser('Coco Loco', 'coco@loco.com', new Date('07/01/2000'), '12345678', '12345678')
            ).to.be.rejectedWith(SystemError, /^system error on User.create$/)
        )

        afterEach(() => User.create = create)
    })
    after(() => db.disconnect())
})