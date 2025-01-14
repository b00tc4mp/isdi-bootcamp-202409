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
    const [selectedCustomer, setSelectedCustomer] = useState('') // Estado para almacenar el cliente seleccionado
    const [selectedPack, setSelectedPack] = useState(null) // Estado para almacenar el pack seleccionado
    const [description, setDescription] = useState('') // Estado para almacenar la descripción

    const [isRunning, setIsRunning] = useState(false); // Para saber si el temporizador está activo
    const [elapsedTime, setElapsedTime] = useState(0); // Tiempo transcurrido en segundos

    const { alert } = useContex()

    useEffect(() => {
        console.log('Tracker -> componentDidMount')

        const fetchData = async () => {
            try {
                const customers = await logic.getCustomers()
                console.log('Customers fetched successfully', customers)
                setCustomers(customers)

                if (customers.length > 0) {
                    const firstCustomerId = customers[0].id
                    console.log("First customer ID", firstCustomerId)
                    setSelectedCustomer(firstCustomerId)

                    const packs = await logic.getAdquiredPacks(firstCustomerId)
                    console.log('Packs fetched successfully', packs);
                    setFilteredPacks(packs);

                    //load activities from first pack in the select
                    if (packs.length > 0) {
                        const firstPack = packs[0]
                        console.log('First pack', firstPack)
                        setSelectedPack(firstPack)

                        const activities = await logic.getActivitiesByPackId(firstPack.id)
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

        const customerId = event.target.value;
        setSelectedCustomer(customerId)

        // Fetch packs based on the selected customer

        logic.getAdquiredPacks(customerId)
            .then((packs) => {
                console.log('Packs fetched successfully', packs);
                setFilteredPacks(packs);

                if (packs.length > 0) {
                    const firstPack = packs[0].id
                    console.log('First pack ID after customer change', firstPack)
                    setSelectedPack(firstPack) // Actualizar pack seleccionado

                    logic.getActivitiesByPackId(firstPack)
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
        const selectedPackObject = filteredPacks.find(pack => pack.id === packId)

        console.log('Selected Pack --------->', selectedPackObject);
        //setSelectedPack(packId) // Actualizar pack seleccionado

        if (selectedPackObject) { setSelectedPack(selectedPackObject) }

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

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value) // Actualizar descripción
    }

    const handleAdjustManualTime = (event) => {
        event.preventDefault()

        const timerInput = document.getElementById('timer').value

        // Validar el formato del input de tiempo: (+/-)hh:mm:ss
        const timeRegex = /^[-+]?([0-9]{2}):([0-5][0-9]):([0-5][0-9])$/;
        if (!timeRegex.test(timerInput)) {
            alert("Please enter a valid time in the format (+/-)hh:mm:ss.");
            return;
        }
        console.log("Manual time adjustment:", timerInput);
    }

    const handleToggleTrackButton = () => {
        if (!selectedPack || !selectedPack.id) {
            alert('No pack selected or invalid pack ID.');
            return;
        }

        const userId = logic.getUserId()
        const currentDescription = description || 'No description'

        logic.toggleTimeTracker(userId, selectedPack.id, selectedCustomer, currentDescription, 'substract')
            .then((packUpdated) => {
                if (!packUpdated || !packUpdated.id) {
                    console.log('API Response (packUpdated):', packUpdated);
                    console.log('setSelectedPack --> selected pack --> ' + selectedPack)
                    alert('Invalid pack data received from the server.');
                    return;
                }
                setSelectedPack(packUpdated)

                if (selectedPack?.timerActivated) {
                    // Fetch updated activities 
                    logic.getActivitiesByPackId(packUpdated.id)
                        .then((updatedActivities) => {
                            console.log('Updated Activities:', updatedActivities);
                            setPackActivities(updatedActivities); // Actualiza las actividades
                        })
                        .catch((error) => {
                            alert(error.message);
                            console.error('Error fetching updated activities:', error);
                        });
                }

                /* console.log('API Response (packUpdated):', packUpdated);
                console.log('setSelectedPack --> selected pack --> ' + selectedPack) */
            })
            .catch((error) => {
                alert(error.message)
                console.error(error)
            })
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
                        <select id="selectPack" name="selectPack" className="border-2 rounded-lg w-full p-2" disabled={!filteredPacks.length} onChange={handlePackChange}>
                            {filteredPacks.map((pack) => (
                                <option key={pack.id} value={pack.id}>{pack.description} - {pack.originalQuantity}{pack.unit}</option>
                            ))}
                        </select>
                    </Field>

                    {/* Description and Timer Section */}
                    <div className="flex flex-wrap gap-4 mt-4 items-start">
                        {/* Description Field */}
                        <Field className="flex-1">
                            <Label htmlFor="description">Description</Label>
                            <textarea id="description" name="description" rows="3" className="border-2 rounded-lg w-full p-2" placeholder="Add a description..." onChange={handleDescriptionChange}></textarea>
                        </Field>

                        <div className="flex items-center space-x-2">
                            <Field>
                                <Label htmlFor="timer">Time</Label>
                                <input type="text" id="timer" name="timer" placeholder="00:00:00" className="border-2 rounded-lg p-2 w-32 text-center" />
                            </Field>
                            {console.log('activated?:  ' + selectedPack?.timerActivated)}

                            <Button type="button" className={`btn m-1 ${!selectedPack?.timerActivated ? 'bg-green-600' : 'bg-red-600'}`} onClick={handleToggleTrackButton}>{!selectedPack?.timerActivated ? 'Start' : 'Stop'}</Button>
                            <div className="flex flex-col ">
                                {/* <Button className="btn m-2" onClick={handleAssignPacks}>Next</Button> */}
                                <Button className="btn m-1" onClick={handleAdjustManualTime}>Adjust manual</Button>
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
                        <th className="border px-4 py-2">Operation</th>
                        <th className="border px-4 py-2">Remaning</th>
                    </tr>
                </thead>
                <tbody>
                    {packActivities.map(packActivity => (

                        <tr key={packActivity.id}>
                            <td className='border px-4 py-2'>{packActivity.description}</td>
                            <td className='border px-4 py-2'>{packActivity.formatedDate}</td>
                            <td className='border px-4 py-2'>{packActivity.operation === 'add' ? `+${packActivity.formattedOperation}` : `-${packActivity.formattedOperation}`}</td>
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