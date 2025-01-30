import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Field, Button, Input, Label } from '../../library';
import { errors } from 'com';

import useContext from '../useContext';
import logic from '../../logic';

const { SystemError } = errors

export default function UpdateBasePack({ onUpdated, onCancelClick, basePack }) {
    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event
        const {
            packName: { value: packName },
            packDescription: { value: packDescription },
            quantity: { value: quantity },
            unit: { value: unit },
            expiringTime: { value: expiringTime },
            price: { value: price },
            currency: { value: currency }
        } = form

        try {
            logic.updateBasePack(basePack.id, packName, packDescription, quantity, unit, expiringTime, price, currency)
                .then(() => {
                    alert("Pack updated successfully!", "success");
                    onUpdated()
                })
                .catch((error) => {
                    alert(error.message)
                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleCancelClick = event => {
        event.preventDefault()
        onCancelClick()
    }

    return (
        <main className="flex flex-col items-center bg-color_backgroundGrey w-full flex-grow">
            <h2 className="text-2xl mb-4 pt-5">Update pack: "{basePack.packName}"</h2>

            {/* Tarjeta blanca para el formulario */}
            <div className="bg-white shadow-md rounded p-6 mb-10 w-full max-w-2xl">
                {/* Form en dos columnas en pantallas md+ */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit} >

                    {/* Columna Izquierda */}
                    <div className="space-y-4">
                        <Field>
                            <Label htmlFor="packName">Pack name</Label>
                            <Input
                                className="border-2 rounded-lg w-full p-2"
                                type="text"
                                id="packName"
                                placeholder="Pack name"
                                defaultValue={basePack.packName}
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="packDescription">Pack description</Label>
                            <textarea
                                className="border-2 rounded-lg w-full p-2"
                                id="packDescription"
                                placeholder="Pack description goes here"
                                defaultValue={basePack.description}
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                className="border-2 rounded-lg w-full p-2"
                                type="number"
                                id="price"
                                placeholder="50 €"
                                defaultValue={basePack.price}
                            />
                            <Input type="hidden" id="currency" defaultValue="EUR" />
                        </Field>
                    </div>

                    {/* Columna Derecha */}
                    <div className="space-y-4">
                        <Field>
                            <Label htmlFor="unit">Unit</Label>
                            <select
                                id="unit"
                                name="unit"
                                defaultValue={basePack.unit}
                                className="border-2 rounded-lg w-full p-2"
                            >
                                <option value="hours">Hours</option>
                                <option value="units">Units</option>
                            </select>
                        </Field>

                        <Field>
                            <Label htmlFor="expiringTime">Expiring pack time</Label>
                            <select
                                id="expiringTime"
                                name="expiringTime"
                                defaultValue={basePack.expiringTime}
                                className="border-2 rounded-lg w-full p-2"
                            >
                                <option value="-1">Unlimited</option>
                                <option value="1">1 Month</option>
                                <option value="2">2 Months</option>
                                <option value="3">3 Months</option>
                                <option value="4">4 Months</option>
                                <option value="5">5 Months</option>
                                <option value="6">6 Months</option>
                                <option value="7">7 Months</option>
                                <option value="8">8 Months</option>
                                <option value="9">9 Months</option>
                                <option value="10">10 Months</option>
                                <option value="11">11 Months</option>
                                <option value="12">12 Months</option>
                            </select>
                        </Field>

                        <Field>
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                                className="border-2 rounded-lg w-full p-2"
                                type="number"
                                id="quantity"
                                placeholder="Pack quantity"
                                defaultValue={basePack.quantity}
                            />
                        </Field>
                    </div>

                    {/* Botones ocupando el ancho de las dos columnas */}
                    <div className="md:col-span-2 flex justify-end gap-4">
                        <Button className="bg-red-800 text-white px-4 py-2 rounded" onClick={handleCancelClick}>Cancel</Button>
                        <Button type="submit" className="bg-color_primary text-white px-4 py-2 rounded">Update</Button>
                    </div>
                </form>
            </div>
        </main>
    )
}