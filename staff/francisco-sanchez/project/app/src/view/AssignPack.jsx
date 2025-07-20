import { useState, useEffect } from 'react'
import logic from '../logic'
import { errors } from 'com'

const { SystemError } = errors

import useContex from './useContext'

import { Button, Field, Input, Label, Image, Textarea } from '../library'
import { getCurrencySymbol } from '../util'
import { assignPack } from '../logic/packs'

export default function AssignPack(props) {
    const [basePacks, setPacks] = useState([])
    const { alert } = useContex()

    useEffect(() => {
        const fetchBasePacks = async () => {
            try {
                const basePacks = await logic.getBasePacks()
                setPacks(basePacks) // Actualiza el estado con los packs obtenidos

            } catch (error) {
                if (error.message === 'jwt expired') {
                    error.message = 'Your session has expired.'
                    alert(error.message)
                    console.error(error.message)
                    localStorage.removeItem('token') // Limpia el token en caso de error
                    navigate('/login') // Redirige al login
                } else {
                    alert(error.message)
                    console.error(error)
                }
            }
        }
        fetchBasePacks()
    }, [])


    const handleSubmit = async (event) => {
        //Get form fields values
        event.preventDefault()
        const { target: form } = event
        let {
            customerSearch: { value: customerSearch },
            selectPack: { value: selectPack },
            description: { value: description },
            payedAmount: { value: payedAmount },
            paymentMethod: { value: paymentMethod }
        } = form


        //Check correct format for price
        let formattedPayedAmount = payedAmount.replace(',', '.')
        formattedPayedAmount = formattedPayedAmount.replace('€', '')
        payedAmount = formattedPayedAmount

        try {
            const assigned = await assignPack(customerSearch, selectPack, description, payedAmount, paymentMethod)
            alert('Pack successfully assigned to customer!', 'success')
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    return <main className="flex flex-col items-center bg-color_backgroundGrey w-full flex-grow pt-12">
        <h2 className="text-2xl font-bold mb-6">Assign pack to customer</h2>

        <div className="bg-white shadow-md rounded p-6 w-full max-w-4xl">

            {/* Formulario con grid de dos columnas (en pantallas medianas o superiores) */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

                {/* Columna Izquierda */}
                <div className="space-y-4">
                    <Field>
                        <Label htmlFor="customerSearch">Find customer </Label>
                        <Input id="customerSearch" personalClasses="border-2 rounded-lg w-full" type="text" placeholder="Use email or username" />
                    </Field>

                    <Field>
                        <Label htmlFor="selectPack">Select Pack</Label>
                        <select id="selectPack" name="selectPack" className="border-2 rounded-lg w-full p-2">
                            {basePacks.map((basePack) => (
                                <option key={basePack.id} value={basePack.id}>
                                    {basePack.packName} - {basePack.price}
                                    {getCurrencySymbol(basePack)}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <Field>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Description about this pack for this customer" personalClasses="border-2 rounded-lg w-full" />
                    </Field>
                </div>

                {/* Columna Derecha */}
                <div className="space-y-4">
                    <Field>
                        <Label htmlFor="payedAmount">Payed Amount</Label>
                        <Input id="payedAmount" personalClasses="border-2 rounded-lg w-full" type="text" placeholder="0 €" />
                    </Field>

                    <Field>
                        <Label htmlFor="paymentMethod">Select Payment Method</Label>
                        <select id="paymentMethod" name="paymentMethod" className="border-2 rounded-lg w-full p-2">
                            <option value="card">Card</option>
                            <option value="cash">Cash</option>
                            <option value="bankTransfer">Bank Transfer</option>
                            <option value="paypal">Paypal</option>
                            <option value="stripe">Stripe</option>
                            <option value="others">Others</option>
                        </select>
                    </Field>
                </div>

                {/* Botón al final ocupando el ancho de ambas columnas en pantallas medianas+ */}
                <div className="md:col-span-2 flex justify-center">
                    <Button type="submit">Assign Pack</Button>
                </div>
            </form>
        </div>
        <a href="" title="Go back home" onClick={handleHomeClick} className="mt-4 hover:underline">Back to home</a>
    </main>
}