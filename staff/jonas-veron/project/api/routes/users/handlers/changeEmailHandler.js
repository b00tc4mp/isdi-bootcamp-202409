import logic from "../../../logic/index.js"
import { createFunctionalHandler } from "../../helpers/index.js"

export default createFunctionalHandler(async (req, res) => {
  const {
    userId,
    body: { oldEmail, newEmail, newEmailRepeat },
  } = req

  await logic.changeEmail(userId, oldEmail, newEmail, newEmailRepeat)
  res.status(201).send()
})
