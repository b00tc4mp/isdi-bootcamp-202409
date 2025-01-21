import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'
import logic from '../logic'

import { errors } from 'com'
import { Button, TagOK, TagWARN, TagKO } from '../library/index';

import { UpdateCustomerPack } from './components';

const { SystemError } = errors

export default function CustomerPacks(props) {
    const { customerId } = useParams(); // Obtén el customerId desde la URL
    const { state } = useLocation()
    const [view, setView] = useState(false)
    const customerName = state?.customerName || 'Unknow user'
    const [selectedPack, setSelectedPack] = useState(null); // Estado para almacenar el pack seleccionado
    const [customerPacks, setCustomerPacks] = useState([])
    const [loading, setLoading] = useState(true) //This is to show the loader as active by default
    const updatePackView = useRef(null)

    useEffect(() => {
        console.log('Customer packs / CustomersPacksList -> componentDidMount')
        const fetchCustomers = async () => {
            try {
                setLoading(true)
                const customerPacks = await logic.getCustomerPacks(customerId)
                setCustomerPacks(customerPacks)
                console.log(customerPacks)
            } catch (error) {
                console.error(error)
                alert(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCustomers()

    }, [customerId])

    useEffect(() => {
        if (view && UpdateCustomerPack.current) {
            UpdateCustomerPack.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [view])


    const handleManageClick = (event, customerPack) => {
        event.preventDefault()
        console.log('To update: ' + customerPack._id)
        setSelectedPack(customerPack) //Guarda el basePack en el estado
        setView(view ? null : 'UpdateCustomerPack')
        console.log('View set to:', view);
    }

    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    const handlePackUpdated = async () => {
        setView(null); // Cierra el componente hijo
        setSelectedPack(null); // Limpia el pack seleccionado
        try {
            const updatedPacks = await logic.getCustomerPacks(customerId); // Vuelve a obtener los datos actualizados
            setCustomerPacks(updatedPacks); // Actualiza la tabla de packs
            //alert('Customer packs updated successfully (EN EL PADRE)!', 'success'); // Muestra el mensaje "OK" en el padre
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }


    return (
        <main className="flex flex-col  items-center bg-color_backgroundGrey w-full min-h-screen pt-12">
            <h1 className='text-3xl'>Manage packs for {customerName}</h1>
            <p>You can see the packs of the selected customer</p>

            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-color_green"></div>
                </div>
            ) : (
                <table className="table-auto mt-4 w-[80%] bg-white text-black rounded-md">
                    <thead>
                        <tr className='bg-amarilloCanario'>

                            <th className="border px-4 py-2">Pack description</th>
                            <th className="border px-4 py-2">Remaining</th>
                            <th className="border px-4 py-2">Purchase date</th>
                            <th className="border px-4 py-2">Expire date</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Payed</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Payment Status</th>
                            <th className="border px-4 py-2">Method</th>
                            {/* <th className="border px-4 py-2">Actions</th> */}

                        </tr>
                    </thead>
                    <tbody>
                        {customerPacks.map(customerPack => (

                            < tr key={customerPack._id} className="cursor-pointer hover:bg-gray-100"
                                onClick={(event) => handleManageClick(event, customerPack)}>
                                <td className='border px-4 py-2'>{customerPack.description}</td>
                                <td className='border px-4 py-2'>{customerPack.formattedRemaining}</td>
                                <td className='border px-4 py-2'>{customerPack.formattedPurchaseDate}</td>
                                <td className='border px-4 py-2'>{customerPack.formattedExpiryDate}</td>
                                <td className='border px-4 py-2'>{customerPack.formattedPrice}</td>
                                <td className='border px-4 py-2'>{customerPack.totalPayments}</td>
                                {/* 'Pending', 'Active', 'Expired', 'Finished' */}
                                {/* <td className='border px-4 py-2'>{customerPack.status}</td> */}

                                <td className="border px-4 py-2">
                                    {customerPack.status === 'Active' && (<TagOK>Active</TagOK>)}
                                    {customerPack.status === 'Pending' && (<TagKO>Pending</TagKO>)}
                                    {customerPack.status === 'Expired' && (<TagKO>Expired</TagKO>)}
                                    {customerPack.status === 'Finished' && (<TagKO>Finished</TagKO>)}
                                </td>
                                {/* <td className='border px-4 py-2'>{customerPack.paymentStatus}</td> */}
                                <td className="border px-4 py-2">
                                    {customerPack.paymentStatus === 'pending' && (<TagKO>Pending</TagKO>)}
                                    {customerPack.paymentStatus === 'partially payed' && (<TagWARN>Partially Paid</TagWARN>)}
                                    {customerPack.paymentStatus === 'completed' && (<TagOK>Completed</TagOK>)}
                                </td>
                                <td className='border px-4 py-2'>{customerPack.paymentMethods}</td>
                                {/* <td className='border px-4 py-2'>
                                    <button className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold rounded-full px-3 py-1 m-1" onClick={(event) => handleManageClick(event, customerPack)}>✏️ Manage</button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                    {view === 'UpdateCustomerPack' && selectedPack && (
                        <tr ref={updatePackView}>
                            <td colSpan="10" className="border px-4 py-2">
                                <UpdateCustomerPack
                                    pack={selectedPack}
                                    onUpdated={handlePackUpdated}
                                    onPaymentAdded={handlePackUpdated}
                                    onCancelClick={() => {
                                        setView(null)
                                        setSelectedPack(null)
                                    }} />
                            </td>
                        </tr>
                    )}
                </table>
            )}
            <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
        </main >
    )
} 