import { useState, useEffect, useRef } from 'react'
import logic from '../logic'
import { errors } from 'com'

import useContex from './useContext'
import { Button, Field, Label, Input } from '../library/index';

import { getCustomers } from '../logic/users';
import { getActivitiesByPackId } from '../logic/activities';
import { getDecimalToTimeFormat } from '../logic/helpers';

const { SystemError } = errors

export default function Tracker(props) {
    const [customers, setCustomers] = useState([])
    const [filteredPacks, setFilteredPacks] = useState([])
    const [packActivities, setPackActivities] = useState([])

    const { alert } = useContex()

    useEffect(() => {
        console.log('Tracker -> componentDidMount')

        const fetchData = async () => {
            try {
                const customers = await logic.getCustomers()
                console.log('Customers fetched successfully', customers)
                setCustomers(customers)

                if (customers.length > 0) {
                    const firstCustomerId = customers[0]._id
                    console.log("First customer ID", firstCustomerId)

                    const packs = await logic.getAdquiredPacks(firstCustomerId)
                    console.log('Packs fetched successfully', packs);
                    setFilteredPacks(packs);

                    //load activities from first pack in the select
                    if (packs.length > 0) {
                        const firstPackId = packs[0]._id
                        console.log('First pack ID', firstPackId)

                        const activities = await logic.getActivitiesByPackId(firstPackId)
                        console.log('Pack Activity fetched successfully', activities)
                        setPackActivities(activities)
                    }

                } else {
                    setFilteredPacks([])
                }

            } catch (error) {
                alert(error.message);
                console.error(error);
            }
        }
        fetchData()
    }, [])


    const handleCustomerChange = (event) => {
        console.log('entro en el onchange')
        { console.log(event) }

        const customerId = event.target.value; // Directly access userId from the value
        //const selectedCustomer = customers.find(customer => customer.name === selectedUsername);
        //setSelectedCustomerId(customerId);

        // Fetch packs based on the selected customer

        logic.getAdquiredPacks(customerId)
            .then((packs) => {
                console.log('Packs fetched successfully', packs);
                setFilteredPacks(packs);

                if (packs.length > 0) {
                    const firstPackId = packs[0]._id
                    console.log('First pack ID after customer change', firstPackId)

                    logic.getActivitiesByPackId(firstPackId)
                        .then((activities) => {
                            console.log('Pack Activity fetched successfully', activities)
                            setPackActivities(activities)
                        })
                } else {
                    setPackActivities([])
                }
            })
            .catch((error) => {
                alert(error.message);
                console.error(error);
                setFilteredPacks([]);
                // Additionally, set disabled to true explicitly
                // This ensures the select is disabled even on errors
                // (assuming you want it disabled in case of errors)
                setDisabled(true);
            });
    }

    const handlePackChange = (event) => {
        console.log('entro en el onchange de pack')
        { console.log(event) }

        const packId = event.target.value

        logic.getActivitiesByPackId(packId)
            .then((packActivities) => {
                console.log('Pack Activity fetched successfully', packActivities);
                setPackActivities(packActivities);
            })
            .catch((error) => {
                alert(error.message)
                console.error(error)
                setPackActivities([])
            })
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
                                <option key={customer._id} value={customer._id}>{customer.name}</option>
                            ))}
                        </select>
                    </Field>

                    {/* Select Pack */}
                    <Field className="mb-4">
                        <Label htmlFor="selectPack">Select Pack</Label>
                        <select id="selectPack" name="selectPack" className="border-2 rounded-lg w-full p-2" disabled={!filteredPacks.length} onChange={handlePackChange}>
                            {filteredPacks.map((pack) => (
                                <option key={pack._id} value={pack._id}>{pack.description} - {pack.originalQuantity}{pack.unit}</option>
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
                            <Button type="button" className={`btn m-1 bg-green-600`}>Start</Button>
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
                    {packActivities.map(packActivity => (

                        <tr key={packActivity.id}>
                            <td className='border px-4 py-2'>{packActivity.description}</td>
                            <td className='border px-4 py-2'>{packActivity.formatedDate}</td>
                            <td className='border px-4 py-2'>{packActivity.operation === 'add' ? `+${packActivity.formattedTime}` : `-${packActivity.formattedTime}`}</td>
                            <td className='border px-4 py-2'>{packActivity.formattedRemaining}</td>
                        </tr>

                    ))}

                </tbody>
            </table>
            {/*  )} */}

            <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
        </main>
    )

}