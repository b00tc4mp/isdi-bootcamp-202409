import 'dotenv/config'
import db from 'dat'
import deleteAd from './deleteAd.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  await deleteAd('674ddc9c63c2125637d88dce', '674df96ea54000b5c6934c21')
  console.log('Post deleted')
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
