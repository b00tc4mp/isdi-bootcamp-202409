import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError } = errors

import registerUser from '../registerUser.js'

describe('registerUser', () => {
    // before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // beforeEach(async () => await User.deleteMany())
    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {
        await registerUser('Eddie Brook', 'eddie@brook.com', 'venom', '123123123', '123123123')

        const user = await User.findOne({ username: 'venom' })

        expect(user).to.exist //.not.to.be.null
        expect(user.name).to.equal('Eddie Brook')
        expect(user.email).to.equal('eddie@brook.com')
        expect(user.username).to.equal('venom')
        expect(bcrypt.compareSync('123123123', user.password)).to.be.true
    })


    it('fails on existing user', () =>
        expect((async () => {
            await User.create({ name: 'Eddie Brook', email: 'eddie@brook.com', username: 'venom', password: bcrypt.hashSync('123123123', 10) })

            await registerUser('Eddie Brook', 'eddie@brook.com', 'venom', '123123123', '123123123')
        })()).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    afterEach(() => User.deleteMany());
    // Nos aseguramos que se borre todo del todo todo mal
    after(() => db.disconnect())
})
