import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError, ValidationError } = errors

import registerUserCenter from './registerUserCenter.js'

describe('registerUserCenter', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {
        await registerUserCenter('TestDiveCenter', 'divecenter@test.com', '123123123', '123123123', 'seafront road 1', 'Spain', 'Barcelona', '08001')

        const user = await User.findOne({ email: 'divecenter@test.com' })

        expect(user).to.exist
        expect(user.name).to.be.equal('TestDiveCenter')
        expect(user.email).to.be.equal('divecenter@test.com')
        expect(bcrypt.compareSync('123123123', user.password)).to.be.true
        expect(user.address).to.be.equal('seafront road 1')
        expect(user.country).to.be.equal('Spain')
        expect(user.city).to.be.equal('Barcelona')
        expect(user.postcode).to.be.equal('08001') 
    })

    
    it('fails on existing user', () => 
        expect((async () => {
            await User.create({name: 'TestDiveCenter', email: 'divecenter@test.com', password: bcrypt.hashSync('123123123', 10),address: 'seafront road 1', country: 'Spain', city: 'Barcelona', postcode: '08001'})

            await registerUserCenter('TestDiveCenter', 'divecenter@test.com', '123123123', '123123123', 'seafront road 1', 'Spain', 'Barcelona', '08001')
        })()).to.be.rejectedWith(DuplicityError, 'user already exist')
    )

    it('fails when passwords do not match', () => 
        expect((async () => {
            await registerUserCenter(
                'TestDiveCenter',
                'divecenter@test.com',
                '123123123', // password
                'wrongpassword', // passwordRepeat
                'seafront road 1', 
                'Spain', 
                'Barcelona', 
                '08001'
            )
        })()).to.be.rejectedWith(ValidationError, 'passwords do not match')
    )
    after(() => db.disconnect())
})