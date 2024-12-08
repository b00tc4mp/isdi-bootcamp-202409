import { User, Tip } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, cyclePhase) => {
    validate.id(userId, 'userId')
    validate.phase(cyclePhase)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) { throw new NotFoundError('User not found') }

            return Tip.find({ phase: cyclePhase, category: 'exercise' }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(tips => {
                    if (tips.length === 0) { throw new NotFoundError('Tips not found') }

                    const randomTip = tips[Math.floor(Math.random() * tips.length)]

                    return randomTip.description
                })
        })
}