import React from 'react'
import { assets } from '../assets'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className='flex items-center justify-between py-5 font-medium'>

            <img src={assets.logoBuenardo} className='w-36' alt="" />

            <ul className='hidden sm:flex gap-5 text-sm text-green-700'>
                <NavLink to='/' className={'flex flex-col items-center gap-1'}>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-green-700 hidden' />
                </NavLink>
                <NavLink to='/products' className={'flex flex-col items-center gap-1'}>
                    <p>PRODUCTS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-green-700 hidden' />
                </NavLink>
                <NavLink to='/about' className={'flex flex-col items-center gap-1'}>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-green-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className={'flex flex-col items-center gap-1'}>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-green-700 hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'></div>
            <img src="" alt="" />

        </div>
    )
}

export default NavBar