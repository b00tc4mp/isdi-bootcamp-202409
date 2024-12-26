import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
  const {
    userId,
    body: { files, text },
  } = req

  return logic.createAd(userId, files, text).then((ad) => res.status(201).json(ad))
})
