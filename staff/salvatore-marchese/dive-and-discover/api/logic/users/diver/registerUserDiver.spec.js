import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError, ValidationError } = errors

import registerUserDiver from './registerUserDiver.js'

describe('registerUserDiver', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {
        await registerUserDiver('salva', 'smarchese985@gmail.com', 'salva123', 'salva123')

        const user = await User.findOne({ email: 'smarchese985@gmail.com' })

        expect(user).to.exist
        expect(user.name).to.be.equal('salva')
        expect(user.email).to.be.equal('smarchese985@gmail.com')
        expect(bcrypt.compareSync('salva123', user.password)).to.be.true
    })

    it('fails on existing user', () => 
        expect((async () => {
            await User.create({ name: 'salva', email: 'smarchese985@gmail.com', password: bcrypt.hashSync('salva123', 10)})

            await registerUserDiver('salva', 'smarchese985@gmail.com', 'salva123', 'salva123')
        })()).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    it('fails when passwords do not match', async () => {
        const result = registerUserDiver('salva', 'smarchese985@gmail.com', 'salva123', 'salva122')

        await expect(result).to.be.rejectedWith(ValidationError, 'passwords do not match')
    })

    after(() => db.disconnect())
})