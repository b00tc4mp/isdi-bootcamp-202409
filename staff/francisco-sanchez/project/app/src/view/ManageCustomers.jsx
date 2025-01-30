import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logic from '../logic'

export default function ManageCustomers(props) {
    const [loading, setLoading] = useState(true)
    const [customers, setCustomers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const customers = await logic.getCustomers()
                setCustomers(customers)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchCustomers()
    }, [])

    const handleCustomerPacksClick = (customerId, customerName) => {
        navigate(`/customer-packs/${customerId}`, { state: { customerName } })
    }

    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    if (loading) {
        return (
            <main className="flex flex-col items-center bg-color_backgroundGrey w-full flex-grow pt-12">
                <h2 className="text-2xl font-bold mb-6">Manage Customers</h2>
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-color_green"></div>
                </div>
            </main>
        )
    }

    if (customers.length === 0) {
        return (
            <main className="flex flex-col items-center bg-color_backgroundGrey w-full flex-grow pt-12">
                <h2 className="text-2xl font-bold mb-6">Manage Customers</h2>
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

            </main>
        )
    }

    return (
        <main className="flex flex-col items-center bg-color_backgroundGrey w-full flex-grow pt-12">
            <h1 className="text-3xl">Manage Customers</h1>
            <p>This will be the page to manage your customers</p>

            <table className="table-auto mt-4 w-[80%] bg-white text-black rounded-md">
                <thead>
                    <tr className="bg-amarilloCanario">
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Active packs</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td className="border px-4 py-2">
                                {customer.name} {customer.surname1 ?? ''}
                            </td>
                            <td className="border px-4 py-2">{customer.email}</td>
                            <td className="border px-4 py-2">
                                <span className="inline-block bg-gray-200 text-gray-800 text-sm font-semibold rounded-full px-3 py-1">
                                    {customer.packCount}
                                </span>
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold rounded-full px-3 py-1 m-1"
                                    onClick={() => handleCustomerPacksClick(customer.id, customer.name)}
                                >
                                    📑 Customer packs
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <a href="" title="Go back home" onClick={handleHomeClick}>
                Back to home
            </a>
        </main>
    )
}