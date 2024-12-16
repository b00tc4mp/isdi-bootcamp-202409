import 'dotenv/config'
import db from 'dat'
import getProducts from '../getProducts.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getProducts()
                .then(products => console.log(products.map(({
                    title,
                    author,
                    publisher,
                    isbn,
                    price,
                    description,
                    category,
                    status,
                    stock,
                    image,
                    reviews
                }) => ({
                    title,
                    author,
                    publisher,
                    isbn,
                    price,
                    description,
                    category,
                    status,
                    stock,
                    image,
                    reviews
                }))))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())
