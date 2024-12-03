import { Pack, User, Activity } from 'dat';

import { validate, errors } from 'com';

const { SystemError } = errors

export default (
    refPack,
    provider,
    customer,
    description,
    originalQuantity,
    remmainingQuantity,
    unit,
    price,
    currency,
    purchaseDate,
    expiryDate,
    status
) => {

    return (async () => {
        try {

            //First we're going to create the pack
            const newPack = await Pack.create({
                refPack,
                provider,
                customer,
                description,
                originalQuantity,
                remmainingQuantity,
                unit,
                price,
                currency,
                purchaseDate,
                expiryDate,
                status
            })

            //Segond step we are going to update provider user with new ownPack
            const updateProvider = await User.findByIdAndUpdate(
                provider,
                {
                    $push: {
                        ownPacks: newPack._id,
                    },
                    $addToSet: {
                        customers: customer
                    }
                },
                { new: true }
            )

            //Tird step we ara going to update de customer user with adquiredPack
            const updateCustomer = await User.findByIdAndUpdate(
                customer,
                { $push: { adquiredPacks: newPack._id } },
                { new: true }
            )

            //Forth step, create an entry in the History table
            const addActivity = await Activity.create({
                pack: newPack._id,
                date: new Date(),
                description: `Pack added: ${description}`,
                operation: 'add',
                quantity: originalQuantity,
            })

            /*             console.log('Pack added and updated sucessfully', {
                            pack: newPack._id,
                            updateProvider,
                            updateCustomer,
                            addActivity
                        })
             */
            return {
                pack: newPack._id,
                updateProvider,
                updateCustomer,
                addActivity
            }

        } catch (error) {
            console.error('Error adding pack', error.message)
            throw new SystemError(error.message)
        }
    })()
}