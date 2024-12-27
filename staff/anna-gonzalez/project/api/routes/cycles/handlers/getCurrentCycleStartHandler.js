import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req

    return logic.getCurrentCycleStart(userId).then(currentCycle => res.json(currentCycle))
})