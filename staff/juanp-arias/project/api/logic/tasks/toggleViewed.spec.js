import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai
import mongoose from 'mongoose'
const { ObjectId } = mongoose
import db, { User, Task } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors
import toggleTaskViewed from './toggleTaskViewed.js'

describe('toggleTaskViewed', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeeds when a user views a task for the first time', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const student = new User({
            name: 'Fran Pereira',
            email: 'fran@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const task = new Task({
            creator: user._id,
            assignes: [student._id],
            text: 'Task to view',
            date: new Date(),
        })

        return Promise.all([user.save(), student.save(), task.save()])
            .then(([_, student, savedTask]) => {
                return toggleTaskViewed(student._id.toString(), savedTask._id.toString())
                    .then(() => Task.findById(savedTask._id).lean())
                    .then(updatedTask => {
                        expect(updatedTask).to.exist
                        expect(updatedTask.viewed).to.be.an('array')
                        expect(updatedTask.viewed[0]._id.toString()).to.equal(student._id.toString())
                    })
            })
    })

    it('does not duplicate user in the viewed array', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const task = new Task({
            creator: user._id,
            assignes: [user._id],
            viewed: [user._id],
            text: 'Task already viewed',
            date: new Date(),
        })

        return Promise.all([user.save(), task.save()])
            .then(([savedUser, savedTask]) => {
                return toggleTaskViewed(savedUser._id.toString(), savedTask._id.toString())
                    .then(() => Task.findById(savedTask._id).lean())
                    .then(updatedTask => {
                        expect(updatedTask).to.exist
                        expect(updatedTask.viewed).to.have.lengthOf(1)
                        expect(updatedTask.viewed[0]._id.toString()).to.equal(savedUser._id.toString())
                    })
            })
    })

    it('fails on non-existing user', () => {
        const task = new Task({
            creator: '012345678901234567890123',
            assignes: [],
            viewed: [],
            text: 'Task without user',
            date: new Date(),
        })

        return task.save().then(savedTask => {
            return expect(
                toggleTaskViewed('012345678901234567890123', savedTask._id.toString())
            ).to.be.rejectedWith(NotFoundError, /^user not found$/)
        })
    })

    it('fails on non-existing task', () => {
        const user = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        return user.save().then(savedUser => {
            return expect(
                toggleTaskViewed(savedUser._id.toString(), '012345678901234567890123')
            ).to.be.rejectedWith(NotFoundError, /^task not found$/)
        })
    })

    it('fails on non-string user-id', () => {
        expect(() => toggleTaskViewed(true, '012345678901234567890123')).to.throw(ValidationError, /^invalid userId$/)
    })

    it('fails on non-string task-id', () => {
        expect(() => toggleTaskViewed('012345678901234567890123', true)).to.throw(ValidationError, /^invalid taskId$/)
    })
    after(() => db.disconnect())
})