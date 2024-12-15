import React from 'react'
import assets from '../assets'

export default function Policy() {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-white'>
            <div>
                <img src={assets.noFace} className='w-24 m-auto mb-5' alt="" />
                <p className='font-semibold'>Easy Exchange Policy</p>
                <p>We offer hassle free  exchange policy</p>
            </div>
            <div>
                <img src={assets.totoro} className='w-20 m-auto mb-5' alt="" />
                <p className='font-semibold'>7 Days Return Policy</p>
                <p>We provide 7 days free return policy h</p>
            </div>
            <div>
                <img src={assets.heart} className='w-20 m-auto mb-8 ' alt="" />
                <p className='font-semibold'>Best Customer Support</p>
                <p>We provide 24/7 customer support</p>
            </div>
        </div>
    )
}
