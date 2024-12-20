import logic from "../../../logic/index.js"
import { createFunctionalHandler } from "../../helpers/index.js"

export default createFunctionalHandler((req, res) => {
  const {
    userId,
    params: { eventId },
  } = req

  return logic
    .getComments(userId, eventId)
    .then((comments) => res.json(comments))
})
