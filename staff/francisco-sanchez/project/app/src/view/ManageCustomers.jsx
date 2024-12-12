import { useState, useEffect } from 'react'
import logic from '../logic'

import { errors } from 'com'
import { Button } from '../library/index';

const { SystemError } = errors

export default function ManageCustomers(props) {
    const [loading, setLoading] = useState(true) //This is to show the loader as active by default

    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        console.log('Customers / CustomersList -> componentDidMount')
        const fetchCustomers = async () => {
            try {
                setLoading(true)
                const customers = await logic.getCustomers()
                setCustomers(customers)
            } catch (error) {
                console.error(error)
                alert(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCustomers()
    }, [])


    return (
        <main className="flex flex-col  items-center bg-color_backgroundGrey w-full h-screen pt-12">
            <h1>Manage Customers</h1>
            <p>This will be the page to manage your customers</p>

            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-color_green"></div>
                </div>
            ) : (
                <table className="table-auto mt-4 w-[80%] bg-white text-black rounded-md">
                    <thead>
                        <tr className='bg-amarilloCanario'>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.id}>
                                <td className='border px-4 py-2'>{customer.name} {customer.surname1 !== null ? customer.surname1 : ''}</td>
                                <td className='border px-4 py-2'>✏️ ❌</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="flex flex-col ">
                <Button className="btn m-2">New customer </Button>
            </div>

            <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
        </main>
    )

}