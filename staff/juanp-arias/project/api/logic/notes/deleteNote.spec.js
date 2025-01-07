import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Note } from 'dat'
import { errors } from 'com'

const { NotFoundError, OwnershipError } = errors
import deleteNote from './deleteNote.js'

describe('deleteNote', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

    it('succeeds on deleting a note', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('07/01/2000'),
            password: '123456'
        })
        const note = new Note({ author: user.id, text: 'Hola notas' })

        return Promise.all([user.save(), note.save()])
            .then(([user, note]) =>
                deleteNote(user.id, note.id)
                    .then(() =>
                        Note.find()
                            .then(notes => {
                                expect(notes).to.have.lengthOf(0)
                            })
                    )
            )
    })
    it('fails on non-existing user', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('07/01/2000'),
            password: '123456'
        })
        const note = new Note({ author: user.id, text: 'Hola notas' })

        return Promise.all([user.save(), note.save()])
            .then(([, note]) =>
                expect(
                    deleteNote('012345678901234567890123', note.id)
                ).to.be.rejectedWith(NotFoundError, /^user not found$/)
            )
    })

    it('fails on non-existing note', () =>
        User.create({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('07/01/2000'),
            password: '123456'
        })
            .then(user =>
                expect(
                    deleteNote(user.id, '012345678901234567890123')
                ).to.be.rejectedWith(NotFoundError, 'note not found')
            )
    )

    it('fails on user is not author of note', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('07/01/2000'),
            password: '123456'
        })
        const user2 = new User({
            name: 'Juan Pablo',
            email: 'juan@pablo.com',
            dateOfBirth: new Date('07/01/2000'),
            password: '123456'
        })
        const note = new Note({ author: user.id, text: 'Hola notas' })

        return Promise.all([user.save(), user2.save(), note.save()])
            .then(([_, user2, note]) =>
                expect(
                    deleteNote(user2.id, note.id)
                ).to.be.rejectedWith(OwnershipError, 'user is not author of note')
            )
    })
    after(() => db.disconnect())
})