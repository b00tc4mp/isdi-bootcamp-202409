import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { formattedDate }, body: { formData } } = req

    return logic.createDayLog(userId, formattedDate, formData).then(() => res.status(201).send())
})