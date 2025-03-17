import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // req.params faria referencia a la ruta -> p.ex. /:userId/ o :/targetUserId/ amb req. ho agafem del JWT token, mes segur pq un usuari nomes pot modificar les seves dades
    const { name, dateOfBirth, gender, targetGender, artists, bio, location, minAge, maxAge, distance, coordinates } = req.body

    await logic.updateUserProfile(userId, { name, dateOfBirth, gender, targetGender, artists, bio, location, minAge, maxAge, distance, coordinates })

    res.status(204).send()
})
// posar un Error a la logica dsp per si no s'introdueixen els camps? mirar el Register i Login pq en teoria hauria d'estar fet a unsocial?