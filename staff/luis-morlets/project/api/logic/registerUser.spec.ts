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

describe('registerUser', (): void => {
    before(() => db.connect(process.env.MONGO_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {
        await registerUser('Pero Lito', 'pero@lito.com', 'perolito', '123123123', '123123123')

        const user = await User.findOne({ username: 'perolito' })

        expect(user).to.exist
        expect(user!.name).to.equal('Pero Lito')
        expect(user!.email).to.equal('pero@lito.com')
        expect(user!.username).to.equal('perolito')
        expect(bcrypt.compareSync('123123123', user!.password)).to.be.true
    })

    it('fails on user duplicity', () =>
        expect((async () => {
            await User.create({ name: 'Pero Lito', email: 'pero@lito.com', username: 'perolito', password: bcrypt.hashSync('123123123', 8) })

            await registerUser('Pero Lito', 'pero@lito.com', 'perolito', '123123123', '123123123')
        })()).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    after(() => db.disconnect())
})