import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const { Types: { ObjectId } } = mongoose;

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User, Product, Cart, CartItem } from 'dat';
import { errors } from 'com';

const { NotFoundError } = errors;

import updateQuantity from '../updateQuantity.js';

describe('updateQuantity', () => {
    before(async () => {
        await db.connect(process.env.MONGO_URL_TEST);
    });

    beforeEach(async () => {
        await Promise.all([
            User.deleteMany(),
            Product.deleteMany(),
            Cart.deleteMany(),
            CartItem.deleteMany(),
        ]);
    });

    it('suceeds on updatin quantity of a cart item', async () => {
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
            bestSeller: true
        });
        let cart = await Cart.create({ user: user._id })
        const cartItem = await CartItem.create({ product: product._id, quantity: 1 })
        cart.items.push(cartItem)
        cart.totalPrice = product.price
        await cart.save()

        const response = await updateQuantity(user._id.toString(), cartItem._id.toString(), 3)

        expect(response).to.exist
        expect(response).to.have.property('message', 'Quantity updated successfully')
        expect(response.cart).to.have.property('totalPrice', 3 * product.price)
        expect(response.cart.items[0]).to.have.property('quantity', 3)
    })

    it('fails when user does not exist', async () => {
        expect(updateQuantity(new ObjectId().toString(), new ObjectId().toString(), 2)).to.be.rejectedWith(NotFoundError, 'user not found')
    })

    it('fails when cart doesnt exist', async () => {
        const user = await User.create({
            name: 'Eddie Brook',
            email: 'eddie@brook.com',
            username: 'venom',
            password: bcrypt.hashSync('123123123', 10)
        });
        expect(updateQuantity(user._id.toString(), new ObjectId().toString(), 2)).to.be.rejectedWith(NotFoundError, 'cart item not found')
    })
    after(async () => {
        await db.disconnect();
    });
});
