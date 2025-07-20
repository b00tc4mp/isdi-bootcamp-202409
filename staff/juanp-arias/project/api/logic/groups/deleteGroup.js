import { User, Group } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors
export default (userId, groupId) => {
    validate.id(userId, 'userId')
    validate.id(groupId, 'groupId')

    return Promise.all([User.findById(userId).lean(), Group.findById(groupId).lean()])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, group]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!group) throw new NotFoundError('group not found')
            if (!group.teacher.equals(userId)) throw new OwnershipError('user is not author of group')

            return Group.findByIdAndDelete(groupId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}