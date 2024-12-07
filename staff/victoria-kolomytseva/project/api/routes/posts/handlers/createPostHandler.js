import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: { image, text, whatHappened, petType, petGender, latitude, longitude } } = req

    console.log('req body => ', req.body)

    return logic.createPost(userId, image, whatHappened, petType, petGender, text, latitude, longitude).then(() => res.status(201).send())
})