import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Note } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getLastNote from './getLastNote.js'

describe('getLastNote', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

    it('succeeds when user has notes and returns the latest note', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        return user.save().then(savedUser => {
            const note1 = new Note({
                author: savedUser._id,
                text: 'First Note',
                date: new Date('2024-01-01'),
            })

            const note2 = new Note({
                author: savedUser._id,
                text: 'Latest Note',
                date: new Date('2024-02-01'),
            })

            return Promise.all([note1.save(), note2.save()])
                .then(() => getLastNote(savedUser._id.toString()))
                .then(note => {
                    expect(note).to.exist
                    expect(note.text).to.equal('Latest Note')
                    expect(note).to.have.property('id')
                    expect(note.date).to.deep.equal(new Date('2024-02-01'))
                })
        })
    })

    it('returns null when user has no notes', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        return user.save().then(savedUser => {
            return getLastNote(savedUser._id.toString()).then(note => {
                expect(note).to.be.null
            })
        })
    })

    it('fails on non-existing user', () =>
        expect(
            getLastNote('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string user-id', () =>
        expect(() => getLastNote(true)).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => getLastNote('0123')).to.throw(ValidationError, /^invalid userId length$/)
    )
    after(() => db.disconnect())
})