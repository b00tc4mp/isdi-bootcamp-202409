import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { cyclePhase } } = req

    return logic.getNutritionTips(userId, cyclePhase).then(menstruationTips => res.json(menstruationTips))
})