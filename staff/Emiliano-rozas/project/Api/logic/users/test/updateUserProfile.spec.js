import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'
import mongoose from 'mongoose';

const { Types: { ObjectId } } = mongoose;

const { NotFounError } = errors

import updateUserProfile from '../updateUserProfile.js'

describe('updateUserProfile', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on update profile', async () => {

        const user = await User.create({
            name: 'Eddie Brook',
            email: 'eddie@brook.com',
            username: 'venom',
            password: '123123123',
        })

        await updateUserProfile(
            user._id.toString(),
            'calle falsa 123',
            '+54321234321',
            'Barcelona',
            'Spain',
            '1712'
        )

        const userProfile = await User.findById(user._id)

        expect(userProfile).to.exist
        expect(userProfile.street).to.equal('calle falsa 123')
        expect(userProfile.phone).to.equal('+54321234321')
        expect(userProfile.city).to.equal('Barcelona')
        expect(userProfile.country).to.equal('Spain')
        expect(userProfile.postalCode).to.equal('1712')
    })

    it('fails on non-existent user', async () => {

        await expect(
            updateUserProfile(
                new ObjectId().toString(),
                'calle falsa 123',
                '+54321234321',
                'Barcelona',
                'Spain',
                '1712'
            )
        ).to.be.rejectedWith(NotFounError, 'user not found')
    })

    afterEach(() => User.deleteMany())
    after(() => db.disconnect())
})
