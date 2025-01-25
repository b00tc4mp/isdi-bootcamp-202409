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
                    console.log("useEffect -- First customer ID --> ", firstCustomerId)
                    setSelectedCustomer(firstCustomerId)

                    console.log('Antes de llamar al getAdquiredPacks el firstCustomerId.id es --> ' + firstCustomerId.id)
                    const packs = await logic.getAdquiredPacks(firstCustomerId.id)
                    console.log('useEffect -- Packs fetched successfully --> ', packs)
                    setFilteredPacks(packs)

                    //load activities from first pack in the select
                    if (packs.length > 0) {
                        const firstPack = packs[0]
                        console.log('useEffect -- First pack -->', firstPack)
                        setSelectedPack(firstPack)

                        const activities = await logic.getActivitiesByPackId(firstPack.id)
                        console.log('useEffect -- Pack Activity fetched successfully --> ', activities)
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
        console.log('handleCustomerChange -- customerID before setSelectedCustomer --> ' + customerId)

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
        console.log('handleCustomerChange -- setSelectedCustomer --> ' + customerId)

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

        console.log('Selected Pack --------->', selectedPackObject)
        setSelectedPack(packId) // Actualizar pack seleccionado

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

        //TODO: Esto con useRef, nada de usar el DOM!!!
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

        logic.toggleManualTimeTracker(userId, selectedPack.id, selectedPack.customer, currentDescription, timerInput)
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
        console.log(selectedPack.customer)

        logic.toggleManualUnitsTracker(userId, selectedPack.id, selectedPack.customer, currentDescription, parseInt(UnitsInput))
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

        console.log('y cuando llego al boto de track el selectedcustomer.id es   --> ' + selectedCustomer.id + selectedCustomer)
        console.log('y cuando llego al boto de track el selectedPack.customer es --> ' + selectedPack.customer + selectedPack)
        logic.toggleTimeTracker(userId, selectedPack.id, selectedPack.customer, currentDescription, 'substract')
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
        /* console.log('useEffect timerActivated ---> ' + selectedPack?.timerActivated)
        console.log('useEffect elapsedTime ---> ' + elapsedTime) */
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
        <main className="flex flex-col items-center bg-color_backgroundGrey w-full min-h-screen pt-12">
            <h1 className="text-3xl mb-4">Tracker</h1>
            <p className="mb-6">This will be the page to track your projects</p>

            {/* Tarjeta principal para formulario */}
            <div className="bg-white shadow-md rounded p-6 w-full max-w-4xl mb-6">
                <h2 className="text-2xl font-bold mb-6">Customer and Pack</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Columna Izquierda */}
                    <div className="space-y-4">
                        <Field><Label htmlFor="selectCustomer">Select Customer</Label>
                            <select id="selectCustomer" name="selectCustomer" className="border-2 rounded-lg w-full p-2" onChange={handleCustomerChange}>
                                {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
                            </select>
                        </Field>

                        <Field><Label htmlFor="selectPack">Select Pack</Label>
                            <select id="selectPack" name="selectPack" className="border-2 rounded-lg w-full p-2" disabled={!filteredPacks.length} onChange={handlePackChange}>
                                {filteredPacks.map(pack => <option key={pack.id} value={pack.id}>{pack.status === 'Active' ? '🟢 ' : '🔴 '}{pack.status} - {pack.description} - {pack.originalQuantity}{pack.unit}</option>)}
                            </select>
                        </Field>

                        <Field><Label htmlFor="description">Description</Label>
                            <textarea id="description" name="description" rows="3" className="border-2 rounded-lg w-full p-2" placeholder="Add a description..." value={description} onChange={handleDescriptionChange} />
                        </Field>
                    </div>

                    {/* Columna Derecha */}
                    <div className="space-y-4">
                        {selectedPack?.unit === 'hours' && (
                            <div className="flex items-center gap-4">
                                <div className="border-2 rounded-lg p-3 w-44 text-center text-lg font-semibold">
                                    {new Date(elapsedTime * 1000).toISOString().substr(11, 8)}
                                </div>
                                <Button type="button" className={`flex-shrink-0 px-6 py-3 text-lg font-semibold ${!selectedPack?.timerActivated ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white rounded-lg w-32 h-12 flex items-center justify-center`} onClick={handleToggleTrackButton}>
                                    {!selectedPack?.timerActivated ? 'Start' : 'Stop'}
                                </Button>
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            {selectedPack?.unit === 'hours' && (
                                <Field>
                                    <input type="text" id="timerAdjust" name="timerAdjust" placeholder="-01:00:00" defaultValue="-01:00:00" className="border-2 rounded-lg p-3 w-44 text-center text-lg" />
                                </Field>
                            )}
                            {selectedPack?.unit === 'units' && (
                                <Field>
                                    <input type="number" id="unitsAdjust" name="unitsAdjust" placeholder="-1" defaultValue="-1" className="border-2 rounded-lg p-3 w-32 text-center text-lg" />
                                </Field>
                            )}

                            {selectedPack?.unit === 'units'
                                ? <Field><Button className="flex-shrink-0 px-6 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-700 text-white rounded-lg w-32 h-12 flex items-center justify-center" onClick={handleAdjustManualUnits}>Register Sesion</Button></Field>
                                : <Field><Button className="flex-shrink-0 px-6 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-700 text-white rounded-lg w-32 h-12 flex items-center justify-center" onClick={handleAdjustManualTime}>Register Time</Button></Field>
                            }
                        </div>
                    </div>
                </form>
            </div>

            {/* Tarjeta para el historial de actividades */}
            <div className="bg-white shadow-md rounded p-6 w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">History</h2>
                <ActivityTable activities={packActivities} />
            </div>

            <a href="" title="Go back home" onClick={handleHomeClick} className="mt-4 mb-4 hover:underline">Back to home</a>
        </main>
    )
}