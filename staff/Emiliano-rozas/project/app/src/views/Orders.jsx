import React, { useEffect, useState } from 'react'
import { Title } from '../components'
import logic from '../logic'

export default function Orders() {
    const [orders, setOrders] = useState([])

    useEffect(() => { // no puede ser una función asíncrona directamente porque React no permite que el hook useEffect retorne una promesa.

        const UserOrders = async () => {//Por eso hay que hacer esta llamada Asyncrona y una vez gestionada, la llamamos 
            try {
                const Orders = await logic.getOrders()

                setOrders(Orders)
            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }
        UserOrders() //ACA la ejecutamos
    }, [])

    return (
        <div className=' border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={' ORDERS'} />
            </div>
            <div>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.id} className='my-6'>
                            <h3 className='text-white text-lg mb-2'>Order ID: {order.id}</h3>
                            {order.items.map(item => (
                                < div key={item.id} className='py-4 border-t border-b  border-green-700 text-white flex flex-col md:flex-row md items-center md:justify-between gap-4' >
                                    <div className='flex items-start gap-6 text-sm'>
                                        <img className='w-16 sm:w-20' src={item.product.image} alt="" />
                                        <div>
                                            <p className=' sm:text-base font-medium'>{item.product.title}</p>
                                            <div className='flex items-center gap-3 mt-2 text-base text-white'>
                                                <p className='text-lg'>$ {item.product.price}</p>
                                                <p>Quantity: {item.quantity}</p>
                                            </div>
                                            <p className='mt-2'> Date: <span className='text-gray-400'>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                                        </div>
                                    </div>
                                    <div className='md:w-1/2 flex justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <p className={`min-w-2 h-2 rounded-full ${order.status === 'pending' ? 'bg-yellow-500' :
                                                order.status === 'confirmed' ? 'bg-green-500' :
                                                    order.status === 'cancel' ? 'bg-red-700' :
                                                        order.status === 'refund' ? 'bg-yellow-200' : 'bg-gray-500' // Opción por defecto
                                                }`}>
                                            </p>
                                            <p className='text-sm md:text-base'>{order.status}</p>
                                        </div>
                                        <button className='border px-4 py-2 text-sm font-medium rounded-sm bg-green-700'> Track Order</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p className='text-white'>You have no orders yet.</p>
                )}
            </div>
        </div>
    )
}