import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'
import db, { User } from 'dat'
import { errors } from 'com'

chai.use(chaiAsPromised)
const { expect } = chai
const { ValidationError } = errors

import createHomeCenter from './createHomeCenter.js'

describe('createHomeCenter', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => User.deleteMany()) 

    it('succeeds when all fields are valid and user does not already exist', async () => {
        const data = {
            name: 'TestHomeCenter',
            email: 'testhomecenter@test.com',
            password: '123123123',
            address: 'Seafront Road 2',
            postcode: '08001',
            city: 'Barcelona',
            country: 'Spain'
        }

        const response = await createHomeCenter(data)

        // Check the response
        expect(response.message).to.equal('Home Center created successfully!')

        // Check if the user is actually saved in the database
        const user = await User.findOne({ email: data.email })
        expect(user).to.exist
        expect(user.name).to.equal(data.name)
        expect(user.email).to.equal(data.email)
        expect(bcrypt.compareSync(data.password, user.password)).to.be.true // Check password hashing
        expect(user.address).to.equal(data.address)
        expect(user.country).to.equal(data.country)
        expect(user.city).to.equal(data.city)
        expect(user.postcode).to.equal(data.postcode)
    })

    it('fails when required fields are missing', async () => {
        const data = {
            name: '',
            email: 'testhomecenter@test.com',
            password: '',
            address: '',
            postcode: '',
            city: '',
            country: ''
        }

        await expect(createHomeCenter(data))
            .to.be.rejectedWith(ValidationError, 'All fields are required.')
    })

    it('fails when email already exists', async () => {
        const existingUserData = {
            name: 'ExistingHomeCenter',
            email: 'existing@test.com',
            password: '123456789',
            address: 'Existing Road 1',
            postcode: '08001',
            city: 'Barcelona',
            country: 'Spain'
        }

        // Create a user that already exists
        await User.create(existingUserData)

        const data = {
            name: 'NewHomeCenter',
            email: 'existing@test.com',  // Same email as the one above
            password: '123456789',
            address: 'Existing Road 1',
            postcode: '08001',
            city: 'Barcelona',
            country: 'Spain'
        }

        await expect(createHomeCenter(data))
            .to.be.rejectedWith(ValidationError, 'User with this email already exist.')
    })

    after(() => db.disconnect())  
})