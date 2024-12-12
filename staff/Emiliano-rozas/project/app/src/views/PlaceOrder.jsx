import React, { useState } from 'react';
import { CartTotal, Title } from '../components/index';
import { useLocation, useNavigate } from 'react-router-dom';
import assets from '../assets';
import logic from '../logic';
import PaymentWrapper from '../components/PaymentForm.jsx';
import { errors } from 'com';

const { SystemError } = errors;

export default function PlaceOrder() {
    const location = useLocation();

    const cart = location.state?.cart || { items: [], totalPrice: 0 }; // esto es lo que nos traemos de cart desde las props/estado del link

    const [method, setMethod] = useState('cash');
    const [orderId, setOrderId] = useState(null); // Nuevo estado para almacenar el orderId
    const [showPaymentForm, setShowPaymentForm] = useState(false); // Estado para mostrar el formulario de pago

    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        try {
            // Realizamos la orden y obtengo el orderId directamente, sin necesidad de la chapuza del getOrder fantasma
            const { orderId } = await logic.placeOrder();

            // se guarda el orderId en el estado y pa lanteee nomaaa
            setOrderId(orderId);

            if (method === 'stripe') {
                setShowPaymentForm(true);  // aca entra en accion el method, establece como estado el metodo de pago para mostrar el formulario
            } else {
                navigate('/orders'); // Redirigir a la página de órdenes
            }
        } catch (error) {
            if (error instanceof SystemError)
                alert('Sorry, try again later.')
            else
                alert(error.message)

            console.error(error)

        }
    };

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* Formulario del lado izquierdo */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3 text-white'>
                    <Title text1={'DELIVERY'} text2={' INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white' type="text" placeholder='Name' id='name' />
                    <input className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white' type="text" placeholder='Surname' id='surname' />
                </div>
                <input className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white' type="email" placeholder='Email' id='email' />
                <input className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white' type="text" placeholder='Street' id='street' />
                <div className='flex gap-3'>
                    <input className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white' type="text" placeholder='City' id='city' />
                    <input className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white' type="text" placeholder='Province' id='province' />
                </div>
                <div className='flex gap-3'>
                    <input className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white' type="number" placeholder='ZipCode' id='zipcode' />
                    <input className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white' type="text" placeholder='Country' id='country' />
                </div>
                <input className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white' type="tel" placeholder='Phone' id='phone' />
            </div>
            {/* Información del carrito y método de pago */}
            <div className='mt-8 flex flex-col lg:flex-row gap-8'> {/* Cambiado de columna a fila en pantallas grandes */}
                {/* Carrito */}
                <div className='flex-1'> {/* Ajusta el ancho para que ocupe proporcionalmente */}
                    <div className='mt-8 min-w-80'>
                        <CartTotal cart={cart} />
                    </div>
                    <div className='mt-12'>
                        <Title text1={'PAYMENT'} text2={'METHOD'} />
                        <div className='flex gap-3 flex-col lg:flex-row'>
                            <div
                                onClick={() => setMethod('stripe')}
                                className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
                            >
                                <p
                                    className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''
                                        }`}
                                ></p>
                                <img className='h-5 mx-4' src={assets.stripeLogo} alt="stripe" />
                            </div>
                            <div
                                onClick={() => setMethod('cash')}
                                className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
                            >
                                <p
                                    className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cash' ? 'bg-green-400' : ''
                                        }`}
                                ></p>
                                <p className='text-white text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                            </div>
                        </div>
                        <div className='w-full text-end mt-8'>
                            <button
                                onClick={handlePlaceOrder}
                                className='bg-green-700 text-white px-16 py-3 text-sm'
                            >
                                PLACE ORDER
                            </button>
                        </div>
                    </div>
                </div>

                {/* Formulario de Pago */}
                {showPaymentForm && orderId && (
                    <div className='flex-1 bg-gray-800 p-6 rounded-lg'> {/* Flex para que ocupe 50% */}
                        <PaymentWrapper orderId={orderId} />
                    </div>
                )}
            </div>
        </div>
    );
}
