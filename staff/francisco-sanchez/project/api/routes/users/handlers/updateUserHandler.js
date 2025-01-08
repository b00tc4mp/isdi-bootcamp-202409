import logic from "../../../logic/index.js"

import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {

    /* console.log("Headers recibidos:", req.headers);
    console.log("Params recibidos:", req.params);
    console.log("Body recibido:", req.body); */

    const { userId, params: { targetUserId }, body: { username, email, name, surname1, surname2, dni, biography, country, province, city, postalCode, address1, address2, number, flat, legalName, website } } = req

    return logic.updateUser(userId, targetUserId, username, email, name, surname1, surname2, dni, biography, country, province, city, postalCode, address1, address2, number, flat, legalName, website)
        .then(() => {
            res.status(201).send()
        })
})