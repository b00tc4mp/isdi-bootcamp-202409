import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getUserCenter from './getUserCenter.js'

describe('getUserCenter', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeed on exisitng user', async () => {
        const user = await User.create({ name: 'TestDiveCenter', email: 'divecenter@test.com', password: '123123123', role: 'center', address: 'seafront road 1', country: 'Spain', city: 'Barcelona', postcode: '08001', telephone: '930654321' })

        const profile = await getUserCenter(user.id, user.id)

        expect(profile.id.toString()).to.equal(user.id)
        expect(profile.name).to.equal(user.name)
        expect(profile.email).to.equal(user.email)
        expect(profile.role).to.equal(user.role)
        expect(profile.address).to.equal(user.address)
        expect(profile.country).to.equal(user.country)
        expect(profile.city).to.equal(user.city)
        expect(profile.postcode).to.equal(user.postcode)
        expect(profile.telephone).to.equal(user.telephone)

    })

    it('fails on non-existing user', () => 
    expect(
        getUserCenter('67a0a8733ef526ddff674b25', '67a0a8733ef526ddff674b25')
    ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on non-exisitng targetUser', async () => {
        const user = await User.create({ name: 'Frank', email: 'frank@gmail.com', password: '123123123', role: 'center' })

       return expect(
           getUserCenter(user.id, '67a0a8733ef526ddff674b25')
       ).to.be.rejectedWith(NotFoundError, 'target user not found')
   })
    after(() => db.disconnect())
})