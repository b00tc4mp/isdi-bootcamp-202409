import logic from '../../../../logic/index.js'
import { createFunctionalHandler } from "../../../helpers/index.js";

export default createFunctionalHandler(async (req, res) => {
    const { name, email, password, 'password-repeat': passwordRepeat, address, country, city, postcode, role } = req.body

    await logic.registerUserCenter(name, email, password, passwordRepeat, address, country, city, postcode, role)

    res.status(201).send()
}) 