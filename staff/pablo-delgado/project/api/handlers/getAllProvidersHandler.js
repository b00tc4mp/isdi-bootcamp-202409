import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.getAllProviders(userId)
            .then(Providers => res.json(Providers))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}