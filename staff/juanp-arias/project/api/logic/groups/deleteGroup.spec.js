import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Group } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, OwnershipError, SystemError } = errors

import deleteGroup from './deleteGroup.js'

describe('deleteGroup', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Group.deleteMany()]))

    it('succeeds when user is the teacher of the group', () => {
        const teacher = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const students = [
            new User({ name: 'Student 1', email: 'student1@school.com', dateOfBirth: '07/04/2000', role: 'student', password: '123456' }),
            new User({ name: 'Student 2', email: 'student2@school.com', dateOfBirth: '07/04/2000', role: 'student', password: '123456' }),
        ]

        return Promise.all([teacher.save(), ...students.map(student => student.save())])
            .then(([teacher, student1, student2]) => {
                const group = new Group({
                    name: 'Math Class',
                    teacher: teacher._id,
                    students: [student1._id, student2._id],
                })

                return group.save().then(group => {
                    return deleteGroup(teacher._id.toString(), group._id.toString())
                        .then(() => Group.findById(group._id))
                        .then(result => {
                            expect(result).to.be.null
                        })
                })
            })
    })

    it('fails on non-existing teacher', () =>
        expect(
            deleteGroup('012345678901234567890123', '012345678901234567890124')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing group', () => {
        const teacher = new User({
            name: 'Coco Loco',
            email: 'coco@loco.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        return teacher.save().then(teacher => {
            return expect(
                deleteGroup(teacher._id.toString(), '012345678901234567890124')
            ).to.be.rejectedWith(NotFoundError, /^group not found$/)
        })
    })

    it('fails when user is not the teacher of the group', () => {
        const teacher1 = new User({
            name: 'Teacher 1',
            email: 'teacher1@school.com',
            dateOfBirth: new Date('2000-07-01'),
            password: '123456',
        })

        const teacher2 = new User({
            name: 'Teacher 2',
            email: 'teacher2@school.com',
            dateOfBirth: new Date('2000-08-01'),
            password: '123456',
        })

        return Promise.all([teacher1.save(), teacher2.save()]).then(([teacher1, teacher2]) => {
            const group = new Group({
                name: 'Science Class',
                teacher: teacher1._id,
                students: [],
            })

            return group.save().then(group => {
                return expect(
                    deleteGroup(teacher2._id.toString(), group._id.toString())
                ).to.be.rejectedWith(OwnershipError, /^user is not author of group$/)
            })
        })
    })

    it('fails on non-string user-id', () =>
        expect(() => deleteGroup(true, '012345678901234567890124')).to.throw(ValidationError, /^invalid userId$/)
    )

    it('fails on non-24-chars-length user-id', () =>
        expect(() => deleteGroup('0123', '012345678901234567890124')).to.throw(ValidationError, /^invalid userId length$/)
    )

    it('fails on non-string group-id', () =>
        expect(() => deleteGroup('012345678901234567890123', true)).to.throw(ValidationError, /^invalid groupId$/)
    )

    it('fails on non-24-chars-length group-id', () =>
        expect(() => deleteGroup('012345678901234567890123', '0123')).to.throw(ValidationError, /^invalid groupId length$/)
    )
    after(() => db.disconnect())
})