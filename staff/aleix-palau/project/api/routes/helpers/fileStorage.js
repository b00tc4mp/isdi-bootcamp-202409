// REVIEW
import fs from 'fs'
import path from 'path'
import { ValidationError } from 'com'

export const savePicture = async (base64Image) => {
    if (!base64Image.startsWith('data:image/')) {
        throw new ValidationError('Invalid image format')
    }

    // Extract metadata and image data
    const [metadata, data] = base64Image.split('base64,')
    const fileType = metadata.split('/')[1]

    // Create a unique filename
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileType}`
    const uploadPath = path.resolve('uploads', fileName)

    // Decode the base64 image
    const buffer = Buffer.from(data, 'base64')

    // Save the file
    await fs.promises.mkdir(path.dirname(uploadPath), { recursive: true }) // Ensure the uploads directory exists
    await fs.promises.writeFile(uploadPath, buffer)

    // Return the file path relative to the server
    return `/uploads/${fileName}`
}