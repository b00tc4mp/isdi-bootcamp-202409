import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    let { userId, query: { q, distance, coords } } = req

    distance = Number(distance)

    coords = coords.split(',').map(coord => Number(coord))

    try {
        logic.searchHCP(userId, q, distance, coords)
            .then(healthCareProviders => res.json(healthCareProviders))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}