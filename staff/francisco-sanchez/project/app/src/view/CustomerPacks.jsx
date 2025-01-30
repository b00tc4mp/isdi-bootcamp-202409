import { useParams, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import logic from '../logic'

import { errors } from 'com'
import { Button, TagOK, TagWARN, TagKO, TagEXTRA } from '../library/index'

import { UpdateCustomerPack } from './components'
import { getDecimalToTimeFormat } from '../logic/helpers'

const { SystemError } = errors

export default function CustomerPacks(props) {
    const { customerId } = useParams() // Obtén el customerId desde la URL
    const { state } = useLocation()
    const [view, setView] = useState(false)
    const customerName = state?.customerName || 'Unknow user'
    const [selectedPack, setSelectedPack] = useState(null) // Estado para almacenar el pack seleccionado
    const [customerPacks, setCustomerPacks] = useState([])
    const [loading, setLoading] = useState(true) //This is to show the loader as active by default
    const updatePackView = useRef(null)

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setLoading(true)
                const customerPacks = await logic.getCustomerPacks(customerId)
                const formattedPacks = await formatCustomerPacks(customerPacks)
                setCustomerPacks(formattedPacks)
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
        if (view && updatePackView.current) {
            updatePackView.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [view])


    const handleManageClick = (event, customerPack) => {
        event.preventDefault()
        setSelectedPack(customerPack) //Guarda el basePack en el estado
        setView(view ? null : 'UpdateCustomerPack')
    }

    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    const handlePackUpdated = async () => {
        setView(null) // Cierra el componente hijo
        setSelectedPack(null) // Limpia el pack seleccionado

        try {
            const updatedPacks = await logic.getCustomerPacks(customerId) // Vuelve a obtener los datos actualizados
            //setCustomerPacks(updatedPacks) // Actualiza la tabla de packs

            const formattedPacks = await formatCustomerPacks(updatedPacks)
            setCustomerPacks(formattedPacks)
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    //Función de formateo de los packs
    const formatCustomerPacks = async (packs) => {
        return await Promise.all(
            packs.map(async (pack) => {
                // Formatear remainingQuantity
                let formattedRemaining
                let formattedOriginal
                if (pack.unit === 'hours') {
                    formattedRemaining = await getDecimalToTimeFormat(pack.remainingQuantity)
                    formattedRemaining += ' h'
                    formattedOriginal = await getDecimalToTimeFormat(pack.originalQuantity)
                    formattedOriginal += ' h'
                } else if (pack.unit === 'units') {
                    formattedRemaining = `${pack.remainingQuantity || 0} un.`
                    formattedOriginal = `${pack.remainingQuantity || 0} un.`
                }

                // Formatear fechas
                const formattedPurchaseDate = pack.purchaseDate
                    ? new Date(pack.purchaseDate).toLocaleDateString()
                    : 'N/A'
                const formattedExpiryDate = pack.expiryDate
                    ? new Date(pack.expiryDate).toLocaleDateString()
                    : 'N/A'

                // Formatear precio
                const formattedPrice = `${pack.price || 0} ${pack.currency || ''}`

                // Formatear totalPayments
                const formattedTotalPayments = `${pack.totalPayments || 0} ${pack.currency || ''}`

                return {
                    ...pack,
                    formattedRemaining,
                    formattedOriginal,
                    formattedPurchaseDate,
                    formattedExpiryDate,
                    formattedPrice,
                    formattedTotalPayments,
                }
            })
        )

    }


    return (
        <main className="flex flex-col  items-center bg-color_backgroundGrey w-full flex-grow pt-12">
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

                            < tr key={customerPack.id} className="cursor-pointer hover:bg-gray-100"
                                onClick={(event) => handleManageClick(event, customerPack)}>

                                <td className='border px-4 py-2'>{customerPack.description}</td>
                                <td className='border px-4 py-2'>{customerPack.formattedRemaining}</td>
                                <td className='border px-4 py-2'>{customerPack.formattedPurchaseDate}</td>
                                <td className='border px-4 py-2'>{customerPack.formattedExpiryDate}</td>
                                <td className='border px-4 py-2'>{customerPack.formattedPrice}</td>
                                <td className='border px-4 py-2'>{customerPack.formattedTotalPayments}</td>
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
                                    {customerPack.paymentStatus === 'payment exceded' && (<TagEXTRA>Payment Exceded</TagEXTRA>)}
                                </td>
                                <td className='border px-4 py-2'>{customerPack.paymentMethods}</td>
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
                                    onPaymentDeleted={handlePackUpdated}
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