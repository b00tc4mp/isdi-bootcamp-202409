import React from 'react'
import { assets } from '../assets'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className='flex items-center justify-between py-5 font-medium'>

            <img src={assets.logoBuenardo} className='w-36' alt="" />

            <ul className='hidden sm:flex gap-5 text-sm text-white'>
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
            <div className='flex items-center gap-6'>
                <img src={assets.searchIcon} className='w-5 cursor-pointer' alt="" />

                <div className='group relative'>
                    <img src={assets.profileIcon} className='w-5 cursor-pointer' alt="" />
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 '>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 border-solid border-2  border-green-700 text-white '>
                            <p className='cursor-pointer hover:text-green-700'>My Profile</p>
                            <NavLink to='/orders'>
                                <p className='cursor-pointer hover:text-green-700'>Orders</p>
                            </NavLink>
                            <p className='cursor-pointer hover:text-green-700'>Logout</p>
                        </div>
                    </div>
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cartIcon} className='w-5 cursor-pointer' alt="" />
                </Link>
                <img src={assets.menuIcon} className='w-5 cursor-pointer' alt="" />
            </div>
        </div>


    )
}

export default NavBar