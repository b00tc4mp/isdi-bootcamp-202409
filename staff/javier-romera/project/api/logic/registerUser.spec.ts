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
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {
        await registerUser('Javi', 'javi@gmail.com', 'javi', '123123123', '123123123')

        const user = await User.findOne({ username: 'javi' })

        expect(user).to.exist
        expect(user!.name).to.equal('Javi')
        expect(user!.email).to.equal('javi@gmail.com')
        expect(user!.username).to.equal('javi')
        expect(bcrypt.compareSync('123123123', user!.password)).to.be.true
    })

    debugger
    it('fails on existing user', () =>
        expect((async () => {
            await User.create({ name: 'Javi', email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

            await registerUser('Javi', 'javi@gmail.com', 'javi', '123123123', '123123123')
        })()).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    after(() => db.disconnect())
})
