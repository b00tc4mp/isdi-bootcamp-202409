import 'dotenv/config'
import db from 'dat'
import getNutritionTips from './getNutritionTips.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getNutritionTips('67559e378e4a0d332e927d4e', 'menstruation')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())