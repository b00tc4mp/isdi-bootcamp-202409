import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { Product, Review, User } from 'dat'
import getProducts from '../getProducts.js'

describe('getProducts', () => {
    before(async () => {
        await db.connect(process.env.MONGO_URL_TEST)
    })

    beforeEach(async () => {
        await Promise.all([
            Product.deleteMany(),
            User.deleteMany(),
            Review.deleteMany(),
        ])
    })
    // probamos que devuelva todo bien
    it('succeeds on retrieving all products', async () => {
        const user = await User.create({ name: 'Eddie Brook', email: 'eddie@brook.com', username: 'venom', password: bcrypt.hashSync('123123123', 10) })

        await Product.create({
            title: 'Naruto Vol. 1',
            author: 'Masashi Kishimoto',
            publisher: 'Shueisha',
            isbn: '1234567890',
            price: 9.99,
            description: 'The first volume of Naruto manga.',
            category: 'Manga',
            status: 'published',
            stock: 50,
            image: 'https://m.media-amazon.com/images/I/91FPoNmEUsL._UF1000,1000_QL80_.jpg',
            reviews: [
                {
                    author: user._id,
                    rating: 5,
                    text: 'Great manga!',
                },
                {
                    author: user._id,
                    rating: 4,
                    text: 'Very entertaining!',
                }
            ],
            bestSeller: true
        })

        const products = await getProducts()

        expect(products).to.exist
        expect(products).to.be.an('array')
        //Mongosee devuelve siempre array con el metodo Find()
        expect(products).to.have.lengthOf(1)

        const [product] = products

        expect(product).to.have.property('id')
        expect(product).to.have.property('title', 'Naruto Vol. 1')
        expect(product).to.have.property('author', 'Masashi Kishimoto')
        expect(product).to.have.property('publisher', 'Shueisha')
        expect(product).to.have.property('isbn', '1234567890')
        expect(product).to.have.property('price', 9.99)
        expect(product).to.have.property('category', 'Manga')
        expect(product).to.have.property('status', 'published')
        expect(product).to.have.property('stock', 50)
        expect(product).to.have.property('image', 'https://m.media-amazon.com/images/I/91FPoNmEUsL._UF1000,1000_QL80_.jpg')
        expect(product).to.have.property('reviews')
        expect(product).to.have.property('bestSeller')
        expect(product.bestSeller).to.be.a('boolean')

        expect(product.images).to.be.an('array')  // Aunque las imagenes` sean opcional, debería ser un array si está presente
        expect(product.reviews).to.be.an('array')
        expect(product.reviews).to.have.lengthOf(2)

        const [review1, review2] = product.reviews

        expect(review1).to.have.property('author')
        expect(review1).to.have.property('rating', 5)
        expect(review1).to.have.property('text', 'Great manga!')

        expect(review2).to.have.property('author')
        expect(review2).to.have.property('rating', 4)
        expect(review2).to.have.property('text', 'Very entertaining!')
    })
    after(async () => {
        await db.disconnect()
    })
})
