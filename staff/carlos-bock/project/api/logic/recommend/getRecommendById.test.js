import 'dotenv/config'
import db from 'dat'
import getRecommendById from './getRecommendById.js'

const userId = '6754a8149c175644a60dad82'
const recommendId = '6755aa5148516cc697faf7ee'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getRecommendById(userId, recommendId)
                .then(recommend => {
                    console.log({
                        id: recommend.id,
                        author: recommend.author,
                        image: recommend.image,
                        text: recommend.text,
                        date: recommend.date,
                        upVotes: recommend.upVotes,
                        downVotes: recommend.downVotes,
                        comments: recommend.comments,
                        country: recommend.country,
                        city: recommend.city,
                        category: recommend.category,
                        price: recommend.price,
                        subject: recommend.subject,
                    });
                })
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())
