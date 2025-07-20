import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
  const {
    userId,
    body: { files, text },
  } = req

  return logic.createAd(userId, files, text).then(() => res.status(201).send())
})
