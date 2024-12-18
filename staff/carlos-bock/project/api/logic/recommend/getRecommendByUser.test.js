import 'dotenv/config'
import db from 'dat'
import getRecommendByUser from './getRecommendByUser.js'

const userId = '6754a8149c175644a60dad82'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getRecommendByUser(userId)
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