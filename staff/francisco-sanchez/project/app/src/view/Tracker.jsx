import { useState, useEffect, useRef } from 'react'
import logic from '../logic'
import { errors } from 'com'

import useContex from './useContext'
import { Button, Field, Label, Input } from '../library/index'
import { ActivityTable } from './components/index'

/* import { getCustomers } from '../logic/users'
import { getActivitiesByPackId } from '../logic/activities'
import { getDecimalToTimeFormat } from '../logic/helpers' */

const { SystemError } = errors

export default function Tracker(props) {
    const [customers, setCustomers] = useState([])
    const [filteredPacks, setFilteredPacks] = useState([])
    const [packActivities, setPackActivities] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState('') // Estado para almacenar el cliente seleccionado
    const [selectedPack, setSelectedPack] = useState(null) // Estado para almacenar el pack seleccionado
    const [description, setDescription] = useState('') // Estado para almacenar la descripción

    const [elapsedTime, setElapsedTime] = useState(0) // Tiempo transcurrido en segundos
    const [intervalId, setIntervalId] = useState(null) // Identificador del intervalo

    const { alert } = useContex()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customers = await logic.getCustomers()
                setCustomers(customers)

                if (customers.length > 0) {
                    const firstCustomerId = customers[0]
                    //console.log("First customer ID --> ", firstCustomerId)
                    setSelectedCustomer(firstCustomerId)

                    const packs = await logic.getAdquiredPacks(firstCustomerId.id)
                    //console.log('Packs fetched successfully --> ', packs)
                    setFilteredPacks(packs)

                    //load activities from first pack in the select
                    if (packs.length > 0) {
                        const firstPack = packs[0]
                        //console.log('First pack -->', firstPack)
                        setSelectedPack(firstPack)

                        const activities = await logic.getActivitiesByPackId(firstPack.id)
                        //console.log('Pack Activity fetched successfully --> ', activities)
                        setPackActivities(activities)
                    }

                } else {
                    setFilteredPacks([])
                }

            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }
        fetchData()
    }, [])


    const handleCustomerChange = (event) => {
        //console.log(event)

        const customerId = event.target.value
        //console.log('customerID CHANGED --> ' + customerId)

        // Detenemos el temporizador actual
        if (intervalId) {
            clearInterval(intervalId)
            setIntervalId(null)
            //console.log('Interval Id --> ' + intervalId)
        }

        // Reiniciamos el tiempo transcurrido
        setElapsedTime(0)

        // Actualizamos el cliente seleccionado
        setSelectedCustomer(customerId)

        // Limpiamos el pack seleccionado
        setSelectedPack(null)

        // Fetch packs based on the selected customer
        logic.getAdquiredPacks(customerId)
            .then((packs) => {
                //console.log('Packs fetched successfully --> ', packs)
                setFilteredPacks(packs)

                if (packs.length > 0) {
                    const firstPack = packs[0]
                    //console.log('First pack ID after customer change', firstPack)
                    setSelectedPack(firstPack) // Actualizar pack seleccionado

                    // Calcular tiempo transcurrido y reiniciar temporizador
                    const elapsed = calculateElapsedTime(firstPack.timerActivated)
                    setElapsedTime(elapsed)

                    if (firstPack.timerActivated) {
                        const id = setInterval(() => {
                            setElapsedTime((prevTime) => prevTime + 1)
                        }, 1000)
                        setIntervalId(id)
                    }

                    logic.getActivitiesByPackId(firstPack.id)
                        .then((activities) => {
                            //console.log('Pack Activity fetched successfully', activities)
                            setPackActivities(activities)
                        })
                } else {
                    setFilteredPacks([])
                    setPackActivities([])
                }
            })
            .catch((error) => {
                alert(error.message)
                console.error(error)
                setFilteredPacks([])
                // Additionally, set disabled to true explicitly
                // This ensures the select is disabled even on errors
                // (assuming you want it disabled in case of errors)
                setDisabled(true)
            })
    }

    const handlePackChange = (event) => {
        /* console.log('entro en el onchange de pack')
        console.log(event) */

        const packId = event.target.value
        const selectedPackObject = filteredPacks.find(pack => pack.id === packId)

        //console.log('Selected Pack --------->', selectedPackObject)
        //setSelectedPack(packId) // Actualizar pack seleccionado

        if (selectedPackObject) {
            // Detenemos el temporizador actual
            if (intervalId) {
                clearInterval(intervalId)
                setIntervalId(null)
            }

            // Actualizamos el pack seleccionado
            setSelectedPack(selectedPackObject)

            // Calculamos el tiempo transcurrido si hay un timerActivated
            const elapsed = calculateElapsedTime(selectedPackObject.timerActivated)
            setElapsedTime(elapsed)

            // Inicia el temporizador si `timerActivated` está definido
            if (selectedPackObject.timerActivated) {
                const id = setInterval(() => {
                    setElapsedTime((prevTime) => prevTime + 1)
                }, 1000) // Incrementar cada segundo
                setIntervalId(id)
            }
        }

        // Actualizamos las actividades
        logic.getActivitiesByPackId(packId)
            .then((packActivities) => {
                //console.log('Pack Activity fetched successfully', packActivities)
                setPackActivities(packActivities)
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

        const timerInput = document.getElementById('timerAdjust').value

        // Validar el formato del input de tiempo: (+/-)hh:mm:ss
        const timeRegex = /^[-+]?([0-9]{2}):([0-5][0-9]):([0-5][0-9])$/
        console.log(timerInput)
        if (!timeRegex.test(timerInput)) {
            alert("Please enter a valid time in the format (+/-)hh:mm:ss.")
            return
        }

        const userId = logic.getUserId()
        const currentDescription = description || 'No description'

        console.log(selectedCustomer.id)

        logic.toggleManualTimeTracker(userId, selectedPack.id, selectedCustomer.id, currentDescription, timerInput)
            .then((packUpdated) => {
                if (!packUpdated || !packUpdated.id) {
                    /* console.log('API Response (packUpdated):', packUpdated)
                    console.log('setSelectedPack --> selected pack --> ' + selectedPack) */
                    alert('Invalid pack data received from the server.')
                    return
                }
                // Fetch updated activities 
                logic.getActivitiesByPackId(packUpdated.id)
                    .then((updatedActivities) => {
                        console.log('Updated Activities:', updatedActivities)
                        setPackActivities(updatedActivities) // Actualiza las actividades
                    })
                    .catch((error) => {
                        alert(error.message)
                        console.error('Error fetching updated activities:', error)
                    })
            })
            .catch((error) => {
                alert(error.message)
                console.error(error)
            })
    }

    const handleAdjustManualUnits = (event) => {
        event.preventDefault()

        const UnitsInput = document.getElementById('unitsAdjust').value
        console.log(UnitsInput)

        const userId = logic.getUserId()
        const currentDescription = description || 'No description'

        console.log(selectedCustomer.id)

        logic.toggleManualUnitsTracker(userId, selectedPack.id, selectedCustomer.id, currentDescription, parseInt(UnitsInput))
            .then((packUpdated) => {
                if (!packUpdated || !packUpdated.id) {
                    /* console.log('API Response (packUpdated):', packUpdated)
                    console.log('setSelectedPack --> selected pack --> ' + selectedPack) */
                    alert('Invalid pack data received from the server.')
                    return
                }
                // Fetch updated activities 
                logic.getActivitiesByPackId(packUpdated.id)
                    .then((updatedActivities) => {
                        console.log('Updated Activities:', updatedActivities)
                        setPackActivities(updatedActivities) // Actualiza las actividades
                    })
                    .catch((error) => {
                        alert(error.message)
                        console.error('Error fetching updated activities:', error)
                    })
            })
            .catch((error) => {
                alert(error.message)
                console.error(error)
            })

    }

    const handleToggleTrackButton = () => {
        if (!selectedPack || !selectedPack.id) {
            alert('No pack selected or invalid pack ID.')
            return
        }

        const userId = logic.getUserId()
        const currentDescription = description || 'No description'

        logic.toggleTimeTracker(userId, selectedPack.id, selectedCustomer, currentDescription, 'substract')
            .then((packUpdated) => {
                if (!packUpdated || !packUpdated.id) {
                    /* console.log('API Response (packUpdated):', packUpdated)
                    console.log('setSelectedPack --> selected pack --> ' + selectedPack) */
                    alert('Invalid pack data received from the server.')
                    return
                }
                setSelectedPack(packUpdated)

                // Detenemos el temporizador actual
                if (intervalId) {
                    clearInterval(intervalId)
                    setIntervalId(null)
                }

                // Calculamos el tiempo inicial y activamos el temporizador
                const elapsed = calculateElapsedTime(packUpdated.timerActivated)
                setElapsedTime(elapsed)

                if (packUpdated.timerActivated) {
                    const id = setInterval(() => {
                        setElapsedTime((prevTime) => prevTime + 1)
                    }, 1000) // Incrementar cada segundo
                    setIntervalId(id)
                }

                if (selectedPack?.timerActivated) {
                    // Fetch updated activities 
                    logic.getActivitiesByPackId(packUpdated.id)
                        .then((updatedActivities) => {
                            console.log('Updated Activities:', updatedActivities)
                            setPackActivities(updatedActivities) // Actualiza las actividades
                        })
                        .catch((error) => {
                            alert(error.message)
                            console.error('Error fetching updated activities:', error)
                        })
                }

                /* console.log('API Response (packUpdated):', packUpdated)
                console.log('setSelectedPack --> selected pack --> ' + selectedPack) */
            })
            .catch((error) => {
                alert(error.message)
                console.error(error)
            })
    }

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [intervalId])

    useEffect(() => {
        if (selectedPack?.timerActivated) {
            document.title = `⏱️ Timer: ${new Date(elapsedTime * 1000).toISOString().substr(11, 8)}`
        } else {
            document.title = 'Hourify - Time Tracker'
        }
    }, [elapsedTime, selectedPack?.timerActivated])

    const calculateElapsedTime = (timerActivated) => {
        if (!timerActivated) return 0
        return Math.floor((Date.now() - new Date(timerActivated)) / 1000) // En segundos
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
                            <textarea id="description" name="description" rows="3" className="border-2 rounded-lg w-full p-2" placeholder="Add a description..." value={selectedPack?.descriptionActivityTemp} onChange={handleDescriptionChange}></textarea>
                        </Field>

                        <div className="flex flex-col space-y-6">
                            {/* Sección para packs de tiempo */}
                            {selectedPack?.unit === 'hours' && (
                                <div className="flex items-center space-x-4">
                                    {/* Visualización del temporizador */}
                                    <div className="border-2 rounded-lg p-3 w-44 text-center text-lg font-semibold">
                                        {new Date(elapsedTime * 1000).toISOString().substr(11, 8)}
                                    </div>

                                    {/* Botón Start/Stop */}
                                    <Button
                                        type="button"
                                        className={`flex-shrink-0 px-6 py-3 text-lg font-semibold ${!selectedPack?.timerActivated ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                                            } text-white rounded-lg w-32 h-12 flex items-center justify-center`}
                                        onClick={handleToggleTrackButton}>
                                        {!selectedPack?.timerActivated ? 'Start' : 'Stop'}
                                    </Button>
                                </div>
                            )}

                            {/* Sección para ajustes manuales */}
                            <div className="flex items-center space-x-4">
                                {/* Input para packs de tiempo */}
                                {selectedPack?.unit === 'hours' && (
                                    <Field>
                                        <input type="text" id="timerAdjust" name="timerAdjust" placeholder="-01:00:00" defaultValue="-01:00:00" className="border-2 rounded-lg p-3 w-44 text-center text-lg" />
                                    </Field>
                                )}

                                {/* Input para packs de unidades */}
                                {selectedPack?.unit === 'units' && (
                                    <Field>
                                        <input type="number" id="unitsAdjust" name="unitsAdjust" placeholder="-1" defaultValue="-1" className="border-2 rounded-lg p-3 w-32 text-center text-lg" />
                                    </Field>
                                )}

                                {/* Botón Adjust Manual */}
                                {selectedPack?.unit === 'units' ? (
                                    <Field>
                                        <Button className="flex-shrink-0 px-6 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-700 text-white rounded-lg w-32 h-12 flex items-center justify-center" onClick={handleAdjustManualUnits}> Register Sesion </Button>
                                    </Field>
                                ) : (
                                    <Field>
                                        <Button className="flex-shrink-0 px-6 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-700 text-white rounded-lg w-32 h-12 flex items-center justify-center" onClick={handleAdjustManualTime}> Register Time </Button>
                                    </Field>
                                )}
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
            <ActivityTable activities={packActivities} />
            {/*  )} */}

            <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
        </main>
    )
}