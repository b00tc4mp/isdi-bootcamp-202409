import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { Title, ProductItem } from './index.js'


export default function LatestArrivals() {
    const { products } = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            setLatestProducts(products.slice(0, 10))
        }
    }, [products])

    return (
        <div className='my-10' >
            {/* Metemos el compo de titulos */}
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST '} text2={' ARRIVALS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-white'>
                    Discover the newest additions to our collection, handpicked just for you.
                </p>
            </div>
            {/* //metemos el compo de de los Productos */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    // con esto vamos a devolver los productos en display con las props correspondientes
                    latestProducts.map((item) => (
                        <ProductItem key={item.id} id={item.id} image={item.image} name={item.title} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}



// Elemento key , siempre elemento inmutable. Utilizar Index es MALA PRAXIS.