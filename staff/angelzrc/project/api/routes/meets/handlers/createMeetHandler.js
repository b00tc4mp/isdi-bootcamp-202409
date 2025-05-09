import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {

    const { author, interests, trending, location, startTime, endTime, address, placeName } = req.body

    await logic.createMeet(author, interests, trending, location, startTime, endTime, address, placeName)

    res.status(201).send()

}) 