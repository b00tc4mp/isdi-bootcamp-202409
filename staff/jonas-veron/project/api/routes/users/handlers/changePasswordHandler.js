import logic from "../../../logic/index.js"
import { createFunctionalHandler } from "../../helpers/index.js"

export default createFunctionalHandler(async (req, res) => {
  const {
    userId,
    body: { oldPassword, newPassword, newPasswordRepeat },
  } = req

  await logic.changePassword(
    userId,
    oldPassword,
    newPassword,
    newPasswordRepeat
  )
  res.status(201).send()
})
