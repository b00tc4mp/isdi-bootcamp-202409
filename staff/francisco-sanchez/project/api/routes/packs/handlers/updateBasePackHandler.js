import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {

    /* console.log("Headers recibidos:", req.headers);
    console.log("Params recibidos:", req.params);
    console.log("Body recibido:", req.body); */

    const { userId, params: { basePackId }, body: { packName, description, quantity, unit, expiringTime, price, currency } } = req

    return logic.updateBasePack(userId, basePackId, packName, description, quantity, unit, expiringTime, price, currency)
        .then(() => {
            res.status(201).send()
        })
})