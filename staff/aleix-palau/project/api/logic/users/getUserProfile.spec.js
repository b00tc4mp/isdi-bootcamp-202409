import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getUserProfile from './getUserProfile.js'

describe('getUserProfile', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const userData = {
            name: 'Aleix',
            email: 'al@eix.com',
            password: '123123123',
            dateOfBirth: new Date('1991-08-19'),
            gender: 'Man',
            targetGender: ['Women'],
            artists: ['The Strokes', 'Radiohead'],
            bio: 'C\'est la vie',
            location: 'Barcelona'
        }

        const user = await User.create(userData)

        const profile = await getUserProfile(user.id)

        expect(profile).to.exist
        expect(profile).to.deep.equal({
            name: userData.name,
            dateOfBirth: userData.dateOfBirth,
            gender: userData.gender,
            targetGender: userData.targetGender,
            artists: userData.artists,
            bio: userData.bio,
            location: userData.location
        })
    })

    it('fails on non-existing user', () =>
        expect(getUserProfile('675ee3f290969a37a31f0744')).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    after(() => db.disconnect())
})