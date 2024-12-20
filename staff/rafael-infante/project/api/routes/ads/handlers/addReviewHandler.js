import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
  const {
    userId,
    params: { adId },
    body: { comment, calification },
  } = req

  return logic.addReview(userId, adId, comment, calification).then(() => res.status(201).send())
})
