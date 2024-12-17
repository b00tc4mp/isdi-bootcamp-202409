import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { RelatedProducts } from '../components/index'
import { errors } from 'com'
import logic from '../logic/index'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const { SystemError } = errors

export default function ProductDetail() {
    let { productId } = useParams()
    const { products } = useContext(ShopContext)
    const [productInfo, setProductInfo] = useState(null)
    const [image, setImage] = useState('')

    const loggedIn = logic.isUserLoggedIn()


    useEffect(() => {
        const getProductInfo = async () => {
            products.forEach((item) => {
                if (item.id === productId) {
                    setProductInfo(item)
                    setImage(item.image)
                }
            })
        }
        getProductInfo()
    }, [productId, products])

    const showToastMessage = () => {
        toast.success(`${productInfo.title} has been added to your cart!`, {
            position: "top-right"
        })
    }

    const updateCartHandler = async () => {
        try {
            let quantity = 1

            await logic.updateCart(productInfo.id, quantity)

            // alert(`${productInfo.title} has been added to your cart!`)
            showToastMessage()
        } catch (error) {
            if (error instanceof SystemError)
                alert('Sorry, try again later.')
            else
                alert(error.message)

            console.error(error)
        }
    }


    return productInfo ? (
        <div className="border-t-2 border-green-700 pt-10 transition-opacity ease-in duration-500 opacity-100">
            {/* product data */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                {/* product image/images */}
                <div className='flex-1 flex flex-col-reverse gap-4 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[25%] w-full'>
                        {
                            productInfo.images.map(item => (
                                <img
                                    onClick={() => setImage(item)}
                                    src={item}
                                    key={item.id}
                                    className='w-[30%] sm:w-full sm:mb-4 flex-shrink-0 cursor-pointer'
                                    style={{ height: '200px', width: 'auto', objectFit: 'cover' }}
                                />
                            ))
                        }
                    </div>
                    <div className='w-full sm:w-[75%]'>
                        <img className='w-full h-auto object-contain' src={image} alt='Main Product' />
                    </div>
                </div>
                {/* product info */}
                <div className='flex-1 ml-8'>
                    <h1 className='font-medium text-white text-3xl text 2x1 mt-2'>{productInfo.title}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img className='w-12' src="https://static.vecteezy.com/system/resources/thumbnails/013/743/771/small/five-stars-rating-icon-png.png" alt="stars" />
                        <p className='pl-1 text-white text-sm'>(999)</p>
                    </div>
                    <p className='mt-5 text-3x12 font-medium text-white'>${productInfo.price}</p>
                    <p className='mt-5 text-white md:w-4/5'>{productInfo.description}</p>
                    <div className='flex flex-col gap-4 my-8'>
                        <ul>
                            <li className='text-white'>Author: {productInfo.author}</li>
                            <li className='text-white'>Publisher: {productInfo.publisher}</li>
                            <li className='text-white'>ISBN: {productInfo.isbn}</li>
                            <li className='text-white'>Category: {productInfo.category}</li>
                        </ul>
                        {
                            loggedIn ? (
                                <button onClick={updateCartHandler} className='bg-green-700 w-1/3 mt-8 text-white px-8 py-3 text-sm rounded active:bg-green-400'>ADD TO CART
                                    <ToastContainer /></button>
                            ) : (
                                <Link to='/login'>
                                    <button className='bg-green-700 w-1/3 mt-8 text-white px-8 py-3 text-sm active:bg-green-400'>ADD TO CART</button>
                                </Link>
                            )
                        }
                        <hr className='mt-8 sm:w-4/5 border-1 border-green-700' />
                        <div className='text-sm text-white mt-5 flex flex-col gap-1'>
                            <p>100% original product</p>
                            <p>Loved by the fans!</p>
                            <p>Easy return and exchange policy</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <div className="flex">
                    <b className="border border-green-700 px-5 py-3 text-white text-sm">Description</b>
                    <p className="border border-green-700 px-5 py-3 text-sm text-white">Reviews (999)</p>
                </div>
                <div className="flex flex-col gap-4 border border-green-700 px-6 py-6 text-sm text-white">
                    <p>
                        In an alternate world where the mere presence of American superheroes changed history, the US won the
                        Vietnam War, Nixon is still president, and the cold war is in full effect. Watchmen begins as a
                        murder-mystery, but soon unfolds into a planet-altering conspiracy. As the resolution comes to a head, the
                        unlikely group of reunited heroes--Rorschach, Nite Owl, Silk Spectre, Dr. Manhattan and Ozymandias--have
                        to test the limits of their convictions and ask themselves where the true line is between good and evil.
                    </p>
                    <p>
                        In the mid-eighties, Alan Moore and Dave Gibbons created Watchmen, changing the course of comics' history
                        and essentially remaking how popular culture perceived the genre. Popularly cited as the point where comics
                        came of age, WATCHMEN's sophisticated take on superheroes has been universally acclaimed for its
                        psychological depth and realism. WATCHMEN is collected here with a new cover, sketches, extra bonus
                        material and a new introduction by series artist Dave Gibbons.
                    </p>
                </div>
            </div>
            <RelatedProducts category={productInfo.category} />
        </div>
    ) : (
        <div className="opacity-0"></div>
    )
}
