import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req.params // req.params fa referencia a la ruta -> p.ex. /:userId/ o :/targetUserId/
    const { name, dateOfBirth, gender, targetGender, artists, bio, location } = req.body

    await logic.updateUserProfile(userId, { name, dateOfBirth, gender, targetGender, artists, bio, location })

    res.status(204).send()
})
// posar un Error a la logica dsp per si no s'introdueixen els camps? mirar el Register i Login pq en teoria hauria d'estar fet a unsocial?