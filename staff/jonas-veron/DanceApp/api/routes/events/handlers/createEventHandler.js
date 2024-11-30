import logic from "../../../logic/index.js"
import { createFunctionalHandler } from "../../helpers/index.js"

export default createFunctionalHandler((req, res) => {
  const {
    userId,
    body: { image, text },
  } = req

  return logic
    .createEvent(userId, image, text)
    .then((event) => res.status(201).json({ id: event.id }))
})
