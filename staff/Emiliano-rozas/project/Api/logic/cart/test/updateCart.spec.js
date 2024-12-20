import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai
import mongoose from 'mongoose'

const { Types: { ObjectId } } = mongoose

import db, { User, Product, Cart, CartItem } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import updateCart from '../updateCart.js'


describe('updateCart', () => {

    let user, product1, cart

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
        user = await User.create({
            name: 'Eddie Brook',
            email: 'eddie@brook.com',
            username: 'venom',
            password: bcrypt.hashSync('123123123', 10)
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
            bestSeller: true
        })

        cart = await Cart.create({ user: user._id, items: [], totalPrice: 0 })
    })

    it('succeeds on adding a product to new cart', async () => {
        const NewCart = await updateCart(user._id.toString(), product1._id.toString(), 3)

        expect(NewCart).to.exist
        expect(NewCart.user.toString()).to.equal(user._id.toString())
        expect(NewCart.items).to.be.an('array').that.has.lengthOf(1)
        expect(NewCart.totalPrice).to.equal(3 * product1.price)
    })

    it('suceeds on updatin quantity of a cart item', async () => {
        const cartItem = await CartItem.create({ product: product1._id, quantity: 2 })

        cart.items.push(cartItem)

        await cart.save()

        const updatedCart = await updateCart(user._id.toString(), product1._id.toString(), 5)

        expect(updatedCart).to.exist
        expect(updatedCart.items).to.have.lengthOf(1)
        expect(updatedCart.items[0].quantity).to.equal(5)
        expect(updatedCart.totalPrice).to.equal(5 * product1.price)
    })

    it('should remove a product from the cart when quantity is 0', async () => {
        const cartItem = await CartItem.create({ product: product1._id, quantity: 2 })

        cart.items.push(cartItem)

        await cart.save()

        const EmptyCart = await updateCart(user._id.toString(), product1._id.toString(), 0)

        expect(EmptyCart.items).to.have.lengthOf(0)
        expect(EmptyCart.totalPrice).to.equal(0)
    })

    it('fails when user does not exist', async () => {
        await expect(updateCart(new ObjectId().toString(), product1._id.toString(), 2))
            .to.be.rejectedWith(NotFoundError, 'User not found')
    })

    it('fails when product not found', async () => {
        await expect(updateCart(user._id.toString(), new ObjectId().toString(), 2))
            .to.be.rejectedWith(NotFoundError, 'Product not found')
    })

    after(async () => {
        await db.disconnect()
    })
})