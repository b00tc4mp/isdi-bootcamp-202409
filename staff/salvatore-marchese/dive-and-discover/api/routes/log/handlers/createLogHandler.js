import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { targetUserId } } = req
    const { diveSite, date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, notes } = req.body

    return logic.createLog(userId, targetUserId, diveSite, date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, notes).then(() => res.status(201).send())
})