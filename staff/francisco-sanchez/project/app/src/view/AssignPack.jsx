import { errors } from 'com'

//import logic from '../logic'

import CreatePack from './../logic/packs/createPack.js'

const { SystemError } = errors

import useContex from './useContext'

import { Button, Field, Input, Label, Image } from '../library'

export default function Assign(props) {

    /* const { alert } = useContex()

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
            CreatePack(packName, packDescription, quantity, unit, expiringTime, price, currency)
                .then(() => {
                    form.reset()
                    alert(' New pack was created successfully', 'success')
                    //aquí iria un props onLoquesea() si quiero moverme 

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
    } */

    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    return <main className="flex flex-col items-center bg-color_backgroundGrey w-full h-screen pt-12">
        <h2 className="text-2xl">Assign pack to customer</h2>
        <div className="flex flex-col">
            <form className="flex flex-col justify-items-start" /* onSubmit={handleSubmit} */ >

                <Field>
                    <Label htmlFor="customerSearch">Find customer</Label>
                    <Input id="customerSearch" className="border-2 rounded-lg" type="text" placeholder="Use email or username" ></Input>
                </Field>

                <Field>
                    <Label htmlFor="expiringTime">Select Pack</Label>
                    <select id="expiringTime" name="expiringTime">
                        <option value="-1">Pack 1</option>
                        <option value="1">Pack 2</option>
                        <option value="2">Pack 3</option>
                    </select>
                </Field>

                <Button type="submit">Assign Pack</Button>
            </form>
        </div>
        <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
    </main>
}