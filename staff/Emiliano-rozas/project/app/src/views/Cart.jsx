import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { getCart, updateQuantity, removeAllFromCart } from '../logic/cart/index'


export default function Cart() {

    const { products } = useContext(ShopContext)

    // const [CartInfo, setCartInfo] = useState([])

    // useEffect(() => {
    //     const cart = getCart()
    // }, [])

    return (
        <div>

        </div>
    )
}
