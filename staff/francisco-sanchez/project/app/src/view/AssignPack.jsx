import { useState, useEffect } from 'react'
import logic from '../logic'
import { errors } from 'com'

const { SystemError } = errors

import useContex from './useContext'

import { Button, Field, Input, Label, Image } from '../library'
import { getCurrencySymbol } from '../util'
import { assingPack, getBasePacksDetails } from '../logic/packs'
import { findUserIdbyEmailOrUsername } from '../logic/users'

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
            selectPack: { value: selectPack }
        } = form

        //Get userId
        /* try {
            findUserIdbyEmailOrUsername(customerSearch)
                .then((userId) => {
                    console.log(userId)
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('There was a problem, fetching userId')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        } */

        //Get pack information
        /* try {
            const basepackDetails = getBasePacksDetails(selectPack)
                .then(() => {
                     form.reset()
                    console.log(basepackDetails)

                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('There was a problem fetching basepack details')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        } */

        //Finnally we call the assign function with all the retrieved information 
        try {
            assingPack(customerSearch, basePacks)
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
                    <Label htmlFor="customerSearch">Find customer</Label>
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

                <Button type="submit">Assign Pack</Button>
            </form>
        </div>
        <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
    </main>
}