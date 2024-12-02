import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
  const {
    userId,
    body: { image, text },
  } = req

  return logic.createAd(userId, image, text).then(() => res.status(201).send())
})
