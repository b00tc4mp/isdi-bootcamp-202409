import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const { Types: { ObjectId } } = mongoose
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product, Cart, CartItem, Order, OrderItem } from 'dat'
import placeOrder from '../placeOrder.js'
import { errors } from 'com'

const { NotFoundError, SystemError } = errors

describe('placeOrder', () => {
    before(async () => {
        await db.connect(process.env.MONGO_URL_TEST)
    })

    let user, cart, product1, product2

    beforeEach(async () => {
        await Promise.all([
            User.deleteMany(),
            Product.deleteMany(),
            Cart.deleteMany(),
            CartItem.deleteMany(),
            Order.deleteMany(),
            OrderItem.deleteMany()
        ])

        user = await User.create({
            name: 'Eddie Brook',
            email: 'eddie@brook.com',
            username: 'venom',
            password: bcrypt.hashSync('123123123', 10),
        })

        product1 = await Product.create({
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
            bestSeller: true,
        })

        product2 = await Product.create({
            title: 'Batman: Year One',
            author: 'Frank Miller',
            publisher: 'DC Comics',
            isbn: '9781401207526',
            price: 19.99,
            description: "The retelling of Batman's origins.",
            category: 'comic',
            stock: 10,
            image: 'https://m.media-amazon.com/images/I/61+hFGCapwL._AC_UF894.jpg',
        })

        const cartItem1 = await CartItem.create({
            product: product1._id,
            quantity: 2,
        })

        const cartItem2 = await CartItem.create({
            product: product2._id,
            quantity: 1,
        })

        cart = await Cart.create({
            user: user._id,
            items: [cartItem1._id, cartItem2._id],
            totalPrice: (product1.price * 2) + product2.price,
        })
    })

    it('succeeds on placing order and clearing cart', async () => {
        const response = await placeOrder(user._id.toString())

        expect(response).to.exist
        expect(response).to.have.property('orderId')
        expect(response).to.have.property('order')

        const { order } = response

        expect(order.user.toString()).to.equal(user._id.toString())
        expect(order.items).to.be.an('array').that.has.lengthOf(2)
        expect(order.totalPrice).to.equal(cart.totalPrice)

        const orderItems = await OrderItem.find({ _id: order.items })

        expect(orderItems).to.have.lengthOf(2)
        expect(orderItems[0].quantity).to.equal(2)
        expect(orderItems[1].quantity).to.equal(1)

        const updatedCart = await Cart.findOne({ user: user._id })

        expect(updatedCart.items).to.be.empty
        expect(updatedCart.totalPrice).to.equal(0)
    })

    it('fails when user does not exist', async () => {
        await expect(placeOrder(new ObjectId().toString())).to.be.rejectedWith(NotFoundError, 'user not found')
    })

    it('fails when cart is empty', async () => {
        await Cart.deleteMany()

        await expect(placeOrder(user._id.toString())).to.be.rejectedWith(NotFoundError, 'cart is empty')
    })
    it('fails with SystemError database error occurs', async () => {
        await db.disconnect()
        await expect(placeOrder(user._id.toString())).to.be.rejectedWith(SystemError, 'Client must be connected before running operations')
    })

    after(async () => {
        await db.disconnect()
    })
})
