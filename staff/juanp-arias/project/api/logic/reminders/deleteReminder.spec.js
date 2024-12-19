import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Reminder } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, OwnershipError } = errors

import deleteReminder from './deleteReminder.js'

describe('deleteReminder', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Reminder.deleteMany()]))

    it('succeeds on delete existing reminder', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })
        const reminder = new Reminder({
            title: 'Hola reminders',
            text: 'Hola notas',
            date: new Date('2024-12-20'),
        })

        return Promise.all([user.save(), reminder.save()]).then(([user, reminder]) => {
            user.reminders.push(reminder)
            return user.save().then(() => {
                return deleteReminder(user._id.toString(), reminder._id.toString())
                    .then(() => Reminder.findById(reminder._id))
                    .then(deletedReminder => {
                        expect(deletedReminder).to.be.null
                        return User.findById(user._id)
                    })
                    .then(updatedUser => {
                        expect(updatedUser.reminders).to.not.include(reminder._id)
                    })
            })
        })
    })

    it('fails on non-existing user', () =>
        expect(
            deleteReminder('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing reminder', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        return user.save().then(user => {
            return expect(
                deleteReminder(user._id.toString(), '012345678901234567890124')
            ).to.be.rejectedWith(NotFoundError, /^reminder not found$/)
        })
    })

    it('fails on reminder not associated with user', () => {
        const user2 = new User({
            name: 'Juan Pablo',
            email: 'juan@pablo.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const reminder = new Reminder({
            title: 'Hola reminders',
            text: 'Hola notas',
            date: new Date('2024-12-20'),
        })

        return Promise.all([user2.save(), reminder.save()]).then(([user2, reminder]) => {
            return expect(
                deleteReminder(user2._id.toString(), reminder._id.toString())
            ).to.be.rejectedWith(NotFoundError, /^reminder not found$/)
        })
    })

    it('fails on non-string user-id', () =>
        expect(() => deleteReminder(true, '012345678901234567890123')).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => deleteReminder('0123', '012345678901234567890123')).to.throw(ValidationError, /^invalid userId length$/)
    )

    after(() => db.disconnect())
})