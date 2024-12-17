import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Task } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, OwnershipError } = errors

import deleteTask from './deleteTask.js'
describe('deleteTask', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeeds when user is the creator of the task', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const now = new Date()
        const futureDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

        return user.save().then(savedUser => {
            const task = new Task({
                creator: savedUser._id,
                assignes: [savedUser._id],
                date: futureDate,
                text: 'Task to Delete',
            })

            return task.save().then(savedTask => {
                return deleteTask(savedUser._id.toString(), savedTask._id.toString())
                    .then(() => Task.findById(savedTask._id))
                    .then(result => {
                        expect(result).to.be.null
                    })
            })
        })
    })

    it('fails on non-existing user', () =>
        expect(
            deleteTask('012345678901234567890123', '012345678901234567890124')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing task', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        return user.save().then(savedUser => {
            return expect(
                deleteTask(savedUser._id.toString(), '012345678901234567890124')
            ).to.be.rejectedWith(NotFoundError, /^task not found$/)
        })
    })

    it('fails when user is not the creator of the task', () => {
        const user1 = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const user2 = new User({
            name: 'Other User',
            email: 'other@user.com',
            dateOfBirth: new Date('1999-05-15'),
            password: '123456',
        })

        const futureDate = new Date()

        return Promise.all([user1.save(), user2.save()]).then(([savedUser1, savedUser2]) => {
            const task = new Task({
                creator: savedUser1._id,
                assignes: [savedUser1._id],
                date: futureDate,
                text: 'Task by User1',
            })

            return task.save().then(savedTask => {
                return expect(
                    deleteTask(savedUser2._id.toString(), savedTask._id.toString())
                ).to.be.rejectedWith(OwnershipError, /^user is not author of task$/)
            })
        })
    })

    it('fails on non-string user-id', () =>
        expect(() => deleteTask(true, '012345678901234567890124')).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => deleteTask('0123', '012345678901234567890124')).to.throw(ValidationError, /^invalid userId length$/)
    )

    it('fails on non-string task-id', () =>
        expect(() => deleteTask('012345678901234567890123', true)).to.throw(ValidationError, /^invalid taskId$/)
    )

    it('fails on non-24-chars-length task-id', () =>
        expect(() => deleteTask('012345678901234567890123', '0123')).to.throw(ValidationError, /^invalid taskId length$/)
    )
    after(() => db.disconnect())
})