import { useState, useEffect, useRef } from 'react'
import logic from '../logic'
import { errors } from 'com'

import useContex from './useContext'
import { Button, Field, Label, Input } from '../library/index'
import { ActivityTable } from './components/index'

const { SystemError } = errors

export default function Tracker(props) {
    let [loading, setLoading] = useState(true)
    const [customers, setCustomers] = useState([])
    const [filteredPacks, setFilteredPacks] = useState([])
    const [packActivities, setPackActivities] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState('')
    const [selectedPack, setSelectedPack] = useState(null)
    const [description, setDescription] = useState('')

    const [elapsedTime, setElapsedTime] = useState(0)
    const [intervalId, setIntervalId] = useState(null)

    const { alert } = useContex()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
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
                //alert(error.message)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])


    const handleCustomerChange = (event) => {

        const customerId = event.target.value
        console.log('handleCustomerChange -- customerID before setSelectedCustomer --> ' + customerId)

        // Detenemos el temporizador actual
        if (intervalId) {
            clearInterval(intervalId)
            setIntervalId(null)
        }

        // Reiniciamos el tiempo transcurrido
        setElapsedTime(0)

        // Actualizamos el cliente seleccionado
        setSelectedCustomer(customerId)
        console.log('handleCustomerChange -- setSelectedCustomer --> ' + customerId)

        //TODO: Este Clear daba problemas, al comentarlo ya no da error.
        // Limpiamos el pack seleccionado
        //setSelectedPack(null)

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
                setDisabled(true)
            })
    }

    const handlePackChange = (event) => {

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
                    alert('Invalid pack data received from the server.')
                    return
                }
                console.log('API Response (packUpdated):', packUpdated)
                console.log('setSelectedPack --> selected pack --> ' + selectedPack)

                setSelectedPack(packUpdated)

                setFilteredPacks(prevPacks =>
                    prevPacks.map(pack =>
                        pack.id === packUpdated.id ? packUpdated : pack
                    )
                )

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
        return Math.floor((Date.now() - new Date(timerActivated)) / 1000)
    }


    if (customers.length === 0) {
        return (
            <main className="flex flex-col items-center bg-color_backgroundGrey w-full flex-grow pt-12">
                <h2 className="text-2xl font-bold mb-6">Tracker</h2>

                {loading ? (

                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-color_green"></div>
                    </div>

                ) : (

                    <div className="bg-white shadow-md rounded p-6 w-full max-w-4xl">
                        <p>You should create first a pack and assign it to a customer to see this page</p>
                        <br></br>
                        <ul>
                            <li>1. Go Manage packs</li>
                            <li>2. Clic on create new pack</li>
                            <li>3. Go to assign pack</li>
                        </ul>
                        <br></br>
                        <hr></hr>
                        <p>After this steps you'll can manage it on this page</p>
                    </div>
                )}
            </main>
        )
    }

    return (
        <main className="flex flex-col  items-center bg-color_backgroundGrey w-full flex-grow pt-12">
            <h2 className="text-2xl font-bold mb-6">Tracker</h2>
            <p>This will be the page to track your projects</p>
            <div className="flex flex-col justify-around">
                <h3 className="text-2xl pt-10">Customer and Pack</h3>

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
                                <option key={pack.id} value={pack.id}>{pack.status === 'Active' ? ' 🟢 ' : ' 🔴 '}{pack.status} - {pack.description} - {pack.originalQuantity}{pack.unit}</option>
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

                        <div className="flex flex-col">
                            {/* Sección para packs de tiempo */}
                            {selectedPack?.unit === 'hours' && (
                                <div className="flex items-center">
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
                            <div className="flex items-center">
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

            <h2 className='text-2xl'>History</h2>

            <ActivityTable activities={packActivities} packInfo={selectedPack} />

            <a href="" title="Go back home" onClick={handleHomeClick} className="mt-4 mb-4 hover:underline">Back to home</a>
        </main>
    )
}