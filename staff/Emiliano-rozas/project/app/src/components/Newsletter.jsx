import React from 'react'

export default function Newsletter() {

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <div className='text-center'>
            <p className='text-2x1 font-medium text-white font-semibold'>Subcribe now and get 20% OFF</p>
            <p className='text-white mt-3 '>Be the first in recibe access to special offers and all our new merch!</p>
            <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex items-center gap-1 mx-auto px-10 py-4'>
                <input className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-0 focus:border-green-700 caret-green-700 bg-black' type="email" placeholder='Enter your email' required />
                <button type='submit' className='bg-green-700 text-white text-xs px-10 py-4 rounded-md h-11 border-solid border-[1px] border-white font-semibold'>SUBSCRIBE</button>
            </form>
        </div>
    )
}

