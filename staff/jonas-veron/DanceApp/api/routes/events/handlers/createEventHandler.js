import logic from "../../../logic/index.js"
import { createFunctionalHandler } from "../../helpers/index.js"

export default createFunctionalHandler((req, res) => {
  const {
    userId,
    body: { files, text, eventDate, location },
  } = req

  return logic
    .createEvent(userId, files, text, eventDate, location)
    .then((event) => res.status(201).json({ id: event.id }))
})