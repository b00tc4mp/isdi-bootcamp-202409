import 'dotenv/config'
import db from 'dat'
import getProducts from './getProducts.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getProducts('') // datos del mongoose
                .then(products => console.log(products.map(({ id, author, image, text, date, liked, comments }) => ({ id, author, image, text, date, liked, likes, comments }))))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())