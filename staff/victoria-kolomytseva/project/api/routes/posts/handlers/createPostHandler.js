import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: { image, text, whatHappened, petType, petGender, location } } = req

    return logic.createPost(userId, image, whatHappened, petType, petGender, text, location).then(() => res.status(201).send())
})