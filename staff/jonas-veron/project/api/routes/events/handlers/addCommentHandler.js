import logic from "../../../logic/index.js"
import { createFunctionalHandler } from "../../helpers/index.js"

export default createFunctionalHandler((req, res) => {
  const {
    userId,
    params: { eventId },
    body: { text },
  } = req

  return logic
    .addComment(userId, eventId, text)
    .then(() => res.status(201).send())
})
