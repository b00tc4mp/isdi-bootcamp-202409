import { createFunctionalHandler } from '../../helpers/index.js'
import logic from '../../../logic/index.js'

export default createFunctionalHandler((req, res) => {
  const {
    userId,
    params: { adId },
  } = req

  return logic.deleteAd(userId, adId).then(() => res.status(204).send())
})
