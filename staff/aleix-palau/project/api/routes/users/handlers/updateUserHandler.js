import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req.params
    const { name, dateOfBirth } = req.body

    await logic.updateUser(userId, { name, dateOfBirth })

    res.status(204).send()
})

// req.params fa referencia a la ruta -> p.ex. /:userId/ o :/targetUserId/

// posar un Error a la logica dsp per si no sintrodueixen els camps? mirar el register i login pq en teoria hauria d'estar fet