import { User } from '../../../../dat/models.js'

export default async function getUserDataHandler(req, res) {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: 'Unauthorized: No user ID provided' })
        }

        const user = await User.findById(req.userId).select('name petType')

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.json(user)
    } catch (error) {
        res.status(500).json({ error: 'Server error', message: error.message })
    }
}
