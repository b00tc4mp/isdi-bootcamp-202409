import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
  const { userId, params: { productId } } = req

  return logic.getComments(userId, productId).then(comments => res.json(comments))
})