import { createFunctionalHandler } from '../../helpers/index.js'
import logic from '../../../logic/index.js'

export default createFunctionalHandler((req, res) => {
  const {
    userId,
    params: { adId, reviewId },
  } = req

  return logic.deleteReview(userId, adId, reviewId).then(() => res.status(204).send())
})
