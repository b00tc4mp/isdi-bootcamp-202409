import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Reminder } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors
import getReminders from './getReminders.js'

describe('getReminders', () => {
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
            date: '2024/12/20'
        })
        const reminder2 = new Reminder({
            title: 'hola reminders',
            text: 'Hola reminders',
            date: '2024/12/20'
        })

        return Promise.all([user.save(), reminder.save(), reminder2.save()])
            .then(([savedUser, savedReminder, savedReminder2]) => {
                savedUser.reminders.push(savedReminder, savedReminder2)
                return savedUser.save().then(() => {
                    return getReminders(savedUser.id)
                        .then(result => {
                            expect(result).to.be.an('array').with.lengthOf(2)
                        })
                })
            })
    })
    it('fails on non-existing user', () =>
        expect(
            getReminders('012345678901234567890123', '2024/12/20')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string user-id', () =>
        expect(() => getReminders(true)).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => getReminders('0123')).to.throw(ValidationError, /^invalid userId length$/)
    )
    after(() => db.disconnect())
})