import 'dotenv/config'
import db from 'dat'
import createAd from './createAd.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  const result = await createAd(
    '674ddc9c63c2125637d88dce',
    'https://imagenes.cope.es/files/content_image/uploads/2024/07/11/669038a685834.jpeg',
    'necesito una persona joven para ayuda en el hogar'
  )
  console.log(result)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
