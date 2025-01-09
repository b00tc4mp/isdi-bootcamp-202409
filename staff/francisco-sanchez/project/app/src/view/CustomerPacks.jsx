import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import logic from '../logic'

import { errors } from 'com'
import { Button } from '../library/index';

const { SystemError } = errors

export default function CustomerPacks(props) {
    const { customerId } = useParams(); // Obtén el customerId desde la URL
    const [customerPacks, setCustomerPacks] = useState([])
    const [loading, setLoading] = useState(true) //This is to show the loader as active by default

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

    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }


    return (
        <main className="flex flex-col  items-center bg-color_backgroundGrey w-full h-screen pt-12">
            <h1 className='text-3xl'>Manage Customer packs</h1>
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
                            <th className="border px-4 py-2 text-color_softRed">Payed <br></br>(to correct)</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Payment Status</th>
                            <th className="border px-4 py-2">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {customerPacks.map(customerPack => (

                            < tr key={customerPack.id} >

                                <td className='border px-4 py-2'>{customerPack.description}</td>
                                <td className='border px-4 py-2'>{customerPack.formattedRemaining}</td>
                                <td className='border px-4 py-2'>{customerPack.formattedPurchaseDate}</td>
                                <td className='border px-4 py-2'>{customerPack.formattedExpiryDate}</td>
                                <td className='border px-4 py-2'>{customerPack.price}</td>
                                <td className='border px-4 py-2'>{customerPack.price}</td>
                                <td className='border px-4 py-2'>{customerPack.status}</td>
                                <td className='border px-4 py-2'>text</td>
                                <td className='border px-4 py-2'>
                                    <a href="" className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold rounded-full px-3 py-1 m-1">✏️ See details</a>
                                    {/* <a href="" className="inline-block bg-red-100 text-gray-800 text-xs font-semibold rounded-full px-3 py-1 m-1">❌ Delete</a>
 */}                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }

            {/*   <div className="flex flex-col ">
                <Button className="btn m-2">New customer </Button>
            </div> */}

            <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
        </main >
    )
} 