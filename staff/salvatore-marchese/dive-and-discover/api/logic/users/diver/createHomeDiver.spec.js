import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'
import db, { User } from 'dat'
import { errors } from 'com'

chai.use(chaiAsPromised)
const { expect } = chai
const { ValidationError } = errors

import createHomeDiver from './createHomeDiver.js'

describe('createHomeDiver', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => User.deleteMany()) 

    it('succeeds when all fields are valid and user does not already exist', async () => {
        const data = {
            name: 'salva',
            email: 'smarchese985@gmail.com',
            password: '123123123',
        }
    
        const response = await createHomeDiver(data)
    
        // Log the response to check what is returned
        console.log('Response:', response)
    
        // Check the response
        expect(response.message).to.equal('Home Diver created successfully!')
    
        // Check if the user is actually saved in the database
        const user = await User.findOne({ email: data.email })
        expect(user).to.exist
        expect(user.name).to.equal(data.name)
        expect(user.email).to.equal(data.email)
        expect(bcrypt.compareSync(data.password, user.password)).to.be.true 
    })

    it('fails when required fields are missing', async () => {
        const data = {
            name: '',
            email: 'nemo@test.com',
            password: '',
            
        }

        await expect(createHomeDiver(data))
            .to.be.rejectedWith(ValidationError, 'All fields are required.')
    })

    it('fails when email already exist', async () => {
        const existingUserData = {
            name: 'ExistingHomeDiver',
            email: 'existing@test.com',
            password: '123456789',
        }

        // Create a user that already exists
        await User.create(existingUserData)

        const data = {
            name: 'ExistingHomeDiver',
            email: 'existing@test.com',  // Same email as the one above
            password: '123456789',
        }

        await expect(createHomeDiver(data))
            .to.be.rejectedWith(ValidationError, 'User with this email already exist.')
    })

    after(() => db.disconnect())  
})