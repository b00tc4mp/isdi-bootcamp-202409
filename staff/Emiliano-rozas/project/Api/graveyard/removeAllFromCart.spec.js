import 'dotenv/config';
import db, { User, Product, Cart, CartItem } from 'dat';
import { errors } from 'com';
import removeAllFromCart from '../removeAllFromCart.js';
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose';

const { Types: { ObjectId } } = mongoose;
const { NotFoundError } = errors;

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('removeAllFromCart', () => {
    let user, product, cartItem, cart

    beforeEach(async () => {
        await db.connect(process.env.MONGO_URL_TEST)
    })

    beforeEach(async () => {
        await Promise.all([
            User.deleteMany(),
            Product.deleteMany(),
            Cart.deleteMany(),
            CartItem.deleteMany()
        ])

        user = await User.create({
            name: 'Eddie Brook',
            email: 'eddie@brook.com',
            username: 'venom',
            password: bcrypt.hashSync('123123123', 10)
        })

        product = await Product.create({
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

        cartItem = await CartItem.create({
            product: product._id,
            quantity: 2
        })

        cart = await Cart.create({
            user: user._id,
            items: [cartItem._id],
            totalPrice: cartItem.quantity * product.price
        })
    })

    it('succeds on removing an item from cart', async () => {
        const response = await removeAllFromCart(user._id.toString(), cartItem._id.toString())

        expect(response).to.exist
        expect(response).to.have.property('message', 'Item removed from cart succesfully')

        const updatedCart = await Cart.findOne({ user: user._id })
        expect(updatedCart).to.exist
        expect(updatedCart.items).to.be.an('array').that.is.empty
        expect(updatedCart.totalPrice).to.equal(0)
    })

    it('fails when user doesnt exist', async () => {
        expect(removeAllFromCart(new ObjectId().toString(), cartItem._id.toString())).to.be.rejectedWith(NotFoundError, 'cart not found');
    });

    it('fails when cart item doesntt exist', async () => {
        expect(removeAllFromCart(user._id.toString(), new ObjectId().toString())).to.be.rejectedWith(NotFoundError, 'cart item not found');
    });

    it('updates totalPrice correctly when there are remaining items in the cart', async () => {
        const secondProduct = await Product.create({
            title: 'One Piece Vol. 1',
            author: 'Eiichiro Oda',
            publisher: 'Shueisha',
            isbn: '9876543210',
            price: 12.99,
            description: 'The first volume of One Piece manga.',
            category: 'Manga',
            status: 'published',
            stock: 30,
            image: 'https://m.media-amazon.com/images/I/81s6DUyQCZL.jpg',
            bestSeller: true
        });

        const secondCartItem = await CartItem.create({
            product: secondProduct._id,
            quantity: 1
        });

        cart.items.push(secondCartItem._id);
        cart.totalPrice += secondCartItem.quantity * secondProduct.price;
        await cart.save();

        // eliminamos el primer CartItem
        const response = await removeAllFromCart(user._id.toString(), cartItem._id.toString());

        expect(response).to.exist;
        expect(response).to.have.property('message', 'Item removed from cart succesfully');

        // Verificar que el carrito sigue teniendo items y que el totalPrice es correcto
        const updatedCart = await Cart.findOne({ user: user._id }).populate('items');
        expect(updatedCart).to.exist;
        expect(updatedCart.items).to.be.an('array').that.has.lengthOf(1);
        expect(updatedCart.items[0]._id.toString()).to.equal(secondCartItem._id.toString());

        // Verificar el precio total actualizado
        expect(updatedCart.totalPrice).to.equal(secondCartItem.quantity * secondProduct.price);
    })

    after(async () => {
        await db.disconnect();
    });
});
