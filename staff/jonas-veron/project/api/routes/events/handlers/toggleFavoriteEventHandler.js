import logic from "../../../logic/index.js"
import { createFunctionalHandler } from "../../helpers/index.js"

export default createFunctionalHandler((req, res) => {
  const {
    userId,
    params: { eventId },
  } = req

  return logic
    .toggleFavoriteEvent(userId, eventId)
    .then(() => res.status(204).send())
})
