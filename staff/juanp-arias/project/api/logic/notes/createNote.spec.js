import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Note } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import createNote from './createNote.js'

describe('createNote', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

    it('succeeds for existing user', () =>
        User.create({ name: 'Coco Loco', email: 'coco@loco.com', dateOfBirth: new Date('07/01/2000'), password: '123456' })
            .then(user =>
                createNote(user.id, 'hello notes')
                    .then(() => Note.findOne())
                    .then(note => {
                        expect(note).to.exist
                        expect(note.author.toString()).to.equal(user.id)
                        expect(note.date).to.be.instanceOf(Date)
                        expect(note.text).to.equal('hello notes')
                    })
            )
    )

    it('fails on non-existing user', () =>
        expect(
            createNote('012345678901234567890123', 'hello notes')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string user-id', () =>
        expect(() => createNote(true, 'hello notes')).to.throw(ValidationError, /^invalid id$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => createNote('0123', 'hello notes')).to.throw(ValidationError, /^invalid id length$/)
    )

    it('fails on non-string text', () =>
        expect(() => createNote('012345678901234567890123', true)).to.throw(ValidationError, /^invalid text$/)
    )

    describe('fails on User.findById error', () => {
        let findById
        beforeEach(() => {
            findById = User.findById
            User.findById = () => Promise.reject(new Error('system error on User.findById'))
        })

        it('fails on User.findById error', () =>
            expect(
                createNote('012345678901234567890123', 'hello notes')
            ).to.be.rejectedWith(SystemError, /^system error on User.findById$/)
        )

        afterEach(() => User.findById = findById)
    })

    describe('fails on Note.create error', () => {
        let create
        beforeEach(() => {
            create = Note.create
            Note.create = () => Promise.reject(new Error('system error on Note.create'))
        })

        it('fails on Note.create error', () =>
            expect(
                User.create({ name: 'Coco Loco', email: 'coco@loco.com', dateOfBirth: new Date('07/01/2000'), password: '12345678' })
                    .then(user =>
                        createNote(user.id, 'hello notes')
                    )
            ).to.be.rejectedWith(SystemError, /^system error on Note.create$/)
        )
        afterEach(() => Note.create = create)
    })
    after(() => db.disconnect())
})