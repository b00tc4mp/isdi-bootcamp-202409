import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { ValidationError, SystemError, DuplicityError } = errors

import registerUser from './registerUser.js'

describe('registerUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on valid user data', async () => {
        const userData = { name: 'Risto', email: 'risto@example.com', username: 'ristoUser', password: 'password123', passwordRepeat: 'password123', plan: 'free', role: 'standard' }

        await registerUser(
            userData.name,
            userData.email,
            userData.username,
            userData.password,
            userData.passwordRepeat,
            userData.plan,
            null, // planExpiryDate
            userData.role
        )

        const user = await User.findOne({ email: userData.email })

        expect(user).to.exist
        expect(user.name).to.equal(userData.name)
        expect(user.email).to.equal(userData.email)
        expect(user.username).to.equal(userData.username)
        expect(user.plan).to.equal(userData.plan)
        expect(user.role).to.equal(userData.role)
        expect(user.password).to.not.equal(userData.password) // Ensure password is hashed
        expect(user.profileImage).to.exist // Check that profile image is assigned
    })

    it('fails on duplicate email', async () => {
        const userData = { name: 'Risto', email: 'risto@example.com', username: 'ristoUser', password: 'password123', passwordRepeat: 'password123', plan: 'free', role: 'standard' }

        await registerUser(userData.name, userData.email, userData.username, userData.password, userData.passwordRepeat, userData.plan, null, userData.role)

        return expect(
            registerUser(
                'Another Name',
                userData.email,
                'anotherUsername',
                'password123',
                'password123',
                'free',
                null, // planExpiryDate
                'standard'
            )
        ).to.be.rejectedWith(DuplicityError, 'User already exists')
    })


    it('fails on duplicate username', async () => {
        const userData = { name: 'Risto', email: 'risto@example.com', username: 'ristoUser', password: 'password123', passwordRepeat: 'password123', plan: 'free', role: 'standard' }

        await registerUser(userData.name, userData.email, userData.username, userData.password, userData.passwordRepeat, userData.plan, null, userData.role)

        return expect(
            registerUser(
                'Another Name',
                'holamanola@manola.com',
                userData.username,
                'password123',
                'password123',
                'free',
                null, // planExpiryDate
                'standard'
            )
        ).to.be.rejectedWith(DuplicityError, 'User already exists')
    })

    after(() => db.disconnect())
})
