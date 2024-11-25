import React, { useEffect, useContext, useState } from 'react'
import { ShopContext } from '../logic/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {

    const { products } = useContext(ShopContext)

    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller))
        setBestSeller(bestProduct.slice(9, 14))
    }, [])

    return (
        <div className='my-10'>
            <div className='text-center text-3x1 py-8'>
                <Title text1={'BEST'} text2={' SELLERS'}></Title>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-white'>
                    Top-rated comics and manga you can't miss</p>
            </div>
            <div className='grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 transition-transform duration-300 hover:scale-105' >
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                    ))
                }
            </div>
        </div >
    )
}

export default BestSeller