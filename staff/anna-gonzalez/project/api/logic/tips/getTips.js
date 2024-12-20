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

            const categories = ['music', 'self-care', 'nutrition', 'exercise']

            return Promise.all(categories.map(category => {
                return Tip.find({ phase: cyclePhase, category }).lean()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(tips => {
                        const randomTip = tips[Math.floor(Math.random() * tips.length)]
                        return { category, description: randomTip.description }
                    })
            }))
        })
        .then(randomTips => {

            return randomTips
        })
}