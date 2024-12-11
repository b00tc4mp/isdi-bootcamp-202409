import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: { image, text } } = req

    return logic.createProduct(userId, image, text).then(() => res.status(201).send())
})