import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Note } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors
import updateNote from './updateNote.js'

describe('updateNote', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

    it('succeeds on update a note', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('07/01/2000'),
            password: '123456'
        })
        const note = new Note({ author: user.id, text: 'Hola notas' })

        return Promise.all([user.save(), note.save()])
            .then(([user, note]) =>
                updateNote(note.id, 'editando la nota')
                    .then(() => {
                        expect(user).to.exist
                        expect(user.name).to.equal('Coco Loco')
                        expect(user.id).to.be.a.string
                        expect(user.id).to.have.lengthOf(24)
                        expect(user.dateOfBirth).to.be.instanceOf(Date)
                        expect(user.role).to.equal('student')
                    })
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
                    updateNote(user.id, '012345678901234567890123')
                ).to.be.rejectedWith(NotFoundError, 'note not found')
            )
    )
    after(() => db.disconnect())
})