import React, { useState } from 'react';
import { CartTotal, Title } from '../components/index';
import { useLocation, useNavigate } from 'react-router-dom';
import assets from '../assets';
import logic from '../logic';

export default function PlaceOrder() {

    // con esto caputramos lo que venia de la otra vista
    const location = useLocation();
    //aca accedemos al carrito que se paso como estado , y si no viene nada, que es por eso que petaba de decimos que tranki, no pasa nada que quede vacio pa que no llore
    const cart = location.state.cart || { items: [], totalPrice: 0 };

    const [method, setMethod] = useState('cash')

    const navigate = useNavigate()

    const handlePlaceOrder = async () => {
        try {
            const userId = logic.getUserId()

            if (!userId) throw new NotFoundError('User not logged in')

            await logic.placeOrder(userId)

            navigate('/orders')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* Formulario del lado izquierdo */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3 text-white'>
                    <Title text1={'DELIVERY'} text2={' INFORMATION'} />
                </div>

                <div className='flex gap-3'>
                    <input
                        className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white'
                        type="text"
                        placeholder='Name'
                        id='name'
                    />
                    <input
                        className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white'
                        type="text"
                        placeholder='Surname'
                        id='surname'
                    />
                </div>

                <input
                    className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white'
                    type="email"
                    placeholder='Email'
                    id='email'
                />

                <input
                    className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white'
                    type="text"
                    placeholder='Street'
                    id='street'
                />

                <div className='flex gap-3'>
                    <input
                        className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white'
                        type="text"
                        placeholder='City'
                        id='city'
                    />
                    <input
                        className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white'
                        type="text"
                        placeholder='Province'
                        id='province'
                    />
                </div>

                <div className='flex gap-3'>
                    <input
                        className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white'
                        type="number"
                        placeholder='ZipCode'
                        id='zipcode'
                    />
                    <input
                        className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white'
                        type="text"
                        placeholder='Country'
                        id='country'
                    />
                </div>

                <input
                    className='border border-green-700 rounded py-1.5 px-3.5 w-full bg-black text-white'
                    type="tel"
                    placeholder='Phone'
                    id='phone'
                />
            </div>

            {/* pa la derecha papi, aca estara la papa $$$$$ */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal cart={cart} />
                </div>
                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />

                    {/* a ver como hacemos andar esto muchachooo, pasarela de pagos */}
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        {/* aca sucede algo muy interesante, TW tiene clases condicionales que pueden ser fijas o dinamicas */}
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            {/* aca sucede la magia, dejamos como estandarizados los valores de estilo normales y le metemos flor de ternario adentro que determina el color del circulito dependiendo del estado actual, si este conicide, flama , le mandamos verde */}
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.stripeLogo} alt="stripe" />
                        </div>

                        <div onClick={() => setMethod('razorPay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorPay' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.razorPayLogo} alt="razorpay" />
                        </div>

                        <div onClick={() => setMethod('cash')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cash' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-white text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button onClick={handlePlaceOrder} className='bg-green-700 text-white px-16 py-3 text-sm'>PLACE ORDER</button>

                    </div>

                </div>
            </div >
        </div >
    );
}
