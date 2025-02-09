import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    console.log('Request body:', req.body)
    const { userId } = req.params // Extract userId from route parameters
    const { pictures } = req.body // Extract Base64-encoded pictures from the request body

    const uploadedPictures = await logic.uploadUserPictures(userId, pictures)

    res.status(201).json({ message: 'Pictures uploaded successfully', pictures: uploadedPictures })
})