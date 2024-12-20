import 'dotenv/config'
import db from 'dat/index.js'
import toggleFavoriteAd from './toggleFavoriteAd.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return toggleFavoriteAd('67520001d1bbbf4d3aca2f83', '6752fb14b932cd8518867632')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
