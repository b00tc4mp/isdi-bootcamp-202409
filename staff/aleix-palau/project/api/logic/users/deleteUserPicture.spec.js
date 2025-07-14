import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import deleteUserPicture from './deleteUserPicture.js'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

describe('deleteUserPicture', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    const mockUserData = {
        password: '123123123',
        coordinates: { type: 'Point', coordinates: [0, 0] }
    }

    it('succeeds on deleting picture from existing user', async () => {
        const pictures = [
            'data:image/jpeg;base64,picture1',
            'data:image/jpeg;base64,picture2',
            'data:image/jpeg;base64,picture3'
        ]
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            pictures,
            profilePicture: pictures[0]
        })

        const result = await deleteUserPicture(user.id, pictures[1])

        expect(result).to.exist
        expect(result.pictures).to.have.lengthOf(2)
        expect(result.pictures).to.not.include(pictures[1])
        expect(result.profilePicture).to.equal(pictures[0]) // Should keep existing
    })

    it('updates profile picture when deleting current profile picture', async () => {
        const pictures = [
            'data:image/jpeg;base64,picture1',
            'data:image/jpeg;base64,picture2'
        ]
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            pictures,
            profilePicture: pictures[0]
        })

        const result = await deleteUserPicture(user.id, pictures[0])

        expect(result.pictures).to.have.lengthOf(1)
        expect(result.pictures).to.not.include(pictures[0])
        expect(result.profilePicture).to.equal(pictures[1]) // Should update to next
    })

    it('fails when trying to delete the last picture', () =>
        expect(
            User.create({
                ...mockUserData,
                email: 'al@eix.com',
                pictures: ['data:image/jpeg;base64,lastpicture']
            }).then(user => deleteUserPicture(user.id, user.pictures[0]))
        ).to.be.rejectedWith(ValidationError)
    )

    it('fails when user has no pictures', () =>
        expect(
            User.create({
                ...mockUserData,
                email: 'al@eix.com'
            }).then(user => deleteUserPicture(user.id, 'data:image/jpeg;base64,any'))
        ).to.be.rejectedWith(ValidationError)
    )

    it('fails on non-existing user', () =>
        expect(
            deleteUserPicture('000000000000000000000000', 'data:image/jpeg;base64,test')
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails when picture not found in user profile', () =>
        expect(
            User.create({
                ...mockUserData,
                email: 'al@eix.com',
                pictures: ['data:image/jpeg;base64,existing']
            }).then(user => deleteUserPicture(user.id, 'data:image/jpeg;base64,notfound'))
        ).to.be.rejectedWith(NotFoundError, 'picture not found in user profile')
    )

    after(() => db.disconnect())
})