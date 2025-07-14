import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req
    const { name, dateOfBirth, gender, targetGender, artists, bio, location, minAge, maxAge, distance, coordinates, spotifyId, spotifyAccessToken, spotifyRefreshToken } = req.body

    await logic.updateUserProfile(userId, { name, dateOfBirth, gender, targetGender, artists, bio, location, minAge, maxAge, distance, coordinates, spotifyId, spotifyAccessToken, spotifyRefreshToken })

    res.status(204).send()
})
// req.params faria referencia a la ruta -> p.ex. /:userId/ o :/targetUserId/ amb req. ho agafem del JWT token, mes segur pq un usuari nomes pot modificar les seves dades