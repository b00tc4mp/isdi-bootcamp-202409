import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import getUserProfile from './getUserProfile.js'
import { errors } from 'com'

const { NotFoundError } = errors

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
            artists: [{ id: 'artist1', name: 'The Strokes' }, { id: 'artist2', name: 'Radiohead' }],
            bio: 'C\'est la vie',
            location: 'Lleide',
            pictures: ['pic1.jpg', 'pic2.jpg'],
            profilePicture: 'pic1.jpg',
            minAge: 28,
            maxAge: 33,
            distance: 50,
            coordinates: { type: 'Point', coordinates: [2.1734, 41.3851] }
        }

        const user = await User.create(userData)

        const profile = await getUserProfile(user.id)

        expect(profile).to.exist
        expect(profile._id).to.equal(user.id)
        expect(profile.name).to.equal(userData.name)
        expect(profile.dateOfBirth).to.deep.equal(userData.dateOfBirth)
        expect(profile.gender).to.equal(userData.gender)
        expect(profile.targetGender).to.deep.equal(userData.targetGender)
        expect(profile.artists).to.deep.equal(userData.artists)
        expect(profile.bio).to.equal(userData.bio)
        expect(profile.location).to.equal(userData.location)
        expect(profile.pictures).to.deep.equal(userData.pictures)
        expect(profile.profilePicture).to.equal(userData.profilePicture)
        expect(profile.minAge).to.equal(userData.minAge)
        expect(profile.maxAge).to.equal(userData.maxAge)
        expect(profile.distance).to.equal(userData.distance)
        expect(profile.coordinates).to.deep.equal(userData.coordinates)
    })

    it('fails on non-existing user', () =>
        expect(getUserProfile('675ee3f290969a37a31f0744')).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    after(() => db.disconnect())
})