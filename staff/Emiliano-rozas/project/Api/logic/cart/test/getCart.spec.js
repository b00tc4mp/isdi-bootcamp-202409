import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const { Types: { ObjectId } } = mongoose

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product, Cart, CartItem } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import getCart from '../getCart.js'

describe('getCart', () => {
    before(async () => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(async () => {
        await Promise.all([
            User.deleteMany(),
            Product.deleteMany(),
            Cart.deleteMany(),
            CartItem.deleteMany(),
        ])
    })

    it('Succeeds on retriving cart', async () => {
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

        const cartItem = await CartItem.create({ product: product._id, quantity: 2 })

        await Cart.create({ user: user._id, items: [cartItem._id], totalPrice: 2 * product.price })

        const cart = await getCart(user._id.toString())

        expect(cart).to.exist
        expect(cart.items).to.be.an('array').that.has.lengthOf(1)
        expect(cart.items[0]).to.have.property('quantity', 2)
        expect(cart.totalPrice).to.equal(2 * product.price)
    })

    it('fails when user dont exist', async () => {
        await expect(getCart(new ObjectId().toString())).to.be.rejectedWith(NotFoundError, 'user not found')
    })

    it('fails when cart doesnt exist', async () => {
        const user = await User.create({
            name: 'Eddie Brook',
            email: 'eddie@brook.com',
            username: 'venom',
            password: bcrypt.hashSync('123123123', 10)
        })
        await expect(getCart(user._id.toString())).to.be.rejectedWith(NotFoundError, 'cart not found')
    })
    after(async () => {
        await db.disconnect()
    })
})