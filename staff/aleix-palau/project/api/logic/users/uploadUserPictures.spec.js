import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import uploadUserPictures from './uploadUserPictures.js'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

describe('uploadUserPictures', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    const mockUserData = {
        password: '123123123',
        coordinates: { type: 'Point', coordinates: [0, 0] }
    }

    it('succeeds on uploading pictures to existing user', async () => {
        const user = await User.create({ ...mockUserData, email: 'al@eix.com' })

        const pictures = [
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAE',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA'
        ]

        const result = await uploadUserPictures(user.id, pictures)

        expect(result).to.exist
        expect(result.pictures).to.have.lengthOf(2)
        expect(result.pictures).to.deep.equal(pictures)
        expect(result.profilePicture).to.equal(pictures[0])
    })

    it('merges with existing pictures', async () => {
        const existingPicture = 'data:image/jpeg;base64,existing'
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            pictures: [existingPicture],
            profilePicture: existingPicture
        })

        const newPictures = ['data:image/jpeg;base64,new']

        const result = await uploadUserPictures(user.id, newPictures)

        expect(result.pictures).to.have.lengthOf(2)
        expect(result.pictures).to.include(existingPicture)
        expect(result.pictures).to.include(newPictures[0])
        expect(result.profilePicture).to.equal(existingPicture) // Should keep existing
    })

    it('respects 3 picture limit', async () => {
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            pictures: ['data:image/jpeg;base64,1', 'data:image/jpeg;base64,2']
        })

        const newPictures = [
            'data:image/jpeg;base64,3',
            'data:image/jpeg;base64,4' // This should be ignored
        ]

        const result = await uploadUserPictures(user.id, newPictures)

        expect(result.pictures).to.have.lengthOf(3)
    })

    it('handles duplicate pictures', async () => {
        const picture = 'data:image/jpeg;base64,duplicate'
        const user = await User.create({
            ...mockUserData,
            email: 'al@eix.com',
            pictures: [picture]
        })

        const result = await uploadUserPictures(user.id, [picture])

        expect(result.pictures).to.have.lengthOf(1)
        expect(result.pictures[0]).to.equal(picture)
    })

    it('fails on non-existing user', () =>
        expect(
            uploadUserPictures('000000000000000000000000', ['data:image/jpeg;base64,test'])
        ).to.be.rejectedWith(NotFoundError, 'user not found')
    )

    it('fails on invalid picture format', () => {
        expect(() => uploadUserPictures('654321098765432109876543', ['not-a-base64-image']))
            .to.throw(ValidationError)
    })

    after(() => db.disconnect())
})