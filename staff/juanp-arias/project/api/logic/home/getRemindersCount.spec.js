import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getRemindersCount from './getRemindersCount.js'

describe('getRemindersCount', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => User.deleteMany())

    it('succeeds and returns reminders count for existing user', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
            reminders: [
                { title: 'Reminder 1', text: 'Hola reminders', date: new Date('2024-12-01') },
                { title: 'Reminder 2', text: 'hola reminders', date: new Date('2024-12-02') },
            ],
        })

        return user.save().then(user => {
            return getRemindersCount(user._id.toString()).then(count => {
                expect(count).to.equal(2) // El usuario tiene 2 recordatorios
            })
        })
    })

    it('succeeds and returns 0 when user has no reminders', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
            reminders: [],
        })

        return user.save().then(user => {
            return getRemindersCount(user._id.toString()).then(count => {
                expect(count).to.equal(0) // El usuario no tiene recordatorios
            })
        })
    })

    it('fails on non-existing user', () =>
        expect(
            getRemindersCount('012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-string user-id', () =>
        expect(() => getRemindersCount(true)).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => getRemindersCount('0123')).to.throw(ValidationError, /^invalid userId length$/)
    )
    after(() => db.disconnect())
})