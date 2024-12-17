import React, { useEffect, useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Title, ProductItem } from './index.js'

export default function BestSeller() {
    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const bestProduct = products.filter(item => item.bestSeller)
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={' SELLERS'}></Title>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-white'>
                    Top-rated comics and manga you can't miss</p>
            </div>
            <div className='grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 transition-transform duration-300 hover:scale-105' >
                {
                    bestSeller.map((item) => (
                        <ProductItem key={item.id} id={item.id} name={item.title} image={item.image} price={item.price} />
                    ))
                }
            </div>
        </div >
    )
}
