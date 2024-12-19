import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { cyclePhase } } = req

    return logic.getTips(userId, cyclePhase).then(musicTips => res.json(musicTips))
})