import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { formattedDate } } = req

    return logic.getCurrentDayLog(userId, formattedDate).then(currentDaylog => res.json(currentDaylog))
})