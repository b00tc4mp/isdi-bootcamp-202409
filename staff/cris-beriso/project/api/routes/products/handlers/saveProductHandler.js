import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
  const { userId, params: { productId } } = req

  return logic.saveProduct(userId, productId).then(() => res.status(204).send())
})