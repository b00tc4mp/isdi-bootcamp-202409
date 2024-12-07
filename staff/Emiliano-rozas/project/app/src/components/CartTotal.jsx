import React, { useContext, useEffect, useState } from 'react'
import logic from '../logic/index'
import { Title } from './index'
import { ShopContext } from '../context/ShopContext'

export default function CartTotal({ cart }) {

    const { delivery_fee } = useContext(ShopContext)

    // const [cart, setCart] = useState({ totalPrice: 0 })

    // useEffect(() => {
    //     const fetchCart = async () => {
    //         try {
    //             const cartData = await logic.getCart()
    //             setCart(cartData)
    //         } catch (err) {
    //             console.error('Error fetching cart:', err);
    //         }
    //     }
    //     fetchCart();
    // }, [])


    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={' TOTALS'} />
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between text-white'>
                    <p>Subtotal</p>
                    <p>${Math.round(cart.totalPrice).toFixed(2)}</p>
                </div>

                <div className='flex justify-between text-white'>
                    <p>Shipping Fee</p>
                    <p>${delivery_fee}</p>
                </div>
                <hr className='w-full border-1 bg-green-700 border-green-700' />
                <div className='flex justify-between text-white'>
                    <b>Total</b>
                    <b>${(Math.round(cart.totalPrice + delivery_fee)).toFixed(2)}</b>
                </div>
            </div>
        </div >
    )
}
