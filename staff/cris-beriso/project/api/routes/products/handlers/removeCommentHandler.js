import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
  const { userId, params: { productId, commentId } } = req

  return logic.removeComment(userId, productId, commentId).then(() => res.status(204).send())
})