import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Title, ProductItem } from '../components/index'

export default function Products() {

    const { products } = useContext(ShopContext)
    const [filterProducts, setFilterProducts] = useState([])

    useEffect(() => {
        setFilterProducts(products)
    }, [products])

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-green-700'>
            {/* filtros */}
            <div className='min-w-60 text-white'>
                <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
                <div className='border border-green-700 pl-5 py-3 mt-6'>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-white'>
                        <p className='flex gap-2'>
                            <input className='w-4' type="checkbox" value={'all'} />All
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-4' type="checkbox" value={'comics'} />Comics
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-4' type="checkbox" value={'mangas'} />Mangas
                        </p>
                    </div>
                </div>
                <div className='border border-green-700 pl-5 py-3 mt-6'>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-white'>
                        <p className='flex gap-2'>
                            <input className='w-4' type="checkbox" value={'comics'} />Best Sellers
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-4' type="checkbox" value={'mangas'} />Latest Arrivals
                        </p>
                    </div>
                </div>
            </div>
            {/* productos */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text 2x1 mb-4'>
                    <Title text1={'ALL '} text2={' PRODUCTS'} />
                    {/* deplegable de sort */}
                    <select className=' border-2 border-green-700 text-sm px-2 bg-black text-white option:'>
                        <option className='hover:bg-green-700' value="relevant"> Sort by : Relevant</option>
                        <option value="low-high"> Sort by : Low-high</option>
                        <option value="high-low"> Sort by : High-low</option>
                    </select>
                </div>
                {/* prodcutos */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                        filterProducts.map(item => {
                            return (
                                <ProductItem key={item.id} name={item.title} id={item.id} price={item.price} image={item.image} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

