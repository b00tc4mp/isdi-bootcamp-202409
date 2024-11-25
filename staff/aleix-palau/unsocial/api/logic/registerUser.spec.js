import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError } = errors

import registerUser from './registerUser.js'

describe('registerUser', () => {
    // before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {
        await registerUser('Coco Loco', 'coco@loco.com', 'cocoloco', '123123123', '123123123')

        const user = await User.findOne({ username: 'cocoloco' })

        expect(user).to.exist //.not.to.be.null
        expect(user.name).to.equal('Coco Loco')
        expect(user.email).to.equal('coco@loco.com')
        expect(user.username).to.equal('cocoloco')
        expect(bcrypt.compareSync('123123123', user.password)).to.be.true
    })

    debugger
    it('fails on existing user', () =>
        expect((async () => {
            await User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: bcrypt.hashSync('123123123', 10) })

            await registerUser('Coco Loco', 'coco@loco.com', 'cocoloco', '123123123', '123123123')
        })()).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    // after(async () => await db.disconnect())
    after(() => db.disconnect())
})