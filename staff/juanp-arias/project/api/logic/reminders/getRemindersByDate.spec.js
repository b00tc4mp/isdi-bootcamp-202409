import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Reminder } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors
import getRemindersByDate from './getRemindersByDate.js'

describe('getRemindersByDate', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Reminder.deleteMany()]))

    it('succeeds on existing reminder', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const validDate = new Date('2024-12-20').toDateString()
        const reminder = new Reminder({
            title: 'hola reminders',
            text: 'Hola reminders',
            date: '2024/12/20'
        })

        return Promise.all([user.save(), reminder.save()])
            .then(([savedUser, savedReminder]) => {
                savedUser.reminders.push(savedReminder)
                return savedUser.save().then(() => {
                    return getRemindersByDate(savedUser.id, validDate)
                        .then(result => {
                            expect(result).to.be.an('array').with.lengthOf(1)
                            expect(result[0]).to.deep.include({
                                id: savedReminder._id.toString(),
                                text: savedReminder.text,
                                date: savedReminder.date
                            })
                        })
                })
            })
    })
    it('fails on non-existing user', () =>
        expect(
            getRemindersByDate('012345678901234567890123', '2024/12/20')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string user-id', () =>
        expect(() => getRemindersByDate(true, '2024/12/20')).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => getRemindersByDate('0123', '012345678901234567890123')).to.throw(ValidationError, /^invalid userId length$/)
    )
    after(() => db.disconnect())
})