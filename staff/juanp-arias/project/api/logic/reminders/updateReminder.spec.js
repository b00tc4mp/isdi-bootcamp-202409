import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Reminder } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import updateReminder from './updateReminder.js'

describe('updateReminder', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Reminder.deleteMany()]))

    it('succeeds on update an existing reminder', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const reminder = new Reminder({
            title: 'Original Title',
            text: 'Original Text',
            date: new Date('2024-12-20'),
        })

        user.reminders.push(reminder)

        return Promise.all([user.save(), reminder.save()]).then(([savedUser, savedReminder]) => {
            return updateReminder(
                savedUser._id.toString(),
                savedReminder._id.toString(),
                'Updated Title',
                'Updated Text',
                '2024-12-25'
            )
                .then(updatedReminder => {
                    expect(updatedReminder).to.exist
                    expect(updatedReminder.title).to.equal('Updated Title')
                    expect(updatedReminder.text).to.equal('Updated Text')
                    expect(new Date(updatedReminder.date)).to.deep.equal(new Date('2024-12-25'))

                    return User.findById(savedUser._id).lean()
                })
                .then(updatedUser => {
                    expect(updatedUser.reminders[0]._id.toString()).to.equal(savedReminder._id.toString())
                })
        })
    })

    it('fails on non-existing reminder', () =>
        User.create({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        }).then(savedUser => {
            return expect(
                updateReminder(
                    savedUser._id.toString(),
                    '012345678901234567890123',
                    'Updated Title',
                    'Updated Text',
                    '2024-12-25'
                )
            ).to.be.rejectedWith(NotFoundError, /^Reminder not found$/)
        })
    )

    it('fails when reminder is not in user reminders', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const reminder = new Reminder({
            title: 'Orphan Reminder',
            text: 'Hola manola',
            date: new Date('2024-12-20'),
        })

        return Promise.all([user.save(), reminder.save()]).then(([savedUser, savedReminder]) => {
            return expect(
                updateReminder(
                    savedUser._id.toString(),
                    savedReminder._id.toString(),
                    'Updated Title',
                    'Updated Text',
                    '2024-12-25'
                )
            ).to.be.rejectedWith(NotFoundError, /^Reminder not found in user$/)
        })
    })

    it('fails on non-string user-id', () =>
        expect(() => updateReminder(true, '012345678901234567890123', 'Updated Title', 'Updated Text', '2024-12-25'))
            .to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-string reminder-id', () =>
        expect(() => updateReminder('012345678901234567890123', true, 'Updated Title', 'Updated Text', '2024-12-25'))
            .to.throw(ValidationError, /^invalid reminderId$/)
    )

    after(() => db.disconnect())
})
