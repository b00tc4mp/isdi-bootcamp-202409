


import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError, ValidationError } = errors

import registerUser from './registerUser.js'

describe('registerUser', () => {
    before(() => db.connect(process.env.MONGO_URL))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {
        await registerUser('employee', 'alba', 'alba@lomas.com', '46718412-F', '123123123', '123123123')

        const user = await User.findOne({ name: 'alba' })

        expect(user).to.exist
        expect(user.role).to.equal('employee')
        expect(user.name).to.equal('alba')
        expect(user.email).to.equal('alba@lomas.com')
        expect(user.license).to.equal('46718412-F')
        expect(bcrypt.compareSync('123123123', user.password)).to.be.true
    })

    it('fails on existing user', async () => {
        await User.create({
            name: 'alba',
            email: 'alba@lomas.com',
            license: '46718412-F', 
            password: bcrypt.hashSync('123123123', 10)
        })

        await expect(registerUser('employee', 'alba', 'alba@lomas.com', '46718412-F', '123123123', '123123123'))
            .to.be.rejectedWith(DuplicityError, 'Este usuario ya existe')
    })

    it('fails when license is missing', async () => {
        await expect(registerUser('employee', 'alba', 'alba@lomas.com', '', '123123123', '123123123'))
            .to.be.rejectedWith(ValidationError, 'Licencia inválida') 
    })

    it('fails when license format is invalid', async () => {
        await expect(registerUser('employee', 'alba', 'alba@lomas.com', 'invalid-license', '123123123', '123123123'))
            .to.be.rejectedWith(ValidationError, 'Formato de documento de identidad inválido') 
    })

    after(() => db.disconnect())
})
