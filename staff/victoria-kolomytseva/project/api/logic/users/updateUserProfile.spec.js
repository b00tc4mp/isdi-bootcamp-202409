import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'
const { NotFoundError } = errors

import updateUserProfile from './updateUserProfile.js'

describe('updateUserProfile', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => User.deleteMany())


    it('fails on no existing user', () =>
        expect((async () => {
            await updateUserProfile('123412341234123412341234', 'María', 'López', '684734576', 'Barcelona', '08340', '123123123')
        })()).to.be.rejectedWith(NotFoundError, 'user not found')
    )


    it('succeeds on edit user', async () => {
        const newUser = await User.create({
            email: 'maria.lopez@example.com',
            name: 'test',
            password: bcrypt.hashSync('123123123', 10)
        })

        await updateUserProfile(newUser._id.toString(), 'María', 'López', '684734576', 'Barcelona', '08340')

        const user = await User.findOne({
            email: 'maria.lopez@example.com'
        })

        expect(user).to.exist
        expect(user.name).to.equal('María')
        expect(user.surname).to.equal('López')
        expect(user.phone).to.equal('684734576')
        expect(user.city).to.equal('Barcelona')
        expect(user.postalCode).to.equal('08340')
        expect(user.email).to.equal('maria.lopez@example.com')
        expect(bcrypt.compareSync('123123123', user.password)).to.be.true
    })

    after(() => db.disconnect())

})



