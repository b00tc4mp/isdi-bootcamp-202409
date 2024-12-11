import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import bcrypt from 'bcryptjs';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User, Product, Order, OrderItem } from 'dat';
import getOrders from './getOrders.js';
import { errors } from 'com';
import mongoose from 'mongoose';

const { Types: { ObjectId } } = mongoose;
const { NotFoundError } = errors;

describe('getOrders', () => {
    before(async () => {
        await db.connect(process.env.MONGO_URL_TEST);
    });

    let regularUser1, regularUser2, adminUser, product1, product2, orderItem1, orderItem2, order1, order2;

    beforeEach(async () => {
        await Promise.all([
            User.deleteMany(),
            Product.deleteMany(),
            Order.deleteMany(),
            OrderItem.deleteMany(),
        ]);

        regularUser1 = await User.create({
            name: 'Eddie Brook',
            email: 'eddie@brook.com',
            username: 'venom',
            password: bcrypt.hashSync('123123123', 10),
            role: 'regular',
        });

        regularUser2 = await User.create({
            name: 'Eddier Brook',
            email: 'eddier@brook.com',
            username: 'venom2',
            password: bcrypt.hashSync('123123124', 10),
            role: 'regular',
        });

        adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@store.com',
            username: 'admin',
            password: bcrypt.hashSync('admin123', 10),
            role: 'moderator',
        });

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
        });

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
        });

        orderItem1 = await OrderItem.create({
            product: product1,
            quantity: 2,
        });

        orderItem2 = await OrderItem.create({
            product: product2,
            quantity: 1,
        });

        order1 = await Order.create({
            user: regularUser1._id,
            items: [orderItem1._id, orderItem2._id],
            totalPrice: product1.price * 2 + product2.price,
            status: 'pending',
        });

        order2 = await Order.create({
            user: regularUser2._id,
            items: [orderItem1._id],
            totalPrice: product1.price * 2,
            status: 'confirmed',
        });
    });

    it.only('succeeds in retrieving orders for a regular user', async () => {
        const order = await getOrders(regularUser1._id.toString());

        expect(order).to.be.an('array').that.has.lengthOf(1);

        expect(order).to.exist;
        expect(order.user._id.toString()).to.equal(regularUser1._id.toString());
        expect(order.totalPrice).to.equal(order1.totalPrice);
    });

    it.only('succeeds in retrieving all orders for an admin user', async () => {
        const orders = await getOrders(adminUser._id.toString());

        expect(orders).to.be.an('array').that.has.lengthOf(2);

        const [userOrder1, userOrder2] = orders;

        expect(userOrder1).to.exist;
        expect(userOrder1.user.id).to.equal(regularUser1._id.toString());
        expect(userOrder1.totalPrice).to.equal(order1.totalPrice);

        expect(userOrder2).to.exist;
        expect(userOrder2.user.id).to.equal(regularUser2._id.toString());
        expect(userOrder2.totalPrice).to.equal(order2.totalPrice);
    });

    it.only('fails when user does not exist', async () => {
        await expect(getOrders(new ObjectId().toString())).to.be.rejectedWith(NotFoundError, 'User not found');
    });

    after(async () => {
        await db.disconnect();
    });
});
