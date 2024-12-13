import { errors } from 'com'

//import logic from '../logic'

import CreatePack from './../logic/packs/createPack.js'

const { SystemError } = errors

import useContex from './useContext'

import { Button, Field, Input, Label, Image } from '../library'

export default function Create(props) {

    const { alert } = useContex()

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

        /*     console.log(packName, " - ",
                packDescription, " - ",
                quantity, " - ",
                unit, " - ",
                expiringTime, " - ",
                price, " - ",
                currency) */


        try {
            CreatePack(packName, packDescription, quantity, unit, expiringTime, price, currency)
                .then(() => {
                    form.reset()
                    alert(' New pack was created successfully', 'success')
                    //aquí iria un props onLoquesea() si quiero moverme 
                    props.onPackCreated()

                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('There was a problem, try it again later')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    return <main className="flex flex-col justify-center items-center bg-color_backgroundGrey w-full h-screen">
        <h2 className="text-2xl">Create new pack</h2>
        <div className="flex flex-col">
            <form className="flex flex-col justify-items-start" onSubmit={handleSubmit} >
                <Field>
                    <Label htmlFor="packName">Pack name</Label>
                    <Input className="border-2 rounded-lg" type="text" id="packName" placeholder="Pack name" />
                </Field>

                <Field>
                    <Label htmlFor="packDescription">Pack description</Label>
                    <textarea className="border-2 rounded-lg" type="email" id="packDescription" placeholder="Pack description goes here" />
                </Field>

                <Field>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input className="border-2 rounded-lg" type="number" id="quantity" placeholder="Quantity" />
                </Field>

                <Field>
                    <Label htmlFor="unit">Unit</Label>
                    <select id="unit" name="unit">
                        <option value="hours">Hours</option>
                        <option value="units">Units</option>
                    </select>
                </Field>

                <Field>
                    <Label htmlFor="expiringTime">Expiring pack time</Label>
                    <select id="expiringTime" name="expiringTime">
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
                    <Label htmlFor="price">Price</Label>
                    <Input className="border-2 rounded-lg w-full" type="number" id="price" placeholder="50 €" />
                    <input type="hidden" id="currency" defaultValue="EUR" />
                </Field>

                <Button type="submit">Create Pack</Button>
            </form>
        </div>
        <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
    </main>
}