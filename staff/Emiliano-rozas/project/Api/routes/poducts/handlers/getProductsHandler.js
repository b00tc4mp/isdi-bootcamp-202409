import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../../middleware/index.js'

export default createFunctionalHandler(async (req, res) => {
    const products = await logic.getProducts()

    res.status(200).json(products)
})