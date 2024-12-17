import 'dotenv/config'
import db, { User, Order } from 'dat'
import processPayment from '../processPayment.js'
import Stripe from 'stripe'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const { Types: { ObjectId } } = mongoose

chai.use(chaiAsPromised)
const { expect } = chai

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

describe('processPayment', () => {
    let user, order, paymentMethodId

    beforeEach(async () => {
        await db.connect(process.env.MONGO_URL_TEST)

        await Promise.all([
            User.deleteMany(),
            Order.deleteMany(),
        ])

        user = await User.create({
            name: 'Eddie Brook',
            email: 'eddie@brook.com',
            username: 'venom',
            password: bcrypt.hashSync('123123123', 10),
        })

        order = await Order.create({
            user: user._id,
            items: [],
            totalPrice: 100.00,
            status: 'pending',
        })

        // se puede utilizar el metodo directamente
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                token: 'tok_visa', // token para pruebas, sino lo reconoce como una tarjeta real
            },
        })

        paymentMethodId = paymentMethod.id
    })

    it('succeeds when payment is successful', async () => {
        const payment = await processPayment(
            user._id.toString(),
            order._id.toString(),
            paymentMethodId,
            'stripe'
        )
        expect(payment).to.have.property('success', true)
        expect(payment.paymentResult).to.have.property('id').that.matches(/^pi_/)
        expect(payment.paymentResult).to.have.property('status', 'succeeded')

        const updatedOrder = await Order.findById(order._id.toString())

        expect(updatedOrder.status).to.equal('confirmed')
    })
    it('fails when user is not found', async () => {
        await expect(
            processPayment(new ObjectId().toString(), order._id.toString(), 'pm_card_visa', 'stripe')
        ).to.be.rejectedWith('user not found')
    })

    it('fails when order is not found', async () => {
        await expect(
            processPayment(user._id.toString(), new ObjectId().toString(), 'pm_card_visa', 'stripe')
        ).to.be.rejectedWith('order not found')
    })

    it('fails when payment provider is not supported', async () => {
        await expect(
            processPayment(user._id.toString(), order._id.toString(), 'pm_card_visa', 'paypal')
        ).to.be.rejectedWith('Not suport porvider')
    })

    it('fails when payment is not successful', async () => {
        await expect(
            processPayment(user._id.toString(), order._id.toString(), 'pm_card_chargeDeclined', 'stripe')
        ).to.be.rejectedWith('Your card was declined.')
    })

    after(async () => {
        await db.disconnect()
    })
})

