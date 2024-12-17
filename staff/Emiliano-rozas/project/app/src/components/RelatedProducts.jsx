import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { ProductItem, Title } from './index'

export default function RelatedProducts({ category }) {
    const { products } = useContext(ShopContext)
    const [related, setRelated] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            const filteredProducts = products.filter((item) => category === item.category)
            setRelated(filteredProducts.slice(0, 5))
        }
    }, [products, category])

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={' PRODUCTS'} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item) => (
                    <ProductItem key={item.id} id={item.id} name={item.title} image={item.image} price={item.price} />
                ))}
            </div>

        </div>
    )
}

