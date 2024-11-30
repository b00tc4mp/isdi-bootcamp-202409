import React from 'react'


// Con esto voy a estandarizar el tema de los titulos, ya que lo utilizare mas de una vez. de momento sera LatestArrivals, pero tenemos youmaylike + bestsellers+ all products +related products

export default function Title({ text1, text2 }) {
    return (
        <div className='inline-flex gap-2 items-center mb-3'>
            <p className='text-white'>{text1}<span className='text-white font-medium'>{text2}</span></p>
            <p className='w-8 sm:w-12 h[1px] sm:h-[2px] bg-green-700'></p>
        </div>
    )
}

