import logic from '../../../logic/index.js';
import createFunctoinalHandler from '../../helpers/createFunctionalHandler.js' //import { createFunctoinalHandler } from '../../helpers/index.js';

export default createFunctoinalHandler(async (req, res) => {
    const { name, email, username, password, password2 } = req.body

    await logic.registerUser(name, email, username, password, password2)

    res.status(201).send()
})