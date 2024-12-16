import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    console.log("ready to add ")
    //const { userId, body: {data } } = req
    const { userId, body: { day, openTime, closeTime } } = req
    console.log(day, openTime, closeTime)
    
    //(userId, data)
    return logic.addOpeningHours(userId, day, openTime, closeTime).then(() => res.status(201).send())
})