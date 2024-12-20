import React from 'react'
import { Carousel } from '../components/index'

export default function Hero() {
    return (
        <div className='flex flex-col sm:flex-row border-solid border-2 border-green-700'>
            {/* Sección izquierda */}
            <div className='w-full sm:w-1/2 flex items-center justify-center ml-20 py-10 sm:py-0'>
                <div className='text-white'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-green-700' />
                        <p className='font-medium text-sm md:text-base'>OUR BEST SELLERS</p>
                    </div>
                    <h1 className='text-3xl sm:py-3 lg:text-4xl leading-relaxed'>Legends in Your Hands</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-green-700' />
                    </div>
                </div>
            </div>
            {/* Sección derecha (Carrusel) */}
            <Carousel />
        </div>
    )
}
