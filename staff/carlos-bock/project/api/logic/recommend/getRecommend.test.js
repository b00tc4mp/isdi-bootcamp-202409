import 'dotenv/config'
import db from '../../../dat/index.js' //import db from 'dat' // check routes
import getRecommend from './getRecommend.js'

const userId = '674dd83edb9525488c8f7770'

db.connect('mongodb://127.0.0.1:27017/mired')//process.env.MONGO_URL
    .then(() => {
        try {
            return getRecommend(userId)
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