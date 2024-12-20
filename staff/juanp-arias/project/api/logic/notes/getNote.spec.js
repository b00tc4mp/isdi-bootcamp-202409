import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Note } from 'dat'
import { errors } from 'com'

const { NotFoundError, OwnershipError, ValidationError, SystemError } = errors

import getNote from './getNote.js'

describe('getNote', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

    it('succeeds for existing user and note', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456'
        })

        return user.save().then(user => {
            const note = new Note({ author: user._id, text: 'Hola notas' })

            return note.save().then(note => {
                return getNote(user._id.toString(), note._id.toString()).then(result => {
                    expect(result.id).to.equal(note._id.toString())
                    expect(result.text).to.equal(note.text)
                    expect(result.author.toString()).to.equal(user._id.toString())
                })
            })
        })
    })

    it('fails on non-existing user', () =>
        expect(
            getNote('012345678901234567890123', '012345678901234567890124')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing note', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456'
        })

        return user.save().then(user => {
            return expect(
                getNote(user._id.toString(), '012345678901234567890124')
            ).to.be.rejectedWith(NotFoundError, /^note not found$/)
        })
    })

    it('fails when user is not the author of the note', () => {
        const user1 = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456'
        })

        const user2 = new User({
            name: 'Juan Pablo',
            email: 'juan@pablo.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456'
        })

        const note = new Note({ author: user1._id, text: 'Nota de prueba' })

        return Promise.all([user1.save(), user2.save(), note.save()]).then(([_, savedUser2, note]) => {
            return expect(
                getNote(savedUser2._id.toString(), note._id.toString())
            ).to.be.rejectedWith(OwnershipError, /^user does not own the note$/)
        })
    })

    it('fails on non-string userId', () =>
        expect(() => getNote(true, '012345678901234567890124')).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-string noteId', () =>
        expect(() => getNote('012345678901234567890123', true)).to.throw(ValidationError, /^invalid noteId$/)
    )

    it('fails on invalid-length userId', () =>
        expect(() => getNote('1234', '012345678901234567890124')).to.throw(ValidationError, /^invalid userId length$/)
    )

    it('fails on invalid-length noteId', () =>
        expect(() => getNote('012345678901234567890123', '1234')).to.throw(ValidationError, /^invalid noteId length$/)
    )

    after(() => db.disconnect())
})