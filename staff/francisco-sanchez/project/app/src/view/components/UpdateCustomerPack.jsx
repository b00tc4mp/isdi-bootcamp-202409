import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Field, Button, Input, Label, TagKO, TagOK, TagWARN } from '../../library';
import { errors } from 'com';

import useContext from '../useContext';
import logic from '../../logic';

const { SystemError } = errors

export default function UpdateCustomerPack({ onUpdated, onCancelClick, pack }) {
    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()
        const { target: form } = event
        const { packDescription: { value: packDescription },
            quantity: { value: quantity },
            unit: { value: unit },
            expiringTime: { value: expiringTime },
            price: { value: price }
        } = form
        /* try {
            logic.updateBasePack(pack.id, packDescription, packDescription, quantity, unit, expiringTime, price)
                .then(onUpdated)
                .catch((error) => {
                    alert(error.message)
                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        } */
    }

    const handleCancelClick = event => {
        event.preventDefault()
        onCancelClick()
    }

    if (!pack) {
        return <p>there was a problem loading customer pack</p>
    } else {
        console.log(pack)
        return <main className="flex flex-col justify-center items-center bg-color_backgroundGrey w-full h-screen">
            <h2 className="text-2xl">Update customer pack: "{pack.packDescription}"</h2>
            <div className="flex flex-col">
                <form className="flex flex-col justify-items-start" onSubmit={handleSubmit} >
                    <Field>
                        <Label htmlFor="packDescription">Pack description</Label>
                        <Input className="border-2 rounded-lg" type="text" id="packDescription" placeholder="Pack name" defaultValue={pack.description} />
                    </Field>

                    <Field>
                        <Label htmlFor="originalQuantity">Original Quantity</Label>
                        <Input className="border-2 rounded-lg" type="text" id="originalQuantity" placeholder="Original Quantity" defaultValue={pack.quantity} />
                    </Field>

                    <Field>
                        <Label htmlFor="remainingQuantity">Remaining Quantity</Label>
                        <Input className="border-2 rounded-lg" type="text" id="remainingQuantity" placeholder="Remaining Quantity" defaultValue={pack.quantity} />
                    </Field>

                    <Field>
                        <Label htmlFor="unit">Unit</Label>
                        <select id="unit" name="unit" defaultValue={pack.unit}>
                            <option value="hours">Hours</option>
                            <option value="units">Units</option>
                        </select>
                    </Field>

                    <Field>
                        <Label htmlFor="price">Price</Label>
                        <Input className="border-2 rounded-lg w-full" type="text" id="price" placeholder="50 €" defaultValue={pack.price} />
                        <input type="hidden" id="currency" defaultValue="EUR" />
                    </Field>

                    <Field>
                        <Label htmlFor="purchaseDate">Purchase Date</Label>
                        <Input className="border-2 rounded-lg w-full" type="text" id="purchaseDate" defaultValue={pack.purchaseDate} />
                    </Field>

                    <Field>
                        <Label htmlFor="expireDate">Expire Date</Label>
                        <Input className="border-2 rounded-lg w-full" type="text" id="expireDate" defaultValue={pack.price} />
                    </Field>

                    <Field>
                        <Label htmlFor="status">Status</Label>
                        <Input className="border-2 rounded-lg w-full" type="text" id="status" defaultValue={pack.status} />
                    </Field>

                    <Field>
                        <Label htmlFor="paymentStatus">Payment status</Label>
                        <Input className="border-2 rounded-lg w-full" type="text" id="paymentStatus" defaultValue={pack.status} />
                    </Field>


                    <Button className='bg-red-800 text-white' onClick={handleCancelClick}>Cancel</Button>
                    <Button type="submit">Update</Button>
                    <Button>Manage Payments</Button>
                </form>
            </div>
        </main>

    }


}