import 'dotenv/config'
import db from '../../../dat/index.js'
import getRecommendByCategory from './getRecommendByCategory.js'

const userId = '6754a8149c175644a60dad82'
const category = 1
const country = 'España'

db.connect('mongodb://127.0.0.1:27017/mired')//process.env.MONGO_URL
    .then(() => {
        try {
            return getRecommendByCategory(userId, category, country)
                .then(recommends => console.log(recommends.map((
                    { id, author, image, text, date, upVotes, downVotes, comments, country, city, category, price, subject }) => (
                    { id, author, image, text, date, upVotes, downVotes, comments, country, city, category, price, subject }))))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())