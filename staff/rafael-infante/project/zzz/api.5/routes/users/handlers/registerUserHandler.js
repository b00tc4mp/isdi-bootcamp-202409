import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
  const { name, email, password, passwordRepeat, telephone, role } = req.body

  await logic.registerUser(name, email, password, passwordRepeat, telephone, role)

  res.status(201).send()
})
