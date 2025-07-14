import 'dotenv/config'
import db from 'dat'
import uploadUserPictures from './uploadUserPictures.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const pictures = [
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAE',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA'
    ]

    const result = await uploadUserPictures('68429f2ff01ff02aab70f0d4', pictures)

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}