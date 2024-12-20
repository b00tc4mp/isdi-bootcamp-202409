import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User, Product, Cart, CartItem } from 'dat'
import { errors } from 'com';

const { NotFoundError } = errors;

import addToCart from '../addToCart.js';


describe('addToCart', () => {
    before(async () => {
        await db.connect(process.env.MONGO_URL_TEST)
    })

    beforeEach(async () => {
        await Promise.all([
            User.deleteMany(),
            Product.deleteMany(),
            Cart.deleteMany(),
            CartItem.deleteMany(),
        ])
    })

    it('succeeds on adding a product to cart', async () => {
        const user = await User.create({
            name: 'Eddie Brook',
            email: 'eddie@brook.com',
            username: 'venom',
            password: bcrypt.hashSync('123123123', 10)
        })

        const product = await Product.create({
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
        const response = await addToCart(user._id.toString(), product._id.toString(), 3)

        expect(response).to.exist
        expect(response).to.have.property('message', 'Product added to cart successfully')
        expect(response.cart.user.toString()).to.equal(user._id.toString());
        expect(response.cart.items).to.be.an('array').that.has.lengthOf(1);
        expect(response.cart.totalPrice).to.equal(3 * product.price);
    })

    it('fails when user does not exist', async () => {
        const fakeUserId = '507f1f77bcf86cd799439011';
        const product = await Product.create({
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
            reviews: [],
            bestSeller: true
        })

        await expect(addToCart(fakeUserId, product._id.toString(), 2)).to.be.rejectedWith(NotFoundError, 'User not Found');
    });

    it('fails when product does not exist', async () => {
        const user = await User.create({
            name: 'Eddie Brook',
            email: 'eddie@brook.com',
            username: 'venom',
            password: bcrypt.hashSync('123123123', 10)
        })

        const fakeProductId = '507f1f77bcf86cd799439012';

        await expect(addToCart(user._id.toString(), fakeProductId, 2)).to.be.rejectedWith(NotFoundError, 'Product not found');
    });

    after(async () => {
        await db.disconnect();
    });
});
