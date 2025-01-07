import { Pack, User, Activity, Payment } from 'dat';

import { validate, errors } from 'com';

/* import { findUserIdbyEmailOrUsername, getBasePackDetails } from '../../logic/index.js'; */
import { findUserIdbyEmailOrUsername } from '../helpers/index.js';
import getBasePackDetails from '../packs/getBasePackDetails.js';

const { SystemError, NotFoundError } = errors

export default async (userId, customerSearch, selectPack, payedAmount, paymentMethod) => {
    try {
        const customerId = await findUserIdbyEmailOrUsername(userId, customerSearch)
        if (!customerId) {
            throw new NotFoundError('Customer not found')
        }

        const basePack = await getBasePackDetails(selectPack)
        if (!basePack) {
            throw new SystemError('Base pack not found');
        }

        const {
            description,
            quantity,
            unit,
            expiringTime,
            price,
            currency,
        } = basePack;


        const purchaseDate = new Date();
        const expiryDate = expiringTime === -1 ? new Date('9999-12-31') :
            new Date(new Date().setMonth(new Date().getMonth() + expiringTime));

        const status = 'Active';


        //First we're going to create the pack
        const newPack = await Pack.create({
            refPack: selectPack,
            provider: userId,
            customer: customerId,
            description,
            originalQuantity: quantity,
            remainingQuantity: quantity,
            unit,
            price,
            currency,
            purchaseDate,
            expiryDate,
            status
        })

        //Second step we are going to update provider user with new ownPack
        const updateProvider = await User.findByIdAndUpdate(userId,
            {
                $push: {
                    ownPacks: newPack._id,
                },
                $addToSet: {
                    customers: customerId
                }
            },
            { new: true }
        )

        //Tird step we ara going to update de customer user with adquiredPack
        const updateCustomer = await User.findByIdAndUpdate(customerId,
            { $push: { adquiredPacks: newPack._id } },
            { new: true }
        )

        //Forth step, create an entry in the History table
        const addActivity = await Activity.create({
            pack: newPack._id,
            date: new Date(),
            description: `Pack added: ${description}`,
            operation: 'add',
            quantity: quantity,
        })

        //Fifth step, update payments

        let paymentStatus = ''
        let payedAmountNum = Number(payedAmount)
        if ((payedAmountNum < price) && (payedAmountNum > 0)) { paymentStatus = 'partially payed' }
        else if (payedAmountNum === 0) { paymentStatus = 'pending' }
        else if (payedAmountNum == price) { paymentStatus = 'completed' }
        else if (payedAmountNum > price) { paymentStatus = 'completed' }

        const addPayment = await Payment.create({
            pack: newPack._id,
            amount: payedAmountNum,
            currency: currency,
            date: new Date(),
            method: paymentMethod,
            status: paymentStatus,
        })

        return {
            pack: newPack._id,
            updateProvider,
            updateCustomer,
            addActivity,
            addPayment
        }

    } catch (error) {
        console.error('Error adding pack', error.message)
        throw new SystemError(error.message)
    }
}