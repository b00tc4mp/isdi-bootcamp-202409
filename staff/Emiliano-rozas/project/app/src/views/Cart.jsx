import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { CartTotal, Title } from '../components/index'
import { Link } from 'react-router-dom'
import assets from '../assets'
import logic from '../logic/index';


export default function Cart() {

    const [cartInfo, setCartInfo] = useState({ items: [], totalPrice: 0 });

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartData = await logic.getCart();
                setCartInfo(cartData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCart();
    }, []);

    const handleUpdateQuantity = async (cartItemId, newQuantity) => {
        try {
            await logic.updateQuantity(cartItemId, Number(newQuantity));
            const updatedCart = await logic.getCart();
            setCartInfo(updatedCart);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveFromCart = async (cartItemId) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await logic.removeAllFromCart(cartItemId);
                const updatedCart = await logic.getCart();
                setCartInfo(updatedCart);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className='border-t border-green-700 pt-14'>
            <div className='text-2xl mb-3'>
                <Title text1={'YOUR'} text2={' CART'} />
            </div>
            <div>
                {cartInfo.items.length > 0 ? (
                    cartInfo.items.map((item) => (
                        <div key={item.id} className='py-4 border-t border-b text-white grid grid-cols-[4fr_0.5_0.5] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                            <div className='flex items-start gap-6'>
                                <img className='w-16 sm:w-20' src={item.product.image} alt="cartProduct" />
                                <div>
                                    <p className='text-small sm:text-lg font-medium'>{item.product.title}</p>
                                    <p>$ {item.product.price}</p>
                                </div>
                            </div>
                            <input
                                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1focus:outline-none focus:ring-0 focus:border-green-700 caret-green-700 bg-black text-white'
                                type="number"
                                min={1}
                                max={33}
                                defaultValue={item.quantity}
                                onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                            />
                            <img
                                className='w-6 mr-4 sm:w-6 cursor-pointer'
                                src={assets.binIcon}
                                alt="delete icon"
                                onClick={() => handleRemoveFromCart(item.id)}
                            />
                        </div>
                    ))
                ) : (
                    <p className='text-white'>Your Cart is empty.</p>
                )}
            </div>
            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal cart={cartInfo} />
                    <div className='w-full text-end'>
                        {cartInfo.items.length > 0 ? (
                            // muy loco esto, le podemos pasar las movidas del url o estados de este componente a travez del link al que sigue
                            <Link to='/place-order' state={{ cart: cartInfo }} >
                                <button className='bg-green-700 text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
                            </Link>
                        ) : (
                            <button className='bg-green-700 text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}