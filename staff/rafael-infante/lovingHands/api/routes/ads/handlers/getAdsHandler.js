import { createFunctionalHandler } from '../../helpers/index.js'
import logic from '../../../logic/index.js'

export default createFunctionalHandler((req, res) => {
  const { userId } = req
  return logic.getAds(userId).then((ads) => res.json(ads))
})
