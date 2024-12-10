import User from 'dat'
import logic from '../../../logic/getUser.js'
import createFunctionalHandler from '../../helpers/index.js'


export default createFunctionalHandler(async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await logic.getUser(userId)
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}) 