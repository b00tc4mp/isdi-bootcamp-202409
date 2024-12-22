import { useState, useEffect } from 'react'
import logic from '../logic'
import { errors } from 'com'

import useContex from './useContext'
import { Button, Field, Label, Input } from '../library/index';

import { getCustomers } from '../logic/users';

const { SystemError } = errors

export default function Tracker(props) {
    //const [loading, setLoading] = useState(true) //This is to show the loader as active by default
    const [customers, setCustomers] = useState([])
    const [filteredPacks, setFilteredPacks] = useState([]);
    const { alert } = useContex()

    useEffect(() => {
        console.log('Tracker -> componentDidMount')
        const fetchCustomers = async () => {
            try {
                const customers = await logic.getCustomers()
                console.log('Customers fetched successfully', customers)
                setCustomers(customers)
            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }
        fetchCustomers()

        // Logic to retrieve the packs will come here

        const fetchPacks = async () => {
            try {
                const packs = await logic.getAdquiredPacks('67640e5e2568e5139854dd58') //TEMPORAL
                console.log('Packs fetched successfully', packs)
                setFilteredPacks(packs)

            } catch (error) { }
            alert(error.message)
            console.error(error)
        }
        fetchPacks()
    }, [])


    const handleCustomerChange = (event) => {
        console.log('entro en el onchange')
        /* const customerId = event.target.value;

        // Encuentra el cliente seleccionado
        const selectedCustomer = customers.find((customer) => customer.id === customerId);
        console.log(selectedCustomer)

        // Actualiza los packs filtrados basados en `adquiredPacks`
        if (selectedCustomer && selectedCustomer.adquiredPacks) {
            setFilteredPacks(selectedCustomer.adquiredPacks);
        } else {
            setFilteredPacks([]); // Si no tiene packs, limpia el estado
        } */
    }


    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }



    return (
        <main className="flex flex-col  items-center bg-color_backgroundGrey w-full h-screen pt-12">
            <h1 className='text-3xl'>Tracker</h1>
            <p>This will be the page to track your projects</p>
            <div className="flex flex-col">
                <h2 className="text-2xl">Customer and Pack</h2>

                <form className="flex flex-col justify-items-start">
                    {/* Select Customer */}
                    <Field className="mb-4">
                        <Label htmlFor="selectCustomer">Select Customer</Label>
                        <select id="selectCustomer" name="selectCustomer" className="border-2 rounded-lg w-full p-2" onChange={handleCustomerChange}>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                            ))}
                        </select>
                    </Field>

                    {/* Select Pack */}
                    <Field className="mb-4">
                        <Label htmlFor="selectPack">Select Pack</Label>
                        <select id="selectPack" name="selectPack" className="border-2 rounded-lg w-full p-2">
                            {filteredPacks.map((pack) => (
                                <option key={pack.id} value={pack.id}>{pack.description}</option>
                            ))}
                        </select>
                    </Field>

                    {/* Description and Timer Section */}
                    <div className="flex flex-wrap gap-4 mt-4 items-start">
                        {/* Description Field */}
                        <Field className="flex-1">
                            <Label htmlFor="description">Description</Label>
                            <textarea id="description" name="description" rows="3" className="border-2 rounded-lg w-full p-2" placeholder="Add a description..."></textarea>
                        </Field>

                        <div className="flex items-center space-x-2">
                            <Field>
                                <Label htmlFor="timer">Time</Label>
                                <input type="text" id="timer" name="timer" placeholder="00:00:00" className="border-2 rounded-lg p-2 w-32 text-center" />
                            </Field>
                            <Button type="button" className="btn m-1 bg-green-500 hover:bg-green-600" onClick={() => console.log("Start Timer")}>Start</Button>
                            <div className="flex flex-col ">
                                {/* <Button className="btn m-2" onClick={handleAssignPacks}>Next</Button> */}
                                <Button className="btn m-1">Adjust manual</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


            {/* {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-color_green"></div>
                </div>
            ) : ( */}
            <h2 className='text-2xl'>History</h2>
            <table className="table-auto mt-4 w-[80%] bg-white text-black rounded-md">
                <thead>
                    <tr className='bg-color_Grey'>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Time</th>
                        <th className="border px-4 py-2">Remaning</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='border px-4 py-2'>Task description 3</td>
                        <td className='border px-4 py-2'>16/12/2024</td>
                        <td className='border px-4 py-2'>-1:30h</td>
                        <td className='border px-4 py-2 text-red-500'>0:30h</td>
                    </tr>
                    <tr>
                        <td className='border px-4 py-2'>Task description 3</td>
                        <td className='border px-4 py-2'>16/12/2024</td>
                        <td className='border px-4 py-2'>-3:00h</td>
                        <td className='border px-4 py-2 text-red-500'>2:00h</td>
                    </tr>
                    <tr>
                        <td className='border px-4 py-2'>Task description 2</td>
                        <td className='border px-4 py-2'>10/12/2024</td>
                        <td className='border px-4 py-2'>-3:00h</td>
                        <td className='border px-4 py-2'>5:00h</td>
                    </tr>
                    <tr>
                        <td className='border px-4 py-2'>Task description 1</td>
                        <td className='border px-4 py-2'>05/12/2024</td>
                        <td className='border px-4 py-2'>-2:00h</td>
                        <td className='border px-4 py-2'>8:00h</td>
                    </tr>
                    <tr>
                        <td className='border px-4 py-2'>Add new pack 10h</td>
                        <td className='border px-4 py-2'>01/12/2024</td>
                        <td className='border px-4 py-2'>+10:00h</td>
                        <td className='border px-4 py-2'>10:00h</td>
                    </tr>
                </tbody>
            </table>
            {/*  )} */}

            <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
        </main>
    )

}