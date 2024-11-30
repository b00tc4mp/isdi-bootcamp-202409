import logic from "../../../logic/index.js"
import { createFunctionalHandler } from "../../helpers/index.js"

export default createFunctionalHandler((req, res) => {
  const { userId } = req

  return logic.getEvents(userId).then((events) => res.json(events))
})
