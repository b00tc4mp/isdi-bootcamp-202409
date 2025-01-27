import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError, SystemError } = errors

import registerUser from './registerUser.js'

describe('registerUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {
        await registerUser('Coco Loco', 'coco@loco.com', 'cocoloco', '123456', '123456')

        const user = await User.findOne({ username: 'cocoloco' })

        expect(user).to.exist
        expect(user.name).to.equal('Coco Loco')
        expect(user.email).to.equal('coco@loco.com')
        expect(user.username).to.equal('cocoloco')
        expect(bcrypt.compareSync('123456', user.password)).to.be.true
    })


    it('fails on existing user', () =>
        expect((async () => {
            await User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123456' })
            await registerUser('Coco Loco', 'coco@loco.com', 'cocoloco', '123456', '123456')
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
                registerUser('Coco Loco', 'coco@loco.com', 'cocoloco', '123456', '123456')
            ).to.be.rejectedWith(SystemError, /^system error on User.create$/)
        )

        afterEach(() => User.create = create)
    })
    after(() => db.disconnect())
})