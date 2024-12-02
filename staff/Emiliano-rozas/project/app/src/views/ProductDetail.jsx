import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function ProductDetail() {

    const { productId } = useParams() //tomara  los valores de id que vienen del URL que especificamos en app, como hablamos en clase
    console.log(productId);
    const { products } = useContext(ShopContext)
    const [productInfo, setProductInfo] = useState(false)
    const [image, setImage] = useState('')

    const getProductInfo = async () => {
        products.map((item) => {
            if (item.id === productId) { //si no se pone la condicion imposible que aparezca
                setProductInfo(item)
                setImage(item.image)
                console.log(item)
                return null // para que se deje de ejuctar o PETA
            }
        })
    }

    useEffect(() => {
        getProductInfo()
    }, [productId]);

    return productInfo ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* product data */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row '>
                {/* product image/images */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {
                            productInfo.images.map((item, index) => (
                                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ' />
                            ))
                        }
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img className='w-full h-auto' src={image} />
                    </div>
                </div>
                {/* product info */}
                <div flex='flex-1'>
                    <h1 className='font-medium text-white text-3xl text 2x1 mt-2'>{productInfo.title}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img className='w-12 6' src="https://static.vecteezy.com/system/resources/thumbnails/013/743/771/small/five-stars-rating-icon-png.png" alt="" />
                        <p className='pl-1 text-white text-sm'>(999)</p>
                    </div>
                    <p className='mt-5 text-3x12 font-medium text-white'>${productInfo.price}</p>
                    <p className='mt-5 text-white md:w-4/5'>{productInfo.description}</p>
                    <div className='flex flex-col gap-4 my-8'>
                        <ul>

                            <li className='text-white'>Author: {productInfo.author}
                            </li>
                            <li className='text-white'>Publisher: {productInfo.publisher}
                            </li>
                            <li className='text-white'>ISBN: {productInfo.isbn}
                            </li>
                            <li className='text-white'>Category: {productInfo.category}
                            </li>
                        </ul>
                        <button className='bg-green-700 w-1/3 mt-8 text-white px-8 py-3 text-sm active:bg-green-400'>ADD TO CART</button>
                        <hr className='mt-8 sm:w-4/5 border-1 border-green-700' />
                        <div className='text-sm text-white mt-5 flex flex-col gap-1'>
                            <p>100% original product</p>
                            <p>Loved by the fans!</p>
                            <p>Easy return and exchange policy</p>
                        </div>
                    </div>
                </div>
                {/* Description & Review  */}
            </div>
        </div>
    ) : <div className='opacity-0'></div>

}

