import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Note } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getNotes from './getNotes.js'

describe('getNotes', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        return user.save().then(savedUser => {
            const note1 = new Note({
                author: savedUser._id,
                text: 'Hola notas',
                date: new Date('2024-01-01'),
            })

            const note2 = new Note({
                author: savedUser._id,
                text: 'Hola notas otra vez',
                date: new Date('2024-02-01'),
            })

            return Promise.all([note1.save(), note2.save()]).then(([savedNote1, savedNote2]) => {
                return getNotes(savedUser._id.toString()).then(notes => {
                    expect(notes).to.be.an('array').with.lengthOf(2)

                    expect(notes[0].id).to.equal(savedNote2._id.toString())
                    expect(notes[0].text).to.equal('Hola notas otra vez')
                    expect(notes[0].author.name).to.equal('Coco Loco')

                    expect(notes[1].id).to.equal(savedNote1._id.toString())
                    expect(notes[1].text).to.equal('Hola notas')
                    expect(notes[1].author.name).to.equal('Coco Loco')
                })
            })
        })
    })

    it('fails on non-existing user', () =>
        expect(
            getNotes('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    after(() => db.disconnect())
})
