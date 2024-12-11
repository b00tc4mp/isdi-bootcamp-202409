import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: data } = req
    data['diver'] = userId;

    return logic.createLog(data).then(() => res.status(201).send())
})