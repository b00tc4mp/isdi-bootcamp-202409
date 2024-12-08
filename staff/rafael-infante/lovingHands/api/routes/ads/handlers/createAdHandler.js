import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
  const {
    userId,
    body: { files, text, location },
  } = req

  return logic.createAd(userId, files, text, location).then((ad) => res.status(201).json(ad))
})
