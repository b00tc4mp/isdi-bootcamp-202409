import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
  const { userId, query: { category, keyword } } = req

  return logic.searchProducts(userId, category, keyword).then(products => res.json(products))
})