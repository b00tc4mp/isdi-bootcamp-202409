import logic from "../../../logic/index.js"
import { createFunctionalHandler } from "../../helpers/index.js"

export default createFunctionalHandler((req, res) => {
  const {
    userId,
    body: { image, text, date, location },
  } = req

  return logic
    .createEvent(userId, image, text, date, location)
    .then((event) => res.status(201).json({ id: event.id }))
})
