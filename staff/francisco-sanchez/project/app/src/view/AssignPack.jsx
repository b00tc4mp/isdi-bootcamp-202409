import { useState, useEffect } from 'react'
import logic from '../logic'
import { errors } from 'com'

const { SystemError } = errors

import useContex from './useContext'

import { Button, Field, Input, Label, Image } from '../library'
import { getCurrencySymbol } from '../util'
import { assignPack } from '../logic/packs'

export default function AssignPack(props) {
    const [basePacks, setPacks] = useState([])
    const { alert } = useContex()

    useEffect(() => {
        console.log('Packs / PacksList -> componentDidMount')
        const fetchBasePacks = async () => {
            try {
                const basePacks = await logic.getBasePacks()
                setPacks(basePacks)
            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }
        fetchBasePacks()
    }, [])


    const handleSubmit = event => {
        //Get form fields values
        event.preventDefault()
        const { target: form } = event
        const {
            customerSearch: { value: customerSearch },
            selectPack: { value: selectPack },
            payedAmount: { value: payedAmount },
            paymentMethod: { value: paymentMethod }
        } = form

        //Finnally we call the assign function with all the retrieved information 
        try {
            assignPack(customerSearch, selectPack, payedAmount, paymentMethod)
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

    return <main className="flex flex-col items-center bg-color_backgroundGrey w-full h-screen pt-12">
        <h2 className="text-2xl">Assign pack to customer</h2>
        <div className="flex flex-col">
            <form className="flex flex-col justify-items-start" onSubmit={handleSubmit} >

                <Field>
                    <Label htmlFor="customerSearch">Find customer <span className='text-red-600'> DEVELOPER REF: just works by username!!</span></Label>
                    <Input id="customerSearch" className="border-2 rounded-lg" type="text" placeholder="Use email or username" ></Input>
                </Field>

                <Field>
                    <Label htmlFor="selectPack">Select Pack</Label>
                    <select id="selectPack" name="selectPack" className="border-2 rounded-lg w-full p-2">
                        {basePacks.map((basePack) => (
                            <option key={basePack.id} value={basePack.id}>{basePack.packName} - {basePack.price}{getCurrencySymbol(basePack)}</option>
                        ))}
                    </select>
                </Field>

                <Field>
                    <Label htmlFor="payedAmount">Payed Ammount</Label>
                    <Input id="payedAmount" className="border-2 rounded-lg" type="number" placeholder="0 €" ></Input>
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

                <Button type="submit">Assign Pack</Button>
            </form>
        </div>
        <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
    </main>
}