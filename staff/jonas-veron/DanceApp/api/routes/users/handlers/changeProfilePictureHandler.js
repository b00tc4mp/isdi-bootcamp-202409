import logic from "../../../logic/index.js"
import { createFunctionalHandler } from "../../helpers/index.js"

export default createFunctionalHandler(async (req, res) => {
  const {
    userId,
    body: { image },
  } = req

  await logic.changeProfilePicture(userId, image)
  res.status(201).send()
})
