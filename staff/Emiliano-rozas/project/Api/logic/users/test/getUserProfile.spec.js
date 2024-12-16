import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'


const { NotFoundError } = errors

import getUserProfile from '../getUserProfile.js'

describe('getUserProfile', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ name: 'Eddie Brook', email: 'eddie@brook.com', username: 'venom', password: '123123123', street: 'calle falsa 123', phone: '+54321234321', city: 'Barcelona', country: 'ESPAÑA', postalCode: '1712' })

        const userProfile = await getUserProfile(user.id, user.id)

        const { name, email, username, password, street, phone, city } = userProfile

        expect(name).to.equal('Eddie Brook')
        expect(email).to.equal('eddie@brook.com')
        expect(username).to.equal('venom')
        expect(password).to.equal('123123123')
        expect(street).to.equal('calle falsa 123')
        expect(phone).to.equal('+54321234321')
        expect(city).to.equal('Barcelona')
    })

    it('fails on non-existing user', () =>
        expect(
            getUserProfile('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on non-existing target-user', () =>
        expect(
            User.create({ name: 'Eddie Brook', email: 'eddie@brook.com', username: 'venom', password: '123123123', street: 'calle falsa 123', phone: '+54321234321', city: 'Barcelona', country: 'ESPAÑA', postalCode: '1712' })
                .then(user => getUserProfile(user.id, '012345678901234567890123'))
        ).to.be.rejectedWith(NotFoundError, 'target user not found')
    )

    after(() => db.disconnect())
})
