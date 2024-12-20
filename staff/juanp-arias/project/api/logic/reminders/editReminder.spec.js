import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Reminder } from 'dat'
import { errors } from 'com'
import editReminder from './editReminder.js'

const { NotFoundError, ValidationError } = errors

describe('editReminder', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Reminder.deleteMany()]))

    it('succeeds on existing reminder', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const reminder = new Reminder({
            title: 'hola reminders',
            text: 'Hola reminders',
            date: new Date('2024-12-20')
        })

        return Promise.all([user.save(), reminder.save()])
            .then(([savedUser, savedReminder]) => {
                savedUser.reminders.push(savedReminder)
                return savedUser.save().then(() => {
                    return editReminder(savedUser._id.toString(), savedReminder._id.toString())
                        .then(result => {
                            expect(result).to.be.an('object')
                            expect(result).to.have.property('id', savedReminder._id.toString())
                            expect(result).to.have.property('title', savedReminder.title)
                            expect(result).to.have.property('text', savedReminder.text)
                            expect(new Date(result.date)).to.deep.equal(savedReminder.date)
                        })
                })
            })
    })

    it('fails on non-existing user', () =>
        expect(
            editReminder('012345678901234567890123', '012345678901234567890124')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing reminder', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        return user.save().then(savedUser => {
            return expect(
                editReminder(savedUser._id.toString(), '012345678901234567890124')
            ).to.be.rejectedWith(NotFoundError, /^reminder not found$/)
        })
    })

    it('fails on non-string user-id', () =>
        expect(() => editReminder(true, '012345678901234567890124')).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => editReminder('0123', '012345678901234567890124')).to.throw(ValidationError, /^invalid userId length$/)
    )

    it('fails on non-string reminder-id', () =>
        expect(() => editReminder('012345678901234567890123', true)).to.throw(ValidationError, /^invalid reminderId$/)
    )

    it('fails on non-24-chars-length reminder-id', () =>
        expect(() => editReminder('012345678901234567890123', '0123')).to.throw(ValidationError, /^invalid reminderId length$/)
    )
    after(() => db.disconnect())
})