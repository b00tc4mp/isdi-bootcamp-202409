import { createFunctionalHandler } from '../../helpers/index.js'
import logic from '../../../logic/index.js'

export default createFunctionalHandler((req, res) => {
  const {
    userId,
    params: { adId },
  } = req
  return logic.getReviews(userId, adId).then((reviews) => res.json(reviews))
})
