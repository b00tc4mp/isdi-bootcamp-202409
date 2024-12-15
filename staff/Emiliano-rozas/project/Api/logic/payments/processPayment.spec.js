import 'dotenv/config';
import db, { User, Order } from 'dat';
import processPayment from './processPayment.js';
import * as stripePaymentModule from './stripePayment.js'; // Importa el módulo completo para stubbing
import sinon from 'sinon';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import bcrypt from 'bcryptjs';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('processPayment', () => {
    let user, order;

    beforeEach(async () => {
        await db.connect(process.env.MONGO_URL_TEST);

        await Promise.all([
            User.deleteMany(),
            Order.deleteMany(),
        ]);

        user = await User.create({
            name: 'Eddie Brook',
            email: 'eddie@brook.com',
            username: 'venom',
            password: bcrypt.hashSync('123123123', 10),
        });

        order = await Order.create({
            user: user._id,
            items: [],
            totalPrice: 100.00,
            status: 'pending',
        });
    });

    afterEach(() => {
        sinon.restore(); // Limpia los mocks después de cada prueba
    });

    it('succeeds when payment is successful', async () => {
        // Stub para simular un pago exitoso con Stripe
        sinon.stub(stripePaymentModule, 'default').resolves({
            id: 'pi_fake_id',
            status: 'succeeded',
        });

        // Llama a la lógica de processPayment
        const payment = await processPayment(order._id.toString(), 'pm_fake_id', 'stripe', user._id.toString());

        // Verifica la respuesta
        expect(payment).to.have.property('success', true);
        expect(payment.paymentResult).to.have.property('id', 'pi_fake_id');
        expect(payment.paymentResult).to.have.property('status', 'succeeded');

        // Verifica que la orden se haya actualizado
        const updatedOrder = await Order.findById(order._id.toString());

        expect(updatedOrder.status).to.equal('confirmed');
    });

    after(async () => {
        await db.disconnect();
    });
});
