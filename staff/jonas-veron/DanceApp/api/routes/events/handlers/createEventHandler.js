import logic from "../../../logic/index.js"
import { createFunctionalHandler } from "../../helpers/index.js"

export default createFunctionalHandler((req, res) => {
  const {
    userId,
    body: { images, type, text, date, location },
  } = req

  return logic
    .createEvent(userId, images, type, text, date, location)
    .then(() => res.status(201).send())
})
