import 'dotenv/config';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import bcrypt from 'bcryptjs';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User, Product, Order, OrderItem } from 'dat';
import getOrders from './getOrders.js';
import { errors } from 'com';
const { SystemError } = errors;

describe('getOrders', () => {
    before(async () => {
        await db.connect(process.env.MONGO_URL_TEST);
    });

    let user, product1, product2, orderItem1, orderItem2, order;

    beforeEach(async () => {
        await Promise.all([
            User.deleteMany(),
            Product.deleteMany(),
            Order.deleteMany(),
            OrderItem.deleteMany(),
        ]);

        user = await User.create({
            name: 'Eddie Brook',
            email: 'eddie@brook.com',
            username: 'venom',
            password: bcrypt.hashSync('123123123', 10),
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

        order = await Order.create({
            user: user._id,
            items: [orderItem1._id, orderItem2._id],
            totalPrice: product1.price * 2 + product2.price,
            status: 'pending',
        });
    });

    it('succeeds in retrieving all orders', async () => {
        const orders = await getOrders();

        expect(orders).to.be.an('array').that.is.not.empty;

        const retrievedOrder = orders.find(o => o.id === order._id.toString());

        expect(retrievedOrder).to.exist;
        expect(retrievedOrder.user.id).to.equal(user._id.toString());
        expect(retrievedOrder.user.name).to.equal(user.name);
        expect(retrievedOrder.items).to.have.lengthOf(2);
        expect(retrievedOrder.totalPrice).to.equal(order.totalPrice);

        const item1 = retrievedOrder.items.find(item => item.product.id === product1._id.toString());
        const item2 = retrievedOrder.items.find(item => item.product.id === product2._id.toString());

        expect(item1).to.exist;
        expect(item1.product.title).to.equal(product1.title);
        expect(item1.quantity).to.equal(2);

        expect(item2).to.exist;
        expect(item2.product.title).to.equal(product2.title);
        expect(item2.quantity).to.equal(1);
    });

    it('fails on database issues', async () => {
        try {
            await getOrders.call(null); // Simulamos un fallo
            throw new SystemError('Should not reach this line');
        } catch (error) {
            expect(error).to.be.instanceOf(SystemError);
        }
    });

    after(async () => {
        await db.disconnect();
    });
});
