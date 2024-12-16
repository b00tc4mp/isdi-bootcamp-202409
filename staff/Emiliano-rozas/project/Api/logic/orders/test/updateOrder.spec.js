import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const { Types: { ObjectId } } = mongoose;

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User, Product, Order, OrderItem } from 'dat';
import updateOrder from '../updateOrder.js';
import { errors } from 'com';

const { NotFoundError, SystemError } = errors;

describe('updateOrder', () => {
    let user, product, orderItem, order

    before(async () => {
        await db.connect(process.env.MONGO_URL_TEST);
    })

    beforeEach(async () => {
        await Promise.all([
            User.deleteMany(),
            Product.deleteMany(),
            Order.deleteMany(),
            OrderItem.deleteMany(),
        ])

        user = await User.create({
            name: 'Eddie Brook',
            email: 'eddie@brook.com',
            username: 'venom',
            password: bcrypt.hashSync('123123123', 10),
        });

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
            bestSeller: true,
        });

        orderItem = await OrderItem.create({
            product: product,
            quantity: 2,
        });

        order = await Order.create({
            user: user._id,
            items: [orderItem._id],
            totalPrice: product.price * 2,
            status: 'pending',
        });

    })

    it('succeds on changing order satatus', async () => {

        const updatedOrder = await updateOrder(order._id.toString(), 'confirmed')

        expect(updatedOrder).to.exist
        expect(updatedOrder.status).to.equal('confirmed')
        expect(updatedOrder.id).to.equal(order._id.toString())
    })

    it('fails when order does not exist', () => {
        expect(updateOrder(new ObjectId().toString(), 'confirmed')).to.be.rejectedWith(NotFoundError, 'order not found');
    });

    after(async () => {
        await db.disconnect();
    });
});