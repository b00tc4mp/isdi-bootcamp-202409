import logic from '../../../logic/index.js'
import createFunctionalHandler from '../../helpers/createFunctionalHandler.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { recommendId }, body: { text } } = req

    return logic.addComment(userId, recommendId, text)
        .then(() => res.status(201).send())
})