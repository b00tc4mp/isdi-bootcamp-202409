import logic from "../../../logic/index.js";
import { createFunctionalHandler } from '../../helpers/index.js';

export default createFunctionalHandler(async (req, res) => {
    const { refPack,
        provider,
        customer,
        description,
        originalQuantity,
        remmainingQuantity,
        unit,
        price,
        currency,
        purchaseDate,
        expiryDate,
        status } = req.body

    await (logic.assignPack(refPack,
        provider,
        customer,
        description,
        originalQuantity,
        remmainingQuantity,
        unit,
        price,
        currency,
        purchaseDate,
        expiryDate,
        status))

    res.status(201).send()
})