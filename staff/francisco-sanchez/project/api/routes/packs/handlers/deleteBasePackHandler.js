import logic from "../../../logic/index.js";
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { basePackId } } = req

    return logic.deleteBasePack(userId, basePackId).then(() => {
        res.status(204).send()
    })
})