import 'dotenv/config'
import db from 'dat'
import createAd from './createAd.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  const result = await createAd(
    '67504fa1fa7ac0276ab8b05b',
    ['https://imagenes.cope.es/files/content_image/uploads/2024/07/11/669038a685834.jpeg'],
    'necesito una persona joven para ayuda en el hogar'
  )
  console.log(result)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
